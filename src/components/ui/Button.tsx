"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'outline' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  target?: string;
  download?: boolean;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  ariaLabel?: string;
}

export function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  target,
  download,
  type = 'button',
  disabled = false,
  ariaLabel,
}: ButtonProps) {
  const variants = {
    primary: 'btn-primary',
    outline: 'btn-outline',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
  };

  const sizes = {
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg',
    icon: 'btn-icon',
  };

  const classes = `btn ${variants[variant]} ${sizes[size]} ${className}`.trim();

  const tapAnimation = disabled ? undefined : { scale: 0.98 };
  const transitionConfig = { duration: 0.15 };

  // Handle scroll to section for hash links
  const handleClick = (e: React.MouseEvent) => {
    if (href?.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    onClick?.(e);
  };

  if (href) {
    // External link or download
    if (href.startsWith('http') || href.startsWith('/') && !href.startsWith('#')) {
      return (
        <motion.div 
          whileTap={tapAnimation} 
          transition={transitionConfig} 
          style={{ display: 'inline-block' }}
        >
          <Link 
            href={href}
            target={target}
            rel={target === '_blank' ? 'noopener noreferrer' : undefined}
            download={download}
            className={classes}
            onClick={onClick}
            aria-label={ariaLabel}
          >
            {children}
          </Link>
        </motion.div>
      );
    }
    
    // Internal hash link
    return (
      <motion.a 
        href={href}
        onClick={handleClick}
        className={classes}
        aria-label={ariaLabel}
        whileTap={tapAnimation}
        transition={transitionConfig}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button 
      type={type}
      onClick={onClick}
      className={classes}
      disabled={disabled}
      aria-label={ariaLabel}
      whileTap={tapAnimation}
      transition={transitionConfig}
    >
      {children}
    </motion.button>
  );
}
