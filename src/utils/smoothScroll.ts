// Simple smooth scroll utility
export function smoothScrollTo(targetId: string): void {
  const id = targetId.startsWith('#') ? targetId.substring(1) : targetId;
  
  // Handle "home" as scroll to top
  if (id === 'home' || id === '') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  }
}
