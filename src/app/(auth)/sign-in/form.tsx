'use client';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useRouter } from 'next/navigation';
import { FormProps } from 'rc-field-form';
import { setCookies } from '@/helper';
import { useContext, useState } from 'react';
import Image from 'next/image';
import { useSignIn } from '@/hooks/authentication';
import { ISignIn } from '@/interface/request/authentication';
import MessageClientContext from '@/provider/MessageProvider';

type FieldType = {
  username: string;
  password: string;
};

const SignInForm = () => {
  const router = useRouter();
  const { mutateAsync, isPending } = useSignIn()
  const { handleErrorMessage } = useContext(MessageClientContext);
  const onFinish: FormProps<FieldType>['onFinish'] = async (values: FieldType) => {
    try {

      const payload: ISignIn = {
        username: values.username,
        password: values.password
      }

      const response = await mutateAsync(payload);
      setCookies(response?.data?.access_token)
      router.push('/home/seller')
    } catch (error: any) {
      handleErrorMessage(error?.response?.data?.message)
    }
  };

  return (
    <>
      <div className="mb-2 w-full">
        <div className='flex justify-center pt-2'>
          <Image src={'/images/logos/logo.png'} width={100} height={100} alt='logo' />
        </div>
      </div>
      <Form
        name="normal_login"
        className="login-form"
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Tên đăng nhập" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            type="password"
            placeholder="Mật khẩu"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button bg-[#17A2B8] w-full uppercase font-bold h-[40px]"
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