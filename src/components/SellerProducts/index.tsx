"use client"

import type React from "react"
import { useState } from "react"
import { Typography } from "antd"
import { ProductsStats } from "./ProductsStats"
import { ProductsTable } from "./ProductsTable"
import { IProduct } from "@/interface/response/products"
import { mdiPackageVariant } from "@mdi/js"
import Icon from "@mdi/react"

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
    <div className="p-4">
      <div className="flex items-center mb-4">
        <div
          className="bg-amber-100 text-main-golden-orange w-10 h-10 rounded-full flex items-center justify-center mr-3 text-lg"
        >
          <Icon path={mdiPackageVariant} size={0.8} color={"#FCAF17"} />
        </div>
        <h1 className="!font-semibold text-main-gunmetal-blue text-xl">
          Các sản phẩm
        </h1>
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

