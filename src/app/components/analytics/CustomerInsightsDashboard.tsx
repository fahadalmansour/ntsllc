import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { useLanguage } from '../../contexts/LanguageContext';
import { RTLContainer } from '../LanguageSwitcher';
import { 
  Users, 
  UserCheck,
  UserPlus,
  UserMinus,
  TrendingUp, 
  TrendingDown,
  Heart,
  Star,
  Globe,
  ShoppingCart,
  DollarSign,
  Clock,
  MapPin,
  Smartphone,
  Monitor,
  Calendar,
  Mail,
  MessageSquare,
  Phone,
  Target,
  Zap,
  Activity,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  MousePointer,
  Filter
} from 'lucide-react';

interface CustomerSegment {
  id: string;
  name: string;
  count: number;
  percentage: number;
  growth: number;
  averageValue: number;
  conversionRate: number;
  churnRate: number;
  primarySource: string;
  color: string;
}

interface CustomerBehavior {
  pageViews: number;
  sessionDuration: number;
  bounceRate: number;
  conversionRate: number;
  averageOrderValue: number;
  repeatPurchaseRate: number;
  customerLifetimeValue: number;
}

interface GeographicData {
  region: string;
  flag: string;
  customers: number;
  revenue: number;
  growth: number;
  conversionRate: number;
  preferredService: string;
}

interface CustomerJourney {
  stage: string;
  visitors: number;
  conversionRate: number;
  dropOffRate: number;
  averageTime: string;
  topExitPoints: string[];
}

