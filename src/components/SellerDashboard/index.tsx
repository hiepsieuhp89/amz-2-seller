"use client"
import { Col, Row } from "antd"
import type React from "react"
import BestSellingProducts from "./BestSellingProducts"
import PackageInfo from "./PackageInfo"
import PendingOrders from "./PendingOrders"
import RevenueChart from "./RevenueChart"
import ShopInfo from "./ShopInfo"

const SellerDashboard: React.FC = () => {
  return (
    <div className="pt-2">
      <Row gutter={[20, 20]}>
        <Col xs={24} lg={16}>
          <RevenueChart />
        </Col>
        <Col xs={24} lg={8}>
          <ShopInfo />
          <div className="mt-5">
            <PackageInfo />
          </div>
        </Col>
      </Row>

      <Row gutter={[20, 20]} className="mt-5">
        <Col xs={24} lg={12}>
          <BestSellingProducts />
        </Col>
        <Col xs={24} lg={12}>
          <PendingOrders />
        </Col>
      </Row>
    </div>
  )
}

export default SellerDashboard

