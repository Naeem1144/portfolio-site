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
    <section className="min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden w-full">      {/* Dark gradient background */}
      <div 
        className="absolute inset-0 -z-10"
        style={{
          background: 'radial-gradient(circle at top right, #000000 0%, transparent 50%), linear-gradient(135deg, #000000 0%, #0a1a2f 40%, #1a365d 100%)',
          opacity: 0.98
        }}
      />
      
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
      
      {/* Subtle particle effect overlay */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="absolute h-1 w-1 rounded-full bg-primary/40 top-1/4 left-1/3" style={{ animation: 'float 7s ease-in-out infinite' }}></div>
        <div className="absolute h-2 w-2 rounded-full bg-accent/30 top-2/3 left-1/4" style={{ animation: 'float 9s ease-in-out infinite' }}></div>
        <div className="absolute h-1.5 w-1.5 rounded-full bg-secondary/20 top-1/2 left-3/4" style={{ animation: 'float 8s ease-in-out infinite' }}></div>
        <div className="absolute h-1 w-1 rounded-full bg-primary/30 top-3/4 left-2/3" style={{ animation: 'float 10s ease-in-out infinite' }}></div>
      </div>
      
      {/* Add keyframes to the globals.css file for the animation */}
      
      <div className="container max-w-8l mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >          <motion.h1 
            className={`text-center mb-3 ${GeistSans.className}`}
            style={{
              background: 'linear-gradient(45deg, #8B5CF6, #C4B5FD, #A78BFA)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontSize: 'clamp(2rem, 4vw, 8rem)',
              backgroundSize: '200% auto',
              animation: 'gradient 5s linear infinite',
              letterSpacing: '-0.02em',
              fontWeight: 200
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
          >
            Hello, and welcome to my portfolio!
          </motion.h1>
          
          <style jsx>{`
            @keyframes gradient {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
          `}</style>
          
          {/* Simple, clean underline */}
          <motion.div 
            className="h-1 w-32 bg-gradient-to-r from-primary/40 via-accent/40 to-primary/40 rounded-full mx-auto mt-3 mb-4"
            initial={{ opacity: 0, width: '0rem' }}
            animate={{ opacity: 1, width: '8rem' }}
            transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
          ></motion.div>
          
          <motion.p 
            className="text-lg md:text-xl max-w-4xl mx-auto mb-20 text-gray-500 dark:text-gray-400 leading-relaxed text-center text-balance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
          >
            My name is Naeem, I love to transform data into actionable insights. 
            Passionate about Data Analysis, Data Science, Artificial Intelligence, Business Intelligence, statistics, and state of the art technologies.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7, ease: "easeOut" }}
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
    </section>
  );
}
