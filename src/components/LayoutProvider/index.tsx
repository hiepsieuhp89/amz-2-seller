'use client';
import styles from './styles.module.scss';
import { lazy, useState, createContext, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
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
        
        <button 
        style={{
          position: "fixed",
        }}
        className={styles.toggleButton} onClick={toggleSidebar}>
          {isSidebarOpen ? 
            <FontAwesomeIcon icon={faBars} fontSize={30} /> : 
            <FontAwesomeIcon icon={faXmark} fontSize={30} />
          }
        </button>
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