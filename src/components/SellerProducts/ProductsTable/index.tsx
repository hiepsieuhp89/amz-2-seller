"use client"

import React, { useState } from "react"
import { Table, Input, Card, Checkbox, Button, Space, Tag, Typography, Row, Col } from "antd"
import { SearchOutlined, PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons"
import styles from "./ProductsTable.module.scss"

// Định nghĩa kiểu Breakpoint
type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

interface Product {
    id: number
    name: string
    quantity: number
    costPrice: string
    sellingPrice: string
    profit: string
    status: string
    url?: string
}

interface ProductsTableProps {
    products: Product[]
    onSearch: (value: string) => void
    selectedRowKeys: React.Key[]
    onSelectChange: (selectedRowKeys: React.Key[]) => void
}

export const ProductsTable: React.FC<ProductsTableProps> = ({
    products,
    onSearch,
    selectedRowKeys,
    onSelectChange,
}) => {
    const [searchText, setSearchText] = useState<string>("");

    const handleSearch = (value: string) => {
        setSearchText(value);
        onSearch(value);
    };

    const columns = [
        {
            title: (
                <Checkbox
                    onChange={(e) => {
                        if (e.target.checked) {
                            onSelectChange(products.map((item) => item.id))
                        } else {
                            onSelectChange([])
                        }
                    }}
                    checked={selectedRowKeys.length === products.length}
                />
            ),
            dataIndex: "id",
            key: "selection",
            render: (_: any, record: Product) => (
                <Checkbox
                    checked={selectedRowKeys.includes(record.id)}
                    onChange={(e) => {
                        if (e.target.checked) {
                            onSelectChange([...selectedRowKeys, record.id])
                        } else {
                            onSelectChange(selectedRowKeys.filter((key) => key !== record.id))
                        }
                    }}
                />
            ),
            width: 60,
            align: "center" as const,
        },
        {
            title: "Tên",
            dataIndex: "name",
            key: "name",
            render: (text: string, record: Product) => (
                <Typography.Link href={`#/product/${record.id}`}>
                    {text}
                </Typography.Link>
            ),
            width: "30%",
        },
        {
            title: "Số lượng hiện tại",
            dataIndex: "quantity",
            key: "quantity",
            responsive: ["md" as Breakpoint],
        },
        {
            title: "Giá nhập",
            dataIndex: "costPrice",
            key: "costPrice",
            responsive: ["md" as Breakpoint],
        },
        {
            title: "Giá bán",
            dataIndex: "sellingPrice",
            key: "sellingPrice",
            responsive: ["md" as Breakpoint],
        },
        {
            title: "Lợi nhuận",
            dataIndex: "profit",
            key: "profit",
            render: (text: string) => <Typography.Text type="danger">{text}</Typography.Text>,
        },
        {
            title: "Được phát hành",
            dataIndex: "status",
            key: "status",
            responsive: ["md" as Breakpoint],
            render: (status: string) => (
                <Tag color={status === "Đang bán" ? "success" : "warning"}>{status}</Tag>
            ),
        },
        {
            title: "Hành động",
            key: "action",
            render: (_: any, record: Product) => (
                <Space size="small">
                    <Button type="text" icon={<EditOutlined />} size="small" />
                    <Button type="text" icon={<DeleteOutlined />} size="small" danger />
                </Space>
            ),
        },
    ]

    return (
        <div className="border rounded-[4px] px-2">
            <Row justify="space-between" align="middle" gutter={[16, 16]} className="mb-4 border-b px-6 py-3">
                <Col>
                    <Typography.Title level={5}>Tất cả sản phẩm</Typography.Title>
                </Col>
                <Col>
                    <Input
                        placeholder="Tìm kiếm sản phẩm"
                        prefix={<SearchOutlined />}
                        value={searchText}
                        onChange={(e) => handleSearch(e.target.value)}
                        style={{ width: 250, fontSize: 16 }}
                        allowClear
                    />
                </Col>
            </Row>

            <Table
                rowKey="id"
                columns={columns}
                dataSource={products}
                pagination={{
                    pageSize: 10,
                    showSizeChanger: true,
                    showTotal: (total) => `Tổng cộng ${total} sản phẩm`,
                }}
                rowSelection={{
                    selectedRowKeys,
                    onChange: onSelectChange,
                    columnWidth: 60,
                    renderCell: () => null, // Hide default checkbox
                }}
                scroll={{ x: 'max-content' }}
                size="middle"
            />
        </div>
    )
}

