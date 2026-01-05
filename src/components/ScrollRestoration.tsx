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
  children 
}: { 
  id?: string; 
  className?: string; 
  children: React.ReactNode 
}) {
  return (
    <section id={id} className={`section ${className}`.trim()}>
      {children}
    </section>
  );
}
