"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { BrandMark } from "./BrandMark";

const links = [
  { no: "01", label: "Work", id: "projects" },
  { no: "02", label: "About", id: "about" },
  { no: "03", label: "Contact", id: "contact" },
];

export function Header() {
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [night, setNight] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 8);

      const contactSection = document.getElementById("contact");
      const headerHeight = headerRef.current?.offsetHeight ?? 64;
      setNight(
        Boolean(
          contactSection &&
            contactSection.getBoundingClientRect().top <= headerHeight * 0.6,
        ),
      );

      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      if (atBottom) {
        setActive(links[links.length - 1]!.id);
        return;
      }

      // A section becomes current once its top crosses the upper third; among
      // the crossed ones the lowest on screen (largest top) is the current one.
      // Ties and ordering do not depend on the order of `links`.
      const line = window.innerHeight * 0.33;
      let current: string | null = null;
      let crossedAt = -Infinity;
      for (const { id } of links) {
        const section = document.getElementById(id);
        if (!section) continue;
        const top = section.getBoundingClientRect().top;
        if (top <= line && top > crossedAt) {
          current = id;
          crossedAt = top;
        }
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
    <header
      ref={headerRef}
      className="site-header"
      data-scrolled={scrolled || undefined}
      data-night={night || undefined}
    >
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
                  <span className="nav__no" aria-hidden="true">
                    {link.no}
                  </span>
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
