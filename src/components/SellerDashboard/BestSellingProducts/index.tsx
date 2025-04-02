import type React from "react"
import { Table } from "antd"
import type { ColumnsType } from "antd/es/table"
import { useTopSellingProducts } from "@/hooks/dashboard"
import { ProductData } from "../types"
import { useSelectedProduct } from "@/app/stores/useSelectedProduct"
import Link from "next/link"

interface BestSellingProductsProps {
  data: ProductData[]
}

const BestSellingProducts: React.FC<BestSellingProductsProps> = ({ data }) => {
  const { data: topSellingProducts, isLoading } = useTopSellingProducts()
  const {setSelectedProduct} = useSelectedProduct()
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
      render: (text, record) => (
        <Link
          href={`/product?id=${(record as any)?.product?.id}`}
          target="_blank"
          onClick={() => setSelectedProduct((record as any)?.product)}
        >
          {text}
        </Link>
      ),
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
    <div className="rounded-xl bg-white p-4">
      <h5 className="text-lg font-medium mb-4">Sản phẩm bán chạy</h5>
      <Table
        columns={columns}
        dataSource={topSellingProducts}
        loading={isLoading}
        pagination={false}
        expandable={{ expandedRowRender }}
        rowKey={(record: any) => record?.id}
        bordered
      />
    </div>
  )
}

export default BestSellingProducts

