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
  hoverable = false,
  variant = 'default',
  animate = false
}: CardProps) {
  const baseCardStyles = `
    bg-gradient-to-br from-[var(--card-bg)]/80 to-[var(--card-bg)]/60 rounded-xl border border-[var(--card-border)] p-6
    shadow-[0_8px_32px_-4px_var(--shadow),_0_4px_8px_-2px_var(--shadow)]
    backdrop-blur-xl transition-all duration-500 ease-out relative overflow-hidden
  `;

  const variantStyles = {
    default: "",
    primary: "border-primary/20 bg-primary/[0.03]",
    accent: "border-accent/20 bg-accent/[0.03]",
    teal: "border-teal/20 bg-teal/[0.03]", 
    purple: "border-purple/20 bg-purple/[0.03]",
    glass: "bg-glass-dark backdrop-blur-md border-white/10"
  };

  // Premium hover styles with smooth transform and shadow
  const hoverStyles = hoverable 
    ? "hover:shadow-[0_16px_48px_-8px_var(--shadow),_0_8px_16px_-4px_var(--shadow)] hover:border-primary/40 hover:-translate-y-2 hover:scale-[1.02] custom-card-hover" 
    : "";

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
      {/* Premium gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-primary/[0.02] pointer-events-none z-[1]"></div>
      
      {/* Animated glow effect on hover */}
      {hoverable && (
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 blur-xl"></div>
        </div>
      )}
      
      {/* Subtle top highlight */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent pointer-events-none z-[1]"></div>
      
      {children}
    </CardComponent>
  );
}

// CardHeader component
export function CardHeader({ className = '', children }: { className?: string, children: React.ReactNode }) {
  return (
    <div className={`pb-4 mb-4 border-b border-[var(--card-border)] ${className}`.trim()}>
      {children}
    </div>
  );
}

// CardTitle component
export function CardTitle({ className = '', children }: { className?: string, children: React.ReactNode }) {
  return (
    <h3 className={`text-xl lg:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white via-primary/90 to-primary/80 ${className}`.trim()}>
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
    <div className={`mt-6 pt-4 border-t border-[var(--card-border)] ${className}`.trim()}>
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
