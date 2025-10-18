// Theme Toggle Utility for SafeRide Uber Theme
// This is a minimal utility for preview purposes only

export const toggleUberTheme = () => {
  const body = document.body;
  const currentTheme = body.getAttribute('data-theme');
  
  if (currentTheme === 'uber') {
    body.removeAttribute('data-theme');
    localStorage.setItem('saferide-theme', 'default');
    return 'default';
  } else {
    body.setAttribute('data-theme', 'uber');
    localStorage.setItem('saferide-theme', 'uber');
    return 'uber';
  }
};

export const initializeTheme = () => {
  const savedTheme = localStorage.getItem('saferide-theme');
  if (savedTheme === 'uber') {
    document.body.setAttribute('data-theme', 'uber');
  }
};

export const getCurrentTheme = () => {
  return document.body.getAttribute('data-theme') || 'default';
};

// Auto-initialize theme on load
if (typeof window !== 'undefined') {
  initializeTheme();
}