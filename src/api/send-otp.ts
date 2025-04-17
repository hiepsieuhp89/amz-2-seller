import axios from 'axios';

interface SendOTPParams {
  email: string;
  otp: string;
  expiryTime: string;
}

/**
 * Gửi mã OTP thông qua local API route
 * @param params Thông số để gửi OTP
 * @returns Promise
 */
export const sendOtp = async (params: SendOTPParams): Promise<any> => {
  try {
    console.log('Sending OTP via local API route:', params);
    
    // Sử dụng fetch API để gọi đến local API route
    const response = await fetch('/api/send-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Error response from API:', response.status, errorData);
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Email sent successfully via API route:', data);
    
    return data;
  } catch (error) {
    console.error('Error sending OTP via API route:', error);
    throw error;
  }
}; 