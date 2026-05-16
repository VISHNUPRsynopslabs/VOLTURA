"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { categories, products } from "@/data/products";
import { cn } from "@/lib/utils";
import { selectCartCount, useCartStore } from "@/store/cart-store";
import { useMounted } from "@/hooks/use-mounted";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/shared/mode-toggle";

const navLinks = [
  { href: "/products", label: "Shop" },
  { href: "/categories", label: "Categories" },
  { href: "/about", label: "Brand" },
  { href: "/contact", label: "Contact" }
];

export function Navbar() {
  const router = useRouter();
  const mounted = useMounted();
  const { direction, isPastOffset } = useScrollDirection(64);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const cartCount = useCartStore((state) => selectCartCount(state.items));
  const wishlistCount = useCartStore((state) => state.wishlistIds.length);

  const suggestions = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) {
      return products.slice(0, 4);
    }

    return products
      .filter((product) =>
        [product.name, product.category, product.gender, ...product.tags].join(" ").toLowerCase().includes(value)
      )
      .slice(0, 5);
  }, [query]);

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = query.trim();
    router.push(`/search${value ? `?q=${encodeURIComponent(value)}` : ""}`);
    setSearchOpen(false);
    setMobileOpen(false);
  }

  const hidden = direction === "down" && isPastOffset && !mobileOpen && !megaOpen && !searchOpen;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-500",
        hidden ? "-translate-y-full" : "translate-y-0",
        isPastOffset ? "glass-panel shadow-sm" : "bg-background"
      )}
      onMouseLeave={() => setMegaOpen(false)}
    >
      <div className="bg-foreground px-4 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-background">
        Free express shipping over $120 - New season edit live now
      </div>
      <nav className="container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-3 lg:gap-8">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-md overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="font-display text-3xl uppercase">VOLTURA</SheetTitle>
              </SheetHeader>
              <form onSubmit={submitSearch} className="mt-8 flex gap-2">
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search products"
                  aria-label="Search products"
                />
                <Button size="icon" aria-label="Search">
                  <Search className="h-4 w-4" />
                </Button>
              </form>
              <div className="mt-8 grid gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="border-b py-4 text-xl font-semibold uppercase tracking-[0.1em]"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="mt-8 grid gap-4">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    href={`/products?category=${category.name}`}
                    className="group relative block h-28 overflow-hidden"
                    onClick={() => setMobileOpen(false)}
                  >
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      sizes="400px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute inset-0 bg-black/35" />
                    <span className="absolute bottom-4 left-4 text-lg font-semibold uppercase tracking-[0.16em] text-white">
                      {category.name}
                    </span>
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>

          <Link href="/" className="font-display text-2xl uppercase tracking-normal md:text-3xl" aria-label="VOLTURA home">
            VOLTURA
          </Link>

          <div className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onMouseEnter={() => setMegaOpen(link.label === "Shop")}
                className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <div className="relative hidden md:block">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open search"
              title="Search"
              onClick={() => setSearchOpen((open) => !open)}
            >
              {searchOpen ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
            </Button>
            <AnimatePresence>
              {searchOpen ? (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.22 }}
                  className="absolute right-0 top-12 w-[28rem] border bg-background p-3 shadow-lift"
                >
                  <form onSubmit={submitSearch} className="flex gap-2">
                    <Input
                      autoFocus
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Search running, jackets, training"
                      aria-label="Search products"
                    />
                    <Button size="icon" aria-label="Search">
                      <Search className="h-4 w-4" />
                    </Button>
                  </form>
                  <div className="mt-3 grid gap-1">
                    {suggestions.map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.slug}`}
                        onClick={() => setSearchOpen(false)}
                        className="flex items-center gap-3 p-2 transition-colors hover:bg-muted"
                      >
                        <div className="relative h-14 w-14 overflow-hidden bg-muted">
                          <Image src={product.images[0]} alt={product.name} fill sizes="56px" className="object-cover" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{product.name}</p>
                          <p className="text-xs text-muted-foreground">{product.category}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          <ModeToggle />
          <Button asChild variant="ghost" size="icon" aria-label="Profile" title="Profile">
            <Link href="/profile">
              <UserRound className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="ghost" size="icon" className="relative" aria-label="Wishlist" title="Wishlist">
            <Link href="/wishlist">
              <Heart className="h-4 w-4" />
              {mounted && wishlistCount > 0 ? (
                <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center bg-accent px-1 text-[10px] font-bold text-accent-foreground">
                  {wishlistCount}
                </span>
              ) : null}
            </Link>
          </Button>
          <Button asChild variant="ghost" size="icon" className="relative" aria-label="Cart" title="Cart">
            <Link href="/cart">
              <ShoppingBag className="h-4 w-4" />
              {mounted && cartCount > 0 ? (
                <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                  {cartCount}
                </span>
              ) : null}
            </Link>
          </Button>
        </div>
      </nav>

      <AnimatePresence>
        {megaOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.24 }}
            className="hidden border-t bg-background shadow-lift lg:block"
            onMouseEnter={() => setMegaOpen(true)}
          >
            <div className="container grid grid-cols-[1.2fr_0.8fr] gap-10 py-8">
              <div className="grid grid-cols-5 gap-4">
                {categories.map((category) => (
                  <Link key={category.name} href={`/products?category=${category.name}`} className="group">
                    <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        sizes="220px"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <p className="mt-3 font-semibold uppercase tracking-[0.12em]">{category.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{category.accent}</p>
                  </Link>
                ))}
              </div>
              <div className="grid grid-cols-[0.9fr_1fr] gap-6 border-l pl-8">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">Featured drop</p>
                  <h3 className="mt-4 font-display text-4xl uppercase leading-none">Carbon performance edit</h3>
                  <p className="mt-4 text-sm leading-6 text-muted-foreground">
                    Monochrome staples with technical textures and a warmer clay accent.
                  </p>
                  <Button asChild className="mt-6">
                    <Link href="/products?tag=limited">Shop the edit</Link>
                  </Button>
                </div>
                <div className="relative min-h-64 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80"
                    alt="Training editorial"
                    fill
                    sizes="420px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
