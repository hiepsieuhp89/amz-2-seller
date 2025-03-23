'use client';

import { Button, Form, Input, Modal, Image, Row, Col, Spin } from 'antd';
import { useRouter } from 'next/navigation';
import { setCookies } from '@/helper';
import { useContext, useState, useEffect } from 'react';
import { useSignIn } from '@/hooks/authentication';
import { ISignIn } from '@/interface/request/authentication';
import MessageClientContext from '@/provider/MessageProvider';
import { FormProps } from 'antd/lib';
import { useUser } from '@/context/useUserContext';
import { ReloadOutlined } from '@ant-design/icons';

type FieldType = {
  username: string;
  password: string;
};

// Updated with lower resolution images
const captchaImages = [
  { id: 1, src: 'https://source.unsplash.com/100x100/?cat', type: 'cat' },
  { id: 2, src: 'https://source.unsplash.com/100x100/?dog', type: 'dog' },
  { id: 3, src: 'https://source.unsplash.com/100x100/?koala', type: 'koala' },
  { id: 4, src: 'https://source.unsplash.com/100x100/?bird', type: 'bird' },
  { id: 5, src: 'https://source.unsplash.com/100x100/?fish', type: 'fish' },
  { id: 6, src: 'https://source.unsplash.com/100x100/?rabbit', type: 'rabbit' },
];

const SignInForm = () => {
  const router = useRouter();
  const { mutateAsync, isPending } = useSignIn();
  const { handleErrorMessage } = useContext(MessageClientContext);
  const { loginUser } = useUser();
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaLoading, setCaptchaLoading] = useState(false);
  const [captchaTarget, setCaptchaTarget] = useState('');
  const [captchaImages, setCaptchaImages] = useState<Array<{ id: number, src: string, type: string }>>([]);
  const [formValues, setFormValues] = useState<FieldType | null>(null);

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

  const handleCaptchaClick = async (type: string) => {
    if (type === captchaTarget) {
      setShowCaptcha(false);

      // If captcha is correct, proceed with login
      if (formValues) {
        try {
          const payload: ISignIn = {
            username: formValues.username,
            password: formValues.password,
            gate: "website"
          };
          const { data } = await mutateAsync(payload);
          if (data?.accessToken) {
            setCookies(data.accessToken);
            loginUser(data?.user, data?.accessToken);
            router.push('/seller/dashboard');
          }
        } catch (error: any) {
          handleErrorMessage(error?.response?.data?.message || 'Đăng nhập thất bại');
        }
      }
    } else {
      // If wrong, generate a new captcha
      handleErrorMessage('Xác thực không chính xác. Vui lòng thử lại.');
      generateCaptcha();
    }
  };

  const onFinish: FormProps<FieldType>['onFinish'] = (values: FieldType) => {
    setFormValues(values);
    setShowCaptcha(true);
    generateCaptcha();
  };

  return (
    <>
      {!showCaptcha ? (
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
                className="login-form-button w-full !font-medium !h-[32px]"
                loading={isPending}
              >
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </>
      ) : (
        <div className="w-full max-w-[400px] mx-auto">
          <h2 className="text-xl font-medium mb-4">Security Verification</h2>
          
          <div className="text-center mb-4">
            <p>Select all images containing <strong>{captchaTarget}</strong></p>
            <Button
              icon={<ReloadOutlined />}
              onClick={generateCaptcha}
              className="mt-2"
            >
              Refresh
            </Button>
          </div>

          {captchaLoading ? (
            <div className="flex justify-center py-8">
              <Spin size="large" />
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {captchaImages.map((image) => (
                <div
                  key={image.id}
                  className="cursor-pointer border hover:border-blue-500 aspect-square"
                  onClick={() => handleCaptchaClick(image.type)}
                >
                  <img
                    src={image.src}
                    alt="Captcha image"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      // Updated fallback URLs with verified working images
                      const fallbackUrls = {
                        cat: 'https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&cs=tinysrgb&w=100',
                        dog: 'https://images.pexels.com/photos/2023384/pexels-photo-2023384.jpeg?auto=compress&cs=tinysrgb&w=100',
                        koala: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Koala_climbing_tree.jpg/100px-Koala_climbing_tree.jpg',
                        bird: 'https://images.pexels.com/photos/1661179/pexels-photo-1661179.jpeg?auto=compress&cs=tinysrgb&w=100',
                        fish: 'https://images.pexels.com/photos/2156311/pexels-photo-2156311.jpeg?auto=compress&cs=tinysrgb&w=100',
                        rabbit: 'https://images.pexels.com/photos/4001296/pexels-photo-4001296.jpeg?auto=compress&cs=tinysrgb&w=100'
                      };
                      (e.target as HTMLImageElement).src = fallbackUrls[image.type as keyof typeof fallbackUrls] || 'https://picsum.photos/100/100';
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          <div className="mt-4 text-center text-sm text-gray-500">
            <p>Solve this puzzle to protect your account</p>
          </div>
        </div>
      )}
    </>
  );
};

export default SignInForm;