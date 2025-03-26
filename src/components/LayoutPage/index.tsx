"use client"
import {
  mdiCartOutline,
  mdiChevronDown,
  mdiChevronRight,
  mdiCogOutline,
  mdiPackageVariant,
  mdiPackageVariantClosed,
  mdiStoreOutline,

} from "@mdi/js"
import Icon from "@mdi/react"
import type { MenuProps } from "antd"
import { Badge, Input, Menu } from "antd"
import { usePathname, useRouter } from "next/navigation"
import type React from "react"
import { useEffect, useState } from "react"
import "./styles.css"
import Image from "next/image"
import { useUser } from "@/context/useUserContext"
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
    // {
    //   key: "/seller/dashboard",
    //   name: "Bảng điều khiển",
    //   icon: <Icon path={mdiHomeOutline} size={0.8} />,
    //   activeIcon: <Icon path={mdiHome} size={0.8} />,
    //   path: `/seller/dashboard`,
    // },
    {
      key: "/seller/products",
      name: "Các sản phẩm",
      icon: <Icon path={mdiPackageVariant} size={0.8} />,
      activeIcon: <Icon path={mdiPackageVariant} size={0.8} color={"#FCAF17"} />,
      path: `/seller/products`,
    },
    {
      key: "/seller/products/storehouse",
      name: "Storehouse",
      icon: <Icon path={mdiStoreOutline} size={0.8} />,
      activeIcon: <Icon path={mdiStoreOutline} size={0.8} color={"#FCAF17"} />,
      path: `/seller/products/storehouse`,
    },
    //
    // {
    //   key: "/seller/selling-process",
    //   name: "Việc bán hàng",
    //   icon: <Icon path={mdiCash100} size={0.8} />,
    //   activeIcon: <Icon path={mdiCash100} size={0.8} color={"#FCAF17"} />,
    //   path: `/seller/selling-process`,
    // },
    // {
    //   key: "/seller/customers",
    //   name: "Khách hàng",
    //   icon: <Icon path={mdiAccountCashOutline} size={0.8} />,
    //   activeIcon: <Icon path={mdiAccountCashOutline} size={0.8} color={"#FCAF17"} />,
    //   path: `/seller/customers`,
    // },
    // {
    //   key: "/seller/sellers",
    //   name: "Người bán",
    //   icon: <Icon path={mdiAccountCogOutline} size={0.8} />,
    //   activeIcon: <Icon path={mdiAccountCogOutline} size={0.8} color={"#FCAF17"} />,
    //   path: `/seller/sellers`,
    // },
    // {
    //   key: "/seller/selling-functions",
    //   name: "Chức năng của người bán",
    //   icon: <Icon path={mdiAccountCogOutline} size={0.8} />,
    //   activeIcon: <Icon path={mdiAccountCogOutline} size={0.8} color={"#FCAF17"} />,
    //   path: `/seller/selling-functions`,
    // },
    // {
    //   key: "/seller/link-system",
    //   name: "Hệ thống liên kết",
    //   icon: <Icon path={mdiLinkBoxOutline} size={0.8} />,
    //   activeIcon: <Icon path={mdiLinkBoxOutline} size={0.8} color={"#FCAF17"} />,
    //   path: `/seller/link-system`,
    // },
    //
    // {
    //   key: "/seller/reviews",
    //   name: "Đánh giá sản phẩm",
    //   icon: <Icon path={mdiStarOutline} size={0.8} />,
    //   activeIcon: <Icon path={mdiStarOutline} size={0.8} color={"#FCAF17"} />,
    //   path: "/seller/reviews",
    // },
    {
      key: "/seller/orders",
      name: "Đơn hàng",
      icon: <Icon path={mdiCartOutline} size={0.8} />,
      activeIcon: <Icon path={mdiCartOutline} size={0.8} color={"#FCAF17"} />,
      path: `/seller/orders`,
      badge: {
        text: "",
        count: 0,
        color: "#f08806",
      },
    },
    // {
    //   key: "/seller/conversations",
    //   name: "Cuộc trò chuyện",
    //   icon: <Icon path={mdiCommentTextOutline} size={0.8} />,
    //   activeIcon: <Icon path={mdiCommentTextOutline} size={0.8} color={"#FCAF17"} />,
    //   path: "/seller/conversations",
    //   badge: {
    //     count: 1,
    //     color: "#f08806",
    //   },
    // },
    {
      key: "/seller/account-packages",
      name: "Gói tài khoản",
      icon: <Icon path={mdiCartOutline} size={0.8} />,
      activeIcon: <Icon path={mdiCartOutline} size={0.8} color={"#FCAF17"} />,
      children: [
        { key: "seller-packages", name: "Các gói", path: "/seller/seller-packages" },
        // { key: "packages-payment", name: "Gói đã mua", path: "/seller/packages-payment-list" },
      ],
    },
    {
      key: "/seller/marketing-packages",
      name: "Gói tiếp thị",
      icon: <Icon path={mdiCartOutline} size={0.8} />,
      activeIcon: <Icon path={mdiCartOutline} size={0.8} color={"#FCAF17"} />,
      children: [
        { key: "spread-packages", name: "Các gói", path: "/seller/spread-packages" },
        // { key: "spread-packages-payment", name: "Gói đã mua", path: "/seller/spread-packages-payment-list" },
      ],
    },
    {
      key: "/seller/shop-settings",
      name: "Cài đặt cửa hàng",
      icon: <Icon path={mdiCogOutline} size={0.8} />,
      activeIcon: <Icon path={mdiCogOutline} size={0.8} color={"#FCAF17"} />,
      path: "/seller/shop",
    },
    {
      key: "/seller/payment-history",
      name: "Lịch sử thanh toán",
      icon: <Icon path={mdiPackageVariantClosed} size={0.8} />,
      activeIcon: <Icon path={mdiPackageVariantClosed} size={0.8} color={"#FCAF17"} />,
      path: "/seller/money-withdraw-requests",
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

  const { user } = useUser()
  const starSvg = <svg viewBox="0 0 576 512" width="20" fill="gold">
    <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
  </svg>
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
          {isSidebarOpen && (
            <div className="flex flex-col items-center p-4 text-white gap-4">
              {/* Shop Link */}
              <div className="text-[#ff9900] flex items-center cursor-pointer">
                <span className="font-semibold text-sm">Ghé thăm cửa hàng</span>
                <span className="ml-1">→</span>
              </div>

              <div className="flex flex-col gap-0 w-full items-center">
                {/* Shop Info */}
                <div className="flex items-center gap-1">
                  <span className="text-lg font-medium">{user?.shopName || "Cửa hàng chưa có tên"}</span>
                  <div className="h-7 w-7 relative">
                    <Image
                      draggable={false}
                      quality={100}
                      height={100}
                      width={100}
                      className="object-cover"
                      src={"/images/tick-icon.png"} alt="logo" />
                  </div>
                </div>

                {/* Email */}
                <div className="text-sm text-gray-300">
                  {user?.email}
                </div>
              </div>

              {/* Rating Stars */}
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-yellow-400 text-xl">{starSvg}</span>
                ))}
              </div>

              {/* Trust Score */}
              <div className="mb-4">
                <span className="text-white font-semibold text-sm">Điểm uy tín: </span>
                <span className="text-green-400 text-sm">100</span>
              </div>

              {/* Search Box */}
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
            </div>
          )}
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

