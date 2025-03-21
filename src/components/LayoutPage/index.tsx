"use client"
import { usePathname, useRouter } from "next/navigation"
import type React from "react"
import { useEffect, useState } from "react"
import Icon from "@mdi/react"
import {
  mdiHomeOutline, mdiHome,
  mdiStoreOutline, mdiStore,
  mdiFolderOutline, mdiFolder,
  mdiStarOutline, mdiStar,
  mdiCommentTextOutline, mdiCommentText,
  mdiCartOutline, mdiCart,
  mdiCogOutline, mdiCog,
  mdiClockTimeThreeOutline, mdiClockTimeThree,
  mdiChevronRight, mdiChevronDown
} from "@mdi/js"
import { Input, Menu, Badge } from "antd"
import type { MenuProps } from "antd"
import "./styles.css"
interface LayoutGAProps {
  isSidebarOpen: boolean
}

function LayoutPage({ isSidebarOpen }: LayoutGAProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [path, setPath] = useState(`seller/dashboard`)
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const menu = [
    {
      key: "/seller/dashboard",
      name: "Bảng điều khiển",
      icon: <Icon path={mdiHomeOutline} size={0.8} />,
      activeIcon: <Icon path={mdiHome} size={0.8} />,
      path: `/seller/dashboard`,
    },
    {
      key: "/seller/products/storehouse",
      name: "Storehouse",
      icon: <Icon path={mdiStoreOutline} size={0.8} />,
      activeIcon: <Icon path={mdiStore} size={0.8} />,
      path: `/seller/products/storehouse`,
    },
    {
      key: "/seller/products",
      name: "Các sản phẩm",
      icon: <Icon path={mdiFolderOutline} size={0.8} />,
      activeIcon: <Icon path={mdiFolder} size={0.8} />,
      path: `/seller/products`,
    },
    {
      key: "/seller/reviews",
      name: "Đánh giá sản phẩm",
      icon: <Icon path={mdiStarOutline} size={0.8} />,
      activeIcon: <Icon path={mdiStar} size={0.8} />,
      path: "/seller/reviews",
    },
    {
      key: "/seller/orders",
      name: "Đơn hàng",
      icon: <Icon path={mdiCartOutline} size={0.8} />,
      activeIcon: <Icon path={mdiCart} size={0.8} />,
      path: `/seller/orders`,
      badge: {
        text: "Đang chờ xử lý",
        count: 1,
        color: "#f08806",
      },
    },
    {
      key: "/seller/conversations",
      name: "Cuộc trò chuyện",
      icon: <Icon path={mdiCommentTextOutline} size={0.8} />,
      activeIcon: <Icon path={mdiCommentText} size={0.8} />,
      path: "/seller/conversations",
      badge: {
        count: 1,
        color: "#f08806",
      },
    },
    {
      key: "/seller/account-packages",
      name: "Gói tài khoản",
      icon: <Icon path={mdiCartOutline} size={0.8} />,
      activeIcon: <Icon path={mdiCart} size={0.8} />,
      children: [
        { key: "seller-packages", name: "Gói tài khoản", path: "/seller/seller-packages" },
        { key: "packages-payment", name: "Gói đã mua", path: "/seller/packages-payment-list" },
      ],
    },
    {
      key: "/seller/marketing-packages",
      name: "Gói tiếp thị",
      icon: <Icon path={mdiCartOutline} size={0.8} />,
      activeIcon: <Icon path={mdiCart} size={0.8} />,
      children: [
        { key: "spread-packages", name: "Gói tài khoản", path: "/seller/spread-packages" },
        { key: "spread-packages-payment", name: "Gói đã mua", path: "/seller/spread-packages-payment-list" },
      ],
    },
    {
      key: "/seller/shop-settings",
      name: "Cài đặt cửa hàng",
      icon: <Icon path={mdiCogOutline} size={0.8} />,
      activeIcon: <Icon path={mdiCog} size={0.8} />,
      path: "/seller/shop",
    },
    {
      key: "/seller/payment-history",
      name: "Lịch sử thanh toán",
      icon: <Icon path={mdiClockTimeThreeOutline} size={0.8} />,
      activeIcon: <Icon path={mdiClockTimeThree} size={0.8} />,
      path: "/seller/payment-history",
    },
  ]

  useEffect(() => {
    setPath(pathname)
  }, [pathname])

  const isActive = (menuPath: string | undefined) => {
    if (!menuPath) return false

    // Trường hợp đường dẫn chính xác trùng khớp
    if (path === menuPath) return true;

    // Kiểm tra xem có menu item nào khác phù hợp với đường dẫn hiện tại hơn không
    for (const item of menu) {
      if (item.path && path.startsWith(item.path) && item.path.length > menuPath.length) {
        // Có menu khác phù hợp hơn (dài hơn)
        return false;
      }
    }

    // Kiểm tra nếu là đường dẫn con
    return path.startsWith(menuPath) && path.charAt(menuPath.length) === '/';
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
      const isItemActive = isActive(item.path);
      const displayIcon = isItemActive ? item.activeIcon : item.icon;

      if (item.children) {
        return {
          key: item.key,
          icon: displayIcon,
          label: <span className="font-semibold">{item.name}</span>,
          children: item.children.map((child) => ({
            key: child.key,
            label: <span className="font-semibold">{child.name}</span>,
            onClick: () => handleSubMenuClick(child.path),
          })),
          expandIcon: ({ isOpen }) => (isOpen ? <Icon path={mdiChevronDown} size={0.8} /> : <Icon path={mdiChevronRight} size={0.8} />),
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
        icon: displayIcon,
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
        backgroundColor: "#131921",
        height: "100%",
        transition: "width 0.3s",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          transition: "width 0.3s",
        }}
        className={`fixed top-0 left-0 w-full h-full flex flex-col pt-[68px]`}>
        <div className={`${isSidebarOpen ? "w-fit overflow-y-auto" : "w-fit overflow-hidden"}`}>
          {isSidebarOpen && <div className="p-2 w-full flex-1 bg-main-dark-blue">
            <Input
              placeholder="Tìm kiếm trong menu"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                border: "none",
                color: "white",
                borderRadius: "4px",
                width: "100%",
              }}
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>}
          <Menu
            mode="inline"
            theme="dark"
            style={{
              backgroundColor: "#131921",
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
    </div>
  )
}

export default LayoutPage

