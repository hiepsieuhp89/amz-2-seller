import type React from "react"
import { Card, Table, Button, Tag } from "antd"
import type { ColumnsType } from "antd/es/table"
import type { OrderData } from "../types"
import { EyeOutlined, CopyOutlined, CheckOutlined } from "@ant-design/icons"
import {  useState } from "react"
import { useGetMyOrders } from "@/hooks/shop-products"

const PendingOrders = () => {
  const { data, isLoading } = useGetMyOrders({
    status: "PENDING",
  })
  
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(text)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const columns: ColumnsType<OrderData> = [
    {
      title: "Mã đặt hàng",
      dataIndex: "id",
      key: "id",
      className: "text-left",
      render: (text) => (
        <div className="flex items-center justify-between">
          <span>{text}</span>
          <Button
            type="text"
            icon={copiedId === text ? <CheckOutlined /> : <CopyOutlined />}
            onClick={() => handleCopy(text)}
          />
        </div>
      )
    },
    {
      title: "Khách hàng",
      dataIndex: ["user", "fullName"],
      key: "customer",
      className: "text-left",
      render: (text) => (
        <div className="flex items-center justify-between">
          <span>{text}</span>
          <Button
            type="text"
            icon={copiedId === text ? <CheckOutlined /> : <CopyOutlined />}
            onClick={() => handleCopy(text)}
          />
        </div>
      )
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalAmount",
      key: "totalAmount",
      className: "text-center",
      render: (value) => `$${value}`
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      className: "text-center",
      render: (status) => (
        <Tag color={status === "PENDING" ? "orange" : "green"}>
          {status}
        </Tag>
      )
    }
  ]

  const expandedRowRender = (record: OrderData) => {
    return (
      <div>
        <p className="m-0">
          <strong>Khách hàng:</strong> {record.customer}
        </p>
        <p className="m-0">
          <strong>Số tiền:</strong> ${record.amount}
        </p>
        <p className="m-0">
          <a href={record.detailLink} className="text-blue-500">
            <EyeOutlined /> Xem chi tiết
          </a>
        </p>
      </div>
    )
  }

  return (
      <Table
        columns={columns}
        dataSource={Array.isArray(data?.data) ? data.data : []}
        rowKey="id"
        pagination={false}
        size="middle"
        loading={isLoading}
      />
  )
}

export default PendingOrders

