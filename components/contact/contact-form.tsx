"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.includes("@") || message.trim().length < 10) {
      toast.error("Add a valid email and message.");
      return;
    }

    toast.success("Message sent to the demo support queue.");
    setEmail("");
    setMessage("");
  }

  return (
    <section className="container grid gap-10 py-10 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <div className="relative mb-8 aspect-[16/10] overflow-hidden bg-muted">
          <Image
            src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80"
            alt="VOLTURA support studio editorial"
            fill
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <p className="absolute bottom-5 left-5 text-sm font-semibold uppercase tracking-[0.22em] text-white">
            Studio support
          </p>
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">Contact</p>
        <h1 className="mt-3 font-display text-5xl uppercase leading-none md:text-7xl">Talk to support</h1>
        <p className="mt-5 text-lg leading-8 text-muted-foreground">
          Get help with sizing, shipping, returns, or integrating this demo with a real commerce backend.
        </p>
        <div className="mt-8 grid gap-4">
          <Info icon={Mail} title="Email" body="support@voltura.demo" />
          <Info icon={Phone} title="Phone" body="+1 555 012 8842" />
          <Info icon={MapPin} title="Studio" body="88 Mercer Street, New York" />
        </div>
      </div>
      <form onSubmit={submit} className="grid gap-4 border p-5 md:p-8">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm">
            <span className="font-medium">Name</span>
            <Input />
          </label>
          <label className="grid gap-2 text-sm">
            <span className="font-medium">Email</span>
            <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          </label>
        </div>
        <label className="grid gap-2 text-sm">
          <span className="font-medium">Subject</span>
          <Input />
        </label>
        <label className="grid gap-2 text-sm">
          <span className="font-medium">Message</span>
          <Textarea value={message} onChange={(event) => setMessage(event.target.value)} />
        </label>
        <Button type="submit" size="lg">
          Send message
        </Button>
      </form>
    </section>
  );
}

function Info({ icon: Icon, title, body }: { icon: React.ElementType; title: string; body: string }) {
  return (
    <div className="flex items-center gap-4 border p-4">
      <span className="grid h-11 w-11 place-items-center bg-muted">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="font-semibold uppercase tracking-[0.1em]">{title}</p>
        <p className="text-sm text-muted-foreground">{body}</p>
      </div>
    </div>
  );
}
