import { useQuery, useMutation } from "@tanstack/react-query"
import { getBankList, verifyBankAccount, IVerifyBankAccountParams } from "@/api/bank"
import { IBankListResponse, IVerifyBankAccountResponse } from "@/interface/response/bank"

export const useBankList = () => {
  const {
    data: bankListData,
    isLoading,
    isFetching,
    refetch,
  } = useQuery<IBankListResponse>({
    queryKey: ["bankList"],
    queryFn: () => getBankList(),
  })

  return {
    bankListData,
    isLoading,
    isFetching,
    refetch,
  }
}

export const useVerifyBankAccount = () => {
  const { mutateAsync, isPending } = useMutation<
    IVerifyBankAccountResponse, 
    Error,
    IVerifyBankAccountParams
  >({
    mutationFn: (params: IVerifyBankAccountParams) => verifyBankAccount(params),
  })

  return {
    verifyBankAccount: mutateAsync,
    isPending,
  }
} 