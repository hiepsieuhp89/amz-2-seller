"use client"

import type React from "react"
import TransactionTables from "./TransactionTables"
import { mockOrderHistory, mockWalletHistory, mockWithdrawRequests } from "./mockData"
import StatCards from "../SellerOrders/StatCards"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "../ui/breadcrumb"

const SellerMoneyWithdrawRequests = () => {
  return (
    <div className="p-4 bg-[#E3E6E6]">
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
              Rút tiền
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <StatCards />
      <TransactionTables 
        withdrawRequests={mockWithdrawRequests}
        walletHistory={mockWalletHistory}
        orderHistory={mockOrderHistory}
      />
    </div>
  )
}

export default SellerMoneyWithdrawRequests 