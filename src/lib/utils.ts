// A collection of utility functions for the portfolio site

// Function to format numbers (e.g., 1000 -> 1k)
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'm';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
}

// Function to get language color for repositories
export function getLanguageColor(language: string | null): string {
  if (!language) return 'bg-gray-400';
  
  const colors: Record<string, string> = {
    JavaScript: 'bg-yellow-400',
    TypeScript: 'bg-blue-500',
    Python: 'bg-green-500',
    Java: 'bg-orange-500',
    'C#': 'bg-purple-500',
    HTML: 'bg-red-500',
    CSS: 'bg-pink-500',
    Ruby: 'bg-red-600',
    Go: 'bg-cyan-500',
    PHP: 'bg-indigo-500',
    Jupyter: 'bg-orange-400',
    Notebook: 'bg-orange-400',
    R: 'bg-blue-700',
    // Add more languages as needed
  };
  
  return colors[language] || 'bg-gray-400';
}

// Function to truncate text with ellipsis
export function truncateText(text: string, maxLength: number): string {
  if (!text) return '';
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}
