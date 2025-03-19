"use client"

import type React from "react"
import { useState } from "react"
import StatCards from "./StatCards"
import OrdersTable from "./OrdersTable"

// Mock data
const mockOrders = [
  {
    key: "1",
    time: "2025-03-18 06:26:46",
    orderCode: "20250318-06264665",
    amount: "$12.70",
    profit: "$2.54",
    deliveryStatus: "pending",
    isDelayed: true,
    delayTime: "24h",
    paymentStatus: "paid",
  },
]

const SellerOrders = () => {
  const [filteredOrders, setFilteredOrders] = useState(mockOrders)

  const handleFilterChange = (value: string) => {
    if (!value) {
      setFilteredOrders(mockOrders)
      return
    }

    const filtered = mockOrders.filter((order) => order.deliveryStatus === value)
    setFilteredOrders(filtered)
  }

  const handleSearch = (value: string) => {
    if (!value) {
      setFilteredOrders(mockOrders)
      return
    }

    const filtered = mockOrders.filter((order) => order.orderCode.toLowerCase().includes(value.toLowerCase()))
    setFilteredOrders(filtered)
  }

  return (
    <div className="pt-2">
      <StatCards />
      <OrdersTable data={filteredOrders} onFilterChange={handleFilterChange} onSearch={handleSearch} />
    </div>
  )
}

export default SellerOrders

