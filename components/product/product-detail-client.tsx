"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, Minus, Plus, ShieldCheck, ShoppingBag, Star } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/types/product";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { ProductCard } from "@/components/product/product-card";
import { ProductGallery } from "@/components/product/product-gallery";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type ProductDetailClientProps = {
  product: Product;
  relatedProducts: Product[];
};

export function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]?.name ?? "Default");
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);
  const toggleWishlist = useCartStore((state) => state.toggleWishlist);
  const wishlistIds = useCartStore((state) => state.wishlistIds);
  const isWishlisted = wishlistIds.includes(product.id);

  function addToCart() {
    addItem(product, { size, color, quantity });
    toast.success(`${product.name} added to cart.`);
  }

  return (
    <>
      <section className="container grid gap-10 py-8 lg:grid-cols-[1.08fr_0.92fr] lg:py-12">
        <ProductGallery images={product.images} name={product.name} />
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="flex flex-wrap items-center gap-2">
            {product.isNew ? <Badge>New arrival</Badge> : null}
            {product.isTrending ? <Badge variant="secondary">Trending</Badge> : null}
            <span className="ml-auto flex items-center gap-1 text-sm font-semibold">
              <Star className="h-4 w-4 fill-current" /> {product.rating} ({product.reviewCount})
            </span>
          </div>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">{product.eyebrow}</p>
          <h1 className="mt-3 font-display text-5xl uppercase leading-none tracking-normal md:text-7xl">{product.name}</h1>
          <div className="mt-5 flex items-baseline gap-3">
            <p className="text-2xl font-semibold">{formatCurrency(product.price)}</p>
            {product.originalPrice ? (
              <p className="text-base text-muted-foreground line-through">{formatCurrency(product.originalPrice)}</p>
            ) : null}
          </div>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">{product.description}</p>

          <div className="mt-8">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold uppercase tracking-[0.18em]">Select size</p>
              <button className="text-sm underline underline-offset-4">Size guide</button>
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6">
              {product.sizes.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setSize(item)}
                  className={`border px-3 py-3 text-sm font-semibold transition-colors ${
                    size === item ? "bg-foreground text-background" : "hover:bg-muted"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em]">Color: {color}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.colors.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setColor(item.name)}
                  className={`flex items-center gap-2 border px-3 py-2 text-sm transition-colors ${
                    color === item.name ? "border-foreground bg-muted" : "hover:bg-muted"
                  }`}
                >
                  <span className="h-4 w-4 border" style={{ backgroundColor: item.value }} />
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-[8.5rem_1fr_auto]">
            <div className="flex h-12 items-center border">
              <button type="button" className="grid h-full w-11 place-items-center" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-8 text-center font-semibold">{quantity}</span>
              <button type="button" className="grid h-full w-11 place-items-center" onClick={() => setQuantity(Math.min(10, quantity + 1))}>
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <Button size="lg" onClick={addToCart}>
              <ShoppingBag className="mr-2 h-4 w-4" /> Add to cart
            </Button>
            <Button
              variant="outline"
              size="lg"
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              onClick={() => {
                toggleWishlist(product.id);
                toast.success(isWishlisted ? "Removed from wishlist." : "Added to wishlist.");
              }}
            >
              <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
            </Button>
          </div>

          <div className="mt-6 flex items-start gap-3 bg-muted p-4">
            <ShieldCheck className="mt-0.5 h-5 w-5" />
            <p className="text-sm leading-6 text-muted-foreground">
              Secure Stripe-ready checkout, free express shipping over $120, and 30 day returns.
            </p>
          </div>

          <Tabs defaultValue="details" className="mt-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
            </TabsList>
            <TabsContent value="details">
              <ul className="grid gap-2 text-sm text-muted-foreground">
                {product.details.map((detail) => (
                  <li key={detail} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-foreground" />
                    {detail}
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="reviews" className="grid gap-4">
              {product.reviews.map((review) => (
                <div key={`${review.author}-${review.date}`} className="border p-4">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-semibold">{review.title}</p>
                    <span className="flex items-center gap-1 text-sm">
                      <Star className="h-4 w-4 fill-current" /> {review.rating}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{review.body}</p>
                  <p className="mt-3 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    {review.author} / {review.date}
                  </p>
                </div>
              ))}
            </TabsContent>
            <TabsContent value="shipping">
              <p className="text-sm leading-6 text-muted-foreground">
                Orders dispatch within 24 hours on business days. Express delivery typically arrives in 2-4 days.
                Returns and size exchanges are available for 30 days from delivery.
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="container border-t py-14">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">Complete the uniform</p>
            <h2 className="mt-2 font-display text-4xl uppercase leading-none">Recommended</h2>
          </div>
          <Button asChild variant="outline" className="hidden sm:inline-flex">
            <Link href="/products">View all</Link>
          </Button>
        </div>
        <div className="grid gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {relatedProducts.map((item, index) => (
            <ProductCard key={item.id} product={item} index={index} />
          ))}
        </div>
      </section>
    </>
  );
}
