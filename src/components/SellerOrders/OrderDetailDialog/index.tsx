"use client"

import React from "react"
import { useGetOrderDetail } from "@/hooks/shop-products"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Divider, Badge, Spin } from "antd"
import JSBarcode from "jsbarcode"
import { QRCodeCanvas } from "qrcode.react"
import Image from "next/image"
interface OrderDetailDialogProps {
    orderId: string
    open: boolean
    onOpenChange: (open: boolean) => void
}

const OrderDetailDialog = ({ orderId, open, onOpenChange }: OrderDetailDialogProps) => {
    const { data: orderDetailData, isLoading } = useGetOrderDetail(orderId)
    const [barcodeSvg, setBarcodeSvg] = React.useState<string>("")
    console.log(orderDetailData)
    React.useEffect(() => {
        if (open) {
            const barcodeValue = `086af6e4641abb18caafc151b9aa95c8`
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
    }, [open])

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

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[1000px] p-0 bg-white rounded-md max-h-[90vh] overflow-y-auto">
                <div className="px-6 py-4">
                    <h2 className="text-xl font-bold">Chi tiết đơn hàng</h2>
                </div>

                <div className="px-6">
                    <div className="grid grid-cols-12 gap-4">
                        {/* Thông tin khách hàng */}
                        <div className="col-span-12 lg:col-span-4 border p-4 relative">

                            <div>
                                <p className="font-bold">{userInfo.name}</p>
                                <p>{userInfo.email}</p>
                                <p>{userInfo.phone}</p>
                                <p className="text-gray-600">{userInfo.address}</p>
                            </div>
                        </div>

                        {/* Trạng thái thanh toán */}
                        <div className="col-span-12 lg:col-span-8 border p-4 relative">

                            <div className="mb-2">
                                <p className="text-gray-600 mb-1">Tình trạng thanh toán</p>
                                <div className="flex gap-4">
                                    <div className={`py-2 px-4 font-medium ${order?.paymentStatus === 'PAID' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}>
                                        Đã nhận
                                    </div>
                                    <div className={`py-2 px-4 font-medium ${order?.paymentStatus === 'PAID' ? 'bg-gray-100' : 'bg-blue-500 text-white'}`}>
                                        Đã thanh toán
                                    </div>
                                </div>
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
                                    <p>Ví điện tử</p>
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
                                                src="/images/white-image.png" 
                                                alt="white-image" 
                                                width={100} height={100} />
                                        </td>
                                        <td className="py-4 px-4">
                                            30 Pack Lapel Headset Microphone Windscreen, Microphone Sponge Foam Cover Mini Size Lavalier Microphone Windscreen Pink
                                        </td>
                                        <td className="py-4 px-4 text-center">-</td>
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

                            <div className="mb-4">
                                {barcodeSvg && <img src={barcodeSvg} alt="Barcode" className="w-full h-auto" />}
                                <p className="text-center mt-1 text-sm">086af6e4641abb18caafc151b9aa95c8</p>
                            </div>
                            <div className="flex justify-between items-center mt-6">
                                <div>
                                    <p>r******************m</p>
                                    <p>p******************g</p>
                                    <p>+2******************43</p>
                                </div>
                                <div className="flex flex-col items-end">
                                    <p>Colombia</p>
                                    <QRCodeCanvas value="https://amazon-cms.vercel.app" size={80} />
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

                    {/* Thông tin hậu cần */}
                    <div className="border p-4 mb-6">
                        <h3 className="font-bold mb-4">Thông tin hậu cần</h3>
                        <div className="space-y-4">
                            {order?.statusHistory && order.statusHistory.map((history: any) => (
                                <div key={history.id} className="bg-green-50 p-3">
                                    <p>{formatDate(history.time)} {history.description}</p>
                                </div>
                            ))}
                            {order?.status === 'DELIVERED' && (
                                <div className="bg-green-50 p-3">
                                    <p>{formatDate(new Date().toISOString())} Người dùng đã ký tên và việc giao hàng đã được hoàn thành. Cảm ơn bạn đã chờ đợi.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default OrderDetailDialog 