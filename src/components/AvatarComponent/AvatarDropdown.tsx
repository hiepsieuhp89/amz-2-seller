"use client"

import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useUser } from "@/context/useUserContext"
import { useUpdateUser } from "@/hooks/authentication"
import { useBankList, useVerifyBankAccount } from "@/hooks/bank"
import { useUploadFile } from "@/hooks/upload"
import { IBankData } from "@/interface/response/bank"
import { cn } from "@/lib/utils"
import { message } from "antd"
import { motion } from "framer-motion"
import { Eye, EyeOff, Loader2, Lock, LogOut, Trash2, UploadIcon, User } from "lucide-react"
import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"

// Add type interface definitions
interface BankOption {
  value: string;
  label: string;
  shortName: string;
  logo?: string;
}

interface FormValues {
  fullName: string;
  phone: string;
  email: string;
  username: string;
  logoUrl: string;
  address: string;
  bankName: string;
  bankAccountNumber: string;
  bankAccountName: string;
  bankBranch: string;
  shopName: string;
  shopAddress: string;
  idCardType: string;
  idCardNumber: string;
  idCardFrontImage: string;
  idCardBackImage: string;
}

interface PasswordFormValues {
  oldPassword: string;
  password: string;
}

interface WithdrawPasswordFormValues {
  oldWithdrawPassword: string;
  withdrawPassword: string;
}

