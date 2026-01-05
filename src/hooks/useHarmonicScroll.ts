import { useCallback } from 'react';
import { smoothScrollTo } from '@/utils/smoothScroll';

export function useHarmonicScroll() {
  const scrollToSection = useCallback((sectionId: string) => {
    smoothScrollTo(sectionId);
  }, []);

  return { scrollToSection };
}
