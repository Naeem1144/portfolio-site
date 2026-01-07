"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowDown } from 'react-icons/fi';
import { 
  FiDatabase, 
  FiCpu, 
  FiBarChart2, 
  FiLayers, 
  FiZap, 
  FiTrendingUp,
  FiCode,
  FiGrid,
  FiActivity,
  FiBox,
  FiPieChart,
  FiTerminal
} from 'react-icons/fi';
import { Button } from './ui/Button';

// Floating orb component
function FloatingOrb({ 
  size, 
  color, 
  top, 
  left, 
  delay = 0 
}: { 
  size: number; 
  color: string; 
  top: string; 
  left: string; 
  delay?: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full blur-3xl pointer-events-none"
      style={{
        width: size,
        height: size,
        background: color,
        top,
        left,
      }}
      animate={{
        y: [-20, 20, -20],
        x: [-10, 10, -10],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}

// Animated grid background
function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--foreground) 1px, transparent 1px),
            linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, var(--background) 70%)',
        }}
      />
    </div>
  );
}

// Floating skill tag component
function FloatingTag({ 
  icon: Icon, 
  label, 
  position,
  delay = 0,
  floatDirection = 'up'
}: { 
  icon: React.ElementType;
  label: string;
  position: string;
  delay?: number;
  floatDirection?: 'up' | 'down' | 'left' | 'right';
}) {
  const floatAnimations = {
    up: { y: [0, -12, 0] },
    down: { y: [0, 12, 0] },
    left: { x: [0, -10, 0] },
    right: { x: [0, 10, 0] },
  };

  return (
    <motion.div
      className={`absolute flex items-center gap-2 px-3 py-2 rounded-full 
        bg-[var(--background-card)]/80 backdrop-blur-sm border border-[var(--border)] 
        shadow-lg shadow-black/20 ${position}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        ...floatAnimations[floatDirection],
      }}
      transition={{
        opacity: { duration: 0.5, delay: delay + 0.5 },
        scale: { duration: 0.5, delay: delay + 0.5 },
        y: { duration: 3 + Math.random() * 2, repeat: Infinity, delay, ease: "easeInOut" },
        x: { duration: 3 + Math.random() * 2, repeat: Infinity, delay, ease: "easeInOut" },
      }}
      whileHover={{ 
        scale: 1.1, 
        borderColor: 'rgba(0, 255, 170, 0.4)',
        transition: { duration: 0.2 } 
      }}
    >
      <Icon className="w-4 h-4 text-[var(--accent)]" />
      <span className="text-xs font-medium text-[var(--foreground-muted)] whitespace-nowrap">{label}</span>
    </motion.div>
  );
}

// Floating tags configuration - curated skills (well-spaced)
const floatingTags = [
  // Left side - spread vertically (show fewer on mobile, hide some on sm)
  { icon: FiTerminal, label: 'Python', position: 'top-[18%] left-[2%] sm:left-[3%] md:left-[6%] hidden sm:flex', delay: 0, floatDirection: 'up' as const },
  { icon: FiDatabase, label: 'SQL', position: 'top-[35%] left-[1%] sm:left-[2%] md:left-[4%] hidden md:flex', delay: 0.4, floatDirection: 'right' as const },
  { icon: FiBarChart2, label: 'Tableau', position: 'bottom-[35%] left-[2%] sm:left-[3%] md:left-[5%] hidden sm:flex', delay: 0.8, floatDirection: 'up' as const },
  { icon: FiActivity, label: 'Statistics', position: 'bottom-[20%] left-[3%] sm:left-[5%] md:left-[8%] hidden md:flex', delay: 1.2, floatDirection: 'down' as const },
  
  // Right side - spread vertically (show fewer on mobile)
  { icon: FiCpu, label: 'Machine Learning', position: 'top-[18%] right-[1%] sm:right-[2%] md:right-[5%] hidden sm:flex', delay: 0.2, floatDirection: 'down' as const },
  { icon: FiLayers, label: 'Deep Learning', position: 'top-[38%] right-[2%] sm:right-[3%] md:right-[6%] hidden md:flex', delay: 0.6, floatDirection: 'left' as const },
  { icon: FiCode, label: 'NLP', position: 'bottom-[35%] right-[1%] sm:right-[2%] md:right-[4%] hidden sm:flex', delay: 1.0, floatDirection: 'up' as const },
  { icon: FiZap, label: 'LLMs', position: 'bottom-[20%] right-[2%] sm:right-[4%] md:right-[7%] hidden md:flex', delay: 1.4, floatDirection: 'right' as const },
  
  // Inner ring (larger screens only) - more spread out
  { icon: FiTrendingUp, label: 'R Language', position: 'top-[28%] left-[18%] md:left-[20%] hidden lg:flex', delay: 0.3, floatDirection: 'up' as const },
  { icon: FiGrid, label: 'Excel', position: 'bottom-[25%] left-[16%] md:left-[18%] hidden lg:flex', delay: 0.9, floatDirection: 'right' as const },
  { icon: FiPieChart, label: 'Storytelling', position: 'top-[28%] right-[16%] md:right-[18%] hidden lg:flex', delay: 0.5, floatDirection: 'down' as const },
  { icon: FiBox, label: 'MLOps', position: 'bottom-[25%] right-[18%] md:right-[20%] hidden lg:flex', delay: 1.1, floatDirection: 'up' as const },
];

export function HeroSection() {
  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section 
      id="home" 
      className="relative w-full min-h-[100svh] flex items-center justify-center overflow-hidden pt-20"
    >
      <GridBackground />
      
      {/* Floating Orbs */}
      <FloatingOrb 
        size={400} 
        color="rgba(0, 255, 170, 0.08)" 
        top="20%" 
        left="65%" 
        delay={0}
      />
      <FloatingOrb 
        size={300} 
        color="rgba(0, 212, 255, 0.06)" 
        top="55%" 
        left="5%" 
        delay={2}
      />
      <FloatingOrb 
        size={200} 
        color="rgba(255, 215, 0, 0.04)" 
        top="65%" 
        left="75%" 
        delay={4}
      />

      {/* Floating Skill Tags */}
      {floatingTags.map((tag) => (
        <FloatingTag 
          key={tag.label}
          icon={tag.icon}
          label={tag.label}
          position={tag.position}
          delay={tag.delay}
          floatDirection={tag.floatDirection}
        />
      ))}

      {/* Main Content */}
      <div className="container relative z-10 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-6 sm:mb-8"
          >
            <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]"></span>
              </span>
              <span className="text-xs sm:text-sm font-medium text-[var(--accent)]">Available for opportunities</span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-6"
          >
            <span className="block text-[var(--foreground)]">Hi, I&apos;m </span>
            <span className="block mt-2">
              <span className="text-gradient">Naeem</span>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8 sm:mb-10"
          >
            <p className="text-base sm:text-lg md:text-xl text-[var(--foreground-muted)] font-light tracking-tight px-2 sm:px-0">
              I teach machines to see what <span className="text-[var(--accent)]">humans miss</span>.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button href="#projects" variant="primary" size="lg">
              View My Work
              <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>
            <Button href="#contact" variant="outline" size="lg">
              Get in Touch
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 
          text-[var(--foreground-subtle)] hover:text-[var(--accent)] transition-colors cursor-pointer"
        aria-label="Scroll to about section"
      >
        <span className="text-xs font-medium uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <FiArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.button>

      {/* Bottom gradient fade */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, var(--background), transparent)',
        }}
      />
    </section>
  );
}
