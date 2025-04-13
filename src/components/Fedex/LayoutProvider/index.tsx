'use client';
import React, { useState, useEffect, createContext, useContext } from 'react';
import { useWindowSize } from '@/hooks/useWindowSize';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import styles from './styles.module.scss';

// Define the context type
interface LayoutContextType {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

// Create the context with a default value
const LayoutContext = createContext<LayoutContextType>({
  isSidebarOpen: true,
  toggleSidebar: () => {},
});

// Hook to use the layout context
export const useLayout = () => useContext(LayoutContext);

export default function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { width } = useWindowSize();
  const isMobile = width ? width < 768 : false;

  // Auto-close sidebar on mobile when the page loads
  // And adjust sidebar state when window width changes
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    } else {
      // Default to open on desktop
      setIsSidebarOpen(true);
    }
  }, [isMobile]);

  // Toggle sidebar function
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Function to handle overlay click (close sidebar on mobile)
  const handleOverlayClick = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <LayoutContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      <div className={styles.layoutWrapper}>
        {/* Render overlay only on mobile when sidebar is open */}
        {isMobile && isSidebarOpen && (
          <div 
            className={`${styles.overlay} ${isSidebarOpen ? styles.visible : ''}`} 
            onClick={handleOverlayClick}
          />
        )}

        {/* Main content */}
        <div className={styles.contentContainer}>
          {children}
        </div>

        {/* Toggle button - only visible on desktop */}
        {!isMobile && (
          <div 
            className={`${styles.toggleButton} ${!isSidebarOpen ? styles.closed : ''}`}
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? <FaArrowLeft size={14} /> : <FaArrowRight size={14} />}
          </div>
        )}
      </div>
    </LayoutContext.Provider>
  );
}