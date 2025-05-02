"use client";

import { Col, Row, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useContext, useState } from "react";
import OrdersTable from "./OrdersTable";
import { PlusOutlined, SwapOutlined } from "@ant-design/icons";
import { useUser } from "@/context/useUserContext";

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

  const { user } = useUser()
  return (
    <div className="pt-2">
      {/* Wallet Balance Section */}
      <div className="mt-2">
        {/* Wallet Cards */}
        <Row gutter={16} className="mb-4 justify-center items-stretch flex-wrap gap-2">
          <Col xs={24} sm={12} md={8} lg={6} xl={4}>
            <div className="p-4 rounded-lg bg-gradient-to-r from-pink-500/60 to-purple-500/60 !text-white/80 h-full">
              <div className="flex flex-col items-center">
                <div className="w-[30px] h-full rounded-full bg-white bg-opacity-20 flex items-center justify-center mb-2">
                  <span className="text-xl">$</span>
                </div>
                <div className="text-xl font-bold">1</div>
                <div className="text-sm opacity-80 text-center">Đơn hàng chưa thanh toán</div>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={4}>
            <div className="p-4 rounded-lg bg-gradient-to-r from-indigo-600/60 to-blue-500/60 !text-white/80 h-full">
              <div className="flex flex-col items-center">
                <div className="w-[30px] h-full rounded-full bg-white bg-opacity-20 flex items-center justify-center mb-2">
                  <span className="text-xl">$</span>
                </div>
                <div className="text-xl font-bold">$11.00</div>
                <div className="text-sm opacity-80 text-center">Tổng tiền cần thanh toán</div>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={4}>
            <div className="p-4 rounded-lg bg-gradient-to-r from-green-500/60 to-teal-500/60 !text-white/80 h-full">
              <div className="flex flex-col items-center">
                <div className="w-[30px] h-full rounded-full bg-white bg-opacity-20 flex items-center justify-center mb-2">
                  <span className="text-xl">$</span>
                </div>
                <div className="text-xl font-bold">$2.54</div>
                <div className="text-sm opacity-80 text-center">Tổng lợi nhuận</div>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={4}>
            <div className="p-4 rounded-lg bg-gradient-to-r from-[#E3E6E6]0/60 to-yellow-500/60 !text-white/80 h-full">
              <div className="flex flex-col items-center">
                <div className="w-[30px] h-full rounded-full bg-white bg-opacity-20 flex items-center justify-center mb-2">
                  <span className="text-xl">$</span>
                </div>
                <div className="text-xl font-bold">$0.00</div>
                <div className="text-sm opacity-80 text-center">Số dư logistic</div>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={4}>
            <div
              className="p-4 rounded-lg bg-white border border-gray-200 text-black h-full cursor-pointer transition-all duration-300 hover:bg-gray-100"
              onClick={handleCurrencyConversion}
            >
              <div className="flex flex-col items-center">
                <div className="w-[60px] h-[60px] rounded-full bg-main-gunmetal-blue/50 flex items-center justify-center mb-3">
                  <PlusOutlined className="!!text-white/80 text-2xl" />
                </div>
                <div className="text-lg  font-semibold">Quy đổi USD</div>
              </div>
            </div>
          </Col>
        </Row>

        {/* Wallet Balance History Table */}
        <div className="bg-white rounded-[4px] border my-4">
          <div className="px-6 py-3">
            <div className="text-base">Biến động số dư ví</div>
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
