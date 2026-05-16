"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { formatCurrency } from "@/lib/utils";
import { selectSubtotal, useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function CartView() {
  const items = useCartStore((state) => state.items);
  const coupon = useCartStore((state) => state.coupon);
  const setCoupon = useCartStore((state) => state.setCoupon);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const [couponInput, setCouponInput] = useState(coupon ?? "");

  const totals = useMemo(() => {
    const subtotal = selectSubtotal(items);
    const discount = coupon?.toUpperCase() === "VOLTURA15" ? subtotal * 0.15 : 0;
    const shipping = subtotal - discount > 120 || subtotal === 0 ? 0 : 12;
    const tax = (subtotal - discount) * 0.0825;

    return { subtotal, discount, shipping, tax, total: subtotal - discount + shipping + tax };
  }, [coupon, items]);

  function applyCoupon(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = couponInput.trim().toUpperCase();
    if (!value) {
      setCoupon(undefined);
      toast.info("Coupon removed.");
      return;
    }

    if (value !== "VOLTURA15") {
      toast.error("Try VOLTURA15 for this demo checkout.");
      return;
    }

    setCoupon(value);
    toast.success("15% coupon applied.");
  }

  if (!items.length) {
    return (
      <section className="container grid min-h-[65vh] place-items-center py-16 text-center">
        <div className="max-w-xl">
          <ShoppingBag className="mx-auto h-12 w-12" />
          <h1 className="mt-6 font-display text-5xl uppercase leading-none">Your cart is empty</h1>
          <p className="mt-4 text-muted-foreground">Build a premium rotation with new arrivals and performance staples.</p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/products">Start shopping</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="container py-10">
      <div className="mb-8 border-b pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">Bag</p>
        <h1 className="mt-3 font-display text-5xl uppercase leading-none md:text-7xl">Shopping cart</h1>
      </div>
      <div className="grid gap-8 lg:grid-cols-[1fr_24rem]">
        <div className="grid gap-4">
          {items.map((item) => (
            <div key={item.lineId} className="grid gap-4 border p-4 sm:grid-cols-[9rem_1fr_auto]">
              <Link href={`/products/${item.product.slug}`} className="relative aspect-square overflow-hidden bg-muted sm:aspect-[4/5]">
                <Image src={item.product.images[0]} alt={item.product.name} fill sizes="160px" className="object-cover" />
              </Link>
              <div>
                <Link href={`/products/${item.product.slug}`} className="text-lg font-semibold hover:text-muted-foreground">
                  {item.product.name}
                </Link>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.size} / {item.color}
                </p>
                <p className="mt-3 font-semibold">{formatCurrency(item.product.price)}</p>
                <div className="mt-5 flex h-11 w-32 items-center border">
                  <button
                    type="button"
                    className="grid h-full w-10 place-items-center"
                    onClick={() => updateQuantity(item.lineId, item.quantity - 1)}
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="flex-1 text-center font-semibold">{item.quantity}</span>
                  <button
                    type="button"
                    className="grid h-full w-10 place-items-center"
                    onClick={() => updateQuantity(item.lineId, item.quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="flex items-start justify-between gap-4 sm:flex-col sm:items-end">
                <p className="font-semibold">{formatCurrency(item.product.price * item.quantity)}</p>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Remove item"
                  title="Remove item"
                  onClick={() => {
                    removeItem(item.lineId);
                    toast.success("Item removed from cart.");
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <aside className="h-fit border p-5 lg:sticky lg:top-32">
          <h2 className="font-display text-3xl uppercase">Order summary</h2>
          <form onSubmit={applyCoupon} className="mt-5 flex gap-2">
            <Input
              value={couponInput}
              onChange={(event) => setCouponInput(event.target.value)}
              placeholder="Coupon code"
              aria-label="Coupon code"
            />
            <Button type="submit" variant="outline">
              Apply
            </Button>
          </form>
          <div className="mt-6 grid gap-3 text-sm">
            <SummaryRow label="Subtotal" value={formatCurrency(totals.subtotal)} />
            <SummaryRow label="Discount" value={`-${formatCurrency(totals.discount)}`} />
            <SummaryRow label="Shipping" value={totals.shipping === 0 ? "Free" : formatCurrency(totals.shipping)} />
            <SummaryRow label="Estimated tax" value={formatCurrency(totals.tax)} />
            <div className="mt-3 flex items-center justify-between border-t pt-4 text-lg font-semibold">
              <span>Total</span>
              <span>{formatCurrency(totals.total)}</span>
            </div>
          </div>
          <Button asChild size="lg" className="mt-6 w-full">
            <Link href="/checkout">Checkout</Link>
          </Button>
          <p className="mt-4 text-xs leading-5 text-muted-foreground">
            Demo coupon: VOLTURA15. Payment structure is ready for Stripe session wiring.
          </p>
        </aside>
      </div>
    </section>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
