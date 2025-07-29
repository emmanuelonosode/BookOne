import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  const body = await request.json();
  const { email } = body;

  if (!email || !email.includes("@")) {
    return NextResponse.json(
      { success: false, error: "Invalid email" },
      { status: 400 }
    );
  }

  try {
    // Save email to SheetDB
    const response = await fetch(process.env.SHEETDB_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: [{ email }] }),
    });

    if (!response.ok) {
      throw new Error("Failed to store email");
    }

    // ✅ Send response immediately
    const res = NextResponse.json({
      success: true,
      message: "You're subscribed!",
    });

    // ⏳ Send email in background (no await)
    void sendConfirmationEmail(email);

    return res;
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error?.message || "Something went wrong" },
      { status: 500 }
    );
  }
}

// Background email sending function
async function sendConfirmationEmail(email) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: "🎉 Thanks for Subscribing!",
      html: `
       <div style="font-family: 'Inter', sans-serif; background-color: #f8f8f8; padding: 20px; border-radius: 12px; max-width: 600px; margin: 20px auto; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);">
  <div style="text-align: center; margin-bottom: 25px;">
    <img src="https://placehold.co/100x100/6B46C1/FFFFFF?text=BookOne" alt="BookOne Logo" style="width: 80px; height: 80px; margin-bottom: 15px; border-radius: 50%;">
    <h2 style="color: #6B46C1; font-size: 28px; margin-bottom: 10px; font-weight: 700;">Welcome to BookOne!</h2>
    <p style="color: #555; font-size: 15px;">Thank you for joining our community.</p>
  </div>

  <div style="background-color: #ffffff; padding: 25px; border-radius: 10px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);">
    <p style="font-size: 16px; line-height: 1.6; color: #444; margin-bottom: 15px;">
      Hi there 👋
    </p>
    <p style="font-size: 16px; line-height: 1.6; color: #444; margin-bottom: 15px;">
      Thank you for subscribing to the BookOne newsletter! We're thrilled to have you on board.
    </p>
    <p style="font-size: 16px; line-height: 1.6; color: #444; margin-bottom: 0;">
      You'll now be the first to receive our latest insights on web solutions, AI automation, and exclusive content designed to help your business thrive. Get ready for smart reads, once a week.
    </p>
  </div>

  <div style="text-align: center; margin-top: 30px; margin-bottom: 20px;">
    <a href="https://lkgdca7gsivoowsxmk5fxvbqjy.srv.us/blogs" style="display: inline-block; background-color: #805AD5; color: #ffffff; padding: 12px 25px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px; box-shadow: 0 4px 8px rgba(128, 90, 213, 0.3);">
      Explore Our Latest Blogs
    </a>
  </div>

  <div style="text-align: center; margin-top: 25px; font-size: 13px; color: #888;">
    <p>Sent from BookOne.</p>
    <p>&copy; 2025 BookOne. All rights reserved.</p>
    <p style="margin-top: 10px;">
      <a href="https://lkgdca7gsivoowsxmk5fxvbqjy.srv.us/privacy-policy" style="color: #888; text-decoration: underline;">Privacy Policy</a> |
      <a href="https://lkgdca7gsivoowsxmk5fxvbqjy.srv.us/terms-of-service" style="color: #888; text-decoration: underline;">Terms of Service</a>
    </p>
  </div>
</div>

      `, // your full HTML here
    });
  } catch (error) {
    console.error("Failed to send email:", error.message);
    // You can log this error to Sentry or another monitoring tool
  }
}
