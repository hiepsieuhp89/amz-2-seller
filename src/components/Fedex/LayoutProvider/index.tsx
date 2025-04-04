'use client';
import styles from './styles.module.scss';
import { lazy } from 'react';
import { Button } from 'antd';
import Icon from '@mdi/react';
import { mdiMenu, mdiWindowClose } from '@mdi/js';
import useSidebar from '@/stores/useSidebar';

const LayoutPage = lazy(() => import('@/components/Fedex/LayoutPage'));
const LayoutHeaderCommon = lazy(() => import('@/components/Fedex/LayoutHeaderCommom'));

export const LayoutProvider = ({
children,
}: Readonly<{
children: React.ReactNode;
}>) => {
const { isSidebarOpen, setIsSidebarOpen } = useSidebar();

return (
  <div className={styles.root} suppressHydrationWarning>
    <div className='bg-white-primary'>
      <LayoutPage />
    </div>

    <div className={styles.outlet}>
      <LayoutHeaderCommon />
      <div className='mt-12 px-4'>
        {children}
      </div>
    </div>
    
    <Button 
      type="text"
      onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      style={{
        position: "fixed",
        zIndex: 1000,
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
  </div>
);
};

// RootLayout bây giờ chỉ sử dụng LayoutProvider
export default function RootLayout({
children,
}: Readonly<{
children: React.ReactNode;
}>) {
return <LayoutProvider>{children}</LayoutProvider>;
}