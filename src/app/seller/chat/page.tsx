"use client"
import {
  useDeleteMessage,
  useGetListMessageAvailable,
  useGetMessagesWithUser,
  useMarkMessageAsRead,
  useSendMessageToUser,
} from "@/hooks/shop-chat"
import { Check, MoreVertical, MessageSquare, Send, Trash2, MessageCircle } from "lucide-react"
import {  motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { toast, Toaster } from "react-hot-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Icon } from '@mdi/react';
import { mdiMagnify } from '@mdi/js';

export default function ChatPage() {
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [message, setMessage] = useState("")
  const [newMessagesCount, setNewMessagesCount] = useState(0)
  const { data: chatList, refetch: refetchChatList } = useGetListMessageAvailable({})
  const { data: messages, refetch: refetchMessages } = useGetMessagesWithUser(selectedUser || "")
  const { mutate: sendMessage } = useSendMessageToUser()
  const { mutate: markAsRead } = useMarkMessageAsRead()
  const { mutate: deleteMessage } = useDeleteMessage()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const prevMessagesCount = useRef(messages?.data?.length || 0)

  const transformedChatList =
    chatList?.data?.data?.reduce((acc: any, message: any) => {
      const userId = message.user.id
      const existingChat = acc.find((chat: any) => chat.userId === userId)

      if (existingChat) {
        if (new Date(message.createdAt) > new Date(existingChat.lastMessageDate)) {
          existingChat.lastMessage = message.message
          existingChat.lastMessageDate = message.createdAt
          existingChat.unreadCount += message.isRead ? 0 : 1
        }
      } else {
        acc.push({
          userId: userId,
          userName: message.senderRole === "user" ? message.user.fullName : message.shop.shopName,
          userAvatar: message.senderRole === "user" ? "https://via.placeholder.com/150" : message.shop.logoUrl,
          lastMessage: message.message,
          lastMessageDate: message.createdAt,
          unreadCount: message.isRead ? 0 : 1,
        })
      }
      return acc
    }, [] as any) || []

  // Handle user click
  const handleUserClick = (userId: string) => {
    setSelectedUser(userId)
    refetchMessages() // Fetch messages when user is selected

    // Đánh dấu tin nhắn đã đọc
    const selectedChat = transformedChatList.find((chat: any) => chat.userId === userId)
    if (selectedChat && selectedChat.unreadCount > 0) {
      markAsRead(userId)
    }
  }

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Fetch new messages every 20 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedUser) {
        refetchMessages().then((newData) => {
          const newMessages = newData.data?.data || []
          if (newMessages.length > prevMessagesCount.current) {
            const newCount = newMessages.length - prevMessagesCount.current
            setNewMessagesCount(newCount)
            showNewMessageToast(newCount)
          }
          prevMessagesCount.current = newMessages.length
        })
      }
      refetchChatList()
    }, 20000)

    return () => clearInterval(interval)
  }, [selectedUser, refetchMessages, refetchChatList])

  const showNewMessageToast = (count: number) => {
    toast(
      <div className="flex items-center gap-2 font-medium">
        <MessageSquare className="h-4 w-4 text-blue-500" />
        <span>Bạn có {count} tin nhắn mới</span>
      </div>,
      {
        position: "bottom-right",
        duration: 5000,
        style: {
          background: "#fff",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          borderRadius: "8px",
          padding: "12px 16px",
        },
      },
    )
  }

  const handleSendMessage = () => {
    console.log(selectedUser)
    if (message.trim() && selectedUser) {
      sendMessage(
        { userId: selectedUser, message },
        {
          onSuccess: () => {
            setMessage("")
            setTimeout(() => refetchMessages(), 300)
          },
          onError: (error: any) => {
            toast.error(error.message || "Không thể gửi tin nhắn")
          }
        }
      )
    }
  }

  const handleMarkMessage = (messageId: string) => {
    markAsRead(messageId)
  }

  const handleDeleteMessage = (messageId: string) => {
    deleteMessage(messageId)
    setTimeout(() => refetchMessages(), 300)
  }

  const renderMessageActions = (messageId: string, isSender: boolean) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={`h-6 w-6 p-0 opacity-70 hover:opacity-100 transition-opacity rounded-full ${isSender ? "!text-white hover:bg-orange-300" : "hover:bg-gray-100"}`}
          >
            <MoreVertical className="h-4 w-4" />
            <span className="sr-only">Tùy chọn</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[180px]">
          <DropdownMenuItem onClick={() => handleMarkMessage(messageId)} className="cursor-pointer">
            <Check className="mr-2 h-4 w-4" />
            <span>Đánh dấu đã đọc</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => 
              handleDeleteMessage(messageId)}
            className="cursor-pointer text-destructive focus:text-destructive"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Xoá tin nhắn</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString([], {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <>
      <Toaster />
      <div className="flex flex-col overflow-hidden border p-4" style={{ height: 'calc(100vh - 70px)' }}>
        <div className="flex h-full rounded-[6px] overflow-hidden border">
          {/* Sidebar */}
          <div className="w-[300px] border-r flex flex-col">
            <div className="p-4 border-b bg-white !h-[86px] flex flex-col justify-between">
              <h2 className="text-lg font-semibold text-main-text">Tin nhắn</h2>
              <div className="relative">
                <Input
                  placeholder="Tìm kiếm cuộc trò chuyện"
                  className="rounded-sm h-8 pl-8 border-slate-300 focus-visible:ring-blue-500"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <Icon path={mdiMagnify} size={0.8} className="!text-gray-400" />
                </div>
              </div>
            </div>
            <ScrollArea className="flex flex-col h-full bg-[#F5F5F5]">
              <div className="flex flex-col h-full">
                {transformedChatList?.map((item: any) => (
                  <div
                    key={item.userId}
                    className={`cursor-pointer transition-all duration-200  ${selectedUser === item.userId
                        ? "bg-white border-l-4 border-blue-500"
                        : "hover:bg-white bg-white border-l-4 border-transparent"
                      }`}
                    onClick={() => handleUserClick(item.userId)}
                  >
                    <div className="px-3 py-3">
                      <div className="flex items-start gap-2">
                        <div className="relative flex-shrink-0">
                          <Avatar className="h-12 w-12 border-2 border-white ">
                            <AvatarImage src={item.userAvatar} alt={item.userName} />
                            <AvatarFallback className="bg-gradient-to-br from-[#FCAF17] to-[#FF8C00] text-white">
                              {getInitials(item.userName)}
                            </AvatarFallback>
                          </Avatar>
                          {item.unreadCount > 0 && (
                            <span className="absolute -top-1 -right-1">
                              <Badge
                                variant="destructive"
                                className="h-5 min-w-5 flex items-center justify-center rounded-full animate-pulse"
                              >
                                {item.unreadCount}
                              </Badge>
                            </span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span
                              className={`font-medium text-base ${item.unreadCount > 0 ? "text-slate-900 font-semibold" : "text-slate-700"}`}
                            >
                              {item.userName}
                            </span>
                            <span className="text-xs text-slate-500">{formatTime(item.lastMessageDate)}</span>
                          </div>
                          <div>
                            <p
                              className={`max-w-[300px] text-sm text-wrap ${item.unreadCount > 0 ? "text-slate-800 font-medium" : "text-slate-600"}`}
                            >
                              {item.lastMessage}
                            </p>
                            <p className="text-xs text-slate-400 mt-1">{formatDate(item.lastMessageDate)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="w-[300px] h-24 flex-grow bg-gradient-to-b from-white to-[#FFF7ED]"></div>
            </ScrollArea>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col bg-[#F5F5F5]">
            {selectedUser ? (
              <>
                <div className="p-4 border-b bg-white !h-[86px]">
                  <div className="max-w-full mx-auto">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 border-2 border-white ">
                        <AvatarImage
                          src={transformedChatList.find((chat: any) => chat.userId === selectedUser)?.userAvatar}
                          alt="User avatar"
                        />
                        <AvatarFallback className="bg-gradient-to-br from-[#FCAF17] to-[#FF8C00] text-white">
                          {getInitials(
                            transformedChatList.find((chat: any) => chat.userId === selectedUser)?.userName || "",
                          )}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h2 className="text-lg font-semibold text-slate-800">
                          {transformedChatList.find((chat: any) => chat.userId === selectedUser)?.userName}
                        </h2>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                          <p className="text-sm text-slate-500">Đang hoạt động</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <ScrollArea
                  className="flex-1 p-4 flex flex-col"
                >
                  <div className="max-w-full mx-auto h-full flex flex-1 flex-col space-y-4">
                    {messages?.data?.length ? (
                      messages.data.map((msg: any, index: number) => {
                        const isFirstMessageOfDay =
                          index === 0 ||
                          new Date(msg.createdAt).toDateString() !==
                          new Date(messages.data[index - 1].createdAt).toDateString()

                        const isSender = msg.senderRole !== "user"

                        return (
                          <div key={`message-group-${msg.id}`}>
                            {isFirstMessageOfDay && (
                              <div className="flex justify-center my-4">
                                <div className="bg-white bg-opacity-70 px-3 py-1 rounded-full text-xs text-slate-600 ">
                                  {new Date(msg.createdAt).toLocaleDateString([], {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </div>
                              </div>
                            )}
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.3 }}
                              className={`flex ${isSender ? "justify-end" : "justify-start"}`}
                            >
                              <div className="flex items-start gap-2 max-w-[80%]">
                                {!isSender && (
                                  <Avatar className="h-9 w-9 mt-1">
                                    <AvatarImage
                                      src={
                                        transformedChatList.find((chat: any) => chat.userId === selectedUser)
                                          ?.userAvatar
                                      }
                                      alt="User avatar"
                                    />
                                    <AvatarFallback className="bg-gradient-to-br from-[#FCAF17] to-[#FF8C00] text-white text-xs">
                                      {getInitials(
                                        transformedChatList.find((chat: any) => chat.userId === selectedUser)
                                          ?.userName || "",
                                      )}
                                    </AvatarFallback>
                                  </Avatar>
                                )}
                                <div className={`rounded-lg p-4 border ${isSender ? 'bg-orange-400 text-white' : 'bg-white border-gray-200'
                                  }`}>
                                  <div className="flex justify-between items-start gap-2">
                                    {isSender && renderMessageActions(msg.id, isSender)}
                                    <p className={`text-sm font-medium ${isSender ? 'text-white' : 'text-main-text'
                                      }`}>
                                      {msg.message}
                                    </p>
                                    {!isSender && renderMessageActions(msg.id, isSender)}
                                  </div>
                                  <p className={`text-xs mt-1 text-right ${isSender ? 'text-orange-100' : 'text-gray-400'
                                    }`}>
                                    {formatTime(msg.createdAt)}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          </div>
                        )
                      })
                    ) : (
                      <div className="flex items-center justify-center h-full bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          className="text-center p-10 max-w-md mx-auto"
                        >
                          <div className="mb-6 flex justify-center">
                            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#FCAF17] to-[#FF8C00] flex items-center justify-center ">
                              <MessageCircle className="h-8 w-8 text-white" />
                            </div>
                          </div>

                          <h3 className="text-2xl font-bold text-slate-800 mb-3 tracking-tight">Chào mừng đến với Tin nhắn</h3>

                          <p className="text-slate-600 mb-6 leading-relaxed">
                            Chọn một cuộc trò chuyện từ danh sách bên trái để bắt đầu hoặc tiếp tục cuộc trò chuyện của bạn.
                          </p>

                          <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
                            {[...Array(3)].map((_, i) => (
                              <motion.div
                                key={i}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 0.7 }}
                                transition={{ delay: 0.1 * i + 0.5, duration: 0.3 }}
                                className="h-1 rounded-full bg-gradient-to-r from-[#FCAF17] to-[#FF8C00]"
                              />
                            ))}
                          </div>
                        </motion.div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                <div className="p-4 border-t bg-white">
                  <div className="max-w-full mx-auto">
                    <div className="flex items-end gap-2">
                      <Input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault()
                            handleSendMessage()
                          }
                        }}
                        placeholder="Nhập tin nhắn..."
                        className="h-10 border-slate-300 focus-visible:ring-blue-500"
                      />
                      <Button
                        onClick={handleSendMessage}
                        className="h-10 transition-shadow !bg-main-dark-blue text-white"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Gửi
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center p-10 max-w-md mx-auto"
                >
                  <div className="mb-6 flex justify-center">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#FCAF17] to-[#FF8C00] flex items-center justify-center ">
                      <MessageCircle className="h-8 w-8 text-white" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-800 mb-3 tracking-tight">Chào mừng đến với Tin nhắn</h3>

                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Chọn một cuộc trò chuyện từ danh sách bên trái để bắt đầu hoặc tiếp tục cuộc trò chuyện của bạn.
                  </p>

                  <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.7 }}
                        transition={{ delay: 0.1 * i + 0.5, duration: 0.3 }}
                        className="h-1 rounded-full bg-gradient-to-r from-[#FCAF17] to-[#FF8C00]"
                      />
                    ))}
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

