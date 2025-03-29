import { ShopView } from "@/components/Shop";
import { Suspense } from "react";

export default function ShopPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ShopView />
    </Suspense>
  );
}
