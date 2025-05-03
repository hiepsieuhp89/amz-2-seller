"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  useDeleteMessage,
  useGetListMessageAvailable,
  useGetMessagesWithUser,
  useMarkAllMessagesWithUserAsRead,
  useMarkMessageAsRead,
  useSendMessageToUser
} from "@/hooks/shop-chat";
import { useGetShopProductDetail } from "@/hooks/shop-products";
import { formatDate as formatDateUtil } from "@/utils";
import { mdiChevronLeft, mdiMagnify } from "@mdi/js";
import { Icon } from "@mdi/react";
import { motion } from "framer-motion";
import {
  Eye,
  MessageCircle,
  MoreVertical,
  Send,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
// import { useMarkAsRead } from "@/hooks/notification";

const getInitials = (name: string = "") => {
  if (!name) return "UN";

  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
};

const formatTime = (dateString: string) => {
  return formatDateUtil(dateString, "time");
};

const formatDate = (dateString: string) => {
  return formatDateUtil(dateString, "date-text");
};

const ProductCard = ({ productId }: { productId: string }) => {
  const { data: response, isLoading } = useGetShopProductDetail(productId);
  const productData = response?.data as any;
  const product = productData?.product;

  if (isLoading) {
    return (
      <div className="mt-2 border rounded-md p-3 bg-background flex items-center space-x-3">
        <div className="w-16 h-16 bg-gray-200 animate-pulse rounded-md"></div>
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mt-2 border rounded-md p-3 bg-background flex items-center">
        <p className="text-sm text-muted-foreground">
          Sản phẩm không tồn tại hoặc đã bị xóa
        </p>
      </div>
    );
  }

  const isOnSale = Number(product.salePrice) > 0 && product.price !== product.salePrice;
  const displayPrice = isOnSale ? product.salePrice : product.price;

  return (
    <div className="mt-2 border rounded-md p-3 bg-background hover:bg-muted/30 transition-colors">
      <div className="flex space-x-3">
        <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-md border">
          <img
            src={
              product.imageUrl ||
              product.imageUrls?.[0] ||
              "https://via.placeholder.com/150"
            }
            alt={product.name}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="flex flex-1 flex-col">
          <h3 className="text-sm font-medium text-foreground line-clamp-2">
            {product.name}
          </h3>
          <div className="flex items-baseline mt-1">
            <span className="text-xs text-destructive font-semibold">
              {Number(displayPrice || 0).toLocaleString()} đ
            </span>
            {isOnSale && (
              <span className="ml-2 text-xs text-muted-foreground line-through">
                {Number(product.price || 0).toLocaleString()} đ
              </span>
            )}
          </div>
          <div className="flex mt-2 space-x-2 justify-end">
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-2.5 text-xs rounded-md"
              onClick={() =>
                window.open(
                  `${process.env.NEXT_PUBLIC_HOME_URL}/shop/product?id=${product.id}`,
                  "_blank"
                )
              }
            >
              <Eye className="h-3.5 w-3.5 mr-1.5" />
              Chi tiết
            </Button>
            <Button
              size="sm"
              className="h-8 px-2.5 text-xs rounded-md bg-main-golden-orange hover:bg-main-golden-orange/90 text-primary-foreground"
            >
              <ShoppingCart className="h-3.5 w-3.5 mr-1.5" />
              Mua ngay
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ChatPage() {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const { data: chatList, refetch: refetchChatList } =
    useGetListMessageAvailable({});
  const { data: messages, refetch: refetchMessages } = useGetMessagesWithUser(
    selectedUser || ""
  );
  const { mutate: sendMessage } = useSendMessageToUser();
  const { mutate: markAllAsRead } = useMarkAllMessagesWithUserAsRead();
  const { mutate: deleteMessage } = useDeleteMessage();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showMobileSidebar, setShowMobileSidebar] = useState(true);
  const { mutate: markMessageAsRead } = useMarkMessageAsRead();
  const [chatListState, setChatListState] = useState<any[]>([]);
  useEffect(() => {
    if (chatList?.data?.data) {
      const transformed = (
        chatList.data.data.reduce((acc: any, msg: any) => {
          if (!msg?.user && msg?.senderRole === "user") return acc;

          const userId = msg?.user?.id;
          if (msg?.senderRole === "user" && !userId) return acc;

          const existingChat = acc.find((chat: any) => chat.userId === userId);

          const chatItem = {
            userId: userId,
            userName:
              msg.senderRole === "user" ? msg?.user?.fullName || "Unknown User" : msg?.shop?.shopName || "Unknown Shop",
            userAvatar:
              msg.senderRole === "user"
                ? "https://via.placeholder.com/150"
                : msg?.shop?.logoUrl || "https://via.placeholder.com/150",
            lastMessage: msg.message || "",
            lastMessageDate: msg.createdAt,
            unreadCount: msg.isRead ? 0 : 1,
            latestMessageId: msg.id,
          };

          if (existingChat) {
            if (new Date(msg.createdAt) > new Date(existingChat.lastMessageDate)) {
              existingChat.lastMessage = chatItem.lastMessage;
              existingChat.lastMessageDate = chatItem.lastMessageDate;
              existingChat.unreadCount += chatItem.unreadCount; // Accumulate unread count correctly
              existingChat.latestMessageId = chatItem.latestMessageId; // Update latest message ID
            } else {
              existingChat.unreadCount += chatItem.unreadCount;
            }
          } else {
            acc.push(chatItem);
          }
          return acc;
        }, [] as any) || []
      ).sort(
        (a: any, b: any) =>
          new Date(b.lastMessageDate).getTime() -
          new Date(a.lastMessageDate).getTime()
      );
      setChatListState(transformed);
    }
  }, [chatList]);

  const handleUserClick = (userId: string) => {
    if (!userId || selectedUser === userId) return;

    setSelectedUser(userId);

    setChatListState(prev =>
      prev.map(item =>
        item.userId === userId ? { ...item, unreadCount: 0 } : item
      )
    );

    // Lọc ra tất cả các tin nhắn chưa đọc của người dùng được chọn
    const unreadMessages = chatList?.data?.data.filter(
      (msg: any) => msg.userId === userId && !msg.isRead
    );

    // Gọi API markMessageAsRead cho từng tin nhắn chưa đọc
    if (unreadMessages && unreadMessages.length > 0) {
      unreadMessages.forEach((msg: any) => {
        markMessageAsRead(msg.id, {
          onSuccess: () => {
            refetchChatList();
          }
        });
      });
    }

    setShowMobileSidebar(false);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages?.data]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedUser) {
        refetchMessages();
        refetchChatList();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [selectedUser, refetchMessages, refetchChatList]);

  useEffect(() => {
  }, [messages?.data]);

  const handleSendMessage = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage && selectedUser) {
      sendMessage(
        { userId: selectedUser, message: trimmedMessage },
        {
          onSuccess: () => {
            setMessage("");
          },
          onError: (error: any) => {
            toast.error(error.message || "Không thể gửi tin nhắn", {
              id: "send-error",
            });
          },
        }
      );
    }
  };

  const handleDeleteMessage = (messageId: string) => {
    deleteMessage(messageId, {
      onSuccess: () => {
        toast.success("Đã xoá tin nhắn", { id: "delete-success" });
      },
      onError: (error: any) => {
        toast.error(error.message || "Lỗi xoá tin nhắn", {
          id: "delete-error",
        });
      },
    });
  };

  const renderMessageActions = (messageId: string, isSender: boolean) => {
    if (!isSender) return null;

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={`h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-full ${isSender
              ? "text-primary-foreground/80 hover:bg-main-gunmetal-blue/80/80"
              : "text-muted-foreground hover:bg-accent"
              }`}
          >
            <MoreVertical className="h-4 w-4" />
            <span className="sr-only">Tùy chọn</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem
            onClick={() => handleDeleteMessage(messageId)}
            className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Xoá tin nhắn</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const selectedUserDetails = chatListState.find(
    (chat: any) => chat.userId === selectedUser
  );
  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <div className="flex h-[calc(100vh-68px)] overflow-hidden border bg-background">
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
              {chatListState?.map((item: any) => (
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
                    <p className={`text-sm truncate text-muted-foreground`}>
                      {item.lastMessage}
                    </p>
                    <p className="text-xs text-muted-foreground/80 mt-1">
                      {formatDate(item.lastMessageDate)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </aside>
        {/* Mobile View */}
        {showMobileSidebar ? (
          <div className="md:hidden flex flex-col bg-background w-full rounded-none">
            {/* Mobile Sidebar Header */}
            <div className="border-b h-[80px] p-2 px-4
            md:h-[75px] md:p-4">
              <h2 className="text-lg md:text-xl font-semibold md:mb-3">Tin nhắn</h2>
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
                {chatListState?.map((item: any) => (
                  <div
                    key={`mobile-${item.userId}`}
                    className={`flex items-start gap-3 p-3 rounded-md cursor-pointer transition-colors duration-150 ease-in-out ${selectedUser === item.userId
                      ? "bg-muted"
                      : "hover:bg-muted/60"
                      }`}
                    onClick={() => handleUserClick(item.userId)}
                  >
                    <div className="relative flex-shrink-0 mt-1">
                      <Avatar className="h-11 w-11 border bg-gradient-to-br from-main-gunmetal-blue/50 to-main-gunmetal-blue/70">
                        <AvatarImage
                          src={item.userAvatar}
                          alt={item.userName}
                        />
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
                        <span
                          className={`font-semibold truncate ${item.unreadCount > 0
                            ? "text-foreground"
                            : "text-foreground/90"
                            }`}
                        >
                          {item.userName}
                        </span>
                        <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                          {formatTime(item.lastMessageDate)}
                        </span>
                      </div>
                      <p
                        className={`text-sm truncate ${item.unreadCount > 0
                          ? "text-foreground font-medium"
                          : "text-muted-foreground"
                          }`}
                      >
                        {item.lastMessage}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        ) : (
          /* Mobile Chat Detail */
          <div className="md:hidden flex flex-col bg-background w-full">
            {/* Mobile Chat Header */}
            <header className="p-2 px-4 border-b bg-background h-[80px] flex items-center">
              <button
                className="mr-4 rounded-[4px] bg-transparent px-0 hover:bg-transparent flex !justify-start"
                onClick={() => setShowMobileSidebar(true)}
              >
                <Icon path={mdiChevronLeft} size={1.3} className="text-gray-500 -ml-2" />
              </button>
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border bg-gradient-to-br from-main-gunmetal-blue/50 to-main-gunmetal-blue/70">
                  <AvatarImage
                    src={selectedUserDetails?.userAvatar}
                    alt="User avatar"
                  />
                  <AvatarFallback className="bg-gradient-to-br from-main-gunmetal-blue/10 to-main-gunmetal-blue/70 text-primary-foreground text-sm font-semibold">
                    {getInitials(selectedUserDetails?.userName)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-base font-semibold text-foreground">
                    {selectedUserDetails?.userName}
                  </h2>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <p className="text-xs text-muted-foreground">
                      Đang hoạt động
                    </p>
                  </div>
                </div>
              </div>
            </header>

            {/* Mobile Message List */}
            <ScrollArea className="flex-1 p-4">
              <div className="max-w-full mx-auto flex flex-col space-y-1.5">
                {messages?.data?.length ? (
                  messages.data.map((msg: any, index: number) => {
                    const isFirstMessageOfDay =
                      index === 0 ||
                      new Date(msg.createdAt).toDateString() !==
                      new Date(
                        messages.data[index - 1].createdAt
                      ).toDateString();
                    const isSender = msg.senderRole !== "user"; // Assuming 'shop' is the sender

                    return (
                      <div key={`mobile-message-${msg.id}`}>
                        {/* Date Separator */}
                        {isFirstMessageOfDay && (
                          <div className="flex justify-center my-4">
                            <div className="bg-background border px-3 py-1 rounded-full text-xs text-muted-foreground shadow-sm">
                              {new Date(msg.createdAt).toLocaleDateString(
                                [],
                                {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </div>
                          </div>
                        )}
                        {/* Message Item */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                          className={`flex group ${isSender ? "justify-end" : "justify-start"
                            }`}
                        >
                          <div
                            className={`flex items-end gap-2 max-w-[75%] ${isSender ? "flex-row-reverse" : "flex-row"
                              }`}
                          >
                            {/* Avatar for received messages */}
                            {!isSender && (
                              <Avatar className="h-7 w-7 flex-shrink-0 mb-1">
                                <AvatarImage
                                  src={selectedUserDetails?.userAvatar}
                                  alt="User avatar"
                                />
                                <AvatarFallback className="bg-main-gunmetal-blue/80 text-primary-foreground text-xs font-semibold">
                                  {getInitials(selectedUserDetails?.userName)}
                                </AvatarFallback>
                              </Avatar>
                            )}
                            {/* Message Bubble */}
                            <div
                              className={`rounded-lg py-2 px-3 border text-sm shadow-sm ${isSender
                                ? "bg-main-gunmetal-blue/80 text-primary-foreground rounded-br-none"
                                : "bg-card text-card-foreground rounded-bl-none"
                                }`}
                            >
                              <p className="font-normal break-words whitespace-pre-wrap">
                                {msg.message}
                              </p>
                              {msg.shopProductId && (
                                <ProductCard productId={msg.shopProductId} />
                              )}
                              <p
                                className={`text-xs mt-1 text-right ${isSender
                                  ? "text-primary-foreground/70"
                                  : "text-muted-foreground/70"
                                  }`}
                              >
                                {formatTime(msg.createdAt)}
                              </p>
                            </div>
                            {renderMessageActions(msg.id, isSender)}
                          </div>
                        </motion.div>
                      </div>
                    );
                  })
                ) : (
                  <div className="md:flex hidden items-center justify-center h-[calc(100%-75px)]">
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
                      <h3 className="text-xl font-semibold text-foreground mb-1">
                        Bắt đầu trò chuyện
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Chưa có tin nhắn nào trong cuộc trò chuyện này.
                      </p>
                    </motion.div>
                  </div>
                )}
                {/* Element to scroll to */}
                <div ref={messagesEndRef} className="h-px" />
              </div>
            </ScrollArea>

            {/* Mobile Message Input Area */}
            <footer className="p-3 border-t bg-background">
              <div className="flex items-end gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
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
          </div>
        )}
        <main className="flex-1 md:flex hidden flex-col bg-muted/40">
          {selectedUser ? (
            <>
              {/* Chat Header */}
              <header className="p-3 border-b bg-background h-[75px] flex items-center">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border bg-gradient-to-br from-main-gunmetal-blue/50 to-main-gunmetal-blue/70">
                    <AvatarImage
                      src={selectedUserDetails?.userAvatar}
                      alt="User avatar"
                    />
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
                      <p className="text-xs text-muted-foreground">
                        Đang hoạt động
                      </p>
                    </div>
                  </div>
                </div>
              </header>

              {/* Message List */}
              <ScrollArea className="flex-1 p-4">
                <div className="max-w-full mx-auto flex flex-col space-y-1.5">
                  {messages?.data?.length ? (
                    messages.data.map((msg: any, index: number) => {
                      const isFirstMessageOfDay =
                        index === 0 ||
                        new Date(msg.createdAt).toDateString() !==
                        new Date(
                          messages.data[index - 1].createdAt
                        ).toDateString();
                      const isSender = msg.senderRole !== "user"; // Assuming 'shop' is the sender

                      return (
                        <div key={`message-group-${msg.id}`}>
                          {/* Date Separator */}
                          {isFirstMessageOfDay && (
                            <div className="flex justify-center my-4">
                              <div className="bg-background border px-3 py-1 rounded-full text-xs text-muted-foreground shadow-sm">
                                {new Date(msg.createdAt).toLocaleDateString(
                                  [],
                                  {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )}
                              </div>
                            </div>
                          )}
                          {/* Message Item */}
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                            className={`flex group ${isSender ? "justify-end" : "justify-start"
                              }`}
                          >
                            <div
                              className={`flex items-end gap-2 max-w-[75%] ${isSender ? "flex-row-reverse" : "flex-row"
                                }`}
                            >
                              {/* Avatar for received messages */}
                              {!isSender && (
                                <Avatar className="h-7 w-7 flex-shrink-0 mb-1">
                                  <AvatarImage
                                    src={selectedUserDetails?.userAvatar}
                                    alt="User avatar"
                                  />
                                  <AvatarFallback className="bg-main-gunmetal-blue/80 text-primary-foreground text-xs font-semibold">
                                    {getInitials(selectedUserDetails?.userName)}
                                  </AvatarFallback>
                                </Avatar>
                              )}
                              {/* Message Bubble */}
                              <div
                                className={`rounded-lg py-2 px-3 border text-sm shadow-sm ${isSender
                                  ? "bg-main-gunmetal-blue/80 text-primary-foreground rounded-br-none"
                                  : "bg-card text-card-foreground rounded-bl-none"
                                  }`}
                              >
                                <p className="font-normal break-words whitespace-pre-wrap">
                                  {msg.message}
                                </p>
                                {msg.shopProductId && (
                                  <ProductCard productId={msg.shopProductId} />
                                )}
                                <p
                                  className={`text-xs mt-1 text-right ${isSender
                                    ? "text-primary-foreground/70"
                                    : "text-muted-foreground/70"
                                    }`}
                                >
                                  {formatTime(msg.createdAt)}
                                </p>
                              </div>
                              {/* Message Actions (only for sender) */}
                              {renderMessageActions(msg.id, isSender)}
                            </div>
                          </motion.div>
                        </div>
                      );
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
                        <h3 className="text-xl font-semibold text-foreground mb-1">
                          Bắt đầu trò chuyện
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Chưa có tin nhắn nào trong cuộc trò chuyện này.
                        </p>
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
                        e.preventDefault();
                        handleSendMessage();
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
            <div className="md:flex hidden items-center justify-center h-full">
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
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Tin nhắn
                </h3>
                <p className="text-sm text-muted-foreground">
                  Chọn một người dùng từ danh sách bên trái để bắt đầu nhắn tin.
                </p>
              </motion.div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
