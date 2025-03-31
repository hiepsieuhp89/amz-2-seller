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
import { Input } from "@/components/ui/input"
import { useSelectedProduct } from "@/app/stores/useSelectedProduct"

export default function ProductDetail() {
  const { selectedProduct } = useSelectedProduct()
  const [quantity, setQuantity] = useState<number>(1)
  const [currentImage, setCurrentImage] = useState<number>(0)
  const price = parseFloat(selectedProduct?.price || "0")
  const totalPrice = price * quantity
  const availableQuantity = selectedProduct?.stock || 0

  const imgContainerRef = useRef<HTMLDivElement>(null)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })

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
    <div className="w-full py-6 px-4 md:px-6 lg:px-[104px] bg-[#E3E6E6] flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1500px] bg-white p-4">
        <div className="sticky top-20">
          <div className="product-gallery flex flex-row-reverse gap-4">
            <div
              ref={imgContainerRef}
              className="relative w-full h-[500px] overflow-hidden rounded-md cursor-zoom-in border border-gray-200"
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
                  src={selectedProduct?.imageUrls[currentImage] || ""}
                  alt="Product image"
                  fill
                  className="object-contain p-4"
                  priority
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 w-20">
              {selectedProduct?.imageUrls.map((img, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentImage(index)}
                  className={cn(
                    "relative w-full h-20 cursor-pointer overflow-hidden rounded-md border bg-white",
                    currentImage === index
                      ? "ring-1 ring-main-golden-orange border-main-golden-orange"
                      : "border-gray-200 hover:border-gray-300",
                  )}
                >
                  <Image
                    src={img }
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-contain p-1"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="product-info space-y-6">
          <div>
            <h1 className="text-xl font-semibold">{selectedProduct?.name}</h1>

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
              Ước tính thời gian vận chuyển: <span className="font-medium text-main-golden-orange">5 ngày</span>
            </p>
          </div>
          <div className="border-t border-gray-200 my-6"></div>
          <div className="flex items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground flex flex-col">
              <span>Được bán bởi</span>
              <span className="font-medium">Ẩn danh</span>
            </div>
            <Button variant="outline" className="ml-4 px-3 py-1 font-semibold border-main-golden-orange !text-main-golden-orange hover:bg-main-golden-orange/30">Nhắn tin với người bán</Button>
          </div>
          <div className="border-t border-gray-200 my-6"></div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-sm text-muted-foreground">Giá bán:</div>
            <div className="col-span-2">
              <span className="text-2xl font-bold text-green-500">${price.toFixed(2)}</span>
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
              <span className="text-2xl font-bold text-green-500">${totalPrice.toFixed(2)}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                className="h-11 gap-2 bg-muted hover:bg-muted/80">
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
            <Button variant="link" className="h-auto p-0 text-muted-foreground text-wrap break-words">
              <Icon path={mdiHeart} size={0.8} className="mr-2" />
              Thêm vào danh sách yêu thích
            </Button>
            <Button variant="link" className="h-auto p-0 text-muted-foreground text-wrap break-words">
              <Icon path={mdiShareVariant} size={0.8} className="mr-2" />
              Thêm vào để so sánh
            </Button>
          </div>
          <div className="border-t border-gray-200 my-6"></div>
          <div className="flex flex-col">
            <div className="text-sm text-muted-foreground">Hoàn tiền:</div>
            <div className="mt-6 bg-green-50 p-4 rounded-md">
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
        </div>
      </div>
    </div>
  )
}

