"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from 'react-icons/fa';
import { FiArrowUp } from 'react-icons/fi';

export function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative pt-20 pb-8 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          {/* Back to Top Button */}
          <motion.button
            onClick={scrollToTop}
            className="mb-12 p-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <FiArrowUp className="w-6 h-6 text-white/70 group-hover:text-white transition-colors" />
          </motion.button>

          {/* Social Links */}
          <motion.div 
            className="flex items-center gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {[
              { href: "https://github.com/Naeem1144", icon: FaGithub, label: "GitHub", color: "hover:text-gray-300" },
              { href: "https://www.linkedin.com/in/naeemnagori/", icon: FaLinkedin, label: "LinkedIn", color: "hover:text-blue-400" },
              { href: "mailto:aknaeem246@gmail.com", icon: FaEnvelope, label: "Email", color: "hover:text-red-400" }
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('mailto:') ? undefined : "_blank"}
                rel={social.href.startsWith('mailto:') ? undefined : "noopener noreferrer"}
                aria-label={social.label}
                className={`p-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm text-white/70 ${social.color} transition-all duration-300`}
                whileHover={{ 
                  scale: 1.1, 
                  y: -3,
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderColor: 'rgba(255,255,255,0.2)'
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </motion.div>

          {/* Copyright and Credits */}
          <motion.div 
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center justify-center gap-2 text-white/60 text-sm">
              <span>© {year} Naeem Nagori. Crafted with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
              >
                <FaHeart className="text-red-400" size={14} />
              </motion.div>
              <span>and lots of ☕</span>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/40">
              <span>Built with Next.js & Tailwind CSS</span>
              <span className="w-1 h-1 bg-white/40 rounded-full" />
              <span>Powered by Framer Motion</span>
              <span className="w-1 h-1 bg-white/40 rounded-full" />
              <span>Deployed on Vercel</span>
            </div>
          </motion.div>

          {/* Decorative Elements */}
          <div className="absolute bottom-4 left-4 w-2 h-2 bg-blue-400/30 rounded-full animate-pulse" />
          <div className="absolute bottom-8 right-8 w-1 h-1 bg-purple-400/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-12 left-1/3 w-1.5 h-1.5 bg-pink-400/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
      </div>
    </footer>
  );
}
