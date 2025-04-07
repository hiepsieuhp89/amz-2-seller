import type React from "react"
import { Table, Tooltip, Empty, Spin } from "antd"
import type { ColumnsType } from "antd/es/table"
import { useTopSellingProducts } from "@/hooks/dashboard"
import { ProductData } from "../types"
import { useSelectedProduct } from "@/stores/useSelectedProduct"
import Link from "next/link"
import Image from "next/image"

interface BestSellingProductsProps {
  data: ProductData[]
}

const BestSellingProducts: React.FC<BestSellingProductsProps> = ({ data }) => {
  const { data: topSellingProducts, isLoading } = useTopSellingProducts()
  const {setSelectedProduct} = useSelectedProduct()
  
  const columns: ColumnsType<ProductData> = [
    {
      title: "STT",
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
      title: "Tên sản phẩm",
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
          <Image 
                src={(record as any)?.product?.imageUrls[0] || "/images/white-image.png"} 
                alt={text} 
                width={40} 
                height={40} 
                className="object-cover"
              />
          </div>
          <div className="truncate">
              <span className="font-medium text-gray-600 hover:text-main-golden-orange">{text || "Chưa có tên"}</span>
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
        rowKey={(record: any) => record?.id}
        className="best-selling-products-table"
        locale={{ emptyText: <CustomEmpty /> }}
        rowClassName="hover:bg-gray-50 transition-colors cursor-pointer"
      />
    </div>
  )
}

export default BestSellingProducts

