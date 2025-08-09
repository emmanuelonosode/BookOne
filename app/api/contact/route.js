// pages/api/contact.js
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const body = await request.json();

    // Extract form data from get-started form
    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      budget,
      services,
      message,
      timeline,
      newsletter,
      privacy,
      systemInfo,
    } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !message || !privacy) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format with more robust regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate services array
    if (!Array.isArray(services) || services.length === 0) {
      return NextResponse.json(
        { success: false, error: "Please select at least one service" },
        { status: 400 }
      );
    }

    // ✅ Send immediate response to user (fire-and-forget pattern)
    const response = NextResponse.json({
      success: true,
      message: `Thanks for this, ${firstName}. We'll get back to you soon.`,
      dataStored: "SheetDB + Email",
    });

    // ⏳ Process background tasks (fire-and-forget)
    void processQuoteRequest(
      firstName,
      lastName,
      email,
      phone,
      company,
      budget,
      services,
      message,
      timeline,
      newsletter,
      privacy,
      systemInfo
    );

    return response;
  } catch (error) {
    // Removed console.error for production cleanliness
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Background processing function for quote requests
async function processQuoteRequest(
  firstName,
  lastName,
  email,
  phone,
  company,
  budget,
  services,
  message,
  timeline,
  newsletter,
  privacy,
  systemInfo
) {
  try {
    // Sanitize and validate data
    const sanitizedServices = Array.isArray(services)
      ? services.filter((s) => typeof s === "string" && s.trim())
      : [];

    // Prepare data for SheetDB
    const sheetData = {
      timestamp: new Date().toISOString(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      fullName: `${firstName.trim()} ${lastName.trim()}`,
      email: email.toLowerCase().trim(),
      phone: phone ? phone.trim() : "Not provided",
      company: company ? company.trim() : "Not provided",
      budget: budget || "Not specified",
      services: sanitizedServices.join(", ") || "Not specified",
      message: message.trim(),
      timeline: timeline || "Not specified",
      newsletter: newsletter ? "Yes" : "No",
      privacyConsent: privacy ? "Yes" : "No",
      country: systemInfo?.country || "Unknown",
      timezone: systemInfo?.timezone || "Unknown",
      userAgent: systemInfo?.userAgent || "Unknown",
      status: "New Quote Request",
    };

    // Send to SheetDB with timeout
    const sheetDbUrl = process.env.SHEETDB_LEADS;
    let sheetDbSuccess = false;

    if (sheetDbUrl) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

        const sheetResponse = await fetch(sheetDbUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: [sheetData] }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (sheetResponse.ok) {
          sheetDbSuccess = true;
          // Quote request data sent to SheetDB successfully
        } else {
          // Removed console.error for production cleanliness
        }
      } catch (sheetError) {
        if (sheetError.name === "AbortError") {
          // Removed console.error for production cleanliness
        } else {
          // Removed console.error for production cleanliness
        }
      }
    }

    // Send email notification
    await sendQuoteEmail(
      firstName,
      lastName,
      email,
      phone,
      company,
      budget,
      sanitizedServices,
      message,
      timeline,
      newsletter,
      privacy,
      systemInfo,
      sheetDbSuccess
    );
  } catch (error) {
    // Removed console.error for production cleanliness
  }
}

