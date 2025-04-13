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
  mdiMenu,
  mdiAccountOutline,
  mdiBullhornOutline,
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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useLayout } from "@/components/LayoutProvider"
import useSidebar from '@/stores/useSidebar'
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

function LayoutPage() {
  const { isSidebarOpen } = useSidebar()
  const router = useRouter()
  const pathname = usePathname()
  const [path, setPath] = useState(`seller/dashboard`)
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const { user } = useUser()
  const [shopLink, setShopLink] = useState("/shop?id=")
  const [isClient, setIsClient] = useState(false)
  const { isMobileSidebarOpen, toggleMobileSidebar } = useLayout()
  const { profile } = useUser()
  const menu = [
    {
      key: "",
      name: "Bảng điều khiển",
      icon: <Icon path={mdiHomeOutline} size={0.8} />,
      activeIcon: <Icon path={mdiHomeOutline} size={0.8} color={"#FCAF17"} />,
      path: ``,
    },
    {
      key: "/seller/products/storehouse",
      name: "Storehouse",
      icon: <Icon path={mdiStoreOutline} size={0.8} />,
      activeIcon: <Icon path={mdiStoreOutline} size={0.8} color={"#FCAF17"} />,
      path: `/seller/products/storehouse`,
    },
    {
      key: "/seller/products",
      name: "Các sản phẩm",
      icon: <Icon path={mdiPackageVariant} size={0.8} />,
      activeIcon: <Icon path={mdiPackageVariant} size={0.8} color={"#FCAF17"} />,
      path: `/seller/products`,
    },
    {
      key: "/seller/reviews",
      name: "Đánh giá sản phẩm",
      icon: <Icon path={mdiStar} size={0.8} />,
      activeIcon: <Icon path={mdiStar} size={0.8} color={"#FCAF17"} />,
      path: `/seller/reviews`,
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
      key: "/seller/account-packages",
      name: "Gói tài khoản",
      icon: <Icon path={mdiAccountOutline} size={0.8} />,
      activeIcon: <Icon path={mdiAccountOutline} size={0.8} color={"#FCAF17"} />,
      children: [
        {
          key: "seller-packages",
          name: "Các gói tài khoản",
          path: "/seller/seller-packages",
        },
        {
          key: "purchased-seller-packages",
          name: "Các gói đã mua",
          path: "/seller/purchased-seller-packages",
        },
      ],
    },
    {
      key: "/seller/marketing-packages",
      name: "Gói tiếp thị",
      icon: <Icon path={mdiBullhornOutline} size={0.8} />,
      activeIcon: <Icon path={mdiBullhornOutline} size={0.8} color={"#FCAF17"} />,
      children: [
        {
          key: "spread-packages",
          name: "Các gói tiếp thị",
          path: "/seller/spread-packages",
        },
        {
          key: "purchased-spread-packages",
          name: "Các gói đã mua",
          path: "/seller/purchased-spread-packages",
        },
      ],
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
    {
      key: "/seller/payment-history",
      name: "Lịch sử thanh toán",
      icon: <Icon path={mdiPackageVariantClosed} size={0.8} />,
      activeIcon: <Icon path={mdiPackageVariantClosed} size={0.8} color={"#FCAF17"} />,
      path: "/seller/money-withdraw-requests",
    },
    {
      key: "/seller/shop-settings",
      name: "Cài đặt cửa hàng",
      icon: <Icon path={mdiCogOutline} size={0.8} />,
      activeIcon: <Icon path={mdiCogOutline} size={0.8} color={"#FCAF17"} />,
      path: "/seller/shop",
    },
  ]

  useEffect(() => {
    setPath(pathname || "")
    if (user?.id) {
      setShopLink(`/shop?id=${user.id}`)
    }
    setIsClient(true)
  }, [pathname, user?.id])

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
          expandIcon: ({ isOpen }: { isOpen: boolean }) =>
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

  // Animation variants for consistent timing
  const sidebarVariants = {
    open: { width: 280, transition: { duration: 0.3, ease: "easeInOut" } },
    closed: { width: 60, transition: { duration: 0.3, ease: "easeInOut" } },
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

  const RatingStars = ({ rating }: { rating: number }) => {
    return (
      <div className="flex justify-center gap-0.5 mt-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className={cn(
              "w-5 h-5",
              index < rating ? "fill-yellow-400 stroke-yellow-400" : "fill-gray-300 stroke-gray-300"
            )}
          />
        ))}
      </div>
    )
  }

  const MobileSidebar = () => {
    const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

    const toggleExpand = (key: string) => {
      setExpandedItems(prev => ({
        ...prev,
        [key]: !prev[key]
      }));
    };

    const mobileSidebarVariants = {
      open: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.3, ease: "easeOut" }
      },
      closed: {
        opacity: 0,
        x: -50,
        transition: { duration: 0.3, ease: "easeIn" }
      }
    };

    return (
      <Sheet open={isMobileSidebarOpen} onOpenChange={toggleMobileSidebar}>
        <SheetContent side="left" className="w-[280px] p-0 border-r-0 bg-[#131921]">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-4 border-b border-gray-800 bg-[#232f3e]">
              <div className="flex flex-col items-center mb-4">
                <div className="text-[#ff9900] hover:text-[#FCAF17] transition-all duration-300 flex items-center cursor-pointer mb-3">
                  <Link href={shopLink} className="font-medium text-base flex-shrink-0">
                    Ghé thăm cửa hàng
                  </Link>
                  <span className="ml-1 flex-shrink-0 text-base">→</span>
                </div>

                <div className="flex items-center gap-1 flex-shrink-0">
                  <span className="text-lg font-medium text-white flex-shrink-0">{profile?.data?.shopName || "Cửa hàng chưa có tên"}</span>
                  {profile?.data?.isVerified && (
                    <div className="h-6 w-6 relative flex-shrink-0">
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
                  )}
                </div>

                {isClient && (
                  <div className="text-sm text-gray-300 flex-shrink-0 mt-1">{profile?.data?.email}</div>
                )}

                <RatingStars rating={profile?.data?.stars ?? 0} />

                <div className="mt-2">
                  <span className="text-white/80 font-medium text-sm">Điểm uy tín: </span>
                  <span className="text-green-400 text-sm">{profile?.data?.reputationPoints || 0}</span>
                </div>
              </div>

              <Input
                placeholder="Tìm kiếm trong menu"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "white",
                  borderRadius: "4px",
                }}
                prefix={<Icon path={mdiMenu} size={0.8} color="#FCAF17" />}
                className="hover:border-[#FCAF17] focus:border-[#FCAF17]"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>

            {/* Menu Items */}
            <div className="flex-1 overflow-y-auto py-2">
              <AnimatePresence>
                {menu
                  .filter(item => !searchTerm || item.name.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((item) => (
                    <motion.div
                      key={item.key}
                      className="w-full px-2 mb-1"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.children ? (
                        <>
                          <div
                            className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 ${expandedItems[item.key]
                                ? 'bg-[#232f3e] text-[#FCAF17]'
                                : 'text-white hover:bg-[#232f3e] hover:text-[#FCAF17]'
                              }`}
                            onClick={() => toggleExpand(item.key)}
                          >
                            <div className="flex items-center space-x-3">
                              {expandedItems[item.key] ? item.activeIcon : item.icon}
                              <span className="font-medium">{item.name}</span>
                            </div>
                            <Icon
                              path={expandedItems[item.key] ? mdiChevronDown : mdiChevronRight}
                              size={0.8}
                              color={expandedItems[item.key] ? "#FCAF17" : "white"}
                            />
                          </div>

                          <AnimatePresence>
                            {expandedItems[item.key] && (
                              <motion.div
                                className="ml-8 mt-1 border-l border-gray-700 pl-3"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                {item.children.map(child => (
                                  <Link
                                    key={child.key}
                                    href={child.path}
                                    className="flex items-center space-x-2 p-2 my-1 text-white/90 hover:text-[#FCAF17] hover:bg-[#232f3e]/50 rounded-md transition-all duration-200"
                                    onClick={toggleMobileSidebar}
                                  >
                                    <span className="font-medium">{child.name}</span>
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          href={item.path || ""}
                          className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${isActive(item.path)
                              ? 'bg-[#232f3e] text-[#FCAF17]'
                              : 'text-white hover:bg-[#232f3e] hover:text-[#FCAF17]'
                            }`}
                          onClick={toggleMobileSidebar}
                        >
                          <div className="flex items-center space-x-3">
                            {isActive(item.path) ? item.activeIcon : item.icon}
                            <span className="font-medium">{item.name}</span>
                          </div>

                          {item.badge && (item.badge.text || item.badge.count > 0) && (
                            <Badge
                              count={item.badge.text || item.badge.count}
                              style={{
                                backgroundColor: item.badge.color,
                                borderRadius: "10px",
                                boxShadow: "0 0 8px rgba(240, 136, 6, 0.5)",
                              }}
                              className="ml-auto"
                            />
                          )}
                        </Link>
                      )}
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-800 bg-[#232f3e]">
              <div className="text-white/60 text-xs text-center">
                © {new Date().getFullYear()} Amazon CMS
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  };

  return (
    <motion.div
      className="!hidden md:!flex"
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
      <div className="
      hidden md:flex
      fixed top-0 left-0 h-full flex-col pt-[68px] overflow-y-auto w-fit">
        <div className="md:hidden p-2">
          <MobileSidebar />
        </div>
        <motion.div
          className="w-full"
          initial={isSidebarOpen ? "open" : "closed"}
          animate={isSidebarOpen ? "open" : "closed"}
          variants={sidebarVariants}
        >
          <AnimatePresence mode="wait">
            {isSidebarOpen && (
              <motion.div
                className="flex flex-col items-center p-4 !text-white/80 gap-4"
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
                  <div className="text-[#ff9900] hover:text-main-golden-orange transition-all duration-300 flex items-center cursor-pointer">
                    <Link href={shopLink} className="font-medium text-base flex-shrink-0">
                      Ghé thăm cửa hàng
                    </Link>
                    <span className="ml-1 flex-shrink-0 text-base">→</span>
                  </div>

                  <div className="flex flex-col gap-0 w-full items-center">
                    {/* Shop Info */}
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <span className="text-lg font-medium flex-shrink-0">{profile?.data?.shopName || "Cửa hàng chưa có tên"}</span>
                      {profile?.data?.isVerified && (
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
                      )}
                    </div>

                    {/* Email */}
                    {isClient && (
                      <div className="text-sm text-gray-300 flex-shrink-0">{profile?.data?.email}</div>
                    )}
                  </div>

                  {/* Rating Stars */}
                  <RatingStars rating={profile?.data?.stars ?? 0} />

                  {/* Trust Score */}
                  <div className="mb-4">
                    <span className="!text-white/80 font-medium text-sm">Điểm uy tín: </span>
                    <span className="text-green-400 text-sm">{profile?.data?.reputationPoints || 0}</span>
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
              width: isSidebarOpen ? "280px" : "60px",
              transition: { duration: 0.3, ease: "easeInOut" },
            }}
          >
            <Menu
              mode="inline"
              theme="dark"
              className="hidden-on-mobile"
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
      <MobileSidebar />
    </motion.div>
  )
}

export default LayoutPage

