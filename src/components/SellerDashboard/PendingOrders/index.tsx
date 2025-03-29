import type React from "react"
import { Card, Table, Button, Tag } from "antd"
import type { ColumnsType } from "antd/es/table"
import type { OrderData } from "../types"
import { EyeOutlined, CopyOutlined, CheckOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import { getMyOrders } from "@/api/shop-products"

interface PendingOrdersProps {
  // data: OrderData[] // Remove this prop since we'll fetch data internally
}

const PendingOrders: React.FC<PendingOrdersProps> = () => {
  const [data, setData] = useState<OrderData[]>([])
  const [loading, setLoading] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  useEffect(() => {
    const fetchPendingOrders = async () => {
      setLoading(true)
      try {
        const response = await getMyOrders({ status: "PENDING" })
        setData(response.data.data as any || []) // Update to access response.data.data
      } catch (error) {
        console.error("Failed to fetch pending orders:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPendingOrders()
  }, [])

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(text)
    setTimeout(() => setCopiedId(null), 3000)
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
    <Card title="Đơn hàng đang chờ xử lý">
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={false}
        size="middle"
        loading={loading}
      />
    </Card>
  )
}

export default PendingOrders

