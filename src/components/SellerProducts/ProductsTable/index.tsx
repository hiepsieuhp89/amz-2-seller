"use client"

import Icon from '@mdi/react';
import { mdiContentSaveEdit, mdiEye, mdiPencil, mdiTrashCan } from '@mdi/js';
import type React from "react"
import { useState } from "react"
import {
  Table,
  Input,
  Button,
  Space,
  Typography,
  Row,
  Col,
  Pagination,
  Card,
  Tooltip,
  Badge,
  Divider,
} from "antd"
import {
  SearchOutlined,
  FilterOutlined,
  ReloadOutlined,
} from "@ant-design/icons"
import type { IShopProduct } from "@/interface/response/shop-products"
import { useGetMyShopProducts } from "@/hooks/shop-products"
import Image from 'next/image';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const { Title, Text } = Typography

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "xxl"

interface ProductsTableProps {
  onSearch: (value: string) => void
  selectedRowKeys: React.Key[]
  onSelectChange: (selectedRowKeys: React.Key[]) => void
}

export const ProductsTable: React.FC<ProductsTableProps> = ({ onSearch, selectedRowKeys, onSelectChange }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [searchText, setSearchText] = useState<string>("")
  const { data: shopProductsData, isLoading } = useGetMyShopProducts({
    page: currentPage,
  })
  const [openLightbox, setOpenLightbox] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const products = shopProductsData?.data?.data || []
  const totalItems = shopProductsData?.data?.meta?.itemCount || 0
  const productImages = products.map((product: any) => product.product.imageUrl).filter(Boolean);

  console.log(products)
  const handleSearch = (value: string) => {
    setSearchText(value)
    onSearch(value)
  }

  const handlePaginationChange = (page: number, pageSize?: number) => {
    setCurrentPage(page)
    if (pageSize) setPageSize(pageSize)
  }

  const getStatusColor = (isActive: boolean) => {
    return isActive ? "#52c41a" : "#faad14"
  }

  const handleImageClick = (imageUrl: string) => {
    const index = productImages.indexOf(imageUrl);
    setCurrentImageIndex(index);
    setCurrentImage(imageUrl);
    setOpenLightbox(true);
  };

  const handleNextImage = () => {
    const nextIndex = (currentImageIndex + 1) % productImages.length;
    setCurrentImageIndex(nextIndex);
    setCurrentImage(productImages[nextIndex]);
  };

  const handlePreviousImage = () => {
    const prevIndex = (currentImageIndex - 1 + productImages.length) % productImages.length;
    setCurrentImageIndex(prevIndex);
    setCurrentImage(productImages[prevIndex]);
  };

  const columns = [
    {
      title: "Hình ảnh",
      dataIndex: ["product", "imageUrl"],
      key: "image",
      render: (imageUrl: string) => (
        imageUrl ? (
          <div 
            style={{ 
              width: '80px', 
              height: '80px', 
              position: 'relative',
              borderRadius: '4px',
              overflow: 'hidden',
              cursor: 'pointer'
            }}
            onClick={() => handleImageClick(imageUrl)}
          >
            <Image
              src={imageUrl}
              alt="Product"
              fill
              quality={100}
              draggable={false}
              style={{ objectFit: 'cover' }}
            />
          </div>
        ) : (
          <div style={{ 
            width: '50px', 
            height: '50px', 
            backgroundColor: '#f0f0f0', 
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Text type="secondary">No Image</Text>
          </div>
        )
      ),
      width: 80,
      align: "center" as const,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: ["product", "name"],
      key: "name",
      sorter: (a: IShopProduct, b: IShopProduct) => a.product.name.localeCompare(b.product.name),
      render: (text: string, record: IShopProduct) => (
        <Space direction="vertical" size={0} style={{ maxWidth: 300 }}>
          <Text strong style={{ fontSize: "14px", wordWrap: 'break-word', whiteSpace: 'normal' }}>
            {text}
          </Text>
          <Text type="secondary" style={{ fontSize: "12px", wordWrap: 'break-word', whiteSpace: 'normal' }} ellipsis={{ tooltip: record.product?.description }}>
            {record.product?.description}
          </Text>
        </Space>
      ),
      width: 300,
    },
    {
      title: "Số lượng",
      dataIndex: ["product", "stock"],
      key: "quantity",
      sorter: (a: IShopProduct, b: IShopProduct) => a.product.stock - b.product.stock,
      render: (stock: number) => (
        <Badge
          count={stock}
          showZero
          overflowCount={999}
          style={{
            backgroundColor: stock > 0 ? "#1890ff" : "#f5222d",
            fontSize: "12px",
            fontWeight: "bold",
          }}
        />
      ),
      responsive: ["md" as Breakpoint],
      align: "center" as const,
      width: 100,
    },
    {
      title: "Giá nhập",
      dataIndex: ["product", "price"],
      key: "price",
      sorter: (a: IShopProduct, b: IShopProduct) =>Number(a.product.price) - Number(b.product.price),
      render: (price: number) => (
        <Button
          style={{
            backgroundColor: "#E6F4FF",
            color: "#1890FF",
            borderRadius: "4px",
            padding: "0 10px",
            fontSize: "12px",
            fontWeight: "bold",
            cursor: "default",
            height: 22,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
          }}
        >
          $ {price ? price : 0}
        </Button>
      ),
      responsive: ["md" as Breakpoint],
      align: "right" as const,
      width: 100,
    },
    {
      title: "Lợi nhuận",
      dataIndex: "profit",
      key: "profit",
      sorter: (a: IShopProduct, b: IShopProduct) => a.profit - b.profit,
      render: (profit: number) => (
        <Button
          style={{
            backgroundColor: "#FFF1F0",
            color: "#FF4D4F",
            borderRadius: "4px",
            padding: "0 10px",
            fontSize: "12px",
            fontWeight: "bold",
            cursor: "default",
            height: 22,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
          }}
        >
          $ {profit ? Math.abs(profit).toLocaleString("vi-VN") : 0}
        </Button>
      ),
      align: "right" as const,
      width: 100,
    },
    {
      title: "Trạng thái",
      key: "status",
      responsive: ["md" as Breakpoint],
      render: (_: any, record: IShopProduct) => (
        <Button
          style={{
            backgroundColor: "#ECFFF3",
            color: "#5AC48A",
            borderRadius: "4px",
            padding: "0 10px",
            fontSize: "12px",
            fontWeight: "bold",
            cursor: "default",
            height: 22,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
          }}
        >
          {record?.isActive ? "Đang bán" : "Ngừng bán"}
        </Button>
      ),
      align: "center" as const,
      width: 100,
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: IShopProduct) => (
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
      align: "center" as const,
      width: 100,
    },
  ]

  return (
    <Card
      bordered={false}
      className="products-table-card border"
      style={{ borderRadius: "8px", boxShadow: "0 1px 2px rgba(0, 0, 0, 0.03)" }}
    >
      <Row 
      justify="space-between" align="middle" gutter={[12, 12]} style={{ marginBottom: 16 }}>
        <Col>
          <Space size="middle">
            <Title level={5} style={{ margin: 0 }}>
              Tất cả sản phẩm
            </Title>
            <Badge 
            size='default'
            count={totalItems} showZero style={{ backgroundColor: "#1890ff" }} />
          </Space>
        </Col>
        <Col>
          <Space size="small">
            <Input
              placeholder="Tìm kiếm sản phẩm"
              prefix={<SearchOutlined style={{ color: "#1890ff" }} />}
              value={searchText}
              onChange={(e) => handleSearch(e.target.value)}
              style={{ width: 250, borderRadius: "6px" }}
              allowClear
            />
            <Tooltip title="Lọc sản phẩm">
              <Button icon={<FilterOutlined />} style={{ borderRadius: "6px" }} />
            </Tooltip>
            <Tooltip title="Làm mới">
              <Button icon={<ReloadOutlined />} style={{ borderRadius: "6px" }} />
            </Tooltip>
          </Space>
        </Col>
      </Row>

      <Divider style={{ margin: "0 0 16px 0" }} />

      {selectedRowKeys.length > 0 && (
        <Row style={{ marginBottom: 16 }}>
          <Space>
            <Text strong>{selectedRowKeys.length} sản phẩm đã chọn</Text>
            <Button danger size="small">
              Xóa đã chọn
            </Button>
          </Space>
        </Row>
      )}

      <Table
        rowKey="productId"
        columns={columns}
        dataSource={products as any}
        loading={isLoading}
        pagination={false}
        scroll={{ x: "max-content" }}
        size="middle"
        rowClassName={() => "product-table-row"}
        style={{
          overflow: "hidden",
          tableLayout: "fixed",
          maxWidth: '100vw',
        }}
        bordered
      />

      <Row justify="space-between" align="middle" style={{ marginTop: 16 }}>
        <Col>
        </Col>
        <Col>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalItems}
            showSizeChanger
            showQuickJumper
            onChange={handlePaginationChange}
            onShowSizeChange={handlePaginationChange}
            style={{ marginTop: '16px' }}
            className="custom-pagination"
          />
        </Col>
      </Row>

      <Lightbox
        open={openLightbox}
        close={() => setOpenLightbox(false)}
        slides={productImages.map(src => ({ src }))}
        index={currentImageIndex}
        controller={{
          closeOnBackdropClick: true,
          closeOnPullDown: true,
        }}
        on={{
          view: ({ index }) => setCurrentImageIndex(index),
        }}
      />
    </Card>
  )
}

