import type React from "react"
import { Table, Tooltip, Empty, Spin } from "antd"
import type { ColumnsType } from "antd/es/table"
import { useTopSellingProducts } from "@/hooks/dashboard"
import { ProductData } from "../types"
import { useSelectedProduct } from "@/stores/useSelectedProduct"
import Link from "next/link"
import { BadgePercent, ShoppingCart, TrendingUp } from "lucide-react"
import Image from "next/image"

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
      render: (text, record, index) => (
        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mx-auto">
          <span className="text-xs text-gray-600 font-medium">{index + 1}</span>
        </div>
      ),
    },
    {
      title: "Sản phẩm",
      dataIndex: ["product", "name"],
      key: "name",
      ellipsis: true,
      render: (text, record) => (
        <Link
          href={`/product?id=${(record as any)?.product?.id}`}
          target="_blank"
          onClick={() => setSelectedProduct((record as any)?.product)}
          className="flex items-center gap-3 hover:text-blue-600 transition-colors"
        >
          <div className="w-10 h-10 rounded-md overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0">
            {(record as any)?.product?.images?.[0] ? (
              <Image 
                src={(record as any)?.product?.images?.[0]} 
                alt={text} 
                width={40} 
                height={40} 
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <ShoppingCart className="w-4 h-4 text-gray-400" />
              </div>
            )}
          </div>
          <div className="truncate">
            <Tooltip title={text}>
              <span className="font-medium text-gray-800 hover:text-blue-600">{text}</span>
            </Tooltip>
          </div>
        </Link>
      ),
    },
    {
      title: "Lượt bán",
      dataIndex: "totalSold",
      key: "totalSold",
      width: 100,
      className: "text-right",
      render: (value) => (
        <div className="text-right">
          <span className="font-semibold text-gray-800">{value}</span>
        </div>
      )
    },
  ]

  const expandedRowRender = (record: any) => {
    return (
      <div className="p-3 bg-gray-50 rounded-lg space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
              <BadgePercent className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-gray-600 font-medium">Doanh thu</span>
          </div>
          <span className="font-bold text-blue-600">${record.revenue?.toLocaleString('vi-VN') || 0}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <span className="text-gray-600 font-medium">Lợi nhuận</span>
          </div>
          <span className="font-bold text-green-600">${record.profit?.toLocaleString('vi-VN') || 0}</span>
        </div>
      </div>
    )
  }

  const CustomEmpty = () => (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description="Chưa có dữ liệu sản phẩm bán chạy"
      className="my-4"
    />
  );

  return (
    <div className="rounded-xl bg-white p-5 h-full border border-gray-100 shadow-sm">
      <div className="flex justify-between items-center mb-5">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Sản phẩm bán chạy</h3>
          <p className="text-sm text-gray-500 mt-1">Top sản phẩm có doanh số cao nhất</p>
        </div>
      </div>
      
      <Table
        columns={columns}
        dataSource={topSellingProducts}
        loading={{
          spinning: isLoading,
          indicator: <Spin size="small" />,
        }}
        pagination={false}
        expandable={{ 
          expandedRowRender,
          expandRowByClick: true,
        }}
        rowKey={(record: any) => record?.id}
        className="best-selling-products-table"
        locale={{ emptyText: <CustomEmpty /> }}
        rowClassName="hover:bg-gray-50 transition-colors cursor-pointer"
      />
    </div>
  )
}

export default BestSellingProducts

