import type { ICategoryCreate, ICategoryUpdate, ICategoryQueryParams } from "@/interface/request/categories"
import type { ICategoryResponse, ICategoriesListResponse } from "@/interface/response/categories"
import { sendDelete, sendGet, sendPatch, sendPost } from "./axios"

export const createCategory = async (payload: ICategoryCreate): Promise<ICategoryResponse> => {
  const res = await sendPost("/categories", payload)
  const data: ICategoryResponse = res
  return data
}

export const getCategories = async (params: ICategoryQueryParams): Promise<ICategoriesListResponse> => {
  const res = await sendGet("/categories", params)
  const data: ICategoriesListResponse = res
  return data
}

export const getCategoryById = async (id: string): Promise<ICategoryResponse> => {
  try {
    const res = await sendGet(`/categories/${id}`);
    return res;
  } catch (error) {
    console.error('Error fetching category by id:', error);
    throw error;
  }
}

export const updateCategory = async (id: string, payload: ICategoryUpdate): Promise<ICategoryResponse> => {
  const res = await sendPatch(`/categories/${id}`, payload)
  const data: ICategoryResponse = res
  return data
}

export const deleteCategory = async (id: string): Promise<ICategoryResponse> => {
  const res = await sendDelete(`/categories/${id}`)
  const data: ICategoryResponse = res
  return data
}

