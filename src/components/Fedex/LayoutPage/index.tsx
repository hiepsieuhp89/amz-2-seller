"use client"
import {
  mdiPackageVariantClosed,
  mdiPackageVariantClosedCheck,
  mdiChevronDown,
  mdiChevronRight,
} from "@mdi/js"
import Icon from "@mdi/react"
import type { MenuProps } from "antd"
import { Menu } from "antd"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import { useEffect, useState } from "react"
import "./styles.css"

interface LayoutFedExProps {
  isSidebarOpen: boolean
}

function LayoutPage({ isSidebarOpen }: LayoutFedExProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [path, setPath] = useState(`fedex`)
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null)

  const menu = [
    {
      key: "/fedex",
      name: "Đơn hàng",
      icon: <Icon path={mdiPackageVariantClosed} size={0.8} />,
      activeIcon: <Icon path={mdiPackageVariantClosedCheck} size={0.8} />,
      path: `/fedex`,
    },
    // Add more menu items as needed
  ]

  useEffect(() => {
    setPath(pathname)
  }, [pathname])

  const isActive = (menuPath: string | undefined) => {
    if (!menuPath) return false
    if (path === menuPath) return true;

    for (const item of menu) {
      if (item.path && path.startsWith(item.path) && item.path.length > menuPath.length) {
        return false;
      }
    }

    return path.startsWith(menuPath) && path.charAt(menuPath.length) === '/';
  }

  const handleMenuClick = (key: string) => {
    const selectedItem = menu.find((item) => item.key === key)
    if (selectedItem) {
      router.push(selectedItem.path)
      setPath(selectedItem.path)
    }
  }

  const getMenuItems = (): MenuProps["items"] => {
    return menu.map((item) => {
      const isItemActive = isActive(item.path);
      const displayIcon = isItemActive ? item.activeIcon : item.icon;


      return {
        key: item.key,
        icon: displayIcon,
        label: <span className="font-semibold">{item.name}</span>,
        onClick: () => handleMenuClick(item.key),
      }
    })
  }

  return (
    <div
      className="sidebar"
      style={{
        width: isSidebarOpen ? "280px" : "80px",
        backgroundColor: "#4D148C", // FedEx purple color
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
              {/* User Info */}
              <div className="flex flex-col gap-0 w-full items-center">
                <div className="flex items-center">
                  <span className="text-lg font-medium">Trang Shop</span>
                  <span className="ml-2 text-green-500">✓</span>
                </div>
                <div className="text-sm text-gray-200 mb-4">
                  trangtrang220921@gmail.com
                </div>
              </div>
            </div>
          )}
          <Menu
            mode="inline"
            theme="dark"
            style={{
              backgroundColor: "#4D148C", // FedEx purple color
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

