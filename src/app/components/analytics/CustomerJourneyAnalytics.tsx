import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { useLanguage } from '../../contexts/LanguageContext';
import { RTLContainer } from '../LanguageSwitcher';
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Globe,
  Clock,
  Target,
  Zap,
  Eye,
  MousePointer,
  ShoppingCart,
  CreditCard,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ArrowRight,
  ArrowDown,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  Download,
  Share,
  Filter,
  Calendar,
  Search,
  Settings,
  Brain,
  Sparkles,
  Activity,
  MapPin,
  Smartphone,
  Monitor,
  Tablet,
  ExternalLink,
  Info,
  Plus,
  Minus,
  RefreshCw,
  PieChart,
  LineChart,
  BarChart,
  Layers,
  Package,
  DollarSign,
  Star,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Mail,
  Phone
} from 'lucide-react';

// ✅ ENHANCED: Customer journey analytics interfaces
interface JourneyStage {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  position: number;
  visitors: number;
  conversions: number;
  conversionRate: number;
  averageTime: number;
  dropoffRate: number;
  revenue: number;
  devices: {
    desktop: number;
    mobile: number;
    tablet: number;
  };
  sources: {
    organic: number;
    paid: number;
    social: number;
    direct: number;
    referral: number;
  };
}

interface CustomerSegment {
  id: string;
  name: string;
  nameAr: string;
  count: number;
  percentage: number;
  avgValue: number;
  conversionRate: number;
  retentionRate: number;
  satisfactionScore: number;
  characteristics: string[];
  characteristicsAr: string[];
  color: string;
  trends: Array<{
    date: Date;
    value: number;
    conversions: number;
  }>;
}

interface JourneyInsight {
  id: string;
  type: 'opportunity' | 'bottleneck' | 'trend' | 'anomaly';
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  impact: number;
  confidence: number;
  recommendation: string;
  recommendationAr: string;
  potentialImprovement: number;
  timeframe: string;
  automated: boolean;
}

interface JourneyMetrics {
  totalVisitors: number;
  totalConversions: number;
  overallConversionRate: number;
  averageJourneyTime: number;
  totalRevenue: number;
  averageOrderValue: number;
  customerLifetimeValue: number;
  churnRate: number;
  npsScore: number;
}

