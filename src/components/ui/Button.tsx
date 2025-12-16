"use client";

import React from 'react';
import Link from 'next/link';
import { useHarmonicScroll } from '@/hooks/useHarmonicScroll';
import { LoadingSpinner } from './Loading';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  className?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
  download?: boolean;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  ariaLabel?: string;
  mono?: boolean;
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
  loading = false,
  loadingText,
  ariaLabel,
  mono = false,
}: ButtonProps) {
  const { scrollToSection } = useHarmonicScroll();
  
  // Base styles using refined utility classes from globals.css
  const baseClasses = `btn inline-flex items-center justify-center rounded-lg font-medium transition-opacity ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-1 disabled:opacity-60 disabled:pointer-events-none ${mono ? 'font-mono' : ''}`;

  const variantClasses = {
    primary: "btn-primary",
    outline: "btn-outline",
    secondary: "btn-secondary",
    ghost: "btn-ghost",
    link: "text-[var(--brand-secondary)] underline underline-offset-4",
  } as const;
  
  // Improved size classes with better typography
  const sizeClasses = {
    sm: "h-9 px-4",
    md: "h-11 px-5",
    lg: "h-12 px-7",
    icon: "h-11 w-11 flex items-center justify-center",
  };
  
  const sizeStyles = {
    sm: {
      fontSize: 'var(--font-size-sm)',
      letterSpacing: mono ? '-0.01em' : 'var(--letter-spacing-wide)'
    },
    md: {
      fontSize: 'var(--font-size-base)',
      letterSpacing: mono ? '-0.01em' : 'var(--letter-spacing-wide)'
    },
    lg: {
      fontSize: 'clamp(var(--font-size-base), 1.5vw, var(--font-size-md))',
      letterSpacing: mono ? '-0.01em' : 'var(--letter-spacing-wide)'
    },
    icon: {
      fontSize: 'var(--font-size-base)',
      letterSpacing: 'var(--letter-spacing-normal)'
    }
  };

  const combinedClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${className}
  `.trim();

  // Props common to both button and anchor
  const sharedProps = {
    className: combinedClasses,
    style: sizeStyles[size],
    "aria-label": ariaLabel,
    "aria-busy": loading ? true : undefined,
  };

  const renderContent = () => {
    if (loading) {
      return (
        <span className="flex items-center gap-2">
          <LoadingSpinner size="xs" />
          {loadingText || children}
        </span>
      );
    }
    return children;
  };

  // Handle click events, including preventing default when loading or disabled
  const handleClick = (e: React.MouseEvent) => {
    if (loading || disabled) {
      e.preventDefault();
      return;
    }

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
    const linkProps = {
      ...sharedProps,
      "aria-disabled": disabled || loading ? true : undefined,
    };

    // For internal hash links, use the harmonic scroll
    if (href.startsWith('#')) {
      return (
        <a 
          href={href}
          onClick={handleClick}
          {...linkProps}
        >
          {renderContent()}
        </a>
      );
    }
    
    // For external links, use Next.js Link
    return (
      <Link 
        href={href} 
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : rel}
        download={download}
        {...linkProps}
        onClick={handleClick}
      >
        {renderContent()}
      </Link>
    );
  }
  
  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled || loading}
      {...sharedProps}
    >
      {renderContent()}
    </button>
  );
}
