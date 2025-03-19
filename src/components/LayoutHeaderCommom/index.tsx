'use client';

import { useRouter } from 'next/navigation';
import AvatarDropdown from '../AvatarComponent/AvatarDropdown';
export default function LayoutHeaderCommon() {
  const router = useRouter();

  if (typeof window !== "undefined") {
    window.addEventListener('storage', (event) => {
      if (event.key === 'role') {
        if (event.newValue === 'GA') {
          router.push('ga/plan_week')
        }
        if (event.newValue === 'CS') {
          router.push('/cs/manage_document')
        }
        if (event.newValue === 'ADMIN') {
          router.push('/admin/user')
        }
      }
    });
    window.addEventListener('storage', (event) => {
      if (event.key === 'department') {
        if (event.newValue === 'COMBAT') {
          router.push('combat/plan_week')
        }
        if (event.newValue === 'TRAINING') {
          router.push('traning/plan_week')
        }
        if (event.newValue === 'TECH') {
          router.push('tech/plan_week')
        }
        if (event.newValue === 'CONTROL') {
          router.push('control/plan_week')
        }

      }
    });
  }
  return (
    <header className="bg-[#4376A0] text-white px-4 py-3 flex justify-between items-center fixed top-0 left-0 w-full z-10 shadow-md">
      <div className="flex items-center gap-2 pl-12">
        <p className='font-semibold'>Amazon</p>
      </div>
      <div className="flex items-center">
        <div className="ml-8 flex items-center gap-2 pr-6">
          <AvatarDropdown />
        </div>
      </div>
    </header>
  );
}
