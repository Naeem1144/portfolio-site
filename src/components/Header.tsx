"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { FiDownload, FiMenu, FiX } from 'react-icons/fi';
import { useHarmonicScroll } from '@/hooks/useHarmonicScroll';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const { scrollToSection } = useHarmonicScroll();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Calculate active section for highlighting nav items
      const sections = ['contact', 'projects', 'about', 'home'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (!element) continue;
        
        const rect = element.getBoundingClientRect();
        if (section === 'home' && window.scrollY < 100) {
          setActiveSection('home');
          break;
        }
        
        if (rect.top <= 150 && rect.bottom >= 150) {
          setActiveSection(section);
          break;
        }
      }

      // Update scroll progress for top indicator
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const navItems = [
    { name: 'Home', href: '#', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  
  // Handle harmonic scrolling for navigation items
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === '#') {
      // Scroll to top with animation
      scrollToSection('home');
    } else {
      // Extract the ID without the #
      const id = href.substring(1);
      scrollToSection(id);
    }
    
    // Close mobile menu if open
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Modern Glass Navigation */}
      <motion.header 
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-6xl"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="relative overflow-hidden rounded-2xl"
          style={{
            background: isScrolled 
              ? 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))'
              : 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: isScrolled 
              ? '0 25px 45px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.1)'
              : '0 8px 32px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.05)',
          }}
          animate={{
            background: isScrolled 
              ? 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.08))'
              : 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Animated Background Gradient */}
          <div 
            className="absolute inset-0 opacity-50"
            style={{
              background: 'linear-gradient(45deg, rgba(99,102,241,0.1), rgba(139,92,246,0.1), rgba(236,72,153,0.1))',
              backgroundSize: '300% 300%',
              animation: 'gradientMove 8s ease infinite',
            }}
          />

          <div className="relative px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo with Modern Effect */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/" className="group flex items-center no-underline">
                  <motion.span 
                    className="relative text-2xl md:text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent"
                    style={{
                      filter: 'drop-shadow(0 2px 8px rgba(255,255,255,0.1))',
                      backgroundSize: '200% 100%',
                    }}
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    Naeem
                  </motion.span>
                  <motion.div
                    className="ml-2 w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </Link>
              </motion.div>
              
              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center" role="navigation">
                <motion.div 
                  className="flex items-center space-x-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  {navItems.map((item, index) => (
                    <motion.a 
                      key={item.name} 
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="relative px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-all duration-300 no-underline group"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 * index }}
                    >
                      <span className="relative z-10">{item.name}</span>
                      
                      {/* Active Indicator */}
                      {activeSection === item.id && (
                        <motion.div
                          className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10"
                          layoutId="activeSection"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      
                      {/* Hover Effect */}
                      <motion.div
                        className="absolute inset-0 rounded-xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={false}
                      />
                    </motion.a>
                  ))}
                </motion.div>
                
                {/* Action Buttons */}
                <motion.div
                  className="flex items-center ml-6 space-x-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <motion.a
                    href="/Naeem_Resume.pdf"
                    target="_blank"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white/90 hover:text-white rounded-xl hover:bg-white/10 transition-all duration-300 no-underline"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiDownload className="w-4 h-4" />
                    <span className="hidden xl:inline">Resume</span>
                  </motion.a>
                  
                  <motion.a
                    href="https://github.com/Naeem1144"
                    target="_blank"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-300 no-underline"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaGithub className="w-4 h-4" />
                    <span className="hidden xl:inline">GitHub</span>
                  </motion.a>
                </motion.div>
              </nav>
              
              {/* Mobile Menu Button */}
              <motion.button 
                className="lg:hidden p-3 text-white/80 hover:text-white rounded-xl hover:bg-white/10 transition-all duration-300"
                onClick={toggleMobileMenu}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isMobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                </motion.div>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.header>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Mobile Menu */}
            <motion.div
              className="fixed top-24 left-1/2 transform -translate-x-1/2 w-[90%] max-w-md z-50 lg:hidden"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))',
                  backdropFilter: 'blur(25px)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  boxShadow: '0 25px 45px rgba(0,0,0,0.15)',
                }}
              >
                <div className="p-6">
                  {/* Navigation Items */}
                  <nav className="space-y-2 mb-6">
                    {navItems.map((item, index) => (
                      <motion.a
                        key={item.name}
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className="flex items-center px-4 py-3 text-white/90 hover:text-white rounded-xl hover:bg-white/10 transition-all duration-300 no-underline"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="font-medium">{item.name}</span>
                        {activeSection === item.id && (
                          <motion.div
                            className="ml-auto w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                            layoutId="mobileActiveIndicator"
                            transition={{ type: "spring", bounce: 0.3 }}
                          />
                        )}
                      </motion.a>
                    ))}
                  </nav>
                  
                  {/* Action Buttons */}
                  <motion.div
                    className="space-y-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    <motion.a
                      href="/Naeem_Resume.pdf"
                      target="_blank"
                      className="flex items-center justify-center gap-3 w-full px-4 py-3 text-white/90 hover:text-white rounded-xl hover:bg-white/10 transition-all duration-300 no-underline"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <FiDownload className="w-5 h-5" />
                      <span className="font-medium">Download Resume</span>
                    </motion.a>
                    
                    <motion.a
                      href="https://github.com/Naeem1144"
                      target="_blank"
                      className="flex items-center justify-center gap-3 w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-300 no-underline"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <FaGithub className="w-5 h-5" />
                      <span className="font-medium">Visit GitHub</span>
                    </motion.a>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent z-[60]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 origin-left"
          style={{ 
            scaleX: scrollProgress / 100,
            filter: 'drop-shadow(0 0 8px rgba(99,102,241,0.5))'
          }}
          transition={{ duration: 0.1, ease: "easeOut" }}
        />
      </motion.div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes gradientMove {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </>
  );
}
