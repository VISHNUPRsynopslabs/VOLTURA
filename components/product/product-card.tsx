"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, Heart, ShoppingBag, Star } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/types/product";
import { formatCurrency, getDiscount } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { QuickViewModal } from "@/components/product/quick-view-modal";

type ProductCardProps = {
  product: Product;
  index?: number;
};

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const toggleWishlist = useCartStore((state) => state.toggleWishlist);
  const wishlistIds = useCartStore((state) => state.wishlistIds);
  const isWishlisted = wishlistIds.includes(product.id);
  const discount = getDiscount(product.price, product.originalPrice);

  function quickAdd() {
    addItem(product, { size: product.sizes[0], color: product.colors[0]?.name ?? "Default" });
    toast.success(`${product.name} added to cart.`);
  }

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.22) }}
        className="group"
      >
        <div className="relative overflow-hidden bg-muted">
          <Link href={`/products/${product.slug}`} className="block aspect-[4/5]" aria-label={product.name}>
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <Image
              src={product.images[1] ?? product.images[0]}
              alt={`${product.name} alternate view`}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          </Link>
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            {product.isNew ? <Badge>New</Badge> : null}
            {discount ? <Badge variant="accent">{discount}% off</Badge> : null}
          </div>
          <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
            <Button
              variant="secondary"
              size="icon"
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              onClick={() => {
                toggleWishlist(product.id);
                toast.success(isWishlisted ? "Removed from wishlist." : "Added to wishlist.");
              }}
            >
              <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              aria-label="Quick view"
              title="Quick view"
              onClick={() => setQuickViewOpen(true)}
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
          <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <Button className="w-full" onClick={quickAdd}>
              <ShoppingBag className="mr-2 h-4 w-4" /> Quick add
            </Button>
          </div>
        </div>
        <div className="mt-4 flex items-start justify-between gap-3">
          <div>
            <Link href={`/products/${product.slug}`} className="font-semibold transition-colors hover:text-muted-foreground">
              {product.name}
            </Link>
            <p className="mt-1 text-sm text-muted-foreground">{product.eyebrow}</p>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-sm font-semibold">{formatCurrency(product.price)}</span>
              {product.originalPrice ? (
                <span className="text-xs text-muted-foreground line-through">{formatCurrency(product.originalPrice)}</span>
              ) : null}
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-1 text-sm">
            <Star className="h-3.5 w-3.5 fill-current" />
            {product.rating}
          </div>
        </div>
      </motion.article>
      <QuickViewModal product={product} open={quickViewOpen} onOpenChange={setQuickViewOpen} />
    </>
  );
}
