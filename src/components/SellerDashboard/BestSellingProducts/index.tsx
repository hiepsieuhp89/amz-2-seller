import type React from "react"
import { Card, Table } from "antd"
import type { ColumnsType } from "antd/es/table"
import { useTopSellingProducts } from "@/hooks/dashboard"
import { ProductData } from "../types"

interface BestSellingProductsProps {
  data: ProductData[]
}

const BestSellingProducts: React.FC<BestSellingProductsProps> = ({ data }) => {
  const { data: topSellingProducts, isLoading } = useTopSellingProducts()

  const columns: ColumnsType<ProductData> = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      width: 60,
      className: "text-center",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tên",
      dataIndex: ["product", "name"],
      key: "name",
      ellipsis: true,
    },
    {
      title: "Lượt bán",
      dataIndex: "totalSold",
      key: "totalSold",
      width: 100,
    },
  ]

  const expandedRowRender = (record: any) => {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[#b5b5c3]">Doanh thu</span>
          <span className="font-bold">${record.revenue}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[#b5b5c3]">Lợi nhuận</span>
          <span className="font-bold">${record.profit}</span>
        </div>
      </div>
    )
  }

  return (
    <div style={{ borderRadius: "15px" }} className="p-5">
      <h5 className="text-lg font-medium mb-4">Sản phẩm bán chạy</h5>
      <Table
        columns={columns}
        dataSource={topSellingProducts}
        loading={isLoading}
        pagination={false}
        expandable={{ expandedRowRender }}
        rowKey={(record: any) => record?.id}
      />
    </div>
  )
}

export default BestSellingProducts

