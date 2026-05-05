/**
 * RTL Demo Component - Test Arabic Language Features
 * This component demonstrates the complete Arabic RTL implementation
 */

import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { LanguageSwitcher, LocalizedText, RTLContainer } from './LanguageSwitcher';
import { 
  ArabicCard, 
  ArabicFormField, 
  ArabicButton, 
  ServiceTierCard,
  ContactInfo,
  OrderStatus,
  PricingDisplay,
  CountrySelect
} from './ui/arabic-components';
import { 
  Globe, 
  Star, 
  CheckCircle, 
  Clock, 
  Phone, 
  Mail, 
  MessageCircle,
  Zap,
  Shield,
  Rocket
} from 'lucide-react';

interface RTLDemoProps {
  onNavigate?: (section: string) => void;
}

export function RTLDemo({ onNavigate }: RTLDemoProps) {
  const { t, language, isRTL, formatCurrency, formatDate, formatNumber } = useLanguage();
  const [selectedCountry, setSelectedCountry] = React.useState('SA');
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: ''
  });

  // Sample service tiers for testing
  const serviceTiers = [
    {
      id: 'lightning',
      nameAr: 'البرق',
      nameEn: 'Lightning',
      timeAr: '4 ساعات',
      timeEn: '4 Hours',
      price: language === 'ar' ? 2999 : 799,
      currency: language === 'ar' ? 'ر.س' : '$',
      featuresAr: [
        'متجر إلكتروني كامل في 4 ساعات',
        'تصميم احترافي متجاوب',
        'بوابة دفع آمنة',
        'إعداد منتجات أساسي',
        'شهادة SSL مجانية'
      ],
      featuresEn: [
        'Complete online store in 4 hours',
        'Professional responsive design',
        'Secure payment gateway',
        'Basic product setup',
        'Free SSL certificate'
      ],
      popular: true
    },
    {
      id: 'thunder',
      nameAr: 'الرعد',
      nameEn: 'Thunder',
      timeAr: '24 ساعة',
      timeEn: '24 Hours',
      price: language === 'ar' ? 4874 : 1299,
      currency: language === 'ar' ? 'ر.س' : '$',
      featuresAr: [
        'متجر متقدم مع ميزات مخصصة',
        'تكامل مع أنظمة الدفع المتعددة',
        'إعداد أتمتة التسويق',
        'تحسين محركات البحث الأساسي',
        'تدريب شامل على الإدارة'
      ],
      featuresEn: [
        'Advanced store with custom features',
        'Multiple payment gateway integration',
        'Marketing automation setup',
        'Basic SEO optimization',
        'Comprehensive management training'
      ]
    },
    {
      id: 'storm',
      nameAr: 'العاصفة',
      nameEn: 'Storm',
      timeAr: '72 ساعة',
      timeEn: '72 Hours',
      price: language === 'ar' ? 11249 : 2999,
      currency: language === 'ar' ? 'ر.س' : '$',
      featuresAr: [
        'منصة تجارة إلكترونية متكاملة',
        'ذكاء اصطناعي وتحليلات متقدمة',
        'أتمتة كاملة للعمليات',
        'تصميم مخصص وهوية بصرية',
        'دعم فني لمدة سنة كاملة'
      ],
      featuresEn: [
        'Complete e-commerce platform',
        'AI and advanced analytics',
        'Full process automation',
        'Custom design and branding',
        'Full year technical support'
      ],
      enterprise: true
    }
  ];

  return (
    <RTLContainer className="min-h-screen bg-[#0a0a0a] p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header with Language Switcher */}
        <Card className="p-6 bg-[#1a1a1a] border border-[#00d4ff]/30">
          <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <h1 className="text-3xl font-bold text-white mb-2">
                <LocalizedText
                  arText="عرض توضيحي للغة العربية وRTL"
                  enText="Arabic Language & RTL Demo"
                />
              </h1>
              <p className="text-[#C0C5CE]">
                <LocalizedText
                  arText="اختبار شامل لجميع ميزات اللغة العربية ودعم RTL"
                  enText="Comprehensive test of all Arabic language and RTL features"
                />
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <LanguageSwitcher variant="dropdown" />
              <Badge variant="outline" className="text-[#00d4ff] border-[#00d4ff]">
                <Globe className="w-4 h-4 mr-2" />
                {language.toUpperCase()}
              </Badge>
            </div>
          </div>
        </Card>

        {/* Current Language Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ArabicCard
            title={language === 'ar' ? 'معلومات اللغة' : 'Language Info'}
            icon={<Globe className="w-5 h-5" />}
            rtl={isRTL}
          >
            <div className="space-y-2 text-sm">
              <p><strong>{language === 'ar' ? 'اللغة:' : 'Language:'}</strong> {language === 'ar' ? 'العربية' : 'English'}</p>
              <p><strong>{language === 'ar' ? 'الاتجاه:' : 'Direction:'}</strong> {isRTL ? 'RTL' : 'LTR'}</p>
              <p><strong>{language === 'ar' ? 'التاريخ:' : 'Date:'}</strong> {formatDate(new Date())}</p>
              <p><strong>{language === 'ar' ? 'الرقم:' : 'Number:'}</strong> {formatNumber(123456.789)}</p>
              <p><strong>{language === 'ar' ? 'العملة:' : 'Currency:'}</strong> {formatCurrency(1299, language === 'ar' ? 'SAR' : 'USD')}</p>
            </div>
          </ArabicCard>

          <ArabicCard
            title={language === 'ar' ? 'إحصائيات سريعة' : 'Quick Stats'}
            icon={<Star className="w-5 h-5" />}
            rtl={isRTL}
          >
            <div className="space-y-3">
              <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className="text-[#C0C5CE]">{language === 'ar' ? 'العملاء:' : 'Clients:'}</span>
                <span className="text-[#00ff88] font-bold">250+</span>
              </div>
              <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className="text-[#C0C5CE]">{language === 'ar' ? 'المشاريع:' : 'Projects:'}</span>
                <span className="text-[#00ff88] font-bold">500+</span>
              </div>
              <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className="text-[#C0C5CE]">{language === 'ar' ? 'النجاح:' : 'Success:'}</span>
                <span className="text-[#00ff88] font-bold">99.9%</span>
              </div>
            </div>
          </ArabicCard>

          <ArabicCard
            title={language === 'ar' ? 'ضمان الوقت' : 'Time Guarantee'}
            icon={<Clock className="w-5 h-5" />}
            rtl={isRTL}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-[#00d4ff] mb-2">48 {language === 'ar' ? 'دقيقة' : 'minutes'}</div>
              <div className="text-sm text-[#C0C5CE]">
                {language === 'ar' ? 'أو استرداد 50%' : 'or 50% refund'}
              </div>
              <div className="mt-3 p-2 bg-[#00ff88]/10 rounded border border-[#00ff88]/20">
                <CheckCircle className="w-5 h-5 text-[#00ff88] mx-auto mb-1" />
                <div className="text-xs text-[#00ff88]">
                  {language === 'ar' ? 'ضمان مؤكد' : 'Guaranteed'}
                </div>
              </div>
            </div>
          </ArabicCard>
        </div>

        {/* Service Tiers */}
        <Card className="p-6 bg-[#1a1a1a] border border-[#00d4ff]/30">
          <h2 className={`text-2xl font-bold text-white mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
            <LocalizedText
              arText="باقات الخدمات"
              enText="Service Packages"
            />
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {serviceTiers.map((tier) => (
              <ServiceTierCard
                key={tier.id}
                tier={tier}
                language={language}
                selected={tier.popular}
              />
            ))}
          </div>
        </Card>

        {/* Contact Form */}
        <Card className="p-6 bg-[#1a1a1a] border border-[#00d4ff]/30">
          <h2 className={`text-2xl font-bold text-white mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
            <LocalizedText
              arText="نموذج التواصل"
              enText="Contact Form"
            />
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Fields */}
            <div className="space-y-4">
              <ArabicFormField
                label={language === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                required
              >
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder={language === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                  className="bg-[#0a0a0a] border-[#00d4ff]/20 text-white"
                  dir={isRTL ? 'rtl' : 'ltr'}
                />
              </ArabicFormField>

              <ArabicFormField
                label={language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                required
              >
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder={language === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                  className="bg-[#0a0a0a] border-[#00d4ff]/20 text-white"
                  dir="ltr" // Email is always LTR
                />
              </ArabicFormField>

              <ArabicFormField
                label={language === 'ar' ? 'الدولة' : 'Country'}
              >
                <CountrySelect
                  value={selectedCountry}
                  onValueChange={setSelectedCountry}
                  language={language}
                  className="bg-[#0a0a0a] border-[#00d4ff]/20 text-white"
                />
              </ArabicFormField>

              <ArabicFormField
                label={language === 'ar' ? 'الرسالة' : 'Message'}
              >
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  placeholder={language === 'ar' ? 'اكتب رسالتك هنا...' : 'Write your message here...'}
                  className="bg-[#0a0a0a] border-[#00d4ff]/20 text-white min-h-[100px]"
                  dir={isRTL ? 'rtl' : 'ltr'}
                />
              </ArabicFormField>

              <ArabicButton
                className="w-full bg-[#00d4ff] text-[#0a0a0a] hover:bg-[#00ff88]"
                icon={<Rocket className="w-4 h-4" />}
                iconPosition={isRTL ? 'left' : 'right'}
              >
                {language === 'ar' ? 'إرسال الرسالة' : 'Send Message'}
              </ArabicButton>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <ContactInfo
                phone="+1 (555) 123-4567"
                email="contact@neotechnology.solutions"
                whatsapp="+966 50 123 4567"
                language={language}
              />

              <OrderStatus
                orderNumber="NEO-2024-001"
                status="in_progress"
                progress={75}
                estimatedTime="12 min"
                language={language}
              />

              <PricingDisplay
                basePrice={1299}
                currency={language === 'ar' ? 'ر.س' : '$'}
                urgencyMultiplier={1.5}
                additionalFees={[
                  { 
                    nameAr: 'ميزات إضافية', 
                    nameEn: 'Additional Features', 
                    amount: 200 
                  }
                ]}
                language={language}
              />
            </div>
          </div>
        </Card>

        {/* Feature Showcase */}
        <Card className="p-6 bg-[#1a1a1a] border border-[#00d4ff]/30">
          <h2 className={`text-2xl font-bold text-white mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
            <LocalizedText
              arText="ميزات المنصة"
              enText="Platform Features"
            />
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Zap, nameAr: 'سرعة البرق', nameEn: 'Lightning Fast' },
              { icon: Shield, nameAr: 'أمان عالي', nameEn: 'High Security' },
              { icon: Star, nameAr: 'جودة ممتازة', nameEn: 'Premium Quality' },
              { icon: CheckCircle, nameAr: 'ضمان مؤكد', nameEn: 'Guaranteed' }
            ].map((feature, index) => (
              <div
                key={index}
                className={`p-4 bg-[#0a0a0a] rounded-lg border border-[#00d4ff]/20 ${isRTL ? 'text-right' : 'text-left'}`}
              >
                <feature.icon className={`w-8 h-8 text-[#00d4ff] mb-3 ${isRTL ? 'mr-auto' : 'ml-0'}`} />
                <h3 className="font-bold text-white mb-1">
                  {language === 'ar' ? feature.nameAr : feature.nameEn}
                </h3>
                <p className="text-sm text-[#C0C5CE]">
                  {language === 'ar' 
                    ? 'وصف تفصيلي للميزة والفوائد المقدمة'
                    : 'Detailed description of the feature and its benefits'
                  }
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Back to Main Site */}
        <div className={`text-center py-6 ${isRTL ? 'text-right' : 'text-left'}`}>
          <Button
            onClick={() => onNavigate?.('landing')}
            className="bg-[#00ff88] text-[#0a0a0a] hover:bg-[#00d4ff] font-mono"
          >
            <LocalizedText
              arText="← العودة إلى الموقع الرئيسي"
              enText="← Back to Main Site"
            />
          </Button>
        </div>
      </div>
    </RTLContainer>
  );
}

export default RTLDemo;