// pages/api/contact.js
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  const body = await request.json();
  const { name, email, message, service, systemInfo } = body; // <-- add systemInfo
  if (!name || !email || !message || !service) {
    return NextResponse.json(
      { success: false, error: "Missing required fields" },
      { status: 400 }
    );
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
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

  <div style="background-color: #ffffff; padding: 25px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);">
    <h3 style="color: #333; font-size: 20px; margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 10px;">Client System Information</h3>
    <p style="margin-bottom: 8px; font-size: 14px; color: #666;"><strong>System Name:</strong> ${
      systemInfo?.systemName || "N/A"
    }</p>
    <p style="margin-bottom: 8px; font-size: 14px; color: #666;"><strong>Operating System:</strong> ${
      systemInfo?.os || "N/A"
    }</p>
    <p style="margin-bottom: 8px; font-size: 14px; color: #666;"><strong>Manufacturer:</strong> ${
      systemInfo?.manufacturer || "N/A"
    }</p>
    <p style="margin-bottom: 8px; font-size: 14px; color: #666;"><strong>Country:</strong> ${
      systemInfo?.country || "N/A"
    }</p>
    <p style="margin-bottom: 8px; font-size: 14px; color: #666;"><strong>User Agent:</strong> ${
      systemInfo?.userAgent || "N/A"
    }</p>
    <p style="margin-bottom: 0; font-size: 14px; color: #666;"><strong>Timezone:</strong> ${
      systemInfo?.timezone || "N/A"
    }</p>
  </div>

  <div style="text-align: center; margin-top: 25px; font-size: 13px; color: #888;">
    <p>&copy; 2025 BookOne. All rights reserved.</p>
  </div>
</div>

    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({
      success: true,
      message: `Thanks for this, ${name}. We'll get back to you soon.`,
    });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json(
      { success: false, error: "Email failed to send." },
      { status: 500 }
    );
  }
}
