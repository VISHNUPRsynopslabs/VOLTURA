"use client";

import Image from "next/image";
import { FormEvent, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { products } from "@/data/products";
import { ProductGrid } from "@/components/product/product-grid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SearchResults() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);

  const results = useMemo(() => {
    const value = initialQuery.trim().toLowerCase();
    if (!value) {
      return products;
    }

    return products.filter((product) =>
      [product.name, product.eyebrow, product.description, product.category, product.gender, ...product.tags]
        .join(" ")
        .toLowerCase()
        .includes(value)
    );
  }, [initialQuery]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push(`/search${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ""}`);
  }

  return (
    <section className="container py-10">
      <div className="mb-8 border-b pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">Search</p>
        <h1 className="mt-3 font-display text-5xl uppercase leading-none md:text-7xl">
          {initialQuery ? `Results for ${initialQuery}` : "Search products"}
        </h1>
        <form onSubmit={submit} className="mt-6 flex max-w-2xl gap-2">
          <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products" />
          <Button type="submit">
            <Search className="mr-2 h-4 w-4" /> Search
          </Button>
        </form>
      </div>
      {results.length ? (
        <ProductGrid products={results} />
      ) : (
        <div className="mx-auto max-w-2xl border p-5 text-center md:p-8">
          <div className="relative mb-6 aspect-[16/9] overflow-hidden bg-muted">
            <Image
              src="https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1100&q=80"
              alt="Performance apparel search inspiration"
              fill
              sizes="(min-width: 768px) 672px, 100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/58 to-transparent" />
          </div>
          <p className="font-semibold">No products matched that search.</p>
          <p className="mt-2 text-sm text-muted-foreground">Try runner, jacket, training, or lifestyle.</p>
        </div>
      )}
    </section>
  );
}
