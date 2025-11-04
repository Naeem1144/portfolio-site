"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from './ui/Button';
import { FaGithub, FaBars, FaTimes, FaFileAlt } from 'react-icons/fa';
import { useHarmonicScroll } from '@/hooks/useHarmonicScroll';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { scrollToSection } = useHarmonicScroll();
  
  useEffect(() => {
    // Cache section elements to avoid repeated DOM queries
    const sectionElements = new Map<string, HTMLElement>();
    const sections = ['contact', 'projects', 'about', 'home'];
    
    sections.forEach(section => {
      const element = document.getElementById(section);
      if (element) {
        sectionElements.set(section, element);
      }
    });

    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          
          // Calculate active section for highlighting nav items
          for (const section of sections) {
            const element = sectionElements.get(section);
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
          
          ticking = false;
        });
        
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
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
        fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out
        ${isScrolled || isMobileMenuOpen ? 'bg-background/65 backdrop-blur-2xl border-b border-white/5' : 'bg-transparent border-b border-transparent'}
      `}
      style={{
        backdropFilter: isScrolled || isMobileMenuOpen ? 'blur(20px) saturate(140%)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center no-underline">
            <span 
              className="font-bold text-foreground font-mono"
              style={{
                fontSize: 'clamp(1.25rem, 2vw, 1.625rem)',
                letterSpacing: '-0.02em'
              }}
            >
              Naeem
            </span>
          </Link>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" role="navigation" aria-label="Primary">
            <div 
              className="flex space-x-1 lg:space-x-2"
            >
              {navItems.map((item) => (
                <a 
                  key={item.name} 
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`
                    relative px-4 py-2 rounded-lg font-medium font-mono
                    text-foreground/80 no-underline
                    ${activeSection === item.id 
                      ? 'bg-primary/10 text-foreground' 
                      : ''}
                  `}
                  style={{
                    fontSize: 'var(--font-size-sm)',
                    letterSpacing: '-0.01em'
                  }}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                >
                  {item.name}
                </a>
              ))}
            </div>

            <div className="flex items-center">
              <Button 
                href="/Naeem_Resume.pdf"
                target="_blank"
                variant="outline"
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
                ariaLabel="GitHub profile"
              >
                <FaGithub className="mr-2" /> GitHub
              </Button>
            </div>
          </nav>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 text-foreground/70 rounded-md"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden bg-background/85 backdrop-blur-2xl absolute top-full left-1/2 -translate-x-1/2 w-[85%] max-w-[300px] rounded-xl border border-primary/8"
          style={{ backdropFilter: 'blur(24px)' }}
        >
          <nav
            className="flex flex-col items-center space-y-1 py-3"
          >
            {navItems.map((item) => (
              <div
                key={item.name}
                className="w-full"
              >
                <a 
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`
                    flex justify-center py-2.5 px-4 mx-2 rounded-lg font-mono
                    text-foreground/80 no-underline
                    ${activeSection === item.id 
                      ? 'bg-primary/10 text-foreground font-medium' 
                      : ''}
                  `}
                  style={{
                    fontSize: 'var(--font-size-base)',
                    letterSpacing: '-0.01em'
                  }}
                >
                  {item.name}
                </a>
              </div>
            ))}
            <div
              className="w-full flex flex-col items-center gap-2 mt-1 pt-1"
            >
              <Button 
                href="/Naeem_Resume.pdf" 
                target="_blank"
                variant="outline"
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
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
