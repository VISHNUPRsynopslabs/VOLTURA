import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout/checkout-form";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your VOLTURA order with a Stripe-ready checkout structure."
};

export default function CheckoutPage() {
  return <CheckoutForm />;
}
