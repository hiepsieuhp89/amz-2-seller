"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import Icon from "@mdi/react"
import {
  mdiHeart,
  mdiShareVariant,
  mdiCartOutline,
  mdiCreditCardOutline,
  mdiMinus,
  mdiPlus,
  mdiCheckCircle,
  mdiEmailOutline,
  mdiTwitter,
  mdiFacebook,
  mdiLinkedin,
  mdiWhatsapp,
} from "@mdi/js"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

// Product images
const productImages = [
  "https://m.media-amazon.com/images/I/51FANKJajxL._AC_SL1500_.jpg",
  "https://m.media-amazon.com/images/I/41oWqbjbYQL._AC_SL1500_.jpg",
  "https://m.media-amazon.com/images/I/41mUAj5oWCL._AC_SL1500_.jpg",
]

export default function ProductDetail() {
  const [quantity, setQuantity] = useState<number>(1)
  const [currentImage, setCurrentImage] = useState<number>(0)
  const price = 6.8
  const totalPrice = price * quantity
  const availableQuantity = 4999

  // References and state for the zoom functionality
  const imgContainerRef = useRef<HTMLDivElement>(null)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })

  // Handle zoom functionality
  const handleMouseEnter = () => {
    setIsZoomed(true)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgContainerRef.current) return

    const { left, top, width, height } = imgContainerRef.current.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100

    setZoomPosition({ x, y })
  }

  const handleMouseLeave = () => {
    setIsZoomed(false)
  }

  return (
    <div className="w-full py-6 px-4 md:px-6 lg:px-[104px] flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1500px]">
        {/* Product Image Gallery */}
        <div className="sticky top-20">
          <div className="product-gallery">
            <div
              ref={imgContainerRef}
              className="relative w-full h-[500px] overflow-hidden rounded-md cursor-zoom-in"
              onMouseEnter={handleMouseEnter}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className={cn(
                  "absolute w-full h-full transition-transform duration-200 bg-white",
                  isZoomed && "scale-150",
                )}
                style={
                  isZoomed
                    ? {
                        transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      }
                    : {}
                }
              >
                <Image
                  src={productImages[currentImage] || "/placeholder.svg"}
                  alt="Product image"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-4">
              {productImages.map((img, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentImage(index)}
                  className={cn(
                    "relative w-full h-20 cursor-pointer overflow-hidden rounded-md border bg-white p-1",
                    currentImage === index && "ring-1 ring-main-golden-orange",
                  )}
                >
                  <Image
                    src={img || "/placeholder.svg"}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-contain"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="product-info space-y-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">NTKY TOPI BIRU GADING</h1>

            <div className="mt-2 flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 fill-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">(0 Nhận xét)</span>
            </div>

            <p className="mt-2 text-sm text-muted-foreground">
              Ước tính thời gian vận chuyển: <span className="font-medium text-foreground">5 ngày</span>
            </p>
          </div>

          <div className="border-t border-gray-200 my-6"></div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-sm text-muted-foreground">Được bán bởi</div>
            <div className="col-span-2">
              <span className="font-medium">Phạm Văn sư</span>
              <Badge variant="outline" className="ml-4 px-3 py-1 font-normal">
                Người bán tin nhận
              </Badge>
            </div>
          </div>

          <div className="border-t border-gray-200 my-6"></div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-sm text-muted-foreground">Giá bán:</div>
            <div className="col-span-2">
              <span className="text-2xl font-bold ">${price.toFixed(2)}</span>
              <span className="ml-1 text-sm text-muted-foreground">/pc</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-sm text-muted-foreground">Định lượng:</div>
            <div className="col-span-2 flex items-center gap-4">
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-r-none"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Icon path={mdiMinus} size={0.8} />
                </Button>
                <Input
                  type="number"
                  min={1}
                  max={availableQuantity}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="h-9 w-12 rounded-none border-x-0 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-l-none"
                  onClick={() => setQuantity(Math.min(availableQuantity, quantity + 1))}
                >
                  <Icon path={mdiPlus} size={0.8} />
                </Button>
              </div>
              <span className="text-sm text-muted-foreground">({availableQuantity} có sẵn)</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-sm text-muted-foreground">Tổng giá:</div>
            <div className="col-span-2">
              <span className="text-2xl font-bold ">${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button className="h-11 gap-2 bg-muted text-foreground hover:bg-muted/80">
                <Icon path={mdiCartOutline} size={0.8} />
                Thêm vào giỏ hàng
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button className="h-11 gap-2 bg-primary -foreground">
                <Icon path={mdiCreditCardOutline} size={0.8} />
                Mua ngay
              </Button>
            </motion.div>
          </div>

          <div className="flex gap-4">
            <Button variant="link" className="h-auto p-0 text-muted-foreground">
              <Icon path={mdiHeart} size={0.8} className="mr-2" />
              Thêm vào danh sách yêu thích
            </Button>
            <Button variant="link" className="h-auto p-0 text-muted-foreground">
              <Icon path={mdiShareVariant} size={0.8} className="mr-2" />
              Thêm vào để so sánh
            </Button>
          </div>

          <div className="border-t border-gray-200 my-6"></div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-sm text-muted-foreground">Hoàn tiền:</div>
            <div className="col-span-2 flex items-center gap-2">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  <Icon path={mdiCheckCircle} size={1} className="text-green-600" />
                </div>
                <div>
                  <p className="font-medium">30 Days Cash Back Guarantee</p>
                </div>
              </div>
              <Button variant="link" className="ml-auto h-auto p-0">
                Xem Chính sách
              </Button>
            </div>
          </div>

          <div className="border-t border-gray-200 my-6"></div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-sm text-muted-foreground">Chia sẻ:</div>
            <div className="col-span-2 flex gap-2">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Icon path={mdiEmailOutline} size={0.8} />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="outline" size="icon" className="rounded-full text-[#1DA1F2]">
                  <Icon path={mdiTwitter} size={0.8} />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="outline" size="icon" className="rounded-full text-[#4267B2]">
                  <Icon path={mdiFacebook} size={0.8} />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="outline" size="icon" className="rounded-full text-[#0077B5]">
                  <Icon path={mdiLinkedin} size={0.8} />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="outline" size="icon" className="rounded-full text-[#25D366]">
                  <Icon path={mdiWhatsapp} size={0.8} />
                </Button>
              </motion.div>
            </div>
          </div>

          <div className="mt-6 bg-green-50 p-4 rounded-lg ">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <Icon path={mdiCheckCircle} size={1} className="text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Hoàn tiền đảm bảo</p>
                <p className="text-sm text-muted-foreground">30 Days Cash Back Guarantee</p>
              </div>
              <Button variant="link" className="h-auto p-0">
                Xem Chính sách
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

