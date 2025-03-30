'use client';
import styles from './styles.module.scss';
import { lazy, useState, createContext, useContext, useEffect } from 'react';
import { Button } from 'antd';
import Icon from '@mdi/react';
import { mdiMenu, mdiWindowClose } from '@mdi/js';

const LayoutPage = lazy(() => import('@/components/LayoutPage'));
const LayoutHeaderCommon = lazy(() => import('@/components/LayoutHeaderCommom'));

type LayoutContextType = {
isSidebarOpen: boolean;
toggleSidebar: () => void;
};

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const useLayout = () => {
const context = useContext(LayoutContext);
if (!context) {
  throw new Error('useLayout phải được sử dụng trong LayoutProvider');
}
return context;
};

// Provider component
export const LayoutProvider = ({
children,
}: Readonly<{
children: React.ReactNode;
}>) => {
const [isSidebarOpen, setIsSidebarOpen] = useState(true);
const [isMobile, setIsMobile] = useState(false);
useEffect(() => {
  const checkMobile = () => {
    setIsMobile(window.innerWidth <= 768);
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }
  };
  checkMobile();
  window.addEventListener('resize', checkMobile);
  return () => window.removeEventListener('resize', checkMobile);
}, []);
const toggleSidebar = () => {
  if (!isMobile) {
    setIsSidebarOpen(!isSidebarOpen);
  }
};

return (
  <LayoutContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
    <div className={styles.root} suppressHydrationWarning>
      <div className='!bg-main-dark-blue'>
        <LayoutPage isSidebarOpen={isMobile ? false : isSidebarOpen} />
      </div>

      <div className={styles.outlet}>
        <LayoutHeaderCommon />
        <div className='mt-[38px] bg-[#F5F5F5] flex flex-col flex-1'>
          {children}
        </div>
      </div>
      
      <Button 
        type="text"
        onClick={toggleSidebar}
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