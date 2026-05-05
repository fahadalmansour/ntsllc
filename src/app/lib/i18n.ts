/**
 * NeoTechnology Solutions - Comprehensive i18n System
 * Full Arabic and English localization with RTL support
 */

export type Language = 'ar' | 'en';
export type Direction = 'rtl' | 'ltr';

export interface LocaleConfig {
  language: Language;
  direction: Direction;
  dateFormat: string;
  numberFormat: string;
  currency: string;
  currencySymbol: string;
  phoneFormat: string;
  region: string;
}

export const locales: Record<Language, LocaleConfig> = {
  ar: {
    language: 'ar',
    direction: 'rtl',
    dateFormat: 'ar-SA',
    numberFormat: 'ar-SA',
    currency: 'SAR',
    currencySymbol: 'ر.س',
    phoneFormat: '+966',
    region: 'SA'
  },
  en: {
    language: 'en',
    direction: 'ltr',
    dateFormat: 'en-US',
    numberFormat: 'en-US',
    currency: 'USD',
    currencySymbol: '$',
    phoneFormat: '+1',
    region: 'US'
  }
};

// Complete translations for all platform content
export const translations = {
  // Navigation & Header
  navigation: {
    home: { ar: 'الرئيسية', en: 'Home' },
    services: { ar: 'الخدمات', en: 'Services' },
    about: { ar: 'من نحن', en: 'About' },
    pricing: { ar: 'الأسعار', en: 'Pricing' },
    portfolio: { ar: 'أعمالنا', en: 'Portfolio' },
    contact: { ar: 'تواصل معنا', en: 'Contact' },
    dashboard: { ar: 'لوحة التحكم', en: 'Dashboard' },
    login: { ar: 'تسجيل الدخول', en: 'Login' },
    register: { ar: 'التسجيل', en: 'Register' },
    logout: { ar: 'تسجيل الخروج', en: 'Logout' },
    language: { ar: 'العربية', en: 'English' }
  },

  // Hero Section
  hero: {
    title: {
      ar: 'حلول التجارة الإلكترونية المتقدمة',
      en: 'Advanced E-commerce Solutions'
    },
    subtitle: {
      ar: 'نبني متاجر إلكترونية احترافية في ساعات معدودة بدلاً من أسابيع',
      en: 'We build professional online stores in hours, not weeks'
    },
    timeGuarantee: {
      ar: 'ضمان الوقت أو استرداد 50% من القيمة',
      en: 'Time Guarantee or 50% Value Back'
    },
    ctaStart: { ar: 'ابدأ الآن', en: 'Get Started' },
    ctaDemo: { ar: 'طلب عرض توضيحي', en: 'Request Demo' },
    ctaAssessment: { ar: 'تقييم مجاني', en: 'Free Assessment' },
    stats: {
      clients: { ar: 'عميل راضٍ', en: 'Happy Clients' },
      projects: { ar: 'مشروع مكتمل', en: 'Projects Completed' },
      uptime: { ar: 'وقت التشغيل', en: 'Uptime' },
      support: { ar: 'دعم 24/7', en: '24/7 Support' }
    }
  },

  // Services
  services: {
    title: { ar: 'خدماتنا المتخصصة', en: 'Our Specialized Services' },
    subtitle: {
      ar: 'حلول شاملة للتجارة الإلكترونية مصممة خصيصاً لنجاح أعمالك',
      en: 'Comprehensive e-commerce solutions designed for your business success'
    },
    lightning: {
      name: { ar: 'البرق - Lightning', en: 'Lightning Launch' },
      time: { ar: '4 ساعات', en: '4 Hours' },
      price: { ar: '799 دولار', en: '$799' },
      features: {
        ar: [
          'متجر إلكتروني كامل في 4 ساعات',
          'تصميم احترافي متجاوب',
          'بوابة دفع آمنة',
          'إعداد منتجات أساسي',
          'شهادة SSL مجانية',
          'دعم فني لمدة شهر'
        ],
        en: [
          'Complete online store in 4 hours',
          'Professional responsive design',
          'Secure payment gateway',
          'Basic product setup',
          'Free SSL certificate',
          'One month technical support'
        ]
      }
    },
    thunder: {
      name: { ar: 'الرعد - Thunder', en: 'Thunder Setup' },
      time: { ar: '24 ساعة', en: '24 Hours' },
      price: { ar: '1,299 دولار', en: '$1,299' },
      features: {
        ar: [
          'متجر متقدم مع ميزات مخصصة',
          'تكامل مع أنظمة الدفع المتعددة',
          'إعداد أتمتة التسويق',
          'تحسين محركات البحث الأساسي',
          'تدريب شامل على الإدارة',
          'دعم فني لمدة 3 أشهر'
        ],
        en: [
          'Advanced store with custom features',
          'Multiple payment gateway integration',
          'Marketing automation setup',
          'Basic SEO optimization',
          'Comprehensive management training',
          'Three months technical support'
        ]
      }
    },
    storm: {
      name: { ar: 'العاصفة - Storm', en: 'Storm Complete' },
      time: { ar: '72 ساعة', en: '72 Hours' },
      price: { ar: '2,999 دولار', en: '$2,999' },
      features: {
        ar: [
          'منصة تجارة إلكترونية متكاملة',
          'ذكاء اصطناعي وتحليلات متقدمة',
          'أتمتة كاملة للعمليات',
          'تصميم مخصص وهوية بصرية',
          'تدريب مكثف وتسليم مشروع',
          'دعم فني لمدة سنة كاملة'
        ],
        en: [
          'Complete e-commerce platform',
          'AI and advanced analytics',
          'Full process automation',
          'Custom design and branding',
          'Intensive training and handover',
          'Full year technical support'
        ]
      }
    }
  },

  // Time Guarantee
  timeGuarantee: {
    title: {
      ar: 'التميز في التنفيذ: \"جودة استثنائية وسرعة في التنفيذ\"',
      en: 'Excellence in Execution: \"Exceptional Quality & Speed\"'
    },
    promise: {
      ar: 'وعد نيو: \"جودة عالية وخدمة احترافية مضمونة\"',
      en: 'Neo Promise: \"High Quality & Professional Service Guaranteed\"'
    },
    compensation: {
      cashRefund: { ar: 'ضمان الجودة', en: 'Quality Guarantee' },
      walletCredit: { ar: 'خدمة احترافية', en: 'Professional Service' },
      totalValue: { ar: 'التزام كامل', en: 'Full Commitment' }
    },
    automatic: {
      ar: 'خدمة عملاء متميزة ومتابعة مستمرة',
      en: 'Excellence in customer service and continuous follow-up'
    }
  },

  // Contact & Support
  contact: {
    title: { ar: 'تواصل معنا', en: 'Contact Us' },
    subtitle: {
      ar: 'فريقنا متاح لمساعدتك في بناء مشروعك',
      en: 'Our team is ready to help you build your project'
    },
    phone: { ar: 'الهاتف', en: 'Phone' },
    email: { ar: 'البريد الإلكتروني', en: 'Email' },
    whatsapp: { ar: 'واتساب', en: 'WhatsApp' },
    address: { ar: 'العنوان', en: 'Address' },
    workingHours: { ar: 'ساعات العمل', en: 'Working Hours' },
    form: {
      name: { ar: 'الاسم', en: 'Name' },
      email: { ar: 'البريد الإلكتروني', en: 'Email' },
      phone: { ar: 'رقم الهاتف', en: 'Phone Number' },
      company: { ar: 'اسم الشركة', en: 'Company Name' },
      subject: { ar: 'الموضوع', en: 'Subject' },
      message: { ar: 'الرسالة', en: 'Message' },
      submit: { ar: 'إرسال', en: 'Send Message' },
      required: { ar: 'مطلوب', en: 'Required' }
    }
  },

  // Dashboard
  dashboard: {
    welcome: { ar: 'مرحباً بك', en: 'Welcome back' },
    overview: { ar: 'نظرة عامة', en: 'Overview' },
    projects: { ar: 'المشاريع', en: 'Projects' },
    orders: { ar: 'الطلبات', en: 'Orders' },
    analytics: { ar: 'التحليلات', en: 'Analytics' },
    settings: { ar: 'الإعدادات', en: 'Settings' },
    profile: { ar: 'الملف الشخصي', en: 'Profile' },
    notifications: { ar: 'الإشعارات', en: 'Notifications' },
    help: { ar: 'المساعدة', en: 'Help' },
    quickActions: { ar: 'إجراءات سريعة', en: 'Quick Actions' },
    recentActivity: { ar: 'النشاط الأخير', en: 'Recent Activity' }
  },

  // Status Messages
  status: {
    pending: { ar: 'في الانتظار', en: 'Pending' },
    inProgress: { ar: 'جاري العمل', en: 'In Progress' },
    completed: { ar: 'مكتمل', en: 'Completed' },
    cancelled: { ar: 'ملغي', en: 'Cancelled' },
    onTime: { ar: 'في الوقت المحدد', en: 'On Time' },
    delayed: { ar: 'متأخر', en: 'Delayed' },
    urgent: { ar: 'عاجل', en: 'Urgent' }
  },

  // Common UI Elements
  common: {
    save: { ar: 'حفظ', en: 'Save' },
    cancel: { ar: 'إلغاء', en: 'Cancel' },
    delete: { ar: 'حذف', en: 'Delete' },
    edit: { ar: 'تعديل', en: 'Edit' },
    view: { ar: 'عرض', en: 'View' },
    download: { ar: 'تحميل', en: 'Download' },
    upload: { ar: 'رفع', en: 'Upload' },
    search: { ar: 'بحث', en: 'Search' },
    filter: { ar: 'تصفية', en: 'Filter' },
    sort: { ar: 'ترتيب', en: 'Sort' },
    loading: { ar: 'جاري التحميل...', en: 'Loading...' },
    error: { ar: 'خطأ', en: 'Error' },
    success: { ar: 'نجح', en: 'Success' },
    warning: { ar: 'تحذير', en: 'Warning' },
    info: { ar: 'معلومات', en: 'Info' },
    yes: { ar: 'نعم', en: 'Yes' },
    no: { ar: 'لا', en: 'No' },
    next: { ar: 'التالي', en: 'Next' },
    previous: { ar: 'السابق', en: 'Previous' },
    back: { ar: 'رجوع', en: 'Back' },
    close: { ar: 'إغلاق', en: 'Close' },
    select: { ar: 'اختيار', en: 'Select' },
    selectAll: { ar: 'اختيار الكل', en: 'Select All' },
    clear: { ar: 'مسح', en: 'Clear' },
    refresh: { ar: 'تحديث', en: 'Refresh' },
    retry: { ar: 'إعادة المحاولة', en: 'Retry' }
  },

  // Time & Date
  time: {
    now: { ar: 'الآن', en: 'Now' },
    today: { ar: 'اليوم', en: 'Today' },
    yesterday: { ar: 'أمس', en: 'Yesterday' },
    tomorrow: { ar: 'غداً', en: 'Tomorrow' },
    thisWeek: { ar: 'هذا الأسبوع', en: 'This Week' },
    thisMonth: { ar: 'هذا الشهر', en: 'This Month' },
    ago: { ar: 'منذ', en: 'ago' },
    remaining: { ar: 'متبقي', en: 'remaining' },
    estimated: { ar: 'تقديري', en: 'estimated' },
    actual: { ar: 'فعلي', en: 'actual' }
  },

  // Pricing & Payment
  pricing: {
    price: { ar: 'السعر', en: 'Price' },
    total: { ar: 'المجموع', en: 'Total' },
    subtotal: { ar: 'المجموع الفرعي', en: 'Subtotal' },
    tax: { ar: 'ضريبة', en: 'Tax' },
    discount: { ar: 'خصم', en: 'Discount' },
    free: { ar: 'مجاني', en: 'Free' },
    currency: {
      usd: { ar: 'دولار أمريكي', en: 'USD' },
      sar: { ar: 'ريال سعودي', en: 'SAR' },
      aed: { ar: 'درهم إماراتي', en: 'AED' }
    },
    paymentMethods: {
      card: { ar: 'بطاقة ائتمان', en: 'Credit Card' },
      paypal: { ar: 'باي بال', en: 'PayPal' },
      bankTransfer: { ar: 'تحويل بنكي', en: 'Bank Transfer' },
      stcPay: { ar: 'STC Pay', en: 'STC Pay' },
      applePay: { ar: 'Apple Pay', en: 'Apple Pay' },
      tamara: { ar: 'تمارا', en: 'Tamara' },
      tabby: { ar: 'تابي', en: 'Tabby' }
    }
  },

  // Legal & Terms
  legal: {
    terms: { ar: 'الشروط والأحكام', en: 'Terms & Conditions' },
    privacy: { ar: 'سياسة الخصوصية', en: 'Privacy Policy' },
    cookies: { ar: 'سياسة ملفات تعريف الارتباط', en: 'Cookie Policy' },
    disclaimer: { ar: 'إخلاء مسؤولية', en: 'Disclaimer' },
    copyright: { ar: 'حقوق الطبع والنشر', en: 'Copyright' },
    allRightsReserved: { ar: 'جميع الحقوق محفوظة', en: 'All Rights Reserved' }
  },

  // Technology & Features
  technology: {
    ai: { ar: 'الذكاء الاصطناعي', en: 'Artificial Intelligence' },
    automation: { ar: 'الأتمتة', en: 'Automation' },
    analytics: { ar: 'التحليلات', en: 'Analytics' },
    security: { ar: 'الأمان', en: 'Security' },
    performance: { ar: 'الأداء', en: 'Performance' },
    scalability: { ar: 'قابلية التوسع', en: 'Scalability' },
    integration: { ar: 'التكامل', en: 'Integration' },
    optimization: { ar: 'التحسين', en: 'Optimization' },
    mobile: { ar: 'الهاتف المحمول', en: 'Mobile' },
    responsive: { ar: 'متجاوب', en: 'Responsive' },
    cloud: { ar: 'السحابة', en: 'Cloud' },
    api: { ar: 'واجهة برمجة التطبيقات', en: 'API' }
  }
};

