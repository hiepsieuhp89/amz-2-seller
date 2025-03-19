// 'use client';
// import { usePathname, useRouter } from 'next/navigation';
// import React, { useEffect, useState } from 'react';
// import { DashboardSuperAdminIcons } from '../Icons';
// import styles from './styles.module.scss'; // Import file CSS

// function LayoutCommon() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const [path, setPath] = useState(`ld/plan_week`);
//   const [isSubMenuOpen, setSubMenuOpen] = useState(false);
//   const [role, setRole] = useState(null);


//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const roleFromStorage = localStorage.getItem("role");
//       let parsedRole;
//       try {
//         parsedRole = roleFromStorage ? JSON.parse(roleFromStorage) : roleFromStorage;
//       } catch (error) {
//         parsedRole = roleFromStorage; 
//       }

//       setRole(parsedRole);
//     }
//   }, []);
  
//     const menu = [
//     // {
//     //   name: 'Dashboard',
//     //   icon: <DashboardSuperAdminIcons.dashboard />,
//     //   selectediIon: <DashboardSuperAdminIcons.dashboard color="#E7F1FB" />,
//     //   path: `/admin/datas`,
//     // },
//     {
//       name: 'Kế hoạch công tác tuần',
//       icon: <DashboardSuperAdminIcons.planWeek />,
//       selectediIon: <DashboardSuperAdminIcons.planWeek color="#E7F1FB" />,
//       path: `/ld/plan_week`,
//     },
//     // {
//     //   name: 'Quản lý quân số',
//     //   icon: <DashboardSuperAdminIcons.manageSolider />,
//     //   selectediIon: <DashboardSuperAdminIcons.manageSolider color="#E7F1FB" />,
//     //   path: `/pkkq/plan_week/aa`,
//     //   hasSubMenu: true,
//     //   subMenu: [
//     //     { name: 'Quản lý quân số tuần', path: '/plan_week/1' },
//     //     { name: 'Kế hoạch QP cán bộ TT', path: '/admin/dataa/detail2' },
//     //     { name: 'Thống kê chất lượng', path: '/admin/dataa/detail3' },
//     //     { name: 'QL quân số huấn luyện', path: '/admin/dataa/detail4' },
//     //     { name: 'Quản lý cán bộ TT', path: '/admin/dataa/detail5' },
//     //     { name: 'Quản lý NVKT TT', path: '/admin/dataa/detail6' },
//     //   ],
//     // },
//     {
//       name: 'Quản lý công văn đi-đến',
//       icon: <DashboardSuperAdminIcons.manageDocument />,
//       selectediIon: <DashboardSuperAdminIcons.manageDocument color="#E7F1FB" />,
//       path: `/ld/manage_document`,
//     },
//     // {
//     //   name: 'Báo cáo thống kê',
//     //   icon: <DashboardSuperAdminIcons.reportCount />,
//     //   selectediIon: <DashboardSuperAdminIcons.reportCount color="#E7F1FB" />,
//     //   path: `/admin/datas`,
//     // },
//   ];

//   useEffect(() => {
//     setPath(pathname);
//   }, [pathname]);

//   const isActive = (menuPath: string, subMenuPath?: string) => {
//     if (subMenuPath) {
//       return path.includes(subMenuPath);
//     }
//     return path.includes(menuPath);
//   };

//   const handleMenuClick = (me: any) => {
//     if (me.hasSubMenu) {
//       setSubMenuOpen(!isSubMenuOpen);
//     } else {
//       router.push(me.path);
//       setPath(me.path);
//     }
//   };

//   // const isParentMenuActive = (menuPath: string) => {
//   //   return menu.find((m) => m.path === menuPath && m.hasSubMenu)?.subMenu?.some((sub) => path === sub.path);
//   // };

//   return (
//     <div className={styles.menuLeft}>
//       {menu
      
//         .filter((me) => {
//           if (role === 'CS') {
//             return me.name === 'Quản lý công văn đi-đến';
//           }
//           if(role==='DI'){
//             return me.name==='Báo cáo thống kê'
//           }
          
//           return true;
//         })
//         .map((me, index) => (
//           <div key={index} className={styles.item}>
//             <div
//               className={isActive(me.path) ? styles.itemMenuActive : styles.itemMenu}
//               onClick={() => handleMenuClick(me)}
//             >
//               <div className={styles.iconContainer}>
//                 {isActive(me.path) ? me.selectediIon : me.icon}
//                 <span
//                   // className={`${
//                   //   isParentMenuActive(me.path) || isActive(me.path) ? 'text-blue-medium' : 'text-black-dark'
//                   // } text-base font-medium`}
//                   className={`${
//                      isActive(me.path) ? 'text-blue-medium' : 'text-black-dark'
//                   } text-base font-medium`}
//                 >
//                   <p className='pl-2'>{me.name}</p>
//                 </span>
//                 {/* {me.hasSubMenu && (
//                   <span className={styles.arrowIcon}>
//                     {isSubMenuOpen ? (
//                       <Image src={svgs.iconArrowUp} width={10} height={10} alt='up' />
//                     ) : (
//                       <Image src={svgs.iconArrowDown} width={10} height={10} alt='down' />
//                     )}
//                   </span>
//                 )} */}
//               </div>
//             </div>
//             {/* {isSubMenuOpen && me.hasSubMenu && (
//               <div className={styles.subMenu}>
//                 {me.subMenu.map((sub, subIndex) => (
//                   <div
//                     key={subIndex}
//                     className={isActive(sub.path) ? styles.itemMenuActive : styles.itemMenu}
//                     onClick={() => {
//                       router.push(sub.path);
//                       setPath(sub.path);
//                     }}
//                   >
//                     <p
//                       className={`${
//                         isActive(sub.path) ? 'text-blue-medium' : 'text-black'
//                       } font-semibold text-sm pl-[46px] py-1`}
//                     >
//                       {sub.name}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             )} */}
//           </div>
//         ))}
//     </div>
//   );
// }

// export default LayoutCommon;
