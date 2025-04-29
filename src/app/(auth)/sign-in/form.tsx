"use client";

import Captcha from "@/components/Captcha";
import { useUser } from "@/context/useUserContext";
import { setCookies } from "@/helper";
import {
  useSignIn,
  useVerifyEmail,
  useResendOtp,
} from "@/hooks/authentication";
import { ISignIn } from "@/interface/request/authentication";
import MessageClientContext from "@/provider/MessageProvider";
import { Button, Form, Input, message } from "antd";
import { FormProps } from "antd/lib";
import { useRouter } from "next/navigation";
import { useContext, useState, useRef, useEffect } from "react";

type FieldType = {
  username: string;
  password: string;
};

// Add new captcha types
type CaptchaType = "image" | "audio" | "text";

// Function to mask email for privacy
const maskEmail = (email: string) => {
  if (!email) return "";
  const [username, domain] = email.split("@");

  if (username.length <= 3) {
    // For very short usernames, show only the first character
    return `${username.substring(0, 1)}${"*".repeat(
      username.length - 1
    )}@${domain}`;
  } else {
    // For longer usernames, show first 3 characters and mask the rest
    return `${username.substring(0, 3)}${"*".repeat(
      username.length - 3
    )}@${domain}`;
  }
};

const generateTextCaptcha = () => {
  const operators = ["+", "-", "*"];
  const num1 = Math.floor(Math.random() * 10);
  const num2 = Math.floor(Math.random() * 10);
  const operator = operators[Math.floor(Math.random() * operators.length)];
  const question = `${num1} ${operator} ${num2}`;
  const answer = eval(question).toString();
  return { question, answer };
};

const generateAudioCaptcha = () => {
  const numbers = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  const randomNumbers = Array.from({ length: 3 }, () =>
    Math.floor(Math.random() * 10)
  );
  const audioText = randomNumbers.map((num) => numbers[num]).join(" ");
  return { audioText, answer: randomNumbers.join("") };
};

