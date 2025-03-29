'use client';

import { useRouter } from 'next/navigation';
import AvatarDropdown from '../AvatarComponent/AvatarDropdown';
import Image from 'next/image';
import { mdiFaceAgent, mdiBellBadgeOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { motion } from 'framer-motion';

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
    <header className="!h-[70px] min-h-[70px] bg-main-dark-blue text-white px-4 py-3 flex justify-between items-center fixed top-0 left-0 w-full shadow-md z-50">
      <div className="relative h-8 left-[64px]">
        <Image
          quality={100}
          draggable={false}
          src="/images/logo.png"
          alt="logo"
          width={100}
          height={100}
          className='h-full w-full object-contain'
        />
      </div>
      <div className="flex items-center">
        <div className="ml-8 flex items-center gap-1 pr-6 ">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full hover:bg-[#FCAF17]/10 cursor-pointer"
          >
            <Icon path={mdiFaceAgent} size={0.9} color="#FCAF17" />
          </motion.div>
          <Popover>
            <PopoverTrigger asChild>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full hover:bg-[#FCAF17]/10 cursor-pointer relative mr-2"
              >
                <Icon path={mdiBellBadgeOutline} size={0.9} color="#FCAF17" />
              </motion.div>
            </PopoverTrigger>
            <PopoverContent
              side="bottom"
              align="center"
              className="w-64 p-2 bg-white shadow-lg rounded-lg"
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-2"
              >
                <div className="px-3 py-2 hover:bg-[#FCAF17]/10 rounded-md cursor-pointer">Đơn hàng</div>
                <div className="px-3 py-2 hover:bg-[#FCAF17]/10 rounded-md cursor-pointer">Người bán</div>
                <div className="px-3 py-2 hover:bg-[#FCAF17]/10 rounded-md cursor-pointer">Các khoản thanh toán</div>
              </motion.div>
            </PopoverContent>
          </Popover>
          <AvatarDropdown />
        </div>
      </div>
    </header>
  );
}
