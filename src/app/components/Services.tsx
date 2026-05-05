import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingCart, 
  Bot, 
  FileText, 
  Search, 
  CheckCircle, 
  Clock, 
  Star, 
  Globe,
  Zap,
  Code,
  MessageCircle,
  Mail,
  Phone,
  Shield,
  BarChart3,
  Settings,
  Users,
  Palette,
  CreditCard,
  Cloud,
  Database,
  Smartphone,
  Monitor,
  Headphones,
  Award,
  TrendingUp,
  Briefcase,
  GraduationCap,
  Lock,
  Timer,
  DollarSign,
  Activity,
  ArrowRight,
  Play,
  Download,
  ExternalLink
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { useLanguage } from '../contexts/LanguageContext';
import { RTLContainer } from './LanguageSwitcher';

interface ServicesProps {
  onNavigate?: (section: string) => void;
}

type Region = 'usa' | 'saudi' | 'uae' | 'other';
type ServiceCategory = 'ecommerce' | 'automation' | 'ai-tools' | 'analytics' | 'support';

interface ServicePlan {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  description: string;
  features: string[];
  popular?: boolean;
  enterprise?: boolean;
  icon: React.ReactNode;
  category: ServiceCategory;
  deliveryTime: string;
  support: string;
  platforms: string[];
}

