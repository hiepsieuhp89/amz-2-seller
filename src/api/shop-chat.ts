import { sendPost, sendGet, sendDelete } from "./axios"
import type { IShopChatResponse } from "@/interface/response/shop-chat"

export const sendMessageToUser = async (userId: string, message: string): Promise<IShopChatResponse> => {
  const res = await sendPost(`/shop/chat/user/${userId}`, { message })
  return res
}

export const getMessagesWithUser = async (userId: string): Promise<IShopChatResponse> => {
  const res = await sendGet(`/shop/chat/user/${userId}`)
  return res
}

export const markMessageAsRead = async (messageId: string): Promise<IShopChatResponse> => {
  const res = await sendPost(`/shop/chat/${messageId}/read`)
  return res
}

export const deleteMessage = async (messageId: string): Promise<IShopChatResponse> => {
  const res = await sendDelete(`/shop/chat/${messageId}`)
  return res
}

export const getListMessageAvailable = async (params: {
  order?: string
  page?: number
  take?: number
  search?: string
}): Promise<IShopChatResponse> => {
  const res = await sendGet("/shop/chat/list-message-available", params)
  return res
} 