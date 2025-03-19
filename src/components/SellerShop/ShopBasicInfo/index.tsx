"use client"

import React from "react"
import { Form, Input, Button, Card, Upload, message } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import { ShopData } from "../types"

interface ShopBasicInfoProps {
  shopData: ShopData
  onSave: (data: Partial<ShopData>) => void
}

interface FileType {
  uid: string;
  name: string;
  status: 'done' | 'uploading' | 'error';
  url?: string;
}

const ShopBasicInfo: React.FC<ShopBasicInfoProps> = ({ shopData, onSave }) => {
  const [form] = Form.useForm()
  const [fileList, setFileList] = React.useState<FileType[]>([])

  React.useEffect(() => {
    form.setFieldsValue({
      name: shopData.name,
      phone: shopData.phone,
      address: shopData.address,
      metaTitle: shopData.metaTitle,
      metaDescription: shopData.metaDescription,
    })

    if (shopData.logo) {
      setFileList([{
        uid: '-1',
        name: 'logo',
        status: 'done',
        url: shopData.logo
      }])
    }
  }, [shopData, form])

  const handleSubmit = (values: any) => {
    const submitData = {
      ...values,
      logo: fileList[0]?.url || null
    }
    onSave(submitData)
    message.success("Thông tin cơ bản đã được lưu")
  }

  const handleChange = ({ fileList: newFileList }: any) => {
    setFileList(newFileList)
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
          name: shopData.name,
          phone: shopData.phone,
          address: shopData.address,
          metaTitle: shopData.metaTitle,
          metaDescription: shopData.metaDescription,
        }}
      >
        <div className="flex flex-col md:flex-row mb-3">
          <div className="md:w-1/6">
            <label className="block text-sm font-medium">
              Tên cửa hàng<span className="text-red-500">*</span>
            </label>
          </div>
          <div className="md:w-5/6">
            <Form.Item name="name" rules={[{ required: true, message: "Vui lòng nhập tên cửa hàng" }]}>
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
            <Form.Item name="address" rules={[{ required: true, message: "Vui lòng nhập địa chỉ cửa hàng" }]}>
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
            Tiết kiệm
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default ShopBasicInfo

