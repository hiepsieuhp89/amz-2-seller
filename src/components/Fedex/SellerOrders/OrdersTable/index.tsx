"use client";

import { useGetMyOrders, usePayOrders } from "@/hooks/shop-products";
import { useWindowSize } from "@/hooks/useWindowSize";
import { IOrder } from "@/interface/response/shop-products";
import {
  Badge,
  Button,
  Card,
  ConfigProvider,
  Empty,
  Input,
  Modal,
  Select,
  Spin,
  Table,
  message
} from "antd";
import type { ColumnsType } from "antd/es/table";
import type React from "react";
import type { Key } from 'react';
import { useMemo, useState } from "react";

const { Option } = Select;

interface OrderData {
  key: string;
  time: string;
  orderCode: string;
  totalAmount: string;
  status: string;
  delayStatus: string;
  email: string;
  address: string;
  items: {
    id: string;
    shopProduct: {
      profit: string;
      // Add other shopProduct fields as needed
    };
    quantity: number;
    price: string;
    // Add other item fields as needed
  }[];
  totalProfit: string;
  paymentStatus: string;
  userId: string;
  quantity: number;
  isDelayed?: boolean;
  delayTime?: string;
  user?: {
    fullName: string;
    // Add other user fields as needed
  };
}

interface OrdersTableProps {
  data?: OrderData[];
  onFilterChange?: (value: string) => void;
  onSearch?: (value: string) => void;
}

const generateOrderCode = (orderTime: string) => {
  // Convert order time to timestamp
  const timestamp = new Date(orderTime).getTime()
  // Convert timestamp to base64 string
  const base64String = btoa(timestamp.toString())
  // Take first 8 characters and convert to uppercase
  return base64String.substring(0, 16).toUpperCase()
}

