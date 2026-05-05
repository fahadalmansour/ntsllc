import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Button } from './ui/button';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Menu, X, Terminal, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// ✅ ENHANCED: Header with explicit terminal styling
export function Header({ onNavigate }: { onNavigate: (section: string) => void }) {
  const { language, isRTL } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // ✅ ENHANCED: Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ✅ ENHANCED: Navigation items with explicit terminal styling
  const navigationItems = useMemo(() => ({
    en: [
      {
        label: 'Services',
        key: 'services',
        dropdown: [
          { label: 'Store Setup & Integration', key: 'services/store-setup', description: 'Custom e-commerce store builds' },
          { label: 'Payment Solutions', key: 'services/payments', description: 'Mada, STC Pay, Stripe, and more' },
          { label: 'Workflow Automation', key: 'services/automation', description: 'n8n-powered automation' },
          { label: 'Domain & Hosting', key: 'services/domain-hosting', description: 'Domain, email, SSL, VPS' },
          { label: 'AI-Powered Consulting', key: 'services/consulting', description: 'Claude SDK-based consulting' },
          { label: 'Freelance Brokerage', key: 'services/brokerage', description: 'Vetted talent, managed' },
          { label: 'Quick-Fix Support', key: 'services/quick-fix', description: 'On-demand technical fixes' },
          { label: 'Communication Suite', key: 'services/communication', description: 'Email, SMS, WhatsApp' },
        ]
      },
      { label: 'Pricing', key: 'pricing' },
      { label: 'About', key: 'about' },
      {
        label: 'Resources',
        key: 'resources',
        dropdown: [
          { label: 'Blog', key: 'blog', description: 'E-commerce insights' },
          { label: 'FAQ', key: 'faq', description: 'Common questions answered' },
        ]
      },
    ],
    ar: [
      {
        label: 'Services',
        key: 'services',
        dropdown: [
          { label: 'Store Setup & Integration', key: 'services/store-setup', description: 'Custom e-commerce store builds' },
          { label: 'Payment Solutions', key: 'services/payments', description: 'Mada, STC Pay, Stripe, and more' },
          { label: 'Workflow Automation', key: 'services/automation', description: 'n8n-powered automation' },
          { label: 'Domain & Hosting', key: 'services/domain-hosting', description: 'Domain, email, SSL, VPS' },
          { label: 'AI-Powered Consulting', key: 'services/consulting', description: 'Claude SDK-based consulting' },
          { label: 'Freelance Brokerage', key: 'services/brokerage', description: 'Vetted talent, managed' },
          { label: 'Quick-Fix Support', key: 'services/quick-fix', description: 'On-demand technical fixes' },
          { label: 'Communication Suite', key: 'services/communication', description: 'Email, SMS, WhatsApp' },
        ]
      },
      { label: 'Pricing', key: 'pricing' },
      { label: 'About', key: 'about' },
      {
        label: 'Resources',
        key: 'resources',
        dropdown: [
          { label: 'Blog', key: 'blog', description: 'E-commerce insights' },
          { label: 'FAQ', key: 'faq', description: 'Common questions answered' },
        ]
      },
    ]
  }), []);

  const currentNavItems = navigationItems[language as keyof typeof navigationItems];

  // ✅ ENHANCED: Navigation handlers
  const handleNavigate = useCallback((section: string) => {
    onNavigate(section);
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [onNavigate]);

  const toggleDropdown = useCallback((key: string) => {
    setActiveDropdown(activeDropdown === key ? null : key);
  }, [activeDropdown]);

  // ✅ ENHANCED: Dropdown component with terminal styling
  const DropdownMenu = useCallback(({ items, isOpen }: { items: any[], isOpen: boolean }) => {
    if (!isOpen) return null;

    return (
      <div className="absolute top-full left-0 w-80 mt-2 py-2 bg-[#12151C] border border-[#00d4ff]/30 rounded-lg shadow-xl backdrop-blur-sm neo-dropdown z-[70]">
        {items.map((item) => (
          <button
            key={item.key}
            onClick={() => handleNavigate(item.key)}
            className="block w-full px-4 py-3 text-left hover:bg-[#00d4ff]/10 transition-colors duration-200 neo-dropdown-item"
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              color: 'var(--terminal-silver)'
            }}
          >
            <div className="font-semibold text-[#00d4ff] text-sm">{item.label}</div>
            <div className="text-xs text-[#C0C5CE]/70 mt-1">{item.description}</div>
          </button>
        ))}
      </div>
    );
  }, [handleNavigate]);

  const content = useMemo(() => ({
    en: {
      contactUs: 'Contact Us',
      getQuote: 'Get started'
    },
    ar: {
      contactUs: 'Contact Us',
      getQuote: 'Get started'
    }
  }), []);

  const currentContent = content[language as keyof typeof content];

  return (
    <header 
      className={`
        fixed top-0 left-0 right-0 z-[60] transition-all duration-300
        ${isScrolled 
          ? 'bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-[#00d4ff]/20 shadow-lg' 
          : 'bg-transparent'
        }
        neo-header
      `}
      style={{
        fontFamily: 'JetBrains Mono, monospace'
      }}
    >
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* ✅ ENHANCED: Logo with terminal aesthetics */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => handleNavigate('home')}
          >
            <div className="relative">
              <div className="w-10 h-10 bg-[#12151C] border border-[#00d4ff]/50 rounded-lg flex items-center justify-center group-hover:border-[#00d4ff] transition-colors duration-300 neo-logo-container">
                <Terminal className="w-5 h-5 text-[#00d4ff]" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#00ff88] rounded-full animate-pulse neo-status-dot"></div>
            </div>
            
            <div className="flex flex-col">
              <span 
                className="text-lg font-bold text-[#00d4ff] group-hover:text-[#00d4ff]/90 transition-colors duration-300 neo-brand-text"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                NeoTech
              </span>
              <span 
                className="text-xs text-[#00ff88] font-mono neo-brand-tagline"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                Solutions
              </span>
            </div>
          </div>

          {/* ✅ ENHANCED: Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {currentNavItems.map((item) => (
              <div key={item.key} className="relative">
                {item.dropdown ? (
                  <button
                    onClick={() => toggleDropdown(item.key)}
                    className="flex items-center gap-1 text-[#C0C5CE] hover:text-[#00d4ff] transition-colors duration-300 text-sm font-medium neo-nav-dropdown"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    {item.label}
                    <ChevronDown 
                      className={`w-4 h-4 transition-transform duration-200 ${
                        activeDropdown === item.key ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>
                ) : (
                  <button
                    onClick={() => handleNavigate(item.key)}
                    className="text-[#C0C5CE] hover:text-[#00d4ff] transition-colors duration-300 text-sm font-medium neo-nav-item"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    {item.label}
                  </button>
                )}
                
                {item.dropdown && (
                  <DropdownMenu 
                    items={item.dropdown} 
                    isOpen={activeDropdown === item.key} 
                  />
                )}
              </div>
            ))}
          </div>

          {/* ✅ ENHANCED: Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* ✅ Language Switcher */}
            <LanguageSwitcher />

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Button
                onClick={() => handleNavigate('contact')}
                variant="ghost"
                size="sm"
                className="text-[#C0C5CE] hover:text-[#00d4ff] hover:bg-[#00d4ff]/10 transition-all duration-300"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                {currentContent.contactUs}
              </Button>

              <Button
                onClick={() => handleNavigate('contact')}
                size="sm"
                className="bg-[#00d4ff] hover:bg-[#00d4ff]/90 text-black font-bold transition-all duration-300 hover:scale-105 neo-glow shadow-[0_0_15px_rgba(0,212,255,0.3)]"
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  backgroundColor: 'var(--neo-blue-primary)',
                  color: 'var(--neo-bg-primary)'
                }}
              >
                {currentContent.getQuote}
              </Button>
            </div>

            {/* ✅ Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-[#C0C5CE] hover:text-[#00d4ff] transition-colors duration-300 neo-mobile-menu-btn"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* ✅ ENHANCED: Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-[#12151C]/95 border-b border-[#00d4ff]/20 backdrop-blur-sm neo-mobile-menu">
            <div className="container mx-auto px-4 py-6">
              <div className="space-y-4">
                {/* ✅ Mobile Navigation Items */}
                {currentNavItems.map((item) => (
                  <div key={item.key}>
                    {item.dropdown ? (
                      <div>
                        <button
                          onClick={() => toggleDropdown(item.key)}
                          className="flex items-center justify-between w-full text-[#C0C5CE] hover:text-[#00d4ff] py-2 text-left transition-colors duration-300 neo-mobile-nav-dropdown"
                          style={{ fontFamily: 'JetBrains Mono, monospace' }}
                        >
                          {item.label}
                          <ChevronDown 
                            className={`w-4 h-4 transition-transform duration-200 ${
                              activeDropdown === item.key ? 'rotate-180' : ''
                            }`} 
                          />
                        </button>
                        
                        {activeDropdown === item.key && (
                          <div className="ml-4 mt-2 space-y-2">
                            {item.dropdown.map((subItem: any) => (
                              <button
                                key={subItem.key}
                                onClick={() => handleNavigate(subItem.key)}
                                className="block w-full text-left text-[#C0C5CE]/80 hover:text-[#00d4ff] py-2 text-sm transition-colors duration-300 neo-mobile-nav-sub-item"
                                style={{ fontFamily: 'JetBrains Mono, monospace' }}
                              >
                                {subItem.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <button
                        onClick={() => handleNavigate(item.key)}
                        className="block w-full text-left text-[#C0C5CE] hover:text-[#00d4ff] py-2 transition-colors duration-300 neo-mobile-nav-item"
                        style={{ fontFamily: 'JetBrains Mono, monospace' }}
                      >
                        {item.label}
                      </button>
                    )}
                  </div>
                ))}

                {/* Mobile CTA Buttons */}
                <div className="pt-4 border-t border-[#00d4ff]/20 space-y-3">
                  <Button
                    onClick={() => handleNavigate('contact')}
                    variant="outline"
                    className="w-full border-[#00d4ff]/30 text-[#C0C5CE] hover:border-[#00d4ff] hover:text-[#00d4ff] transition-all duration-300"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    {currentContent.contactUs}
                  </Button>

                  <Button
                    onClick={() => handleNavigate('pricing')}
                    className="w-full bg-[#00d4ff] hover:bg-[#00d4ff]/90 text-black font-bold transition-all duration-300 neo-glow"
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      backgroundColor: 'var(--neo-blue-primary)',
                      color: 'var(--neo-bg-primary)'
                    }}
                  >
                    {currentContent.getQuote}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* ✅ Close dropdown when clicking outside */}
      {activeDropdown && (
        <div
          className="fixed inset-0 z-[55]"
          onClick={() => setActiveDropdown(null)}
        />
      )}
    </header>
  );
}