import CategoryPage from "@/components/CategoryPage";
import { Suspense } from "react";

export default function page({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const categoryId = searchParams.id;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CategoryPage />
    </Suspense>
  );
} 