'use client';
import { useRouter } from 'next/router';
import styles from './styles.module.scss';

import { lazy, useState } from 'react';
import Image from 'next/image';
import { svgs } from '@/const/svgs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';


const LayoutPage = lazy(() => import('@/components/LayoutPage'));
const LayoutHeaderCommon = lazy(() => import('@/components/LayoutHeaderCommom'));

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className={styles.root} suppressHydrationWarning>
            <div className='bg-white-primary'>
                <LayoutPage isSidebarOpen={isSidebarOpen} />
            </div>

            <div className={styles.outlet}>
                <LayoutHeaderCommon />
                <div className='mt-12 px-4'>
                    {children}
                </div>

            </div>
            <button className={styles.toggleButton} onClick={toggleSidebar}>
                {isSidebarOpen ? <FontAwesomeIcon icon={faBars} fontSize={30} /> : <FontAwesomeIcon icon={faXmark} fontSize={30} />}
            </button>
        </div>
    );
}
