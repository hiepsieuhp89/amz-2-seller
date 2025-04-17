"use client"
import LayoutProvider from '@/components/LayoutProvider';
import WrapMessage from '@/components/WrapMessage';
import { UserProvider } from '@/context/useUserContext';
import { useGetMaintenanceMode } from '@/hooks/maintenance';
import { ReactQueryClientProvider } from '@/provider/ReactQueryClientProvider';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider, ThemeConfig } from 'antd';
import { usePathname } from 'next/navigation';
import MaintenanceGuard from '@/components/MaintenanceGuard';
import OtpEmailTester from '@/components/OtpEmailTester';

function PathChecker({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDisplayMenu = pathname?.includes('/seller') && !pathname?.includes('seller-policy');

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