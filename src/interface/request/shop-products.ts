export interface IShopProductItem {
    productId: string
    quantity: number
    price?: number
}

export interface IAddShopProductsRequest {
    productIds: string[]
}

export interface IRemoveShopProductsRequest {
    productIds: string[]
}

export interface IGetMyShopProductsRequest {
  order?: string
  page?: number
  take?: number
  search?: string
  status?: string
  name?: string
  code?: string
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
  active?: boolean
  onlyHaveReview?: boolean
}

export interface IGetMyOrdersRequest {
  order?: string
  page?: number
  take?: number
  search?: string
  status?: string
  delayStatus?: string
}

export interface IGetShopProductsRequest {
  order?: string
  page?: number
  take?: number
  search?: string
  status?: string
  shopId: string
  name?: string
  code?: string
  minPrice?: number
  maxPrice?: number
}

export interface IGetRevenueStatisticsRequest {
  days: number
}

export interface IGetTopSellingProductsRequest {
  limit: number
}

export interface IGetShopProductDetailRequest {
  id: string
}

export interface IGetOrderDetailRequest {
  id: string
}

export interface IGetShopProductReviewsRequest {
  id: string
  order?: string
  page?: number
  take?: number
  search?: string
}