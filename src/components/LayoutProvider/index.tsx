'use client';
import styles from './styles.module.scss';
import { lazy, useState, createContext, useContext } from 'react';
import { Button } from 'antd';
import Icon from '@mdi/react';
import { mdiMenu, mdiWindowClose } from '@mdi/js';

const LayoutPage = lazy(() => import('@/components/LayoutPage'));
const LayoutHeaderCommon = lazy(() => import('@/components/LayoutHeaderCommom'));

// Tạo context để quản lý trạng thái sidebar
type LayoutContextType = {
isSidebarOpen: boolean;
toggleSidebar: () => void;
};

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

// Hook để sử dụng context
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
const toggleSidebar = () => {
  setIsSidebarOpen(!isSidebarOpen);
};

return (
  <LayoutContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
    <div className={styles.root} suppressHydrationWarning>
      <div className='bg-white-primary'>
        <LayoutPage isSidebarOpen={isSidebarOpen} />
      </div>

      <div className={styles.outlet}>
        <LayoutHeaderCommon />
        <div className='mt-12 px-4'>
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
          className='text-main-gunmetal-blue flex-shrink-0'
        />
      </Button>
    </div>
  </LayoutContext.Provider>
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