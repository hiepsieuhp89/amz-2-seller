import type React from "react"
import { Card, Table } from "antd"
import type { ColumnsType } from "antd/es/table"
import type { ProductData } from "../types"

interface BestSellingProductsProps {
  data: ProductData[]
}

const BestSellingProducts = ({ data }: BestSellingProductsProps) => {
  const columns: ColumnsType<ProductData> = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      width: 60,
      className: "text-center",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
    },
    {
      title: "Lượt bán",
      dataIndex: "sales",
      key: "sales",
      width: 100,
    },
  ]

  const expandedRowRender = (record: ProductData) => {
    return (
      <p className="m-0">
        <strong>Giá bán:</strong> ${record.price}
      </p>
    )
  }

  return (
    <Card style={{ borderRadius: "15px" }} bodyStyle={{ padding: "20px" }}>
      <h5 className="text-lg font-medium mb-4">Sản phẩm bán chạy nhất</h5>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={false}
        expandable={{
          expandedRowRender,
          defaultExpandedRowKeys: ["1"],
        }}
        size="middle"
      />
    </Card>
  )
}

export default BestSellingProducts

