"use client"

import { useUser } from "@/context/useUserContext"
import { useGetSellerPackages, usePurchaseSellerPackage } from "@/hooks/seller-packages"
import { CheckOutlined, CrownOutlined, RocketOutlined, StarOutlined } from "@ant-design/icons"
import { mdiCartOutline } from "@mdi/js"
import Icon from "@mdi/react"
import { Badge, Button, Card, Divider, Modal, Spin, Typography } from "antd"
import Image from "next/image"
import React from "react"
const { Title, Text } = Typography
const SellerPackages = () => {
  const { data: packagesData, isLoading, isError } = useGetSellerPackages()
  const { profile } = useUser()
  const [selectedPackage, setSelectedPackage] = React.useState<{
    id: number
    title: string
    price: number
  } | null>(null)
  const [isModalVisible, setIsModalVisible] = React.useState(false)
  const purchaseMutation = usePurchaseSellerPackage()

  const handlePurchase = async () => {
    if (!selectedPackage) return
    
    try {
      await purchaseMutation.mutateAsync({ packageId: selectedPackage.id.toString() })
      Modal.success({
        title: 'Mua gói thành công',
        content: `Bạn đã mua thành công gói ${selectedPackage.title}`,
      })
    } catch (error) {
      Modal.error({
        title: 'Lỗi khi mua gói',
        content: 'Đã có lỗi xảy ra khi thực hiện mua gói. Vui lòng thử lại sau.',
      })
    } finally {
      setIsModalVisible(false)
      setSelectedPackage(null)
    }
  }

  const select_payment_type = (id: number, title: string, price: number) => {
    setSelectedPackage({ id, title, price })
    setIsModalVisible(true)
  }

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Spin size="small" />
      </div>
    )
  if (isError)
    return (
      <div className="text-center p-8 text-red-500">
        <Title level={4}>Có lỗi xảy ra khi tải dữ liệu</Title>
        <Text>Vui lòng thử lại sau</Text>
      </div>
    )

  const packages =
    packagesData?.data.data.map((pkg) => ({
      id: Number(pkg.id),
      title: pkg.name,
      image: pkg.image,
      features: [
        `${pkg.maxProducts} Giới hạn quảng bá sản phẩm`,
        `Nạp vào $${pkg.price} hệ thống sẽ quảng bá cửa hàng của bạn, tăng cao doanh thu. Dự tính: $${pkg.price * pkg.percentProfit}`,
      ],
      price: pkg.price,
      duration: pkg.duration,
      durationUnit: "ngày",
      popular: pkg.id === "2",
    })) || []

  const checkImageUrl = (imageUrl: string): string => {
    if (!imageUrl) return "https://picsum.photos/800/600"

    if (imageUrl.includes("example.com") || !imageUrl.startsWith("http")) {
      return "https://picsum.photos/800/600"
    }

    return imageUrl
  }

  const getPackageIcon = (index: number) => {
    const icons = [<RocketOutlined key="rocket" />, <StarOutlined key="star" />, <CrownOutlined key="crown" />]
    return icons[index % icons.length]
  }

  return (
    <div className="min-h-screen p-4">
      {/* Header Section */}
      <div className="flex items-center mb-2 w-full">
        <div
          className="
          flex-shrink-0
          bg-amber-100 text-main-golden-orange w-10 h-10 rounded-full flex items-center justify-center mr-3 text-lg"
        >
          <Icon path={mdiCartOutline} size={0.8} color={"#FCAF17"} />
        </div>
        <h1 className="!font-semibold text-main-gunmetal-blue text-xl w-full">
          Gói tài khoản dành cho người bán
        </h1>
      </div>
      <h4 className="text-base text-gray-400 w-full inline-block mb-4">
          Tăng khả năng hiển thị và doanh số bán hàng của bạn với các gói tài khoản được thiết kế đặc biệt cho người
          bán.
        </h4>
      {/* Packages Section */}
      <section className="py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-stretch justify-center gap-8">
            {packages.map((pkg, index) => (
              <Card
                key={pkg.id}
                className="
                w-full sm:w-[350px] hover:shadow-lg transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                bodyStyle={{ padding: '12px' }}
                cover={
                  <div className="relative h-[200px] overflow-hidden">
                    <Image
                      className="object-cover"
                      src={checkImageUrl(pkg.image)}
                      alt={pkg.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 350px"
                      priority
                    />
                    {pkg.popular && <Badge.Ribbon text="Phổ biến" color="#f50" className="z-10" />}
                  </div>
                }
              >
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 text-lg ${index === 0
                        ? "bg-blue-100 text-blue-500"
                        : index === 1
                          ? "bg-orange-100 text-orange-500"
                          : "bg-purple-100 text-purple-500"
                      }`}
                  >
                    {getPackageIcon(index)}
                  </div>
                  <Title level={3} className="!m-0 !text-xl">
                    {pkg.title}
                  </Title>
                </div>

                <Divider className="my-4" />

                <div className="mb-6">
                  <div className="flex items-baseline mb-1">
                    <Text className="text-3xl font-bold text-blue-600">${pkg.price}</Text>
                    <Text className="text-gray-500 ml-2">
                      / {pkg.duration} {pkg.durationUnit}
                    </Text>
                  </div>
                </div>

                <ul className="list-none mb-8 space-y-3">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex">
                      <CheckOutlined className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                      <Text className="text-gray-700">{feature}</Text>
                    </li>
                  ))}
                </ul>

                <Button
                  type="primary"
                  size="large"
                  block
                  className={`h-12 !rounded-[4px]
                    font-medium text-base ${pkg.popular ? "!bg-orange-500 !border-orange-500 hover:!bg-orange-600" : ""
                    }`}
                  onClick={() => select_payment_type(pkg.id, pkg.title, pkg.price)}
                >
                  Mua gói
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Modal
        title="Xác nhận mua gói"
        visible={isModalVisible}
        onOk={handlePurchase}
        onCancel={() => setIsModalVisible(false)}
        confirmLoading={purchaseMutation.isPending}
      >
        {selectedPackage && (
          <>
            <p>Bạn đang mua gói: <strong>{selectedPackage.title}</strong></p>
            <p>Giá: <strong>${selectedPackage.price}</strong></p>
            <p>Vui lòng xác nhận để tiếp tục.</p>
          </>
        )}
      </Modal>
    </div>
  )
}

export default SellerPackages

