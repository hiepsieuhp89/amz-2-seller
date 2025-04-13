export interface IShopProductItem {
    productId: string
    quantity: number
    price?: number
}

export interface IAddShopProductsRequest {
    productIds: string[]
}

export interface IRemoveShopProductsRequest {
    productIds: string[]
}

