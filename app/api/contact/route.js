// pages/api/contact.js
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  const body = await request.json();
  const { name, email, message, service, systemInfo } = body;

  if (!name || !email || !message || !service) {
    return NextResponse.json(
      { success: false, error: "Missing required fields" },
      { status: 400 }
    );
  }

  // Prepare data for SheetDB
  const sheetData = {
    timestamp: new Date().toISOString(),
    name: name,
    email: email,
    service: service,
    message: message,
    country: systemInfo?.country || "Unknown",
    timezone: systemInfo?.timezone || "Unknown",
    userAgent: systemInfo?.userAgent || "Unknown",
    status: "New",
  };

  try {
    // Send to SheetDB
    const sheetDbUrl = process.env.SHEETDB_LEADS;
    let sheetDbSuccess = false;

    if (sheetDbUrl) {
      try {
        const sheetResponse = await fetch(sheetDbUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sheetData),
        });

        if (sheetResponse.ok) {
          sheetDbSuccess = true;
          console.log("Data sent to SheetDB successfully");
        } else {
          console.error("SheetDB Error:", await sheetResponse.text());
        }
      } catch (sheetError) {
        console.error("SheetDB Error:", sheetError);
      }
    }

    // Validate email credentials
    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
      console.error("Missing Gmail credentials:", {
        user: process.env.GMAIL_USER ? "Set" : "Missing",
        password: process.env.GMAIL_PASS ? "Set" : "Missing",
      });
      throw new Error(
        "Email service configuration is incomplete. Please check your environment variables."
      );
    }

    // Send email (existing functionality)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS, // Use App Password instead of regular password
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.GMAIL_USER,
      subject: `📩 New Contact Message from ${name}`,
      html: `
      <div style="font-family: 'Inter', sans-serif; background-color: #f8f8f8; padding: 20px; border-radius: 12px; max-width: 600px; margin: 20px auto; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);">
    <div style="text-align: center; margin-bottom: 25px;">
      <h2 style="color: #6B46C1; font-size: 28px; margin-bottom: 10px; font-weight: 700;">Client Inquiry Details</h2>
      <p style="color: #555; font-size: 15px;">A new message has been received through the BookOne platform.</p>
    </div>

    <div style="background-color: #ffffff; padding: 25px; border-radius: 10px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);">
      <h3 style="color: #333; font-size: 20px; margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 10px;">Contact Information</h3>
      <p style="margin-bottom: 10px; font-size: 16px; color: #444;"><strong>Name:</strong> <span style="color: #6B46C1; font-weight: 600;">${name}</span></p>
      <p style="margin-bottom: 10px; font-size: 16px; color: #444;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #805AD5; text-decoration: none; font-weight: 600;">${email}</a></p>
      <p style="margin-bottom: 0; font-size: 16px; color: #444;"><strong>Service Requested:</strong> <span style="background-color: #E0BBE4; color: #6B46C1; padding: 4px 8px; border-radius: 5px; font-weight: 600; font-size: 14px;">${service}</span></p>
    </div>

    <div style="background-color: #ffffff; padding: 25px; border-radius: 10px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);">
      <h3 style="color: #333; font-size: 20px; margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 10px;">Message Details</h3>
      <p style="font-size: 16px; line-height: 1.6; color: #444;">${message}</p>
    </div>

    <div style="background-color: #ffffff; padding: 25px; border-radius: 10px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);">
      <h3 style="color: #333; font-size: 20px; margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 10px;">Client System Information</h3>
      <p style="margin-bottom: 8px; font-size: 14px; color: #666;"><strong>Country:</strong> ${
        systemInfo?.country || "N/A"
      }</p>
      <p style="margin-bottom: 8px; font-size: 14px; color: #666;"><strong>Timezone:</strong> ${
        systemInfo?.timezone || "N/A"
      }</p>
      <p style="margin-bottom: 8px; font-size: 14px; color: #666;"><strong>User Agent:</strong> ${
        systemInfo?.userAgent || "N/A"
      }</p>
      <p style="margin-bottom: 0; font-size: 14px; color: #666;"><strong>Data Storage:</strong> <span style="color: ${
        sheetDbSuccess ? "#10B981" : "#EF4444"
      }; font-weight: 600;">${
        sheetDbSuccess ? "✓ SheetDB + Email" : "Email Only"
      }</span></p>
    </div>

    <div style="text-align: center; margin-top: 25px; font-size: 13px; color: #888;">
      <p>&copy; 2025 BookOne. All rights reserved.</p>
    </div>
  </div>

      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: `Thanks for this, ${name}. We'll get back to you soon.`,
      dataStored: sheetDbSuccess ? "SheetDB + Email" : "Email Only",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Failed to process your request.",
        dataStored: "None",
      },
      { status: 500 }
    );
  }
}
