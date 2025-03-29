"use client"

import { useUser } from "@/context/useUserContext"
import { useUploadFile } from '@/hooks/upload'
import { UploadOutlined } from "@ant-design/icons"
import { Button, Form, Input, Upload, message } from "antd"
import React from "react"
import { ShopData } from "../types"

interface ShopBasicInfoProps {
  onSave: (data: Partial<ShopData>) => void
}

interface FileType {
  uid: string;
  name: string;
  status: 'done' | 'uploading' | 'error';
  url?: string;
  thumbUrl?: string;
}

const ShopBasicInfo<ShopBasicInfoProps> = ({ onSave }) => {
  const [form] = Form.useForm()
  const [fileList, setFileList] = React.useState<FileType[]>([])
  const uploadMutation = useUploadFile()
  const { profile } = useUser()

  React.useEffect(() => {
    form.setFieldsValue({
      shopName: profile?.data?.shopName,
      phone: profile?.data?.phone,
      shopAddress: profile?.data?.shopAddress,
      metaTitle: profile?.data?.metaTitle,
      metaDescription: profile?.data?.metaDescription,
      logoUrl: profile?.data?.logoUrl
    })

    if (profile?.data?.logoUrl) {
      setFileList([{
        uid: '-1',
        name: 'logo',
        status: 'done',
        url: profile?.data?.logoUrl
      }])
    }
  }, [profile, form])

  const handleSubmit = (values: any) => {
    const submitData = {
      ...values,
      logoUrl: fileList[0]?.url || null
    }
    onSave(submitData)
    message.success("Thông tin cơ bản đã được lưu")
  }

  const handleChange = async ({ fileList: newFileList }: any) => {
    setFileList(newFileList)

    if (newFileList.length > 0 && newFileList[0].originFileObj) {
      try {
        const uploadedFile = await uploadMutation.mutateAsync(newFileList[0].originFileObj)
        setFileList([{
          uid: '-1',
          name: 'logo',
          status: 'done',
          url: uploadedFile.data.url,
          thumbUrl: URL.createObjectURL(newFileList[0].originFileObj)
        }])
      } catch (error) {
        message.error('Upload failed')
        setFileList([])
      }
    }
  }

  return (
    <div
      className="bg-white rounded-[4px] border"
    >
      <div className="px-6 py-3 flex justify-between items-center">
        <p className="font-medium text-base">Thông tin cơ bản</p>
      </div>
      <Form
        className="border-t !p-6"
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          shopName: profile?.data?.shopName,
          phone: profile?.data?.phone,
          shopAddress: profile?.data?.shopAddress,
          metaTitle: profile?.data?.metaTitle,
          metaDescription: profile?.data?.metaDescription,
        }}
      >
        <div className="flex flex-col md:flex-row mb-3">
          <div className="md:w-1/6">
            <label className="block text-sm font-medium">
              Tên cửa hàng<span className="text-red-500">*</span>
            </label>
          </div>
          <div className="md:w-5/6">
            <Form.Item name="shopName" rules={[{ required: true, message: "Vui lòng nhập tên cửa hàng" }]}>
              <Input placeholder="Tên cửa hàng" className="w-full" />
            </Form.Item>
          </div>
        </div>

        <div className="flex flex-col md:flex-row mb-3">
          <div className="md:w-1/6">
            <label className="block text-sm font-medium">Biểu trưng cửa hàng</label>
          </div>
          <div className="md:w-5/6">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={handleChange}
              maxCount={1}
              beforeUpload={() => false}
              accept="image/*"
            >
              {fileList.length < 1 && (
                <div>
                  <UploadOutlined />
                  <div style={{ marginTop: 8 }}>Tải lên</div>
                </div>
              )}
            </Upload>
          </div>
        </div>

        <div className="flex flex-col md:flex-row mb-3">
          <div className="md:w-1/6">
            <label className="block text-sm font-medium">
              Shop Phone <span className="text-red-500">*</span>
            </label>
          </div>
          <div className="md:w-5/6">
            <Form.Item name="phone" rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}>
              <Input placeholder="Điện thoại" className="w-full" />
            </Form.Item>
          </div>
        </div>

        <div className="flex flex-col md:flex-row mb-3">
          <div className="md:w-1/6">
            <label className="block text-sm font-medium">
              Địa chỉ cửa hàng <span className="text-red-500">*</span>
            </label>
          </div>
          <div className="md:w-5/6">
            <Form.Item name="shopAddress" rules={[{ required: true, message: "Vui lòng nhập địa chỉ cửa hàng" }]}>
              <Input placeholder="Địa chỉ" className="w-full" />
            </Form.Item>
          </div>
        </div>

        <div className="flex flex-col md:flex-row mb-3">
          <div className="md:w-1/6">
            <label className="block text-sm font-medium">
              Tiêu đề meta<span className="text-red-500">*</span>
            </label>
          </div>
          <div className="md:w-5/6">
            <Form.Item name="metaTitle" rules={[{ required: true, message: "Vui lòng nhập tiêu đề meta" }]}>
              <Input placeholder="Tiêu đề meta" className="w-full" />
            </Form.Item>
          </div>
        </div>

        <div className="flex flex-col md:flex-row mb-3">
          <div className="md:w-1/6">
            <label className="block text-sm font-medium">
              Mô tả meta<span className="text-red-500">*</span>
            </label>
          </div>
          <div className="md:w-5/6">
            <Form.Item name="metaDescription" rules={[{ required: true, message: "Vui lòng nhập mô tả meta" }]}>
              <Input.TextArea rows={3} placeholder="Mô tả meta" className="w-full" />
            </Form.Item>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="primary" htmlType="submit" size="small" className="bg-blue-500 !rounded-[4px] w-[90px] !h-9">
            Lưu
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default ShopBasicInfo

