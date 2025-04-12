"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useGetRevenueStatistics } from "@/hooks/shop-products"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { DollarSign, ShoppingBag, TrendingUp } from "lucide-react"
import { useState } from "react"
import "./styles.css"

interface DailyStats {
  date: string
  revenue: number
  profit: number
  orders: number
}

const RevenueChart = () => {
  const [days, setDays] = useState("7")
  const { data: revenueData } = useGetRevenueStatistics({ days: Number.parseInt(days) })
  
  const chartData =
    revenueData?.data.dailyStats.map((item: DailyStats) => ({
      date: item.date,
      revenue: item.revenue,
      profit: item.profit,
      orders: item.orders,
    })) || []

  // Sum total values for display
  const totals = chartData.reduce(
    (acc: { revenue: number, profit: number, orders: number }, item: DailyStats) => {
      return {
        revenue: acc.revenue + (item.revenue || 0),
        profit: acc.profit + (item.profit || 0),
        orders: acc.orders + (item.orders || 0),
      }
    },
    { revenue: 0, profit: 0, orders: 0 }
  )

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getFullYear()}`
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      const formattedDate = formatDate(data.date)
      
      return (
        <div className="p-3 bg-white rounded-lg shadow-lg border border-gray-100">
          <div className="text-sm font-medium mb-2 text-gray-700">{formattedDate}</div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FFA940]" />
              <span className="font-medium">Doanh thu: <span className="text-[#FFA940]">${data.revenue?.toLocaleString("vi-VN") || 0}</span></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#52C41A]" />
              <span className="font-medium">Lợi nhuận: <span className="text-[#52C41A]">${data.profit?.toLocaleString("vi-VN") || 0}</span></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#1890FF]" />
              <span className="font-medium">Đơn hàng: <span className="text-[#1890FF]">{data.orders || 0}</span></span>
            </div>
          </div>
        </div>
      )
    }
    
    return null
  }

  return (
    <div className="h-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Chi tiết doanh thu</h3>
          <p className="text-sm text-gray-500 mt-1">Phân tích doanh thu theo thời gian</p>
        </div>
        <Select value={days} onValueChange={setDays}>
          <SelectTrigger className="w-[180px] bg-white border-gray-200 shadow-sm">
            <SelectValue placeholder="Chọn số ngày" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">7 ngày gần đây</SelectItem>
            <SelectItem value="30">30 ngày gần đây</SelectItem>
            <SelectItem value="90">90 ngày gần đây</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Revenue Card */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-lg border border-amber-100 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-amber-700">Tổng doanh thu</p>
              <h4 className="text-2xl font-bold mt-1 text-amber-900">${totals.revenue.toLocaleString("vi-VN")}</h4>
            </div>
            <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-amber-600" />
            </div>
          </div>
        </div>

        {/* Profit Card */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-100 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-green-700">Tổng lợi nhuận</p>
              <h4 className="text-2xl font-bold mt-1 text-green-900">${totals.profit.toLocaleString("vi-VN")}</h4>
            </div>
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </div>

        {/* Orders Card */}
        <div className="bg-gradient-to-br from-blue-50 to-sky-50 p-4 rounded-lg border border-blue-100 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-blue-700">Tổng đơn hàng</p>
              <h4 className="text-2xl font-bold mt-1 text-blue-900">{totals.orders}</h4>
            </div>
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <ShoppingBag className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: "350px" }} className="mobile:max-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatDate}
              axisLine={{ stroke: "#eee" }}
              tickLine={false}
            />
            <YAxis 
              tickFormatter={(value) => `$${value.toLocaleString("vi-VN")}`}
              axisLine={{ stroke: "#eee" }}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#FFA940" 
              strokeWidth={2}
              dot={{ fill: "white", stroke: "#FFA940", strokeWidth: 2, r: 5 }}
              activeDot={{ r: 7, stroke: "#FFA940", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default RevenueChart

