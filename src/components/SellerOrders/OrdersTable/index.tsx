"use client"

import type React from "react"
import { useState } from "react"
import { Table, Badge, Button, Tooltip, Input, Select, Card, Row, Col, Typography, Spin, Empty } from "antd"
import { EyeOutlined, DownloadOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons"
import type { ColumnsType } from "antd/es/table"
import { useGetMyOrders } from "@/hooks/shop-products"

const { Option } = Select

interface OrderData {
    key: string
    time: string
    orderCode: string
    totalAmount: string
    status: string
    delayStatus: string
    email: string
    address: string
    itemsCount: number
    paymentStatus: string
    userId: string
    quantity: number
}

const OrdersTable  = () => {
    const { data: ordersData, isLoading } = useGetMyOrders({
        order: "DESC",
        page: 1
    })
    const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([])

    if (isLoading) {
        return <Spin size="large" className="flex justify-center items-center h-screen" />
    }

    if (!ordersData || !ordersData.data || ordersData.data.data?.length === 0) {
        return <Empty description="Không có đơn hàng nào" className="flex justify-center items-center h-96" />
    }

    const columns: ColumnsType<OrderData> = [
        {
            title: "Thời gian",
            dataIndex: "time",
            key: "time",
            width: '15%',
        },
        {
            title: "Mã đặt hàng",
            dataIndex: "orderCode",
            key: "orderCode",
            width: '15%',
        },
        {
            title: "Tổng tiền",
            dataIndex: "totalAmount",
            key: "totalAmount",
            width: '10%',
            render: (text) => `$${text}`,
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            width: '15%',
            render: (status) => (
                <Badge
                    status={status === 'PENDING' ? 'warning' : 'success'}
                    text={status === 'PENDING' ? 'Đang chờ xử lý' : 'Đã xử lý'}
                />
            ),
        },
        {
            title: "Email khách hàng",
            dataIndex: "email",
            key: "email",
            width: '20%',
        },
        {
            title: "Số sản phẩm",
            dataIndex: "itemsCount",
            key: "itemsCount",
            width: '10%',
        },
        {
            title: "Tùy chọn",
            key: "action",
            width: '15%',
            render: () => (
                <div className="flex gap-2 justify-center">
                    <Button type="primary" shape="circle" icon={<EyeOutlined />} className="text-blue-500" />
                    <Button type="primary" shape="circle" icon={<DownloadOutlined />} className="text-yellow-500" />
                </div>
            ),
        },
    ];

    return (
        <div className="bg-white rounded-[4px] border">
            <div className="px-6 py-3 flex justify-between items-center">
                <div className="font-medium text-base">Đơn hàng</div>
                <div className="flex gap-2">
                    <Select 
                        placeholder="Lọc theo trạng thái phân phối" 
                        style={{ width: 250, borderRadius: 0 }} 
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
                    />
                </div>
            </div>
            
            <Table
                columns={columns}
                dataSource={ordersData.data.data?.map(order => ({
                    key: order.id,
                    time: new Date(order.createdAt).toLocaleString(),
                    orderCode: order.id,
                    totalAmount: order.totalAmount,
                    status: order.status,
                    delayStatus: order.delayStatus,
                    email: order.email,
                    address: order.address,
                    itemsCount: order.items.length,
                    paymentStatus: order.isFedexPaid ? 'Đã thanh toán' : 'Chưa thanh toán',
                    userId: order.userId,
                    quantity: order.items.reduce((acc, item) => acc + item.quantity, 0)
                }))}
                pagination={false}
                rowKey="key"
                className="border-t"
                expandable={{
                    expandedRowKeys,
                    expandIcon: () => null,
                    expandedRowRender: (record) => (
                        <div className="p-4 bg-gray-50">
                            <p>
                                <strong>Khách hàng:</strong> {record.userId}
                            </p>
                            <p>
                                <strong>Số sản phẩm:</strong> {record.quantity}
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

