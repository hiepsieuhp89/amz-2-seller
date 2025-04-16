"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSelectedProduct } from "@/stores/useSelectedProduct"
import { useGetShopProductReviews } from "@/hooks/shop-products"

// Types
interface ProductTabsProps {
  defaultActiveTab?: string
}

interface DescriptionTabProps {
  images: string[]
}

// Description Tab Component
function DescriptionTab({ images }: DescriptionTabProps) {
  const { selectedProduct } = useSelectedProduct()
  return (
    <div className="p-6">
      {/* Product Description */}
      {selectedProduct?.description && (
        <>
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Mô tả sản phẩm</h2>
            <div
              className="text-sm text-gray-700 prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: selectedProduct.description }}
            />
          </div>
          <div className="border-t border-gray-200 my-6"></div>
        </>
      )}
    </div>
  )
}

// Reviews Tab Component
function ReviewsTab() {
  const { selectedProduct } = useSelectedProduct()
  const reviewsQuery = useGetShopProductReviews(selectedProduct?.id as string) as any
  const { 
    data: reviewsData, 
    isLoading,
    params,
    handlePageChange,
    handlePageSizeChange
  } = reviewsQuery
  
  console.log("reviewsData", reviewsData)
  
  // Get reviews from the API response
  const reviews = reviewsData?.data?.data || []
  const totalReviews = reviewsData?.data?.total || 0
  const totalPages = Math.ceil(totalReviews / (params?.take || 10))
  
  // Calculate which page numbers to show
  const currentPage = params?.page || 1
  const getVisiblePages = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const range = [];
    const rangeWithDots = [];
    let l;
    
    for (let i = 1; i <= Math.min(totalPages, 7); i++) {
      range.push(i);
    }
    
    if (totalPages <= 7) {
      // If there are <= 7 pages, show all pages
      return range;
    } else {
      // Determine which page numbers to show
      if (currentPage > delta + 1) {
        rangeWithDots.push(1);
        if (currentPage > delta + 2) {
          rangeWithDots.push('...');
        }
      }
      
      const start = Math.max(1, currentPage - delta);
      const end = Math.min(totalPages, currentPage + delta);
      
      for (let i = start; i <= end; i++) {
        rangeWithDots.push(i);
      }
      
      if (currentPage < totalPages - delta) {
        if (currentPage < totalPages - delta - 1) {
          rangeWithDots.push('...');
        }
        rangeWithDots.push(totalPages);
      }
      
      return rangeWithDots;
    }
  };
  
  const visiblePages = getVisiblePages();
  
  return (
    <Card className="border-none">
      <CardHeader className="pb-3">
        <h2 className="text-xl font-semibold !text-main-charcoal-blue">Nhận xét ({totalReviews})</h2>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Form thêm nhận xét mới */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
          <div className="flex gap-3 mb-3 items-center">
            <Avatar className="h-10 w-10 border border-gray-200">
              <AvatarImage src="/images/default-avatar.jpg" />
              <AvatarFallback className="bg-primary/20 text-primary">KH</AvatarFallback>
            </Avatar>
            <div>
              <span className="text-sm font-medium">Viết đánh giá của bạn</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <button 
                    key={i} 
                    type="button"
                    className="text-xl text-gray-300 hover:text-yellow-400"
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <Input
              className="!rounded-md border-gray-300 bg-white"
              placeholder="Viết nhận xét của bạn..." />
            <div className="flex justify-between">
              <div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs h-8"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                  Thêm ảnh
                </Button>
              </div>
              <Button 
                className="!rounded-md" 
                size="sm"
              >
                Gửi đánh giá
              </Button>
            </div>
          </div>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex justify-center py-6">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        )}

        {/* Danh sách nhận xét */}
        {!isLoading && (!reviews || reviews.length === 0) && (
          <div className="text-center py-6 text-gray-500">
            Chưa có nhận xét nào cho sản phẩm này
          </div>
        )}
        
        {reviews && reviews.map((review: any) => (
          <div key={review.id} className="border-b border-gray-100 pb-6 mb-6 last:border-0 last:mb-0 last:pb-0">
            <div className="flex gap-4">
              <Avatar className="h-12 w-12 border border-gray-200">
                {review.user?.logoUrl ? (
                  <AvatarImage src={review.user.logoUrl} alt={review.user?.fullName || ""} />
                ) : (
                  <AvatarFallback className="bg-blue-100 text-blue-600 font-medium">
                    {review.user?.fullName
                      ? `${review.user.fullName.split(' ')[0][0]}${review.user.fullName.split(' ').pop()?.[0] || ''}`
                      : "UN"}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <h4 className="font-medium text-gray-900">{review.user?.fullName || "Người dùng ẩn danh"}</h4>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 hidden sm:inline"> • </span>
                    <span className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString('vi-VN', {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
                
                <div className="flex mb-2 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-lg ${i < review.rating ? "text-yellow-400" : "text-gray-200"}`}>
                      ★
                    </span>
                  ))}
                </div>
                
                <p className="text-sm text-gray-700 mt-2 mb-3">{review.content}</p>
                
                {/* Review images */}
                {review.images && review.images.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {review.images.map((image: string, idx: number) => (
                      <div key={idx} className="w-16 h-16 md:w-20 md:h-20 overflow-hidden rounded border border-gray-200">
                        <img 
                          src={image} 
                          alt={`Hình ảnh đánh giá ${idx + 1}`} 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-200" 
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6">
            <div className="flex space-x-1">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handlePageChange?.(Math.max(1, (params?.page || 1) - 1))}
                disabled={(params?.page || 1) === 1}
              >
                Trước
              </Button>
              
              {visiblePages.map((page, i) => 
                page === '...' ? (
                  <span key={`ellipsis-${i}`} className="px-3 py-1">...</span>
                ) : (
                  <Button
                    key={`page-${page}`}
                    variant={params?.page === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange?.(page as number)}
                  >
                    {page}
                  </Button>
                )
              )}
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handlePageChange?.(Math.min(totalPages, (params?.page || 1) + 1))}
                disabled={(params?.page || 1) === totalPages}
              >
                Sau
              </Button>
            </div>
          </div>
        )}

        {/* Items per page selector */}
        {totalReviews > 0 && (
          <div className="flex justify-end items-center space-x-2 text-sm">
            <span>Hiển thị</span>
            <select 
              className="border rounded px-2 py-1"
              value={params?.take || 10}
              onChange={(e) => handlePageSizeChange?.(Number(e.target.value))}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
            <span>nhận xét mỗi trang</span>
          </div>
        )}
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
      content: <ReviewsTab />
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
            className={`p-3 text-base font-semibold text-gray-700 relative ${activeTab === tab.id ? "text-gray-900" : "hover:text-gray-900"
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

