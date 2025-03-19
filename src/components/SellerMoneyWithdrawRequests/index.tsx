"use client"

import type React from "react"
import StatCards from "./StatCards"
import TransactionTables from "./TransactionTables"
import { mockOrderHistory, mockWalletHistory, mockWithdrawRequests } from "./mockData"

const SellerMoneyWithdrawRequests = () => {
  return (
    <div className="pt-2">
      <div className="mt-2 mb-4">
        <p className="text-xl font-medium">Rút tiền</p>
      </div>
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