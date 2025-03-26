"use client"
import type React from "react"
import { useState, useEffect, Suspense } from "react"
import { Input, Button, Card, Badge, Empty, Spin, message } from "antd"
import { PlusOutlined, SearchOutlined, DeleteOutlined } from "@ant-design/icons"
import styles from "./storehouse.module.scss"
import { useGetAllShopProducts } from "@/hooks/shop-products"
import { useAddShopProducts } from "@/hooks/shop-products"
import { IProduct } from "@/interface/response/products"
import Image from "next/image"
import { useUser } from "@/context/useUserContext"
import { DollarSign, ArrowDown, ArrowUp, Coins, Import } from "lucide-react"

const Storehouse = () => {
  const { user } = useUser()
  const { data: productsData, isLoading, refetch } = useGetAllShopProducts({
    page: 1,
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

  const selectRandomProducts = () => {
    if (!quantity || quantity <= 0 || quantity > products.length) return

    const shuffled = [...products].sort(() => 0.5 - Math.random())
    const randomProducts = shuffled.slice(0, quantity)

    setSelectedProducts(randomProducts)
    setTotalSelectedProducts(randomProducts.length)
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

  const checkImageUrl = (imageUrl: string): string => {
    if (!imageUrl) return "https://picsum.photos/800/600";

    if (imageUrl.includes("example.com")) {
      return "https://picsum.photos/800/600";
    }

    return imageUrl;
  };

  return (
    <section className={styles.storehouse}>
      <div className="container mx-auto px-4 py-4">
        {user ? (
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:flex-1 flex flex-col h-full">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-3">
                <Input
                  placeholder="Tìm kiếm sản phẩm"
                  className="h-10"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  prefix={<SearchOutlined />}
                />
                <Input
                  type="number"
                  placeholder="Giá bắt đầu"
                  className="h-10"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : undefined)}
                />
                <Input
                  type="number"
                  placeholder="Giá kết thúc"
                  className="h-10"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : undefined)}
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
                      <Card
                        className={`${styles.card} !rounded-[8px] overflow-hidden`}
                        bodyStyle={{
                          padding: "12px",
                          display: 'flex',
                          flexDirection: 'column',
                          height: '100%'
                        }}
                        cover={
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
                        }
                      >
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
                      </Card>
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
            </div>

            <div className="md:w-[400px]">
              {/* <div className="flex gap-3 mb-3">
                <Input
                  type="number"
                  placeholder="Số lượng"
                  className="h-10"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value ? Number(e.target.value) : undefined)}
                  maxLength={2}
                  onKeyDown={(e) => e.key === "Enter" && selectRandomProducts()}
                />
                <Button type="primary" className="h-10 flex-1 !rounded-[4px]" onClick={selectRandomProducts}>
                  Chọn sản phẩm ngẫu nhiên
                </Button>
              </div> */}

              {totalSelectedProducts > 0 && (
                <div className="flex items-center gap-2 text-center my-4 text-sm text-main-gunmetal-blue font-semibold">
                  Tổng sản phẩm đã chọn:
                  <Badge color="blue" count={totalSelectedProducts} />
                </div>
              )}

              <Card
                className="mb-3 !rounded-[8px] overflow-hidden"
                headStyle={{ backgroundColor: 'white', border: '1px solid #eee' }}
              >
                <div>
                  {selectedProducts.length > 0 ? (
                    <ul className="list-group list-group-flush">
                      {selectedProducts.map((product, index) => (
                        <li key={`${product.id}-${index}`} className={`${styles.selectedItem} hover:bg-gray-50 border-b py-2`}>
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
              </Card>

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
    </section>
  )
}

export default Storehouse

