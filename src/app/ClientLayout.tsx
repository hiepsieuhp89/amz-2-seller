"use client"
import WrapMessage from '@/components/WrapMessage';
import { UserProvider } from '@/context/useUserContext';
import { ReactQueryClientProvider } from '@/provider/ReactQueryClientProvider';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider, ThemeConfig } from 'antd';
import FedexLayout from './FedexLayout';

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
        </body>
      </html>
    </ReactQueryClientProvider>
  );
} 