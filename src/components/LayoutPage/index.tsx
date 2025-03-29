"use client"
import {
  mdiCartOutline,
  mdiChevronDown,
  mdiChevronRight,
  mdiCogOutline,
  mdiHome,
  mdiHomeOutline,
  mdiPackageVariant,
  mdiPackageVariantClosed,
  mdiStoreOutline,
  mdiMessageTextOutline,
  mdiMessageText,
  mdiStar,
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
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

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
    {
      key: "/seller/reviews",
      name: "Đánh giá sản phẩm",
      icon: <Icon path={mdiStar} size={0.8} />,
      activeIcon: <Icon path={mdiStar} size={0.8} color={"#FCAF17"} />,
      path: `/seller/reviews`,
    },
    {
      key: "/seller/account-packages",
      name: "Gói tài khoản",
      icon: <Icon path={mdiCartOutline} size={0.8} />,
      activeIcon: <Icon path={mdiCartOutline} size={0.8} color={"#FCAF17"} />,
      children: [
        {
          key: "seller-packages",
          name: "Các gói",
          path: "/seller/seller-packages",
        },
      ],
    },
    {
      key: "/seller/marketing-packages",
      name: "Gói tiếp thị",
      icon: <Icon path={mdiCartOutline} size={0.8} />,
      activeIcon: <Icon path={mdiCartOutline} size={0.8} color={"#FCAF17"} />,
      children: [
        {
          key: "spread-packages",
          name: "Các gói",
          path: "/seller/spread-packages",
        },
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
    {
      key: "/seller/chat",
      name: "Chat trực tuyến",
      icon: <Icon path={mdiMessageTextOutline} size={0.8} />,
      activeIcon: <Icon path={mdiMessageText} size={0.8} color={"#FCAF17"} />,
      path: `/seller/chat`,
      badge: {
        text: "",
        count: 0,
        color: "#f08806",
      },
    },
  ]

  useEffect(() => {
    setPath(pathname)
  }, [pathname])

  const isActive = (menuPath: string | undefined) => {
    if (!menuPath) return false

    if (path === menuPath) return true

    for (const item of menu) {
      if (item.path && path.startsWith(item.path) && item.path.length > menuPath.length) {
        return false
      }
    }

    return path.startsWith(menuPath) && path.charAt(menuPath.length) === "/"
  }
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const filteredMenu = searchTerm
    ? menu.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : menu

  const getMenuItems = (): MenuProps["items"] => {
    return filteredMenu.map((item) => {
      const isItemActive = isActive(item.path)
      const displayIcon = isItemActive ? item.activeIcon : item.icon

      if (item.children) {
        return {
          key: item.key,
          icon: displayIcon,
          label: <span className="font-medium">{item.name}</span>,
          children: item.children.map((child) => ({
            key: child.key,
            label: (
              <Link href={child.path} onClick={() => setPath(child.path)}>
                <span className="font-medium">{child.name}</span>
              </Link>
            ),
          })),
          expandIcon: ({ isOpen }) =>
            isOpen ? <Icon path={mdiChevronDown} size={0.8} /> : <Icon path={mdiChevronRight} size={0.8} />,
        }
      }

      let label: React.ReactNode = (
        <Link href={item.path} onClick={() => setPath(item.path)}>
          <span className="font-medium">{item.name}</span>
        </Link>
      )
      
      if (item.badge) {
        label = (
          <Link href={item.path} onClick={() => setPath(item.path)}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                paddingRight: "4px",
              }}
              key={item.key}
            >
              <span className="font-medium">{item.name}</span>
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
                    boxShadow: "0 0 4px rgba(255, 255, 255, 0.3)",
                  }}
                  className="ant-badge-no-border"
                />
              )}
            </div>
          </Link>
        )
      }

      return {
        key: item.key,
        icon: displayIcon,
        label,
      }
    })
  }

  const { user, profile } = useUser()
  const starSvg = (
    <svg viewBox="0 0 576 512" width="20" fill="gold">
      <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
    </svg>
  )

  // Animation variants for consistent timing
  const sidebarVariants = {
    open: { width: 280, transition: { duration: 0.3, ease: "easeInOut" } },
    closed: { width: 80, transition: { duration: 0.3, ease: "easeInOut" } },
  }

  const contentVariants = {
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.05,
      },
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  }

  const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2, ease: "easeOut" },
    },
    closed: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  }

  return (
    <motion.div
      className="sidebar"
      initial={isSidebarOpen ? "open" : "closed"}
      animate={isSidebarOpen ? "open" : "closed"}
      variants={sidebarVariants}
      style={{
        backgroundColor: "#131921 !important",
        height: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="fixed top-0 left-0 h-full flex flex-col pt-[68px] overflow-y-auto w-fit">
        <motion.div
          className="w-full"
          initial={isSidebarOpen ? "open" : "closed"}
          animate={isSidebarOpen ? "open" : "closed"}
          variants={sidebarVariants}
        >
          <AnimatePresence mode="wait">
            {isSidebarOpen && (
              <motion.div
                className="flex flex-col items-center p-4 text-white gap-4"
                initial="closed"
                animate="open"
                exit="closed"
                variants={contentVariants}
                style={{
                  width: "100%",
                  backgroundColor: "#131921 !important",
                  overflow: "hidden",
                }}
              >
                <motion.div variants={itemVariants} className="w-full flex flex-col items-center gap-1">
                  <div className="text-[#ff9900] flex items-center cursor-pointer">
                    <Link href={`/shop?id=${user?.id || ""}`} className="font-medium text-sm flex-shrink-0">
                      Ghé thăm cửa hàng
                    </Link>
                    <span className="ml-1 flex-shrink-0">→</span>
                  </div>

                  <div className="flex flex-col gap-0 w-full items-center">
                    {/* Shop Info */}
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <span className="text-lg font-medium flex-shrink-0">{profile?.data?.shopName || "Cửa hàng chưa có tên"}</span>
                      <div className="h-7 w-7 relative flex-shrink-0">
                        <Image
                          draggable={false}
                          quality={100}
                          height={100}
                          width={100}
                          className="object-cover"
                          src={"/images/tick-icon.png"}
                          alt="logo"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="text-sm text-gray-300 flex-shrink-0">{user?.email}</div>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-yellow-400 text-xl">
                        {starSvg}
                      </span>
                    ))}
                  </div>

                  {/* Trust Score */}
                  <div className="mb-4">
                    <span className="text-white font-medium text-sm">Điểm uy tín: </span>
                    <span className="text-green-400 text-sm">100</span>
                  </div>

                  {/* Search Box */}
                  <div className="w-full">
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
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div
            initial={false}
            animate={{
              width: isSidebarOpen ? "280px" : "80px",
              transition: { duration: 0.3, ease: "easeInOut" },
            }}
          >
            <Menu
              mode="inline"
              theme="dark"
              style={{
                borderRight: "none",
                width: "100%",
                transition: "all 0.3s ease",
              }}
              defaultSelectedKeys={[menu.find((item) => isActive(item.path))?.key || ""]}
              defaultOpenKeys={[activeSubMenu || ""]}
              items={getMenuItems()}
              inlineCollapsed={!isSidebarOpen}
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default LayoutPage

