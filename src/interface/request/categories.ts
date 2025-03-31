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
  order?: string
  page?: number
  take?: number
  limit?: number
  search?: string
  status?: string
}

