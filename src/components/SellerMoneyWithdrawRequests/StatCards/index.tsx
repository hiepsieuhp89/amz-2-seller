import { useUser } from "@/context/useUserContext"
import { useCreateWithdrawal } from "@/hooks/withdrawals"
import { DollarOutlined, PlusOutlined } from "@ant-design/icons"
import { Input, message, Modal, InputNumber } from "antd"
import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useShopStatistics } from "@/hooks/dashboard"
import { formatNumber } from "@/utils"

interface StatCardProps {
  title: string
  value: string
  gradientClass: string
  icon?: React.ReactNode
}

const StatCard = ({ title, value, gradientClass, icon = <DollarOutlined /> }: StatCardProps) => {
  return (
    <div className={`rounded-[4px] overflow-hidden !text-white/80 ${gradientClass}`}>
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

const ActionCard = ({ title, onClick }: { title: string, onClick?: () => void }) => {
  return (
    <div
      className="p-3 rounded h-full mb-3 cursor-pointer text-center bg-white   transition-shadow"
      onClick={onClick}
    >
      <div className="w-[60px] h-[60px] rounded-full bg-gray-500 flex items-center justify-center mb-3 mx-auto">
        <PlusOutlined className="text-3xl !text-white" />
      </div>
      <div className="text-lg text-blue-600">{title}</div>
    </div>
  )
}

const StatCards = () => {
  const { profile } = useUser()
  const [amount, setAmount] = useState<number>(0)
  const [withdrawPassword, setWithdrawPassword] = useState<string>("")
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { mutate: createWithdrawal, isPending } = useCreateWithdrawal()
  const { statistics, isLoading } = useShopStatistics()

  const handleWithdrawClick = () => {
    if (!profile?.data?.bankAccountNumber || !profile?.data?.bankName || !profile?.data?.bankAccountName) {
      message.warning(
        <span>
          Vui lòng cập nhật thông tin ngân hàng trước khi rút tiền.
          <Link href="/seller/shop" className="text-blue-500 ml-1 underline">
            Cập nhật ngay
          </Link>
        </span>
      )
      return
    }
    setIsModalVisible(true)
  }

  const handleWithdraw = () => {
    if (!withdrawPassword) {
      message.error("Vui lòng nhập Mật khẩu giao dịch")
      return
    }

    createWithdrawal({ amount, withdrawPassword }, {
      onSuccess: () => {
        message.success("Yêu cầu rút tiền thành công")
        setIsModalVisible(false)
        setWithdrawPassword("")
        setAmount(0)
      },
      onError: (error: any) => {
        // Display the specific error message from the API if available
        const errorMessage = error?.response?.data?.message || "Có lỗi xảy ra khi gửi yêu cầu rút tiền"
        message.error(errorMessage)
      }
    })
  }

  return (
    <>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

       div className="space-y-4">
          <StatCard 
            title="Tổng đơn hàng" 
            value={`${statistics?.totalOrders || 0}`} 
            gradientClass="bg-gradient-to-r from-purple-500 to-indigo-500" 
          />
          <StatCard 
            title="Doanh thu tổng" 
            value={`$${statistics?.totalRevenue || 0}`} 
            gradientClass="bg-gradient-to-r from-green-500 to-teal-500" 
          />
          <StatCard 
            title="Lợi nhuận tổng" 
            value={`$${statistics?.totalProfit || 0}`} 
            gradientClass="bg-gradient-to-r from-yellow-500 to-[#E3E6E6]0" 
          />
        </div>

        <div className="space-y-4">
          <StatCard 
            title="Đơn hàng hôm nay" 
            value={`${statistics?.todayOrders || 0}`} 
            gradientClass="bg-gradient-to-r from-blue-500 to-cyan-500" 
          />
          <StatCard 
            title="Doanh thu hôm nay" 
            value={`$${statistics?.todayRevenue || 0}`} 
            gradientClass="bg-gradient-to-r from-pink-500 to-rose-500" 
          />
          <StatCard 
            title="Lợi nhuận hôm nay" 
            value={`$${statistics?.todayProfit || 0}`} 
            gradientClass="bg-gradient-to-r from-indigo-500 to-violet-500" 
          />
        </div>
      </div> */}

      {/* Other Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard
          title="Số dư đang chờ xử lý"
          value={`$${formatNumber(Number(statistics?.totalPendingOrderAmount || 0))}`}
          gradientClass="bg-gradient-to-r from-pink-500 to-purple-500"
        />
        <StatCard
          title="Số dư trên Wallet"
          value={`$${formatNumber(Number(profile?.data?.balance || 0))}`}
          gradientClass="bg-gradient-to-r from-blue-400 to-cyan-500"
        />
        <ActionCard
          title="Gửi yêu cầu rút tiền"
          onClick={handleWithdrawClick}
        />
        {/* <ActionCard title="Nạp tiền" /> */}
      </div>

      <Modal
        title="Rút tiền"
        visible={isModalVisible}
        onOk={handleWithdraw}
        onCancel={() => setIsModalVisible(false)}
        confirmLoading={isPending}
      >
        <div className="space-y-4">
          <div className="bg-blue-50 p-3 rounded-md mb-3">
            <p className="text-sm text-blue-700">
              Số dư khả dụng: <span className="font-bold">${formatNumber(Number(profile?.data?.balance || 0))}</span>
            </p>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Số tiền cần rút</label>
            <InputNumber
              addonBefore="$"
              placeholder="Nhập số tiền cần rút"
              value={amount}
              onChange={(value) => setAmount(Number(value || 0))}
              min={0}
              max={profile?.data?.balance || 0}
              className="w-full"
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value: any) => value!.replace(/\$\s?|(,*)/g, '')}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Mật khẩu giao dịch</label>
            <Input.Password
              placeholder="Nhập Mật khẩu giao dịch"
              value={withdrawPassword}
              onChange={(e) => setWithdrawPassword(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
      </Modal>
    </>
  )
}

export default StatCards 