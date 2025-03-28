import type { IShopProduct } from "./shop-products"

export interface IFakeReviewResponse {
  message: string
  statusCode: number
  data: {
    success: boolean
    orders?: IShopProduct[]
    review?: {
      id: string
      userId: string
      orderId: string
      rating: number
      content: string
      images: string[]
      createdAt: string
    }
  }
} 