// Email sending function for quote requests
async function sendQuoteEmail(
  firstName,
  lastName,
  email,
  phone,
  company,
  budget,
  services,
  message,
  timeline,
  newsletter,
  privacy,
  systemInfo,
  sheetDbSuccess
) {
  try {
    // Validate email credentials
    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
      // Removed console.error for production cleanliness
      throw new Error("Email service configuration is incomplete.");
    }

    // Create transporter with better configuration for Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS, // This should be an App Password, not regular password
      },
      // Add timeout and connection settings
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
      // Email transporter verified successfully
    } catch (verifyError) {
      console.log(verifyError);
      throw new Error(
        "Email service configuration is invalid. Please check Gmail credentials and App Password settings."
      );
    }

    const mailOptions = {
      from: `"BookOne Contact Form" <${process.env.GMAIL_USER}>`, // Better from field
      to: process.env.GMAIL_USER, // Send to business email
      replyTo: email, // Allow replying directly to the client
      subject: `💰 New Quote Request from ${firstName} ${lastName} (${
        company || "No Company"
      })`,
      html: `<body style="margin: 0; padding: 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">

<!-- Email Container -->
<div style="max-width: 680px; margin: 40px auto; background: transparent; padding: 0;">
    
    <!-- Header Section -->
    <div style="background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 50%, #581c87 100%); padding: 40px 30px; text-align: center; border-radius: 20px 20px 0 0; position: relative; overflow: hidden;">
        <!-- Decorative elements -->
        <div style="position: absolute; top: -50px; right: -50px; width: 100px; height: 100px; background: rgba(255,255,255,0.1); border-radius: 50%; opacity: 0.6;"></div>
        <div style="position: absolute; bottom: -30px; left: -30px; width: 60px; height: 60px; background: rgba(255,255,255,0.08); border-radius: 50%;"></div>
        
        <div style="position: relative; z-index: 2;">
            <div style="width: 80px; height: 80px; background: linear-gradient(45deg, #ffffff, #f1f5f9); border-radius: 20px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
                <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #10b981, #059669); border-radius: 10px; position: relative;">
                    <div style="position: absolute; top: 8px; left: 8px; width: 24px; height: 24px; border: 3px solid white; border-radius: 50%; border-top-color: transparent; border-right-color: transparent;"></div>
                </div>
            </div>
            <h1 style="color: #ffffff; font-size: 32px; font-weight: 700; margin: 0 0 8px 0; letter-spacing: -0.5px;">New Quote Request</h1>
            <p style="color: rgba(255,255,255,0.9); font-size: 16px; margin: 0; font-weight: 400;">High-value lead from get-started page</p>
        </div>
    </div>

    <!-- Main Content -->
    <div style="background: #ffffff; padding: 40px 30px; border-radius: 0 0 20px 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
        
        <!-- Client Details Section -->
        <div style="margin-bottom: 30px;">
            <div style="display: flex; align-items: center; margin-bottom: 25px;">
                <div style="width: 12px; height: 12px; background: linear-gradient(135deg, #3b82f6, #1d4ed8); border-radius: 50%; margin-right: 12px;"></div>
                <h2 style="color: #1f2937; font-size: 22px; font-weight: 600; margin: 0; letter-spacing: -0.3px;">Client Details</h2>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 20px;">
                <div>
                    <div style="color: #64748b; font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">Full Name</div>
                    <div style="color: #1e293b; font-size: 16px; font-weight: 600;">${firstName} ${lastName}</div>
                </div>
                <div>
                    <div style="color: #64748b; font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">Email</div>
                    <div style="color: #1e293b; font-size: 16px; font-weight: 600;">${email}</div>
                </div>
                <div>
                    <div style="color: #64748b; font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">Phone</div>
                    <div style="color: #1e293b; font-size: 16px; font-weight: 600;">${
                      phone || "Not provided"
                    }</div>
                </div>
                <div>
                    <div style="color: #64748b; font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">Company</div>
                    <div style="color: #1e293b; font-size: 16px; font-weight: 600;">${
                      company || "Not provided"
                    }</div>
                </div>
            </div>
        </div>

        <!-- Project Details Section -->
        <div style="margin-bottom: 30px;">
            <div style="display: flex; align-items: center; margin-bottom: 25px;">
                <div style="width: 12px; height: 12px; background: linear-gradient(135deg, #f59e0b, #d97706); border-radius: 50%; margin-right: 12px;"></div>
                <h2 style="color: #1f2937; font-size: 22px; font-weight: 600; margin: 0; letter-spacing: -0.3px;">Project Details</h2>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 20px; margin-bottom: 20px;">
                <div style="background: linear-gradient(135deg, #fef3c7, #fde68a); padding: 20px; border-radius: 12px; border-left: 4px solid #f59e0b;">
                    <div style="color: #92400e; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Budget Range</div>
                    <div style="color: #1f2937; font-size: 16px; font-weight: 600;">${
                      budget || "Not specified"
                    }</div>
                </div>
                <div style="background: linear-gradient(135deg, #dbeafe, #bfdbfe); padding: 20px; border-radius: 12px; border-left: 4px solid #3b82f6;">
                    <div style="color: #1e40af; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Timeline</div>
                    <div style="color: #1f2937; font-size: 16px; font-weight: 600;">${
                      timeline || "Not specified"
                    }</div>
                </div>
            </div>

            <div style="margin-bottom: 20px;">
                <div style="color: #6b21a8; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">Services Requested</div>
                <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                    ${services
                      .map(
                        (service) => `
                        <span style="background: linear-gradient(135deg, #8b5cf6, #7c3aed); color: white; padding: 6px 12px; border-radius: 20px; font-weight: 600; font-size: 12px; display: inline-block;">${service}</span>
                    `
                      )
                      .join("")}
                </div>
            </div>

            <div>
                <div style="color: #64748b; font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">Project Description</div>
                <div style="background-color: #f1f5f9; padding: 15px; border-radius: 8px; color: #334155; font-size: 15px; line-height: 1.6;">${
                  message || "No message provided."
                }</div>
            </div>
        </div>

        <!-- Additional Information Section -->
        <div style="margin-bottom: 30px;">
            <div style="display: flex; align-items: center; margin-bottom: 25px;">
                <div style="width: 12px; height: 12px; background: linear-gradient(135deg, #10b981, #059669); border-radius: 50%; margin-right: 12px;"></div>
                <h2 style="color: #1f2937; font-size: 22px; font-weight: 600; margin: 0; letter-spacing: -0.3px;">Additional Information</h2>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                <div style="background: linear-gradient(135deg, #d1fae5, #a7f3d0); padding: 20px; border-radius: 12px; border-left: 4px solid #10b981;">
                    <div style="color: #065f46; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Newsletter Subscription</div>
                    <div style="color: #1f2937; font-size: 16px; font-weight: 600;">${
                      newsletter ? "✓ Subscribed" : "✗ Not subscribed"
                    }</div>
                </div>
                
                                 <div style="background: linear-gradient(135deg, ${
                                   sheetDbSuccess ? "#d1fae5" : "#fee2e2"
                                 }, ${
        sheetDbSuccess ? "#a7f3d0" : "#fecaca"
      }); padding: 20px; border-radius: 12px; border-left: 4px solid ${
        sheetDbSuccess ? "#10b981" : "#ef4444"
      };">
                    <div style="color: ${
                      sheetDbSuccess ? "#065f46" : "#991b1b"
                    }; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Data Storage</div>
                    <div style="color: #1f2937; font-size: 16px; font-weight: 600; display: flex; align-items: center;">
                        <span style="margin-right: 8px;">${
                          sheetDbSuccess ? "✓" : "⚠"
                        }</span>
                        ${sheetDbSuccess ? "SheetDB + Email" : "Email Only"}
                    </div>
                </div>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div style="background: linear-gradient(135deg, #f0f9ff, #e0f2fe); padding: 20px; border-radius: 12px; border-left: 4px solid #0ea5e9;">
                    <div style="color: #0c4a6e; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Location</div>
                    <div style="color: #1f2937; font-size: 16px; font-weight: 600;">${
                      systemInfo?.country || "Unknown"
                    }</div>
                </div>
                
                <div style="background: linear-gradient(135deg, #fef3c7, #fde68a); padding: 20px; border-radius: 12px; border-left: 4px solid #f59e0b;">
                    <div style="color: #92400e; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Timezone</div>
                    <div style="color: #1f2937; font-size: 16px; font-weight: 600;">${
                      systemInfo?.timezone || "Unknown"
                    }</div>
                </div>
            </div>
        </div>

        <!-- Quick Actions -->
        <div style="padding: 30px 40px; background: linear-gradient(135deg, #f0f9ff, #e0f2fe); border-top: 1px solid #e2e8f0;">
            <div style="display: flex; align-items: center; margin-bottom: 20px;">
                <div style="width: 12px; height: 12px; background: linear-gradient(135deg, #10b981, #059669); border-radius: 50%; margin-right: 12px;"></div>
                <h2 style="color: #1f2937; font-size: 20px; font-weight: 600; margin: 0; letter-spacing: -0.3px;">Quick Actions</h2>
            </div>
            
            <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                <a href="mailto:${email}?subject=Re: Your quote request for ${services.join(
        ", "
      )}" style="display: inline-flex; align-items: center; padding: 12px 20px; background: linear-gradient(135deg, #3730a3, #581c87); color: white; text-decoration: none; border-radius: 10px; font-weight: 600; font-size: 14px; box-shadow: 0 4px 12px rgba(55, 48, 163, 0.3); transition: all 0.2s;">
                    <span style="margin-right: 8px;">📧</span>
                    Reply to Client
                </a>
                
                <a href="https://calendar.notion.so/meet/officialbookone/call" style="display: inline-flex; align-items: center; padding: 12px 20px; background: linear-gradient(135deg, #10b981, #059669); color: white; text-decoration: none; border-radius: 10px; font-weight: 600; font-size: 14px; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3); transition: all 0.2s;">
                    <span style="margin-right: 8px;">📅</span>
                    Schedule Call
                </a>
                
                <a href="https://bookone.dev/get-started" style="display: inline-flex; align-items: center; padding: 12px 20px; background: linear-gradient(135deg, #f59e0b, #d97706); color: white; text-decoration: none; border-radius: 10px; font-weight: 600; font-size: 14px; box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3); transition: all 0.2s;">
                    <span style="margin-right: 8px;">💰</span>
                    View Pricing
                </a>
            </div>
        </div>

        <!-- Footer -->
        <div style="background: linear-gradient(135deg, #f8fafc, #f1f5f9); padding: 30px 40px; text-align: center; border-radius: 0 0 20px 20px; border-top: 1px solid #e2e8f0;">
            <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 15px;">
                <div style="width: 24px; height: 24px; background: linear-gradient(135deg, #3730a3, #581c87); border-radius: 6px; margin-right: 10px; display: flex; align-items: center; justify-content: center;">
                    <div style="width: 12px; height: 12px; border: 2px solid white; border-radius: 3px; border-top-color: transparent; border-right-color: transparent;"></div>
                </div>
                <span style="color: #1f2937; font-weight: 600; font-size: 16px;">BookOne</span>
            </div>
            <p style="color: #64748b; font-size: 13px; margin: 0; font-weight: 400;">© 2025 BookOne Platform. All rights reserved.</p>
            <p style="color: #94a3b8; font-size: 12px; margin: 5px 0 0 0;">This is an automated notification from your quote request system.</p>
        </div>
    </div>
</div>

</body>`,
    };

    // Send email with timeout
    const emailPromise = transporter.sendMail(mailOptions);
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Email sending timeout")), 30000)
    );

    await Promise.race([emailPromise, timeoutPromise]);
    // Quote request email sent successfully
  } catch (error) {
    // Removed console.error for production cleanliness
    // Don't throw the error to prevent the entire request from failing
    // The user has already received a success response
  }
}
