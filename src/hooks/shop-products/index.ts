import { addShopProducts, removeShopProducts, getMyOrders, getShopStatistics, payOrders } from "@/api/shop-products"
import type { IAddShopProductsRequest, IRemoveShopProductsRequest } from "@/interface/request/shop-products"
import type { IShopProductsResponse, IShopStatisticsResponse } from "@/interface/response/shop-products"
import { type UseMutationResult, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

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
export const useGetMyOrders = (params: {
  order?: string
  page?: number
  take?: number
  search?: string
  status?: string
  delayStatus?: string
  orderTimeLte?: string
}) => {
  return useQuery({
    queryKey: ['myOrders', params],
    queryFn: () => getMyOrders(params),
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

export const useShopStatistics = () => {
  const {
    data: shopStatisticsData,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["shopStatistics"],
    queryFn: () => getShopStatistics(),
  })

  return {
    shopStatisticsData,
    isLoading,
    isFetching,
    refetch,
  }
}

export const usePayOrders = (): UseMutationResult<any, Error, any> => {
  const queryClient = useQueryClient()

  return useMutation<any, Error, any>({
    mutationFn: (params: any) => payOrders(params),
    onSuccess: (result: any) => {
      queryClient.invalidateQueries({
        queryKey: ["myOrders"],
      })
      queryClient.invalidateQueries({
        queryKey: ["shopStatistics"],
      })
      return result
    },
    onError: (result) => {
      return result
    },
  })
}

