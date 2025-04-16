import type { IAddShopProductsRequest, IGetShopProductsRequest, IRemoveShopProductsRequest } from "@/interface/request/shop-products"
import type { IShopProductsResponse, IShopProductReviewsResponse, IOrderDetailsResponse } from "@/interface/response/shop-products"
import { sendDelete, sendPost, sendGet } from "./axios"

export const addShopProducts = async (payload: IAddShopProductsRequest): Promise<IShopProductsResponse> => {
  const res = await sendPost("/shop-products/add", payload)
  const data: IShopProductsResponse = res
  return data
}

export const removeShopProducts = async (payload: IRemoveShopProductsRequest): Promise<IShopProductsResponse> => {
  const res = await sendDelete("/shop-products/remove", payload)
  const data: IShopProductsResponse = res
  return data
}

export const getMyShopProducts = async (params: {
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
}): Promise<IShopProductsResponse> => {
  const res = await sendGet("/shop-products/my-shop-products", params)
  const data: IShopProductsResponse = res
  return data
}

export const getMyOrders = async (params: {
  order?: string
  page?: number
  take?: number
  search?: string
  status?: string
  delayStatus?: string
  orderTimeGte?: string
  orderTimeLte?: string
}): Promise<IShopProductsResponse> => {
  const res = await sendGet("/shop-products/my-orders", params)
  const data: IShopProductsResponse = res
  return data
}

export const getAllShopProducts = async (
  params?: IGetShopProductsRequest
): Promise<IShopProductsResponse> => {
  const res = await sendGet("/products/shop", params)
  const data: IShopProductsResponse = res
  return data
}

export const getShopStatistics = async (): Promise<{
  totalOrders: number
  totalRevenue: number
  totalProfit: number
  todayOrders: number
  todayRevenue: number
  todayProfit: number
}> => {
  const res = await sendGet("/shop-products/statistics/shop")
  return res
}

export const getRevenueStatistics = async (params: {
  days: number
}): Promise<any> => {
  const res = await sendGet("/shop-products/statistics/revenue", params)
  return res
}

export const getShopDetailStatistics = async (): Promise<{
  totalProducts: number
  activeProducts: number
  totalProfit: number
  totalOrders: number
  totalSales: number
  totalViews: number
  sellerPackage: Record<string, unknown>
  pendingOrders: number
}> => {
  const res = await sendGet("/shop-products/statistics/detail")
  return res
}

export const getTopSellingProducts = async (params: {
  limit: number
}): Promise<
  {
    product: Record<string, unknown>
    totalSold: number
    revenue: number
    profit: number
  }[]
> => {
  const res = await sendGet("/shop-products/statistics/top-selling", params)
  return res
}

export const getShopProductDetail = async (id: string): Promise<IShopProductsResponse> => {
  const res = await sendGet(`/shop-products/my-shop-products/${id}`)
  const data: IShopProductsResponse = res
  return data
}

export const getOrderDetail = async (id: string): Promise<IOrderDetailsResponse> => {
  const res = await sendGet(`/shop-products/my-orders/${id}`)
  const data: IOrderDetailsResponse = res
  return data
}

export const getShopProductReviews = async (
  productId: string,
  params?: {
    page?: number;
    take?: number;
    sort?: string;
  }
): Promise<any> => {
  const queryParams = {
    ...params,
    productId
  };
  const res = await sendGet(`/product-reviews`, queryParams);
  return res;
};
