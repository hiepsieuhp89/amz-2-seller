import type { IUser } from "./authentication"

export interface IWithdrawTransaction {
  id: string
  userId: string
  amount: number
  fee: number
  status: string
  bankName: string
  accountNumber: string
  accountHolder: string
  createdAt: string
  updatedAt: string
  user: IUser
}

export interface IDownlineUser {
  id: string
  userId: string
  referrerId: string
  level: number
  createdAt: string
  user: IUser
}

export interface IAdminResponse {
  message: string
  statusCode: number
  data: {
    success: boolean
  }
}

export interface IWithdrawTransactionsResponse {
  message: string
  statusCode: number
  data: {
    transactions: IWithdrawTransaction[]
    pagination: {
      total: number
      page: number
      limit: number
      totalPages: number
    }
  }
}

export interface IDownlineUsersResponse {
  message: string
  statusCode: number
  data: {
    users: IDownlineUser[]
    pagination: {
      total: number
      page: number
      limit: number
      totalPages: number
    }
  }
}

