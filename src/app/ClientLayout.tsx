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
        // Use Function constructor to safely execute script content
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
            console.log('newScript', newScript);
            console.log('document.body', document.body);
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