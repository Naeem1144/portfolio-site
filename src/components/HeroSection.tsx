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
        <div className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="h-[26rem] w-[26rem] rounded-full blur-3xl sm:h-[30rem] sm:w-[30rem]"
            style={{
              background:
                'radial-gradient(circle, rgba(var(--accent-rgb), 0.18) 0%, rgba(var(--accent-rgb), 0.10) 28%, rgba(99, 102, 241, 0.05) 50%, transparent 74%)',
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
        <div className="absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="h-[36rem] w-[36rem] rounded-full blur-[120px] sm:h-[42rem] sm:w-[42rem]"
            style={{
              background:
                'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, rgba(79, 70, 229, 0.07) 34%, transparent 70%)',
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
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border)] bg-[var(--background-elevated)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              <span className="text-xs text-[var(--foreground-muted)]">Available for opportunities</span>
            </div>
          </motion.div>

          {/* Name — mask reveal (text rises into view) */}
          <div className="overflow-hidden mb-4">
            <motion.h1 variants={maskReveal}>
              <span className="text-[var(--foreground)]">Naeem</span>
            </motion.h1>
          </div>

          {/* Role */}
          <motion.p
            variants={fadeUp}
            className="text-lg sm:text-xl md:text-2xl text-[var(--foreground-muted)] font-light tracking-tight mb-5"
          >
            Data Science, Analytics, Machine Learning &amp; AI
          </motion.p>

          {/* Tagline */}
          <motion.p
            variants={fadeUp}
            className="text-sm sm:text-base text-[var(--foreground-subtle)] max-w-md mx-auto mb-10 sm:mb-12 leading-relaxed"
          >
            I use data science, analytics, machine learning, and AI to uncover
            patterns, build predictive solutions, and turn raw data into decisions.
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

      {/* Bottom gradient fade into elevated section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, var(--background-elevated), transparent)',
        }}
      />
    </section>
  );
}
