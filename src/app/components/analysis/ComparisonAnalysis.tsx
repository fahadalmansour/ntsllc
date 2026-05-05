import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { useLanguage } from '../../contexts/LanguageContext';
import { RTLContainer } from '../LanguageSwitcher';
import { useCompanyInfo } from '../CompanyInfo';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  DollarSign, 
  Shield, 
  Users,
  CheckCircle,
  XCircle,
  ArrowRight,
  Zap,
  Target,
  Award,
  ChevronRight
} from 'lucide-react';

interface ComparisonMetric {
  metric: string;
  traditional: string | number;
  neo: string | number;
  unit?: string;
  improvement: number;
  icon: React.ReactNode;
  color: string;
}

interface ROIData {
  timeframe: string;
  traditional: number;
  neo: number;
}

export function ComparisonAnalysis({ onNavigate }: { onNavigate?: (section: string) => void }) {
  const { isRTL, language } = useLanguage();
  const companyInfo = useCompanyInfo();
  const [activeMetric, setActiveMetric] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimationComplete(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const comparisonData: ComparisonMetric[] = [
    {
      metric: language === 'ar' ? 'وقت الإعداد' : 'Setup Time',
      traditional: language === 'ar' ? '30-60 يوم' : '30-60 days',
      neo: companyInfo.capabilities.setup_time,
      improvement: 95.0,
      icon: <Clock className="w-6 h-6" />,
      color: 'var(--neo-blue)'
    },
    {
      metric: language === 'ar' ? 'التكلفة' : 'Cost',
      traditional: '$10,000+',
      neo: companyInfo.capabilities.pricing,
      improvement: 87.0,
      icon: <DollarSign className="w-6 h-6" />,
      color: 'var(--neo-green)'
    },
    {
      metric: language === 'ar' ? 'معدل النجاح' : 'Success Rate',
      traditional: '~60%',
      neo: companyInfo.capabilities.success_rate,
      improvement: 66.5,
      icon: <Target className="w-6 h-6" />,
      color: 'var(--terminal-green)'
    },
    {
      metric: language === 'ar' ? 'الدعم الفني' : 'Support',
      traditional: language === 'ar' ? 'محدود' : 'Limited',
      neo: companyInfo.capabilities.support,
      improvement: 100,
      icon: <Shield className="w-6 h-6" />,
      color: 'var(--neo-blue)'
    }
  ];

  const roiData: ROIData[] = [
    { timeframe: '6 Months', traditional: 5000, neo: 25000 },
    { timeframe: '1 Year', traditional: 15000, neo: 75000 },
    { timeframe: '2 Years', traditional: 35000, neo: 180000 },
    { timeframe: '3 Years', traditional: 60000, neo: 320000 }
  ];

  const additionalMetrics = [
    {
      title: language === 'ar' ? 'مؤشرات الأداء الرئيسية' : 'Key Performance Indicators',
      items: [
        { label: language === 'ar' ? 'سرعة النشر' : 'Deployment Speed', value: '2000%', color: 'var(--neo-blue)' },
        { label: language === 'ar' ? 'توفير التكلفة' : 'Cost Savings', value: '87%', color: 'var(--neo-green)' },
        { label: language === 'ar' ? 'رضا العملاء' : 'Client Satisfaction', value: '99.9%', color: 'var(--terminal-green)' },
        { label: language === 'ar' ? 'وقت الاستجابة' : 'Response Time', value: '<2s', color: 'var(--neo-blue)' }
      ]
    }
  ];

  return (
    <div 
      className="min-h-screen text-[#C0C5CE] font-mono"
      style={{
        background: 'var(--neo-bg-primary)',
        fontFamily: 'JetBrains Mono, monospace'
      }}
    >
      {/* Terminal grid background */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(192, 197, 206, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(192, 197, 206, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          opacity: 0.1
        }}
      ></div>

      {/* Matrix rain effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute matrix-effect"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
              fontSize: '12px',
              fontFamily: 'JetBrains Mono, monospace',
              color: 'var(--neo-blue)',
              opacity: 0.2
            }}
          >
            COMPARE ANALYZE OPTIMIZE DEPLOY
          </div>
        ))}
      </div>

      <RTLContainer className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className={`space-y-12 ${isRTL ? 'text-right' : 'text-left'}`}>
          
          {/* Header Section */}
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <BarChart3 className="w-10 h-10" style={{ color: 'var(--neo-blue)' }} />
              <h1 
                className="text-5xl font-bold"
                style={{ 
                  color: 'var(--terminal-silver)',
                  textShadow: '0 0 20px var(--neo-blue)'
                }}
              >
                <span 
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, var(--neo-blue), var(--neo-green))'
                  }}
                >
                  {language === 'ar' ? 'تحليل المقارنة المتقدم' : 'Advanced Comparison Analysis'}
                </span>
              </h1>
            </div>
            
            <p 
              className="text-xl max-w-4xl mx-auto"
              style={{ color: 'rgba(192, 197, 206, 0.8)' }}
            >
              {language === 'ar' 
                ? 'مقارنة شاملة بين الحلول التقليدية وحلول Neo Technology المتقدمة'
                : 'Comprehensive comparison between traditional solutions and advanced Neo Technology solutions'
              }
            </p>

            {/* Terminal Command Display */}
            <Card 
              className="max-w-3xl mx-auto border"
              style={{
                background: 'var(--terminal-bg-secondary)',
                borderColor: 'rgba(0, 212, 255, 0.3)'
              }}
            >
              <div 
                className="border-b p-4"
                style={{ borderColor: 'rgba(0, 212, 255, 0.2)' }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div 
                    className="text-sm"
                    style={{ color: 'var(--neo-blue)', fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    neo@technology:~$ comparison_analysis.exe
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-2">
                  <div style={{ color: 'var(--neo-green)', fontFamily: 'JetBrains Mono, monospace' }}>
                    neo@tech:~$ compare-solutions --traditional vs --neo
                  </div>
                  <div style={{ color: 'var(--terminal-silver)', fontFamily: 'JetBrains Mono, monospace' }}>
                    📊 DEPLOYMENT COMPARISON ANALYSIS
                  </div>
                  <div 
                    className="mt-4 text-xs space-y-1"
                    style={{ color: 'var(--terminal-silver)', fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    <div>┌─────────────────┬──────────────┬──────────────┐</div>
                    <div>│ Metric          │ Traditional  │ Neo Solution │</div>
                    <div>├─────────────────┼──────────────┼──────────────┤</div>
                    <div>│ Setup Time      │ 30-60 days   │ {companyInfo.capabilities.setup_time.padEnd(12)} │</div>
                    <div>│ Cost            │ $10,000+     │ {companyInfo.capabilities.pricing.padEnd(12)} │</div>
                    <div>│ Success Rate    │ ~60%         │ {companyInfo.capabilities.success_rate.padEnd(12)} │</div>
                    <div>│ Support         │ Limited      │ {companyInfo.capabilities.support.padEnd(12)} │</div>
                    <div>└─────────────────┴──────────────┴──────────────┘</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Comparison Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {comparisonData.map((item, index) => (
              <Card
                key={index}
                className={`border transition-all duration-500 cursor-pointer transform hover:scale-105 ${
                  activeMetric === index ? 'ring-2' : ''
                }`}
                style={{
                  background: 'var(--terminal-bg-secondary)',
                  borderColor: activeMetric === index ? 'var(--neo-blue)' : 'rgba(192, 197, 206, 0.2)',
                  boxShadow: activeMetric === index ? '0 4px 20px rgba(0, 212, 255, 0.3)' : 'none',
                  ...(activeMetric === index && { 
                    ringColor: 'var(--neo-blue)' 
                  })
                }}
                onClick={() => setActiveMetric(index)}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div style={{ color: item.color }}>
                      {item.icon}
                    </div>
                    <Badge 
                      className="font-mono text-xs"
                      style={{
                        background: `${item.color}20`,
                        color: item.color,
                        border: `1px solid ${item.color}30`
                      }}
                    >
                      +{item.improvement}%
                    </Badge>
                  </div>
                  
                  <h3 
                    className="text-lg font-semibold mb-4"
                    style={{ color: 'var(--terminal-silver)', fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    {item.metric}
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span 
                        className="text-sm"
                        style={{ color: 'rgba(192, 197, 206, 0.7)', fontFamily: 'JetBrains Mono, monospace' }}
                      >
                        {language === 'ar' ? 'التقليدي:' : 'Traditional:'}
                      </span>
                      <span 
                        className="font-mono text-sm"
                        style={{ color: '#ff6b6b' }}
                      >
                        {item.traditional}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span 
                        className="text-sm"
                        style={{ color: 'rgba(192, 197, 206, 0.7)', fontFamily: 'JetBrains Mono, monospace' }}
                      >
                        Neo:
                      </span>
                      <span 
                        className="font-mono text-sm font-semibold"
                        style={{ color: 'var(--neo-green)' }}
                      >
                        {item.neo}
                      </span>
                    </div>
                    
                    <Progress 
                      value={animationComplete ? item.improvement : 0} 
                      className="h-2"
                      style={{
                        backgroundColor: 'rgba(192, 197, 206, 0.1)'
                      }}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Detailed Analysis Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* ROI Analysis */}
            <Card 
              className="border"
              style={{
                background: 'var(--terminal-bg-secondary)',
                borderColor: 'rgba(192, 197, 206, 0.2)'
              }}
            >
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <TrendingUp className="w-6 h-6" style={{ color: 'var(--neo-green)' }} />
                  <h3 
                    className="text-xl font-semibold"
                    style={{ color: 'var(--terminal-silver)', fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    {language === 'ar' ? 'تحليل العائد على الاستثمار' : 'ROI Analysis'}
                  </h3>
                </div>
                
                <div className="space-y-4">
                  {roiData.map((data, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span 
                          className="text-sm"
                          style={{ color: 'rgba(192, 197, 206, 0.8)', fontFamily: 'JetBrains Mono, monospace' }}
                        >
                          {data.timeframe}
                        </span>
                        <div className="flex items-center space-x-4">
                          <span 
                            className="text-sm"
                            style={{ color: '#ff6b6b', fontFamily: 'JetBrains Mono, monospace' }}
                          >
                            ${data.traditional.toLocaleString()}
                          </span>
                          <ArrowRight className="w-4 h-4" style={{ color: 'var(--terminal-silver)' }} />
                          <span 
                            className="text-sm font-semibold"
                            style={{ color: 'var(--neo-green)', fontFamily: 'JetBrains Mono, monospace' }}
                          >
                            ${data.neo.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Progress value={(data.traditional / data.neo) * 100} className="h-1" />
                        <Progress value={100} className="h-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Key Performance Indicators */}
            <Card 
              className="border"
              style={{
                background: 'var(--terminal-bg-secondary)',
                borderColor: 'rgba(192, 197, 206, 0.2)'
              }}
            >
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Award className="w-6 h-6" style={{ color: 'var(--neo-blue)' }} />
                  <h3 
                    className="text-xl font-semibold"
                    style={{ color: 'var(--terminal-silver)', fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    {additionalMetrics[0].title}
                  </h3>
                </div>
                
                <div className="space-y-4">
                  {additionalMetrics[0].items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span 
                        className="text-sm"
                        style={{ color: 'rgba(192, 197, 206, 0.8)', fontFamily: 'JetBrains Mono, monospace' }}
                      >
                        {item.label}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span 
                          className="text-lg font-bold"
                          style={{ color: item.color, fontFamily: 'JetBrains Mono, monospace' }}
                        >
                          {item.value}
                        </span>
                        <CheckCircle className="w-4 h-4" style={{ color: 'var(--neo-green)' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Feature Comparison Matrix */}
          <Card 
            className="border"
            style={{
              background: 'var(--terminal-bg-secondary)',
              borderColor: 'rgba(192, 197, 206, 0.2)'
            }}
          >
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Users className="w-6 h-6" style={{ color: 'var(--neo-green)' }} />
                <h3 
                  className="text-xl font-semibold"
                  style={{ color: 'var(--terminal-silver)', fontFamily: 'JetBrains Mono, monospace' }}
                >
                  {language === 'ar' ? 'مقارنة الميزات التفصيلية' : 'Detailed Feature Comparison'}
                </h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr 
                      className="border-b"
                      style={{ borderColor: 'rgba(192, 197, 206, 0.2)' }}
                    >
                      <th 
                        className="text-left py-3"
                        style={{ color: 'var(--terminal-silver)', fontFamily: 'JetBrains Mono, monospace' }}
                      >
                        {language === 'ar' ? 'الميزة' : 'Feature'}
                      </th>
                      <th 
                        className="text-center py-3"
                        style={{ color: '#ff6b6b', fontFamily: 'JetBrains Mono, monospace' }}
                      >
                        {language === 'ar' ? 'التقليدي' : 'Traditional'}
                      </th>
                      <th 
                        className="text-center py-3"
                        style={{ color: 'var(--neo-green)', fontFamily: 'JetBrains Mono, monospace' }}
                      >
                        Neo Solution
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { feature: language === 'ar' ? 'النشر السريع' : 'Rapid Deployment', traditional: false, neo: true },
                      { feature: language === 'ar' ? 'تكامل الذكاء الاصطناعي' : 'AI Integration', traditional: false, neo: true },
                      { feature: language === 'ar' ? 'دعم متعدد المنصات' : 'Multi-platform Support', traditional: true, neo: true },
                      { feature: language === 'ar' ? 'مراقبة الأداء المباشر' : 'Real-time Monitoring', traditional: false, neo: true },
                      { feature: language === 'ar' ? 'الأمان المتقدم' : 'Advanced Security', traditional: true, neo: true },
                      { feature: language === 'ar' ? 'تحليلات متقدمة' : 'Advanced Analytics', traditional: false, neo: true }
                    ].map((row, index) => (
                      <tr 
                        key={index}
                        className="border-b"
                        style={{ borderColor: 'rgba(192, 197, 206, 0.1)' }}
                      >
                        <td 
                          className="py-4"
                          style={{ color: 'var(--terminal-silver)', fontFamily: 'JetBrains Mono, monospace' }}
                        >
                          {row.feature}
                        </td>
                        <td className="text-center py-4">
                          {row.traditional ? (
                            <CheckCircle className="w-5 h-5 mx-auto" style={{ color: 'var(--neo-green)' }} />
                          ) : (
                            <XCircle className="w-5 h-5 mx-auto" style={{ color: '#ff6b6b' }} />
                          )}
                        </td>
                        <td className="text-center py-4">
                          {row.neo ? (
                            <CheckCircle className="w-5 h-5 mx-auto" style={{ color: 'var(--neo-green)' }} />
                          ) : (
                            <XCircle className="w-5 h-5 mx-auto" style={{ color: '#ff6b6b' }} />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>

          {/* Call to Action */}
          <div className="text-center space-y-6">
            <div 
              className="text-2xl font-bold"
              style={{ color: 'var(--terminal-silver)', fontFamily: 'JetBrains Mono, monospace' }}
            >
              {language === 'ar' ? 'جاهز لتجربة الفرق؟' : 'Ready to Experience the Difference?'}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => onNavigate?.('store-builder')}
                className="px-8 py-4 transition-all transform hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, var(--neo-blue), var(--neo-green))',
                  color: 'var(--neo-bg-primary)',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: '600',
                  fontSize: '16px',
                  fontFamily: 'JetBrains Mono, monospace',
                  boxShadow: '0 4px 20px rgba(0, 212, 255, 0.3)'
                }}
              >
                <Zap className="w-5 h-5 mr-2" />
                {language === 'ar' ? 'ابدأ مع Neo' : 'Start with Neo'}
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button
                onClick={() => onNavigate?.('pricing')}
                className="px-8 py-4 transition-all transform hover:scale-105"
                style={{
                  background: 'transparent',
                  color: 'var(--neo-blue)',
                  border: '1px solid var(--neo-blue)',
                  borderRadius: '6px',
                  fontWeight: '600',
                  fontSize: '16px',
                  fontFamily: 'JetBrains Mono, monospace'
                }}
              >
                {language === 'ar' ? 'عرض الأسعار' : 'View Pricing'}
              </Button>
            </div>
          </div>
        </div>
      </RTLContainer>
    </div>
  );
}