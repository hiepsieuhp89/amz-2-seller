"use client"
import {
  useDeleteMessage,
  useGetListMessageAvailable,
  useGetMessagesWithUser,
  useMarkMessageAsRead,
  useSendMessageToUser,
} from "@/hooks/shop-chat"
import { Check, MoreVertical, MessageSquare, Send, Trash2, MessageCircle } from "lucide-react"
import { motion } from "framer-motion"
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

// Helper function to get initials from name
const getInitials = (name: string = "") => {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .substring(0, 2)
}

// Helper function to format time
const formatTime = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString([], {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export default function ChatPage() {
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [message, setMessage] = useState("")
  const { data: chatList, refetch: refetchChatList } = useGetListMessageAvailable({})
  const { data: messages, refetch: refetchMessages } = useGetMessagesWithUser(selectedUser || "")
  const { mutate: sendMessage } = useSendMessageToUser()
  const { mutate: markAsRead } = useMarkMessageAsRead()
  const { mutate: deleteMessage } = useDeleteMessage()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [showMobileSidebar, setShowMobileSidebar] = useState(false)

  // Transform chat list data
  const transformedChatList = (
    chatList?.data?.data?.reduce((acc: any, msg: any) => {
      const userId = msg.user.id
      const existingChat = acc.find((chat: any) => chat.userId === userId)

      const chatItem = {
        userId: userId,
        userName: msg.senderRole === "user" ? msg.user.fullName : msg.shop.shopName,
        userAvatar: msg.senderRole === "user" ? "https://via.placeholder.com/150" : msg.shop.logoUrl, // Consider a default avatar
        lastMessage: msg.message,
        lastMessageDate: msg.createdAt,
        unreadCount: msg.isRead ? 0 : 1,
        latestMessageId: msg.id, // Store the latest message ID
      }

      if (existingChat) {
        if (new Date(msg.createdAt) > new Date(existingChat.lastMessageDate)) {
          existingChat.lastMessage = chatItem.lastMessage
          existingChat.lastMessageDate = chatItem.lastMessageDate
          existingChat.unreadCount += chatItem.unreadCount // Accumulate unread count correctly
          existingChat.latestMessageId = chatItem.latestMessageId // Update latest message ID
        } else {
          // If older message, still potentially increment unread count
          existingChat.unreadCount += chatItem.unreadCount
        }
      } else {
        acc.push(chatItem)
      }
      return acc
    }, [] as any) || []
  ).sort((a: any, b: any) => new Date(b.lastMessageDate).getTime() - new Date(a.lastMessageDate).getTime()) // Sort by most recent message


  const handleUserClick = async (userId: string) => {
    if (selectedUser === userId) return // Avoid re-selecting the same user

    setSelectedUser(userId)
    // refetchMessages() is handled by react-query's enabled flag

    const selectedChat = transformedChatList.find((chat: any) => chat.userId === userId)
    if (selectedChat?.unreadCount > 0 && selectedChat?.latestMessageId) {
      try {
        // Call markAsRead with the latest message ID instead of userId
        await markAsRead(selectedChat.latestMessageId);
        // Refetch chat list on success
        refetchChatList();
      } catch (error) {
        // Optional: Handle error if markAsRead fails
        console.error("Failed to mark chat as read:", error);
        toast.error("Lỗi đánh dấu đã đọc", { id: 'mark-read-error' })
      }
    }
    setShowMobileSidebar(false)
  }

  // Scroll to bottom effect
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages?.data]) // Depend on messages.data for accurate scrolling

  // Polling effect for new messages and chat list updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedUser) {
        refetchMessages() // Refetch messages for the selected user
      }
      refetchChatList() // Always refetch the chat list
    }, 15000) // Poll every 15 seconds

    return () => clearInterval(interval)
  }, [selectedUser, refetchMessages, refetchChatList])

  // Effect to show toast for new messages (simplified)
  useEffect(() => {
    // This logic could be improved by comparing previous and current message lists
    // or by using a WebSocket connection for real-time updates.
    // For now, skipping the new message count toast to avoid complexity with polling.
  }, [messages?.data])


  const handleSendMessage = () => {
    const trimmedMessage = message.trim()
    if (trimmedMessage && selectedUser) {
      sendMessage(
        { userId: selectedUser, message: trimmedMessage },
        {
          onSuccess: () => {
            setMessage("")
            // Let react-query handle the refetch after mutation if configured,
            // or rely on the polling interval.
            // setTimeout(() => refetchMessages(), 100) // Optional: faster refresh
          },
          onError: (error: any) => {
            toast.error(error.message || "Không thể gửi tin nhắn", { id: 'send-error' })
          },
        },
      )
    }
  }

  // Removed handleMarkMessage as marking is done on user click
  // Individual message marking might need a different API call or logic

  const handleDeleteMessage = (messageId: string) => {
    deleteMessage(messageId, {
      onSuccess: () => {
        // Let react-query handle the refetch or rely on polling
        // setTimeout(() => refetchMessages(), 100) // Optional: faster refresh
        toast.success("Đã xoá tin nhắn", { id: 'delete-success' })
      },
      onError: (error: any) => {
        toast.error(error.message || "Lỗi xoá tin nhắn", { id: 'delete-error' })
      }
    })
  }

  const renderMessageActions = (messageId: string, isSender: boolean) => {
    // Only show actions for sender's messages for now
    if (!isSender) return null;

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={`h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-full ${isSender ? "text-primary-foreground/80 hover:bg-main-gunmetal-blue/80/80" : "text-muted-foreground hover:bg-accent"}`}
          >
            <MoreVertical className="h-4 w-4" />
            <span className="sr-only">Tùy chọn</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          {/* <DropdownMenuItem onClick={() => {}} className="cursor-pointer">
            <Check className="mr-2 h-4 w-4" />
            <span>Đánh dấu đã đọc</span>
          </DropdownMenuItem> */}
          <DropdownMenuItem
            onClick={() => handleDeleteMessage(messageId)}
            className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Xoá tin nhắn</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  const selectedUserDetails = transformedChatList.find((chat: any) => chat.userId === selectedUser)

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      {/* Adjusted height calculation if necessary, consider using flex-grow for content */}
      <div className="flex h-[calc(100vh-80px)] overflow-hidden border bg-background rounded-lg">
        {/* --- Sidebar (Desktop) --- */}
        <aside className="w-[320px] border-r flex-col hidden md:flex">
          {/* Sidebar Header */}
          <div className="p-1 px-2 border-b h-[75px]">
            <h2 className="text-base font-semibold">Tin nhắn</h2>
            <div className="relative">
              <Input
                placeholder="Tìm kiếm..."
                className="rounded-md h-9 pl-9 text-sm focus-visible:ring-primary focus-visible:ring-offset-0"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Icon path={mdiMagnify} size={0.8} />
              </div>
            </div>
          </div>
          {/* Sidebar Chat List */}
          <ScrollArea className="flex-1 bg-background">
            <div className="flex flex-col p-2">
              {transformedChatList?.map((item: any) => (
                <div
                  key={item.userId}
                  className={`flex items-start gap-3 p-3 rounded-md cursor-pointer transition-colors duration-150 ease-in-out ${selectedUser === item.userId
                      ? "bg-muted"
                      : "hover:bg-muted/60"
                    }`}
                  onClick={() => handleUserClick(item.userId)}
                >
                  {/* Avatar + Badge */}
                  <div className="relative flex-shrink-0 mt-1">
                    <Avatar className="h-11 w-11 border bg-gradient-to-br from-main-gunmetal-blue/50 to-main-gunmetal-blue/70">
                      <AvatarImage src={item.userAvatar} alt={item.userName} />
                      <AvatarFallback className="bg-gradient-to-br from-main-gunmetal-blue/10 to-main-gunmetal-blue/70 text-primary-foreground text-sm font-semibold">
                        {getInitials(item.userName)}
                      </AvatarFallback>
                    </Avatar>
                    {item.unreadCount > 0 && (
                      <Badge
                        variant="destructive"
                        className="absolute -top-1 -right-1 h-5 min-w-[20px] p-1 flex items-center justify-center rounded-full text-xs"
                      >
                        {item.unreadCount}
                      </Badge>
                    )}
                  </div>
                  {/* User Info + Last Message */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span
                        className={`font-semibold truncate text-main-gunmetal-blue/80"}`}
                      >
                        {item.userName}
                      </span>
                      <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                        {formatTime(item.lastMessageDate)}
                      </span>
                    </div>
                    <p
                      className={`text-sm truncate text-muted-foreground`}
                    >
                      {item.lastMessage}
                    </p>
                    <p className="text-xs text-muted-foreground/80 mt-1">{formatDate(item.lastMessageDate)}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </aside>

        {/* --- Mobile Sidebar Toggle --- */}
        <div className="md:hidden fixed bottom-5 right-5 z-50">
          <Button
            size="icon"
            onClick={() => setShowMobileSidebar(true)}
            className="rounded-full h-14 w-14 shadow-lg bg-main-gunmetal-blue/80 hover:bg-main-gunmetal-blue/80/90 text-primary-foreground"
          >
            <MessageSquare className="h-6 w-6" />
            <span className="sr-only">Mở tin nhắn</span>
          </Button>
        </div>

        {/* --- Mobile Sidebar --- */}
        {showMobileSidebar && (
          <div className="fixed inset-0 bg-black/60 z-40 md:hidden" onClick={() => setShowMobileSidebar(false)}>
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside sidebar
              className="absolute inset-y-0 left-0 w-[85%] max-w-[350px] bg-background border-r flex flex-col"
            >
              {/* Mobile Sidebar Header */}
              <div className="p-4 border-b h-[75px]">
                <h2 className="text-xl font-semibold mb-3">Tin nhắn</h2>
                <div className="relative">
                  <Input
                    placeholder="Tìm kiếm..."
                    className="rounded-md h-9 pl-9 text-sm focus-visible:ring-primary focus-visible:ring-offset-0"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <Icon path={mdiMagnify} size={0.8} />
                  </div>
                </div>
              </div>
              {/* Mobile Sidebar Chat List */}
              <ScrollArea className="flex-1">
                <div className="flex flex-col p-2">
                  {transformedChatList?.map((item: any) => (
                    <div
                      key={`mobile-${item.userId}`}
                      className={`flex items-start gap-3 p-3 rounded-md cursor-pointer transition-colors duration-150 ease-in-out ${selectedUser === item.userId ? "bg-muted" : "hover:bg-muted/60"}`}
                      onClick={() => handleUserClick(item.userId)}
                    >
                      <div className="relative flex-shrink-0 mt-1">
                        <Avatar className="h-11 w-11 border bg-gradient-to-br from-main-gunmetal-blue/50 to-main-gunmetal-blue/70">
                          <AvatarImage src={item.userAvatar} alt={item.userName} />
                          <AvatarFallback className="bg-gradient-to-br from-main-gunmetal-blue/10 to-main-gunmetal-blue/70 text-primary-foreground text-sm font-semibold">
                            {getInitials(item.userName)}
                          </AvatarFallback>
                        </Avatar>
                        {item.unreadCount > 0 && (
                          <Badge
                            variant="destructive"
                            className="absolute -top-1 -right-1 h-5 min-w-[20px] p-1 flex items-center justify-center rounded-full text-xs"
                          >
                            {item.unreadCount}
                          </Badge>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className={`font-semibold truncate ${item.unreadCount > 0 ? "text-foreground" : "text-foreground/90"}`}>{item.userName}</span>
                          <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">{formatTime(item.lastMessageDate)}</span>
                        </div>
                        <p className={`text-sm truncate ${item.unreadCount > 0 ? "text-foreground font-medium" : "text-muted-foreground"}`}>{item.lastMessage}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </motion.aside>
          </div>
        )}

        {/* --- Main Content Area --- */}
        <main className="flex-1 flex flex-col bg-muted/40">
          {selectedUser ? (
            <>
              {/* Chat Header */}
              <header className="p-3 border-b bg-background h-[75px] flex items-center">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border bg-gradient-to-br from-main-gunmetal-blue/50 to-main-gunmetal-blue/70">
                    <AvatarImage src={selectedUserDetails?.userAvatar} alt="User avatar" />
                    <AvatarFallback className="bg-gradient-to-br from-main-gunmetal-blue/10 to-main-gunmetal-blue/70 text-primary-foreground text-sm font-semibold">
                      {getInitials(selectedUserDetails?.userName)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-base font-semibold text-foreground">
                      {selectedUserDetails?.userName}
                    </h2>
                    {/* Status indicator can be added here if needed */}
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <p className="text-xs text-muted-foreground">Đang hoạt động</p>
                    </div>
                  </div>
                </div>
              </header>

              {/* Message List */}
              <ScrollArea className="flex-1 p-4">
                <div className="max-w-full mx-auto flex flex-col space-y-1.5">
                  {messages?.data?.length ? (
                    messages.data.map((msg: any, index: number) => {
                      const isFirstMessageOfDay = index === 0 || new Date(msg.createdAt).toDateString() !== new Date(messages.data[index - 1].createdAt).toDateString()
                      const isSender = msg.senderRole !== "user" // Assuming 'shop' is the sender

                      return (
                        <div key={`message-group-${msg.id}`}>
                          {/* Date Separator */}
                          {isFirstMessageOfDay && (
                            <div className="flex justify-center my-4">
                              <div className="bg-background border px-3 py-1 rounded-full text-xs text-muted-foreground shadow-sm">
                                {new Date(msg.createdAt).toLocaleDateString([], { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                              </div>
                            </div>
                          )}
                          {/* Message Item */}
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                            className={`flex group ${isSender ? "justify-end" : "justify-start"}`}
                          >
                            <div className={`flex items-end gap-2 max-w-[75%] ${isSender ? "flex-row-reverse" : "flex-row"}`}>
                              {/* Avatar for received messages */}
                              {!isSender && (
                                <Avatar className="h-7 w-7 flex-shrink-0 mb-1">
                                  <AvatarImage src={selectedUserDetails?.userAvatar} alt="User avatar" />
                                  <AvatarFallback className="bg-main-gunmetal-blue/80 text-primary-foreground text-xs font-semibold">
                                    {getInitials(selectedUserDetails?.userName)}
                                  </AvatarFallback>
                                </Avatar>
                              )}
                              {/* Message Bubble */}
                              <div className={`rounded-lg py-2 px-3 border text-sm shadow-sm ${isSender ? 'bg-main-gunmetal-blue/80 text-primary-foreground rounded-br-none' : 'bg-card text-card-foreground rounded-bl-none'}`}>
                                <p className="font-normal break-words whitespace-pre-wrap">
                                  {msg.message}
                                </p>
                                <p className={`text-xs mt-1 text-right ${isSender ? 'text-primary-foreground/70' : 'text-muted-foreground/70'}`}>
                                  {formatTime(msg.createdAt)}
                                </p>
                              </div>
                              {/* Message Actions (only for sender) */}
                              {renderMessageActions(msg.id, isSender)}
                            </div>
                          </motion.div>
                        </div>
                      )
                    })
                  ) : (
                    /* Empty Chat Placeholder */
                    <div className="flex items-center justify-center h-[calc(100%-75px)]">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center p-6 max-w-xs mx-auto"
                      >
                        <div className="mb-4 flex justify-center">
                          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground">
                            <MessageCircle className="h-8 w-8" />
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-1">Bắt đầu trò chuyện</h3>
                        <p className="text-sm text-muted-foreground">Chưa có tin nhắn nào trong cuộc trò chuyện này.</p>
                      </motion.div>
                    </div>
                  )}
                  {/* Element to scroll to */}
                  <div ref={messagesEndRef} className="h-px" />
                </div>
              </ScrollArea>

              {/* Message Input Area */}
              <footer className="p-3 border-t bg-background">
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
                    className="h-10 flex-1 resize-none focus-visible:ring-primary focus-visible:ring-offset-0"
                    autoComplete="off"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!message.trim() || !selectedUser}
                    className="h-10 transition-colors duration-200 ease-in-out bg-main-gunmetal-blue/80 hover:bg-main-gunmetal-blue/90 text-primary-foreground disabled:opacity-50 rounded-[6px]"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Gửi
                  </Button>
                </div>
              </footer>
            </>
          ) : (
            /* Placeholder when no user is selected */
            <div className="flex items-center justify-center h-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center p-10 max-w-sm mx-auto"
              >
                <div className="mb-5 flex justify-center">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground">
                    <MessageCircle className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Tin nhắn</h3>
                <p className="text-sm text-muted-foreground">Chọn một người dùng từ danh sách bên trái để bắt đầu nhắn tin.</p>
              </motion.div>
            </div>
          )}
        </main>
      </div>
    </>
  )
}

