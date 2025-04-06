"use client";
import {
  useGetSellerPackages,
  usePurchaseSellerPackage,
} from "@/hooks/seller-packages";
import { CrownOutlined, RocketOutlined, StarOutlined } from "@ant-design/icons";
import { Button, Divider, Modal, Spin, Typography } from "antd";
import Image from "next/image";
import React, { useState } from "react";
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
import { ISellerPackage } from "@/interface/response/seller-packages";
import { formatNumber } from "@/utils";

const { Title, Text } = Typography;

const SellerPackages = () => {
  const { data: packagesData, isLoading, isError } = useGetSellerPackages();
  const [selectedPackage, setSelectedPackage] = useState<ISellerPackage | null>(
    null
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const purchaseMutation = usePurchaseSellerPackage();

  const handlePurchase = async () => {
    if (!selectedPackage) return;
    try {
      await purchaseMutation.mutateAsync({ packageId: selectedPackage?.id });
      Modal.success({
        title: "Mua gói thành công",
        content: `Bạn đã mua thành công gói ${selectedPackage?.name}`,
      });
    } catch (error: any) {
      if (error?.response?.data?.message === "Insufficient balance") {
        Modal.error({
          title: "Lỗi khi mua gói",
          content: "Số dư không đủ để thực hiện.",
        });
      } else {
        Modal.error({
          title: "Lỗi khi mua gói",
          content:
            "Đã có lỗi xảy ra khi thực hiện mua gói. Vui lòng thử lại sau.",
        });
      }
    } finally {
      setIsModalVisible(false);
      setSelectedPackage(null);
    }
  };

  const select_payment_type = (pkg: ISellerPackage) => {
    setSelectedPackage(pkg);
    setIsModalVisible(true);
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
        <Title level={4} className="text-red-600">
          Có lỗi xảy ra khi tải dữ liệu
        </Title>
        <Text className="text-red-500">Vui lòng thử lại sau</Text>
      </div>
    );

  // Sắp xếp dữ liệu gói theo giá tăng dần
  const sortedData =
    packagesData?.data?.data
      ?.slice()
      .sort((a: any, b: any) => a.price - b.price) || [];

  const nonZeroPriceImages = [
    "/images/diamond-shop.png",
    "/images/platinum-shop.png",
    "/images/premium-shop.png",
  ];
  let nonZeroIndex = 0; // Biến đếm cho các gói có giá > 0

  const packages =
    sortedData.map((pkg: any) => {
      let image;
      if (pkg.price === 0) {
        image = pkg.image;
      } else {
        image = pkg.image;
        nonZeroIndex++;
      }

      const features = [
        `${pkg.description}`,
      ];

      if (pkg.price > 0) {
        // features.push(
        //   `Nạp vào $${formatNumber(
        //     pkg.price
        //   )} hệ thống sẽ quảng bá cửa hàng của bạn, tăng cao doanh thu. Dự tính: $${formatNumber(
        //     pkg.price * pkg.percentProfit
        //   )}`
        // );
        features.push(
          `Khi sử dụng hệ thống sẽ quảng bá cửa hàng của bạn, tăng cao doanh thu. Dự tính: $${formatNumber(
            pkg.price * pkg.percentProfit
          )}`
        );
      }

      return {
        id: pkg.id,
        title: pkg.name,
        image: image,
        description: pkg.description,
        features: features,
        price: pkg.price,
        duration: pkg.duration,
        durationUnit: "ngày",
        maxProducts: pkg.maxProducts,
      };
    }) || [];

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
                Gói tài khoản
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Gói Tài Khoản Người Bán
          </h2>
          <p className="text-base text-gray-600 max-w-3xl mx-auto">
            Tăng khả năng tiếp cận khách hàng và doanh số bán hàng của bạn với
            các gói tiếp thị được thiết kế đặc biệt cho người bán. Nâng cấp tài
            khoản của bạn để tận dụng tối đa khả năng bán hàng trên nền tảng của
            chúng tôi.
          </p>
        </div>

        {/* Packages Section */}
        <section className="py-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.map((pkg: any, index: number) => (
                <div
                  key={pkg.id + index}
                  className="relative rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl bg-white shadow-lg border border-gray-100 flex flex-col"
                >
                  {/* Price tier badge */}
                  <div
                    className={`absolute top-4 right-4 z-10 py-1 px-3 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getPriceGradient(
                      pkg.price,
                      index
                    )}`}
                  >
                    {pkg.price === 0
                      ? "Cơ bản"
                      : index === 1
                        ? "Nâng cao"
                        : "Cao cấp"}
                  </div>

                  {/* Header with image */}
                  <div
                    className={`w-full h-48 relative bg-gradient-to-br ${getPriceGradient(
                      pkg.price,
                      index
                    )}`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-28 w-28 relative">
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
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 text-center p-4 bg-black/20">
                      <h3 className="text-2xl font-bold text-white mb-1">
                        {pkg.title}
                      </h3>
                      <div className="flex items-center justify-center gap-1 text-white">
                        <span className="text-3xl font-bold">
                          ${formatNumber(pkg.price)}
                        </span>
                        <span className="text-sm opacity-80">
                          / {pkg.duration} {pkg.durationUnit}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex-1 p-6">
                    <div className="mb-4 bg-gray-50 p-3 rounded-lg">
                      <p className="text-gray-700 text-sm">
                        <strong>Mô tả gói:</strong> {pkg.description}
                      </p>
                    </div>
                    <ul className="list-none space-y-4 mb-8">
                      {pkg.features.map((feature: any, idx: number) => (
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
                    {pkg.price === 0 ? (
                      <Button
                        className="w-full h-12 !font-medium !rounded-lg !border-0 !bg-gradient-to-r from-green-500 to-emerald-600 !text-white opacity-80 cursor-not-allowed"
                        icon={<Check className="mr-1 h-4 w-4" />}
                        disabled={true}
                      >
                        Đang sử dụng
                      </Button>
                    ) : (
                      <Button
                        onClick={() => select_payment_type(pkg)}
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
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Dialog open={isModalVisible} onOpenChange={setIsModalVisible}>
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
                        {selectedPackage?.title}
                      </strong>
                    </p>
                    <p className="text-xl font-semibold">
                      Thành tiền:{" "}
                      <span className="text-main-golden-orange">
                        ${selectedPackage.price}
                      </span>
                    </p>
                  </div>
                  <p className="text-gray-600">
                    Vui lòng xác nhận để hoàn tất quá trình mua gói.
                  </p>
                </DialogDescription>
                <div className="flex justify-end gap-3 mt-4">
                  <Button
                    onClick={() => setIsModalVisible(false)}
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

export default SellerPackages;
