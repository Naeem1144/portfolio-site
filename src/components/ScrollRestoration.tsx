"use client";

import React from 'react';

export function ScrollRestoration() {
  // Simple scroll restoration - no heavy effects
  return null;
}

export function Container({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`container ${className}`.trim()}>
      {children}
    </div>
  );
}

export function Section({ 
  id, 
  className = '', 
  variant = 'default',
  children 
}: { 
  id?: string; 
  className?: string; 
  variant?: 'default' | 'elevated';
  children: React.ReactNode 
}) {
  const variantClass = variant === 'elevated' ? 'section-elevated' : '';
  return (
    <section id={id} className={`section ${variantClass} ${className}`.trim()}>
      {children}
    </section>
  );
}
