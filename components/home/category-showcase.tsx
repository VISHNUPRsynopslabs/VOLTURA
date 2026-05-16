import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/products";
import { MotionReveal } from "@/components/shared/motion-reveal";
import { SectionHeading } from "@/components/shared/section-heading";

export function CategoryShowcase() {
  return (
    <section className="container py-16">
      <SectionHeading
        eyebrow="Shop by discipline"
        title="Built for every pace"
        description="A focused catalog organized around movement, climate, and daily rotation."
      />
      <div className="mt-10 grid gap-4 md:grid-cols-5">
        {categories.map((category, index) => (
          <MotionReveal key={category.name} delay={index * 0.05} className="group md:even:pt-10">
            <Link href={`/products?category=${category.name}`} className="block">
              <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(min-width: 768px) 20vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">{category.accent}</p>
                  <h3 className="mt-2 text-2xl font-semibold uppercase tracking-[0.08em]">{category.name}</h3>
                </div>
              </div>
            </Link>
          </MotionReveal>
        ))}
      </div>
    </section>
  );
}
