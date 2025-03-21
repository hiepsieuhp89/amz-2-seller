"use client"

import { type MenuProps, Dropdown, Avatar, Space, Typography } from "antd"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {  UserOutlined, LockOutlined, LogoutOutlined } from "@ant-design/icons"
import { useUser } from "@/context/useUserContext"

const { Text, Title } = Typography

const AvatarDropdown = () => {
  const router = useRouter()
  const { user, logoutUser } = useUser()
  const [isClient, setIsClient] = useState(false)
  
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

  const items: MenuProps["items"] = [
    {
      key: "0",
      label: "Thông tin tài khoản",
      icon: <UserOutlined />,
    },
    {
      type: "divider",
    },
    {
      key: "1",
      label: "Đổi mật khẩu",
      icon: <LockOutlined />,
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
  )
}

export default AvatarDropdown

