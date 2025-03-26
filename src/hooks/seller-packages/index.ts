import { getSellerPackages, purchaseSellerPackage, getSellerPackageById } from "@/api/seller-packages"
import type { IGetSellerPackagesRequest, IPurchaseSellerPackageRequest } from "@/interface/request/seller-packages"
import type { ISellerPackageResponse, ISellerPackagesResponse } from "@/interface/response/seller-packages"
import { type UseMutationResult, useMutation, useQuery } from "@tanstack/react-query"

export const useGetSellerPackages = (params?: IGetSellerPackagesRequest) => {
  return useQuery<ISellerPackagesResponse, Error>({
    queryKey: ['sellerPackages', params],
    queryFn: () => getSellerPackages(params),
  })
}

export const usePurchaseSellerPackage = (): UseMutationResult<
  ISellerPackageResponse,
  Error,
  IPurchaseSellerPackageRequest
> => {
  return useMutation<ISellerPackageResponse, Error, IPurchaseSellerPackageRequest>({
    mutationFn: (params: IPurchaseSellerPackageRequest) => purchaseSellerPackage(params),
  })
}

export const useGetSellerPackageById = (id: string) => {
  return useQuery<ISellerPackageResponse, Error>({
    queryKey: ['sellerPackage', id],
    queryFn: () => getSellerPackageById(id),
  })
} 