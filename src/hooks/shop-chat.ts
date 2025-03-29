import { 
  sendMessageToUser, 
  getMessagesWithUser, 
  markMessageAsRead, 
  deleteMessage, 
  getListMessageAvailable 
} from "@/api/shop-chat"
import type { IShopChatResponse } from "@/interface/response/shop-chat"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useSendMessageToUser = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ userId, message }: { userId: string, message: string }) => 
      sendMessageToUser(userId, message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shopChat'] })
    }
  })
}

export const useGetMessagesWithUser = (userId: string) => {
  return useQuery<IShopChatResponse>({
    queryKey: ['shopChat', userId],
    queryFn: () => getMessagesWithUser(userId)
  })
}

export const useMarkMessageAsRead = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (messageId: string) => markMessageAsRead(messageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shopChat'] })
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

export const useGetListMessageAvailable = (params: {
  order?: string
  page?: number
  take?: number
  search?: string
}) => {
  return useQuery<IShopChatResponse>({
    queryKey: ['shopChat', 'list', params],
    queryFn: () => getListMessageAvailable(params)
  })
} 