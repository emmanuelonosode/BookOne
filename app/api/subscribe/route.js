import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email } = body;

    // Better email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    const sanitizedEmail = email.toLowerCase().trim();

    // In production, implement proper rate limiting with Redis or similar
    // For now, we'll proceed with the request

    // Save email to SheetDB with timeout
    let sheetDbSuccess = false;
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

      const response = await fetch(process.env.SHEETDB_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: [
            {
              email: sanitizedEmail,
              timestamp: new Date().toISOString(),
              source: "website_subscription",
            },
          ],
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        sheetDbSuccess = true;
        // Email subscription saved to SheetDB successfully
      } else {
        console.error("SheetDB Error:", await response.text());
        // Continue with email sending even if SheetDB fails
      }
    } catch (sheetError) {
      if (sheetError.name === "AbortError") {
        console.error("SheetDB request timed out");
      } else {
        console.error("SheetDB Error:", sheetError);
      }
      // Continue with email sending even if SheetDB fails
    }

    // ✅ Send response immediately
    const res = NextResponse.json({
      success: true,
      message: "You're subscribed! Check your email for confirmation.",
      dataStored: sheetDbSuccess ? "SheetDB + Email" : "Email Only",
    });

    // ⏳ Send email in background (no await)
    void sendConfirmationEmail(sanitizedEmail);

    return res;
  } catch (error) {
    console.error("Subscribe API Error:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

// Background email sending function
async function sendConfirmationEmail(email) {
  try {
    // Validate email credentials
    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
      console.error("Missing Gmail credentials for newsletter subscription");
      return;
    }

    // Create transporter with better configuration for Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS, // This should be an App Password, not regular password
      },
      // Add timeout settings
      connectionTimeout: 15000,
      greetingTimeout: 15000,
      socketTimeout: 15000,
      // Additional settings for better reliability
      pool: true,
      maxConnections: 1,
      maxMessages: 3,
      rateLimit: 1, // Limit to 1 email per second
    });

    // Verify transporter configuration
    try {
      await transporter.verify();
      // Newsletter email transporter verified successfully
    } catch (verifyError) {
      console.error(
        "Newsletter email transporter verification failed:",
        verifyError
      );
      throw new Error(
        "Email service configuration is invalid. Please check Gmail credentials and App Password settings."
      );
    }

    const mailOptions = {
      from: `"BookOne Newsletter" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "🎉 Thanks for Subscribing to BookOne!",
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
    <a href="https://bookone.dev/blogs" style="display: inline-block; background-color: #805AD5; color: #ffffff; padding: 12px 25px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px; box-shadow: 0 4px 8px rgba(128, 90, 213, 0.3);">
      Explore Our Latest Blogs
    </a>
  </div>

  <div style="text-align: center; margin-top: 25px; font-size: 13px; color: #888;">
    <p>Sent from BookOne.</p>
    <p>&copy; 2025 BookOne. All rights reserved.</p>
    <p style="margin-top: 10px;">
      <a href="https://bookone.dev/privacy-policy" style="color: #888; text-decoration: underline;">Privacy Policy</a> |
      <a href="https://bookone.dev/terms-and-conditions" style="color: #888; text-decoration: underline;">Terms of Service</a>
    </p>
  </div>
</div>
      `,
    };

    // Send email with timeout
    const emailPromise = transporter.sendMail(mailOptions);
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Email sending timeout")), 30000)
    );

    await Promise.race([emailPromise, timeoutPromise]);
    // Newsletter confirmation email sent successfully
  } catch (error) {
    console.error(
      "Failed to send newsletter confirmation email:",
      error.message
    );
    // In production, you might want to log this to a monitoring service
  }
}
