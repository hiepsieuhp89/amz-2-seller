"use client"
import { useGetSellerPackages, usePurchaseSellerPackage } from "@/hooks/seller-packages"
import { CrownOutlined, RocketOutlined, StarOutlined } from "@ant-design/icons"
import { Button, Divider, Modal, Spin, Typography } from "antd"
import Image from "next/image"
import React, { useState } from "react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "../ui/breadcrumb"
import { Check } from "lucide-react"
import Icon from "@mdi/react"
import { mdiPackageVariantPlus } from "@mdi/js"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ISellerPackage } from "@/interface/response/seller-packages"

const { Title, Text } = Typography

const SellerPackages = () => {
  const { data: packagesData, isLoading, isError } = useGetSellerPackages()
  const [selectedPackage, setSelectedPackage] = useState<ISellerPackage | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const purchaseMutation = usePurchaseSellerPackage()

  const handlePurchase = async () => {
    if (!selectedPackage) return;
    try {
      await purchaseMutation.mutateAsync({ packageId: selectedPackage?.id });
      Modal.success({
        title: 'Mua gói thành công',
        content: `Bạn đã mua thành công gói ${selectedPackage?.name}`,
      });
    } catch (error: any) {
      if (error?.response?.data?.message === "Insufficient balance") {
        Modal.error({
          title: 'Lỗi khi mua gói',
          content: 'Số dư không đủ để thực hiện.',
        });
      } else {
        Modal.error({
          title: 'Lỗi khi mua gói',
          content: 'Đã có lỗi xảy ra khi thực hiện mua gói. Vui lòng thử lại sau.',
        });
      }
    } finally {
      setIsModalVisible(false);
      setSelectedPackage(null);
    }
  };

  const select_payment_type = (pkg: ISellerPackage) => {
    setSelectedPackage(pkg)
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

  // Sắp xếp dữ liệu gói theo giá tăng dần
  const sortedData = packagesData?.data?.data?.slice().sort((a: any, b: any) => a.price - b.price) || [];

  const nonZeroPriceImages = [
    "/images/diamond-shop.png",
    "/images/platinum-shop.png",
    "/images/premium-shop.png"
  ];
  let nonZeroIndex = 0; // Biến đếm cho các gói có giá > 0

  const packages =
    sortedData.map((pkg: any) => {
      let image;
      if (pkg.price === 0) {
        image = "/images/silver-shop.png";
      } else {
        image = nonZeroPriceImages[nonZeroIndex % nonZeroPriceImages.length];
        nonZeroIndex++;
      }

      return {
        id: pkg.id,
        title: pkg.name,
        image: image,
        description: pkg.description,
        features: [
          `${pkg.maxProducts} Giới hạn quảng bá sản phẩm`,
          `Nạp vào $${pkg.price} hệ thống sẽ quảng bá cửa hàng của bạn, tăng cao doanh thu. Dự tính: $${pkg.price * pkg.percentProfit}`,
        ],
        price: pkg.price,
        duration: pkg.duration,
        durationUnit: "ngày",
      };
    }) || [];

  const getPackageIcon = (index: number) => {
    const icons = [<RocketOutlined key="rocket" />, <StarOutlined key="star" />, <CrownOutlined key="crown" />]
    return icons[index % icons.length]
  }

  return (
    <div className="min-h-screen p-4">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="text-main-dark-blue/80 hover:text-main-dark-blue uppercase">
              Trang chủ
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-main-dark-blue/80" />
          <BreadcrumbItem>
            <BreadcrumbLink className="text-main-dark-blue/80 font-semibold uppercase">
              Gói tài khoản
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h4 className="text-base text-gray-500 w-full inline-block mb-4">
        Tăng khả năng tiếp cận khách hàng và doanh số bán hàng của bạn với các gói tiếp thị được thiết kế đặc biệt cho người bán.
      </h4>
      {/* Packages Section */}
      <section className="py-4">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-stretch justify-center gap-6">
            {packages.map((pkg: any, index: number) => (
              <div
                key={pkg.id + index}
                className="w-full sm:w-[350px] p-4 transition-all duration-300 hover:-translate-y-2 overflow-hidden bg-white rounded-lg shadow-md flex flex-col justify-center items-center"
              >
                <div className="relative h-[100px] w-[100px]">
                  <Image
                    className="object-contain"
                    src={pkg.image}
                    alt={pkg.title}
                    quality={100}
                    priority
                    draggable={false}
                    height={200}
                    width={200}
                  />
                </div>
                <div className="flex items-center mt-4">
                  <p className="text-xl font-bold bg-gradient-to-l from-[#949DA9] to-[#AFC2D5] text-transparent bg-clip-text">
                    {pkg.title}
                  </p>
                </div>
                <Divider className="my-4" />
                <div className="flex flex-col gap-2 items-start">
                  <p className="text-gray-600 text-base"><strong>Mô tả gói:</strong> {pkg.description}</p>
                  <div className="w-full items-center justify-center text-center"><span className="text-main-golden-orange text-4xl font-bold">${pkg.price}</span> / {pkg.duration} {pkg.durationUnit}</div>
                  <ul className="list-none mb-4 space-y-2">
                    {pkg.features.map((feature: any, idx: number) => (
                      <li key={idx} className="flex gap-2 items-start">
                        <div className="w-5 h-5 p-1 rounded-full bg-green-500 flex items-center justify-center">
                          <Check className="text-white" />
                        </div>
                        <p className="text-justify">{feature}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              <div className="w-full flex-1 flex items-end justify-center pb-4">
              {pkg.price === 0 ? (
                <Button
                  type="text"
                  className="
                  !text-white !font-medium
                  py-1 px-3 text-sm !rounded-[4px] !border !border-green-500/80 !bg-green-500/80 cursor-not-allowed"
                  iconPosition="end"
                  icon={<Check size={16} />}
                  disabled={true}
                >
                  Đang sử dụng
                </Button>
              ) : (
                <Button
                  onClick={() => select_payment_type(pkg)}
                  type="default"
                  className="
                  !!text-white/80 !font-medium
                  py-1 px-3 text-sm !rounded-[4px] !border !border-main-dark-blue !bg-main-dark-blue hover:!bg-main-dark-blue/80 hover:!border-main-dark-blue/80 !text-white"
                  iconPosition="end"
                  icon={<Icon path={mdiPackageVariantPlus} size={0.8} />}>
                  Mua gói
                </Button>
              )}
              </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={isModalVisible} onOpenChange={setIsModalVisible}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl">Xác nhận mua gói</DialogTitle>
          </DialogHeader>
          {selectedPackage && (
            <>
              <DialogDescription>
                <div className="text-base">Bạn đang mua gói: <strong className="text-main-golden-orange">{selectedPackage?.title}</strong></div>
                <div className="text-base">Giá: <strong className="text-main-golden-orange">${selectedPackage.price}</strong></div>
                <div className="text-base mt-4">Vui lòng xác nhận để tiếp tục.</div>
              </DialogDescription>
              <div className="flex justify-end gap-2 mt-4">
               
                <Button
                  type="text"
                  onClick={() => setIsModalVisible(false)}
                  className="!!text-white/80 !font-medium
                  py-1 px-3 text-sm !rounded-[4px] !border !border-red-500 !bg-red-500 hover:!bg-red-500/80 hover:!border-red-500/80 !text-white"
                >
                  Hủy bỏ
                </Button>
                <Button
                  type="text"
                  onClick={handlePurchase}
                  className="!!text-white/80 !font-medium
                  py-1 px-3 text-sm !rounded-[4px] !border !border-green-500 !bg-green-500 hover:!bg-green-500/80 hover:!border-green-500/80 !text-white"
                >
                  Xác nhận
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default SellerPackages

