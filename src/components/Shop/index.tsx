"use client";
import { Header } from "@/components/Common/Header";
import ShopContent from '@/components/Shop/ShopContent';
import ShopHeader from '@/components/Shop/ShopHeader';
import ShopNavigation from '@/components/Shop/ShopNavigation';
import { useProducts } from "@/hooks/products";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Footer } from "../Common/Footer";
import { motion, useScroll, useTransform, animate } from "framer-motion";
import { mdiChevronUp } from "@mdi/js";
import Icon from "@mdi/react";

function ShopContentWrapper() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const shopId = searchParams.get("id") as string;
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [pageSize, setPageSize] = useState(10);
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("DESC");
  const [showScroll, setShowScroll] = useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [400, 500], [0, 1]);
  
  const { data: shopProductsData, isLoading, refetch } = useProducts({
    page: page,
    take: pageSize,
    shopId: shopId
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
  }, [page, pageSize]);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    animate(scrollY, 0, {
      duration: 1,
      ease: "easeInOut",
      onUpdate: (latest) => {
        window.scrollTo(0, latest);
      }
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScroll]);


  const handleSortChange = (value: string) => {
    const [field, order] = value.split(":");
    setSortField(field);
    setSortOrder(order as "ASC" | "DESC");
  };

  const handlePageChange = (newPage: number, newPageSize: number) => {
    setPage(newPage);
    setPageSize(newPageSize);
  };
  
  return (
    <div className="min-h-screen bg-[#E3E6E6]">
      <Header />
      <ShopNavigation />
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
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
      </motion.div>
      <motion.button
        style={{ opacity }}
        onClick={scrollTop}
        className="fixed bottom-4 right-4 p-3 bg-main-golden-orange !text-white/80 rounded-full shadow-lg hover:bg-main-golden-orange/80 transition-colors z-50"
      >
        <Icon path={mdiChevronUp} size={1} />
      </motion.button>
    </div>
  );
}

export const ShopView = () => {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
      <ShopContentWrapper />
    </Suspense>
  );
};

