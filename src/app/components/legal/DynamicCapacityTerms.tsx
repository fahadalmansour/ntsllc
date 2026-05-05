/**
 * Dynamic Capacity Terms - Legal terms for the capacity management system
 * Integrated into the main Terms of Service
 */

import React from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { AlertCircle, Clock, Shield, CheckCircle, DollarSign } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { LocalizedText, RTLContainer } from '../LanguageSwitcher';

interface DynamicCapacityTermsProps {
  standalone?: boolean;
  className?: string;
}

export default function DynamicCapacityTerms({ 
  standalone = false, 
  className = '' 
}: DynamicCapacityTermsProps) {
  const { language, isRTL } = useLanguage();

  const Section = ({ icon: Icon, title, titleAr, children, important = false }: {
    icon: React.ComponentType<any>;
    title: string;
    titleAr: string;
    children: React.ReactNode;
    important?: boolean;
  }) => (
    <Card className={`p-6 ${important ? 'border-[#00d4ff]/50 bg-[#00d4ff]/5' : 'border-gray-700'}`}>
      <div className={`flex items-center gap-3 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <Icon className={`w-6 h-6 ${important ? 'text-[#00d4ff]' : 'text-[#00ff88]'}`} />
        <h3 className={`text-lg font-bold text-white ${isRTL ? 'text-right' : 'text-left'}`}>
          <LocalizedText arText={titleAr} enText={title} />
        </h3>
        {important && (
          <Badge className="bg-[#00d4ff] text-black text-xs">
            <LocalizedText arText="مهم" enText="Important" />
          </Badge>
        )}
      </div>
      <div className={`text-gray-300 space-y-3 ${isRTL ? 'text-right' : 'text-left'}`}>
        {children}
      </div>
    </Card>
  );

  const content = (
    <div className="space-y-8">
      {/* Overview */}
      <Section 
        icon={AlertCircle} 
        title="Dynamic Delivery Terms" 
        titleAr="شروط التسليم الديناميكي"
        important={true}
      >
        <p>
          <LocalizedText
            arText="نيو تكنولوجي سوليوشنز تستخدم نظام إدارة السعة الديناميكي لضمان أفضل خدمة ممكنة لجميع العملاء. هذا النظام يوفر شفافية كاملة حول الجداول الزمنية والأسعار قبل الدفع."
            enText="NeoTechnology Solutions uses a Dynamic Capacity Management System to ensure optimal service delivery for all clients. This system provides complete transparency about timelines and pricing before payment."
          />
        </p>
        
        <div className="bg-[#00d4ff]/10 border border-[#00d4ff]/30 rounded-lg p-4 mt-4">
          <p className="text-[#00d4ff] font-medium">
            <LocalizedText
              arText="الشفافية الكاملة: ستُبلغ بأي تعديلات على الجدول الزمني قبل الدفع مع 20 ثانية للإلغاء المجاني."
              enText="Complete Transparency: You'll be notified of any timeline adjustments before payment with 20 seconds for free cancellation."
            />
          </p>
        </div>
      </Section>

      {/* Capacity-Based Adjustments */}
      <Section 
        icon={Clock} 
        title="Capacity-Based Adjustments" 
        titleAr="التعديلات القائمة على السعة"
      >
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-white mb-2">
              <LocalizedText arText="متى تحدث التعديلات:" enText="When Adjustments Occur:" />
            </h4>
            <ul className={`list-disc space-y-1 ${isRTL ? 'list-inside' : 'ml-6'}`}>
              <li>
                <LocalizedText
                  arText="عند خدمة عملاء مؤسسيين كبار (مثل هنقرستيشن، نون)"
                  enText="When serving major enterprise clients (e.g., HungerStation, Noon)"
                />
              </li>
              <li>
                <LocalizedText
                  arText="خلال فترات الطلب العالي (استخدام الفريق أكثر من 80%)"
                  enText="During high-demand periods (team utilization above 80%)"
                />
              </li>
              <li>
                <LocalizedText
                  arText="في حالات الطوارئ أو المتطلبات التقنية الخاصة"
                  enText="During emergency situations or special technical requirements"
                />
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-2">
              <LocalizedText arText="أنواع التعديلات:" enText="Types of Adjustments:" />
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                <div className={`flex items-center gap-2 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Clock className="w-4 h-4 text-yellow-500" />
                  <span className="font-medium text-yellow-400">
                    <LocalizedText arText="وضع مشغول" enText="Busy Mode" />
                  </span>
                </div>
                <p className="text-sm text-gray-300">
                  <LocalizedText
                    arText="جدال زمني 1.5x مع خصم 10%"
                    enText="1.5x timeline with 10% discount"
                  />
                </p>
              </div>
              
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                <div className={`flex items-center gap-2 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <span className="font-medium text-red-400">
                    <LocalizedText arText="وضع الذروة" enText="Peak Mode" />
                  </span>
                </div>
                <p className="text-sm text-gray-300">
                  <LocalizedText
                    arText="جدال زمني 2x+ مع خصم 20%"
                    enText="2x+ timeline with 20% discount"
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 20-Second Decision Window */}
      <Section 
        icon={Shield} 
        title="20-Second Decision Protection" 
        titleAr="حماية القرار في 20 ثانية"
        important={true}
      >
        <div className="space-y-4">
          <p>
            <LocalizedText
              arText="عند إخطارك بتعديل في الجدول الزمني، لديك 20 ثانية كاملة لاتخاذ قرارك دون أي التزام مالي."
              enText="When notified of a timeline adjustment, you have a full 20 seconds to make your decision with no financial obligation."
            />
          </p>

          <div className="bg-[#00ff88]/10 border border-[#00ff88]/30 rounded-lg p-4">
            <h4 className="font-semibold text-[#00ff88] mb-2">
              <LocalizedText arText="حقوقك خلال النافذ الزمنية:" enText="Your Rights During the Decision Window:" />
            </h4>
            <ul className={`list-disc space-y-1 text-sm ${isRTL ? 'list-inside' : 'ml-4'}`}>
              <li>
                <LocalizedText
                  arText="إلغاء مجاني كامل بدون أي رسوم"
                  enText="Complete free cancellation with no charges"
                />
              </li>
              <li>
                <LocalizedText
                  arText="لا يتم تحصيل أي مبلغ حتى تؤكد الموافقة"
                  enText="No charges until you confirm acceptance"
                />
              </li>
              <li>
                <LocalizedText
                  arText="إلغاء تلقائي إذا لم تستجب في 20 ثانية"
                  enText="Automatic cancellation if no response within 20 seconds"
                />
              </li>
              <li>
                <LocalizedText
                  arText="خيار الانضمام لقائمة الانتظار للأوقات العادية"
                  enText="Option to join waitlist for standard timelines"
                />
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Compensation System */}
      <Section 
        icon={DollarSign} 
        title="Automatic Compensation System" 
        titleAr="نظام التعويض التلقائي"
      >
        <div className="space-y-4">
          <p>
            <LocalizedText
              arText="عندما تتطلب ظروف السعة تمديد الجداول الزمنية، نقدم تعويضاً تلقائياً عادلاً:"
              enText="When capacity conditions require extended timelines, we provide fair automatic compensation:"
            />
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#0a0a0a] rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-[#00ff88] mb-1">10%</div>
              <div className="text-sm text-gray-400">
                <LocalizedText arText="خصم الوضع المشغول" enText="Busy Mode Discount" />
              </div>
            </div>
            <div className="bg-[#0a0a0a] rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-[#00d4ff] mb-1">20%</div>
              <div className="text-sm text-gray-400">
                <LocalizedText arText="خصم وضع الذروة" enText="Peak Mode Discount" />
              </div>
            </div>
            <div className="bg-[#0a0a0a] rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-yellow-500 mb-1">50%</div>
              <div className="text-sm text-gray-400">
                <LocalizedText arText="ضمان الوقت (عند التطبيق)" enText="Time Guarantee (when applicable)" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-4">
            <p className="text-sm text-gray-300">
              <LocalizedText
                arText="التعويض يُطبق تلقائياً - لا حاجة لطلبه. يظهر في فاتورتك النهائية قبل الدفع."
                enText="Compensation is applied automatically - no claim needed. It appears in your final invoice before payment."
              />
            </p>
          </div>
        </div>
      </Section>

      {/* Enterprise Priority */}
      <Section 
        icon={Shield} 
        title="Enterprise Client Priority" 
        titleAr="أولوية العملاء المؤسسيين"
      >
        <div className="space-y-4">
          <p>
            <LocalizedText
              arText="عندما نخدم عملاء مؤسسيين كبار مثل هنقرستيشن أو نون، قد تتأثر الجداول الزمنية العادية:"
              enText="When serving major enterprise clients like HungerStation or Noon, standard timelines may be affected:"
            />
          </p>

          <div className="space-y-3">
            <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <CheckCircle className="w-5 h-5 text-[#00ff88] mt-0.5" />
              <div>
                <p className="text-white font-medium">
                  <LocalizedText
                    arText="الطلبات الحالية غير متأثرة"
                    enText="Existing orders are not affected"
                  />
                </p>
                <p className="text-sm text-gray-400">
                  <LocalizedText
                    arText="إذا كان لديك طلب قائم، فسيستمر وفق الجدول الزمني المتفق عليه"
                    enText="If you have an existing order, it continues on the agreed timeline"
                  />
                </p>
              </div>
            </div>

            <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <CheckCircle className="w-5 h-5 text-[#00ff88] mt-0.5" />
              <div>
                <p className="text-white font-medium">
                  <LocalizedText
                    arText="شفافية كاملة مقدماً"
                    enText="Complete upfront transparency"
                  />
                </p>
                <p className="text-sm text-gray-400">
                  <LocalizedText
                    arText="ستعرف الجدول الزمني المُعدل قبل الدفع"
                    enText="You'll know the adjusted timeline before payment"
                  />
                </p>
              </div>
            </div>

            <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <CheckCircle className="w-5 h-5 text-[#00ff88] mt-0.5" />
              <div>
                <p className="text-white font-medium">
                  <LocalizedText
                    arText="خيار قائمة الانتظار"
                    enText="Waitlist option available"
                  />
                </p>
                <p className="text-sm text-gray-400">
                  <LocalizedText
                    arText="يمكنك الانتظار للحصول على الأوقات العادية"
                    enText="You can wait for standard timeline availability"
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Time Guarantee Updates */}
      <Section 
        icon={Shield} 
        title="Time Guarantee Policy" 
        titleAr="سياسة ضمان الوقت"
      >
        <div className="space-y-4">
          <div className="bg-[#00ff88]/10 border border-[#00ff88]/30 rounded-lg p-4">
            <h4 className="font-semibold text-[#00ff88] mb-2">
              <LocalizedText arText="ضمان 50% يبقى نشطاً" enText="50% Guarantee Remains Active" />
            </h4>
            <p className="text-sm">
              <LocalizedText
                arText="ضمان الوقت 50% ينطبق على الجداول الزمنية المُعدلة التي توافق عليها. إذا تأخرنا عن الوقت المُعدل، تحصل على 50% من قيمة مشروعك."
                enText="The 50% time guarantee applies to adjusted timelines you accept. If we're late on the adjusted timeline, you get 50% of your project value back."
              />
            </p>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-500 mb-2">
              <LocalizedText arText="تعليق الضمان" enText="Guarantee Suspension" />
            </h4>
            <p className="text-sm">
              <LocalizedText
                arText="في حالات استثنائية (مشاريع مؤسسية معقدة جداً)، قد يُعلق ضمان الوقت. ستُبلغ بهذا بوضوح قبل الدفع مع خصم إضافي 10%."
                enText="In exceptional cases (very complex enterprise projects), the time guarantee may be suspended. You'll be clearly informed before payment with an additional 10% discount."
              />
            </p>
          </div>
        </div>
      </Section>

      {/* Legal Rights */}
      <Section 
        icon={Shield} 
        title="Your Legal Rights" 
        titleAr="حقوقك القانونية"
        important={true}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-white mb-2">
                <LocalizedText arText="حقوق الإلغاء:" enText="Cancellation Rights:" />
              </h4>
              <ul className={`list-disc space-y-1 text-sm ${isRTL ? 'list-inside' : 'ml-4'}`}>
                <li>
                  <LocalizedText
                    arText="20 ثانية للإلغاء المجاني"
                    enText="20 seconds for free cancellation"
                  />
                </li>
                <li>
                  <LocalizedText
                    arText="استرداد كامل إذا لم نلتزم بالضمان"
                    enText="Full refund if we breach guarantee"
                  />
                </li>
                <li>
                  <LocalizedText
                    arText="حق الانسحاب خلال 24 ساعة"
                    enText="24-hour withdrawal right"
                  />
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-2">
                <LocalizedText arText="حقوق الشفافية:" enText="Transparency Rights:" />
              </h4>
              <ul className={`list-disc space-y-1 text-sm ${isRTL ? 'list-inside' : 'ml-4'}`}>
                <li>
                  <LocalizedText
                    arText="معرفة السبب وراء التأخير"
                    enText="Know the reason for delays"
                  />
                </li>
                <li>
                  <LocalizedText
                    arText="تحديثات يومية على التقدم"
                    enText="Daily progress updates"
                  />
                </li>
                <li>
                  <LocalizedText
                    arText="وصول لإدارة المشروع"
                    enText="Access to project management"
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* Contact Information */}
      <Section 
        icon={Shield} 
        title="Questions & Support" 
        titleAr="الأسئلة والدعم"
      >
        <div className="space-y-4">
          <p>
            <LocalizedText
              arText="إذا كان لديك أي أسئلة حول نظام السعة الديناميكي أو هذه الشروط، تواصل معنا:"
              enText="If you have any questions about the Dynamic Capacity System or these terms, contact us:"
            />
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#0a0a0a] rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">
                <LocalizedText arText="دعم فوري:" enText="Immediate Support:" />
              </h4>
              <p className="text-sm text-gray-300">
                <LocalizedText
                  arText="واتساب: +966 50 123 4567"
                  enText="WhatsApp: +1 (555) 123-4567"
                />
              </p>
            </div>

            <div className="bg-[#0a0a0a] rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">
                <LocalizedText arText="دعم قانوني:" enText="Legal Support:" />
              </h4>
              <p className="text-sm text-gray-300">
                legal@neotechnology.solutions
              </p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );

  if (standalone) {
    return (
      <RTLContainer className={`max-w-4xl mx-auto p-6 space-y-8 ${className}`}>
        <div className={`text-center mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
          <h1 className="text-3xl font-bold text-white mb-4">
            <LocalizedText
              arText="شروط إدارة السعة الديناميكية"
              enText="Dynamic Capacity Management Terms"
            />
          </h1>
          <p className="text-gray-400">
            <LocalizedText
              arText="آخر تحديث: ديسمبر 2024"
              enText="Last updated: December 2024"
            />
          </p>
        </div>
        {content}
      </RTLContainer>
    );
  }

  return <div className={className}>{content}</div>;
}