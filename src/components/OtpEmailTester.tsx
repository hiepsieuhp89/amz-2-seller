"use client"
import { useEffect, useState } from 'react';
import { Button, Input, message, Divider, Typography, Switch } from 'antd';
import { useSendOtp } from '@/hooks/otp';
import axios from 'axios';

const { Text } = Typography;

const OtpEmailTester = () => {
  const [email, setEmail] = useState('');
  const [testStarted, setTestStarted] = useState(false);
  const [useDirectApi, setUseDirectApi] = useState(false);
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  
  // Sử dụng hook thay vì gọi API trực tiếp
  const { sendVerificationCode, isLoading } = useSendOtp({
    onSuccess: (data) => {
      setApiResponse(data);
      setApiError(null);
    },
    onError: (error) => {
      console.error('Error in OTP sending:', error);
      setApiError(error?.message || 'Unknown error');
    }
  });

  // Hàm gọi API trực tiếp không qua hook
  const callDirectApi = async () => {
    try {
      setApiResponse(null);
      setApiError(null);

      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const date = new Date();
      date.setMinutes(date.getMinutes() + 15);
      const expiryTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
      const response = await axios.post('/api-local/send-otp', {
        email,
        otp, 
        expiryTime
      });
      setApiResponse(response.data);
      message.success(`Verification code sent successfully to ${email}`);
    } catch (error: any) {
      console.error('Direct API error:', error);
      setApiError(error?.response?.data?.details || error.message || 'Unknown error');
      message.error(`Failed to send code: ${error?.response?.data?.details || error.message}`);
    }
  };

  const handleSendTestOTP = async () => {
    if (!email) {
      message.error('Please enter an email address');
      return;
    }

    try {
      if (useDirectApi) {
        await callDirectApi();
      } else {
        await sendVerificationCode(email);
      }
    } catch (error) {
      // Errors đã được xử lý trong hook hoặc callDirectApi
    }
  };

  // Auto-send OTP at startup if enabled
  useEffect(() => {
    if (!testStarted && process.env.NEXT_PUBLIC_AUTO_TEST_OTP === 'true' && process.env.NEXT_PUBLIC_TEST_EMAIL) {
      setEmail(process.env.NEXT_PUBLIC_TEST_EMAIL || '');
      setTestStarted(true);
      handleSendTestOTP();
    }
  }, []);

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white w-80">
      <h2 className="text-lg font-semibold mb-4">Verification Code Tester</h2>
      <div className="flex flex-col gap-2">
        <Input 
          placeholder="Enter email address" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        
        <div className="flex items-center mb-2">
          <Text className="mr-2">Use direct API call:</Text>
          <Switch size="small" checked={useDirectApi} onChange={setUseDirectApi} />
        </div>
        
        <Button 
          type="primary" 
          loading={isLoading} 
          onClick={handleSendTestOTP}
          className="w-full"
        >
          Send Test Code
        </Button>
        
        {(apiResponse || apiError) && (
          <>
            <Divider style={{ margin: '10px 0' }} />
            <div className="text-xs">
              {apiResponse && (
                <div className="bg-green-50 p-2 rounded mb-2">
                  <Text className="text-green-600">Success: {JSON.stringify(apiResponse, null, 2)}</Text>
                </div>
              )}
              {apiError && (
                <div className="bg-red-50 p-2 rounded">
                  <Text className="text-red-600">Error: {apiError}</Text>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OtpEmailTester; 