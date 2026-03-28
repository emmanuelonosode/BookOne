import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import axios from "axios";

export const runtime = "nodejs";

function createTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });
}

function formatServices(services) {
  if (Array.isArray(services)) return services.join(", ");
  return services || "N/A";
}

// ─── Email A: Owner Notification ────────────────────────────────────────────
async function sendOwnerNotification(data) {
  const { firstName, lastName, email, previousWebsite, services, budget, referralSource, message } = data;
  const servicesFormatted = formatServices(services);
  const timestamp = new Date().toLocaleString("en-GB", { timeZone: "Africa/Lagos", dateStyle: "full", timeStyle: "short" });

  const servicesListHtml = Array.isArray(services) && services.length
    ? services.map(s => `<tr><td style="padding:4px 0;color:#080808;font-size:13px;font-family:monospace;">— ${s}</td></tr>`).join("")
    : `<tr><td style="padding:4px 0;color:#080808;font-size:13px;font-family:monospace;">— ${servicesFormatted}</td></tr>`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:#f5f5f5;font-family:Georgia,serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;padding:40px 20px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

      <!-- Header -->
      <tr>
        <td style="background-color:#080808;padding:28px 36px;border-left:4px solid #E8FF47;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <span style="font-family:Georgia,serif;font-weight:900;font-size:20px;color:#ffffff;letter-spacing:0.08em;">BOOKONE STUDIO</span>
              </td>
              <td align="right">
                <span style="font-family:monospace;font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:#E8FF47;">New Inquiry</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Subject line -->
      <tr>
        <td style="background-color:#111111;padding:16px 36px;border-bottom:1px solid #222;">
          <span style="font-family:monospace;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#666;">From</span>
          <span style="font-family:Georgia,serif;font-size:16px;color:#ffffff;margin-left:16px;">${firstName} ${lastName}</span>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="background-color:#ffffff;padding:36px;">

          <!-- Fields table -->
          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">

            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;vertical-align:top;width:120px;">
                <span style="font-family:monospace;font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:#999;">Name</span>
              </td>
              <td style="padding:12px 0 12px 16px;border-bottom:1px solid #f0f0f0;">
                <span style="font-family:Georgia,serif;font-size:15px;color:#111;">${firstName} ${lastName}</span>
              </td>
            </tr>

            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;vertical-align:top;">
                <span style="font-family:monospace;font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:#999;">Email</span>
              </td>
              <td style="padding:12px 0 12px 16px;border-bottom:1px solid #f0f0f0;">
                <a href="mailto:${email}" style="font-family:monospace;font-size:14px;color:#080808;text-decoration:none;">${email}</a>
              </td>
            </tr>

            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;vertical-align:top;">
                <span style="font-family:monospace;font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:#999;">Budget</span>
              </td>
              <td style="padding:12px 0 12px 16px;border-bottom:1px solid #f0f0f0;">
                <span style="font-family:Georgia,serif;font-size:15px;color:#111;">${budget || "Not specified"}</span>
              </td>
            </tr>

            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;vertical-align:top;">
                <span style="font-family:monospace;font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:#999;">Services</span>
              </td>
              <td style="padding:12px 0 12px 16px;border-bottom:1px solid #f0f0f0;">
                <table cellpadding="0" cellspacing="0">${servicesListHtml}</table>
              </td>
            </tr>

            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;vertical-align:top;">
                <span style="font-family:monospace;font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:#999;">Referral</span>
              </td>
              <td style="padding:12px 0 12px 16px;border-bottom:1px solid #f0f0f0;">
                <span style="font-family:Georgia,serif;font-size:15px;color:#111;">${referralSource || "Not specified"}</span>
              </td>
            </tr>

            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;vertical-align:top;">
                <span style="font-family:monospace;font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:#999;">Website</span>
              </td>
              <td style="padding:12px 0 12px 16px;border-bottom:1px solid #f0f0f0;">
                <span style="font-family:Georgia,serif;font-size:15px;color:#111;">${previousWebsite || "N/A"}</span>
              </td>
            </tr>

          </table>

          <!-- Message block -->
          <div style="margin-top:28px;border-left:3px solid #E8FF47;padding:16px 20px;background-color:#fafafa;">
            <p style="font-family:monospace;font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:#999;margin:0 0 10px;">Message</p>
            <p style="font-family:Georgia,serif;font-size:15px;line-height:1.7;color:#333;margin:0;white-space:pre-wrap;">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
          </div>

        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background-color:#080808;padding:20px 36px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <span style="font-family:monospace;font-size:9px;letter-spacing:0.15em;text-transform:uppercase;color:#555;">${timestamp} — WAT</span>
              </td>
              <td align="right">
                <span style="font-family:monospace;font-size:9px;letter-spacing:0.15em;text-transform:uppercase;color:#555;">Reply directly to respond</span>
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

  const transporter = createTransporter();
  const maxAttempts = 3;
  let attempt = 0;
  let lastError = null;

  while (attempt < maxAttempts) {
    try {
      attempt++;
      await transporter.sendMail({
        from: `"Bookone Studio Forms" <${process.env.GMAIL_USER}>`,
        to: process.env.GMAIL_USER,
        replyTo: email,
        subject: `New Inquiry — ${firstName} ${lastName} [${servicesFormatted}]`,
        html,
      });
      return;
    } catch (err) {
      lastError = err;
      const msg = String((err && err.response) || (err && err.message) || "");
      if (/4\d{2}|450|421|4\.2\.1/.test(msg)) {
        await new Promise((res) => setTimeout(res, 500 * Math.pow(2, attempt - 1)));
      } else {
        break;
      }
    }
  }

  if (lastError) {
    // Owner notification failed silently — SheetDB has the lead
  }
}

