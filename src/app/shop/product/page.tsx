"use client"
import { Footer } from "@/components/Common/Footer";
import { Header } from "@/components/Common/Header";
import ProductDetail from "@/components/ProductDetail";
import LeftSideSection from "@/components/ProductDetail/LeftSideSection";
import ProductTabs from "@/components/ProductDetail/ProductTabs";
import { Button, Divider, Rate, Typography } from "antd";
import Title from "antd/es/typography/Title";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
const descriptionImages = [
  'https://example.com/image1.png',
  'https://example.com/image2.png'
]
const { Text } = Typography;

function ProductDetailContent() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-col">
        <ProductDetail />
        <div className="w-full flex flex-row py-6 px-[104px] gap-4 bg-[#E3E6E6]">
          <div className="w-full lg:w-1/4">
            <LeftSideSection />
          </div>
          <div className="w-full lg:w-3/4">
            <ProductTabs/>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default function ProductDetailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductDetailContent />
    </Suspense>
  )
}

