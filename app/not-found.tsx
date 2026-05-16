import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="container grid min-h-[70vh] place-items-center py-20 text-center">
      <div className="max-w-2xl">
        <div className="relative mx-auto mb-8 aspect-[16/9] w-full overflow-hidden bg-muted">
          <Image
            src="https://images.unsplash.com/photo-1507680434567-5739c80be1ac?auto=format&fit=crop&w=1200&q=80"
            alt="Editorial sportswear path"
            fill
            sizes="(min-width: 768px) 672px, 100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-muted-foreground">
          Error 404
        </p>
        <h1 className="font-display text-5xl uppercase leading-none tracking-normal md:text-7xl">
          This drop sold out
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-muted-foreground">
          The page you are looking for is no longer on the rack. Head back to the latest arrivals.
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link href="/products">
            Shop products <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
