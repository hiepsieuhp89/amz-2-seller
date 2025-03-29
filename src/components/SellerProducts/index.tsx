"use client"

import type React from "react"
import { useState } from "react"
import { ProductsStats } from "./ProductsStats"
import { ProductsTable } from "./ProductsTable"
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
          className="bg-blue-100 !text-[#188DFA] w-10 h-10 rounded-full flex items-center justify-center text-lg relative z-10"
        >
          <Icon path={mdiPackageVariant} size={0.8} color={"#188DFA"} />
        </div>
        <div
          className="bg-blue-100 w-fit px-6 h-8 rounded-full flex items-center justify-center -translate-x-5"
        >
          <p className="!font-semibold !text-[#188DFA] !text-base">
            Các sản phẩm
          </p>
        </div>

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