const SignInForm = () => {
  const router = useRouter();
  const { mutateAsync, isPending } = useSignIn();
  const { mutateAsync: verifyEmailAsync, isPending: isVerifying } =
    useVerifyEmail();
  const { mutateAsync: resendOtpAsync, isPending: isResendingOtp } =
    useResendOtp();
  const { handleErrorMessage } = useContext(MessageClientContext);
  const { loginUser } = useUser();
  const [messageApi, contextHolder] = message.useMessage();
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaLoading, setCaptchaLoading] = useState(false);
  const [captchaTarget, setCaptchaTarget] = useState("");
  const [captchaImages, setCaptchaImages] = useState<
    Array<{ id: number; src: string; type: string }>
  >([]);
  const [formValues, setFormValues] = useState<FieldType | null>(null);
  const [captchaType, setCaptchaType] = useState<CaptchaType>("image");
  const [textCaptcha, setTextCaptcha] = useState({ question: "", answer: "" });
  const [audioCaptcha, setAudioCaptcha] = useState({
    audioText: "",
    answer: "",
  });

  // OTP related states
  const [showOTPForm, setShowOTPForm] = useState(false);
  const [otp, setOTP] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [canResendOtp, setCanResendOtp] = useState(true);
  const [resendCountdown, setResendCountdown] = useState(0);
  const resendTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (resendTimerRef.current) clearInterval(resendTimerRef.current);
    };
  }, []);

  // Format countdown time
  const formatCountdown = () => {
    const minutes = Math.floor(resendCountdown / 60);
    const seconds = resendCountdown % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Start countdown for resend OTP
  const startResendCountdown = () => {
    setCanResendOtp(false);
    setResendCountdown(300); // 5 minutes = 300 seconds

    if (resendTimerRef.current) {
      clearInterval(resendTimerRef.current);
    }

    resendTimerRef.current = setInterval(() => {
      setResendCountdown((prev) => {
        if (prev <= 1) {
          if (resendTimerRef.current) {
            clearInterval(resendTimerRef.current);
          }
          setCanResendOtp(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Handle resend OTP
  const handleResendOTP = async () => {
    if (!canResendOtp || !userEmail) return;

    try {
      const response = await resendOtpAsync({ email: userEmail });

      if (response.success) {
        messageApi.success("OTP đã được gửi lại thành công!");
        startResendCountdown();
      } else {
        messageApi.error(
          response.message || "Gửi lại OTP thất bại. Vui lòng thử lại sau."
        );
      }
    } catch (error: any) {
      messageApi.error(
        error?.response?.data?.message || "Có lỗi xảy ra khi gửi lại OTP"
      );
    }
  };

  // Handle verify OTP
  const handleVerifyOTP = async () => {
    if (!otp || !userEmail) return;

    try {
      const response = await verifyEmailAsync({
        email: userEmail,
        otp: otp,
      });

      loginUser(response?.data?.user, response?.data?.accessToken);
      messageApi.success("Xác thực email thành công!");
      setCookies(response?.data?.accessToken);
      router.push("/seller/dashboard");
    } catch (error: any) {
      messageApi.error(
        error?.response?.data?.message ||
          "Mã OTP không hợp lệ. Vui lòng thử lại."
      );
    }
  };

  // Generate random captcha challenge
  const generateCaptcha = () => {
    setCaptchaLoading(true);

    const types = ["cat", "dog", "koala", "bird", "fish", "rabbit"];
    const randomType = types[Math.floor(Math.random() * types.length)];

    // Create unique image URLs using timestamp to prevent caching
    const timestamp = Date.now();

    // Generate 1 correct image
    const correctImage = {
      id: 1,
      src: `https://source.unsplash.com/100x100/?${randomType}&${timestamp}`,
      type: randomType,
    };

    // Generate 5 unique wrong images
    const wrongTypes = types.filter((t) => t !== randomType);
    const wrongImages: { id: number; src: string; type: string }[] = [];

    while (wrongImages.length < 5) {
      const randomWrongType =
        wrongTypes[Math.floor(Math.random() * wrongTypes.length)];
      if (!wrongImages.some((img) => img.type === randomWrongType)) {
        wrongImages.push({
          id: wrongImages.length + 2,
          src: `https://source.unsplash.com/100x100/?${randomWrongType}&${timestamp}`,
          type: randomWrongType,
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
    const types: CaptchaType[] = ["image", "audio", "text"];
    const randomType = types[Math.floor(Math.random() * types.length)];
    setCaptchaType(randomType);

    if (randomType === "image") {
      generateCaptcha();
    } else if (randomType === "text") {
      setTextCaptcha(generateTextCaptcha());
    } else if (randomType === "audio") {
      setAudioCaptcha(generateAudioCaptcha());
    }
  };

  const handleCaptchaSuccess = async () => {
    setShowCaptcha(false);

    // Login after captcha verification
    if (formValues) {
      try {
        const payload: ISignIn = {
          username: formValues.username,
          password: formValues.password,
        };
        const response = await mutateAsync(payload);
        // Check shop verification status - handle as generic response first
        const responseData = response as any;
        if (responseData?.data?.shopStatus === "NOT_VERIFIED") {
          // Need OTP verification
          setUserEmail(responseData.data.email);
          setShowOTPForm(true);
          startResendCountdown();
          messageApi.info(
            "Tài khoản chưa được xác thực. Vui lòng xác thực email để tiếp tục."
          );
        } else if (response?.data?.accessToken) {
          // Login user immediately
          setCookies(response.data.accessToken);
          loginUser(response.data.user, response.data.accessToken);
          router.push("/seller/dashboard");
        }
      } catch (error: any) {
        if (error?.response?.data?.shopStatus === "NOT_VERIFIED") {
          // Need OTP verification
          setUserEmail(error?.response?.data?.email);
          setShowOTPForm(true);
          startResendCountdown();
          messageApi.info(
            "Tài khoản chưa được xác thực. Vui lòng xác thực email để tiếp tục."
          );
        }
        handleErrorMessage(error?.response?.data?.message || "Login failed");
      }
    }
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values: FieldType) => {
    setFormValues(values);
    setShowCaptcha(true);
  };

  return (
    <>
      {contextHolder}
      {!showCaptcha && !showOTPForm ? (
        <>
          <h1 className="text-[28px] font-medium">Sign In</h1>
          <Form name="normal_login" onFinish={onFinish} layout="vertical">
            <Form.Item
              label={<strong>Tên đăng nhập</strong>}
              name="username"
              rules={[
                { required: true, message: "Vui lòng nhập tên đăng nhập!" },
              ]}
            >
              <Input placeholder="Tên đăng nhập" />
            </Form.Item>
            <Form.Item
              label={<strong>Mật khẩu</strong>}
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <Input.Password type="password" placeholder="Mật khẩu" />
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
      ) : showOTPForm ? (
        <div className="otp-verification">
          <h1 className="text-[28px] font-medium">Xác thực Email</h1>
          <p className="mb-4">
            Mã OTP đã được gửi tới email:{" "}
            <strong>{maskEmail(userEmail)}</strong>
          </p>
          {resendCountdown > 0 && (
            <p className="mb-4 text-sm">
              Bạn có thể gửi lại mã OTP sau:{" "}
              <strong>{formatCountdown()}</strong>
            </p>
          )}
          <Form layout="vertical">
            <Form.Item
              label={<strong>Nhập mã OTP</strong>}
              rules={[{ required: true, message: "Vui lòng nhập mã OTP" }]}
            >
              <Input
                placeholder="Nhập mã OTP 6 số"
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
                disabled={!otp || otp.length < 6 || isVerifying}
                loading={isVerifying}
              >
                Xác thực
              </Button>
              <Button
                onClick={handleResendOTP}
                className="!font-medium !h-[32px] !rounded-sm !px-2 !py-1"
                disabled={!canResendOtp || isResendingOtp}
                loading={isResendingOtp}
              >
                Gửi lại OTP
              </Button>
              <Button
                onClick={() => {
                  // Return to login form
                  if (resendTimerRef.current)
                    clearInterval(resendTimerRef.current);
                  setShowOTPForm(false);
                  // Reset OTP-related states
                  setOTP("");
                  setUserEmail("");
                  setResendCountdown(0);
                  setCanResendOtp(true);
                }}
                className="!font-medium !h-[32px] !rounded-sm !px-2 !py-1"
              >
                Quay lại
              </Button>
            </div>
          </Form>
        </div>
      ) : (
        <Captcha
          onSuccess={handleCaptchaSuccess}
          onError={handleErrorMessage}
          onBack={() => setShowCaptcha(false)}
        />
      )}
    </>
  );
};

export default SignInForm;
