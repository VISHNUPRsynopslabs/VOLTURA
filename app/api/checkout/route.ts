import { NextResponse } from "next/server";
import { z } from "zod";

const checkoutLineSchema = z.object({
  lineId: z.string(),
  quantity: z.number().min(1).max(10),
  size: z.string(),
  color: z.string(),
  product: z.object({
    id: z.string(),
    name: z.string(),
    price: z.number().positive(),
    slug: z.string()
  })
});

const checkoutSchema = z.object({
  customer: z.record(z.string(), z.unknown()),
  coupon: z.string().optional(),
  items: z.array(checkoutLineSchema).min(1)
});

export async function POST(request: Request) {
  const payload = checkoutSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json({ error: "Invalid checkout payload" }, { status: 400 });
  }

  const subtotal = payload.data.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const discount = payload.data.coupon === "VOLTURA15" ? subtotal * 0.15 : 0;
  const amount = Math.round((subtotal - discount) * 100);

  // Replace this mock response with stripe.checkout.sessions.create when Stripe keys are configured.
  return NextResponse.json({
    sessionId: `cs_test_${crypto.randomUUID().replace(/-/g, "")}`,
    checkoutUrl: "/checkout?session=mock",
    amount,
    currency: "usd"
  });
}
