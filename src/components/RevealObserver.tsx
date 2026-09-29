"use client";

import { useEffect } from "react";

/**
 * Marks `[data-reveal]` blocks that start below the fold as pending, and
 * reveals each one as it scrolls into view. Blocks already on screen are left
 * alone, so nothing visible ever blinks out, and without JavaScript or with
 * reduced motion every block is simply there.
 */
export function RevealObserver() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.removeAttribute("data-pending");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );

    for (const element of document.querySelectorAll("[data-reveal]")) {
      if (element.getBoundingClientRect().top < window.innerHeight * 0.9) continue;
      element.setAttribute("data-pending", "");
      observer.observe(element);
    }

    return () => {
      observer.disconnect();
      for (const element of document.querySelectorAll("[data-pending]")) {
        element.removeAttribute("data-pending");
      }
    };
  }, []);

  return null;
}
