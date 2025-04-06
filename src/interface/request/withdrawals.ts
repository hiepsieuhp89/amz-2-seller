export interface ICreateWithdrawal {
  amount: number
  withdrawPassword: string
}

export interface IUpdateWithdrawalStatus {
  status: string
  rejectionReason?: string
  adminNote?: string
} 