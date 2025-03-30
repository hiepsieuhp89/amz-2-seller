"use client"

import { useGetMyOrders } from "@/hooks/shop-products"
import { SearchOutlined } from "@ant-design/icons"
import { mdiContentSaveEdit, mdiEye, mdiTrashCan } from "@mdi/js"
import Icon from "@mdi/react"
import { Badge, Card, Col, Divider, Empty, Input, Row, Select, Space, Spin, Table, Tooltip, Typography } from "antd"
import type { ColumnsType } from "antd/es/table"
import { useState } from "react"
import { Option } from "antd/lib/mentions"
const { Title } = Typography

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
        return (
            <div className="flex justify-center items-center h-[50vh]">
                <Spin size="small" />
            </div>
        )
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
            sorter: (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime(),
        },
        {
            title: "Mã đặt hàng",
            dataIndex: "orderCode",
            key: "orderCode",
            width: '15%',
            sorter: (a, b) => a.orderCode.localeCompare(b.orderCode),
        },
        {
            title: "Tổng tiền",
            dataIndex: "totalAmount",
            key: "totalAmount",
            width: '10%',
            render: (text) => `$${text}`,
            sorter: (a, b) => parseFloat(a.totalAmount) - parseFloat(b.totalAmount),
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
            sorter: (a, b) => a.status.localeCompare(b.status),
        },
        {
            title: "Email khách hàng",
            dataIndex: "email",
            key: "email",
            width: '20%',
            sorter: (a, b) => a.email.localeCompare(b.email),
        },
        {
            title: "Số sản phẩm",
            dataIndex: "itemsCount",
            key: "itemsCount",
            width: '10%',
            sorter: (a, b) => a.itemsCount - b.itemsCount,
        },
        {
            title: "Hành động",
            key: "action",
            width: '15%',
            render: () => (
                <Space size="middle">
                <Tooltip title="Xem chi tiết">
                  <Icon
                    path={mdiEye} 
                    size={0.7} 
                    color={"#A3A3A3"}
                   
                  />
                </Tooltip>
                <Tooltip title="Chỉnh sửa">
                  <Icon 
                    path={mdiContentSaveEdit} 
                    size={0.7} 
                    color={"#A3A3A3"}
                  />
                </Tooltip>
                <Tooltip title="Xóa">
                  <Icon 
                    path={mdiTrashCan} 
                    size={0.7} 
                    color={"#A3A3A3"}
                  />
                </Tooltip>
              </Space>
            ),
        },
    ];

    return (
        <div className="orders-table-card border p-4">
            <Row justify="space-between" align="middle" gutter={[12, 12]} style={{ marginBottom: 16 }}>
                <Col xs={24} sm={12}>
                    <Space size="middle">
                        <Title level={5} style={{ margin: 0 }}>
                            Đơn hàng
                        </Title>
                        <Badge 
                            size='default'
                            count={ordersData?.data?.data?.length || 0} 
                            showZero 
                            style={{ backgroundColor: "#1890ff" }} 
                        />
                    </Space>
                </Col>
                <Col xs={24} sm={12}>
                    <Space size="small" style={{ width: '100%' }}>
                        <Input
                            placeholder="Nhập Mã đơn hàng"
                            prefix={<SearchOutlined style={{ color: "#1890ff" }} />}
                            style={{ width: '100%', maxWidth: 250, borderRadius: "6px" }}
                            allowClear
                        />
                        <Select 
                            placeholder="Lọc trạng thái" 
                            style={{ width: '100%', maxWidth: 250, borderRadius: "6px" }}
                        >
                            <Option value="pending">Đang chờ xử lý</Option>
                            <Option value="confirmed">Đã xác nhận</Option>
                            <Option value="on_the_way">Đang trên đường đi</Option>
                            <Option value="delivered">Đã giao hàng</Option>
                            <Option value="cancelled">Đã huỷ</Option>
                        </Select>
                    </Space>
                </Col>
            </Row>

            <Divider style={{ margin: "0 0 16px 0" }} />

            <Table
                columns={columns}
                dataSource={Array.isArray(ordersData.data.data) ? ordersData.data.data.map((order: any) => ({
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
                    quantity: order.items.reduce((acc: number, item: any) => acc + item.quantity, 0)
                })) : []}
                pagination={false}
                rowKey="key"
                scroll={{ x: true }}
                size="middle"
                rowClassName={() => "order-table-row"}
                style={{
                    overflowX: 'auto',
                    tableLayout: 'auto',
                    width: '100%',
                }}
                bordered
                expandable={{
                    expandedRowKeys,
                    expandIcon: () => null,
                    expandedRowRender: (record: any) => (
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

