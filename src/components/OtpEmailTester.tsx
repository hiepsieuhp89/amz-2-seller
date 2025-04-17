"use client"
import { useEffect, useState } from 'react';
import { Button, Input, message, Select } from 'antd';
import { sendOtp } from '@/api/send-otp';

const { Option } = Select;

const OtpEmailTester = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [testStarted, setTestStarted] = useState(false);

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

  const sendTestOTP = async () => {
    if (!email) {
      message.error('Please enter an email address');
      return;
    }

    setLoading(true);

    try {
      const otp = generateOTP();
      const expiryTime = calculateExpiryTime();
      
      console.log('Sending OTP to:', email, 'with code:', otp);
      
      const response = await sendOtp({
        email,
        otp,
        expiryTime
      });
      
      if (response.success) {
        message.success(`Verification code sent successfully to ${email}`);
      } else {
        message.error('Failed to send verification code');
      }
    } catch (error: any) {
      console.error('Error sending verification code:', error);
      message.error(`Error sending verification code: ${error.response?.data?.details || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Auto-send OTP at startup if enabled
  useEffect(() => {
    if (!testStarted && process.env.NEXT_PUBLIC_AUTO_TEST_OTP === 'true' && process.env.NEXT_PUBLIC_TEST_EMAIL) {
      setEmail(process.env.NEXT_PUBLIC_TEST_EMAIL || '');
      setTestStarted(true);
      sendTestOTP();
    }
  }, []);

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <h2 className="text-lg font-semibold mb-4">Verification Code Tester</h2>
      <div className="flex flex-col gap-2">
        <Input 
          placeholder="Enter email address" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        
        <Button 
          type="primary" 
          loading={loading} 
          onClick={sendTestOTP}
          className="w-full"
        >
          Send Test Code
        </Button>
      </div>
    </div>
  );
};

export default OtpEmailTester; 