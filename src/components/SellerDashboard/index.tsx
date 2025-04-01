"use client"
import { Col, Row } from "antd"
import type React from "react"
import BestSellingProducts from "./BestSellingProducts"
import PendingOrders from "./PendingOrders"
import RevenueChart from "./RevenueChart"
import ShopInfo from "./ShopInfo"
import PackageInfo from "./PackageInfo"
import { Breadcrumb, BreadcrumbSeparator, BreadcrumbLink, BreadcrumbItem, BreadcrumbList } from "../ui/breadcrumb"

const SellerDashboard = () => {
  return (
    <div className="p-4">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="text-main-dark-blue/80 hover:text-main-dark-blue uppercase">
              Trang chủ
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-main-dark-blue/80" />
          <BreadcrumbItem>
            <BreadcrumbLink className="text-main-dark-blue/80 font-semibold uppercase">
              Bảng điều khiển
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Row gutter={[20, 20]}>
        <Col xs={24}>
          <RevenueChart/>
        </Col>
      </Row>
      <Row gutter={[20, 20]} className="mt-4">
        <Col xs={24} lg={8}>
          <BestSellingProducts data={[]} />
        </Col>
        <Col xs={24} lg={16}>
          <Row gutter={[20, 20]}>
            <Col xs={24}>
              <PendingOrders />
            </Col>
            <Col xs={24}>
              <ShopInfo />
            </Col>
            <Col xs={24}>
              <PackageInfo />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default SellerDashboard

