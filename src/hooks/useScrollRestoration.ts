import { useEffect } from 'react';

export function useScrollRestoration() {
  useEffect(() => {
    // Disable the browser's default scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Scroll to top on page load/refresh
    window.scrollTo(0, 0);

    // Cleanup function
    return () => {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'auto';
      }
    };
  }, []);
} 