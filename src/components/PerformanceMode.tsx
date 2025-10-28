"use client";

import { useEffect } from 'react';

export function PerformanceMode() {
  useEffect(() => {
    try {
      const docEl = document.documentElement;

      // Respect explicit query param only; default keeps glassmorphism
      const urlParams = new URLSearchParams(window.location.search);
      const perfParam = urlParams.get('perf');
      if (perfParam === 'lite') docEl.classList.add('perf-lite');
      else docEl.classList.remove('perf-lite');
    } catch {
      // noop
    }
  }, []);

  return null;
}


