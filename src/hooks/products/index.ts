import {
    getShopProducts,
    getProducts,
    getProductDetail,
} from "@/api/products"
import type { IProductSearchParams } from "@/interface/request/products"
import { useQuery } from "@tanstack/react-query"

export const useShopProducts = (params?: IProductSearchParams) => {
    const {
        data: shopProductsData,
        isLoading,
        isFetching,
        refetch,
    } = useQuery({
        queryKey: ["shopProducts", params],
        queryFn: () => getShopProducts(params),
    })

    return {
        shopProductsData,
        isLoading,
        isFetching,
        refetch,
    }
}

export const useProducts = (params?: IProductSearchParams) => {
    const queryParams = {
        order: "DESC",
        page: 1,
        ...params,
    }
    const {
        data,
        isLoading,
        isFetching,
        refetch,
    } = useQuery({
        queryKey: ["products", queryParams],
        queryFn: () => getProducts(queryParams),
    })
    return {
        data,
        isLoading,
        isFetching,
        refetch,
    }
}

export const useProductDetail = (id: string) => {
    const {
        data,
        isLoading,
        isFetching,
        refetch,
    } = useQuery({
        queryKey: ["productDetail", id],
        queryFn: () => getProductDetail(id),
        enabled: !!id, // Only fetch when ID is available
    })
    return {
        data,
        isLoading,
        isFetching,
        refetch,
    }
}


