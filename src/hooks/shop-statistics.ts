import { getShopStatistics } from "@/api/shop-products"
import type { IShopStatisticsResponse } from "@/interface/response/shop-products"
import { useQuery } from "@tanstack/react-query"

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