export default function CustomerInsightsDashboard({ onNavigate }: { onNavigate?: (section: string) => void }) {
  const { isRTL, language } = useLanguage();
  
  const [customerSegments, setCustomerSegments] = useState<CustomerSegment[]>([
    {
      id: 'enterprise',
      name: 'Enterprise Clients',
      count: 1247,
      percentage: 35.2,
      growth: 28.4,
      averageValue: 4275,
      conversionRate: 23.7,
      churnRate: 2.1,
      primarySource: 'Direct Sales',
      color: '#00d4ff'
    },
    {
      id: 'smb',
      name: 'Small-Medium Business',
      count: 2891,
      percentage: 47.6,
      growth: 34.8,
      averageValue: 1847,
      conversionRate: 15.2,
      churnRate: 5.3,
      primarySource: 'Organic Search',
      color: '#00ff88'
    },
    {
      id: 'startups',
      name: 'Startups',
      count: 847,
      percentage: 12.4,
      growth: 42.1,
      averageValue: 674,
      conversionRate: 8.9,
      churnRate: 12.7,
      primarySource: 'Social Media',
      color: '#ffeb3b'
    },
    {
      id: 'freelancers',
      name: 'Freelancers',
      count: 389,
      percentage: 4.8,
      growth: 18.3,
      averageValue: 234,
      conversionRate: 6.2,
      churnRate: 18.9,
      primarySource: 'Referrals',
      color: '#ff6b6b'
    }
  ]);

  const [behaviorData, setBehaviorData] = useState<CustomerBehavior>({
    pageViews: 247892,
    sessionDuration: 847,
    bounceRate: 23.4,
    conversionRate: 12.8,
    averageOrderValue: 1847,
    repeatPurchaseRate: 34.7,
    customerLifetimeValue: 3247
  });

  const [geographicData, setGeographicData] = useState<GeographicData[]>([
    {
      region: 'United States',
      flag: '🇺🇸',
      customers: 2847,
      revenue: 1847293,
      growth: 24.7,
      conversionRate: 15.2,
      preferredService: 'Store Setup'
    },
    {
      region: 'United Arab Emirates',
      flag: '🇦🇪',
      customers: 1247,
      revenue: 947382,
      growth: 38.4,
      conversionRate: 18.9,
      preferredService: 'N8N Automation'
    },
    {
      region: 'Saudi Arabia',
      flag: '🇸🇦',
      customers: 892,
      revenue: 574829,
      growth: 29.1,
      conversionRate: 13.7,
      preferredService: 'NeoSync'
    },
    {
      region: 'Kuwait',
      flag: '🇰🇼',
      customers: 389,
      revenue: 234751,
      growth: 16.8,
      conversionRate: 11.2,
      preferredService: 'Brand Checker'
    }
  ]);

  const [customerJourney, setCustomerJourney] = useState<CustomerJourney[]>([
    {
      stage: 'Awareness',
      visitors: 24789,
      conversionRate: 15.2,
      dropOffRate: 84.8,
      averageTime: '2m 34s',
      topExitPoints: ['Pricing Page', 'About Page']
    },
    {
      stage: 'Interest',
      visitors: 3847,
      conversionRate: 28.4,
      dropOffRate: 71.6,
      averageTime: '5m 47s',
      topExitPoints: ['Service Details', 'Case Studies']
    },
    {
      stage: 'Consideration',
      visitors: 1247,
      conversionRate: 42.7,
      dropOffRate: 57.3,
      averageTime: '12m 23s',
      topExitPoints: ['Contact Form', 'Pricing Calculator']
    },
    {
      stage: 'Purchase',
      visitors: 847,
      conversionRate: 67.8,
      dropOffRate: 32.2,
      averageTime: '8m 15s',
      topExitPoints: ['Payment Page', 'Form Validation']
    },
    {
      stage: 'Retention',
      visitors: 574,
      conversionRate: 78.2,
      dropOffRate: 21.8,
      averageTime: '15m 47s',
      topExitPoints: ['Support Portal', 'Billing']
    }
  ]);

  const [timeframe, setTimeframe] = useState<'24h' | '7d' | '30d' | '90d'>('30d');
  const [selectedSegment, setSelectedSegment] = useState<string>('all');

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBehaviorData(prev => ({
        ...prev,
        pageViews: prev.pageViews + Math.floor(Math.random() * 50),
        sessionDuration: Math.max(300, prev.sessionDuration + (Math.random() - 0.5) * 20)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getGrowthColor = (growth: number) => {
    return growth > 0 ? 'text-[#00ff88]' : 'text-red-400';
  };

  const getGrowthIcon = (growth: number) => {
    return growth > 0 ? ArrowUpRight : ArrowDownRight;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#C0C5CE] font-mono">
      {/* Terminal grid background */}
      <div className="fixed inset-0 enterprise-grid opacity-10 pointer-events-none"></div>
      
      <RTLContainer className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className={`space-y-8 ${isRTL ? 'text-right' : 'text-left'}`}>
          
          {/* Header */}
          <div className="neo-flex-between mb-8">
            <div className="neo-flex-start neo-space-md">
              <Eye className="w-8 h-8 text-[#00d4ff]" />
              <div>
                <h1 className="text-3xl font-bold text-[#C0C5CE]">
                  {language === 'ar' ? 'تحليلات العملاء المتقدمة' : 'Customer Insights Dashboard'}
                </h1>
                <p className="text-[#C0C5CE]/80 text-lg">
                  {language === 'ar' 
                    ? 'فهم عميق لسلوك العملاء ورحلة الشراء'
                    : 'Deep understanding of customer behavior & purchase journey'
                  }
                </p>
              </div>
            </div>
            
            <div className="neo-flex-start neo-space-sm">
              <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse"></div>
              <span className="text-[#00ff88] text-sm font-mono">
                {language === 'ar' ? 'تحليل مباشر' : 'Live Analytics'}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="neo-flex-between mb-6">
            <div className="neo-flex-start neo-space-sm">
              {(['24h', '7d', '30d', '90d'] as const).map((period) => (
                <Button
                  key={period}
                  className={`${
                    timeframe === period 
                      ? 'neo-button-primary' 
                      : 'neo-button-ghost'
                  } text-sm`}
                  onClick={() => setTimeframe(period)}
                >
                  {period === '24h' ? (language === 'ar' ? '24 ساعة' : '24 Hours') :
                   period === '7d' ? (language === 'ar' ? '7 أيام' : '7 Days') :
                   period === '30d' ? (language === 'ar' ? '30 يوم' : '30 Days') :
                   (language === 'ar' ? '90 يوم' : '90 Days')}
                </Button>
              ))}
            </div>

            <div className="neo-flex-start neo-space-sm">
              <Filter className="w-4 h-4 text-[#C0C5CE]/70" />
              <select
                value={selectedSegment}
                onChange={(e) => setSelectedSegment(e.target.value)}
                className="neo-form-select"
              >
                <option value="all">{language === 'ar' ? 'جميع الشرائح' : 'All Segments'}</option>
                <option value="enterprise">{language === 'ar' ? 'المؤسسات' : 'Enterprise'}</option>
                <option value="smb">{language === 'ar' ? 'الشركات الصغيرة' : 'SMB'}</option>
                <option value="startups">{language === 'ar' ? 'الشركات الناشئة' : 'Startups'}</option>
              </select>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <Users className="w-5 h-5 text-[#00d4ff]" />
                <Badge className="bg-[#00d4ff]/20 text-[#00d4ff] border-[#00d4ff]/30">
                  Total
                </Badge>
              </div>
              <div className="neo-dashboard-widget-value">
                {formatNumber(customerSegments.reduce((sum, seg) => sum + seg.count, 0))}
              </div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">
                {language === 'ar' ? 'إجمالي العملاء' : 'Total Customers'}
              </div>
              <div className="mt-2 text-xs text-[#00ff88] font-mono">
                +847 {language === 'ar' ? 'هذا الشهر' : 'this month'}
              </div>
            </Card>

            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <Eye className="w-5 h-5 text-[#00ff88]" />
                <Badge className="bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]/30">
                  +12%
                </Badge>
              </div>
              <div className="neo-dashboard-widget-value">
                {formatNumber(behaviorData.pageViews)}
              </div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">
                {language === 'ar' ? 'مشاهدات الصفحة' : 'Page Views'}
              </div>
              <div className="mt-2 text-xs text-[#00d4ff] font-mono">
                {formatDuration(behaviorData.sessionDuration)} {language === 'ar' ? 'متوسط الجلسة' : 'avg session'}
              </div>
            </Card>

            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <Target className="w-5 h-5 text-[#00d4ff]" />
                <Badge className="bg-[#00d4ff]/20 text-[#00d4ff] border-[#00d4ff]/30">
                  {behaviorData.conversionRate}%
                </Badge>
              </div>
              <div className="neo-dashboard-widget-value">
                {behaviorData.conversionRate}%
              </div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">
                {language === 'ar' ? 'معدل التحويل' : 'Conversion Rate'}
              </div>
              <div className="mt-2">
                <Progress value={behaviorData.conversionRate * 8} className="h-1" />
              </div>
            </Card>

            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <DollarSign className="w-5 h-5 text-[#00ff88]" />
                <Badge className="bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]/30">
                  {formatCurrency(behaviorData.averageOrderValue)}
                </Badge>
              </div>
              <div className="neo-dashboard-widget-value">
                {formatCurrency(behaviorData.customerLifetimeValue)}
              </div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">
                {language === 'ar' ? 'قيمة العميل الدائمة' : 'Customer LTV'}
              </div>
              <div className="mt-2 text-xs text-[#00ff88] font-mono">
                {behaviorData.repeatPurchaseRate}% {language === 'ar' ? 'عملاء متكررون' : 'repeat customers'}
              </div>
            </Card>
          </div>

          {/* Customer Segments & Geographic Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Customer Segments */}
            <Card className="neo-card">
              <div className="p-6">
                <div className="neo-flex-between mb-6">
                  <h3 className="text-[#00ff88] font-mono text-xl">
                    {language === 'ar' ? 'شرائح العملاء' : 'Customer Segments'}
                  </h3>
                  <PieChart className="w-5 h-5 text-[#00d4ff]" />
                </div>

                <div className="space-y-4">
                  {customerSegments.map((segment) => {
                    const GrowthIcon = getGrowthIcon(segment.growth);
                    return (
                      <div key={segment.id} className="neo-interactive-card p-4">
                        <div className="neo-flex-between mb-3">
                          <div className="neo-flex-start neo-space-sm">
                            <div 
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: segment.color }}
                            ></div>
                            <div>
                              <div className="font-semibold text-[#C0C5CE]">
                                {segment.name}
                              </div>
                              <div className="text-xs text-[#C0C5CE]/70">
                                {formatNumber(segment.count)} customers • {segment.percentage}%
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-sm font-semibold text-[#00d4ff]">
                              {formatCurrency(segment.averageValue)}
                            </div>
                            <div className={`neo-flex-start neo-space-xs ${getGrowthColor(segment.growth)}`}>
                              <GrowthIcon className="w-3 h-3" />
                              <span className="text-xs">
                                {Math.abs(segment.growth).toFixed(1)}%
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-xs mb-3">
                          <div>
                            <span className="text-[#C0C5CE]/70">
                              {language === 'ar' ? 'تحويل:' : 'Conv:'}
                            </span>
                            <div className="text-[#00ff88]">
                              {segment.conversionRate}%
                            </div>
                          </div>
                          <div>
                            <span className="text-[#C0C5CE]/70">
                              {language === 'ar' ? 'تسرب:' : 'Churn:'}
                            </span>
                            <div className="text-red-400">
                              {segment.churnRate}%
                            </div>
                          </div>
                          <div>
                            <span className="text-[#C0C5CE]/70">
                              {language === 'ar' ? 'مصدر:' : 'Source:'}
                            </span>
                            <div className="text-[#00d4ff] text-xs">
                              {segment.primarySource}
                            </div>
                          </div>
                        </div>

                        <Progress 
                          value={segment.percentage} 
                          className="h-2"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>

            {/* Geographic Distribution */}
            <Card className="neo-card">
              <div className="p-6">
                <div className="neo-flex-between mb-6">
                  <h3 className="text-[#00ff88] font-mono text-xl">
                    {language === 'ar' ? 'التوزيع الجغرافي' : 'Geographic Distribution'}
                  </h3>
                  <Globe className="w-5 h-5 text-[#00d4ff]" />
                </div>

                <div className="space-y-4">
                  {geographicData.map((geo, index) => {
                    const GrowthIcon = getGrowthIcon(geo.growth);
                    return (
                      <div key={geo.region} className="neo-interactive-card p-4">
                        <div className="neo-flex-between mb-3">
                          <div className="neo-flex-start neo-space-sm">
                            <span className="text-2xl">{geo.flag}</span>
                            <div>
                              <div className="font-semibold text-[#C0C5CE]">
                                {geo.region}
                              </div>
                              <div className="text-xs text-[#C0C5CE]/70">
                                {formatNumber(geo.customers)} customers
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-sm font-semibold text-[#00d4ff]">
                              {formatCurrency(geo.revenue)}
                            </div>
                            <div className={`neo-flex-start neo-space-xs ${getGrowthColor(geo.growth)}`}>
                              <GrowthIcon className="w-3 h-3" />
                              <span className="text-xs">
                                {Math.abs(geo.growth).toFixed(1)}%
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="neo-flex-between text-xs mb-2">
                          <span className="text-[#C0C5CE]/70">
                            {language === 'ar' ? 'معدل التحويل:' : 'Conversion Rate:'}
                          </span>
                          <span className="text-[#00ff88]">
                            {geo.conversionRate}%
                          </span>
                        </div>

                        <div className="neo-flex-between text-xs mb-3">
                          <span className="text-[#C0C5CE]/70">
                            {language === 'ar' ? 'الخدمة المفضلة:' : 'Top Service:'}
                          </span>
                          <span className="text-[#00d4ff]">
                            {geo.preferredService}
                          </span>
                        </div>

                        <Progress 
                          value={(geo.revenue / geographicData[0].revenue) * 100} 
                          className="h-2"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>
          </div>

          {/* Customer Journey Analysis */}
          <Card className="neo-card">
            <div className="p-6">
              <div className="neo-flex-between mb-6">
                <h3 className="text-[#00ff88] font-mono text-xl">
                  {language === 'ar' ? 'تحليل رحلة العميل' : 'Customer Journey Analysis'}
                </h3>
                <BarChart3 className="w-5 h-5 text-[#00d4ff]" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {customerJourney.map((stage, index) => (
                  <div key={stage.stage} className="neo-interactive-card p-4 relative">
                    {/* Connection Arrow */}
                    {index < customerJourney.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                        <ArrowUpRight className="w-4 h-4 text-[#00d4ff] transform rotate-0" />
                      </div>
                    )}
                    
                    <div className="text-center">
                      <div className="text-sm font-semibold text-[#C0C5CE] mb-2">
                        {stage.stage}
                      </div>
                      
                      <div className="text-2xl font-bold text-[#00d4ff] mb-1">
                        {formatNumber(stage.visitors)}
                      </div>
                      
                      <div className="text-xs text-[#C0C5CE]/70 mb-3">
                        {language === 'ar' ? 'زائر' : 'visitors'}
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="neo-flex-between">
                          <span className="text-[#C0C5CE]/70">
                            {language === 'ar' ? 'تحويل:' : 'Convert:'}
                          </span>
                          <span className="text-[#00ff88]">
                            {stage.conversionRate}%
                          </span>
                        </div>
                        
                        <div className="neo-flex-between">
                          <span className="text-[#C0C5CE]/70">
                            {language === 'ar' ? 'خروج:' : 'Drop off:'}
                          </span>
                          <span className="text-red-400">
                            {stage.dropOffRate}%
                          </span>
                        </div>
                        
                        <div className="neo-flex-between">
                          <span className="text-[#C0C5CE]/70">
                            {language === 'ar' ? 'وقت:' : 'Time:'}
                          </span>
                          <span className="text-[#00d4ff]">
                            {stage.averageTime}
                          </span>
                        </div>
                      </div>

                      <div className="mt-3">
                        <Progress 
                          value={stage.conversionRate} 
                          className="h-2"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* AI Insights Terminal */}
          <Card className="neo-card">
            <div className="p-6">
              <div className="neo-flex-between mb-4">
                <div className="neo-flex-start neo-space-sm">
                  <Zap className="w-5 h-5 text-[#00d4ff]" />
                  <h3 className="text-[#00ff88] font-mono text-lg">
                    {language === 'ar' ? 'رؤى الذكاء الاصطناعي' : 'AI Customer Insights'}
                  </h3>
                </div>
                <Badge className="bg-[#00d4ff]/20 text-[#00d4ff] border-[#00d4ff]/30">
                  <Activity className="w-3 h-3 mr-1" />
                  {language === 'ar' ? 'تحليل ذكي' : 'Smart Analysis'}
                </Badge>
              </div>
              
              <div className="bg-[#0B0D12] border border-[#00d4ff]/20 rounded-lg p-4 font-mono text-sm">
                <div className="space-y-2">
                  <div className="text-[#00ff88]">
                    neo@customer-ai:~$ analyze --behavior --segments --predictions
                  </div>
                  <div className="text-[#C0C5CE]/80">
                    🔍 Customer Behavior Analysis Complete<br/>
                    ✓ Enterprise segment showing highest LTV: ${behaviorData.customerLifetimeValue}<br/>
                    ✓ UAE market has best conversion rate: 18.9%<br/>
                    ✓ Mobile users spend 23% more time on site<br/>
                    ⚠ High drop-off at consideration stage: 57.3%
                  </div>
                  
                  <div className="text-[#00ff88] mt-4">
                    neo@customer-ai:~$ recommend --optimization --targeting
                  </div>
                  <div className="text-[#C0C5CE]/80">
                    🎯 Strategic Recommendations:<br/>
                    • Focus SMB acquisition in UAE (+38% growth potential)<br/>
                    • Optimize consideration stage with interactive demos<br/>
                    • Target Enterprise clients with personalized outreach<br/>
                    • Implement retargeting for startup segment (42% growth)
                  </div>
                  
                  <div className="text-[#00ff88] mt-4">
                    neo@customer-ai:~$ predict --churn --retention --next-quarter
                  </div>
                  <div className="text-[#C0C5CE]/80">
                    📈 Q4 2024 Predictions (91% confidence):<br/>
                    • Expected new customers: ~1,247 (+18%)<br/>
                    • Churn risk: 3.2% (low risk segments identified)<br/>
                    • Revenue opportunity: $2.8M with optimized targeting
                  </div>
                  
                  <div className="text-[#00ff88] mt-4 neo-typing-cursor">
                    neo@customer-ai:~$ monitor --real-time --segments█
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </RTLContainer>
    </div>
  );
}