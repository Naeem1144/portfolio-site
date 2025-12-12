"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from './ui/Button';
import { FaGithub, FaBars, FaTimes } from 'react-icons/fa';
import { useHarmonicScroll } from '@/hooks/useHarmonicScroll';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { scrollToSection } = useHarmonicScroll();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === '#') {
      scrollToSection('home');
    } else {
      const id = href.substring(1);
      scrollToSection(id);
    }
    
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Floating Dynamic Header */}
      <header
        className={`
          fixed top-4 left-0 right-0 z-50 transition-all duration-300 ease-out flex justify-center
        `}
      >
        <div
          className={`
            flex items-center justify-between
            transition-all duration-300 ease-out
            ${isScrolled
              ? 'w-[90%] max-w-4xl rounded-full glass-panel px-6 py-3 shadow-lg'
              : 'w-full max-w-7xl px-6 py-4 bg-transparent border-transparent'}
          `}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center no-underline z-10">
            <span className="font-bold text-foreground font-mono text-lg tracking-tight">
              Naeem
            </span>
          </Link>
          
          {/* Desktop Nav - Centered */}
          <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center space-x-1">
            <div className={`
              flex items-center p-1 rounded-full transition-all duration-300
              ${isScrolled ? 'bg-transparent' : 'glass-panel px-3 py-1.5'}
            `}>
              {navItems.map((item) => (
                <a 
                  key={item.name} 
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`
                    px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                    ${activeSection === item.id 
                      ? 'bg-foreground text-background font-semibold shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/5'}
                  `}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-2 z-10">
            <Button
              href="/Naeem_Resume.pdf"
              target="_blank"
              variant="outline"
              size="sm"
              className="h-9 px-4 rounded-full text-xs font-medium border-border/40 hover:bg-white/5 hover:text-foreground"
            >
              Resume
            </Button>
            <Button
              href="https://github.com/Naeem1144"
              target="_blank"
              variant="primary" // This will use primary color
              size="sm"
              className="h-9 px-4 rounded-full text-xs font-medium bg-foreground text-background hover:bg-foreground/90"
              ariaLabel="GitHub profile"
            >
              <FaGithub className="mr-2" /> GitHub
            </Button>
          </div>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-foreground rounded-full hover:bg-white/10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </header>
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden pt-24 px-6 flex flex-col items-center animate-in fade-in duration-200">
          <nav className="flex flex-col items-center gap-6 w-full max-w-sm">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`
                  text-2xl font-medium tracking-tight
                  ${activeSection === item.id ? 'text-foreground' : 'text-muted-foreground'}
                `}
              >
                {item.name}
              </a>
            ))}
            <div className="w-12 h-[1px] bg-border my-4" />
            <div className="flex gap-4 w-full justify-center">
              <Button href="/Naeem_Resume.pdf" target="_blank" variant="outline" className="w-full justify-center">
                Resume
              </Button>
              <Button href="https://github.com/Naeem1144" target="_blank" variant="primary" className="w-full justify-center bg-foreground text-background">
                GitHub
              </Button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
