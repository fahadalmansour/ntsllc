/**
 * Pre-Payment Notification System
 * Transparent capacity notification before payment
 */

import React, { useState, useEffect } from 'react';
import { AlertCircle, Clock, Calendar, Zap, X, CheckCircle, ArrowRight } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useLanguage } from '../../contexts/LanguageContext';
import { RTLContainer, LocalizedText } from '../LanguageSwitcher';
import { DeliveryEstimate, serviceConfig } from '../../lib/capacity-management';

interface PrePaymentNoticeProps {
  service: 'lightning' | 'thunder' | 'storm';
  deliveryEstimate: DeliveryEstimate;
  onAccept: () => void;
  onReject: () => void;
  onSelectAlternative?: (slotId: string) => void;
}

export default function PrePaymentNotice({ 
  service, 
  deliveryEstimate,
  onAccept, 
  onReject,
  onSelectAlternative 
}: PrePaymentNoticeProps) {
  const { t, language, isRTL } = useLanguage();
  const [timeLeft, setTimeLeft] = useState(20);
  const [selectedAlternative, setSelectedAlternative] = useState<string | null>(null);
  
  const serviceInfo = serviceConfig[service];

  useEffect(() => {
    // 20-second countdown
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          onReject();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [onReject]);

  const handleAlternativeSelect = (slotId: string) => {
    setSelectedAlternative(slotId);
    onSelectAlternative?.(slotId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'peak': return 'border-red-500 bg-red-500/10';
      case 'busy': return 'border-yellow-500 bg-yellow-500/10';
      default: return 'border-[#00d4ff] bg-[#00d4ff]/10';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'peak': return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'busy': return <Clock className="w-5 h-5 text-yellow-500" />;
      default: return <CheckCircle className="w-5 h-5 text-[#00ff88]" />;
    }
  };

  return (
    <RTLContainer className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`bg-[#1a1a1a] rounded-2xl max-w-3xl w-full border-2 ${getStatusColor(deliveryEstimate.status)} shadow-2xl`}>
        
        {/* Header with countdown */}
        <div className="bg-gradient-to-r from-[#00d4ff]/20 to-[#00ff88]/20 p-6 rounded-t-2xl">
          <div className={`flex justify-between items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <h2 className="text-2xl font-bold text-white mb-2">
                <LocalizedText
                  arText="⚠️ تحديث مهم حول التسليم"
                  enText="⚠️ Important Delivery Update"
                />
              </h2>
              <p className="text-gray-300">
                <LocalizedText
                  arText="يرجى مراجعة الجدول الزمني الحالي قبل المتابعة"
                  enText="Please review current timeline before proceeding"
                />
              </p>
            </div>
            
            {/* Countdown Timer */}
            <div className="text-center">
              <div className={`text-3xl font-bold ${
                timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-[#00ff88]'
              }`}>
                {timeLeft}s
              </div>
              <p className="text-xs text-gray-400">
                <LocalizedText
                  arText="إلغاء تلقائي"
                  enText="Auto-cancel"
                />
              </p>
            </div>
          </div>
        </div>
        
        {/* Current Status Alert */}
        <div className="p-6 space-y-6">
          {deliveryEstimate.status !== 'standard' && (
            <Card className={`${getStatusColor(deliveryEstimate.status)} p-4`}>
              <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                {getStatusIcon(deliveryEstimate.status)}
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <p className="font-bold text-white mb-1">
                    {deliveryEstimate.status === 'peak' ? (
                      <LocalizedText
                        arText="مشروع مؤسسي نشط"
                        enText="Enterprise Project Active"
                      />
                    ) : (
                      <LocalizedText
                        arText="طلب عالي على الخدمات"
                        enText="High Service Demand"
                      />
                    )}
                  </p>
                  <p className="text-sm text-gray-300">
                    <LocalizedText
                      arText={deliveryEstimate.message}
                      enText={deliveryEstimate.message}
                    />
                  </p>
                </div>
              </div>
            </Card>
          )}
          
          {/* Timeline Comparison */}
          <Card className="bg-[#0a0a0a] p-4">
            <h3 className={`font-bold text-white mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
              <LocalizedText
                arText="تحديث الجدول الزمني للتسليم"
                enText="Delivery Timeline Update"
              />
            </h3>
            
            <div className="space-y-3">
              {/* Standard Time (Crossed Out if different) */}
              {deliveryEstimate.timeline !== deliveryEstimate.originalTimeline && (
                <div className={`flex items-center justify-between opacity-50 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-500 line-through">
                      <LocalizedText
                        arText="التسليم الاعتيادي"
                        enText="Standard Delivery"
                      />
                    </span>
                  </div>
                  <span className="text-gray-500 line-through">
                    {deliveryEstimate.originalTimeline} {language === 'ar' ? 'ساعة' : 'hours'}
                  </span>
                </div>
              )}
              
              {/* Current Available Time */}
              <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Clock className="w-4 h-4 text-[#00d4ff]" />
                  <span className="text-white font-bold">
                    <LocalizedText
                      arText="التسليم الحالي"
                      enText="Current Delivery"
                    />
                  </span>
                </div>
                <span className="text-xl font-bold text-[#00d4ff]">
                  {deliveryEstimate.timeline} {language === 'ar' ? 'ساعة' : 'hours'}
                </span>
              </div>
              
              {/* Compensation */}
              {deliveryEstimate.discount > 0 && (
                <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Zap className="w-4 h-4 text-[#00ff88]" />
                    <span className="text-[#00ff88]">
                      <LocalizedText
                        arText="خصم تعويضي"
                        enText="Compensation Discount"
                      />
                    </span>
                  </div>
                  <span className="text-xl font-bold text-[#00ff88]">
                    -{deliveryEstimate.discount}%
                  </span>
                </div>
              )}
              
              {/* Guarantee Status */}
              <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {deliveryEstimate.guarantee ? (
                    <CheckCircle className="w-4 h-4 text-[#00ff88]" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-yellow-500" />
                  )}
                  <span className={deliveryEstimate.guarantee ? 'text-[#00ff88]' : 'text-yellow-500'}>
                    <LocalizedText
                      arText="ضمان الوقت"
                      enText="Time Guarantee"
                    />
                  </span>
                </div>
                <Badge variant={deliveryEstimate.guarantee ? 'default' : 'secondary'}>
                  <LocalizedText
                    arText={deliveryEstimate.guarantee ? 'نشط' : 'معلق'}
                    enText={deliveryEstimate.guarantee ? 'Active' : 'Suspended'}
                  />
                </Badge>
              </div>
            </div>
          </Card>
          
          {/* Alternative Options */}
          {deliveryEstimate.alternativeSlots && deliveryEstimate.alternativeSlots.length > 0 && (
            <Card className="bg-[#0a0a0a] p-4">
              <h3 className={`font-bold text-white mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                <LocalizedText
                  arText="⚡ بدائل أسرع"
                  enText="⚡ Faster Alternatives"
                />
              </h3>
              <div className="space-y-2">
                {deliveryEstimate.alternativeSlots.map((slot) => (
                  <button
                    key={slot.id}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      selectedAlternative === slot.id
                        ? 'bg-[#00d4ff]/20 border border-[#00d4ff]'
                        : 'bg-[#00d4ff]/10 hover:bg-[#00d4ff]/20'
                    } ${isRTL ? 'flex-row-reverse' : ''}`}
                    onClick={() => handleAlternativeSelect(slot.id)}
                  >
                    <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Calendar className="w-4 h-4 text-[#00d4ff]" />
                      <span className="text-white">{slot.date}</span>
                    </div>
                    <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Badge variant={slot.status === 'standard' ? 'default' : 'secondary'}>
                        {slot.status === 'standard' ? (
                          <LocalizedText arText="عادي" enText="Standard" />
                        ) : (
                          <LocalizedText arText="مشغول" enText="Busy" />
                        )}
                      </Badge>
                      <span className="text-[#00ff88] font-bold">{slot.time}</span>
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          )}
          
          {/* Price Update */}
          <Card className="bg-gradient-to-r from-[#00d4ff]/10 to-[#00ff88]/10 p-4">
            <div className={`grid grid-cols-3 gap-4 ${isRTL ? 'text-right' : 'text-left'}`}>
              <div>
                <p className="text-sm text-gray-400">
                  <LocalizedText arText="السعر الأصلي" enText="Original Price" />
                </p>
                <p className="text-xl line-through text-gray-500">
                  ${serviceInfo.basePrice}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-400">
                  <LocalizedText arText="السعر المُعدل" enText="Adjusted Price" />
                </p>
                <p className="text-3xl font-bold text-[#00ff88]">
                  ${deliveryEstimate.adjustedPrice}
                </p>
              </div>
              <div className={isRTL ? 'text-left' : 'text-right'}>
                <p className="text-sm text-gray-400">
                  <LocalizedText arText="توفيرك" enText="You Save" />
                </p>
                <p className="text-xl font-bold text-[#00d4ff]">
                  ${deliveryEstimate.savings}
                </p>
              </div>
            </div>
          </Card>
          
          {/* Terms Notice */}
          <div className={`text-xs text-gray-500 space-y-1 ${isRTL ? 'text-right' : 'text-left'}`}>
            <p>
              {language === 'ar' 
                ? '• جدول زمني ممدد بسبب السعة الحالية'
                : '• Extended timeline due to current capacity'
              }
            </p>
            <p>
              {language === 'ar'
                ? `• ${deliveryEstimate.guarantee ? 'ضمان 50% ما زال ساري المفعول' : 'ضمان الوقت معلق لهذا الطلب'}`
                : `• ${deliveryEstimate.guarantee ? '50% guarantee still applies' : 'Time guarantee suspended for this order'}`
              }
            </p>
            <p>
              {language === 'ar'
                ? '• يمكنك الإلغاء خلال 20 ثانية بدون رسوم'
                : '• You can cancel within 20 seconds with no charge'
              }
            </p>
            <p>
              {language === 'ar'
                ? '• بالمتابعة، أنت توافق على الجدول الزمني المُعدل'
                : '• By proceeding, you accept the adjusted timeline'
              }
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className={`flex gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Button
              onClick={onReject}
              variant="outline"
              className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              <LocalizedText
                arText="إلغاء الطلب (بدون رسوم)"
                enText="Cancel Order (No Charge)"
              />
            </Button>
            <Button
              onClick={onAccept}
              className="flex-1 bg-gradient-to-r from-[#00d4ff] to-[#00ff88] text-black hover:shadow-lg transition-all font-bold"
            >
              <LocalizedText
                arText="موافق والمتابعة"
                enText="Accept & Proceed"
              />
              <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180 mr-2' : 'ml-2'}`} />
            </Button>
          </div>
        </div>
      </div>
    </RTLContainer>
  );
}