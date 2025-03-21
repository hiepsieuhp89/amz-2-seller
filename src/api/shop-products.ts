import type { IAddShopProductsRequest, IRemoveShopProductsRequest } from "@/interface/request/shop-products"
import type { IShopProductsResponse } from "@/interface/response/shop-products"
import { sendDelete, sendPost } from "./axios"

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

