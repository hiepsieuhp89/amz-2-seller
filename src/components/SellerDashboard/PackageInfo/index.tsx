import type React from "react"
import { useShopDetailStatistics } from "@/hooks/dashboard"
import { useGetSellerPackageById } from "@/hooks/seller-packages"
import { Package, Percent, Calendar, Layers } from "lucide-react"
import Image from "next/image"
import { useGetMyShopProducts } from "@/hooks/shop-products"

const PackageInfo = () => {
  const { detailStatistics } = useShopDetailStatistics()
  const packageId = detailStatistics?.sellerPackage?.id || ""
  const { data: packageData } = useGetSellerPackageById(packageId)
  const packageImage = packageData?.data?.image || "https://shop.shop-worldwide-amz.top/public/uploads/all/LAqQwhcT7SII4cm2jolwm3DyqONCvQHhMmCt2ziu.png?v=2"
  const { data: shopProductsData } = useGetMyShopProducts({
    page: 1,
  });
const totalItems = shopProductsData?.data?.meta?.itemCount || 0;

  const packageItems = [
    {
      icon: <Layers className="h-5 w-5" />,
      value: `${totalItems || 0} / ${detailStatistics?.sellerPackage?.maxProducts || 0}`,
      label: "Sản phẩm đang hoạt động",
      bgColor: "bg-blue-100",
      textColor: "text-blue-700",
      iconColor: "text-blue-500",
    },
    {
      icon: <Percent className="h-5 w-5" />,
      value: `${detailStatistics?.sellerPackage?.percentProfit || 0}%`,
      label: "Giảm giá khi nhập hàng",
      bgColor: "bg-rose-100",
      textColor: "text-rose-700",
      iconColor: "text-rose-500",
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      value: `${detailStatistics?.sellerPackage?.duration || 0} ngày`,
      label: "Thời hạn gói còn lại",
      bgColor: "bg-teal-100",
      textColor: "text-teal-700",
      iconColor: "text-teal-500",
    },
  ]

  return (
    <div className="rounded-xl bg-white p-5 h-full border border-gray-100 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Gói tài khoản</h3>
        <p className="text-sm text-gray-500 mt-1">Thông tin gói tài khoản đang sử dụng</p>
      </div>
      
      <div className="mb-5 flex flex-col items-center">
        <div className="relative h-20 w-20 mb-3">
          <Image
            src={packageImage}
            alt="Package Icon"
            width={80}
            height={80}
            className="object-contain"
          />
        </div>
        <div className="text-center">
          <h4 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 text-transparent bg-clip-text mb-1">
            {packageData?.data?.name || detailStatistics?.sellerPackage?.name || "Gói bán hàng mặc định"}
          </h4>
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 border border-blue-100">
            <Package className="h-3.5 w-3.5 text-blue-500 mr-1.5" />
            <span className="text-xs font-medium text-blue-700">Đang sử dụng</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        {packageItems.map((item, index) => (
          <div key={index} className="flex items-center p-3 rounded-lg transition-all duration-200 hover:bg-gray-50">
            <div className={`w-10 h-10 flex-shrink-0 rounded-lg mr-3 flex justify-center items-center ${item.bgColor}`}>
              <span className={item.iconColor}>{item.icon}</span>
            </div>
            <div>
              <h5 className={`text-lg font-bold ${item.textColor} m-0`}>{item.value}</h5>
              <span className="text-xs font-medium text-gray-500">{item.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PackageInfo

