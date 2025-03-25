import { addShopProducts, removeShopProducts, getMyShopProducts, getMyOrders, getAllShopProducts } from "@/api/shop-products"
import type { IAddShopProductsRequest, IGetShopProductsRequest, IRemoveShopProductsRequest } from "@/interface/request/shop-products"
import type { IShopProductsResponse } from "@/interface/response/shop-products"
import { type UseMutationResult, useMutation, useQueryClient, useQuery } from "@tanstack/react-query"

export const useAddShopProducts = (): UseMutationResult<IShopProductsResponse, Error, IAddShopProductsRequest> => {
  const queryClient = useQueryClient()

  return useMutation<IShopProductsResponse, Error, IAddShopProductsRequest>({
    mutationFn: (params: IAddShopProductsRequest) => addShopProducts(params),
    onSuccess: (result: IShopProductsResponse) => {
      queryClient.invalidateQueries({
        queryKey: ["shopProducts"],
      })
      return result
    },
    onError: (result) => {
      return result
    },
  })
}

export const useRemoveShopProducts = (): UseMutationResult<
  IShopProductsResponse,
  Error,
  IRemoveShopProductsRequest
> => {
  const queryClient = useQueryClient()

  return useMutation<IShopProductsResponse, Error, IRemoveShopProductsRequest>({
    mutationFn: (params: IRemoveShopProductsRequest) => removeShopProducts(params),
    onSuccess: (result: IShopProductsResponse) => {
      queryClient.invalidateQueries({
        queryKey: ["shopProducts"],
      })
      return result
    },
    onError: (result) => {
      return result
    },
  })
}

export const useGetMyShopProducts = (params: {
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
}) => {
  return useQuery({
    queryKey: ['myShopProducts', params],
    queryFn: () => getMyShopProducts(params),
  })
}

export const useGetMyOrders = (params: {
  order?: string
  page?: number
  take?: number
  search?: string
  status?: string
  delayStatus?: string
}) => {
  return useQuery({
    queryKey: ['myOrders', params],
    queryFn: () => getMyOrders(params),
  })
}

// Get all shop products
export const useGetAllShopProducts = (params?: IGetShopProductsRequest) => {
  return useQuery<IShopProductsResponse, Error>({
    queryKey: ['shop-products', params],
    queryFn: () => getAllShopProducts(params),
  })
}
