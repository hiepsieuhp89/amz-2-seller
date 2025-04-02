"use client"

import { useUser } from "@/context/useUserContext"
import { useGetSpreadPackages, usePurchaseSpreadPackage } from "@/hooks/spread-packages"
import { Button, Modal, Spin, Divider } from "antd"
import Image from "next/image"
import React from "react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "../ui/breadcrumb"
import { Check } from "lucide-react"
import Icon from "@mdi/react"
import { mdiPackageVariantPlus } from "@mdi/js"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

const SellerSpreadPackages = () => {
  const { data: packagesData, isLoading, isError } = useGetSpreadPackages()
  const { profile } = useUser()
  const [selectedPackage, setSelectedPackage] = React.useState<{
    id: number
    title: string
    price: number
  } | null>(null)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = React.useState(false)
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
      setIsConfirmDialogOpen(false)
      setSelectedPackage(null)
    }
  }

  const openConfirmationDialog = (id: number, title: string, price: number) => {
    setSelectedPackage({ id, title, price })
    setIsConfirmDialogOpen(true)
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
        <h4 className="text-lg font-semibold">Có lỗi xảy ra khi tải dữ liệu</h4>
        <p>Vui lòng thử lại sau</p>
      </div>
    )

  const packages = packagesData?.data.data.map((pkg: any) => ({
    id: Number(pkg.id),
    title: pkg.name,
    image: pkg.image,
    features: [
      `${pkg.maxProducts} Giới hạn quảng bá sản phẩm`,
      `Nạp vào $${pkg.price} hệ thống sẽ quảng bá cửa hàng của bạn, tăng cao doanh thu. Dự tính: $${pkg.price * pkg.percentProfit}`,
    ],
    price: Number(pkg.price),
    duration: pkg.duration,
    durationUnit: "ngày",
  })) || []

  const sortedPackages = packages.slice().sort((a, b) => a.price - b.price);

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
              Gói quảng bá
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h4 className="text-base text-gray-500 w-full inline-block mb-4">
        Tăng khả năng hiển thị và tiếp cận khách hàng tiềm năng cho sản phẩm của bạn với các gói quảng bá hiệu quả.
      </h4>

      <section className="py-4">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-stretch justify-center gap-6">
            {sortedPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="w-full sm:w-[350px] p-4 transition-all duration-300 hover:-translate-y-2 overflow-hidden bg-white rounded-lg shadow-md flex flex-col justify-center items-center"
              >
                <div className="relative w-full max-h-40 h-40 rounded-md">
                  <Image
                    className="object-cover w-full h-full rounded-md"
                    src={pkg.image}
                    alt={pkg.title}
                    quality={100}
                    priority
                    draggable={false}
                    height={500}
                    width={500}
                  />
                </div>
                <div className="flex items-center mt-4">
                  <p className="text-xl font-bold bg-gradient-to-l from-[#949DA9] to-[#AFC2D5] text-transparent bg-clip-text">
                    {pkg.title}
                  </p>
                </div>
                <Divider className="my-4" />
                <div className="flex flex-col gap-2 items-start w-full">
                  <div className="w-full items-center justify-center text-center"><span className="text-main-golden-orange text-4xl font-bold">${pkg.price}</span> / {pkg.duration} {pkg.durationUnit}</div>
                  <ul className="list-none mb-4 space-y-2 w-full">
                    {pkg.features.map((feature: any, idx: number) => (
                      <li key={idx} className="flex gap-2 items-start">
                        <div className="w-5 h-5 p-1 rounded-full bg-green-500 flex items-center justify-center">
                          <Check className="text-white h-3 w-3" />
                        </div>
                        <p className="text-justify text-sm">{feature}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="w-full flex-1 flex items-end justify-center pb-4">
                  <Button
                    onClick={() => openConfirmationDialog(pkg.id, pkg.title, pkg.price)}
                    type="default"
                    className="
                    !!text-white/80 !font-medium
                    py-1 px-3 text-sm !rounded-[4px] !border !border-main-dark-blue !bg-main-dark-blue hover:!bg-main-dark-blue/80 hover:!border-main-dark-blue/80 !text-white"
                    iconPosition="end"
                    icon={<Icon path={mdiPackageVariantPlus} size={0.8} />}>
                      Mua gói
                    </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl">Xác nhận mua gói</DialogTitle>
          </DialogHeader>
          {selectedPackage && (
            <>
              <DialogDescription>
                <p className="text-base">Bạn đang mua gói: <strong className="text-main-golden-orange">{selectedPackage.title}</strong></p>
                <p className="text-base">Giá: <strong className="text-main-golden-orange">${selectedPackage.price}</strong></p>
                <p className="text-base mt-4">Vui lòng xác nhận để tiếp tục.</p>
              </DialogDescription>
              <div className="flex justify-end gap-2 mt-4">
                <Button
                  type="text"
                  onClick={() => setIsConfirmDialogOpen(false)}
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
                  loading={purchaseMutation.isPending}
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

export default SellerSpreadPackages

