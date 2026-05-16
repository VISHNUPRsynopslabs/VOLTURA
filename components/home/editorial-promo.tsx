import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MotionReveal } from "@/components/shared/motion-reveal";

export function EditorialPromo() {
  return (
    <section className="grid lg:grid-cols-2">
      <MotionReveal className="relative min-h-[34rem] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=1400&q=80"
          alt="Runner in premium training apparel"
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/36" />
        <div className="absolute bottom-8 left-6 right-6 text-white md:left-10 md:right-10">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">Run system</p>
          <h2 className="mt-3 max-w-lg font-display text-5xl uppercase leading-none md:text-7xl">Light where it counts</h2>
          <Button asChild className="mt-6 bg-white text-black hover:bg-white/88">
            <Link href="/products?tag=running">
              Shop run gear <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </MotionReveal>
      <MotionReveal delay={0.1} className="relative min-h-[34rem] overflow-hidden bg-foreground text-background">
        <Image
          src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=80"
          alt="Editorial fashion movement"
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute bottom-8 left-6 right-6 md:left-10 md:right-10">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">Street uniform</p>
          <h2 className="mt-3 max-w-lg font-display text-5xl uppercase leading-none text-white md:text-7xl">
            Tailored for motion
          </h2>
          <Button asChild className="mt-6 bg-white text-black hover:bg-white/88">
            <Link href="/products?category=Lifestyle">
              Shop lifestyle <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </MotionReveal>
    </section>
  );
}
