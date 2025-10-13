"use client";

import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="pt-12 pb-8 relative overflow-hidden mt-24">
      {/* Premium top gradient accent with glow */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/40 to-transparent blur-sm" />
      </div>
      
      {/* Subtle ambient background */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-4">
            <a href="https://github.com/Naeem1144" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/30 text-gray-400 hover:text-white transition-all duration-300 hover:scale-110">
              <FaGithub size={20} />
            </a>
            <a href="https://www.linkedin.com/in/naeemnagori/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/30 text-gray-400 hover:text-white transition-all duration-300 hover:scale-110">
              <FaLinkedin size={20} />
            </a>
            <a href="mailto:aknaeem246@gmail.com" aria-label="Email" className="p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/30 text-gray-400 hover:text-white transition-all duration-300 hover:scale-110">
              <FaEnvelope size={20} />
            </a>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-gray-400 font-medium">Naeem</p>
            <p className="text-xs text-gray-500">© {year} All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
