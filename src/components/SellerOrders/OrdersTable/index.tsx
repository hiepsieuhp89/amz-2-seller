"use client";

import { useGetMyOrders } from "@/hooks/shop-products";
import { SearchOutlined, DownOutlined } from "@ant-design/icons";
import { mdiContentSaveEdit, mdiEye, mdiTrashCan, mdiPrinter } from "@mdi/js";
import Icon from "@mdi/react";
import {
  Badge,
  Card,
  Col,
  Divider,
  Empty,
  Input,
  Row,
  Space,
  Spin,
  Table,
  Tooltip,
  Typography,
  Pagination,
  Button,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState, useMemo, useEffect } from "react";
import OrderDetailDialog from "../OrderDetailDialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatNumber } from "@/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const { Title } = Typography;

interface OrderData {
  key: string;
  time: string;
  orderCode: string;
  totalAmount: string;
  status: string;
  user: {
    fullName: string;
  };
  delayStatus: string;
  paymentStatus: string;
  itemsCount: number;
  userId: string;
  quantity: number;
  confirmedAt: string | null;
  totalProfit: string | null;
  totalPaidAmount: string;
}

const OrdersTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [statusFilter, setStatusFilter] = useState<string | undefined>();
  const [searchText, setSearchText] = useState<string>("");
  const [excludeFutureOrders, setExcludeFutureOrders] = useState(true);

  // Memoize the current date to prevent it from changing on every render
  const currentDateISO = useMemo(() => new Date().toISOString(), []);

  const { data: ordersData, isLoading } = useGetMyOrders({
    order: "DESC",
    page: currentPage,
    status: statusFilter,
    search: searchText,
    orderTimeLte: currentDateISO,
  });
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isPrinting, setIsPrinting] = useState<boolean>(false);

  // Check if screen is mobile
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handlePaginationChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) setPageSize(pageSize);
  };

  const handleOpenDetail = (orderId: string) => {
    setSelectedOrderId(orderId);
    setIsDetailOpen(true);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleExcludeFutureOrders = (checked: boolean) => {
    setExcludeFutureOrders(checked);
    setCurrentPage(1);
  };

  const handleExpandRow = (expanded: boolean, record: OrderData) => {
    setExpandedRowKeys(expanded ? [record.key] : []);
  };

  const handlePrintInvoice = async (orderId: string) => {
    try {
      // Set the order for the detail dialog
      setSelectedOrderId(orderId);
      setIsDetailOpen(true);

      // Set printing state to true
      setIsPrinting(true);

      // Wait for the dialog to open and render
      // Using a longer timeout to ensure content is fully loaded
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Use a polling mechanism to check if the preview element is ready with content
      let maxAttempts = 20; // Increase max attempts
      let attempt = 0;
      let input = null;

      while (attempt < maxAttempts) {
        input = document.getElementById("preview");
        // Check for the data-loaded attribute that we added to the preview div
        const isLoaded = input && input.getAttribute('data-loaded') === 'true';
        const hasContent = input && input.children.length > 0 && input.getBoundingClientRect().height > 100;

        if (isLoaded && hasContent) {
          break;
        }

        // Wait a bit more between checks
        await new Promise((resolve) => setTimeout(resolve, 500));
        attempt++;
      }

      if (!input || input.getAttribute('data-loaded') !== 'true' || input.children.length === 0) {
        throw new Error("Preview element not fully loaded after multiple attempts");
      }

      // Proceed with printing
      try {
        // Display processing message
        const processingMsg = document.createElement("div");
        processingMsg.style.position = "fixed";
        processingMsg.style.top = "50%";
        processingMsg.style.left = "50%";
        processingMsg.style.transform = "translate(-50%, -50%)";
        processingMsg.style.padding = "20px";
        processingMsg.style.background = "rgba(0,0,0,0.7)";
        processingMsg.style.color = "white";
        processingMsg.style.borderRadius = "5px";
        processingMsg.style.zIndex = "9999";
        processingMsg.textContent = "Đang tạo PDF...";
        document.body.appendChild(processingMsg);

        // Give the browser one more moment to completely render everything
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Convert DOM to canvas
        const canvas = await html2canvas(input, {
          scale: 1.5,
          logging: false,
          useCORS: true,
          allowTaint: true,
          scrollY: -window.scrollY,
        });

        // Create PDF from canvas
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
        });

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = pageWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Add image to PDF
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

        // Handle multi-page content
        if (imgHeight > pageHeight) {
          let heightLeft = imgHeight - pageHeight;
          let position = -pageHeight;

          while (heightLeft > 0) {
            pdf.addPage();
            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
            position -= pageHeight;
          }
        }

        // Save PDF
        pdf.save(`don-hang-${orderId.substring(0, 8)}.pdf`);
      } catch (err) {
        console.error("Lỗi khi tạo PDF:", err);
        alert("Đã xảy ra lỗi khi tạo PDF. Vui lòng thử lại sau.");
      } finally {
        // Remove processing message
        const processingMsg = document.querySelector(
          'div[style*="position: fixed"][style*="z-index: 9999"]'
        );
        if (processingMsg && processingMsg.parentNode) {
          processingMsg.parentNode.removeChild(processingMsg);
        }
        // Set printing state to false and close dialog
        setIsPrinting(false);
        setIsDetailOpen(false);
      }
    } catch (err) {
      console.error("Lỗi:", err);
      alert("Đã xảy ra lỗi khi tạo PDF. Vui lòng thử lại sau.");
      // Clean up
      const processingMsg = document.querySelector(
        'div[style*="position: fixed"][style*="z-index: 9999"]'
      );
      if (processingMsg && processingMsg.parentNode) {
        processingMsg.parentNode.removeChild(processingMsg);
      }
      setIsPrinting(false);
      setIsDetailOpen(false);
    }
  };

  const columns: ColumnsType<OrderData> = [
    {
      title: "Ngày đặt hàng",
      dataIndex: "time",
      key: "time",
      width: "15%",
      sorter: (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime(),
      responsive: ["md"],
    },
    {
      title: "Mã đặt hàng",
      dataIndex: "orderCode",
      key: "orderCode",
      width: "15%",
      sorter: (a, b) => a.orderCode.localeCompare(b.orderCode),
      render: (text, record) => (
        <div className="flex items-center">
          {isMobile && (
            <Button
              type="text"
              icon={<DownOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                const isExpanded = expandedRowKeys.includes(record.key);
                handleExpandRow(!isExpanded, record);
              }}
              className={
                expandedRowKeys.includes(record.key)
                  ? "rotate-180 mr-2"
                  : "mr-2"
              }
              style={{ transition: "transform 0.3s" }}
            />
          )}
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Số sản phẩm",
      dataIndex: "itemsCount",
      key: "itemsCount",
      width: 80,
      sorter: (a, b) => a.itemsCount - b.itemsCount,
    },
    {
      title: "Khách hàng",
      dataIndex: "user",
      key: "user",
      width: 120,
      render: (user) => user?.fullName || "-",
      sorter: (a, b) => a.user?.fullName.localeCompare(b.user?.fullName),
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalAmount",
      key: "totalAmount",
      width: 80,
      render: (text) => `$${formatNumber(parseFloat(text))}`,
      sorter: (a, b) => parseFloat(a.totalAmount) - parseFloat(b.totalAmount),
    },
    {
      title: "Tổng tiền cần thanh toán",
      dataIndex: "totalPaidAmount",
      key: "totalPaidAmount",
      width: 80,
      render: (text) => `$${formatNumber(parseFloat(text))}`,
      sorter: (a, b) => parseFloat(a.totalPaidAmount) - parseFloat(b.totalPaidAmount),
    },
    {
      title: "Lợi nhuận",
      dataIndex: "totalProfit",
      key: "totalProfit",
      width: 80,
      render: (text) => (text ? `$${formatNumber(parseFloat(text))}` : "-"),
      sorter: (a, b) => {
        const profitA = a.totalProfit ? parseFloat(a.totalProfit) : 0;
        const profitB = b.totalProfit ? parseFloat(b.totalProfit) : 0;
        return profitA - profitB;
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 110,
      render: (status) => {
        const statusMap: Record<
          string,
          {
            text: string;
            shortText: string;
            status: "default" | "success" | "warning" | "error";
          }
        > = {
          PENDING: {
            text: "Đang chờ xử lý",
            shortText: "Chờ xử lý",
            status: "warning",
          },
          CONFIRMED: {
            text: "Đã xác nhận",
            shortText: "Xác nhận",
            status: "default",
          },
          SHIPPING: {
            text: "Đang giao hàng",
            shortText: "Đang giao",
            status: "default",
          },
          DELIVERED: {
            text: "Đã giao hàng",
            shortText: "Đã giao",
            status: "success",
          },
          CANCELLED: { text: "Đã hủy", shortText: "Hủy", status: "error" },
        };
        const statusInfo = statusMap[status] || {
          text: status,
          shortText: status,
          status: "default",
        };
        return (
          <Badge
            status={statusInfo.status}
            text={isMobile ? statusInfo.shortText : statusInfo.text}
          />
        );
      },
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      title: "Thanh toán",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      width: 110,
      render: (paymentStatus) => {
        return (
          <Badge
            status={paymentStatus === "PAID" ? "success" : "warning"}
            text={
              paymentStatus === "PAID"
                ? isMobile
                  ? "Đã TT"
                  : "Đã thanh toán"
                : isMobile
                  ? "Chưa TT"
                  : "Chưa thanh toán"
            }
          />
        );
      },
      sorter: (a, b) => a.paymentStatus.localeCompare(b.paymentStatus),
    },
    {
      title: "Ngày thanh toán",
      dataIndex: "confirmedAt",
      key: "confirmedAt",
      width: 120,
      render: (confirmedAt) =>
        confirmedAt ? new Date(confirmedAt).toLocaleString() : "-",
      sorter: (a, b) => {
        if (!a.confirmedAt) return 1;
        if (!b.confirmedAt) return -1;
        return (
          new Date(a.confirmedAt).getTime() - new Date(b.confirmedAt).getTime()
        );
      },
    },
    {
      title: "Hành động",
      key: "action",
      width: 110,
      render: (_, record) => (
        <div className="flex items-center justify-center gap-6">
          {!isMobile ? <Tooltip title="Xem chi tiết">
            <span
              onClick={() => handleOpenDetail(record.orderCode)}
              style={{ cursor: "pointer", display: "inline-flex" }}
            >
              <Icon path={mdiEye} size={0.7} color={"#A3A3A3"} />
            </span>
          </Tooltip> : <span
            onClick={() => handleOpenDetail(record.orderCode)}
            style={{ cursor: "pointer", display: "inline-flex" }}
          >
            <Icon path={mdiEye} size={0.7} color={"#A3A3A3"} />
          </span>}
          {!isMobile ? <Tooltip title="In đơn hàng">
            <span
              onClick={() => handlePrintInvoice(record.orderCode)}
              style={{ cursor: "pointer", display: "inline-flex" }}
            >
              <Icon path={mdiPrinter} size={0.7} color={"#A3A3A3"} />
            </span>
          </Tooltip> : <span
            onClick={() => handlePrintInvoice(record.orderCode)}
            style={{ cursor: "pointer", display: "inline-flex" }}
          >
            <Icon path={mdiPrinter} size={0.7} color={"#A3A3A3"} />
          </span>}
        </div>
      ),
    },
  ];

  // Display visible columns based on screen size
  const getVisibleColumns = () => {
    if (isMobile) {
      // For mobile, only show these essential columns
      return columns.filter((col) =>
        ["orderCode", "status", "action"].includes(col.key as string)
      );
    }
    return columns;
  };

  const totalItems = ordersData?.data?.meta?.itemCount || 0;
  return (
    <div className="border p-4 bg-white rounded-md">
      <Row
        justify="space-between"
        align="middle"
        gutter={[12, 12]}
        style={{ marginBottom: 16 }}
      >
        <Col xs={24} sm={12}>
          <Space size="middle">
            <Title level={5} style={{ margin: 0 }}>
              Tất cả đơn hàng
            </Title>
            <Badge
              size="default"
              count={ordersData?.data?.data?.length || 0}
              showZero
              style={{ backgroundColor: "#1890ff" }}
            />
          </Space>
        </Col>
        <Col xs={24} sm={12}>
          <Space
            size="small"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Input
              placeholder="Nhập mã đơn hàng"
              prefix={<SearchOutlined style={{ color: "#636363" }} />}
              style={{ width: "100%", maxWidth: 250, borderRadius: "6px" }}
              allowClear
              onChange={(e: any) => setSearchText(e.target.value)}
              value={searchText}
            />
            <Select onValueChange={handleStatusChange} value={statusFilter}>
              <SelectTrigger className="w-[180px] h-10 rounded-sm">
                <SelectValue placeholder="Lọc trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PENDING">Đang chờ xử lý</SelectItem>
                <SelectItem value="CONFIRMED">Đã xác nhận</SelectItem>
                <SelectItem value="SHIPPING">Đang giao hàng</SelectItem>
                <SelectItem value="DELIVERED">Đã giao hàng</SelectItem>
                <SelectItem value="CANCELLED">Đã huỷ</SelectItem>
              </SelectContent>
            </Select>
          </Space>
        </Col>
      </Row>

      <Divider style={{ margin: "0 0 16px 0" }} />

      <Table
        columns={getVisibleColumns()}
        dataSource={
          Array.isArray(ordersData?.data?.data)
            ? ordersData.data.data.map((order: any) => ({
              key: order.id,
              time: new Date(order.orderTime).toLocaleString(),
              orderCode: order.id,
              totalAmount: order.totalAmount,
              user: order.user,
              status: order.status,
              delayStatus: order.delayStatus,
              paymentStatus: order.paymentStatus || "UNPAID",
              itemsCount: order.items.length,
              userId: order.userId,
              quantity: order.items.reduce(
                (acc: number, item: any) => acc + item.quantity,
                0
              ),
              confirmedAt: order.confirmedAt,
              totalProfit: order.totalProfit || null,
              totalPaidAmount: order.totalPaidAmount,
            }))
            : []
        }
        pagination={false}
        rowKey="key"
        scroll={{ x: "max-content" }}
        size={isMobile ? "small" : "middle"}
        rowClassName={() => "order-table-row"}
        style={{
          overflowX: "auto",
          tableLayout: "auto",
          width: "100%",
        }}
        bordered
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Chưa có đơn hàng"
            />
          ),
        }}
        loading={isLoading}
        expandable={{
          expandedRowKeys,
          onExpand: handleExpandRow,
          expandIcon: () => null, // We control expansion with our custom button
          expandIconColumnIndex: -1,
          expandedRowRender: (record: any) => (
            <div className="p-4 bg-gray-50">
              <p>
                <strong>Ngày đặt hàng:</strong> {record.time}
              </p>
              <p>
                <strong>Số sản phẩm:</strong> {record.itemsCount}
              </p>
              <p>
                <strong>Khách hàng:</strong> {record.user?.fullName}
              </p>
              <p>
                <strong>Tổng tiền:</strong> $
                {formatNumber(parseFloat(record.totalAmount))}
              </p>
              <p>
                <strong>Lợi nhuận:</strong>{" "}
                {record.totalProfit
                  ? `$${formatNumber(parseFloat(record.totalProfit))}`
                  : "-"}
              </p>
              <p>
                <strong>Thanh toán:</strong>{" "}
                <span
                  className={`${record.paymentStatus === "PAID"
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                    } px-2 py-1 rounded`}
                >
                  {record.paymentStatus === "PAID"
                    ? "Đã thanh toán"
                    : "Chưa thanh toán"}
                </span>
              </p>
              {record.confirmedAt && (
                <p>
                  <strong>Ngày thanh toán:</strong>{" "}
                  {new Date(record.confirmedAt).toLocaleString()}
                </p>
              )}
            </div>
          ),
        }}
      />

      <Row justify="space-between" align="middle" style={{ marginTop: 16 }}>
        <Col></Col>
        <Col>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalItems}
            showSizeChanger
            showQuickJumper={!isMobile}
            onChange={handlePaginationChange}
            onShowSizeChange={handlePaginationChange}
            style={{ marginTop: "16px" }}
            className="custom-pagination"
            size={isMobile ? "small" : "default"}
            simple={isMobile}
          />
        </Col>
      </Row>

      {selectedOrderId && (
        <OrderDetailDialog
          orderId={selectedOrderId}
          open={isDetailOpen}
          onOpenChange={setIsDetailOpen}
          isPrinting={isPrinting}
        />
      )}
    </div>
  );
};

export default OrdersTable;
