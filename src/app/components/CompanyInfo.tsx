import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

// Company information centralized for consistency
export const COMPANY_INFO = {
  name: 'NeoTechnology Solutions',
  brand: 'Neo',
  tagline: {
    en: 'Advanced E-commerce Solutions',
    ar: 'حلول التجارة الإلكترونية المتقدمة'
  },
  description: {
    en: 'Specialized in e-commerce solutions for US and GCC markets, supporting WordPress, Shopify, Wix, and Zed platforms.',
    ar: 'متخصصة في حلول التجارة الإلكترونية للأسواق الأمريكية ودول مجلس التعاون الخليجي، تدعم منصات WordPress وShopify وWix وZed.'
  },
  contact: {
    email: 'info@neotechnology.solutions',
    support: 'support@neotechnology.solutions',
    sales: 'sales@neotechnology.solutions'
  },
  terminal: {
    prompt: {
      en: 'neo@technology:~$',
      ar: 'neo@technology:~$'
    },
    company: {
      en: 'company-info@neotech:~$',
      ar: 'company-info@neotech:~$'
    }
  },
  capabilities: {
    setup_time: {
      en: 'Few Hours',
      ar: 'ساعات قليلة'
    },
    pricing: {
      en: 'Custom Quote',
      ar: 'حل مخصص'
    },
    support: '24/7',
    success_rate: '99.9%'
  },
  platforms: ['WordPress', 'Shopify', 'Wix', 'Zed'],
  markets: {
    en: ['United States', 'GCC Countries'],
    ar: ['الولايات المتحدة', 'دول مجلس التعاون الخليجي']
  }
};

interface CompanyInfoProps {
  variant?: 'full' | 'brief' | 'contact' | 'terminal';
  className?: string;
}

