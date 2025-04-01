import type React from "react"
import { Table, Badge, Card } from "antd"
import type { ColumnsType } from "antd/es/table"
import { OrderHistory, WalletHistory, WithdrawRequest } from "../types"

interface TransactionTablesProps {
  withdrawRequests: WithdrawRequest[]
  walletHistory: WalletHistory[]
  orderHistory: OrderHistory[]
}

const TransactionTables = ({
  withdrawRequests,
  walletHistory,
  orderHistory,
}: TransactionTablesProps) => {
  const withdrawColumns: ColumnsType<WithdrawRequest> = [
    { title: "Ngày", dataIndex: "date" },
    { title: "ID", dataIndex: "id" },
    { title: "Số tiền", dataIndex: "amount" },
    { title: "Trạng thái", dataIndex: "status" },
    { title: "Thông điệp", dataIndex: "message" },
  ]

  const walletColumns: ColumnsType<WalletHistory> = [
    { title: "Ngày", dataIndex: "date" },
    { title: "ID", dataIndex: "id" },
    { 
      title: "Số tiền", 
      dataIndex: "amount",
      render: (text, record) => (
        <span className={record.type === "debit" ? "text-red-500" : "text-green-500"}>
          {record.type === "debit" ? "-" : "+"} {text}
        </span>
      )
    },
    { title: "Trước GD", dataIndex: "beforeBalance" },
    { title: "Sau GD", dataIndex: "afterBalance" },
    { title: "Thông điệp", dataIndex: "message" },
  ]

  const orderColumns: ColumnsType<OrderHistory> = [
    { title: "Ngày", dataIndex: "date" },
    { title: "ID", dataIndex: "id" },
    { title: "Mã đặt hàng", dataIndex: "orderCode" },
    { 
      title: "Tình trạng đặt hàng", 
      dataIndex: "status",
      render: (status) => (
        <Badge 
          count={
            <div className="bg-blue-100 text-blue-600 px-2 py-1 rounded">
              {status === "pending" ? "Đang chờ xử lý" : status}
            </div>
          }
        />
      )
    },
    { title: "Số tiền", dataIndex: "amount" },
  ]

  return (
    <>
      {/* <div title="Lịch sử yêu cầu rút tiền" className="!mb-4 rounded-[4px]">
        <Table 
          columns={withdrawColumns} 
          dataSource={withdrawRequests} 
          pagination={false}
          scroll={{ x: true }}
          bordered={true}
        />
      </div> */}

      <div title="Biến Động Số Dư Ví" className="!mb-4 rounded-[4px]">
        <Table 
          columns={walletColumns} 
          dataSource={walletHistory} 
          pagination={false}
          scroll={{ x: true }}
          bordered={true}
        />
      </div>

      <div title="Lịch sử giao dịch đơn hàng" className="!mb-4 rounded-[4px]">
        <Table 
          columns={orderColumns} 
          dataSource={orderHistory} 
          pagination={false}
          scroll={{ x: true }}
          bordered={true}
        />
      </div>
    </>
  )
}

export default TransactionTables 