import axios from 'axios';

interface SendOTPParams {
  email: string;
  otp: string;
  expiryTime: string;
}

/**
 * Gửi mã OTP đến email được chỉ định
 * @param params Thông số để gửi OTP
 * @returns Promise
 */
export const sendOtp = async (params: SendOTPParams) => {
  try {
    // Sử dụng URL tuyệt đối hoặc tương đối tùy thuộc vào môi trường
    const apiUrl = `/api/send-otp`;
    
    const response = await axios.post(apiUrl, params, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw error;
  }
}; 