"use client";

import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FiArrowUpRight, FiFileText } from 'react-icons/fi';

const primaryLinks = [
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const externalLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/Naeem1144',
    icon: FaGithub,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/naeemnagori/',
    icon: FaLinkedin,
  },
  {
    label: 'Resume',
    href: '/Naeem_Resume.pdf',
    icon: FiFileText,
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-8 sm:mt-10 border-t border-[var(--border)]">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="py-5 sm:py-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="min-w-0">
              <a
                href="#home"
                className="inline-flex items-center text-lg font-semibold tracking-tight text-[var(--foreground)]"
              >
                N<span className="text-[var(--accent)]">.</span>
              </a>
            </div>

            <div className="flex flex-col gap-3 md:items-end">
              <nav className="flex flex-wrap gap-2">
                {primaryLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="inline-flex items-center rounded-full border border-[var(--border)] px-3 py-1.5 text-xs text-[var(--foreground-muted)] transition-colors hover:text-[var(--foreground)] hover:border-[rgba(255,255,255,0.12)]"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <div className="flex flex-wrap gap-2">
                {externalLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-3 py-1.5 text-xs text-[var(--foreground-subtle)] transition-colors hover:text-[var(--foreground)] hover:border-[rgba(var(--accent-rgb),0.2)]"
                  >
                    <link.icon className="h-3.5 w-3.5" />
                    <span>{link.label}</span>
                    <FiArrowUpRight className="h-3 w-3" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-1 border-t border-[var(--border)] pt-4 text-xs text-[var(--foreground-subtle)] sm:flex-row sm:items-center sm:justify-between">
            <p>&copy; {year} Naeem. All rights reserved.</p>
            <p>building technology as a path towards intelligence</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
