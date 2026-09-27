"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { BrandMark } from "./BrandMark";

const links = [
  { label: "Work", id: "projects" },
  { label: "About", id: "about" },
  { label: "Education", id: "credentials" },
  { label: "Contact", id: "contact" },
];

export function Header() {
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 8);

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
    <header className="site-header" data-scrolled={scrolled || undefined}>
      <div className="container site-header__inner">
        <a href="#top" className="wordmark">
          <span className="wordmark__seal"><BrandMark /></span>
          {site.name.split(" ")[0]}
          <span className="wordmark__rest"> {site.name.split(" ").slice(1).join(" ")}</span>
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

        <a
          href={site.resume.href}
          target="_blank"
          rel="noopener noreferrer"
          className="button button--small header-resume"
        >
          {site.resume.label}
          <span className="button__meta" aria-hidden="true">
            PDF
          </span>
          <span className="sr-only"> (PDF, opens in a new tab)</span>
        </a>
      </div>
    </header>
  );
}
