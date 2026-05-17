"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { heroSlides } from "@/data/products";
import { Button } from "@/components/ui/button";

export function HeroCarousel() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const slide = heroSlides[active];

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % heroSlides.length);
    }, 6200);

    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  function updateSlide(direction: 1 | -1) {
    setActive((current) => (current + direction + heroSlides.length) % heroSlides.length);
  }

  return (
    <section className="relative min-h-[calc(100svh-5rem)] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.title}
          initial={reduceMotion ? false : { opacity: 0, scale: 1.015 }}
          animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/58 via-black/16 to-black/8" />
        </motion.div>
      </AnimatePresence>

      <div className="container relative z-10 flex min-h-[calc(100svh-5rem)] items-end pb-16 pt-24 sm:pb-20">
        <motion.div
          key={slide.title}
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="max-w-4xl text-white"
        >
          <p className="max-w-full text-xs font-semibold uppercase tracking-[0.22em] text-white/72 sm:tracking-[0.32em]">
            {slide.eyebrow}
          </p>
          <h1 className="responsive-display mt-5 max-w-[10ch] font-display uppercase tracking-normal lg:text-9xl">
            {slide.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/78 sm:text-lg md:text-xl md:leading-8">{slide.body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-white text-black hover:bg-white/88">
              <Link href={slide.href}>{slide.cta}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
              <Link href="/categories">Explore categories</Link>
            </Button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-6 right-6 z-20 hidden gap-2 md:flex">
        <Button variant="secondary" size="icon" aria-label="Previous slide" onClick={() => updateSlide(-1)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="icon" aria-label="Next slide" onClick={() => updateSlide(1)}>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {heroSlides.map((item, index) => (
          <button
            key={item.title}
            type="button"
            aria-label={`Go to ${item.title}`}
            onClick={() => setActive(index)}
            className={`h-1.5 transition-all ${active === index ? "w-10 bg-white" : "w-5 bg-white/45"}`}
          />
        ))}
      </div>
    </section>
  );
}
