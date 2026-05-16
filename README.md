# VOLTURA Commerce

A modern premium sportswear e-commerce website built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, Shadcn-style UI primitives, Zustand cart persistence, Lucide icons, and a Stripe-ready checkout shape.

## Features

- Fully responsive home, product listing, product details, categories, cart, checkout, wishlist, auth, profile, order tracking, search, about, contact, and 404 pages.
- Sticky animated navbar with desktop mega menu, mobile sheet menu, search suggestions, cart badge, wishlist badge, and dark/light mode toggle.
- Hero carousel, scroll reveals, product hover states, quick view modal, image zoom gallery, product sliders, toast notifications, loading skeletons, and page transitions.
- Product filtering by category, audience, collection, max price, and sorting by featured, newest, price, or rating.
- Persistent cart and wishlist using Zustand.
- Checkout form validation with Zod and a mock `/api/checkout` route shaped for Stripe Checkout integration.
- Mock product catalog with realistic names, pricing, discounts, reviews, categories, colors, sizes, and high-quality remote placeholder imagery.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

Run checks:

```bash
npm run typecheck
npm run lint
npm run build
```

## Stripe Wiring

The checkout page posts to `app/api/checkout/route.ts`. It currently returns a mock checkout session:

```ts
{
  sessionId: "cs_test_...",
  checkoutUrl: "/checkout?session=mock",
  amount: 12345,
  currency: "usd"
}
```

To connect Stripe, add real keys in `.env.local`, install Stripe if desired, and replace the mock response with `stripe.checkout.sessions.create(...)`.

## Project Structure

```text
app/                    App Router pages and API route
components/ui/          Shadcn-style primitives
components/layout/      Navbar and footer
components/home/        Homepage sections
components/product/     Product cards, listing, quick view, details, gallery
components/cart/        Cart UI
components/checkout/    Validated checkout form
components/search/      Search results UI
data/                   Typed mock product catalog
store/                  Zustand cart and wishlist store
types/                  Product interfaces
lib/                    Utilities
```

## Demo Coupon

Use `VOLTURA15` in the cart to apply a 15% discount.
