/**
 * Capacity Analytics Dashboard
 * Advanced analytics and insights for capacity management system
 */

import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Clock, 
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  Activity,
  Zap
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { LocalizedText, RTLContainer } from '../LanguageSwitcher';
import { capacityAnalytics, notificationAnalytics } from '../../lib/notification-system';

interface AnalyticsData {
  revenue: {
    total: number;
    discountGiven: number;
    retention: number;
  };
  notifications: {
    sms: { sent: number; delivered: number; failed: number };
    whatsapp: { sent: number; delivered: number; failed: number };
    email: { sent: number; delivered: number; failed: number };
  };
  engagement: {
    openRate: number;
    clickRate: number;
    unsubscribeRate: number;
  };
  capacity: {
    averageUtilization: number;
    peakHours: string[];
    modeDistribution: { standard: number; busy: number; peak: number };
  };
}

export default function CapacityAnalytics() {
  const { language, isRTL } = useLanguage();
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('7d');

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        // Load analytics data
        const [revenueData, notificationStats, engagementData] = await Promise.all([
          capacityAnalytics.getRevenueImpact(),
          notificationAnalytics.getDeliveryStats(),
          notificationAnalytics.getEngagementMetrics()
        ]);

        setAnalytics({
          revenue: revenueData,
          notifications: notificationStats,
          engagement: engagementData,
          capacity: {
            averageUtilization: 73,
            peakHours: ['10:00-12:00', '14:00-16:00', '20:00-22:00'],
            modeDistribution: { standard: 65, busy: 25, peak: 10 }
          }
        });
      } catch (error) {
        console.error('Failed to load analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, [timeRange]);

  if (loading) {
    return (
      <RTLContainer className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-700 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-32 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </RTLContainer>
    );
  }

  if (!analytics) {
    return (
      <RTLContainer className="p-6">
        <div className="text-center py-12">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-[#C0C5CE] mb-2">
            <LocalizedText
              arText="فشل في تحميل البيانات التحليلية"
              enText="Failed to load analytics data"
            />
          </h2>
        </div>
      </RTLContainer>
    );
  }

  const StatCard = ({ 
    icon: Icon, 
    title, 
    titleAr, 
    value, 
    subtitle, 
    subtitleAr,
    trend,
    color = 'text-[#00ff88]'
  }: {
    icon: React.ComponentType<any>;
    title: string;
    titleAr: string;
    value: string | number;
    subtitle?: string;
    subtitleAr?: string;
    trend?: number;
    color?: string;
  }) => (
    <Card className="bg-[#1a1a1a] border-[#00d4ff]/30 p-6">
      <div className={`flex items-center gap-3 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <Icon className={`w-8 h-8 ${color}`} />
        <div className={isRTL ? 'text-right' : 'text-left'}>
          <p className="text-gray-400 text-sm">
            <LocalizedText arText={titleAr} enText={title} />
          </p>
          <p className={`text-2xl font-bold text-[#C0C5CE]`}>
            {typeof value === 'number' && value < 1 ? `${(value * 100).toFixed(1)}%` : value}
          </p>
        </div>
      </div>
      {subtitle && (
        <p className="text-xs text-gray-500">
          <LocalizedText arText={subtitleAr || subtitle} enText={subtitle} />
        </p>
      )}
      {trend !== undefined && (
        <div className={`flex items-center gap-1 mt-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <TrendingUp className={`w-3 h-3 ${trend > 0 ? 'text-[#00ff88]' : 'text-red-500'}`} />
          <span className={`text-xs ${trend > 0 ? 'text-[#00ff88]' : 'text-red-500'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        </div>
      )}
    </Card>
  );

  return (
    <RTLContainer className="p-6 space-y-6 bg-[#0a0a0a] min-h-screen">
      {/* Header */}
      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className={isRTL ? 'text-right' : 'text-left'}>
          <h1 className="text-3xl font-bold text-[#C0C5CE] mb-2">
            <LocalizedText
              arText="تحليلات إدارة السعة"
              enText="Capacity Analytics"
            />
          </h1>
          <p className="text-gray-400">
            <LocalizedText
              arText="رؤى مفصلة حول أداء النظام والإيرادات"
              enText="Detailed insights into system performance and revenue"
            />
          </p>
        </div>

        {/* Time Range Selector */}
        <div className="flex gap-2">
          {(['24h', '7d', '30d'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 rounded text-sm font-mono transition-colors ${
                timeRange === range
                  ? 'bg-[#00d4ff] text-black'
                  : 'bg-[#1a1a1a] text-gray-400 hover:text-[#C0C5CE]'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          icon={DollarSign}
          title="Total Revenue"
          titleAr="إجمالي الإيرادات"
          value={`$${analytics.revenue.total.toLocaleString()}`}
          subtitle="Last 30 days"
          subtitleAr="آخر 30 يوم"
          trend={12.5}
          color="text-[#00ff88]"
        />

        <StatCard
          icon={TrendingUp}
          title="Customer Retention"
          titleAr="الاحتفاظ بالعملاء"
          value={analytics.revenue.retention}
          subtitle="Above industry average"
          subtitleAr="أعلى من متوسط الصناعة"
          trend={3.2}
          color="text-[#00d4ff]"
        />

        <StatCard
          icon={MessageSquare}
          title="Notification Delivery"
          titleAr="تسليم الإشعارات"
          value="96.8%"
          subtitle="Across all channels"
          subtitleAr="عبر جميع القنوات"
          trend={1.4}
          color="text-[#00ff88]"
        />

        <StatCard
          icon={Activity}
          title="System Utilization"
          titleAr="استخدام النظام"
          value={`${analytics.capacity.averageUtilization}%`}
          subtitle="Optimal efficiency"
          subtitleAr="كفاءة مثلى"
          color="text-[#00d4ff]"
        />
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="revenue" className="space-y-6">
        <TabsList className="bg-[#1a1a1a] border border-[#00d4ff]/30">
          <TabsTrigger value="revenue">
            <LocalizedText arText="الإيرادات" enText="Revenue" />
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <LocalizedText arText="الإشعارات" enText="Notifications" />
          </TabsTrigger>
          <TabsTrigger value="capacity">
            <LocalizedText arText="السعة" enText="Capacity" />
          </TabsTrigger>
          <TabsTrigger value="engagement">
            <LocalizedText arText="التفاعل" enText="Engagement" />
          </TabsTrigger>
        </TabsList>

        {/* Revenue Analytics */}
        <TabsContent value="revenue" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-[#1a1a1a] border-[#00d4ff]/30 p-6">
              <h3 className={`font-bold text-[#C0C5CE] mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                <LocalizedText arText="تأثير الخصومات" enText="Discount Impact" />
              </h3>
              <div className="space-y-4">
                <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="text-gray-400">
                    <LocalizedText arText="الخصم المقدم:" enText="Discounts Given:" />
                  </span>
                  <span className="text-[#00d4ff] font-mono font-bold">
                    ${analytics.revenue.discountGiven.toLocaleString()}
                  </span>
                </div>
                <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="text-gray-400">
                    <LocalizedText arText="الاحتفاظ المحسن:" enText="Retention Boost:" />
                  </span>
                  <span className="text-[#00ff88] font-mono font-bold">+12.3%</span>
                </div>
                <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="text-gray-400">
                    <LocalizedText arText="عائد الاستثمار:" enText="ROI on Discounts:" />
                  </span>
                  <span className="text-[#00ff88] font-mono font-bold">3.2x</span>
                </div>
              </div>
            </Card>

            <Card className="bg-[#1a1a1a] border-[#00d4ff]/30 p-6">
              <h3 className={`font-bold text-[#C0C5CE] mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                <LocalizedText arText="الإيرادات حسب الخدمة" enText="Revenue by Service" />
              </h3>
              <div className="space-y-3">
                <div>
                  <div className={`flex justify-between text-sm mb-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="text-gray-400">Lightning</span>
                    <span className="text-[#C0C5CE]">$67,890</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                <div>
                  <div className={`flex justify-between text-sm mb-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="text-gray-400">Thunder</span>
                    <span className="text-[#C0C5CE]">$52,340</span>
                  </div>
                  <Progress value={50} className="h-2" />
                </div>
                <div>
                  <div className={`flex justify-between text-sm mb-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="text-gray-400">Storm</span>
                    <span className="text-[#C0C5CE]">$36,550</span>
                  </div>
                  <Progress value={35} className="h-2" />
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Notification Analytics */}
        <TabsContent value="notifications" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(analytics.notifications).map(([channel, stats]) => (
              <Card key={channel} className="bg-[#1a1a1a] border-[#00d4ff]/30 p-6">
                <h3 className={`font-bold text-[#C0C5CE] mb-4 capitalize ${isRTL ? 'text-right' : 'text-left'}`}>
                  {channel} <LocalizedText arText="الإحصائيات" enText="Stats" />
                </h3>
                <div className="space-y-3">
                  <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="text-gray-400 text-sm">
                      <LocalizedText arText="مُرسل:" enText="Sent:" />
                    </span>
                    <span className="text-[#C0C5CE] font-mono">{stats.sent}</span>
                  </div>
                  <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="text-gray-400 text-sm">
                      <LocalizedText arText="مُسلم:" enText="Delivered:" />
                    </span>
                    <span className="text-[#00ff88] font-mono">{stats.delivered}</span>
                  </div>
                  <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="text-gray-400 text-sm">
                      <LocalizedText arText="فاشل:" enText="Failed:" />
                    </span>
                    <span className="text-red-500 font-mono">{stats.failed}</span>
                  </div>
                  <div className="pt-2 border-t border-gray-700">
                    <span className="text-[#00d4ff] font-bold">
                      {((stats.delivered / stats.sent) * 100).toFixed(1)}% 
                      <LocalizedText arText=" نجاح" enText=" Success" />
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Capacity Analytics */}
        <TabsContent value="capacity" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-[#1a1a1a] border-[#00d4ff]/30 p-6">
              <h3 className={`font-bold text-white mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                <LocalizedText arText="توزيع الأوضاع" enText="Mode Distribution" />
              </h3>
              <div className="space-y-4">
                {Object.entries(analytics.capacity.modeDistribution).map(([mode, percentage]) => (
                  <div key={mode}>
                    <div className={`flex justify-between text-sm mb-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="text-gray-400 capitalize">
                        <LocalizedText
                          arText={mode === 'standard' ? 'عادي' : mode === 'busy' ? 'مشغول' : 'ذروة'}
                          enText={mode}
                        />
                      </span>
                      <span className="text-[#C0C5CE]">{percentage}%</span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </Card>

            <Card className="bg-[#1a1a1a] border-[#00d4ff]/30 p-6">
              <h3 className={`font-bold text-[#C0C5CE] mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                <LocalizedText arText="ساعات الذروة" enText="Peak Hours" />
              </h3>
              <div className="space-y-2">
                {analytics.capacity.peakHours.map((hour, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-2 bg-[#0a0a0a] rounded"
                  >
                    <Clock className="w-4 h-4 text-[#00d4ff]" />
                    <span className="text-[#C0C5CE] font-mono">{hour}</span>
                    <Badge variant="secondary" className="ml-auto">
                      <LocalizedText arText="عالي" enText="High" />
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Engagement Analytics */}
        <TabsContent value="engagement" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              icon={CheckCircle}
              title="Open Rate"
              titleAr="معدل الفتح"
              value={analytics.engagement.openRate}
              subtitle="Above average"
              subtitleAr="أعلى من المتوسط"
              trend={5.3}
              color="text-[#00ff88]"
            />

            <StatCard
              icon={Zap}
              title="Click Rate"
              titleAr="معدل النقر"
              value={analytics.engagement.clickRate}
              subtitle="High engagement"
              subtitleAr="تفاعل عالي"
              trend={8.7}
              color="text-[#00d4ff]"
            />

            <StatCard
              icon={Users}
              title="Unsubscribe Rate"
              titleAr="معدل إلغاء الاشتراك"
              value={analytics.engagement.unsubscribeRate}
              subtitle="Very low"
              subtitleAr="منخفض جداً"
              trend={-2.1}
              color="text-[#00ff88]"
            />
          </div>
        </TabsContent>
      </Tabs>
    </RTLContainer>
  );
}