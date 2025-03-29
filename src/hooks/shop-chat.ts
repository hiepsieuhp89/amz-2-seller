import {
  deleteMessage,
  getListMessageAvailable,
  getMessagesWithUser,
  markMessageAsRead,
  sendMessageToUser
} from "@/api/shop-chat"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useSendMessageToUser = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ userId, message }: any) => 
      sendMessageToUser(userId, message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shopChat'] })
    }
  })
}

export const useGetMessagesWithUser = (userId: string) => {
  return useQuery<any>({
    queryKey: ['shopChat', userId],
    queryFn: () => getMessagesWithUser(userId)
  })
}

export const useMarkMessageAsRead = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (userId: string) => markMessageAsRead(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shopChat'] })
      queryClient.invalidateQueries({ queryKey: ['shopChat', 'list'] })
    }
  })
}

export const useDeleteMessage = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (messageId: string) => deleteMessage(messageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shopChat'] })
    }
  })
}

export const useGetListMessageAvailable = (params: any) => {
  return useQuery<any>({
    queryKey: ['shopChat', 'list', params],
    queryFn: () => getListMessageAvailable(params)
  })
} 