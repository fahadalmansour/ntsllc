/**
 * Capacity System Demo - Testing interface for the dynamic capacity system
 * Shows real-time capacity changes and checkout flow
 */

import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Activity, 
  Clock, 
  AlertCircle, 
  Users, 
  ShoppingCart,
  Settings,
  BarChart3,
  Zap,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { LocalizedText, RTLContainer } from '../LanguageSwitcher';
import { 
  getCurrentCapacityLoad,
  calculateDeliveryTime,
  updateCapacityStatus,
  serviceConfig,
  CapacityStatus,
  DeliveryEstimate
} from '../../lib/capacity-management';
import CapacityBanner from './CapacityBanner';
import CapacityStatusWidget from './CapacityStatusWidget';
import DynamicCheckout from './DynamicCheckout';

interface CapacityDemoProps {
  onNavigate?: (section: string) => void;
}

export default function CapacityDemo({ onNavigate }: CapacityDemoProps) {
  const { language, isRTL } = useLanguage();
  const [capacity, setCapacity] = useState<CapacityStatus | null>(null);
  const [estimates, setEstimates] = useState<Record<string, DeliveryEstimate>>({});
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedService, setSelectedService] = useState<'lightning' | 'thunder' | 'storm'>('lightning');
  const [loading, setLoading] = useState(true);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        const capacityData = await getCurrentCapacityLoad();
        setCapacity(capacityData);

        // Get estimates for all services
        const serviceEstimates: Record<string, DeliveryEstimate> = {};
        for (const service of ['lightning', 'thunder', 'storm'] as const) {
          serviceEstimates[service] = await calculateDeliveryTime(service);
        }
        setEstimates(serviceEstimates);
      } catch (error) {
        console.error('Failed to load capacity data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
    
    // Auto-refresh every 10 seconds for demo
    const interval = setInterval(loadData, 10000);
    return () => clearInterval(interval);
  }, []);

  const simulateCapacityChange = async (mode: 'standard' | 'busy' | 'peak') => {
    if (!capacity) return;
    
    const newUtilization = mode === 'peak' ? 95 : mode === 'busy' ? 85 : 65;
    const majorClients = mode === 'peak' ? [{ 
      name: 'HungerStation', 
      project: 'Multi-vendor platform', 
      progress: 75, 
      status: 'in_progress' as const 
    }] : [];
    
    await updateCapacityStatus({
      mode,
      current: newUtilization,
      majorClients
    });
    
    // Reload data
    const newCapacity = await getCurrentCapacityLoad();
    setCapacity(newCapacity);
    
    // Update estimates
    const serviceEstimates: Record<string, DeliveryEstimate> = {};
    for (const service of ['lightning', 'thunder', 'storm'] as const) {
      serviceEstimates[service] = await calculateDeliveryTime(service);
    }
    setEstimates(serviceEstimates);
  };

  if (loading) {
    return (
      <RTLContainer className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#00d4ff] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#C0C5CE]">
            <LocalizedText arText="جاري تحميل نظام إدارة السعة..." enText="Loading Capacity Management System..." />
          </p>
        </div>
      </RTLContainer>
    );
  }

  if (showCheckout) {
    return (
      <DynamicCheckout
        selectedService={selectedService}
        onBack={() => setShowCheckout(false)}
        onComplete={(orderData) => {
          console.log('Demo order completed:', orderData);
          setShowCheckout(false);
          alert(`Demo Order Completed! Order ID: ${orderData.id}`);
        }}
      />
    );
  }

  const getModeColor = (mode: string) => {
    switch (mode) {
      case 'peak': return 'bg-red-500';
      case 'busy': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  return (
    <RTLContainer className="min-h-screen bg-[#0a0a0a] p-6 space-y-6">
      {/* Header */}
      <div className={`text-center mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
        <h1 className="text-4xl font-bold text-[#C0C5CE] mb-4">
          <LocalizedText
            arText="🧪 عرض توضيحي لنظام إدارة السعة الديناميكي"
            enText="🧪 Dynamic Capacity Management System Demo"
          />
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          <LocalizedText
            arText="اختبر نظام إدارة السعة الذكي مع التسعير الديناميكي والإشعارات الشفافة"
            enText="Test the intelligent capacity management system with dynamic pricing and transparent notifications"
          />
        </p>
      </div>

      {/* Live Capacity Banner */}
      <CapacityBanner 
        onViewDetails={() => console.log('View details clicked')}
        onDismiss={() => console.log('Banner dismissed')}
      />

      {/* Main Demo Interface */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-[#1a1a1a] border border-[#00d4ff]/30 grid grid-cols-4">
          <TabsTrigger value="overview">
            <LocalizedText arText="نظرة عامة" enText="Overview" />
          </TabsTrigger>
          <TabsTrigger value="simulate">
            <LocalizedText arText="محاكاة" enText="Simulate" />
          </TabsTrigger>
          <TabsTrigger value="checkout">
            <LocalizedText arText="الدفع" enText="Checkout" />
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <LocalizedText arText="التحليلات" enText="Analytics" />
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Current Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-[#1a1a1a] border-[#00d4ff]/30 p-6">
              <div className={`flex items-center gap-3 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Activity className="w-8 h-8 text-[#00d4ff]" />
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <p className="text-gray-400 text-sm">
                    <LocalizedText arText="الاستخدام الحالي" enText="Current Utilization" />
                  </p>
                  <p className="text-2xl font-bold text-[#C0C5CE]">{capacity?.current}%</p>
                </div>
              </div>
              <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={`w-3 h-3 rounded-full ${getModeColor(capacity?.mode || 'standard')}`}></div>
                <Badge className={`${getModeColor(capacity?.mode || 'standard')} text-black text-xs`}>
                  <LocalizedText
                    arText={capacity?.mode === 'peak' ? 'ذروة' : capacity?.mode === 'busy' ? 'مشغول' : 'عادي'}
                    enText={capacity?.mode?.toUpperCase() || 'STANDARD'}
                  />
                </Badge>
              </div>
            </Card>

            <Card className="bg-[#1a1a1a] border-[#00d4ff]/30 p-6">
              <div className={`flex items-center gap-3 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <BarChart3 className="w-8 h-8 text-[#00ff88]" />
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <p className="text-gray-400 text-sm">
                    <LocalizedText arText="المشاريع النشطة" enText="Active Projects" />
                  </p>
                  <p className="text-2xl font-bold text-[#C0C5CE]">{capacity?.activeProjects}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500">
                <LocalizedText arText={`${capacity?.queueDepth} في الانتظار`} enText={`${capacity?.queueDepth} in queue`} />
              </p>
            </Card>

            <Card className="bg-[#1a1a1a] border-[#00d4ff]/30 p-6">
              <div className={`flex items-center gap-3 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Users className="w-8 h-8 text-[#00d4ff]" />
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <p className="text-gray-400 text-sm">
                    <LocalizedText arText="الفريق المتاح" enText="Team Available" />
                  </p>
                  <p className="text-2xl font-bold text-[#C0C5CE]">
                    {capacity?.teamAvailable}/{capacity?.totalTeam}
                  </p>
                </div>
              </div>
              <CapacityStatusWidget 
                showDetails={false}
                className="mt-2"
              />
            </Card>
          </div>

          {/* Service Timeline Estimates */}
          <Card className="bg-[#1a1a1a] border-[#00d4ff]/30 p-6">
            <h2 className={`text-xl font-bold text-[#C0C5CE] mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
              <LocalizedText arText="تقديرات الجدول الزمني الحالية" enText="Current Timeline Estimates" />
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(serviceConfig).map(([key, service]) => {
                const estimate = estimates[key];
                if (!estimate) return null;
                
                return (
                  <div key={key} className="bg-[#0a0a0a] rounded-lg p-4">
                    <div className={`flex items-center justify-between mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <h3 className="font-bold text-[#C0C5CE]">{service.name}</h3>
                      <Zap className="w-5 h-5 text-[#00d4ff]" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className={`flex justify-between text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className="text-gray-400">
                          <LocalizedText arText="الوقت:" enText="Timeline:" />
                        </span>
                        <span className={`font-mono ${estimate.timeline !== estimate.originalTimeline ? 'text-yellow-500' : 'text-[#00ff88]'}`}>
                          {estimate.timeline}h
                        </span>
                      </div>
                      
                      <div className={`flex justify-between text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className="text-gray-400">
                          <LocalizedText arText="السعر:" enText="Price:" />
                        </span>
                        <span className="font-mono text-[#00ff88]">
                          ${estimate.adjustedPrice}
                        </span>
                      </div>
                      
                      {estimate.discount > 0 && (
                        <div className={`flex justify-between text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <span className="text-gray-400">
                            <LocalizedText arText="خصم:" enText="Discount:" />
                          </span>
                          <span className="font-mono text-[#00d4ff]">
                            -{estimate.discount}%
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <Badge variant={estimate.status === 'standard' ? 'default' : 'secondary'} className="mt-3">
                      <LocalizedText
                        arText={estimate.status === 'peak' ? 'ذروة' : estimate.status === 'busy' ? 'مشغول' : 'عادي'}
                        enText={estimate.status.toUpperCase()}
                      />
                    </Badge>
                  </div>
                );
              })}
            </div>
          </Card>
        </TabsContent>

        {/* Simulation Tab */}
        <TabsContent value="simulate" className="space-y-6">
          <Card className="bg-[#1a1a1a] border-[#00d4ff]/30 p-6">
            <h2 className={`text-xl font-bold text-[#C0C5CE] mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
              <LocalizedText arText="محاكاة أحمال السعة" enText="Simulate Capacity Loads" />
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                onClick={() => simulateCapacityChange('standard')}
                className="bg-green-600 hover:bg-green-700 text-[#C0C5CE]"
              >
                <CheckCircle className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                <LocalizedText arText="وضع عادي (65%)" enText="Standard Mode (65%)" />
              </Button>
              
              <Button
                onClick={() => simulateCapacityChange('busy')}
                className="bg-yellow-600 hover:bg-yellow-700 text-[#C0C5CE]"
              >
                <Clock className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                <LocalizedText arText="وضع مشغول (85%)" enText="Busy Mode (85%)" />
              </Button>
              
              <Button
                onClick={() => simulateCapacityChange('peak')}
                className="bg-red-600 hover:bg-red-700 text-[#C0C5CE]"
              >
                <AlertCircle className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                <LocalizedText arText="وضع الذروة (95%)" enText="Peak Mode (95%)" />
              </Button>
            </div>
            
            <div className="mt-6 p-4 bg-[#0a0a0a] rounded-lg">
              <p className="text-gray-300 text-sm">
                <LocalizedText
                  arText="💡 نصيحة: جرب تغيير الأوضاع لترى كيف يؤثر ذلك على التسعير والجداول الزمنية"
                  enText="💡 Tip: Try changing modes to see how it affects pricing and timelines"
                />
              </p>
            </div>
          </Card>
        </TabsContent>

        {/* Checkout Demo Tab */}
        <TabsContent value="checkout" className="space-y-6">
          <Card className="bg-[#1a1a1a] border-[#00d4ff]/30 p-6">
            <h2 className={`text-xl font-bold text-[#C0C5CE] mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
              <LocalizedText arText="تجربة الدفع الديناميكي" enText="Dynamic Checkout Experience" />
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {Object.entries(serviceConfig).map(([key, service]) => (
                <div
                  key={key}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedService === key
                      ? 'border-[#00d4ff] bg-[#00d4ff]/10'
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                  onClick={() => setSelectedService(key as any)}
                >
                  <h3 className="font-bold text-[#C0C5CE] mb-2">{service.name}</h3>
                  <p className="text-gray-400 text-sm">
                    ${estimates[key]?.adjustedPrice || service.basePrice}
                  </p>
                  <p className="text-[#00d4ff] text-sm">
                    {estimates[key]?.timeline || service.standardTime}h delivery
                  </p>
                </div>
              ))}
            </div>
            
            <Button
              onClick={() => setShowCheckout(true)}
              className="w-full bg-gradient-to-r from-[#00d4ff] to-[#00ff88] text-black font-bold py-3"
            >
              <ShoppingCart className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              <LocalizedText
                arText="تجربة الدفع الديناميكي"
                enText="Try Dynamic Checkout"
              />
              <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180 mr-2' : 'ml-2'}`} />
            </Button>
            
            <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <p className="text-yellow-400 text-sm">
                <LocalizedText
                  arText="⚠️ هذا عرض توضيحي - لن يتم تحصيل أي رسوم"
                  enText="⚠️ This is a demo - no actual charges will be made"
                />
              </p>
            </div>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-[#1a1a1a] border-[#00d4ff]/30 p-6">
              <h3 className={`font-bold text-[#C0C5CE] mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                <LocalizedText arText="إحصائيات النظام" enText="System Statistics" />
              </h3>
              <div className="space-y-3">
                <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="text-gray-400">
                    <LocalizedText arText="الطلبات اليوم:" enText="Orders Today:" />
                  </span>
                  <span className="text-[#00ff88] font-mono">47</span>
                </div>
                <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="text-gray-400">
                    <LocalizedText arText="معدل القبول:" enText="Acceptance Rate:" />
                  </span>
                  <span className="text-[#00d4ff] font-mono">94%</span>
                </div>
                <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="text-gray-400">
                    <LocalizedText arText="متوسط الخصم:" enText="Avg Discount:" />
                  </span>
                  <span className="text-yellow-500 font-mono">12%</span>
                </div>
              </div>
            </Card>

            <Card className="bg-[#1a1a1a] border-[#00d4ff]/30 p-6">
              <h3 className={`font-bold text-[#C0C5CE] mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                <LocalizedText arText="رضا العملاء" enText="Customer Satisfaction" />
              </h3>
              <div className="space-y-3">
                <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="text-gray-400">
                    <LocalizedText arText="الشفافية:" enText="Transparency:" />
                  </span>
                  <span className="text-[#00ff88] font-mono">4.9/5</span>
                </div>
                <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="text-gray-400">
                    <LocalizedText arText="العدالة:" enText="Fairness:" />
                  </span>
                  <span className="text-[#00d4ff] font-mono">4.8/5</span>
                </div>
                <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="text-gray-400">
                    <LocalizedText arText="التواصل:" enText="Communication:" />
                  </span>
                  <span className="text-[#00ff88] font-mono">4.9/5</span>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Navigation */}
      <div className="text-center">
        <Button
          onClick={() => onNavigate?.('landing')}
          variant="outline"
          className="border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff]/10"
        >
          <LocalizedText arText="العودة للموقع" enText="Back to Website" />
        </Button>
      </div>
    </RTLContainer>
  );
}