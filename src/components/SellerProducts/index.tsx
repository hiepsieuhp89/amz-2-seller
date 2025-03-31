"use client"

import type React from "react"
import { useState } from "react"
import { ProductsStats } from "./ProductsStats"
import { mdiPackageVariant } from "@mdi/js"
import Icon from "@mdi/react"
import ProductsTable from "./ProductsTable"
import { Breadcrumb, BreadcrumbSeparator, BreadcrumbLink, BreadcrumbItem, BreadcrumbList } from "../ui/breadcrumb"

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
    <div className="p-4 bg-[#E3E6E6]">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="text-main-dark-blue/80 hover:text-main-dark-blue uppercase">
              Trang chủ
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-main-dark-blue/80" />
          <BreadcrumbItem>
            <BreadcrumbLink className="text-main-dark-blue/80 font-semibold uppercase">
              Các sản phẩm
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
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

