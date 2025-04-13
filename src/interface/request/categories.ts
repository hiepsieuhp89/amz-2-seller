export interface ICategoryCreate {
    name: string
    description: string
    parentId?: string
    status?: string
  }
  
  export interface ICategoryUpdate {
    name?: string
    description?: string
    parentId?: string
    status?: string
  }
  
  export interface ICategoryQueryParams {
    page: number
    limit: number
    search?: string
  }
  
  