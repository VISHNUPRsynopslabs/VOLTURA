"use client";

import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterSection() {
  const [email, setEmail] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.includes("@")) {
      toast.error("Use a valid email address.");
      return;
    }

    toast.success("Drop alerts enabled.");
    setEmail("");
  }

  return (
    <section className="container py-16">
      <div className="grid gap-8 border bg-foreground p-6 text-background md:grid-cols-[1fr_0.9fr] md:p-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-background/60">Newsletter</p>
          <h2 className="mt-4 font-display text-4xl uppercase leading-none md:text-6xl">Get the next drop first</h2>
        </div>
        <form onSubmit={submit} className="flex items-end gap-2">
          <Input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            placeholder="Email address"
            aria-label="Email address"
            className="border-background/20 bg-background/10 text-background placeholder:text-background/50"
          />
          <Button type="submit" variant="secondary" size="icon" aria-label="Subscribe">
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </section>
  );
}
