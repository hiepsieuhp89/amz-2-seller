"use client"

import React from "react"
import { useGetOrderDetail } from "@/hooks/shop-products"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Divider, Badge, Spin } from "antd"
import JSBarcode from "jsbarcode"
import { QRCodeCanvas } from "qrcode.react"
import Image from "next/image"
import Icon from "@mdi/react"
import { mdiPrinter } from "@mdi/js"
import { Button } from "@/components/ui/button"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import { useEffect } from "react"

interface OrderDetailDialogProps {
    orderId: string
    open: boolean
    onOpenChange: (open: boolean) => void
}

const OrderDetailDialog = ({ orderId, open, onOpenChange }: OrderDetailDialogProps) => {
    const { data: orderDetailData, isLoading } = useGetOrderDetail(orderId)
    const [barcodeSvg, setBarcodeSvg] = React.useState<string>("")
    const [isPrinting, setIsPrinting] = React.useState<boolean>(false)
    useEffect(() => {
        if (open && orderDetailData?.data?.id) {
            const barcodeValue = orderDetailData.data.id
            const canvas = document.createElement('canvas')
            JSBarcode(canvas, barcodeValue, {
                format: "CODE128",
                lineColor: "#000",
                width: 1.5,
                height: 50,
                displayValue: false
            })
            setBarcodeSvg(canvas.toDataURL("image/png"))
        }
    }, [open, orderDetailData?.data?.id])

    const handlePrintInvoice = async () => {
        try {
            // Đặt trạng thái in thành true và đợi React cập nhật DOM
            setIsPrinting(true)

            // Đợi React cập nhật DOM trước khi tiếp tục
            await new Promise(resolve => setTimeout(resolve, 100))

            // Hiển thị thông báo đang xử lý
            const processingMsg = document.createElement('div')
            processingMsg.style.position = 'fixed'
            processingMsg.style.top = '50%'
            processingMsg.style.left = '50%'
            processingMsg.style.transform = 'translate(-50%, -50%)'
            processingMsg.style.padding = '20px'
            processingMsg.style.background = 'rgba(0,0,0,0.7)'
            processingMsg.style.color = 'white'
            processingMsg.style.borderRadius = '5px'
            processingMsg.style.zIndex = '9999'
            processingMsg.textContent = 'Đang tạo PDF...'
            document.body.appendChild(processingMsg)

            try {
                const input = document.getElementById("preview");
                if (!input) throw new Error("Preview element not found");

                // Sử dụng html2canvas để chuyển đổi DOM thành canvas
                const canvas = await html2canvas(input, {
                    scale: 1.5,
                    logging: false,
                    useCORS: true,
                    allowTaint: true,
                    scrollY: -window.scrollY
                })

                // Tạo PDF từ canvas
                const imgData = canvas.toDataURL('image/png')
                const pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'mm',
                    format: 'a4'
                })

                const pageWidth = pdf.internal.pageSize.getWidth()
                const pageHeight = pdf.internal.pageSize.getHeight()
                const imgWidth = pageWidth
                const imgHeight = (canvas.height * imgWidth) / canvas.width

                // Thêm ảnh vào PDF
                pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)

                // Xử lý nếu nội dung vượt quá một trang
                if (imgHeight > pageHeight) {
                    let heightLeft = imgHeight - pageHeight
                    let position = -pageHeight

                    while (heightLeft > 0) {
                        pdf.addPage()
                        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
                        heightLeft -= pageHeight
                        position -= pageHeight
                    }
                }

                // Lưu file PDF
                pdf.save(`don-hang-${orderId.substring(0, 8)}.pdf`)
            } catch (err) {
                console.error("Lỗi khi tạo PDF:", err)
                alert("Đã xảy ra lỗi khi tạo PDF. Vui lòng thử lại sau.")
            } finally {
                // Xóa thông báo đang xử lý
                if (processingMsg && processingMsg.parentNode) {
                    processingMsg.parentNode.removeChild(processingMsg)
                }
                // Đặt trạng thái in thành false
                setIsPrinting(false)
            }
        } catch (err) {
            console.error("Lỗi:", err)
            alert("Đã xảy ra lỗi. Vui lòng thử lại sau.")
            // Đảm bảo xóa thông báo đang xử lý nếu có lỗi
            const processingMsg = document.querySelector('div[style*="position: fixed"][style*="z-index: 9999"]')
            if (processingMsg && processingMsg.parentNode) {
                processingMsg.parentNode.removeChild(processingMsg)
            }
            setIsPrinting(false)
        }
    }

    if (isLoading) {
        return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-[1000px] p-0 bg-white rounded-md">
                    <div className="flex justify-center items-center h-[300px]">
                        <Spin size="small" />
                    </div>
                </DialogContent>
            </Dialog>
        )
    }

    if (!orderDetailData?.data) {
        return null
    }

    const order = orderDetailData.data

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        })
    }

    const getUserInfo = () => {
        return {
            name: order?.user?.fullName || "Prof. Tiara O'Hara",
            email: order?.user?.email || "rem***************",
            phone: order?.user?.phone || "+23*************",
            address: order?.address || "*****************************************, ****, *******"
        }
    }

    const userInfo = getUserInfo()

    const getOrderStatusVN = (status: string) => {
        const statusMap: Record<string, string> = {
            'PENDING': 'Đang chờ xử lý',
            'CONFIRMED': 'Đã xác nhận',
            'SHIPPING': 'Đang giao hàng',
            'DELIVERED': 'Đã giao hàng',
            'CANCELLED': 'Đã hủy'
        }
        return statusMap[status] || status
    }

    const maskUserInfo = (info: string, type: 'name' | 'email' | 'phone' | 'address') => {
        if (!info) return '';

        switch (type) {
            case 'name':
                // Giữ lại 3 ký tự đầu, còn lại thay bằng *
                return info.substring(0, 3) + '*'.repeat(Math.max(0, info.length - 3));
            case 'email':
                // Giữ lại phần đầu trước @ và thay phần còn lại bằng *
                const atIndex = info.indexOf('@');
                if (atIndex === -1) return info.substring(0, 3) + '*'.repeat(Math.max(0, info.length - 3));
                const domain = info.substring(atIndex);
                const username = info.substring(0, atIndex);
                return username.substring(0, 3) + '*'.repeat(Math.max(0, username.length - 3)) + domain;
            case 'phone':
                // Giữ lại 3 số đầu và 2 số cuối
                return info.substring(0, 3) + '*'.repeat(Math.max(0, info.length - 5)) + info.slice(-2);
            case 'address':
                // Thay lại 3 số đầu và 2 số cuối
                return info.substring(0, 3) + '**********' + info.slice(-2);
            default:
                return info;
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[1000px] p-0 bg-white rounded-md max-h-[90vh] overflow-y-auto">
                <div id="preview">
                    <div className="px-6 py-4 border-b border-b-gray-200 flex justify-between items-center">
                        <h2 className="text-xl font-bold">Chi tiết đơn hàng</h2>
                    </div>

                    <div className="px-6 mt-6">
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-12 lg:col-span-5 border p-4 relative">
                                <div>
                                    <p className="font-bold">{maskUserInfo(userInfo.name, 'name')}</p>
                                    <p>{maskUserInfo(userInfo.email, 'email')}</p>
                                    <p>{maskUserInfo(userInfo.phone, 'phone')}</p>
                                    <p className="text-gray-600">{maskUserInfo(userInfo.address, 'address')}</p>
                                </div>
                            </div>

                            {/* Trạng thái thanh toán */}
                            <div className="col-span-12 lg:col-span-7 border p-4 relative">
                                <div className="mb-2">
                                    <p className="text-gray-600 mb-1">Tình trạng thanh toán</p>
                                    {isPrinting ? (
                                        <div className="flex gap-4">
                                            {/* <p className="py-2 px-4 font-medium">
                                                {order?.paymentStatus === 'PAID' ? '✓ Đã nhận' : '○ Đã nhận'}
                                            </p> */}
                                            <p className="py-2 px-4 font-medium">
                                                {order?.paymentStatus === 'PAID' ? '○ Đã thanh toán' : '✓ Đã thanh toán'}
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="flex gap-4">
                                            {/* <div className={`py-2 px-4 font-medium ${order?.paymentStatus === 'PAID' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}>
                                                Đã nhận
                                            </div> */}
                                            <div className={`py-2 px-4 font-medium ${order?.paymentStatus === 'PAID' ? 'bg-gray-100' : 'bg-blue-500 text-white'}`}>
                                                Đã thanh toán
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-gray-600">Đặt hàng #</p>
                                        <p>{order?.id.substring(0, 8)}-{order?.id.substring(24, 32)}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Tình trạng đặt hàng</p>
                                        <Badge color={order?.status === 'DELIVERED' ? 'green' : 'blue'} text={getOrderStatusVN(order?.status || '')} />
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Ngày đặt hàng</p>
                                        <p>{formatDate(order?.orderTime || order?.createdAt || '')}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Tổng cộng</p>
                                        <p className="font-semibold">${order?.totalAmount}</p>
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
                        <div className="my-6 border relative overflow-hidden">

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
                                    {order?.items && order.items.map((item: any, index: number) => (
                                        <tr key={item.id} className="border-t">
                                            <td className="py-4 px-4">{index + 1}</td>
                                            <td className="py-4 px-4">
                                                <Image
                                                    quality={100}
                                                    draggable={false}
                                                    src={item?.shopProduct?.product?.imageUrls[0] || "/images/white-image.png"}
                                                    alt="white-image"
                                                    width={100} height={100} />
                                            </td>
                                            <td className="py-4 px-4">
                                                {item?.shopProduct?.product?.name || item?.shopProduct?.name || 'Sản phẩm'}
                                            </td>
                                            <td className="py-4 px-4 text-center">{item?.deliveryType || '-'}</td>
                                            <td className="py-4 px-4 text-center">{item.quantity}</td>
                                            <td className="py-4 px-4 text-right">${item.price}</td>
                                            <td className="py-4 px-4 text-right">${item.totalAmount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                            {/* Mã vạch và QR code */}
                            <div className="border p-4 relative">
                                <h3 className="font-bold mb-3">Thông tin mã hóa</h3>
                                <div className="flex flex-col md:flex-row gap-4">
                                    <div className="flex-1">
                                        <div className="mb-3">
                                            {barcodeSvg && <img src={barcodeSvg} alt="Barcode" className="w-full h-auto max-w-full" />}
                                            <p className="text-center mt-1 text-sm">{order?.id || ''}</p>
                                        </div>
                                        <div className="mt-4">
                                            <p className="font-medium">Thông tin khách hàng:</p>
                                            <p>{maskUserInfo(userInfo.name, 'name')}</p>
                                            <p>{maskUserInfo(userInfo.email, 'email')}</p>
                                            <p>{maskUserInfo(userInfo.phone, 'phone')}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center justify-center">
                                        <p className="mb-2 text-center">{order?.user?.countryId || '-'}</p>
                                        <QRCodeCanvas value={`${window.location.origin}/orders?id=${order?.id}`} size={100} />
                                        <p className="text-center mt-1 text-xs text-gray-500">Mã QR đơn hàng</p>
                                    </div>
                                </div>
                            </div>

                            {/* Thông tin giá */}
                            <div className="border p-4 relative">
                                <div className="space-y-3">
                                    <div className="flex justify-between py-1">
                                        <span className="text-gray-600">Giá nhà kho:</span>
                                        <span>${(parseFloat(order?.totalAmount || '0') * 0.8).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between py-1">
                                        <span className="text-gray-600">Lợi nhuận:</span>
                                        <span>${order?.totalProfit}</span>
                                    </div>
                                    <div className="flex justify-between py-1">
                                        <span className="text-gray-600">Tổng phụ:</span>
                                        <span>${order?.totalAmount}</span>
                                    </div>
                                    <div className="flex justify-between py-1">
                                        <span className="text-gray-600">Thuế:</span>
                                        <span>$0.00</span>
                                    </div>
                                    <div className="flex justify-between py-1">
                                        <span className="text-gray-600">Đang chuyển hàng:</span>
                                        <span>$0.00</span>
                                    </div>
                                    <div className="flex justify-between py-1">
                                        <span className="text-gray-600">Phiếu mua hàng:</span>
                                        <span>$0.00</span>
                                    </div>
                                    <Divider className="my-2" />
                                    <div className="flex justify-between py-1 font-bold">
                                        <span className="text-gray-600">TOÀN BỘ:</span>
                                        <span>${order?.totalAmount}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Thông tin hậu cần */}
                <div className="px-6">
                    <div className="border p-4">
                        <h3 className="font-bold mb-4">Thông tin hậu cần</h3>
                        <div className="relative">
                            {/* Vertical timeline line */}
                            <div className="absolute left-[7px] top-0 bottom-0 w-[2px] bg-gray-200"></div>
                            
                            <div className="space-y-6">
                                {order?.statusHistory && order.statusHistory.map((history: any, index: number) => (
                                    <div key={history.id} className="flex items-start gap-4">
                                        {/* Timeline dot */}
                                        <div className="relative z-10 mt-1">
                                            <div className={`w-4 h-4 rounded-full ${index === 0 ? 'bg-blue-500' : 'bg-green-500'} border-2 border-white`}></div>
                                        </div>
                                        
                                        {/* Content */}
                                        <div className="flex-1 bg-gray-50 p-3 rounded-md border border-gray-100 shadow-sm">
                                            <p className="text-sm text-gray-500 mb-1">{formatDate(history.time)}</p>
                                            <p className="font-medium">{history.description}</p>
                                        </div>
                                    </div>
                                ))}
                                
                                {order?.status === 'DELIVERED' && (
                                    <div className="flex items-start gap-4">
                                        {/* Timeline dot */}
                                        <div className="relative z-10 mt-1">
                                            <div className="w-4 h-4 rounded-full bg-green-600 border-2 border-white"></div>
                                        </div>
                                        
                                        {/* Content */}
                                        <div className="flex-1 bg-green-50 p-3 rounded-md border border-green-100 shadow-sm">
                                            <p className="text-sm text-gray-500 mb-1">{formatDate(new Date().toISOString())}</p>
                                            <p className="font-medium">Người dùng đã ký tên và việc giao hàng đã được hoàn thành. Cảm ơn bạn đã chờ đợi.</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end w-full my-6 px-6">
                    <Button
                        onClick={handlePrintInvoice}
                        className="flex items-center h-10 w-10 rounded-sm bg-[#3B82F6] hover:bg-[#3B82F6]/80"
                    >
                        <Icon path={mdiPrinter} size={1} />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default OrderDetailDialog