// Helper functions for localization
export function getTranslation(key: string, language: Language): string {
  const keys = key.split('.');
  let value: any = translations;
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  if (typeof value === 'object' && value !== null) {
    return value[language] || value.en || key;
  }
  
  return key;
}

export function t(key: string, language: Language = 'en'): string {
  return getTranslation(key, language);
}

export function formatNumber(
  number: number, 
  language: Language = 'en',
  options?: Intl.NumberFormatOptions
): string {
  const locale = locales[language];
  return new Intl.NumberFormat(locale.numberFormat, options).format(number);
}

export function formatCurrency(
  amount: number, 
  language: Language = 'en',
  currency?: string
): string {
  const locale = locales[language];
  const curr = currency || locale.currency;
  
  return new Intl.NumberFormat(locale.numberFormat, {
    style: 'currency',
    currency: curr,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount);
}

export function formatDate(
  date: Date | string, 
  language: Language = 'en',
  options?: Intl.DateTimeFormatOptions
): string {
  const locale = locales[language];
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  
  return new Intl.DateTimeFormat(locale.dateFormat, options || defaultOptions).format(dateObj);
}

export function formatRelativeTime(
  date: Date | string,
  language: Language = 'en'
): string {
  const locale = locales[language];
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);
  
  const rtf = new Intl.RelativeTimeFormat(locale.dateFormat, { numeric: 'auto' });
  
  if (diffInSeconds < 60) {
    return rtf.format(-diffInSeconds, 'second');
  } else if (diffInSeconds < 3600) {
    return rtf.format(-Math.floor(diffInSeconds / 60), 'minute');
  } else if (diffInSeconds < 86400) {
    return rtf.format(-Math.floor(diffInSeconds / 3600), 'hour');
  } else {
    return rtf.format(-Math.floor(diffInSeconds / 86400), 'day');
  }
}

