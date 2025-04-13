import { getStartWeek } from '@/utils';
import React from 'react'



const HeaderCreatePlanWeek= () => {
    return (
        <div className="flex">
        <p className="text-black/45 ">
          Kế hoạch tuần <span className="mx-2">/</span>
        </p>
        <p className="font-semibold">Danh sách kế hoạch công tác tuần</p>
      </div>
    )
}

export default HeaderCreatePlanWeek