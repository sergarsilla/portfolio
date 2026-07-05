import { useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

const STORAGE_KEY = 'portfolio-theme';

const getInitialTheme = (): Theme => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
  } catch {
    // localStorage unavailable; fall through to system preference
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Preference simply won't persist
    }
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  return { theme, isDark: theme === 'dark', toggleTheme };
};
