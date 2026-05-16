"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function AuthPanel() {
  const [email, setEmail] = useState("");

  function submit(event: FormEvent<HTMLFormElement>, mode: "login" | "register") {
    event.preventDefault();
    if (!email.includes("@")) {
      toast.error("Add a valid email address.");
      return;
    }

    toast.success(mode === "login" ? "Demo login accepted." : "Demo account created.");
  }

  return (
    <section className="container grid min-h-[75vh] gap-10 py-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
      <div>
        <div className="relative mb-8 aspect-[16/10] overflow-hidden bg-muted lg:aspect-[5/4]">
          <Image
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80"
            alt="Premium VOLTURA member editorial"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/62 via-black/10 to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">Private access</p>
            <p className="mt-2 font-display text-4xl uppercase leading-none">Member studio</p>
          </div>
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">Account access</p>
        <h1 className="mt-4 font-display text-6xl uppercase leading-none md:text-8xl">Member studio</h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
          Track orders, save favorites, manage addresses, and get early access to limited product edits.
        </p>
      </div>
      <div className="border p-5 md:p-8">
        <Tabs defaultValue="login">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <AuthForm email={email} setEmail={setEmail} mode="login" onSubmit={submit} />
          </TabsContent>
          <TabsContent value="register">
            <AuthForm email={email} setEmail={setEmail} mode="register" onSubmit={submit} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

function AuthForm({
  email,
  setEmail,
  mode,
  onSubmit
}: {
  email: string;
  setEmail: (value: string) => void;
  mode: "login" | "register";
  onSubmit: (event: FormEvent<HTMLFormElement>, mode: "login" | "register") => void;
}) {
  return (
    <form onSubmit={(event) => onSubmit(event, mode)} className="grid gap-4">
      <label className="grid gap-2 text-sm">
        <span className="font-medium">Email</span>
        <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
      </label>
      {mode === "register" ? (
        <label className="grid gap-2 text-sm">
          <span className="font-medium">Full name</span>
          <Input />
        </label>
      ) : null}
      <label className="grid gap-2 text-sm">
        <span className="font-medium">Password</span>
        <Input type="password" />
      </label>
      <Button type="submit" size="lg">
        {mode === "login" ? "Login" : "Create account"} <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
      <p className="text-xs leading-5 text-muted-foreground">
        Authentication UI is ready for NextAuth, Clerk, Supabase Auth, or a custom provider.
      </p>
    </form>
  );
}
