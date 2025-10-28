"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  className?: string;
  children: React.ReactNode;
  hoverable?: boolean;
  variant?: 'default' | 'primary' | 'accent' | 'teal' | 'purple' | 'glass';
  animate?: boolean;
}

// Main Card component with refined glassmorphism
export function Card({ 
  className = '', 
  children, 
  variant = 'default',
  animate = false
}: CardProps) {
  const baseCardStyles = `
    bg-gradient-to-br from-white/[0.04] to-white/[0.01] rounded-2xl border border-white/[0.06] p-6
    shadow-[0_8px_32px_-8px_rgba(0,0,0,0.3),_0_1px_2px_rgba(0,0,0,0.1)]
    backdrop-blur-xl relative overflow-hidden
  `;

  const variantStyles = {
    default: "",
    primary: "border-white/[0.08] bg-white/[0.02]",
    accent: "border-white/[0.08] bg-white/[0.02]",
    teal: "border-white/[0.08] bg-white/[0.02]", 
    purple: "border-white/[0.08] bg-white/[0.02]",
    glass: "bg-white/[0.02] backdrop-blur-xl border-white/[0.05]"
  };

  const hoverStyles = "";

  const CardComponent = animate ? motion.div : 'div';
  const animationProps = animate ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  } : {};

  return (
    <CardComponent 
      className={`${baseCardStyles} ${variantStyles[variant]} ${hoverStyles} ${className}`.trim()}
      {...animationProps}
    >
      {/* Subtle inner glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-transparent pointer-events-none z-[1]"></div>
      
      {/* Minimal top highlight */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none z-[1] opacity-50"></div>
      
      {children}
    </CardComponent>
  );
}

// CardHeader component
export function CardHeader({ className = '', children }: { className?: string, children: React.ReactNode }) {
  return (
    <div className={`pb-4 mb-4 border-b border-white/[0.03] ${className}`.trim()}>
      {children}
    </div>
  );
}

// CardTitle component
interface CardTitleProps {
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export function CardTitle({ className = '', children, style }: CardTitleProps) {
  const defaultStyle: React.CSSProperties = {
    fontSize: 'clamp(var(--font-size-lg), 2vw, var(--font-size-xl))',
    lineHeight: 'var(--line-height-snug)',
    letterSpacing: 'var(--letter-spacing-tight)',
    ...style
  };
  
  return (
    <h3 
      className={`font-bold text-foreground ${className}`.trim()}
      style={defaultStyle}
    >
      {children}
    </h3>
  );
}

// CardDescription component
interface CardDescriptionProps {
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export function CardDescription({ className = '', children, style }: CardDescriptionProps) {
  const defaultStyle: React.CSSProperties = {
    fontSize: 'var(--font-size-sm)',
    lineHeight: 'var(--line-height-relaxed)',
    letterSpacing: 'var(--letter-spacing-wide)',
    ...style
  };
  
  return (
    <p 
      className={`text-[var(--foreground)]/75 dark:text-[var(--foreground-dark)]/75 mt-2 ${className}`.trim()}
      style={defaultStyle}
    >
      {children}
    </p>
  );
}

// CardContent component
export function CardContent({ className = '', children }: { className?: string, children: React.ReactNode }) {
  return (
    <div className={`mt-4 ${className}`.trim()}>
      {children}
    </div>
  );
}

// CardFooter component
export function CardFooter({ className = '', children }: { className?: string, children: React.ReactNode }) {
  return (
    <div className={`mt-6 pt-4 border-t border-white/[0.03] ${className}`.trim()}>
      {children}
    </div>
  );
}

// New CardBadge component
export function CardBadge({ 
  children, 
  variant = 'default',
  className = '' 
}: { 
  children: React.ReactNode, 
  variant?: 'default' | 'primary' | 'accent' | 'teal' | 'purple',
  className?: string 
}) {
  const variantStyles = {
    default: "bg-foreground/10 text-foreground",
    primary: "bg-primary/15 text-primary",
    accent: "bg-accent/15 text-accent",
    teal: "bg-teal/15 text-teal",
    purple: "bg-purple/15 text-purple"
  };

  return (
    <span 
      className={`inline-flex px-2.5 py-0.5 rounded-full font-medium ${variantStyles[variant]} ${className}`}
      style={{
        fontSize: 'var(--font-size-xs)',
        letterSpacing: 'var(--letter-spacing-wide)'
      }}
    >
      {children}
    </span>
  );
}
