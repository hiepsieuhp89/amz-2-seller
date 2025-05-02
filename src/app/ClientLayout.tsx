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
import { useEffect, useState } from 'react';

export const openChat = () => {
  if (window.smartsupp) {
    window.smartsupp('chat:open');
  } else if (window.Tawk_API) {
    window.Tawk_API.maximize();
  }
};

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
  console.log('pathname', pathname);
  const isDisplayMenu = pathname?.includes('/seller') && !pathname?.includes('seller-policy');
  const [prevPath, setPrevPath] = useState<string | null>(null);
  
  useEffect(() => {
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
    
    if (prevPath !== pathname) {
      setPrevPath(pathname);
      
      if (!isDisplayMenu) {
        setTimeout(cleanupWidgets, 100);
      }
    }
    
    if (!isDisplayMenu) {
      cleanupWidgets();
    }
    
    return () => {
      if (!isDisplayMenu) {
        cleanupWidgets();
      }
    };
  }, [pathname, isDisplayMenu, prevPath]);

  if (isDisplayMenu) {
    return (
      <LayoutProvider>
        <ChatWidget />
        {children}
      </LayoutProvider>
    );
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
  const cleanupChatWidgets = () => {
    if (window._smartsupp) {
      delete window._smartsupp;
    }
    document.querySelectorAll('script[src*="smartsuppchat.com"]').forEach(el => el.remove());
    document.querySelectorAll('script[src*="embed.tawk.to"]').forEach(el => el.remove());
    document.querySelectorAll('#smartsupp-widget-container').forEach(el => el.remove());
    document.querySelectorAll('.tawk-widget').forEach(el => el.remove());
  };

  const initializeSmartsuppChat = (cskhConfig: any) => {
    try {
      cleanupChatWidgets();
      const script = document.createElement('script');
      script.type = 'text/javascript';
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
      
      document.head.appendChild(script);
      
      const groupScript = document.createElement('script');
      groupScript.innerHTML = `smartsupp('group', 'DlRScJm8T1'); //group SHOP`;
      document.head.appendChild(groupScript);
      
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
      
      const tawkScript = document.createElement('script');
      tawkScript.type = 'text/javascript';
      tawkScript.innerHTML = `
        var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
        (function(){
          var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
          s1.async=true;
          s1.src='https://embed.tawk.to/680df2c2ba317119092324a4/1ipr7oj9s';
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