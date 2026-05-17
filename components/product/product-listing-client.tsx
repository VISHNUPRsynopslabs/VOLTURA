"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import type { Product, ProductCategory } from "@/types/product";
import { categories } from "@/data/products";
import { ProductGrid } from "@/components/product/product-grid";
import { ProductSkeletonGrid } from "@/components/product/product-skeleton-grid";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const genders = ["all", "Men", "Women", "Unisex"] as const;
const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "new", label: "Newest" },
  { value: "price-asc", label: "Price low to high" },
  { value: "price-desc", label: "Price high to low" },
  { value: "rating", label: "Top rated" }
] as const;

type ProductListingClientProps = {
  products: Product[];
};

export function ProductListingClient({ products }: ProductListingClientProps) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") as ProductCategory | null;
  const initialTag = searchParams.get("tag");
  const initialSort = searchParams.get("sort") ?? "featured";
  const [category, setCategory] = useState<ProductCategory | "all">(initialCategory ?? "all");
  const [gender, setGender] = useState<(typeof genders)[number]>("all");
  const [sort, setSort] = useState(initialSort);
  const [maxPrice, setMaxPrice] = useState("250");
  const [tag, setTag] = useState(initialTag ?? "all");
  const [filterOpen, setFilterOpen] = useState(false);

  const tags = useMemo(() => Array.from(new Set(products.flatMap((product) => product.tags))), [products]);

  const filtered = useMemo(() => {
    const next = products
      .filter((product) => (category === "all" ? true : product.category === category))
      .filter((product) => (gender === "all" ? true : product.gender === gender))
      .filter((product) => (tag === "all" ? true : product.tags.includes(tag)))
      .filter((product) => product.price <= Number(maxPrice));

    switch (sort) {
      case "new":
        return [...next].sort((a, b) => Number(Boolean(b.isNew)) - Number(Boolean(a.isNew)));
      case "price-asc":
        return [...next].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...next].sort((a, b) => b.price - a.price);
      case "rating":
        return [...next].sort((a, b) => b.rating - a.rating);
      default:
        return [...next].sort((a, b) => Number(Boolean(b.isFeatured)) - Number(Boolean(a.isFeatured)));
    }
  }, [category, gender, maxPrice, products, sort, tag]);

  const filters = (
    <div className="grid gap-6">
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Category</p>
        <div className="grid gap-2">
          <FilterButton active={category === "all"} onClick={() => setCategory("all")}>
            All products
          </FilterButton>
          {categories.map((item) => (
            <FilterButton key={item.name} active={category === item.name} onClick={() => setCategory(item.name)}>
              {item.name}
            </FilterButton>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Audience</p>
        <div className="grid grid-cols-2 gap-2">
          {genders.map((item) => (
            <FilterButton key={item} active={gender === item} onClick={() => setGender(item)}>
              {item === "all" ? "All" : item}
            </FilterButton>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Collection</p>
        <Select value={tag} onValueChange={setTag}>
          <SelectTrigger>
            <SelectValue placeholder="Collection" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All collections</SelectItem>
            {tags.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Max price</p>
          <span className="text-sm font-semibold">${maxPrice}</span>
        </div>
        <input
          type="range"
          min="60"
          max="250"
          step="10"
          value={maxPrice}
          onChange={(event) => setMaxPrice(event.target.value)}
          className="w-full accent-foreground"
        />
      </div>
      <Button
        variant="outline"
        onClick={() => {
          setCategory("all");
          setGender("all");
          setTag("all");
          setMaxPrice("250");
          setSort("featured");
        }}
      >
        <X className="mr-2 h-4 w-4" /> Clear filters
      </Button>
    </div>
  );

  return (
    <section className="container py-10">
      <div className="mb-8 flex flex-col gap-4 border-b pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">Shop the collection</p>
          <h1 className="mt-3 font-display text-5xl uppercase leading-none tracking-normal md:text-7xl">Performance store</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Filter technical apparel, footwear, and lifestyle essentials by category, audience, collection, and price.
          </p>
        </div>
        <div className="flex flex-col gap-3 min-[420px]:flex-row min-[420px]:items-center">
          <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden">
                <SlidersHorizontal className="mr-2 h-4 w-4" /> Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-8">{filters}</div>
            </SheetContent>
          </Sheet>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-full min-[420px]:w-56">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[17rem_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-32 border p-5">{filters}</div>
        </aside>
        <div>
          <div className="mb-5 flex items-center justify-between text-sm text-muted-foreground">
            <p>{filtered.length} products</p>
            <p>Premium mock catalog</p>
          </div>
          {filtered.length ? <ProductGrid products={filtered} /> : <ProductSkeletonGrid count={4} />}
        </div>
      </div>
    </section>
  );
}

function FilterButton({
  children,
  active,
  onClick
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border px-4 py-3 text-left text-sm font-semibold transition-colors ${
        active ? "bg-foreground text-background" : "hover:bg-muted"
      }`}
    >
      {children}
    </button>
  );
}
