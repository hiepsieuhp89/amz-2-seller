"use client";
import {
  mdiCartOutline,
  mdiChevronDown,
  mdiChevronRight,
  mdiCogOutline,
  mdiHomeOutline,
  mdiPackageVariant,
  mdiPackageVariantClosed,
  mdiStoreOutline,
  mdiMessageTextOutline,
  mdiMessageText,
  mdiStar,
  mdiAccountOutline,
  mdiBullhornOutline,
} from "@mdi/js";
import Icon from "@mdi/react";
import type { MenuProps } from "antd";
import { Badge, Input, Menu } from "antd";
import { usePathname, useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import "./styles.css";
import Image from "next/image";
import { useUser } from "@/context/useUserContext";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useLayout } from "@/components/LayoutProvider";
import useSidebar from "@/stores/useSidebar";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { getUnreadNotifications, markAsRead } from "@/api/notification";
import { useProfile } from "@/hooks/authentication";

function LayoutPage() {
  const { isSidebarOpen } = useSidebar();
  const pathname = usePathname();
  const [path, setPath] = useState(`seller/dashboard`);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useUser();
  const [shopLink, setShopLink] = useState(
    process.env.NEXT_PUBLIC_HOME_URL + "/shop?id="
  );
  const [isClient, setIsClient] = useState(false);
  const { profileData } = useProfile();
  const [unreadNotifications, setUnreadNotifications] = useState<any>(null);

  const fetchUnreadNotifications = useCallback(async () => {
    try {
      const response = await getUnreadNotifications();
      setUnreadNotifications(response);
    } catch (error) {
      console.error("Error fetching unread notifications:", error);
    }
  }, []);

  useEffect(() => {
    fetchUnreadNotifications();
    
    const intervalId = setInterval(() => {
      fetchUnreadNotifications();
    }, 5000);
    
    return () => clearInterval(intervalId);
  }, [fetchUnreadNotifications]);

  const notificationCounts = useMemo(() => {
    if (!unreadNotifications?.data) return { orders: 0, chat: 0, reviews: 0 };

    return unreadNotifications.data.reduce(
      (counts: { orders: number; chat: number; reviews: number }, notification: any) => {
        switch (notification.type) {
          case "NEW_ORDER":
          case "ORDER_STATUS_UPDATE":
            counts.orders++;
            break;
          case "NEW_MESSAGE":
            counts.chat++;
            break;
          case "NEW_REVIEW":
            counts.reviews++;
            break;
          case "ADMIN_NOTIFICATION":
          case "FEDEX_BALANCE_UPDATE":
          case "SYSTEM_NOTIFICATION":
            break;
          default:
            if (notification.type.includes("ORDER")) {
              counts.orders++;
            } else if (
              notification.type.includes("CHAT") ||
              notification.type.includes("MESSAGE")
            ) {
              counts.chat++;
            } else if (notification.type.includes("REVIEW")) {
              counts.reviews++;
            }
            break;
        }
        return counts;
      },
      { orders: 0, chat: 0, reviews: 0 }
    );
  }, [unreadNotifications]);

  const handleMenuItemClick = useCallback(
    async (menuPath: string) => {
      if (!unreadNotifications?.data?.length)
        return;
      const notificationIds = unreadNotifications.data
        .filter((notification: any) => {
          if (menuPath === "/seller/orders") {
            return (
              ["NEW_ORDER", "ORDER_STATUS_UPDATE"].includes(
                notification.type
              ) || notification.type.includes("ORDER")
            );
          }
          if (menuPath === "/seller/reviews") {
            return notification.type.includes("NEW_REVIEW");
          }
          if (menuPath === "/seller/chat") {
            return notification.type.includes("NEW_MESSAGE");
          }
          return false;
        })
        .map((notification: any) => notification.id);

      if (notificationIds.length > 0) {
        for (const id of notificationIds) {
          try {
            await markAsRead({ notificationId: id });
          } catch (error) {
            console.error(`Error marking notification ${id} as read:`, error);
          }
        }
        fetchUnreadNotifications();
      }
    },
    [unreadNotifications, fetchUnreadNotifications]
  );

  const menu = [
    {
      key: "/seller/dashboard",
      name: "Bảng điều khiển",
      icon: <Icon path={mdiHomeOutline} size={0.8} />,
      activeIcon: <Icon path={mdiHomeOutline} size={0.8} color={"#FCAF17"} />,
      path: `/seller/dashboard`,
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
      activeIcon: (
        <Icon path={mdiPackageVariant} size={0.8} color={"#FCAF17"} />
      ),
      path: `/seller/products`,
    },
    {
      key: "/seller/reviews",
      name: "Đánh giá sản phẩm",
      icon: <Icon path={mdiStar} size={0.8} />,
      activeIcon: <Icon path={mdiStar} size={0.8} color={"#FCAF17"} />,
      path: `/seller/reviews`,
      badge: {
        text: "",
        count: notificationCounts.reviews,
        color: "#f08806",
      },
    },
    {
      key: "/seller/orders",
      name: "Đơn hàng",
      icon: <Icon path={mdiCartOutline} size={0.8} />,
      activeIcon: <Icon path={mdiCartOutline} size={0.8} color={"#FCAF17"} />,
      path: `/seller/orders`,
      badge: {
        text: "",
        count: notificationCounts.orders,
        color: "#f08806",
      },
    },
    {
      key: "/seller/account-packages",
      name: "Gói tài khoản",
      icon: <Icon path={mdiAccountOutline} size={0.8} />,
      activeIcon: (
        <Icon path={mdiAccountOutline} size={0.8} color={"#FCAF17"} />
      ),
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
      activeIcon: (
        <Icon path={mdiBullhornOutline} size={0.8} color={"#FCAF17"} />
      ),
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
        count: notificationCounts.chat,
        color: "#f08806",
      },
    },
    {
      key: "/seller/payment-history",
      name: "Lịch sử thanh toán",
      icon: <Icon path={mdiPackageVariantClosed} size={0.8} />,
      activeIcon: (
        <Icon path={mdiPackageVariantClosed} size={0.8} color={"#FCAF17"} />
      ),
      path: "/seller/money-withdraw-requests",
    },
    {
      key: "/seller/shop-settings",
      name: "Cài đặt cửa hàng",
      icon: <Icon path={mdiCogOutline} size={0.8} />,
      activeIcon: <Icon path={mdiCogOutline} size={0.8} color={"#FCAF17"} />,
      path: "/seller/shop",
    },
  ];

  useEffect(() => {
    setPath(pathname || "");
    if (user?.id) {
      setShopLink(`${process.env.NEXT_PUBLIC_HOME_URL}/shop?id=${user.id}`);
    }
    setIsClient(true);
  }, [pathname, user?.id]);

  const isActive = (menuPath: string | undefined) => {
    if (!menuPath) return false;

    if (path === menuPath) return true;

    for (const item of menu) {
      if (
        item.path &&
        path.startsWith(item.path) &&
        item.path.length > menuPath.length
      ) {
        return false;
      }
    }

    return path.startsWith(menuPath) && path.charAt(menuPath.length) === "/";
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredMenu = searchTerm
    ? menu.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : menu;

  const getMenuItems = (): MenuProps["items"] => {
    return filteredMenu.map((item) => {
      const isItemActive = isActive(item.path);
      const displayIcon = isItemActive ? item.activeIcon : item.icon;

      if (item.children) {
        return {
          key: item.key,
          icon: displayIcon,
          label: <span className="font-medium">{item.name}</span>,
          children: item.children.map((child) => ({
            key: child.key,
            label: (
              <Link
                href={child.path}
                onClick={() => {
                  setPath(child.path);
                  handleMenuItemClick(child.path);
                }}
              >
                <span className="font-medium">{child.name}</span>
              </Link>
            ),
          })),
          expandIcon: ({ isOpen }: { isOpen: boolean }) =>
            isOpen ? (
              <Icon path={mdiChevronDown} size={0.8} />
            ) : (
              <Icon path={mdiChevronRight} size={0.8} />
            ),
        };
      }

      let label: React.ReactNode = (
        <Link
          href={item.path}
          onClick={() => {
            setPath(item.path);
            handleMenuItemClick(item.path);
          }}
        >
          <span className="font-medium">{item.name}</span>
        </Link>
      );

      if (item.badge) {
        label = (
          <Link
            href={item.path}
            onClick={() => {
              setPath(item.path);
              handleMenuItemClick(item.path);
            }}
          >
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
        );
      }

      return {
        key: item.key,
        icon: displayIcon,
        label,
      };
    });
  };

  const sidebarVariants = {
    open: { width: 280, transition: { duration: 0.3, ease: "easeInOut" } },
    closed: { width: 60, transition: { duration: 0.3, ease: "easeInOut" } },
  };

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
  };

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
  };

  const RatingStars = ({ rating }: { rating: number }) => {
    return (
      <div className="flex justify-center gap-0.5 mt-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className={cn(
              "w-5 h-5",
              index < rating
                ? "fill-yellow-400 stroke-yellow-400"
                : "fill-gray-300 stroke-gray-300"
            )}
          />
        ))}
      </div>
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
      <div
        className="
      hidden md:flex
      fixed top-0 left-0 h-full flex-col pt-[68px] overflow-y-auto w-fit"
      >
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
                <motion.div
                  variants={itemVariants}
                  className="w-full flex flex-col items-center gap-1"
                >
                  <div className="text-[#ff9900] hover:text-main-golden-orange transition-all duration-300 flex items-center cursor-pointer">
                    <Link
                      href={shopLink}
                      className="font-medium text-base flex-shrink-0"
                    >
                      Ghé thăm cửa hàng
                    </Link>
                    <span className="ml-1 flex-shrink-0 text-base">→</span>
                  </div>

                  <div className="flex flex-col gap-0 w-full items-center">
                    {/* Shop Info */}
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <span className="text-lg font-medium flex-shrink-0">
                        {profileData?.data?.shopName || "Cửa hàng chưa có tên"}
                      </span>
                      {profileData?.data?.isVerified && (
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
                      <div className="text-sm text-gray-300 flex-shrink-0 flex items-center gap-1">
                        {profileData?.data?.email}
                      </div>
                    )}
                  </div>

                  {/* Rating Stars */}
                  <RatingStars rating={profileData?.data?.stars ?? 0} />

                  {/* Trust Score */}
                  <div className="mb-4">
                    <span className="!text-white/80 font-medium text-sm">
                      Điểm uy tín:{" "}
                    </span>
                    <span className="text-green-400 text-sm">
                      {profileData?.data?.reputationPoints || 0}
                    </span>
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
              defaultSelectedKeys={[
                menu.find((item) => isActive(item.path))?.key || "",
              ]}
              defaultOpenKeys={[activeSubMenu || ""]}
              items={getMenuItems()}
              inlineCollapsed={!isSidebarOpen}
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default LayoutPage;
