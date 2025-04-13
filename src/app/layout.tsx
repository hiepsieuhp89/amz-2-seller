import type { Metadata } from 'next';
import './globals.css';
import ClientLayout from './ClientLayout';
import NextTopLoader from 'nextjs-toploader';
import Script from "next/script";

export const metadata: Metadata = {
  title: 'FedEx Global Home',
  description: 'Welcome to FedEx.com - Select your location to find services for shipping your package, package tracking, shipping rates, and tools to support shippers and small businesses',
  icons: {
    icon: '/images/fx-favicon.ico',
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
        color="#2299DD"
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        crawl={true}
        // showSpinner={true}
        easing="ease"
        speed={200}
      />
      {children}
    </ClientLayout>
  );
}
