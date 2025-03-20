import type { IImageCreate, IImageUpdate, IImageQueryParams } from "@/interface/request/images"
import type { IImageResponse, IImagesListResponse } from "@/interface/response/images"
import { sendDelete, sendGet, sendPatch, sendPost } from "./axios"
import cookies from "js-cookie"

export const uploadImage = async (file: File): Promise<IImageResponse> => {
  const formData = new FormData()
  formData.append("image", file)

  const res = await sendPost("/images/upload", formData)
  const data: IImageResponse = res
  return data
}

export const createImage = async (payload: IImageCreate): Promise<IImageResponse> => {
  const res = await sendPost("/images", payload)
  const data: IImageResponse = res
  return data
}

export const getImages = async (params: IImageQueryParams): Promise<IImagesListResponse> => {
  const res = await sendGet("/images", params)
  const data: IImagesListResponse = res
  return data
}

export const getProductImages = async (productId: string, params: IImageQueryParams): Promise<IImagesListResponse> => {
  const res = await sendGet(`/images/product/${productId}`, params)
  const data: IImagesListResponse = res
  return data
}

export const deleteProductImage = async (id: string): Promise<IImageResponse> => {
  const res = await sendDelete(`/images/product-image/${id}`)
  const data: IImageResponse = res
  return data
}

export const getImageById = async (id: string): Promise<IImageResponse> => {
  const res = await sendGet(`/images/${id}`)
  const data: IImageResponse = res
  return data
}

export const updateImage = async (id: string, payload: IImageUpdate): Promise<IImageResponse> => {
  const res = await sendPatch(`/images/${id}`, payload)
  const data: IImageResponse = res
  return data
}

export const deleteImage = async (id: string): Promise<IImageResponse> => {
  const res = await sendDelete(`/images/${id}`)
  const data: IImageResponse = res
  return data
}

export const getImageFile = async (filename: string): Promise<Blob> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images/file/${filename}`, {
    headers: {
      Authorization: `Bearer ${cookies.get("accessToken")}`,
    },
  })

  if (!res.ok) {
    throw new Error("Failed to fetch image")
  }

  return await res.blob()
}

