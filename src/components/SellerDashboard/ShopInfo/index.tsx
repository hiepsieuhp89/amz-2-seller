import type React from "react"
import { Card, Row, Col } from "antd"
import type { ShopInfoData } from "../types"
import { BoxSeamIcon, StarsIcon, ReceiptIcon, PersonHeartsIcon, EyeIcon } from "../mockData"

interface ShopInfoProps {
  data: ShopInfoData
}

const ShopInfo = ({ data }: ShopInfoProps) => {
  const infoItems = [
    {
      icon: <BoxSeamIcon />,
      value: data.totalProducts,
      label: "Các sản phẩm",
      bgColor: "bg-[#eee5ff]",
      iconColor: "text-[#a276fd]",
    },
    {
      icon: <StarsIcon />,
      value: data.totalProfit,
      label: "Tổng Lợi Nhuận",
      bgColor: "bg-[#fff0a3]",
      iconColor: "text-[#ffd700]",
    },
    {
      icon: <ReceiptIcon />,
      value: data.totalOrders,
      label: "Tổng số đơn đặt hàng",
      bgColor: "bg-[#c9f7f5]",
      iconColor: "text-[#1bc5bd]",
    },
    {
      icon: <PersonHeartsIcon />,
      value: data.totalSales,
      label: "Tổng Lượt Bán",
      bgColor: "bg-[#ffe2e5]",
      iconColor: "text-[#f64e60]",
    },
    {
      icon: <EyeIcon />,
      value: data.totalViews,
      label: "Lượt xem",
      bgColor: "bg-[#9DDE8B]",
      iconColor: "text-[#40A578]",
    },
  ]

  return (
    <Card style={{ borderRadius: "15px" }} bodyStyle={{ padding: "20px" }}>
      <h5 className="text-lg font-medium mb-2">Thông tin cửa hàng</h5>
      <Row gutter={[16, 16]} className="mt-3">
        {infoItems.map((item, index) => (
          <Col xs={24} sm={12} key={index}>
            <div className="flex items-center">
              <div className={`w-[45px] h-[45px] flex-shrink-0 rounded-md mr-2.5 flex justify-center items-center ${item.bgColor}`}>
                <span className={`text-2xl ${item.iconColor}`}>{item.icon}</span>
              </div>
              <div>
                <h5 className="text-base font-bold text-[#474d58] m-0">{item.value}</h5>
                <span className="text-xs font-bold text-[#b5b5c3]">{item.label}</span>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Card>
  )
}

export default ShopInfo

