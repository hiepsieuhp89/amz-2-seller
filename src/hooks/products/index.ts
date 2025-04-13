import {
    getShopProducts,
    getProducts,
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
        data: productsData,
        isLoading,
        isFetching,
        refetch,
    } = useQuery({
        queryKey: ["products", queryParams],
        queryFn: () => getProducts(queryParams),
    })

    return {
        productsData,
        isLoading,
        isFetching,
        refetch,
    }
}


