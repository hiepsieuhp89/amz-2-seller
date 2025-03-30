import type React from "react"
import { Card } from "antd"
import { useShopDetailStatistics } from "@/hooks/dashboard"
import { ListTaskIcon, PercentIcon, CalendarWeekIcon } from "../mockData"



const PackageInfo = () => {
  const { detailStatistics } = useShopDetailStatistics()

  const packageItems = [
    {
      icon: <ListTaskIcon />,
      value: `${detailStatistics?.activeProducts || 0} / ${detailStatistics?.sellerPackage?.maxProducts || 0}`,
      label: "Sản phẩm đang được bán",
      bgColor: "bg-[#DFF5FF]",
      iconColor: "text-[#5356FF]",
    },
    {
      icon: <PercentIcon />,
      value: `${detailStatistics?.sellerPackage?.percentProfit || 0}%`,
      label: "Sẽ được giảm giá nhập khi bạn chọn hàng tại Storehouse",
      bgColor: "bg-[#fce3e3]",
      iconColor: "text-[#A87676]",
    },
    {
      icon: <CalendarWeekIcon />,
      value: `${detailStatistics?.sellerPackage?.duration || 0} ngày còn lại`,
      label: "Trước khi gói hết hiệu lực",
      bgColor: "bg-[#CDE8E5]",
      iconColor: "text-[#7AB2B2]",
    },
  ]

  return (
    <div style={{ borderRadius: "15px", padding: "20px", background: "#fff" }}>
      <h5 className="text-lg font-medium mb-4">Gói đã mua</h5>
      <div className="flex justify-center items-center p-4">
        <img
          src="https://shop.shop-worldwide-amz.top/public/uploads/all/LAqQwhcT7SII4cm2jolwm3DyqONCvQHhMmCt2ziu.png?v=2"
          alt="Silver Shop"
          className="w-24"
        />
        <h5 className="my-auto text-center mx-3 text-lg font-medium">
          {detailStatistics?.sellerPackage?.name || "Gói bán hàng mặc định"}
        </h5>
      </div>

      <div className="space-y-3">
        {packageItems.map((item, index) => (
          <div key={index} className="flex items-center my-3">
            <div className={`w-[45px] h-[45px] flex-shrink-0 rounded-md mr-2.5 flex justify-center items-center ${item.bgColor}`}>
              <span className={`text-2xl ${item.iconColor}`}>{item.icon}</span>
            </div>
            <div>
              <h5 className="text-base font-bold text-[#474d58] m-0">{item.value}</h5>
              <span className="text-xs font-bold text-[#b5b5c3]">{item.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PackageInfo

