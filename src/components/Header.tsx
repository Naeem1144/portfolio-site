"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button';
import { FaGithub, FaBars, FaTimes, FaFileAlt } from 'react-icons/fa';
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
    <header 
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out relative
        ${isScrolled || isMobileMenuOpen ? 'bg-background/70 backdrop-blur-2xl border-b border-primary/5' : 'bg-transparent border-b border-transparent'}
      `}
      style={{
        backdropFilter: isScrolled || isMobileMenuOpen ? 'blur(24px) saturate(150%)' : 'none',
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center no-underline">
              <span className="text-2xl font-bold text-foreground">
                Naeem
              </span>
            </Link>
          </motion.div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" role="navigation" aria-label="Primary">
            <motion.div 
              className="flex space-x-1 lg:space-x-2" 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {navItems.map((item) => (
                <a 
                  key={item.name} 
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`
                    relative px-4 py-2 rounded-lg text-sm font-medium
                    text-foreground/80 no-underline
                    ${activeSection === item.id 
                      ? 'bg-primary/10 text-foreground' 
                      : ''}
                  `}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                >
                  {item.name}
                </a>
              ))}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center"
            >
              <Button 
                href="/Naeem_Resume.pdf"
                target="_blank"
                variant="bordered"
                size="sm"
                className="ml-2"
              >
                <FaFileAlt className="mr-2" /> Resume
              </Button>
              <Button 
                href="https://github.com/Naeem1144" 
                target="_blank"
                variant="primary"
                size="sm"
                className="ml-2"
              >
                <FaGithub className="mr-2" /> GitHub
              </Button>
            </motion.div>
          </nav>
          
          {/* Mobile menu button */}
          <motion.button 
            className="md:hidden p-2 text-foreground/70 rounded-md"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </motion.button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background/85 backdrop-blur-2xl absolute top-full left-1/2 -translate-x-1/2 w-[85%] max-w-[300px] rounded-xl border border-primary/8"
            style={{ backdropFilter: 'blur(24px)' }}
          >
            <motion.nav 
              className="flex flex-col items-center space-y-1 py-3"
              initial="closed"
              animate="open"
              variants={{
                open: {
                  transition: { staggerChildren: 0.07, delayChildren: 0.1 }
                },
                closed: {
                  transition: { staggerChildren: 0.05, staggerDirection: -1 }
                }
              }}
            >
              {navItems.map((item) => (
                <motion.div
                  key={item.name}
                  variants={{
                    open: {
                      y: 0,
                      opacity: 1,
                      transition: {
                        y: { stiffness: 1000, velocity: -100 }
                      }
                    },
                    closed: {
                      y: 20,
                      opacity: 0,
                      transition: {
                        y: { stiffness: 1000 }
                      }
                    }
                  }}
                  className="w-full"
                >
                  <a 
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`
                      flex justify-center py-2.5 px-4 mx-2 rounded-lg text-base
                      text-foreground/80 no-underline
                      ${activeSection === item.id 
                        ? 'bg-primary/10 text-foreground font-medium' 
                        : ''}
                    `}
                  >
                    {item.name}
                  </a>
                </motion.div>
              ))}
              <motion.div
                variants={{
                  open: {
                    y: 0,
                    opacity: 1,
                    transition: {
                      y: { stiffness: 1000, velocity: -100 }
                    }
                  },
                  closed: {
                    y: 20,
                    opacity: 0,
                    transition: {
                      y: { stiffness: 1000 }
                    }
                  }
                }}
                className="w-full flex flex-col items-center gap-2 mt-1 pt-1"
              >
                <Button 
                  href="/Naeem_Resume.pdf" 
                  target="_blank"
                  variant="bordered"
                  size="sm"
                  className="w-[calc(100%-1rem)]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaFileAlt className="mr-2" /> Resume
                </Button>
                <Button 
                  href="https://github.com/Naeem1144" 
                  target="_blank"
                  variant="primary"
                  size="sm"
                  className="w-[calc(100%-1rem)]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaGithub className="mr-2" /> GitHub
                </Button>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Refined scroll progress indicator */}
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-0 right-0 h-[2px] bg-transparent">
        <div
          className="h-full bg-primary transition-[width] duration-150 ease-out opacity-60"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </header>
  );
}
