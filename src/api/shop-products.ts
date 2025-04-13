import type { IAddShopProductsRequest, IRemoveShopProductsRequest } from "@/interface/request/shop-products"
import type { IOrderResponse, IShopProductsResponse, IShopStatisticsResponse } from "@/interface/response/shop-products"
import { sendDelete, sendGet, sendPost } from "./axios"

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

export const getMyOrders = async (params: {
  order?: string
  page?: number
  take?: number
  search?: string
  status?: string
  delayStatus?: string
}): Promise<IOrderResponse> => {
  const res = await sendGet("/shop-products/my-orders", params)
  const data: IOrderResponse = res
  return data
}

export const getShopStatistics = async (): Promise<IShopStatisticsResponse> => {
  const res = await sendGet("/shop-products/statistics/shop")
  const data: IShopStatisticsResponse = res
  return data
}

export const payOrders = async (payload: any): Promise<any> => {
  const res = await sendPost("/fedex/pay-orders", payload)
  const data: any = res
  return data
}

