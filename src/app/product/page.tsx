"use client"
import { Footer } from "@/components/Common/Footer";
import { Header } from "@/components/Common/Header";
import ProductDetail from "@/components/ProductDetail";
import LeftSideSection from "@/components/ProductDetail/LeftSideSection";
import ProductTabs from "@/components/ProductDetail/ProductTabs";
import { Suspense } from "react";

function ProductDetailContent() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-col">
        <ProductDetail />
        <div className="w-full hidden md:flex flex-row py-6 px-4 md:px-6 lg:px-[104px] gap-4 bg-[#E3E6E6] justify-center">
          <div className="max-w-[1500px] w-full flex flex-row gap-4">
            <div className="w-full lg:w-1/4">
              <LeftSideSection />
            </div>
            <div className="w-full lg:w-3/4">
              <ProductTabs />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:hidden">
          <LeftSideSection />
          <div className="px-4 mb-4"><ProductTabs /></div>
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

