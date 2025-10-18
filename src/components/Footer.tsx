"use client";

import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="pt-16 pb-10 relative overflow-hidden mt-32">
      {/* Refined top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
      
      {/* Elegant ambient background */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center gap-8">
          <div className="flex items-center gap-3">
            <a href="https://github.com/Naeem1144" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-2.5 rounded-lg bg-primary/5 border border-primary/10 text-foreground/60">
              <FaGithub size={18} />
            </a>
            <a href="https://www.linkedin.com/in/naeemnagori/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2.5 rounded-lg bg-primary/5 border border-primary/10 text-foreground/60">
              <FaLinkedin size={18} />
            </a>
            <a href="mailto:aknaeem246@gmail.com" aria-label="Email" className="p-2.5 rounded-lg bg-primary/5 border border-primary/10 text-foreground/60">
              <FaEnvelope size={18} />
            </a>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-foreground/60 font-medium">Naeem</p>
            <p className="text-xs text-foreground/40">© {year} All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
