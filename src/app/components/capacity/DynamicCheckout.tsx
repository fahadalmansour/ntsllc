/**
 * Dynamic Checkout Flow with Capacity Management
 * Handles capacity notifications and payment processing
 */

import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  CreditCard, 
  Calendar,
  ArrowLeft,
  Loader,
  Shield
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { LocalizedText, RTLContainer } from '../LanguageSwitcher';
import PrePaymentNotice from './PrePaymentNotice';
import { 
  calculateDeliveryTime,
  needsCapacityNotification,
  serviceConfig,
  DeliveryEstimate
} from '../../lib/capacity-management';

interface DynamicCheckoutProps {
  selectedService: 'lightning' | 'thunder' | 'storm';
  onBack: () => void;
  onComplete: (orderData: any) => void;
}

type CheckoutStage = 'loading' | 'notice' | 'payment' | 'processing' | 'completed' | 'cancelled';

export default function DynamicCheckout({ 
  selectedService, 
  onBack, 
  onComplete 
}: DynamicCheckoutProps) {
  const { t, language, isRTL } = useLanguage();
  const [stage, setStage] = useState<CheckoutStage>('loading');
  const [deliveryEstimate, setDeliveryEstimate] = useState<DeliveryEstimate | null>(null);
  const [paymentProgress, setPaymentProgress] = useState(0);
  const [orderData, setOrderData] = useState<any>(null);

  const serviceInfo = serviceConfig[selectedService];

  // Initial capacity check
  useEffect(() => {
    const checkCapacity = async () => {
      try {
        console.log('🔄 Checking capacity for service:', selectedService);
        
        // Check if notification is needed
        const needsNotice = await needsCapacityNotification(selectedService);
        
        if (needsNotice) {
          // Get delivery estimate for notification
          const estimate = await calculateDeliveryTime(selectedService);
          setDeliveryEstimate(estimate);
          setStage('notice');
        } else {
          // Standard flow - go directly to payment
          const estimate = await calculateDeliveryTime(selectedService);
          setDeliveryEstimate(estimate);
          setStage('payment');
        }
      } catch (error) {
        console.error('❌ Failed to check capacity:', error);
        // Default to standard flow on error
        setStage('payment');
      }
    };

    checkCapacity();
  }, [selectedService]);

  const handleNoticeAccept = () => {
    console.log('✅ Customer accepted capacity notice');
    
    // Analytics tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'capacity_notice_accepted', {
        service: selectedService,
        adjusted_time: deliveryEstimate?.timeline,
        discount: deliveryEstimate?.discount
      });
    }
    
    setStage('payment');
  };

  const handleNoticeReject = () => {
    console.log('❌ Customer rejected capacity notice');
    
    // Analytics tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'capacity_notice_rejected', {
        service: selectedService,
        reason: 'timeline_too_long'
      });
    }
    
    setStage('cancelled');
  };

  const handlePaymentSubmit = async (paymentData: any) => {
    setStage('processing');
    setPaymentProgress(0);

    try {
      // Simulate payment processing with progress updates
      const progressSteps = [
        { progress: 20, message: 'Validating payment details...' },
        { progress: 40, message: 'Processing payment...' },
        { progress: 60, message: 'Creating project...' },
        { progress: 80, message: 'Assigning team...' },
        { progress: 100, message: 'Order confirmed!' }
      ];

      for (const step of progressSteps) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setPaymentProgress(step.progress);
      }

      // Create order data
      const order = {
        id: `NEO-${Date.now()}`,
        service: selectedService,
        timeline: deliveryEstimate?.timeline || serviceInfo.standardTime,
        originalPrice: serviceInfo.basePrice,
        adjustedPrice: deliveryEstimate?.adjustedPrice || serviceInfo.basePrice,
        discount: deliveryEstimate?.discount || 0,
        guarantee: deliveryEstimate?.guarantee ?? true,
        status: deliveryEstimate?.status || 'standard',
        createdAt: new Date(),
        estimatedCompletion: new Date(Date.now() + (deliveryEstimate?.timeline || serviceInfo.standardTime) * 60 * 60 * 1000)
      };

      setOrderData(order);
      setStage('completed');
      
      // Analytics tracking
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'purchase', {
          transaction_id: order.id,
          value: order.adjustedPrice,
          currency: 'USD',
          items: [{
            item_id: selectedService,
            item_name: serviceInfo.name,
            category: 'E-commerce Setup',
            quantity: 1,
            price: order.adjustedPrice
          }]
        });
      }

    } catch (error) {
      console.error('❌ Payment processing failed:', error);
      // Handle payment failure
      setStage('payment');
      alert('Payment failed. Please try again.');
    }
  };

  const renderLoadingStage = () => (
    <RTLContainer className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <Card className="bg-[#1a1a1a] border-[#00d4ff]/30 p-8 max-w-md w-full mx-4">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-[#00d4ff] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <h2 className="text-xl font-bold text-white">
            <LocalizedText
              arText="فحص السعة الحالية..."
              enText="Checking Current Capacity..."
            />
          </h2>
          <p className="text-gray-400 text-sm">
            <LocalizedText
              arText="نتأكد من الجدول الزمني المناسب لخدمتك"
              enText="Ensuring optimal timeline for your service"
            />
          </p>
        </div>
      </Card>
    </RTLContainer>
  );

  const renderPaymentStage = () => (
    <RTLContainer className="min-h-screen bg-[#0a0a0a] p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Button
            onClick={onBack}
            variant="outline"
            className="border-[#00d4ff]/30 text-[#00d4ff] hover:bg-[#00d4ff]/10"
          >
            <ArrowLeft className={`w-4 h-4 ${isRTL ? 'rotate-180 ml-2' : 'mr-2'}`} />
            <LocalizedText arText="رجوع" enText="Back" />
          </Button>
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <h1 className="text-2xl font-bold text-white">
              <LocalizedText arText="إتمام الطلب" enText="Complete Order" />
            </h1>
            <p className="text-gray-400">{serviceInfo.name}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="bg-[#1a1a1a] border-[#00d4ff]/30 p-6 sticky top-6">
              <h2 className={`text-lg font-bold text-white mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                <LocalizedText arText="ملخص الطلب" enText="Order Summary" />
              </h2>

              <div className="space-y-4">
                {/* Service Info */}
                <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="text-gray-400">
                    <LocalizedText arText="الخدمة" enText="Service" />
                  </span>
                  <span className="text-white font-medium">{serviceInfo.name}</span>
                </div>

                {/* Timeline */}
                <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="text-gray-400">
                    <LocalizedText arText="مدة التسليم" enText="Delivery Time" />
                  </span>
                  <span className="text-[#00d4ff] font-bold">
                    {deliveryEstimate?.timeline || serviceInfo.standardTime} {language === 'ar' ? 'ساعة' : 'hours'}
                  </span>
                </div>

                {/* Pricing */}
                {deliveryEstimate?.discount ? (
                  <>
                    <div className={`flex justify-between opacity-60 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="text-gray-500 line-through">
                        <LocalizedText arText="السعر الأصلي" enText="Original Price" />
                      </span>
                      <span className="text-gray-500 line-through">${serviceInfo.basePrice}</span>
                    </div>
                    <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="text-[#00ff88]">
                        <LocalizedText arText="خصم تعويضي" enText="Discount" />
                      </span>
                      <span className="text-[#00ff88]">-{deliveryEstimate.discount}%</span>
                    </div>
                  </>
                ) : null}

                <div className={`flex justify-between text-lg font-bold border-t border-gray-700 pt-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="text-white">
                    <LocalizedText arText="المجموع" enText="Total" />
                  </span>
                  <span className="text-[#00ff88]">
                    ${deliveryEstimate?.adjustedPrice || serviceInfo.basePrice}
                  </span>
                </div>

                {/* Guarantee Badge */}
                <div className={`flex items-center gap-2 mt-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {deliveryEstimate?.guarantee ? (
                    <CheckCircle className="w-5 h-5 text-[#00ff88]" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                  )}
                  <Badge variant={deliveryEstimate?.guarantee ? 'default' : 'secondary'}>
                    <LocalizedText
                      arText={deliveryEstimate?.guarantee ? 'ضمان 50%' : 'ضمان معلق'}
                      enText={deliveryEstimate?.guarantee ? '50% Guarantee' : 'Guarantee Suspended'}
                    />
                  </Badge>
                </div>
              </div>
            </Card>
          </div>

          {/* Payment Form */}
          <div className="lg:col-span-2">
            <Card className="bg-[#1a1a1a] border-[#00d4ff]/30 p-6">
              <h2 className={`text-lg font-bold text-white mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                <LocalizedText arText="معلومات الدفع" enText="Payment Information" />
              </h2>

              {/* Mock Payment Form */}
              <div className="space-y-6">
                <div className="bg-[#0a0a0a] rounded-lg p-4">
                  <div className={`flex items-center gap-3 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <CreditCard className="w-6 h-6 text-[#00d4ff]" />
                    <h3 className="font-medium text-white">
                      <LocalizedText arText="الدفع الآمن" enText="Secure Payment" />
                    </h3>
                  </div>
                  <p className="text-sm text-gray-400 mb-4">
                    <LocalizedText
                      arText="نستخدم تشفير SSL لحماية معلوماتك المالية"
                      enText="We use SSL encryption to protect your financial information"
                    />
                  </p>
                  
                  <Button
                    onClick={() => handlePaymentSubmit({})}
                    className="w-full bg-gradient-to-r from-[#00d4ff] to-[#00ff88] text-black font-bold py-3 hover:shadow-lg transition-all"
                  >
                    <LocalizedText
                      arText={`دفع $${deliveryEstimate?.adjustedPrice || serviceInfo.basePrice} الآن`}
                      enText={`Pay $${deliveryEstimate?.adjustedPrice || serviceInfo.basePrice} Now`}
                    />
                  </Button>
                </div>

                {/* Trust Indicators */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Shield className="w-8 h-8 text-[#00ff88]" />
                    <span className="text-xs text-gray-400">
                      <LocalizedText arText="دفع آمن" enText="Secure Payment" />
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <CheckCircle className="w-8 h-8 text-[#00d4ff]" />
                    <span className="text-xs text-gray-400">
                      <LocalizedText arText="ضمان الجودة" enText="Quality Guarantee" />
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Clock className="w-8 h-8 text-[#00ff88]" />
                    <span className="text-xs text-gray-400">
                      <LocalizedText arText="تسليم سريع" enText="Fast Delivery" />
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </RTLContainer>
  );

  const renderProcessingStage = () => (
    <RTLContainer className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <Card className="bg-[#1a1a1a] border-[#00d4ff]/30 p-8 max-w-md w-full mx-4">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-700 rounded-full mx-auto"></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-16 border-4 border-[#00d4ff] border-t-transparent rounded-full animate-spin"></div>
          </div>
          
          <div>
            <h2 className="text-xl font-bold text-white mb-2">
              <LocalizedText
                arText="معالجة الطلب..."
                enText="Processing Order..."
              />
            </h2>
            <p className="text-gray-400 text-sm mb-4">
              <LocalizedText
                arText="يرجى عدم إغلاق هذه النافذة"
                enText="Please don't close this window"
              />
            </p>
          </div>

          <div className="space-y-2">
            <Progress value={paymentProgress} className="h-2" />
            <p className="text-xs text-gray-500">{paymentProgress}% complete</p>
          </div>
        </div>
      </Card>
    </RTLContainer>
  );

  const renderCompletedStage = () => (
    <RTLContainer className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <Card className="bg-[#1a1a1a] border-[#00ff88] p-8 max-w-lg w-full mx-4">
        <div className="text-center space-y-6">
          <CheckCircle className="w-16 h-16 text-[#00ff88] mx-auto" />
          
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              <LocalizedText
                arText="تم تأكيد طلبك!"
                enText="Order Confirmed!"
              />
            </h2>
            <p className="text-gray-400">
              <LocalizedText
                arText={`رقم الطلب: ${orderData?.id}`}
                enText={`Order ID: ${orderData?.id}`}
              />
            </p>
          </div>

          {orderData && (
            <div className="bg-[#0a0a0a] rounded-lg p-4 space-y-2 text-sm">
              <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className="text-gray-400">
                  <LocalizedText arText="الخدمة" enText="Service" />
                </span>
                <span className="text-white">{serviceInfo.name}</span>
              </div>
              <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className="text-gray-400">
                  <LocalizedText arText="مدة التسليم" enText="Delivery Time" />
                </span>
                <span className="text-[#00d4ff]">{orderData.timeline} hours</span>
              </div>
              <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className="text-gray-400">
                  <LocalizedText arText="المبلغ المدفوع" enText="Amount Paid" />
                </span>
                <span className="text-[#00ff88] font-bold">${orderData.adjustedPrice}</span>
              </div>
            </div>
          )}

          <Button
            onClick={() => onComplete(orderData)}
            className="w-full bg-[#00d4ff] text-black hover:bg-[#00ff88] font-bold"
          >
            <LocalizedText
              arText="انتقل إلى لوحة التحكم"
              enText="Go to Dashboard"
            />
          </Button>
        </div>
      </Card>
    </RTLContainer>
  );

  const renderCancelledStage = () => (
    <RTLContainer className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <Card className="bg-[#1a1a1a] border-red-500/30 p-8 max-w-md w-full mx-4">
        <div className="text-center space-y-6">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />
          
          <div>
            <h2 className="text-xl font-bold text-white mb-2">
              <LocalizedText
                arText="تم إلغاء الطلب"
                enText="Order Cancelled"
              />
            </h2>
            <p className="text-gray-400 text-sm">
              <LocalizedText
                arText="لم يتم تحصيل أي رسوم"
                enText="No charges were made"
              />
            </p>
          </div>

          <div className="space-y-3">
            <Button
              onClick={onBack}
              className="w-full bg-[#00d4ff] text-black hover:bg-[#00ff88]"
            >
              <LocalizedText
                arText="اختيار خدمة أخرى"
                enText="Choose Different Service"
              />
            </Button>
            
            <Button
              onClick={() => {/* Handle waitlist */}}
              variant="outline"
              className="w-full border-[#00ff88] text-[#00ff88] hover:bg-[#00ff88]/10"
            >
              <Calendar className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              <LocalizedText
                arText="انضم لقائمة الانتظار"
                enText="Join Waitlist"
              />
            </Button>
          </div>
        </div>
      </Card>
    </RTLContainer>
  );

  // Render based on current stage
  switch (stage) {
    case 'loading':
      return renderLoadingStage();
    case 'notice':
      return deliveryEstimate ? (
        <PrePaymentNotice
          service={selectedService}
          deliveryEstimate={deliveryEstimate}
          onAccept={handleNoticeAccept}
          onReject={handleNoticeReject}
        />
      ) : renderLoadingStage();
    case 'payment':
      return renderPaymentStage();
    case 'processing':
      return renderProcessingStage();
    case 'completed':
      return renderCompletedStage();
    case 'cancelled':
      return renderCancelledStage();
    default:
      return renderLoadingStage();
  }
}