export function Services({ onNavigate }: ServicesProps) {
  const { isRTL, language } = useLanguage();
  const [selectedRegion, setSelectedRegion] = useState<Region>('usa');
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('ecommerce');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 32 });

  // Auto-detect user region based on timezone
  useEffect(() => {
    const detectRegion = () => {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (timezone.includes('Riyadh') || timezone.includes('Saudi')) {
        setSelectedRegion('saudi');
      } else if (timezone.includes('Dubai') || timezone.includes('UAE')) {
        setSelectedRegion('uae');
      }
    };
    detectRegion();
  }, []);

  // Countdown timer for special offers
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 }; // Reset after 24 hours
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const servicePlans: ServicePlan[] = [
    {
      id: 'shopify-pro',
      name: 'Shopify Pro Store',
      price: selectedRegion === 'usa' ? '$1,299' : '4,899 SAR',
      originalPrice: selectedRegion === 'usa' ? '$1,999' : '7,499 SAR',
      description: 'Complete Shopify store with premium theme, payment integration, and SEO optimization. Ready to launch in 90 minutes.',
      features: [
        'Premium Shopify theme customization',
        'Payment gateway integration (Stripe, PayPal, Local)',
        'Mobile-responsive design optimization',
        'Advanced SEO setup and optimization',
        'Product catalog setup (up to 100 products)',
        'Social media integration',
        '30-day post-launch support',
        'Free SSL certificate and domain setup',
        'Analytics and conversion tracking',
        'Automated email marketing setup'
      ],
      popular: true,
      icon: <ShoppingCart className="w-8 h-8 text-[#00d4ff]" />,
      category: 'ecommerce',
      deliveryTime: '90 minutes',
      support: '30 days included',
      platforms: ['Shopify', 'Web', 'Mobile']
    },
    {
      id: 'woocommerce-enterprise',
      name: 'WooCommerce Enterprise',
      price: selectedRegion === 'usa' ? '$1,899' : '7,149 SAR',
      originalPrice: selectedRegion === 'usa' ? '$2,499' : '9,499 SAR',
      description: 'Advanced WordPress WooCommerce solution with custom plugins, advanced analytics, and enterprise features.',
      features: [
        'Custom WordPress theme development',
        'Advanced WooCommerce configuration',
        'Multi-currency and multi-language support',
        'Inventory management system',
        'Advanced reporting dashboard',
        'Custom plugin development',
        'Server optimization and security',
        'CDN setup and performance optimization',
        '60-day enterprise support',
        'Staff training and documentation'
      ],
      enterprise: true,
      icon: <Globe className="w-8 h-8 text-[#00d4ff]" />,
      category: 'ecommerce',
      deliveryTime: '2-3 hours',
      support: '60 days included',
      platforms: ['WordPress', 'WooCommerce', 'Web']
    },
    {
      id: 'automation-suite',
      name: 'N8N Automation Suite',
      price: selectedRegion === 'usa' ? '$499' : '1,899 SAR',
      description: 'Complete business automation with 50+ pre-built workflows, custom integrations, and 24/7 monitoring.',
      features: [
        '50+ pre-built automation workflows',
        'Custom workflow development',
        'Multi-platform integrations',
        'Real-time monitoring dashboard',
        'Error handling and notifications',
        'Data synchronization across platforms',
        'Scheduled task management',
        'API integrations and webhooks',
        '90-day automation support',
        'Performance optimization'
      ],
      icon: <Bot className="w-8 h-8 text-[#00d4ff]" />,
      category: 'automation',
      deliveryTime: '2 hours',
      support: '90 days included',
      platforms: ['N8N', 'Zapier', 'Custom APIs']
    },
    {
      id: 'ai-assistant-pro',
      name: 'AI Assistant Pro',
      price: selectedRegion === 'usa' ? '$299/mo' : '1,149 SAR/mo',
      description: 'Vertex AI-powered assistant with custom training, multi-language support, and advanced analytics.',
      features: [
        'Custom AI model training',
        'Multi-language conversation support',
        'Advanced NLP and understanding',
        'Integration with existing systems',
        'Real-time learning and adaptation',
        'Analytics and conversation insights',
        'WhatsApp and web chat integration',
        'Voice message processing',
        'Custom personality and branding',
        '24/7 AI monitoring and optimization'
      ],
      popular: true,
      icon: <MessageCircle className="w-8 h-8 text-[#00d4ff]" />,
      category: 'ai-tools',
      deliveryTime: '4-6 hours',
      support: 'Ongoing optimization',
      platforms: ['Web', 'WhatsApp', 'API']
    },
    {
      id: 'analytics-dashboard',
      name: 'Advanced Analytics Dashboard',
      price: selectedRegion === 'usa' ? '$199/mo' : '749 SAR/mo',
      description: 'Real-time business intelligence with custom KPIs, automated reports, and predictive analytics.',
      features: [
        'Real-time data visualization',
        'Custom KPI tracking',
        'Automated report generation',
        'Predictive analytics and trends',
        'Multi-source data integration',
        'Interactive dashboards',
        'Mobile-responsive analytics',
        'Scheduled email reports',
        'Data export and API access',
        'Advanced filtering and segmentation'
      ],
      icon: <BarChart3 className="w-8 h-8 text-[#00d4ff]" />,
      category: 'analytics',
      deliveryTime: '3-4 hours',
      support: 'Monthly optimization',
      platforms: ['Web', 'Mobile', 'API']
    },
    {
      id: 'enterprise-support',
      name: 'Enterprise Support Package',
      price: selectedRegion === 'usa' ? '$99/mo' : '379 SAR/mo',
      description: '24/7 priority support with dedicated account manager, monthly consultations, and emergency response.',
      features: [
        '24/7 priority technical support',
        'Dedicated account manager',
        'Monthly strategy consultations',
        'Emergency response (< 2 hours)',
        'Performance monitoring and alerts',
        'Security audits and updates',
        'Backup and disaster recovery',
        'System optimization recommendations',
        'Training and knowledge transfer',
        'Custom development hours included'
      ],
      enterprise: true,
      icon: <Headphones className="w-8 h-8 text-[#00d4ff]" />,
      category: 'support',
      deliveryTime: 'Immediate activation',
      support: 'Ongoing 24/7',
      platforms: ['All Platforms']
    }
  ];

  const categories = [
    { id: 'ecommerce', name: language === 'ar' ? 'التجارة الإلكترونية' : 'E-Commerce', icon: <ShoppingCart className="w-5 h-5" /> },
    { id: 'automation', name: language === 'ar' ? 'الأتمتة' : 'Automation', icon: <Bot className="w-5 h-5" /> },
    { id: 'ai-tools', name: language === 'ar' ? 'أدوات الذكاء الاصطناعي' : 'AI Tools', icon: <MessageCircle className="w-5 h-5" /> },
    { id: 'analytics', name: language === 'ar' ? 'التحليلات' : 'Analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'support', name: language === 'ar' ? 'الدعم' : 'Support', icon: <Headphones className="w-5 h-5" /> }
  ];

  const filteredServices = servicePlans.filter(service => {
    const matchesCategory = selectedCategory === 'ecommerce' ? true : service.category === selectedCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = priceFilter === 'all' || 
                        (priceFilter === 'low' && service.price.includes('99')) ||
                        (priceFilter === 'mid' && (service.price.includes('299') || service.price.includes('499'))) ||
                        (priceFilter === 'high' && (service.price.includes('1299') || service.price.includes('1899')));
    
    return matchesCategory && matchesSearch && matchesPrice;
  });

  const handleGetStarted = (serviceId: string) => {
    console.log(`Starting service: ${serviceId}`);
    if (onNavigate) {
      onNavigate('auth');
    }
  };

  const handleLearnMore = (serviceId: string) => {
    console.log(`Learning more about: ${serviceId}`);
    if (onNavigate) {
      onNavigate('contact');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#C0C5CE] font-mono relative overflow-hidden">
      {/* ✅ FIXED: Terminal grid background with proper opacity */}
      <div className="fixed inset-0 enterprise-grid opacity-10 pointer-events-none"></div>
      
      {/* ✅ FIXED: Matrix rain effect with proper colors */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute text-[#00d4ff] text-xs font-mono opacity-20 matrix-effect"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 3}s`
            }}
          >
            {Array.from({ length: 30 }, () => 
              Math.random() > 0.5 ? '1' : '0'
            ).join('')}
          </div>
        ))}
      </div>

      <RTLContainer className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        {/* ✅ FIXED: Header with proper terminal styling */}
        <div className={`text-center mb-16 space-y-8 ${isRTL ? 'text-right' : 'text-left'}`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center space-x-2 bg-[#12151C] border border-[#00d4ff]/30 rounded-lg px-4 py-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse"></div>
              <span className="text-[#00ff88] text-sm font-mono">
                {language === 'ar' ? 'خدمات مباشرة متاحة' : 'Live Services Available'}
              </span>
              <Separator orientation="vertical" className="h-4 bg-[#C0C5CE]/20" />
              <Clock className="w-4 h-4 text-[#00d4ff]" />
              <span className="text-[#00d4ff] text-sm font-mono">
                {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-[#C0C5CE] mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#00ff88]">
                {language === 'ar' ? 'خدماتنا المتقدمة' : 'Enterprise Services'}
              </span>
            </h1>
            
            <p className="text-xl text-[#C0C5CE]/80 max-w-4xl mx-auto leading-relaxed">
              {language === 'ar' 
                ? 'حلول تكنولوجية متكاملة للأعمال التجارية الحديثة. نقوم بتطوير وإطلاق مشاريعكم في وقت قياسي مع ضمان الجودة العالية.'
                : 'Comprehensive technology solutions for modern businesses. We build and launch your projects in record time with guaranteed quality.'
              }
            </p>

            {/* ✅ FIXED: Special offer banner with terminal styling */}
            <div className="bg-gradient-to-r from-[#00d4ff]/20 to-[#00ff88]/20 border border-[#00d4ff]/50 rounded-lg p-4 max-w-2xl mx-auto">
              <div className="flex items-center justify-center space-x-3 text-[#00ff88]">
                <Star className="w-5 h-5" />
                <span className="font-bold">
                  {language === 'ar' ? 'عرض محدود: خصم 35% على جميع الخدمات' : 'Limited Time: 35% OFF All Services'}
                </span>
                <Star className="w-5 h-5" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* ✅ FIXED: Filters and search with explicit terminal styling */}
        <div className="mb-12">
          <Card className="bg-[#12151C] border-[#00d4ff]/30 p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Search */}
              <div className="space-y-2">
                <label className="text-[#C0C5CE] text-sm font-mono font-medium">
                  {language === 'ar' ? 'البحث' : 'Search Services'}
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#C0C5CE]/50" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={language === 'ar' ? 'ابحث عن خدمة...' : 'Search for a service...'}
                    className="bg-[#0a0a0a] border-[#C0C5CE]/20 text-[#C0C5CE] font-mono pl-10 focus:border-[#00d4ff] focus:ring-2 focus:ring-[#00d4ff]/20 placeholder:text-[#C0C5CE]/50"
                  />
                </div>
              </div>

              {/* Region */}
              <div className="space-y-2">
                <label className="text-[#C0C5CE] text-sm font-mono font-medium">
                  {language === 'ar' ? 'المنطقة' : 'Region'}
                </label>
                <Select value={selectedRegion} onValueChange={(value: Region) => setSelectedRegion(value)}>
                  <SelectTrigger className="bg-[#0a0a0a] border-[#C0C5CE]/20 text-[#C0C5CE] font-mono focus:border-[#00d4ff] focus:ring-2 focus:ring-[#00d4ff]/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#12151C] border-[#C0C5CE]/20 text-[#C0C5CE]">
                    <SelectItem value="usa">🇺🇸 United States</SelectItem>
                    <SelectItem value="saudi">🇸🇦 Saudi Arabia</SelectItem>
                    <SelectItem value="uae">🇦🇪 UAE</SelectItem>
                    <SelectItem value="other">🌍 Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price Filter */}
              <div className="space-y-2">
                <label className="text-[#C0C5CE] text-sm font-mono font-medium">
                  {language === 'ar' ? 'السعر' : 'Price Range'}
                </label>
                <Select value={priceFilter} onValueChange={setPriceFilter}>
                  <SelectTrigger className="bg-[#0a0a0a] border-[#C0C5CE]/20 text-[#C0C5CE] font-mono focus:border-[#00d4ff] focus:ring-2 focus:ring-[#00d4ff]/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#12151C] border-[#C0C5CE]/20 text-[#C0C5CE]">
                    <SelectItem value="all">{language === 'ar' ? 'جميع الأسعار' : 'All Prices'}</SelectItem>
                    <SelectItem value="low">{language === 'ar' ? 'أقل من 200$' : 'Under $200'}</SelectItem>
                    <SelectItem value="mid">{language === 'ar' ? '200$ - 500$' : '$200 - $500'}</SelectItem>
                    <SelectItem value="high">{language === 'ar' ? 'أكثر من 500$' : 'Over $500'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Quick Actions */}
              <div className="space-y-2">
                <label className="text-[#C0C5CE] text-sm font-mono font-medium">
                  {language === 'ar' ? 'إجراءات سريعة' : 'Quick Actions'}
                </label>
                <div className="flex space-x-2">
                  <Button 
                    size="sm"
                    className="bg-[#00d4ff] text-[#0a0a0a] hover:bg-[#00ff88] font-mono px-3 py-2 rounded text-xs font-medium transition-all"
                    onClick={() => onNavigate?.('contact')}
                  >
                    <Phone className="w-3 h-3 mr-1" />
                    {language === 'ar' ? 'اتصل' : 'Call'}
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="border-[#C0C5CE]/20 text-[#C0C5CE] hover:bg-[#00d4ff]/10 hover:text-[#00d4ff] font-mono px-3 py-2 rounded text-xs font-medium transition-all"
                    onClick={() => onNavigate?.('help')}
                  >
                    <MessageCircle className="w-3 h-3 mr-1" />
                    {language === 'ar' ? 'دردشة' : 'Chat'}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* ✅ FIXED: Category tabs with explicit terminal styling */}
        <div className="mb-12">
          <Tabs value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as ServiceCategory)}>
            <TabsList className="bg-[#12151C] border-[#C0C5CE]/20 p-1 rounded-lg grid grid-cols-5 w-full">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="flex items-center space-x-2 text-[#C0C5CE] font-mono data-[state=active]:bg-[#00d4ff] data-[state=active]:text-[#0a0a0a] transition-all px-4 py-2 rounded"
                >
                  {category.icon}
                  <span className="hidden sm:inline">{category.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* ✅ FIXED: Services grid with proper terminal styling */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
          >
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="bg-[#12151C] border-[#C0C5CE]/20 hover:border-[#00d4ff] transition-all duration-300 hover:shadow-lg hover:shadow-[#00d4ff]/20 relative overflow-hidden group">
                  {/* ✅ FIXED: Popular/Enterprise badges with explicit styling */}
                  {service.popular && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-[#00d4ff] to-[#00ff88] text-[#0a0a0a] px-3 py-1 rounded-full text-xs font-bold font-mono">
                      {language === 'ar' ? 'الأكثر شعبية' : 'POPULAR'}
                    </div>
                  )}
                  
                  {service.enterprise && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-[#00ff88] to-[#00d4ff] text-[#0a0a0a] px-3 py-1 rounded-full text-xs font-bold font-mono">
                      {language === 'ar' ? 'المؤسسات' : 'ENTERPRISE'}
                    </div>
                  )}

                  <div className="p-8">
                    {/* ✅ FIXED: Service header with proper terminal colors */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-[#00d4ff]/20 rounded-xl flex items-center justify-center group-hover:bg-[#00d4ff]/30 transition-all">
                          {service.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-[#C0C5CE] font-mono mb-2 group-hover:text-[#00d4ff] transition-all">
                            {service.name}
                          </h3>
                          <div className="flex items-center space-x-2">
                            {service.originalPrice && (
                              <span className="text-[#C0C5CE]/50 line-through text-sm font-mono">
                                {service.originalPrice}
                              </span>
                            )}
                            <span className="text-2xl font-bold text-[#00ff88] font-mono">
                              {service.price}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ✅ FIXED: Service description with proper typography */}
                    <p className="text-[#C0C5CE]/80 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    {/* ✅ FIXED: Service meta information */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center space-x-2 text-sm">
                        <Clock className="w-4 h-4 text-[#00d4ff]" />
                        <span className="text-[#C0C5CE]/70 font-mono">{service.deliveryTime}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Headphones className="w-4 h-4 text-[#00ff88]" />
                        <span className="text-[#C0C5CE]/70 font-mono">{service.support}</span>
                      </div>
                    </div>

                    {/* ✅ FIXED: Platform badges with terminal styling */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {service.platforms.map((platform, idx) => (
                        <Badge
                          key={idx}
                          className="bg-[#0a0a0a] border border-[#00d4ff]/30 text-[#00d4ff] font-mono text-xs px-2 py-1"
                        >
                          {platform}
                        </Badge>
                      ))}
                    </div>

                    {/* ✅ FIXED: Features list with proper styling */}
                    <div className="space-y-3 mb-8">
                      <h4 className="text-[#00ff88] font-mono text-sm font-medium">
                        {language === 'ar' ? 'الميزات المتضمنة:' : 'Included Features:'}
                      </h4>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {service.features.slice(0, 6).map((feature, idx) => (
                          <div key={idx} className="flex items-start space-x-3">
                            <CheckCircle className="w-4 h-4 text-[#00ff88] mt-0.5 flex-shrink-0" />
                            <span className="text-[#C0C5CE]/80 text-sm leading-relaxed">
                              {feature}
                            </span>
                          </div>
                        ))}
                        {service.features.length > 6 && (
                          <div className="text-[#00d4ff] text-sm font-mono">
                            +{service.features.length - 6} more features
                          </div>
                        )}
                      </div>
                    </div>

                    {/* ✅ FIXED: Action buttons with explicit terminal styling */}
                    <div className="space-y-3">
                      <Button
                        onClick={() => handleGetStarted(service.id)}
                        className="w-full bg-[#00d4ff] text-[#0a0a0a] hover:bg-[#00ff88] font-mono font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-[#00d4ff]/30"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        {language === 'ar' ? 'ابدأ الآن' : 'Get Started'}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                      
                      <Button
                        onClick={() => handleLearnMore(service.id)}
                        variant="outline"
                        className="w-full border-[#C0C5CE]/20 text-[#C0C5CE] hover:bg-[#00d4ff]/10 hover:text-[#00d4ff] hover:border-[#00d4ff] font-mono py-3 px-6 rounded-lg transition-all"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        {language === 'ar' ? 'تفاصيل أكثر' : 'Learn More'}
                      </Button>
                    </div>
                  </div>

                  {/* ✅ FIXED: Hover overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00d4ff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"></div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ✅ FIXED: Call to action section with terminal styling */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <Card className="bg-[#12151C] border-[#00d4ff]/30 p-12 relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-[#C0C5CE] font-mono mb-4">
                {language === 'ar' ? 'هل تحتاج حلاً مخصصاً؟' : 'Need a Custom Solution?'}
              </h2>
              <p className="text-xl text-[#C0C5CE]/80 mb-8 max-w-2xl mx-auto">
                {language === 'ar' 
                  ? 'تحدث مع خبرائنا لتطوير حل تقني مخصص يناسب احتياجات عملك تماماً'
                  : 'Talk to our experts to develop a custom technology solution that perfectly fits your business needs'
                }
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Button
                  onClick={() => onNavigate?.('contact')}
                  size="lg"
                  className="bg-[#00d4ff] text-[#0a0a0a] hover:bg-[#00ff88] font-mono font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-105"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {language === 'ar' ? 'تحدث معنا' : 'Talk to Expert'}
                </Button>
                
                <Button
                  onClick={() => onNavigate?.('help')}
                  variant="outline"
                  size="lg"
                  className="border-[#C0C5CE]/20 text-[#C0C5CE] hover:bg-[#00d4ff]/10 hover:text-[#00d4ff] hover:border-[#00d4ff] font-mono py-4 px-8 rounded-lg transition-all"
                >
                  <Download className="w-5 h-5 mr-2" />
                  {language === 'ar' ? 'تحميل البروشور' : 'Download Brochure'}
                </Button>
              </div>
            </div>

            {/* ✅ FIXED: Background decoration with terminal colors */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-4 left-4 w-8 h-8 border-2 border-[#00d4ff] rounded-full"></div>
              <div className="absolute top-12 right-8 w-4 h-4 border-2 border-[#00ff88] rotate-45"></div>
              <div className="absolute bottom-8 left-12 w-6 h-6 border-2 border-[#00d4ff] rotate-12"></div>
              <div className="absolute bottom-4 right-4 w-10 h-10 border-2 border-[#00ff88] rounded-full"></div>
            </div>
          </Card>
        </motion.div>
      </RTLContainer>
    </div>
  );
}

export default Services;