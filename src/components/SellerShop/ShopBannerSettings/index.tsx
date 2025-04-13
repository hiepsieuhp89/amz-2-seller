"use client"

import React from "react"
import { Form, Button, Card, Upload, message } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import type { ShopData } from "../types"

interface ShopBannerSettingsProps {
  shopData: ShopData
  onSave: (data: Partial<ShopData>) => void
}

const ShopBannerSettings: React.FC<ShopBannerSettingsProps> = ({ shopData, onSave }) => {
  const [form] = Form.useForm()

  const defaultValues = {
    topBanner: [],
    sliders: [],
    bannerFullWidth1: [],
    bannersHalfWidth: [],
    bannerFullWidth2: [],
  };

  React.useEffect(() => {
    // Chuyển đổi dữ liệu thành định dạng fileList cho Antd Upload
    const formatFileList = (data: any) => {
      if (!data) return [];
      if (Array.isArray(data)) {
        return data.map((item, index) => ({
          uid: `-${index}`,
          name: `image-${index}`,
          status: 'done',
          url: item
        }));
      }
      return [{
        uid: '-1',
        name: 'image',
        status: 'done',
        url: data
      }];
    };

    form.setFieldsValue({
      topBanner: shopData?.topBanner || defaultValues.topBanner,
      sliders: shopData?.sliders || defaultValues.sliders,
      bannerFullWidth1: shopData?.bannerFullWidth1 || defaultValues.bannerFullWidth1,
      bannersHalfWidth: shopData?.bannersHalfWidth || defaultValues.bannersHalfWidth,
      bannerFullWidth2: shopData?.bannerFullWidth2 || defaultValues.bannerFullWidth2,
    });
  }, [shopData, form])

  const handleSubmit = (values: any) => {
    // Đảm bảo các giá trị là mảng trước khi lưu
    const sanitizedValues = {
      ...values,
      topBanner: values.topBanner || [],
      sliders: values.sliders || [],
      bannerFullWidth1: values.bannerFullWidth1 || [],
      bannersHalfWidth: values.bannersHalfWidth || [],
      bannerFullWidth2: values.bannerFullWidth2 || [],
    };
    onSave(sanitizedValues)
    message.success("Cài đặt biểu ngữ đã được lưu")
  }

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList || [];  // Thêm mặc định array rỗng
  }

  const renderUploadField = (label: string, name: string, dimensions: string, multiple = false, helpText?: string) => (
    <div className="flex flex-col md:flex-row mb-3">
      <div className="md:w-1/6">
        <label className="block text-sm font-medium">
          {label} {dimensions && `(${dimensions})`}
        </label>
      </div>
      <div className="md:w-5/6">
        <Form.Item name={name} valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload
            name={name}
            listType="picture"
            multiple={multiple}
            maxCount={multiple ? undefined : 1}
            accept="image/*"
            fileList={form.getFieldValue(name) || []}
            beforeUpload={(file) => {
              try {
                return true;
              } catch (error) {
                console.error('Before upload error:', error);
                return false;
              }
            }}
          >
            <div className="flex">
              <Button icon={<UploadOutlined />} className="
              !rounded-[4px]
              bg-gray-100 border-gray-300">
                Duyệt qua
              </Button>
              <div className="ml-2 border border-gray-300 flex items-center px-3 rounded-[4px] bg-white flex-grow">
                Chọn tập tin
              </div>
            </div>
          </Upload>
        </Form.Item>
        {helpText && <small className="text-gray-500">{helpText}</small>}
      </div>
    </div>
  )

  const heightLimitHelpText =
    "Chúng tôi đã phải giới hạn chiều cao để duy trì nhất quán. Trong một số thiết bị, cả hai mặt của biểu ngữ có thể bị cắt để giới hạn chiều cao."

  return (
    <div
      className="bg-white rounded-[4px] border mt-6"
    >
      <div className="px-6 py-3 flex justify-between items-center">
        <p className="font-medium text-base">Cài đặt biểu ngữ</p>
      </div>
      <Form
        className="border-t !p-6"
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          topBanner: shopData.topBanner,
          sliders: shopData.sliders,
          bannerFullWidth1: shopData.bannerFullWidth1,
          bannersHalfWidth: shopData.bannersHalfWidth,
          bannerFullWidth2: shopData.bannerFullWidth2,
        }}
      >
        {renderUploadField("Ảnh bìa Đỉnh", "topBanner", "1920x360", false, heightLimitHelpText)}
        {renderUploadField("Ảnh bìa chuyển động", "sliders", "1500x450", true, heightLimitHelpText)}
        {renderUploadField("Ảnh bìa tràn viền 1", "bannerFullWidth1", "", true)}
        {renderUploadField("Ảnh bìa nửa tràn viền", "bannersHalfWidth", "(Ảnh bìa chia đôi)", true)}
        {renderUploadField("Ảnh bìa tràn viền 2", "bannerFullWidth2", "", true)}

        <div className="flex justify-end">
          <Button type="primary" htmlType="submit" size="small" className="bg-blue-500 !rounded-[4px] w-[90px] !h-9">
            Lưu
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default ShopBannerSettings

