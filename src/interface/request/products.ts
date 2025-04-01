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
    take?: number
    search?: string
    status?: string
    name?: string
    shopId?: string
    keyword?: string
    category?: string
    minPrice?: number
    maxPrice?: number
    inStock?: boolean
    isNew?: boolean
    isFeatured?: boolean
    isHot?: boolean 
    limit?: number
}

export interface IAddShopProductsRequest {
    productIds: string[]
}
