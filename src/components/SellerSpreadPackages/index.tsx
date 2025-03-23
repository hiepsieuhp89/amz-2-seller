"use client"

import type React from "react"
import { Card, Button, Typography } from "antd"
import { CheckOutlined } from "@ant-design/icons"

interface PackageItem {
  id: number
  title: string
  image: string
  features: string[]
  price: string
  duration: number
  durationUnit: string
  onSelect: (id: number, price: number) => void
}

const SellerSpreadPackages = () => {
  const packages: PackageItem[] = [
    {
      id: 1,
      title: "Cơ bản",
      image: "https://shop.shop-worldwide-amz.top/public/uploads/all/WijsgXMX3GgqKsxrm0gQ8TyxEPFE9FIFfRoXLRdH.jpg",
      features: [
        "100 Giới hạn quảng bá sản phẩm",
        "Nạp vào $50.00 hệ thống sẽ quảng bá cửa hàng của bạn, tăng cao doanh thu. Dự tính: $500.00",
      ],
      price: "$50.00",
      duration: 3,
      durationUnit: "ngày",
      onSelect: (id, price) => select_payment_type(id, price),
    },
    {
      id: 2,
      title: "Nâng cao",
      image: "https://shop.shop-worldwide-amz.top/public/uploads/all/WijsgXMX3GgqKsxrm0gQ8TyxEPFE9FIFfRoXLRdH.jpg",
      features: [
        "200 Giới hạn quảng bá sản phẩm",
        "Nạp vào $200.00 hệ thống sẽ quảng bá cửa hàng của bạn, tăng cao doanh thu. Dự tính: $5,000.00",
      ],
      price: "$200.00",
      duration: 7,
      durationUnit: "ngày",
      onSelect: (id, price) => select_payment_type(id, price),
    },
  ]

  const select_payment_type = (id: number, price: number) => {
    console.log(`Selected package ${id} with price ${price}`)
  }

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
                  overflow-hidden rounded-md shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 py-6 px-5 bg-white border"
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
                      onClick={() => pkg.onSelect(pkg.id, Number.parseFloat(pkg.price.replace("$", "")))}
                    >
                      Mua gói
                    </Button>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default SellerSpreadPackages

