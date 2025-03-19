import type React from "react"
import { PlusOutlined, UploadOutlined } from "@ant-design/icons"
import { Button } from "antd"
import Image from "next/image"
import { useRouter } from "next/navigation"

export const ProductsStats: React.FC = () => {
    const router = useRouter()
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Uploads Remaining Card */}
            <div className="relative bg-gradient-to-r from-[#c471ed] to-[#f64f59] rounded-lg overflow-hidden text-white">
                <div className="flex flex-col items-center p-3">
                    <div className="w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center mt-3">
                        <UploadOutlined className="text-white text-xl" />
                    </div>
                    <div className="text-center pt-3 pb-3">
                        <div className="text-4xl font-bold">161</div>
                        <div className="opacity-50">Tải lên còn lại</div>
                    </div>
                </div>
            </div>

            {/* Add New Product Card */}
            <div 
                onClick={() => router.push("/seller/products/storehouse")}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-3 flex flex-col items-center justify-center cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-gray-400 flex items-center justify-center mb-3">
                    <PlusOutlined className="!text-white text-3xl" />
                </div>
                <div className="text-lg text-primary">Thêm sản phẩm mới</div>
            </div>

            {/* Account Package Card */}
            <div className="bg-white rounded-lg shadow-sm p-3 flex flex-col items-center">
                <div className="h-11 w-11 relative">
                    <Image
                        draggable={false}
                        quality={100}
                        height={100}
                        width={100}
                        src="/images/silver-shop.png" alt="Shop rank" className="object-contain" />
                </div>
                <span className="block text-sm mb-2 mt-1">Gói tài khoản hiện tại: Shop Bạc</span>
                <Button type="default" className="py-1 px-3 text-sm">
                    Gói nâng cấp
                </Button>
            </div>
        </div>
    )
}

