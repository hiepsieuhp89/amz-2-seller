"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSelectedProduct } from "@/app/stores/useSelectedProduct"

// Types
interface Review {
  id: string
  author: string
  rating: number
  date: string
  content: string
}

interface ProductTabsProps {
  defaultActiveTab?: string
}

interface DescriptionTabProps {
  images: string[]
}

interface ReviewsTabProps {
  reviews: Review[]
}

// Description Tab Component
function DescriptionTab({ images }: DescriptionTabProps) {
  const { selectedProduct } = useSelectedProduct()
  return (
    <div className="p-6">
      <div className="mb-4 flex flex-col gap-1">
        <p className="text-sm text-gray-500">Ngày đăng: {new Date(selectedProduct?.createdAt || "").toLocaleDateString()}</p>
        <p className="text-sm text-gray-500">Tồn kho: {selectedProduct?.stock}</p>
      </div>
      <div className="mb-6">
        <p className="text-gray-700">{selectedProduct?.description}</p>
      </div>
      <div className="overflow-hidden">
        {selectedProduct?.imageUrls.map((image, index) => (
          <div key={index} className="w-full mb-4">
            <Image
              src={image }
              alt={`Product description ${index + 1}`}
              width={800}
              height={600}
              className="w-full"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

// Reviews Tab Component
function ReviewsTab({ reviews }: ReviewsTabProps) {
  return (
    <Card className="border-none">
      <CardHeader>
        <h2 className="text-xl font-semibold">Nhận xét ({reviews.length})</h2>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Form thêm nhận xét mới */}
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage src="/avatars/default.jpg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Input 
          className="!rounded-none"
          placeholder="Viết nhận xét của bạn..." />
          <Button className="!rounded-none">Gửi</Button>
        </div>

        {/* Danh sách nhận xét */}
        {reviews.map(review => (
          <div key={review.id} className="flex gap-4">
            <Avatar>
              <AvatarImage src={`/avatars/${review.id}.jpg`} />
              <AvatarFallback>{review.author[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-medium">{review.author}</h4>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>
              <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-lg ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}>
                    ★
                  </span>
                ))}
              </div>
              <p className="text-sm mt-1">{review.content}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

// Main ProductTabs Component
export default function ProductTabs({ defaultActiveTab }: ProductTabsProps) {
  const { selectedProduct } = useSelectedProduct()
  const tabs = [
    {
      id: "tab_default_1",
      label: "Miêu tả",
      content: ProductTabs.createDescriptionTab([
        "https://sg-live-01.slatic.net/p/1d376211c4b98d216490a86eae654d28.png",
        "https://sg-live-01.slatic.net/p/d0de0881014095549d52b4f950b0bcb8.png",
        "https://sg-live-01.slatic.net/p/1e1f0590d92e9b9a69bb48584e54d871.png",
        "https://sg-live-01.slatic.net/p/6caa4819a3886334507dcbe3a827bb86.png",
        "https://sg-live-01.slatic.net/p/9704a9d14fbb1b6ae7d55a4deb4a18fc.png",
        "https://sg-live-01.slatic.net/p/84cd41516bc95343364e4aa9909733c5.png"
      ])
    },
    {
      id: "tab_default_4",
      label: "Nhận xét",
      content: ProductTabs.createReviewsTab([])
    }
  ]

  const [activeTab, setActiveTab] = useState(defaultActiveTab || tabs[0]?.id)

  return (
    <div className="bg-white rounded shadow-sm mb-3">
      <div className="border-b flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`p-3 text-base font-semibold text-gray-700 relative ${
              activeTab === tab.id ? "text-gray-900" : "hover:text-gray-900"
            }`}
            aria-selected={activeTab === tab.id}
            role="tab"
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="pt-0">
        {tabs.map((tab) => (
          <div key={tab.id} role="tabpanel" className={`${activeTab === tab.id ? "block" : "hidden"}`}>
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  )
}

ProductTabs.createDescriptionTab = (images: string[]) => {
  return <DescriptionTab images={images} />
}

ProductTabs.createReviewsTab = (reviews: Review[]) => {
  const sampleReviews: Review[] = [
    {
      id: "1",
      author: "Nguyễn Văn A",
      rating: 5,
      date: "2 giờ trước",
      content: "Sản phẩm rất tốt, giao hàng nhanh chóng!"
    },
    {
      id: "2",
      author: "Trần Thị B",
      rating: 4,
      date: "1 ngày trước",
      content: "Chất lượng đúng như mô tả, sẽ ủng hộ shop dài dài."
    }
  ]
  
  return <ReviewsTab reviews={reviews.length > 0 ? reviews : sampleReviews} />
}

export type { Review }

// Dữ liệu mẫu cho các nhận xét
const comments = [
  {
    id: 1,
    user: {
      name: "Nguyễn Văn A",
      avatar: "/avatars/1.jpg"
    },
    content: "Sản phẩm rất tốt, giao hàng nhanh chóng!",
    timestamp: "2 giờ trước"
  },
  {
    id: 2,
    user: {
      name: "Trần Thị B",
      avatar: "/avatars/2.jpg"
    },
    content: "Chất lượng đúng như mô tả, sẽ ủng hộ shop dài dài.",
    timestamp: "1 ngày trước"
  }
]

export function CommentTab() {
  return (
    <Card className="!rounded-none border-none">
      <CardHeader>
        <h2 className="text-xl font-semibold">Nhận xét ({comments.length})</h2>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Form thêm nhận xét mới */}
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage src="/avatars/default.jpg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Input
          className="!rounded-none"
          placeholder="Viết nhận xét của bạn..." />
          <Button className="!rounded-none">Gửi</Button>
        </div>

        {/* Danh sách nhận xét */}
        {comments.map(comment => (
          <div key={comment.id} className="flex gap-4">
            <Avatar>
              <AvatarImage src={comment.user.avatar} />
              <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-medium">{comment.user.name}</h4>
                <span className="text-sm text-gray-500">{comment.timestamp}</span>
              </div>
              <p className="text-sm mt-1">{comment.content}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

