import { 
  getUnreadNotifications, 
  getAllNotifications, 
  markAsRead, 
  markAllAsRead, 
  deleteNotification 
} from "@/api/notification"
import type { IMarkAsReadRequest, IDeleteNotificationRequest } from "@/interface/request/notification"
import type { INotificationsResponse } from "@/interface/response/notification"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useGetUnreadNotifications = () => {
  return useQuery({
    queryKey: ['unreadNotifications'],
    queryFn: () => getUnreadNotifications(),
  })
}

export const useGetAllNotifications = () => {
  return useQuery({
    queryKey: ['allNotifications'],
    queryFn: () => getAllNotifications(),
  })
}

export const useMarkAsRead = () => {
  const queryClient = useQueryClient()
  
  return useMutation<INotificationsResponse, Error, IMarkAsReadRequest>({
    mutationFn: (params) => markAsRead(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['unreadNotifications'] })
      queryClient.invalidateQueries({ queryKey: ['allNotifications'] })
    }
  })
}

export const useMarkAllAsRead = () => {
  const queryClient = useQueryClient()
  
  return useMutation<INotificationsResponse, Error, void>({
    mutationFn: () => markAllAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['unreadNotifications'] })
      queryClient.invalidateQueries({ queryKey: ['allNotifications'] })
    }
  })
}

export const useDeleteNotification = () => {
  const queryClient = useQueryClient()
  
  return useMutation<INotificationsResponse, Error, IDeleteNotificationRequest>({
    mutationFn: (params) => deleteNotification(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['unreadNotifications'] })
      queryClient.invalidateQueries({ queryKey: ['allNotifications'] })
    }
  })
} 