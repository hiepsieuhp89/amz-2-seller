"use client"

import React from "react"
import ShopBasicInfo from "./ShopBasicInfo"
import ShopBannerSettings from "./ShopBannerSettings"
import { mockShopData } from "./mockData"
import { ShopData } from "./types"

const SellerShop = () => {
  const [shopData, setShopData] = React.useState<ShopData>(mockShopData)

  const handleSaveBasicInfo = (updatedData: Partial<ShopData>) => {
    setShopData({ ...shopData, ...updatedData })
  }

  const handleSaveBannerSettings = (updatedData: Partial<ShopData>) => {
    setShopData({ ...shopData, ...updatedData })
  }

  return (
    <div className="px-4 px-lg-6">
      <div className="mt-2 mb-4">
        <div className="flex items-center">
          <div className="md:w-1/2">
            <h1 className="text-xl font-medium">
              Cài đặt cửa hàng
              <span className="ml-3 text-sm">
                (
                <a
                  href={`https://shop.shop-worldwide-amz.top/shop/${shopData.name.replace(/\s+/g, "-")}`}
                  className="text-blue-500 text-sm px-0"
                  target="_blank"
                  rel="noreferrer"
                >
                  Ghé thăm cửa hàng <i className="las la-arrow-right"></i>
                </a>
                )
              </span>
            </h1>
          </div>
        </div>
      </div>

      <ShopBasicInfo shopData={shopData} onSave={handleSaveBasicInfo} />

      <ShopBannerSettings shopData={shopData} onSave={handleSaveBannerSettings} />
    </div>
  )
}

export default SellerShop

