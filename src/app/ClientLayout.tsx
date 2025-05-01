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
  
  // Simple toggle UI
  return (
    <></>
    // <div className="fixed bottom-16 right-4 z-50 bg-white shadow-md rounded-md p-2">
    //   <button 
    //     onClick={() => setChatProvider('smartsupp')}
    //     className={`px-3 py-1 rounded-md mr-2 ${chatProvider === 'smartsupp' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
    //   >
    //     Smartsupp
    //   </button>
    //   <button 
    //     onClick={() => setChatProvider('tawk')}
    //     className={`px-3 py-1 rounded-md ${chatProvider === 'tawk' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
    //   >
    //     Tawk.to
    //   </button>
    // </div>
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
                    <ChatWidget />
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