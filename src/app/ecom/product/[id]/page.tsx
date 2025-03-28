"use client"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button, Rate, Spin, Tabs, Image as AntImage } from "antd"
import Image from "next/image"
import axios from "axios"
import { IProduct } from "@/interface/response/products"

export default function ProductDetail() {
  const params = useParams()
  const router = useRouter()
  const productId = params.id as string
  
  const [product, setProduct] = useState<IProduct | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  
  useEffect(() => {
    // In a real app, you would call your API to get product details
    // For now, we're simulating API response
    const fetchProduct = async () => {
      try {
        // Replace with your actual API call
        const response = await axios.get(`/api/products/${productId}`)
        setProduct(response.data)
      } catch (error) {
        console.error("Failed to fetch product:", error)
        // For demo, create a mock product
        setProduct({
          id: productId,
          name: "Sample Product",
          description: "This is a sample product description. In a real application, this would be fetched from the API.",
          price: 99.99,
          image: "/images/product-placeholder.png",
          category: "Sample Category",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        } as unknown as IProduct)
      } finally {
        setLoading(false)
      }
    }
    
    fetchProduct()
  }, [productId])
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    )
  }
  
  if (!product) {
    return (
      <div className="container mx-auto p-4">
        <p>Sản phẩm không tồn tại hoặc đã bị xóa.</p>
        <Button onClick={() => router.back()}>Quay lại</Button>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen">
      {/* Amazon-like Header */}
      <header className="bg-[#131921] text-white p-4">
        <div className="container mx-auto flex items-center">
          <Image 
            src="/images/amazon-logo.png" 
            alt="Amazon" 
            width={100} 
            height={30} 
            className="cursor-pointer"
            onClick={() => router.push('/')}
          />
          <span className="ml-4 text-xl font-bold">Chi tiết sản phẩm</span>
        </div>
      </header>
      
      <main className="container mx-auto py-6 px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Image */}
          <div className="md:w-2/5">
            <div className="sticky top-4">
              <AntImage
                src={product.image || "/images/product-placeholder.png"}
                alt={product.name}
                width="100%"
              />
            </div>
          </div>
          
          {/* Product Info */}
          <div className="md:w-3/5">
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            
            <div className="mb-4 flex items-center">
              <Rate disabled defaultValue={4.5} allowHalf />
              <span className="ml-2 text-blue-500 cursor-pointer">
                568 đánh giá
              </span>
            </div>
            
            <div className="border-b border-gray-200 pb-4 mb-4">
              <div className="text-3xl text-[#B12704] font-medium">
                ${Number(product.price).toFixed(2)}
              </div>
              <div className="text-sm text-gray-500">
                Giá đã bao gồm VAT & Phí vận chuyển
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="font-bold mb-2">Mô tả sản phẩm:</h3>
              <p className="text-gray-700">{product.description}</p>
            </div>
            
            <div className="mb-4">
              <div className="mb-2">
                <span className="font-medium">Số lượng: </span>
                <select 
                  className="border rounded-md p-1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
              
              <Button 
                type="primary" 
                size="large" 
                className="bg-[#FFD814] hover:bg-[#F7CA00] text-black border-0 rounded-full h-10 mb-2 w-full"
              >
                Thêm vào giỏ hàng
              </Button>
              
              <Button 
                size="large" 
                className="bg-[#FFA41C] hover:bg-[#FA8900] text-black border-0 rounded-full h-10 w-full"
              >
                Mua ngay
              </Button>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <div className="mb-2">
                <span className="font-medium">Danh mục: </span>
                <span className="text-blue-500 cursor-pointer">{product.category}</span>
              </div>
              <div>
                <span className="font-medium">Mã sản phẩm: </span>
                <span>{product.id}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Details Tabs */}
        <div className="mt-8">
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Chi tiết sản phẩm" key="1">
              <div className="p-4">
                <h3 className="text-xl font-bold mb-4">Thông số kỹ thuật</h3>
                <table className="w-full border">
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2 font-medium bg-gray-50 w-1/3">Tên sản phẩm</td>
                      <td className="p-2">{product.name}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium bg-gray-50">Danh mục</td>
                      <td className="p-2">{product.category}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium bg-gray-50">Thương hiệu</td>
                      <td className="p-2">Amazon Basics</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium bg-gray-50">Xuất xứ</td>
                      <td className="p-2">USA</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-medium bg-gray-50">Bảo hành</td>
                      <td className="p-2">12 tháng</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Đánh giá (568)" key="2">
              <div className="p-4">
                <h3 className="text-xl font-bold mb-4">Đánh giá từ khách hàng</h3>
                {/* Reviews would go here */}
                <p>Tính năng đang được phát triển.</p>
              </div>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-[#131921] text-white p-8 mt-8">
        <div className="container mx-auto text-center">
          <p>© 2023 Amazon Clone. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  )
} 