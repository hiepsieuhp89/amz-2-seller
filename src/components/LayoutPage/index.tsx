"use client"
import { usePathname, useRouter } from "next/navigation"
import type React from "react"
import { useEffect, useState } from "react"
import {
  HomeOutlined,
  ShopOutlined,
  FolderOutlined,
  StarOutlined,
  MessageOutlined,
  ShoppingOutlined,
  SettingOutlined,
  HistoryOutlined,
  RightOutlined,
  DownOutlined,
} from "@ant-design/icons"
import { Input, Menu, Badge } from "antd"
import type { MenuProps } from "antd"

interface LayoutGAProps {
  isSidebarOpen: boolean
}

function LayoutPage({ isSidebarOpen }: LayoutGAProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [path, setPath] = useState(`home/seller`)
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const menu = [
    {
      key: "dashboard",
      name: "Bảng điều khiển",
      icon: <HomeOutlined />,
      path: `/seller/dashboard`,
    },
    {
      key: "storehouse",
      name: "Storehouse",
      icon: <ShopOutlined />,
      path: `/seller/products/storehouse`,
    },
    {
      key: "products",
      name: "Các sản phẩm",
      icon: <FolderOutlined />,
      path: `/seller/products`,
    },
    {
      key: "reviews",
      name: "Đánh giá sản phẩm",
      icon: <StarOutlined />,
      path: `/seller/reviews`,
    },
    {
      key: "orders",
      name: "Đơn hàng",
      icon: <ShoppingOutlined />,
      path: `/seller/orders`,
      badge: {
        text: "Đang chờ xử lý",
        count: 1,
        color: "#f08806",
      },
    },
    {
      key: "conversations",
      name: "Cuộc trò chuyện",
      icon: <MessageOutlined />,
      path: `/seller/conversations`,
      badge: {
        count: 1,
        color: "#f08806",
      },
    },
    {
      key: "account-packages",
      name: "Gói tài khoản",
      icon: <ShoppingOutlined />,
      children: [
        { key: "seller-packages", name: "Gói tài khoản", path: "/seller/seller-packages" },
        { key: "packages-payment", name: "Gói đã mua", path: "/seller/packages-payment-list" },
      ],
    },
    {
      key: "marketing-packages",
      name: "Gói tiếp thị",
      icon: <ShoppingOutlined />,
      children: [
        { key: "spread-packages", name: "Gói tài khoản", path: "/seller/spread-packages" },
        { key: "spread-packages-payment", name: "Gói đã mua", path: "/seller/spread-packages-payment-list" },
      ],
    },
    {
      key: "shop-settings",
      name: "Cài đặt cửa hàng",
      icon: <SettingOutlined />,
      path: `/seller/shop`,
    },
    {
      key: "payment-history",
      name: "Lịch sử thanh toán",
      icon: <HistoryOutlined />,
      path: `/seller/money-withdraw-requests`,
    },
  ]

  useEffect(() => {
    setPath(pathname)
  }, [pathname])

  const isActive = (menuPath: string | undefined) => {
    if (!menuPath) return false
    return path.includes(menuPath)
  }

  const handleMenuClick = (key: string) => {
    const selectedItem = menu.find((item) => item.key === key)
    if (selectedItem && !selectedItem.children) {
      router.push(selectedItem.path)
      setPath(selectedItem.path)
    }
  }

  const handleSubMenuClick = (subPath: string) => {
    router.push(subPath)
    setPath(subPath)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const filteredMenu = searchTerm
    ? menu.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : menu

  const getMenuItems = (): MenuProps["items"] => {
    return filteredMenu.map((item) => {
      if (item.children) {
        return {
          key: item.key,
          icon: item.icon,
          label: <span className="font-semibold">{item.name}</span>,
          children: item.children.map((child) => ({
            key: child.key,
            label: <span className="font-semibold">{child.name}</span>,
            onClick: () => handleSubMenuClick(child.path),
          })),
          expandIcon: ({ isOpen }) => (isOpen ? <DownOutlined /> : <RightOutlined />),
        }
      }

      let label: React.ReactNode = <span className="font-semibold">{item.name}</span>
      if (item.badge) {
        label = (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", paddingRight: "4px" }}>
            <span className="font-semibold">{item.name}</span>
            {item.badge.text ? (
              <Badge
                count={item.badge.text}
                style={{ 
                  backgroundColor: item.badge.color, 
                  fontSize: "12px", 
                  padding: "0 8px", 
                  borderRadius: "4px", 
                  boxShadow: "0 0 4px rgba(255, 255, 255, 0.3)",
                }}
                className="ant-badge-no-border"
              />
            ) : (
              <Badge 
                count={item.badge.count} 
                style={{ 
                  backgroundColor: item.badge.color, 
                  borderRadius: "4px", 
                  boxShadow: "0 0 4px rgba(255, 255, 255, 0.3)"
                }}
                className="ant-badge-no-border"
              />
            )}
          </div>
        )
      }

      return {
        key: item.key,
        icon: item.icon,
        label,
        onClick: () => handleMenuClick(item.key),
      }
    })
  }

  return (
    <div
      className="sidebar"
      style={{
        width: isSidebarOpen ? "280px" : "80px",
        backgroundColor: "#1e1e2d",
        height: "100%",
        transition: "width 0.3s",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        marginTop: "68px",
      }}
    >
      {isSidebarOpen && (
        <div style={{ padding: "16px", flexShrink: 0 }}>
          <Input
            placeholder="Tìm kiếm trong menu"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              border: "none",
              color: "white",
              borderRadius: "4px",
            }}
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      )}

      <div style={{ flexGrow: 1, overflowY: "auto", overflowX: "hidden" }}>
        <Menu
          mode="inline"
          theme="dark"
          style={{
            backgroundColor: "#1e1e2d",
            borderRight: "none",
            width: isSidebarOpen ? "280px" : "80px",
          }}
          defaultSelectedKeys={[menu.find((item) => isActive(item.path))?.key || ""]}
          defaultOpenKeys={[activeSubMenu || ""]}
          items={getMenuItems()}
          inlineCollapsed={!isSidebarOpen}
        />
      </div>
    </div>
  )
}

export default LayoutPage

