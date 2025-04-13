import { svgs } from '@/const/svgs';
import Image from 'next/image';
import React from 'react';

interface VersionItemProps {
  time?: string;
  current?: boolean;
  user?: string;
  month?: string;
  onClick?: () => void;
}

const VersionCurrentItem: React.FC<VersionItemProps> = ({ time, user, month, onClick }) => {
  return (
    <div className="mb-4 cursor-pointer" onClick={onClick} >

      {month && <div className="text-gray-400 font-semibold mb-2">{month}</div>}

      <div className='p-4 border bg-blue-100 border-blue-300' >
        <div className="">
          <div className="mr-2 flex items-center gap-2">
            <Image src={svgs.iconActive} width={7} height={7} alt='active' />
            <p className="font-bold text-xs">{time}</p>
          </div>
          <div className="text-sm">

            <p className=" text-xs">Phiên bản hiện tại</p>
          </div>
        </div>
        <div className="flex items-center mt-2">
          <div className="bg-orange-200 text-orange-600 rounded-full w-5 h-5 flex justify-center items-center text-xs font-bold mr-2">
            {user?.[0]?.toUpperCase()}
          </div>
          <p className="text-sm text-gray-600">{user}</p>
        </div>
      </div>
    </div>
  );
};
export default VersionCurrentItem

