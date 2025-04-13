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
    keyword?: string
    category?: string
    minPrice?: number
    maxPrice?: number
    page?: number
    limit?: number
}

