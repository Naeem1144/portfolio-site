export function smoothScrollTo(elementId: string) {
  // Get the target element
  const element = document.getElementById(elementId);
  if (!element) return;

  const offset = 80; // Account for fixed header
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;

  // Use spring animation for more harmonic scrolling
  const start = window.pageYOffset;
  const distance = offsetPosition - start;
  let startTime: number | null = null;

  // Spring physics parameters
  const duration = 1000; // ms
  const dampingRatio = 0.8; // Less than 1 creates a subtle bouncy effect
  const naturalFrequency = 12;

  // Harmonic oscillator function for a spring-like animation
  function springAnimation(t: number): number {
    // Calculate position based on damped spring formula
    if (t >= 1) return 1;
    const decay = Math.exp(-dampingRatio * naturalFrequency * t);
    return 1 - decay * (Math.cos(Math.sqrt(1 - dampingRatio * dampingRatio) * naturalFrequency * t) + 
                         (dampingRatio / Math.sqrt(1 - dampingRatio * dampingRatio)) * 
                         Math.sin(Math.sqrt(1 - dampingRatio * dampingRatio) * naturalFrequency * t));
  }

  function step(timestamp: number) {
    if (!startTime) startTime = timestamp;
    const progress = (timestamp - startTime) / duration;

    if (progress < 1) {
      const springValue = springAnimation(progress);
      window.scrollTo(0, start + distance * springValue);
      window.requestAnimationFrame(step);
    } else {
      window.scrollTo(0, offsetPosition);
    }
  }

  window.requestAnimationFrame(step);
} 