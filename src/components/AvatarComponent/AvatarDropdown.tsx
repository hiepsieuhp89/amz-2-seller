"use client"

import { type MenuProps, Dropdown, Avatar, Space, Typography } from "antd"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import {  UserOutlined, LockOutlined, LogoutOutlined } from "@ant-design/icons"
import { useUser } from "@/context/useUserContext"

const { Text, Title } = Typography

const AvatarDropdown = () => {
  const router = useRouter()
  const { user, logoutUser } = useUser()
  const handleClickLogout = () => {
    logoutUser()
  }

  const getFirstLetter = () => {
    return user?.username ? user.username.charAt(0).toUpperCase() : "U"
  }

  // Determine avatar color based on role
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
          <Text type={user?.role === "admin" ? "secondary" : "success"}>
            {user?.role === "admin" ? "Admin" : "Người dùng"}
          </Text>
        </div>
      </Space>
    </Dropdown>
  )
}

export default AvatarDropdown

