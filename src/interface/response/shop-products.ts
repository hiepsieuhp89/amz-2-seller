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
  product: IProduct
}

export interface IShopProductsResponse {
  message: string
  statusCode: number
  data: {
    success: boolean
    shopProducts?: IShopProduct[]
  }
}

