"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Minus, Plus, ShoppingBag, Star } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/types/product";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

type QuickViewModalProps = {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function QuickViewModal({ product, open, onOpenChange }: QuickViewModalProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]?.name ?? "Default");
  const [quantity, setQuantity] = useState(1);

  function addToCart() {
    addItem(product, { size, color, quantity });
    toast.success(`${product.name} added to cart.`);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl">
        <div className="grid md:grid-cols-2">
          <div className="relative min-h-[28rem] bg-muted">
            <Image src={product.images[0]} alt={product.name} fill sizes="50vw" className="object-cover" />
          </div>
          <div className="p-6 md:p-8">
            <DialogHeader>
              <DialogDescription className="uppercase tracking-[0.24em]">{product.eyebrow}</DialogDescription>
              <DialogTitle className="font-display text-4xl uppercase leading-none">{product.name}</DialogTitle>
            </DialogHeader>
            <div className="mt-4 flex items-center gap-3">
              <p className="text-xl font-semibold">{formatCurrency(product.price)}</p>
              {product.originalPrice ? (
                <p className="text-sm text-muted-foreground line-through">{formatCurrency(product.originalPrice)}</p>
              ) : null}
              <span className="ml-auto flex items-center gap-1 text-sm">
                <Star className="h-4 w-4 fill-current" /> {product.rating}
              </span>
            </div>
            <p className="mt-5 leading-7 text-muted-foreground">{product.description}</p>

            <div className="mt-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em]">Size</p>
              <div className="mt-3 grid grid-cols-4 gap-2">
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

            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em]">Color</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.colors.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setColor(item.name)}
                    className={`flex items-center gap-2 border px-3 py-2 text-sm transition-colors ${
                      color === item.name ? "border-foreground" : "hover:bg-muted"
                    }`}
                  >
                    <span className="h-4 w-4 border" style={{ backgroundColor: item.value }} />
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-7 flex items-center gap-3">
              <div className="flex h-12 items-center border">
                <button type="button" className="grid h-full w-11 place-items-center" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  <Minus className="h-4 w-4" />
                </button>
                <span className="min-w-8 text-center font-semibold">{quantity}</span>
                <button type="button" className="grid h-full w-11 place-items-center" onClick={() => setQuantity(Math.min(10, quantity + 1))}>
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <Button onClick={addToCart} className="flex-1">
                <ShoppingBag className="mr-2 h-4 w-4" /> Add to cart
              </Button>
            </div>
            <Button asChild variant="link" className="mt-5">
              <Link href={`/products/${product.slug}`}>View full product details</Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
