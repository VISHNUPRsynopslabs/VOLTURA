import { Star } from "lucide-react";
import { MotionReveal } from "@/components/shared/motion-reveal";

const reviews = [
  {
    quote: "The silhouettes feel editorial, but everything still performs in real workouts.",
    author: "Nina Vale",
    role: "Studio trainer"
  },
  {
    quote: "VOLTURA nails the clean city-athlete look. I travel with the jacket and runner every week.",
    author: "Jordan Lee",
    role: "Creative director"
  },
  {
    quote: "The materials are the difference. Light, structured, and surprisingly durable.",
    author: "Samira Cole",
    role: "Marathon club lead"
  }
];

export function ReviewsSection() {
  return (
    <section className="bg-muted/45 py-16">
      <div className="container">
        <div className="mb-10 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">Customer notes</p>
          <h2 className="mt-3 font-display text-4xl uppercase leading-none md:text-6xl">Worn hard, styled clean</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {reviews.map((review, index) => (
            <MotionReveal key={review.author} delay={index * 0.08} className="border bg-background p-6">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, star) => (
                  <Star key={star} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-6 text-xl font-medium leading-8">&quot;{review.quote}&quot;</p>
              <p className="mt-6 font-semibold">{review.author}</p>
              <p className="text-sm text-muted-foreground">{review.role}</p>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
