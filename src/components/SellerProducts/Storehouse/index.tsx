"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Input, Button, Card, Badge, Empty } from "antd"
import { PlusOutlined, SearchOutlined } from "@ant-design/icons"
import styles from "./storehouse.module.scss"
import { mockData } from "./mockData"

interface Product {
  id: string
  name: string
  image: string
  stock: number
  sellingPrice: number
  purchasePrice: number
  profit: number
}

const Storehouse: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockData)
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([])
  const [keyword, setKeyword] = useState("")
  const [minPrice, setMinPrice] = useState<number | undefined>()
  const [maxPrice, setMaxPrice] = useState<number | undefined>()
  const [quantity, setQuantity] = useState<number | undefined>()
  const [totalSelectedProducts, setTotalSelectedProducts] = useState(0)
  const [originalProducts, setOriginalProducts] = useState<Product[]>([])

  useEffect(() => {
    setProducts(mockData)
    setOriginalProducts(mockData)
    setFilteredProducts(mockData)
  }, [])

  const filterProducts = () => {
    if (keyword || minPrice !== undefined || maxPrice !== undefined) {
      let filtered = [...originalProducts]

      if (keyword) {
        filtered = filtered.filter((product) => product.name.toLowerCase().includes(keyword.toLowerCase()))
      }

      if (minPrice !== undefined) {
        filtered = filtered.filter((product) => product.sellingPrice >= minPrice)
      }

      if (maxPrice !== undefined) {
        filtered = filtered.filter((product) => product.sellingPrice <= maxPrice)
      }

      setFilteredProducts(filtered)
    } else {
      setFilteredProducts(originalProducts)
    }
  }

  useEffect(() => {
    if (originalProducts.length > 0) {
      filterProducts()
    }
  }, [keyword, minPrice, maxPrice, originalProducts])

  const addProduct = (product: Product) => {
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
    // This would typically send the selected products to an API
    console.log("Adding products:", selectedProducts)
    // Reset selection after adding
    setSelectedProducts([])
    setTotalSelectedProducts(0)
  }

  return (
    <section className={styles.storehouse}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[390px] overflow-y-auto">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div key={product.id} className={styles.productCard}>
                    <Card
                      className={`${styles.card} !rounded-[4px]`}
                      bodyStyle={{ padding: "8px 12px" }}
                      cover={
                        <div className={styles.imageContainer}>
                          <Badge.Ribbon
                            text={`Trong kho: ${product.stock}`}
                            color="green"
                            className={styles.stockBadge}
                            placement="start"
                          >
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className={styles.productImage}
                            />
                          </Badge.Ribbon>
                        </div>
                      }
                    >
                      <div className={styles.productName}>{product.name}</div>
                      <div className={styles.priceInfo}>
                        <span>
                          Giá bán: <span className="text-success">{product.sellingPrice.toFixed(2)}</span>
                        </span>
                      </div>
                      <div className={styles.priceInfo}>
                        <span>
                          Giá nhập: <span className="text-warning">{product.purchasePrice.toFixed(2)}</span>
                        </span>
                      </div>
                      <div className={styles.priceInfo}>
                        <span>
                          Lợi nhuận: <span className="text-danger font-bold">${product.profit.toFixed(2)}</span>
                        </span>
                      </div>
                      <div className={styles.addButton} onClick={() => addProduct(product)}>
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
                <Button type="primary" ghost onClick={() => console.log("Load more")}>
                  Tải thêm
                </Button>
              </div>
            )}
          </div>

          <div className="md:w-[400px]">
            <div className="flex gap-3 mb-3">
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
            </div>

            {totalSelectedProducts > 0 && (
              <div className="text-center my-3">
                <h5>
                  Tổng sản phẩm đã chọn: <strong>{totalSelectedProducts}</strong>
                </h5>
              </div>
            )}

            <Card className="mb-3 !rounded-[4px] overflow-hidden">
              <div className={styles.selectedProducts}>
                {selectedProducts.length > 0 ? (
                  <ul className="list-group list-group-flush">
                    {selectedProducts.map((product, index) => (
                      <li key={`${product.id}-${index}`} className={styles.selectedItem}>
                        <div className="flex items-center">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-12 h-12 object-cover mr-2"
                          />
                          <div className="flex-1">
                            <div className="text-sm font-medium truncate">{product.name}</div>
                            <div className="text-xs">
                              <span className="text-success">${product.sellingPrice.toFixed(2)}</span>
                            </div>
                          </div>
                          <Button type="text" danger onClick={() => removeProduct(index)}>
                            Xóa
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Empty description="Chưa có sản phẩm nào được chọn" />
                )}
              </div>
            </Card>

            <Button
              className="!rounded-[4px] !h-11 mt-4"
              type="primary"
              block
              size="large"
              onClick={addAllSelectedProducts}
              disabled={selectedProducts.length === 0}
            >
              Thêm sản phẩm
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Storehouse

