import { Suspense } from "react";
import type { Metadata } from "next";
import { SearchResults } from "@/components/search/search-results";
import { ProductSkeletonGrid } from "@/components/product/product-skeleton-grid";

export const metadata: Metadata = {
  title: "Search",
  description: "Search VOLTURA products by category, collection, and style."
};

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="container py-10">
          <ProductSkeletonGrid />
        </div>
      }
    >
      <SearchResults />
    </Suspense>
  );
}
