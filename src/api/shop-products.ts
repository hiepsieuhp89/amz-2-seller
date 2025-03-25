import type { IAddShopProductsRequest, IGetShopProductsRequest, IRemoveShopProductsRequest } from "@/interface/request/shop-products"
import type { IShopProductsResponse } from "@/interface/response/shop-products"
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