// ✅ ENHANCED: Mock journey data with real e-commerce flow
const journeyStages: JourneyStage[] = [
  {
    id: 'awareness',
    name: 'Awareness',
    nameAr: 'الوعي',
    description: 'First interaction with brand through various channels',
    descriptionAr: 'أول تفاعل مع العلامة التجارية عبر قنوات مختلفة',
    position: 1,
    visitors: 24750,
    conversions: 18560,
    conversionRate: 75.0,
    averageTime: 45,
    dropoffRate: 25.0,
    revenue: 0,
    devices: { desktop: 45, mobile: 42, tablet: 13 },
    sources: { organic: 35, paid: 28, social: 18, direct: 12, referral: 7 }
  },
  {
    id: 'interest',
    name: 'Interest',
    nameAr: 'الاهتمام',
    description: 'Exploring products and services, reading content',
    descriptionAr: 'استكشاف المنتجات والخدمات، قراءة المحتوى',
    position: 2,
    visitors: 18560,
    conversions: 12947,
    conversionRate: 69.7,
    averageTime: 180,
    dropoffRate: 30.3,
    revenue: 0,
    devices: { desktop: 52, mobile: 38, tablet: 10 },
    sources: { organic: 42, paid: 25, social: 16, direct: 11, referral: 6 }
  },
  {
    id: 'consideration',
    name: 'Consideration',
    nameAr: 'الاعتبار',
    description: 'Comparing options, viewing product details',
    descriptionAr: 'مقارنة الخيارات، عرض تفاصيل المنتج',
    position: 3,
    visitors: 12947,
    conversions: 8461,
    conversionRate: 65.3,
    averageTime: 420,
    dropoffRate: 34.7,
    revenue: 0,
    devices: { desktop: 58, mobile: 33, tablet: 9 },
    sources: { organic: 48, paid: 22, social: 14, direct: 10, referral: 6 }
  },
  {
    id: 'intent',
    name: 'Purchase Intent',
    nameAr: 'نية الشراء',
    description: 'Adding to cart, creating account, entering checkout',
    descriptionAr: 'إضافة إلى العربة، إنشاء حساب، دخول الدفع',
    position: 4,
    visitors: 8461,
    conversions: 5538,
    conversionRate: 65.4,
    averageTime: 600,
    dropoffRate: 34.6,
    revenue: 0,
    devices: { desktop: 61, mobile: 31, tablet: 8 },
    sources: { organic: 52, paid: 20, social: 12, direct: 10, referral: 6 }
  },
  {
    id: 'purchase',
    name: 'Purchase',
    nameAr: 'الشراء',
    description: 'Completing payment and order confirmation',
    descriptionAr: 'إكمال الدفع وتأكيد الطلب',
    position: 5,
    visitors: 5538,
    conversions: 4692,
    conversionRate: 84.7,
    averageTime: 480,
    dropoffRate: 15.3,
    revenue: 1876500,
    devices: { desktop: 67, mobile: 26, tablet: 7 },
    sources: { organic: 55, paid: 18, social: 11, direct: 10, referral: 6 }
  },
  {
    id: 'retention',
    name: 'Retention',
    nameAr: 'الاحتفاظ',
    description: 'Post-purchase engagement and repeat purchases',
    descriptionAr: 'التفاعل بعد الشراء والمشتريات المتكررة',
    position: 6,
    visitors: 4692,
    conversions: 1877,
    conversionRate: 40.0,
    averageTime: 1200,
    dropoffRate: 60.0,
    revenue: 892400,
    devices: { desktop: 58, mobile: 35, tablet: 7 },
    sources: { organic: 45, paid: 15, social: 20, direct: 15, referral: 5 }
  }
];

const customerSegments: CustomerSegment[] = [
  {
    id: 'high-value',
    name: 'High-Value Customers',
    nameAr: 'عملاء عالي القيمة',
    count: 1247,
    percentage: 18.5,
    avgValue: 1250,
    conversionRate: 12.4,
    retentionRate: 89.2,
    satisfactionScore: 4.8,
    characteristics: ['Enterprise clients', 'Multiple purchases', 'Premium features'],
    characteristicsAr: ['عملاء مؤسسيون', 'مشتريات متعددة', 'ميزات متميزة'],
    color: '#00ff88',
    trends: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000),
      value: 1200 + Math.random() * 100,
      conversions: 12 + Math.random() * 3
    }))
  },
  {
    id: 'frequent-buyers',
    name: 'Frequent Buyers',
    nameAr: 'مشترون متكررون',
    count: 2847,
    percentage: 42.3,
    avgValue: 450,
    conversionRate: 8.7,
    retentionRate: 67.5,
    satisfactionScore: 4.3,
    characteristics: ['Regular purchases', 'Mid-tier services', 'Good engagement'],
    characteristicsAr: ['مشتريات منتظمة', 'خدمات متوسطة', 'تفاعل جيد'],
    color: '#00d4ff',
    trends: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000),
      value: 420 + Math.random() * 60,
      conversions: 8 + Math.random() * 2
    }))
  },
  {
    id: 'price-sensitive',
    name: 'Price-Sensitive',
    nameAr: 'حساس للسعر',
    count: 1876,
    percentage: 27.8,
    avgValue: 180,
    conversionRate: 4.2,
    retentionRate: 34.8,
    satisfactionScore: 3.9,
    characteristics: ['Basic plans', 'Promotional purchases', 'Price comparison'],
    characteristicsAr: ['خطط أساسية', 'مشتريات ترويجية', 'مقارنة أسعار'],
    color: '#fbbf24',
    trends: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000),
      value: 160 + Math.random() * 40,
      conversions: 3 + Math.random() * 2
    }))
  },
  {
    id: 'new-customers',
    name: 'New Customers',
    nameAr: 'عملاء جدد',
    count: 782,
    percentage: 11.4,
    avgValue: 320,
    conversionRate: 6.1,
    retentionRate: 45.2,
    satisfactionScore: 4.1,
    characteristics: ['First-time buyers', 'Exploring features', 'Trial usage'],
    characteristicsAr: ['مشترون لأول مرة', 'استكشاف الميزات', 'استخدام تجريبي'],
    color: '#8b5cf6',
    trends: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000),
      value: 300 + Math.random() * 40,
      conversions: 5 + Math.random() * 2
    }))
  }
];

