"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(images[0]);
  const [origin, setOrigin] = useState("50% 50%");
  const reduceMotion = useReducedMotion();

  return (
    <div className="grid gap-4 lg:grid-cols-[5rem_1fr]">
      <div className="order-2 flex gap-3 overflow-x-auto lg:order-1 lg:flex-col">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setActive(image)}
            className={cn("relative h-20 w-20 shrink-0 overflow-hidden border bg-muted", active === image && "border-foreground")}
            aria-label={`View ${name} image ${index + 1}`}
          >
            <Image src={image} alt={`${name} thumbnail ${index + 1}`} fill sizes="80px" className="object-cover" />
          </button>
        ))}
      </div>
      <motion.div
        className="group relative order-1 aspect-[4/5] overflow-hidden bg-muted lg:order-2"
        onMouseMove={(event) => {
          if (reduceMotion || window.matchMedia("(hover: none)").matches) {
            return;
          }

          const rect = event.currentTarget.getBoundingClientRect();
          const x = ((event.clientX - rect.left) / rect.width) * 100;
          const y = ((event.clientY - rect.top) / rect.height) * 100;
          setOrigin(`${x}% ${y}%`);
        }}
      >
        <Image
          src={active}
          alt={name}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="touch-no-transform object-cover transition-transform duration-500 md:group-hover:scale-110"
          style={{ transformOrigin: origin }}
        />
      </motion.div>
    </div>
  );
}
