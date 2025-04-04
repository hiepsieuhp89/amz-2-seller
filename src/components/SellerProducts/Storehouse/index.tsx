"use client"
import React from "react"
import { useState, useEffect } from "react"
import { Input, Button, Badge, Empty, Spin, message, Pagination, Row, Col, Drawer } from "antd"
import { PlusOutlined, SearchOutlined, DeleteOutlined, ShoppingCartOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons"
import styles from "./storehouse.module.scss"
import { useGetAllShopProducts } from "@/hooks/shop-products"
import { useAddShopProducts } from "@/hooks/shop-products"
import Image from "next/image"
import { useUser } from "@/context/useUserContext"
import { DollarSign, Coins, Import } from "lucide-react"
import { checkImageUrl } from "@/lib/utils"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useSelectedProduct } from "@/app/stores/useSelectedProduct"

const Storehouse = () => {
  const { user } = useUser()
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(50)
  const { data: productsData, isLoading, refetch } = useGetAllShopProducts({
    page: currentPage,
    take: pageSize,
    shopId: user?.id
  })
  const { mutate: addShopProducts, isPending: isAddingProducts } = useAddShopProducts()
  const [filteredProducts, setFilteredProducts] = useState<any[]>(productsData?.data?.data || [])
  const [selectedProducts, setSelectedProducts] = useState<any[]>([])
  const [keyword, setKeyword] = useState("")
  const [minPrice, setMinPrice] = useState<number | undefined>()
  const [maxPrice, setMaxPrice] = useState<number | undefined>()
  const [totalSelectedProducts, setTotalSelectedProducts] = useState(0)
  const [isClient, setIsClient] = useState(false)
  const { setSelectedProduct } = useSelectedProduct()
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const filterProducts = () => {
    if (keyword || minPrice !== undefined || maxPrice !== undefined) {
      let filtered = [...productsData?.data?.data || []]

      if (keyword) {
        filtered = filtered.filter((product: any) =>
          product.name.toLowerCase().includes(keyword.toLowerCase())
        )
      }

      if (minPrice !== undefined) {
        filtered = filtered.filter((product: any) =>
          Number(product.salePrice) >= minPrice
        )
      }

      if (maxPrice !== undefined) {
        filtered = filtered.filter((product: any) =>
          Number(product.salePrice) <= maxPrice
        )
      }

      setFilteredProducts(filtered)
    } else {
      setFilteredProducts(productsData?.data?.data || [])
    }
  }

  useEffect(() => {
    if ((productsData?.data?.data as any)?.length > 0) {
      filterProducts()
    }
  }, [keyword, minPrice, maxPrice, productsData?.data?.data])

  const addProduct = (product: any) => {
    const productExists = selectedProducts.some(item => item.id === product.id);
    if (productExists) {
      message.warning("Sản phẩm đã tồn tại trong danh sách");
      return;
    }
    setSelectedProducts([...selectedProducts, product])
    setTotalSelectedProducts(totalSelectedProducts + 1)
  }

  const removeProduct = (index: number) => {
    const newSelectedProducts = [...selectedProducts]
    newSelectedProducts.splice(index, 1)
    setSelectedProducts(newSelectedProducts)
    setTotalSelectedProducts(totalSelectedProducts - 1)
  }

  const addAllSelectedProducts = () => {
    const productIds = selectedProducts.map(product => product.id)

    addShopProducts(
      { productIds: productIds },
      {
        onSuccess: () => {
          message.success("Thêm sản phẩm vào cửa hàng thành công")
          setSelectedProducts([])
          setTotalSelectedProducts(0)
          setDrawerVisible(false)
        },
        onError: (error: any) => {
          message.error(`Lỗi khi thêm sản phẩm: ${error.response?.data?.message || 'Có lỗi xảy ra'}`)
        }
      }
    )
  }

  const handlePaginationChange = (page: number, pageSize?: number) => {
    setCurrentPage(page)
    if (pageSize) setPageSize(pageSize)
  }

  if (!isClient) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="small" tip="Đang tải..." />
      </div>
    )
  }

  const renderProductCart = () => (
    <div className={styles.productCartContainer}>
      {totalSelectedProducts > 0 && (
        <div className={styles.cartHeader}>
          <h3 className="text-sm font-medium">Tổng sản phẩm đã chọn</h3>
          <Badge color="blue" count={totalSelectedProducts} className={styles.cartBadge} />
        </div>
      )}

      <div className={styles.cartListContainer}>
        <div>
          {selectedProducts.length > 0 ? (
            <ul className={styles.cartList}>
              {selectedProducts.map((product, index) => (
                <li key={`${product.id}-${index}`} className={styles.cartItem}>
                  <div className={styles.cartItemContent}>
                    <div className={styles.cartItemImageContainer}>
                      <Image
                        src={checkImageUrl(product.imageUrls?.[0] || "")}
                        alt={product.name}
                        className={styles.cartItemImage}
                        width={64}
                        height={64}
                        draggable={false}
                      />
                    </div>
                    <div className={styles.cartItemDetails}>
                      <div className={styles.cartItemName}>
                        {product.name.length > 30 ? `${product.name.substring(0, 30)}...` : product.name}
                      </div>
                      <div className={styles.cartItemDescription} dangerouslySetInnerHTML={{ __html: product.description?.substring(0, 70) + "..." }}></div>
                      <div className={styles.cartItemPricing}>
                        <div className={styles.priceRow}>
                          <span className={styles.priceLabel}>Giá bán:</span>
                          <span className={styles.priceValue}>${Number(product.salePrice).toFixed(2)}</span>
                        </div>
                        <div className={styles.priceRow}>
                          <span className={styles.priceLabel}>Giá nhập:</span>
                          <span className={styles.priceValue}>${Number(product.price).toFixed(2)}</span>
                        </div>
                        <div className={styles.priceRow}>
                          <span className={styles.priceLabel}>Lợi nhuận:</span>
                          <span className={`${styles.priceValue} ${styles.profitValue}`}>${Number(product.profit).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeProduct(index)}
                      className={styles.removeButton}
                      aria-label="Remove product"
                    >
                      <DeleteOutlined />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className={styles.emptyCartContainer}>
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="Chưa có sản phẩm nào được chọn"
              />
            </div>
          )}
        </div>
      </div>
      
      <div className={styles.cartFooter}>
        <Button
          type="primary"
          block
          size="large"
          onClick={addAllSelectedProducts}
          disabled={selectedProducts.length === 0 || isAddingProducts}
          loading={isAddingProducts}
          className={styles.addButton}
        >
          {isAddingProducts ? "Đang thêm sản phẩm..." : "Thêm sản phẩm"}
        </Button>
      </div>
    </div>
  )

  // Render the collapsed mini cart view
  const renderMiniCart = () => (
    <div className={`${styles.miniCart} bg-white p-2 h-full rounded-l-lg border-l border-t border-b flex flex-col`}>
      <button 
        onClick={() => setIsCollapsed(false)}
        className={styles.expandButton}
      >
        <LeftOutlined />
      </button>
      
      <div className={styles.miniCartList}>
        {selectedProducts.length > 0 ? (
          <div className={styles.miniCartItems}>
            {selectedProducts.map((product, index) => (
              <div key={`mini-${product.id}-${index}`} className={styles.miniCartItem}>
                <div className={styles.miniCartItemContent}>
                  <Image
                    src={checkImageUrl(product.imageUrls?.[0] || "")}
                    alt={product.name}
                    className={styles.miniCartItemImage}
                    width={32}
                    height={32}
                    draggable={false}
                  />
                  <div className={styles.miniCartItemName}>{product.name}</div>
                </div>
                <div className={styles.miniCartItemPrice}>${Number(product.salePrice).toFixed(2)}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.miniCartEmpty}>Không có sản phẩm</div>
        )}
      </div>
      
      {selectedProducts.length > 0 && (
        <Button
          type="primary"
          block
          size="small"
          onClick={addAllSelectedProducts}
          disabled={isAddingProducts}
          loading={isAddingProducts}
          className={styles.miniAddButton}
        >
          Thêm
        </Button>
      )}
      <Badge count={totalSelectedProducts} className={styles.miniCartBadge} />
    </div>
  )

  return (
    <div className="p-4 bg-[#E3E6E6]">
      <Breadcrumb className="!mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="text-main-dark-blue/80 hover:text-main-dark-blue uppercase">
              Trang chủ
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-main-dark-blue/80" />
          <BreadcrumbItem>
            <BreadcrumbLink className="text-main-dark-blue/80 font-semibold uppercase">
              Kho hàng
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {user ? (
        <div className="flex flex-col md:flex-row gap-4">
          <div className={`md:flex-1 flex flex-col h-full ${isCollapsed ? 'lg:pr-[70px]' : 'lg:pr-0'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-3">
              <Input
                placeholder="Tìm kiếm sản phẩm"
                className="h-10"
                value={keyword}
                onChange={(e: any) => setKeyword(e.target.value)}
                prefix={<SearchOutlined />}
              />
              <Input
                type="number"
                placeholder="Giá bắt đầu"
                className="h-10"
                value={minPrice}
                onChange={(e: any) => setMinPrice(e.target.value ? Number(e.target.value) : undefined)}
              />
              <Input
                type="number"
                placeholder="Giá kết thúc"
                className="h-10"
                value={maxPrice}
                onChange={(e: any) => setMaxPrice(e.target.value ? Number(e.target.value) : undefined)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-8 gap-4 h-[calc(100vh-210px)] flex-1 flex-grow overflow-y-auto">
              {isLoading ? (
                <div className="col-span-full flex justify-center items-center h-full">
                  <Spin size="small" />
                </div>
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product: any) => (
                  <div key={product.id} className={styles.productWrapper}>
                    <div
                      className={`${styles.card} !rounded-[8px] overflow-hidden bg-white h-full`}
                      style={{ padding: "12px" }}
                    >
                      <Badge.Ribbon
                        text={`Trong kho: ${product.stock || 0}`}
                        color="green"
                        className={styles.stockBadge}
                        placement="start"
                      >
                        <div className={styles.imageContainer}>
                          <Image
                            src={checkImageUrl(product.imageUrls?.[0] || "")}
                            alt={product.name || "Product Image"}
                            className={`${styles.productImage} object-cover`}
                            width={500}
                            height={500}
                            draggable={false}
                            quality={100}
                          />
                        </div>
                      </Badge.Ribbon>
                      <div className="mt-2">
                        <h3 className="text-sm font-medium mb-2 line-clamp-2">
                          {product.name}
                        </h3>
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="flex items-center gap-1 text-xs text-gray-600">
                              <DollarSign className="w-3.5 h-3.5 text-green-500" />
                              Giá bán:
                            </span>
                            <span className="text-green-600 font-semibold text-sm">
                              ${Number(product.salePrice).toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="flex items-center gap-1 text-xs text-gray-600">
                              <Import className="w-3.5 h-3.5 text-amber-500" />
                              Giá nhập:
                            </span>
                            <span className="text-amber-600 font-semibold text-sm">
                              ${Number(product.price).toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="flex items-center gap-1 text-xs text-gray-600">
                              <Coins className="w-3.5 h-3.5 text-red-500" />
                              Lợi nhuận:
                            </span>
                            <span className="text-red-600 font-bold text-sm">
                              ${Number(product.profit).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className={styles.hoverOverlay} onClick={() => addProduct(product)}>
                        <PlusOutlined className={styles.plusIcon} />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full">
                  <Empty description="Không tìm thấy sản phẩm" />
                </div>
              )}
            </div>

            {filteredProducts.length > 0 && (
              <Row justify="end" style={{ marginTop: 24 }}>
                <Col>
                  <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={productsData?.data?.meta?.itemCount || 0}
                    onChange={handlePaginationChange}
                    onShowSizeChange={handlePaginationChange}
                  />
                </Col>
              </Row>
            )}
            
            {/* Cart button for small screens */}
            <div className="md:hidden fixed bottom-4 right-4 z-10">
              <Button
                type="primary"
                shape="circle"
                size="large"
                icon={<ShoppingCartOutlined />}
                onClick={() => setDrawerVisible(true)}
                className="flex items-center justify-center !h-14 !w-14 shadow-lg"
              >
                {totalSelectedProducts > 0 && (
                  <Badge 
                    count={totalSelectedProducts} 
                    style={{ position: 'absolute', top: 0, right: 0 }}
                  />
                )}
              </Button>
            </div>
          </div>

          {/* Cart section for large screens */}
          <div className={`hidden lg:block ${styles.sidebarContainer} ${isCollapsed ? styles.collapsed : styles.expanded}`}>
            {isCollapsed ? (
              renderMiniCart()
            ) : (
              <div className="relative">
                <div className={styles.expandedSidebar}>
                  <button 
                    onClick={() => setIsCollapsed(true)}
                    className="absolute -left-3 top-1/2 transform -translate-y-1/2 bg-white p-1 rounded-full border shadow-sm z-10 hover:bg-gray-100"
                  >
                    <RightOutlined />
                  </button>
                  {renderProductCart()}
                </div>
              </div>
            )}
          </div>
          
          {/* Visible only on md breakpoint */}
          <div className="hidden md:block lg:hidden md:w-[400px]">
            {renderProductCart()}
          </div>
          
          {/* Drawer for small screens */}
          <Drawer
            title="Giỏ hàng đã chọn"
            placement="right"
            onClose={() => setDrawerVisible(false)}
            open={drawerVisible}
            width={320}
          >
            {renderProductCart()}
          </Drawer>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <Spin size="small" tip="Đang tải dữ liệu người dùng..." />
        </div>
      )}
    </div>
  )
}

export default Storehouse

