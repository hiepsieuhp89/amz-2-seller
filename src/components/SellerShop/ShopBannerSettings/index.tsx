"use client"

import React from "react"
import { Form, Button, Card, Upload, message } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import type { ShopData } from "../types"
import { useUploadFile } from '@/hooks/upload'
import { useUser } from "@/context/useUserContext"
import { useEffect } from "react"

interface ShopBannerSettingsProps {
  onSave: (data: Partial<ShopData>) => void
}

interface FileType {
  uid: string;
  name: string;
  status: 'done' | 'uploading' | 'error';
  url?: string;
  thumbUrl?: string;
}

const ShopBannerSettings = ({ profileData }: { profileData: any }) => {
  const [form] = Form.useForm()
  const uploadMutation = useUploadFile()
  const { profile } = useUser()
  
  // Create separate fileList states for each upload field
  const [bannerImageList, setBannerImageList] = React.useState<FileType[]>([])
  const [mobileBannerImageList, setMobileBannerImageList] = React.useState<FileType[]>([])
  const [fullBannerImageList, setFullBannerImageList] = React.useState<FileType[]>([])
  const [halfBannerImageList, setHalfBannerImageList] = React.useState<FileType[]>([])
  const [bannerImage2List, setBannerImage2List] = React.useState<FileType[]>([])

  const defaultValues = {
    bannerImage: profile?.data?.bannerImage,
    mobileBannerImage: profile?.data?.mobileBannerImage,
    fullBannerImage: profile?.data?.fullBannerImage,
    halfBannerImage: profile?.data?.halfBannerImage,
    bannerImage2: profile?.data?.bannerImage2,
  };

  useEffect(() => {
    form.setFieldsValue({
      bannerImage: profile?.data?.bannerImage || '',
      mobileBannerImage: profile?.data?.mobileBannerImage || '',
      fullBannerImage: profile?.data?.fullBannerImage || '',
      halfBannerImage: profile?.data?.halfBannerImage || '',
      bannerImage2: profile?.data?.bannerImage2 || '',
    });
    
    // Initialize fileList states with existing images
    if (profile?.data?.bannerImage) {
      setBannerImageList([{
        uid: '-1',
        name: 'bannerImage',
        status: 'done',
        url: profile?.data?.bannerImage
      }]);
    }
    
    if (profile?.data?.mobileBannerImage) {
      setMobileBannerImageList([{
        uid: '-1',
        name: 'mobileBannerImage',
        status: 'done',
        url: profile?.data?.mobileBannerImage
      }]);
    }
    
    if (profile?.data?.fullBannerImage) {
      setFullBannerImageList([{
        uid: '-1',
        name: 'fullBannerImage',
        status: 'done',
        url: profile?.data?.fullBannerImage
      }]);
    }
    
    if (profile?.data?.halfBannerImage) {
      setHalfBannerImageList([{
        uid: '-1',
        name: 'halfBannerImage',
        status: 'done',
        url: profile?.data?.halfBannerImage
      }]);
    }
    
    if (profile?.data?.bannerImage2) {
      setBannerImage2List([{
        uid: '-1',
        name: 'bannerImage2',
        status: 'done',
        url: profile?.data?.bannerImage2
      }]);
    }
  }, [profile, form]);

  const handleSubmit = (values: any) => {
    // Get the URLs from the fileList states
    const submitData = {
      ...values,
      bannerImage: bannerImageList[0]?.url || '',
      mobileBannerImage: mobileBannerImageList[0]?.url || '',
      fullBannerImage: fullBannerImageList[0]?.url || '',
      halfBannerImage: halfBannerImageList[0]?.url || '',
      bannerImage2: bannerImage2List[0]?.url || '',
    };
    message.success("Cài đặt biểu ngữ đã được lưu");
  }

  const handleChange = (fieldName: string, setFileList: React.Dispatch<React.SetStateAction<FileType[]>>) => 
    async ({ fileList: newFileList }: any) => {
      setFileList(newFileList)
      
      if (newFileList.length > 0 && newFileList[0].originFileObj) {
        try {
          const uploadedFile = await uploadMutation.mutateAsync(newFileList[0].originFileObj)
          setFileList([{
            uid: '-1',
            name: fieldName,
            status: 'done',
            url: uploadedFile.data.url,
            thumbUrl: URL.createObjectURL(newFileList[0].originFileObj)
          }])
          form.setFieldsValue({ [fieldName]: uploadedFile.data.url })
        } catch (error) {
          message.error('Upload failed')
          setFileList([])
        }
      }
    }

  const renderUploadField = (
    label: string, 
    name: string, 
    dimensions: string, 
    fileList: FileType[],
    setFileList: React.Dispatch<React.SetStateAction<FileType[]>>,
    helpText?: string
  ) => {
    return (
      <div className="flex flex-col md:flex-row mb-3">
        <div className="md:w-1/6">
          <label className="block text-sm font-medium">
            {label} {dimensions && `(${dimensions})`}
          </label>
        </div>
        <div className="md:w-5/6">
          <Upload
            name={name}
            listType="picture-card"
            fileList={fileList}
            onChange={handleChange(name, setFileList)}
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
          {helpText && <small className="text-gray-500">{helpText}</small>}
        </div>
      </div>
    );
  };

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
          bannerImage: profile?.data?.bannerImage,
          mobileBannerImage: profile?.data?.mobileBannerImage,
          fullBannerImage: profile?.data?.fullBannerImage,
          halfBannerImage: profile?.data?.halfBannerImage,
          bannerImage2: profile?.data?.bannerImage2,
        }}
      >
        {renderUploadField("Ảnh bìa", "bannerImage", "1920x360", bannerImageList, setBannerImageList, heightLimitHelpText)}
        {renderUploadField("Ảnh bìa di động", "mobileBannerImage", "1500x450", mobileBannerImageList, setMobileBannerImageList, heightLimitHelpText)}
        {renderUploadField("Ảnh bìa tràn viền 1", "fullBannerImage", "", fullBannerImageList, setFullBannerImageList)}
        {renderUploadField("Ảnh bìa nửa tràn viền", "halfBannerImage", "(Ảnh bìa chia đôi)", halfBannerImageList, setHalfBannerImageList)}
        {renderUploadField("Ảnh bìa tràn viền 2", "bannerImage2", "", bannerImage2List, setBannerImage2List)}

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

