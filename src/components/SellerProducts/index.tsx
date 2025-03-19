"use client"

import type React from "react"
import { useState } from "react"
import { Typography } from "antd"
import { ProductsStats } from "./ProductsStats"
import { ProductsTable } from "./ProductsTable"
import { mockProducts } from "./mockData"
import { Pagination } from "antd"

const SellerProducts = () => {
  const [products, setProducts] = useState(mockProducts)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  const handleSearch = (value: string) => {
    setSearchQuery(value)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }

  return (
    <div className="px-4 py-4">
       <div className="flex items-center mb-4">
      <Typography.Title level={3} className="m-0">
        Các sản phẩm
      </Typography.Title>
    </div>

      <div className="mb-4">
        <ProductsStats />
      </div>

      <ProductsTable
        products={products}
        onSearch={handleSearch}
        selectedRowKeys={selectedRowKeys}
        onSelectChange={handleSelectChange}
      />

      <div className="flex justify-center mt-4">
        <Pagination
          current={currentPage}
          onChange={handlePageChange}
          total={50}
          showSizeChanger={false}
          itemRender={(page, type, originalElement) => {
            if (type === "prev") {
              return <a>‹</a>
            }
            if (type === "next") {
              return <a>›</a>
            }
            return originalElement
          }}
        />
      </div>
    </div>
  )
}

export default SellerProducts

