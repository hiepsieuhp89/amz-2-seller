export interface IImage {
    id: string
    filename: string
    url: string
    productId?: string
    description?: string
    createdAt: string
    updatedAt: string
}

export interface IImageResponse {
    message: string
    statusCode: number
    data: {
        image: IImage
    }
}

export interface IImagesListResponse {
    message: string
    statusCode: number
    data: {
        images: IImage[]
        pagination: {
            total: number
            page: number
            limit: number
            totalPages: number
        }
    }
}

