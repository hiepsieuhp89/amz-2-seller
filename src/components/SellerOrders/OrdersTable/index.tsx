"use client"

import { useGetMyOrders } from "@/hooks/shop-products"
import { SearchOutlined, DownOutlined } from "@ant-design/icons"
import { mdiContentSaveEdit, mdiEye, mdiTrashCan } from "@mdi/js"
import Icon from "@mdi/react"
import { Badge, Card, Col, Divider, Empty, Input, Row, Space, Spin, Table, Tooltip, Typography, Pagination, Button } from "antd"
import type { ColumnsType } from "antd/es/table"
import { useState, useMemo, useEffect } from "react"
import OrderDetailDialog from "../OrderDetailDialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { formatNumber } from "@/utils"
import { useMediaQuery } from "@/hooks/use-media-query"

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
    confirmedAt: string | null
    profit: string | null
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
    
    // Check if screen is mobile
    const isMobile = useMediaQuery('(max-width: 768px)')

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

    const handleExpandRow = (expanded: boolean, record: OrderData) => {
        setExpandedRowKeys(expanded ? [record.key] : []);
    };

    const columns: ColumnsType<OrderData> = [
        {
            title: "Ngày đặt hàng",
            dataIndex: "time",
            key: "time",
            width: '15%',
            sorter: (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime(),
            responsive: ['md']
        },
        {
            title: "Mã đặt hàng",
            dataIndex: "orderCode",
            key: "orderCode",
            width: '15%',
            sorter: (a, b) => a.orderCode.localeCompare(b.orderCode),
            render: (text, record) => (
                <div className="flex items-center">
                    {isMobile && (
                        <Button
                            type="text"
                            icon={<DownOutlined />}
                            onClick={(e) => {
                                e.stopPropagation();
                                const isExpanded = expandedRowKeys.includes(record.key);
                                handleExpandRow(!isExpanded, record);
                            }}
                            className={expandedRowKeys.includes(record.key) ? 'rotate-180 mr-2' : 'mr-2'}
                            style={{ transition: 'transform 0.3s' }}
                        />
                    )}
                    <span>{text}</span>
                </div>
            )
        },
        {
            title: "Số sản phẩm",
            dataIndex: "itemsCount",
            key: "itemsCount",
            width: 80,
            sorter: (a, b) => a.itemsCount - b.itemsCount,
        },
        {
            title: "Khách hàng",
            dataIndex: "userId",
            key: "userId",
            width: 120,
            sorter: (a, b) => a.userId.localeCompare(b.userId),
        },
        {
            title: "Tổng tiền",
            dataIndex: "totalAmount",
            key: "totalAmount",
            width: 80,
            render: (text) => `$${formatNumber(parseFloat(text))}`,
            sorter: (a, b) => parseFloat(a.totalAmount) - parseFloat(b.totalAmount),
        },
        {
            title: "Lợi nhuận",
            dataIndex: "profit",
            key: "profit",
            width: 80,
            render: (text) => text ? `$${formatNumber(parseFloat(text))}` : "-",
            sorter: (a, b) => {
                const profitA = a.profit ? parseFloat(a.profit) : 0;
                const profitB = b.profit ? parseFloat(b.profit) : 0;
                return profitA - profitB;
            },
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            width: 110,
            render: (status) => {
                const statusMap: Record<string, { text: string, shortText: string, status: 'default' | 'success' | 'warning' | 'error' }> = {
                    'PENDING': { text: 'Đang chờ xử lý', shortText: 'Chờ xử lý', status: 'warning' },
                    'CONFIRMED': { text: 'Đã xác nhận', shortText: 'Xác nhận', status: 'default' },
                    'SHIPPING': { text: 'Đang giao hàng', shortText: 'Đang giao', status: 'default' },
                    'DELIVERED': { text: 'Đã giao hàng', shortText: 'Đã giao', status: 'success' },
                    'CANCELLED': { text: 'Đã hủy', shortText: 'Hủy', status: 'error' }
                }
                const statusInfo = statusMap[status] || { text: status, shortText: status, status: 'default' }
                return <Badge 
                    status={statusInfo.status} 
                    text={isMobile ? statusInfo.shortText : statusInfo.text} 
                />
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
                    text={paymentStatus === 'PAID' ? (isMobile ? 'Đã TT' : 'Đã thanh toán') : (isMobile ? 'Chưa TT' : 'Chưa thanh toán')} 
                />
            },
            sorter: (a, b) => a.paymentStatus.localeCompare(b.paymentStatus),
        },
        {
            title: "Ngày thanh toán",
            dataIndex: "confirmedAt",
            key: "confirmedAt",
            width: 120,
            render: (confirmedAt) => confirmedAt ? new Date(confirmedAt).toLocaleString() : "-",
            sorter: (a, b) => {
                if (!a.confirmedAt) return 1;
                if (!b.confirmedAt) return -1;
                return new Date(a.confirmedAt).getTime() - new Date(b.confirmedAt).getTime();
            },
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

    // Display visible columns based on screen size
    const getVisibleColumns = () => {
        if (isMobile) {
            // For mobile, only show these essential columns
            return columns.filter(col => 
                ['orderCode', 'totalAmount', 'status', 'action'].includes(col.key as string)
            );
        }
        return columns;
    };

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
                    </Space>
                </Col>
            </Row>

            <Divider style={{ margin: "0 0 16px 0" }} />

            <Table
                columns={getVisibleColumns()}
                dataSource={Array.isArray(ordersData?.data?.data) ? ordersData.data.data.map((order: any) => ({
                    key: order.id,
                    time: new Date(order.orderTime).toLocaleString(),
                    orderCode: order.id,
                    totalAmount: order.totalAmount,
                    status: order.status,
                    delayStatus: order.delayStatus,
                    paymentStatus: order.paymentStatus || 'UNPAID',
                    itemsCount: order.items.length,
                    userId: order.userId,
                    quantity: order.items.reduce((acc: number, item: any) => acc + item.quantity, 0),
                    confirmedAt: order.confirmedAt,
                    profit: order.profit || null
                })) : []}
                pagination={false}
                rowKey="key"
                scroll={{ x: 'max-content' }}
                size={isMobile ? "small" : "middle"}
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
                    onExpand: handleExpandRow,
                    expandIcon: () => null, // We control expansion with our custom button
                    expandIconColumnIndex: -1,
                    expandedRowRender: (record: any) => (
                        <div className="p-4 bg-gray-50">
                            {isMobile && (
                                <>
                                    <p><strong>Thời gian:</strong> {record.time}</p>
                                    <p><strong>Số sản phẩm:</strong> {record.itemsCount}</p>
                                </>
                            )}
                            <p><strong>Khách hàng:</strong> {record.userId}</p>
                            <p><strong>Số lượng:</strong> {record.quantity}</p>
                            {isMobile && (
                                <>
                                    <p>
                                        <strong>Thanh toán:</strong>{" "}
                                        <span className={`${record.paymentStatus === 'PAID' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'} px-2 py-1 rounded`}>
                                            {record.paymentStatus === 'PAID' ? 'Đã TT' : 'Chưa TT'}
                                        </span>
                                    </p>
                                    {record.confirmedAt && <p><strong>Ngày TT:</strong> {new Date(record.confirmedAt).toLocaleString()}</p>}
                                </>
                            )}
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
                        showQuickJumper={!isMobile}
                        onChange={handlePaginationChange}
                        onShowSizeChange={handlePaginationChange}
                        style={{ marginTop: "16px" }}
                        className="custom-pagination"
                        size={isMobile ? "small" : "default"}
                        simple={isMobile}
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

