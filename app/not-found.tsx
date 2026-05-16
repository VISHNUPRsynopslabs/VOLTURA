import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="container grid min-h-[70vh] place-items-center py-20 text-center">
      <div className="max-w-2xl">
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
