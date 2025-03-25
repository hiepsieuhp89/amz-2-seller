"use client"

import React, { useEffect, useState } from "react"
import { Table, Input, Checkbox, Button, Space, Tag, Typography, Row, Col, Pagination } from "antd"
import { SearchOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { IProduct } from "@/interface/response/products"
import "./styles.css"
import { getMyShopProducts } from "@/api/shop-products"
import { IShopProduct, IShopProductsResponse } from "@/interface/response/shop-products"
import { useGetMyShopProducts } from "@/hooks/shop-products"

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

interface ProductsTableProps {
    onSearch: (value: string) => void
    selectedRowKeys: React.Key[]
    onSelectChange: (selectedRowKeys: React.Key[]) => void
}

export const ProductsTable: React.FC<ProductsTableProps> = ({
    onSearch,
    selectedRowKeys,
    onSelectChange,
}) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchText, setSearchText] = useState<string>("")
    const { data: shopProductsData, isLoading } = useGetMyShopProducts({
        page: currentPage,
    })
    console.log(shopProductsData)

    const products = shopProductsData?.data?.data || []

    const handleSearch = (value: string) => {
        setSearchText(value);
        onSearch(value);
    };

    const handlePaginationChange = (page: number) => {
        setCurrentPage(page);
    };

    const columns = [
        {   
            title: (
                <Checkbox
                    onChange={(e) => {
                        if (e.target.checked) {
                            onSelectChange(products.map((item: any) => item.productId))
                        } else {
                            onSelectChange([])
                        }
                    }}
                    checked={selectedRowKeys.length === products.length}
                />
            ),
            dataIndex: "productId",
            key: "selection",
            render: (_: any, record: IShopProduct) => (
                <Checkbox
                    checked={selectedRowKeys.includes(record.productId)}
                    onChange={(e) => {
                        if (e.target.checked) {
                            onSelectChange([...selectedRowKeys, record.productId])
                        } else {
                            onSelectChange(selectedRowKeys.filter((key) => key !== record.productId))
                        }
                    }}
                />
            ),
            width: 60,
            align: "center" as const,
        },
        {
            title: "Tên",
            dataIndex: ["product", "name"],
            key: "name",
            render: (text: string, record: IShopProduct) => (
                <Typography.Paragraph>
                    <strong>Sản phẩm:</strong> {text} | <strong>Mô tả:</strong> {record.product?.description}
                </Typography.Paragraph>
            ),
            width: "30%",
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
            key: "quantity",
            render: (quantity: number) => <Typography.Text>{quantity}</Typography.Text>,
            responsive: ["md" as Breakpoint],
        },
        {
            title: "Giá nhập",
            dataIndex: "price",
            key: "price",
            render: (price: number) => <Typography.Text>${price}</Typography.Text>,
            responsive: ["md" as Breakpoint],
        },
        {
            title: "Lợi nhuận",
            dataIndex: "profit",
            key: "profit",
            render: (profit: number) => (
                <Typography.Text type={profit >= 0 ? "danger" : "success"}>
                    ${Math.abs(profit).toFixed(2)}
                </Typography.Text>
            ),
        },
        {
            title: "Trạng thái",
            key: "status",
            responsive: ["md" as Breakpoint],
            render: (_: any, record: IShopProduct) => (
                <Tag color={record?.isActive ? "success" : "warning"}>
                    {record?.isActive ? "Đang bán" : "Ngừng bán"}
                </Tag>
            ),
        },
        {
            title: "Hành động",
            key: "action",
            render: (_: any, record: IShopProduct) => (
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
                loading={isLoading}
                pagination={false}
                scroll={{ x: 'max-content' }}
                size="middle"
            />
            
            {/* ant-select-selector */}
            <div className="flex justify-end mt-4 mb-4 px-4">
                <Pagination
                    current={currentPage}
                    onChange={handlePaginationChange}
                    showSizeChanger
                    total={shopProductsData?.data?.meta?.pageCount} 
                />
            </div>
        </div>
    )
}

