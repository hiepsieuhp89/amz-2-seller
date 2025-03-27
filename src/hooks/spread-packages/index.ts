import { getSpreadPackages, purchaseSpreadPackage, getSpreadPackageById } from "@/api/spread-packages"
import type { IGetSpreadPackagesRequest, IPurchaseSpreadPackageRequest } from "@/interface/request/spread-packages"
import type { ISpreadPackageResponse, ISpreadPackagesResponse } from "@/interface/response/spread-packages"
import { type UseMutationResult, useMutation, useQuery } from "@tanstack/react-query"

export const useGetSpreadPackages = (params?: IGetSpreadPackagesRequest) => {
  return useQuery<ISpreadPackagesResponse, Error>({
    queryKey: ['spreadPackages', params],
    queryFn: () => getSpreadPackages(params),
  })
}

export const usePurchaseSpreadPackage = (): UseMutationResult<
  ISpreadPackageResponse,
  Error,
  IPurchaseSpreadPackageRequest
> => {
  return useMutation<ISpreadPackageResponse, Error, IPurchaseSpreadPackageRequest>({
    mutationFn: (params: IPurchaseSpreadPackageRequest) => purchaseSpreadPackage(params),
  })
}

export const useGetSpreadPackageById = (id: string) => {
  return useQuery<ISpreadPackageResponse, Error>({
    queryKey: ['spreadPackage', id],
    queryFn: () => getSpreadPackageById(id),
  })
} 