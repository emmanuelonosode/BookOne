import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email } = body;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    const sanitizedEmail = email.toLowerCase().trim();

    // Save to SheetDB with timeout
    let sheetDbSuccess = false;
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const response = await fetch(process.env.SHEETDB_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: [{
            email: sanitizedEmail,
            timestamp: new Date().toISOString(),
            source: "website_subscription",
          }],
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      if (response.ok) sheetDbSuccess = true;
    } catch {
      // Continue even if SheetDB fails
    }

    // Respond immediately
    const res = NextResponse.json({
      success: true,
      message: "You're subscribed! Check your email for confirmation.",
      dataStored: sheetDbSuccess ? "SheetDB + Email" : "Email Only",
    });

    // Send confirmation in background
    void sendConfirmationEmail(sanitizedEmail);

    return res;
  } catch {
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

async function sendConfirmationEmail(email) {
  try {
    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) return;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
      connectionTimeout: 15000,
      greetingTimeout: 15000,
      socketTimeout: 15000,
      pool: true,
      maxConnections: 1,
      maxMessages: 3,
      rateLimit: 1,
    });

    try {
      await transporter.verify();
    } catch {
      return;
    }

    const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:Georgia,serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a;padding:40px 20px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#0a0a0a;">

      <!-- Header -->
      <tr>
        <td style="background-color:#080808;padding:36px;border-bottom:1px solid #1a1a1a;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <span style="font-family:Georgia,serif;font-weight:900;font-size:22px;color:#ffffff;letter-spacing:0.1em;">BOOKONE STUDIO</span>
              </td>
              <td align="right" valign="middle">
                <span style="display:inline-block;width:8px;height:8px;background-color:#E8FF47;border-radius:50%;"></span>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding:40px 36px 0;">
          <p style="font-family:Georgia,serif;font-size:26px;font-weight:700;color:#ffffff;margin:0 0 16px;">You're in.</p>
          <p style="font-family:Georgia,serif;font-size:16px;line-height:1.75;color:#888;margin:0 0 12px;">
            Thanks for subscribing to the Bookone Studio newsletter. You'll be the first to receive our latest thinking on web design, AI automation, and digital strategy — once a week, no spam.
          </p>
          <p style="font-family:Georgia,serif;font-size:16px;line-height:1.75;color:#888;margin:0;">
            In the meantime, explore what we've been building.
          </p>
        </td>
      </tr>

      <!-- CTA -->
      <tr>
        <td style="padding:36px;">
          <a
            href="https://bookone.dev/blogs"
            style="display:inline-block;border:2px solid #E8FF47;color:#E8FF47;font-family:monospace;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;text-decoration:none;padding:14px 28px;"
          >
            Read Our Latest Blogs →
          </a>
        </td>
      </tr>

      <!-- What to expect -->
      <tr>
        <td style="padding:0 36px 36px;">
          <div style="background-color:#111111;border:1px solid #1e1e1e;padding:24px;">
            <p style="font-family:monospace;font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:#555;margin:0 0 16px;">What to expect</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding-bottom:12px;">
                  <span style="font-family:monospace;font-size:11px;color:#E8FF47;margin-right:12px;">—</span>
                  <span style="font-family:Georgia,serif;font-size:14px;color:#888;">Web design and development insights</span>
                </td>
              </tr>
              <tr>
                <td style="padding-bottom:12px;">
                  <span style="font-family:monospace;font-size:11px;color:#E8FF47;margin-right:12px;">—</span>
                  <span style="font-family:Georgia,serif;font-size:14px;color:#888;">AI automation tips and case studies</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span style="font-family:monospace;font-size:11px;color:#E8FF47;margin-right:12px;">—</span>
                  <span style="font-family:Georgia,serif;font-size:14px;color:#888;">Exclusive offers for subscribers</span>
                </td>
              </tr>
            </table>
          </div>
        </td>
      </tr>

      <!-- Divider -->
      <tr>
        <td style="padding:0 36px;">
          <div style="border-top:1px solid #1a1a1a;"></div>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background-color:#0D0D0D;padding:28px 36px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <p style="font-family:monospace;font-size:9px;letter-spacing:0.15em;text-transform:uppercase;color:#444;margin:0 0 6px;">Bookone Studio Digital Agency</p>
                <p style="font-family:monospace;font-size:9px;letter-spacing:0.1em;color:#333;margin:0 0 4px;">Allen Avenue, Lagos, Nigeria</p>
                <p style="font-family:monospace;font-size:9px;letter-spacing:0.1em;margin:0;">
                  <a href="mailto:hello@bookone.dev" style="color:#444;text-decoration:none;">hello@bookone.dev</a>
                </p>
              </td>
              <td align="right" valign="bottom">
                <p style="font-family:monospace;font-size:9px;letter-spacing:0.1em;margin:0;">
                  <a href="https://bookone.dev/privacy-policy" style="color:#333;text-decoration:none;">Privacy</a>
                  <span style="color:#333;margin:0 6px;">·</span>
                  <a href="https://bookone.dev/terms-and-conditions" style="color:#333;text-decoration:none;">Terms</a>
                </p>
                <p style="font-family:monospace;font-size:8px;letter-spacing:0.1em;color:#2a2a2a;margin:6px 0 0;">
                  You're receiving this because you subscribed at bookone.dev
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;

    const emailPromise = transporter.sendMail({
      from: `"Bookone Studio Newsletter" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "You're subscribed — Bookone Studio",
      html,
    });

    await Promise.race([
      emailPromise,
      new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), 30000)),
    ]);
  } catch {
    // Fail silently
  }
}
