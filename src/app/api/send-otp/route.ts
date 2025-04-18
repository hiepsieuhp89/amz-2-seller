import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Debug logging for environment variables
console.log('Email config check:', {
  service: process.env.EMAIL_SERVICE,
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE,
  userEnvVar: !!process.env.EMAIL_USER,
  passEnvVar: !!process.env.EMAIL_PASSWORD,
});

// Create email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // use TLS
  auth: {
    user: process.env.EMAIL_USER || 'ds-verification@amazon-global-selling.com',
    pass: process.env.EMAIL_PASSWORD || 'Amazon123123!',
  },
  debug: true, // Enable debug output
});

// Verify transporter connection
transporter.verify(function(error: any, success: any) {
  if (error) {
    console.error('SMTP connection error:', error);
  } else {
    console.log('SMTP server is ready to send emails');
  }
});

// Helper function to add CORS headers
function corsHeaders(response: NextResponse) {
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  response.headers.set('Access-Control-Allow-Origin', '*'); // Adjust this to specific domains in production
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );
  return response;
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS(request: NextRequest) {
  return corsHeaders(NextResponse.json({}, { status: 200 }));
}

export async function POST(request: NextRequest) {
  console.log('POST request received at /api/send-otp');
  console.log('Request headers:', Object.fromEntries(request.headers));
  
  try {
    // Parse the request body
    const body = await request.json();
    console.log('Request body:', body);
    
    const { email, otp, expiryTime } = body;

    if (!email || !otp) {
      console.log('Missing required fields:', { email, otp });
      return corsHeaders(NextResponse.json(
        { error: 'Email and OTP are required' },
        { status: 400 }
      ));
    }

    console.log('Attempting to send OTP email to:', email);

    // Format current time
    const currentTime = new Date();
    const formattedTime = `${currentTime.getHours().toString().padStart(2, '0')}:${currentTime.getMinutes().toString().padStart(2, '0')}`;

    // Create email content
    const mailOptions = {
      from: {
        name: process.env.EMAIL_SENDER_NAME || 'Amz-homepage',
        address: process.env.EMAIL_USER || 'ds-verification@amazon-global-selling.com',
      },
      to: email,
      subject: 'Your Verification Code',
      text: `To authenticate, please use the following One Time Password (OTP): ${otp}\n\nThis OTP will be valid for 15 minutes till ${expiryTime}.\n\nDo not share this OTP with anyone. If you didn't make this request, you can safely ignore this email.\nAmz-homepage will never contact you about this email or ask for any login codes or links. Beware of phishing scams.\n\nThanks for using Amz-homepage!`,
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 0; border: 1px solid #eaeaea; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #131921; padding: 20px; text-align: center;">
            <img src="https://amz-homepage.com/images/logo.png" alt="Amz-homepage" style="height: 48px; width: auto;" />
          </div>
          
          <div style="padding: 30px 25px;">
            <p style="font-size: 16px; color: #333; margin-bottom: 25px;">To authenticate, please use the following One Time Password (OTP):</p>
            
            <div style="background-color: #f7f7f7; border-radius: 8px; padding: 16px; text-align: center; margin-bottom: 25px;">
              <span style="font-size: 28px; font-weight: bold; letter-spacing: 3px; color: #232f3e;">${otp}</span>
            </div>
            
            <p style="font-size: 14px; color: #666; margin-bottom: 20px;">This OTP will be valid for 15 minutes till <strong>${expiryTime}</strong>.</p>
            
            <p style="font-size: 14px; color: #666; margin-bottom: 8px;">Do not share this OTP with anyone. If you didn't make this request, you can safely ignore this email.</p>
            <p style="font-size: 14px; color: #666; margin-bottom: 25px;">Amz-homepage will never contact you about this email or ask for any login codes or links. Beware of phishing scams.</p>
          </div>
          
          <div style="font-size: 12px; color: #999; text-align: center; background-color: #f9f9f9; padding: 15px;">
            <p>This is an automated message. Please do not reply to this email.</p>
            <p>&copy; 2024 Amz-homepage. All rights reserved.</p>
            <p style="margin-top: 8px;">Sent from <a href="https://amz-homepage.com" style="color: #0066cc; text-decoration: none;">amz-homepage.com</a></p>
          </div>
        </div>
      `,
    };

    try {
      // Send email
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', info.messageId);
      
      return corsHeaders(NextResponse.json(
        { 
          success: true, 
          message: 'OTP email sent successfully'
        },
        { status: 200 }
      ));
    } catch (emailError: any) {
      console.error('Error in sendMail:', emailError);
      return corsHeaders(NextResponse.json(
        { error: 'Failed to send OTP email', details: emailError.message },
        { status: 500 }
      ));
    }
  } catch (error: any) {
    console.error('Error in OTP route handler:', error);
    return corsHeaders(NextResponse.json(
      { error: 'Failed to send OTP email', details: error.message },
      { status: 500 }
    ));
  }
} 