import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { useLanguage } from '../../contexts/LanguageContext';
import { RTLContainer } from '../LanguageSwitcher';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Users, 
  ShoppingCart, 
  Target,
  Brain,
  Zap,
  Calendar,
  Clock,
  Globe,
  Briefcase,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  Activity
} from 'lucide-react';

interface SalesData {
  revenue: number;
  growth: number;
  customers: number;
  orders: number;
  conversionRate: number;
  averageOrderValue: number;
  predictedRevenue: number;
  churnRate: number;
}

interface RegionalSales {
  region: string;
  flag: string;
  revenue: number;
  growth: number;
  customers: number;
  topService: string;
}

interface ServicePerformance {
  name: string;
  revenue: number;
  orders: number;
  growth: number;
  margin: number;
  duration: string;
}

export default function SalesIntelligenceDashboard({ onNavigate }: { onNavigate?: (section: string) => void }) {
  const { isRTL, language } = useLanguage();
  
  const [salesData, setSalesData] = useState<SalesData>({
    revenue: 2847230,
    growth: 23.7,
    customers: 14892,
    orders: 3847,
    conversionRate: 12.4,
    averageOrderValue: 1247,
    predictedRevenue: 3200000,
    churnRate: 3.2
  });

  const [regionalSales, setRegionalSales] = useState<RegionalSales[]>([
    {
      region: 'United States',
      flag: '🇺🇸',
      revenue: 1634820,
      growth: 28.4,
      customers: 8923,
      topService: 'Store Setup'
    },
    {
      region: 'UAE',
      flag: '🇦🇪',
      revenue: 847392,
      growth: 34.7,
      customers: 3847,
      topService: 'N8N Automation'
    },
    {
      region: 'Saudi Arabia',
      flag: '🇸🇦',
      revenue: 298472,
      growth: 18.2,
      customers: 1847,
      topService: 'NeoSync'
    },
    {
      region: 'Kuwait',
      flag: '🇰🇼',
      revenue: 66546,
      growth: 12.8,
      customers: 275,
      topService: 'Brand Checker'
    }
  ]);

  const [servicePerformance, setServicePerformance] = useState<ServicePerformance[]>([
    {
      name: 'Store Setup',
      revenue: 1298740,
      orders: 1247,
      growth: 32.4,
      margin: 78.5,
      duration: '60-90min'
    },
    {
      name: 'N8N Automation',
      revenue: 847392,
      orders: 1584,
      growth: 28.7,
      margin: 82.1,
      duration: '2-4hrs'
    },
    {
      name: 'NeoSync',
      revenue: 543891,
      orders: 847,
      growth: 24.1,
      margin: 85.3,
      duration: '15-30min'
    },
    {
      name: 'Brand Checker',
      revenue: 157207,
      orders: 169,
      growth: 15.6,
      margin: 91.2,
      duration: '10-15min'
    }
  ]);

  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [predictionMode, setPredictionMode] = useState(true);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSalesData(prev => ({
        ...prev,
        revenue: prev.revenue + Math.floor(Math.random() * 5000),
        orders: prev.orders + Math.floor(Math.random() * 3),
        customers: prev.customers + Math.floor(Math.random() * 2)
      }));
    }, 10000);

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
              <Brain className="w-8 h-8 text-[#00d4ff]" />
              <div>
                <h1 className="text-3xl font-bold text-[#C0C5CE]">
                  {language === 'ar' ? 'لوحة المبيعات الذكية' : 'Sales Intelligence Dashboard'}
                </h1>
                <p className="text-[#C0C5CE]/80 text-lg">
                  {language === 'ar' 
                    ? 'تحليلات متقدمة للمبيعات والتنبؤات الذكية'
                    : 'Advanced sales analytics & AI-powered predictions'
                  }
                </p>
              </div>
            </div>
            
            <div className="neo-flex-start neo-space-sm">
              <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse"></div>
              <span className="text-[#00ff88] text-sm font-mono">
                {language === 'ar' ? 'مباشر' : 'Live Analytics'}
              </span>
            </div>
          </div>

          {/* Time Controls */}
          <div className="neo-flex-between mb-6">
            <div className="neo-flex-start neo-space-sm">
              {(['7d', '30d', '90d', '1y'] as const).map((period) => (
                <Button
                  key={period}
                  className={`${
                    timeframe === period 
                      ? 'neo-button-primary' 
                      : 'neo-button-ghost'
                  } text-sm`}
                  onClick={() => setTimeframe(period)}
                >
                  {period === '7d' ? (language === 'ar' ? '7 أيام' : '7 Days') :
                   period === '30d' ? (language === 'ar' ? '30 يوم' : '30 Days') :
                   period === '90d' ? (language === 'ar' ? '90 يوم' : '90 Days') :
                   (language === 'ar' ? 'سنة' : '1 Year')}
                </Button>
              ))}
            </div>

            <div className="neo-flex-start neo-space-sm">
              <label className="neo-form-label text-sm">
                {language === 'ar' ? 'التنبؤ الذكي:' : 'AI Predictions:'}
              </label>
              <input
                type="checkbox"
                checked={predictionMode}
                onChange={(e) => setPredictionMode(e.target.checked)}
                className="w-4 h-4 accent-[#00d4ff]"
              />
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <DollarSign className="w-5 h-5 text-[#00ff88]" />
                <Badge className="bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]/30">
                  +{salesData.growth.toFixed(1)}%
                </Badge>
              </div>
              <div className="neo-dashboard-widget-value">
                {formatCurrency(salesData.revenue)}
              </div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">
                {language === 'ar' ? 'إجمالي الإيرادات' : 'Total Revenue'}
              </div>
              {predictionMode && (
                <div className="mt-2 text-xs text-[#00d4ff] font-mono">
                  {language === 'ar' ? 'متوقع:' : 'Predicted:'} {formatCurrency(salesData.predictedRevenue)}
                </div>
              )}
            </Card>

            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <Users className="w-5 h-5 text-[#00d4ff]" />
                <Badge className="bg-[#00d4ff]/20 text-[#00d4ff] border-[#00d4ff]/30">
                  +847
                </Badge>
              </div>
              <div className="neo-dashboard-widget-value">
                {formatNumber(salesData.customers)}
              </div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">
                {language === 'ar' ? 'إجمالي العملاء' : 'Total Customers'}
              </div>
              <div className="mt-2 text-xs font-mono">
                <span className="text-red-400">
                  {language === 'ar' ? 'معدل التسرب:' : 'Churn Rate:'} {salesData.churnRate}%
                </span>
              </div>
            </Card>

            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <ShoppingCart className="w-5 h-5 text-[#00ff88]" />
                <Badge className="bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]/30">
                  {salesData.conversionRate}%
                </Badge>
              </div>
              <div className="neo-dashboard-widget-value">
                {formatNumber(salesData.orders)}
              </div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">
                {language === 'ar' ? 'إجمالي الطلبات' : 'Total Orders'}
              </div>
              <div className="mt-2 text-xs text-[#00d4ff] font-mono">
                {language === 'ar' ? 'متوسط القيمة:' : 'Avg Value:'} {formatCurrency(salesData.averageOrderValue)}
              </div>
            </Card>

            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <Target className="w-5 h-5 text-[#00d4ff]" />
                <Badge className="bg-[#00d4ff]/20 text-[#00d4ff] border-[#00d4ff]/30">
                  Strong
                </Badge>
              </div>
              <div className="neo-dashboard-widget-value">
                {salesData.conversionRate}%
              </div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">
                {language === 'ar' ? 'معدل التحويل' : 'Conversion Rate'}
              </div>
              <div className="mt-2">
                <Progress value={salesData.conversionRate * 8} className="h-1" />
              </div>
            </Card>
          </div>

          {/* Regional Performance & Service Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Regional Sales */}
            <Card className="neo-card">
              <div className="p-6">
                <div className="neo-flex-between mb-6">
                  <h3 className="text-[#00ff88] font-mono text-xl">
                    {language === 'ar' ? 'الأداء الإقليمي' : 'Regional Performance'}
                  </h3>
                  <Globe className="w-5 h-5 text-[#00d4ff]" />
                </div>

                <div className="space-y-4">
                  {regionalSales.map((region, index) => {
                    const GrowthIcon = getGrowthIcon(region.growth);
                    return (
                      <div key={region.region} className="neo-interactive-card p-4">
                        <div className="neo-flex-between mb-3">
                          <div className="neo-flex-start neo-space-sm">
                            <span className="text-2xl">{region.flag}</span>
                            <div>
                              <div className="font-semibold text-[#C0C5CE]">
                                {region.region}
                              </div>
                              <div className="text-xs text-[#C0C5CE]/70">
                                {formatNumber(region.customers)} {language === 'ar' ? 'عميل' : 'customers'}
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-lg font-semibold text-[#00d4ff]">
                              {formatCurrency(region.revenue)}
                            </div>
                            <div className={`neo-flex-start neo-space-xs ${getGrowthColor(region.growth)}`}>
                              <GrowthIcon className="w-3 h-3" />
                              <span className="text-xs">
                                {Math.abs(region.growth).toFixed(1)}%
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="text-xs text-[#C0C5CE]/70 mb-2">
                          {language === 'ar' ? 'الخدمة الأكثر طلباً:' : 'Top Service:'} 
                          <span className="text-[#00ff88] ml-1">{region.topService}</span>
                        </div>

                        <Progress 
                          value={(region.revenue / regionalSales[0].revenue) * 100} 
                          className="h-2"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>

            {/* Service Performance */}
            <Card className="neo-card">
              <div className="p-6">
                <div className="neo-flex-between mb-6">
                  <h3 className="text-[#00ff88] font-mono text-xl">
                    {language === 'ar' ? 'أداء الخدمات' : 'Service Performance'}
                  </h3>
                  <Briefcase className="w-5 h-5 text-[#00d4ff]" />
                </div>

                <div className="space-y-4">
                  {servicePerformance.map((service, index) => {
                    const GrowthIcon = getGrowthIcon(service.growth);
                    return (
                      <div key={service.name} className="neo-interactive-card p-4">
                        <div className="neo-flex-between mb-3">
                          <div>
                            <div className="font-semibold text-[#C0C5CE]">
                              {service.name}
                            </div>
                            <div className="text-xs text-[#C0C5CE]/70">
                              {formatNumber(service.orders)} {language === 'ar' ? 'طلب' : 'orders'} • {service.duration}
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-sm font-semibold text-[#00d4ff]">
                              {formatCurrency(service.revenue)}
                            </div>
                            <div className={`neo-flex-start neo-space-xs ${getGrowthColor(service.growth)}`}>
                              <GrowthIcon className="w-3 h-3" />
                              <span className="text-xs">
                                {Math.abs(service.growth).toFixed(1)}%
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="neo-flex-between text-xs mb-2">
                          <span className="text-[#C0C5CE]/70">
                            {language === 'ar' ? 'هامش الربح:' : 'Profit Margin:'}
                          </span>
                          <span className="text-[#00ff88]">
                            {service.margin.toFixed(1)}%
                          </span>
                        </div>

                        <Progress 
                          value={service.margin} 
                          className="h-2"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>
          </div>

          {/* AI Insights Terminal */}
          <Card className="neo-card">
            <div className="p-6">
              <div className="neo-flex-between mb-4">
                <div className="neo-flex-start neo-space-sm">
                  <Zap className="w-5 h-5 text-[#00d4ff]" />
                  <h3 className="text-[#00ff88] font-mono text-lg">
                    {language === 'ar' ? 'الذكاء الاصطناعي - التحليلات' : 'AI Sales Insights'}
                  </h3>
                </div>
                <Badge className="bg-[#00d4ff]/20 text-[#00d4ff] border-[#00d4ff]/30">
                  <Activity className="w-3 h-3 mr-1" />
                  {language === 'ar' ? 'مباشر' : 'Live'}
                </Badge>
              </div>
              
              <div className="bg-[#0B0D12] border border-[#00d4ff]/20 rounded-lg p-4 font-mono text-sm">
                <div className="space-y-2">
                  <div className="text-[#00ff88]">
                    neo@sales-ai:~$ analyze --performance --predictions
                  </div>
                  <div className="text-[#C0C5CE]/80">
                    🔍 Analyzing sales patterns...<br/>
                    ✓ Revenue growth trend: +{salesData.growth.toFixed(1)}% (Strong momentum)<br/>
                    ✓ UAE market showing exceptional growth: +34.7%<br/>
                    ✓ Store Setup service driving 45.6% of total revenue<br/>
                    ⚠ Customer acquisition cost increased by 8.2%
                  </div>
                  
                  <div className="text-[#00ff88] mt-4">
                    neo@sales-ai:~$ predict --revenue --next-quarter
                  </div>
                  <div className="text-[#C0C5CE]/80">
                    📊 Q4 2024 Predictions (87% confidence):<br/>
                    • Revenue: {formatCurrency(salesData.predictedRevenue)} (+12.4%)<br/>
                    • New customers: ~2,847 (+19.1%)<br/>
                    • Recommended focus: GCC market expansion
                  </div>
                  
                  <div className="text-[#00ff88] mt-4">
                    neo@sales-ai:~$ recommend --optimization
                  </div>
                  <div className="text-[#C0C5CE]/80">
                    💡 Strategic Recommendations:<br/>
                    1. Increase N8N Automation pricing by 15% (high demand)<br/>
                    2. Launch Arabic-focused marketing in KSA<br/>
                    3. Bundle Brand Checker with Store Setup (cross-sell opportunity)
                  </div>
                  
                  <div className="text-[#00ff88] mt-4 neo-typing-cursor">
                    neo@sales-ai:~$ monitor --real-time█
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              className="neo-button-primary p-4 h-auto"
              onClick={() => onNavigate?.('analytics')}
            >
              <TrendingUp className="w-5 h-5 mb-2" />
              <div className="text-sm">
                {language === 'ar' ? 'تحليلات متقدمة' : 'Advanced Analytics'}
              </div>
            </Button>
            
            <Button 
              className="neo-button-outline p-4 h-auto"
              onClick={() => onNavigate?.('billing')}
            >
              <DollarSign className="w-5 h-5 mb-2" />
              <div className="text-sm">
                {language === 'ar' ? 'إدارة الفواتير' : 'Billing Management'}
              </div>
            </Button>
            
            <Button 
              className="neo-button-success p-4 h-auto"
              onClick={() => onNavigate?.('customer-journey-analytics')}
            >
              <Users className="w-5 h-5 mb-2" />
              <div className="text-sm">
                {language === 'ar' ? 'رحلة العميل' : 'Customer Journey'}
              </div>
            </Button>
            
            <Button 
              className="neo-button-ghost p-4 h-auto"
              onClick={() => onNavigate?.('settings')}
            >
              <Award className="w-5 h-5 mb-2" />
              <div className="text-sm">
                {language === 'ar' ? 'التقارير' : 'Reports'}
              </div>
            </Button>
          </div>
        </div>
      </RTLContainer>
    </div>
  );
}