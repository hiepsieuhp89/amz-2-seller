"use client";

import { Col, Row, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useContext, useState } from "react";
import OrdersTable from "./OrdersTable";
import { SwapOutlined } from "@ant-design/icons";
import { useUser } from "@/context/useUserContext";

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
];

// Mock wallet transaction data
const mockWalletTransactions = [
  {
    key: "1",
    date: "2025-05-17 14:06:07",
    id: "20250517230367",
    amount: "+ $0.00",
    beforeBalance: "$0.00",
    afterBalance: "$0.00",
    description: "Nâng cấp gói",
  },
];

const SellerOrders = () => {
  const [filteredOrders, setFilteredOrders] = useState(mockOrders);

  const handleFilterChange = (value: string) => {
    if (!value) {
      setFilteredOrders(mockOrders);
      return;
    }

    const filtered = mockOrders.filter(
      (order) => order.deliveryStatus === value
    );
    setFilteredOrders(filtered);
  };

  const handleSearch = (value: string) => {
    if (!value) {
      setFilteredOrders(mockOrders);
      return;
    }

    const filtered = mockOrders.filter((order) =>
      order.orderCode.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOrders(filtered);
  };

  // Add this new function to handle currency conversion
  const handleCurrencyConversion = () => {
    // Add your currency conversion logic here
    console.log("Currency conversion clicked");
    // You might want to open a modal or navigate to a conversion page
  };

  // Columns for wallet transactions table
  const walletColumns: ColumnsType<any> = [
    {
      title: "Ngày",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Số tiền",
      dataIndex: "amount",
      key: "amount",
      render: (text) => <span className="text-red-500">{text}</span>,
    },
    {
      title: "Trước GD",
      dataIndex: "beforeBalance",
      key: "beforeBalance",
    },
    {
      title: "Sau GD",
      dataIndex: "afterBalance",
      key: "afterBalance",
    },
    {
      title: "Thông tin",
      dataIndex: "description",
      key: "description",
    },
  ];

  function Card({ children, className, onClick }: { children: React.ReactNode, className: string, onClick?: () => void }) {
    return (
      <div
        className={`p-4 rounded-lg ${className} ${onClick ? 'cursor-pointer transition-all duration-300 hover:shadow-lg hover:bg-gray-100' : ''}`}
        onClick={onClick}
      >
        {children}
      </div>
    );
  }

  const { user } = useUser()
  console.log("user", user)
  return (
    <div className="pt-2">
      {/* Wallet Balance Section */}
      <div className="mt-2">
        {/* Wallet Cards */}
        <Row gutter={16} className="mb-4">
          <Col span={8}>
            <Card className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">
              <div className="flex flex-col items-center">
                <div className="w-[30px] h-[30px] rounded-full bg-white bg-opacity-20 flex items-center justify-center mb-2">
                  <span className="text-xl">$</span>
                </div>
                <div className="text-xl font-bold">$12.70</div>
                <div className="text-sm opacity-80">Số dư đang chờ xử lý</div>
              </div>
            </Card>
          </Col>
          <Col span={8}>
            <Card className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white">
              <div className="flex flex-col items-center">
                <div className="w-[30px] h-[30px] rounded-full bg-white bg-opacity-20 flex items-center justify-center mb-2">
                  <span className="text-xl">$</span>
                </div>
                <div className="text-xl font-bold">$0.00</div>
                <div className="text-sm opacity-80">Số dư trên Wallet</div>
              </div>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              className="bg-white border border-gray-300 text-black h-full"
              onClick={handleCurrencyConversion}
            >
              <div className="flex flex-col items-center">
                <div className="w-[30px] h-[30px] rounded-full bg-white bg-opacity-20 flex items-center justify-center mb-2">
                  <SwapOutlined className="text-xl text-white" />
                </div>
                <div className="text-xl font-bold">{" "}</div>
                <div className="text-sm opacity-80">Quy đổi USD</div>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Wallet Balance History Table */}
        <div className="bg-white rounded-[4px] border my-4">
          <div className="px-6 py-3">
            <div className="font-medium text-base">Biến động số dư ví</div>
          </div>
          <Table
            columns={walletColumns}
            dataSource={mockWalletTransactions}
            pagination={false}
            className="border-t"
          />
        </div>
      </div>
      {/* Orders Table */}
      <OrdersTable
        data={filteredOrders}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
      />
    </div>
  );
};

export default SellerOrders;
