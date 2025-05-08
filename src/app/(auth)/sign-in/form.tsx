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
import { useContext, useState } from 'react';

type FieldType = {
  username: string;
  password: string;
};

const CAPTCHA_MODE = false;

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

  const generateCaptcha = () => {
    setCaptchaLoading(true);
    const types = ['cat', 'dog', 'koala', 'bird', 'fish', 'rabbit'];
    const randomType = types[Math.floor(Math.random() * types.length)];
    const timestamp = Date.now();
    const correctImage = {
      id: 1,
      src: `https://source.unsplash.com/100x100/?${randomType}&${timestamp}`,
      type: randomType
    };

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
    const allImages = [correctImage, ...wrongImages];
    const shuffled = allImages.sort(() => 0.5 - Math.random());

    setCaptchaTarget(randomType);
    setCaptchaImages(shuffled);

    setTimeout(() => {
      setCaptchaLoading(false);
    }, 500);
  };

  const handleCaptchaSuccess = async () => {
    setShowCaptcha(false);
    if (formValues) {
      try {
        const payload: ISignIn = {
          username: formValues.username,
          password: formValues.password,
        };
        const { data } = await mutateAsync(payload);
        if (data?.accessToken) {
          setCookies(data.accessToken);
          loginUser(data?.user, data?.accessToken);
          router.push('/');
        }
      } catch (error: any) {
        if (error?.response?.data?.statusCode === 423) {
          router.push('/account-disabled');
          return;
        }
        handleErrorMessage(error?.response?.data?.message || 'Login failed');
      }
    }
  };

  const onFinish: FormProps<FieldType>['onFinish'] = (values: FieldType) => {
    setFormValues(values);
    if (CAPTCHA_MODE) {
      setShowCaptcha(true);
    } else {
      handleCaptchaSuccess();
    }
  };

  return (
    <div>
      <div style={{ 
        width: '100%',
        padding: '24px',
        backgroundColor: 'white', 
        borderRadius: '8px',
      }}>
        {!showCaptcha ? (
          <>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <h1 style={{ 
                color: '#4D148C', 
                fontSize: '24px', 
                fontWeight: '600', 
                marginBottom: '16px'
              }}>
                Đăng nhập
              </h1>
            </div>
            <Form
              name="normal_login"
              onFinish={onFinish}
              layout='vertical'
            >
              <Form.Item
                label={<span style={{ fontWeight: '500' }}>Email</span>}
                name="username"
                rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
              >
                <Input 
                  placeholder="Nhập email của bạn" 
                  style={{ height: '40px', borderRadius: '4px' }}
                />
              </Form.Item>
              <Form.Item
                label={<span style={{ fontWeight: '500' }}>Mật khẩu</span>}
                name="password"
                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
              >
                <Input.Password
                  placeholder="Nhập mật khẩu"
                  style={{ height: '40px', borderRadius: '4px' }}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    width: '100%',
                    height: '40px',
                    backgroundColor: '#4D148C',
                    borderColor: '#4D148C',
                    fontWeight: '500',
                    borderRadius: '4px'
                  }}
                  loading={isPending}
                >
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
          </>
        ) : (
          <Captcha 
            onSuccess={handleCaptchaSuccess}
            onError={handleErrorMessage}
          />
        )}
      </div>
    </div>
  );
};

export default SignInForm;