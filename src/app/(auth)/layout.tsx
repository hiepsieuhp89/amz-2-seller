"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import styles from "./styles.module.scss";

function AuthLayout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  return (
    <div className={`flex flex-col items-center ${styles.root}`} style={{ backgroundColor: '#4D148C', minHeight: '100vh' }}>
      <div className="py-8">
        <Image src="/images/fedex.png" width={120} height={40} alt="FedEx Logo" />
      </div>

      <div className="w-[480px] flex flex-col justify-center">
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
