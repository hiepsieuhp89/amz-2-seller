import { svgs } from '@/const/svgs';
import Image from 'next/image';
import React from 'react';

interface VersionItemProps {
  time?: string;
  user?: string;
  isSelected?: boolean;
  onClick?: () => void;
}

const VersionItem<VersionItemProps> = ({ time, user, onClick, isSelected }) => {
  return (
    <div
      className={`mb-4 cursor-pointer ${isSelected ? 'bg-[#f0f0f0]' : 'hover:bg-[#f0f0f0]'}`}
      onClick={onClick}
    >
      <div className='p-4 border border-gray-200'>
        <div className="">
          <div className="mr-2 flex items-center gap-2">
            <Image src={svgs.iconPlay} width={20} height={20} alt='aa' />
            <p className="font-bold text-xs">{time}</p>
          </div>
        </div>
        <div className="flex items-center mt-2">
          <div className="bg-orange-200 text-orange-600 rounded-full w-5 h-5 flex justify-center items-center text-xs font-bold mr-2">
            {user?.[0].toUpperCase()}
          </div>
          <p className="text-sm text-gray-600">{user}</p>
        </div>
      </div>
    </div>
  );
};

export default VersionItem;
