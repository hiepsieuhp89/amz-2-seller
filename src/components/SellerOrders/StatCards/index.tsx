import React from "react"
import { DollarOutlined } from "@ant-design/icons"
import { useShopStatistics } from "@/hooks/dashboard"

interface StatCardProps {
  title: string
  value: string | number
  gradientClass: string
}

const StatCard = ({ title, value, gradientClass }: StatCardProps) => {
  return (
    <div className={`rounded-[4px] overflow-hidden !text-white/80 ${gradientClass}`}>
      <div className="flex flex-col items-center">
        <div className="w-[30px] h-[30px] rounded-full bg-white bg-opacity-20 flex items-center justify-center mt-3">
          <DollarOutlined className="text-xl !text-white/80" />
        </div>
        <div className="px-3 pt-3 pb-3 text-center">
          <div className="text-xl font-bold">{value}</div>
          <div className="opacity-80 text-sm">{title}</div>
        </div>
      </div>
    </div>
  )
}

const StatCards: React.FC = () => {
  const { statistics } = useShopStatistics()
  if (!statistics) {
    return <div></div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <StatCard
        title="Tổng số đơn đặt hàng"
        value={statistics.totalOrders || 0}
        gradientClass="bg-gradient-to-r from-pink-500 to-purple-500"
      />
      <StatCard
        title="Tổng Thu Nhập"
        value={`$${(statistics as any).totalRevenue || 0}`}
        gradientClass="bg-gradient-to-r from-indigo-600 to-blue-500"
      />
      <StatCard
        title="Tổng Lợi Nhuận"
        value={`$${(statistics as any).totalProfit || 0}`}
        gradientClass="bg-gradient-to-r from-blue-400 to-cyan-500"
      />
      <StatCard
        title="Đơn hàng | Doanh thu | Lợi nhuận hôm nay"
        value={`${statistics.todayOrders || 0} / $${statistics.todayRevenue || 0} / $${statistics.todayProfit || 0}`}
        gradientClass="bg-gradient-to-r from-orange-400 to-amber-500"
      />
    </div>
  )
}

export default StatCards

