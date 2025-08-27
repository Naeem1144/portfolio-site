"use client";

import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="pt-10 pb-8 relative overflow-hidden">
      {/* top gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            <a href="https://github.com/Naeem1144" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-foreground/70 hover:text-white transition-colors">
              <FaGithub size={20} />
            </a>
            <a href="https://www.linkedin.com/in/naeemnagori/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-foreground/70 hover:text-white transition-colors">
              <FaLinkedin size={20} />
            </a>
            <a href="mailto:aknaeem246@gmail.com" aria-label="Email" className="text-foreground/70 hover:text-white transition-colors">
              <FaEnvelope size={20} />
            </a>
          </div>
          <p className="text-xs text-foreground/60">© {year} Naeem. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
