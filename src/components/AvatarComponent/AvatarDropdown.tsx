"use client"

import { useUser } from "@/context/useUserContext"
import { useUpdateUser } from "@/hooks/authentication"
import { LockOutlined, LogoutOutlined } from "@ant-design/icons"
import { type MenuProps, Avatar, Dropdown, Form, Input, message, Modal, Space, Typography } from "antd"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const { Text, Title } = Typography

interface AvatarDropdownProps {
  isMobile?: boolean;
  onClose?: () => void;
}

const AvatarDropdown = ({ isMobile, onClose }: AvatarDropdownProps) => {
  const router = useRouter()
  const { user, logoutUser, profile } = useUser()
  const [isClient, setIsClient] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()
  const { mutate: updateUser, isPending } = useUpdateUser()

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleClickLogout = () => {
    if (onClose) onClose();
    logoutUser()
  }

  const getFirstLetter = () => {
    return user?.username ? user.username.charAt(0).toUpperCase() : "U"
  }

  const getAvatarColor = () => {
    return user?.role === "admin" ? "#1677ff" : "#52c41a"
  }

  const handleChangePassword = (values: { oldFedexPassword: string; fedexPassword: string }) => {
    // Check if user already has a fedexPassword
    const hasFedexPassword = Boolean(profile?.data?.fedexPassword)
    
    if (!hasFedexPassword) {
      // If user doesn't have a fedexPassword yet, allow setting it without verification
      updateUser(
        { fedexPassword: values.fedexPassword },
        {
          onSuccess: () => {
            message.success("Đặt mật khẩu giao dịch thành công")
            setIsModalOpen(false)
            form.resetFields()
          },
          onError: (error) => {
            message.error(error.message || "Đặt mật khẩu thất bại")
          },
        }
      )
      return
    }

    // Verify old password when changing existing fedexPassword
    if (values.oldFedexPassword !== profile?.data?.fedexPassword) {
      message.error("Mật khẩu giao dịch cũ không chính xác")
      return
    }

    // Update fedexPassword after verification
    updateUser(
      { fedexPassword: values.fedexPassword },
      {
        onSuccess: () => {
          message.success("Đổi mật khẩu giao dịch thành công")
          setIsModalOpen(false)
          form.resetFields()
        },
        onError: (error) => {
          message.error(error.message || "Đổi mật khẩu thất bại")
        },
      }
    )
  }

  const handlePasswordClick = () => {
    if (onClose) onClose();
    setIsModalOpen(true);
    // Reset form when opening modal
    form.resetFields();
  }

  const items: MenuProps["items"] = [
    // {
    //   key: "0",
    //   label: "Thông tin tài khoản",
    //   icon: <UserOutlined />,
    // },
    // {
    //   type: "divider",
    // },
    {
      key: "1",
      label: profile?.data?.fedexPassword ? "Đổi mật khẩu giao dịch" : "Đặt mật khẩu giao dịch",
      icon: <LockOutlined />,
      onClick: () => handlePasswordClick(),
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

  // Mobile version of the menu
  if (isMobile) {
    return (
      <>
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-4">
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
              <Text strong>{user?.username}</Text>
              <Text
                className="text-xs"
                type={user?.role === "admin" ? "secondary" : "success"}>
                {user?.role === "admin" ? "Admin" : "Seller"}
              </Text>
            </div>
          </div>
          
          <button 
            onClick={handlePasswordClick}
            className="flex items-center gap-3 text-gray-800 hover:text-purple-800 py-3 border-b border-gray-200"
          >
            <LockOutlined />
            <span>{profile?.data?.fedexPassword ? "Đổi mật khẩu giao dịch" : "Đặt mật khẩu giao dịch"}</span>
          </button>
          
          <button 
            onClick={handleClickLogout}
            className="flex items-center gap-3 text-red-600 hover:text-red-800 py-3"
          >
            <LogoutOutlined />
            <span>Đăng xuất</span>
          </button>
        </div>

        <Modal
          title={profile?.data?.fedexPassword ? "Đổi mật khẩu giao dịch" : "Đặt mật khẩu giao dịch"}
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          <Form
            form={form}
            onFinish={handleChangePassword}
            layout="vertical"
          >
            {profile?.data?.fedexPassword && (
              <Form.Item
                label="Mật khẩu giao dịch hiện tại"
                name="oldFedexPassword"
                rules={[
                  { required: true, message: "Vui lòng nhập mật khẩu giao dịch hiện tại" },
                ]}
              >
                <Input.Password />
              </Form.Item>
            )}

            <Form.Item
              label="Mật khẩu giao dịch mới"
              name="fedexPassword"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu giao dịch mới" },
                { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    // Only check if passwords don't match when changing existing password
                    if (!value || !profile?.data?.fedexPassword || getFieldValue('oldFedexPassword') !== value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error('Mật khẩu mới không được trùng với mật khẩu cũ'))
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
                disabled={isPending}
              >
                {isPending ? "Đang xử lý..." : "Xác nhận"}
              </button>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }

  // Desktop version with dropdown
  return (
    <>
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
        title={profile?.data?.fedexPassword ? "Đổi mật khẩu giao dịch" : "Đặt mật khẩu giao dịch"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form
          form={form}
          onFinish={handleChangePassword}
          layout="vertical"
        >
          {profile?.data?.fedexPassword && (
            <Form.Item
              label="Mật khẩu giao dịch hiện tại"
              name="oldFedexPassword"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu giao dịch hiện tại" },
              ]}
            >
              <Input.Password />
            </Form.Item>
          )}

          <Form.Item
            label="Mật khẩu giao dịch mới"
            name="fedexPassword"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu giao dịch mới" },
              { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  // Only check if passwords don't match when changing existing password
                  if (!value || !profile?.data?.fedexPassword || getFieldValue('oldFedexPassword') !== value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Mật khẩu mới không được trùng với mật khẩu cũ'))
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
              disabled={isPending}
            >
              {isPending ? "Đang xử lý..." : "Xác nhận"}
            </button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default AvatarDropdown

