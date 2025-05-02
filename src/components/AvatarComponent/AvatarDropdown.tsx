"use client"

import { useEffect, useState } from "react"
import { useUser } from "@/context/useUserContext"
import { useUpdateUser, useChangePassword } from "@/hooks/authentication"
import { useVerifyBankAccount } from "@/hooks/bank"
import { debounce } from "lodash"
import { useUploadFile } from "@/hooks/upload"
import Image from "next/image"
import { User, Lock, LogOut, Eye, EyeOff, Trash2, Check, ChevronDown, UploadIcon } from "lucide-react"
import { message } from "antd"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

const AvatarDropdown = () => {
  const { user, profile, logoutUser, logoUrl } = useUser()
  const [isClient, setIsClient] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { mutateAsync: updateUser, isPending: isUpdating } = useUpdateUser()
  const { mutateAsync: changePassword, isPending: isChangingPassword } = useChangePassword()
  const { mutateAsync: verifyBankAccount } = useVerifyBankAccount()
  const { mutateAsync: uploadFile, isPending: isUploading } = useUploadFile()
  const [idCardFrontImageUrl, setIdCardFrontImageUrl] = useState("")
  const [idCardBackImageUrl, setIdCardBackImageUrl] = useState("")
  const [avatarImageUrl, setAvatarImageUrl] = useState("")
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false)
  const [activeTab, setActiveTab] = useState("basic")

  // Form setup with react-hook-form
  const form = useForm({
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      username: "",
      logoUrl: "",
      address: "",
      bankName: "",
      bankAccountNumber: "",
      bankAccountName: "",
      bankBranch: "",
      shopName: "",
      shopAddress: "",
      idCardType: "",
      idCardNumber: "",
      idCardFrontImage: "",
      idCardBackImage: "",
    },
  })

  const passwordForm = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleClickLogout = () => {
    logoutUser()
  }

  const handleProfileUpdate = async (values: any) => {
    try {
      await updateUser({
        phone: values.phone,
        fullName: values.fullName,
        address: values.address,
        shopName: values.shopName,
        shopAddress: values.shopAddress,
        bankName: values.bankName,
        bankAccountNumber: values.bankAccountNumber,
        bankAccountName: values.bankAccountName,
        bankBranch: values.bankBranch,
        idCardType: values.idCardType,
        idCardNumber: values.idCardNumber,
        idCardFrontImage: idCardFrontImageUrl,
        idCardBackImage: idCardBackImageUrl,
        logoUrl: avatarImageUrl,
      })
      message.success("Cập nhật thông tin thành công!")
      setIsModalOpen(false)
    } catch (error) {
      message.error("Có lỗi xảy ra khi cập nhật thông tin")
    }
  }

  const handleChangePassword = async (values: any) => {
    try {
      await changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      })
      message.success("Đổi mật khẩu giao dịch thành công!")
      setIsPasswordModalOpen(false)
      passwordForm.reset()
    } catch (error) {
      message.error("Có lỗi xảy ra khi đổi mật khẩu giao dịch")
    }
  }

  const showProfileModal = () => {
    form.reset({
      // Tab thông tin cơ bản
      fullName: profile?.data?.fullName || "",
      phone: profile?.data?.phone || "",
      email: profile?.data?.email || "",
      username: profile?.data?.username || "",
      logoUrl: profile?.data?.logoUrl || "",

      // Tab cài đặt thanh toán
      address: profile?.data?.address || "",
      bankName: profile?.data?.bankName || "",
      bankAccountNumber: profile?.data?.bankAccountNumber || "",
      bankAccountName: profile?.data?.bankAccountName || "",
      bankBranch: profile?.data?.bankBranch || "",

      // Thông tin shop
      shopName: profile?.data?.shopName || "",
      shopAddress: profile?.data?.shopAddress || "",

      // Thông tin giấy tờ
      idCardType: profile?.data?.idCardType || "",
      idCardNumber: profile?.data?.idCardNumber || "",
      idCardFrontImage: profile?.data?.idCardFrontImage || "",
      idCardBackImage: profile?.data?.idCardBackImage || "",
    })
    setAvatarImageUrl(profile?.data?.logoUrl || "")
    setIdCardFrontImageUrl(profile?.data?.idCardFrontImage || "")
    setIdCardBackImageUrl(profile?.data?.idCardBackImage || "")
    setIsModalOpen(true)
  }

  const [bankAccountStatus, setBankAccountStatus] = useState<"success" | "error" | "">("")
  const [bankAccountHelp, setBankAccountHelp] = useState("")

  const handleBankAccountVerification = async (accountNumber: string) => {
    const bankCode = form.getValues("bankName")
    if (!bankCode) {
      message.warning("Vui lòng chọn ngân hàng trước!")
      return
    }

    try {
      const response = await verifyBankAccount({ bankCode, accountNumber })
      if (response.data.isValid) {
        setBankAccountStatus("success")
        setBankAccountHelp("Số tài khoản hợp lệ")
      } else {
        setBankAccountStatus("error")
        setBankAccountHelp("Số tài khoản không hợp lệ")
      }
    } catch (error) {
      setBankAccountStatus("error")
      setBankAccountHelp("Có lỗi xảy ra khi kiểm tra thông tin")
    }
  }

  const debouncedVerification = debounce(handleBankAccountVerification, 500)

  const handleUploadImage = async (file: File, type: "front" | "back") => {
    try {
      const response = await uploadFile(file)
      const imageUrl = response.data.url

      if (type === "front") {
        setIdCardFrontImageUrl(imageUrl)
        form.setValue("idCardFrontImage", imageUrl)
      } else {
        setIdCardBackImageUrl(imageUrl)
        form.setValue("idCardBackImage", imageUrl)
      }

      return false
    } catch (error) {
      message.error("Có lỗi xảy ra khi tải lên ảnh")
      return false
    }
  }

  const handleUploadAvatar = async (file: File) => {
    try {
      setIsUploadingAvatar(true)
      const response = await uploadFile(file)
      const imageUrl = response.data.url

      setAvatarImageUrl(imageUrl)
      form.setValue("logoUrl", imageUrl)

      return false
    } catch (error) {
      message.error("Có lỗi xảy ra khi tải lên ảnh đại diện")
      return false
    } finally {
      setIsUploadingAvatar(false)
    }
  }

  const BasicInfoTab = () => (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="fullName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tên của bạn</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Điện thoại của bạn</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-2">
        <Label>Ảnh đại diện</Label>
        <div className="flex flex-col items-start gap-4">
          {avatarImageUrl ? (
            <div className="relative group">
              <Image
                src={avatarImageUrl || "/images/default-avatar.jpg"}
                alt="Avatar"
                width={100}
                height={100}
                className="rounded-md object-cover h-24 w-24"
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLUEwLi0tLTAtQFBGPzpQRT4tLS9gVkVOU0hHSF9nXnNkU05CSlD/2wBDARUXFyAeIBohHiAgQi0tLUJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkL/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full !bg-blue-100/70 !text-blue-500"
                  onClick={() => window.open(avatarImageUrl, "_blank")}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full !bg-red-100/70 !text-red-500"
                  onClick={() => {
                    setAvatarImageUrl("")
                    form.setValue("logoUrl", "")
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="border border-dashed border-gray-300 rounded-md p-4 flex flex-col items-center justify-center gap-2 w-full">
              <Label htmlFor="avatar-upload" className="cursor-pointer flex flex-col items-center gap-2">
                {isUploadingAvatar ? (
                  <div className="h-10 w-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                ) : (
                  <>
                    <UploadIcon className="h-8 w-8 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Tải lên ảnh đại diện</span>
                  </>
                )}
              </Label>
              <input
                id="avatar-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    handleUploadAvatar(file)
                  }
                }}
              />
            </div>
          )}
        </div>
      </div>

      <div>
        <Label>Mật khẩu</Label>
        <div className="mt-2">
          <Button variant="outline" className="flex items-center bg-gradient-to-l from-main-dark-blue to-main-dark-blue/80 gap-2 rounded-sm !text-white hover:!bg-main-dark-blue/80 transition-colors" onClick={() => setIsPasswordModalOpen(true)}>
            <Lock className="h-4 w-4" />
            Thay đổi mật khẩu
          </Button>
        </div>
      </div>
    </div>
  )

  const PaymentSettingsTab = () => (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="fullName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tên</FormLabel>
            <FormControl>
              <Input placeholder="NHẬP TÊN NGƯỜI DÙNG" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Địa chỉ</FormLabel>
            <FormControl>
              <Textarea placeholder="NHẬP ĐỊA CHỈ NGƯỜI DÙNG" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="idCardType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Loại giấy tờ</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="CHỌN LOẠI GIẤY TỜ" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="cccd">CCCD</SelectItem>
                <SelectItem value="cmnd">CMND</SelectItem>
                <SelectItem value="passport">Passport</SelectItem>
                <SelectItem value="driver_license">Bằng lái xe</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="idCardNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Số giấy tờ</FormLabel>
            <FormControl>
              <Input placeholder="NHẬP SỐ GIẤY TỜ" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-2">
        <Label>Mặt trước</Label>
        <div className="flex flex-col items-start gap-4">
          {idCardFrontImageUrl ? (
            <div className="relative group">
              <Image
                src={idCardFrontImageUrl || "/placeholder.svg"}
                alt="ID Card Front"
                width={200}
                height={120}
                className="rounded-md object-cover h-32 w-full"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full !bg-blue-100/70 !text-blue-500"
                  onClick={() => window.open(idCardFrontImageUrl, "_blank")}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full !bg-red-100/70 !text-red-500"
                  onClick={() => {
                    setIdCardFrontImageUrl("")
                    form.setValue("idCardFrontImage", "")
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="border border-dashed border-gray-300 rounded-md p-4 flex flex-col items-center justify-center gap-2 w-full">
              <Label htmlFor="front-id-upload" className="cursor-pointer flex flex-col items-center gap-2">
                <UploadIcon className="h-8 w-8 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Tải lên ảnh mặt trước</span>
              </Label>
              <input
                id="front-id-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    handleUploadImage(file, "front")
                  }
                }}
              />
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Mặt sau</Label>
        <div className="flex flex-col items-start gap-4">
          {idCardBackImageUrl ? (
            <div className="relative group">
              <Image
                src={idCardBackImageUrl || "/images/white-image.png"}
                alt="ID Card Back"
                width={200}
                height={120}
                className="rounded-md object-cover h-32 w-full"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full !bg-blue-100/70 !text-blue-500"
                  onClick={() => window.open(idCardBackImageUrl, "_blank")}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full !bg-red-100/70 !text-red-500"
                  onClick={() => {
                    setIdCardBackImageUrl("")
                    form.setValue("idCardBackImage", "")
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="border border-dashed border-gray-300 rounded-md p-4 flex flex-col items-center justify-center gap-2 w-full">
              <Label htmlFor="back-id-upload" className="cursor-pointer flex flex-col items-center gap-2">
                <UploadIcon className="h-8 w-8 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Tải lên ảnh mặt sau</span>
              </Label>
              <input
                id="back-id-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    handleUploadImage(file, "back")
                  }
                }}
              />
            </div>
          )}
        </div>
      </div>

      <FormField
        control={form.control}
        name="bankName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tên ngân hàng</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="rounded-[6px]">
                  <SelectValue placeholder="VUI LÒNG CHỌN NGÂN HÀNG" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="rounded-[6px]">
                <SelectItem value="vcb">Vietcombank</SelectItem>
                <SelectItem value="tcb">Techcombank</SelectItem>
                <SelectItem value="bidv">BIDV</SelectItem>
                <SelectItem value="vib">VIB</SelectItem>
                <SelectItem value="acb">ACB</SelectItem>
                <SelectItem value="mb">MB Bank</SelectItem>
                <SelectItem value="vp">VPBank</SelectItem>
                <SelectItem value="agri">Agribank</SelectItem>
                <SelectItem value="scb">Sacombank</SelectItem>
                <SelectItem value="tpb">TPBank</SelectItem>
                <SelectItem value="ocb">OCB</SelectItem>
                <SelectItem value="hdbank">HDBank</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="bankAccountNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Số tài khoản ngân hàng</FormLabel>
            <FormControl>
              <Input
                placeholder="NHẬP SỐ TÀI KHOẢN NGÂN HÀNG"
                {...field}
                onChange={(e) => {
                  field.onChange(e)
                  debouncedVerification(e.target.value)
                }}
                className={
                  bankAccountStatus === "error"
                    ? "border-destructive"
                    : bankAccountStatus === "success"
                      ? "border-green-500"
                      : ""
                }
              />
            </FormControl>
            {bankAccountHelp && (
              <div
                className={`text-sm flex items-center gap-1 ${
                  bankAccountStatus === "error"
                    ? "text-destructive"
                    : bankAccountStatus === "success"
                      ? "text-green-500"
                      : ""
                }`}
              >
                {bankAccountStatus === "success" && <Check className="h-3 w-3" />}
                {bankAccountHelp}
              </div>
            )}
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="bankAccountName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tên tài khoản ngân hàng</FormLabel>
            <FormControl>
              <Input placeholder="NHẬP TÊN CHỦ TÀI KHOẢN" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )

  if (!isClient) {
    return <div className="avatar-placeholder h-10 w-10 rounded-full bg-muted animate-pulse"></div>
  }

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-2 cursor-pointer rounded-md transition-all p-1 hover:bg-transparent">
            <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center bg-primary rounded-full overflow-hidden">
              <Avatar className="h-full w-full">
                <AvatarImage src={logoUrl || "/images/icon.png"} alt="User avatar" />
              </Avatar>
            </div>
            <div className="flex flex-col">
              <p className="font-medium text-sm">{user?.username}</p>
              <p className="text-xs text-muted-foreground">{user?.role === "admin" ? "Admin" : "Seller"}</p>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={showProfileModal} className="cursor-pointer">
            <User className="h-4 w-4 mr-2" />
            Hồ sơ
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsPasswordModalOpen(true)} className="cursor-pointer">
            <Lock className="h-4 w-4 mr-2" />
            Mật khẩu giao dịch
          </DropdownMenuItem>
          <Separator className="my-1" />
          <DropdownMenuItem
            onClick={handleClickLogout}
            className="cursor-pointer text-destructive focus:text-destructive"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Đăng xuất
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Profile Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0 bg-white rounded-md sm:max-w-[1000px]">
          <div className="px-6 py-4 border-b border-b-gray-200">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Quản lý hồ sơ</DialogTitle>
              <DialogDescription>Cập nhật thông tin cá nhân và cài đặt thanh toán của bạn</DialogDescription>
            </DialogHeader>
          </div>

          <div className="px-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleProfileUpdate)}>
                <Tabs defaultValue="basic" className="w-full" onValueChange={(value) => setActiveTab(value)}>
                  <TabsList className="grid grid-cols-2 bg-transparent">
                    <TabsTrigger
                      value="basic"
                      className={`p-3 border-none rounded-none text-base font-semibold text-gray-700 relative hover:text-gray-900`}
                    >
                      Thông tin cơ bản
                      {activeTab === "basic" && (
                        <motion.div
                          layoutId="activeTabIndicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary border-none"
                          initial={false}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </TabsTrigger>
                    <TabsTrigger
                      value="payment"
                      className={`p-3 text-base font-semibold text-gray-700 relative hover:text-gray-900`}
                    >
                      Cài đặt thanh toán
                      {activeTab === "payment" && (
                        <motion.div
                          layoutId="activeTabIndicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                          initial={false}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="basic" className="mt-4">
                    <Card className="rounded-[4px]">
                      <CardContent className="pt-6">
                        <BasicInfoTab />
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="payment" className="mt-4">
                    <Card className="rounded-[4px]">
                      <CardContent className="pt-6">
                        <PaymentSettingsTab />
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>

                <DialogFooter className="mt-6 mb-6">
                  <Button type="button" variant="outline" className="rounded-sm" onClick={() => setIsModalOpen(false)}>
                    Hủy
                  </Button>
                  <Button type="submit" disabled={isUpdating} className="rounded-sm bg-gradient-to-l from-main-dark-blue to-main-dark-blue/80 !text-white hover:!bg-main-dark-blue/80 transition-colors">
                    {isUpdating ? (
                      <>
                        <div className="h-4 w-4 mr-2 rounded-full border-2 border-current border-t-transparent animate-spin" />
                        Đang lưu...
                      </>
                    ) : (
                      "Lưu thay đổi"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>

      {/* Password Modal */}
      <Dialog open={isPasswordModalOpen} onOpenChange={setIsPasswordModalOpen}>
        <DialogContent className="max-w-md p-0 bg-white rounded-md">
          <div className="px-6 py-4 border-b border-b-gray-200">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Đổi mật khẩu giao dịch</DialogTitle>
              <DialogDescription>Nhập mật khẩu hiện tại và mật khẩu mới để thay đổi</DialogDescription>
            </DialogHeader>
          </div>

          <div className="px-6">
            <Form {...passwordForm}>
              <form onSubmit={passwordForm.handleSubmit(handleChangePassword)} className="space-y-4">
                <FormField
                  control={passwordForm.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mật khẩu hiện tại</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            type={showCurrentPassword ? "text" : "password"} 
                            {...field} 
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          >
                            {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={passwordForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mật khẩu mới</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            type={showNewPassword ? "text" : "password"} 
                            {...field} 
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                          >
                            {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={passwordForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Xác nhận mật khẩu mới</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            type={showConfirmPassword ? "text" : "password"} 
                            {...field} 
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter className="mt-6 pb-6">
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-sm"
                    onClick={() => {
                      setIsPasswordModalOpen(false)
                      passwordForm.reset()
                    }}
                  >
                    Hủy
                  </Button>
                  <Button type="submit" disabled={isChangingPassword} className="rounded-sm bg-main-dark-blue !text-white hover:!bg-main-dark-blue/90">
                    {isChangingPassword ? (
                      <>
                        <div className="h-4 w-4 mr-2 rounded-full border-2 border-current border-t-transparent animate-spin" />
                        Đang lưu...
                      </>
                    ) : (
                      "Đổi mật khẩu"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AvatarDropdown
