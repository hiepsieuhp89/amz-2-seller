export interface IGetSellerPackagesRequest {
  order?: string
  page?: number
  take?: number
  search?: string
  status?: string
  minPrice?: number
  maxPrice?: number
}

export interface IPurchaseSellerPackageRequest {
  packageId: string
} 