"use client"

import { useGetMyOrders } from "@/hooks/shop-products"
import { SearchOutlined } from "@ant-design/icons"
import { mdiContentSaveEdit, mdiEye, mdiTrashCan } from "@mdi/js"
import Icon from "@mdi/react"
import { Badge, Card, Col, Divider, Empty, Input, Row, Space, Spin, Table, Tooltip, Typography, Pagination } from "antd"
import type { ColumnsType } from "antd/es/table"
import { useState, useMemo } from "react"
import OrderDetailDialog from "../OrderDetailDialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const { Title } = Typography

interface OrderData {
    key: string
    time: string
    orderCode: string
    totalAmount: string
    status: string
    delayStatus: string
    paymentStatus: string
    itemsCount: number
    userId: string
    quantity: number
}

const OrdersTable = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [statusFilter, setStatusFilter] = useState<string | undefined>()
    const [searchText, setSearchText] = useState<string>("")
    const [excludeFutureOrders, setExcludeFutureOrders] = useState(true)
    
    // Memoize the current date to prevent it from changing on every render
    const currentDateISO = useMemo(() => new Date().toISOString(), []);
    
    const { data: ordersData, isLoading } = useGetMyOrders({
        order: "DESC",
        page: currentPage,
        status: statusFilter,
        search: searchText,
        orderTimeLte: currentDateISO
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

    const handleStatusChange = (value: string) => {
        setStatusFilter(value);
        setCurrentPage(1);
    };

    const handleExcludeFutureOrders = (checked: boolean) => {
        setExcludeFutureOrders(checked);
        setCurrentPage(1);
    };

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
            width: 80,
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
            title: "Số sản phẩm",
            dataIndex: "itemsCount",
            key: "itemsCount",
            width: 80,
            sorter: (a, b) => a.itemsCount - b.itemsCount,
        },
        {
            title: "Hành động",
            key: "action",
            width: 110,
            render: (_, record) => (
                <div className="flex items-center justify-center gap-6">
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
                </div>
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
                    <Space size="small" style={{ width: '100%', display: "flex", justifyContent: "flex-end" }}>
                        <Input
                            placeholder="Nhập mã đơn hàng"
                            prefix={<SearchOutlined style={{ color: "#636363" }} />}
                            style={{ width: '100%', maxWidth: 250, borderRadius: "6px" }}
                            allowClear
                            onChange={(e: any) => setSearchText(e.target.value)}
                            value={searchText}
                        />
                        <Select onValueChange={handleStatusChange} value={statusFilter}>
                            <SelectTrigger className="w-[180px] h-10 rounded-sm">
                                <SelectValue placeholder="Lọc trạng thái" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="PENDING">Đang chờ xử lý</SelectItem>
                                <SelectItem value="CONFIRMED">Đã xác nhận</SelectItem>
                                <SelectItem value="SHIPPING">Đang giao hàng</SelectItem>
                                <SelectItem value="DELIVERED">Đã giao hàng</SelectItem>
                                <SelectItem value="CANCELLED">Đã huỷ</SelectItem>
                            </SelectContent>
                        </Select>
                        {/* <Tooltip title="Loại bỏ các đơn đặt hẹn giờ trong tương lai">
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={excludeFutureOrders}
                                    onChange={(e) => handleExcludeFutureOrders(e.target.checked)}
                                    id="exclude-future-orders"
                                />
                                <label htmlFor="exclude-future-orders" className="cursor-pointer text-sm">
                                    Chỉ hiện đơn từ hiện tại trở về trước
                                </label>
                            </div>
                        </Tooltip> */}
                    </Space>
                </Col>
            </Row>

            <Divider style={{ margin: "0 0 16px 0" }} />

            <Table
                columns={columns}
                dataSource={Array.isArray(ordersData?.data?.data) ? ordersData.data.data.map((order: any) => ({
                    key: order.id,
                    time: new Date(order.createdAt).toLocaleString(),
                    orderCode: order.id,
                    totalAmount: order.totalAmount,
                    status: order.status,
                    delayStatus: order.delayStatus,
                    paymentStatus: order.paymentStatus || 'UNPAID',
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
                locale={{
                    emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Chưa có đơn hàng" />
                }}
                loading={isLoading}
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

