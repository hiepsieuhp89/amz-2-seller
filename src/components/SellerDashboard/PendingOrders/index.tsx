import type React from "react"
import { Card, Table, Button } from "antd"
import type { ColumnsType } from "antd/es/table"
import type { OrderData } from "../types"
import { EyeOutlined } from "@ant-design/icons"

interface PendingOrdersProps {
  data: OrderData[]
}

const PendingOrders: React.FC<PendingOrdersProps> = ({ data }) => {
  const columns: ColumnsType<OrderData> = [
    {
      title: "Mã đặt hàng:",
      dataIndex: "orderCode",
      key: "orderCode",
      className: "text-center",
    },
    {
      title: "Lợi nhuận",
      dataIndex: "profit",
      key: "profit",
      render: (text) => <span className="text-red-500 font-semibold">${text}</span>,
    },
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
    <Card style={{ borderRadius: "15px" }} bodyStyle={{ padding: "20px" }}>
      <h5 className="text-lg font-medium mb-4">Đơn hàng chờ xác nhận</h5>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={false}
        expandable={{
          expandedRowRender,
        }}
        size="middle"
      />
      <div className="flex justify-center mt-4">
        <Button 
        className="!rounded-[4px]"
        type="primary" block>
          Xem tất cả
        </Button>
      </div>
    </Card>
  )
}

export default PendingOrders

