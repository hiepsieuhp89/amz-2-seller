import {
  createWithdrawal,
  getUserWithdrawals,
  updateWithdrawalStatus,
} from "@/api/withdrawals"
import type {
  ICreateWithdrawal,
  IUpdateWithdrawalStatus,
} from "@/interface/request/withdrawals"
import type {
  IWithdrawalResponse,
  IWithdrawalListResponse,
} from "@/interface/response/withdrawals"
import { type UseMutationResult, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useCreateWithdrawal = (): UseMutationResult<IWithdrawalResponse, Error, ICreateWithdrawal> => {
  return useMutation<IWithdrawalResponse, Error, ICreateWithdrawal>({
    mutationFn: (params: ICreateWithdrawal) => createWithdrawal(params),
  })
}

export const useUserWithdrawals = (params?: { page: number; take: number, status?: string }) => {
  const {
    data: withdrawals,
    isLoading,
    isFetching,
    refetch,
  } = useQuery<IWithdrawalListResponse>({
    queryKey: ["userWithdrawals", params],
    queryFn: () => getUserWithdrawals(params),
  })

  return {
    withdrawals,
    isLoading,
    isFetching,
    refetch,
  }
}

export const useUpdateWithdrawalStatus = (): UseMutationResult<IWithdrawalResponse, Error, { id: string, payload: IUpdateWithdrawalStatus }> => {
  const queryClient = useQueryClient()

  return useMutation<IWithdrawalResponse, Error, { id: string, payload: IUpdateWithdrawalStatus }>({
    mutationFn: ({ id, payload }) => updateWithdrawalStatus(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userWithdrawals"],
      })
    },
  })
} 