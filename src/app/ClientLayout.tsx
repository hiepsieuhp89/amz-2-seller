"use client"
import LayoutProvider from '@/components/LayoutProvider';
import MaintenanceGuard from '@/components/MaintenanceGuard';
import OtpEmailTester from '@/components/OtpEmailTester';
import WrapMessage from '@/components/WrapMessage';
import { UserProvider } from '@/context/useUserContext';
import { useAllConfigs } from '@/hooks/config';
import { ReactQueryClientProvider } from '@/provider/ReactQueryClientProvider';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider, ThemeConfig } from 'antd';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';

// Function to open chat that can be called from other components
export const openChat = () => {
  if (window.smartsupp) {
    // Open Smartsupp chat if initialized
    window.smartsupp('chat:open');
  } else if (window.Tawk_API) {
    // Open Tawk chat if initialized
    window.Tawk_API.maximize();
  }
};

// Extend Window interface to include Smartsupp properties
declare global {
  interface Window {
    _smartsupp?: any;
    smartsupp?: any;
    Tawk_API?: any;
    Tawk_LoadStart?: Date;
  }
}

function PathChecker({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDisplayMenu = pathname?.includes('/seller') && !pathname?.includes('seller-policy');

  if (isDisplayMenu) {
    return <LayoutProvider>{children}</LayoutProvider>;
  }
  return <>{children}</>;
}

function ConfigLoader() {
  const { configsData, isLoading } = useAllConfigs();
  
  useEffect(() => {
    if (configsData) {
      console.log('Configuration data:', configsData.data);
    }
  }, [configsData]);
  
  return null;
}

function ChatWidget() {
  const { configsData } = useAllConfigs();
  const [chatProvider, setChatProvider] = useState<'smartsupp' | 'tawk'>('tawk');
  
  // Function to clean up previous chat widgets
  const cleanupChatWidgets = () => {
    // Remove Smartsupp
    if (window._smartsupp) {
      delete window._smartsupp;
    }
    // Remove existing scripts
    document.querySelectorAll('script[src*="smartsuppchat.com"]').forEach(el => el.remove());
    document.querySelectorAll('script[src*="embed.tawk.to"]').forEach(el => el.remove());
    
    // Remove chat widgets from DOM
    document.querySelectorAll('#smartsupp-widget-container').forEach(el => el.remove());
    document.querySelectorAll('.tawk-widget').forEach(el => el.remove());
  };

  const initializeSmartsuppChat = (cskhConfig: any) => {
    try {
      cleanupChatWidgets();
      
      // Create a script element
      const script = document.createElement('script');
      script.type = 'text/javascript';
      
      // Set the correct content for Smartsupp
      script.innerHTML = `
        var _smartsupp = _smartsupp || {};
        _smartsupp.key = '${cskhConfig.value}';
        window.smartsupp||(function(d) {
          var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
          s=d.getElementsByTagName('script')[0];c=d.createElement('script');
          c.type='text/javascript';c.charset='utf-8';c.async=true;
          c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
        })(document);
      `;
      
      // Append to document
      document.head.appendChild(script);
      
      // Add group configuration
      const groupScript = document.createElement('script');
      groupScript.innerHTML = `smartsupp('group', 'DlRScJm8T1'); //group SHOP`;
      document.head.appendChild(groupScript);
      
      // Add noscript element if it exists in the config
      if (cskhConfig.value.includes('<noscript>')) {
        const noscriptContent = document.createElement('div');
        noscriptContent.innerHTML = cskhConfig.value.match(/<noscript>([\s\S]*?)<\/noscript>/)?.[1] || '';
        if (noscriptContent.innerHTML.trim()) {
          const noscript = document.createElement('noscript');
          noscript.innerHTML = noscriptContent.innerHTML;
          document.body.appendChild(noscript);
        }
      }
    } catch (error) {
      console.error('Error initializing Smartsupp chat:', error);
    }
  };

  const initializeTawkChat = () => {
    try {
      cleanupChatWidgets();
      
      // Create Tawk.to script
      const tawkScript = document.createElement('script');
      tawkScript.type = 'text/javascript';
      tawkScript.innerHTML = `
        var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
        (function(){
          var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
          s1.async=true;
          s1.src='https://embed.tawk.to/681dc8c9fe55ac190d5640b9/1iqq5glqe';
          s1.charset='UTF-8';
          s1.setAttribute('crossorigin','*');
          s0.parentNode.insertBefore(s1,s0);
          
        })();
      `;
      
      document.head.appendChild(tawkScript);
    } catch (error) {
      console.error('Error initializing Tawk.to chat:', error);
    }
  };
  
  useEffect(() => {
    if (configsData?.data) {
      const cskhConfig = configsData.data.find((config: any) => config.key === 'CSKH' && config.isActive);
      
      if (cskhConfig && typeof window !== 'undefined') {
        if (chatProvider === 'smartsupp') {
          initializeSmartsuppChat(cskhConfig);
        } else if (chatProvider === 'tawk') {
          initializeTawkChat();
        }
      }
    }
  }, [configsData, chatProvider]);
  
  return (
    <></>
  );
}

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme: ThemeConfig = {
    token: {
      fontSize: 14,
      colorPrimary: '#0F172A',
      borderRadius: 12,
      controlHeight: 40,
      colorTextPlaceholder: '#636364',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    },
    components: {
      Steps: {
        dotSize: 17,
        dotCurrentSize: 17,
      },
      Dropdown: {
        paddingBlock: 4,
      },
    },
  };

  const pathname = usePathname();
  const [isDisplayMenu, setIsDisplayMenu] = useState(false);
  
  // Sử dụng useRef để theo dõi pathname trước đó
  const prevPathRef = useRef<string | null>(null);
  
  // Làm sạch widget trước khi khởi tạo lại
  const cleanupWidgets = () => {
    if (typeof window === 'undefined') return;
    
    if (window._smartsupp) {
      delete window._smartsupp;
    }
    if (window.smartsupp) {
      try {
        window.smartsupp('chat:close');
      } catch(e) {
        console.error('Không thể đóng Smartsupp chat:', e);
      }
    }
    
    if (window.Tawk_API) {
      try {
        window.Tawk_API.hideWidget();
      } catch(e) {
        console.error('Không thể ẩn Tawk widget:', e);
      }
    }
    
    document.querySelectorAll('script[src*="smartsuppchat.com"]').forEach(el => el.remove());
    document.querySelectorAll('script[src*="embed.tawk.to"]').forEach(el => el.remove());
    
    document.querySelectorAll('#smartsupp-widget-container').forEach(el => el.remove());
    document.querySelectorAll('.tawk-widget').forEach(el => el.remove());
    
    const selectors = [
      '.smartsupp-widget-container', 
      '.tawk-widget-container',
      '#smartsupp-widget-container',
      '.tawk-widget',
      '[id^="smartsupp-widget"]',
      '[id^="tawk"]'
    ];
    
    selectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.display = 'none';
        }
      });
    });
    
    document.querySelectorAll('iframe').forEach(el => {
      if (el.src && (el.src.includes('tawk.to') || el.src.includes('smartsupp'))) {
        el.remove();
      }
    });
  };
  
  useEffect(() => {
    // Làm sạch widgets khi pathname thay đổi
    if (prevPathRef.current !== pathname) {
      cleanupWidgets();
      prevPathRef.current = pathname;
    }
    
    // Cập nhật trạng thái hiển thị menu
    const shouldDisplayMenu = pathname?.includes('/seller') && !pathname?.includes('seller-policy');
    setIsDisplayMenu(shouldDisplayMenu);
    
  }, [pathname]);
 
  return (
    <ReactQueryClientProvider>
      <html suppressHydrationWarning>
        <body suppressHydrationWarning>
          <AntdRegistry>
            <ConfigProvider theme={theme}>
              <UserProvider>
                <WrapMessage>
                  <MaintenanceGuard>
                    <ConfigLoader />
                    {isDisplayMenu && (
                      <div key={pathname}>
                        <ChatWidget />
                      </div>
                    )}
                    {process.env.NEXT_PUBLIC_OTP_TEST_MODE === 'true' && (
                      <div className="fixed bottom-4 right-4 z-50">
                        <OtpEmailTester />
                      </div>
                    )}
                    <PathChecker>
                      {children}
                    </PathChecker>
                  </MaintenanceGuard>
                </WrapMessage>
              </UserProvider>
            </ConfigProvider>
          </AntdRegistry>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
} 