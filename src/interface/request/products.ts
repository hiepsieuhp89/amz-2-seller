export interface IProductCreate {
    name: string
    description: string
    price: number
    category: string
    stock: number
}

export interface IProductUpdate {
    name?: string
    description?: string
    price?: number
    stock?: number
}

export interface IProductSearchParams {
    order?: string
    page?: number
    keyword?: string
    category?: string
    minPrice?: number
    maxPrice?: number
    limit?: number
}

export interface IAddShopProductsRequest {
    productIds: string[]
}
