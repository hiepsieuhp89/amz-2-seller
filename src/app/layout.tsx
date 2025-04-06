import type { Metadata } from 'next';
import './globals.css';
// import './font.css';
import ClientLayout from './ClientLayout';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'react-hot-toast';
import 'flag-icons/css/flag-icons.min.css';

export const metadata: Metadata = {
  title: 'Amazon',
  description: 'Amazon.com Official Site — Browse & discover millions of products. Read customer reviews and find best sellers. Yes, we ship to you. Shop top brands in electronics, clothing, books & more.',
  icons: {
    icon: '/images/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClientLayout>
      <NextTopLoader
        color="#FF9900"
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        crawl={true}
        easing="ease"
        speed={200}
        showSpinner={false}
      />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#fff',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            borderRadius: '8px',
            padding: '12px 16px',
            fontSize: '14px',
            color: '#333',
          },
        }}
      />
      {children}
    </ClientLayout>
  );
}
