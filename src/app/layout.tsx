import type { Metadata } from 'next';
import './globals.css';
import ClientLayout from './ClientLayout';
import NextTopLoader from 'nextjs-toploader';

export const metadata: Metadata = {
  title: 'PKKQ',
  description: 'PKKQ',
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
