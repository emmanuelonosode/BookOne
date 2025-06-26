// pages/api/subscribe.js
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
        <div style="font-family:sans-serif; padding: 10px;">
          <h2>Hi there 👋</h2>
          <p>Thank you for subscribing to our newsletter.</p>
          <p>You’ll be the first to hear about updates and exclusive content.</p>
          <br/>
          <small>Sent from Emmanuel's website</small>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: "You're subscribed!" });
  } catch (err) {
    console.error("SheetDB error:", err);
    return NextResponse.json(
      { success: false, error: "Something went wrong." },
      { status: 500 }
    );
  }
}
