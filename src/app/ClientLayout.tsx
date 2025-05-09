"use client"
import WrapMessage from '@/components/WrapMessage';
import { UserProvider } from '@/context/useUserContext';
import { ReactQueryClientProvider } from '@/provider/ReactQueryClientProvider';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider, ThemeConfig } from 'antd';
import FedexLayout from './FedexLayout';
import { useAllConfigs } from '@/hooks/config';
import { useEffect, useState } from 'react';
import MaintenanceGuard from '@/components/MaintenanceGuard';

// Add TypeScript declarations for the window object properties
declare global {
  interface Window {
    smartsupp?: any;
    _smartsupp?: any;
    Tawk_API?: any;
    Tawk_LoadStart?: Date;
    openChat?: () => void;
  }
}

function ChatWidget() {
  const { configsData } = useAllConfigs();
  // State to toggle between chat services
  const [chatService, setChatService] = useState('tawkto'); // 'smartsupp' or 'tawkto'
  const [chatInitialized, setChatInitialized] = useState(false);

  // Function to initialize Tawk.to chat
  const initializeTawkto = () => {
    try {
      // Remove any previous tawk instances
      if (document.getElementById('tawk-script')) {
        document.getElementById('tawk-script')?.remove();
      }
      
      // Initialize Tawk_API safely
      window.Tawk_API = window.Tawk_API || {};
      window.Tawk_LoadStart = new Date();
      
      // Create a script element for Tawk.to
      const script = document.createElement('script');
      script.id = 'tawk-script';
      script.type = 'text/javascript';
      script.async = true;
      script.src = 'https://embed.tawk.to/681d704cfe55ac190d563bcd/1iqpftbod';
      script.charset = 'UTF-8';
      script.setAttribute('crossorigin', '*');
      script.setAttribute('data-chat-widget', 'tawkto');
      
      // Add error handling
      script.onerror = (error) => {
        console.error('Failed to load Tawk.to script:', error);
        setChatInitialized(false);
      };
      
      script.onload = () => {
        setChatInitialized(true);
        console.log('Tawk.to script loaded successfully');
      };
      
      // Create global openChat function
      window.openChat = function() {
        if (window.Tawk_API && typeof window.Tawk_API.maximize === 'function') {
          window.Tawk_API.maximize();
          console.log('Opening Tawk.to chat');
        } else {
          console.error('Tawk.to not initialized yet');
          // Attempt to reinitialize
          initializeTawkto();
        }
      };
      
      // Append script to document
      document.head.appendChild(script);
    } catch (error) {
      console.error('Error initializing Tawk.to chat:', error);
      setChatInitialized(false);
    }
  };

  // Function to initialize Smartsupp chat
  const initializeSmartsupp = (cskhConfig: any) => {
    try {
      // Create a script element
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.setAttribute('data-chat-widget', 'smartsupp');

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
        
        // Set Smartsupp group
        smartsupp('group', 'Hs0YzIBk5u'); //group FEDEX
        
        // Create global openChat function
        window.openChat = function() {
          if (window.smartsupp) {
            window.smartsupp('chat:open');
            console.log('Opening Smartsupp chat');
          } else {
            console.error('Smartsupp not initialized yet');
          }
        };
      `;

      // Append to document
      document.head.appendChild(script);
      setChatInitialized(true);

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
      setChatInitialized(false);
    }
  };

  // Setup periodic check for chat initialization
  useEffect(() => {
    let checkInterval: NodeJS.Timeout;
    
    if (!chatInitialized) {
      checkInterval = setInterval(() => {
        if (typeof window !== 'undefined') {
          const isTawkReady = window.Tawk_API && typeof window.Tawk_API.maximize === 'function';
          const isSmartSuppReady = window.smartsupp && typeof window.smartsupp === 'function';
          
          if ((chatService === 'tawkto' && !isTawkReady) || 
              (chatService === 'smartsupp' && !isSmartSuppReady)) {
            console.log('Chat not initialized, attempting to reinitialize...');
            if (configsData?.data) {
              const cskhConfig = configsData.data.find((config: any) => config.key === 'CSKH' && config.isActive);
              if (cskhConfig) {
                if (chatService === 'tawkto') {
                  initializeTawkto();
                } else if (chatService === 'smartsupp') {
                  initializeSmartsupp(cskhConfig);
                }
              }
            }
          } else if ((chatService === 'tawkto' && isTawkReady) || 
                    (chatService === 'smartsupp' && isSmartSuppReady)) {
            setChatInitialized(true);
            clearInterval(checkInterval);
          }
        }
      }, 5000); // Check every 5 seconds
    }
    
    return () => {
      if (checkInterval) clearInterval(checkInterval);
    };
  }, [chatInitialized, chatService, configsData]);

  useEffect(() => {
    // Cleanup function to remove previous chat scripts
    const cleanup = () => {
      // Remove any existing Smartsupp or Tawk.to scripts
      const existingScripts = document.querySelectorAll('script[data-chat-widget]');
      existingScripts.forEach(script => script.remove());
      
      // Remove global Smartsupp variables
      if (window.smartsupp) {
        delete window.smartsupp;
      }
      if (window._smartsupp) {
        delete window._smartsupp;
      }
      
      // Remove global Tawk_API variables
      if (window.Tawk_API) {
        delete window.Tawk_API;
      }
      if (window.Tawk_LoadStart) {
        delete window.Tawk_LoadStart;
      }
      
      setChatInitialized(false);
    };

    // First cleanup any existing chat widgets
    cleanup();

    if (configsData?.data) {
      const cskhConfig = configsData.data.find((config: any) => config.key === 'CSKH' && config.isActive);

      if (cskhConfig && typeof window !== 'undefined') {
        console.log('cskhConfig', cskhConfig);

        if (chatService === 'smartsupp') {
          initializeSmartsupp(cskhConfig);
        } else if (chatService === 'tawkto') {
          initializeTawkto();
        } else {
          // Handle other types of chat widgets or content
          try {
            // Create a container div
            const container = document.createElement('div');
            container.innerHTML = cskhConfig.value;

            // Extract and execute all scripts
            const scripts = container.querySelectorAll('script');
            scripts.forEach(script => {
              const newScript = document.createElement('script');
              newScript.setAttribute('data-chat-widget', 'other');

              // Copy all attributes
              Array.from(script.attributes).forEach(attr => {
                newScript.setAttribute(attr.name, attr.value);
              });

              // Set the script content
              newScript.innerHTML = script.innerHTML;

              // Append to document
              document.body.appendChild(newScript);
            });

            // Add any HTML content that's not a script
            const htmlContent = document.createElement('div');
            htmlContent.innerHTML = cskhConfig.value.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

            // Only append if there's actual content (not just whitespace)
            if (htmlContent.innerHTML.trim()) {
              document.body.appendChild(htmlContent);
            }
            
            setChatInitialized(true);
          } catch (error) {
            console.error('Error initializing chat:', error);
            setChatInitialized(false);
          }
        }
      }
    }

    // Cleanup when component unmounts
    return cleanup;
  }, [configsData, chatService]);

  // Button to toggle between chat services
  return (
    <></>
    // <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
    //   <button 
    //     onClick={() => setChatService(chatService === 'smartsupp' ? 'tawkto' : 'smartsupp')}
    //     style={{ 
    //       padding: '8px 12px', 
    //       background: '#232F3E', 
    //       color: 'white', 
    //       border: 'none', 
    //       borderRadius: '4px',
    //       cursor: 'pointer'
    //     }}
    //   >
    //     Switch to {chatService === 'smartsupp' ? 'Tawk.to' : 'Smartsupp'}
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
      colorPrimary: '#232F3E',
      borderRadius: 12,
      controlHeight: 40,
      colorTextPlaceholder: '#636364',
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
      <html>
        <body>
          <AntdRegistry >
            <ConfigProvider theme={theme}>
              <UserProvider>
                <WrapMessage>
                  <MaintenanceGuard>
                    <FedexLayout>{children}</FedexLayout>
                  </MaintenanceGuard>
                </WrapMessage>
              </UserProvider>
            </ConfigProvider>
          </AntdRegistry>
          <ChatWidget />
        </body>
      </html>
    </ReactQueryClientProvider>
  );
} 