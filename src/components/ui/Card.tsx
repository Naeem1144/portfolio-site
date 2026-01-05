"use client";

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface CardProps extends Omit<HTMLMotionProps<"div">, 'children'> {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'glow' | 'accent';
  hover?: boolean;
  className?: string;
}

export function Card({ 
  children, 
  variant = 'default',
  hover = true,
  className = '',
  ...props
}: CardProps) {
  const variants = {
    default: '',
    elevated: 'shadow-lg',
    glow: 'glow-accent',
    accent: 'border-glow',
  };

  return (
    <motion.div 
      className={`card ${variants[variant]} ${hover ? 'card-hoverable' : ''} ${className}`}
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : undefined}
      {...props}
    >
      <div className="card-content">
        {children}
      </div>
    </motion.div>
  );
}

// Card Header
export function CardHeader({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode; 
  className?: string;
}) {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  );
}

// Card Title
export function CardTitle({ 
  children, 
  className = '',
  as: Component = 'h3'
}: { 
  children: React.ReactNode; 
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}) {
  return (
    <Component className={`text-lg font-semibold text-[var(--foreground)] ${className}`}>
      {children}
    </Component>
  );
}

// Card Description
export function CardDescription({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode; 
  className?: string;
}) {
  return (
    <p className={`text-sm text-[var(--foreground-muted)] mt-1 ${className}`}>
      {children}
    </p>
  );
}

// Card Content wrapper for main content area
export function CardContent({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode; 
  className?: string;
}) {
  return (
    <div className={`${className}`}>
      {children}
    </div>
  );
}

// Card Footer
export function CardFooter({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode; 
  className?: string;
}) {
  return (
    <div className={`mt-4 pt-4 border-t border-[var(--border)] ${className}`}>
      {children}
    </div>
  );
}

// Card Badge
export function CardBadge({ 
  children, 
  variant = 'default',
  className = '' 
}: { 
  children: React.ReactNode; 
  variant?: 'default' | 'accent' | 'secondary';
  className?: string;
}) {
  const variants = {
    default: 'badge',
    accent: 'badge badge-accent',
    secondary: 'badge badge-secondary',
  };

  return (
    <span className={`${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
