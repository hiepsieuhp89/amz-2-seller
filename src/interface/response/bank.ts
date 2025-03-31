export interface IVerifyBankAccountResponse {
  message: string
  statusCode: number
  data: {
    isValid: boolean
    accountName?: string
    accountNumber?: string
    bankName?: string
  }
} 