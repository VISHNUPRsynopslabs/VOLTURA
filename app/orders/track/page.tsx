import type { Metadata } from "next";
import { OrderTracker } from "@/components/orders/order-tracker";

export const metadata: Metadata = {
  title: "Order Tracking",
  description: "Track your VOLTURA order status."
};

export default function OrderTrackingPage() {
  return <OrderTracker />;
}
