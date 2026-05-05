import React, { useState, useEffect, useMemo } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Terminal, Server, Database, Cloud, Shield, Zap, Settings, Activity } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

// ✅ ENHANCED: System Architecture Visualization Component
export function SystemArchitecture({ onNavigate }: { onNavigate?: (section: string) => void }) {
  const { language, isRTL } = useLanguage();
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [pipelinePhase, setPipelinePhase] = useState<'planning' | 'deployment' | 'monitoring'>('planning');

  // ✅ System Architecture Nodes
  const architectureNodes = useMemo(() => ({
    en: {
      frontend: {
        id: 'frontend',
        title: 'Frontend Layer',
        description: 'React + Terminal UI',
        technologies: ['React 18+', 'Tailwind CSS', 'TypeScript', 'JetBrains Mono'],
        status: 'active',
        connections: ['api-gateway'],
        icon: Terminal,
        metrics: { uptime: '99.9%', requests: '~2.3k/min', latency: '< 100ms' }
      },
      'api-gateway': {
        id: 'api-gateway',
        title: 'API Gateway', 
        description: 'Request routing & auth',
        technologies: ['Supabase Edge Functions', 'Hono Framework', 'CORS', 'Rate Limiting'],
        status: 'active',
        connections: ['backend-services', 'database'],
        icon: Server,
        metrics: { uptime: '99.95%', requests: '~5.7k/min', latency: '< 50ms' }
      },
      'backend-services': {
        id: 'backend-services',
        title: 'Service Layer',
        description: 'Business logic & automation',
        technologies: ['Store Setup', 'N8N Workflows', 'NeoSync', 'Brand Monitor'],
        status: 'processing',
        connections: ['database', 'external-apis'],
        icon: Settings,
        metrics: { active: '4 services', processing: '12 jobs', queued: '3 jobs' }
      },
      database: {
        id: 'database',
        title: 'Data Layer',
        description: 'PostgreSQL + KV Store',
        technologies: ['Supabase PostgreSQL', 'Key-Value Store', 'Real-time Subscriptions'],
        status: 'active',
        connections: ['monitoring'],
        icon: Database,
        metrics: { size: '2.4GB', queries: '~1.2k/s', connections: '45/100' }
      },
      'external-apis': {
        id: 'external-apis',
        title: 'External APIs',
        description: 'Third-party integrations',
        technologies: ['WordPress API', 'Shopify API', 'Wix API', 'Zed API', 'Payment Gateways'],
        status: 'active',
        connections: ['monitoring'],
        icon: Cloud,
        metrics: { integrations: '8 active', success: '98.4%', avg_time: '245ms' }
      },
      monitoring: {
        id: 'monitoring',
        title: 'Monitoring & Security',
        description: 'System health & protection',
        technologies: ['Performance Monitor', 'Error Tracking', 'Security Audit', 'Alerts'],
        status: 'monitoring',
        connections: [],
        icon: Activity,
        metrics: { alerts: '0 critical', health: '98.7%', incidents: '0 open' }
      }
    },
    ar: {
      frontend: {
        id: 'frontend',
        title: 'طبقة الواجهة الأمامية',
        description: 'React + واجهة الطرفية',
        technologies: ['React 18+', 'Tailwind CSS', 'TypeScript', 'JetBrains Mono'],
        status: 'active',
        connections: ['api-gateway'],
        icon: Terminal,
        metrics: { uptime: '99.9%', requests: '~2.3k/دقيقة', latency: '< 100ms' }
      },
      'api-gateway': {
        id: 'api-gateway',
        title: 'بوابة API',
        description: 'توجيه الطلبات والمصادقة',
        technologies: ['Supabase Edge Functions', 'Hono Framework', 'CORS', 'Rate Limiting'],
        status: 'active',
        connections: ['backend-services', 'database'],
        icon: Server,
        metrics: { uptime: '99.95%', requests: '~5.7k/دقيقة', latency: '< 50ms' }
      },
      'backend-services': {
        id: 'backend-services',
        title: 'طبقة الخدمات',
        description: 'منطق الأعمال والأتمتة',
        technologies: ['إعداد المتجر', 'سير عمل N8N', 'NeoSync', 'مراقب العلامة التجارية'],
        status: 'processing',
        connections: ['database', 'external-apis'],
        icon: Settings,
        metrics: { active: '4 خدمات', processing: '12 مهمة', queued: '3 مهام' }
      },
      database: {
        id: 'database',
        title: 'طبقة البيانات',
        description: 'PostgreSQL + KV Store',
        technologies: ['Supabase PostgreSQL', 'Key-Value Store', 'اشتراكات الوقت الفعلي'],
        status: 'active',
        connections: ['monitoring'],
        icon: Database,
        metrics: { size: '2.4GB', queries: '~1.2k/ثانية', connections: '45/100' }
      },
      'external-apis': {
        id: 'external-apis',
        title: 'APIs خارجية',
        description: 'تكاملات الطرف الثالث',
        technologies: ['WordPress API', 'Shopify API', 'Wix API', 'Zed API', 'بوابات الدفع'],
        status: 'active',
        connections: ['monitoring'],
        icon: Cloud,
        metrics: { integrations: '8 نشطة', success: '98.4%', avg_time: '245ms' }
      },
      monitoring: {
        id: 'monitoring',
        title: 'المراقبة والأمان',
        description: 'صحة النظام والحماية',
        technologies: ['مراقب الأداء', 'تتبع الأخطاء', 'تدقيق أمني', 'تنبيهات'],
        status: 'monitoring',
        connections: [],
        icon: Activity,
        metrics: { alerts: '0 حرجة', health: '98.7%', incidents: '0 مفتوحة' }
      }
    }
  }), []);

  const currentNodes = architectureNodes[language as keyof typeof architectureNodes];

  // ✅ Pipeline phases data
  const pipelinePhases = useMemo(() => ({
    en: {
      planning: {
        title: 'Planning Phase',
        description: 'Analysis and architecture design',
        duration: '15-30 minutes',
        steps: ['Requirements analysis', 'Platform selection', 'Architecture design', 'Resource allocation']
      },
      deployment: {
        title: 'Deployment Phase', 
        description: 'Service deployment and configuration',
        duration: '30 minutes - 4 hours',
        steps: ['Environment setup', 'Service deployment', 'Configuration', 'Testing']
      },
      monitoring: {
        title: 'Monitoring Phase',
        description: 'Continuous monitoring and optimization',
        duration: 'Ongoing',
        steps: ['Performance monitoring', 'Error tracking', 'Optimization', 'Maintenance']
      }
    },
    ar: {
      planning: {
        title: 'مرحلة التخطيط',
        description: 'التحليل وتصميم البنية',
        duration: '15-30 دقيقة',
        steps: ['تحليل المتطلبات', 'اختيار المنصة', 'تصميم البنية', 'تخصيص الموارد']
      },
      deployment: {
        title: 'مرحلة النشر',
        description: 'نشر الخدمات والتكوين',
        duration: '30 دقيقة - 4 ساعات', 
        steps: ['إعداد البيئة', 'نشر الخدمات', 'التكوين', 'الاختبار']
      },
      monitoring: {
        title: 'مرحلة المراقبة',
        description: 'المراقبة المستمرة والتحسين',
        duration: 'مستمرة',
        steps: ['مراقبة الأداء', 'تتبع الأخطاء', 'التحسين', 'الصيانة']
      }
    }
  }), []);

  const currentPhases = pipelinePhases[language as keyof typeof pipelinePhases];

  // ✅ Status colors
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-[#00ff88]';
      case 'processing': return 'text-[#00d4ff]';
      case 'monitoring': return 'text-[#ffeb3b]';
      default: return 'text-[#C0C5CE]';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'active': return 'bg-[#00ff88]/20 border-[#00ff88]/30';
      case 'processing': return 'bg-[#00d4ff]/20 border-[#00d4ff]/30';
      case 'monitoring': return 'bg-[#ffeb3b]/20 border-[#ffeb3b]/30';
      default: return 'bg-[#C0C5CE]/20 border-[#C0C5CE]/30';
    }
  };

  const content = useMemo(() => ({
    en: {
      title: 'System Architecture',
      subtitle: 'Comprehensive overview of NeoTech platform infrastructure',
      description: 'Explore our enterprise-grade architecture with real-time monitoring and automatic scaling.',
      commandTitle: '$ neo-architecture --show-detailed',
      pipelineTitle: 'Deployment Pipeline',
      metricsTitle: 'System Metrics',
      backToDashboard: 'Back to Dashboard'
    },
    ar: {
      title: 'بنية النظام',
      subtitle: 'نظرة شاملة على بنية منصة نيو تك التحتية',
      description: 'استكشف بنيتنا على مستوى المؤسسات مع المراقبة في الوقت الفعلي والتوسع التلقائي.',
      commandTitle: '$ neo-architecture --show-detailed',
      pipelineTitle: 'خط أنابيب النشر',
      metricsTitle: 'مقاييس النظام',
      backToDashboard: 'العودة إلى لوحة التحكم'
    }
  }), []);

  const currentContent = content[language as keyof typeof content];

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundColor: 'var(--neo-bg-primary)',
        color: 'var(--terminal-silver)',
        fontFamily: 'JetBrains Mono, monospace'
      }}
    >
      {/* ✅ Background grid */}
      <div className="fixed inset-0 pointer-events-none enterprise-grid opacity-10" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* ✅ Header */}
        <div className={`mb-12 ${isRTL ? 'text-right' : 'text-left'}`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-[#12151C] border border-[#00d4ff]/30 rounded-lg">
              <Server className="w-8 h-8 text-[#00d4ff]" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#C0C5CE] mb-2">{currentContent.title}</h1>
              <div className="text-sm text-[#00d4ff] font-mono">{currentContent.commandTitle}</div>
            </div>
          </div>
          
          <p className="text-xl text-[#00ff88] mb-4">{currentContent.subtitle}</p>
          <p className="text-[#C0C5CE]/80 max-w-4xl">{currentContent.description}</p>
        </div>

        {/* ✅ Pipeline Phase Selector */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#C0C5CE] mb-6">{currentContent.pipelineTitle}</h2>
          <div className="flex flex-wrap gap-4 mb-8">
            {Object.entries(currentPhases).map(([key, phase]) => (
              <button
                key={key}
                onClick={() => setPipelinePhase(key as any)}
                className={`px-6 py-3 rounded-lg border transition-all duration-300 font-mono text-sm ${
                  pipelinePhase === key
                    ? 'bg-[#00d4ff] text-black border-[#00d4ff] neo-glow'
                    : 'bg-[#12151C] text-[#C0C5CE] border-[#00d4ff]/30 hover:border-[#00d4ff]/60'
                }`}
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                {phase.title}
              </button>
            ))}
          </div>

          {/* ✅ Phase details */}
          <Card className="neo-card p-6 mb-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-[#00d4ff]">
                  {currentPhases[pipelinePhase].title}
                </h3>
                <span className="text-sm text-[#00ff88] font-mono">
                  {currentPhases[pipelinePhase].duration}
                </span>
              </div>
              <p className="text-[#C0C5CE]/80">{currentPhases[pipelinePhase].description}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {currentPhases[pipelinePhase].steps.map((step, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-[#00ff88] rounded-full"></div>
                    <span className="text-[#C0C5CE]">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* ✅ Architecture Diagram */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#C0C5CE] mb-6">Architecture Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.values(currentNodes).map((node) => {
              const Icon = node.icon;
              const isActive = activeNode === node.id;
              
              return (
                <Card
                  key={node.id}
                  className={`neo-card p-6 cursor-pointer transition-all duration-300 ${
                    isActive ? 'neo-glow border-[#00d4ff]' : 'hover:border-[#00d4ff]/60'
                  } ${getStatusBg(node.status)}`}
                  onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
                >
                  <div className="space-y-4">
                    {/* ✅ Node header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#0B0D12] border border-[#00d4ff]/30 rounded">
                          <Icon className="w-5 h-5 text-[#00d4ff]" />
                        </div>
                        <div>
                          <h3 className="font-bold text-[#C0C5CE]">{node.title}</h3>
                          <p className="text-xs text-[#C0C5CE]/70">{node.description}</p>
                        </div>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(node.status).replace('text-', 'bg-')} animate-pulse`}></div>
                    </div>

                    {/* ✅ Metrics */}
                    <div className="space-y-2">
                      {Object.entries(node.metrics).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-xs">
                          <span className="text-[#C0C5CE]/70 capitalize">{key}:</span>
                          <span className={getStatusColor(node.status)}>{value}</span>
                        </div>
                      ))}
                    </div>

                    {/* ✅ Technologies (expanded view) */}
                    {isActive && (
                      <div className="space-y-3 border-t border-[#00d4ff]/20 pt-4">
                        <div className="text-xs text-[#00ff88] font-mono">Technologies:</div>
                        <div className="flex flex-wrap gap-2">
                          {node.technologies.map((tech, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-[#0B0D12] border border-[#00d4ff]/20 rounded text-xs text-[#C0C5CE]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* ✅ Real-time metrics */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#C0C5CE] mb-6">{currentContent.metricsTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="neo-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-[#00d4ff]">System Health</h3>
                <Activity className="w-6 h-6 text-[#00ff88]" />
              </div>
              <div className="text-3xl font-bold text-[#00ff88] mb-2">98.7%</div>
              <div className="text-sm text-[#C0C5CE]/70">Overall system health</div>
            </Card>

            <Card className="neo-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-[#00d4ff]">Active Services</h3>
                <Zap className="w-6 h-6 text-[#00ff88]" />
              </div>
              <div className="text-3xl font-bold text-[#00ff88] mb-2">12/12</div>
              <div className="text-sm text-[#C0C5CE]/70">All services operational</div>
            </Card>

            <Card className="neo-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-[#00d4ff]">Security Status</h3>
                <Shield className="w-6 h-6 text-[#00ff88]" />
              </div>
              <div className="text-3xl font-bold text-[#00ff88] mb-2">Secure</div>
              <div className="text-sm text-[#C0C5CE]/70">No threats detected</div>
            </Card>
          </div>
        </div>

        {/* ✅ Action buttons */}
        <div className="flex flex-wrap gap-4">
          <Button
            onClick={() => onNavigate?.('advanced-dashboard')}
            className="neo-button-primary"
          >
            View Advanced Dashboard
          </Button>
          
          <Button
            onClick={() => onNavigate?.('analytics')}
            className="neo-button-outline"
          >
            System Analytics
          </Button>
          
          <Button
            onClick={() => onNavigate?.('home')}
            variant="outline"
            className="border-[#C0C5CE]/30 text-[#C0C5CE] hover:border-[#00d4ff] hover:text-[#00d4ff]"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            {currentContent.backToDashboard}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SystemArchitecture;