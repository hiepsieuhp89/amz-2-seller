export interface ICategory {
    id: string
    name: string
    description: string
    parentId?: string
    status: string
    createdAt: string
    updatedAt: string
    deletedAt: string | null
    imageUrl: string
    children: ICategory[]
    parent: ICategory | null
}

export interface ICategoryResponse {
    message: string
    statusCode: number
    data: {
        category: ICategory
    }
}

export interface ICategoriesListResponse {
    status: boolean
    message: string
    data: {
        data: ICategory[]
        meta: {
            hasNextPage: boolean
            hasPreviousPage: boolean
            itemCount: number
            pageCount: number
            page: number
            take: number
        }
    }
    errors: null
    timestamp: string
}

