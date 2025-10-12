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
    <section className="min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden w-full">
      {/* Premium layered background with enhanced gradients */}
      <div 
        className="absolute inset-0 -z-10"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(74,158,255,0.15) 0%, transparent 50%), radial-gradient(ellipse at 0% 50%, rgba(167,139,250,0.1) 0%, transparent 50%), radial-gradient(ellipse at 100% 50%, rgba(245,158,11,0.08) 0%, transparent 50%)',
          opacity: 1
        }}
      />
      
      {/* Animated ambient orbs */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-secondary/15 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }} />
      </div>
      
      {/* Premium grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.015]"></div>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(10px, -10px) scale(1.05); }
          50% { transform: translate(-5px, 10px) scale(0.95); }
          75% { transform: translate(-10px, -5px) scale(1.02); }
        }
      `}</style>
      
      {/* Add keyframes to the globals.css file for the animation */}
      
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Premium intro badge */}
        <motion.div
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-gradient-to-r from-primary/10 to-accent/10 px-5 py-2 text-sm backdrop-blur-xl shadow-lg shadow-primary/10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          <span className="relative h-2 w-2 rounded-full bg-gradient-to-r from-primary to-accent">
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent animate-ping opacity-75" />
          </span>
          <span className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">Data Science • Analytics • AI</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.h1 
            className={`text-center mb-3 ${GeistSans.className}`}
            style={{
              background: 'linear-gradient(135deg, #ffffff, #4a9eff, #a78bfa, #f59e0b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontSize: 'clamp(2.5rem, 5vw, 5rem)',
              backgroundSize: '300% 300%',
              animation: 'gradientFlow 8s ease infinite',
              letterSpacing: '-0.03em',
              fontWeight: 700,
              lineHeight: 1.2
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            Hello, and welcome to my portfolio!
          </motion.h1>
          
          <style jsx>{`
            @keyframes gradientFlow {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            @keyframes shimmer {
              0% { opacity: 0.5; transform: scale(0.98); }
              50% { opacity: 1; transform: scale(1); }
              100% { opacity: 0.5; transform: scale(0.98); }
            }
          `}</style>
          
          {/* Premium accent line with glow */}
          <motion.div 
            className="relative h-1 w-32 mx-auto mt-4 mb-6"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-secondary rounded-full blur-sm opacity-70" />
            <div className="relative h-full bg-gradient-to-r from-primary via-accent to-secondary rounded-full" />
          </motion.div>
          
          <motion.p 
            className="text-lg md:text-xl max-w-3xl mx-auto mb-20 text-gray-300/90 leading-relaxed text-center text-balance"
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
      
      {/* Modern Scroll Indicator */}
      <motion.a 
        href="#about"
        onClick={handleScrollClick}
        className="absolute bottom-8 inset-x-0 mx-auto flex items-center justify-center text-foreground/70 dark:text-foreground-dark/70 no-underline"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.7, ease: "easeOut" }}
        aria-label="Scroll to about section"
      >
        <FiArrowDownCircle size={32} className="animate-bounce" />
      </motion.a>
      {/* Premium aurora-style light streaks with animation */}
      <div aria-hidden className="pointer-events-none absolute -z-10 inset-0">
        <div className="absolute -top-24 left-1/4 w-[45rem] h-[15rem] rotate-12 bg-gradient-to-r from-primary/15 via-accent/8 to-transparent blur-3xl opacity-50 animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute -bottom-24 right-1/4 w-[45rem] h-[15rem] -rotate-12 bg-gradient-to-r from-secondary/12 via-primary/8 to-transparent blur-3xl opacity-50 animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
      </div>
    </section>
  );
}
