"use client"

import type React from "react"

import { useUser } from "@/context/useUserContext"
import { useShopStatistics } from "@/hooks/shop-statistics"
import { useTransactionHistory } from "@/hooks/transaction"
import { useWindowSize } from "@/hooks/useWindowSize"
import { formatNumber } from "@/utils"
import { SwapOutlined } from "@ant-design/icons"
import { Col, ConfigProvider, Pagination, Radio, Row, Spin, Table } from "antd"
import type { Breakpoint } from "antd/es/_util/responsiveObserver"
import { useCallback, useEffect, useMemo, useState } from "react"
import OrdersTable from "./OrdersTable"

const generateOrderCode = (orderTime: string) => {
  // Convert order time to timestamp
  const timestamp = new Date(orderTime).getTime()
  // Convert timestamp to base64 string
  const base64String = btoa(timestamp.toString())
  // Take first 8 characters and convert to uppercase
  return base64String.substring(0, 8).toUpperCase()
}

declare global {
  interface Window {
    openChat?: () => void
  }
}

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
  const { shopStatisticsData, isLoading: isLoadingStats } = useShopStatistics()
  const [currentTransactionPage, setCurrentTransactionPage] = useState(1)
  const [transactionPageSize, setTransactionPageSize] = useState(10)
  const [transactionTypeFilter, setTransactionTypeFilter] = useState<string>("all")
  const { width } = useWindowSize()
  const isMobile = width ? width < 768 : false
  const isTablet = width ? width >= 768 && width < 1024 : false

  const {
    transactionHistoryData: transactionHistoryDataResponse,
    isLoading: isLoadingTransactions,
    refetch: refetchTransactions
  } = useTransactionHistory({
    page: currentTransactionPage,
    take: transactionPageSize
  })

  const transactionHistoryData = transactionHistoryDataResponse?.data?.data || []

  const filteredTransactionData = useMemo(() => {
    if (transactionTypeFilter === "all") {
      return transactionHistoryData.filter(
        (transaction: any) => transaction.type === "fedex_payment" || transaction.type === "manual_fedex_amount"
      );
    }

    return transactionHistoryData.filter(
      (transaction: any) => transaction.type === transactionTypeFilter
    );
  }, [transactionHistoryData, transactionTypeFilter]);

  const handleTransactionTypeChange = (e: any) => {
    setTransactionTypeFilter(e.target.value);
  };

  useEffect(() => {
    refetchTransactions()
  }, [currentTransactionPage, transactionPageSize, refetchTransactions])

  const openChat = () => {
    if (window.openChat) {
      window.openChat();
    } else {
      console.error('Chat function not available');
    }
  }

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

  const handleCurrencyConversion = () => {
    console.log("Currency conversion clicked")
    openChat()
  }

  const handleTransactionPaginationChange = (page: number, pageSize?: number) => {
    setCurrentTransactionPage(page)
    if (pageSize) setTransactionPageSize(pageSize)
  }

  const getWalletColumns = useCallback(() => {
    const baseColumns = [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        width: isMobile ? 120 : 220,
        ellipsis: true,
        render: (text: string) => (
          <span className="font-mono text-xs">{text}</span>
        ),
        responsive: ['md' as Breakpoint]
      },
      {
        title: "Ngày tạo",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (text: string) => (
          <span className="whitespace-nowrap">
            {new Date(text).toLocaleDateString('vi-VN', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: isMobile ? undefined : '2-digit',
              minute: isMobile ? undefined : '2-digit'
            })}
          </span>
        ),
      },
      {
        title: "Số tiền",
        dataIndex: "money",
        key: "money",
        render: (text: string, record: any) => {
          const amount = parseFloat(text);
          // Determine if the amount should be displayed as positive or negative based on the transaction type
          // API already provides the correct sign, so we should respect it
          const isPositive = amount >= 0;
          
          return (
            <span className={`font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? '+' : ''}{formatNumber(amount)} USD
            </span>
          );
        },
        align: "right" as const,
      },
      {
        title: "Trạng thái",
        dataIndex: "status",
        key: "status",
        render: (text: string) => {
          const statusMap = {
            completed: { label: "Hoàn thành", color: "#10b981", bgColor: "#ecfdf5" },
            rejected: { label: "Từ chối", color: "#ef4444", bgColor: "#fef2f2" },
            pending: { label: "Đang chờ", color: "#f59e0b", bgColor: "#fffbeb" },
            failed: { label: "Thất bại", color: "#ef4444", bgColor: "#fef2f2" },
            processing: { label: "Đang xử lý", color: "#3b82f6", bgColor: "#eff6ff" },
          };
          const status = statusMap[text.toLowerCase() as keyof typeof statusMap] || {
            label: text,
            color: "#6b7280",
            bgColor: "#f9fafb",
          };
          return (
            <span
              className="px-3 py-1 rounded-full max-w-28 text-center text-xs font-medium line-clamp-1 truncate"
              style={{
                color: status.color,
                backgroundColor: status.bgColor,
                border: `1px solid ${status.color}20`
              }}
            >
              {status.label}
            </span>
          );
        },
      },
      {
        title: "Mô tả",
        dataIndex: "description",
        key: "description",
        ellipsis: true,
        render: (text: string) => (
          <span className="text-gray-700">{text || "—"}</span>
        ),
        responsive: ['lg' as Breakpoint]
      },
      {
        title: "Loại giao dịch",
        dataIndex: "type",
        key: "type",
        render: (text: string) => {
          const typeMap: Record<string, string> = {
            "fedex_payment": "Thanh toán",
            "package_purchase": "Mua gói",
            "manual_fedex_amount": "Quy đổi",
            "withdrawal": "Rút tiền",
            "deposit": "Nạp tiền",
            "refund": "Hoàn tiền",
            "commission": "Hoa hồng",
          };

          return (
            <span className="text-gray-700">
              {isMobile
                ? (typeMap[text]?.split(' ')[0] || text || "—")
                : (typeMap[text] || text || "—")}
            </span>
          );
        },
        responsive: ['md' as Breakpoint]
      },
      {
        title: "Mã tham chiếu",
        dataIndex: "referenceId",
        key: "referenceId",
        render: (text: string) =>
          text ? (
            <div className="flex items-center space-x-2">
              <span className="font-mono text-xs text-gray-600">{text}</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(text);
                }}
                className="text-blue-500 hover:text-blue-700 transition-colors"
                title="Copy to clipboard"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 17.929H6c-1.105 0-2-.895-2-2V6c0-1.105.895-2 2-2h8c1.105 0 2 .895 2 2v2M16 6h4c1.105 0 2 .895 2 2v10c0 1.105-.895 2-2 2h-8c-1.105 0-2-.895-2-2V8c0-1.105.895-2 2-2z" />
                </svg>
              </button>
            </div>
          ) : (
            <span className="text-gray-400">—</span>
          ),
        responsive: ['lg' as Breakpoint]
      },
    ];

    return baseColumns;
  }, [isMobile]);

  function Card({
    children,
    className,
    onClick,
  }: {
    children: React.ReactNode
    className: string
    onClick?: () => void
  }) {
    return (
      <div
        className={`p-4 rounded-lg ${className} ${onClick ? "cursor-pointer transition-all duration-300 hover:shadow-lg" : ""
          }`}
        style={{
          background: `linear-gradient(135deg, ${className.includes("bg-[") ? className.match(/bg-\[(.*?)\]/)?.[1] || "" : "#ffffff"}dd, ${className.includes("bg-[") ? className.match(/bg-\[(.*?)\]/)?.[1] || "" : "#ffffff"}99)`,
          backdropFilter: "blur(10px)",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
        onClick={onClick}
      >
        {children}
      </div>
    )
  }

  const getColSpan = () => {
    if (isMobile) {
      return 12;
    } else if (isTablet) {
      return 6;
    } else {
      return 5;
    }
  }

  const getLastColSpan = () => {
    if (isMobile) {
      return 24;
    } else if (isTablet) {
      return 12;
    } else {
      return 4;
    }
  }

  const { profile } = useUser()

  return (
    <div className="py-4 px-0 md:px-2 lg:px-4">
      <div className="mt-2">
        {isLoadingStats ? (
          <div className="flex justify-center items-center py-10">
            <Spin size="large" tip="Loading statistics..." />
          </div>
        ) : (
          <>
            <Row gutter={[16, 16]} className="mb-4">
              <Col xs={getColSpan()} sm={getColSpan()} md={getColSpan()} lg={getColSpan()}>
                <Card className="bg-[#3b93ff] text-white">
                  <div className="flex flex-col items-center">
                    <div className="w-[30px] h-[30px] rounded-full bg-white bg-opacity-20 flex items-center justify-center mb-2">
                      <span className="text-xl">$</span>
                    </div>
                    <div className="text-xl font-bold">{shopStatisticsData?.data?.totalPendingOrder || 0}</div>
                    <div className="text-sm opacity-80 text-center">Đơn hàng chưa thanh toán</div>
                  </div>
                </Card>
              </Col>
              <Col xs={getColSpan()} sm={getColSpan()} md={getColSpan()} lg={getColSpan()}>
                <Card className="bg-[#868dab] text-white">
                  <div className="flex flex-col items-center">
                    <div className="w-[30px] h-[30px] rounded-full bg-white bg-opacity-20 flex items-center justify-center mb-2">
                      <span className="text-xl">$</span>
                    </div>
                    <div className="text-xl font-bold">${formatNumber(shopStatisticsData?.data?.totalPendingOrderAmount || 0)}</div>
                    <div className="text-sm opacity-80 text-center">Tổng Tiền Cần Thanh Toán</div>
                  </div>
                </Card>
              </Col>
              <Col xs={getColSpan()} sm={getColSpan()} md={getColSpan()} lg={getColSpan()}>
                <Card className="bg-[#ff758c] text-white">
                  <div className="flex flex-col items-center">
                    <div className="w-[30px] h-[30px] rounded-full bg-white bg-opacity-20 flex items-center justify-center mb-2">
                      <span className="text-xl">$</span>
                    </div>
                    <div className="text-xl font-bold">${formatNumber(shopStatisticsData?.data?.totalPendingProfit || 0)}</div>
                    <div className="text-sm opacity-80 text-center">Tổng lợi nhuận</div>
                  </div>
                </Card>
              </Col>
              <Col xs={getColSpan()} sm={getColSpan()} md={getColSpan()} lg={getColSpan()}>
                <Card className="bg-[#ffa56f] text-white">
                  <div className="flex flex-col items-center">
                    <div className="w-[30px] h-[30px] rounded-full bg-white bg-opacity-20 flex items-center justify-center mb-2">
                      <span className="text-xl">$</span>
                    </div>
                    <div className="text-xl font-bold">{formatNumber(profile?.data?.fedexBalance ?? 0)}</div>
                    <div className="text-sm opacity-80 text-center">Số Dư Logistics</div>
                  </div>
                </Card>
              </Col>
              <Col xs={getLastColSpan()} sm={getLastColSpan()} md={getLastColSpan()} lg={getLastColSpan()}>
                <Card className="bg-[#f0f2f5] text-black" onClick={handleCurrencyConversion}>
                  <div className="flex flex-col items-center">
                    <div className="w-[30px] h-[30px] rounded-full bg-white flex items-center justify-center mb-2 border">
                      <SwapOutlined className="text-xl text-black" />
                    </div>
                    <div className="text-xl font-bold">USD</div>
                    <div className="text-sm opacity-80 text-center">Quy đổi USD</div>
                  </div>
                </Card>
              </Col>
            </Row>

            <div className="bg-white rounded-lg border shadow-sm my-6">
              <div className="px-3 sm:px-4 md:px-6 py-4 border-b">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                  <div className="font-semibold text-lg text-gray-800">Lịch sử giao dịch</div>
                  <Radio.Group
                    value={transactionTypeFilter}
                    onChange={handleTransactionTypeChange}
                    optionType="button"
                    buttonStyle="solid"
                    size={isMobile ? "small" : "middle"}
                  >
                    <Radio.Button value="all">Tất cả</Radio.Button>
                    <Radio.Button value="fedex_payment">Thanh toán</Radio.Button>
                    <Radio.Button value="manual_fedex_amount">Quy đổi</Radio.Button>
                  </Radio.Group>
                </div>
              </div>

              <ConfigProvider
                theme={{
                  components: {
                    Table: {
                      fontSize: isMobile ? 12 : 14,
                      padding: isMobile ? 8 : 16,
                      paddingContentVertical: isMobile ? 8 : 16,
                      paddingContentHorizontal: isMobile ? 8 : 16,
                    }
                  }
                }}
              >
                <Table
                  columns={getWalletColumns()}
                  dataSource={filteredTransactionData}
                  pagination={false}
                  loading={isLoadingTransactions}
                  scroll={{ x: 'max-content' }}
                  size={isMobile ? "small" : "middle"}
                  rowClassName={() => "hover:bg-gray-50 transition-colors"}
                  className="transaction-history-table"
                  locale={{
                    emptyText: (
                      <div className="py-8 sm:py-12 md:py-16 flex flex-col items-center">
                        <div className="text-4xl sm:text-5xl md:text-6xl text-gray-300 mb-4">📋</div>
                        <div className="text-base sm:text-lg text-gray-500 font-medium">Không có giao dịch nào</div>
                        <div className="text-xs sm:text-sm text-gray-400 mt-2">Các giao dịch của bạn sẽ xuất hiện ở đây</div>
                      </div>
                    ),
                  }}
                />
              </ConfigProvider>

              <div className="px-3 sm:px-4 md:px-6 py-4 border-t bg-gray-50 rounded-b-lg">
                <Row
                  justify={isMobile ? "center" : "space-between"}
                  align="middle"
                  gutter={[0, 16]}
                  className="flex-col md:flex-row"
                >
                  {isMobile ? null : (
                    <Col xs={24} md={12} className="text-center md:text-left">
                      <span className="text-xs sm:text-sm text-gray-500">
                        {filteredTransactionData.length > 0 ? (
                          `Hiển thị ${Math.min((currentTransactionPage - 1) * transactionPageSize + 1, transactionHistoryDataResponse?.data?.meta?.itemCount || 0)} - ${Math.min(currentTransactionPage * transactionPageSize, transactionHistoryDataResponse?.data?.meta?.itemCount || 0)} của ${transactionHistoryDataResponse?.data?.meta?.itemCount || 0} giao dịch`
                        ) : (
                          "Không có giao dịch nào"
                        )}
                      </span>
                    </Col>
                  )}
                  <Col xs={24} md={12} className="text-center md:text-right">
                    {transactionHistoryDataResponse?.data?.data?.length > 0 && (
                      <ConfigProvider
                        theme={{
                          components: {
                            Pagination: {
                              itemSize: isMobile ? 24 : 32,
                              fontSize: isMobile ? 12 : 14,
                            }
                          }
                        }}
                      >
                        <Pagination
                          current={currentTransactionPage}
                          pageSize={transactionPageSize}
                          total={transactionHistoryDataResponse?.data?.meta?.itemCount || 0}
                          showSizeChanger={!isMobile}
                          pageSizeOptions={isMobile ? ['10'] : ['10', '20', '50', '100']}
                          onChange={handleTransactionPaginationChange}
                          onShowSizeChange={handleTransactionPaginationChange}
                          className="custom-pagination"
                          size={isMobile ? "small" : "default"}
                          simple={isMobile}
                        />
                      </ConfigProvider>
                    )}
                  </Col>
                </Row>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="mt-4">
        <OrdersTable onFilterChange={handleFilterChange} onSearch={handleSearch} />
      </div>
    </div>
  )
}

export default SellerOrders

