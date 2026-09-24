"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const links = [
  { label: "Work", id: "projects" },
  { label: "About", id: "about" },
  { label: "Toolkit", id: "skills" },
  { label: "Contact", id: "contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const firstMobileLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const update = () => {
      const current = ["home", ...links.map((link) => link.id)]
        .reverse()
        .find((id) => {
          const section = document.getElementById(id);
          return section && section.getBoundingClientRect().top <= 180;
        });
      setActive(current || "home");
    };
    const escape = (event: KeyboardEvent) => {
      if (
        event.key === "Escape" &&
        document
          .getElementById("menu-toggle")
          ?.getAttribute("aria-expanded") === "true"
      ) {
        setOpen(false);
        document.getElementById("menu-toggle")?.focus();
      }
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("keydown", escape);
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("keydown", escape);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const frame = requestAnimationFrame(() => firstMobileLink.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [open]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a
          href="#home"
          className="wordmark"
          aria-label="Naeem Nagori, home"
          onClick={() => setOpen(false)}
        >
          <span className="brand-symbol" aria-hidden="true">
            n<span>n</span>
            <i />
          </span>
          <span className="brand-name">
            Naeem Nagori<span>DATA ANALYST</span>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              aria-current={active === link.id ? "location" : undefined}
            >
              {link.label}
              <span className="nav-dot" />
            </a>
          ))}
        </nav>
        <a
          href="/Naeem_Nagori_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="resume-link"
          aria-label="Open résumé PDF in a new tab"
        >
          Résumé <ArrowUpRight size={16} />
        </a>
        <button
          id="menu-toggle"
          type="button"
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>
      <nav
        id="mobile-navigation"
        className={`mobile-nav ${open ? "is-open" : ""}`}
        aria-label="Mobile navigation"
        inert={!open}
      >
        {links.map((link, index) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            ref={index === 0 ? firstMobileLink : undefined}
            aria-current={active === link.id ? "location" : undefined}
            onClick={() => setOpen(false)}
          >
            <span>0{index + 1}</span>
            {link.label}
            <ArrowUpRight size={22} />
          </a>
        ))}
        <a
          href="/Naeem_Nagori_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open résumé PDF in a new tab"
          onClick={() => setOpen(false)}
        >
          <span>PDF</span>Résumé
          <ArrowUpRight size={22} />
        </a>
      </nav>
    </header>
  );
}
