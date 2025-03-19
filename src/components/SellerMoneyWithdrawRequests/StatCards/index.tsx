import type React from "react"
import { DollarOutlined, PlusOutlined } from "@ant-design/icons"

interface StatCardProps {
  title: string
  value: string
  gradientClass: string
  icon?: React.ReactNode
}

const StatCard: React.FC<StatCardProps> = ({ title, value, gradientClass, icon = <DollarOutlined /> }) => {
  return (
    <div className={`rounded-[4px] overflow-hidden text-white ${gradientClass}`}>
      <div className="flex flex-col items-center">
        <div className="w-[30px] h-[30px] rounded-full bg-white bg-opacity-20 flex items-center justify-center mt-3">
          {icon}
        </div>
        <div className="px-3 pt-3 pb-3 text-center">
          <div className="text-xl font-bold">{value}</div>
          <div className="opacity-50 text-sm">{title}</div>
        </div>
      </div>
    </div>
  )
}

const ActionCard: React.FC<{ title: string, onClick?: () => void }> = ({ title, onClick }) => {
  return (
    <div 
      className="p-3 rounded h-full mb-3 cursor-pointer text-center bg-white shadow-sm hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      <div className="w-[60px] h-[60px] rounded-full bg-gray-500 flex items-center justify-center mb-3 mx-auto">
        <PlusOutlined className="text-3xl !text-white" />
      </div>
      <div className="text-lg text-blue-600">{title}</div>
    </div>
  )
}

const StatCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <StatCard 
        title="Số dư đang chờ xử lý" 
        value="$12.70" 
        gradientClass="bg-gradient-to-r from-pink-500 to-purple-500" 
      />
      <StatCard 
        title="Số dư trên Wallet" 
        value="$0.00" 
        gradientClass="bg-gradient-to-r from-blue-400 to-cyan-500" 
      />
      <ActionCard title="Gửi yêu cầu rút tiền" />
      <ActionCard title="Nạp tiền" />
    </div>
  )
}

export default StatCards 