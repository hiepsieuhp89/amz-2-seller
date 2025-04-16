import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getShopProductReviews } from "@/api/shop-products";
import { useState } from "react";

// Re-export all hooks from shop-products/index.ts
export * from "./shop-products/index";

export interface ReviewPaginationParams {
  page: number;
  take: number;
  sort?: string;
}

// Define the return type for our hook without extending UseQueryResult
export type UseGetShopProductReviewsReturn = UseQueryResult<any, Error> & {
  params: ReviewPaginationParams;
  handlePageChange: (page: number) => void;
  handlePageSizeChange: (take: number) => void;
};

export const useGetShopProductReviews = (
  productId?: string, 
  initialParams: ReviewPaginationParams = { page: 1, take: 10 }
): UseGetShopProductReviewsReturn => {
  const [params, setParams] = useState<ReviewPaginationParams>(initialParams);
  
  const query = useQuery({
    queryKey: ["shop-product-reviews", productId, params],
    queryFn: () => productId ? getShopProductReviews(productId, params) : null,
    enabled: Boolean(productId),
  });

  const handlePageChange = (page: number) => {
    setParams(prev => ({
      ...prev,
      page
    }));
  };

  const handlePageSizeChange = (take: number) => {
    setParams(prev => ({
      ...prev,
      take,
      page: 1 // Reset to first page when changing page size
    }));
  };

  return {
    ...query,
    params,
    handlePageChange,
    handlePageSizeChange
  };
}; 