import { useQuery } from "@tanstack/react-query";
import { getShopStatistics, getShopDetailStatistics, getTopSellingProducts } from "@/api/dashboard";

export const useShopStatistics = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["shopStatistics"],
    queryFn: () => getShopStatistics(),
  });

  return {
    statistics: data?.data,
    isLoading,
    isFetching,
  };
};

export const useShopDetailStatistics = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["shopDetailStatistics"],
    queryFn: () => getShopDetailStatistics(),
  });

  return {
    detailStatistics: data?.data,
    isLoading,
    isFetching,
  };
};

export const useTopSellingProducts = (limit: number = 10) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["topSellingProducts", limit],
    queryFn: () => getTopSellingProducts(limit),
  });

  return {
    data: data?.data,
    isLoading,
    isFetching,
  };
}; 