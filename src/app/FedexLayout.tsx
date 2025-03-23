"use client"
import LayoutProvider from '@/components/Fedex/LayoutProvider';
import Head from 'next/head';
import { usePathname } from 'next/navigation';

function FedexLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDisplayMenu = pathname?.includes('fedex');

  if (isDisplayMenu) {
    return <>
      <Head>
        <title>Fedex</title>
        <meta
          name=""
          content="Fedex"
        />
      </Head><LayoutProvider>{children}</LayoutProvider></>;
  }
  return <>{children}</>;
}
export default FedexLayout
