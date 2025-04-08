"use client"
import React from "react"
import { useState, useEffect } from "react"
import { Input, Button, Badge, Empty, Spin, message, Pagination, Row, Col, Drawer } from "antd"
import { PlusOutlined, SearchOutlined, DeleteOutlined, ShoppingCartOutlined, LeftOutlined, RightOutlined, CheckOutlined } from "@ant-design/icons"
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
import { useSelectedProduct } from "@/stores/useSelectedProduct"
import { formatNumber } from "@/utils"
import useSidebar from "@/stores/useSidebar"
import Icon from "@mdi/react"
import { mdiChevronDoubleLeft, mdiChevronDoubleRight } from "@mdi/js"

const Storehouse = () => {
  const { user } = useUser()
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(50)
  const { mutate: addShopProducts, isPending: isAddingProducts } = useAddShopProducts()
  const [allProducts, setAllProducts] = useState<any[]>([])
  const [filteredProducts, setFilteredProducts] = useState<any[]>([])
  const [selectedProducts, setSelectedProducts] = useState<any[]>([])
  const [keyword, setKeyword] = useState("")
  const [minPrice, setMinPrice] = useState<number | undefined>()
  const [maxPrice, setMaxPrice] = useState<number | undefined>()
  const [totalSelectedProducts, setTotalSelectedProducts] = useState(0)
  const [isClient, setIsClient] = useState(false)
  const { setSelectedProduct } = useSelectedProduct()
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isLastPage, setIsLastPage] = useState(false)
  const [loadedPages, setLoadedPages] = useState<number[]>([])
  const { isSidebarOpen } = useSidebar()
  const { data: productsData, isLoading, refetch } = useGetAllShopProducts({
    page: currentPage,
    take: pageSize,
    shopId: user?.id,
    search: keyword
  })
  useEffect(() => {
    setIsClient(true)
    
    // Cleanup function to free memory when component unmounts
    return () => {
      setAllProducts([]);
      setFilteredProducts([]);
      setSelectedProducts([]);
      setLoadedPages([]);
    };
  }, [])

  // Update allProducts when new data is loaded
  useEffect(() => {
    if (productsData?.data?.data && (productsData.data.data as any[]).length > 0) {
      if (!loadedPages.includes(currentPage)) {
        setLoadedPages(prev => [...prev, currentPage]);
        
        setAllProducts(prev => {
          const newProductsData = productsData.data.data as any[];
          const uniqueNewProducts = newProductsData.filter(
            newProduct => !prev.some(existingProduct => existingProduct.id === newProduct.id)
          );
          
          // Limit the number of products in memory to prevent performance issues
          // This helps with navigation to other pages
          const combinedProducts = [...prev, ...uniqueNewProducts];
          const maxProductsToKeep = 500; // Adjust based on your app's performance
          
          return combinedProducts.length > maxProductsToKeep 
            ? combinedProducts.slice(-maxProductsToKeep) 
            : combinedProducts;
        });
      }
    }
    
    // Check if this is the last page
    if (productsData?.data?.meta) {
      const { page, pageCount } = productsData.data.meta;
      setIsLastPage(page >= pageCount);
    }
  }, [productsData, currentPage, loadedPages]);
  
  // Filter products when search criteria or all products change
  useEffect(() => {
    filterProducts();
  }, [keyword, minPrice, maxPrice, allProducts]);

  const filterProducts = () => {
    if (keyword || minPrice !== undefined || maxPrice !== undefined) {
      let filtered = [...allProducts];

      if (keyword) {
        filtered = filtered.filter((product: any) =>
          product.name.toLowerCase().includes(keyword.toLowerCase())
        );
      }

      if (minPrice !== undefined) {
        filtered = filtered.filter((product: any) =>
          Number(product.salePrice) >= minPrice
        );
      }

      if (maxPrice !== undefined) {
        filtered = filtered.filter((product: any) =>
          Number(product.salePrice) <= maxPrice
        );
      }

      // Limit the number of filtered products to prevent memory issues
      const maxFilteredProducts = 300;
      const limitedFiltered = filtered.length > maxFilteredProducts 
        ? filtered.slice(0, maxFilteredProducts) 
        : filtered;
        
      setFilteredProducts(limitedFiltered);
    } else {
      // Limit the number of displayed products to prevent memory issues
      const maxDisplayProducts = 300;
      const displayProducts = allProducts.length > maxDisplayProducts 
        ? allProducts.slice(0, maxDisplayProducts) 
        : allProducts;
        
      setFilteredProducts(displayProducts);
    }
  };

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

  const handleLoadMore = () => {
    if (isLoading || isLastPage) return;
    
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    
    // Explicitly trigger refetch after state update
    setTimeout(() => {
      refetch();
    }, 0);
  }

  const isProductSelected = (product: any) => {
    return selectedProducts.some(item => item.id === product.id)
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
                        src={checkImageUrl(product.imageUrls?.[0])}
                        alt={product.name}
                        className={styles.cartItemImage}
                        width={64}
                        height={64}
                        draggable={false}
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx0fHRsdHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/2wBDAR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
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
                          <span className={styles.priceValue}>${formatNumber(Number(product.salePrice))}</span>
                        </div>
                        <div className={styles.priceRow}>
                          <span className={styles.priceLabel}>Giá nhập:</span>
                          <span className={styles.priceValue}>${formatNumber(Number(product.price))}</span>
                        </div>
                        <div className={styles.priceRow}>
                          <span className={styles.priceLabel}>Lợi nhuận:</span>
                          <span className={`${styles.priceValue} ${styles.profitValue}`}>${formatNumber(Number(product.profit))}</span>
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

  const renderMiniCart = () => (
    <div className={`${styles.miniCart} bg-white p-2 h-full rounded-l-lg border-l border-t border-b flex flex-col`}>
      <button 
        onClick={() => setIsCollapsed(false)}
        className={styles.expandButton}
      >
        <Icon path={mdiChevronDoubleLeft} size={1} className="!text-gray-500"/>
      </button>
      
      <div className={styles.miniCartList}>
        {selectedProducts.length > 0 ? (
          <div className={styles.miniCartItems}>
            {selectedProducts.map((product, index) => (
              <div key={`mini-${product.id}-${index}`} className={styles.miniCartItem}>
                <div className={styles.miniCartItemContent}>
                  <Image
                    src={checkImageUrl(product.imageUrls?.[0])}
                    alt={product.name}
                    className={styles.miniCartItemImage}
                    width={32}
                    height={32}
                    draggable={false}
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx0fHRsdHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/2wBDAR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                  />
                  <div className={styles.miniCartItemName}>{product.name}</div>
                </div>
                <div className={styles.miniCartItemPrice}>${formatNumber(Number(product.salePrice))}</div>
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

            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${!isSidebarOpen ? 'xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6' : 'xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5'} gap-4 h-[calc(100vh-210px)] flex-1 flex-grow overflow-y-auto`}>
              {isLoading && currentPage === 1 ? (
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
                            src={checkImageUrl(product.imageUrls?.[0])}
                            alt={product.name || "Product Image"}
                            className={`${styles.productImage} object-cover`}
                            width={500}
                            height={500}
                            draggable={false}
                            quality={100}
                            loading="lazy"
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx0fHRsdHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/2wBDAR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
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
                            <span className="text-green-600 font-semibold text-sm">${formatNumber(Number(product.salePrice))}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="flex items-center gap-1 text-xs text-gray-600">
                              <Import className="w-3.5 h-3.5 text-amber-500" />
                              Giá nhập:
                            </span>
                            <span className="text-amber-600 font-semibold text-sm">${formatNumber(Number(product.price))}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="flex items-center gap-1 text-xs text-gray-600">
                              <Coins className="w-3.5 h-3.5 text-red-500" />
                              Lợi nhuận:
                            </span>
                            <span className="text-red-600 font-bold text-sm">${formatNumber(Number(product.profit))}</span>
                          </div>
                        </div>
                      </div>
                      <div 
                        className={`${styles.hoverOverlay} ${isProductSelected(product) ? styles.selectedOverlay : ''}`} 
                        onClick={() => addProduct(product)}
                      >
                        {isProductSelected(product) ? (
                          <CheckOutlined className={styles.selectedIcon} />
                        ) : (
                          <PlusOutlined className={styles.plusIcon} />
                        )}
                      </div>
                      
                      {isProductSelected(product) && (
                        <div className={styles.selectedBadge}>
                          <CheckOutlined />
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full">
                  <Empty description="Không tìm thấy sản phẩm" />
                </div>
              )}
            </div>

            {filteredProducts.length > 0 && !isLastPage && (
              <div className="w-full mt-6">
                <Button
                  type="primary"
                  onClick={handleLoadMore}
                  loading={isLoading}
                  disabled={isLastPage}
                  className="w-full !rounded-sm text-center bg-white hover:bg-blue-50 !border-gray-500 !text-gray-500 !font-semibold"
                  ghost
                >
                  Xem thêm
                </Button>
              </div>
            )}
            
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

          <div className={`hidden lg:block ${styles.sidebarContainer} ${isCollapsed ? styles.collapsed : styles.expanded}`}>
            {isCollapsed ? (
              renderMiniCart()
            ) : (
              <div className="relative">
                <div className={styles.expandedSidebar}>
                  <button 
                    onClick={() => setIsCollapsed(true)}
                    className="absolute -left-3 top-1/2 transform -translate-y-1/2 bg-white p-1 rounded-full border shadow-sm z-10 hover:bg-gray-100 !flex-shrink-0 !h-8 !w-8 "
                  >
                    <Icon path={mdiChevronDoubleRight} size={1} className="!text-gray-500"/>
                  </button>
                  {renderProductCart()}
                </div>
              </div>
            )}
          </div>
          
          <div className="hidden md:block lg:hidden md:w-[400px]">
            {renderProductCart()}
          </div>
          
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



