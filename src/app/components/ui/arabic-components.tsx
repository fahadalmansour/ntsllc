/**
 * Arabic Language UI Components
 * RTL-ready components with Arabic text support
 */

import React from 'react';
import { cn } from '../../lib/utils';
import { Button } from './button';
import { Card } from './card';
import { Badge } from './badge';
import { Input } from './input';
import { Label } from './label';
import { Textarea } from './textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { 
  Calendar, 
  Clock, 
  Star, 
  Phone, 
  Mail, 
  MessageCircle, 
  CheckCircle, 
  AlertCircle,
  User,
  Building,
  CreditCard,
  Truck,
  Globe
} from 'lucide-react';

interface ArabicTextProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';
  weight?: 'normal' | 'medium' | 'bold';
  align?: 'right' | 'center' | 'left';
}

export function ArabicText({ 
  children, 
  className, 
  size = 'base',
  weight = 'normal',
  align = 'right'
}: ArabicTextProps) {
  const sizeClasses = {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl'
  };

  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    bold: 'font-bold'
  };

  const alignClasses = {
    right: 'text-right',
    center: 'text-center',
    left: 'text-left'
  };

  return (
    <div 
      className={cn(
        'font-arabic',
        sizeClasses[size],
        weightClasses[weight],
        alignClasses[align],
        className
      )}
      dir="rtl"
    >
      {children}
    </div>
  );
}

interface ArabicCardProps {
  title: string;
  titleEn?: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  rtl?: boolean;
}

export function ArabicCard({ 
  title, 
  titleEn, 
  children, 
  className, 
  icon,
  rtl = true 
}: ArabicCardProps) {
  return (
    <Card className={cn('p-6', className)} dir={rtl ? 'rtl' : 'ltr'}>
      <div className={cn('flex items-center gap-3 mb-4', rtl && 'flex-row-reverse')}>
        {icon && (
          <div className="p-2 bg-[#00d4ff]/20 rounded-lg text-[#00d4ff]">
            {icon}
          </div>
        )}
        <div className={cn(rtl && 'text-right')}>
          <h3 className="text-lg font-bold text-white">{title}</h3>
          {titleEn && (
            <p className="text-sm text-gray-400">{titleEn}</p>
          )}
        </div>
      </div>
      <div className={cn(rtl && 'text-right')}>
        {children}
      </div>
    </Card>
  );
}

interface ArabicFormFieldProps {
  label: string;
  labelEn?: string;
  required?: boolean;
  children: React.ReactNode;
  error?: string;
  help?: string;
  className?: string;
}

