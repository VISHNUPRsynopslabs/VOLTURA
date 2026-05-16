"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/types/product";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";

type ProductRailProps = {
  eyebrow: string;
  title: string;
  products: Product[];
  href?: string;
};

export function ProductRail({ eyebrow, title, products, href = "/products" }: ProductRailProps) {
  return (
    <section className="container py-16">
      <div className="mb-8 flex items-end justify-between gap-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">{eyebrow}</p>
          <h2 className="mt-2 font-display text-4xl uppercase leading-none tracking-normal md:text-6xl">{title}</h2>
        </div>
        <Button asChild variant="outline" className="hidden sm:inline-flex">
          <Link href={href}>View all</Link>
        </Button>
      </div>
      <motion.div className="no-scrollbar flex gap-4 overflow-x-auto pb-2" drag="x" dragConstraints={{ left: -360, right: 0 }}>
        {products.map((product, index) => (
          <div key={product.id} className="w-[78vw] shrink-0 sm:w-[42vw] lg:w-[24vw] xl:w-[20vw]">
            <ProductCard product={product} index={index} />
          </div>
        ))}
      </motion.div>
    </section>
  );
}
