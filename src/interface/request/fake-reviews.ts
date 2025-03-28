export interface IGetUserOrdersRequest {
  userId: string
  status?: string
}

export interface ICreateFakeReviewRequest {
  userId: string
  orderId: string
  rating: number
  content: string
  images: string[]
} 