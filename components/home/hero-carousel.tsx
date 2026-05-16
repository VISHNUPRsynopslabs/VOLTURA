"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { heroSlides } from "@/data/products";
import { Button } from "@/components/ui/button";

export function HeroCarousel() {
  const [active, setActive] = useState(0);
  const slide = heroSlides[active];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % heroSlides.length);
    }, 6200);

    return () => window.clearInterval(timer);
  }, []);

  function updateSlide(direction: 1 | -1) {
    setActive((current) => (current + direction + heroSlides.length) % heroSlides.length);
  }

  return (
    <section className="relative min-h-[calc(100vh-5rem)] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.title}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
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

      <div className="container relative z-10 flex min-h-[calc(100vh-5rem)] items-end pb-16 pt-24">
        <motion.div
          key={slide.title}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="max-w-4xl text-white"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/72">{slide.eyebrow}</p>
          <h1 className="mt-5 font-display text-6xl uppercase leading-[0.86] tracking-normal md:text-8xl lg:text-9xl">
            {slide.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78 md:text-xl">{slide.body}</p>
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
