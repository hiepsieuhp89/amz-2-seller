export interface IShopChatResponse {
  status: boolean
  message: string
  data: {
    data: IChatMessage[]
    meta: {
      page: number
      take: number
      itemCount: number
      pageCount: number
      hasPreviousPage: boolean
      hasNextPage: boolean
    }
  }
  errors: null
  timestamp: string
}

export interface IChatMessage {
  id: string
  senderId: string
  senderRole: string
  receiverId: string
  message: string
  createdAt: string
  updatedAt: string
  isRead: boolean
}

export interface IChatList {
  messages: IChatMessage[]
  total: number
  page: number
  take: number
}

export interface IChatDetail {
  userId: string
  userName: string
  userAvatar: string
  messages: IChatMessage[]
}

export interface IAvailableChat {
  id: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  senderRole: string
  message: string
  isRead: boolean
  deletedBy: string | null
} 