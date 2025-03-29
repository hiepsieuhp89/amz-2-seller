"use client"

import { useUser } from "@/context/useUserContext"
import { useGetSpreadPackages, usePurchaseSpreadPackage } from "@/hooks/spread-packages"
import { CheckOutlined } from "@ant-design/icons"
import { Button, Modal, Spin, Typography } from "antd"
import React from "react"

const SellerSpreadPackages = () => {
  const { data: packagesData, isLoading, isError } = useGetSpreadPackages()
  const { profile } = useUser()
  const [selectedPackage, setSelectedPackage] = React.useState<{
    id: number
    title: string
    price: number
  } | null>(null)
  const [isModalVisible, setIsModalVisible] = React.useState(false)
  const purchaseMutation = usePurchaseSpreadPackage()

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
        <Typography.Title level={4}>Có lỗi xảy ra khi tải dữ liệu</Typography.Title>
        <Typography.Text>Vui lòng thử lại sau</Typography.Text>
      </div>
    )

  const packages = packagesData?.data.data.map((pkg) => ({
    id: Number(pkg.id),
    title: pkg.name,
    image: pkg.image,
    features: [
      `${pkg.maxProducts} Giới hạn quảng bá sản phẩm`,
      `Nạp vào $${pkg.price} hệ thống sẽ quảng bá cửa hàng của bạn, tăng cao doanh thu. Dự tính: $${pkg.price * pkg.percentProfit}`,
    ],
    price: `$${pkg.price}`,
    duration: pkg.duration,
    durationUnit: "ngày",
  })) || []

  return (
    <div className="pt-2 lg:px-8">
      {/* Header Section */}
      <section className="py-8 bg-[#eef1f6]">
        <div className="container mx-auto">
          <div className="row">
            <div className="mx-auto text-center max-w-4xl">
              <h1 className="mb-0 font-bold text-3xl md:text-4xl">Gói tiếp thị dành cho người bán</h1>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-4 lg:py-5">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-stretch gap-6 justify-center">
            {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="
                  w-[333px]
                  overflow-hidden rounded-md  transition-all duration-300  hover:-translate-y-1 py-6 px-5 bg-white border"
                >
                  <div className="text-center mb-4 mt-3">
                    <img
                      className="max-w-full mx-auto mb-4"
                      src={pkg.image }
                      alt={pkg.title}
                      height={100}
                    />
                    <h5 className="mb-3 text-lg font-semibold">{pkg.title}</h5>
                  </div>

                  <ul className="list-none mb-5 text-sm">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="py-2 flex items-start">
                        <CheckOutlined className="!text-green-500 mr-2 mt-1" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mb-5 flex items-center justify-center">
                    <span className="text-3xl font-semibold leading-none mb-0">{pkg.price}</span>
                    <span className="text-gray-500 border-l ml-2 pl-2 text-center">
                      {pkg.duration}
                      <br />
                      {pkg.durationUnit}
                    </span>
                  </div>

                  <div className="text-center">
                    <Button
                      type="primary"
                      className="font-semibold h-10 px-6 !rounded-[4px]"
                      onClick={() => select_payment_type(
                        pkg.id,
                        pkg.title,
                        Number.parseFloat(pkg.price.replace("$", ""))
                      )}
                    >
                      Mua gói
                    </Button>
                  </div>
                </div>
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

export default SellerSpreadPackages

