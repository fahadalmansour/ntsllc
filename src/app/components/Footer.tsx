import React, { useState, useEffect } from 'react';
import { Database, Cloud, Shield, Activity, Mail, User, Github, Linkedin, Twitter, MessageCircle, Globe, Phone, MapPin, CheckCircle, Zap, Terminal, ExternalLink } from 'lucide-react';
import { NeoIcon } from './icons/NeoLogo';
import { TerminalVisuals, TerminalWindow, CLIOutput, ASCIIArt } from './TerminalVisuals';
import { useCompanyInfo, COMPANY_INFO } from './CompanyInfo';
import { useLanguage } from '../contexts/LanguageContext';
import { RTLContainer } from './LanguageSwitcher';

interface FooterProps {
  onNavigate?: (section: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const { isRTL, language } = useLanguage();
  const companyInfo = useCompanyInfo();
  const [systemTime, setSystemTime] = useState(new Date());
  const [uptime, setUptime] = useState(0);
  const currentYear = new Date().getFullYear();
  
  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setSystemTime(new Date());
      setUptime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  
  const socialLinks: Array<{ name: string; url: string; icon: React.ElementType; color: string }> = [];

  const quickLinks = [
    { name: 'About', key: 'about', description: 'About NeoTechnology Solutions' },
    { name: 'Contact', key: 'contact', description: 'Get in touch' },
    { name: 'FAQ', key: 'faq', description: 'Common questions answered' },
    { name: 'Blog', key: 'blog', description: 'E-commerce insights' },
  ];

  const services = [
    { name: 'Store Setup', key: 'services/store-setup', status: 'online' },
    { name: 'Payment Solutions', key: 'services/payments', status: 'online' },
    { name: 'Workflow Automation', key: 'services/automation', status: 'online' },
    { name: 'Domain & Hosting', key: 'services/domain-hosting', status: 'online' },
    { name: 'AI Consulting', key: 'services/consulting', status: 'online' },
    { name: 'Quick-Fix Support', key: 'services/quick-fix', status: 'active' }
  ];

  const certifications = [
    'Privacy Policy',
    'Terms of Service',
    'Refund Policy',
    'Cookie Notice',
    'Acceptable Use',
    'SLA',
    'DPA'
  ];

  // Simple check instead of importing firebase
  const isConnected = true; // Simplified for now

  return (
    <footer 
      className="py-16 px-6 relative"
      style={{
        backgroundColor: 'var(--neo-bg-primary)',
        borderTop: '1px solid rgba(0, 212, 255, 0.3)',
        fontFamily: 'JetBrains Mono, monospace',
        color: 'var(--terminal-silver)'
      }}
    >
      {/* Terminal Background Effects */}
      <TerminalVisuals 
        showMatrix={true}
        showScanLines={true}
        showFloatingCode={true}
        showCircuitBoard={true}
        intensity="low"
        className="opacity-10"
      />

      <RTLContainer className="max-w-7xl mx-auto relative z-10">
        <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
          {/* Header Section with ASCII Art */}
          <div className="text-center mb-16">
            <div className="max-w-3xl mx-auto">
              <TerminalWindow title={companyInfo.terminal.company} variant="compact">
                <ASCIIArt
                  art={[
                    '+-----------------------------------------+',
                    '|   NEOTECHNOLOGY SOLUTIONS LLC           |',
                    '|                                         |',
                    '|   The complete e-commerce tech partner  |',
                    '|   US-incorporated  (Wyoming LLC)        |',
                    '|   Serving GCC + United States           |',
                    '|                                         |',
                    '|   Status: ONLINE  |  Response: < 24h   |',
                    '|   EIN: 36-5148912                       |',
                    '|                                         |',
                    '+-----------------------------------------+'
                  ]}
                  color="#00d4ff"
                />
              </TerminalWindow>
            </div>
          </div>

          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Company Logo & Info */}
              <div 
                className="border rounded-lg p-6 relative overflow-hidden"
                style={{
                  backgroundColor: 'var(--terminal-bg-secondary)',
                  borderColor: 'rgba(0, 212, 255, 0.3)'
                }}
              >
                <TerminalVisuals 
                  showMatrix={false}
                  showScanLines={false}
                  showFloatingCode={false}
                  showCircuitBoard={true}
                  intensity="low"
                  className="opacity-10"
                />
                
                <div className="relative z-10">
                  <div className={`flex items-center mb-4 ${isRTL ? 'flex-row-reverse space-x-reverse space-x-4' : 'space-x-4'}`}>
                    <NeoIcon 
                      width={48} 
                      height={48} 
                      animated={true}
                      className="hover:scale-110 transition-transform duration-300"
                    />
                    <div 
                      style={{ fontFamily: 'JetBrains Mono, monospace' }}
                    >
                      <div 
                        className="text-xl font-bold"
                        style={{ color: 'var(--neo-blue)' }}
                      >
                        Neo<span style={{ color: 'var(--neo-green)' }}>Technology</span>
                      </div>
                      <div 
                        className="text-sm opacity-80"
                        style={{ color: 'var(--terminal-silver)' }}
                      >
                        Solutions by Fahad Almansour
                      </div>
                    </div>
                  </div>
                  
                  <p 
                    className="text-sm leading-relaxed mb-4"
                    style={{ 
                      color: 'rgba(192, 197, 206, 0.7)',
                      fontFamily: 'JetBrains Mono, monospace'
                    }}
                  >
                    {companyInfo.description}
                  </p>

                  {/* Contact Information */}
                  <div className="space-y-3">
                    <div className={`flex items-center text-sm ${isRTL ? 'flex-row-reverse space-x-reverse space-x-3' : 'space-x-3'}`}>
                      <Mail className="w-4 h-4" style={{ color: 'var(--neo-blue)' }} />
                      <span style={{ color: 'var(--terminal-silver)', fontFamily: 'JetBrains Mono, monospace' }}>
                        {companyInfo.contact.email}
                      </span>
                    </div>
                    <div className={`flex items-center text-sm ${isRTL ? 'flex-row-reverse space-x-reverse space-x-3' : 'space-x-3'}`}>
                      <Mail className="w-4 h-4" style={{ color: 'var(--neo-green)' }} />
                      <span style={{ color: 'var(--terminal-silver)', fontFamily: 'JetBrains Mono, monospace' }}>
                        {companyInfo.contact.support}
                      </span>
                    </div>
                    <div className={`flex items-center text-sm ${isRTL ? 'flex-row-reverse space-x-reverse space-x-3' : 'space-x-3'}`}>
                      <Mail className="w-4 h-4" style={{ color: 'var(--terminal-green)' }} />
                      <span style={{ color: 'var(--terminal-silver)', fontFamily: 'JetBrains Mono, monospace' }}>
                        {companyInfo.contact.sales}
                      </span>
                    </div>
                    <div className={`flex items-center text-sm ${isRTL ? 'flex-row-reverse space-x-reverse space-x-3' : 'space-x-3'}`}>
                      <Globe className="w-4 h-4" style={{ color: 'var(--neo-blue)' }} />
                      <span style={{ color: 'var(--terminal-silver)', fontFamily: 'JetBrains Mono, monospace' }}>
                        neotechnology.solutions
                      </span>
                    </div>
                    <div className={`flex items-center text-sm ${isRTL ? 'flex-row-reverse space-x-reverse space-x-3' : 'space-x-3'}`}>
                      <MapPin className="w-4 h-4" style={{ color: '#ffd93d' }} />
                      <span style={{ color: 'var(--terminal-silver)', fontFamily: 'JetBrains Mono, monospace' }}>
                        {companyInfo.markets.join(' | ')}
                      </span>
                    </div>
                    <div className={`flex items-center text-sm ${isRTL ? 'flex-row-reverse space-x-reverse space-x-3' : 'space-x-3'}`}>
                      <Phone className="w-4 h-4" style={{ color: '#ff6b6b' }} />
                      <span style={{ color: 'var(--terminal-silver)', fontFamily: 'JetBrains Mono, monospace' }}>
                        {language === 'ar' ? 'متاح للاستشارات 24/7' : 'Available for consultations 24/7'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* System Status */}
              <div 
                className="border rounded-lg p-6 relative overflow-hidden"
                style={{
                  backgroundColor: 'var(--terminal-bg-secondary)',
                  borderColor: 'rgba(0, 255, 136, 0.3)'
                }}
              >
                <TerminalVisuals 
                  showMatrix={false}
                  showScanLines={false}
                  showFloatingCode={false}
                  showCircuitBoard={true}
                  intensity="low"
                  className="opacity-10"
                />
                
                <div className="relative z-10">
                  <h4 
                    className="font-bold mb-4 flex items-center"
                    style={{ 
                      color: 'var(--neo-green)', 
                      fontFamily: 'JetBrains Mono, monospace' 
                    }}
                  >
                    <Activity className="w-4 h-4 mr-2" />
                    {language === 'ar' ? 'حالة النظام' : 'System Status'}
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span style={{ color: 'var(--terminal-silver)', fontFamily: 'JetBrains Mono, monospace' }}>
                          {language === 'ar' ? 'الحالة:' : 'Status:'}
                        </span>
                        <span 
                          className="flex items-center"
                          style={{ color: 'var(--neo-green)', fontFamily: 'JetBrains Mono, monospace' }}
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {language === 'ar' ? 'متصل' : 'Online'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span style={{ color: 'var(--terminal-silver)', fontFamily: 'JetBrains Mono, monospace' }}>
                          {language === 'ar' ? 'الجهوزية:' : 'Uptime:'}
                        </span>
                        <span style={{ color: 'var(--neo-green)', fontFamily: 'JetBrains Mono, monospace' }}>
                          99.97%
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span style={{ color: 'var(--terminal-silver)', fontFamily: 'JetBrains Mono, monospace' }}>
                          {language === 'ar' ? 'الاستجابة:' : 'Response:'}
                        </span>
                        <span style={{ color: 'var(--neo-green)', fontFamily: 'JetBrains Mono, monospace' }}>
                          {'< 24h'}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span style={{ color: 'var(--terminal-silver)', fontFamily: 'JetBrains Mono, monospace' }}>
                          {language === 'ar' ? 'الوقت:' : 'Time:'}
                        </span>
                        <span style={{ color: 'var(--neo-blue)', fontFamily: 'JetBrains Mono, monospace' }}>
                          {systemTime.toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span style={{ color: 'var(--terminal-silver)', fontFamily: 'JetBrains Mono, monospace' }}>
                          {language === 'ar' ? 'السعة:' : 'Capacity:'}
                        </span>
                        <span style={{ color: 'var(--neo-green)', fontFamily: 'JetBrains Mono, monospace' }}>
                          {language === 'ar' ? 'متاح' : 'Available'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span style={{ color: 'var(--terminal-silver)', fontFamily: 'JetBrains Mono, monospace' }}>
                          {language === 'ar' ? 'الدعم:' : 'Support:'}
                        </span>
                        <span style={{ color: 'var(--neo-green)', fontFamily: 'JetBrains Mono, monospace' }}>
                          {language === 'ar' ? 'نشط' : 'Active'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Navigation */}
            <div 
              className="border rounded-lg p-6 relative overflow-hidden"
              style={{
                backgroundColor: 'var(--terminal-bg-secondary)',
                borderColor: 'rgba(0, 212, 255, 0.3)'
              }}
            >
              <TerminalVisuals 
                showMatrix={false}
                showScanLines={false}
                showFloatingCode={false}
                showCircuitBoard={true}
                intensity="low"
                className="opacity-10"
              />
              
              <div className="relative z-10">
                <h4 
                  className="font-bold mb-4 flex items-center"
                  style={{ 
                    color: 'var(--neo-blue)', 
                    fontFamily: 'JetBrains Mono, monospace' 
                  }}
                >
                  <Terminal className="w-4 h-4 mr-2" />
                  {language === 'ar' ? './التنقل/' : './navigation/'}
                </h4>
                
                <div className="space-y-2">
                  {quickLinks.map((link, index) => (
                    <button
                      key={index}
                      onClick={() => onNavigate?.(link.key)}
                      className={`block w-full p-2 rounded group transition-all duration-200 ${
                        isRTL ? 'text-right' : 'text-left'
                      }`}
                      style={{
                        color: 'rgba(192, 197, 206, 0.7)',
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '14px'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--neo-blue)';
                        e.currentTarget.style.backgroundColor = 'rgba(0, 212, 255, 0.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'rgba(192, 197, 206, 0.7)';
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span 
                          className={`text-[#00ff88] group-hover:mr-3 transition-all ${
                            isRTL ? 'ml-2 group-hover:ml-3' : 'mr-2'
                          }`}
                          style={{ fontFamily: 'JetBrains Mono, monospace' }}
                        >
                          {isRTL ? '←' : '→'}
                        </span>
                        <div>
                          <div style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                            {language === 'ar' 
                              ? (link.name === 'Services' ? 'الخدمات' :
                                 link.name === 'Portfolio' ? 'المعرض' :
                                 link.name === 'Technology' ? 'التقنية' :
                                 link.name === 'Pricing' ? 'الأسعار' :
                                 link.name === 'About' ? 'حولنا' :
                                 link.name === 'Contact' ? 'اتصل بنا' : link.name)
                              : link.name
                            }
                          </div>
                          <div 
                            className="text-xs"
                            style={{ 
                              color: 'rgba(192, 197, 206, 0.5)',
                              fontFamily: 'JetBrains Mono, monospace'
                            }}
                          >
                            {language === 'ar' 
                              ? (link.description === 'Our AI-powered solutions' ? 'حلولنا المدعومة بالذكاء الاصطناعي' :
                                 link.description === 'Client success stories' ? 'قصص نجاح العملاء' :
                                 link.description === 'Tech stack overview' ? 'نظرة عامة على التقنية' :
                                 link.description === 'Transparent pricing' ? 'أسعار شفافة' :
                                 link.description === 'About Fahad & team' ? 'حول فهد والفريق' :
                                 link.description === 'Get in touch' ? 'تواصل معنا' : link.description)
                              : link.description
                            }
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Services & Social */}
            <div className="space-y-6">
              {/* Services Status */}
              <div 
                className="border rounded-lg p-6 relative overflow-hidden"
                style={{
                  backgroundColor: 'var(--terminal-bg-secondary)',
                  borderColor: 'rgba(0, 255, 136, 0.3)'
                }}
              >
                <TerminalVisuals 
                  showMatrix={false}
                  showScanLines={false}
                  showFloatingCode={false}
                  showCircuitBoard={true}
                  intensity="low"
                  className="opacity-10"
                />
                
                <div className="relative z-10">
                  <h4 
                    className="font-bold mb-4 flex items-center"
                    style={{ 
                      color: 'var(--neo-green)', 
                      fontFamily: 'JetBrains Mono, monospace' 
                    }}
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    {language === 'ar' ? './الخدمات/' : './services/'}
                  </h4>
                  
                  <div className="space-y-2">
                    {services.map((service, index) => (
                      <button
                        key={index}
                        onClick={() => onNavigate?.(service.key)}
                        className={`block w-full p-1 rounded transition-colors duration-200 ${
                          isRTL ? 'text-right' : 'text-left'
                        }`}
                        style={{
                          color: 'rgba(192, 197, 206, 0.7)',
                          fontFamily: 'JetBrains Mono, monospace',
                          fontSize: '12px'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = 'var(--neo-green)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = 'rgba(192, 197, 206, 0.7)';
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                            {language === 'ar' 
                              ? (service.name === 'AI Store Builder' ? 'منشئ المتاجر بالذكاء الاصطناعي' :
                                 service.name === 'Code Analyzer' ? 'محلل الأكواد' :
                                 service.name === 'Firebase Solutions' ? 'حلول Firebase' :
                                 service.name === 'Cloud Migration' ? 'نقل البيانات السحابي' :
                                 service.name === 'E-commerce Integration' ? 'تكامل التجارة الإلكترونية' :
                                 service.name === '24/7 Support' ? 'دعم 24/7' : service.name)
                              : service.name
                            }
                          </span>
                          <span 
                            className={`px-2 py-1 rounded text-xs`}
                            style={{
                              fontFamily: 'JetBrains Mono, monospace',
                              backgroundColor: service.status === 'online' ? 'rgba(0, 255, 136, 0.2)' :
                                              service.status === 'active' ? 'rgba(0, 212, 255, 0.2)' :
                                              'rgba(255, 217, 61, 0.2)',
                              color: service.status === 'online' ? 'var(--neo-green)' :
                                     service.status === 'active' ? 'var(--neo-blue)' :
                                     '#ffd93d'
                            }}
                          >
                            ✓ {language === 'ar' 
                                ? (service.status === 'online' ? 'متصل' :
                                   service.status === 'active' ? 'نشط' : service.status)
                                : service.status
                               }
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div 
                className="border rounded-lg p-6 relative overflow-hidden"
                style={{
                  backgroundColor: 'var(--terminal-bg-secondary)',
                  borderColor: 'rgba(255, 217, 61, 0.3)'
                }}
              >
                <TerminalVisuals 
                  showMatrix={false}
                  showScanLines={false}
                  showFloatingCode={false}
                  showCircuitBoard={true}
                  intensity="low"
                  className="opacity-10"
                />
                
                <div className="relative z-10">
                  <h4 
                    className="font-bold mb-4 flex items-center"
                    style={{ 
                      color: '#ffd93d', 
                      fontFamily: 'JetBrains Mono, monospace' 
                    }}
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    {language === 'ar' ? './التواصل/' : './connect/'}
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {socialLinks.map((social, index) => {
                      const IconComponent = social.icon;
                      return (
                        <a
                          key={index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center p-2 rounded transition-colors duration-200 ${
                            isRTL ? 'flex-row-reverse space-x-reverse space-x-2' : 'space-x-2'
                          }`}
                          style={{
                            color: 'rgba(192, 197, 206, 0.7)',
                            fontSize: '14px',
                            fontFamily: 'JetBrains Mono, monospace'
                          }}
                          title={social.name}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = 'var(--neo-blue)';
                            e.currentTarget.style.backgroundColor = 'rgba(0, 212, 255, 0.05)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'rgba(192, 197, 206, 0.7)';
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }}
                        >
                          <IconComponent className="w-4 h-4" />
                          <span 
                            className="text-xs"
                            style={{ fontFamily: 'JetBrains Mono, monospace' }}
                          >
                            {social.name}
                          </span>
                          <ExternalLink className="w-3 h-3 opacity-50" />
                        </a>
                      );
                    })}
                  </div>

                  {/* Certifications */}
                  <div 
                    className="mt-4 pt-4"
                    style={{ borderTop: '1px solid rgba(192, 197, 206, 0.1)' }}
                  >
                    <div
                      className="text-xs mb-2"
                      style={{
                        color: '#ffd93d',
                        fontFamily: 'JetBrains Mono, monospace'
                      }}
                    >
                      Legal:
                    </div>
                    <div className="space-y-1">
                      {certifications.map((cert, index) => {
                        const keyMap: Record<string, string> = {
                          'Privacy Policy': 'legal/privacy',
                          'Terms of Service': 'legal/terms',
                          'Refund Policy': 'legal/refund',
                          'Cookie Notice': 'legal/cookies',
                          'Acceptable Use': 'legal/acceptable-use',
                          'SLA': 'legal/sla',
                          'DPA': 'legal/dpa',
                        };
                        return (
                          <button
                            key={index}
                            onClick={() => onNavigate?.(keyMap[cert] || 'home')}
                            className="text-xs block w-full text-left"
                            style={{
                              color: 'rgba(192, 197, 206, 0.6)',
                              fontFamily: 'JetBrains Mono, monospace',
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer'
                            }}
                          >
                            → {cert}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Terminal Command Section */}
          <div className="mb-8">
            <TerminalWindow title="footer-commands@neotech:~$" variant="compact">
              <CLIOutput 
                lines={[
                  language === 'ar' 
                    ? '$ echo "جاهز لتحويل أعمالك؟"'
                    : '$ echo "Ready to transform your business?"',
                  language === 'ar' 
                    ? 'جاهز لتحويل أعمالك؟'
                    : 'Ready to transform your business?',
                  '',
                  '$ ./start-project --type=consultation --rapid-response',
                  language === 'ar' 
                    ? '✓ بدء المشروع جاهز'
                    : '✓ Project initiation ready',
                  language === 'ar' 
                    ? '✓ استشارة الخبراء متاحة'
                    : '✓ Expert consultation available',
                  language === 'ar' 
                    ? '✓ النشر السريع جاهز'
                    : '✓ Rapid deployment ready',
                  '',
                  language === 'ar' 
                    ? 'الخطوة التالية: تواصل معنا لبدء التحول →'
                    : 'Next step: Contact us to begin your transformation →'
                ]}
                typing={false}
              />
            </TerminalWindow>
          </div>

          {/* Legal & Copyright */}
          <div 
            className="pt-8"
            style={{ borderTop: '1px solid rgba(192, 197, 206, 0.2)' }}
          >
            <div className={`flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0 ${
              isRTL ? 'lg:flex-row-reverse' : ''
            }`}>
              <div
                className="text-sm"
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  color: 'rgba(192, 197, 206, 0.7)'
                }}
              >
                <div className="space-y-1">
                  <div>
                    © {currentYear} NeoTechnology Solutions LLC. A Wyoming limited liability company, United States. All rights reserved.
                  </div>
                  <div className="text-xs" style={{ color: 'rgba(192, 197, 206, 0.4)' }}>
                    Regional partner: Fahad Saad Fahad Almansour Office for Electronic Services — independent honorary partner, Saudi Arabia. NeoTechnology Solutions LLC and the Almansour Office are separate legal entities.
                  </div>
                </div>
              </div>
              
              <div className={`flex items-center text-sm ${
                isRTL ? 'flex-row-reverse space-x-reverse space-x-6' : 'space-x-6'
              }`}>
                <button 
                  onClick={() => onNavigate?.('legal/privacy')}
                  style={{
                    color: 'rgba(192, 197, 206, 0.6)',
                    fontFamily: 'JetBrains Mono, monospace',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--neo-blue)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(192, 197, 206, 0.6)';
                  }}
                >
                  {language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
                </button>
                <span style={{ color: 'rgba(192, 197, 206, 0.3)' }}>•</span>
                <button 
                  onClick={() => onNavigate?.('legal/terms')}
                  style={{
                    color: 'rgba(192, 197, 206, 0.6)',
                    fontFamily: 'JetBrains Mono, monospace',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--neo-blue)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(192, 197, 206, 0.6)';
                  }}
                >
                  {language === 'ar' ? 'شروط الخدمة' : 'Terms of Service'}
                </button>
                <span style={{ color: 'rgba(192, 197, 206, 0.3)' }}>•</span>
                <span 
                  style={{ 
                    color: 'rgba(192, 197, 206, 0.6)',
                    fontFamily: 'JetBrains Mono, monospace'
                  }}
                >
                  {language === 'ar' ? 'نيوتكنولوجي سولوشنز' : 'NeoTechnology Solutions LLC'}
                </span>
              </div>
            </div>
            
            {/* Final Terminal Message */}
            <div className="mt-6 text-center">
              <div 
                className="inline-flex items-center rounded px-4 py-2"
                style={{
                  backgroundColor: 'var(--terminal-bg-secondary)',
                  border: '1px solid rgba(0, 255, 136, 0.3)'
                }}
              >
                <div className={`flex items-center ${
                  isRTL ? 'flex-row-reverse space-x-reverse space-x-2' : 'space-x-2'
                }`}>
                  <Terminal className="w-4 h-4" style={{ color: 'var(--neo-green)' }} />
                  <span 
                    className="text-sm"
                    style={{ 
                      fontFamily: 'JetBrains Mono, monospace',
                      color: 'var(--terminal-silver)'
                    }}
                  >
                    system@neotech:~$ echo "{language === 'ar' 
                      ? 'شكراً لزيارتك! جاهز للابتكار؟' 
                      : 'Thanks for visiting! Ready to innovate?'}"
                  </span>
                  <span 
                    className="animate-pulse"
                    style={{ 
                      color: 'var(--neo-blue)',
                      fontFamily: 'JetBrains Mono, monospace'
                    }}
                  >
                    |
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </RTLContainer>
    </footer>
  );
}

export default Footer;