"use client";
import {
  useGetListMessageAvailable,
  useGetMessagesWithUser,
  useSendMessageToUser,
} from "@/hooks/shop-chat";
import type {
  IAvailableChat,
  IChatMessage,
} from "@/interface/response/shop-chat";
import { mdiMessageText, mdiSend } from "@mdi/js";
import Icon from "@mdi/react";
import { Avatar, Badge, Button, Card, Input, Layout, List } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const { Content, Sider } = Layout;

export default function ChatPage() {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [newMessagesCount, setNewMessagesCount] = useState(0);
  const { data: chatList, refetch: refetchChatList } =
    useGetListMessageAvailable({});
  const { data: messages, refetch: refetchMessages } = useGetMessagesWithUser(
    selectedUser || ""
  );
  const { mutate: sendMessage } = useSendMessageToUser();
  const prevMessagesCount = useRef(messages?.data?.data?.length || 0);

  console.log("chatList", chatList);

  // Transform chatList data to match IAvailableChat interface
  const transformedChatList =
    chatList?.data?.data?.map((message) => ({
      userId: message.id,
      userName: message.senderRole === "user" ? "Người dùng" : "Cửa hàng",
      userAvatar: "https://via.placeholder.com/150",
      lastMessage: message.message,
      lastMessageDate: message.createdAt,
      unreadCount: message.isRead ? 0 : 1,
    })) || [];

  // Handle user click
  const handleUserClick = (userId: string) => {
    setSelectedUser(userId);
    refetchMessages(); // Fetch messages when user is selected
  };

  // Fetch new messages every 20 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedUser) {
        refetchMessages().then((newData) => {
          const newMessages = newData.data?.data?.messages || [];
          if (newMessages.length > prevMessagesCount.current) {
            const newCount = newMessages.length - prevMessagesCount.current;
            setNewMessagesCount(newCount);
            showNewMessageToast(newCount);
          }
          prevMessagesCount.current = newMessages.length;
        });
      }
      refetchChatList();
    }, 20000);

    return () => clearInterval(interval);
  }, [selectedUser, refetchMessages, refetchChatList]);

  const showNewMessageToast = (count: number) => {
    toast(
      <div className="flex items-center gap-2">
        <Icon path={mdiMessageText} size={0.8} className="text-blue-500" />
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
      }
    );
  };

  const handleSendMessage = () => {
    if (message.trim() && selectedUser) {
      sendMessage({ userId: selectedUser, message });
      setMessage("");
      setTimeout(() => refetchMessages(), 300);
    }
  };

  return (
    <>
      <Toaster />
      <Layout className="h-full flex flex-col">
        <Sider
          width={300}
          theme="light"
          className="border-r flex flex-col flex-1"
          style={{
            backgroundColor: "#f8f9fa",
            padding: "0 16px",
          }}
        >
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Danh sách chat</h2>
            <div className="mt-2">
              <Input.Search
                placeholder="Tìm kiếm cuộc trò chuyện"
                allowClear
                style={{ width: "100%" }}
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            <List
              dataSource={transformedChatList}
              style={{ padding: "8px 0" }}
              renderItem={(item) => (
                <div
                  key={item.userId}
                  className={`cursor-pointer transition-all ${
                    selectedUser === item.userId
                      ? "bg-blue-50"
                      : "hover:bg-gray-50"
                  }`}
                  style={{
                    borderLeft:
                      selectedUser === item.userId
                        ? "4px solid #1890ff"
                        : "4px solid transparent",
                    margin: "4px 0",
                    borderRadius: "4px",
                  }}
                >
                  <List.Item
                    onClick={() => handleUserClick(item.userId)}
                    style={{ padding: "12px 16px" }}
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          src={item.userAvatar}
                          style={{ backgroundColor: "#87d068" }}
                        />
                      }
                      title={
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{item.userName}</span>
                          {item.unreadCount > 0 && (
                            <Badge
                              count={item.unreadCount}
                              style={{ backgroundColor: "#f08806" }}
                            />
                          )}
                        </div>
                      }
                      description={
                        <div className="truncate">
                          <p className="text-sm text-gray-600">
                            {item.lastMessage}
                          </p>
                          <p className="text-xs text-gray-400">
                            {new Date(item.lastMessageDate).toLocaleString()}
                          </p>
                        </div>
                      }
                    />
                  </List.Item>
                </div>
              )}
            />
          </div>
        </Sider>

        <Content className="h-full flex flex-col flex-1">
          {selectedUser ? (
            <>
              <div
                className="flex-1 p-4 overflow-y-auto"
                style={{ backgroundColor: "#f0f2f5" }}
              >
                <div className="max-w-4xl mx-auto h-full flex flex-col flex-1">
                  <div className="flex-1">
                    <AnimatePresence>
                      {messages?.data?.messages?.length ? (
                        messages.data.messages.map((msg: IChatMessage) => (
                          <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className={`mb-4 flex ${
                              msg.senderId === selectedUser
                                ? "justify-start"
                                : "justify-end"
                            }`}
                          >
                            <Card
                              className={`max-w-[80%] ${
                                msg.senderId === selectedUser
                                  ? "bg-white"
                                  : "bg-blue-50"
                              }`}
                              bodyStyle={{ padding: "12px 16px" }}
                            >
                              <p className="text-sm">{msg.message}</p>
                              <p className="text-xs text-gray-500 mt-1 text-right">
                                {new Date(msg.createdAt).toLocaleTimeString()}
                              </p>
                            </Card>
                          </motion.div>
                        ))
                      ) : (
                        <div className="h-full flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-2xl text-gray-400 mb-2">
                              💬
                            </div>
                            <p className="text-gray-500">
                              Bắt đầu cuộc trò chuyện
                            </p>
                          </div>
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t bg-white">
                <div className="max-w-4xl mx-auto">
                  <div className="flex items-end gap-2">
                    <Input.TextArea
                      rows={2}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onPressEnter={(e) => {
                        e.preventDefault();
                        handleSendMessage();
                      }}
                      placeholder="Nhập tin nhắn..."
                      style={{ flex: 1 }}
                      autoSize={{ minRows: 1, maxRows: 4 }}
                    />
                    <Button
                      type="primary"
                      onClick={handleSendMessage}
                      icon={<Icon path={mdiSend} size={0.8} />}
                      style={{ height: "40px" }}
                    >
                      Gửi
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-50">
              <div className="text-center">
                <div className="text-2xl text-gray-400 mb-2">💬</div>
                <p className="text-gray-500">
                  Chọn một cuộc trò chuyện để bắt đầu
                </p>
              </div>
            </div>
          )}
        </Content>
      </Layout>
    </>
  );
}
