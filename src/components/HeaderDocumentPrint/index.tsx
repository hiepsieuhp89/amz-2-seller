import React from 'react'
import '../../app/ga/plan_week/[week_number]/planWeek.scss'

function HeaderDocumentPrint() {
    return (
        <div className="mx-auto p-6 px-16 print-only">
            {/* Phần bên trái */}
            <div className="flex justify-between">
                <div className="text-left">
                    <div className="pl-10">
                        <p className="font-semibold text-xl">
                            BỘ THAM MƯU PK-KQ
                        </p>
                        <p className="font-bold text-xl px-2">
                            PHÒNG THÔNG TIN
                        </p>
                        <div className="flex justify-center pr-3">
                            <div className="w-14 h-[1px]  bg-black"></div>
                        </div>

                        <div className="flex items-center px-4 pt-4">
                            <span className="font-semibold">Số:</span>

                            <span className="ml-12">/KH-PTT</span>
                        </div>
                        <div>
                            <p className="font-bold mt-4 text-xl pl-6">
                                PHÊ DUYỆT
                            </p>
                            <div className="flex items-center italic">
                                <span className="font-semibold">Ngày</span>

                                <span className="ml-6">tháng</span>
                                <span className="ml-6">năm 20</span>
                            </div>
                            <p className="font-bold text-xl pr-8">
                                TRƯỞNG PHÒNG
                            </p>
                        </div>
                    </div>
                    <p className="font-bold pl-4 pt-16 pb-2 text-xl">
                        Đại tá Đinh Trọng Chung
                    </p>
                </div>

                <div>
                    <div className="pr-10">
                        <p className="font-bold uppercase text-[20px]">
                            Cộng hòa xã hội chủ nghĩa Việt Nam
                        </p>
                        <div className="flex justify-center">
                            <p className="font-bold text-[18px]">
                                Độc lập - Tự do - Hạnh phúc
                            </p>
                        </div>
                        <div className="flex justify-center">
                            <div className="w-[180px] h-[1px]  bg-black"></div>
                        </div>

                        <div className="flex items-center mt-3 pl-20 italic">
                            <span>Hà Nội,ngày</span>

                            <span className="ml-6">tháng</span>
                            <span className="ml-6">năm 20</span>
                        </div>
                        <div className="flex justify-center  pt-12">
                            <p className="font-bold mt-4 text-xl">KẾ HOẠCH TUẦN</p>
                        </div>

                        <div className="flex justify-center items-center pr-3">
                            <span>Từ ngày</span>

                            <span className="ml-6">đến ngày</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderDocumentPrint