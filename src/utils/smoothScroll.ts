export function smoothScrollTo(elementId: string) {
  // Get the target element
  const element = document.getElementById(elementId);
  if (!element) return;

  const offset = 80; // Account for fixed header
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;

  // Use native smooth scrolling with CSS easing for better performance
  // This leverages browser-optimized scrolling instead of JavaScript animation
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
} 