import React, { Suspense } from 'react';
import styles from './styles.module.scss';
import dynamic from 'next/dynamic';

// const LogoComponent = dynamic(() => import('@/components/LogoComponent'), {
//   loading: () => <p>...loading</p>,
// });

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
   
      <div
        className={`flex flex-col gap-6 justify-center items-center min-w-screen min-h-screen ${styles.root}`}
      >
        {/* <LogoComponent /> */}

        <div className="w-[460px] flex flex-col justify-center rounded-[2px] bg-white px-12 py-12  ">
          {children}
        </div>
      </div>
  
  );
}

export default AuthLayout;
