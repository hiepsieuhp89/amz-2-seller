export interface ICreateWithdrawal {
  amount: number
}

export interface IUpdateWithdrawalStatus {
  status: string
  rejectionReason?: string
  adminNote?: string
} 