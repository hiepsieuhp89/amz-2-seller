import { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } from "@/api/categories"
import type { ICategoryCreate, ICategoryUpdate, ICategoryQueryParams } from "@/interface/request/categories"
import type { ICategoryResponse } from "@/interface/response/categories"
import { type UseMutationResult, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useCreateCategory = (): UseMutationResult<ICategoryResponse, Error, ICategoryCreate> => {
    const queryClient = useQueryClient()

    return useMutation<ICategoryResponse, Error, ICategoryCreate>({
        mutationFn: (params: ICategoryCreate) => createCategory(params),
        onSuccess: (result: ICategoryResponse) => {
            queryClient.invalidateQueries({
                queryKey: ["categories"],
            })
            return result
        },
        onError: (result) => {
            return result
        },
    })
}

export const useCategories = (params?: ICategoryQueryParams) => {
    const {
        data: categoriesData,
        isLoading,
        isFetching,
        refetch,
    } = useQuery({
        queryKey: ["categories", params],
        queryFn: () => getCategories(params || {}),
    })

    return {
        categoriesData,
        isLoading,
        isFetching,
        refetch,
    }
}

export const useCategoryDetail = (id: string) => {
    const {
        data: categoryData,
        isLoading,
        isFetching,
        refetch,
    } = useQuery({
        queryKey: ["category", id],
        queryFn: () => getCategoryById(id),
        enabled: !!id, // Only run the query if id is provided
    })

    return {
        categoryData,
        isLoading,
        isFetching,
        refetch,
    }
}

export const useUpdateCategory = (id: string): UseMutationResult<ICategoryResponse, Error, ICategoryUpdate> => {
    const queryClient = useQueryClient()

    return useMutation<ICategoryResponse, Error, ICategoryUpdate>({
        mutationFn: (payload: ICategoryUpdate) => updateCategory(id, payload),
        onSuccess: (result: ICategoryResponse) => {
            queryClient.invalidateQueries({
                queryKey: ["categories"],
            })
            queryClient.invalidateQueries({
                queryKey: ["category", id],
            })
            return result
        },
        onError: (result) => {
            return result
        },
    })
}

export const useDeleteCategory = (): UseMutationResult<ICategoryResponse, Error, string> => {
    const queryClient = useQueryClient()

    return useMutation<ICategoryResponse, Error, string>({
        mutationFn: (id: string) => deleteCategory(id),
        onSuccess: (result: ICategoryResponse) => {
            queryClient.invalidateQueries({
                queryKey: ["categories"],
            })
            return result
        },
        onError: (result) => {
            return result
        },
    })
}

