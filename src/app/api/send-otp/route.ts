import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Gmail transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const { email, otp, expiryTime } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        { error: 'Email and OTP are required' },
        { status: 400 }
      );
    }

    // Format current time
    const currentTime = new Date();
    const formattedTime = `${currentTime.getHours().toString().padStart(2, '0')}:${currentTime.getMinutes().toString().padStart(2, '0')}`;

    // Create email content
    const mailOptions = {
      from: {
        name: 'Amazon Verification',
        address: process.env.GMAIL_USER || 'ds-verification@amazon-global-selling.com',
      },
      to: email,
      subject: 'OTP for your Amazon authentication',
      text: `To authenticate, please use the following One Time Password (OTP): ${otp}\n\nThis OTP will be valid for 15 minutes till ${expiryTime}.\n\nDo not share this OTP with anyone. If you didn't make this request, you can safely ignore this email.\n\nThanks for visiting Amazon!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e5e5; padding: 20px;">
          <div style="text-align: left; margin-bottom: 20px;">
            <img src="https://amazon-cms.vercel.app/logo.png" alt="logo" style="height: 40px; width: auto;" />
          </div>
          <p style="font-size: 16px; color: #333;">To authenticate, please use the following One Time Password (OTP):</p>
          <div style="font-size: 24px; font-weight: bold; text-align: center; margin: 30px 0; padding: 10px; background-color: #f5f5f5; border-radius: 5px;">
            ${otp}
          </div>
          <p style="font-size: 14px; color: #333;">This OTP will be valid for 15 minutes till ${expiryTime}.</p>
          <p style="font-size: 14px; color: #333; margin-top: 30px;">Do not share this OTP with anyone. If you didn't make this request, you can safely ignore this email.<br/>Amazon will never contact you about this email or ask for any login codes or links. Beware of phishing scams.</p>
          <p style="font-size: 14px; color: #666; margin-top: 30px;">Thanks for visiting Amazon!</p>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: 'OTP email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending OTP email:', error);
    return NextResponse.json(
      { error: 'Failed to send OTP email' },
      { status: 500 }
    );
  }
} 