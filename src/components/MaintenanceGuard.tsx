import { useGetMaintenanceMode } from '@/hooks/maintenance';
import { ReactNode } from 'react';

interface MaintenanceGuardProps {
    children: ReactNode;
}

const MaintenanceGuard = ({ children }: MaintenanceGuardProps) => {
    const { data: maintenanceMode, isError } = useGetMaintenanceMode();
    
    // Show maintenance page if:
    // 1. Maintenance mode is explicitly set to true
    // 2. There's an API error (like 502) and we couldn't fetch maintenance status
    if (maintenanceMode?.isMaintenance === true || isError) {
        return (
            <div className="h-screen w-screen flex flex-col items-center justify-center bg-white p-6">
                <div className="max-w-3xl w-full text-center">
                    <div className="mb-6 flex justify-center">
                       <img src="/images/default-avatar.jpg" alt="maintenance" className="w-20 h-20 rounded-full" />
                    </div>

                    <h1 className="text-3xl font-bold mb-4">We'll be back soon!</h1>
                    <div className="mb-6 text-gray-600">
                        <p className="mb-4">
                            We're currently making some improvements to our website to serve you better.
                        </p>
                        <p>
                            Please check back soon. We apologize for any inconvenience this may cause.
                        </p>
                    </div>

                    <div className="p-4 bg-gray-100 border border-gray-300 rounded-md text-sm text-gray-700 mb-6">
                        <p className="mb-2 font-semibold">While you wait, you might:</p>
                        <ul className="text-left list-disc pl-6">
                            <li>Clear your browser cache and cookies</li>
                            <li>Try refreshing the page</li>
                            <li>Check back in a few minutes</li>
                        </ul>
                    </div>

                    <div className="text-xs text-gray-500">
                        © 1996-{new Date().getFullYear()}, Inc. or its affiliates
                    </div>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};

export default MaintenanceGuard;