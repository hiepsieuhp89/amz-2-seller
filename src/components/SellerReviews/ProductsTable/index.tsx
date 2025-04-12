"use client"

import Icon from "@mdi/react"
import { mdiArrowTopRightThin } from "@mdi/js"
import type React from "react"
import { useState } from "react"
import { Table, Input, Button, Space, Typography, Row, Col, Pagination, Tooltip, Badge } from "antd"
import { SearchOutlined, FilterOutlined, ReloadOutlined } from "@ant-design/icons"
import type { IShopProduct } from "@/interface/response/shop-products"
import { useGetMyShopProducts } from "@/hooks/shop-products"
import Image from "next/image"
import Link from "next/link"
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"
import "./styles.css"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { checkImageUrl } from "@/lib/utils"
import { Breakpoint } from "antd/lib"
import { useSelectedProduct } from "@/stores/useSelectedProduct"
const { Title, Text } = Typography

interface ProductsTableProps {
  onSearch: (value: string) => void
  selectedRowKeys: React.Key[]
  onSelectChange: (selectedRowKeys: React.Key[]) => void
}

const ProductsTable = ({ onSearch, selectedRowKeys, onSelectChange }: ProductsTableProps) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [searchText, setSearchText] = useState<string>("")
  const { data: shopProductsData, isLoading } = useGetMyShopProducts({
    page: currentPage,
    onlyHaveReview: true,
  })
  const [openLightbox, setOpenLightbox] = useState(false)
  const [currentImage, setCurrentImage] = useState("")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const products = shopProductsData?.data?.data || []
  const totalItems = shopProductsData?.data?.meta?.itemCount || 0
  const productImages = products.map((product: any) => product.product.imageUrls[0]).filter(Boolean)
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)
  const [selectedProductReviews, setSelectedProductReviews] = useState<any[]>([])
  const { setSelectedProduct } = useSelectedProduct()

  const handleSearch = (value: string) => {
    setSearchText(value)
    onSearch(value)
  }

  const handlePaginationChange = (page: number, pageSize?: number) => {
    setCurrentPage(page)
    if (pageSize) setPageSize(pageSize)
  }

  const handleImageClick = (imageUrl: string) => {
    const index = productImages.indexOf(imageUrl)
    setCurrentImageIndex(index)
    setCurrentImage(imageUrl)
    setOpenLightbox(true)
  }

  const handleViewReviews = (productId: string) => {
    const product = products.find((p: any) => p.productId === productId)
    if (product) {
      setSelectedProductId(productId)
      setSelectedProductReviews((product as any)?.reviews || [])
    }
  }

  const handleCloseDialog = () => {
    setSelectedProductId(null)
  }

  const columns = [
    {
      title: "Hình ảnh",
      dataIndex: ["product", "imageUrl"],
      key: "image",
      render: (imageUrl: string) =>
        imageUrl ? (
          <div
            style={{
              width: "80px",
              height: "80px",
              position: "relative",
              borderRadius: "4px",
              overflow: "hidden",
              cursor: "pointer",
              margin: "0 auto",
            }}
            onClick={() => handleImageClick(imageUrl)}
          >
            <Image
              src={checkImageUrl(imageUrl)}
              alt="Product"
              width={80}
              height={80}
              quality={100}
              draggable={false}
              style={{ objectFit: "cover" }}
            />
          </div>
        ) : (
          <div
            style={{
              width: "50px",
              height: "50px",
              backgroundColor: "#f0f0f0",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
            }}
          >
            <Text type="secondary">No Image</Text>
          </div>
        ),
      width: 80,
      maxWidth: 80,
      align: "center" as const,
      responsive: ["xs", "sm"] as Breakpoint[],
    },
    {
      title: "Tên sản phẩm",
      dataIndex: ["product", "name"],
      key: "name",
      sorter: (a: IShopProduct, b: IShopProduct) => a.product.name.localeCompare(b.product.name),
      render: (text: string, record: IShopProduct) => (
        <Space direction="vertical" size={0} className="max-w-[400px]">
          <Link
            href={`/product?id=${record?.product?.id}`}
            target="_blank"
            onClick={() => setSelectedProduct(record.product)}
          >
            <Text
              strong
              style={{
                fontSize: "14px",
                wordWrap: "break-word",
                display: "-webkit-box",
                WebkitLineClamp: 4,
                WebkitBoxOrient: "vertical",
                overflow: "hidden"
              }}
              ellipsis={{ tooltip: record.product?.name }}
            >
              {text}
            </Text>
          </Link>
          <div
            style={{
              fontSize: "12px",
              color: "rgba(0, 0, 0, 0.45)",
              wordWrap: "break-word",
              display: "-webkit-box",
              WebkitLineClamp: 4,
              WebkitBoxOrient: "vertical",
              overflow: "hidden"
            }}
            dangerouslySetInnerHTML={{ __html: record.product?.description || "" }}
          />
        </Space>
      ),
      width: 400,
      maxWidth: 600,
    },
    {
      title: "Số lượng đánh giá",
      dataIndex: "reviews",
      key: "reviewCount",
      render: (reviews: any[]) => <Text strong>{reviews.length}</Text>,
      align: "center" as const,
      width: 120,
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: IShopProduct) => (
        <Button
          icon={<Icon path={mdiArrowTopRightThin} size={0.7} color={"#ffffff"} />}
          iconPosition="end"
          className="!bg-main-golden-orange !rounded-[4px]"
          type="primary"
          size="small"
          onClick={() => handleViewReviews(record.productId)}
        >
          Xem đánh giá
        </Button>
      ),
      align: "center" as const,
      width: 100,
    },
  ]

  return (
    <>
      <div className="products-table-container">
        <div className="border p-4 bg-white rounded-md">
          <Row justify="space-between" align="middle" gutter={[12, 12]} style={{ marginBottom: 16 }}>
            <Col>
              <Space size="middle">
                <Title level={5} style={{ margin: 0 }}>
                  Đánh giá sản phẩm
                </Title>
                <Badge size="default" count={totalItems} showZero style={{ backgroundColor: "#1890ff" }} />
              </Space>
            </Col>
            <Col>
              <Space size="small" style={{ display: 'flex', width: '100%' }}>
                <Input
                  placeholder="Tìm kiếm sản phẩm"
                  prefix={<SearchOutlined style={{ color: "#636363" }} />}
                  value={searchText}
                  onChange={(e: any) => handleSearch(e.target.value)}
                  style={{ flex: 1, borderRadius: "6px" }}
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
              maxWidth: "100vw",
            }}
            bordered
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
        </div>
      </div>

      <Dialog
        open={selectedProductId !== null}
        onOpenChange={(open) => {
          if (!open) {
            handleCloseDialog()
          }
        }}
      >
        <DialogContent className="max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Đánh giá sản phẩm: {selectedProductId}</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[500px] pr-4">
            {selectedProductReviews.length > 0 ? (
              selectedProductReviews.map((review) => (
                <div key={review.id} className="mb-4 p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center !text-white/80 font-medium">
                        {review.userId.slice(0, 1).toUpperCase()}
                      </div>
                      <div className="font-medium">
                        {review.userId.slice(0, 8) + '*'.repeat(review.userId.length - 8)}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</div>
                  </div>
                  <div className="flex items-center mb-2">
                    <div className="mr-2">Đánh giá:</div>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <span
                          key={index}
                          className={`text-xl ${index < review.rating ? "text-yellow-400" : "text-gray-300"}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-gray-700">{review.content}</div>
                  {review.images && review.images.length > 0 && (
                    <div className="mt-2 flex gap-2">
                      {review.images.map((image: string, idx: number) => (
                        <img
                          key={idx}
                          src={checkImageUrl(image)}
                          alt={`Review image ${idx + 1}`}
                          className="w-20 h-20 object-cover rounded"
                          onClick={() => handleImageClick(image)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div>Không có đánh giá nào cho sản phẩm này</div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Lightbox
        open={openLightbox}
        close={() => setOpenLightbox(false)}
        slides={productImages.map((src: any) => ({ src }))}
        index={currentImageIndex}
        controller={{
          closeOnBackdropClick: true,
          closeOnPullDown: true,
        }}
        on={{
          view: ({ index }: { index: number }) => setCurrentImageIndex(index),
        }}
      />
    </>
  )
}

export default ProductsTable

