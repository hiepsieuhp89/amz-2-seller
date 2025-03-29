import type React from "react"
import { Card } from "antd"
import { Line } from "@ant-design/charts"
import type { ChartData } from "../types"

interface RevenueChartProps {
  data: ChartData[]
}

const RevenueChart = ({ data }: RevenueChartProps) => {
  const config = {
    data,
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
    },
    xAxis: {
      grid: {
        line: {
          style: {
            stroke: "transparent",
          },
        },
      },
    },
    tooltip: {
      showMarkers: false,
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
    <Card className="h-full" style={{ borderRadius: "15px" }} bodyStyle={{ padding: "20px" }}>
      <h5 className="text-lg font-medium mb-4">Chi tiết doanh thu</h5>
      <div style={{ height: "400px" }}>
        <Line {...config} />
      </div>
    </Card>
  )
}

export default RevenueChart

