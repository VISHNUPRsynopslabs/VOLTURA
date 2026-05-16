"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { ArrowUpRight, Send } from "lucide-react";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import { toast } from "sonner";
import { categories } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  const [email, setEmail] = useState("");

  function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.includes("@")) {
      toast.error("Add a valid email address.");
      return;
    }

    toast.success("You are on the VOLTURA newsletter list.");
    setEmail("");
  }

  return (
    <footer className="border-t bg-foreground text-background">
      <section className="container grid gap-8 py-12 md:grid-cols-[1.2fr_0.8fr] md:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-background/60">Join the list</p>
          <h2 className="mt-4 max-w-2xl font-display text-4xl uppercase leading-none tracking-normal md:text-6xl">
            Early access to drops
          </h2>
        </div>
        <form onSubmit={subscribe} className="flex gap-2">
          <Input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email address"
            className="border-background/20 bg-background/10 text-background placeholder:text-background/50"
            aria-label="Email address"
          />
          <Button type="submit" variant="secondary" size="icon" aria-label="Subscribe">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </section>
      <div className="border-t border-background/15">
        <div className="container grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="font-display text-3xl uppercase">
              VOLTURA
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-6 text-background/62">
              Original performance fashion for motion, travel, training, and sharp everyday rotation.
            </p>
          </div>
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-background/60">Shop</p>
            <div className="grid gap-3 text-sm">
              {categories.map((category) => (
                <Link key={category.name} href={`/products?category=${category.name}`} className="hover:text-background/70">
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-background/60">Support</p>
            <div className="grid gap-3 text-sm">
              <Link href="/orders/track" className="hover:text-background/70">
                Track order
              </Link>
              <Link href="/contact" className="hover:text-background/70">
                Contact
              </Link>
              <Link href="/checkout" className="hover:text-background/70">
                Checkout
              </Link>
              <Link href="/profile" className="hover:text-background/70">
                Profile dashboard
              </Link>
            </div>
          </div>
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-background/60">Social</p>
            <div className="flex gap-2">
              <Button variant="secondary" size="icon" aria-label="Instagram" title="Instagram">
                <FaInstagram className="h-4 w-4" />
              </Button>
              <Button variant="secondary" size="icon" aria-label="Twitter" title="Twitter">
                <FaXTwitter className="h-4 w-4" />
              </Button>
              <Button asChild variant="secondary" size="icon" aria-label="About" title="About">
                <Link href="/about">
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-background/15 py-5">
        <div className="container flex flex-col gap-2 text-xs text-background/55 md:flex-row md:items-center md:justify-between">
          <p>(c) 2026 VOLTURA Studio. Original demo commerce experience.</p>
          <p>Stripe-ready structure / Mock catalog / Accessible UI</p>
        </div>
      </div>
    </footer>
  );
}
