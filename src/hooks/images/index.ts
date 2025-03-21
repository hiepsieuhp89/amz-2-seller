import {
    uploadImage,
    createImage,
    getImages,
    getProductImages,
    deleteProductImage,
    getImageById,
    updateImage,
    deleteImage,
  } from "@/api/images"
  import type { IImageCreate, IImageUpdate, IImageQueryParams } from "@/interface/request/images"
  import type { IImageResponse } from "@/interface/response/images"
  import { type UseMutationResult, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
  
  export const useUploadImage = (): UseMutationResult<IImageResponse, Error, File> => {
    return useMutation<IImageResponse, Error, File>({
      mutationFn: (file: File) => uploadImage(file),
      onSuccess: (result: IImageResponse) => {
        return result
      },
      onError: (result) => {
        return result
      },
    })
  }
  
  export const useCreateImage = (): UseMutationResult<IImageResponse, Error, IImageCreate> => {
    const queryClient = useQueryClient()
  
    return useMutation<IImageResponse, Error, IImageCreate>({
      mutationFn: (params: IImageCreate) => createImage(params),
      onSuccess: (result: IImageResponse) => {
        queryClient.invalidateQueries({
          queryKey: ["images"],
        })
        if (result.data.image.productId) {
          queryClient.invalidateQueries({
            queryKey: ["productImages", result.data.image.productId],
          })
        }
        return result
      },
      onError: (result) => {
        return result
      },
    })
  }
  
  export const useImages = (params: IImageQueryParams) => {
    const {
      data: imagesData,
      isLoading,
      isFetching,
      refetch,
    } = useQuery({
      queryKey: ["images", params],
      queryFn: () => getImages(params),
    })
  
    return {
      imagesData,
      isLoading,
      isFetching,
      refetch,
    }
  }
  
  export const useProductImages = (productId: string, params: IImageQueryParams) => {
    const {
      data: productImagesData,
      isLoading,
      isFetching,
      refetch,
    } = useQuery({
      queryKey: ["productImages", productId, params],
      queryFn: () => getProductImages(productId, params),
      enabled: !!productId, // Only run the query if productId is provided
    })
  
    return {
      productImagesData,
      isLoading,
      isFetching,
      refetch,
    }
  }
  
  export const useDeleteProductImage = (): UseMutationResult<IImageResponse, Error, string> => {
    const queryClient = useQueryClient()
  
    return useMutation<IImageResponse, Error, string>({
      mutationFn: (id: string) => deleteProductImage(id),
      onSuccess: (result: IImageResponse) => {
        queryClient.invalidateQueries({
          queryKey: ["images"],
        })
        queryClient.invalidateQueries({
          queryKey: ["productImages"],
        })
        return result
      },
      onError: (result) => {
        return result
      },
    })
  }
  
  export const useImageDetail = (id: string) => {
    const {
      data: imageData,
      isLoading,
      isFetching,
      refetch,
    } = useQuery({
      queryKey: ["image", id],
      queryFn: () => getImageById(id),
      enabled: !!id, // Only run the query if id is provided
    })
  
    return {
      imageData,
      isLoading,
      isFetching,
      refetch,
    }
  }
  
  export const useUpdateImage = (id: string): UseMutationResult<IImageResponse, Error, IImageUpdate> => {
    const queryClient = useQueryClient()
  
    return useMutation<IImageResponse, Error, IImageUpdate>({
      mutationFn: (payload: IImageUpdate) => updateImage(id, payload),
      onSuccess: (result: IImageResponse) => {
        queryClient.invalidateQueries({
          queryKey: ["images"],
        })
        queryClient.invalidateQueries({
          queryKey: ["image", id],
        })
        if (result.data.image.productId) {
          queryClient.invalidateQueries({
            queryKey: ["productImages", result.data.image.productId],
          })
        }
        return result
      },
      onError: (result) => {
        return result
      },
    })
  }
  
  export const useDeleteImage = (): UseMutationResult<IImageResponse, Error, string> => {
    const queryClient = useQueryClient()
  
    return useMutation<IImageResponse, Error, string>({
      mutationFn: (id: string) => deleteImage(id),
      onSuccess: (result: IImageResponse) => {
        queryClient.invalidateQueries({
          queryKey: ["images"],
        })
        return result
      },
      onError: (result) => {
        return result
      },
    })
  }
  
  