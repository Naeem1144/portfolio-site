"use client";

import React from 'react';

interface LoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; // Added xs and xl size
  className?: string;
}

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizes = {
    xs: 'w-4 h-4',
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  // Using the enhanced sophisticated loading styles
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className={`${sizes[size]} relative`}>
        {/* Outer spinning ring with gradient */}
        <div 
          className={`absolute inset-0 rounded-full border-2 border-transparent
          animate-spin [border-left-color:var(--accent)] [border-top-color:var(--primary)]`}
          style={{ animationDuration: '1.4s' }}
        ></div>
        
        {/* Inner pulsing circle */}
        <div 
          className="absolute inset-1/4 rounded-full bg-gradient-to-tr from-primary/40 to-accent/40 animate-pulse"
          style={{ animationDuration: '2s' }}
        ></div>
        
        {/* Center dot */}
        <div className="absolute inset-[45%] rounded-full bg-primary dark:bg-primary-dark"></div>
      </div>
    </div>
  );
}

interface LoadingPageProps {
  message?: string;
}

export function LoadingPage({ message = "Loading, please wait..." }: LoadingPageProps) {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-glass-light dark:bg-glass-dark backdrop-blur-md z-[100]">
      <div className="relative">
        <div className="absolute -inset-12 rounded-full bg-primary/5 dark:bg-primary-dark/10 animate-pulse"></div>
        <LoadingSpinner size="xl" />
      </div>
      {message && (
        <div className="mt-8 text-center">
          <p className="text-lg font-medium text-foreground/90 dark:text-foreground-dark/90 text-balance">
            {message}
          </p>
          <div className="mt-2 h-0.5 w-16 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto animate-pulse"></div>
        </div>
      )}
    </div>
  );
}

// Enhanced skeleton loading for a more sophisticated look
interface SkeletonProps {
  className?: string;
  variant?: 'default' | 'shimmer' | 'pulse';
  count?: number; // Number of skeleton lines
  height?: string; // CSS height for each line
  width?: string; // CSS width for each line, can be comma-separated for multiple lines
  circle?: boolean; // If true, renders a circle
  containerClassName?: string;
}

export function Skeleton({ 
  className = '', 
  count = 1, 
  height = 'h-4', 
  width = 'w-full', 
  circle = false, 
  variant = 'default',
  containerClassName = '' 
}: SkeletonProps) {
  const items = [];
  const widths = width.split(',').map(w => w.trim());

  // Decide on the styling based on variant
  const getVariantClasses = () => {
    switch(variant) {
      case 'shimmer':
        return `bg-gradient-to-r from-secondary/10 via-secondary/20 to-secondary/10
                dark:from-secondary-dark/10 dark:via-secondary-dark/20 dark:to-secondary-dark/10
                bg-[length:200%_100%] animate-shimmer`;
      case 'pulse':
        return 'animate-pulse bg-gradient-to-r from-secondary/20 to-secondary/10 dark:from-secondary-dark/20 dark:to-secondary-dark/10';
      default:
        return 'animate-pulse bg-secondary/20 dark:bg-secondary-dark/20';
    }
  };

  const variantClasses = getVariantClasses();

  for (let i = 0; i < count; i++) {
    const itemWidth = widths[i % widths.length]; // Cycle through widths if count > widths.length
    const delay = i * 150; // Staggered animation delay
    
    items.push(
      <div
        key={i}
        className={`
          relative overflow-hidden
          ${variantClasses}
          ${circle ? `rounded-full ${height} ${itemWidth || 'w-full'}` : `rounded-md ${height} ${itemWidth || 'w-full'}`}
          ${className}
        `}
        style={{ animationDelay: `${delay}ms` }}
      >
        {/* Add subtle inner shadow for depth */}
        <div className="absolute inset-0 rounded-inherit shadow-inner"></div>
      </div>
    );
  }
  
  return (
    <div className={`space-y-3 ${containerClassName}`}>
      {items}
    </div>
  );
}

// Kept SkeletonCard as an example, but recommend using the more flexible Skeleton component above
export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-card-bg dark:bg-card-bg-dark rounded-lg border border-card-border dark:border-card-border-dark p-6 shadow-md ${className}`}>
      <div className="space-y-4">
        <Skeleton height="h-6" width="w-3/4" />
        <Skeleton height="h-4" width="w-1/2" />
        <Skeleton count={2} height="h-3" />
        <Skeleton height="h-10" width="w-1/3" className="mt-3" />
      </div>
    </div>
  );
}
