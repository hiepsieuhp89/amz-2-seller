import type React from "react"
import { Table, Button, Tag, Tooltip } from "antd"
import type { ColumnsType } from "antd/es/table"
import { CopyOutlined, CheckOutlined, ClockCircleOutlined } from "@ant-design/icons"
import { useState } from "react"
import { useGetMyOrders } from "@/hooks/shop-products"
import dayjs from "dayjs"

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

  const columns: ColumnsType<any> = [
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
      render: (text, record) => (
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <span>{text}</span>
            <Button
              type="text"
              icon={copiedId === text ? <CheckOutlined /> : <CopyOutlined />}
              onClick={() => handleCopy(text)}
            />
          </div>
          <div className="text-gray-500 text-sm">
            {record?.user?.email}
          </div>
          {record?.user?.phone && (
            <div className="text-gray-500 text-sm">
              {record?.user?.phone}
            </div>
          )}
        </div>
      )
    },
    {
      title: "Thời gian",
      dataIndex: "orderTime",
      key: "orderTime",
      className: "text-center",
      render: (value, record) => (
        <div className="flex flex-col items-center">
          <span>{value ? dayjs(value).format("DD/MM/YYYY HH:mm") : "N/A"}</span>
          <Tooltip title="Thời gian chờ xử lý">
            <Tag icon={<ClockCircleOutlined />} color="warning">
              {record?.delayStatus}
            </Tag>
          </Tooltip>
        </div>
      )
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalAmount",
      key: "totalAmount",
      className: "text-center",
      render: (value, record) => (
        <div className="flex flex-col items-center">
          <span className="font-medium">${Number(value).toFixed(2)}</span>
          <span className="text-green-600 text-sm">
            Lợi nhuận: ${Number(record?.totalProfit).toFixed(2)}
          </span>
        </div>
      )
    },
    {
      title: "Trạng thái",
      key: "status",
      className: "text-center",
      render: (_, record) => (
        <div className="flex flex-col items-center gap-1">
          <Tag color={record?.status === "PENDING" ? "orange" : "green"}>
              {record?.status}
          </Tag>
          <Tag color={record?.paymentStatus === "PENDING" ? "orange" : "green"}>
            {record?.paymentStatus}
          </Tag>
        </div>
      )
    }
  ]

  return (
    <div className="rounded-xl bg-white p-4">
      <h5 className="text-lg font-medium mb-4">Thông tin đơn hàng</h5>
      <Table
        columns={columns as any}
        dataSource={Array.isArray(data?.data?.data) ? data.data.data : []}
        rowKey="id"
        pagination={false}
        size="middle"
        loading={isLoading}
        bordered
      />
    </div>
  )
}

export default PendingOrders

