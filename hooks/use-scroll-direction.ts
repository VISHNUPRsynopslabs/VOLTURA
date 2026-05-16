"use client";

import { useEffect, useState } from "react";

export function useScrollDirection(offset = 80) {
  const [direction, setDirection] = useState<"up" | "down">("up");
  const [isPastOffset, setIsPastOffset] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;

    const updateScroll = () => {
      const currentY = window.scrollY;
      setIsPastOffset(currentY > offset);

      if (Math.abs(currentY - lastY) > 8) {
        setDirection(currentY > lastY ? "down" : "up");
        lastY = currentY;
      }
    };

    window.addEventListener("scroll", updateScroll, { passive: true });
    updateScroll();

    return () => window.removeEventListener("scroll", updateScroll);
  }, [offset]);

  return { direction, isPastOffset };
}
