import type React from "react"
import { Row, Col } from "antd"
import { useShopDetailStatistics } from "@/hooks/dashboard"
import { BoxSeamIcon, StarsIcon, ReceiptIcon, PersonHeartsIcon, EyeIcon } from "../mockData"
import { Package, DollarSign, ShoppingCart, Heart, Eye } from "lucide-react"
import { useGetMyShopProducts } from "@/hooks/shop-products"

const ShopInfo = () => {
  const { detailStatistics } = useShopDetailStatistics()
  const { data: shopProductsData } = useGetMyShopProducts({
    page: 1,
  });
  const totalItems = shopProductsData?.data?.meta?.itemCount || 0;
  const infoItems = [
    {
      icon: <Package className="h-5 w-5" />,
      value: totalItems || 0,
      label: "Sản phẩm",
      bgColor: "bg-purple-100",
      textColor: "text-purple-700",
      iconColor: "text-purple-500",
    },
    {
      icon: <DollarSign className="h-5 w-5" />,
      value: `$${(detailStatistics?.totalProfit || 0).toLocaleString('vi-VN')}`,
      label: "Lợi nhuận",
      bgColor: "bg-amber-100",
      textColor: "text-amber-700",
      iconColor: "text-amber-500",
    },
    {
      icon: <ShoppingCart className="h-5 w-5" />,
      value: detailStatistics?.totalOrders || 0,
      label: "Đơn hàng",
      bgColor: "bg-cyan-100",
      textColor: "text-cyan-700",
      iconColor: "text-cyan-500",
    },
    {
      icon: <Heart className="h-5 w-5" />,
      value: detailStatistics?.totalSales || 0,
      label: "Lượt bán",
      bgColor: "bg-rose-100",
      textColor: "text-rose-700",
      iconColor: "text-rose-500",
    },
    {
      icon: <Eye className="h-5 w-5" />,
      value: detailStatistics?.totalViews || 0,
      label: "Lượt xem",
      bgColor: "bg-green-100",
      textColor: "text-green-700",
      iconColor: "text-green-500",
    },
  ]

  return (
    <div className="rounded-xl bg-white p-5 h-full border border-gray-100 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Thông tin cửa hàng</h3>
        <p className="text-sm text-gray-500 mt-1">Tổng quan hoạt động cửa hàng</p>
      </div>

      <Row gutter={[16, 16]} className="mt-3">
        {infoItems.map((item, index) => (
          <Col xs={24} sm={12} key={index}>
            <div className="flex items-center p-3 rounded-lg transition-all duration-200 hover:bg-gray-50">
              <div className={`w-10 h-10 flex-shrink-0 rounded-lg mr-3 flex justify-center items-center ${item.bgColor}`}>
                <span className={item.iconColor}>{item.icon}</span>
              </div>
              <div>
                <h5 className={`text-lg font-bold ${item.textColor} m-0`}>{item.value}</h5>
                <span className="text-xs font-medium text-gray-500">{item.label}</span>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default ShopInfo

