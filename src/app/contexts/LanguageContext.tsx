/**
 * NeoTechnology Solutions - Language Context
 * Manages language state and RTL support across the application
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, Direction, getDirection, isRTL, t, formatCurrency, formatDate, formatNumber } from '../lib/i18n';

interface LanguageContextType {
  language: Language;
  direction: Direction;
  isRTL: boolean;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  formatCurrency: (amount: number, currency?: string) => string;
  formatDate: (date: Date | string, options?: Intl.DateTimeFormatOptions) => string;
  formatNumber: (number: number, options?: Intl.NumberFormatOptions) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
  defaultLanguage?: Language;
}

export function LanguageProvider({ children, defaultLanguage = 'en' }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      // Check for saved language preference
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('neo-language') as Language;
        if (saved && ['ar', 'en'].includes(saved)) {
          return saved;
        }
        
        // Detect browser language
        const browserLang = navigator.language.toLowerCase();
        if (browserLang.startsWith('ar')) {
          return 'ar';
        }
      }
    } catch (error) {
      console.error('Error initializing language:', error);
    }
    
    return defaultLanguage;
  });

  const direction = getDirection ? getDirection(language) : 'ltr';
  const rtl = isRTL ? isRTL(language) : false;

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('neo-language', lang);
    }
  };

  const translate = (key: string) => {
    try {
      return t ? t(key, language) : key;
    } catch (error) {
      console.error('Translation error:', error);
      return key;
    }
  };
  
  const formatCurrencyWithLanguage = (amount: number, currency?: string) => {
    try {
      return formatCurrency ? formatCurrency(amount, language, currency) : `${amount}`;
    } catch (error) {
      console.error('Currency formatting error:', error);
      return `${amount}`;
    }
  };
    
  const formatDateWithLanguage = (date: Date | string, options?: Intl.DateTimeFormatOptions) => {
    try {
      return formatDate ? formatDate(date, language, options) : new Date(date).toLocaleDateString();
    } catch (error) {
      console.error('Date formatting error:', error);
      return new Date(date).toLocaleDateString();
    }
  };
    
  const formatNumberWithLanguage = (number: number, options?: Intl.NumberFormatOptions) => {
    try {
      return formatNumber ? formatNumber(number, language, options) : number.toString();
    } catch (error) {
      console.error('Number formatting error:', error);
      return number.toString();
    }
  };

  // Update document direction and language
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dir = direction;
      document.documentElement.lang = language;
      
      // Add language-specific classes
      document.body.classList.remove('lang-ar', 'lang-en');
      document.body.classList.add(`lang-${language}`);
    }
  }, [language, direction]);

  const value: LanguageContextType = {
    language,
    direction,
    isRTL: rtl,
    setLanguage,
    t: translate,
    formatCurrency: formatCurrencyWithLanguage,
    formatDate: formatDateWithLanguage,
    formatNumber: formatNumberWithLanguage
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    console.error('useLanguage must be used within a LanguageProvider');
    // Return a fallback context to prevent crashes
    return {
      language: 'en' as Language,
      direction: 'ltr' as Direction,
      isRTL: false,
      setLanguage: () => {},
      t: (key: string) => key,
      formatCurrency: (amount: number) => `${amount}`,
      formatDate: (date: Date | string) => new Date(date).toLocaleDateString(),
      formatNumber: (number: number) => number.toString()
    };
  }
  return context;
}

// Language toggle hook for components
export function useLanguageToggle() {
  const { language, setLanguage } = useLanguage();
  
  const toggle = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };
  
  return { language, toggle };
}

export default LanguageContext;