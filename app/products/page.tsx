import { Suspense } from "react";
import type { Metadata } from "next";
import { products } from "@/data/products";
import { ProductListingClient } from "@/components/product/product-listing-client";
import { ProductSkeletonGrid } from "@/components/product/product-skeleton-grid";

export const metadata: Metadata = {
  title: "Shop",
  description: "Shop premium performance footwear, apparel, outerwear, and accessories from VOLTURA."
};

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="container py-10">
          <ProductSkeletonGrid />
        </div>
      }
    >
      <ProductListingClient products={products} />
    </Suspense>
  );
}
