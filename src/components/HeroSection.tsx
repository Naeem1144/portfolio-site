"use client";

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { Button } from './ui/Button';
import { FluidBackground } from './FluidBackground';

// Smooth deceleration curve — fast start, graceful settle
const ease = [0.16, 1, 0.3, 1] as const;

// Parent orchestrator — keeps child transitions coordinated
const heroContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.15,
    },
  },
};

// Gentle fade for the status badge (no translation — stays still)
const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1, ease },
  },
};

// Mask reveal — text slides up from behind overflow-hidden wrapper
const maskReveal = {
  hidden: { y: "100%" },
  visible: {
    y: 0,
    transition: { duration: 0.9, ease },
  },
};

// Standard fade-up for body elements
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease },
  },
};

export function HeroSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="relative w-full min-h-[100svh] flex items-center justify-center overflow-hidden"
    >
      {/* Static fallback glow so the hero reads even without WebGL */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="h-[50svh] w-[50svh] max-h-[40rem] max-w-[40rem] rounded-full blur-3xl"
            style={{
              background:
                'radial-gradient(circle, rgba(var(--accent-rgb), 0.15) 0%, rgba(var(--accent-rgb), 0.08) 28%, rgba(99, 102, 241, 0.04) 50%, transparent 74%)',
            }}
            animate={
              reduceMotion
                ? undefined
                : {
                    x: [0, 18, -14, 0],
                    y: [0, -22, 16, 0],
                    scale: [1, 1.08, 0.96, 1],
                    opacity: [0.78, 0.98, 0.84, 0.78],
                  }
            }
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
        <div className="absolute left-1/2 top-[70%] -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="h-[60svh] w-[60svh] max-h-[48rem] max-w-[48rem] rounded-full blur-[120px]"
            style={{
              background:
                'radial-gradient(circle, rgba(99, 102, 241, 0.06) 0%, rgba(79, 70, 229, 0.04) 34%, transparent 70%)',
            }}
            animate={
              reduceMotion
                ? undefined
                : {
                    x: [0, -24, 12, 0],
                    y: [0, 18, -14, 0],
                    scale: [1, 0.94, 1.04, 1],
                    opacity: [0.70, 0.86, 0.76, 0.70],
                  }
            }
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      </div>

      {/* WebGL fluid background */}
      <FluidBackground />

      {/* Main Content */}
      <div className="container relative z-10 px-4 sm:px-6">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          variants={heroContainer}
          initial={false}
          animate="visible"
        >
          {/* Status badge */}
          <motion.div variants={fadeIn} className="mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--border)] bg-[var(--background-elevated)] backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
              <span className="text-xs font-medium text-[var(--foreground-muted)] tracking-wide">Available for opportunities</span>
            </div>
          </motion.div>

          {/* Name — mask reveal with gradient */}
          <div className="overflow-hidden mb-5">
            <motion.h1 variants={maskReveal}>
              <span className="gradient-text">Naeem</span>
            </motion.h1>
          </div>

          {/* Role — split emphasis */}
          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg md:text-xl tracking-tight mb-6"
          >
            <span className="text-[var(--foreground)] font-light">Data Science</span>
            <span className="text-[var(--foreground-ghost)] font-light mx-2">·</span>
            <span className="text-[var(--foreground)] font-light">Machine Learning</span>
            <span className="text-[var(--foreground-ghost)] font-light mx-2">·</span>
            <span className="text-[var(--accent)] font-medium opacity-80">AI</span>
          </motion.p>

          {/* Tagline */}
          <motion.p
            variants={fadeUp}
            className="text-sm sm:text-base text-[var(--foreground-muted)] max-w-md mx-auto mb-10 sm:mb-12 leading-relaxed"
          >
            Investigating intelligence through data, algorithms, mathematical
            structure and underlying learning systems.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-3 justify-center items-center"
          >
            <Button href="#projects" variant="primary" size="lg">
              View My Work
              <FiArrowRight className="w-4 h-4" />
            </Button>
            <Button href="#contact" variant="outline" size="lg">
              Get in Touch
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Fade into next section (elevated bg) */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, var(--background-elevated) 100%)',
        }}
      />
    </section>
  );
}
