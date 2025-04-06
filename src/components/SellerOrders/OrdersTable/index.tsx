"use client"

import { useGetMyOrders } from "@/hooks/shop-products"
import { SearchOutlined } from "@ant-design/icons"
import { mdiContentSaveEdit, mdiEye, mdiTrashCan } from "@mdi/js"
import Icon from "@mdi/react"
import { Badge, Card, Col, Divider, Empty, Input, Row, Select, Space, Spin, Table, Tooltip, Typography, Pagination } from "antd"
import type { ColumnsType } from "antd/es/table"
import { useState } from "react"
import { Option } from "antd/lib/mentions"
import OrderDetailDialog from "../OrderDetailDialog"
import type { IOrderDetailsResponse } from "@/interface/response/shop-products"
const { Title } = Typography

interface OrderData {
    key: string
    time: string
    orderCode: string
    totalAmount: string
    status: string
    delayStatus: string
    paymentStatus: string
    email: string
    address: string
    itemsCount: number
    userId: string
    quantity: number
}

const OrdersTable = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const { data: ordersData, isLoading } = useGetMyOrders({
        order: "DESC",
        page: currentPage
    })
    const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([])
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)
    const [isDetailOpen, setIsDetailOpen] = useState(false)

    const handlePaginationChange = (page: number, pageSize?: number) => {
        setCurrentPage(page)
        if (pageSize) setPageSize(pageSize)
    }

    const handleOpenDetail = (orderId: string) => {
        setSelectedOrderId(orderId)
        setIsDetailOpen(true)
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[50vh]">
                <Spin size="small" />
            </div>
        )
    }

    if (!ordersData || !ordersData.data || ordersData.data.data?.length === 0) {
        return (
            <div className="flex justify-center items-center h-60 flex-1 max-h-screen bg-white rounded-md border">
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="Chưa có đơn hàng"
                />
            </div>
        )
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
            width: 110,
            render: (text) => `$${text}`,
            sorter: (a, b) => parseFloat(a.totalAmount) - parseFloat(b.totalAmount),
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            width: 110,
            render: (status) => {
                const statusMap: Record<string, { text: string, status: 'default' | 'success' | 'warning' | 'error' }> = {
                    'PENDING': { text: 'Đang chờ xử lý', status: 'warning' },
                    'CONFIRMED': { text: 'Đã xác nhận', status: 'default' },
                    'SHIPPING': { text: 'Đang giao hàng', status: 'default' },
                    'DELIVERED': { text: 'Đã giao hàng', status: 'success' },
                    'CANCELLED': { text: 'Đã hủy', status: 'error' }
                }
                const statusInfo = statusMap[status] || { text: status, status: 'default' }
                return <Badge status={statusInfo.status} text={statusInfo.text} />
            },
            sorter: (a, b) => a.status.localeCompare(b.status),
        },
        {
            title: "Thanh toán",
            dataIndex: "paymentStatus",
            key: "paymentStatus",
            width: 110,
            render: (paymentStatus) => {
                return <Badge 
                    status={paymentStatus === 'PAID' ? 'success' : 'warning'} 
                    text={paymentStatus === 'PAID' ? 'Đã thanh toán' : 'Chưa thanh toán'} 
                />
            },
            sorter: (a, b) => a.paymentStatus.localeCompare(b.paymentStatus),
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
            width: 110,
            sorter: (a, b) => a.itemsCount - b.itemsCount,
        },
        {
            title: "Hành động",
            key: "action",
            width: 110,
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip title="Xem chi tiết">
                        <span 
                            onClick={() => handleOpenDetail(record.orderCode)}
                            style={{ cursor: 'pointer', display: 'inline-flex' }}
                        >
                            <Icon
                                path={mdiEye}
                                size={0.7}
                                color={"#A3A3A3"}
                            />
                        </span>
                    </Tooltip>
                    <Tooltip title="In đơn hàng">
                        <Icon
                            path={mdiContentSaveEdit}
                            size={0.7}
                            color={"#A3A3A3"}
                        />
                    </Tooltip>
                    {/* <Tooltip title="Xóa">
                        <Icon
                            path={mdiTrashCan}
                            size={0.7}
                            color={"#A3A3A3"}
                        />
                    </Tooltip> */}
                </Space>
            ),
        },
    ];

    const totalItems = ordersData?.data?.meta?.itemCount || 0
    return (
        <div className="border p-4 bg-white rounded-md">
            <Row justify="space-between" align="middle" gutter={[12, 12]} style={{ marginBottom: 16 }}>
                <Col xs={24} sm={12}>
                    <Space size="middle">
                        <Title level={5} style={{ margin: 0 }}>
                            Tất cả đơn hàng
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
                            <Option value="PENDING">Đang chờ xử lý</Option>
                            <Option value="CONFIRMED">Đã xác nhận</Option>
                            <Option value="SHIPPING">Đang giao hàng</Option>
                            <Option value="DELIVERED">Đã giao hàng</Option>
                            <Option value="CANCELLED">Đã huỷ</Option>
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
                    paymentStatus: order.paymentStatus || 'UNPAID',
                    email: order.email,
                    address: order.address,
                    itemsCount: order.items.length,
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
                    expandIconColumnIndex: -1,
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
                                <span className={`${record.paymentStatus === 'PAID' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'} px-2 py-1 rounded`}>
                                    {record.paymentStatus === 'PAID' ? 'Đã thanh toán' : 'Chưa thanh toán'}
                                </span>
                            </p>
                        </div>
                    ),
                }}
            />

            <Row justify="space-between" align="middle" style={{ marginTop: 16 }}>
                <Col></Col>
                <Col>
                    <Pagination
                        current={currentPage}
                        pageSize={pageSize}
                        total={totalItems}
                        showSizeChanger
                        showQuickJumper
                        onChange={handlePaginationChange}
                        onShowSizeChange={handlePaginationChange}
                        style={{ marginTop: "16px" }}
                        className="custom-pagination"
                    />
                </Col>
            </Row>
            
            {selectedOrderId && (
                <OrderDetailDialog 
                    orderId={selectedOrderId} 
                    open={isDetailOpen} 
                    onOpenChange={setIsDetailOpen} 
                />
            )}
        </div>
    )
}

export default OrdersTable

