export interface INotification {
  id: string
  userId: string
  title: string
  message: string
  isRead: boolean
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  type: string
  content: string
  metadata: any | null
  status: string
}

export interface INotificationsResponse {
  status: boolean
  message: string
  data: INotification[]
  errors: any | null
  timestamp: string
} 