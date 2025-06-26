// pages/api/contact.js
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import os from "os"
export async function POST(request) {
  const body = await request.json();
  const { name, email, message, service } = body;

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
      <div style="font-family:sans-serif;">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <p>${os.hostname}</p>
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
