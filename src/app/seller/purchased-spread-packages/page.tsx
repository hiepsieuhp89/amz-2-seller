"use client"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { useSpreadPackageHistory } from "@/hooks/authentication"
import { Table, Tag } from "antd"
import React from "react"
import { format } from 'date-fns'

export default function PurchasedSpreadPackages() {
  const { spreadPackageHistoryData, isLoading, isFetching, refetch } = useSpreadPackageHistory()
  
  const dataSource = Array.isArray(spreadPackageHistoryData?.data?.data)
    ? spreadPackageHistoryData.data.data.map((item: any, index: number) => ({
        key: item.id || index,
        packageName: item.spreadPackage?.name || 'N/A',
        price: item.amountPaid === 0 ? 'Miễn phí' : `$${item.amountPaid}`,
        paymentMethod: item.paymentMethod || 'N/A',
        status: item.status || 'N/A',
        expiryDate: item.expiryDate ? format(new Date(item.expiryDate), 'dd/MM/yyyy') : 'N/A',
        purchaseDate: item.createdAt ? format(new Date(item.createdAt), 'dd/MM/yyyy HH:mm') : 'N/A',
      }))
    : [];

  const columns = [
    {
      title: '#',
      key: 'index',
      render: (text: string, record: any, index: number) => index + 1,
    },
    {
      title: 'Tên gói',
      dataIndex: 'packageName',
      key: 'packageName',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Hình thức thanh toán',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = 'default';
        let text = status.toUpperCase();
        if (status === 'active' || status === 'completed') {
            color = 'green';
            text = status === 'active' ? 'Đang hoạt động' : 'Hoàn thành';
        } else if (status === 'pending') {
            color = 'orange';
            text = 'Đang chờ';
        } else if (status === 'failed' || status === 'expired') {
            color = 'volcano';
            text = status === 'failed' ? 'Thất bại' : 'Hết hạn';
        }
        return <Tag color={color}>{text}</Tag>;
      }
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
              Các gói tiếp thị đã mua
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Các gói tiếp thị đã mua</h2>
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