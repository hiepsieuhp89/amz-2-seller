"use client"
import { ReactQueryClientProvider } from '@/provider/ReactQueryClientProvider';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider, ThemeConfig } from 'antd';
import WrapMessage from '@/components/WrapMessage';
import { usePathname } from 'next/navigation';
import LayoutProvider from '@/components/LayoutProvider';

function PathChecker({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDisplayMenu = pathname?.includes('seller');

  if (isDisplayMenu) {
    return <LayoutProvider>{children}</LayoutProvider>;
  }
  return <>{children}</>;
}

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme: ThemeConfig = {
    token: {
      fontSize: 14,
      colorPrimary: '#4376A0',
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
          <AntdRegistry>
            <ConfigProvider theme={theme}>
              <WrapMessage>
                <PathChecker>
                  {children}
                </PathChecker>
              </WrapMessage>
            </ConfigProvider>
          </AntdRegistry>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
} 