import type { Metadata } from "next";
import { WishlistView } from "@/components/wishlist/wishlist-view";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "View saved VOLTURA products and quickly add favorites to your cart."
};

export default function WishlistPage() {
  return <WishlistView />;
}
