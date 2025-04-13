import { title } from 'process';
import React from 'react'
interface IHeadeMangerDocumentProps {
    onClick?: () => void;
    title: string;
}

function HeaderManageDocument({ onClick, title }: IHeadeMangerDocumentProps) {
    return (
        <div className="flex justify-between items-center pb-4 pt-6 pl-6 pr-20">
            <div className="flex">
                <p className="text-black text-opacity-45 cursor-pointer" onClick={onClick}>
                    Quản lý công văn đi-đến <span className="mx-2">/</span>
                </p>
                <p className='font-semibold'>{title}</p>
            </div>
        </div>


    )
}

export default HeaderManageDocument