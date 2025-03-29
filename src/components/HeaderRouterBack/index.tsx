import { useRouter } from 'next/navigation';
import React from 'react'


interface PlanWeekDataProps {
    heading?: string;
    title?: string;

}
const HeaderRouterBack<PlanWeekDataProps> = ({ heading, title }) => {
    const router = useRouter()
    return (
        <div className="flex">
        <p
          className="text-black opacity-45 cursor-pointer"
          onClick={() => router.back()}
        >
          {heading}<span className="mx-2">/</span>
        </p>
        <p className="font-semibold">{title}</p>
      </div>
    )
}

export default HeaderRouterBack