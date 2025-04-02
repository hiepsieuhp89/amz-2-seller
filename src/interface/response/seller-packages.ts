export interface ISellerPackage {
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
  title: string
}

export interface ISellerPackageResponse {
  status: boolean
  message: string
  data: ISellerPackage
  errors: null
  timestamp: string
}

export interface ISellerPackagesResponse {
  status: boolean
  message: string
  data: {
    data: ISellerPackage[]
    meta?: {
      page: number
      take: number
      itemCount: number
      pageCount: number
      hasPreviousPage: boolean
      hasNextPage: boolean
    }
  }
  errors: null
  timestamp: string
} 