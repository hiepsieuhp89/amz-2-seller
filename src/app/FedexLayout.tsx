"use client"
import LayoutProvider from '@/components/Fedex/LayoutProvider';
import LayoutPage from '@/components/Fedex/LayoutPage';
import LayoutHeaderCommon from '@/components/Fedex/LayoutHeaderCommom';
import { usePathname } from 'next/navigation';
import { useLayout } from '@/components/Fedex/LayoutProvider';
import { useWindowSize } from '@/hooks/useWindowSize';
import styles from '@/components/Fedex/LayoutProvider/styles.module.scss';

function FedexLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDisplayMenu = !pathname?.includes('/sign-in') && !pathname?.includes('/account-disabled');
  
  if (isDisplayMenu) {
    return (
      <div className={styles.globalStyles}>
        <LayoutProvider>
          <LayoutHeaderCommon />
          <DesktopSidebar />
          <MainContent>{children}</MainContent>
        </LayoutProvider>
      </div>
    );
  }

  return <>{children}</>;
}

// Main content component that adjusts width based on sidebar state
function MainContent({ children }: { children: React.ReactNode }) {
  const { isSidebarOpen } = useLayout();
  const { width } = useWindowSize();
  const isMobile = width ? width < 768 : false;
  
  const getContentStyle = () => {
    if (isMobile) {
      return { marginLeft: '0px', width: '100%' };
    }
    
    return {
      marginLeft: isSidebarOpen ? '230px' : '0px',
      width: isSidebarOpen ? 'calc(100% - 230px)' : '100%',
      transition: 'margin-left 0.3s ease, width 0.3s ease',
    };
  };
  
  return (
    <div className="pt-16 px-4" style={getContentStyle()}>
      {children}
    </div>
  );
}

// Separate component that accesses the layout context
function DesktopSidebar() {
  const { isSidebarOpen } = useLayout();
  const { width } = useWindowSize();
  const isMobile = width ? width < 768 : false;
  
  // Only render sidebar on desktop
  if (isMobile) {
    return null;
  }
  
  return <LayoutPage isSidebarOpen={isSidebarOpen} />;
}

export default FedexLayout
