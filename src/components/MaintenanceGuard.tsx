import { useGetMaintenanceMode } from '@/hooks/maintenance';
import Image from 'next/image';
import { ReactNode } from 'react';

interface MaintenanceGuardProps {
    children: ReactNode;
}

const MaintenanceGuard = ({ children }: MaintenanceGuardProps) => {
    const { data: maintenanceMode } = useGetMaintenanceMode();
    if (maintenanceMode?.isMaintenance === true) {
        return (
            <div className='h-screen w-screen flex items-center justify-center relative'>
                <Image
                    src={"/images/maintenance.jpeg"}
                    alt="maintenance"
                    width={2500}
                    height={2500}
                    quality={100}
                    draggable={false}
                    className='w-full h-full object-cover'
                ></Image>
            </div>
        );
    }

    return <>{children}</>;
};

export default MaintenanceGuard; 