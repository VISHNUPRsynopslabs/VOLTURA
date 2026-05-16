import Image from "next/image";
import Link from "next/link";
import { CreditCard, Heart, MapPin, PackageCheck, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";

const orders = [
  { id: "VT-2048", status: "In transit", date: "May 12, 2026", total: "$312" },
  { id: "VT-1983", status: "Delivered", date: "Apr 28, 2026", total: "$168" }
];

const stats = [
  { label: "Orders", value: "08", icon: PackageCheck },
  { label: "Wishlist", value: "12", icon: Heart },
  { label: "Addresses", value: "02", icon: MapPin },
  { label: "Payment", value: "01", icon: CreditCard }
];

export function ProfileDashboard() {
  return (
    <section className="container py-10">
      <div className="mb-8 flex flex-col gap-5 border-b pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">Profile</p>
          <h1 className="mt-3 font-display text-5xl uppercase leading-none md:text-7xl">Dashboard</h1>
        </div>
        <Button asChild variant="outline">
          <Link href="/auth">Account settings</Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="border p-5">
              <Icon className="h-5 w-5" />
              <p className="mt-6 font-display text-4xl uppercase">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_22rem]">
        <section className="border p-5">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold uppercase tracking-[0.14em]">Recent orders</h2>
            <Button asChild variant="link">
              <Link href="/orders/track">Track order</Link>
            </Button>
          </div>
          <div className="grid gap-3">
            {orders.map((order) => (
              <div key={order.id} className="grid gap-3 border p-4 sm:grid-cols-4 sm:items-center">
                <p className="font-semibold">{order.id}</p>
                <p className="text-sm text-muted-foreground">{order.date}</p>
                <p className="text-sm">{order.status}</p>
                <p className="font-semibold sm:text-right">{order.total}</p>
              </div>
            ))}
          </div>
        </section>
        <aside className="border bg-muted/45 p-5">
          <div className="relative mb-5 aspect-[4/5] overflow-hidden bg-muted">
            <Image
              src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80"
              alt="VOLTURA member dashboard editorial"
              fill
              sizes="(min-width: 1024px) 352px, 100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/58 to-transparent" />
            <p className="absolute bottom-4 left-4 right-4 text-sm font-semibold uppercase tracking-[0.18em] text-white">
              Early access edit
            </p>
          </div>
          <UserRound className="h-6 w-6" />
          <h2 className="mt-5 font-display text-3xl uppercase">VOLTURA member</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Your dashboard shell is ready for user data, saved addresses, order history, and loyalty status.
          </p>
          <Button asChild className="mt-6 w-full">
            <Link href="/products">Shop new arrivals</Link>
          </Button>
        </aside>
      </div>
    </section>
  );
}
