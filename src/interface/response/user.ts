export interface IUserResponse {
    id: string
    username: string
    position: string
    fullname: string
    gender: boolean
    dob: string
    is_active: boolean
    is_deleted: boolean
    created_time: string
    role: string
    department?: string
    division?: string
  }
  