export function ArabicFormField({ 
  label, 
  labelEn, 
  required, 
  children, 
  error, 
  help, 
  className 
}: ArabicFormFieldProps) {
  return (
    <div className={cn('space-y-2', className)} dir="rtl">
      <Label className="text-right flex items-center gap-2">
        {label}
        {labelEn && <span className="text-gray-400 text-sm">({labelEn})</span>}
        {required && <span className="text-red-400">*</span>}
      </Label>
      {children}
      {error && (
        <div className="flex items-center gap-2 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}
      {help && !error && (
        <p className="text-gray-400 text-sm text-right">{help}</p>
      )}
    </div>
  );
}

interface ArabicButtonProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'right' | 'left';
}

export function ArabicButton({ 
  children, 
  variant = 'default',
  size = 'default',
  className, 
  onClick, 
  disabled, 
  loading,
  icon,
  iconPosition = 'right'
}: ArabicButtonProps) {
  return (
    <Button
      variant={variant}
      size={size}
      className={cn('flex items-center gap-2', className)}
      onClick={onClick}
      disabled={disabled || loading}
      dir="rtl"
    >
      {loading && (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {!loading && icon && iconPosition === 'right' && icon}
      {children}
      {!loading && icon && iconPosition === 'left' && icon}
    </Button>
  );
}

interface ServiceTierCardProps {
  tier: {
    id: string;
    nameAr: string;
    nameEn: string;
    timeAr: string;
    timeEn: string;
    price: number;
    currency: string;
    featuresAr: string[];
    featuresEn: string[];
    popular?: boolean;
    enterprise?: boolean;
  };
  selected?: boolean;
  onSelect?: (tierId: string) => void;
  language: 'ar' | 'en';
}

export function ServiceTierCard({ tier, selected, onSelect, language }: ServiceTierCardProps) {
  const isArabic = language === 'ar';
  
  return (
    <Card
      className={cn(
        'p-6 cursor-pointer border-2 transition-all duration-300',
        selected 
          ? 'border-[#00d4ff] bg-[#00d4ff]/5' 
          : 'border-gray-800 hover:border-gray-600',
        tier.popular && 'ring-2 ring-[#00d4ff]/30'
      )}
      onClick={() => onSelect?.(tier.id)}
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {tier.popular && (
        <Badge className="bg-[#00d4ff] text-black mb-3">
          {isArabic ? 'الأكثر شعبية' : 'MOST POPULAR'}
        </Badge>
      )}
      
      <div className={cn('text-center mb-4', isArabic && 'text-right')}>
        <h3 className="text-xl font-bold text-white mb-2">
          {isArabic ? tier.nameAr : tier.nameEn}
        </h3>
        
        <div className="flex items-center gap-2 mb-2" 
             style={{ flexDirection: isArabic ? 'row-reverse' : 'row', justifyContent: isArabic ? 'flex-end' : 'center' }}>
          <Clock className="w-4 h-4 text-gray-400" />
          <span className="text-2xl font-bold text-[#00d4ff]">
            {isArabic ? tier.timeAr : tier.timeEn}
          </span>
        </div>
        
        <div className="text-3xl font-bold text-white">
          {tier.price.toLocaleString()} {tier.currency}
          {tier.enterprise && <span className="text-xl text-gray-400">+</span>}
        </div>
      </div>
      
      <div className="space-y-2">
        {(isArabic ? tier.featuresAr : tier.featuresEn).map((feature, idx) => (
          <div key={idx} className={cn('flex items-center gap-2 text-sm text-gray-300', isArabic && 'flex-row-reverse')}>
            <CheckCircle className="w-4 h-4 text-[#00ff88]" />
            <span className={cn(isArabic && 'text-right')}>{feature}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

interface ContactInfoProps {
  phone: string;
  email: string;
  whatsapp: string;
  language: 'ar' | 'en';
  className?: string;
}

export function ContactInfo({ phone, email, whatsapp, language, className }: ContactInfoProps) {
  const isArabic = language === 'ar';
  
  const labels = {
    phone: isArabic ? 'الهاتف' : 'Phone',
    email: isArabic ? 'البريد الإلكتروني' : 'Email',
    whatsapp: isArabic ? 'واتساب' : 'WhatsApp'
  };
  
  return (
    <Card className={cn('p-4', className)} dir={isArabic ? 'rtl' : 'ltr'}>
      <h4 className={cn('font-bold text-white mb-3', isArabic && 'text-right')}>
        {isArabic ? 'معلومات التواصل' : 'Contact Information'}
      </h4>
      
      <div className="space-y-3">
        <div className={cn('flex items-center gap-3', isArabic && 'flex-row-reverse')}>
          <Phone className="w-4 h-4 text-[#00d4ff]" />
          <div className={cn(isArabic && 'text-right')}>
            <div className="text-sm text-gray-400">{labels.phone}</div>
            <div className="text-white font-mono">{phone}</div>
          </div>
        </div>
        
        <div className={cn('flex items-center gap-3', isArabic && 'flex-row-reverse')}>
          <Mail className="w-4 h-4 text-[#00ff88]" />
          <div className={cn(isArabic && 'text-right')}>
            <div className="text-sm text-gray-400">{labels.email}</div>
            <div className="text-white">{email}</div>
          </div>
        </div>
        
        <div className={cn('flex items-center gap-3', isArabic && 'flex-row-reverse')}>
          <MessageCircle className="w-4 h-4 text-[#00ff88]" />
          <div className={cn(isArabic && 'text-right')}>
            <div className="text-sm text-gray-400">{labels.whatsapp}</div>
            <div className="text-white font-mono">{whatsapp}</div>
          </div>
        </div>
      </div>
    </Card>
  );
}

interface OrderStatusProps {
  orderNumber: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  progress: number;
  estimatedTime?: string;
  completedTime?: string;
  language: 'ar' | 'en';
  className?: string;
}

export function OrderStatus({ 
  orderNumber, 
  status, 
  progress, 
  estimatedTime, 
  completedTime, 
  language, 
  className 
}: OrderStatusProps) {
  const isArabic = language === 'ar';
  
  const statusLabels = {
    pending: isArabic ? 'في الانتظار' : 'Pending',
    in_progress: isArabic ? 'جاري العمل' : 'In Progress',
    completed: isArabic ? 'مكتمل' : 'Completed',
    cancelled: isArabic ? 'ملغي' : 'Cancelled'
  };
  
  const statusColors = {
    pending: 'text-yellow-400',
    in_progress: 'text-[#00d4ff]',
    completed: 'text-[#00ff88]',
    cancelled: 'text-red-400'
  };
  
  const getStatusIcon = () => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'in_progress': return <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <AlertCircle className="w-4 h-4" />;
    }
  };
  
  return (
    <Card className={cn('p-4', className)} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className={cn('flex items-center justify-between mb-4', isArabic && 'flex-row-reverse')}>
        <div className={cn(isArabic && 'text-right')}>
          <h4 className="font-bold text-white mb-1">
            {isArabic ? 'طلب رقم' : 'Order'} #{orderNumber}
          </h4>
          <div className={cn('flex items-center gap-2', statusColors[status], isArabic && 'flex-row-reverse')}>
            {getStatusIcon()}
            {statusLabels[status]}
          </div>
        </div>
        
        {estimatedTime && status === 'in_progress' && (
          <div className={cn('text-center', isArabic && 'text-right')}>
            <div className="text-2xl font-bold text-[#00d4ff]">{estimatedTime}</div>
            <div className="text-sm text-gray-400">
              {isArabic ? 'متبقي' : 'remaining'}
            </div>
          </div>
        )}
        
        {completedTime && status === 'completed' && (
          <div className={cn('text-center', isArabic && 'text-right')}>
            <div className="text-2xl font-bold text-[#00ff88]">{completedTime}</div>
            <div className="text-sm text-gray-400">
              {isArabic ? 'مدة الإنجاز' : 'completed in'}
            </div>
          </div>
        )}
      </div>
      
      {status === 'in_progress' && (
        <div>
          <div className={cn('flex justify-between mb-2', isArabic && 'flex-row-reverse')}>
            <span className="text-sm text-gray-400">
              {isArabic ? 'التقدم' : 'Progress'}
            </span>
            <span className="text-sm text-gray-400">{progress}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-[#00d4ff] to-[#00ff88] h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </Card>
  );
}

interface PricingDisplayProps {
  basePrice: number;
  currency: string;
  urgencyMultiplier?: number;
  additionalFees?: Array<{ nameAr: string; nameEn: string; amount: number }>;
  language: 'ar' | 'en';
  className?: string;
}

export function PricingDisplay({ 
  basePrice, 
  currency, 
  urgencyMultiplier = 1, 
  additionalFees = [], 
  language, 
  className 
}: PricingDisplayProps) {
  const isArabic = language === 'ar';
  const urgencyFee = basePrice * (urgencyMultiplier - 1);
  const additionalFeesTotal = additionalFees.reduce((sum, fee) => sum + fee.amount, 0);
  const total = basePrice + urgencyFee + additionalFeesTotal;
  
  const labels = {
    basePrice: isArabic ? 'السعر الأساسي' : 'Base Price',
    urgencyFee: isArabic ? 'رسوم الأولوية' : 'Priority Fee',
    additionalFees: isArabic ? 'رسوم إضافية' : 'Additional Fees',
    total: isArabic ? 'المجموع' : 'Total'
  };
  
  return (
    <Card className={cn('p-4 bg-gradient-to-r from-[#00d4ff]/10 to-[#00ff88]/10 border border-[#00d4ff]/30', className)} 
          dir={isArabic ? 'rtl' : 'ltr'}>
      <h4 className={cn('font-bold text-white mb-4', isArabic && 'text-right')}>
        {isArabic ? 'تفاصيل التكلفة' : 'Pricing Breakdown'}
      </h4>
      
      <div className="space-y-2">
        <div className={cn('flex justify-between', isArabic && 'flex-row-reverse')}>
          <span className="text-gray-400">{labels.basePrice}</span>
          <span className="text-white">{basePrice.toLocaleString()} {currency}</span>
        </div>
        
        {urgencyFee > 0 && (
          <div className={cn('flex justify-between', isArabic && 'flex-row-reverse')}>
            <span className="text-gray-400">{labels.urgencyFee}</span>
            <span className="text-yellow-400">+{urgencyFee.toLocaleString()} {currency}</span>
          </div>
        )}
        
        {additionalFees.map((fee, index) => (
          <div key={index} className={cn('flex justify-between', isArabic && 'flex-row-reverse')}>
            <span className="text-gray-400">
              {isArabic ? fee.nameAr : fee.nameEn}
            </span>
            <span className="text-gray-300">+{fee.amount.toLocaleString()} {currency}</span>
          </div>
        ))}
        
        <div className={cn('border-t border-gray-600 pt-2 flex justify-between font-bold text-lg', isArabic && 'flex-row-reverse')}>
          <span className="text-white">{labels.total}</span>
          <span className="text-[#00ff88]">{total.toLocaleString()} {currency}</span>
        </div>
      </div>
    </Card>
  );
}

interface CountrySelectProps {
  value: string;
  onValueChange: (value: string) => void;
  language: 'ar' | 'en';
  className?: string;
}

export function CountrySelect({ value, onValueChange, language, className }: CountrySelectProps) {
  const isArabic = language === 'ar';
  
  const countries = [
    { code: 'US', nameEn: 'United States', nameAr: 'الولايات المتحدة', flag: '🇺🇸' },
    { code: 'SA', nameEn: 'Saudi Arabia', nameAr: 'المملكة العربية السعودية', flag: '🇸🇦' },
    { code: 'AE', nameEn: 'UAE', nameAr: 'الإمارات العربية المتحدة', flag: '🇦🇪' },
    { code: 'KW', nameEn: 'Kuwait', nameAr: 'الكويت', flag: '🇰🇼' },
    { code: 'QA', nameEn: 'Qatar', nameAr: 'قطر', flag: '🇶🇦' },
    { code: 'BH', nameEn: 'Bahrain', nameAr: 'البحرين', flag: '🇧🇭' },
    { code: 'OM', nameEn: 'Oman', nameAr: 'عمان', flag: '🇴🇲' }
  ];
  
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={cn('w-full', className)} dir={isArabic ? 'rtl' : 'ltr'}>
        <SelectValue placeholder={isArabic ? 'اختر الدولة' : 'Select Country'} />
      </SelectTrigger>
      <SelectContent dir={isArabic ? 'rtl' : 'ltr'}>
        {countries.map((country) => (
          <SelectItem key={country.code} value={country.code}>
            <div className={cn('flex items-center gap-2', isArabic && 'flex-row-reverse')}>
              <span>{country.flag}</span>
              <span>{isArabic ? country.nameAr : country.nameEn}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

// CSS to be added to globals.css for Arabic font support
export const arabicFontCSS = `
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600;700;800;900&display=swap');

.font-arabic {
  font-family: 'Cairo', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* RTL-specific adjustments */
[dir="rtl"] {
  text-align: right;
}

[dir="rtl"] .flex {
  flex-direction: row-reverse;
}

[dir="rtl"] input,
[dir="rtl"] textarea {
  text-align: right;
}

[dir="rtl"] .grid {
  direction: rtl;
}

/* Arabic number formatting */
.arabic-numbers {
  font-feature-settings: "lnum" 1;
}

/* Improved Arabic text rendering */
.arabic-text {
  font-feature-settings: "kern" 1, "liga" 1, "calt" 1;
  text-rendering: optimizeLegibility;
}

/* Mixed content (Arabic + English) */
.mixed-content {
  unicode-bidi: plaintext;
  text-align: start;
}
`;

export default {
  ArabicText,
  ArabicCard,
  ArabicFormField,
  ArabicButton,
  ServiceTierCard,
  ContactInfo,
  OrderStatus,
  PricingDisplay,
  CountrySelect,
  arabicFontCSS
};