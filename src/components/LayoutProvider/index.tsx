'use client';
import styles from './styles.module.scss';
import { lazy, useState, createContext, useContext, useEffect, useCallback, useRef } from 'react';
import { Button } from 'antd';
import Icon from '@mdi/react';
import { mdiMenu, mdiWindowClose, mdiChevronDown, mdiChevronRight, mdiHomeOutline, mdiStoreOutline, mdiPackageVariant, mdiStar, mdiCartOutline, mdiAccountOutline, mdiBullhornOutline, mdiMessageTextOutline, mdiMessageText, mdiPackageVariantClosed, mdiCogOutline } from '@mdi/js';
import useSidebar from '@/stores/useSidebar';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import Link from 'next/link';
import Image from 'next/image';
import { useProfile } from '@/hooks/authentication';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUser } from '@/context/useUserContext';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from "framer-motion";
import { Badge, Input, Menu } from "antd";

const LayoutPage = lazy(() => import('@/components/LayoutPage'));
const LayoutHeaderCommon = lazy(() => import('@/components/LayoutHeaderCommom'));

type LayoutContextType = {
  isMobileSidebarOpen: boolean;
  toggleMobileSidebar: () => void;
};

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout phải được sử dụng trong LayoutProvider');
  }
  return context;
};

export const LayoutProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const lastToggleTimeRef = useRef(0);
  const [isToggling, setIsToggling] = useState(false);
  const [shopLink, setShopLink] = useState(
    process.env.NEXT_PUBLIC_HOME_URL + "/shop?id="
  );
  const { profileData } = useProfile();
  const { user } = useUser();
  const pathname = usePathname();
  const [path, setPath] = useState(`seller/dashboard`);
  const [isClient, setIsClient] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
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
        count: 0,
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
        count: 0,
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
        count: 0,
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
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [setIsSidebarOpen]);

  const toggleMobileSidebar = useCallback(() => {
    const now = Date.now();
    if (isToggling || (now - lastToggleTimeRef.current < 800)) {
      return;
    }

    setIsToggling(true);
    lastToggleTimeRef.current = now;

    setIsMobileSidebarOpen(prev => !prev);

    setTimeout(() => {
      setIsToggling(false);
    }, 800);
  }, [isToggling]);

  const handleDesktopButtonClick = useCallback(() => {
    setIsSidebarOpen(!isSidebarOpen);
  }, [isSidebarOpen, setIsSidebarOpen]);

  useEffect(() => {
    setPath(pathname || "");
    if (user?.id) {
      setShopLink(`${process.env.NEXT_PUBLIC_HOME_URL}/shop?id=${user.id}`);
    }
    setIsClient(true);
  }, [pathname, user?.id]);

  const toggleExpand = (key: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleLinkClick = useCallback(() => {
    setIsMobileSidebarOpen(false);
  }, []);

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

  return (
    <LayoutContext.Provider value={{ isMobileSidebarOpen, toggleMobileSidebar }}>
      <div className={styles.root} suppressHydrationWarning>
        <div className='!bg-main-dark-blue'>
          <LayoutPage />
        </div>

        <div className={styles.outlet}>
          <LayoutHeaderCommon />
          <div className='mt-[38px] bg-[#E3E6E6] flex flex-col flex-1'>
            {children}
          </div>
        </div>

        {/* Desktop Button */}
        {!isMobile && (
          <Button
            type="text"
            onClick={handleDesktopButtonClick}
            style={{
              position: "fixed",
              zIndex: 40,
              padding: 0,
              paddingLeft: '14px',
              background: 'transparent',
              border: 'none'
            }}
            className={styles.toggleButton}
          >
            <Icon
              path={isSidebarOpen ? mdiWindowClose : mdiMenu}
              size={1.4}
              className='text-[#484F66] flex-shrink-0'
            />
          </Button>
        )}

        {/* Mobile Button */}
        {isMobile && (<Sheet >
          <SheetTrigger>
            <Button
              type="text"
              style={{
                position: "fixed",
                zIndex: 40,
                padding: 0,
                paddingLeft: '4px',
                background: 'transparent',
                border: 'none'
              }}
              className={styles.toggleButton}
            >
              <Icon
                path={isMobileSidebarOpen ? mdiWindowClose : mdiMenu}
                size={1.4}
                className='text-[#484F66] flex-shrink-0'
              />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[280px] p-0 border-r-0 bg-[#131921]"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="p-4 border-b border-gray-800 bg-[#232f3e]">
                <div className="flex flex-col items-center mb-4">
                  <div className="text-[#ff9900] hover:text-[#FCAF17] transition-all duration-300 flex items-center cursor-pointer mb-3">
                    <Link
                      href={shopLink}
                      className="font-medium text-base flex-shrink-0"
                    >
                      Ghé thăm cửa hàng
                    </Link>
                    <span className="ml-1 flex-shrink-0 text-base">→</span>
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    <span className="text-lg font-medium text-white flex-shrink-0">
                      {profileData?.data?.shopName || "Cửa hàng chưa có tên"}
                    </span>
                    {profileData?.data?.isVerified && (
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
                    <div className="text-sm text-gray-300 flex-shrink-0 mt-1 flex items-center gap-1">
                      {profileData?.data?.email}
                    </div>
                  )}

                  <RatingStars rating={profileData?.data?.stars ?? 0} />

                  <div className="mt-2">
                    <span className="text-white/80 font-medium text-sm">
                      Điểm uy tín:{" "}
                    </span>
                    <span className="text-green-400 text-sm">
                      {profileData?.data?.reputationPoints || 0}
                    </span>
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
                    .filter(
                      (item) =>
                        !searchTerm ||
                        item.name.toLowerCase().includes(searchTerm.toLowerCase())
                    )
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
                                ? "bg-[#232f3e] text-[#FCAF17]"
                                : "text-white hover:bg-[#232f3e] hover:text-[#FCAF17]"
                                }`}
                              onClick={() => toggleExpand(item.key)}
                            >
                              <div className="flex items-center space-x-3">
                                {expandedItems[item.key]
                                  ? item.activeIcon
                                  : item.icon}
                                <span className="!font-normal">{item.name}</span>
                              </div>
                              <Icon
                                path={
                                  expandedItems[item.key]
                                    ? mdiChevronDown
                                    : mdiChevronRight
                                }
                                size={0.8}
                                color={
                                  expandedItems[item.key] ? "#FCAF17" : "white"
                                }
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
                                  {item.children.map((child) => (
                                    <Link
                                      key={child.key}
                                      href={child.path}
                                      className="flex items-center space-x-2 p-2 my-1 text-white/90 hover:text-[#FCAF17] hover:bg-[#232f3e]/50 rounded-md transition-all duration-200"
                                      onClick={handleLinkClick}
                                    >
                                      <span className="font-normal">
                                        {child.name}
                                      </span>
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
                              ? "bg-[#232f3e] text-[#FCAF17]"
                              : "text-white hover:bg-[#232f3e] hover:text-[#FCAF17]"
                              }`}
                            onClick={handleLinkClick}
                          >
                            <div className="flex items-center space-x-3">
                              {isActive(item.path) ? item.activeIcon : item.icon}
                              <span className="!font-normal">{item.name}</span>
                            </div>

                            {item.badge &&
                              (item.badge.text || item.badge.count > 0) && (
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
              <div className="p-4 border-t border-gray-800 bg-[#232f3e]">
                <div className="text-white/60 text-xs text-center">
                  © {new Date().getFullYear()} Amazon Global Selling
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>)}
      </div>
    </LayoutContext.Provider>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <LayoutProvider>{children}</LayoutProvider>;
}

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