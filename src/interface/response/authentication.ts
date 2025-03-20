export interface IAuthResponse {
  message: string
  statusCode: number,
  status: boolean,
  data: {
    accessToken: string
    user: IUser
  }
}

export interface IUser {
  id: string
  username: string
  email: string
  fullName?: string
  phone?: string
  address?: string
  avatar?: string
  role: string
  createdAt: string
  updatedAt: string
}

export interface IBankInfo {
  id: string
  bankName: string
  accountNumber: string
  accountHolder: string
  branch?: string
}

export interface IBank {
  id: string
  name: string
  code: string
  logo?: string
}

export interface IProfileResponse {
  message: string
  statusCode: number
  data: {
    user: IUser
    bankInfo?: IBankInfo
  }
}

export interface IBankListResponse {
  message: string
  statusCode: number
  data: {
    banks: IBank[]
  }
}

