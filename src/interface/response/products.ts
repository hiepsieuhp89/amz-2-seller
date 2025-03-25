export interface IProduct {
    id: string
    name: string
    description: string
    price: string
    salePrice: string
    stock: number
    category?: string
    categoryId?: string
    images?: string[]
    profit: number
    createdAt: string
    updatedAt: string
    deletedAt: string | null
    image?: string
    purchasePrice?: number
    imageUrl: string
    shopProducts?: any[]
    averageRating: string
}

export interface IProductResponse {
    status: boolean
    message: string
    statusCode?: number
    data: {
        product: IProduct
    }
    errors?: any | null
    timestamp?: string
}

export interface IProductsListResponse {
    status: boolean
    message: string
    statusCode?: number
    data: {
        data: IProduct[]
        meta: {
            page: number
            take: number
            itemCount: number
            pageCount: number
            hasPreviousPage: boolean
            hasNextPage: boolean
        }
    }
    errors?: any | null
    timestamp?: string
}