// ─── Email B: Client Auto-Reply ──────────────────────────────────────────────
async function sendClientConfirmation(data) {
  const { firstName, email, services } = data;

  const servicesListHtml = Array.isArray(services) && services.length
    ? services.map(s => `
        <tr>
          <td style="padding:6px 0;">
            <span style="font-family:monospace;font-size:11px;color:#E8FF47;margin-right:10px;">—</span>
            <span style="font-family:Georgia,serif;font-size:14px;color:#aaa;">${s}</span>
          </td>
        </tr>`).join("")
    : `<tr><td style="padding:6px 0;"><span style="font-family:monospace;font-size:11px;color:#E8FF47;margin-right:10px;">—</span><span style="font-family:Georgia,serif;font-size:14px;color:#aaa;">${formatServices(services)}</span></td></tr>`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:Georgia,serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a;padding:40px 20px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#0a0a0a;">

      <!-- Header strip -->
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

      <!-- Greeting -->
      <tr>
        <td style="padding:40px 36px 0;">
          <p style="font-family:Georgia,serif;font-size:26px;font-weight:700;color:#ffffff;margin:0 0 16px;">Hi ${firstName},</p>
          <p style="font-family:Georgia,serif;font-size:16px;line-height:1.75;color:#888;margin:0 0 12px;">
            Thank you for reaching out. We've received your inquiry and will be in touch within <strong style="color:#ccc;">24 hours</strong>.
          </p>
          <p style="font-family:Georgia,serif;font-size:16px;line-height:1.75;color:#888;margin:0;">
            In the meantime, feel free to browse our work — it'll give you a sense of what we build and how we think.
          </p>
        </td>
      </tr>

      <!-- Services summary -->
      <tr>
        <td style="padding:32px 36px 0;">
          <div style="background-color:#111111;border:1px solid #1e1e1e;padding:24px;">
            <p style="font-family:monospace;font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:#555;margin:0 0 16px;">You enquired about</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              ${servicesListHtml}
            </table>
          </div>
        </td>
      </tr>

      <!-- What happens next -->
      <tr>
        <td style="padding:32px 36px 0;">
          <p style="font-family:monospace;font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:#555;margin:0 0 20px;">What happens next</p>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="vertical-align:top;padding-bottom:16px;">
                <span style="font-family:monospace;font-size:11px;color:#E8FF47;font-weight:700;margin-right:14px;">01</span>
                <span style="font-family:Georgia,serif;font-size:14px;color:#888;line-height:1.6;">We review your inquiry and research your project needs.</span>
              </td>
            </tr>
            <tr>
              <td style="vertical-align:top;padding-bottom:16px;">
                <span style="font-family:monospace;font-size:11px;color:#E8FF47;font-weight:700;margin-right:14px;">02</span>
                <span style="font-family:Georgia,serif;font-size:14px;color:#888;line-height:1.6;">We prepare a tailored proposal with scope, timeline, and pricing.</span>
              </td>
            </tr>
            <tr>
              <td style="vertical-align:top;">
                <span style="font-family:monospace;font-size:11px;color:#E8FF47;font-weight:700;margin-right:14px;">03</span>
                <span style="font-family:Georgia,serif;font-size:14px;color:#888;line-height:1.6;">We schedule a brief call to align on everything before we start.</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- CTA -->
      <tr>
        <td style="padding:36px;">
          <a
            href="https://bookone.dev/portfolio"
            style="display:inline-block;border:2px solid #E8FF47;color:#E8FF47;font-family:monospace;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;text-decoration:none;padding:14px 28px;"
          >
            View Our Portfolio →
          </a>
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

  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"Bookone Studio" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "We've received your inquiry — Bookone Studio",
      html,
    });
  } catch {
    // Client auto-reply is best-effort — fail silently
  }
}

// ─── Route Handler ───────────────────────────────────────────────────────────
export async function POST(req) {
  try {
    const { firstName, lastName, email, previousWebsite, services, budget, referralSource, message } =
      await req.json();

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json({ error: "Required fields are missing" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    // Save to SheetDB (fire and forget)
    if (process.env.SHEETDB_LEADS) {
      axios.post(process.env.SHEETDB_LEADS, {
        data: [{
          firstName,
          lastName,
          previousWebsite: previousWebsite || "",
          email,
          message,
          services: Array.isArray(services) ? services.join(", ") : services || "",
          budget: budget || "",
          referralSource: referralSource || "",
          timestamp: new Date().toISOString(),
        }],
      }).catch(() => {});
    }

    // Send both emails in background — do not await
    if (process.env.GMAIL_USER && process.env.GMAIL_PASS) {
      const emailData = { firstName, lastName, email, previousWebsite, services, budget, referralSource, message };
      void sendOwnerNotification(emailData);
      void sendClientConfirmation(emailData);
    }

    return NextResponse.json({ success: true, message: "Your message has been received!" });
  } catch {
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
