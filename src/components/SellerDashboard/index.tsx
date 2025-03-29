"use client"
import type React from "react"
import { Row, Col } from "antd"
import ShopInfo from "./ShopInfo"
import PackageInfo from "./PackageInfo"
import BestSellingProducts from "./BestSellingProducts"
import PendingOrders from "./PendingOrders"
import { mockChartData, mockShopInfo, mockPackageInfo, mockBestSellingProducts, mockPendingOrders } from "./mockData"
import RevenueChart from "./RevenueChart"
const SellerDashboard = () => {
  return (
    <div className="pt-2">
      <Row gutter={[20, 20]}>
        <Col xs={24} lg={16}>
          <RevenueChart data={mockChartData} />
        </Col>
        <Col xs={24} lg={8}>
          <ShopInfo data={mockShopInfo} />
          <div className="mt-5">
            <PackageInfo data={mockPackageInfo} />
          </div>
        </Col>
      </Row>

      <Row gutter={[20, 20]} className="mt-5">
        <Col xs={24} lg={12}>
          <BestSellingProducts data={mockBestSellingProducts} />
        </Col>
        <Col xs={24} lg={12}>
          <PendingOrders data={mockPendingOrders} />
        </Col>
      </Row>
    </div>
  )
}

export default SellerDashboard

