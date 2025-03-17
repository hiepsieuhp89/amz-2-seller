'use client';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss'; // Import file CSS
import { DashboardSuperAdminIcons } from '../Icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp, faKey, faLock, faMobile, faPhone, faUserEdit } from "@fortawesome/free-solid-svg-icons";


interface LayoutGAProps {
  isSidebarOpen: boolean;
}

function LayoutPage({ isSidebarOpen }: LayoutGAProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [path, setPath] = useState(`home/seller`);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null); // Track active submenu

  const menu = [
    {
      name: 'Dashboard',
      icon: <DashboardSuperAdminIcons.queues />,
      selectedIcon: <DashboardSuperAdminIcons.queues color="#E7F1FB" />,
      path: `/admin/datas`,
    },
    {
      name: 'Kế hoạch công tác tuần',
      icon: <DashboardSuperAdminIcons.package />,
      selectedIcon: <DashboardSuperAdminIcons.queues color="#E7F1FB" />,
      path: `/ra/plan_week`,
    },
    {
      name: 'Quản lý quân số',
      icon: <DashboardSuperAdminIcons.queues />,
      selectedIcon: <DashboardSuperAdminIcons.queues color="#E7F1FB" />,
      hasSubMenu: true,
      subMenu: [
        { name: 'Quản lý quân số tuần', path: '/plan_week/1' },
        { name: 'Kế hoạch QP cán bộ TT', path: '/admin/dataa/detail2' },
        { name: 'Thống kê chất lượng', path: '/admin/dataa/detail3' },
        { name: 'QL quân số huấn luyện', path: '/admin/dataa/detail4' },
        { name: 'Quản lý cán bộ TT', path: '/admin/dataa/detail5' },
        { name: 'Quản lý NVKT TT', path: '/admin/dataa/detail6' },
      ],
    },
    {
      name: 'Quản lý công văn đi-đến',
      icon: <DashboardSuperAdminIcons.company />,
      selectedIcon: <DashboardSuperAdminIcons.company color="#E7F1FB" />,
    },
  ];

  useEffect(() => {
    setPath(pathname);
  }, [pathname]);

  const isActive = (menuPath: string | undefined, subMenuPath?: string) => {
    if (!menuPath) return false; // Handle undefined values
    if (subMenuPath) {
      return path.includes(subMenuPath);
    }
    return path.includes(menuPath);
  };

  const handleMenuClick = (me: any) => {
    if (me.hasSubMenu) {
      // Toggle submenu open or close
      setActiveSubMenu(activeSubMenu === me.name ? null : me.name);
    } else {
      router.push(me.path);
      setPath(me.path);
    }
  };

  const handleSubMenuClick = (subPath: string) => {
    router.push(subPath);
    setPath(subPath);
  };

  return (
    <div className={isSidebarOpen ? styles.menuLeft : styles.menuLeftHidenLable}>
      {menu.map((me, index) => (
        <div key={index} className={styles.item}>
          <div
            className={isActive(me?.path, undefined) ? styles.itemMenuActive : styles.itemMenu}
            onClick={() => handleMenuClick(me)}
          >
            <div className={styles.iconContainer}>
              {isActive(me?.path, undefined) ? me.selectedIcon : me.icon}
              {isSidebarOpen && (
                <span
                  className={`${isActive(me.path, undefined) ? 'text-blue-medium' : 'text-black-dark'} text-base font-medium`}
                >
                  <p className="pl-2">{me.name}</p>
                </span>
              )}
              {me.hasSubMenu && (
                <span className={styles.arrowIcon}>
                  {activeSubMenu === me.name ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}
                </span>
              )}
            </div>
          </div>
          {me.hasSubMenu && activeSubMenu === me.name && (
            <div className={styles.subMenu}>
              {me.subMenu.map((sub, subIndex) => (
                <div
                  key={subIndex}
                  className={isActive(sub.path, undefined) ? styles.itemMenuActive : styles.itemMenu}
                  onClick={() => handleSubMenuClick(sub.path)}
                >
                  <p
                    className={`${isActive(sub.path, undefined) ? 'text-blue-medium' : 'text-black'} font-semibold text-sm pl-[46px] py-1`}
                  >
                    {sub.name}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default LayoutPage;
