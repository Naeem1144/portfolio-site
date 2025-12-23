import React from 'react';

interface CheckIconProps {
  className?: string;
  size?: number;
}

export const CheckIcon = React.memo(({ className = "text-primary/60", size = 16 }: CheckIconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
    aria-hidden="true"
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
));

CheckIcon.displayName = 'CheckIcon';
