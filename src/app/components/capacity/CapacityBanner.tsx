/**
 * Capacity Banner - Website-wide notification for capacity changes
 * Shows when timelines are adjusted due to high demand
 */

import React, { useState, useEffect } from 'react';
import { AlertCircle, X, ArrowRight, Clock } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useLanguage } from '../../contexts/LanguageContext';
import { LocalizedText } from '../LanguageSwitcher';
import { getCurrentCapacityLoad, CapacityStatus } from '../../lib/capacity-management';

interface CapacityBannerProps {
  onViewDetails?: () => void;
  onDismiss?: () => void;
}

export default function CapacityBanner({ onViewDetails, onDismiss }: CapacityBannerProps) {
  const { language, isRTL } = useLanguage();
  const [capacity, setCapacity] = useState<CapacityStatus | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const checkCapacity = async () => {
      try {
        const data = await getCurrentCapacityLoad();
        setCapacity(data);
        
        // Show banner if capacity is adjusted and not previously dismissed
        const dismissed = localStorage.getItem('capacity-banner-dismissed');
        if (data.mode !== 'standard' && !dismissed) {
          setIsVisible(true);
        }
      } catch (error) {
        console.error('Failed to load capacity data for banner:', error);
      }
    };

    checkCapacity();
    
    // Check every 5 minutes
    const interval = setInterval(checkCapacity, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem('capacity-banner-dismissed', Date.now().toString());
    onDismiss?.();
  };

  const getDiscountForMode = (mode: string) => {
    switch (mode) {
      case 'peak': return 20;
      case 'busy': return 10;
      default: return 0;
    }
  };

  const getModeColor = (mode: string) => {
    switch (mode) {
      case 'peak': return 'from-red-500/20 to-orange-500/20 border-red-500/30';
      case 'busy': return 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30';
      default: return 'from-blue-500/20 to-green-500/20 border-blue-500/30';
    }
  };

  const getIcon = (mode: string) => {
    switch (mode) {
      case 'peak': return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'busy': return <Clock className="w-5 h-5 text-yellow-500" />;
      default: return <AlertCircle className="w-5 h-5 text-blue-500" />;
    }
  };

  if (!capacity || !isVisible || isDismissed || capacity.mode === 'standard') {
    return null;
  }

  const discount = getDiscountForMode(capacity.mode);
  const majorClient = capacity.majorClients[0]?.name;

  return (
    <div className={`bg-gradient-to-r ${getModeColor(capacity.mode)} border-y`}>
      <div className="container mx-auto px-4 py-3">
        <div className={`flex items-center justify-between gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          
          {/* Main Content */}
          <div className={`flex items-center gap-3 flex-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {getIcon(capacity.mode)}
            
            <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
              <div className={`flex items-center gap-2 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className="text-[#C0C5CE] font-medium">
                  <LocalizedText
                    arText={capacity.mode === 'peak' ? 'طلب عالي جداً:' : 'طلب عالي:'}
                    enText={capacity.mode === 'peak' ? 'Very High Demand:' : 'High Demand:'}
                  />
                </span>
                
                {majorClient && (
                  <span className="text-gray-200 text-sm">
                    <LocalizedText
                      arText={`حالياً نخدم ${majorClient}`}
                      enText={`Currently serving ${majorClient}`}
                    />
                  </span>
                )}
                
                <Badge className="bg-[#00ff88] text-black text-xs">
                  <LocalizedText
                    arText={`خصم ${discount}%`}
                    enText={`${discount}% Discount`}
                  />
                </Badge>
              </div>
              
              <p className="text-gray-300 text-sm mt-1">
                <LocalizedText
                  arText="جداول زمنية ممدودة مع خصومات تعويضية تلقائية."
                  enText="Extended timelines with automatic compensation discounts."
                />
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {onViewDetails && (
              <Button
                onClick={onViewDetails}
                variant="outline"
                size="sm"
                className="border-[#C0C5CE]/30 text-[#C0C5CE] hover:bg-[#C0C5CE]/10 text-xs"
              >
                <LocalizedText arText="التفاصيل" enText="Details" />
                <ArrowRight className={`w-3 h-3 ${isRTL ? 'rotate-180 mr-1' : 'ml-1'}`} />
              </Button>
            )}
            
            <Button
              onClick={handleDismiss}
              variant="ghost"
              size="sm"
              className="text-[#C0C5CE]/70 hover:text-[#C0C5CE] hover:bg-[#C0C5CE]/10 p-1"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {/* Mobile-specific layout adjustments */}
        <div className="block md:hidden mt-2">
          <div className={`flex items-center gap-2 text-xs ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className="text-gray-300">
              <LocalizedText
                arText="احجز الآن مع الخصم أو انضم لقائمة الانتظار"
                enText="Book now with discount or join waitlist"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Capacity Alert Modal - For detailed capacity information
 */
interface CapacityAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  capacity: CapacityStatus;
}

export function CapacityAlertModal({ isOpen, onClose, capacity }: CapacityAlertModalProps) {
  const { language, isRTL } = useLanguage();

  if (!isOpen) return null;

  const discount = getDiscountForMode(capacity.mode);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#1a1a1a] rounded-2xl max-w-2xl w-full border-2 border-[#00d4ff] shadow-2xl">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#00d4ff]/20 to-[#00ff88]/20 p-6 rounded-t-2xl">
          <div className={`flex justify-between items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <h2 className="text-2xl font-bold text-white mb-2">
                <LocalizedText
                  arText="تحديث حالة السعة"
                  enText="Capacity Status Update"
                />
              </h2>
              <p className="text-gray-300">
                <LocalizedText
                  arText="معلومات مفصلة حول الجداول الزمنية الحالية"
                  enText="Detailed information about current timelines"
                />
              </p>
            </div>
            
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-white/70 hover:text-white"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Current Status */}
          <div className="bg-[#0a0a0a] rounded-lg p-4">
            <h3 className={`font-bold text-white mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
              <LocalizedText
                arText="الحالة الحالية"
                enText="Current Status"
              />
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className={isRTL ? 'text-right' : 'text-left'}>
                <p className="text-gray-400 text-sm">
                  <LocalizedText arText="وضع التشغيل" enText="Operation Mode" />
                </p>
                <p className="text-xl font-bold text-[#00d4ff] capitalize">
                  <LocalizedText
                    arText={capacity.mode === 'peak' ? 'ذروة' : capacity.mode === 'busy' ? 'مشغول' : 'عادي'}
                    enText={capacity.mode}
                  />
                </p>
              </div>
              
              <div className={isRTL ? 'text-right' : 'text-left'}>
                <p className="text-gray-400 text-sm">
                  <LocalizedText arText="معدل الاستخدام" enText="Utilization" />
                </p>
                <p className="text-xl font-bold text-[#00ff88]">{capacity.current}%</p>
              </div>
            </div>
          </div>
          
          {/* Timeline Adjustments */}
          <div className="bg-[#0a0a0a] rounded-lg p-4">
            <h3 className={`font-bold text-white mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
              <LocalizedText
                arText="تعديلات الجدول الزمني"
                enText="Timeline Adjustments"
              />
            </h3>
            
            <div className="space-y-3">
              {[
                { name: 'Lightning', ar: 'البرق', standard: 4, current: capacity.mode === 'peak' ? 12 : capacity.mode === 'busy' ? 8 : 4 },
                { name: 'Thunder', ar: 'الرعد', standard: 24, current: capacity.mode === 'peak' ? 72 : capacity.mode === 'busy' ? 48 : 24 },
                { name: 'Storm', ar: 'العاصفة', standard: 72, current: capacity.mode === 'peak' ? 168 : capacity.mode === 'busy' ? 120 : 72 }
              ].map((service) => (
                <div key={service.name} className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="text-gray-300">
                    <LocalizedText arText={service.ar} enText={service.name} />
                  </span>
                  <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    {service.current !== service.standard && (
                      <span className="text-gray-500 line-through text-sm">
                        {service.standard}h
                      </span>
                    )}
                    <span className="text-[#00d4ff] font-bold">
                      {service.current}h
                    </span>
                    {service.current !== service.standard && (
                      <Badge className="bg-[#00ff88] text-black text-xs">
                        -{discount}%
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Major Clients */}
          {capacity.majorClients.length > 0 && (
            <div className="bg-[#0a0a0a] rounded-lg p-4">
              <h3 className={`font-bold text-white mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                <LocalizedText
                  arText="المشاريع المؤسسية النشطة"
                  enText="Active Enterprise Projects"
                />
              </h3>
              
              {capacity.majorClients.map((client, index) => (
                <div key={index} className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <p className="text-white font-medium">{client.name}</p>
                    <p className="text-gray-400 text-sm">{client.project}</p>
                  </div>
                  <div className={`text-center ${isRTL ? 'text-left' : 'text-right'}`}>
                    <p className="text-[#00ff88] font-bold">{client.progress}%</p>
                    <p className="text-gray-400 text-xs capitalize">{client.status.replace('_', ' ')}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Action */}
          <div className="text-center">
            <Button
              onClick={onClose}
              className="bg-[#00d4ff] text-black hover:bg-[#00ff88] font-bold px-8"
            >
              <LocalizedText
                arText="فهمت"
                enText="Got It"
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function (duplicate from above for standalone usage)
function getDiscountForMode(mode: string) {
  switch (mode) {
    case 'peak': return 20;
    case 'busy': return 10;
    default: return 0;
  }
}