"use client"

import type React from "react"
import { useState } from "react"
import { Table, Badge, Button, Tooltip, Input, Select, Card, Row, Col, Typography } from "antd"
import { EyeOutlined, DownloadOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons"
import type { ColumnsType } from "antd/es/table"

const { Option } = Select

interface OrderData {
    key: string
    time: string
    orderCode: string
    amount: string
    profit: string
    deliveryStatus: string
    isDelayed: boolean
    delayTime: string
    paymentStatus: string
}

interface OrdersTableProps {
    data: OrderData[]
    onFilterChange: (value: string) => void
    onSearch: (value: string) => void
}

const OrdersTable: React.FC<OrdersTableProps> = ({ data, onFilterChange, onSearch }) => {
    const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([])

    const toggleExpand = (key: string) => {
        if (expandedRowKeys.includes(key)) {
            setExpandedRowKeys(expandedRowKeys.filter((k) => k !== key))
        } else {
            setExpandedRowKeys([...expandedRowKeys, key])
        }
    }

    const columns: ColumnsType<OrderData> = [
        {
            title: "Thời gian",
            dataIndex: "time",
            key: "time",
            width: '20%',
        },
        {
            title: "Mã đặt hàng:",
            dataIndex: "orderCode",
            key: "orderCode",
            width: '20%',
        },
        {
            title: "Số tiền",
            dataIndex: "amount",
            key: "amount",
            width: '10%',
        },
        {
            title: "Lợi nhuận",
            dataIndex: "profit",
            key: "profit",
            width: '10%',
            render: (text) => <span className="text-red-500">{text}</span>,
        },
        {
            title: "Tình trạng giao hàng",
            dataIndex: "deliveryStatus",
            key: "deliveryStatus",
            width: '30%',
            render: (_, record) => (
                <div className="flex flex-col">
                    <Badge
                        className="mb-2 self-start"
                        count={
                            <div className="animate-gradient bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 text-gray-600 px-2 py-1 rounded">
                                🕙 Đang chờ xử lý
                            </div>
                        }
                    />
                    {record.isDelayed && (
                        <Badge
                            className="self-start"
                            count={
                                <div className="bg-blue-100 text-blue-600 px-2 py-1 rounded">
                                    ⚠ Đơn hàng chậm: <strong className="mx-1">{record.delayTime}</strong>
                                </div>
                            }
                        />
                    )}
                </div>
            ),
        },
        {
            title: "Tùy chọn",
            key: "action",
            width: '10%',
            render: () => (
                <div className="flex gap-2 justify-center">
                    <Button type="text" icon={<EyeOutlined />} className="text-blue-500" />
                    <Button type="text" icon={<DownloadOutlined />} className="text-yellow-500" />
                </div>
            ),
        },
    ];

    return (
        <div className="bg-white border rounded-[4px]">
            <div className="mb-4 flex justify-between items-center">
                <div className="font-medium text-lg">Đơn hàng</div>
                <div className="flex gap-2">
                    <Select 
                        placeholder="Lọc theo trạng thái phân phối" 
                        style={{ width: 250 }} 
                        onChange={onFilterChange}
                    >
                        <Option value="">Lọc theo trạng thái phân phối</Option>
                        <Option value="pending">Đang chờ xử lý</Option>
                        <Option value="confirmed">Đã xác nhận</Option>
                        <Option value="on_the_way">Đang trên đường đi</Option>
                        <Option value="delivered">Đã giao hàng</Option>
                        <Option value="cancelled">Đã huỷ</Option>
                    </Select>
                    <Input
                        placeholder="Nhập Mã đơn hàng và nhấn Enter"
                        style={{ width: 250 }}
                        onPressEnter={(e) => onSearch((e.target as HTMLInputElement).value)}
                    />
                </div>
            </div>
            
            <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                rowKey="key"
                className="border rounded-md"
                expandable={{
                    expandedRowKeys,
                    expandIcon: () => null,
                    expandedRowRender: (record) => (
                        <div className="p-4 bg-gray-50">
                            <p>
                                <strong>Khách hàng:</strong> Ryan Nash
                            </p>
                            <p>
                                <strong>Số sản phẩm:</strong> 2
                            </p>
                            <p>
                                <strong>Tình trạng thanh toán:</strong>{" "}
                                <span className="bg-green-100 text-green-600 px-2 py-1 rounded">Đã thanh toán</span>
                            </p>
                        </div>
                    ),
                }}
            />
        </div>
    )
}

export default OrdersTable