const AvatarDropdown = () => {
  const { user, profile, logoutUser, logoUrl } = useUser()
  console.log(profile)
  const [isClient, setIsClient] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [isWithdrawPasswordModalOpen, setIsWithdrawPasswordModalOpen] = useState(false)
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showOldWithdrawPassword, setShowOldWithdrawPassword] = useState(false)
  const [showWithdrawPassword, setShowWithdrawPassword] = useState(false)
  const { mutateAsync: updateUser, isPending: isUpdating } = useUpdateUser()
  const { verifyBankAccount } = useVerifyBankAccount()
  const { mutateAsync: uploadFile, isPending: isUploading } = useUploadFile()
  const [idCardFrontImageUrl, setIdCardFrontImageUrl] = useState("")
  const [idCardBackImageUrl, setIdCardBackImageUrl] = useState("")
  const [avatarImageUrl, setAvatarImageUrl] = useState("")
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false)
  const [activeTab, setActiveTab] = useState("basic")
  const [bankAccountStatus, setBankAccountStatus] = useState<"default" | "success" | "error">("default")
  const [bankAccountHelpMessage, setBankAccountHelpMessage] = useState("")
  const { bankListData, isLoading: isLoadingBanks } = useBankList()
  const [bankSearchTerm, setBankSearchTerm] = useState("")

  // Form setup with react-hook-form
  const form = useForm<FormValues>({
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

  const passwordForm = useForm<PasswordFormValues>({
    defaultValues: {
      oldPassword: "",
      password: "",
    },
  })

  const withdrawPasswordForm = useForm<WithdrawPasswordFormValues>({
    defaultValues: {
      oldWithdrawPassword: "",
      withdrawPassword: "",
    },
  })

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleClickLogout = () => {
    logoutUser()
  }

  const handleProfileUpdate = async (values: FormValues) => {
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

  const handleChangePassword = async (values: PasswordFormValues) => {
    try {
      await updateUser({
        oldPassword: values.oldPassword,
        password: values.password,
      })
      message.success("Đổi mật khẩu thành công!")
      setIsPasswordModalOpen(false)
      passwordForm.reset()
    } catch (error) {
      message.error("Có lỗi xảy ra khi đổi mật khẩu")
    }
  }

  const handleChangeWithdrawPassword = async (values: WithdrawPasswordFormValues) => {
    try {
      // Since TypeScript doesn't recognize withdrawPassword on profile.data
      // Use a type assertion or check for property existence
      const userData = profile?.data as any;
      const currentWithdrawPassword = userData?.withdrawPassword || '';
      
      // Validate old password locally against profile data
      if (values.oldWithdrawPassword !== currentWithdrawPassword) {
        message.error("Mật khẩu giao dịch hiện tại không đúng");
        return;
      }
      
      // Check if new password is different from old password
      if (currentWithdrawPassword === values.withdrawPassword) {
        message.error("Mật khẩu giao dịch mới không được trùng với mật khẩu cũ");
        return;
      }
      
      // Only send the new password to the API
      await updateUser({
        withdrawPassword: values.withdrawPassword,
      });
      
      message.success("Đổi mật khẩu giao dịch thành công!");
      setIsWithdrawPasswordModalOpen(false);
      withdrawPasswordForm.reset();
    } catch (error) {
      message.error("Có lỗi xảy ra khi đổi mật khẩu giao dịch");
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

  const handleBankAccountVerification = async () => {
    try {
      const bankCode = form.watch("bankName");
      const accountNumber = form.watch("bankAccountNumber");
      
      if (!bankCode || !accountNumber) {
        message.error("Vui lòng nhập đầy đủ thông tin");
        return;
      }
      
      setBankAccountStatus("default")
      setBankAccountHelpMessage("Đang xác thực thông tin tài khoản...")

      const response = await verifyBankAccount({
        bank: bankCode,
        account: accountNumber,
      })

      if (response?.status) {
        setBankAccountStatus("success")
        setBankAccountHelpMessage(
          `Xác thực thành công: ${response.data?.ownerName || "Tài khoản hợp lệ"}`
        )
        
        if (response.data?.ownerName) {
          form.setValue("bankAccountName", response.data.ownerName)
        }
      } else {
        setBankAccountStatus("error")
        setBankAccountHelpMessage("Thông tin tài khoản không hợp lệ. Vui lòng kiểm tra lại.")
      }
    } catch (error) {
      setBankAccountStatus("error")
      setBankAccountHelpMessage("Có lỗi xảy ra khi xác thực tài khoản. Vui lòng thử lại sau.")
    }
  }

  const handleUploadImage = async (file: File, type: "front" | "back") => {
    try {
      const response = await uploadFile(file);
      const imageUrl = response.data.url;

      if (type === "front") {
        setIdCardFrontImageUrl(imageUrl);
        form.setValue("idCardFrontImage", imageUrl);
      } else {
        setIdCardBackImageUrl(imageUrl);
        form.setValue("idCardBackImage", imageUrl);
      }

      return false;
    } catch (error) {
      message.error("Có lỗi xảy ra khi tải lên ảnh");
      return false;
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

  const bankOptions = useMemo<BankOption[]>(() => {
    if (!bankListData?.data) return []
    
    return bankListData.data.map((bank: IBankData) => ({
      value: bank.code,
      label: bank.name,
      shortName: bank.short_name,
      logo: bank.logo_url
    }))
  }, [bankListData])

  const BasicInfoTab = useMemo(() => (
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
        <Label>Mật khẩu đăng nhập</Label>
        <div className="mt-2">
          <Button variant="outline" className="flex items-center bg-gradient-to-l from-main-dark-blue to-main-dark-blue/80 gap-2 rounded-sm !text-white hover:!bg-main-dark-blue/80 transition-colors" onClick={() => setIsPasswordModalOpen(true)}>
            <Lock className="h-4 w-4" />
            Thay đổi mật khẩu đăng nhập
          </Button>
        </div>
      </div>
    </div>
  ), [form, avatarImageUrl, isUploadingAvatar, handleUploadAvatar])

  const memoizedPaymentSettingsTab = useMemo(() => {
    return (
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
                  {isLoadingBanks ? (
                    <div className="p-2 text-center">Đang tải...</div>
                  ) : (
                    <>
                      <div className="p-2 sticky top-0 bg-white z-10">
                        <Input
                          placeholder="Tìm kiếm ngân hàng..."
                          className="border border-input rounded-md"
                          onChange={(e) => {
                            const searchTerm = e.target.value.toLowerCase();
                            // Filter banks is handled automatically since we're filtering directly in the render
                            setBankSearchTerm(searchTerm);
                          }}
                        />
                      </div>
                      {bankOptions
                        .filter(bank => 
                          bank.label.toLowerCase().includes(bankSearchTerm) || 
                          bank.shortName.toLowerCase().includes(bankSearchTerm)
                        )
                        .map((bank) => (
                          <SelectItem key={bank.value} value={bank.value} className="flex items-center gap-2">
                            <div className="flex items-center gap-2">
                              {bank.logo && (
                                <img 
                                  src={bank.logo} 
                                  alt={bank.shortName} 
                                  className="h-12 w-12 object-contain mr-2" 
                                />
                              )}
                              {bank.label}
                            </div>
                          </SelectItem>
                        ))}
                      {bankOptions.filter(bank => 
                        bank.label.toLowerCase().includes(bankSearchTerm) || 
                        bank.shortName.toLowerCase().includes(bankSearchTerm)
                      ).length === 0 && (
                        <div className="p-2 text-center text-muted-foreground">
                          Không tìm thấy ngân hàng
                        </div>
                      )}
                    </>
                  )}
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
                <div className="flex gap-2">
                  <Input
                    placeholder="NHẬP SỐ TÀI KHOẢN NGÂN HÀNG"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e)
                      const value = e.target.value
                      if (value) {
                        handleBankAccountVerification()
                      }
                    }}
                    className={cn(
                      bankAccountStatus === "error" && "border-destructive",
                      bankAccountStatus === "success" && "border-green-500"
                    )}
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleBankAccountVerification}
                    disabled={isUpdating || !form.watch("bankName") || !form.watch("bankAccountNumber")}
                  >
                    {isUpdating ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Đang xác thực</span>
                      </div>
                    ) : (
                      "Xác thực"
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormDescription className={cn(
                bankAccountStatus === "success" && "text-green-500",
                bankAccountStatus === "error" && "text-red-500"
              )}>
                {bankAccountHelpMessage}
              </FormDescription>
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

        <div>
          <Label>Mật khẩu giao dịch</Label>
          <div className="mt-2">
            <Button variant="outline" className="flex items-center bg-gradient-to-l from-main-dark-blue to-main-dark-blue/80 gap-2 rounded-sm !text-white hover:!bg-main-dark-blue/80 transition-colors" onClick={() => setIsWithdrawPasswordModalOpen(true)}>
              <Lock className="h-4 w-4" />
              Thay đổi mật khẩu giao dịch
            </Button>
          </div>
        </div>
      </div>
    )
  }, [form, idCardFrontImageUrl, idCardBackImageUrl, bankAccountStatus, bankAccountHelpMessage, handleBankAccountVerification, handleUploadImage, isLoadingBanks, bankOptions, isUpdating, bankSearchTerm, setBankSearchTerm])

  const VerificationFormContent = useMemo(() => {
    return memoizedPaymentSettingsTab;
  }, [memoizedPaymentSettingsTab])

  const PasswordFormContent = useMemo(() => (
    <form onSubmit={passwordForm.handleSubmit(handleChangePassword)} className="space-y-4">
      <FormField
        control={passwordForm.control}
        name="oldPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Mật khẩu đăng nhập hiện tại</FormLabel>
            <FormControl>
              <div className="relative">
                <Input 
                  type={showOldPassword ? "text" : "password"} 
                  {...field} 
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                >
                  {showOldPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={passwordForm.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Mật khẩu đăng nhập mới</FormLabel>
            <FormControl>
              <div className="relative">
                <Input 
                  type={showPassword ? "text" : "password"} 
                  {...field} 
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
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
        <Button type="submit" disabled={isUpdating} className="rounded-sm bg-main-dark-blue !text-white hover:!bg-main-dark-blue/90">
          {isUpdating ? (
            <>
              <div className="h-4 w-4 mr-2 rounded-full border-2 border-current border-t-transparent animate-spin" />
              Đang lưu...
            </>
          ) : (
            "Đổi mật khẩu đăng nhập"
          )}
        </Button>
      </DialogFooter>
    </form>
  ), [passwordForm, handleChangePassword, showOldPassword, showPassword, isUpdating, setIsPasswordModalOpen])

  const WithdrawPasswordFormContent = useMemo(() => (
    <form onSubmit={withdrawPasswordForm.handleSubmit(handleChangeWithdrawPassword)} className="space-y-4">
      <FormField
        control={withdrawPasswordForm.control}
        name="oldWithdrawPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Mật khẩu giao dịch hiện tại</FormLabel>
            <FormControl>
              <div className="relative">
                <Input 
                  type={showOldWithdrawPassword ? "text" : "password"} 
                  {...field} 
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowOldWithdrawPassword(!showOldWithdrawPassword)}
                >
                  {showOldWithdrawPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={withdrawPasswordForm.control}
        name="withdrawPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Mật khẩu giao dịch mới</FormLabel>
            <FormControl>
              <div className="relative">
                <Input 
                  type={showWithdrawPassword ? "text" : "password"} 
                  {...field} 
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowWithdrawPassword(!showWithdrawPassword)}
                >
                  {showWithdrawPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
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
            setIsWithdrawPasswordModalOpen(false)
            withdrawPasswordForm.reset()
          }}
        >
          Hủy
        </Button>
        <Button type="submit" disabled={isUpdating} className="rounded-sm bg-main-dark-blue !text-white hover:!bg-main-dark-blue/90">
          {isUpdating ? (
            <>
              <div className="h-4 w-4 mr-2 rounded-full border-2 border-current border-t-transparent animate-spin" />
              Đang lưu...
            </>
          ) : (
            "Đổi mật khẩu giao dịch"
          )}
        </Button>
      </DialogFooter>
    </form>
  ), [withdrawPasswordForm, handleChangeWithdrawPassword, showOldWithdrawPassword, showWithdrawPassword, isUpdating, setIsWithdrawPasswordModalOpen])

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
          {/* <DropdownMenuItem onClick={() => setIsPasswordModalOpen(true)} className="cursor-pointer">
            <Lock className="h-4 w-4 mr-2" />
            Mật khẩu
          </DropdownMenuItem> */}
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
                        {BasicInfoTab}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="payment" className="mt-4">
                    <Card className="rounded-[4px]">
                      <CardContent className="pt-6">
                        {memoizedPaymentSettingsTab}
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
              <DialogTitle className="text-xl font-bold">Đổi mật khẩu đăng nhập</DialogTitle>
              <DialogDescription>Nhập mật khẩu đăng nhập hiện tại và mật khẩu đăng nhập mới để thay đổi</DialogDescription>
            </DialogHeader>
          </div>

          <div className="px-6">
            <Form {...passwordForm}>
              {PasswordFormContent}
            </Form>
          </div>
        </DialogContent>
      </Dialog>

      {/* Withdraw Password Modal */}
      <Dialog open={isWithdrawPasswordModalOpen} onOpenChange={setIsWithdrawPasswordModalOpen}>
        <DialogContent className="max-w-md p-0 bg-white rounded-md">
          <div className="px-6 py-4 border-b border-b-gray-200">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Đổi mật khẩu giao dịch</DialogTitle>
              <DialogDescription>Nhập mật khẩu giao dịch hiện tại và mật khẩu giao dịch mới để thay đổi</DialogDescription>
            </DialogHeader>
          </div>

          <div className="px-6">
            <Form {...withdrawPasswordForm}>
              {WithdrawPasswordFormContent}
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AvatarDropdown
