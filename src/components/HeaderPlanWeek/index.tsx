import { convertToCustomDateFormat } from '@/regex';
import { convertDateFormat, getStartWeek } from '@/utils';
import React from 'react'


interface PlanWeekDataProps {
    from_date?: any;
    to_date?: any;
    timeUpdate?: any;
    week_number?: any;

}
const HeaderPlanWeek<PlanWeekDataProps> = ({ from_date,to_date,week_number, timeUpdate }) => {
    return (
        <div className="flex flex-col pt-4">
            <div>
                <h1 className="text-xl text-center font-bold">
                    KẾ HOẠCH CÔNG TÁC TUẦN {week_number}  (TỪ NGÀY{" "}
                    {convertToCustomDateFormat(from_date)} ĐẾN NGÀY{" "}
                    {convertToCustomDateFormat(to_date)} )
                </h1>
                <p className="text-center">
                    Cập nhật mới nhất , {timeUpdate}
                </p>
            </div>
        </div>
    )
}

export default HeaderPlanWeek