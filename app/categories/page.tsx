import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/products";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Categories",
  description: "Explore VOLTURA product categories across footwear, outerwear, training, lifestyle, and accessories."
};

export default function CategoriesPage() {
  return (
    <section className="container py-10">
      <div className="mb-8 border-b pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">Categories</p>
        <h1 className="mt-3 font-display text-5xl uppercase leading-none md:text-7xl">Shop by category</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {categories.map((category, index) => (
          <Link
            key={category.name}
            href={`/products?category=${category.name}`}
            className={`group relative min-h-[24rem] overflow-hidden ${index === 0 ? "md:col-span-2" : ""}`}
          >
            <Image
              src={category.image}
              alt={category.name}
              fill
              sizes={index === 0 ? "100vw" : "50vw"}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/76 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white md:bottom-8 md:left-8">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">{category.accent}</p>
              <h2 className="mt-3 font-display text-5xl uppercase leading-none md:text-7xl">{category.name}</h2>
              <p className="mt-4 max-w-xl text-white/76">{category.description}</p>
              <Button className="mt-6 bg-white text-black hover:bg-white/88">
                Shop {category.name} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
