"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { FiMenu, FiX, FiFileText } from 'react-icons/fi';

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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-200
        ${isScrolled ? 'py-2.5' : 'py-4'}
      `}
    >
      <div 
        className="mx-3 md:mx-6 rounded-xl transition-all duration-300"
        style={{
          background: isScrolled ? 'rgba(8, 8, 10, 0.82)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(20px) saturate(1.15)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(20px) saturate(1.15)' : 'none',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: isScrolled ? 'var(--border)' : 'transparent',
          boxShadow: isScrolled ? 'var(--shadow-sm)' : 'none',
        }}
      >
        <div className="max-w-5xl mx-auto px-4 md:px-5">
          <div className="flex items-center justify-between h-13">
            {/* Logo */}
            <Link href="/" className="relative group">
              <span className="text-lg font-semibold tracking-tight text-[var(--foreground)]">
                N<span className="text-[var(--accent)] group-hover:text-[var(--accent-muted)] transition-colors duration-200">.</span>
              </span>
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[var(--accent)] transition-all duration-300 group-hover:w-full" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-0.5">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className={`
                      relative px-3.5 py-1.5 text-xs font-medium transition-all duration-200 rounded-lg
                      ${isActive
                        ? 'text-[var(--foreground)]'
                        : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
                      }
                    `}
                  >
                    {item.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 rounded-lg bg-[var(--chrome)]"
                        style={{ 
                          zIndex: -1,
                          border: '1px solid var(--border)',
                        }}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-2">
              <a
                href="/Naeem_Resume.pdf"
                target="_blank"
                className="btn btn-ghost btn-sm"
              >
                <FiFileText className="w-3.5 h-3.5" />
                Resume
              </a>
              <a
                href="https://github.com/Naeem1144"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm"
              >
                <FaGithub className="w-3.5 h-3.5" />
                GitHub
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-1.5 text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden mx-3 mt-2 rounded-xl border border-[var(--border)] overflow-hidden"
            style={{
              background: 'rgba(8, 8, 10, 0.94)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            <nav className="p-3 flex flex-col gap-0.5">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <motion.button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className={`
                      w-full py-2.5 px-3 text-left text-sm rounded-lg transition-all duration-150
                      ${isActive
                        ? 'bg-[var(--chrome)] text-[var(--foreground)]'
                        : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--chrome)]/60'
                      }
                    `}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04, duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {item.name}
                  </motion.button>
                );
              })}
              
              <div className="h-px bg-[var(--border)] my-2" />
              
              <div className="flex gap-2">
                <motion.a
                  href="/Naeem_Resume.pdf"
                  target="_blank"
                  className="btn btn-outline btn-sm flex-1 justify-center"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.25 }}
                >
                  <FiFileText className="w-3.5 h-3.5" />
                  Resume
                </motion.a>
                <motion.a
                  href="https://github.com/Naeem1144"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm flex-1 justify-center"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.25 }}
                >
                  <FaGithub className="w-3.5 h-3.5" />
                  GitHub
                </motion.a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
