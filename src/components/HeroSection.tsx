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
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden w-full px-4">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(var(--accent-rgb),0.14),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(var(--primary-rgb),0.12),transparent_38%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent)]" />
      <div className="absolute -right-24 bottom-[-12rem] w-[360px] h-[360px] rounded-full bg-primary/15 blur-3xl" />
      <div className="absolute -left-24 top-[-10rem] w-[420px] h-[420px] rounded-full bg-accent/10 blur-3xl" />

      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
          <div className="space-y-8 text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 border border-white/5 shadow-soft backdrop-blur">
              <span className="flex h-2 w-2 rounded-full bg-primary" aria-hidden />
              <span className="text-sm font-medium tracking-tight text-foreground/85">Data science · Analytics · AI systems</span>
            </div>

            <div className="space-y-5">
              <h1 className="font-[var(--font-display)] text-foreground" style={{ fontSize: 'clamp(2.75rem, 6vw, 4.75rem)', letterSpacing: 'var(--letter-spacing-tight)', lineHeight: 'var(--line-height-tight)' }}>
                Naeem — turning complex data into decisions
              </h1>
              <p className="max-w-2xl text-foreground/75 text-lg leading-relaxed text-balance">
                I explore datasets, design analytical systems, and deploy AI-driven solutions that help teams move from insight to action with confidence.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button href="#projects" size="lg" variant="primary" className="w-full sm:w-auto">View projects</Button>
              <Button href="#contact" variant="outline" size="lg" className="w-full sm:w-auto">Book a call</Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" role="list">
              {[{ label: 'Data & AI projects', value: '15+' }, { label: 'Certifications', value: '10+' }, { label: 'Tools & stacks', value: 'Python · SQL · BI' }].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-card p-4 shadow-soft"
                  role="listitem"
                  style={{ backgroundColor: 'rgba(19, 21, 26, 0.75)' }}
                >
                  <p className="text-xs uppercase tracking-[0.14em] text-foreground/60">{item.label}</p>
                  <p className="mt-2 text-lg font-semibold text-foreground">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-x-4 top-8 h-[60%] rounded-3xl bg-gradient-to-b from-primary/10 via-background to-transparent blur-3xl" aria-hidden />
            <div
              className="relative rounded-3xl border border-white/10 bg-card shadow-2xl shadow-black/40 backdrop-blur-lg p-8 space-y-6"
              style={{ backgroundColor: 'rgba(19, 21, 26, 0.9)' }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-foreground/60">Currently exploring</p>
                  <p className="mt-1 text-xl font-semibold text-foreground">Agentic AI & RAG workflows</p>
                </div>
                <span className="inline-flex items-center rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary">Open to work</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/8 bg-background/60 p-4">
                  <p className="text-xs uppercase tracking-[0.14em] text-foreground/60">Recent focus</p>
                  <p className="mt-2 text-foreground font-semibold">Analytics engineering, BI automation</p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-background/60 p-4">
                  <p className="text-xs uppercase tracking-[0.14em] text-foreground/60">Impact</p>
                  <p className="mt-2 text-foreground font-semibold">Insights that drive decisions—not dashboards alone</p>
                </div>
              </div>

              <div className="rounded-2xl border border-primary/20 bg-primary/10 p-5">
                <p className="text-sm text-foreground/85 leading-relaxed">
                  From wrangling data to productionizing models, I bring a product mindset: clarity in communication, repeatable workflows, and deliverables that stakeholders can trust.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {['Python', 'SQL', 'Power BI', 'Tableau', 'LLMs', 'ETL'].map((chip) => (
                    <span key={chip} className="rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-foreground/80" style={{ backgroundColor: 'rgba(10, 12, 16, 0.7)' }}>
                      {chip}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button href="#contact" variant="primary" className="w-full sm:w-auto">Let&apos;s collaborate</Button>
                <Button href="/Naeem_Resume.pdf" target="_blank" variant="ghost" className="w-full sm:w-auto">Download resume</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#about"
        onClick={handleScrollClick}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full border border-white/10 bg-background/70 px-4 py-2 text-foreground/70 no-underline transition hover:text-foreground hover:border-white/30"
        aria-label="Scroll to about section"
      >
        <FiArrowDownCircle size={22} />
        <span className="text-sm font-medium">Explore more</span>
      </a>
    </section>
  );
}
