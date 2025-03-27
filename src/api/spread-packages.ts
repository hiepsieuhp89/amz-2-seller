import type { IGetSpreadPackagesRequest, IPurchaseSpreadPackageRequest } from "@/interface/request/spread-packages"
import type { ISpreadPackageResponse, ISpreadPackagesResponse } from "@/interface/response/spread-packages"
import { sendGet, sendPost } from "./axios"

export const getSpreadPackages = async (
  params?: IGetSpreadPackagesRequest
): Promise<ISpreadPackagesResponse> => {
  const res = await sendGet("/spread-packages", params)
  const data: ISpreadPackagesResponse = res
  return data
}

export const purchaseSpreadPackage = async (
  payload: IPurchaseSpreadPackageRequest
): Promise<ISpreadPackageResponse> => {
  const res = await sendPost("/spread-packages/purchase", payload)
  const data: ISpreadPackageResponse = res
  return data
}

export const getSpreadPackageById = async (
  id: string
): Promise<ISpreadPackageResponse> => {
  const res = await sendGet(`/spread-packages/${id}`)
  const data: ISpreadPackageResponse = res
  return data
} 