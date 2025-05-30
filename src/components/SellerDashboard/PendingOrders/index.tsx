"use client"
import { Table, Button, Tag, Tooltip, Empty, Spin } from "antd"
import type { ColumnsType } from "antd/es/table"
import { CheckCircleOutlined } from "@ant-design/icons"
import { useState, useEffect, useRef } from "react"
import { useGetMyOrders } from "@/hooks/shop-products"
import dayjs from "dayjs"
import { ClipboardCopy, Clock, CheckCheck, AlertCircle, User } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"

const PendingOrders = () => {
  const { data, isLoading } = useGetMyOrders({
    status: "PENDING",
  })

  const [copiedId, setCopiedId] = useState<string | null>(null)
  const tableContainerRef = useRef<HTMLDivElement>(null)

  // Thêm hook kiểm tra mobile
  const isMobile = useMediaQuery("(max-width: 768px)")

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(text)
    setTimeout(() => setCopiedId(null), 2000)
  }

  // Force horizontal scrollbar to be visible
  useEffect(() => {
    if (tableContainerRef.current) {
      // Force reflow to ensure scrollbar appears
      tableContainerRef.current.style.overflowX = "scroll"

      // Add some dummy content to ensure the table is wider than its container
      const tableWidth = tableContainerRef.current.scrollWidth
      const containerWidth = tableContainerRef.current.clientWidth

      if (tableWidth <= containerWidth) {
        // If table isn't wider than container, force it to be wider
        const tableElement = tableContainerRef.current.querySelector(".ant-table-wrapper")
        if (tableElement) {
          ;(tableElement as HTMLElement).style.width = `${containerWidth + 100}px`
        }
      }
    }
  }, [data, isLoading])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "COMPLETED":
        return "bg-green-50 text-green-700 border-green-200";
      case "CANCELLED":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "PENDING":
        return "Đang xử lý";
      case "COMPLETED":
        return "Hoàn thành";
      case "CANCELLED":
        return "Đã hủy";
      default:
        return status;
    }
  };

  const formatDelayStatus = (delayStatus: string) => {
    if (!delayStatus) return "Đang xử lý";
    
    // Check if it matches the pattern DELAY_{number}H
    const delayMatch = delayStatus.match(/DELAY_(\d+)H/);
    if (delayMatch) {
      const hours = delayMatch[1];
      return `Chờ ${hours} giờ`;
    }
    
    // For other statuses, just return the original or a default translation
    switch (delayStatus) {
      case "NORMAL":
        return "";
      case "PROCESSING":
        return "Đang xử lý";
      case "URGENT":
        return "Khẩn cấp";
      default:
        return delayStatus;
    }
  };

  const columns: ColumnsType<any> = [
    {
      title: isMobile ? "Mã" : "Mã đặt hàng",
      dataIndex: "id",
      key: "id",
      className: isMobile ? "text-xs px-1 py-1" : "text-left",
      width: isMobile ? 90 : 200,
      render: (text) => (
        <div className={isMobile ? "flex items-center text-xs" : "flex items-center space-x-2"}>
          <span className="font-medium text-gray-800">{text.substring(0, 8)}...</span>
          {!isMobile && (
            <Tooltip title={copiedId === text ? "Đã sao chép!" : "Sao chép"}>
              <Button
                type="text"
                className="flex items-center justify-center p-1 hover:bg-gray-50 rounded-full"
                onClick={() => handleCopy(text)}
                icon={
                  copiedId === text ? (
                    <CheckCheck className="h-4 w-4 text-green-500" />
                  ) : (
                    <ClipboardCopy className="h-4 w-4 text-gray-400" />
                  )
                }
              />
            </Tooltip>
          )}
        </div>
      ),
    },
    {
      title: isMobile ? "Khách" : "Khách hàng",
      dataIndex: ["user", "fullName"],
      key: "customer",
      className: isMobile ? "text-xs px-1 py-1" : "text-left",
      width: isMobile ? 100 : 250,
      render: (text, record) => (
        <div className={isMobile ? "flex items-center text-xs" : "flex items-start space-x-3"}>
          <div className="h-7 w-7 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
            <User className="h-4 w-4 text-gray-500" />
          </div>
          <div className="flex flex-col">
            <div className="font-medium text-gray-800">{text}</div>
          </div>
        </div>
      ),
    },
    {
      title: isMobile ? "Thời gian" : "Thời gian",
      dataIndex: "orderTime",
      key: "orderTime",
      className: isMobile ? "text-xs px-1 py-1" : "text-left",
      width: isMobile ? 90 : 180,
      render: (value, record) => (
        <div className={isMobile ? "flex flex-col text-xs" : "flex flex-col"}>
          <div className="font-medium text-gray-800">
            {value ? dayjs(value).format("DD/MM") : "N/A"}
          </div>
          {!isMobile && (
            <div className="text-gray-500 text-xs">
              {value ? dayjs(value).format("HH:mm") : ""}
            </div>
          )}
        </div>
      ),
    },
    {
      title: isMobile ? "Tổng" : "Tổng tiền",
      dataIndex: "totalAmount",
      key: "totalAmount",
      className: isMobile ? "text-xs px-1 py-1 text-right" : "text-right",
      width: isMobile ? 80 : 150,
      render: (value, record) => (
        <div className={isMobile ? "flex flex-col items-end text-xs" : "flex flex-col items-end"}>
          <span className="font-bold text-gray-800">${Number(value).toLocaleString('vi-VN')}</span>
          {!isMobile && (
            <span className="text-green-600 text-xs">Lợi nhuận: ${Number(record?.totalProfit).toLocaleString('vi-VN')}</span>
          )}
        </div>
      ),
    },
    {
      title: isMobile ? "TT" : "Trạng thái",
      key: "status",
      className: isMobile ? "text-xs px-1 py-1 text-center" : "text-center",
      width: isMobile ? 70 : 150,
      render: (_, record) => (
        <div className={isMobile ? "flex flex-col gap-1 text-xs" : "flex flex-col gap-2"}>
          <div className={`px-2 py-1 rounded-full text-xs font-medium inline-flex items-center justify-center ${getStatusColor(record?.status)}`}>
            {record?.status === "PENDING" ? (
              <AlertCircle className="h-3 w-3 mr-1" />
            ) : (
              <CheckCircleOutlined className="mr-1 text-xs" />
            )}
            {isMobile ? "" : getStatusText(record?.status)}
          </div>
        </div>
      ),
    },
  ]

  // Lọc cột hiển thị trên mobile
  const visibleColumns = isMobile
    ? columns.filter(col => ["id", "customer", "orderTime", "totalAmount", "status"].includes(String(col.key)))
    : columns;

  const CustomEmpty = () => (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description="Không có đơn hàng đang chờ xử lý"
      className="my-6"
    />
  );

  return (
    <div className="rounded-xl bg-white p-5 border border-gray-100 shadow-sm">
      <div className="flex justify-between items-center mb-5">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Đơn hàng đang chờ</h3>
          <p className="text-sm text-gray-500 mt-1">Danh sách đơn hàng cần xử lý</p>
        </div>
        {data?.data?.data && data.data.data.length > 0 && (
          <div className="bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
            <span className="text-sm font-medium text-amber-700 flex items-center">
              <Clock className="h-4 w-4 mr-1" /> {data.data.data.length} đơn chờ xử lý
            </span>
          </div>
        )}
      </div>

      <div
        ref={tableContainerRef}
        className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-50"
      >
        <Table
          columns={visibleColumns as any}
          dataSource={Array.isArray(data?.data?.data) ? data.data.data : []}
          rowKey="id"
          pagination={false}
          size="small"
          loading={{
            spinning: isLoading,
            indicator: <Spin size="small" />,
          }}
          rowClassName="hover:bg-gray-50 transition-colors"
          className="pending-orders-table"
          locale={{ emptyText: <CustomEmpty /> }}
          style={{ minWidth: "1000px" }} 
        />
      </div>
    </div>
  )
}

export default PendingOrders

