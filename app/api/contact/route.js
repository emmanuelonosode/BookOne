import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import axios from "axios";

export const runtime = "nodejs"; // crucial for nodemailer

export async function POST(req) {
  try {
    const { firstName, lastName, email, previousWebsite, services, budget, referralSource, message } =
      await req.json();

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: "Required fields are missing" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Check for required environment variables
    if (!process.env.SHEETDB_API_URL && !process.env.SHEETDB_LEADS) {
      console.error("SheetDB API URLs are not configured");
    }

    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
      console.error("Email credentials are not configured");
    }

    // Try to save to SheetDB if URL is configured
    if (process.env.SHEETDB_LEADS) {
      try {
        await axios.post(process.env.SHEETDB_LEADS, {
          data: [
            {
              firstName,
              lastName,
              previousWebsite: previousWebsite || "",
              email,
              message,
              services: Array.isArray(services)
                ? services.join(", ")
                : services || "",
              budget: budget || "",
              referralSource: referralSource || "",
              timestamp: new Date().toISOString(),
            },
          ],
        });
      } catch (error) {
        console.error("SheetDB Error:", error.message);
        // Continue execution even if SheetDB fails
      }
    }

    let emailSent = false;

    // Send notification email to site owner (avoid sending to submitter directly)
    // Use replyTo so owner can reply to the submitter. Implement small retry/backoff for transient errors.
    if (process.env.GMAIL_USER && process.env.GMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS,
        },
      });

      const mailOptions = {
        from: `"BookOne" <${process.env.GMAIL_USER}>`,
        to: process.env.GMAIL_USER, // send to site owner
        subject: `New contact from ${firstName} ${lastName}`,
        replyTo: email,
        html: `
          <h3>New message from contact form</h3>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Previous Website:</strong> ${previousWebsite || "N/A"}</p>
          <p><strong>Services:</strong> ${
            Array.isArray(services) ? services.join(", ") : services || "N/A"
          }</p>
          <p><strong>Budget:</strong> ${budget || "N/A"}</p>
          <p><strong>Referral Source:</strong> ${referralSource || "N/A"}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br />")}</p>
        `,
      };

      const maxAttempts = 3;
      let attempt = 0;
      let lastError = null;

      while (attempt < maxAttempts) {
        try {
          attempt++;
          await transporter.sendMail(mailOptions);
          emailSent = true;
          break;
        } catch (err) {
          lastError = err;
          // Check for transient SMTP response codes (4xx) in message
          const msg = (err && err.response) || (err && err.message) || "";
          console.error(`Email send attempt ${attempt} failed:`, msg);
          // If transient (450, 421, 4.2.1), wait and retry
          if (/4\d{2}|450|421|4\.2\.1/.test(String(msg))) {
            // exponential backoff (ms)
            const delay = 500 * Math.pow(2, attempt - 1);
            await new Promise((res) => setTimeout(res, delay));
            continue;
          } else {
            // Non-transient, stop retrying
            break;
          }
        }
      }

      if (!emailSent && lastError) {
        console.error("Final email error:", lastError);
      }
    }

    // Return appropriate response
    return NextResponse.json({
      success: true,
      message: "Your message has been received!",
      details: {
        sheetDB: process.env.SHEETDB_LEADS
          ? "Saved to database"
          : "Database not configured",
        email: emailSent
          ? "Notification sent to owner"
          : "Notification not sent",
      },
    });
  } catch (error) {
    console.error("Error in contact route:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong. Please try again later.",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
