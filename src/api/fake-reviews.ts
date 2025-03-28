import type { IGetUserOrdersRequest, ICreateFakeReviewRequest } from "@/interface/request/fake-reviews"
import type { IFakeReviewResponse } from "@/interface/response/fake-reviews"
import { sendGet, sendPost } from "./axios"

export const getUserOrders = async (
  params: IGetUserOrdersRequest
): Promise<IFakeReviewResponse> => {
  const res = await sendGet("/admin/fake-reviews/user-orders", params)
  return res
}

export const createFakeReview = async (
  payload: ICreateFakeReviewRequest
): Promise<IFakeReviewResponse> => {
  const res = await sendPost("/admin/fake-reviews", payload)
  return res
} 