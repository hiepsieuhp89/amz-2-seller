import type React from "react";
import Icon from "@mdi/react";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { mdiPackageVariantClosed, mdiInboxArrowUp } from "@mdi/js";
import { useGetMyShopProducts } from "@/hooks/shop-products";
import { useGetSellerPackageById } from "@/hooks/seller-packages";
import { useShopDetailStatistics } from "@/hooks/dashboard";
import Link from "next/link";

export const ProductsStats = () => {
  const router = useRouter();
  const { data: shopProductsData } = useGetMyShopProducts({ page: 1 });
  const totalItems = shopProductsData?.data?.meta?.itemCount || 0;
  const { detailStatistics } = useShopDetailStatistics()
  const packageId = detailStatistics?.sellerPackage?.id || ""
  const { data: packageData } = useGetSellerPackageById(packageId)
  const packageImage = packageData?.data?.image || "https://shop.shop-worldwide-amz.top/public/uploads/all/LAqQwhcT7SII4cm2jolwm3DyqONCvQHhMmCt2ziu.png?v=2"
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Uploads Remaining Card */}
      <div className="relative bg-gradient-to-r from-[#c471ed60] to-[#f64f5960] rounded-lg overflow-hidden !text-white/80">
        <div className="flex flex-col items-center p-3">
          <div className="w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center mt-3">
            <Icon path={mdiPackageVariantClosed} size={0.8} />
          </div>
          <div className="text-center pt-3 pb-3">
            <div className="text-4xl font-bold">{totalItems}</div>
            <div className="text-base font-medium">
              Tổng số sản phẩm đã thêm
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg  hover:transition-shadow p-3 flex flex-col items-center justify-center cursor-pointer">
        <Link 
        href="/seller/products/storehouse"><Button
          type="primary"
          shape="circle"
          size="large"
          className="!bg-gray-400 !flex !items-center !justify-center !mb-3"
          icon={<PlusOutlined className="!!text-white/80 !text-3xl" />}
        /></Link>

        <div className="text-base font-medium ">Thêm sản phẩm mới</div>
      </div>

      {/* Account Package Card */}
      <div className="bg-white rounded-lg p-3 flex flex-col items-center">
        <div className="relative h-20 w-20">
          <Image
            src={packageImage}
            alt="Package Icon"
            width={80}
            height={80}
            className="object-contain"
          />
        </div>
        <p className="block text-base font-medium mb-4">
          <span>Gói tài khoản hiện tại: </span>
          <span className="text-xl font-bold bg-gradient-to-r from-[#c471ed] to-[#f64f59] text-transparent bg-clip-text mb-1">
            {packageData?.data?.name || detailStatistics?.sellerPackage?.name || "Gói bán hàng mặc định"}
          </span>
        </p>
        <Button
          type="default"
          className="
               !text-white !font-medium
                py-1 px-3 text-sm !rounded-[4px] !border !border-[#c471ed] !bg-gradient-to-r !from-[#c471ed] !to-[#f64f59]"
          icon={<Icon path={mdiInboxArrowUp} size={0.8} />}
          onClick={() => router.push("/seller/seller-packages")}
        >
          Gói nâng cấp
        </Button>
      </div>
    </div>
  );
};
