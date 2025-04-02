"use client"
import CategoryPage from "@/components/CategoryPage";
import { Suspense } from "react";

export default function CategoryProductsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CategoryPage />
    </Suspense>
  );
} 