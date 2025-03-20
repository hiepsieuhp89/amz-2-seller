'use client';

import { Button, Form, Input } from 'antd';
import { useRouter } from 'next/navigation';
import { setCookies } from '@/helper';
import { useContext, useState } from 'react';
import { useSignIn } from '@/hooks/authentication';
import { ISignIn } from '@/interface/request/authentication';
import MessageClientContext from '@/provider/MessageProvider';
import { FormProps } from 'antd/lib';
import { useUser } from '@/context/useUserContext';

type FieldType = {
  username: string;
  password: string;
};

const SignInForm = () => {
  const router = useRouter();
  const { mutateAsync, isPending } = useSignIn();
  const { handleErrorMessage } = useContext(MessageClientContext);
  const { loginUser } = useUser()
  const onFinish: FormProps<FieldType>['onFinish'] = async (values: FieldType) => {
    try {
      const payload: ISignIn = {
        username: values.username,
        password: values.password,
        gate: "website"
      };
      const { data } = await mutateAsync(payload);
      if (data?.accessToken) {
        setCookies(data.accessToken);
        loginUser(data?.user, data?.accessToken)
        router.push('/home/seller');
      }
    } catch (error: any) {
      handleErrorMessage(error?.response?.data?.message || 'Đăng nhập thất bại');
    }
  };

  return (
    <>
      <h1 className='text-[28px] font-medium'>
        Sign In
      </h1>
      <Form
        name="normal_login" onFinish={onFinish}
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
            className="login-form-button w-full  !font-medium !h-[32px]"
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