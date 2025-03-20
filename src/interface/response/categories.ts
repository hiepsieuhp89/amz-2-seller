export interface ICategory {
    id: string
    name: string
    description: string
    parentId?: string
    status: string
    createdAt: string
    updatedAt: string
}

export interface ICategoryResponse {
    message: string
    statusCode: number
    data: {
        category: ICategory
    }
}

export interface ICategoriesListResponse {
    message: string
    statusCode: number
    data: {
        categories: ICategory[]
        pagination: {
            total: number
            page: number
            limit: number
            totalPages: number
        }
    }
}

