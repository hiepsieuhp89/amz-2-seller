"use client";

import React from "react";
import { useGetOrderDetail } from "@/hooks/shop-products";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Divider, Badge, Spin } from "antd";
import JSBarcode from "jsbarcode";
import { QRCodeCanvas } from "qrcode.react";
import Image from "next/image";
import Icon from "@mdi/react";
import { mdiPrinter, mdiPlus, mdiMinus, mdiChevronRight } from "@mdi/js";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useEffect } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import Link from "next/link";
import { formatDate, formatNumber } from "@/utils";

interface OrderDetailDialogProps {
  orderId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isPrinting?: boolean;
}

const OrderDetailDialog = ({
  orderId,
  open,
  onOpenChange,
  isPrinting = false,
}: OrderDetailDialogProps) => {
  const { data: orderDetailData, isLoading } = useGetOrderDetail(orderId);
  const [barcodeSvg, setBarcodeSvg] = React.useState<string>("");
  const [localIsPrinting, setLocalIsPrinting] = React.useState<boolean>(false);
  const isMobile = useMediaQuery("(max-width: 640px)");
  const [expandedItems, setExpandedItems] = React.useState<
    Record<string, boolean>
  >({});
  const previewRef = React.useRef<HTMLDivElement>(null);

  // Use either local state or prop for printing state
  const effectiveIsPrinting = isPrinting || localIsPrinting;

  useEffect(() => {
    if (open && orderDetailData?.data?.id) {
      const barcodeValue = orderDetailData.data.id;
      const canvas = document.createElement("canvas");
      JSBarcode(canvas, barcodeValue, {
        format: "CODE128",
        lineColor: "#000",
        width: 1.5,
        height: 50,
        displayValue: false,
      });
      setBarcodeSvg(canvas.toDataURL("image/png"));
    }
  }, [open, orderDetailData?.data?.id]);

  // Add data-loaded attribute to preview for easier detection
  useEffect(() => {
    if (previewRef.current && orderDetailData?.data) {
      previewRef.current.setAttribute('data-loaded', 'true');
    }
  }, [orderDetailData?.data]);

  const handlePrintInvoice = async () => {
    try {
      // Đặt trạng thái in thành true và đợi React cập nhật DOM
      setLocalIsPrinting(true);

      // Đợi React cập nhật DOM trước khi tiếp tục
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Hiển thị thông báo đang xử lý
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

      try {
        const input = document.getElementById("preview");
        if (!input) throw new Error("Preview element not found");

        // Sử dụng html2canvas để chuyển đổi DOM thành canvas
        const canvas = await html2canvas(input, {
          scale: 1.5,
          logging: false,
          useCORS: true,
          allowTaint: true,
          scrollY: -window.scrollY,
        });

        // Tạo PDF từ canvas
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

        // Thêm ảnh vào PDF
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

        // Xử lý nếu nội dung vượt quá một trang
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

        // Lưu file PDF
        pdf.save(`don-hang-${orderId.substring(0, 8)}.pdf`);
      } catch (err) {
        console.error("Lỗi khi tạo PDF:", err);
        alert("Đã xảy ra lỗi khi tạo PDF. Vui lòng thử lại sau.");
      } finally {
        // Xóa thông báo đang xử lý
        if (processingMsg && processingMsg.parentNode) {
          processingMsg.parentNode.removeChild(processingMsg);
        }
        // Đặt trạng thái in thành false
        setLocalIsPrinting(false);
      }
    } catch (err) {
      console.error("Lỗi:", err);
      alert("Đã xảy ra lỗi. Vui lòng thử lại sau.");
      // Đảm bảo xóa thông báo đang xử lý nếu có lỗi
      const processingMsg = document.querySelector(
        'div[style*="position: fixed"][style*="z-index: 9999"]'
      );
      if (processingMsg && processingMsg.parentNode) {
        processingMsg.parentNode.removeChild(processingMsg);
      }
      setLocalIsPrinting(false);
    }
  };

  const toggleItemExpand = (itemId: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  // Function to truncate text to 4 lines max
  const truncateProductName = (name: string) => {
    // Average characters per line based on mobile view width
    const avgCharsPerLine = 25;
    const maxChars = avgCharsPerLine * 4;

    if (name.length <= maxChars) return name;

    return name.substring(0, maxChars) + "...";
  };

  if (isLoading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[1000px] p-0 bg-white rounded-md">
          <div className="flex justify-center items-center h-[300px]">
            <Spin size="small" />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!orderDetailData?.data) {
    return null;
  }

  const order = orderDetailData.data;

  const formatOrderDate = (dateString: string) => {
    return formatDate(dateString, "datetime-full");
  };

  const getUserInfo = () => {
    return {
      name: order?.user?.fullName || "Prof. Tiara O'Hara",
      email: order?.user?.email || "rem***************",
      phone: order?.user?.phone || "+23*************",
      address:
        order?.address ||
        "*****************************************, ****, *******",
    };
  };

  const userInfo = getUserInfo();

  const getOrderStatusVN = (status: string) => {
    const statusMap: Record<string, string> = {
      PENDING: "Đang chờ xử lý",
      CONFIRMED: "Đã xác nhận",
      SHIPPING: "Đang giao hàng",
      DELIVERED: "Đã giao hàng",
      CANCELLED: "Đã hủy",
    };
    return statusMap[status] || status;
  };

  const maskUserInfo = (
    info: string,
    type: "name" | "email" | "phone" | "address"
  ) => {
    if (!info) return "";

    switch (type) {
      case "name":
        // Giữ lại 3 ký tự đầu, còn lại thay bằng *
        return info.substring(0, 3) + "*".repeat(Math.max(0, info.length - 3));
      case "email":
        // Giữ lại phần đầu trước @ và thay phần còn lại bằng *
        const atIndex = info.indexOf("@");
        if (atIndex === -1)
          return (
            info.substring(0, 3) + "*".repeat(Math.max(0, info.length - 3))
          );
        const domain = info.substring(atIndex);
        const username = info.substring(0, atIndex);
        return (
          username.substring(0, 3) +
          "*".repeat(Math.max(0, username.length - 3)) +
          domain
        );
      case "phone":
        // Giữ lại 3 số đầu và 2 số cuối
        return (
          info.substring(0, 3) +
          "*".repeat(Math.max(0, info.length - 5)) +
          info.slice(-2)
        );
      case "address":
        // Thay lại 3 số đầu và 2 số cuối
        return info.substring(0, 3) + "**********" + info.slice(-2);
      default:
        return info;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`sm:max-w-[1000px] p-0 bg-white rounded-md max-h-[90vh] overflow-y-auto ${
          isMobile ? "max-w-full" : ""
        }`}
      >
        <div id="preview" ref={previewRef} data-loaded={!!orderDetailData?.data}>
          {!orderDetailData?.data && isPrinting ? (
            <div className="flex justify-center items-center h-[300px]">
              <Spin size="small" />
              <span className="ml-2">Đang tải dữ liệu đơn hàng...</span>
            </div>
          ) : (
            <>
              <div className="px-4 sm:px-6 py-4 border-b border-b-gray-200 flex justify-between items-center">
                <h2 className="text-lg sm:text-xl font-bold">Chi tiết đơn hàng</h2>
              </div>

              <div className="px-4 sm:px-6 mt-4 sm:mt-6">
                <div className="grid grid-cols-12 gap-3 sm:gap-4">
                  <div className="col-span-12 lg:col-span-5 border p-3 sm:p-4 relative">
                    <div>
                      <p className="font-bold">
                        {userInfo.name}
                      </p>
                      <p>{maskUserInfo(userInfo.email, "email")}</p>
                      <p>{maskUserInfo(userInfo.phone, "phone")}</p>
                      <p className="text-gray-600">
                        {userInfo.address}
                      </p>
                    </div>
                  </div>

                  {/* Trạng thái thanh toán */}
                  <div className="col-span-12 lg:col-span-7 border p-3 sm:p-4 relative">
                    <div className="mb-2">
                      <p className="text-gray-600 mb-1">Tình trạng thanh toán</p>
                      {effectiveIsPrinting ? (
                        <div className="flex gap-4">
                          <p className="py-2 px-4 font-medium">
                            {order?.paymentStatus === "PAID"
                              ? "○ Đã thanh toán"
                              : "✓ Đã thanh toán"}
                          </p>
                        </div>
                      ) : (
                        <div className="flex gap-4">
                          <div
                            className={`py-1 px-2 sm:py-2 sm:px-4 text-sm sm:text-base font-medium ${
                              order?.paymentStatus === "PAID"
                                ? "bg-gray-100"
                                : "bg-blue-500 text-white"
                            }`}
                          >
                            Đã thanh toán
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
                      <div>
                        <p className="text-gray-600">Đặt hàng #</p>
                        <p>
                          {order?.id.substring(0, 8)}-{order?.id.substring(24, 32)}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Tình trạng đặt hàng</p>
                        <Badge
                          color={order?.status === "DELIVERED" ? "green" : "blue"}
                          text={getOrderStatusVN(order?.status || "")}
                        />
                      </div>
                      <div>
                        <p className="text-gray-600">Ngày đặt hàng</p>
                        <p className="break-words">
                          {formatOrderDate(
                            order?.orderTime || order?.createdAt || ""
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Tổng cộng</p>
                        <p className="font-semibold">${formatNumber(parseFloat(order?.totalAmount || "0"))}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Phương thức thanh toán</p>
                        <p>Logistics Wallet</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Thông tin bổ sung</p>
                        <p>-</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Thông tin sản phẩm */}
                <div className="my-4 sm:my-6 border relative overflow-x-auto">
                  {isMobile ? (
                    <div className="p-2">
                      {order?.items &&
                        order.items.map((item: any, index: number) => (
                          <div key={item.id} className="border-b py-3">
                            <div className="flex items-center mb-2">
                              <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs mr-2">
                                {index + 1}
                              </span>
                              <div className="flex-1">
                                <Link
                                  href={`${
                                    process.env.NEXT_PUBLIC_HOME_URL
                                  }/product?id=${
                                    item?.shopProduct?.product?.id ||
                                    item?.shopProduct?.id
                                  }`}
                                  className="font-medium text-sm line-clamp-4 text-blue-600"
                                >
                                  {truncateProductName(
                                    item?.shopProduct?.product?.name ||
                                      item?.shopProduct?.name ||
                                      "Sản phẩm"
                                  )}
                                </Link>
                              </div>
                              <button
                                onClick={() => toggleItemExpand(item.id)}
                                className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-full"
                              >
                                <Icon
                                  path={expandedItems[item.id] ? mdiMinus : mdiPlus}
                                  size={0.7}
                                />
                              </button>
                            </div>
                            <div className="flex">
                              <div className="w-20 h-20 relative mr-3">
                                <Image
                                  quality={80}
                                  draggable={false}
                                  src={
                                    item?.shopProduct?.product?.imageUrls[0] ||
                                    "/images/white-image.png"
                                  }
                                  alt="product-image"
                                  fill
                                  style={{ objectFit: "contain" }}
                                />
                              </div>
                              {expandedItems[item.id] && (
                                <div className="flex-1">
                                  <div className="flex justify-between text-xs mb-1">
                                    <span className="text-gray-600">
                                      Loại giao hàng:
                                    </span>
                                    <span>{item?.deliveryType || "-"}</span>
                                  </div>
                                  <div className="flex justify-between text-xs mb-1">
                                    <span className="text-gray-600">Số lượng:</span>
                                    <span>{formatNumber(item.quantity)}</span>
                                  </div>
                                  <div className="flex justify-between text-xs mb-1">
                                    <span className="text-gray-600">Giá bán:</span>
                                    <span>${formatNumber(item.price)}</span>
                                  </div>
                                  <div className="flex justify-between text-xs font-medium">
                                    <span className="text-gray-600">Tổng:</span>
                                    <span>${formatNumber(item.totalAmount)}</span>
                                  </div>
                                </div>
                              )}
                              {!expandedItems[item.id] && (
                                <div className="flex-1 flex items-center">
                                  <div className="ml-2 text-sm text-gray-500">
                                    SL: {formatNumber(item.quantity)} | ${formatNumber(item.totalAmount)}
                                  </div>
                                  <Icon
                                    path={mdiChevronRight}
                                    size={0.7}
                                    className="ml-auto text-gray-400"
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 text-gray-600">
                        <tr>
                          <th className="py-3 px-4 text-left">#</th>
                          <th className="py-3 px-4 text-left">Hình ảnh</th>
                          <th className="py-3 px-4 text-left">SỰ MIÊU TẢ</th>
                          <th className="py-3 px-4 text-center">LOẠI GIAO HÀNG</th>
                          <th className="py-3 px-4 text-center">QTY</th>
                          <th className="py-3 px-4 text-right">GIÁ BÁN</th>
                          <th className="py-3 px-4 text-right">TOÀN BỘ</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order?.items &&
                          order.items.map((item: any, index: number) => (
                            <tr key={item.id} className="border-t">
                              <td className="py-4 px-4">{index + 1}</td>
                              <td className="py-4 px-4">
                                <Image
                                  quality={100}
                                  draggable={false}
                                  src={
                                    item?.shopProduct?.product?.imageUrls[0] ||
                                    "/images/white-image.png"
                                  }
                                  alt="white-image"
                                  width={100}
                                  height={100}
                                />
                              </td>
                              <td className="py-4 px-4">
                                <Link
                                  href={`${
                                    process.env.NEXT_PUBLIC_HOME_URL
                                  }/product?id=${
                                    item?.shopProduct?.product?.id ||
                                    item?.shopProduct?.id
                                  }`}
                                  className="text-blue-600 hover:underline"
                                >
                                  {item?.shopProduct?.product?.name ||
                                    item?.shopProduct?.name ||
                                    "Sản phẩm"}
                                </Link>
                              </td>
                              <td className="py-4 px-4 text-center">
                                {item?.deliveryType || "-"}
                              </td>
                              <td className="py-4 px-4 text-center">
                                {formatNumber(item.quantity)}
                              </td>
                              <td className="py-4 px-4 text-right">
                                ${formatNumber(item.price)}
                              </td>
                              <td className="py-4 px-4 text-right">
                                ${formatNumber(item.totalAmount)}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                  {/* Mã vạch và QR code */}
                  <div className="border p-3 sm:p-4 relative">
                    <h3 className="font-bold mb-2 sm:mb-3 text-sm sm:text-base">
                      Thông tin mã hóa
                    </h3>
                    <div className="flex flex-col gap-3 sm:gap-4">
                      <div className="mb-2 sm:mb-3">
                        {barcodeSvg && (
                          <img
                            src={barcodeSvg}
                            alt="Barcode"
                            className="w-full h-auto max-w-full"
                          />
                        )}
                        <p className="text-center mt-1 text-xs sm:text-sm">
                          {order?.id || ""}
                        </p>
                      </div>
                      <div className="flex items-center justify-center flex-wrap sm:flex-nowrap">
                        <div className="flex-1 mb-3 sm:mb-0">
                          <div className="mt-2 sm:mt-4">
                            <p className="font-medium text-sm">
                              Thông tin khách hàng:
                            </p>
                            <p className="text-xs sm:text-sm">
                              {userInfo.name}
                            </p>
                            <p className="text-xs sm:text-sm">
                              {maskUserInfo(userInfo.email, "email")}
                            </p>
                            <p className="text-xs sm:text-sm">
                              {maskUserInfo(userInfo.phone, "phone")}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-center justify-center w-full sm:w-auto">
                          <QRCodeCanvas
                            value={`${window.location.origin}/orders?id=${order?.id}`}
                            size={isMobile ? 80 : 100}
                          />
                          <p className="text-center mt-1 text-xs text-gray-500">
                            Mã QR đơn hàng
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Thông tin giá */}
                  <div className="border p-3 sm:p-4 relative">
                    <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                      <div className="flex justify-between py-1">
                        <span className="text-gray-600">Giá nhà kho:</span>
                        <span>
                          ${formatNumber((parseFloat(order?.totalAmount || "0") * 0.8))}
                        </span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-gray-600">Lợi nhuận:</span>
                        <span>${formatNumber(parseFloat(order?.totalProfit || "0"))}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-gray-600">Tổng phụ:</span>
                        <span>${formatNumber(parseFloat(order?.totalAmount || "0"))}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-gray-600">Thuế:</span>
                        <span>${formatNumber(0)}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-gray-600">Đang chuyển hàng:</span>
                        <span>${formatNumber(0)}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-gray-600">Phiếu mua hàng:</span>
                        <span>${formatNumber(0)}</span>
                      </div>
                      <Divider className="my-1 sm:my-2" />
                      <div className="flex justify-between py-1 font-bold">
                        <span className="text-gray-600">TOÀN BỘ:</span>
                        <span>${formatNumber(parseFloat(order?.totalAmount || "0"))}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Thông tin hậu cần */}
        <div className="px-4 sm:px-6">
          <div className="border p-3 sm:p-4">
            <h3 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">
              Thông tin hậu cần
            </h3>
            <div className="relative">
              {/* Vertical timeline line */}
              <div className="absolute left-[7px] top-0 bottom-0 w-[2px] bg-gray-200"></div>

              <div className="space-y-4 sm:space-y-6">
                {order?.statusHistory &&
                  order.statusHistory.map((history: any, index: number) => (
                    <div
                      key={history.id}
                      className="flex items-start gap-3 sm:gap-4"
                    >
                      {/* Timeline dot */}
                      <div className="relative z-10 mt-1">
                        <div
                          className={`w-4 h-4 rounded-full ${
                            index === 0 ? "bg-blue-500" : "bg-green-500"
                          } border-2 border-white`}
                        ></div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 bg-gray-50 p-2 sm:p-3 rounded-md border border-gray-100 shadow-sm">
                        <p className="text-xs sm:text-sm text-gray-500 mb-1">
                          {formatOrderDate(history.time)}
                        </p>
                        <p className="font-medium text-xs sm:text-sm">
                          {history.description}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        {/* Only show print button if not in printing mode */}
        {!effectiveIsPrinting && (
          <div className="flex justify-end w-full my-4 sm:my-6 px-4 sm:px-6">
            <Button
              onClick={handlePrintInvoice}
              className="flex items-center h-8 w-8 sm:h-10 sm:w-10 rounded-sm bg-[#3B82F6] hover:bg-[#3B82F6]/80"
            >
              <Icon path={mdiPrinter} size={isMobile ? 0.8 : 1} />
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailDialog;