export function CompanyInfo({ variant = 'brief', className = '' }: CompanyInfoProps) {
  const { language } = useLanguage();
  
  const renderFull = () => (
    <div className={`space-y-4 ${className}`}>
      <div>
        <h2 
          className="text-2xl font-bold"
          style={{ 
            color: 'var(--terminal-silver)', 
            fontFamily: 'JetBrains Mono, monospace' 
          }}
        >
          {COMPANY_INFO.name}
        </h2>
        <p 
          className="text-lg"
          style={{ 
            color: 'var(--neo-blue)', 
            fontFamily: 'JetBrains Mono, monospace' 
          }}
        >
          {COMPANY_INFO.tagline[language as keyof typeof COMPANY_INFO.tagline]}
        </p>
      </div>
      
      <p 
        className="text-base leading-relaxed"
        style={{ 
          color: 'rgba(192, 197, 206, 0.8)', 
          fontFamily: 'JetBrains Mono, monospace' 
        }}
      >
        {COMPANY_INFO.description[language as keyof typeof COMPANY_INFO.description]}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 
            className="font-semibold mb-2"
            style={{ 
              color: 'var(--neo-green)', 
              fontFamily: 'JetBrains Mono, monospace' 
            }}
          >
            {language === 'ar' ? 'المنصات المدعومة:' : 'Supported Platforms:'}
          </h3>
          <ul className="space-y-1">
            {COMPANY_INFO.platforms.map((platform, index) => (
              <li 
                key={index}
                className="text-sm"
                style={{ 
                  color: 'var(--terminal-silver)', 
                  fontFamily: 'JetBrains Mono, monospace' 
                }}
              >
                • {platform}
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 
            className="font-semibold mb-2"
            style={{ 
              color: 'var(--neo-green)', 
              fontFamily: 'JetBrains Mono, monospace' 
            }}
          >
            {language === 'ar' ? 'الأسواق المستهدفة:' : 'Target Markets:'}
          </h3>
          <ul className="space-y-1">
            {COMPANY_INFO.markets[language as keyof typeof COMPANY_INFO.markets].map((market, index) => (
              <li 
                key={index}
                className="text-sm"
                style={{ 
                  color: 'var(--terminal-silver)', 
                  fontFamily: 'JetBrains Mono, monospace' 
                }}
              >
                • {market}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
  
  const renderBrief = () => (
    <div className={`space-y-2 ${className}`}>
      <h3 
        className="text-lg font-bold"
        style={{ 
          color: 'var(--terminal-silver)', 
          fontFamily: 'JetBrains Mono, monospace' 
        }}
      >
        {COMPANY_INFO.name}
      </h3>
      <p 
        className="text-sm"
        style={{ 
          color: 'var(--neo-blue)', 
          fontFamily: 'JetBrains Mono, monospace' 
        }}
      >
        {COMPANY_INFO.tagline[language as keyof typeof COMPANY_INFO.tagline]}
      </p>
    </div>
  );
  
  const renderContact = () => (
    <div className={`space-y-3 ${className}`}>
      <h3 
        className="text-lg font-bold mb-3"
        style={{ 
          color: 'var(--terminal-silver)', 
          fontFamily: 'JetBrains Mono, monospace' 
        }}
      >
        {language === 'ar' ? 'معلومات الاتصال' : 'Contact Information'}
      </h3>
      
      <div className="space-y-2">
        <div>
          <span 
            className="text-sm font-medium"
            style={{ 
              color: 'var(--neo-green)', 
              fontFamily: 'JetBrains Mono, monospace' 
            }}
          >
            {language === 'ar' ? 'عام:' : 'General:'}
          </span>
          <span 
            className="text-sm ml-2"
            style={{ 
              color: 'var(--terminal-silver)', 
              fontFamily: 'JetBrains Mono, monospace' 
            }}
          >
            {COMPANY_INFO.contact.email}
          </span>
        </div>
        
        <div>
          <span 
            className="text-sm font-medium"
            style={{ 
              color: 'var(--neo-green)', 
              fontFamily: 'JetBrains Mono, monospace' 
            }}
          >
            {language === 'ar' ? 'الدعم الفني:' : 'Support:'}
          </span>
          <span 
            className="text-sm ml-2"
            style={{ 
              color: 'var(--terminal-silver)', 
              fontFamily: 'JetBrains Mono, monospace' 
            }}
          >
            {COMPANY_INFO.contact.support}
          </span>
        </div>
        
        <div>
          <span 
            className="text-sm font-medium"
            style={{ 
              color: 'var(--neo-green)', 
              fontFamily: 'JetBrains Mono, monospace' 
            }}
          >
            {language === 'ar' ? 'المبيعات:' : 'Sales:'}
          </span>
          <span 
            className="text-sm ml-2"
            style={{ 
              color: 'var(--terminal-silver)', 
              fontFamily: 'JetBrains Mono, monospace' 
            }}
          >
            {COMPANY_INFO.contact.sales}
          </span>
        </div>
      </div>
    </div>
  );
  
  const renderTerminal = () => (
    <div className={`space-y-2 ${className}`}>
      <div 
        className="text-sm"
        style={{ 
          color: 'var(--neo-green)', 
          fontFamily: 'JetBrains Mono, monospace' 
        }}
      >
        {COMPANY_INFO.terminal.company[language as keyof typeof COMPANY_INFO.terminal.company]}
      </div>
      <div 
        className="text-xs"
        style={{ 
          color: 'var(--terminal-silver)', 
          fontFamily: 'JetBrains Mono, monospace' 
        }}
      >
        📊 {COMPANY_INFO.name.toUpperCase()} - {COMPANY_INFO.tagline[language as keyof typeof COMPANY_INFO.tagline].toUpperCase()}
      </div>
    </div>
  );
  
  switch (variant) {
    case 'full':
      return renderFull();
    case 'contact':
      return renderContact();
    case 'terminal':
      return renderTerminal();
    default:
      return renderBrief();
  }
}

// Hook for easy access to company info
export function useCompanyInfo() {
  const { language } = useLanguage();
  
  return {
    ...COMPANY_INFO,
    tagline: COMPANY_INFO.tagline[language as keyof typeof COMPANY_INFO.tagline],
    description: COMPANY_INFO.description[language as keyof typeof COMPANY_INFO.description],
    markets: COMPANY_INFO.markets[language as keyof typeof COMPANY_INFO.markets],
    terminal: {
      prompt: COMPANY_INFO.terminal.prompt[language as keyof typeof COMPANY_INFO.terminal.prompt],
      company: COMPANY_INFO.terminal.company[language as keyof typeof COMPANY_INFO.terminal.company]
    },
    capabilities: {
      ...COMPANY_INFO.capabilities,
      setup_time: COMPANY_INFO.capabilities.setup_time[language as keyof typeof COMPANY_INFO.capabilities.setup_time],
      pricing: COMPANY_INFO.capabilities.pricing[language as keyof typeof COMPANY_INFO.capabilities.pricing]
    }
  };
}