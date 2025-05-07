import { useCallback } from 'react';
import { smoothScrollTo } from '@/utils/smoothScroll';

export function useHarmonicScroll() {
  const scrollToSection = useCallback((sectionId: string) => {
    // Extract the ID without the # if it exists
    const id = sectionId.startsWith('#') ? sectionId.substring(1) : sectionId;
    smoothScrollTo(id);
  }, []);

  return { scrollToSection };
} 