export function getDirection(language: Language): Direction {
  return locales[language].direction;
}

export function isRTL(language: Language): boolean {
  return getDirection(language) === 'rtl';
}

// Country-specific configurations for GCC markets
export const gccConfig = {
  currencies: {
    SA: { code: 'SAR', symbol: 'ر.س', rate: 3.75 },
    AE: { code: 'AED', symbol: 'د.إ', rate: 3.67 },
    KW: { code: 'KWD', symbol: 'د.ك', rate: 0.30 },
    QA: { code: 'QAR', symbol: 'ر.ق', rate: 3.64 },
    BH: { code: 'BHD', symbol: 'د.ب', rate: 0.38 },
    OM: { code: 'OMR', symbol: 'ر.ع', rate: 0.38 }
  },
  
  paymentMethods: {
    SA: ['card', 'stc_pay', 'apple_pay', 'tamara', 'tabby'],
    AE: ['card', 'apple_pay', 'google_pay', 'tabby'],
    KW: ['card', 'knet', 'apple_pay'],
    QA: ['card', 'apple_pay', 'google_pay'],
    BH: ['card', 'benefit', 'apple_pay'],
    OM: ['card', 'apple_pay', 'google_pay']
  },
  
  taxRates: {
    SA: 0.15, // VAT 15%
    AE: 0.05, // VAT 5%
    KW: 0.00, // No VAT
    QA: 0.00, // No VAT
    BH: 0.10, // VAT 10%
    OM: 0.05  // VAT 5%
  }
};

export default {
  translations,
  locales,
  getTranslation,
  t,
  formatNumber,
  formatCurrency,
  formatDate,
  formatRelativeTime,
  getDirection,
  isRTL,
  gccConfig
};