const journeyInsights: JourneyInsight[] = [
  {
    id: 'insight-001',
    type: 'bottleneck',
    title: 'Checkout Abandonment Peak',
    titleAr: 'ذروة التخلي عن الدفع',
    description: 'Mobile checkout abandonment rate increased 23% in the last week',
    descriptionAr: 'معدل التخلي عن الدفع على الجوال زاد 23% في الأسبوع الماضي',
    impact: 87,
    confidence: 94,
    recommendation: 'Implement one-click checkout for mobile users and optimize payment flow',
    recommendationAr: 'تطبيق دفع بنقرة واحدة لمستخدمي الجوال وتحسين تدفق الدفع',
    potentialImprovement: 18.5,
    timeframe: '1-2 weeks',
    automated: false
  },
  {
    id: 'insight-002',
    type: 'opportunity',
    title: 'High-Value Segment Growth',
    titleAr: 'نمو شريحة عالية القيمة',
    description: 'Enterprise segment showing 34% month-over-month growth potential',
    descriptionAr: 'شريحة المؤسسات تظهر إمكانية نمو 34% شهرياً',
    impact: 92,
    confidence: 89,
    recommendation: 'Increase enterprise-focused marketing and develop premium features',
    recommendationAr: 'زيادة التسويق المركز على المؤسسات وتطوير ميزات متميزة',
    potentialImprovement: 28.7,
    timeframe: '3-4 weeks',
    automated: true
  },
  {
    id: 'insight-003',
    type: 'trend',
    title: 'Voice Search Adoption',
    titleAr: 'اعتماد البحث الصوتي',
    description: 'Voice search traffic increased 156% among Arabic-speaking users',
    descriptionAr: 'زيادة حركة البحث الصوتي 156% بين المستخدمين الناطقين بالعربية',
    impact: 74,
    confidence: 82,
    recommendation: 'Optimize content for voice search and implement voice navigation',
    recommendationAr: 'تحسين المحتوى للبحث الصوتي وتطبيق التنقل الصوتي',
    potentialImprovement: 15.3,
    timeframe: '2-3 weeks',
    automated: false
  }
];

