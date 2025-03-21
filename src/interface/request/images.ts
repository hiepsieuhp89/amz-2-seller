export interface IImageCreate {
    filename: string
    url: string
    productId?: string
    description?: string
  }
  
  export interface IImageUpdate {
    description?: string
    productId?: string
  }
  
  export interface IImageQueryParams {
    page: number
    limit: number
    search?: string
  }
  
  