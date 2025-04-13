"use client"
import {
  mdiPackageVariantClosed,
  mdiPackageVariantClosedCheck,
} from "@mdi/js"
import Icon from "@mdi/react"
import type { MenuProps } from "antd"
import { Menu } from "antd"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import { useEffect, useState } from "react"
import "./styles.css"
import { useUser } from "@/context/useUserContext"
import { useWindowSize } from "@/hooks/useWindowSize"

interface LayoutFedExProps {
  isSidebarOpen: boolean
}

function LayoutPage({ isSidebarOpen }: LayoutFedExProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [path, setPath] = useState(`/`)
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null)
  const { width } = useWindowSize()
  const isMobile = width ? width < 768 : false

  const menu = [
    {
      key: "/",
      name: "Đơn hàng",
      icon: <Icon path={mdiPackageVariantClosed} size={0.8} />,
      activeIcon: <Icon path={mdiPackageVariantClosedCheck} size={0.8} />,
      path: `/`,
    },
    // Add more menu items as needed
  ]

  useEffect(() => {
    setPath(pathname)
  }, [pathname])

  const isActive = (menuPath: string | undefined) => {
    if (menuPath === undefined) return false
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

  const { user, profile } = useUser()

  // Don't render sidebar at all on mobile devices
  if (isMobile) {
    return null;
  }

  return (
    <div
      className="sidebar"
      style={{
        width: isSidebarOpen ? "230px" : "0px",
        backgroundColor: "#4D148C", // FedEx purple color
        height: "100%",
        transition: "width 0.3s",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        zIndex: 9,
      }}
    >
      <div
        style={{
          transition: "width 0.3s",
          width: isSidebarOpen ? "230px" : "0px",
        }}
        className="fixed top-0 left-0 h-full flex flex-col pt-[68px]">
        <div className={`${isSidebarOpen ? "w-fit overflow-y-auto" : "w-fit overflow-hidden"}`}>
          {isSidebarOpen && (
            <div className="flex flex-col items-center p-4 text-white gap-4">
              {/* User Info */}
              <div className="flex flex-col gap-0 w-full items-center">
                <div className="flex items-center">
                  <span className="text-lg font-medium">{profile?.data?.shopName || "Cửa hàng chưa có tên"}</span>
                  {profile?.data?.shopStatus === "ACTIVE" ? (
                    <div className="h-7 w-7 relative">
                      <Image
                        draggable={false}
                        quality={100}
                        height={100}
                        width={100}
                        className="object-cover"
                        src={"/images/tick-icon.png"} alt="logo" />
                    </div>
                  ) : null}
                </div>
                <div className="text-sm text-gray-200 mb-4">
                  {profile?.data?.email}
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
              width: isSidebarOpen ? "230px" : "0px",
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

