"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaBars, FaTimes, FaFileAlt } from 'react-icons/fa';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Determine active section
      const sections = ['contact', 'projects', 'about', 'home'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (!element) continue;

        if (section === 'home' && window.scrollY < 100) {
          setActiveSection('home');
          break;
        }

        const rect = element.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled ? 'py-3' : 'py-5'}
      `}
    >
      <div 
        className="mx-4 md:mx-8 rounded-2xl transition-all duration-300 border"
        style={{
          background: isScrolled ? 'rgba(10, 10, 10, 0.8)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'none',
          borderColor: isScrolled ? 'var(--border)' : 'transparent',
          boxShadow: isScrolled ? '0 8px 32px rgba(0, 0, 0, 0.3)' : 'none',
        }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link 
              href="/" 
              className="relative group"
            >
              <span className="text-xl font-bold tracking-tight">
                <span className="text-[var(--foreground)]">N</span>
                <span className="text-[var(--accent)]">.</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`
                    relative px-4 py-2 text-sm font-medium transition-colors
                    ${activeSection === item.href.replace('#', '')
                      ? 'text-[var(--accent)]'
                      : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
                    }
                  `}
                >
                  {item.name}
                  {activeSection === item.href.replace('#', '') && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 rounded-lg bg-[var(--accent)]/10 border border-[var(--accent)]/20"
                      style={{ zIndex: -1 }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              ))}
            </nav>

            {/* Desktop CTA Buttons */}
            <div className="hidden md:flex items-center gap-2">
              <a
                href="/Naeem_Resume.pdf"
                target="_blank"
                className="btn btn-ghost btn-sm flex items-center gap-2"
              >
                <FaFileAlt className="w-3.5 h-3.5" />
                Resume
              </a>
              <a
                href="https://github.com/Naeem1144"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm flex items-center gap-2"
              >
                <FaGithub className="w-4 h-4" />
                GitHub
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-[var(--foreground-muted)]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mx-4 mt-2 rounded-2xl glass border border-[var(--border)] overflow-hidden"
          >
            <nav className="p-4 flex flex-col gap-2">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`
                    w-full py-3 px-4 text-left rounded-xl transition-colors
                    ${activeSection === item.href.replace('#', '')
                      ? 'bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20'
                      : 'text-[var(--foreground-muted)] hover:bg-white/5'
                    }
                  `}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {item.name}
                </motion.button>
              ))}
              
              <div className="h-px bg-[var(--border)] my-2" />
              
              <motion.a
                href="/Naeem_Resume.pdf"
                target="_blank"
                className="btn btn-outline w-full justify-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <FaFileAlt className="mr-2" />
                Resume
              </motion.a>
              <motion.a
                href="https://github.com/Naeem1144"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-full justify-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
              >
                <FaGithub className="mr-2" />
                GitHub
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
