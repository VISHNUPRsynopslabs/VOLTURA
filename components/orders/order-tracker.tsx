"use client";

import { FormEvent, useState } from "react";
import { Check, Package, Search, Truck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const steps = [
  { label: "Order placed", icon: Check },
  { label: "Packed", icon: Package },
  { label: "In transit", icon: Truck },
  { label: "Delivered", icon: Check }
];

export function OrderTracker() {
  const [orderId, setOrderId] = useState("VT-2048");
  const [tracked, setTracked] = useState(true);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!orderId.trim()) {
      toast.error("Enter an order number.");
      return;
    }

    setTracked(true);
    toast.success(`Tracking ${orderId.toUpperCase()}`);
  }

  return (
    <section className="container py-10">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">Order status</p>
        <h1 className="mt-3 font-display text-5xl uppercase leading-none md:text-7xl">Track order</h1>
        <form onSubmit={submit} className="mt-8 flex gap-2">
          <Input value={orderId} onChange={(event) => setOrderId(event.target.value)} placeholder="Order number" />
          <Button type="submit">
            <Search className="mr-2 h-4 w-4" /> Track
          </Button>
        </form>

        {tracked ? (
          <div className="mt-10 border p-5">
            <div className="flex flex-col gap-2 border-b pb-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Order</p>
                <p className="text-xl font-semibold">{orderId.toUpperCase()}</p>
              </div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em]">Estimated delivery: May 19, 2026</p>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const active = index <= 2;
                return (
                  <div key={step.label} className="relative">
                    <div className={`grid h-12 w-12 place-items-center ${active ? "bg-foreground text-background" : "bg-muted"}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="mt-3 font-semibold">{step.label}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {active ? (index === 2 ? "Live scan updated today" : "Completed") : "Pending"}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
