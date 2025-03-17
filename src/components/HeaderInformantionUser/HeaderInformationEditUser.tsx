import { useRouter } from 'next/navigation'
import { title } from 'process'
import React from 'react'
interface IEditInforUserProps{
  title?: string
}

function HeaderInformationEditUser({title}:IEditInforUserProps) {
    const router=useRouter()
  return (
    <div className="bg-white-primary">
    <div className="flex justify-between items-center pb-4 pt-6 pl-6 pr-20">
      <div className="flex">
        <p
          className="text-black/45 cursor-pointer"
          onClick={() => router.back()}
        >
          Quản lý người dùng <span className="mx-2">/</span>
        </p>
        <p className="font-semibold">{title}</p>
      </div>
    </div>
  </div>
  )
}

export default HeaderInformationEditUser