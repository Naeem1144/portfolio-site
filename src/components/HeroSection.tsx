"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Button } from './ui/Button';
import { motion, useAnimation, useMotionValue, useSpring } from 'framer-motion';
import { FiArrowDownCircle, FiStar, FiZap, FiTrendingUp } from 'react-icons/fi';
import { GeistSans } from 'geist/font/sans';
import { useHarmonicScroll } from '@/hooks/useHarmonicScroll';

export function HeroSection() {
  const { scrollToSection } = useHarmonicScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { stiffness: 100, damping: 10 });
  const springY = useSpring(cursorY, { stiffness: 100, damping: 10 });

  const handleScrollClick = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection('about');
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
    cursorX.set(x);
    cursorY.set(y);
  };

  return (
    <section 
      className="min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden w-full"
      onMouseMove={handleMouseMove}
    >
      {/* Revolutionary 3D Background with Glass Morphism */}
      <div className="absolute inset-0 -z-10">
        {/* Animated Gradient Background */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 25% 25%, #667eea 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, #764ba2 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, #f093fb 0%, transparent 50%),
              linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)
            `,
            opacity: 0.1,
            animation: 'gradientShift 15s ease infinite'
          }}
        />
        
        {/* Dynamic Mesh Gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              conic-gradient(from 0deg at 50% 50%, #667eea, #764ba2, #f093fb, #667eea),
              linear-gradient(to bottom right, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))
            `,
            opacity: 0.05,
            animation: 'meshRotate 20s linear infinite'
          }}
        />
      </div>

      {/* Interactive Particle System */}
      <div className="absolute inset-0 -z-10">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              scale: [0.5, 1, 0.5],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Glass Morphism Decorative Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
            backdropFilter: 'blur(40px)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 25px 45px rgba(0,0,0,0.1)',
          }}
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          }}
        />
        
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-2xl rotate-45"
          style={{
            background: 'linear-gradient(45deg, rgba(99,102,241,0.1), rgba(139,92,246,0.1))',
            backdropFilter: 'blur(30px)',
            border: '1px solid rgba(139,92,246,0.2)',
            boxShadow: '0 20px 40px rgba(139,92,246,0.1)',
          }}
          animate={{
            rotate: [45, 225, 45],
            y: [-20, 20, -20],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Interactive Cursor Follower */}
      <motion.div
        className="fixed w-20 h-20 rounded-full pointer-events-none mix-blend-difference z-50 hidden lg:block"
        style={{
          x: springX,
          y: springY,
          background: 'radial-gradient(circle, rgba(99,102,241,0.3), transparent)',
          filter: 'blur(10px)',
        }}
      />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Modern Status Badge */}
        <motion.div
          className="mb-8 inline-flex items-center gap-3 rounded-2xl px-6 py-3 text-sm font-medium"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          }}
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          whileHover={{ scale: 1.05, y: -2 }}
        >
          <motion.div
            className="flex items-center gap-2"
            animate={{ x: [0, 2, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <FiZap className="w-4 h-4 text-yellow-400" />
            <span className="text-white/90">Available for opportunities</span>
          </motion.div>
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50" />
        </motion.div>

        {/* Hero Title with 3D Effect */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.h1 
            className={`text-center mb-6 ${GeistSans.className} leading-tight`}
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 7rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              textShadow: '0 0 80px rgba(99,102,241,0.5)',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
          >
            <span 
              className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
              style={{
                backgroundSize: '200% 200%',
                animation: 'gradientShift 4s ease infinite'
              }}
            >
              Data Science
            </span>
            <span 
              className="block bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 bg-clip-text text-transparent text-4xl md:text-6xl lg:text-7xl"
              style={{
                backgroundSize: '200% 200%',
                animation: 'gradientShift 4s ease infinite reverse'
              }}
            >
              Portfolio
            </span>
          </motion.h1>

          {/* Modern Subtitle */}
          <motion.p 
            className="text-xl md:text-2xl max-w-4xl mx-auto mb-12 text-white/80 leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          >
            Transforming complex data into{' '}
            <span className="font-semibold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              actionable insights
            </span>{' '}
            through AI, machine learning, and innovative analytics
          </motion.p>

          {/* Feature Highlights */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
          >
            {[
              { icon: FiTrendingUp, text: "Data Analysis" },
              { icon: FiZap, text: "Machine Learning" },
              { icon: FiStar, text: "AI Solutions" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white/70"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                }}
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: 'rgba(99,102,241,0.1)',
                  y: -2 
                }}
                transition={{ duration: 0.2 }}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
          
          {/* CTA Buttons with Glass Morphism */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                href="#projects" 
                size="lg" 
                variant="primary" 
                className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-2xl shadow-blue-500/25 border-0"
              >
                Explore My Work
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                href="#contact" 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto backdrop-blur-md bg-white/5 border-white/20 hover:bg-white/10 text-white"
              >
                Get In Touch
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Modern Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.a 
          href="#about"
          onClick={handleScrollClick}
          className="flex flex-col items-center gap-2 text-white/60 hover:text-white/80 transition-colors group"
          whileHover={{ y: -5 }}
          aria-label="Scroll to about section"
        >
          <span className="text-xs font-medium tracking-wider uppercase">Scroll Down</span>
          <motion.div
            className="w-6 h-10 border-2 border-white/30 rounded-full p-1 group-hover:border-white/50 transition-colors"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-1 h-3 bg-white/50 rounded-full mx-auto" />
          </motion.div>
        </motion.a>
      </motion.div>

      {/* Add custom CSS keyframes */}
      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes meshRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
