export interface IProduct {
    id: string
    name: string
    description: string
    price: number
    category: string
    categoryId: string
    stock: number
    images?: string[]
    profit?: number 
    createdAt: string
    updatedAt: string
    deletedAt: string | null
    salePrice: number
}

export interface IProductResponse {
    message: string
    statusCode: number
    data: {
        product: IProduct
    }
}

export interface IProductsListResponse {
    message: string
    statusCode: number
    data: {
        pagination: {
            total: number
            page: number
            limit: number
            totalPages: number
        },
        meta: {
            itemCount: number
            totalItems: number
            itemsPerPage: number
            totalPages: number
            currentPage: number
            hasNextPage: boolean
            hasPreviousPage: boolean
        } ,
        data: IProduct[]
    },
    meta:{
        page: number,
        take: number,
        itemCount: number,
        pageCount: number,
        hasPreviousPage: boolean,
        hasNextPage: boolean
      }
}

