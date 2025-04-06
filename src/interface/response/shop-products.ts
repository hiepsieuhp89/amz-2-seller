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

export interface IRevenueStatisticsResponse {
  dailyStats: {
    date: string
    revenue: number
    profit: number
    orders: number
  }[]
  totalRevenue: number
  totalProfit: number
  totalOrders: number
}

export interface IShopDetailStatisticsResponse {
  totalProducts: number
  activeProducts: number
  totalProfit: number
  totalOrders: number
  totalSales: number
  totalViews: number
  sellerPackage: Record<string, unknown>
  pendingOrders: number
}

export interface ITopSellingProductsResponse {
  product: Record<string, unknown>
  totalSold: number
  revenue: number
  profit: number
}

export interface IShopProductReviewsResponse {
  data: {
    id: string
    rating: number
    comment: string
    createdAt: string
    user: {
      id: string
      username: string
    }
  }[]
  meta: {
    page: number
    take: number
    itemCount: number
    pageCount: number
    hasPreviousPage: boolean
    hasNextPage: boolean
  }
}

export interface IOrderDetailsResponse {
  status: boolean
  message: string
  data: {
    id: string
    createdAt: string
    updatedAt: string
    deletedAt: string | null
    userId: string
    shopId: string
    totalAmount: string
    totalProfit: string
    status: string
    delayStatus: string
    paymentStatus: string
    confirmedAt: string | null
    deliveredAt: string | null
    cancelledAt: string | null
    email: string
    phone: string | null
    countryId: string | null
    stateId: string | null
    cityId: string | null
    districtId: string | null
    postalCode: string | null
    orderTime: string
    address: string
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
      isVerified: boolean
      balance: string
      fedexBalance: string
      bankName: string | null
      bankAccountNumber: string | null
      bankAccountName: string | null
      bankBranch: string | null
      bankNumber: string | null
      bankCode: string | null
      address: string
      countryId: string
      stateId: string
      cityId: string
      districtId: string | null
      postalCodeId: string | null
      stars: number
      reputationPoints: number
      shopName: string | null
      shopPhone: string | null
      shopAddress: string | null
      metaTitle: string | null
      metaDescription: string | null
      bannerImage: string | null
      mobileBannerImage: string | null
      fullBannerImage: string | null
      halfBannerImage: string | null
      bannerImage2: string | null
      sellerPackageExpiry: string | null
      spreadPackageExpiry: string | null
      view: number
      totalProfit: number
      shopStatus: string | null
      shopCreatedAt: string | null
      shopDescription: string | null
      logoUrl: string | null
      postalCode: string | null
      withdrawPassword: string | null
      idCardType: string | null
      idCardNumber: string | null
      idCardFrontImage: string | null
      idCardBackImage: string | null
    }
    shop: {
      id: string
      createdAt: string
      updatedAt: string
      deletedAt: string | null
      email: string
      username: string
      fullName: string
      phone: string
      invitationCode: string | null
      referralCode: string
      role: string
      isActive: boolean
      isVerified: boolean
      balance: string
      fedexBalance: string
      bankName: string
      bankAccountNumber: string
      bankAccountName: string
      bankBranch: string | null
      bankNumber: string | null
      bankCode: string | null
      address: string
      countryId: string | null
      stateId: string | null
      cityId: string | null
      districtId: string | null
      postalCodeId: string | null
      stars: number
      reputationPoints: number
      shopName: string
      shopPhone: string | null
      shopAddress: string
      metaTitle: string
      metaDescription: string
      bannerImage: string
      mobileBannerImage: string
      fullBannerImage: string
      halfBannerImage: string
      bannerImage2: string
      sellerPackageExpiry: string
      spreadPackageExpiry: string | null
      view: number
      totalProfit: number
      shopStatus: string | null
      shopCreatedAt: string | null
      shopDescription: string | null
      logoUrl: string
      postalCode: string | null
      withdrawPassword: string
      idCardType: string
      idCardNumber: string
      idCardFrontImage: string
      idCardBackImage: string
    }
    items: {
      id: string
      createdAt: string
      updatedAt: string
      deletedAt: string | null
      orderId: string
      shopProductId: string
      userId: string
      quantity: number
      price: string
      totalAmount: string
      fedexAmount: string | null
      isFedexPaid: boolean
    }[]
    statusHistory: {
      id: string
      createdAt: string
      updatedAt: string
      deletedAt: string | null
      orderId: string
      description: string
      time: string
      index: number
    }[]
  }
  errors: null | any
  timestamp: string
}

