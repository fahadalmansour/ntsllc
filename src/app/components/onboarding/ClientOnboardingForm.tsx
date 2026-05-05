/**
 * Client Onboarding Form with Requirements Capture
 * Multi-step form for capturing all project requirements
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Checkbox } from '../ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  DollarSign, 
  Globe, 
  Palette, 
  ShoppingCart, 
  Zap,
  CheckCircle,
  AlertCircle,
  Upload,
  Eye,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Truck,
  Star,
  Target,
  Users,
  TrendingUp,
  Shield,
  Smartphone,
  Languages,
  Coins
} from 'lucide-react';

interface OnboardingData {
  // Basic Information
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  whatsapp?: string;
  country: string;
  timezone: string;
  language: 'en' | 'ar';
  
  // Service Selection
  tier: 'lightning' | 'thunder' | 'storm';
  platform: 'shopify' | 'woocommerce' | 'salla' | 'zid' | 'custom';
  urgency: 'standard' | 'urgent' | 'emergency';
  
  // Business Details
  businessType: string;
  industry: string;
  targetMarket: string[];
  businessDescription: string;
  
  // Store Requirements
  domainName?: string;
  hasDomain: boolean;
  existingWebsite?: string;
  
  // Product Information
  productCount: number;
  productCategories: string[];
  averageProductPrice: number;
  hasInventory: boolean;
  productSource: 'existing' | 'new' | 'dropshipping' | 'mixed';
  
  // Design Preferences
  hasExistingBrand: boolean;
  logoUrl?: string;
  brandColors: string[];
  designStyle: 'modern' | 'minimal' | 'classic' | 'bold' | 'custom';
  inspirationSites: string[];
  
  // Payment & Shipping
  paymentMethods: string[];
  shippingZones: string[];
  currencies: string[];
  taxRegistered: boolean;
  
  // Marketing & Features
  emailMarketing: boolean;
  socialMediaIntegration: string[];
  seoFocus: string[];
  specialFeatures: string[];
  
  // Additional Requirements
  customRequirements: string;
  budget: number;
  launchDate?: Date;
  priorityFeatures: string[];
}

interface OnboardingFormProps {
  onComplete: (data: OnboardingData) => void;
  initialData?: Partial<OnboardingData>;
}

const SERVICE_TIERS = {
  lightning: {
    name: 'Lightning Launch',
    time: '4 hours',
    price: 799,
    color: '#00ff88',
    features: ['Basic store setup', 'Up to 10 products', '1 payment gateway', 'Mobile responsive'],
    limitations: ['No custom design', 'Single language', 'Basic features only']
  },
  thunder: {
    name: 'Thunder Setup',
    time: '24 hours',
    price: 1299,
    color: '#00d4ff',
    features: ['Professional design', 'Up to 50 products', '2 payment gateways', 'Email automation', 'SEO optimization'],
    popular: true
  },
  storm: {
    name: 'Storm Complete',
    time: '72 hours',
    price: 2999,
    color: 'linear-gradient(135deg, #00d4ff, #00ff88)',
    features: ['Enterprise features', 'Unlimited products', 'Multi-language', 'Advanced automation', 'Dedicated manager'],
    enterprise: true
  }
};

export function ClientOnboardingForm({ onComplete, initialData }: OnboardingFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<Partial<OnboardingData>>({
    language: 'en',
    tier: 'thunder',
    platform: 'shopify',
    urgency: 'standard',
    country: 'US',
    hasExistingBrand: false,
    hasDomain: false,
    hasInventory: true,
    productSource: 'existing',
    designStyle: 'modern',
    emailMarketing: true,
    socialMediaIntegration: [],
    seoFocus: [],
    specialFeatures: [],
    priorityFeatures: [],
    brandColors: [],
    productCategories: [],
    targetMarket: [],
    paymentMethods: [],
    shippingZones: [],
    currencies: ['USD'],
    inspirationSites: [],
    ...initialData
  });

  const totalSteps = 8;
  const isLastStep = currentStep === totalSteps;
  const isFirstStep = currentStep === 1;

  // Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem('neotech_onboarding', JSON.stringify(data));
  }, [data]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('neotech_onboarding');
    if (saved && !initialData) {
      try {
        const parsedData = JSON.parse(saved);
        setData(prev => ({ ...prev, ...parsedData }));
      } catch (error) {
        console.warn('Failed to load saved onboarding data');
      }
    }
  }, [initialData]);

  const updateData = (updates: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    if (isValidData(data)) {
      onComplete(data as OnboardingData);
      localStorage.removeItem('neotech_onboarding');
    }
  };

  const isValidData = (data: Partial<OnboardingData>): data is OnboardingData => {
    return !!(
      data.businessName &&
      data.ownerName &&
      data.email &&
      data.phone &&
      data.tier &&
      data.platform
    );
  };

  const getEstimatedPrice = (): number => {
    const basePricies = SERVICE_TIERS[data.tier || 'thunder'].price;
    let price = basePricies;
    
    // Add urgency fees
    if (data.urgency === 'urgent') price *= 1.5;
    if (data.urgency === 'emergency') price *= 2;
    
    // Add complexity fees
    if (data.productCount && data.productCount > 100) price *= 1.2;
    if (data.specialFeatures?.length && data.specialFeatures.length > 3) price *= 1.1;
    if (data.targetMarket?.length && data.targetMarket.length > 2) price *= 1.1;
    
    return Math.round(price);
  };

  const getEstimatedTime = (): string => {
    const baseTimes = {
      lightning: 4,
      thunder: 24,
      storm: 72
    };
    
    let hours = baseTimes[data.tier || 'thunder'];
    
    // Adjust for complexity
    if (data.productCount && data.productCount > 50) hours *= 1.2;
    if (data.specialFeatures?.length && data.specialFeatures.length > 5) hours *= 1.3;
    
    return hours < 24 ? `${Math.round(hours)} hours` : `${Math.round(hours / 24)} days`;
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepWrapper
            title={data.language === 'ar' ? 'معلومات أساسية' : 'Basic Information'}
            description={data.language === 'ar' ? 'أخبرنا عن عملك' : 'Tell us about your business'}
            icon={<Users className="w-6 h-6" />}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>{data.language === 'ar' ? 'اسم النشاط التجاري' : 'Business Name'}</Label>
                <Input
                  value={data.businessName || ''}
                  onChange={(e) => updateData({ businessName: e.target.value })}
                  placeholder={data.language === 'ar' ? 'مثال: متجر الأزياء العصرية' : 'e.g., Modern Fashion Store'}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label>{data.language === 'ar' ? 'اسم المالك' : 'Owner Name'}</Label>
                <Input
                  value={data.ownerName || ''}
                  onChange={(e) => updateData({ ownerName: e.target.value })}
                  placeholder={data.language === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label>{data.language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}</Label>
                <Input
                  type="email"
                  value={data.email || ''}
                  onChange={(e) => updateData({ email: e.target.value })}
                  placeholder="owner@business.com"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label>{data.language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}</Label>
                <Input
                  value={data.phone || ''}
                  onChange={(e) => updateData({ phone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label>{data.language === 'ar' ? 'واتساب (اختياري)' : 'WhatsApp (Optional)'}</Label>
                <Input
                  value={data.whatsapp || ''}
                  onChange={(e) => updateData({ whatsapp: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                  className="mt-1"
                />
                <p className="text-xs text-gray-400 mt-1">
                  {data.language === 'ar' 
                    ? 'للحصول على تحديثات فورية أثناء بناء المتجر' 
                    : 'For instant updates during store building'
                  }
                </p>
              </div>
              
              <div>
                <Label>{data.language === 'ar' ? 'البلد' : 'Country'}</Label>
                <Select value={data.country} onValueChange={(value) => updateData({ country: value })}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="US">🇺🇸 United States</SelectItem>
                    <SelectItem value="SA">🇸🇦 Saudi Arabia</SelectItem>
                    <SelectItem value="AE">🇦🇪 UAE</SelectItem>
                    <SelectItem value="KW">🇰🇼 Kuwait</SelectItem>
                    <SelectItem value="QA">🇶🇦 Qatar</SelectItem>
                    <SelectItem value="BH">🇧🇭 Bahrain</SelectItem>
                    <SelectItem value="OM">🇴🇲 Oman</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="mt-6">
              <Label>{data.language === 'ar' ? 'اللغة المفضلة' : 'Preferred Language'}</Label>
              <RadioGroup
                value={data.language}
                onValueChange={(value: 'en' | 'ar') => updateData({ language: value })}
                className="flex gap-6 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="en" id="lang-en" />
                  <Label htmlFor="lang-en">🇺🇸 English</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ar" id="lang-ar" />
                  <Label htmlFor="lang-ar">🇸🇦 العربية</Label>
                </div>
              </RadioGroup>
            </div>
          </StepWrapper>
        );

      case 2:
        return (
          <StepWrapper
            title={data.language === 'ar' ? 'اختر مستوى الخدمة' : 'Choose Service Tier'}
            description={data.language === 'ar' ? 'حدد السرعة والميزات المطلوبة' : 'Select speed and features needed'}
            icon={<Zap className="w-6 h-6" />}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {Object.entries(SERVICE_TIERS).map(([key, tier]) => (
                <Card
                  key={key}
                  className={`p-6 cursor-pointer border-2 transition-all duration-300 ${
                    data.tier === key
                      ? 'border-[#00d4ff] bg-[#00d4ff]/5'
                      : 'border-gray-800 hover:border-gray-600'
                  } ${tier.popular ? 'ring-2 ring-[#00d4ff]/30' : ''}`}
                  onClick={() => updateData({ tier: key as any })}
                >
                  {tier.popular && (
                    <Badge className="bg-[#00d4ff] text-black mb-3">
                      {data.language === 'ar' ? 'الأكثر شعبية' : 'MOST POPULAR'}
                    </Badge>
                  )}
                  
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-2xl font-bold" style={{ color: tier.color }}>
                        {tier.time}
                      </span>
                    </div>
                    <div className="text-3xl font-bold text-white">
                      ${tier.price.toLocaleString()}
                      {tier.enterprise && <span className="text-xl text-gray-400">+</span>}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {tier.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-[#00ff88]" />
                        {feature}
                      </div>
                    ))}
                    {tier.limitations?.map((limitation, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-500">
                        <AlertCircle className="w-4 h-4 text-gray-600" />
                        {limitation}
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-[#1a1a1a] rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">
                  {data.language === 'ar' ? 'التكلفة المقدرة:' : 'Estimated Cost:'}
                </span>
                <span className="text-2xl font-bold text-[#00ff88]">
                  ${getEstimatedPrice().toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-gray-400">
                  {data.language === 'ar' ? 'وقت التسليم المقدر:' : 'Estimated Delivery:'}
                </span>
                <span className="text-lg font-bold text-[#00d4ff]">
                  {getEstimatedTime()}
                </span>
              </div>
            </div>
            
            <div className="mt-6">
              <Label>{data.language === 'ar' ? 'مستوى الأولوية' : 'Priority Level'}</Label>
              <RadioGroup
                value={data.urgency}
                onValueChange={(value: any) => updateData({ urgency: value })}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3"
              >
                <Card className="p-4 cursor-pointer hover:border-gray-600">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard" className="cursor-pointer">
                      <div>
                        <div className="font-medium">
                          {data.language === 'ar' ? 'عادي' : 'Standard'}
                        </div>
                        <div className="text-sm text-gray-400">
                          {data.language === 'ar' ? 'بدون تكلفة إضافية' : 'No extra cost'}
                        </div>
                      </div>
                    </Label>
                  </div>
                </Card>
                
                <Card className="p-4 cursor-pointer hover:border-gray-600">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="urgent" id="urgent" />
                    <Label htmlFor="urgent" className="cursor-pointer">
                      <div>
                        <div className="font-medium text-yellow-400">
                          {data.language === 'ar' ? 'عاجل' : 'Urgent'}
                        </div>
                        <div className="text-sm text-gray-400">+50% fee</div>
                      </div>
                    </Label>
                  </div>
                </Card>
                
                <Card className="p-4 cursor-pointer hover:border-gray-600">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="emergency" id="emergency" />
                    <Label htmlFor="emergency" className="cursor-pointer">
                      <div>
                        <div className="font-medium text-red-400">
                          {data.language === 'ar' ? 'طارئ' : 'Emergency'}
                        </div>
                        <div className="text-sm text-gray-400">+100% fee</div>
                      </div>
                    </Label>
                  </div>
                </Card>
              </RadioGroup>
            </div>
          </StepWrapper>
        );

      case 3:
        return (
          <StepWrapper
            title={data.language === 'ar' ? 'منصة التجارة الإلكترونية' : 'E-commerce Platform'}
            description={data.language === 'ar' ? 'اختر المنصة المناسبة لعملك' : 'Choose the right platform for your business'}
            icon={<ShoppingCart className="w-6 h-6" />}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { key: 'shopify', name: 'Shopify', logo: '🛍️', description: 'Most popular, easy to use', global: true },
                { key: 'woocommerce', name: 'WooCommerce', logo: '🛒', description: 'WordPress-based, flexible', global: true },
                { key: 'salla', name: 'Salla', logo: '🇸🇦', description: 'Popular in Saudi Arabia', regional: 'GCC' },
                { key: 'zid', name: 'Zid', logo: '⚡', description: 'Fast-growing in MENA', regional: 'MENA' }
              ].map((platform) => (
                <Card
                  key={platform.key}
                  className={`p-4 cursor-pointer border-2 transition-all duration-300 ${
                    data.platform === platform.key
                      ? 'border-[#00d4ff] bg-[#00d4ff]/5'
                      : 'border-gray-800 hover:border-gray-600'
                  }`}
                  onClick={() => updateData({ platform: platform.key as any })}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2">{platform.logo}</div>
                    <h3 className="font-bold text-white">{platform.name}</h3>
                    <p className="text-sm text-gray-400 mt-1">{platform.description}</p>
                    {platform.regional && (
                      <Badge className="mt-2 bg-[#00ff88]/20 text-[#00ff88]">
                        {platform.regional}
                      </Badge>
                    )}
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="mt-6">
              <Label>{data.language === 'ar' ? 'وصف النشاط التجاري' : 'Business Description'}</Label>
              <Textarea
                value={data.businessDescription || ''}
                onChange={(e) => updateData({ businessDescription: e.target.value })}
                placeholder={data.language === 'ar' 
                  ? 'اشرح نوع عملك والمنتجات التي تبيعها...'
                  : 'Describe your business and what products you sell...'
                }
                className="mt-2 h-24"
              />
            </div>
          </StepWrapper>
        );

      case 4:
        return (
          <StepWrapper
            title={data.language === 'ar' ? 'معلومات المنتجات' : 'Product Information'}
            description={data.language === 'ar' ? 'أخبرنا عن منتجاتك' : 'Tell us about your products'}
            icon={<Target className="w-6 h-6" />}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>{data.language === 'ar' ? 'عدد المنتجات المتوقع' : 'Expected Number of Products'}</Label>
                <Select 
                  value={data.productCount?.toString()} 
                  onValueChange={(value) => updateData({ productCount: parseInt(value) })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">1-10 products</SelectItem>
                    <SelectItem value="25">11-50 products</SelectItem>
                    <SelectItem value="75">51-100 products</SelectItem>
                    <SelectItem value="200">101-500 products</SelectItem>
                    <SelectItem value="1000">500+ products</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>{data.language === 'ar' ? 'متوسط سعر المنتج' : 'Average Product Price'}</Label>
                <Input
                  type="number"
                  value={data.averageProductPrice || ''}
                  onChange={(e) => updateData({ averageProductPrice: parseFloat(e.target.value) })}
                  placeholder="$50"
                  className="mt-1"
                />
              </div>
            </div>
            
            <div className="mt-6">
              <Label>{data.language === 'ar' ? 'مصدر المنتجات' : 'Product Source'}</Label>
              <RadioGroup
                value={data.productSource}
                onValueChange={(value: any) => updateData({ productSource: value })}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3"
              >
                {[
                  { value: 'existing', label: data.language === 'ar' ? 'منتجات موجودة' : 'Existing Products', desc: data.language === 'ar' ? 'لدي منتجات جاهزة' : 'I have products ready' },
                  { value: 'new', label: data.language === 'ar' ? 'منتجات جديدة' : 'New Products', desc: data.language === 'ar' ? 'سأضيف منتجات جديدة' : 'Will add new products' },
                  { value: 'dropshipping', label: 'Dropshipping', desc: data.language === 'ar' ? 'من موردين خارجيين' : 'From external suppliers' },
                  { value: 'mixed', label: data.language === 'ar' ? 'مختلط' : 'Mixed', desc: data.language === 'ar' ? 'مزيج من المصادر' : 'Mix of sources' }
                ].map((option) => (
                  <Card key={option.value} className="p-4">
                    <div className="flex items-start space-x-3">
                      <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                      <Label htmlFor={option.value} className="cursor-pointer flex-1">
                        <div className="font-medium">{option.label}</div>
                        <div className="text-sm text-gray-400">{option.desc}</div>
                      </Label>
                    </div>
                  </Card>
                ))}
              </RadioGroup>
            </div>
            
            <div className="mt-6">
              <Label>{data.language === 'ar' ? 'فئات المنتجات' : 'Product Categories'}</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-3">
                {[
                  'Fashion', 'Electronics', 'Home & Garden', 'Sports', 'Beauty', 'Books',
                  'Jewelry', 'Toys', 'Food', 'Automotive', 'Health', 'Art'
                ].map((category) => (
                  <label key={category} className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox
                      checked={data.productCategories?.includes(category)}
                      onCheckedChange={(checked) => {
                        const categories = data.productCategories || [];
                        if (checked) {
                          updateData({ productCategories: [...categories, category] });
                        } else {
                          updateData({ productCategories: categories.filter(c => c !== category) });
                        }
                      }}
                    />
                    <span className="text-sm">{category}</span>
                  </label>
                ))}
              </div>
            </div>
          </StepWrapper>
        );

      case 5:
        return (
          <StepWrapper
            title={data.language === 'ar' ? 'التصميم والعلامة التجارية' : 'Design & Branding'}
            description={data.language === 'ar' ? 'كيف تريد أن يبدو متجرك؟' : 'How do you want your store to look?'}
            icon={<Palette className="w-6 h-6" />}
          >
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="existing-brand"
                  checked={data.hasExistingBrand}
                  onCheckedChange={(checked) => updateData({ hasExistingBrand: !!checked })}
                />
                <Label htmlFor="existing-brand">
                  {data.language === 'ar' ? 'لدي علامة تجارية موجودة' : 'I have an existing brand'}
                </Label>
              </div>
              
              {data.hasExistingBrand && (
                <div>
                  <Label>{data.language === 'ar' ? 'رابط الشعار' : 'Logo URL'}</Label>
                  <Input
                    value={data.logoUrl || ''}
                    onChange={(e) => updateData({ logoUrl: e.target.value })}
                    placeholder="https://example.com/logo.png"
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    {data.language === 'ar' 
                      ? 'أو يمكنك إرسال الشعار عبر الواتساب لاحقاً'
                      : 'Or you can send logo via WhatsApp later'
                    }
                  </p>
                </div>
              )}
              
              <div>
                <Label>{data.language === 'ar' ? 'نمط التصميم المفضل' : 'Preferred Design Style'}</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mt-3">
                  {[
                    { key: 'modern', name: data.language === 'ar' ? 'عصري' : 'Modern', emoji: '✨' },
                    { key: 'minimal', name: data.language === 'ar' ? 'بسيط' : 'Minimal', emoji: '⚪' },
                    { key: 'classic', name: data.language === 'ar' ? 'كلاسيكي' : 'Classic', emoji: '🏛️' },
                    { key: 'bold', name: data.language === 'ar' ? 'جريء' : 'Bold', emoji: '🔥' },
                    { key: 'custom', name: data.language === 'ar' ? 'مخصص' : 'Custom', emoji: '🎨' }
                  ].map((style) => (
                    <Card
                      key={style.key}
                      className={`p-4 cursor-pointer text-center border-2 transition-all duration-300 ${
                        data.designStyle === style.key
                          ? 'border-[#00d4ff] bg-[#00d4ff]/5'
                          : 'border-gray-800 hover:border-gray-600'
                      }`}
                      onClick={() => updateData({ designStyle: style.key as any })}
                    >
                      <div className="text-2xl mb-2">{style.emoji}</div>
                      <div className="text-sm font-medium">{style.name}</div>
                    </Card>
                  ))}
                </div>
              </div>
              
              <div>
                <Label>{data.language === 'ar' ? 'ألوان العلامة التجارية (اختياري)' : 'Brand Colors (Optional)'}</Label>
                <div className="grid grid-cols-4 md:grid-cols-6 gap-3 mt-3">
                  {[
                    '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
                    '#FFA500', '#800080', '#FFC0CB', '#A52A2A', '#808080', '#000000'
                  ].map((color) => (
                    <button
                      key={color}
                      className={`w-12 h-12 rounded-lg border-2 transition-all duration-300 ${
                        data.brandColors?.includes(color)
                          ? 'border-white scale-110'
                          : 'border-gray-600 hover:border-gray-400'
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => {
                        const colors = data.brandColors || [];
                        if (colors.includes(color)) {
                          updateData({ brandColors: colors.filter(c => c !== color) });
                        } else if (colors.length < 3) {
                          updateData({ brandColors: [...colors, color] });
                        }
                      }}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  {data.language === 'ar' ? 'اختر حتى 3 ألوان' : 'Select up to 3 colors'}
                </p>
              </div>
              
              <div>
                <Label>{data.language === 'ar' ? 'مواقع ملهمة (اختياري)' : 'Inspiration Sites (Optional)'}</Label>
                <Textarea
                  value={data.inspirationSites?.join('\n') || ''}
                  onChange={(e) => updateData({ inspirationSites: e.target.value.split('\n').filter(s => s.trim()) })}
                  placeholder={data.language === 'ar' 
                    ? 'https://example1.com\nhttps://example2.com'
                    : 'https://example1.com\nhttps://example2.com'
                  }
                  className="mt-2 h-20"
                />
              </div>
            </div>
          </StepWrapper>
        );

      case 6:
        return (
          <StepWrapper
            title={data.language === 'ar' ? 'الدفع والشحن' : 'Payment & Shipping'}
            description={data.language === 'ar' ? 'كيف ستتلقى المدفوعات وتشحن المنتجات؟' : 'How will you receive payments and ship products?'}
            icon={<CreditCard className="w-6 h-6" />}
          >
            <div className="space-y-6">
              <div>
                <Label>{data.language === 'ar' ? 'طرق الدفع المرغوبة' : 'Preferred Payment Methods'}</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                  {[
                    { key: 'stripe', name: 'Stripe', desc: 'Credit/Debit Cards', global: true },
                    { key: 'paypal', name: 'PayPal', desc: 'Global payments', global: true },
                    { key: 'mada', name: 'Mada', desc: 'Saudi Arabia', flag: '🇸🇦' },
                    { key: 'stc_pay', name: 'STC Pay', desc: 'Saudi Arabia', flag: '🇸🇦' },
                    { key: 'apple_pay', name: 'Apple Pay', desc: 'Mobile payments', global: true },
                    { key: 'bank_transfer', name: 'Bank Transfer', desc: 'Direct banking', global: true }
                  ].map((method) => (
                    <label key={method.key} className="flex items-start space-x-3 cursor-pointer">
                      <Checkbox
                        checked={data.paymentMethods?.includes(method.key)}
                        onCheckedChange={(checked) => {
                          const methods = data.paymentMethods || [];
                          if (checked) {
                            updateData({ paymentMethods: [...methods, method.key] });
                          } else {
                            updateData({ paymentMethods: methods.filter(m => m !== method.key) });
                          }
                        }}
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{method.name}</span>
                          {method.flag && <span>{method.flag}</span>}
                        </div>
                        <div className="text-xs text-gray-400">{method.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <Label>{data.language === 'ar' ? 'العملات المدعومة' : 'Supported Currencies'}</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                  {[
                    { code: 'USD', name: 'US Dollar', symbol: '$' },
                    { code: 'SAR', name: 'Saudi Riyal', symbol: 'ر.س' },
                    { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ' },
                    { code: 'KWD', name: 'Kuwaiti Dinar', symbol: 'د.ك' },
                    { code: 'QAR', name: 'Qatari Riyal', symbol: 'ر.ق' },
                    { code: 'BHD', name: 'Bahraini Dinar', symbol: '.د.ب' },
                    { code: 'OMR', name: 'Omani Rial', symbol: 'ر.ع.' },
                    { code: 'EUR', name: 'Euro', symbol: '€' }
                  ].map((currency) => (
                    <label key={currency.code} className="flex items-center space-x-2 cursor-pointer">
                      <Checkbox
                        checked={data.currencies?.includes(currency.code)}
                        onCheckedChange={(checked) => {
                          const currencies = data.currencies || [];
                          if (checked) {
                            updateData({ currencies: [...currencies, currency.code] });
                          } else {
                            updateData({ currencies: currencies.filter(c => c !== currency.code) });
                          }
                        }}
                      />
                      <span className="text-sm">
                        {currency.symbol} {currency.code}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <Label>{data.language === 'ar' ? 'مناطق الشحن' : 'Shipping Zones'}</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                  {[
                    { key: 'local', name: data.language === 'ar' ? 'محلي فقط' : 'Local Only' },
                    { key: 'gcc', name: data.language === 'ar' ? 'دول الخليج' : 'GCC Countries' },
                    { key: 'mena', name: data.language === 'ar' ? 'الشرق الأوسط وشمال أفريقيا' : 'MENA Region' },
                    { key: 'worldwide', name: data.language === 'ar' ? 'عالمي' : 'Worldwide' }
                  ].map((zone) => (
                    <label key={zone.key} className="flex items-center space-x-2 cursor-pointer">
                      <Checkbox
                        checked={data.shippingZones?.includes(zone.key)}
                        onCheckedChange={(checked) => {
                          const zones = data.shippingZones || [];
                          if (checked) {
                            updateData({ shippingZones: [...zones, zone.key] });
                          } else {
                            updateData({ shippingZones: zones.filter(z => z !== zone.key) });
                          }
                        }}
                      />
                      <span className="text-sm">{zone.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="tax-registered"
                  checked={data.taxRegistered}
                  onCheckedChange={(checked) => updateData({ taxRegistered: !!checked })}
                />
                <Label htmlFor="tax-registered">
                  {data.language === 'ar' 
                    ? 'مسجل في ضريبة القيمة المضافة'
                    : 'Registered for VAT/Sales Tax'
                  }
                </Label>
              </div>
            </div>
          </StepWrapper>
        );

      case 7:
        return (
          <StepWrapper
            title={data.language === 'ar' ? 'التسويق والميزات الإضافية' : 'Marketing & Additional Features'}
            description={data.language === 'ar' ? 'كيف تريد تسويق متجرك؟' : 'How do you want to market your store?'}
            icon={<TrendingUp className="w-6 h-6" />}
          >
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="email-marketing"
                  checked={data.emailMarketing}
                  onCheckedChange={(checked) => updateData({ emailMarketing: !!checked })}
                />
                <Label htmlFor="email-marketing">
                  {data.language === 'ar' ? 'تفعيل التسويق بالبريد الإلكتروني' : 'Enable email marketing'}
                </Label>
              </div>
              
              <div>
                <Label>{data.language === 'ar' ? 'منصات التواصل الاجتماعي' : 'Social Media Platforms'}</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                  {[
                    { key: 'facebook', name: 'Facebook', icon: '📘' },
                    { key: 'instagram', name: 'Instagram', icon: '📷' },
                    { key: 'twitter', name: 'Twitter/X', icon: '🐦' },
                    { key: 'tiktok', name: 'TikTok', icon: '🎵' },
                    { key: 'snapchat', name: 'Snapchat', icon: '👻' },
                    { key: 'linkedin', name: 'LinkedIn', icon: '💼' }
                  ].map((platform) => (
                    <label key={platform.key} className="flex items-center space-x-2 cursor-pointer">
                      <Checkbox
                        checked={data.socialMediaIntegration?.includes(platform.key)}
                        onCheckedChange={(checked) => {
                          const platforms = data.socialMediaIntegration || [];
                          if (checked) {
                            updateData({ socialMediaIntegration: [...platforms, platform.key] });
                          } else {
                            updateData({ socialMediaIntegration: platforms.filter(p => p !== platform.key) });
                          }
                        }}
                      />
                      <span className="text-sm">
                        {platform.icon} {platform.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <Label>{data.language === 'ar' ? 'أولوية تحسين محركات البحث' : 'SEO Focus Areas'}</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                  {[
                    { key: 'google', name: data.language === 'ar' ? 'جوجل (عالمي)' : 'Google (Global)' },
                    { key: 'google_ar', name: data.language === 'ar' ? 'جوجل (عربي)' : 'Google (Arabic)' },
                    { key: 'bing', name: 'Bing' },
                    { key: 'local_seo', name: data.language === 'ar' ? 'تحسين محلي' : 'Local SEO' }
                  ].map((seo) => (
                    <label key={seo.key} className="flex items-center space-x-2 cursor-pointer">
                      <Checkbox
                        checked={data.seoFocus?.includes(seo.key)}
                        onCheckedChange={(checked) => {
                          const focus = data.seoFocus || [];
                          if (checked) {
                            updateData({ seoFocus: [...focus, seo.key] });
                          } else {
                            updateData({ seoFocus: focus.filter(f => f !== seo.key) });
                          }
                        }}
                      />
                      <span className="text-sm">{seo.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <Label>{data.language === 'ar' ? 'ميزات خاصة مطلوبة' : 'Special Features Needed'}</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                  {[
                    { key: 'live_chat', name: data.language === 'ar' ? 'دردشة مباشرة' : 'Live Chat' },
                    { key: 'reviews', name: data.language === 'ar' ? 'نظام المراجعات' : 'Review System' },
                    { key: 'wishlist', name: data.language === 'ar' ? 'قائمة الأمنيات' : 'Wishlist' },
                    { key: 'loyalty', name: data.language === 'ar' ? 'برنامج ولاء' : 'Loyalty Program' },
                    { key: 'subscriptions', name: data.language === 'ar' ? 'اشتراكات' : 'Subscriptions' },
                    { key: 'multi_vendor', name: data.language === 'ar' ? 'متعدد البائعين' : 'Multi-vendor' },
                    { key: 'booking', name: data.language === 'ar' ? 'نظام حجز' : 'Booking System' },
                    { key: 'blog', name: data.language === 'ar' ? 'مدونة' : 'Blog' }
                  ].map((feature) => (
                    <label key={feature.key} className="flex items-center space-x-2 cursor-pointer">
                      <Checkbox
                        checked={data.specialFeatures?.includes(feature.key)}
                        onCheckedChange={(checked) => {
                          const features = data.specialFeatures || [];
                          if (checked) {
                            updateData({ specialFeatures: [...features, feature.key] });
                          } else {
                            updateData({ specialFeatures: features.filter(f => f !== feature.key) });
                          }
                        }}
                      />
                      <span className="text-sm">{feature.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </StepWrapper>
        );

      case 8:
        return (
          <StepWrapper
            title={data.language === 'ar' ? 'مراجعة وإرسال' : 'Review & Submit'}
            description={data.language === 'ar' ? 'راجع طلبك قبل الإرسال' : 'Review your request before submitting'}
            icon={<CheckCircle className="w-6 h-6" />}
          >
            <div className="space-y-6">
              {/* Pricing Summary */}
              <Card className="p-6 bg-gradient-to-r from-[#00d4ff]/10 to-[#00ff88]/10 border border-[#00d4ff]/30">
                <h3 className="text-xl font-bold text-white mb-4">
                  {data.language === 'ar' ? 'ملخص التكلفة' : 'Pricing Summary'}
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>{SERVICE_TIERS[data.tier!].name}</span>
                    <span>${SERVICE_TIERS[data.tier!].price.toLocaleString()}</span>
                  </div>
                  {data.urgency !== 'standard' && (
                    <div className="flex justify-between">
                      <span>
                        {data.urgency === 'urgent' ? 
                          (data.language === 'ar' ? 'رسوم عاجل' : 'Urgent Fee') :
                          (data.language === 'ar' ? 'رسوم طارئ' : 'Emergency Fee')
                        }
                      </span>
                      <span>+{data.urgency === 'urgent' ? '50%' : '100%'}</span>
                    </div>
                  )}
                  <div className="border-t border-gray-600 pt-3 flex justify-between font-bold text-lg">
                    <span>{data.language === 'ar' ? 'المجموع' : 'Total'}</span>
                    <span className="text-[#00ff88]">${getEstimatedPrice().toLocaleString()}</span>
                  </div>
                  <div className="text-center text-[#00d4ff]">
                    {data.language === 'ar' ? 'وقت التسليم المقدر:' : 'Estimated delivery:'} {getEstimatedTime()}
                  </div>
                </div>
              </Card>

              {/* Custom Requirements */}
              <div>
                <Label>{data.language === 'ar' ? 'متطلبات إضافية (اختياري)' : 'Additional Requirements (Optional)'}</Label>
                <Textarea
                  value={data.customRequirements || ''}
                  onChange={(e) => updateData({ customRequirements: e.target.value })}
                  placeholder={data.language === 'ar' 
                    ? 'أي متطلبات خاصة أو تفاصيل إضافية تريد ذكرها...'
                    : 'Any special requirements or additional details you want to mention...'
                  }
                  className="mt-2 h-24"
                />
              </div>

              {/* Domain Information */}
              <div>
                <div className="flex items-center space-x-3 mb-3">
                  <Checkbox
                    id="has-domain"
                    checked={data.hasDomain}
                    onCheckedChange={(checked) => updateData({ hasDomain: !!checked })}
                  />
                  <Label htmlFor="has-domain">
                    {data.language === 'ar' ? 'لدي اسم نطاق' : 'I have a domain name'}
                  </Label>
                </div>
                
                {data.hasDomain && (
                  <Input
                    value={data.domainName || ''}
                    onChange={(e) => updateData({ domainName: e.target.value })}
                    placeholder="example.com"
                    className="mt-2"
                  />
                )}
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4">
                  <h4 className="font-bold text-white mb-2">
                    {data.language === 'ar' ? 'تفاصيل المشروع' : 'Project Details'}
                  </h4>
                  <div className="space-y-1 text-sm text-gray-300">
                    <div>📋 {data.businessName}</div>
                    <div>⚡ {SERVICE_TIERS[data.tier!].name}</div>
                    <div>🛍️ {data.platform}</div>
                    <div>📦 {data.productCount} products</div>
                    <div>🎨 {data.designStyle} style</div>
                  </div>
                </Card>
                
                <Card className="p-4">
                  <h4 className="font-bold text-white mb-2">
                    {data.language === 'ar' ? 'تفاصيل الاتصال' : 'Contact Details'}
                  </h4>
                  <div className="space-y-1 text-sm text-gray-300">
                    <div>👤 {data.ownerName}</div>
                    <div>📧 {data.email}</div>
                    <div>📱 {data.phone}</div>
                    {data.whatsapp && <div>💬 {data.whatsapp}</div>}
                    <div>🌍 {data.country}</div>
                  </div>
                </Card>
              </div>

              {/* Final confirmation */}
              <Card className="p-6 border border-[#00ff88]/30">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-4">
                    {data.language === 'ar' ? 'هل أنت جاهز للبدء؟' : 'Ready to get started?'}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    {data.language === 'ar' 
                      ? 'سنبدأ العمل على متجرك فور تأكيد الطلب والدفع'
                      : 'We\'ll start building your store immediately after order confirmation and payment'
                    }
                  </p>
                  <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Shield className="w-4 h-4" />
                      {data.language === 'ar' ? 'آمن 100%' : '100% Secure'}
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      {data.language === 'ar' ? 'دعم مباشر' : 'Live Support'}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      {data.language === 'ar' ? 'ضمان الجودة' : 'Quality Guaranteed'}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </StepWrapper>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">
              {data.language === 'ar' ? 'خطوة' : 'Step'} {currentStep} {data.language === 'ar' ? 'من' : 'of'} {totalSteps}
            </span>
            <span className="text-sm text-gray-400">
              {Math.round((currentStep / totalSteps) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-[#00d4ff] to-[#00ff88] h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={isFirstStep}
            className="border-gray-600 text-gray-400 hover:border-gray-400"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            {data.language === 'ar' ? 'السابق' : 'Previous'}
          </Button>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="border-gray-600 text-gray-400 hover:border-gray-400"
            >
              {data.language === 'ar' ? 'حفظ للاحقاً' : 'Save for Later'}
            </Button>

            {isLastStep ? (
              <Button
                onClick={handleComplete}
                disabled={!isValidData(data)}
                className="bg-gradient-to-r from-[#00d4ff] to-[#00ff88] text-black hover:shadow-lg hover:shadow-[#00d4ff]/50"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                {data.language === 'ar' ? 'إرسال الطلب' : 'Submit Order'}
              </Button>
            ) : (
              <Button
                onClick={nextStep}
                className="bg-[#00d4ff] text-black hover:bg-[#00ff88]"
              >
                {data.language === 'ar' ? 'التالي' : 'Next'}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component for consistent step layout
function StepWrapper({ 
  title, 
  description, 
  icon, 
  children 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
  children: React.ReactNode; 
}) {
  return (
    <Card className="p-8 bg-[#1a1a1a] border border-gray-800">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-[#00d4ff]/20 rounded-lg text-[#00d4ff]">
          {icon}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <p className="text-gray-400">{description}</p>
        </div>
      </div>
      {children}
    </Card>
  );
}

export default ClientOnboardingForm;