export interface IUpdateBankInfoRequest {
    userId: string
    bankName: string
    accountNumber: string
    accountHolder: string
  }
  
  export interface IUpdateWithdrawStatusRequest {
    transactionId: string
    status: string
  }
  
  export interface IWithdrawTransactionsQueryParams {
    page?: number
    limit?: number
    status?: string
  }
  
  export interface IDownlineQueryParams {
    page?: number
    limit?: number
    userId?: string
  }
  
  