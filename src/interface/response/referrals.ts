import type { IUser } from "./authentication"

export interface IReferralUser {
  id: string
  userId: string
  referrerId: string
  referralCode: string
  createdAt: string
  user: IUser
}

export interface IReferralStat {
  referralCode: string
  count: number
  referrerId: string
  referrerName: string
}

export interface IReferralUsersResponse {
  message: string
  statusCode: number
  data: {
    referrals: IReferralUser[]
    pagination: {
      total: number
      page: number
      limit: number
      totalPages: number
    }
  }
}

export interface IReferralStatsResponse {
  message: string
  statusCode: number
  data: {
    stats: IReferralStat[]
  }
}

export interface IReferralCodeValidResponse {
  message: string
  statusCode: number
  data: {
    valid: boolean
    referrerId?: string
    referrerName?: string
  }
}

