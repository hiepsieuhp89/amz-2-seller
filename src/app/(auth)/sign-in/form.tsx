'use client';

import Captcha from '@/components/Captcha';
import { useUser } from '@/context/useUserContext';
import { setCookies } from '@/helper';
import { useSignIn } from '@/hooks/authentication';
import { ISignIn } from '@/interface/request/authentication';
import MessageClientContext from '@/provider/MessageProvider';
import { Button, Form, Input } from 'antd';
import { FormProps } from 'antd/lib';
import { useRouter } from 'next/navigation';
import { useContext, useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import Cookies from 'js-cookie';

type FieldType = {
  username: string;
  password: string;
};

// Add new captcha types
type CaptchaType = 'image' | 'audio' | 'text';

const generateTextCaptcha = () => {
  const operators = ['+', '-', '*'];
  const num1 = Math.floor(Math.random() * 10);
  const num2 = Math.floor(Math.random() * 10);
  const operator = operators[Math.floor(Math.random() * operators.length)];
  const question = `${num1} ${operator} ${num2}`;
  const answer = eval(question).toString();
  return { question, answer };
};

const generateAudioCaptcha = () => {
  const numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  const randomNumbers = Array.from({length: 3}, () => Math.floor(Math.random() * 10));
  const audioText = randomNumbers.map(num => numbers[num]).join(' ');
  return { audioText, answer: randomNumbers.join('') };
};

// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Function to mask email for privacy
const maskEmail = (email: string) => {
  if (!email) return '';
  const [username, domain] = email.split('@');
  
  if (username.length <= 3) {
    // For very short usernames, show only the first character
    return `${username.substring(0, 1)}${'*'.repeat(username.length - 1)}@${domain}`;
  } else {
    // For longer usernames, show first 3 characters and mask the rest
    return `${username.substring(0, 3)}${'*'.repeat(username.length - 3)}@${domain}`;
  }
};

const SignInForm = () => {
  const router = useRouter();
  const { mutateAsync, isPending } = useSignIn();
  const { handleErrorMessage } = useContext(MessageClientContext);
  const { loginUser, logoutUser } = useUser();
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaLoading, setCaptchaLoading] = useState(false);
  const [captchaTarget, setCaptchaTarget] = useState('');
  const [captchaImages, setCaptchaImages] = useState<Array<{ id: number, src: string, type: string }>>([]);
  const [formValues, setFormValues] = useState<FieldType | null>(null);
  const [captchaType, setCaptchaType] = useState<CaptchaType>('image');
  const [textCaptcha, setTextCaptcha] = useState({ question: '', answer: '' });
  const [audioCaptcha, setAudioCaptcha] = useState({ audioText: '', answer: '' });
  
  // OTP related states
  const [showOTPForm, setShowOTPForm] = useState(false);
  const [otp, setOTP] = useState('');
  const [generatedOTP, setGeneratedOTP] = useState('');
  const [sendingOTP, setSendingOTP] = useState(false);
  const [otpExpiry, setOtpExpiry] = useState<Date | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [userEmail, setUserEmail] = useState('');
  const [userData, setUserData] = useState<any>(null);
  const [userToken, setUserToken] = useState<string | null>(null);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Generate random captcha challenge
  const generateCaptcha = () => {
    setCaptchaLoading(true);

    const types = ['cat', 'dog', 'koala', 'bird', 'fish', 'rabbit'];
    const randomType = types[Math.floor(Math.random() * types.length)];

    // Create unique image URLs using timestamp to prevent caching
    const timestamp = Date.now();

    // Generate 1 correct image
    const correctImage = {
      id: 1,
      src: `https://source.unsplash.com/100x100/?${randomType}&${timestamp}`,
      type: randomType
    };

    // Generate 5 unique wrong images
    const wrongTypes = types.filter(t => t !== randomType);
    const wrongImages: { id: number; src: string; type: string }[] = [];

    while (wrongImages.length < 5) {
      const randomWrongType = wrongTypes[Math.floor(Math.random() * wrongTypes.length)];
      if (!wrongImages.some(img => img.type === randomWrongType)) {
        wrongImages.push({
          id: wrongImages.length + 2,
          src: `https://source.unsplash.com/100x100/?${randomWrongType}&${timestamp}`,
          type: randomWrongType
        });
      }
    }

    // Combine and shuffle images
    const allImages = [correctImage, ...wrongImages];
    const shuffled = allImages.sort(() => 0.5 - Math.random());

    setCaptchaTarget(randomType);
    setCaptchaImages(shuffled);

    setTimeout(() => {
      setCaptchaLoading(false);
    }, 500);
  };

  const generateRandomCaptcha = () => {
    const types: CaptchaType[] = ['image', 'audio', 'text'];
    const randomType = types[Math.floor(Math.random() * types.length)];
    setCaptchaType(randomType);

    if (randomType === 'image') {
      generateCaptcha();
    } else if (randomType === 'text') {
      setTextCaptcha(generateTextCaptcha());
    } else if (randomType === 'audio') {
      setAudioCaptcha(generateAudioCaptcha());
    }
  };

  const handleSendOTP = async (emailAddress: string) => {
    if (!emailAddress) return;
    
    try {
      setSendingOTP(true);
      
      // Generate OTP
      const newOTP = generateOTP();
      setGeneratedOTP(newOTP);
      
      // Set expiry time - 15 minutes from now
      const expiryTime = new Date();
      expiryTime.setMinutes(expiryTime.getMinutes() + 15);
      setOtpExpiry(expiryTime);
      setTimeLeft(15 * 60); // 15 minutes in seconds
      
      // Start the countdown timer
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      // Format time as "HH:MM"
      const currentTime = new Date();
      const formattedTime = `${currentTime.getHours().toString().padStart(2, '0')}:${currentTime.getMinutes().toString().padStart(2, '0')}`;
      
      // Calculate expiry time string
      const expiryTimeStr = `${expiryTime.getHours().toString().padStart(2, '0')}:${expiryTime.getMinutes().toString().padStart(2, '0')}`;
      
      // Send email using emailjs
      const templateParams = {
        recipient: emailAddress,
        email: emailAddress,
        user_email: emailAddress,
        to_email: emailAddress,
        to_name: emailAddress.split('@')[0],
        passcode: newOTP,
        time: `${formattedTime}`,
        company_name: 'Amazon',
        from_email: 'ds-verification@amazon-global-selling.com',
        from_name: 'Amazon Verification',
        // Additional parameters that might be needed
        subject: 'OTP for your Amazon authentication',
        otp: newOTP, // The template might be using 'otp' instead of 'passcode'
        expiry_time: expiryTimeStr, // The template might need the expiry time
        message: `This OTP will be valid for 15 minutes till ${expiryTimeStr}.`
      };
      
      console.log(templateParams);
      await emailjs.send(
        'service_05yt11a',
        'template_8coe69v',
        templateParams,
        'pzeaU2JjVDQw0B6tU'
      ).then(result => {
        console.log('EmailJS success:', result);
      }).catch(error => {
        console.error('EmailJS detailed error:', error);
      });
      
      // Update the state with the email so it can be displayed in the UI
      setUserEmail(emailAddress);
      setShowOTPForm(true);
    } catch (error) {
      console.error('Error sending OTP:', error);
      handleErrorMessage('Failed to send OTP. Please try again.');
      // Logout user if OTP sending fails
      logoutUser();
    } finally {
      setSendingOTP(false);
    }
  };

  const formatTimeLeft = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleCaptchaSuccess = async () => {
    setShowCaptcha(false);
    
    // First login with API
    if (formValues) {
      try {
        const payload: ISignIn = {
          username: formValues.username,
          password: formValues.password,
        };
        const response = await mutateAsync(payload);
        
        if (response?.data?.accessToken) {
          // Store user data and token temporarily
          setUserData(response.data.user);
          setUserToken(response.data.accessToken);
          
          // Get email from API response
          const email = response.data.user?.email || formValues.username;
          
          // Now send OTP with email directly
          await handleSendOTP(email);
        }
      } catch (error: any) {
        handleErrorMessage(error?.response?.data?.message || 'Login failed');
      }
    }
  };

  const handleVerifyOTP = async () => {
    if (otp === generatedOTP && otpExpiry && new Date() < otpExpiry) {
      // OTP is valid, complete login
      if (userData && userToken) {
        setCookies(userToken);
        loginUser(userData, userToken);
        router.push('/seller/dashboard');
      }
    } else {
      if (!otpExpiry || new Date() > otpExpiry) {
        handleErrorMessage('OTP has expired. Please try again.');
      } else {
        handleErrorMessage('Invalid OTP. Please check and try again.');
      }
      // Logout user if OTP validation fails
      logoutUser();
    }
  };

  const onFinish: FormProps<FieldType>['onFinish'] = (values: FieldType) => {
    setFormValues(values);
    setShowCaptcha(true);
  };

  return (
    <>
      {!showCaptcha && !showOTPForm ? (
        <>
          <h1 className='text-[28px] font-medium'>Sign In</h1>
          <Form
            name="normal_login"
            onFinish={onFinish}
            layout='vertical'
          >
            <Form.Item
              label={<strong>Email</strong>}
              name="username"
              rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
            >
              <Input placeholder="Tên đăng nhập" />
            </Form.Item>
            <Form.Item
              label={<strong>Mật khẩu</strong>}
              name="password"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            >
              <Input.Password
                type="password"
                placeholder="Mật khẩu"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button w-full !font-medium !h-[32px] !rounded-sm !px-2 !py-1"
                loading={isPending}
              >
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </>
      ) : showCaptcha ? (
        <Captcha 
          onSuccess={handleCaptchaSuccess}
          onError={handleErrorMessage}
          onBack={() => setShowCaptcha(false)}
        />
      ) : (
        <div className="otp-verification">
          <h1 className='text-[28px] font-medium'>Verify OTP</h1>
          <p className="mb-4">
            OTP has been sent to your email: <strong>{maskEmail(userEmail)}</strong>
          </p>
          <p className="mb-4 text-sm">
            This OTP will be valid for {formatTimeLeft()}
          </p>
          <Form layout="vertical">
            <Form.Item 
              label={<strong>Enter OTP</strong>}
              rules={[{ required: true, message: 'Please enter the OTP sent to your email' }]}
            >
              <Input 
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
                maxLength={6}
              />
            </Form.Item>
            <div className="flex gap-4">
              <Button
                type="primary"
                onClick={handleVerifyOTP}
                className="!font-medium !h-[32px] !rounded-sm !px-2 !py-1"
                disabled={!otp || otp.length < 6}
              >
                Verify & Login
              </Button>
              <Button
                onClick={() => handleSendOTP(userEmail)}
                className="!font-medium !h-[32px] !rounded-sm !px-2 !py-1"
                disabled={sendingOTP || timeLeft > 0}
                loading={sendingOTP}
              >
                Resend OTP
              </Button>
              <Button
                onClick={() => {
                  // Cancel OTP verification and return to login form
                  if (timerRef.current) clearInterval(timerRef.current);
                  setShowOTPForm(false);
                  // Reset OTP-related states
                  setOTP('');
                  setGeneratedOTP('');
                  setTimeLeft(0);
                  setOtpExpiry(null);
                  // Clear user data from temporary storage
                  setUserData(null);
                  setUserToken(null);
                  setUserEmail('');
                }}
                className="!font-medium !h-[32px] !rounded-sm !px-2 !py-1"
              >
                Cancel
              </Button>
            </div>
          </Form>
        </div>
      )}
    </>
  );
};

export default SignInForm;