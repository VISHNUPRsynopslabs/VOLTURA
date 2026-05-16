"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { products } from "@/data/products";
import { useCartStore } from "@/store/cart-store";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";

export function WishlistView() {
  const wishlistIds = useCartStore((state) => state.wishlistIds);
  const wishlistProducts = products.filter((product) => wishlistIds.includes(product.id));

  if (!wishlistProducts.length) {
    return (
      <section className="container grid min-h-[65vh] place-items-center py-16 text-center">
        <div className="max-w-xl">
          <Heart className="mx-auto h-12 w-12" />
          <h1 className="mt-6 font-display text-5xl uppercase leading-none">Wishlist is quiet</h1>
          <p className="mt-4 text-muted-foreground">Save products from quick view or product cards and they will land here.</p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/products">Find favorites</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="container py-10">
      <div className="mb-8 border-b pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">Saved products</p>
        <h1 className="mt-3 font-display text-5xl uppercase leading-none md:text-7xl">Wishlist</h1>
      </div>
      <div className="grid gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {wishlistProducts.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </section>
  );
}
