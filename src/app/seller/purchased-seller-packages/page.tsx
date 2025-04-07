"use client"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { usePackageHistory } from "@/hooks/authentication"
import { Table, Tag } from "antd"
import React from "react"
import { format } from 'date-fns'

export default function PurchasedSellerPackages() {
  const { packageHistoryData, isLoading, isFetching, refetch } = usePackageHistory()  
  const dataSource = Array.isArray(packageHistoryData?.data?.data)
    ? packageHistoryData.data.data.map((item: any, index: number) => ({
        key: item.id || index,
        packageName: item.package.name,
        price: item.amountPaid === 0 ? 'Miễn phí' : `$${item.amountPaid}`,
        status: item.status,
        expiryDate: item.expiryDate ? format(new Date(item.expiryDate), 'dd/MM/yyyy') : 'N/A',
        purchaseDate: item.createdAt ? format(new Date(item.createdAt), 'dd/MM/yyyy HH:mm') : 'N/A',
      }))
    : [];

  const columns = [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
      render: (text: string, record: any, index: number) => index + 1,
    },
    {
      title: 'Tên gói',
      dataIndex: 'packageName',
      key: 'packageName',
    },
    {
      title: 'Số tiền đã trả',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'volcano'}>
          {status === 'active' ? 'Đang hoạt động' : status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Ngày hết hạn',
      dataIndex: 'expiryDate',
      key: 'expiryDate',
    },
    {
      title: 'Ngày mua',
      dataIndex: 'purchaseDate',
      key: 'purchaseDate',
    },
  ]

  return (
    <div className="min-h-screen p-4 bg-[#E3E6E6]">
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
              Các gói đã mua
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Các gói đã mua</h2>
        <Table 
          dataSource={dataSource} 
          columns={columns} 
          pagination={false}
          bordered
          loading={isLoading || isFetching}
          scroll={{x: 1000}}
        />
      </div>
    </div>
  )
}   
