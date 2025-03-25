import type { IProduct } from "./products"

export interface IShopProduct {
  id: string
  userId: string
  productId: string
  quantity: number
  price: number
  profit: number
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  isActive: boolean
  orderId: string
  shopProductId: string
  totalAmount: string
  fedexAmount: string
  isFedexPaid: boolean
  product: IProduct
}

export interface IShopProductsResponse {
  message: string
  statusCode: number
  data: {
    success: boolean
    shopProducts?: IShopProduct[]
    data?: {
      id: string
      createdAt: string
      updatedAt: string
      deletedAt: string | null
      userId: string
      shopId: string
      totalAmount: string
      status: string
      delayStatus: string
      confirmedAt: string | null
      deliveredAt: string | null
      cancelledAt: string | null
      fedexAmount: string
      isFedexPaid: boolean
      email: string
      phone: string | null
      address: string
      items: IShopProduct[]
      user: {
        id: string
        createdAt: string
        updatedAt: string
        deletedAt: string | null
        email: string
        username: string
        fullName: string
        phone: string
        invitationCode: string
        referralCode: string | null
        role: string
        isActive: boolean
        balance: string
        fedexBalance: string
        bankName: string | null
        bankAccountNumber: string | null
        bankAccountName: string | null
        bankBranch: string | null
        bankNumber: string | null
        bankCode: string | null
        address: string | null
        city: string | null
        district: string | null
        ward: string | null
        stars: number
        reputationPoints: number
        shopName: string | null
        shopAddress: string | null
        sellerPackageExpiry: string | null
        spreadPackageExpiry: string | null
      }
    }[]
    meta?: {
      page: number
      take: number
      itemCount: number
      pageCount: number
      hasPreviousPage: boolean
      hasNextPage: boolean
    }
  }
}

