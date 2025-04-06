export interface IWithdrawalResponse {
  message: string
  statusCode: number
  status: boolean
  data: {
    id: string
    amount: number
    status: string
    rejectionReason?: string
    adminNote?: string
    createdAt: string
    updatedAt: string
  }
}

export interface IWithdrawalListResponse {
  message: string
  statusCode: number
  data: {
    data: any
    total: number
  }
} 