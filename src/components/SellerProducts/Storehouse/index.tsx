"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { Input, Button, Badge, Empty, Spin, message, Pagination, Row, Col } from "antd"
import { PlusOutlined, SearchOutlined, DeleteOutlined } from "@ant-design/icons"
import styles from "./storehouse.module.scss"
import { useGetAllShopProducts } from "@/hooks/shop-products"
import { useAddShopProducts } from "@/hooks/shop-products"
import { IProduct } from "@/interface/response/products"
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

const Storehouse = () => {
  const { user } = useUser()
  const { data: productsData, isLoading, refetch } = useGetAllShopProducts({
    page: 1,
    take: 10,
    shopId: user?.id
  })
  const { mutate: addShopProducts, isPending: isAddingProducts } = useAddShopProducts()
  const [products, setProducts] = useState<IProduct[]>([])
  const [filteredProducts, setFilteredProducts] = useState<any[]>(productsData?.data?.data || [])
  const [selectedProducts, setSelectedProducts] = useState<any[]>([])
  const [keyword, setKeyword] = useState("")
  const [minPrice, setMinPrice] = useState<number | undefined>()
  const [maxPrice, setMaxPrice] = useState<number | undefined>()
  const [quantity, setQuantity] = useState<number | undefined>()
  const [totalSelectedProducts, setTotalSelectedProducts] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

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
        },
        onError: (error: any) => {
          console.log(error)
          message.error(`Lỗi khi thêm sản phẩm: ${error.response?.data?.message || 'Có lỗi xảy ra'}`)
        }
      }
    )
  }

  const handlePaginationChange = (page: number, pageSize?: number) => {
    setCurrentPage(page)
    if (pageSize) setPageSize(pageSize)
  }

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
          <div className="md:flex-1 flex flex-col h-full">
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-[calc(100vh-210px)] flex-1 flex-grow overflow-y-auto">
              {isLoading ? (
                <div className="col-span-2 flex justify-center items-center h-full">
                  <Spin size="small" />
                </div>
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div key={product.id} className={styles.productCard}>
                    <div
                      className={`${styles.card} !rounded-[8px] overflow-hidden bg-white`}
                      style={{
                        padding: "12px",
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%'
                      }}
                    >
                      <div className={styles.imageContainer}>
                        <Badge.Ribbon
                          text={`Trong kho: ${product.stock || 0}`}
                          color="green"
                          className={styles.stockBadge}
                          placement="start"
                        >
                          <Image
                            src={checkImageUrl(product.imageUrl || "")}
                            alt={product.name || "Product Image"}
                            className={`${styles.productImage}`}
                            width={500}
                            height={500}
                            draggable={false}
                            quality={100}
                          />
                        </Badge.Ribbon>
                      </div>
                      <div className={styles.productName}>
                        Tên sản phẩm: {product.name.length > 20 ? `${product.name.substring(0, 20)}...` : product.name}
                      </div>
                      <div className={styles.productDescription}>
                        <strong>Mô tả: </strong>
                        {product.description}
                      </div>
                      <div className={styles.priceInfo}>
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4 text-green-500" />
                          Giá bán:
                        </span>
                        <span className="!text-green-500">
                          {product.salePrice ? Number(product.salePrice).toLocaleString() : '0.00'}
                        </span>
                      </div>
                      <div className={styles.priceInfo}>
                        <span className="flex items-center gap-1">
                          <Import className="w-4 h-4 text-amber-500" />
                          Giá nhập:
                        </span>
                        <span className="!text-amber-500">
                          {product.price ? Number(product.price).toLocaleString() : '0.00'}
                        </span>
                      </div>
                      <div className={styles.priceInfo}>
                        <span className="flex items-center gap-1">
                          <Coins className="w-4 h-4 text-red-500" />
                          Lợi nhuận:
                        </span>
                        <span className="!text-red-500 font-bold">
                          {product.salePrice && product.price
                            ? (Number(product.salePrice) - Number(product.price)).toLocaleString()
                            : '0.00'}
                        </span>
                      </div>
                      <div
                        className={styles.addButton}
                        onClick={() => addProduct(product)}
                      >
                        <div className={styles.overlay}></div>
                        <PlusOutlined className={styles.plusIcon} />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <Empty description="Không tìm thấy sản phẩm" />
              )}
            </div>

            {filteredProducts.length > 12 && (
              <div className="text-center mt-4">
                <Button
                  type="primary"
                  ghost
                >
                  Tải thêm
                </Button>
              </div>
            )}

            {filteredProducts.length > 0 && (
              <Row justify="end" style={{ marginTop: 16 }}>
                <Col>
                  <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={productsData?.data?.meta?.itemCount || 0}
                    showSizeChanger
                    showQuickJumper
                    onChange={handlePaginationChange}
                    onShowSizeChange={handlePaginationChange}
                  />
                </Col>
              </Row>
            )}
          </div>

          <div className="md:w-[400px]">
            {totalSelectedProducts > 0 && (
              <div className="flex items-center gap-2 text-center my-4 text-sm text-main-gunmetal-blue font-semibold">
                Tổng sản phẩm đã chọn:
                <Badge color="blue" count={totalSelectedProducts} />
              </div>
            )}

            <div
              className="mb-3 !rounded-[8px] overflow-hidden bg-white"
              style={{ border: '1px solid #eee' }}
            >
              <div>
                {selectedProducts.length > 0 ? (
                  <ul className="list-group list-group-flush">
                    {selectedProducts.map((product, index) => (
                      <li key={`${product.id}-${index}`} className={`${styles.selectedItem} hover:bg-gray-50 border-b p-4`}>
                        <div className="flex items-center">
                          <Image
                            src={checkImageUrl(product.imageUrl || "")}
                            alt={product.name}
                            className="w-20 h-20 object-cover rounded-[4px] mr-3"
                            width={64}
                            height={64}
                            draggable={false}
                          />
                          <div className="flex-1 pr-1">
                            <div className="text-sm font-medium mb-1">
                              {product.name.length > 20 ? `${product.name.substring(0, 20)}...` : product.name}
                            </div>
                            <div className="text-xs text-gray-500 mb-1 line-clamp-2">{product.description.length > 70 ? `${product.description.substring(0, 70)}...` : product.description}</div>
                            <div className="flex flex-wrap gap-x-3 text-xs">
                              <span className="text-green-600 font-medium">Giá bán: ${Number(product.salePrice).toFixed(2)}</span>
                              <span className="text-amber-600 font-medium">Giá nhập: ${Number(product.price).toFixed(2)}</span>
                              <span className="text-red-600 font-medium">Lợi nhuận: ${(Number(product.salePrice) - Number(product.price)).toFixed(2)}</span>
                            </div>
                          </div>
                          <Button
                            type="text"
                            size="small"
                            danger
                            shape="circle"
                            icon={<DeleteOutlined />}
                            onClick={() => removeProduct(index)}
                            className="flex items-center justify-center !bg-red-100"
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="Chưa có sản phẩm nào được chọn"
                  />
                )}
              </div>
            </div>

            <Button
              className="!rounded-[4px] !h-11 mt-4"
              type="primary"
              block
              size="large"
              onClick={addAllSelectedProducts}
              disabled={selectedProducts.length === 0 || isAddingProducts}
              loading={isAddingProducts}
            >
              {isAddingProducts ? "Đang thêm sản phẩm..." : "Thêm sản phẩm"}
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <Spin tip="Đang tải dữ liệu người dùng..." />
        </div>
      )}
    </div>
  )
}

export default Storehouse

