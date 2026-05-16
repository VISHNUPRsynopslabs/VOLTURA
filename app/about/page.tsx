import Image from "next/image";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About Brand",
  description: "Learn about VOLTURA, an original premium sport-fashion brand concept."
};

export default function AboutPage() {
  return (
    <>
      <section className="relative min-h-[72vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1800&q=85"
          alt="VOLTURA editorial campaign"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/48" />
        <div className="container relative z-10 flex min-h-[72vh] items-end pb-12 text-white">
          <div className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/70">Original brand concept</p>
            <h1 className="mt-4 font-display text-6xl uppercase leading-none md:text-8xl">Made for velocity</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78">
              VOLTURA blends technical performance codes with a restrained fashion lens: fewer marks, sharper fits,
              better movement.
            </p>
          </div>
        </div>
      </section>
      <section className="container grid gap-10 py-16 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">Point of view</p>
          <h2 className="mt-3 font-display text-4xl uppercase leading-none md:text-6xl">Quiet technical luxury</h2>
        </div>
        <div className="grid gap-6 text-lg leading-8 text-muted-foreground">
          <p>
            The brand is intentionally minimal: black, white, stone, fog, and a restrained clay accent. Product pages
            focus on fabric, fit, utility, and motion instead of loud branding.
          </p>
          <p>
            This storefront is designed as a premium commerce foundation with real shopping flows, reusable data, and
            production-ready UI structure.
          </p>
          <Button asChild size="lg" className="w-fit">
            <Link href="/products">
              Shop the catalog <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
