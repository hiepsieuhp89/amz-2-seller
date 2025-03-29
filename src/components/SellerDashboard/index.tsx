"use client"
import { Col, Row } from "antd"
import type React from "react"
import BestSellingProducts from "./BestSellingProducts"
import PendingOrders from "./PendingOrders"
import RevenueChart from "./RevenueChart"
import ShopInfo from "./ShopInfo"
import PackageInfo from "./PackageInfo"

const SellerDashboard = () => {
  return (
    <div className="pt-2">
      <Row gutter={[20, 20]}>
        <Col xs={24} lg={16}>
          <RevenueChart data={[]} />
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
          <BestSellingProducts data={[]} />
        </Col>
        <Col xs={24} lg={12}>
          <PendingOrders />
        </Col>
      </Row>
    </div>
  )
}

export default SellerDashboard

