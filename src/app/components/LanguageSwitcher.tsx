/**
 * NeoTechnology Solutions - Language Switcher Component
 * Allows users to switch between Arabic and English
 */

import React, { useState } from 'react';
import { Languages, Globe } from 'lucide-react';
import { Button } from './ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from './ui/dropdown-menu';
import { useLanguage } from '../contexts/LanguageContext';

import { cn } from '../lib/utils';

// Safe className utility with fallback
const safeClassName = (...classes: (string | undefined | null | false)[]): string => {
  try {
    return cn ? cn(...classes) : classes.filter(Boolean).join(' ');
  } catch (error) {
    console.error('ClassName utility error:', error);
    return classes.filter(Boolean).join(' ');
  }
};

interface LanguageSwitcherProps {
  variant?: 'dropdown' | 'toggle' | 'minimal';
  className?: string;
  showText?: boolean;
}

export function LanguageSwitcher({ 
  variant = 'dropdown', 
  className, 
  showText = true 
}: LanguageSwitcherProps) {
  // Safe hook usage with error handling
  try {
    const { language, setLanguage, isRTL } = useLanguage();

    // Simple button implementation to avoid complex component issues
    const buttonClass = safeClassName(
      'inline-flex items-center gap-2 px-3 py-2 text-sm font-mono text-[#C0C5CE] hover:text-[#4AE54A] hover:bg-[#12151C] transition-all duration-200 rounded-lg border border-transparent hover:border-[#4AE54A]/20',
      className
    );

    if (variant === 'toggle' || variant === 'minimal') {
      return (
        <button
          onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
          className={buttonClass}
          title={language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <Globe className="w-4 h-4" />
          {showText && variant === 'toggle' && (
            <span className="text-xs">
              {language === 'ar' ? 'EN' : 'العربية'}
            </span>
          )}
          {!showText || variant === 'minimal' && (
            <span className="text-xs">
              {language === 'ar' ? 'EN' : 'ع'}
            </span>
          )}
        </button>
      );
    }

    // Simple dropdown implementation without complex components
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={buttonClass}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <Languages className="w-4 h-4" />
          {showText && (
            <span className="text-sm">
              {language === 'ar' ? 'العربية' : 'English'}
            </span>
          )}
        </button>
        
        {isOpen && (
          <div className="absolute top-full mt-2 right-0 bg-[#12151C] border border-[#C0C5CE]/20 rounded-lg shadow-lg min-w-[120px] z-50">
            <button
              onClick={() => {
                setLanguage('en');
                setIsOpen(false);
              }}
              className={safeClassName(
                'w-full px-3 py-2 text-left text-sm font-mono text-[#C0C5CE] hover:text-[#4AE54A] hover:bg-[#1a1a1a] transition-colors flex items-center gap-2',
                language === 'en' && 'text-[#4AE54A] bg-[#1a1a1a]'
              )}
            >
              <span>🇺🇸</span>
              <span>English</span>
              {language === 'en' && <span className="text-xs ml-auto">✓</span>}
            </button>
            
            <button
              onClick={() => {
                setLanguage('ar');
                setIsOpen(false);
              }}
              className={safeClassName(
                'w-full px-3 py-2 text-right text-sm font-mono text-[#C0C5CE] hover:text-[#4AE54A] hover:bg-[#1a1a1a] transition-colors flex items-center gap-2 flex-row-reverse',
                language === 'ar' && 'text-[#4AE54A] bg-[#1a1a1a]'
              )}
              dir="rtl"
            >
              <span>🇸🇦</span>
              <span>العربية</span>
              {language === 'ar' && <span className="text-xs mr-auto">✓</span>}
            </button>
          </div>
        )}
        
        {/* Click outside to close */}
        {isOpen && (
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>
    );
  } catch (error) {
    console.error('LanguageSwitcher error:', error);
    // Fallback component if there's an error
    return (
      <button
        onClick={() => window.location.reload()}
        className={safeClassName(
          'p-2 rounded-lg text-[#C0C5CE] hover:text-[#4AE54A] font-mono text-xs',
          className
        )}
      >
        Lang
      </button>
    );
  }
}

// Quick language indicator for mobile
export function LanguageIndicator({ className }: { className?: string }) {
  try {
    const { language } = useLanguage();
    
    return (
      <div 
        className={safeClassName(
          'inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#12151C] border border-[#C0C5CE]/20 text-xs font-mono text-[#C0C5CE]',
          className
        )}
      >
        {language === 'ar' ? 'ع' : 'EN'}
      </div>
    );
  } catch (error) {
    console.error('LanguageIndicator error:', error);
    return (
      <div 
        className={safeClassName(
          'inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#12151C] border border-[#C0C5CE]/20 text-xs font-mono text-[#C0C5CE]',
          className
        )}
      >
        EN
      </div>
    );
  }
}

// Language-aware text component
interface LocalizedTextProps {
  arText: string;
  enText: string;
  className?: string;
  fallback?: string;
}

export function LocalizedText({ arText, enText, className, fallback }: LocalizedTextProps) {
  try {
    const { language } = useLanguage();
    const text = language === 'ar' ? arText : enText;
    
    return (
      <span className={className}>
        {text || fallback || ''}
      </span>
    );
  } catch (error) {
    console.error('LocalizedText error:', error);
    return (
      <span className={className}>
        {enText || fallback || ''}
      </span>
    );
  }
}

// RTL-aware container
interface RTLContainerProps {
  children: React.ReactNode;
  className?: string;
  forceDirection?: 'ltr' | 'rtl';
}

export function RTLContainer({ children, className, forceDirection }: RTLContainerProps) {
  try {
    const { direction } = useLanguage();
    
    return (
      <div 
        className={className}
        dir={forceDirection || direction}
      >
        {children}
      </div>
    );
  } catch (error) {
    console.error('RTLContainer error:', error);
    // Fallback to LTR if there's an error
    return (
      <div 
        className={className}
        dir={forceDirection || 'ltr'}
      >
        {children}
      </div>
    );
  }
}

export default LanguageSwitcher;