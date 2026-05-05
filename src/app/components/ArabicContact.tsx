/**
 * NeoTechnology Solutions - Arabic-Enabled Contact Component
 * Comprehensive contact form with full Arabic and RTL support
 */

import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle,
  AlertCircle,
  Globe,
  User,
  Building,
  MessageSquare
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { ArabicCard, ArabicFormField, ArabicButton, ContactInfo } from './ui/arabic-components';
import { RTLContainer } from './LanguageSwitcher';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  service: string;
  budget: string;
  message: string;
  preferredContact: 'email' | 'phone' | 'whatsapp';
  urgency: 'low' | 'medium' | 'high';
}

export function ArabicContact() {
  const { t, language, isRTL, formatCurrency } = useLanguage();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    country: '',
    service: '',
    budget: '',
    message: '',
    preferredContact: 'email',
    urgency: 'medium'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const services = [
    { 
      id: 'lightning', 
      nameAr: 'البرق - Lightning (4 ساعات)', 
      nameEn: 'Lightning Launch (4 Hours)',
      price: 799
    },
    { 
      id: 'thunder', 
      nameAr: 'الرعد - Thunder (24 ساعة)', 
      nameEn: 'Thunder Setup (24 Hours)',
      price: 1299
    },
    { 
      id: 'storm', 
      nameAr: 'العاصفة - Storm (72 ساعة)', 
      nameEn: 'Storm Complete (72 Hours)',
      price: 2999
    },
    { 
      id: 'custom', 
      nameAr: 'حل مخصص', 
      nameEn: 'Custom Solution',
      price: null
    }
  ];

  const budgetRanges = [
    { id: 'budget-1', arText: 'أقل من $1,000', enText: 'Under $1,000' },
    { id: 'budget-2', arText: '$1,000 - $5,000', enText: '$1,000 - $5,000' },
    { id: 'budget-3', arText: '$5,000 - $15,000', enText: '$5,000 - $15,000' },
    { id: 'budget-4', arText: '$15,000 - $50,000', enText: '$15,000 - $50,000' },
    { id: 'budget-5', arText: 'أكثر من $50,000', enText: '$50,000+' }
  ];

  const countries = [
    { code: 'US', nameEn: 'United States', nameAr: 'الولايات المتحدة', flag: '🇺🇸' },
    { code: 'SA', nameEn: 'Saudi Arabia', nameAr: 'المملكة العربية السعودية', flag: '🇸🇦' },
    { code: 'AE', nameEn: 'UAE', nameAr: 'الإمارات العربية المتحدة', flag: '🇦🇪' },
    { code: 'KW', nameEn: 'Kuwait', nameAr: 'الكويت', flag: '🇰🇼' },
    { code: 'QA', nameEn: 'Qatar', nameAr: 'قطر', flag: '🇶🇦' },
    { code: 'BH', nameEn: 'Bahrain', nameAr: 'البحرين', flag: '🇧🇭' },
    { code: 'OM', nameEn: 'Oman', nameAr: 'عمان', flag: '🇴🇲' }
  ];

  const urgencyLevels = [
    { id: 'low', arText: 'غير عاجل (7-14 يوم)', enText: 'Not Urgent (7-14 days)' },
    { id: 'medium', arText: 'عاجل (2-7 أيام)', enText: 'Urgent (2-7 days)' },
    { id: 'high', arText: 'عاجل جداً (خلال 24 ساعة)', enText: 'Very Urgent (within 24h)' }
  ];

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          country: '',
          service: '',
          budget: '',
          message: '',
          preferredContact: 'email',
          urgency: 'medium'
        });
        setSubmitStatus('idle');
      }, 3000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = {
    phone: '+1 (307) 200-0000',
    email: 'contact@neotechsolutions.com',
    whatsapp: '+966 50 000 0000',
    address: language === 'ar' 
      ? 'وايومنغ، الولايات المتحدة الأمريكية' 
      : 'Wyoming, United States',
    workingHours: language === 'ar' 
      ? '24/7 - متاح على مدار الساعة' 
      : '24/7 - Available Around the Clock'
  };

  return (
    <RTLContainer className="min-h-screen bg-[#0a0a0a] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-16 ${isRTL ? 'text-right' : 'text-left'}`}>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            {t('contact.title')}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form - Takes 2 columns */}
          <div className="lg:col-span-2">
            <ArabicCard
              title={language === 'ar' ? 'أرسل لنا رسالة' : 'Send us a message'}
              icon={<MessageSquare className="w-5 h-5" />}
              className="bg-[#12151C] border-[#00d4ff]/20"
            >
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-[#00ff88]/10 border border-[#00ff88]/30 rounded-lg">
                  <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <CheckCircle className="w-5 h-5 text-[#00ff88]" />
                    <span className="text-[#00ff88] font-medium">
                      {language === 'ar' 
                        ? 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.' 
                        : 'Message sent successfully! We\'ll get back to you soon.'
                      }
                    </span>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    <span className="text-red-400 font-medium">
                      {language === 'ar' 
                        ? 'حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.' 
                        : 'Error sending message. Please try again.'
                      }
                    </span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ArabicFormField
                    label={t('contact.form.name')}
                    required
                    error={!formData.name && isSubmitting ? t('contact.form.required') : ''}
                  >
                    <Input
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder={language === 'ar' ? 'اسمك الكامل' : 'Your full name'}
                      className="bg-[#1a1a1a] border-[#00d4ff]/30 text-white"
                      dir={isRTL ? 'rtl' : 'ltr'}
                    />
                  </ArabicFormField>

                  <ArabicFormField
                    label={t('contact.form.email')}
                    required
                    error={!formData.email && isSubmitting ? t('contact.form.required') : ''}
                  >
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder={language === 'ar' ? 'بريدك الإلكتروني' : 'your@email.com'}
                      className="bg-[#1a1a1a] border-[#00d4ff]/30 text-white"
                      dir="ltr"
                    />
                  </ArabicFormField>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ArabicFormField
                    label={t('contact.form.phone')}
                    help={language === 'ar' ? 'مع رمز الدولة' : 'Include country code'}
                  >
                    <Input
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder={language === 'ar' ? '+966 50 123 4567' : '+1 (555) 123-4567'}
                      className="bg-[#1a1a1a] border-[#00d4ff]/30 text-white"
                      dir="ltr"
                    />
                  </ArabicFormField>

                  <ArabicFormField
                    label={t('contact.form.company')}
                  >
                    <Input
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      placeholder={language === 'ar' ? 'اسم الشركة' : 'Company name'}
                      className="bg-[#1a1a1a] border-[#00d4ff]/30 text-white"
                      dir={isRTL ? 'rtl' : 'ltr'}
                    />
                  </ArabicFormField>
                </div>

                {/* Business Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ArabicFormField
                    label={language === 'ar' ? 'الدولة' : 'Country'}
                    required
                  >
                    <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                      <SelectTrigger className="bg-[#1a1a1a] border-[#00d4ff]/30 text-white" dir={isRTL ? 'rtl' : 'ltr'}>
                        <SelectValue placeholder={language === 'ar' ? 'اختر الدولة' : 'Select country'} />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1a1a] border-[#00d4ff]/30">
                        {countries.map((country) => (
                          <SelectItem key={country.code} value={country.code}>
                            <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                              <span>{country.flag}</span>
                              <span>{language === 'ar' ? country.nameAr : country.nameEn}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </ArabicFormField>

                  <ArabicFormField
                    label={language === 'ar' ? 'الخدمة المطلوبة' : 'Service Needed'}
                    required
                  >
                    <Select value={formData.service} onValueChange={(value) => handleInputChange('service', value)}>
                      <SelectTrigger className="bg-[#1a1a1a] border-[#00d4ff]/30 text-white" dir={isRTL ? 'rtl' : 'ltr'}>
                        <SelectValue placeholder={language === 'ar' ? 'اختر الخدمة' : 'Select service'} />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1a1a] border-[#00d4ff]/30">
                        {services.map((service) => (
                          <SelectItem key={service.id} value={service.id}>
                            <div className={isRTL ? 'text-right' : 'text-left'}>
                              <div>{language === 'ar' ? service.nameAr : service.nameEn}</div>
                              {service.price && (
                                <div className="text-xs text-gray-400">
                                  {formatCurrency(service.price)}
                                </div>
                              )}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </ArabicFormField>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ArabicFormField
                    label={language === 'ar' ? 'الميزانية المتوقعة' : 'Expected Budget'}
                  >
                    <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                      <SelectTrigger className="bg-[#1a1a1a] border-[#00d4ff]/30 text-white" dir={isRTL ? 'rtl' : 'ltr'}>
                        <SelectValue placeholder={language === 'ar' ? 'اختر نطاق الميزانية' : 'Select budget range'} />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1a1a] border-[#00d4ff]/30">
                        {budgetRanges.map((range) => (
                          <SelectItem key={range.id} value={range.id}>
                            {language === 'ar' ? range.arText : range.enText}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </ArabicFormField>

                  <ArabicFormField
                    label={language === 'ar' ? 'مستوى الأولوية' : 'Urgency Level'}
                  >
                    <Select value={formData.urgency} onValueChange={(value) => handleInputChange('urgency', value as any)}>
                      <SelectTrigger className="bg-[#1a1a1a] border-[#00d4ff]/30 text-white" dir={isRTL ? 'rtl' : 'ltr'}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1a1a] border-[#00d4ff]/30">
                        {urgencyLevels.map((level) => (
                          <SelectItem key={level.id} value={level.id}>
                            {language === 'ar' ? level.arText : level.enText}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </ArabicFormField>
                </div>

                {/* Message */}
                <ArabicFormField
                  label={t('contact.form.message')}
                  required
                  help={language === 'ar' ? 'اشرح مشروعك وأهدافك بالتفصيل' : 'Describe your project and goals in detail'}
                  error={!formData.message && isSubmitting ? t('contact.form.required') : ''}
                >
                  <Textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder={language === 'ar' 
                      ? 'اكتب رسالتك هنا... أخبرنا عن مشروعك، أهدافك، والتحديات التي تواجهها.'
                      : 'Write your message here... Tell us about your project, goals, and challenges you\'re facing.'
                    }
                    className="bg-[#1a1a1a] border-[#00d4ff]/30 text-white min-h-[120px]"
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                </ArabicFormField>

                {/* Submit Button */}
                <div className={`flex justify-end ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <ArabicButton
                    type="submit"
                    loading={isSubmitting}
                    disabled={isSubmitting || submitStatus === 'success'}
                    icon={<Send className="w-4 h-4" />}
                    iconPosition={isRTL ? 'left' : 'right'}
                    className="bg-[#00d4ff] text-black hover:bg-[#00ff88] px-8 py-3"
                  >
                    {isSubmitting 
                      ? (language === 'ar' ? 'جاري الإرسال...' : 'Sending...')
                      : (language === 'ar' ? 'إرسال الرسالة' : 'Send Message')
                    }
                  </ArabicButton>
                </div>
              </form>
            </ArabicCard>
          </div>

          {/* Contact Information - Takes 1 column */}
          <div className="space-y-6">
            <ContactInfo
              phone={contactInfo.phone}
              email={contactInfo.email}
              whatsapp={contactInfo.whatsapp}
              language={language}
            />

            {/* Office Hours */}
            <ArabicCard
              title={language === 'ar' ? 'ساعات العمل' : 'Office Hours'}
              icon={<Clock className="w-5 h-5" />}
              className="bg-[#12151C] border-[#00d4ff]/20"
            >
              <div className="space-y-3">
                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Globe className="w-4 h-4 text-[#00ff88]" />
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <div className="text-white font-medium">
                      {language === 'ar' ? 'الولايات المتحدة' : 'United States'}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {language === 'ar' ? 'الاثنين - الجمعة: 9 ص - 6 م (MST)' : 'Mon - Fri: 9 AM - 6 PM (MST)'}
                    </div>
                  </div>
                </div>
                
                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Globe className="w-4 h-4 text-[#00ff88]" />
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <div className="text-white font-medium">
                      {language === 'ar' ? 'دول الخليج' : 'GCC Countries'}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {language === 'ar' ? 'الأحد - الخميس: 9 ص - 6 م (GST)' : 'Sun - Thu: 9 AM - 6 PM (GST)'}
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#00d4ff]/20 pt-3 mt-3">
                  <div className={`text-center ${isRTL ? 'text-right' : 'text-left'} text-[#00ff88] font-medium`}>
                    {language === 'ar' ? 'دعم طوارئ 24/7 متاح' : '24/7 Emergency Support Available'}
                  </div>
                </div>
              </div>
            </ArabicCard>

            {/* Location */}
            <ArabicCard
              title={language === 'ar' ? 'موقعنا' : 'Our Location'}
              icon={<MapPin className="w-5 h-5" />}
              className="bg-[#12151C] border-[#00d4ff]/20"
            >
              <div className="space-y-3">
                <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <MapPin className="w-4 h-4 text-[#00d4ff] mt-1" />
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <div className="text-white font-medium">
                      NeoTechnology Solutions
                    </div>
                    <div className="text-gray-400 text-sm">
                      {contactInfo.address}
                    </div>
                  </div>
                </div>
                
                <div className="text-sm text-gray-400">
                  {language === 'ar' 
                    ? 'نخدم العملاء في الولايات المتحدة ودول مجلس التعاون الخليجي'
                    : 'Serving clients across USA and GCC countries'
                  }
                </div>
              </div>
            </ArabicCard>
          </div>
        </div>
      </div>
    </RTLContainer>
  );
}

export default ArabicContact;