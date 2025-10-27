"use client";

import React from 'react';
import Link from 'next/link';
import { useHarmonicScroll } from '@/hooks/useHarmonicScroll';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  // Support both local and NextUI-like naming. 'bordered' aliases 'outline'.
  variant?: 'primary' | 'outline' | 'secondary' | 'ghost' | 'link' | 'bordered';
  size?: 'sm' | 'md' | 'lg' | 'icon'; // Added icon size
  className?: string;
  onClick?: () => void;
  target?: string;
  rel?: string; // Added rel for external links
  download?: boolean;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  ariaLabel?: string; // For accessibility
}

export function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  target,
  rel,
  download,
  type = 'button',
  disabled = false,
  ariaLabel,
}: ButtonProps) {
  const { scrollToSection } = useHarmonicScroll();
  
  // Base styles using refined utility classes from globals.css
  const baseClasses = "btn inline-flex items-center justify-center rounded-md font-medium transition-all duration-250 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-1 disabled:opacity-60 disabled:pointer-events-none tracking-wide";

  const variantClasses = {
    primary: "btn-primary",
    outline: "btn-outline",
    bordered: "btn-outline", // alias for outline
    secondary: "btn-secondary",
    ghost: "btn-ghost",
    link: "text-primary underline-offset-4 hover:underline hover:text-opacity-90",
  };
  const sizeClasses = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-5 py-2.5 text-base",
    lg: "h-12 px-7 py-3 text-lg",
    icon: "h-11 w-11 flex items-center justify-center",
  };

  const combinedClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${className}
  `.trim();

  const commonProps = {
    className: combinedClasses,
    disabled,
    "aria-label": ariaLabel,
  };

  // Handle internal link scrolling
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick();
    }
    
    // Apply smooth scroll for internal hash links
    if (href && href.startsWith('#')) {
      e.preventDefault();
      scrollToSection(href);
    }
  };

  if (href) {
    // For internal hash links, use the harmonic scroll
    if (href.startsWith('#')) {
      return (
        <a 
          href={href}
          onClick={handleClick}
          {...commonProps}
        >
          {children}
        </a>
      );
    }
    
    // For external links, use Next.js Link
    return (
      <Link 
        href={href} 
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : rel} // Set rel for target blank
        download={download}
        {...commonProps}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }
  
  return (
    <button type={type} onClick={onClick} {...commonProps}>
      {children}
    </button>
  );
}
