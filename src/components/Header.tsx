"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { BrandMark } from "./BrandMark";

const links = [
  { label: "Work", id: "projects" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
];

export function Header() {
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 8);

      // Reading progress, drawn as the header's bottom rule. Set directly so
      // scrolling never re-renders the header.
      const range = document.documentElement.scrollHeight - window.innerHeight;
      const progress = range > 0 ? Math.min(1, window.scrollY / range) : 0;
      headerRef.current?.style.setProperty("--progress", progress.toFixed(4));

      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      if (atBottom) {
        setActive(links[links.length - 1]!.id);
        return;
      }

      // A section becomes current once its top crosses the upper third.
      const line = window.innerHeight * 0.33;
      let current: string | null = null;
      for (const { id } of links) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <header ref={headerRef} className="site-header" data-scrolled={scrolled || undefined}>
      <div className="container site-header__inner">
        <a href="#top" className="brand">
          <BrandMark />
          <span className="brand__name">{site.name}</span>
          <span className="sr-only">, back to top</span>
        </a>

        <nav aria-label="Primary">
          <ul className="nav">
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={active === link.id ? "location" : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
