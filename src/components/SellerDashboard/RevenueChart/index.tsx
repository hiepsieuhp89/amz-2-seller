import type React from "react"
import { Card } from "antd"
import { Line } from "@ant-design/charts"

interface ChartData {
  date: string
  value: number
}

interface RevenueChartProps {
  data: ChartData[]
}

const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
  const config = {
    data: data,
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
      type: 'time',
      label: {
        formatter: (date: string) => {
          return new Date(date).toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          });
        }
      },
      grid: {
        line: {
          style: {
            stroke: "transparent",
          },
        },
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
    },
    tooltip: {
      showMarkers: true,
      fields: ['date', 'value'],
      formatter: (datum: any) => {
        return {
          name: 'Doanh thu',
          value: `$${datum.value.toLocaleString('vi-VN')}`
        };
      },
      customContent: (title: string, items: any[]) => {
        const date = new Date(title).toLocaleDateString('vi-VN', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
        
        return (
          <div className="p-2 bg-white rounded shadow">
            <div className="text-sm font-medium">{date}</div>
            {items.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <span 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span>{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        );
      }
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

