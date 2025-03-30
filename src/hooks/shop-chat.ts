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
    mutationFn: ({ userId, message }: { userId: string; message: string }) => 
      sendMessageToUser(userId, message),
    onSuccess: (_: any, variables: { userId: string; message: string }) => {
      queryClient.invalidateQueries({ queryKey: ['shopChat', variables.userId] })
      queryClient.invalidateQueries({ queryKey: ['shopChat', 'list'] })
    },
    onError: (error: any) => {
      throw new Error(error.response?.data?.message || "Lỗi khi gửi tin nhắn")
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
    onSuccess: (_: any, userId: string) => {
      queryClient.invalidateQueries({ queryKey: ['shopChat', userId] })
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
      queryClient.invalidateQueries({ queryKey: ['shopChat', 'list'] })
    }
  })
}

export const useGetListMessageAvailable = (params: any) => {
  return useQuery<any>({
    queryKey: ['shopChat', 'list', params],
    queryFn: () => getListMessageAvailable(params)
  })
} 