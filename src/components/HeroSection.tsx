"use client";

import React from 'react';
import { Button } from './ui/Button';
import { FiArrowDownCircle } from 'react-icons/fi'; // Modern icon for scroll indication
import { useHarmonicScroll } from '@/hooks/useHarmonicScroll';

export function HeroSection() {
  const { scrollToSection } = useHarmonicScroll();

  const handleScrollClick = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection('about');
  };

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden w-full px-4">
      {/* Sophisticated minimal background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.08) 0%, transparent 55%)',
          opacity: 1
        }}
      />
      
      {/* Elegant ambient orb - single, refined */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[460px] h-[460px] bg-primary/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Refined intro badge - sophisticated and minimal */}
        <div
          className="mb-8 inline-flex items-center gap-2.5 rounded-full glass-border bg-primary/5 px-5 py-2 backdrop-blur-xl font-mono"
          style={{
            fontSize: 'var(--font-size-sm)',
            letterSpacing: '-0.01em'
          }}
        >
          <span className="relative h-2 w-2 rounded-full bg-primary">
            <span className="absolute inset-0 rounded-full bg-primary opacity-65" />
          </span>
          <span className="font-medium text-foreground/90">Data science • Analytics • AI</span>
        </div>
        <div>
          <h1
            className="text-center mb-6 text-foreground font-[var(--font-display)]"
            style={{
              fontSize: 'clamp(2.75rem, 6vw, 5rem)',
              letterSpacing: 'var(--letter-spacing-tighter)',
              fontWeight: 'var(--font-weight-bold)',
              lineHeight: 'var(--line-height-tight)',
              textWrap: 'balance'
            }}
          >
            Naeem — a data-focused builder
          </h1>
          
          {/* Refined accent line - elegant and minimal */}
          <div
            className="relative w-24 mx-auto mt-6 mb-8"
          >
            <div className="divider" />
          </div>
          
          <p
            className="max-w-2xl mx-auto mb-10 text-foreground/75 text-center text-balance font-light"
            style={{
              fontSize: 'clamp(1.0625rem, 1.5vw, 1.1875rem)',
              lineHeight: 'var(--line-height-relaxed)',
              letterSpacing: 'var(--letter-spacing-wide)'
            }}
          >
            I explore data, build models, and turn insight into impact. Interested in analytics, data science, AI, and the systems that ship them.
          </p>
          
          <div
            className="flex flex-col sm:flex-row gap-5 justify-center items-center mt-8"
          >
            <Button href="#projects" size="lg" variant="primary" className="w-full sm:w-auto">
              View projects
            </Button>
            <Button href="#contact" variant="outline" size="lg" className="w-full sm:w-auto">
              Contact
            </Button>
          </div>
        </div>
      </div>
      
      {/* Refined Scroll Indicator - elegant and minimal */}
      <a
        href="#about"
        onClick={handleScrollClick}
        className="absolute bottom-12 inset-x-0 mx-auto flex items-center justify-center text-foreground/50 no-underline transition-opacity hover:text-foreground"
        aria-label="Scroll to about section"
      >
        <FiArrowDownCircle size={28} />
      </a>
    </section>
  );
}
