"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
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
  const reduceMotion = useReducedMotion();

  return (
    <section className="container py-12 sm:py-16">
      <div className="mb-8 flex items-end justify-between gap-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:tracking-[0.28em]">{eyebrow}</p>
          <h2 className="responsive-heading mt-2 font-display uppercase tracking-normal md:text-6xl">{title}</h2>
        </div>
        <Button asChild variant="outline" className="hidden sm:inline-flex">
          <Link href={href}>View all</Link>
        </Button>
      </div>
      <motion.div
        className="no-scrollbar flex snap-x gap-4 overflow-x-auto pb-2"
        drag={reduceMotion ? false : "x"}
        dragConstraints={{ left: -280, right: 0 }}
      >
        {products.map((product, index) => (
          <div key={product.id} className="w-[82vw] shrink-0 snap-start sm:w-[42vw] lg:w-[24vw] xl:w-[20vw]">
            <ProductCard product={product} index={index} />
          </div>
        ))}
      </motion.div>
    </section>
  );
}
