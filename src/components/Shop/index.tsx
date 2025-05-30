"use client";
import { Header } from "@/components/Common/Header";
import ShopContent from '@/components/Shop/ShopContent';
import ShopHeader from '@/components/Shop/ShopHeader';
import ShopNavigation from '@/components/Shop/ShopNavigation';
import { useGetAllShopProducts } from "@/hooks/shop-products";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { Footer } from "../Common/Footer";

function ShopContentWrapper() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const shopId = searchParams.get("id") as string;
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [pageSize, setPageSize] = useState(10);
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("DESC");
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const { data: shopProductsData, isLoading, refetch } = useGetAllShopProducts({
    page: page,
    take: pageSize,
    shopId: shopId,
    order: `${sortField}:${sortOrder}`
  })

  const shopProducts = shopProductsData?.data?.data || [];
  const meta = shopProductsData?.data?.meta;
  useEffect(() => {
    const params = new URLSearchParams();
    if (shopId) params.set("id", shopId);
    if (search) params.set("search", search);
    if (page > 1) params.set("page", String(page));

    const url = `/shop${params.toString() ? `?${params.toString()}` : ""}`;
    router.replace(url, { scroll: false });
  }, [shopId, search, page, router]);

  useEffect(() => {
    refetch();
  }, [page, pageSize, sortField, sortOrder, refetch]);

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleSortChange = (value: string) => {
    const [field, order] = value.split(":");
    setSortField(field);
    setSortOrder(order as "ASC" | "DESC");
    setPage(1);
  };

  const handlePageChange = (newPage: number, newPageSize: number) => {
    setPage(newPage);
    setPageSize(newPageSize);
  };
  return <div className="min-h-screen">
    <Header />
    <ShopNavigation />
    <ShopHeader />
    <ShopContent
      shopProducts={shopProducts}
      isLoading={isLoading}
      meta={meta}
      page={page}
      pageSize={pageSize}
      sortField={sortField}
      sortOrder={sortOrder}
      handleSortChange={handleSortChange}
      handlePageChange={handlePageChange}
    />
    <Footer />
  </div>;
}

export const ShopView = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ShopContentWrapper />
    </Suspense>
  );
};

