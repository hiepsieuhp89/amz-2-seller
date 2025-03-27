export interface IGetSpreadPackagesRequest {
  order?: string
  page?: number
  take?: number
  search?: string
  status?: string
  minPrice?: number
  maxPrice?: number
}

export interface IPurchaseSpreadPackageRequest {
  packageId: string
} 