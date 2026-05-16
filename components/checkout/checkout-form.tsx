"use client";

import Image from "next/image";
import { FormEvent, useMemo, useState } from "react";
import { CreditCard, LockKeyhole, Truck } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { formatCurrency } from "@/lib/utils";
import { selectSubtotal, useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const checkoutSchema = z.object({
  email: z.string().email("Valid email required"),
  firstName: z.string().min(2, "First name required"),
  lastName: z.string().min(2, "Last name required"),
  address: z.string().min(6, "Street address required"),
  city: z.string().min(2, "City required"),
  state: z.string().min(2, "State required"),
  zip: z.string().min(4, "ZIP required"),
  cardName: z.string().min(2, "Name on card required")
});

type CheckoutFormState = z.infer<typeof checkoutSchema>;

const initialForm: CheckoutFormState = {
  email: "",
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  cardName: ""
};

export function CheckoutForm() {
  const items = useCartStore((state) => state.items);
  const coupon = useCartStore((state) => state.coupon);
  const clearCart = useCartStore((state) => state.clearCart);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormState, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totals = useMemo(() => {
    const subtotal = selectSubtotal(items);
    const discount = coupon?.toUpperCase() === "VOLTURA15" ? subtotal * 0.15 : 0;
    const shipping = subtotal - discount > 120 || subtotal === 0 ? 0 : 12;
    const tax = (subtotal - discount) * 0.0825;
    return { subtotal, discount, shipping, tax, total: subtotal - discount + shipping + tax };
  }, [coupon, items]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!items.length) {
      toast.error("Your cart is empty.");
      return;
    }

    const parsed = checkoutSchema.safeParse(form);
    if (!parsed.success) {
      const nextErrors: Partial<Record<keyof CheckoutFormState, string>> = {};
      parsed.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof CheckoutFormState;
        nextErrors[key] = issue.message;
      });
      setErrors(nextErrors);
      toast.error("Check the highlighted fields.");
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer: parsed.data, items, coupon })
      });
      const data = (await response.json()) as { sessionId: string; checkoutUrl: string };

      toast.success(`Mock checkout session created: ${data.sessionId}`);
      clearCart();
      setForm(initialForm);
    } catch {
      toast.error("Checkout could not be started.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="container py-10">
      <div className="mb-8 border-b pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">Secure checkout</p>
        <h1 className="mt-3 font-display text-5xl uppercase leading-none md:text-7xl">Checkout</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_24rem]">
        <form onSubmit={submit} className="grid gap-8">
          <CheckoutSection icon={LockKeyhole} title="Contact">
            <Field label="Email" name="email" value={form.email} error={errors.email} onChange={setForm} />
          </CheckoutSection>

          <CheckoutSection icon={Truck} title="Shipping">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="First name" name="firstName" value={form.firstName} error={errors.firstName} onChange={setForm} />
              <Field label="Last name" name="lastName" value={form.lastName} error={errors.lastName} onChange={setForm} />
            </div>
            <Field label="Address" name="address" value={form.address} error={errors.address} onChange={setForm} />
            <div className="grid gap-4 md:grid-cols-3">
              <Field label="City" name="city" value={form.city} error={errors.city} onChange={setForm} />
              <Field label="State" name="state" value={form.state} error={errors.state} onChange={setForm} />
              <Field label="ZIP" name="zip" value={form.zip} error={errors.zip} onChange={setForm} />
            </div>
          </CheckoutSection>

          <CheckoutSection icon={CreditCard} title="Payment">
            <Field label="Name on card" name="cardName" value={form.cardName} error={errors.cardName} onChange={setForm} />
            <div className="grid gap-4 md:grid-cols-[1fr_7rem_7rem]">
              <Input placeholder="4242 4242 4242 4242" aria-label="Card number" disabled />
              <Input placeholder="MM/YY" aria-label="Expiry" disabled />
              <Input placeholder="CVC" aria-label="CVC" disabled />
            </div>
            <p className="text-xs text-muted-foreground">
              Card fields are placeholders for Stripe Elements. The API route returns a mock session.
            </p>
          </CheckoutSection>

          <Button type="submit" size="lg" disabled={isSubmitting}>
            {isSubmitting ? "Creating session..." : "Place order"}
          </Button>
        </form>

        <aside className="h-fit border p-5 lg:sticky lg:top-32">
          <div className="relative mb-5 aspect-[16/11] overflow-hidden bg-muted">
            <Image
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=80"
              alt="Premium checkout campaign"
              fill
              sizes="(min-width: 1024px) 384px, 100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/62 to-transparent" />
            <p className="absolute bottom-4 left-4 text-xs font-semibold uppercase tracking-[0.22em] text-white">
              Secure studio checkout
            </p>
          </div>
          <h2 className="font-display text-3xl uppercase">Summary</h2>
          <div className="mt-5 grid gap-4">
            {items.map((item) => (
              <div key={item.lineId} className="flex justify-between gap-4 text-sm">
                <div>
                  <p className="font-semibold">{item.product.name}</p>
                  <p className="text-muted-foreground">
                    {item.quantity} x {item.size} / {item.color}
                  </p>
                </div>
                <p>{formatCurrency(item.product.price * item.quantity)}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-3 border-t pt-5 text-sm">
            <SummaryRow label="Subtotal" value={formatCurrency(totals.subtotal)} />
            <SummaryRow label="Discount" value={`-${formatCurrency(totals.discount)}`} />
            <SummaryRow label="Shipping" value={totals.shipping === 0 ? "Free" : formatCurrency(totals.shipping)} />
            <SummaryRow label="Estimated tax" value={formatCurrency(totals.tax)} />
            <div className="mt-3 flex justify-between border-t pt-4 text-lg font-semibold">
              <span>Total</span>
              <span>{formatCurrency(totals.total)}</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function CheckoutSection({
  icon: Icon,
  title,
  children
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border p-5">
      <div className="mb-5 flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center bg-muted">
          <Icon className="h-5 w-5" />
        </span>
        <h2 className="text-lg font-semibold uppercase tracking-[0.14em]">{title}</h2>
      </div>
      <div className="grid gap-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  name,
  value,
  error,
  onChange
}: {
  label: string;
  name: keyof CheckoutFormState;
  value: string;
  error?: string;
  onChange: React.Dispatch<React.SetStateAction<CheckoutFormState>>;
}) {
  return (
    <label className="grid gap-2 text-sm">
      <span className="font-medium">{label}</span>
      <Input
        value={value}
        onChange={(event) => onChange((current) => ({ ...current, [name]: event.target.value }))}
        aria-invalid={Boolean(error)}
      />
      {error ? <span className="text-xs text-destructive">{error}</span> : null}
    </label>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span>{value}</span>
    </div>
  );
}
