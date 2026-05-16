"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types/product";

export type CartLine = {
  lineId: string;
  product: Product;
  quantity: number;
  size: string;
  color: string;
};

type CartState = {
  items: CartLine[];
  wishlistIds: string[];
  coupon?: string;
  addItem: (product: Product, options: { size: string; color: string; quantity?: number }) => void;
  removeItem: (lineId: string) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  setCoupon: (coupon?: string) => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      wishlistIds: [],
      addItem: (product, options) =>
        set((state) => {
          const lineId = `${product.id}-${options.size}-${options.color}`;
          const existing = state.items.find((item) => item.lineId === lineId);

          if (existing) {
            return {
              items: state.items.map((item) =>
                item.lineId === lineId
                  ? { ...item, quantity: Math.min(item.quantity + (options.quantity ?? 1), 10) }
                  : item
              )
            };
          }

          return {
            items: [
              ...state.items,
              {
                lineId,
                product,
                size: options.size,
                color: options.color,
                quantity: options.quantity ?? 1
              }
            ]
          };
        }),
      removeItem: (lineId) =>
        set((state) => ({
          items: state.items.filter((item) => item.lineId !== lineId)
        })),
      updateQuantity: (lineId, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.lineId === lineId ? { ...item, quantity: Math.max(1, Math.min(quantity, 10)) } : item
          )
        })),
      clearCart: () => set({ items: [] }),
      toggleWishlist: (productId) =>
        set((state) => ({
          wishlistIds: state.wishlistIds.includes(productId)
            ? state.wishlistIds.filter((id) => id !== productId)
            : [...state.wishlistIds, productId]
        })),
      setCoupon: (coupon) => set({ coupon })
    }),
    {
      name: "voltura-cart"
    }
  )
);

export function selectCartCount(items: CartLine[]) {
  return items.reduce((total, item) => total + item.quantity, 0);
}

export function selectSubtotal(items: CartLine[]) {
  return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
}
