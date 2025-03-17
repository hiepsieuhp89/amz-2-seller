'use client';

import { Button, Divider, Form, Input } from 'antd';
import { useRouter } from 'next/navigation';
import { setCookies } from '@/helper';
import { useContext, useState } from 'react';
import { useSignIn } from '@/hooks/authentication';
import { ISignIn } from '@/interface/request/authentication';
import MessageClientContext from '@/provider/MessageProvider';
import { FormProps } from 'antd/lib';
import Link from 'next/link';

type FieldType = {
  username: string;
  password: string;
};

const SignUpForm = () => {
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
      setCookies(response?.data?.accessToken)
      console.log('response', response)
      router.push('/home/seller')
    } catch (error: any) {
      handleErrorMessage(error?.response?.data?.message)
    }
  };

  return (
    <>
      <h1 className='text-[28px] font-medium'>
        Tạo tài khoản seller
      </h1>
      <Form
        name="normal_login" onFinish={onFinish}
        layout='vertical'
      >
        <Form.Item
          label={<strong>Tên tài khoản</strong>}
          name="username"
          className='!mb-4'
          rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={<strong>Email</strong>}
          className='!mb-3'
          name="email"
          rules={[
            { required: true, message: 'Vui lòng nhập tên đăng nhập!' },
            { type: 'email', message: 'Vui lòng nhập email hợp lệ!' }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={<strong>mật khẩu</strong>}
          className='!mb-4'
          name="password"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
        >
          <Input.Password
            type="password"
            placeholder="Mật khẩu"
          />
        </Form.Item>
        <Form.Item
          name="confirm"
          label={<strong>Xác nhận mật khẩu</strong>}
          dependencies={['password']}
          className='!mb-4'
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập mật khẩu',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Mật khẩu mới bạn đã nhập không khớp!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label={<strong>Mã mời</strong>}
          name="code"
          className='!mb-4'
          rules={[{ required: true, message: 'Vui lòng nhập mã mời!' }]}
        >
          <Input />
        </Form.Item>
        <Divider className='!mb-3' />
        <Form.Item
          label={<strong>Tên cửa hàng</strong>}
          name="code"
          className='!mb-4'
          rules={[{ required: true, message: 'Vui lòng nhập tên cửa hàng!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={<strong>Địa chỉ cửa hàng</strong>}
          name="code"
          className='!mb-4'
          rules={[{ required: true, message: 'Vui lòng địa chỉ cửa hàng!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item className='!mb-2'>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button w-full  !font-medium !h-[32px]"
            loading={isPending}
          >
            Tạo tài khoản
          </Button>
        </Form.Item>
        <div className="flex justify-center items-center pb-4 ">
          <span className="border-t border-gray-300 w-1/6 mr-1"></span>
          <span className="text-[#767676] text-[11px]">Bạn đã có tài khoản Amazon Seller?</span>
          <span className="border-t border-gray-300 w-1/6 ml-1"></span>
        </div>

        <Button className='login_register !w-full !h-[28px]' onClick={() => router.push('/sign-in')}>
          Đăng nhập
        </Button>

      </Form>
    </>
  );
};

export default SignUpForm;