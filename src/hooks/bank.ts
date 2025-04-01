import { useMutation } from "@tanstack/react-query"
import { verifyBankAccount } from "@/api/bank"

interface VerifyBankAccountParams {
  bankCode: string
  accountNumber: string
}

export const useVerifyBankAccount = () => {
  return useMutation({
    mutationFn: ({ bankCode, accountNumber }: VerifyBankAccountParams) => 
      verifyBankAccount(bankCode, accountNumber),
  })
} 