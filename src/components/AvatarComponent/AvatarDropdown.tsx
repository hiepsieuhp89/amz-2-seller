"use client"

import { type MenuProps, Dropdown, Avatar, Space, Typography, message } from "antd"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { UserOutlined, LockOutlined, LogoutOutlined } from "@ant-design/icons"
import { useUser } from "@/context/useUserContext"
import { useUpdateUser, useChangePassword } from "@/hooks/authentication"
import { Modal, Form, Input } from "antd"

const { Text, Title } = Typography

const AvatarDropdown = () => {
  const router = useRouter()
  const { user, logoutUser } = useUser()
  const [isClient, setIsClient] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [form] = Form.useForm()
  const [passwordForm] = Form.useForm()
  const { mutateAsync: updateUser, isPending: isUpdating } = useUpdateUser()
  const { mutateAsync: changePassword, isPending: isChangingPassword } = useChangePassword()
  const [messageApi, contextHolder] = message.useMessage()

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleClickLogout = () => {
    logoutUser()
  }

  const getFirstLetter = () => {
    return user?.username ? user.username.charAt(0).toUpperCase() : "U"
  }

  const getAvatarColor = () => {
    return user?.role === "admin" ? "#1677ff" : "#52c41a"
  }

  const handleProfileUpdate = async (values: any) => {
    try {
      await updateUser({
        phone: values.phone,
        fullName: values.fullName,
        storeName: values.storeName,
        storeAddress: values.storeAddress
      })
      messageApi.success("Cập nhật thông tin thành công!")
      setIsModalOpen(false)
    } catch (error) {
      messageApi.error("Có lỗi xảy ra khi cập nhật thông tin")
    }
  }

  const handleChangePassword = async (values: any) => {
    try {
      await changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword
      })
      messageApi.success("Đổi mật khẩu thành công!")
      setIsPasswordModalOpen(false)
      passwordForm.resetFields()
    } catch (error) {
      messageApi.error("Có lỗi xảy ra khi đổi mật khẩu")
    }
  }

  const showProfileModal = () => {
    form.setFieldsValue({
      username: user?.username,
      email: user?.email,
      phone: user?.phone,
      fullName: user?.fullName,
      invitationCode: user?.invitationCode,
      storeName: user?.storeName,
      storeAddress: user?.storeAddress
    })
    setIsModalOpen(true)
  }

  const items: MenuProps["items"] = [
    {
      key: "0",
      label: "Thông tin tài khoản",
      icon: <UserOutlined />,
      onClick: showProfileModal
    },
    {
      type: "divider",
    },
    {
      key: "1",
      label: "Đổi mật khẩu",
      icon: <LockOutlined />,
      onClick: () => setIsPasswordModalOpen(true)
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: (
        <Text type="danger" strong>
          Đăng xuất
        </Text>
      ),
      icon: <LogoutOutlined style={{ color: "#ff4d4f" }} />,
      onClick: handleClickLogout,
    },
  ]

  if (!isClient) {
    return <div className="avatar-placeholder"></div>
  }

  return (
    <>
      {contextHolder}
      <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight" arrow>
        <Space className="cursor-pointer rounded-md transition-all">
          <Avatar
            size={45}
            style={{
              backgroundColor: getAvatarColor(),
              fontSize: "18px",
              fontWeight: "bold",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {getFirstLetter()}
          </Avatar>
          <div className="flex flex-col">
            <Text strong className="!text-white">{user?.username}</Text>
            <Text
              className="!text-xs"
              type={user?.role === "admin" ? "secondary" : "success"}>
              {user?.role === "admin" ? "Admin" : "Seller"}
            </Text>
          </div>
        </Space>
      </Dropdown>

      <Modal
        title="Cập nhật thông tin tài khoản"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
        confirmLoading={isUpdating}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleProfileUpdate}
        >
          <Form.Item
            label="Tên tài khoản"
            name="username"
          >
            <Input disabled readOnly />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
          >
            <Input disabled readOnly />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Họ và tên"
            name="fullName"
            rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Tên cửa hàng"
            name="storeName"
            rules={[{ required: true, message: 'Vui lòng nhập tên cửa hàng!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Địa chỉ cửa hàng"
            name="storeAddress"
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ cửa hàng!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mã mời"
            name="invitationCode"
          >
            <Input disabled readOnly />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Đổi mật khẩu"
        open={isPasswordModalOpen}
        onCancel={() => {
          setIsPasswordModalOpen(false)
          passwordForm.resetFields()
        }}
        onOk={() => passwordForm.submit()}
        confirmLoading={isChangingPassword}
      >
        <Form
          form={passwordForm}
          layout="vertical"
          onFinish={handleChangePassword}
        >
          <Form.Item
            label="Mật khẩu hiện tại"
            name="currentPassword"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Mật khẩu mới"
            name="newPassword"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Xác nhận mật khẩu mới"
            name="confirmPassword"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: 'Vui lòng xác nhận mật khẩu mới!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu mới không khớp!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default AvatarDropdown

