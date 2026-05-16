import { Clock3, RotateCcw, ShieldCheck, Truck } from "lucide-react";

const badges = [
  { icon: Truck, title: "Free express shipping", body: "On orders over $120" },
  { icon: RotateCcw, title: "30 day returns", body: "No-fuss exchanges" },
  { icon: ShieldCheck, title: "Secure checkout", body: "Stripe-ready payment flow" },
  { icon: Clock3, title: "Fast dispatch", body: "Ships in 24 hours" }
];

export function TrustBadges() {
  return (
    <section className="border-y bg-muted/45">
      <div className="container grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
        {badges.map((badge) => {
          const Icon = badge.icon;
          return (
            <div key={badge.title} className="flex items-center gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center bg-background">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold uppercase tracking-[0.08em]">{badge.title}</p>
                <p className="text-sm text-muted-foreground">{badge.body}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
