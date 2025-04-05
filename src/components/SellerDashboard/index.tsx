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
    <div className="min-h-screen py-8 px-4 bg-gray-50">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-8">
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
          
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-800 mb-2 md:mb-0">Bảng Điều Khiển</h1>
            <p className="text-gray-500">Tổng quan hoạt động kinh doanh của bạn</p>
          </div>
        </div>

        <div className="mb-8 rounded-xl overflow-hidden shadow-md bg-white border border-gray-100">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">Thống Kê Doanh Thu</h2>
          </div>
          <div className="p-4">
            <RevenueChart />
          </div>
        </div>

        <Row gutter={[24, 24]}>
          <Col xs={24} lg={8}>
            <div className="h-full">
              <BestSellingProducts data={[]} />
            </div>
          </Col>
          <Col xs={24} lg={16}>
            <Row gutter={[24, 24]}>
              <Col xs={24}>
                <PendingOrders />
              </Col>
              <Col xs={24} md={12}>
                <ShopInfo />
              </Col>
              <Col xs={24} md={12}>
                <PackageInfo />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default SellerDashboard

