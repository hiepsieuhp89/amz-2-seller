import type { IGetSellerPackagesRequest, IPurchaseSellerPackageRequest } from "@/interface/request/seller-packages"
import type { ISellerPackageResponse, ISellerPackagesResponse } from "@/interface/response/seller-packages"
import { sendGet, sendPost } from "./axios"

export const getSellerPackages = async (
  params?: IGetSellerPackagesRequest
): Promise<ISellerPackagesResponse> => {
  const res = await sendGet("/seller-packages", params)
  const data: ISellerPackagesResponse = res
  return data
}

export const purchaseSellerPackage = async (
  payload: IPurchaseSellerPackageRequest
): Promise<ISellerPackageResponse> => {
  const res = await sendPost("/seller-packages/purchase", payload)
  const data: ISellerPackageResponse = res
  return data
}

export const getSellerPackageById = async (
  id: string
): Promise<ISellerPackageResponse> => {
  const res = await sendGet(`/seller-packages/${id}`)
  const data: ISellerPackageResponse = res
  return data
} 