"use client";

import React from 'react';
import { Button } from './ui/Button';
import { motion } from 'framer-motion';
import { FiArrowDownCircle } from 'react-icons/fi'; // Modern icon for scroll indication
import { GeistSans } from 'geist/font/sans';
import { useHarmonicScroll } from '@/hooks/useHarmonicScroll';

export function HeroSection() {
  const { scrollToSection } = useHarmonicScroll();

  const handleScrollClick = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection('about');
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden w-full px-4">
      {/* Sophisticated minimal background */}
      <div 
        className="absolute inset-0 -z-10"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.1) 0%, transparent 50%)',
          opacity: 1
        }}
      />
      
      {/* Elegant ambient orb - single, refined */}
      <div className="absolute inset-0 -z-10 opacity-40">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Refined intro badge - sophisticated and minimal */}
        <motion.div
          className="mb-10 inline-flex items-center gap-2.5 rounded-full border border-primary/10 bg-primary/5 px-6 py-2.5 text-sm backdrop-blur-xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          <span className="relative h-2 w-2 rounded-full bg-primary">
            <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-50" />
          </span>
          <span className="font-medium text-foreground/90">Data Science • Analytics • AI</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.h1 
            className={`text-center mb-6 text-foreground ${GeistSans.className}`}
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              letterSpacing: '-0.03em',
              fontWeight: 700,
              lineHeight: 1.15
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            Hello, and welcome to my portfolio!
          </motion.h1>
          
          {/* Refined accent line - elegant and minimal */}
          <motion.div 
            className="relative h-0.5 w-24 mx-auto mt-6 mb-8"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="h-full bg-gradient-to-r from-transparent via-primary to-transparent rounded-full opacity-60" />
          </motion.div>
          
          <motion.p 
            className="text-base md:text-lg max-w-2xl mx-auto mb-12 text-foreground/70 leading-relaxed text-center text-balance font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            My name is Naeem, I love to transform data into actionable insights. 
            Passionate about Data Analysis, Data Science, Artificial Intelligence, Business Intelligence, statistics, and state of the art technologies.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-5 justify-center items-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Button href="#projects" size="lg" variant="primary" className="w-full sm:w-auto">
              Explore My Work
            </Button>
            <Button href="#contact" variant="outline" size="lg" className="w-full sm:w-auto">
              Get In Touch
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Refined Scroll Indicator - elegant and minimal */}
      <motion.a 
        href="#about"
        onClick={handleScrollClick}
        className="absolute bottom-12 inset-x-0 mx-auto flex items-center justify-center text-foreground/50 no-underline"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.7, ease: "easeOut" }}
        aria-label="Scroll to about section"
      >
        <FiArrowDownCircle size={28} className="animate-bounce" />
      </motion.a>
    </section>
  );
}
