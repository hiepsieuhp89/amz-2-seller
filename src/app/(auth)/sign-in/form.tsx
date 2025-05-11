'use client';
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
const SignInForm = () => {
  const router = useRouter();
  const { mutateAsync, isPending } = useSignIn();
  const { handleErrorMessage } = useContext(MessageClientContext);
  const { loginUser } = useUser();
  const [formValues, setFormValues] = useState<FieldType | null>(null);

  const onFinish: FormProps<FieldType>['onFinish'] = async (values: FieldType) => {
    setFormValues(values);
    if (formValues) {
      try {
        const payload: ISignIn = {
          username: formValues.username,
          password: formValues.password,
        };
        const response = await mutateAsync(payload);

        if (response?.data?.accessToken) {
          setCookies(response.data.accessToken);
          loginUser(response.data.user, response.data.accessToken);
          router.push('/');
        }
      } catch (error: any) {
        handleErrorMessage(error?.response?.data?.message || 'Login failed');
      }
    }
  };

  return (
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
  );
};

export default SignInForm;