import { sendDelete, sendGet, sendPost } from "./axios"

export const sendMessageToUser = async (userId: string, message: string): Promise<any> => {
  try {
    const res = await sendPost(`/shop/chat/user/${userId}`, { message })
    if (!res.status) {
      throw new Error(res.message || "Không thể gửi tin nhắn")
    }
    return res
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Lỗi khi gửi tin nhắn")
  }
}

export const getMessagesWithUser = async (userId: string): Promise<any> => {
  const res = await sendGet(`/shop/chat/user/${userId}`)
  return res
}

export const markMessageAsRead = async (messageId: string): Promise<any> => {
  const res = await sendPost(`/shop/chat/${messageId}/read`)
  return res
}

export const deleteMessage = async (messageId: string): Promise<any> => {
  const res = await sendDelete(`/shop/chat/${messageId}`)
  return res
}

export const getListMessageAvailable = async (params: {
  order?: string
  page?: number
  take?: number
  search?: string
}): Promise<any> => {
  const res = await sendGet("/shop/chat/list-message-available", params)
  return res
} 