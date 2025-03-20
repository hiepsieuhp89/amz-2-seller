import { updateUserBankInfo, getWithdrawTransactions, updateWithdrawStatus, getDownlineUsers } from "@/api/admin"
import type {
  IUpdateBankInfoRequest,
  IUpdateWithdrawStatusRequest,
  IDownlineQueryParams,
  IWithdrawTransactionsQueryParams,
} from "@/interface/request/admin"
import type { IAdminResponse } from "@/interface/response/admin"
import { type UseMutationResult, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

/**
 * Hook for updating a user's bank information (Admin only)
 */
export const useUpdateUserBankInfo = (): UseMutationResult<IAdminResponse, Error, IUpdateBankInfoRequest> => {
  const queryClient = useQueryClient()

  return useMutation<IAdminResponse, Error, IUpdateBankInfoRequest>({
    mutationFn: (params: IUpdateBankInfoRequest) => updateUserBankInfo(params),
    onSuccess: (result: IAdminResponse, variables) => {
      // Invalidate any relevant queries
      queryClient.invalidateQueries({
        queryKey: ["userProfile", variables.userId],
      })
      return result
    },
    onError: (result) => {
      return result
    },
  })
}

/**
 * Hook for fetching withdrawal transactions (Admin only)
 */
export const useWithdrawTransactions = (params?: IWithdrawTransactionsQueryParams) => {
  const {
    data: transactionsData,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["adminWithdrawTransactions", params],
    queryFn: () => getWithdrawTransactions(params),
  })

  return {
    transactionsData,
    isLoading,
    isFetching,
    refetch,
  }
}

/**
 * Hook for updating the status of a withdrawal transaction (Admin only)
 */
export const useUpdateWithdrawStatus = (): UseMutationResult<IAdminResponse, Error, IUpdateWithdrawStatusRequest> => {
  const queryClient = useQueryClient()

  return useMutation<IAdminResponse, Error, IUpdateWithdrawStatusRequest>({
    mutationFn: (params: IUpdateWithdrawStatusRequest) => updateWithdrawStatus(params),
    onSuccess: (result: IAdminResponse) => {
      // Invalidate withdraw transactions query to refresh the list
      queryClient.invalidateQueries({
        queryKey: ["adminWithdrawTransactions"],
      })
      return result
    },
    onError: (result) => {
      return result
    },
  })
}

/**
 * Hook for fetching downline users (Admin only)
 */
export const useDownlineUsers = (params?: IDownlineQueryParams) => {
  const {
    data: downlineUsersData,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["adminDownlineUsers", params],
    queryFn: () => getDownlineUsers(params),
  })

  return {
    downlineUsersData,
    isLoading,
    isFetching,
    refetch,
  }
}

