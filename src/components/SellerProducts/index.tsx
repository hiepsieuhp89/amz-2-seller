"use client"

import type React from "react"
import { useState } from "react"
import { Typography } from "antd"
import { ProductsStats } from "./ProductsStats"
import { ProductsTable } from "./ProductsTable"
import { IProduct } from "@/interface/response/products"

const SellerProducts = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  const handleSearch = (value: string) => {
    setSearchQuery(value)
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
        onSearch={handleSearch}
        selectedRowKeys={selectedRowKeys}
        onSelectChange={handleSelectChange}
      />
    </div>
  )
}

export default SellerProducts

