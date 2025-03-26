"use client"

import type React from "react"
import { Card, Button, Typography, Spin, Badge, Divider } from "antd"
import { CheckOutlined, StarOutlined, RocketOutlined, CrownOutlined } from "@ant-design/icons"
import { useGetSellerPackages } from "@/hooks/seller-packages"
import Image from "next/image"
import Icon from "@mdi/react"
import { mdiCartOutline } from "@mdi/js"
import { useUser } from "@/context/useUserContext"
const { Title, Text } = Typography
const SellerPackages: React.FC = () => {
  const { data: packagesData, isLoading, isError } = useGetSellerPackages()
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
  const { profile } = useUser()
  console.log(profile)

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
                >
                  Mua gói
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default SellerPackages

