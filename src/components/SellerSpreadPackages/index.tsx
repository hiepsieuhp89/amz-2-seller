"use client";

import { useUser } from "@/context/useUserContext";
import {
  useGetSpreadPackages,
  usePurchaseSpreadPackage,
} from "@/hooks/spread-packages";
import { Button, Modal, Spin, Divider } from "antd";
import Image from "next/image";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Check } from "lucide-react";
import Icon from "@mdi/react";
import { mdiPackageVariantPlus } from "@mdi/js";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { formatNumber } from "@/utils";

const SellerSpreadPackages = () => {
  const { data: packagesData, isLoading, isError } = useGetSpreadPackages();
  const { profile } = useUser();
  const [selectedPackage, setSelectedPackage] = React.useState<{
    id: number;
    title: string;
    price: number;
  } | null>(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = React.useState(false);
  const purchaseMutation = usePurchaseSpreadPackage();

  const handlePurchase = async () => {
    if (!selectedPackage) return;

    try {
      await purchaseMutation.mutateAsync({
        packageId: selectedPackage.id.toString(),
      });
      Modal.success({
        title: "Mua gói thành công",
        content: `Bạn đã mua thành công gói ${selectedPackage.title}`,
      });
    } catch (error) {
      Modal.error({
        title: "Lỗi khi mua gói",
        content:
          "Đã có lỗi xảy ra khi thực hiện mua gói. Vui lòng thử lại sau.",
      });
    } finally {
      setIsConfirmDialogOpen(false);
      setSelectedPackage(null);
    }
  };

  const openConfirmationDialog = (id: number, title: string, price: number) => {
    setSelectedPackage({ id, title, price });
    setIsConfirmDialogOpen(true);
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Spin size="large" />
      </div>
    );

  if (isError)
    return (
      <div className="text-center p-8 bg-red-50 rounded-lg border border-red-200 shadow-sm">
        <h4 className="text-lg font-semibold text-red-600">
          Có lỗi xảy ra khi tải dữ liệu
        </h4>
        <p className="text-red-500">Vui lòng thử lại sau</p>
      </div>
    );
  const packages =
    packagesData?.data.data.map((pkg: any) => ({
      id: Number(pkg.id),
      title: pkg.name,
      image: pkg.image,
      features: [
        `${pkg.description}`,
        `Khi sử dụng hệ thống sẽ quảng bá cửa hàng của bạn, tăng cao doanh thu`,
      ],
      price: Number(pkg.price),
      duration: pkg.duration,
      durationUnit: "ngày",
    })) || [];

  const sortedPackages = packages.slice().sort((a, b) => a.price - b.price);

  // Define gradient classes for different price tiers
  const getPriceGradient = (price: number, index: number) => {
    const gradients = [
      "from-blue-400 to-blue-600", // Basic tier
      "from-purple-400 to-purple-600", // Mid tier
      "from-amber-400 to-orange-600", // Premium tier
    ];

    if (price === 0) return "from-gray-400 to-gray-600";
    return gradients[index % gradients.length];
  };

  return (
    <div className="min-h-screen py-8 px-4 bg-gray-50">
      <div className="max-w-[1440px] mx-auto">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/"
                className="text-main-dark-blue/80 hover:text-main-dark-blue uppercase"
              >
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

        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Gói Quảng Bá Cửa Hàng
          </h2>
          <p className="text-base text-gray-600 max-w-3xl mx-auto">
            Tăng khả năng hiển thị và tiếp cận khách hàng tiềm năng cho sản phẩm
            của bạn với các gói quảng bá hiệu quả. Mỗi gói cung cấp các lợi ích
            khác nhau để phù hợp với nhu cầu kinh doanh của bạn.
          </p>
        </div>

        <section className="py-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedPackages.map((pkg, index) => (
                <div
                  key={pkg.id}
                  className="relative rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl bg-white shadow-lg border border-gray-100 flex flex-col"
                >
                  {/* Price tier badge */}
                  <div
                    className={`absolute top-4 right-4 z-10 py-1 px-3 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getPriceGradient(
                      pkg.price,
                      index
                    )}`}
                  >
                    {index === 0
                      ? "Cơ bản"
                      : index === 1
                      ? "Nâng cao"
                      : "Cao cấp"}
                  </div>

                  {/* Header with image */}
                  <div
                    className={`w-full h-44 relative bg-gradient-to-br ${getPriceGradient(
                      pkg.price,
                      index
                    )}`}
                  >
                    <div className="absolute inset-0 opacity-20 mix-blend-overlay">
                      <Image
                        className="object-cover w-full h-full"
                        src={pkg.image}
                        alt={pkg.title}
                        quality={100}
                        priority
                        draggable={false}
                        height={500}
                        width={500}
                      />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <h3 className="text-2xl font-bold mb-1">{pkg.title}</h3>
                        <div className="flex items-center justify-center gap-1">
                          <span className="text-3xl font-bold">
                            ${formatNumber(pkg.price)}
                          </span>
                          <span className="text-sm opacity-80">
                            / {pkg.duration} {pkg.durationUnit}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex-1 p-6">
                    <ul className="space-y-4 mb-8">
                      {pkg.features.map((feature: string, idx: number) => (
                        <li key={idx} className="flex gap-3 items-start">
                          <div
                            className={`mt-0.5 w-5 h-5 rounded-full bg-gradient-to-r ${getPriceGradient(
                              pkg.price,
                              index
                            )} flex items-center justify-center flex-shrink-0`}
                          >
                            <Check className="text-white h-3 w-3" />
                          </div>
                          <p className="text-gray-700 text-sm">{feature}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Button */}
                  <div className="px-6 pb-6">
                    <Button
                      onClick={() =>
                        openConfirmationDialog(pkg.id, pkg.title, pkg.price)
                      }
                      type="default"
                      className={`w-full h-12 !font-medium !rounded-lg !border-0 !bg-gradient-to-r ${getPriceGradient(
                        pkg.price,
                        index
                      )} !text-white hover:!opacity-90`}
                      icon={
                        <Icon
                          path={mdiPackageVariantPlus}
                          size={0.8}
                          className="mr-1"
                        />
                      }
                    >
                      Mua Gói Ngay
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Dialog
          open={isConfirmDialogOpen}
          onOpenChange={setIsConfirmDialogOpen}
        >
          <DialogContent className="sm:max-w-md rounded-xl">
            <DialogHeader className="pb-2">
              <DialogTitle className="text-2xl font-bold text-gray-800">
                Xác nhận mua gói
              </DialogTitle>
            </DialogHeader>
            {selectedPackage && (
              <>
                <DialogDescription className="space-y-4 pt-2">
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <p className="text-base mb-2">
                      Gói đã chọn:{" "}
                      <strong className="text-main-golden-orange">
                        {selectedPackage.title}
                      </strong>
                    </p>
                    <p className="text-xl font-semibold">
                      Thành tiền:{" "}
                      <span className="text-main-golden-orange">
                        ${formatNumber(selectedPackage.price)}
                      </span>
                    </p>
                  </div>
                  <p className="text-gray-600">
                    Vui lòng xác nhận để hoàn tất quá trình mua gói.
                  </p>
                </DialogDescription>
                <div className="flex justify-end gap-3 mt-4">
                  <Button
                    onClick={() => setIsConfirmDialogOpen(false)}
                    className="!min-w-[100px] !font-medium !rounded-lg !bg-transparent !border !border-gray-300 !text-gray-700 hover:!bg-gray-50"
                  >
                    Hủy bỏ
                  </Button>
                  <Button
                    onClick={handlePurchase}
                    className="!min-w-[100px] !font-medium !rounded-lg !border-0 !bg-gradient-to-r from-green-500 to-emerald-600 !text-white hover:!opacity-90"
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
    </div>
  );
};

export default SellerSpreadPackages;
