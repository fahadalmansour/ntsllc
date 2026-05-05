/**
 * RTL Demo Component
 * Testing Arabic language and RTL layout functionality
 */

import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { LanguageSwitcher, RTLContainer, LocalizedText } from '../LanguageSwitcher';
import { 
  ArabicCard, 
  ArabicFormField, 
  ArabicButton, 
  ServiceTierCard, 
  ContactInfo, 
  OrderStatus, 
  PricingDisplay,
  CountrySelect 
} from '../ui/arabic-components';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { 
  ArrowRight, 
  ArrowLeft, 
  Globe, 
  ShoppingCart, 
  Star, 
  CheckCircle,
  Clock,
  Zap
} from 'lucide-react';

interface RTLDemoProps {
  onNavigate?: (section: string) => void;
}

export default function RTLDemo({ onNavigate }: RTLDemoProps) {
  const { language, t, isRTL } = useLanguage();
  const [selectedTier, setSelectedTier] = React.useState('lightning');
  const [selectedCountry, setSelectedCountry] = React.useState('SA');

  const serviceTiers = [
    {
      id: 'lightning',
      nameAr: 'البرق',
      nameEn: 'Lightning',
      timeAr: '4 ساعات',
      timeEn: '4 Hours',
      price: 1299,
      currency: 'USD',
      featuresAr: [
        'متجر إلكتروني كامل في 4 ساعات',
        'تصميم احترافي متجاوب',
        'بوابة دفع آمنة',
        'شهادة SSL مجانية'
      ],
      featuresEn: [
        'Complete online store in 4 hours',
        'Professional responsive design', 
        'Secure payment gateway',
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
      price: 1899,
      currency: 'USD',
      featuresAr: [
        'متجر متقدم مع ميزات مخصصة',
        'تكامل مع أنظمة الدفع المتعددة',
        'إعداد أتمتة التسويق',
        'دعم فني لمدة 3 أشهر'
      ],
      featuresEn: [
        'Advanced store with custom features',
        'Multiple payment gateway integration',
        'Marketing automation setup',
        'Three months technical support'
      ]
    },
    {
      id: 'storm',
      nameAr: 'العاصفة',
      nameEn: 'Storm',
      timeAr: '72 ساعة',
      timeEn: '72 Hours',
      price: 4999,
      currency: 'USD',
      featuresAr: [
        'منصة تجارة إلكترونية متكاملة',
        'ذكاء اصطناعي وتحليلات متقدمة',
        'تصميم مخصص وهوية بصرية',
        'دعم فني لمدة سنة كاملة'
      ],
      featuresEn: [
        'Complete e-commerce platform',
        'AI and advanced analytics',
        'Custom design and branding',
        'Full year technical support'
      ],
      enterprise: true
    }
  ];

  return (
    <section className="min-h-screen bg-[#0a0a0a] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Button
              onClick={() => onNavigate?.('home')}
              variant="outline"
              className="border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff]/10"
            >
              {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
              {language === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
            </Button>
            
            <LanguageSwitcher variant="toggle" showText={true} />
          </div>

          <h1 className={`text-4xl font-bold text-[#C0C5CE] mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
            <LocalizedText 
              arText="اختبار اللغة العربية و RTL"
              enText="Arabic Language & RTL Test"
            />
          </h1>

          <p className={`text-xl text-gray-300 max-w-3xl mx-auto ${isRTL ? 'text-right' : 'text-left'}`}>
            <LocalizedText
              arText="اختبار شامل للغة العربية ونظام RTL مع جميع المكونات والميزات"
              enText="Comprehensive test of Arabic language and RTL system with all components and features"
            />
          </p>
        </div>

        <RTLContainer className="space-y-12">
          
          {/* Language Info Card */}
          <ArabicCard
            title={language === 'ar' ? 'معلومات اللغة' : 'Language Information'}
            icon={<Globe className="w-5 h-5" />}
            rtl={isRTL}
          >
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <strong className="text-[#00d4ff]">
                  {language === 'ar' ? 'اللغة الحالية:' : 'Current Language:'}
                </strong>
                <div className="text-[#C0C5CE]">
                  {language === 'ar' ? 'العربية (Arabic)' : 'English'}
                </div>
              </div>
              <div>
                <strong className="text-[#00ff88]">
                  {language === 'ar' ? 'اتجاه النص:' : 'Text Direction:'}
                </strong>
                <div className="text-[#C0C5CE]">
                  {isRTL ? 'RTL (Right to Left)' : 'LTR (Left to Right)'}
                </div>
              </div>
            </div>
          </ArabicCard>

          {/* Service Tiers */}
          <div>
            <h2 className={`text-2xl font-bold text-[#C0C5CE] mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
              <LocalizedText
                arText="خدماتنا المتخصصة"
                enText="Our Specialized Services"
              />
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {serviceTiers.map((tier) => (
                <ServiceTierCard
                  key={tier.id}
                  tier={tier}
                  selected={selectedTier === tier.id}
                  onSelect={setSelectedTier}
                  language={language}
                />
              ))}
            </div>
          </div>

          {/* Form Examples */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Arabic Form */}
            <ArabicCard
              title={language === 'ar' ? 'نموذج طلب الخدمة' : 'Service Request Form'}
              icon={<ShoppingCart className="w-5 h-5" />}
              rtl={isRTL}
            >
              <div className="space-y-4">
                <ArabicFormField
                  label={language === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                  required
                >
                  <Input 
                    placeholder={language === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'} 
                    dir={isRTL ? 'rtl' : 'ltr'}
                    className={`${isRTL ? 'text-right' : 'text-left'} bg-[#1a1a1a] border-[#00d4ff]/30`}
                  />
                </ArabicFormField>

                <ArabicFormField
                  label={language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                  required
                >
                  <Input 
                    type="email"
                    placeholder={language === 'ar' ? 'البريد الإلكتروني' : 'your.email@example.com'} 
                    dir="ltr"
                    className="text-left bg-[#1a1a1a] border-[#00d4ff]/30"
                  />
                </ArabicFormField>

                <ArabicFormField
                  label={language === 'ar' ? 'الدولة' : 'Country'}
                  required
                >
                  <CountrySelect 
                    value={selectedCountry}
                    onValueChange={setSelectedCountry}
                    language={language}
                  />
                </ArabicFormField>

                <ArabicButton
                  className="w-full bg-[#00ff88] text-[#0a0a0a] hover:bg-[#00ff88]/90"
                  icon={<CheckCircle className="w-4 h-4" />}
                  iconPosition="right"
                >
                  <LocalizedText
                    arText="إرسال الطلب"
                    enText="Submit Request"
                  />
                </ArabicButton>
              </div>
            </ArabicCard>

            {/* Contact Information */}
            <div className="space-y-6">
              <ContactInfo
                phone="+1-555-0123"
                email="contact@neotechnology.solutions"
                whatsapp="+966-50-123-4567"
                language={language}
              />

              <OrderStatus
                orderNumber="NEO-2024-001"
                status="in_progress"
                progress={67}
                estimatedTime="2h 15m"
                language={language}
              />
            </div>
          </div>

          {/* Pricing Display */}
          <PricingDisplay
            basePrice={1299}
            currency="USD"
            urgencyMultiplier={1.5}
            additionalFees={[
              { 
                nameAr: 'تخصيص إضافي', 
                nameEn: 'Additional Customization', 
                amount: 299 
              },
              { 
                nameAr: 'تدريب شخصي', 
                nameEn: 'Personal Training', 
                amount: 199 
              }
            ]}
            language={language}
          />

          {/* Features Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                iconColor: '#00d4ff', 
                icon: Zap, 
                titleAr: 'سرعة البرق', 
                titleEn: 'Lightning Speed',
                descAr: 'إعداد في 90 دقيقة',
                descEn: '90-minute setup'
              },
              { 
                iconColor: '#00ff88', 
                icon: Star, 
                titleAr: 'جودة عالية', 
                titleEn: 'Premium Quality',
                descAr: 'تصميم احترافي',
                descEn: 'Professional design'
              },
              { 
                iconColor: '#ffd93d', 
                icon: Globe, 
                titleAr: 'دعم عالمي', 
                titleEn: 'Global Support',
                descAr: '24/7 دعم فني',
                descEn: '24/7 technical support'
              },
              { 
                iconColor: '#ff6b6b', 
                icon: CheckCircle, 
                titleAr: 'ضمان الجودة', 
                titleEn: 'Quality Guarantee',
                descAr: 'ضمان 100%',
                descEn: '100% guarantee'
              }
            ].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="bg-[#1a1a1a] border border-gray-800 p-6 text-center hover:border-[#00d4ff]/50 transition-all">
                  <IconComponent 
                    className="w-8 h-8 mx-auto mb-4" 
                    style={{ color: feature.iconColor }}
                  />
                  <h3 className="font-bold text-[#C0C5CE] mb-2">
                    <LocalizedText
                      arText={feature.titleAr}
                      enText={feature.titleEn}
                    />
                  </h3>
                  <p className="text-gray-400 text-sm">
                    <LocalizedText
                      arText={feature.descAr}
                      enText={feature.descEn}
                    />
                  </p>
                </Card>
              );
            })}
          </div>

          {/* Text Direction Test */}
          <ArabicCard
            title={language === 'ar' ? 'اختبار اتجاه النص' : 'Text Direction Test'}
            icon={<Globe className="w-5 h-5" />}
            rtl={isRTL}
          >
            <div className="space-y-4">
              <div className={`p-4 bg-[#00d4ff]/10 rounded border border-[#00d4ff]/30 ${isRTL ? 'text-right' : 'text-left'}`}>
                <LocalizedText
                  arText="هذا نص تجريبي باللغة العربية لاختبار اتجاه RTL. يجب أن يظهر هذا النص من اليمين إلى اليسار مع محاذاة صحيحة."
                  enText="This is test text in English to verify LTR direction. This text should appear left-to-right with proper alignment."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className={`p-3 bg-[#00ff88]/10 rounded border border-[#00ff88]/30 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <strong>
                    <LocalizedText arText="الأرقام:" enText="Numbers:" />
                  </strong>
                  <div>1234567890</div>
                  <div>١٢٣٤٥٦٧٨٩٠</div>
                </div>
                
                <div className={`p-3 bg-[#ffd93d]/10 rounded border border-[#ffd93d]/30 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <strong>
                    <LocalizedText arText="العملات:" enText="Currencies:" />
                  </strong>
                  <div>$1,299 USD</div>
                  <div>4,874 ر.س SAR</div>
                </div>
              </div>
            </div>
          </ArabicCard>

          {/* Navigation */}
          <div className="text-center pt-8">
            <Button
              onClick={() => onNavigate?.('home')}
              className="bg-[#00d4ff] text-black px-8 py-3 hover:bg-[#00ff88] transition-all"
            >
              {isRTL ? <ArrowRight className="w-4 h-4 mr-2" /> : <ArrowLeft className="w-4 h-4 mr-2" />}
              <LocalizedText
                arText="العودة للرئيسية"
                enText="Back to Home"
              />
            </Button>
          </div>

        </RTLContainer>
      </div>
    </section>
  );
}