"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-12 sm:mt-20 py-8 sm:py-12 border-t border-[var(--border)]">
      {/* Top gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/20 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-3 sm:gap-4"
        >
          {/* Logo */}
          <a 
            href="#home"
            className="text-2xl font-bold"
          >
            <span className="text-[var(--foreground)]">N</span>
            <span className="text-[var(--accent)]">.</span>
          </a>

          {/* Copyright */}
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-sm text-[var(--foreground-muted)] flex items-center gap-1">
              Built with <FaHeart className="w-3 h-3 text-red-400" /> by Naeem
            </p>
            <p className="text-xs text-[var(--foreground-subtle)]">
              © {year} All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
