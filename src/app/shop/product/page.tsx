"use client"
import ProductDetail from "@/components/ProductDetail";
import Footer from "@/components/ProductDetail/Footer";
import Header from "@/components/ProductDetail/Header";
import LeftSideSection from "@/components/ProductDetail/LeftSideSection";
import { Button, Card, Divider, Rate, Typography } from "antd";
import Title from "antd/es/typography/Title";
import { useSearchParams } from "next/navigation";

const { Text } = Typography;

export default function ProductDetailPage() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-col">
        <ProductDetail />
        <div className="w-full flex flex-row py-6 px-[104px] gap-4">
          <div className="w-full lg:w-1/4">
            <LeftSideSection />
          </div>
          <div className="w-full lg:w-3/4">
            <Card title={<Title level={4}>Đánh giá sản phẩm</Title>}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <Title level={1} style={{ margin: 0 }}>
                    0
                  </Title>
                  <div>
                    <Text>out of 5.0</Text>
                    <div>
                      <Rate disabled defaultValue={0} />
                    </div>
                  </div>
                </div>
                <Button type="primary">Rate this Product</Button>
              </div>
              <Divider />
              <div style={{ textAlign: "center", padding: "24px 0" }}>
                <Text type="secondary" style={{ fontSize: "16px" }}>
                  Chưa có nhận xét nào cho sản phẩm này.
                </Text>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

