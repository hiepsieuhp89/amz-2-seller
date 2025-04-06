"use client"

import { type MenuProps, Dropdown, Avatar, Space, Typography, message, Button, Tabs, Select, Upload } from "antd"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { UserOutlined, LockOutlined, LogoutOutlined } from "@ant-design/icons"
import { useUser } from "@/context/useUserContext"
import { useUpdateUser, useChangePassword } from "@/hooks/authentication"
import { Modal, Form, Input } from "antd"
import type { TabsProps } from "antd"
import { useVerifyBankAccount } from "@/hooks/bank"
import { debounce } from "lodash"
import { useUploadFile } from "@/hooks/upload"

const { Text, Title } = Typography

const AvatarDropdown = () => {
  const router = useRouter()
  const { user, profile, logoutUser } = useUser()
  const [isClient, setIsClient] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [form] = Form.useForm()
  const [passwordForm] = Form.useForm()
  const { mutateAsync: updateUser, isPending: isUpdating } = useUpdateUser()
  const { mutateAsync: changePassword, isPending: isChangingPassword } = useChangePassword()
  const [messageApi, contextHolder] = message.useMessage()
  const { mutateAsync: verifyBankAccount } = useVerifyBankAccount()
  const { mutateAsync: uploadFile, isPending: isUploading } = useUploadFile()
  const [idCardFrontImageUrl, setIdCardFrontImageUrl] = useState('')
  const [idCardBackImageUrl, setIdCardBackImageUrl] = useState('')
  const [avatarImageUrl, setAvatarImageUrl] = useState('')

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleClickLogout = () => {
    logoutUser()
  }

  const getFirstLetter = () => {
    return user?.username ? user.username.charAt(0).toUpperCase() : "U"
  }

  const getAvatarColor = () => {
    return "linear-gradient(135deg, #FCAF17, #FF8C00)"
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
        logoUrl: avatarImageUrl
      })
      messageApi.success("Cập nhật thông tin thành công!")
      setIsModalOpen(false)
    } catch (error) {
      messageApi.error("Có lỗi xảy ra khi cập nhật thông tin")
    }
  }

  const handleChangePassword = async (values: any) => {
    try {
      await changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword
      })
      messageApi.success("Đổi mật khẩu thành công!")
      setIsPasswordModalOpen(false)
      passwordForm.resetFields()
    } catch (error) {
      messageApi.error("Có lỗi xảy ra khi đổi mật khẩu")
    }
  }

  const showProfileModal = () => {
    form.setFieldsValue({
      // Tab thông tin cơ bản
      fullName: profile?.data?.fullName,
      phone: profile?.data?.phone,
      email: profile?.data?.email,
      username: profile?.data?.username,
      logoUrl: profile?.data?.logoUrl,

      // Tab cài đặt thanh toán
      address: profile?.data?.address,
      
      bankName: profile?.data?.bankName,
      bankAccountNumber: profile?.data?.bankAccountNumber,
      bankAccountName: profile?.data?.bankAccountName,
      bankBranch: profile?.data?.bankBranch,
      
      // Thông tin shop
      shopName: profile?.data?.shopName,
      shopAddress: profile?.data?.shopAddress,
    })
    setAvatarImageUrl(profile?.data?.logoUrl || '')
    setIsModalOpen(true)
  }

  const [bankAccountStatus, setBankAccountStatus] = useState<'success' | 'error' | ''>('')
  const [bankAccountHelp, setBankAccountHelp] = useState('')

  const handleBankAccountVerification = async (accountNumber: string) => {
    const bankCode = form.getFieldValue('bankName')
    if (!bankCode) {
      messageApi.warning('Vui lòng chọn ngân hàng trước!')
      return
    }

    try {
      const response = await verifyBankAccount({ bankCode, accountNumber })
      if (response.data.isValid) {
        setBankAccountStatus('success')
        setBankAccountHelp('Số tài khoản hợp lệ')
      } else {
        setBankAccountStatus('error')
        setBankAccountHelp('Số tài khoản không hợp lệ')
      }
    } catch (error) {
      setBankAccountStatus('error')
      setBankAccountHelp('Có lỗi xảy ra khi kiểm tra thông tin')
    }
  }

  const debouncedVerification = debounce(handleBankAccountVerification, 500)

  const handleUploadImage = async (file: File, type: 'front' | 'back') => {
    try {
      const response = await uploadFile(file)
      const imageUrl = response.data.url
      
      if (type === 'front') {
        setIdCardFrontImageUrl(imageUrl)
        form.setFieldsValue({ idCardFrontImage: imageUrl })
      } else {
        setIdCardBackImageUrl(imageUrl)
        form.setFieldsValue({ idCardBackImage: imageUrl })
      }
      
      return false
    } catch (error) {
      messageApi.error("Có lỗi xảy ra khi tải lên ảnh")
      return false
    }
  }

  const handleUploadAvatar = async (file: File) => {
    try {
      const response = await uploadFile(file)
      const imageUrl = response.data.url
      
      setAvatarImageUrl(imageUrl)
      form.setFieldsValue({ logoUrl: imageUrl })
      
      return false
    } catch (error) {
      messageApi.error("Có lỗi xảy ra khi tải lên ảnh đại diện")
      return false
    }
  }

  const BasicInfoTab = () => (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleProfileUpdate}
    >
      <Form.Item
        label="Tên của bạn"
        name="fullName"
        rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Điện thoại của bạn"
        name="phone"
        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Ảnh đại diện"
        name="logoUrl"
      >
        <Upload
          listType="picture-card"
          maxCount={1}
          beforeUpload={(file) => handleUploadAvatar(file)}
          showUploadList={{ showPreviewIcon: true, showRemoveIcon: true }}
          fileList={avatarImageUrl ? [
            {
              uid: '-1',
              name: 'Avatar',
              status: 'done',
              url: avatarImageUrl,
            }
          ] : []}
          onRemove={() => {
            setAvatarImageUrl('')
            form.setFieldsValue({ logoUrl: undefined })
          }}
        >
          {!avatarImageUrl && (
            <div>
              <Button>Tải lên</Button>
            </div>
          )}
        </Upload>
      </Form.Item>

      <Form.Item
        label="Mật khẩu"
      >
        <Button 
          type="primary" 
          icon={<LockOutlined />}
          onClick={() => setIsPasswordModalOpen(true)}
        >
          Thay đổi mật khẩu
        </Button>
      </Form.Item>
    </Form>
  )

  const PaymentSettingsTab = () => (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleProfileUpdate}
    >
      <Form.Item
        label="Tên"
        name="fullName"
        rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
      >
        <Input placeholder="NHẬP TÊN NGƯỜI DÙNG" />
      </Form.Item>

      <Form.Item
        label="Địa chỉ"
        name="address"
        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
      >
        <Input.TextArea placeholder="NHẬP ĐỊA CHỈ NGƯỜI DÙNG" />
      </Form.Item>

      <Form.Item
        label="Loại giấy tờ"
        name="idCardType"
        rules={[{ required: true, message: 'Vui lòng chọn loại giấy tờ!' }]}
      >
        <Select
          placeholder="CHỌN LOẠI GIẤY TỜ"
          options={[
            { value: 'cccd', label: 'CCCD' },
            { value: 'cmnd', label: 'CMND' },
            { value: 'passport', label: 'Passport' },
            { value: 'driver_license', label: 'Bằng lái xe' },
          ]}
        />
      </Form.Item>

      <Form.Item
        label="Số giấy tờ"
        name="idCardNumber"
        rules={[{ required: true, message: 'Vui lòng nhập số giấy tờ!' }]}
      >
        <Input placeholder="NHẬP SỐ GIẤY TỜ" />
      </Form.Item>

      <Form.Item
        label="Mặt trước"
        name="idCardFrontImage"
        rules={[{ required: true, message: 'Vui lòng tải lên ảnh mặt trước!' }]}
      >
        <Upload
          listType="picture-card"
          maxCount={1}
          beforeUpload={(file) => handleUploadImage(file, 'front')}
          showUploadList={{ showPreviewIcon: true, showRemoveIcon: true }}
          fileList={idCardFrontImageUrl ? [
            {
              uid: '-1',
              name: 'ID Card Front',
              status: 'done',
              url: idCardFrontImageUrl,
            }
          ] : []}
          onRemove={() => {
            setIdCardFrontImageUrl('')
            form.setFieldsValue({ idCardFrontImage: undefined })
          }}
        >
          {!idCardFrontImageUrl && (
            <div>
              <Button>Tải lên</Button>
            </div>
          )}
        </Upload>
      </Form.Item>

      <Form.Item
        label="Mặt sau"
        name="idCardBackImage"
        rules={[{ required: true, message: 'Vui lòng tải lên ảnh mặt sau!' }]}
      >
        <Upload
          listType="picture-card"
          maxCount={1}
          beforeUpload={(file) => handleUploadImage(file, 'back')}
          showUploadList={{ showPreviewIcon: true, showRemoveIcon: true }}
          fileList={idCardBackImageUrl ? [
            {
              uid: '-1',
              name: 'ID Card Back',
              status: 'done',
              url: idCardBackImageUrl,
            }
          ] : []}
          onRemove={() => {
            setIdCardBackImageUrl('')
            form.setFieldsValue({ idCardBackImage: undefined })
          }}
        >
          {!idCardBackImageUrl && (
            <div>
              <Button>Tải lên</Button>
            </div>
          )}
        </Upload>
      </Form.Item>

      <Form.Item
        label="Tên ngân hàng"
        name="bankName"
        rules={[{ required: true, message: 'Vui lòng chọn ngân hàng!' }]}
      >
        <Select
          placeholder="VUI LÒNG CHỌN NGÂN HÀNG"
          options={[
            { value: 'vcb', label: 'Vietcombank' },
            { value: 'tcb', label: 'Techcombank' },
            { value: 'bidv', label: 'BIDV' },
            { value: 'vib', label: 'VIB' },
            { value: 'acb', label: 'ACB' },
            { value: 'mb', label: 'MB Bank' },
            { value: 'vp', label: 'VPBank' },
            { value: 'agri', label: 'Agribank' },
            { value: 'scb', label: 'Sacombank' },
            { value: 'tpb', label: 'TPBank' },
            { value: 'ocb', label: 'OCB' },
            { value: 'hdbank', label: 'HDBank' },
          ]}
        />
      </Form.Item>

      <Form.Item
        label="Số tài khoản ngân hàng"
        name="bankAccountNumber"
        validateStatus={bankAccountStatus}
        help={bankAccountHelp}
        rules={[{ required: true, message: 'Vui lòng nhập số tài khoản!' }]}
      >
        <Input 
          placeholder="NHẬP SỐ TÀI KHOẢN NGÂN HÀNG"
          onChange={(e) => debouncedVerification(e.target.value)}
        />
      </Form.Item>

      <Form.Item
        label="Tên tài khoản ngân hàng"
        name="bankAccountName"
        rules={[{ required: true, message: 'Vui lòng nhập tên tài khoản!' }]}
      >
        <Input placeholder="NHẬP TÊN CHỦ TÀI KHOẢN" />
      </Form.Item>
    </Form>
  )

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Thông tin cơ bản',
      children: <BasicInfoTab />,
    },
    {
      key: '2',
      label: 'Cài đặt thanh toán',
      children: <PaymentSettingsTab />,
    },
  ]

  const menuItems: MenuProps['items'] = [
    {
      key: '1',
      icon: <UserOutlined />,
      label: 'Hồ sơ',
      onClick: showProfileModal
    },
    {
      key: '2', 
      icon: <LockOutlined />,
      label: 'Đổi mật khẩu',
      onClick: () => setIsPasswordModalOpen(true)
    },
    {
      key: '3',
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
      onClick: handleClickLogout
    }
  ]

  if (!isClient) {
    return <div className="avatar-placeholder"></div>
  }

  return (
    <>
      {contextHolder}
      <Dropdown 
        menu={{ items: menuItems }}
        trigger={["click"]} 
        placement="bottomRight" 
        arrow
      >
        <Space className="cursor-pointer rounded-md transition-all">
          <Avatar
            size={38}
            style={{
              background: getAvatarColor(),
              fontSize: "18px",
              fontWeight: "bold",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {getFirstLetter()}
          </Avatar>
          <div className="flex flex-col">
            <p className="!!text-white/80/80 font-bold">{user?.username}</p>
            <p
              className="!text-xs !!text-white/80/80">
              {user?.role === "admin" ? "Admin" : "Seller"}
            </p>
          </div>
        </Space>
      </Dropdown>

      <Modal
        title="Quản lý hồ sơ"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
        confirmLoading={isUpdating}
        width="100%"
        style={{ maxWidth: '800px', margin: '0 auto' }}
        bodyStyle={{ maxHeight: '70vh', overflowY: 'auto' }}
        className="responsive-modal"
      >
        <Tabs
          defaultActiveKey="1"
          items={items}
          type="card"
        />
      </Modal>

      <Modal
        title="Đổi mật khẩu"
        open={isPasswordModalOpen}
        onCancel={() => {
          setIsPasswordModalOpen(false)
          passwordForm.resetFields()
        }}
        onOk={() => passwordForm.submit()}
        confirmLoading={isChangingPassword}
      >
        <Form
          form={passwordForm}
          layout="vertical"
          onFinish={handleChangePassword}
        >
          <Form.Item
            label="Mật khẩu hiện tại"
            name="currentPassword"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Mật khẩu mới"
            name="newPassword"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Xác nhận mật khẩu mới"
            name="confirmPassword"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: 'Vui lòng xác nhận mật khẩu mới!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu mới không khớp!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default AvatarDropdown

