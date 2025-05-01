import { useState } from "react";
import { sendOtp } from "@/api/send-otp";
import { message } from "antd";

interface UseSendOtpProps {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

export const useSendOtp = (props?: UseSendOtpProps) => {
  const { onSuccess, onError } = props || {};
  const [isLoading, setIsLoading] = useState(false);

  // Function to generate a random 6-digit OTP
  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Function to calculate expiry time (15 minutes from now)
  const calculateExpiryTime = () => {
    const date = new Date();
    date.setMinutes(date.getMinutes() + 15);
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  const sendVerificationCode = async (email: string) => {
    if (!email) {
      message.error("Email is required");
      return;
    }

    setIsLoading(true);
    try {
      const otp = generateOTP();
      const expiryTime = calculateExpiryTime();
      const response = await sendOtp({
        email,
        otp,
        expiryTime,
      });

      message.success(`Verification code sent successfully to ${email}`);
      
      if (onSuccess) {
        onSuccess(response);
      }
      
      return response;
    } catch (error) {
      console.error("Error sending verification code:", error);
      message.error(
        `Failed to send verification code. Please try again later.`
      );
      
      if (onError) {
        onError(error);
      }
      
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    sendVerificationCode,
    isLoading,
    generateOTP,
    calculateExpiryTime,
  };
}; 