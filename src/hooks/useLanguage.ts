import { useState, useEffect } from 'react';

export type Language = 'es' | 'en';

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      // Check localStorage first, then browser language, default to Spanish
      const savedLanguage = localStorage.getItem('portfolio-language') as Language;
      if (savedLanguage && (savedLanguage === 'es' || savedLanguage === 'en')) {
        return savedLanguage;
      }
    } catch (error) {
      console.warn('LocalStorage access denied or failed:', error);
    }

    // Check browser language
    const browserLanguage = navigator.language.toLowerCase();
    if (browserLanguage.startsWith('es')) {
      return 'es';
    }

    return 'es'; // Default to Spanish
  });

  useEffect(() => {
    try {
      localStorage.setItem('portfolio-language', language);
    } catch (error) {
      console.warn('Failed to save language to localStorage:', error);
    }
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es');
  };

  return {
    language,
    setLanguage,
    toggleLanguage
  };
};