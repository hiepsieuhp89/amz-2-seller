import React from "react"
import { Table, Input, Select, Card } from "antd"
import type { TableProps } from "antd"
import { SearchOutlined } from "@ant-design/icons"

const { Option } = Select

interface Review {
  key: string
  id: number
  product: string
  customer: string
  rating: number
  comment: string
  published: boolean
}

interface ReviewsTableProps {
  data: Review[]
  onFilterChange: (value: string) => void
  onSearch: (value: string) => void
}

const ReviewsTable: React.FC<ReviewsTableProps> = ({ data, onFilterChange, onSearch }) => {
  const columns: TableProps<Review>["columns"] = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Sản phẩm",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "Khách hàng",
      dataIndex: "customer",
      key: "customer",
      responsive: ["lg"],
    },
    {
      title: "Xếp hạng",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => {
        return (
          <div className="flex">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <span key={index} className={`text-lg ${index < rating ? "text-yellow-500" : "text-gray-300"}`}>
                  ★
                </span>
              ))}
          </div>
        )
      },
    },
    {
      title: "Bình luận",
      dataIndex: "comment",
      key: "comment",
      responsive: ["lg"],
    },
    {
      title: "Được phát hành",
      dataIndex: "published",
      key: "published",
      responsive: ["lg"],
      render: (published) => (published ? "Có" : "Không"),
    },
  ]

  return (
    <Card className="shadow-sm rounded-lg">
      <div className="mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h5 className="text-lg font-medium">Đánh giá sản phẩm</h5>
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <Input
            placeholder="Tìm kiếm sản phẩm hoặc khách hàng"
            prefix={<SearchOutlined />}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full sm:w-64"
          />
          <Select
            placeholder="Lọc theo đánh giá"
            style={{ width: 180 }}
            onChange={onFilterChange}
            allowClear
          >
            <Option value="5">5 Sao</Option>
            <Option value="4">4 Sao</Option>
            <Option value="3">3 Sao</Option>
            <Option value="2">2 Sao</Option>
            <Option value="1">1 Sao</Option>
          </Select>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="key"
        scroll={{ x: 'max-content' }}
        locale={{
          emptyText: "Không kết quả",
        }}
        pagination={{
          position: ["bottomRight"],
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50"],
        }}
      />
    </Card>
  )
}

export default ReviewsTable 