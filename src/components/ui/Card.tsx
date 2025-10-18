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

// Main Card component
export function Card({ 
  className = '', 
  children, 
  variant = 'default',
  animate = false
}: CardProps) {
  const baseCardStyles = `
    bg-gradient-to-br from-[var(--card-bg)]/95 to-[var(--card-bg)]/85 rounded-xl border border-[var(--card-border)] p-6
    shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5),_0_2px_8px_rgba(0,0,0,0.3)]
    backdrop-blur-2xl relative overflow-hidden
  `;

  const variantStyles = {
    default: "",
    primary: "border-primary/8 bg-primary/[0.02]",
    accent: "border-accent/8 bg-accent/[0.02]",
    teal: "border-teal/8 bg-teal/[0.02]", 
    purple: "border-purple/8 bg-purple/[0.02]",
    glass: "bg-glass-dark backdrop-blur-md border-white/5"
  };

  // No hover styles - elegant and static
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
      {/* Refined gradient overlay - subtle and elegant */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] via-transparent to-primary/[0.005] pointer-events-none z-[1]"></div>
      
      {/* Elegant top highlight */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/10 to-transparent pointer-events-none z-[1]"></div>
      
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
export function CardTitle({ className = '', children }: { className?: string, children: React.ReactNode }) {
  return (
    <h3 className={`text-xl lg:text-2xl font-bold text-foreground ${className}`.trim()}>
      {children}
    </h3>
  );
}

// CardDescription component
export function CardDescription({ className = '', children }: { className?: string, children: React.ReactNode }) {
  return (
    <p className={`text-sm text-[var(--foreground)]/80 dark:text-[var(--foreground-dark)]/80 mt-2 ${className}`.trim()}>
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
    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
}
