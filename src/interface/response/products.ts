export interface IShopProduct {
    id: string
    createdAt: string
    updatedAt: string
    deletedAt: string | null
    isActive: boolean
    profit: string
    soldCount: number
    user: IUser
}

export interface IUser {
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
    logoUrl: string | null
    postalCode: string | null
    withdrawPassword: string | null
}

export interface IProduct {
    id: string
    createdAt: string
    updatedAt: string
    deletedAt: string | null
    name: string
    description: string
    imageUrl: string | null
    imageUrls: string[]
    salePrice: string
    price: string
    stock: number
    averageRating: string
    soldCount: number
    isHot: boolean
    isNew: boolean
    isFeatured: boolean
    shopProducts: IShopProduct[]
    reviews: IReview[]
}

export interface IReview {
    id: string
    createdAt: string
    updatedAt: string
    deletedAt: string | null
    userId: string
    shopProductId: string
    orderId: string
    rating: number
    content: string
    images: string[]
    productName: string
    productImage: string | null
    quantity: number
}

export interface IMeta {
    page: number
    take: number
    itemCount: number
    pageCount: number
    hasPreviousPage: boolean
    hasNextPage: boolean
}

export interface IProductsListResponse {
    status: boolean
    message: string
    data: {
        data: IProduct[]
        meta: IMeta
    }
    errors: any | null
    timestamp: string
}
