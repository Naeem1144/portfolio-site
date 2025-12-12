"use client";

import React from 'react';
import { Button } from './ui/Button';
import { FiArrowDown } from 'react-icons/fi'; // Cleaner icons
import { useHarmonicScroll } from '@/hooks/useHarmonicScroll';

export function HeroSection() {
  const { scrollToSection } = useHarmonicScroll();

  const handleScrollClick = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection('about');
  };

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden w-full px-4 pt-20">
      {/* Refined minimalist background - simple radial gradient */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 30%, rgba(255, 255, 255, 0.03) 0%, transparent 70%)',
        }}
      />
      
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center">

        {/* Modern "Status" Pill */}
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/40 bg-white/5 backdrop-blur-sm">
             <span className="relative flex h-2 w-2">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
             </span>
             <span className="text-xs font-medium text-muted-foreground tracking-wide">Available for new opportunities</span>
           </div>
        </div>

        {/* Main Heading - Clean & Impactful */}
        <h1
          className="text-foreground tracking-tight font-bold mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100"
          style={{
            fontSize: 'clamp(3.5rem, 8vw, 6rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
          }}
        >
          Build. <span className="text-muted-foreground">Analyze.</span> <br className="hidden sm:block" /> Ship.
        </h1>

        {/* Subheading - Refined Typography */}
        <p
          className="max-w-2xl mx-auto mb-10 text-muted-foreground text-lg sm:text-xl font-light leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200"
          style={{
            textWrap: 'balance'
          }}
        >
          I&apos;m <span className="text-foreground font-medium">Naeem</span>, a data-focused builder turning insights into impact.
          Specializing in advanced analytics, machine learning, and scalable systems.
        </p>

        {/* Action Buttons - Minimalist */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300"
        >
          <Button
            href="#projects"
            size="lg"
            className="h-12 px-8 rounded-full bg-foreground text-background hover:bg-foreground/90 font-medium text-base w-full sm:w-auto transition-transform hover:scale-105"
          >
            View Projects
          </Button>
          <Button
            href="#contact"
            variant="outline"
            size="lg"
            className="h-12 px-8 rounded-full border-border/50 hover:bg-white/5 font-medium text-base w-full sm:w-auto"
          >
            Contact Me
          </Button>
        </div>

        {/* Social Proof / Tech Stack Hints (Optional refined footer for hero) */}
        <div className="mt-16 sm:mt-24 opacity-0 animate-in fade-in duration-1000 delay-500 fill-mode-forwards">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">Core Tech Stack</p>
          <div className="flex gap-6 sm:gap-8 justify-center items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
             {/* Simple text or icons for tech stack - keeping it text for cleanliness if no icons available */}
             <span className="text-sm font-mono text-foreground/80">Python</span>
             <span className="w-1 h-1 rounded-full bg-border"></span>
             <span className="text-sm font-mono text-foreground/80">SQL</span>
             <span className="w-1 h-1 rounded-full bg-border"></span>
             <span className="text-sm font-mono text-foreground/80">TensorFlow</span>
             <span className="w-1 h-1 rounded-full bg-border"></span>
             <span className="text-sm font-mono text-foreground/80">React</span>
             <span className="w-1 h-1 rounded-full bg-border"></span>
             <span className="text-sm font-mono text-foreground/80">Next.js</span>
          </div>
        </div>
      </div>
      
      {/* Minimal Scroll Indicator */}
      <a
        href="#about"
        onClick={handleScrollClick}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground/50 hover:text-foreground transition-colors p-2 animate-bounce delay-1000"
        aria-label="Scroll to about section"
      >
        <FiArrowDown size={24} />
      </a>
    </section>
  );
}