export function CustomerJourneyAnalytics({ onNavigate }: { onNavigate?: (section: string) => void }) {
  const { isRTL, language } = useLanguage();
  const [selectedView, setSelectedView] = useState<'overview' | 'journey' | 'segments' | 'insights' | 'optimization'>('overview');
  const [selectedTimeframe, setSelectedTimeframe] = useState<'24h' | '7d' | '30d' | '90d'>('30d');
  const [selectedSegment, setSelectedSegment] = useState<CustomerSegment | null>(null);
  const [selectedStage, setSelectedStage] = useState<JourneyStage | null>(null);
  const [isRealTimeEnabled, setIsRealTimeEnabled] = useState(true);
  const [journeyMetrics, setJourneyMetrics] = useState<JourneyMetrics>({
    totalVisitors: 24750,
    totalConversions: 4692,
    overallConversionRate: 19.0,
    averageJourneyTime: 2.4,
    totalRevenue: 2768900,
    averageOrderValue: 590,
    customerLifetimeValue: 1247,
    churnRate: 23.5,
    npsScore: 73
  });

  // ✅ ENHANCED: Real-time analytics simulation
  useEffect(() => {
    if (!isRealTimeEnabled) return;

    const interval = setInterval(() => {
      setJourneyMetrics(prev => ({
        ...prev,
        totalVisitors: prev.totalVisitors + Math.floor(Math.random() * 10),
        totalConversions: prev.totalConversions + Math.floor(Math.random() * 3),
        totalRevenue: prev.totalRevenue + Math.floor(Math.random() * 500)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, [isRealTimeEnabled]);

  // ✅ ENHANCED: Journey stage performance calculation
  const stagePerformance = useMemo(() => {
    return journeyStages.map((stage, index) => {
      const previousStage = index > 0 ? journeyStages[index - 1] : null;
      const dropoffFromPrevious = previousStage 
        ? Math.round(((previousStage.visitors - stage.visitors) / previousStage.visitors) * 100)
        : 0;
      
      return {
        ...stage,
        dropoffFromPrevious,
        revenuePerVisitor: stage.revenue / stage.visitors || 0,
        efficiency: stage.conversionRate * (stage.averageTime / 60), // conversions per minute
      };
    });
  }, []);

  // ✅ ENHANCED: Segment performance analysis
  const segmentAnalysis = useMemo(() => {
    const totalValue = customerSegments.reduce((sum, segment) => sum + (segment.count * segment.avgValue), 0);
    
    return customerSegments.map(segment => ({
      ...segment,
      revenueContribution: (segment.count * segment.avgValue) / totalValue * 100,
      growthTrend: segment.trends.length > 1 ? 
        ((segment.trends[segment.trends.length - 1].value - segment.trends[segment.trends.length - 7].value) / segment.trends[segment.trends.length - 7].value) * 100 : 0
    }));
  }, []);

  // ✅ ENHANCED: Conversion funnel visualization
  const conversionFunnel = useMemo(() => {
    const maxWidth = 300;
    return stagePerformance.map(stage => ({
      ...stage,
      width: (stage.visitors / stagePerformance[0].visitors) * maxWidth,
      widthPercentage: (stage.visitors / stagePerformance[0].visitors) * 100
    }));
  }, [stagePerformance]);

  // ✅ ENHANCED: Device and source analysis
  const deviceAnalysis = useMemo(() => {
    const totalDesktop = journeyStages.reduce((sum, stage) => sum + (stage.visitors * stage.devices.desktop / 100), 0);
    const totalMobile = journeyStages.reduce((sum, stage) => sum + (stage.visitors * stage.devices.mobile / 100), 0);
    const totalTablet = journeyStages.reduce((sum, stage) => sum + (stage.visitors * stage.devices.tablet / 100), 0);
    const total = totalDesktop + totalMobile + totalTablet;

    return {
      desktop: { count: totalDesktop, percentage: (totalDesktop / total) * 100 },
      mobile: { count: totalMobile, percentage: (totalMobile / total) * 100 },
      tablet: { count: totalTablet, percentage: (totalTablet / total) * 100 }
    };
  }, []);

  // ✅ ENHANCED: Impact score calculation
  const getImpactColor = useCallback((impact: number) => {
    if (impact >= 80) return 'text-red-400';
    if (impact >= 60) return 'text-yellow-400';
    if (impact >= 40) return 'text-[#00d4ff]';
    return 'text-[#00ff88]';
  }, []);

  const getInsightTypeColor = useCallback((type: JourneyInsight['type']) => {
    switch (type) {
      case 'opportunity': return 'text-[#00ff88]';
      case 'bottleneck': return 'text-red-400';
      case 'trend': return 'text-[#00d4ff]';
      case 'anomaly': return 'text-yellow-400';
      default: return 'text-[#C0C5CE]';
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#C0C5CE] font-mono">
      {/* ✅ ENHANCED: Analytics neural network background */}
      <div className="fixed inset-0 data-flow opacity-8 pointer-events-none"></div>
      
      <RTLContainer className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        <div className={`space-y-8 ${isRTL ? 'text-right' : 'text-left'}`}>
          
          {/* ✅ ENHANCED: Customer journey header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#00d4ff] via-purple-500 to-[#00ff88] rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-black" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-[#C0C5CE]">
                  {language === 'ar' ? 'تحليلات رحلة العميل المتقدمة' : 'Advanced Customer Journey Analytics'}
                </h1>
                <p className="text-[#C0C5CE]/70 mt-1">
                  {language === 'ar' 
                    ? 'تحليل شامل لسلوك العملاء مع رؤى مدعومة بالذكاء الاصطناعي'
                    : 'Comprehensive customer behavior analysis with AI-powered insights'
                  }
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isRealTimeEnabled ? 'bg-[#00ff88] animate-pulse' : 'bg-[#C0C5CE]/50'}`}></div>
                <span className="text-sm text-[#C0C5CE]/70 font-mono">
                  {language === 'ar' ? 'مباشر' : 'Real-time'}: {isRealTimeEnabled ? 'ON' : 'OFF'}
                </span>
              </div>
              
              <Button
                onClick={() => setIsRealTimeEnabled(!isRealTimeEnabled)}
                className={`${isRealTimeEnabled ? 'bg-[#00ff88]/20 text-[#00ff88]' : 'bg-[#C0C5CE]/20 text-[#C0C5CE]'} border-0 font-mono`}
              >
                {isRealTimeEnabled ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* ✅ ENHANCED: Key metrics overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <Users className="w-5 h-5 text-[#00d4ff]" />
                <Badge className="bg-[#00d4ff]/20 text-[#00d4ff] font-mono">Traffic</Badge>
              </div>
              <div className="neo-dashboard-widget-value text-[#00d4ff]">{journeyMetrics.totalVisitors.toLocaleString()}</div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">Total Visitors</div>
              <div className="neo-dashboard-widget-change positive">
                <TrendingUp className="w-3 h-3" />
                +12% vs last period
              </div>
            </Card>

            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <Target className="w-5 h-5 text-[#00ff88]" />
                <span className="text-xs text-[#C0C5CE]/70 font-mono">Conversion</span>
              </div>
              <div className="neo-dashboard-widget-value text-[#00ff88]">{journeyMetrics.overallConversionRate}%</div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">Conversion Rate</div>
              <div className="neo-dashboard-widget-change positive">
                <TrendingUp className="w-3 h-3" />
                +2.3% improvement
              </div>
            </Card>

            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <DollarSign className="w-5 h-5 text-yellow-400" />
                <span className="text-xs text-[#C0C5CE]/70 font-mono">Revenue</span>
              </div>
              <div className="neo-dashboard-widget-value text-yellow-400">${journeyMetrics.averageOrderValue}</div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">Avg Order Value</div>
              <div className="neo-dashboard-widget-change positive">
                <TrendingUp className="w-3 h-3" />
                ${journeyMetrics.totalRevenue.toLocaleString()} total
              </div>
            </Card>

            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <Clock className="w-5 h-5 text-purple-400" />
                <span className="text-xs text-[#C0C5CE]/70 font-mono">Time</span>
              </div>
              <div className="neo-dashboard-widget-value text-purple-400">{journeyMetrics.averageJourneyTime}h</div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">Avg Journey Time</div>
              <div className="neo-dashboard-widget-change positive">
                <Star className="w-3 h-3" />
                NPS: {journeyMetrics.npsScore}
              </div>
            </Card>
          </div>

          {/* ✅ ENHANCED: Timeframe selector */}
          <div className="flex items-center justify-between bg-[#12151C] p-4 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-[#C0C5CE]/70" />
                <span className="text-sm text-[#C0C5CE]/70 font-mono">
                  {language === 'ar' ? 'الفترة الزمنية:' : 'Timeframe:'}
                </span>
              </div>
              <div className="flex space-x-1">
                {[
                  { id: '24h', label: '24h' },
                  { id: '7d', label: '7 days' },
                  { id: '30d', label: '30 days' },
                  { id: '90d', label: '90 days' }
                ].map(period => (
                  <button
                    key={period.id}
                    onClick={() => setSelectedTimeframe(period.id as any)}
                    className={`px-3 py-1 rounded text-sm font-mono transition-all ${
                      selectedTimeframe === period.id
                        ? 'bg-[#00d4ff] text-black'
                        : 'text-[#C0C5CE] hover:bg-[#00d4ff]/10 hover:text-[#00d4ff]'
                    }`}
                  >
                    {period.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ✅ ENHANCED: Navigation tabs */}
          <div className="flex space-x-1 bg-[#12151C] p-1 rounded-lg">
            {[
              { id: 'overview', label: language === 'ar' ? 'نظرة عامة' : 'Overview', icon: Eye },
              { id: 'journey', label: language === 'ar' ? 'مسار الرحلة' : 'Journey Flow', icon: ArrowRight },
              { id: 'segments', label: language === 'ar' ? 'شرائح العملاء' : 'Segments', icon: Users },
              { id: 'insights', label: language === 'ar' ? 'الرؤى' : 'AI Insights', icon: Brain },
              { id: 'optimization', label: language === 'ar' ? 'التحسين' : 'Optimization', icon: Zap }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedView(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md font-mono text-sm transition-all ${
                  selectedView === tab.id
                    ? 'bg-[#00d4ff] text-black'
                    : 'text-[#C0C5CE] hover:bg-[#00d4ff]/10 hover:text-[#00d4ff]'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* ✅ ENHANCED: Journey flow visualization */}
          {selectedView === 'journey' && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-[#C0C5CE] font-mono">
                {language === 'ar' ? 'تدفق رحلة العميل التفاعلي' : 'Interactive Customer Journey Flow'}
              </h3>
              
              {/* Conversion funnel */}
              <Card className="neo-card">
                <div className="p-6">
                  <h4 className="text-xl font-semibold text-[#C0C5CE] font-mono mb-6">
                    {language === 'ar' ? 'قمع التحويل' : 'Conversion Funnel'}
                  </h4>
                  
                  <div className="space-y-6">
                    {conversionFunnel.map((stage, index) => (
                      <div key={stage.id} className="relative">
                        <div className="flex items-center space-x-4 mb-2">
                          <div className="w-8 h-8 bg-[#00d4ff]/20 rounded-full flex items-center justify-center">
                            <span className="text-[#00d4ff] font-mono text-sm">{stage.position}</span>
                          </div>
                          <h5 className="text-lg font-bold text-[#C0C5CE] font-mono">
                            {language === 'ar' ? stage.nameAr : stage.name}
                          </h5>
                          <Badge className="bg-[#00ff88]/20 text-[#00ff88] font-mono">
                            {stage.conversionRate}%
                          </Badge>
                        </div>
                        
                        {/* Funnel visual */}
                        <div className="relative mb-4">
                          <div 
                            className="bg-gradient-to-r from-[#00d4ff]/30 to-[#00ff88]/30 border border-[#00d4ff]/50 rounded h-12 flex items-center justify-between px-4"
                            style={{ width: `${stage.width}px` }}
                          >
                            <span className="text-[#C0C5CE] font-mono text-sm">
                              {stage.visitors.toLocaleString()} visitors
                            </span>
                            <span className="text-[#00ff88] font-mono text-sm">
                              {stage.conversionRate}% → next stage
                            </span>
                          </div>
                          
                          {/* Dropoff visualization */}
                          {stage.dropoffFromPrevious > 0 && (
                            <div className="absolute -right-4 top-0 h-12 flex items-center">
                              <div className="bg-red-400/20 border border-red-400/40 rounded px-2 py-1">
                                <span className="text-red-400 font-mono text-xs">
                                  -{stage.dropoffFromPrevious}%
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {/* Stage details */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm font-mono mb-4">
                          <div>
                            <div className="text-[#C0C5CE]/70">Avg Time</div>
                            <div className="text-[#00d4ff]">{Math.floor(stage.averageTime / 60)}m {stage.averageTime % 60}s</div>
                          </div>
                          <div>
                            <div className="text-[#C0C5CE]/70">Conversions</div>
                            <div className="text-[#00ff88]">{stage.conversions.toLocaleString()}</div>
                          </div>
                          <div>
                            <div className="text-[#C0C5CE]/70">Revenue</div>
                            <div className="text-yellow-400">
                              {stage.revenue > 0 ? `$${stage.revenue.toLocaleString()}` : 'N/A'}
                            </div>
                          </div>
                          <div>
                            <div className="text-[#C0C5CE]/70">Dropoff Rate</div>
                            <div className="text-red-400">{stage.dropoffRate}%</div>
                          </div>
                        </div>
                        
                        {/* Device breakdown */}
                        <div className="bg-[#0B0D12] border border-[#00d4ff]/20 rounded p-3">
                          <div className="flex items-center justify-between text-xs font-mono">
                            <div className="flex items-center space-x-1">
                              <Monitor className="w-3 h-3 text-[#00d4ff]" />
                              <span className="text-[#C0C5CE]/70">Desktop:</span>
                              <span className="text-[#00d4ff]">{stage.devices.desktop}%</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Smartphone className="w-3 h-3 text-[#00ff88]" />
                              <span className="text-[#C0C5CE]/70">Mobile:</span>
                              <span className="text-[#00ff88]">{stage.devices.mobile}%</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Tablet className="w-3 h-3 text-yellow-400" />
                              <span className="text-[#C0C5CE]/70">Tablet:</span>
                              <span className="text-yellow-400">{stage.devices.tablet}%</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Connection arrow */}
                        {index < conversionFunnel.length - 1 && (
                          <div className="flex justify-center my-4">
                            <ArrowDown className="w-6 h-6 text-[#00d4ff]/50" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* ✅ ENHANCED: Customer segments analysis */}
          {selectedView === 'segments' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-[#C0C5CE] font-mono">
                {language === 'ar' ? 'تحليل شرائح العملاء' : 'Customer Segment Analysis'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {segmentAnalysis.map(segment => (
                  <Card key={segment.id} className="neo-interactive-card">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <div 
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: segment.color }}
                            ></div>
                            <h4 className="text-lg font-bold text-[#C0C5CE] font-mono">
                              {language === 'ar' ? segment.nameAr : segment.name}
                            </h4>
                          </div>
                          <p className="text-[#C0C5CE]/70 text-sm font-mono">
                            {segment.count.toLocaleString()} customers ({segment.percentage}%)
                          </p>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-lg font-mono" style={{ color: segment.color }}>
                            ${segment.avgValue}
                          </div>
                          <div className="text-xs text-[#C0C5CE]/70 font-mono">
                            Avg Value
                          </div>
                        </div>
                      </div>
                      
                      {/* Segment metrics */}
                      <div className="grid grid-cols-2 gap-4 text-sm font-mono mb-4">
                        <div>
                          <div className="text-[#C0C5CE]/70">Conversion Rate</div>
                          <div className="text-[#00ff88]">{segment.conversionRate}%</div>
                        </div>
                        <div>
                          <div className="text-[#C0C5CE]/70">Retention Rate</div>
                          <div className="text-[#00d4ff]">{segment.retentionRate}%</div>
                        </div>
                        <div>
                          <div className="text-[#C0C5CE]/70">Satisfaction</div>
                          <div className="text-yellow-400">{segment.satisfactionScore}/5</div>
                        </div>
                        <div>
                          <div className="text-[#C0C5CE]/70">Revenue Share</div>
                          <div className="text-purple-400">{segment.revenueContribution.toFixed(1)}%</div>
                        </div>
                      </div>
                      
                      {/* Growth trend */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-[#C0C5CE]/70 font-mono">Growth Trend</span>
                          <span className={`font-mono ${segment.growthTrend >= 0 ? 'text-[#00ff88]' : 'text-red-400'}`}>
                            {segment.growthTrend >= 0 ? '+' : ''}{segment.growthTrend.toFixed(1)}%
                          </span>
                        </div>
                        <Progress 
                          value={Math.max(0, Math.min(100, 50 + segment.growthTrend))} 
                          className="h-2" 
                        />
                      </div>
                      
                      {/* Characteristics */}
                      <div className="mb-4">
                        <h5 className="text-sm font-semibold text-[#C0C5CE] font-mono mb-2">
                          {language === 'ar' ? 'الخصائص:' : 'Characteristics:'}
                        </h5>
                        <div className="flex flex-wrap gap-1">
                          {(language === 'ar' ? segment.characteristicsAr : segment.characteristics).map((char, index) => (
                            <span 
                              key={index}
                              className="text-xs bg-[#12151C] border border-[#C0C5CE]/20 text-[#C0C5CE]/70 px-2 py-1 rounded font-mono"
                            >
                              {char}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          className="flex-1 neo-button-outline"
                          onClick={() => setSelectedSegment(segment)}
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          {language === 'ar' ? 'تفاصيل' : 'Details'}
                        </Button>
                        
                        <Button size="sm" className="flex-1 neo-button-ghost">
                          <Target className="w-3 h-3 mr-1" />
                          {language === 'ar' ? 'استهداف' : 'Target'}
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* ✅ ENHANCED: AI insights */}
          {selectedView === 'insights' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-[#C0C5CE] font-mono">
                {language === 'ar' ? 'رؤى الذكاء الاصطناعي' : 'AI-Powered Journey Insights'}
              </h3>
              
              <div className="space-y-4">
                {journeyInsights.map(insight => (
                  <Card key={insight.id} className="neo-interactive-card">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <Badge className={`${insight.type === 'opportunity' ? 'bg-[#00ff88]/20 text-[#00ff88]' :
                                             insight.type === 'bottleneck' ? 'bg-red-400/20 text-red-400' :
                                             insight.type === 'trend' ? 'bg-[#00d4ff]/20 text-[#00d4ff]' :
                                             'bg-yellow-400/20 text-yellow-400'} font-mono`}>
                              {insight.type.toUpperCase()}
                            </Badge>
                            <Badge className={`${getImpactColor(insight.impact)} bg-opacity-20 font-mono text-xs`}>
                              Impact: {insight.impact}
                            </Badge>
                            {insight.automated && (
                              <Badge className="bg-gradient-to-r from-purple-500 to-[#00d4ff] text-black text-xs font-mono">
                                AI AUTO
                              </Badge>
                            )}
                          </div>
                          
                          <h4 className="text-lg font-bold text-[#C0C5CE] font-mono mb-2">
                            {language === 'ar' ? insight.titleAr : insight.title}
                          </h4>
                          <p className="text-[#C0C5CE]/80 text-sm mb-3">
                            {language === 'ar' ? insight.descriptionAr : insight.description}
                          </p>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-2xl font-mono text-[#00ff88] mb-1">
                            {insight.confidence}%
                          </div>
                          <div className="text-xs text-[#C0C5CE]/70 font-mono">
                            Confidence
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-[#0B0D12] border border-[#00d4ff]/20 rounded p-3 mb-4">
                        <h5 className="text-sm font-semibold text-[#00d4ff] font-mono mb-1">
                          {language === 'ar' ? 'توصية الذكاء الاصطناعي:' : 'AI Recommendation:'}
                        </h5>
                        <p className="text-sm text-[#C0C5CE]/90 font-mono">
                          {language === 'ar' ? insight.recommendationAr : insight.recommendation}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-xs font-mono mb-4">
                        <div>
                          <div className="text-[#C0C5CE]/70">Potential Improvement</div>
                          <div className="text-[#00ff88]">+{insight.potentialImprovement}%</div>
                        </div>
                        <div>
                          <div className="text-[#C0C5CE]/70">Implementation</div>
                          <div className="text-[#00d4ff]">{insight.timeframe}</div>
                        </div>
                        <div>
                          <div className="text-[#C0C5CE]/70">Type</div>
                          <div className={getInsightTypeColor(insight.type)}>
                            {insight.type.charAt(0).toUpperCase() + insight.type.slice(1)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Sparkles className="w-4 h-4 text-purple-400" />
                          <span className="text-xs text-[#C0C5CE]/70 font-mono">
                            {language === 'ar' ? 'مدعوم بالذكاء الاصطناعي' : 'AI-Powered Analysis'}
                          </span>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button size="sm" className="neo-button-outline">
                            <Eye className="w-3 h-3 mr-1" />
                            {language === 'ar' ? 'تفاصيل' : 'Details'}
                          </Button>
                          {insight.automated && (
                            <Button size="sm" className="neo-button-primary">
                              <Zap className="w-3 h-3 mr-1" />
                              {language === 'ar' ? 'تنفيذ' : 'Implement'}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

        </div>
      </RTLContainer>
    </div>
  );
}