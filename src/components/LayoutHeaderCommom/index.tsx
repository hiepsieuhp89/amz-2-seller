"use client"

import type React from "react"

import { openChat } from "@/app/ClientLayout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  getAllNotifications,
  getUnreadNotifications,
  markAllAsRead,
  markAsRead,
  deleteNotification
} from "@/api/notification"
import { mdiFaceAgent } from "@mdi/js"
import Icon from "@mdi/react"
import { formatDistanceToNow } from "date-fns"
import { vi } from "date-fns/locale"
import { motion } from "framer-motion"
import { Bell } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect, useCallback } from "react"
import AvatarDropdown from "../AvatarComponent/AvatarDropdown"

export default function LayoutHeaderCommon() {
  const router = useRouter()
  const [allNotifications, setAllNotifications] = useState<any>(null)
  const [unreadNotifications, setUnreadNotifications] = useState<any>(null)
  const [showBadge, setShowBadge] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const unreadCount = unreadNotifications?.data?.length || 0

  const fetchNotifications = useCallback(async () => {
    try {
      setIsLoading(true)
      const [allResponse, unreadResponse] = await Promise.all([
        getAllNotifications(),
        getUnreadNotifications()
      ])
      
      setAllNotifications(allResponse)
      setUnreadNotifications(unreadResponse)
    } catch (error) {
      console.error("Error fetching notifications:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchNotifications()
    
    const intervalId = setInterval(() => {
      fetchNotifications()
    }, 5000)
    
    return () => clearInterval(intervalId)
  }, [fetchNotifications])

  if (typeof window !== "undefined") {
    window.addEventListener("storage", (event) => {
      if (event.key === "role") {
        if (event.newValue === "GA") {
          router.push("ga/plan_week")
        }
        if (event.newValue === "CS") {
          router.push("/cs/manage_document")
        }
        if (event.newValue === "ADMIN") {
          router.push("/admin/user")
        }
      }
    })
    window.addEventListener("storage", (event) => {
      if (event.key === "department") {
        if (event.newValue === "COMBAT") {
          router.push("combat/plan_week")
        }
        if (event.newValue === "TRAINING") {
          router.push("traning/plan_week")
        }
        if (event.newValue === "TECH") {
          router.push("tech/plan_week")
        }
        if (event.newValue === "CONTROL") {
          router.push("control/plan_week")
        }
      }
    })
  }

  const formatRelativeDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return formatDistanceToNow(date, { addSuffix: true, locale: vi })
    } catch (error) {
      return dateString
    }
  }

  const handleNotificationClick = async (notificationId: string) => {
    if (notificationId) {
      try {
        await markAsRead({ notificationId })
        fetchNotifications()
      } catch (error) {
        console.error("Error marking notification as read:", error)
      }
    }
  }

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead()
      setShowBadge(false)
      fetchNotifications()
    } catch (error) {
      console.error("Error marking all notifications as read:", error)
    }
  }

  const handleDeleteNotification = async (e: React.MouseEvent, notificationId: string) => {
    e.stopPropagation()
    if (notificationId) {
      try {
        await deleteNotification({ notificationId })
        fetchNotifications()
      } catch (error) {
        console.error("Error deleting notification:", error)
      }
    }
  }

  return (
    <header className="!h-[70px] min-h-[70px] bg-main-dark-blue !text-white/80 px-4 py-3 flex justify-between items-center fixed top-0 left-0 w-full z-30">
      <Link href={`${process.env.NEXT_PUBLIC_HOME_URL}`} className="relative h-8 left-8 md:left-[64px] cursor-pointer scale-75 md:scale-100">
        <Image
          quality={100}
          draggable={false}
          src="/images/logo.png"
          alt="logo"
          width={100}
          height={100}
          className="h-full w-full object-contain"
        />
      </Link>
      <div className="flex items-center">
        <div className="ml-8 flex items-center gap-1 mr-2">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full hover:bg-[#FCAF17]/10 cursor-pointer"
            onClick={openChat}
          >
            <Icon path={mdiFaceAgent} size={0.9} color="#FCAF17" />
          </motion.div>

          <Popover>
            <PopoverTrigger asChild>
              <div
                className="p-2 rounded-full hover:bg-[#FCAF17]/10 cursor-pointer relative mr-2"
                onClick={() => setShowBadge(false)}
              >
                <Bell className="h-5 w-5 text-[#FCAF17]" />
                {unreadCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute rounded-full -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs font-normal"
                  >
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </Badge>
                )}
              </div>
            </PopoverTrigger>

            <PopoverContent
              side="bottom"
              align="center"
              className="md:left-auto md:translate-x-0 md:right-0 w-[90vw] max-w-[320px] p-0 bg-white rounded-lg border-none md:w-80"
              sideOffset={5}
            >
              <div className="border-0 shadow-none">
                <div className="pb-2 pt-3 px-4 border-b">
                  <div className="text-base font-medium flex justify-between items-center">
                    <span>Thông báo</span>
                    {unreadCount > 0 && (
                      <Badge variant="secondary" className="ml-2 font-normal rounded-full text-gray-500">
                        {unreadCount} chưa đọc
                      </Badge>
                    )}
                  </div>
                </div>

                <ScrollArea className="h-[300px]">
                  <div className="p-0">
                    {isLoading ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="animate-spin h-5 w-5 border-2 border-[#FCAF17] border-t-transparent rounded-full"></div>
                      </div>
                    ) : allNotifications?.data?.data && allNotifications.data.data.length > 0 ? (
                      <div className="divide-y">
                        {allNotifications.data.data?.map((notification: any) => (
                          <div
                            key={notification.id}
                            className={`p-3 hover:bg-muted/50 cursor-pointer transition-colors ${notification.status === "UNREAD" ? "bg-muted/30" : ""
                              }`}
                            onClick={() => {handleNotificationClick(notification.id)}}
                          >
                            <div className="flex items-start gap-3">
                              <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                  <p className="font-semibold text-main-golden-orange text-sm">{notification.title}</p>
                                  <div className="flex items-center gap-2">
                                    {notification.status === "UNREAD" && (
                                      <span className="h-2 w-2 rounded-full bg-[#FCAF17]" />
                                    )}
                                    <button
                                      onClick={(e) => handleDeleteNotification(e, notification.id)}
                                      className="text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-x"
                                      >
                                        <path d="M18 6 6 18"></path>
                                        <path d="m6 6 12 12"></path>
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                                <p className="text-sm text-muted-foreground italic text-wrap break-words line-clamp-2">
                                  {notification.content}
                                </p>
                                <p className="text-xs text-gray-400">{formatRelativeDate(notification.createdAt)}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                        <Bell className="h-10 w-10 text-muted-foreground/50 mb-3" />
                        <p className="text-muted-foreground">Không có thông báo nào</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                <div className="p-2 border-t flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 rounded-sm !bg-orange-400 hover:!bg-[#E3E6E6]0 !!text-white/80 transition-all duration-300"
                  >
                    Xem tất cả thông báo <Bell className="h-4 w-4 ml-1" />
                  </Button>
                  {unreadCount > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleMarkAllAsRead}
                      className="rounded-sm hover:bg-muted transition-all duration-300"
                    >
                      Đánh dấu đã đọc
                    </Button>
                  )}
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <AvatarDropdown />
        </div>
      </div>
    </header>
  )
}

