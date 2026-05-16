import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({ eyebrow, title, description, align = "left", className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">{eyebrow}</p>
      ) : null}
      <h2 className="font-display text-4xl uppercase leading-none tracking-normal md:text-6xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-7 text-muted-foreground md:text-lg">{description}</p> : null}
    </div>
  );
}
