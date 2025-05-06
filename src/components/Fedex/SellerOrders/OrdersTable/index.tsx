"use client";

import { useGetMyOrders, usePayOrders } from "@/hooks/shop-products";
import { useWindowSize } from "@/hooks/useWindowSize";
import { IOrder } from "@/interface/response/shop-products";
import { formatNumber } from "@/utils";
import {
  Badge,
  Button,
  Card,
  ConfigProvider,
  Empty,
  Input,
  Modal,
  Spin,
  Table,
  message,
  Pagination
} from "antd";
import type { ColumnsType } from "antd/es/table";
import type React from "react";
import type { Key } from 'react';
import { useMemo, useState } from "react";

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
    };
    quantity: number;
    price: string;
  }[];
  totalProfit: string;
  paymentStatus: string;
  userId: string;
  quantity: number;
  isDelayed?: boolean;
  delayTime?: string;
  user?: {
    fullName: string;
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
  const [expandedCardIds, setExpandedCardIds] = useState<string[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
  const [fedexPassword, setFedexPassword] = useState('');

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
    console.log("Search value:", value);
  };

  const handlePayOrders = async () => {
    try {
      await payOrdersMutation.mutateAsync({
        orderIds: selectedRowKeys,
        fedexPassword,
      });
      message.success('Thanh toán đơn hàng thành công!');
      setIsPaymentModalVisible(false);
      setSelectedRowKeys([]);
      setFedexPassword('');
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

  const toggleCardExpand = (id: string) => {
    if (expandedCardIds.includes(id)) {
      setExpandedCardIds(expandedCardIds.filter(cardId => cardId !== id));
    } else {
      setExpandedCardIds([...expandedCardIds, id]);
    }
  };

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return (
          <div className="animate-gradient bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 text-gray-600 px-2 py-1 rounded font-medium text-xs">
            🕙 Đang chờ xử lý
          </div>
        );
      case 'CONFIRMED':
        return (
          <div className="bg-blue-100 text-blue-600 px-2 py-1 rounded font-medium text-xs">
            ✓ Đã xác nhận
          </div>
        );
      case 'SHIPPING':
        return (
          <div className="bg-purple-100 text-purple-600 px-2 py-1 rounded font-medium text-xs">
            🚚 Đang trên đường đi
          </div>
        );
      case 'DELIVERED':
        return (
          <div className="bg-green-100 text-green-600 px-2 py-1 rounded font-medium text-xs">
            ✓ Đã giao hàng
          </div>
        );
      case 'CANCELED':
        return (
          <div className="bg-red-100 text-red-600 px-2 py-1 rounded font-medium text-xs">
            ✕ Đã hủy
          </div>
        );
      case 'REJECTED':
        return (
          <div className="bg-red-100 text-red-600 px-2 py-1 rounded font-medium text-xs">
            ✕ Đã từ chối
          </div>
        );
      default:
        return (
          <div className="bg-gray-100 text-gray-600 px-2 py-1 rounded font-medium text-xs">
            Không xác định
          </div>
        );
    }
  };

  const renderDelayBadge = (delayStatus: string) => {
    if (!delayStatus || delayStatus === 'NORMAL') return null;
    
    let delayText;
    switch (delayStatus) {
      case 'DELAY_24H':
        delayText = '24h';
        break;
      case 'DELAY_36H':
        delayText = '36h';
        break;
      case 'DELAY_72H':
        delayText = '72h';
        break;
      default:
        if (delayStatus.startsWith('DELAY_')) {
          delayText = delayStatus.replace('DELAY_', '');
        } else {
          delayText = delayStatus;
        }
    }
    
    return (
      <div className="bg-orange-100 text-orange-600 px-2 py-1 rounded font-medium text-xs mt-1">
        ⚠️ Trễ {delayText}
      </div>
    );
  };

  const renderPaymentBadge = (paymentStatus: string) => {
    if (paymentStatus === 'PAID') {
      return (
        <div className="bg-green-100 text-green-600 px-2 py-1 rounded font-medium text-xs">
          ✓ Đã thanh toán
        </div>
      );
    }
    return (
      <div className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded font-medium text-xs">
        ⚠️ Chưa thanh toán
      </div>
    );
  };

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
            {new Date(text).toLocaleTimeString('vi-VN', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            })} {new Date(text).toLocaleDateString('vi-VN', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit'
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
            ${formatNumber(text)}
          </span>
        ),
      },
      {
        title: "Giá nhập",
        dataIndex: "totalPaidAmount",
        key: "totalPaidAmount",
        width: isMobile ? "20%" : "10%",
        render: (text) => (
          <span className="whitespace-nowrap text-xs sm:text-sm">
            ${formatNumber(text)}
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
        render: (status, record) => {
          let statusElement;
          switch (status) {
            case 'PENDING':
              statusElement = (
                <div className="animate-gradient bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 text-gray-600 px-2 py-1 rounded font-medium text-sm">
                  🕙 Đang chờ xử lý
                </div>
              );
              break;
            case 'CONFIRMED':
              statusElement = (
                <div className="bg-blue-100 text-blue-600 px-2 py-1 rounded font-medium text-sm">
                  ✓ Đã xác nhận
                </div>
              );
              break;
            case 'SHIPPING':
              statusElement = (
                <div className="bg-purple-100 text-purple-600 px-2 py-1 rounded font-medium text-sm">
                  🚚 Đang trên đường đi
                </div>
              );
              break;
            case 'DELIVERED':
              statusElement = (
                <div className="bg-green-100 text-green-600 px-2 py-1 rounded font-medium text-sm">
                  ✓ Đã giao hàng
                </div>
              );
              break;
            case 'CANCELED':
              statusElement = (
                <div className="bg-red-100 text-red-600 px-2 py-1 rounded font-medium text-sm">
                  ✕ Đã hủy
                </div>
              );
              break;
            case 'REJECTED':
              statusElement = (
                <div className="bg-red-100 text-red-600 px-2 py-1 rounded font-medium text-sm">
                  ✕ Đã từ chối
                </div>
              );
              break;
            default:
              statusElement = (
                <div className="bg-gray-100 text-gray-600 px-2 py-1 rounded font-medium text-sm">
                  Không xác định
                </div>
              );
          }

          const delayStatus = record.delayStatus;
          let delayElement = null;

          if (delayStatus && delayStatus !== 'NORMAL') {
            let delayText;
            switch (delayStatus) {
              case 'DELAY_24H':
                delayText = '24h';
                break;
              case 'DELAY_36H':
                delayText = '36h';
                break;
              case 'DELAY_72H':
                delayText = '72h';
                break;
              default:
                if (delayStatus.startsWith('DELAY_')) {
                  delayText = delayStatus.replace('DELAY_', '');
                } else {
                  delayText = delayStatus;
                }
            }
            
            delayElement = (
              <div className="bg-orange-100 text-orange-600 px-2 py-1 rounded font-medium text-sm mt-1">
                ⚠️ Trễ {delayText}
              </div>
            );
          }

          return (
            <div className="flex flex-col">
              {statusElement}
              {delayElement}
            </div>
          );
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
                let statusElement;
                switch (record.status) {
                  case 'PENDING':
                    statusElement = (
                      <div className="animate-gradient bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 text-gray-600 px-2 py-1 rounded text-xs inline-block">
                        🕙 Đang chờ xử lý
                      </div>
                    );
                    break;
                  case 'CONFIRMED':
                    statusElement = (
                      <div className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs inline-block">
                        ✓ Đã xác nhận
                      </div>
                    );
                    break;
                  case 'SHIPPING':
                    statusElement = (
                      <div className="bg-purple-100 text-purple-600 px-2 py-1 rounded text-xs inline-block">
                        🚚 Đang trên đường đi
                      </div>
                    );
                    break;
                  case 'DELIVERED':
                    statusElement = (
                      <div className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs inline-block">
                        ✓ Đã giao hàng
                      </div>
                    );
                    break;
                  case 'CANCELED':
                    statusElement = (
                      <div className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs inline-block">
                        ✕ Đã hủy
                      </div>
                    );
                    break;
                  case 'REJECTED':
                    statusElement = (
                      <div className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs inline-block">
                        ✕ Đã từ chối
                      </div>
                    );
                    break;
                  default:
                    statusElement = (
                      <div className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs inline-block">
                        Không xác định
                      </div>
                    );
                }

                const delayStatus = record.delayStatus;
                let delayElement = null;

                if (delayStatus && delayStatus !== 'NORMAL') {
                  let delayText;
                  switch (delayStatus) {
                    case 'DELAY_24H':
                      delayText = '24h';
                      break;
                    case 'DELAY_36H':
                      delayText = '36h';
                      break;
                    case 'DELAY_72H':
                      delayText = '72h';
                      break;
                    default:
                      if (delayStatus.startsWith('DELAY_')) {
                        delayText = delayStatus.replace('DELAY_', '');
                      } else {
                        delayText = delayStatus;
                      }
                  }
                  
                  delayElement = (
                    <div className="bg-orange-100 text-orange-600 px-2 py-1 rounded text-xs inline-block mt-1">
                      ⚠️ Trễ {delayText}
                    </div>
                  );
                }

                return (
                  <div className="flex flex-col">
                    {statusElement}
                    {delayElement}
                  </div>
                );
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

  // For mobile view, render cards instead of a table
  const renderMobileCards = () => {
    if (!ordersData?.data?.data || ordersData.data.data.length === 0) {
      return (
        <Empty
          description="Không có đơn hàng nào"
          className="flex justify-center items-center h-64"
        />
      );
    }

    return (
      <div className="space-y-3">
        {ordersData.data.data.map((order: any) => (
          <div 
            key={order.id} 
            className="border rounded-lg shadow-sm bg-white overflow-hidden"
          >
            <div className="p-3 flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedRowKeys.includes(order.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedRowKeys([...selectedRowKeys, order.id]);
                    } else {
                      setSelectedRowKeys(selectedRowKeys.filter(key => key !== order.id));
                    }
                  }}
                  className="mr-3 h-4 w-4"
                />
                <div>
                  <div className="text-xs font-medium">
                    {new Date(order.orderTime).toLocaleTimeString('vi-VN', {
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit'
                    })} {new Date(order.orderTime).toLocaleDateString('vi-VN', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit'
                    })}
                  </div>
                  <div className="text-xs font-mono text-gray-500 truncate max-w-[140px]">
                    {generateOrderCode(order.orderTime)}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-bold">${formatNumber(order.totalAmount)}</div>
                <div className="text-xs text-green-500">${order.totalProfit}</div>
              </div>
            </div>
            
            <div className="px-3 pb-2 flex flex-wrap gap-1">
              {renderStatusBadge(order.status)}
              {renderDelayBadge(order.delayStatus)}
              {renderPaymentBadge(order.paymentStatus)}
            </div>
            
            {expandedCardIds.includes(order.id) && (
              <div className="px-3 py-2 bg-gray-50 border-t">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="text-gray-500 font-semibold">Giá nhập:</div>
                    <div>${formatNumber(order.totalPaidAmount)}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 font-semibold">Lợi nhuận:</div>
                    <div className="text-green-500">${order.totalProfit}</div>
                  </div>
                  {order.user && (
                    <>
                      <div>
                        <div className="text-gray-500 font-semibold">Khách hàng:</div>
                        <div>{order.user.fullName || "—"}</div>
                      </div>
                    </>
                  )}
                  {order.address && (
                    <div>
                      <div className="text-gray-500 font-semibold">Địa chỉ:</div>
                      <div>{order.address}</div>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            <div 
              className="px-3 py-2 border-t text-center text-xs text-blue-500"
              onClick={() => toggleCardExpand(order.id)}
            >
              {expandedCardIds.includes(order.id) ? 'Thu gọn' : 'Xem thêm'}
            </div>
          </div>
        ))}
        
        <div className="mt-4 flex justify-center">
          <ConfigProvider
            theme={{
              components: {
                Pagination: {
                  itemSize: 24,
                  fontSize: 12,
                }
              }
            }}
          >
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={ordersData?.data?.meta?.itemCount || 0}
              onChange={handlePaginationChange}
              size="small"
              simple
            />
          </ConfigProvider>
        </div>
      </div>
    );
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

      {isMobile ? (
        renderMobileCards()
      ) : (
        <ConfigProvider 
          theme={{
            components: {
              Table: {
                fontSize: 14,
                padding: 16,
                paddingContentVertical: 16,
                paddingContentHorizontal: 16,
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
              showSizeChanger: true,
              pageSizeOptions: ['10', '20', '50', '100'],
              size: 'default',
              responsive: true,
              showTotal: (total) => `Tổng ${total} đơn hàng`,
              simple: false,
            }}
            scroll={{ x: 'max-content' }}
            size="middle"
            expandable={expandableConfig}
            rowKey="id"
          />
        </ConfigProvider>
      )}

      <Modal
        title="Nhập mật khẩu giao dịch"
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
        <p className="mb-4">Vui lòng nhập mật khẩu giao dịch để xác nhận thanh toán.</p>
        <Input.Password
          placeholder="Nhập mật khẩu giao dịch"
          value={fedexPassword}
          onChange={(e) => setFedexPassword(e.target.value)}
          className="w-full"
        />
      </Modal>
    </Card>
  );
};

export default OrdersTable;
