"use client"

import type React from "react"
import { useState } from "react"
import { Table, Badge, Button, Tooltip, Input, Select, Card, Row, Col, Typography, Modal, Form, Checkbox } from "antd"
import type { ColumnsType } from "antd/es/table"
import Icon from '@mdi/react';
import { mdiCashClock } from '@mdi/js';
import { Option } from "antd/lib/mentions"
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
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isBulkModalVisible, setIsBulkModalVisible] = useState(false)
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

    const toggleExpand = (key: string) => {
        if (expandedRowKeys.includes(key)) {
            setExpandedRowKeys(expandedRowKeys.filter((k) => k !== key))
        } else {
            setExpandedRowKeys([...expandedRowKeys, key])
        }
    }

    const showModal = () => {
        setIsModalVisible(true)
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }

    const showBulkModal = () => {
        setIsBulkModalVisible(true)
    }

    const handleBulkCancel = () => {
        setIsBulkModalVisible(false)
    }

    const onSelectAllChange = (e: any) => {
        if (e.target.checked) {
            setSelectedRowKeys(data.map(item => item.key))
        } else {
            setSelectedRowKeys([])
        }
    }

    const onSelectChange = (key: string, checked: boolean) => {
        if (checked) {
            setSelectedRowKeys([...selectedRowKeys, key])
        } else {
            setSelectedRowKeys(selectedRowKeys.filter(k => k !== key))
        }
    }

    const columns: ColumnsType<OrderData> = [
        {
            title: (
                <Checkbox
                    onChange={onSelectAllChange}
                    checked={selectedRowKeys.length === data.length}
                />
            ),
            key: 'selection',
            width: '5%',
            render: (_, record) => (
                <Checkbox
                    checked={selectedRowKeys.includes(record.key)}
                    onChange={(e: any) => onSelectChange(record.key, e.target.checked)}
                />
            ),
        },
        {
            title: "Thời gian",
            dataIndex: "time",
            key: "time",
            width: '20%',
            sorter: (a, b) => a.time.localeCompare(b.time),
        },
        {
            title: "Mã đặt hàng",
            dataIndex: "orderCode",
            key: "orderCode",
            width: '20%',
            sorter: (a, b) => a.orderCode.localeCompare(b.orderCode),
        },
        {
            title: "Số tiền",
            dataIndex: "amount",
            key: "amount",
            width: '10%',
            sorter: (a, b) => parseFloat(a.amount.replace('$', '')) - parseFloat(b.amount.replace('$', '')),
        },
        {
            title: "Lợi nhuận",
            dataIndex: "profit",
            key: "profit",
            width: '10%',
            render: (text) => <span className="text-red-500">{text}</span>,
            sorter: (a, b) => parseFloat(a.profit.replace('$', '')) - parseFloat(b.profit.replace('$', '')),
        },
        {
            title: "Tình trạng giao hàng",
            dataIndex: "deliveryStatus",
            key: "deliveryStatus",
            width: '30%',
            render: (_, record) => (
                <div className="flex flex-col gap-2">
                    <Badge
                        className="mb-2 self-start"
                        count={
                            <div className="animate-gradient bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 text-gray-600 px-2 py-1 rounded font-medium text-sm">
                                🕙 Đang chờ xử lý
                            </div>
                        }
                    />
                    {record.isDelayed && (
                        <Badge
                            className="self-start"
                            count={
                                <div className="bg-blue-100 text-blue-600 px-2 py-1 rounded font-medium text-sm">
                                    ⚠ Đơn hàng chậm: <strong className="mx-1">{record.delayTime}</strong>
                                </div>
                            }
                        />
                    )}
                </div>
            ),
            sorter: (a, b) => a.deliveryStatus.localeCompare(b.deliveryStatus),
        },
        {
            title: "Tùy chọn",
            key: "action",
            width: '10%',
            render: () => (
                <div className="flex items-center justify-center">
                    <Button
                        size="middle"
                        type="primary"
                        shape="circle"
                        icon={<Icon path={mdiCashClock} size={0.8} />}
                        className="text-blue-500 flex items-center justify-center"
                        onClick={showModal} />
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
                        className="placeholder-gray-400"
                        placeholder="Nhập mã đơn hàng"
                        style={{ width: 250 }}
                        onPressEnter={(e: any) => onSearch((e.target as HTMLInputElement).value)}
                    />
                    <Button
                        className="!rounded-[4px]"
                        type="primary"
                        htmlType="submit"
                        onClick={showBulkModal}
                    >
                        Thanh toán tất cả
                    </Button>
                    <Button
                        className="!rounded-[4px]"
                        type="primary"
                        htmlType="submit"
                        onClick={showBulkModal}
                    >
                        Thanh toán những đơn đã chọn
                    </Button>
                </div>
            </div>

            <Table
                columns={columns}
                dataSource={Array.isArray(data) ? data : []}
                pagination={false}
                rowKey="key"
                className="border-t"
                style={{
                    border: '1px solid #f0f0f0',
                    borderRadius: '4px'
                }}
                expandable={{
                    expandedRowKeys,
                    onExpand: (expanded: any, record: any) => {
                        toggleExpand(record.key)
                    },
                    expandedRowRender: (record: any) => (
                        <div className="p-4 bg-gray-50" style={{ borderTop: '1px solid #f0f0f0' }}>
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

            <Modal
                title="Thanh toán đơn hàng"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                className="!rounded-[4px]"
            >
                <Form
                    action="https://logistic.shop-worldwide-amz.top/seller/order/pay_bulk_orders"
                    method="POST"
                >
                    <div className="modal-body">
                        <Table
                            className="border mt-4"
                            style={{
                                border: '1px solid #f0f0f0',
                                borderRadius: '4px'
                            }}
                            dataSource={[
                                {
                                    key: '1',
                                    label: 'Mã đặt hàng',
                                    value: '20250318-06264665'
                                },
                                {
                                    key: '2',
                                    label: 'Số Tiền Cần Thanh Toán',
                                    value: '$11.00'
                                }
                            ]}
                            pagination={false}
                            showHeader={false}
                            columns={[
                                {
                                    dataIndex: 'label',
                                    key: 'label',
                                    className: 'border-r'
                                },
                                {
                                    dataIndex: 'value',
                                    key: 'value',
                                }
                            ]}
                        />

                        <Table
                            className="border mt-4"
                            dataSource={[
                                {
                                    key: '1',
                                    label: 'Số dư hiện tại',
                                    value: '$0.00'
                                }
                            ]}
                            pagination={false}
                            showHeader={false}
                            columns={[
                                {
                                    dataIndex: 'label',
                                    key: 'label',
                                    className: 'border-r'
                                },
                                {
                                    dataIndex: 'value',
                                    key: 'value',
                                    render: (text: any) => <span className="text-danger">{text}</span>
                                }
                            ]}
                        />

                        <div className="form-group text-right mt-4">
                            <Button
                                className="!rounded-[4px]"
                                type="primary"
                                htmlType="submit"
                            >
                                Thanh toán
                            </Button>
                        </div>
                    </div>
                </Form>
            </Modal>

            <Modal
                title="Thanh toán nhiều đơn hàng"
                visible={isBulkModalVisible}
                onCancel={handleBulkCancel}
                footer={null}
                className="!rounded-[4px]"
            >
                <Form
                    action="https://logistic.shop-worldwide-amz.top/seller/order/pay_bulk_orders"
                    method="POST"
                >
                    <div className="modal-body">
                        <Table
                            className="border mt-4"
                            style={{
                                border: '1px solid #f0f0f0',
                                borderRadius: '4px'
                            }}
                            dataSource={[
                                {
                                    key: '1',
                                    label: 'Số Tiền Cần Thanh Toán',
                                    value: '$10.16'
                                }
                            ]}
                            pagination={false}
                            showHeader={false}
                            columns={[
                                {
                                    dataIndex: 'label',
                                    key: 'label',
                                    className: 'border-r'
                                },
                                {
                                    dataIndex: 'value',
                                    key: 'value',
                                }
                            ]}
                        />

                        <Table
                            className="border mt-4"
                            dataSource={[
                                {
                                    key: '1',
                                    label: 'Số dư hiện tại',
                                    value: '$0.00'
                                }
                            ]}
                            pagination={false}
                            showHeader={false}
                            columns={[
                                {
                                    dataIndex: 'label',
                                    key: 'label',
                                    className: 'border-r'
                                },
                                {
                                    dataIndex: 'value',
                                    key: 'value',
                                    render: (text: any) => <span className="text-danger">{text}</span>
                                }
                            ]}
                        />

                        <div className="form-group text-right mt-4">
                            <Button
                                className="!rounded-[4px]"
                                type="primary"
                                htmlType="submit"
                            >
                                Thanh toán
                            </Button>
                        </div>
                    </div>
                </Form>
            </Modal>
        </div>
    )
}

export default OrdersTable

