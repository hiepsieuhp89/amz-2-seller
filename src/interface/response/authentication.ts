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
    id: string
    createdAt: string
    updatedAt: string
    deletedAt: string | null
    email: string
    username: string
    fullName: string
    phone: string
    logoUrl: string | null
    invitationCode: string | null
    referralCode: string
    role: string
    isActive: boolean
    isVerified: boolean
    balance: string
    fedexBalance: string
    bankName: string | null
    bankAccountNumber: string | null
    bankAccountName: string | null
    bankBranch: string | null
    bankNumber: string | null
    bankCode: string | null
    address: string | null
    countryId: string | null
    stateId: string | null
    cityId: string | null
    districtId: string | null
    postalCodeId: string | null
    stars: number
    reputationPoints: number
    shopName: string
    phone: string | null
    shopAddress: string
    metaTitle: string | null
    metaDescription: string | null
    bannerImage: string | null
    mobileBannerImage: string | null
    fullBannerImage: string | null
    halfBannerImage: string | null
    bannerImage2: string | null
    sellerPackageExpiry: string
    spreadPackageExpiry: string | null
    view: number
    totalProfit: number
    shopStatus: string | null
    shopCreatedAt: string | null
    sellerPackage: {
      id: string
      createdAt: string
      updatedAt: string
      deletedAt: string | null
      name: string
      price: number
      description: string
      image: string
      isActive: boolean
      duration: number
      percentProfit: number
      maxProducts: number
    }
    spreadPackage: null
  }
}

export interface IBankListResponse {
  message: string
  statusCode: number
  data: {
    banks: IBank[]
  }
}

