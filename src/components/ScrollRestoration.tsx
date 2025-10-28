"use client";

import React from 'react';
import { useScrollRestoration } from '@/hooks/useScrollRestoration';

export function ScrollRestoration() {
  useScrollRestoration();
  return null;
}

export function Container({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`.trim()}>
      {children}
    </div>
  );
}

export function Section({ id, className = '', children }: { id?: string; className?: string; children: React.ReactNode }) {
  return (
    <section id={id} className={`w-full relative ${className}`.trim()}>
      {children}
    </section>
  );
}