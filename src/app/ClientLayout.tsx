"use client"
import WrapMessage from '@/components/WrapMessage';
import { UserProvider } from '@/context/useUserContext';
import { ReactQueryClientProvider } from '@/provider/ReactQueryClientProvider';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider, ThemeConfig } from 'antd';
import FedexLayout from './FedexLayout';
import { useAllConfigs } from '@/hooks/config';
import { useEffect } from 'react';

function SmartsuppChat() {
  const { configsData } = useAllConfigs();
  
  useEffect(() => {
    if (configsData?.data) {
      const cskhConfig = configsData.data.find((config: any) => config.key === 'CSKH' && config.isActive);
      
      if (cskhConfig && typeof window !== 'undefined') {
        console.log('cskhConfig', cskhConfig);
        
        // For Smartsupp chat, we'll use a safer direct insertion approach
        if (cskhConfig.key === 'CSKH') {
          try {
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
          } catch (error) {
            console.error('Error initializing chat:', error);
          }
        }
      }
    }
  }, [configsData]);
  
  return null;
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
                  <FedexLayout>{children}</FedexLayout>
                </WrapMessage>
              </UserProvider>
            </ConfigProvider>
          </AntdRegistry>
          <SmartsuppChat />
        </body>
      </html>
    </ReactQueryClientProvider>
  );
} 