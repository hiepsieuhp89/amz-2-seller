import { getUserOrders, createFakeReview } from "@/api/fake-reviews"
import type { IGetUserOrdersRequest, ICreateFakeReviewRequest } from "@/interface/request/fake-reviews"
import type { IFakeReviewResponse } from "@/interface/response/fake-reviews"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useGetUserOrders = (params: IGetUserOrdersRequest) => {
  return useQuery<IFakeReviewResponse, Error>({
    queryKey: ['fakeReviews', params],
    queryFn: () => getUserOrders(params),
  })
}

export const useCreateFakeReview = () => {
  return useMutation<IFakeReviewResponse, Error, ICreateFakeReviewRequest>({
    mutationFn: (params: ICreateFakeReviewRequest) => createFakeReview(params),
  })
} 