const OrdersTable: React.FC<OrdersTableProps> = ({
  data,
  onFilterChange,
  onSearch,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [statusFilter, setStatusFilter] = useState<string>("PENDING");
  const { width } = useWindowSize();
  const isMobile = width ? width < 768 : false;
  const isTablet = width ? width >= 768 && width < 1024 : false;
  
  const currentDateISO = useMemo(() => new Date().toISOString(), []);
  const { data: ordersData, isLoading } = useGetMyOrders({
    order: "DESC",
    page: currentPage,
    take: pageSize,
    status: statusFilter,
    orderTimeLte: currentDateISO
  });
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
  const [withdrawPassword, setWithdrawPassword] = useState('');

  const payOrdersMutation = usePayOrders();

  const handleFilterChange = (value: string) => {
    setStatusFilter(value);
    console.log("Selected filter:", value);
    setCurrentPage(1);
    if (onFilterChange) {
      onFilterChange(value);
    }
  };

  const handleSearch = (value: string) => {
    // Implement your search logic here
    console.log("Search value:", value);
    // You might want to update the API call with the search term
  };

  const handlePayOrders = async () => {
    try {
      await payOrdersMutation.mutateAsync({
        orderIds: selectedRowKeys,
        withdrawPassword,
      });
      message.success('Thanh toán đơn hàng thành công!');
      setIsPaymentModalVisible(false);
      setSelectedRowKeys([]);
      setWithdrawPassword('');
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data.message || 'Thanh toán thất bại. Vui lòng thử lại!';
        message.error(errorMessage);
      } else {
        message.error('Thanh toán thất bại. Vui lòng thử lại!');
      }
      console.error('Payment error:', error);
    }
  };

  const handlePayButtonClick = (isAll: boolean) => {
    if (isAll) {
      // Select all orders
      const allOrderKeys = ordersData?.data.data?.map((order: IOrder) => order.id) || [];
      setSelectedRowKeys(allOrderKeys);
    } else if (selectedRowKeys.length === 0) {
      message.warning('Vui lòng chọn ít nhất một đơn hàng để thanh toán!');
      return;
    }
    setIsPaymentModalVisible(true);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_NONE,
    ],
  };

  const handlePaginationChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) setPageSize(pageSize);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Spin size="small" />
      </div>
    );
  }

  if (
    !ordersData ||
    !ordersData.data ||
    !ordersData.data.data ||
    ordersData.data.data.length === 0
  ) {
    return (
      <Empty
        description="Không có đơn hàng nào"
        className="flex justify-center items-center h-96"
      />
    );
  }

  const toggleExpand = (key: string) => {
    if (expandedRowKeys.includes(key)) {
      setExpandedRowKeys(expandedRowKeys.filter((k) => k !== key));
    } else {
      setExpandedRowKeys([...expandedRowKeys, key]);
    }
  };

  // Define responsive columns
  const getColumns = (): ColumnsType<any> => {
    const baseColumns: ColumnsType<any> = [
      {
        title: "Thời gian",
        dataIndex: "orderTime",
        key: "orderTime",  
        width: isMobile ? "30%" : "15%",
        render: (text) => (
          <span className="whitespace-nowrap text-xs sm:text-sm">
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
        title: "Mã đặt hàng",
        dataIndex: "orderTime",
        key: "orderTime",
        width: isMobile ? "30%" : "15%",
        render: (text,) => (
          <span className="text-xs sm:text-sm font-mono truncate block max-w-[120px] sm:max-w-full">
            {generateOrderCode(text)}
          </span>
        ),
      },
      {
        title: "Số tiền",
        dataIndex: "totalAmount",
        key: "totalAmount",
        width: isMobile ? "20%" : "10%",
        render: (text) => (
          <span className="whitespace-nowrap text-xs sm:text-sm">
            ${text}
          </span>
        ),
      },
      {
        title: "Lợi nhuận",
        dataIndex: "totalProfit",
        key: "totalProfit",
        width: isMobile ? "20%" : "10%",
        render: (text) => {
          return (
            <span className="text-green-500 whitespace-nowrap text-xs sm:text-sm">${text}</span>
          );
        },
      },
      {
        title: "Tình trạng giao hàng",
        dataIndex: "status",
        key: "status",
        width: isMobile ? "100%" : "15%",
        responsive: ['sm'],
        render: (status) => {
          switch (status) {
            case 'PENDING':
              return (
                <Badge
                  className="self-start"
                  count={
                    <div className="animate-gradient bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 text-gray-600 px-2 py-1 rounded font-medium text-sm">
                      🕙 Đang chờ xử lý
                    </div>
                  }
                />
              );
            case 'CONFIRMED':
              return (
                <Badge
                  className="self-start"
                  count={
                    <div className="bg-blue-100 text-blue-600 px-2 py-1 rounded font-medium text-sm">
                      ✓ Đã xác nhận
                    </div>
                  }
                />
              );
            case 'SHIPPING':
              return (
                <Badge
                  className="self-start"
                  count={
                    <div className="bg-purple-100 text-purple-600 px-2 py-1 rounded font-medium text-sm">
                      🚚 Đang trên đường đi
                    </div>
                  }
                />
              );
            case 'DELIVERED':
              return (
                <Badge
                  className="self-start"
                  count={
                    <div className="bg-green-100 text-green-600 px-2 py-1 rounded font-medium text-sm">
                      ✓ Đã giao hàng
                    </div>
                  }
                />
              );
            case 'CANCELED':
              return (
                <Badge
                  className="self-start"
                  count={
                    <div className="bg-red-100 text-red-600 px-2 py-1 rounded font-medium text-sm">
                      ✕ Đã hủy
                    </div>
                  }
                />
              );
            case 'REJECTED':
              return (
                <Badge
                  className="self-start"
                  count={
                    <div className="bg-red-100 text-red-600 px-2 py-1 rounded font-medium text-sm">
                      ✕ Đã từ chối
                    </div>
                  }
                />
              );
            default:
              return (
                <Badge
                  className="self-start"
                  count={
                    <div className="bg-gray-100 text-gray-600 px-2 py-1 rounded font-medium text-sm">
                      Không xác định
                    </div>
                  }
                />
              );
          }
        },
      },
      {
        title: "Trạng thái thanh toán",
        dataIndex: "paymentStatus",
        key: "paymentStatus",
        width: isMobile ? "100%" : "15%",
        responsive: ['md'],
        render: (paymentStatus) => {
          if (paymentStatus === 'PAID') {
            return (
              <Badge
                className="self-start"
                count={
                  <div className="bg-green-100 text-green-600 px-2 py-1 rounded font-medium text-sm">
                    ✓ Đã thanh toán
                  </div>
                }
              />
            );
          }
          return (
            <Badge
              className="self-start"
              count={
                <div className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded font-medium text-sm">
                  ⚠️ Chưa thanh toán
                </div>
              }
            />
          );
        },
      },
      {
        title: "Khách hàng",
        dataIndex: "user",
        key: "user",
        width: "15%",
        responsive: ['lg'],
        render: (user) => (
          <div className="flex flex-col">
            <span className="font-medium text-sm">{user?.fullName || "—"}</span>
            {/* <span className="text-xs text-gray-500">{user?.email || "—"}</span> */}
          </div>
        ),
      },
    ];
    
    // For mobile, create a special expandable row for more details
    if (isMobile) {
      // For smaller screens, we'll add an expandable row to show the delivery status
      baseColumns.push({
        title: '',
        key: 'expand',
        width: '10%',
        render: (_, record) => (
          <Button 
            type="text" 
            size="small"
            onClick={() => toggleExpand(record.id)}
            className="text-blue-500"
          >
            {expandedRowKeys.includes(record.id) ? 'Thu gọn' : 'Chi tiết'}
          </Button>
        ),
      });
    }
    
    return baseColumns;
  };

  // Handle expanded rows change in a way that's compatible with Table's expandable API
  const handleExpandedRowsChange = (newExpandedRows: readonly Key[]) => {
    setExpandedRowKeys(newExpandedRows.map(key => key.toString()));
  };

  // Setup expandable configuration for responsive design
  const expandableConfig = isMobile ? {
    expandedRowKeys,
    expandIcon: () => null, // Hide default expand icon
    onExpandedRowsChange: handleExpandedRowsChange,
    expandedRowRender: (record: any) => {
      return (
        <div className="py-2 px-1 bg-gray-50 rounded">
          <div className="grid grid-cols-1 gap-y-3">
            <div>
              <div className="text-xs text-gray-500 mb-1">Tình trạng giao hàng:</div>
              {(() => {
                switch (record.status) {
                  case 'PENDING':
                    return (
                      <div className="animate-gradient bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 text-gray-600 px-2 py-1 rounded text-xs inline-block">
                        🕙 Đang chờ xử lý
                      </div>
                    );
                  case 'CONFIRMED':
                    return (
                      <div className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs inline-block">
                        ✓ Đã xác nhận
                      </div>
                    );
                  case 'SHIPPING':
                    return (
                      <div className="bg-purple-100 text-purple-600 px-2 py-1 rounded text-xs inline-block">
                        🚚 Đang trên đường đi
                      </div>
                    );
                  case 'DELIVERED':
                    return (
                      <div className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs inline-block">
                        ✓ Đã giao hàng
                      </div>
                    );
                  case 'CANCELED':
                    return (
                      <div className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs inline-block">
                        ✕ Đã hủy
                      </div>
                    );
                  case 'REJECTED':
                    return (
                      <div className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs inline-block">
                        ✕ Đã từ chối
                      </div>
                    );
                  default:
                    return (
                      <div className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs inline-block">
                        Không xác định
                      </div>
                    );
                }
              })()}
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Trạng thái thanh toán:</div>
              {record.paymentStatus === 'PAID' ? (
                <div className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs inline-block">
                  ✓ Đã thanh toán
                </div>
              ) : (
                <div className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded text-xs inline-block">
                  ⚠️ Chưa thanh toán
                </div>
              )}
            </div>
            {record.user && (
              <div>
                <div className="text-xs text-gray-500 mb-1">Khách hàng:</div>
                <div className="text-xs">{record.user.fullName || "—"}</div>
                <div className="text-xs text-gray-500">{record.user.email || "—"}</div>
              </div>
            )}
          </div>
        </div>
      );
    },
  } : undefined;

  return (
    <Card className="shadow-sm border rounded-lg">
      <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          
          <Input.Search
            placeholder="Tìm kiếm theo mã đơn hàng"
            onSearch={handleSearch}
            style={{ width: isMobile ? '100%' : 250 }}
          />
        </div>
        
        <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-end">
          <Button
            type="primary"
            onClick={() => handlePayButtonClick(false)}
            disabled={selectedRowKeys.length === 0}
            className="bg-blue-500 w-full sm:w-auto"
          >
            Thanh toán đơn đã chọn ({selectedRowKeys.length})
          </Button>
          
          <Button
            onClick={() => handlePayButtonClick(true)}
            className="w-full sm:w-auto"
          >
            Thanh toán tất cả
          </Button>
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
          rowSelection={rowSelection}
          columns={getColumns()}
          dataSource={ordersData?.data?.data || []}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: ordersData?.data?.meta?.itemCount || 0,
            onChange: handlePaginationChange,
            showSizeChanger: !isMobile,
            pageSizeOptions: isMobile ? ['10'] : ['10', '20', '50', '100'],
            size: isMobile ? 'small' : 'default',
            responsive: true,
            showTotal: (total) => 
              isMobile ? 
                `${total} đơn` : 
                `Tổng ${total} đơn hàng`,
            simple: isMobile,
          }}
          scroll={{ x: 'max-content' }}
          size={isMobile ? "small" : "middle"}
          expandable={expandableConfig}
          rowKey="id"
        />
      </ConfigProvider>

      <Modal
        title="Nhập mật khẩu rút tiền"
        open={isPaymentModalVisible}
        onOk={handlePayOrders}
        onCancel={() => setIsPaymentModalVisible(false)}
        okText="Xác nhận"
        cancelText="Hủy"
        okButtonProps={{ 
          className: 'bg-blue-500',
          loading: payOrdersMutation.isPending
        }}
      >
        <p className="mb-4">Vui lòng nhập mật khẩu rút tiền để xác nhận thanh toán.</p>
        <Input.Password
          placeholder="Nhập mật khẩu rút tiền"
          value={withdrawPassword}
          onChange={(e) => setWithdrawPassword(e.target.value)}
          className="w-full"
        />
      </Modal>
    </Card>
  );
};

export default OrdersTable;
