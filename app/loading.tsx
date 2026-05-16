import { ProductSkeletonGrid } from "@/components/product/product-skeleton-grid";

export default function Loading() {
  return (
    <div className="container py-10">
      <div className="mb-8 h-12 w-2/3 animate-pulse rounded bg-muted md:w-1/3" />
      <ProductSkeletonGrid />
    </div>
  );
}
