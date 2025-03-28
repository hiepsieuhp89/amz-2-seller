"use client";
import Header from "@/components/ProductDetail/Header";
import ShopContent from '@/components/Shop/ShopContent';
import ShopFooter from '@/components/Shop/ShopFooter';
import ShopHeader from '@/components/Shop/ShopHeader';
import ShopNavigation from '@/components/Shop/ShopNavigation';
import { useGetAllShopProducts } from "@/hooks/shop-products";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const ShopView = () => {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const shopId = params.id as string;
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
    shopId: shopId
  })

  const shopProducts = shopProductsData?.data?.data || [];
  console.log(shopProducts)
  const meta = shopProductsData?.data?.meta;
  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (page > 1) params.set("page", String(page));

    const url = `/seller/ecom/shop/${shopId}${params.toString() ? `?${params.toString()}` : ""
      }`;
    router.replace(url, { scroll: false });
  }, [search, page, shopId, router]);

  useEffect(() => {
    refetch();
  }, [page, pageSize]);

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleSortChange = (value: string) => {
    const [field, order] = value.split(":");
    setSortField(field);
    setSortOrder(order as "ASC" | "DESC");
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
    <ShopFooter />
  </div>;
};

