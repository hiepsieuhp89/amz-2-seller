"use client"
import { Line } from "@ant-design/charts"
import "./styles.css"
import { useGetRevenueStatistics } from "@/hooks/shop-products"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

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
      value: item.revenue,
      profit: item.profit,
      orders: item.orders,
    })) || []

  // Helper function to format date consistently
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getFullYear()}`
  }

  const config = {
    data: chartData,
    xField: "date",
    yField: "value",
    smooth: true,
    point: {
      size: 5,
      shape: "circle",
      style: {
        fill: "white",
        stroke: "#FFA940",
        lineWidth: 2,
      },
    },
    line: {
      color: "#FFA940",
    },
    xAxis: {
      type: "time",
      label: {
        formatter: (date: string) => {
          const d = new Date(date)
          return `${d.getDate().toString().padStart(2, "0")}-${(d.getMonth() + 1).toString().padStart(2, "0")}-${d.getFullYear()}`
        },
      },
      grid: {
        line: {
          style: {
            stroke: "transparent",
          },
        },
      },
      // Add this to ensure proper date formatting
      tickLine: {
        alignWithLabel: true,
      },
      // Add this to control date format at the axis level
      dateFormatter: (date: string) => {
        return date.split("T")[0] // Remove the time part before formatting
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "",
      },
      grid: {
        line: {
          style: {
            stroke: "#eee",
            lineDash: [4, 4],
          },
        },
      },
      label: {
        formatter: (value: number) => `$${value.toLocaleString("vi-VN")}`,
      },
    },
    tooltip: {
      showMarkers: true,
      fields: ["date", "value", "profit", "orders"],
      customContent: (title: string, items: any[]) => {
        // Extract just the date part by splitting at 'T'
        const datePart = title.split("T")[0]
        const [year, month, day] = datePart.split("-")
        const formattedDate = `${day}-${month}-${year}`

        const data = items[0]?.data

        return (
          <div className="p-2 bg-white rounded shadow">
            <div className="text-sm font-medium">{formattedDate}</div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FFA940]" />
                <span>Doanh thu: ${data?.value.toLocaleString("vi-VN")}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#52C41A]" />
                <span>Lợi nhuận: ${data?.profit.toLocaleString("vi-VN")}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#1890FF]" />
                <span>Đơn hàng: {data?.orders}</span>
              </div>
            </div>
          </div>
        )
      },
    },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: "#000",
          fill: "red",
        },
      },
    },
    interactions: [
      {
        type: "marker-active",
      },
    ],
  }

  return (
    <div className="h-full p-4 bg-white rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg font-meidum">Chi tiết doanh thu</p>
        <Select value={days} onValueChange={setDays}>
          <SelectTrigger className="w-[180px] rounded-sm">
            <SelectValue placeholder="Chọn số ngày" />
          </SelectTrigger>
          <SelectContent className="rounded-sm">
            <SelectItem value="7">7 ngày</SelectItem>
            <SelectItem value="30">30 ngày</SelectItem>
            <SelectItem value="90">90 ngày</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div style={{ height: "400px" }} className="mobile:max-h-[300px]">
        <Line {...config} />
      </div>
    </div>
  )
}

export default RevenueChart

