import type { Metadata } from "next";
import { CartView } from "@/components/cart/cart-view";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review your VOLTURA shopping cart, apply coupon codes, and continue to checkout."
};

export default function CartPage() {
  return <CartView />;
}
