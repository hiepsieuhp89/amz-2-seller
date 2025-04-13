"use client"

import type React from "react"
import { useState } from "react"
import ReviewsTable from "./ReviewsTable"

// Mock data - đã cập nhật thành mảng rỗng
const mockReviews: any[] = [] 

const SellerReviews = () => {
  const [filteredReviews, setFilteredReviews] = useState(mockReviews)

  const handleFilterChange = (value: string) => {
    if (!value) {
      setFilteredReviews(mockReviews)
      return
    }

    const ratingValue = parseInt(value)
    const filtered = mockReviews.filter((review) => review.rating === ratingValue)
    setFilteredReviews(filtered)
  }

  const handleSearch = (value: string) => {
    if (!value) {
      setFilteredReviews(mockReviews)
      return
    }

    const filtered = mockReviews.filter(
      (review) => 
        review.product.toLowerCase().includes(value.toLowerCase()) ||
        review.customer.toLowerCase().includes(value.toLowerCase())
    )
    setFilteredReviews(filtered)
  }

  return (
    <div className="pt-2">
      <ReviewsTable data={filteredReviews} onFilterChange={handleFilterChange} onSearch={handleSearch} />
    </div>
  )
}

export default SellerReviews
