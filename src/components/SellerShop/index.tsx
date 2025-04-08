"use client"

import React from "react"
import ShopBasicInfo from "./ShopBasicInfo"
import ShopBannerSettings from "./ShopBannerSettings"
import { useProfile } from "@/hooks/authentication"
import Link from "next/link"

const SellerShop = () => {
  const { profileData } = useProfile()

  return (
    <div className="px-4 px-lg-6">
      <div className="mt-2 mb-4">
        <div className="flex items-center">
          <div className="md:w-1/2">
            <h1 className="text-xl font-medium">
              Cài đặt cửa hàng
            </h1>
          </div>
        </div>
      </div>

      <ShopBasicInfo profileData={profileData} />
      <ShopBannerSettings profileData={profileData} />
    </div>
  )
}

export default SellerShop

