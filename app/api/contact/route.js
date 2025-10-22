import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import axios from 'axios';

export async function POST(req) {
  const { name, email, message, company, phone, service } = await req.json();

  // Basic validation
  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
  }

  try {
    // Save data to SheetDB
    await axios.post(process.env.SHEETDB_URL, {
      data: {
        name,
        email,
        message,
        company: company || '',
        phone: phone || '',
        service: service || '',
        date: new Date().toISOString(),
      },
    });

    // Send confirmation email
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"JulyPort" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Thank you for contacting us!',
      html: `
        <h1>Hi ${name},</h1>
        <p>Thanks for reaching out. We've received your message and will get back to you shortly.</p>
        <p>Best,</p>
        <p>The JulyPort Team</p>
      `,
    });

    return NextResponse.json({ message: 'Your message has been sent successfully!' });
  } catch (error) {
    console.error('Error in contact route:', error);
    return NextResponse.json({ error: 'Something went wrong. Please try again later.' }, { status: 500 });
  }
}
