import type { IMarkAsReadRequest, IDeleteNotificationRequest } from "@/interface/request/notification"
import type { INotificationsResponse } from "@/interface/response/notification"
import { sendGet, sendPost, sendDelete } from "./axios"

export const getUnreadNotifications = async (): Promise<INotificationsResponse> => {
  const res = await sendGet("/notifications/unread")
  return res
}

export const getAllNotifications = async (): Promise<INotificationsResponse> => {
  const res = await sendGet("/notifications")
  return res
}

export const markAsRead = async (payload: IMarkAsReadRequest): Promise<INotificationsResponse> => {
  const res = await sendPost(`/notifications/${payload.notificationId}/read`)
  return res
}

export const markAllAsRead = async (): Promise<INotificationsResponse> => {
  const res = await sendPost("/notifications/read-all")
  return res
}

export const deleteNotification = async (payload: IDeleteNotificationRequest): Promise<INotificationsResponse> => {
  const res = await sendDelete(`/notifications/${payload.notificationId}`)
  return res
} 