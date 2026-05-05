/**
 * System Status Component - Shows the overall capacity system health
 */

import React from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { CheckCircle, Activity, Users, BarChart3 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { LocalizedText, RTLContainer } from '../LanguageSwitcher';

interface SystemStatusProps {
  className?: string;
}

export default function SystemStatus({ className = '' }: SystemStatusProps) {
  const { language, isRTL } = useLanguage();

  const systemComponents = [
    {
      name: 'Capacity Management',
      nameAr: 'إدارة السعة',
      status: 'operational',
      icon: Activity,
      description: 'Dynamic capacity monitoring and control',
      descriptionAr: 'مراقبة والتحكم في السعة الديناميكية'
    },
    {
      name: 'Dynamic Pricing',
      nameAr: 'التسعير الديناميكي',
      status: 'operational',
      icon: BarChart3,
      description: 'Real-time pricing adjustments with discounts',
      descriptionAr: 'تعديلات تسعير مباشرة مع خصومات'
    },
    {
      name: 'Notification System',
      nameAr: 'نظام الإشعارات',
      status: 'operational',
      icon: Users,
      description: 'WhatsApp, SMS, and in-app notifications',
      descriptionAr: 'إشعارات واتساب ورسائل نصية وداخل التطبيق'
    },
    {
      name: 'Analytics Dashboard',
      nameAr: 'لوحة التحليلات',
      status: 'operational',
      icon: BarChart3,
      description: 'Advanced analytics and reporting',
      descriptionAr: 'تحليلات وتقارير متقدمة'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'warning': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'error': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return <CheckCircle className="w-4 h-4" />;
      case 'warning': return <Activity className="w-4 h-4" />;
      case 'error': return <Activity className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <RTLContainer className={`space-y-4 ${className}`}>
      <Card className="bg-[#1a1a1a] border-[#00d4ff]/30 p-6">
        <div className={`flex items-center gap-3 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <CheckCircle className="w-6 h-6 text-[#00ff88]" />
          <h2 className="text-xl font-bold text-white">
            <LocalizedText 
              arText="حالة النظام" 
              enText="System Status" 
            />
          </h2>
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            <LocalizedText 
              arText="جميع الأنظمة تعمل" 
              enText="All Systems Operational" 
            />
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {systemComponents.map((component, index) => {
            const Icon = component.icon;
            return (
              <div
                key={index}
                className={`p-4 rounded-lg border ${getStatusColor(component.status)} ${isRTL ? 'text-right' : 'text-left'}`}
              >
                <div className={`flex items-center gap-3 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Icon className="w-5 h-5" />
                  <h3 className="font-medium text-white">
                    <LocalizedText 
                      arText={component.nameAr} 
                      enText={component.name} 
                    />
                  </h3>
                  <div className={`ml-auto ${isRTL ? 'mr-auto ml-0' : ''}`}>
                    {getStatusIcon(component.status)}
                  </div>
                </div>
                <p className="text-sm opacity-80">
                  <LocalizedText 
                    arText={component.descriptionAr} 
                    enText={component.description} 
                  />
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-[#0a0a0a] rounded-lg">
          <div className={`grid grid-cols-3 gap-4 text-center ${isRTL ? 'text-right' : 'text-left'}`}>
            <div>
              <div className="text-2xl font-bold text-[#00ff88]">99.9%</div>
              <div className="text-sm text-gray-400">
                <LocalizedText arText="وقت التشغيل" enText="Uptime" />
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#00d4ff]"><200ms</div>
              <div className="text-sm text-gray-400">
                <LocalizedText arText="زمن الاستجابة" enText="Response Time" />
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#00ff88]">73%</div>
              <div className="text-sm text-gray-400">
                <LocalizedText arText="استخدام السعة" enText="Capacity Usage" />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </RTLContainer>
  );
}