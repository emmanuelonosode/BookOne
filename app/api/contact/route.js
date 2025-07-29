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

  // ✅ Send immediate response to user (fire-and-forget pattern)
  const response = NextResponse.json({
    success: true,
    message: `Thanks for this, ${name}. We'll get back to you soon.`,
  });

  // ⏳ Process background tasks (fire-and-forget)
  void processContactForm(name, email, message, service, systemInfo);

  return response;
}

// Background processing function
async function processContactForm(name, email, message, service, systemInfo) {
  try {
    // Prepare data for SheetDB
    const sheetData = {
      timestamp: new Date().toISOString(),
      name: name,
      email: email,
      service: service,
      message: message,
      country: systemInfo?.country || "Unknown",
      status: "New",
    };

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
          body: JSON.stringify({ data: [sheetData] }),
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

    // Send email
    await sendContactEmail(
      name,
      email,
      message,
      service,
      systemInfo,
      sheetDbSuccess
    );
  } catch (error) {
    console.error("Background contact form processing error:", error);
  }
}

// Email sending function
async function sendContactEmail(
  name,
  email,
  message,
  service,
  systemInfo,
  sheetDbSuccess
) {
  try {
    // Validate email credentials
    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
      console.error("Missing Gmail credentials:", {
        user: process.env.GMAIL_USER ? "Set" : "Missing",
        password: process.env.GMAIL_PASS ? "Set" : "Missing",
      });
      throw new Error("Email service configuration is incomplete.");
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
                <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #3730a3, #581c87); border-radius: 10px; position: relative;">
                    <div style="position: absolute; top: 8px; left: 8px; width: 24px; height: 24px; border: 3px solid white; border-radius: 50%; border-top-color: transparent; border-right-color: transparent;"></div>
                </div>
            </div>
            <h1 style="color: #ffffff; font-size: 32px; font-weight: 700; margin: 0 0 8px 0; letter-spacing: -0.5px;">New Client Inquiry</h1>
            <p style="color: rgba(255,255,255,0.9); font-size: 16px; margin: 0; font-weight: 400;">Received through BookOne platform</p>
        </div>
    </div>

    <!-- Main Content -->
    <div style="background: #ffffff; padding: 0; border-radius: 0 0 20px 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.15);">
        
        <!-- Contact Information Card -->
        <div style="padding: 10px 10px 20px; border-bottom: 1px solid #f1f5f9;">
            <div style="display: flex; align-items: center; margin-bottom: 25px;">
                <div style="width: 12px; height: 12px; background: linear-gradient(135deg, #10b981, #059669); border-radius: 50%; margin-right: 12px;"></div>
                <h2 style="color: #1f2937; font-size: 22px; font-weight: 600; margin: 0; letter-spacing: -0.3px;">Contact Information</h2>
            </div>
            
            <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); padding: 10px; border-radius: 16px; border: 1px solid #e2e8f0;">
                <div style="margin-bottom: 20px;">
                    <div style="color: #64748b; font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">Client Name</div>
                    <div style="color: #1e293b; font-size: 18px; font-weight: 600;">${name}</div>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <div style="color: #64748b; font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">Email Address</div>
                    <a href="mailto:${email}" style="color: #3730a3; font-size: 16px; font-weight: 500; text-decoration: none; display: inline-flex; align-items: center; padding: 8px 16px; background: rgba(55, 48, 163, 0.1); border-radius: 8px; transition: all 0.2s;">${email}</a>
                </div>
                
                <div>
                    <div style="color: #64748b; font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">Service Requested</div>
                    <span style="background: linear-gradient(135deg, #3730a3, #581c87); color: white; padding: 10px 18px; border-radius: 25px; font-weight: 600; font-size: 14px; display: inline-block; box-shadow: 0 4px 12px rgba(55, 48, 163, 0.3);">${service}</span>
                </div>
            </div>
        </div>

        <!-- Message Section -->
        <div style="padding: 10px 10px 20px; border-bottom: 1px solid #f1f5f9;">
            <div style="display: flex; align-items: center; margin-bottom: 25px;">
                <div style="width: 12px; height: 12px; background: linear-gradient(135deg, #f59e0b, #d97706); border-radius: 50%; margin-right: 12px;"></div>
                <h2 style="color: #1f2937; font-size: 22px; font-weight: 600; margin: 0; letter-spacing: -0.3px;">Message Details</h2>
            </div>
            
            <div style="background: #ffffff; border: 2px solid #f1f5f9; border-radius: 16px; padding: 30px; position: relative;">
                <div style="position: absolute; top: -1px; left: 20px; width: 40px; height: 2px; background: linear-gradient(90deg, #f59e0b, #d97706);"></div>
                <p style="color: #374151; font-size: 16px; line-height: 1.7; margin: 0; font-weight: 400;">${message}</p>
            </div>
        </div>

        <!-- System Information -->
        <div style="padding: 10px 10px 20px;">
            <div style="display: flex; align-items: center; margin-bottom: 25px;">
                <div style="width: 12px; height: 12px; background: linear-gradient(135deg, #6366f1, #4f46e5); border-radius: 50%; margin-right: 12px;"></div>
                <h2 style="color: #1f2937; font-size: 22px; font-weight: 600; margin: 0; letter-spacing: -0.3px;">System Information</h2>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                <div style="background: linear-gradient(135deg, #fef3c7, #fde68a); padding: 20px; border-radius: 12px; border-left: 4px solid #f59e0b;">
                    <div style="color: #92400e; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Location</div>
                    <div style="color: #1f2937; font-size: 16px; font-weight: 600;">${
                      systemInfo?.country || "Unknown"
                    }</div>
                </div>
                
                <div style="background: linear-gradient(135deg, #dbeafe, #bfdbfe); padding: 20px; border-radius: 12px; border-left: 4px solid #3b82f6;">
                    <div style="color: #1e40af; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Timestamp</div>
                    <div style="color: #1f2937; font-size: 16px; font-weight: 600;">${new Date().toLocaleString()}</div>
                </div>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
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
                
                <div style="background: linear-gradient(135deg, #f3e8ff, #e9d5ff); padding: 20px; border-radius: 12px; border-left: 4px solid #8b5cf6;">
                    <div style="color: #6b21a8; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Priority</div>
                    <div style="color: #1f2937; font-size: 16px; font-weight: 600; display: flex; align-items: center;">
                        <span style="margin-right: 8px;">🔴</span>
                        High Priority
                    </div>
                </div>
            </div>
        </div>

        <!-- Quick Actions -->
        <div style="padding: 30px 40px; background: linear-gradient(135deg, #f0f9ff, #e0f2fe); border-top: 1px solid #e2e8f0;">
            <div style="display: flex; align-items: center; margin-bottom: 20px;">
                <div style="width: 12px; height: 12px; background: linear-gradient(135deg, #10b981, #059669); border-radius: 50%; margin-right: 12px;"></div>
                <h2 style="color: #1f2937; font-size: 20px; font-weight: 600; margin: 0; letter-spacing: -0.3px;">Quick Actions</h2>
            </div>
            
            <div style="">
                <a href="mailto:${email}?subject=Re: Your inquiry about ${service}" style="display: inline-flex; align-items: center; padding: 12px 20px; background: linear-gradient(135deg, #3730a3, #581c87); color: white; text-decoration: none; border-radius: 10px; font-weight: 600; font-size: 14px; box-shadow: 0 4px 12px rgba(55, 48, 163, 0.3); transition: all 0.2s;">
                    <span style="margin-right: 8px;">📧</span>
                    Reply to Client
                </a>
                
                <a href="https://bookone.dev/portfolio" style="display: inline-flex; align-items: center; padding: 12px 20px; background: linear-gradient(135deg, #10b981, #059669); color: white; text-decoration: none; border-radius: 10px; font-weight: 600; font-size: 14px; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3); transition: all 0.2s;">
                    <span style="margin-right: 8px;">💼</span>
                    View Portfolio
                </a>
                
                <a href="https://bookone.dev/services" style="display: inline-flex; align-items: center; padding: 12px 20px; background: linear-gradient(135deg, #f59e0b, #d97706); color: white; text-decoration: none; border-radius: 10px; font-weight: 600; font-size: 14px; box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3); transition: all 0.2s;">
                    <span style="margin-right: 8px;">⚙️</span>
                    Services Info
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
            <p style="color: #94a3b8; font-size: 12px; margin: 5px 0 0 0;">This is an automated notification from your inquiry system.</p>
        </div>
    </div>
</div>

</body>`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Contact email sent successfully");
  } catch (error) {
    console.error("Failed to send contact email:", error);
  }
}
