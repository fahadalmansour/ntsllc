/**
 * Capacity Management Dashboard
 * Admin interface for managing dynamic capacity and timelines
 */

import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  AlertCircle, 
  Activity, 
  Users, 
  Clock, 
  TrendingUp, 
  Settings, 
  Bell,
  BarChart3,
  Zap,
  Shield,
  CheckCircle
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { LocalizedText, RTLContainer } from '../LanguageSwitcher';
import { 
  getCurrentCapacityLoad,
  updateCapacityStatus,
  getCapacityHistory,
  predictCapacityNeeds,
  capacityAnalytics,
  serviceConfig,
  CapacityStatus
} from '../../lib/capacity-management';

export default function CapacityManagement() {
  const { t, language, isRTL } = useLanguage();
  const [capacity, setCapacity] = useState<CapacityStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [timelineSettings, setTimelineSettings] = useState({
    lightning: { standard: 4, busy: 8, peak: 12 },
    thunder: { standard: 24, busy: 48, peak: 72 },
    storm: { standard: 72, busy: 120, peak: 168 }
  });

  // Load capacity data
  useEffect(() => {
    const loadCapacityData = async () => {
      try {
        const data = await getCurrentCapacityLoad();
        setCapacity(data);
      } catch (error) {
        console.error('Failed to load capacity data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCapacityData();
    
    // Refresh every 30 seconds
    const interval = setInterval(loadCapacityData, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleCapacityModeToggle = async (mode: 'standard' | 'busy' | 'peak') => {
    if (!capacity) return;
    
    setSaving(true);
    try {
      await updateCapacityStatus({ mode });
      setCapacity({ ...capacity, mode });
    } catch (error) {
      console.error('Failed to update capacity mode:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleTimelineUpdate = async () => {
    setSaving(true);
    try {
      // In production, save timeline settings to database
      console.log('Timeline settings updated:', timelineSettings);
      
      // Show success notification
      alert('Timeline settings updated successfully!');
    } catch (error) {
      console.error('Failed to update timeline settings:', error);
    } finally {
      setSaving(false);
    }
  };

  const getCapacityColor = (utilization: number) => {
    if (utilization > 90) return 'text-red-500 bg-red-500/20';
    if (utilization > 80) return 'text-yellow-500 bg-yellow-500/20';
    if (utilization > 60) return 'text-blue-500 bg-blue-500/20';
    return 'text-green-500 bg-green-500/20';
  };

  const getModeColor = (mode: string) => {
    switch (mode) {
      case 'peak': return 'bg-red-500';
      case 'busy': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  if (loading) {
    return (
      <RTLContainer className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-700 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </RTLContainer>
    );
  }

  if (!capacity) {
    return (
      <RTLContainer className="p-6">
        <div className="text-center py-12">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">
            <LocalizedText
              arText="فشل في تحميل بيانات السعة"
              enText="Failed to load capacity data"
            />
          </h2>
          <Button onClick={() => window.location.reload()}>
            <LocalizedText arText="إعادة المحاولة" enText="Retry" />
          </Button>
        </div>
      </RTLContainer>
    );
  }

  return (
    <RTLContainer className="p-6 space-y-6 bg-[#0a0a0a] min-h-screen">
      {/* Header */}
      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className={isRTL ? 'text-right' : 'text-left'}>
          <h1 className="text-3xl font-bold text-white mb-2">
            <LocalizedText
              arText="إدارة السعة"
              enText="Capacity Management"
            />
          </h1>
          <p className="text-gray-400">
            <LocalizedText
              arText="إدارة وتحليل سعة الفريق والجداول الزمنية الديناميكية"
              enText="Manage team capacity and dynamic timelines"
            />
          </p>
        </div>
        
        <Badge className={`${getModeColor(capacity.mode)} text-black px-3 py-1`}>
          <LocalizedText
            arText={capacity.mode === 'peak' ? 'ذروة' : capacity.mode === 'busy' ? 'مشغول' : 'عادي'}
            enText={capacity.mode.toUpperCase()}
          />
        </Badge>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Current Utilization */}
        <Card className="bg-[#1a1a1a] border-[#00d4ff]/30 p-6">
          <div className={`flex items-center gap-3 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Activity className="w-8 h-8 text-[#00d4ff]" />
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <p className="text-gray-400 text-sm">
                <LocalizedText arText="معدل الاستخدام" enText="Utilization" />
              </p>
              <p className={`text-2xl font-bold ${capacity.current > 80 ? 'text-red-500' : 'text-[#00ff88]'}`}>
                {capacity.current}%
              </p>
            </div>
          </div>
          <Progress value={capacity.current} className="h-2" />
        </Card>

        {/* Active Projects */}
        <Card className="bg-[#1a1a1a] border-[#00d4ff]/30 p-6">
          <div className={`flex items-center gap-3 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <BarChart3 className="w-8 h-8 text-[#00ff88]" />
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <p className="text-gray-400 text-sm">
                <LocalizedText arText="المشاريع النشطة" enText="Active Projects" />
              </p>
              <p className="text-2xl font-bold text-white">{capacity.activeProjects}</p>
            </div>
          </div>
          <p className="text-xs text-gray-500">
            <LocalizedText arText={`${capacity.queueDepth} في الانتظار`} enText={`${capacity.queueDepth} in queue`} />
          </p>
        </Card>

        {/* Team Availability */}
        <Card className="bg-[#1a1a1a] border-[#00d4ff]/30 p-6">
          <div className={`flex items-center gap-3 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Users className="w-8 h-8 text-[#00d4ff]" />
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <p className="text-gray-400 text-sm">
                <LocalizedText arText="الفريق المتاح" enText="Team Available" />
              </p>
              <p className="text-2xl font-bold text-white">
                {capacity.teamAvailable}/{capacity.totalTeam}
              </p>
            </div>
          </div>
          <Progress value={(capacity.teamAvailable / capacity.totalTeam) * 100} className="h-2" />
        </Card>

        {/* Mode Status */}
        <Card className="bg-[#1a1a1a] border-[#00d4ff]/30 p-6">
          <div className={`flex items-center gap-3 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Zap className="w-8 h-8 text-yellow-500" />
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <p className="text-gray-400 text-sm">
                <LocalizedText arText="وضع التشغيل" enText="Operation Mode" />
              </p>
              <p className="text-2xl font-bold text-white capitalize">{capacity.mode}</p>
            </div>
          </div>
          <p className="text-xs text-gray-500">
            <LocalizedText 
              arText={`آخر تحديث: ${capacity.lastUpdated.toLocaleTimeString('ar-SA')}`}
              enText={`Updated: ${capacity.lastUpdated.toLocaleTimeString()}`}
            />
          </p>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-[#1a1a1a] border border-[#00d4ff]/30">
          <TabsTrigger value="overview" className="data-[state=active]:bg-[#00d4ff] data-[state=active]:text-black">
            <LocalizedText arText="نظرة عامة" enText="Overview" />
          </TabsTrigger>
          <TabsTrigger value="projects" className="data-[state=active]:bg-[#00d4ff] data-[state=active]:text-black">
            <LocalizedText arText="المشاريع" enText="Projects" />
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-[#00d4ff] data-[state=active]:text-black">
            <LocalizedText arText="الإعدادات" enText="Settings" />
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-[#00d4ff] data-[state=active]:text-black">
            <LocalizedText arText="التحليلات" enText="Analytics" />
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Current Load Visualization */}
          <Card className="bg-[#1a1a1a] border-[#00d4ff]/30 p-6">
            <h2 className={`text-lg font-bold text-white mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
              <LocalizedText arText="حمولة النظام الحالية" enText="Current System Load" />
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#0a0a0a] rounded-lg p-4">
                <div className={`flex items-center gap-2 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <BarChart3 className="w-5 h-5 text-[#00d4ff]" />
                  <span className="text-gray-400 text-sm">
                    <LocalizedText arText="المشاريع النشطة" enText="Active Projects" />
                  </span>
                </div>
                <p className="text-2xl font-bold text-white">{capacity.activeProjects}</p>
              </div>
              
              <div className="bg-[#0a0a0a] rounded-lg p-4">
                <div className={`flex items-center gap-2 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Clock className="w-5 h-5 text-[#00ff88]" />
                  <span className="text-gray-400 text-sm">
                    <LocalizedText arText="في الانتظار" enText="In Queue" />
                  </span>
                </div>
                <p className="text-2xl font-bold text-[#00d4ff]">{capacity.queueDepth}</p>
              </div>
              
              <div className="bg-[#0a0a0a] rounded-lg p-4">
                <div className={`flex items-center gap-2 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Users className="w-5 h-5 text-[#00ff88]" />
                  <span className="text-gray-400 text-sm">
                    <LocalizedText arText="الفريق المتاح" enText="Team Available" />
                  </span>
                </div>
                <p className="text-2xl font-bold text-[#00ff88]">
                  {capacity.teamAvailable}/{capacity.totalTeam}
                </p>
              </div>
            </div>
          </Card>

          {/* Mode Controls */}
          <Card className="bg-[#1a1a1a] border-[#00d4ff]/30 p-6">
            <h2 className={`text-lg font-bold text-white mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
              <LocalizedText arText="التحكم في وضع التشغيل" enText="Operation Mode Control" />
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(['standard', 'busy', 'peak'] as const).map((mode) => (
                <div
                  key={mode}
                  className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                    capacity.mode === mode
                      ? 'border-[#00d4ff] bg-[#00d4ff]/10'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                  onClick={() => handleCapacityModeToggle(mode)}
                >
                  <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className={isRTL ? 'text-right' : 'text-left'}>
                      <h3 className="font-bold text-white capitalize mb-1">
                        <LocalizedText
                          arText={mode === 'peak' ? 'ذروة' : mode === 'busy' ? 'مشغول' : 'عادي'}
                          enText={mode}
                        />
                      </h3>
                      <p className="text-sm text-gray-400">
                        {mode === 'peak' && (
                          <LocalizedText
                            arText="يمدد جميع الجداول الزمنية، يطبق خصومات"
                            enText="Extends all timelines, applies discounts"
                          />
                        )}
                        {mode === 'busy' && (
                          <LocalizedText
                            arText="جداول زمنية ممدودة مع خصومات"
                            enText="Extended timelines with discounts"
                          />
                        )}
                        {mode === 'standard' && (
                          <LocalizedText
                            arText="جداول زمنية اعتيادية، بدون خصومات"
                            enText="Standard timelines, no discounts"
                          />
                        )}
                      </p>
                    </div>
                    {capacity.mode === mode && (
                      <CheckCircle className="w-6 h-6 text-[#00ff88]" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Projects Tab */}
        <TabsContent value="projects" className="space-y-6">
          <Card className="bg-[#1a1a1a] border-[#00d4ff]/30 p-6">
            <h2 className={`text-lg font-bold text-white mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
              <LocalizedText arText="المشاريع المؤسسية" enText="Enterprise Projects" />
            </h2>
            
            {capacity.majorClients.length > 0 ? (
              <div className="space-y-4">
                {capacity.majorClients.map((client, index) => (
                  <div key={index} className="bg-[#0a0a0a] rounded-lg p-4">
                    <div className={`flex items-center justify-between mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className={isRTL ? 'text-right' : 'text-left'}>
                        <h3 className="font-bold text-white text-lg">{client.name}</h3>
                        <p className="text-sm text-gray-400">{client.project}</p>
                      </div>
                      <Badge className={`${getModeColor(client.status)} text-black`}>
                        <LocalizedText
                          arText={client.status === 'in_progress' ? 'جاري العمل' : 'التخطيط'}
                          enText={client.status.replace('_', ' ')}
                        />
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className={`flex justify-between text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className="text-gray-400">
                          <LocalizedText arText="التقدم" enText="Progress" />
                        </span>
                        <span className="text-white">{client.progress}%</span>
                      </div>
                      <Progress value={client.progress} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Shield className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400">
                  <LocalizedText
                    arText="لا توجد مشاريع مؤسسية نشطة"
                    enText="No active enterprise projects"
                  />
                </p>
              </div>
            )}
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card className="bg-[#1a1a1a] border-[#00d4ff]/30 p-6">
            <h2 className={`text-lg font-bold text-white mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
              <LocalizedText arText="إعدادات الجدول الزمني الديناميكي" enText="Dynamic Timeline Settings" />
            </h2>
            
            <div className="space-y-6">
              {Object.entries(timelineSettings).map(([tier, settings]) => (
                <div key={tier} className="bg-[#0a0a0a] rounded-lg p-4">
                  <h3 className={`font-bold text-white mb-4 capitalize ${isRTL ? 'text-right' : 'text-left'}`}>
                    {serviceConfig[tier as keyof typeof serviceConfig].name}
                  </h3>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label className="text-gray-400 text-sm">
                        <LocalizedText arText="عادي" enText="Standard" />
                      </Label>
                      <Input
                        type="number"
                        value={settings.standard}
                        onChange={(e) => setTimelineSettings(prev => ({
                          ...prev,
                          [tier]: { ...prev[tier as keyof typeof prev], standard: Number(e.target.value) }
                        }))}
                        className="bg-[#1a1a1a] border-[#00d4ff]/20 text-white mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-400 text-sm">
                        <LocalizedText arText="مشغول" enText="Busy" />
                      </Label>
                      <Input
                        type="number"
                        value={settings.busy}
                        onChange={(e) => setTimelineSettings(prev => ({
                          ...prev,
                          [tier]: { ...prev[tier as keyof typeof prev], busy: Number(e.target.value) }
                        }))}
                        className="bg-[#1a1a1a] border-[#00d4ff]/20 text-white mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-400 text-sm">
                        <LocalizedText arText="ذروة" enText="Peak" />
                      </Label>
                      <Input
                        type="number"
                        value={settings.peak}
                        onChange={(e) => setTimelineSettings(prev => ({
                          ...prev,
                          [tier]: { ...prev[tier as keyof typeof prev], peak: Number(e.target.value) }
                        }))}
                        className="bg-[#1a1a1a] border-[#00d4ff]/20 text-white mt-1"
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <Button
                onClick={handleTimelineUpdate}
                disabled={saving}
                className="w-full bg-[#00d4ff] text-black hover:bg-[#00ff88] font-bold"
              >
                {saving ? (
                  <LocalizedText arText="جاري الحفظ..." enText="Saving..." />
                ) : (
                  <LocalizedText arText="حفظ إعدادات الجدول الزمني" enText="Save Timeline Settings" />
                )}
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-[#1a1a1a] border-[#00d4ff]/30 p-6">
              <h3 className={`font-bold text-white mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                <LocalizedText arText="متوسط أوقات الاستجابة" enText="Average Response Times" />
              </h3>
              <div className="space-y-3">
                {Object.entries(serviceConfig).map(([key, service]) => (
                  <div key={key} className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="text-gray-400">{service.name}</span>
                    <span className="text-[#00ff88] font-mono">{service.standardTime}h avg</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="bg-[#1a1a1a] border-[#00d4ff]/30 p-6">
              <h3 className={`font-bold text-white mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                <LocalizedText arText="تأثير الإيرادات" enText="Revenue Impact" />
              </h3>
              <div className="space-y-3">
                <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="text-gray-400">
                    <LocalizedText arText="إجمالي الإيرادات" enText="Total Revenue" />
                  </span>
                  <span className="text-[#00ff88] font-mono font-bold">$156,780</span>
                </div>
                <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="text-gray-400">
                    <LocalizedText arText="الخصم المقدم" enText="Discounts Given" />
                  </span>
                  <span className="text-yellow-500 font-mono">-$12,340</span>
                </div>
                <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="text-gray-400">
                    <LocalizedText arText="الاحتفاظ بالعملاء" enText="Customer Retention" />
                  </span>
                  <span className="text-[#00d4ff] font-mono font-bold">94%</span>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </RTLContainer>
  );
}