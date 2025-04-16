import { addShopProducts, getAllShopProducts, getMyOrders, getMyShopProducts, getShopStatistics, removeShopProducts, getRevenueStatistics, getShopDetailStatistics, getTopSellingProducts, getShopProductDetail, getOrderDetail, getShopProductReviews } from "@/api/shop-products"
import type { IAddShopProductsRequest, IGetShopProductsRequest, IRemoveShopProductsRequest } from "@/interface/request/shop-products"
import type { IShopProductsResponse } from "@/interface/response/shop-products"
import { type UseMutationResult, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useAddShopProducts = (): UseMutationResult<IShopProductsResponse, Error, IAddShopProductsRequest> => {
  const queryClient = useQueryClient()

  return useMutation<IShopProductsResponse, Error, IAddShopProductsRequest>({
    mutationFn: (params: IAddShopProductsRequest) => addShopProducts(params),
    onSuccess: (result: IShopProductsResponse) => {
      queryClient.invalidateQueries({
        queryKey: ["shopProducts"],
      })
      queryClient.invalidateQueries({
        queryKey: ["myShopProducts"],
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
      queryClient.invalidateQueries({
        queryKey: ["myShopProducts"],
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
  onlyHaveReview?: boolean
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
  orderTimeGte?: string
  orderTimeLte?: string
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

export const useGetShopStatistics = () => {
  return useQuery({
    queryKey: ['shopStatistics'],
    queryFn: () => getShopStatistics(),
  })
}

export const useGetRevenueStatistics = (params: { days: number }) => {
  return useQuery({
    queryKey: ['revenueStatistics', params],
    queryFn: () => getRevenueStatistics(params),
  })
}

export const useGetShopDetailStatistics = () => {
  return useQuery({
    queryKey: ['shopDetailStatistics'],
    queryFn: () => getShopDetailStatistics(),
  })
}

export const useGetTopSellingProducts = (params: { limit: number }) => {
  return useQuery({
    queryKey: ['topSellingProducts', params],
    queryFn: () => getTopSellingProducts(params),
  })
}

export const useGetShopProductDetail = (id: string) => {
  return useQuery({
    queryKey: ['shopProductDetail', id],
    queryFn: () => getShopProductDetail(id),
  })
}

export const useGetOrderDetail = (id: string) => {
  return useQuery({
    queryKey: ['orderDetail', id],
    queryFn: () => getOrderDetail(id),
  })
}

export const useGetShopProductReviews = (id: string, params?: { page?: number, take?: number, sort?: string }) => {
  return useQuery({
    queryKey: ['shopProductReviews', id, params],
    queryFn: () => getShopProductReviews(id, params),
  })
}
