"use client"

import type React from "react"
import StatCards from "./StatCards"
import OrdersTable from "./OrdersTable"

const SellerOrders = () => {
  return (
    <div className="pt-2">
      <StatCards />
      <OrdersTable/>
    </div>
  )
}

export default SellerOrders

