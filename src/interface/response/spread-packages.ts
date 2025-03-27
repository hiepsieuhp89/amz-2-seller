export interface ISpreadPackageResponse {
  id: string
  name: string
  price: number
  duration: number
  maxProducts: number
  percentProfit: number
  image: string
}

export interface ISpreadPackagesResponse {
  data: {
    data: ISpreadPackageResponse[]
    total: number
  }
} 