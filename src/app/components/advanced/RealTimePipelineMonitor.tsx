import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { useLanguage } from '../../contexts/LanguageContext';
import { RTLContainer } from '../LanguageSwitcher';
import { 
  Activity, 
  Clock, 
  Zap, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  Play,
  Pause,
  RotateCcw,
  TrendingUp,
  Users,
  Server,
  Database,
  Globe,
  Cpu,
  MemoryStick,
  HardDrive,
  Network,
  Shield,
  Eye,
  Settings,
  Terminal
} from 'lucide-react';

// ✅ ENHANCED: Real service timing data (15min - 14 days)
const serviceTemplates = [
  {
    id: 'store-setup-basic',
    name: 'Basic Store Setup',
    category: 'Store Setup',
    estimatedTime: { min: 15, max: 45, unit: 'minutes' },
    complexity: 'low',
    stages: ['domain-setup', 'theme-install', 'basic-config', 'payment-setup', 'testing']
  },
  {
    id: 'store-setup-advanced',
    name: 'Advanced Store Setup',
    category: 'Store Setup', 
    estimatedTime: { min: 2, max: 4, unit: 'hours' },
    complexity: 'medium',
    stages: ['domain-setup', 'custom-theme', 'advanced-config', 'multi-payment', 'seo-setup', 'analytics', 'testing']
  },
  {
    id: 'store-setup-enterprise',
    name: 'Enterprise Store Setup',
    category: 'Store Setup',
    estimatedTime: { min: 1, max: 3, unit: 'days' },
    complexity: 'high',
    stages: ['infrastructure', 'custom-development', 'integration-apis', 'security-audit', 'performance-optimization', 'staging-deployment', 'production-deployment', 'monitoring-setup']
  },
  {
    id: 'n8n-simple',
    name: 'Simple N8N Automation',
    category: 'N8N Automation',
    estimatedTime: { min: 30, max: 90, unit: 'minutes' },
    complexity: 'low',
    stages: ['workflow-design', 'basic-triggers', 'simple-actions', 'testing']
  },
  {
    id: 'n8n-complex',
    name: 'Complex N8N Workflow',
    category: 'N8N Automation',
    estimatedTime: { min: 4, max: 8, unit: 'hours' },
    complexity: 'medium',
    stages: ['requirements-analysis', 'workflow-architecture', 'multi-step-automation', 'error-handling', 'performance-optimization', 'testing', 'monitoring']
  },
  {
    id: 'n8n-enterprise',
    name: 'Enterprise N8N Integration',
    category: 'N8N Automation',
    estimatedTime: { min: 3, max: 14, unit: 'days' },
    complexity: 'high',
    stages: ['system-analysis', 'architecture-design', 'custom-nodes', 'enterprise-integration', 'security-implementation', 'scalability-testing', 'deployment', 'monitoring', 'documentation']
  },
  {
    id: 'neosync-basic',
    name: 'Basic NeoSync Setup',
    category: 'NeoSync',
    estimatedTime: { min: 15, max: 30, unit: 'minutes' },
    complexity: 'low',
    stages: ['account-setup', 'basic-sync', 'testing']
  },
  {
    id: 'neosync-advanced',
    name: 'Advanced NeoSync Configuration',
    category: 'NeoSync',
    estimatedTime: { min: 1, max: 3, unit: 'hours' },
    complexity: 'medium',
    stages: ['custom-mapping', 'advanced-filters', 'webhook-setup', 'monitoring', 'testing']
  },
  {
    id: 'brand-checker-setup',
    name: 'Brand Checker Setup',
    category: 'Brand Monitor',
    estimatedTime: { min: 10, max: 20, unit: 'minutes' },
    complexity: 'low',
    stages: ['brand-registration', 'monitoring-setup', 'alert-configuration']
  },
  {
    id: 'brand-checker-enterprise',
    name: 'Enterprise Brand Monitoring',
    category: 'Brand Monitor',
    estimatedTime: { min: 2, max: 6, unit: 'hours' },
    complexity: 'medium',
    stages: ['comprehensive-scan', 'multi-platform-monitoring', 'custom-alerts', 'reporting-setup', 'integration']
  }
];

// ✅ ENHANCED: Mock active pipelines with realistic data
const mockActivePipelines = [
  {
    id: 'pipeline-001',
    serviceId: 'store-setup-advanced',
    clientName: 'Tech Innovators LLC',
    startTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    currentStage: 3,
    progress: 65,
    status: 'running',
    assignedTeam: ['Fahad A.', 'Sarah M.', 'Ahmed K.'],
    priority: 'high',
    region: 'GCC'
  },
  {
    id: 'pipeline-002', 
    serviceId: 'n8n-complex',
    clientName: 'Global Retail Solutions',
    startTime: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    currentStage: 5,
    progress: 85,
    status: 'running',
    assignedTeam: ['Maria L.', 'David R.'],
    priority: 'medium',
    region: 'US'
  },
  {
    id: 'pipeline-003',
    serviceId: 'neosync-basic',
    clientName: 'Quick Start Business',
    startTime: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
    currentStage: 2,
    progress: 95,
    status: 'completing',
    assignedTeam: ['John D.'],
    priority: 'low',
    region: 'US'
  }
];

interface Pipeline {
  id: string;
  serviceId: string;
  clientName: string;
  startTime: Date;
  currentStage: number;
  progress: number;
  status: 'queued' | 'running' | 'paused' | 'completing' | 'completed' | 'error';
  assignedTeam: string[];
  priority: 'low' | 'medium' | 'high' | 'critical';
  region: 'US' | 'GCC' | 'Global';
}

interface SystemMetrics {
  activeServices: number;
  queuedServices: number;
  completedToday: number;
  averageTime: string;
  teamUtilization: number;
  serverLoad: number;
  errorRate: number;
  customerSatisfaction: number;
}

export function RealTimePipelineMonitor({ onNavigate }: { onNavigate?: (section: string) => void }) {
  const { isRTL, language } = useLanguage();
  const [activePipelines, setActivePipelines] = useState<Pipeline[]>(mockActivePipelines);
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics>({
    activeServices: 12,
    queuedServices: 8,
    completedToday: 47,
    averageTime: '2.3hrs',
    teamUtilization: 78,
    serverLoad: 34,
    errorRate: 0.2,
    customerSatisfaction: 98.5
  });
  const [selectedView, setSelectedView] = useState<'overview' | 'active' | 'analytics' | 'team'>('overview');
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // ✅ ENHANCED: Real-time simulation
  useEffect(() => {
    if (!isAutoRefresh) return;

    const interval = setInterval(() => {
      setActivePipelines(prev => prev.map(pipeline => {
        if (pipeline.status === 'running') {
          const newProgress = Math.min(pipeline.progress + Math.random() * 3, 100);
          const service = serviceTemplates.find(s => s.id === pipeline.serviceId);
          const newStage = service ? Math.min(
            Math.floor((newProgress / 100) * service.stages.length),
            service.stages.length - 1
          ) : pipeline.currentStage;
          
          return {
            ...pipeline,
            progress: newProgress,
            currentStage: newStage,
            status: newProgress >= 100 ? 'completed' : 'running'
          };
        }
        return pipeline;
      }));

      setSystemMetrics(prev => ({
        ...prev,
        activeServices: prev.activeServices + Math.floor(Math.random() * 3) - 1,
        serverLoad: Math.max(0, Math.min(100, prev.serverLoad + Math.random() * 10 - 5)),
        teamUtilization: Math.max(0, Math.min(100, prev.teamUtilization + Math.random() * 4 - 2))
      }));

      setLastUpdate(new Date());
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoRefresh]);

  // ✅ ENHANCED: Get service template
  const getServiceTemplate = useCallback((serviceId: string) => {
    return serviceTemplates.find(s => s.id === serviceId);
  }, []);

  // ✅ ENHANCED: Status color mapping
  const getStatusColor = useCallback((status: Pipeline['status']) => {
    switch (status) {
      case 'running': return 'text-[#00d4ff]';
      case 'completing': return 'text-[#00ff88]';
      case 'completed': return 'text-[#00ff88]';
      case 'error': return 'text-red-400';
      case 'paused': return 'text-yellow-400';
      case 'queued': return 'text-[#C0C5CE]/70';
      default: return 'text-[#C0C5CE]';
    }
  }, []);

  // ✅ ENHANCED: Priority badge
  const getPriorityBadge = useCallback((priority: Pipeline['priority']) => {
    const variants = {
      low: 'bg-[#C0C5CE]/20 text-[#C0C5CE]',
      medium: 'bg-[#00d4ff]/20 text-[#00d4ff]',
      high: 'bg-yellow-400/20 text-yellow-400',
      critical: 'bg-red-400/20 text-red-400'
    };
    return variants[priority];
  }, []);

  // ✅ ENHANCED: Time formatting
  const formatElapsedTime = useCallback((startTime: Date) => {
    const now = new Date();
    const diff = now.getTime() - startTime.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  }, []);

  // ✅ ENHANCED: Memoized statistics
  const pipelineStats = useMemo(() => {
    const running = activePipelines.filter(p => p.status === 'running').length;
    const completing = activePipelines.filter(p => p.status === 'completing').length;
    const avgProgress = activePipelines.reduce((acc, p) => acc + p.progress, 0) / activePipelines.length;
    
    return { running, completing, avgProgress };
  }, [activePipelines]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#C0C5CE] font-mono">
      {/* ✅ ENHANCED: Terminal grid background */}
      <div className="fixed inset-0 enterprise-grid opacity-10 pointer-events-none"></div>
      
      <RTLContainer className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        <div className={`space-y-8 ${isRTL ? 'text-right' : 'text-left'}`}>
          
          {/* ✅ ENHANCED: Header with real-time status */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-[#00d4ff]/20 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-[#00d4ff]" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-[#C0C5CE]">
                  {language === 'ar' ? 'مراقب خط الأنابيب المتقدم' : 'Real-Time Pipeline Monitor'}
                </h1>
                <p className="text-[#C0C5CE]/70 mt-1">
                  {language === 'ar' 
                    ? 'مراقبة شاملة للخدمات النشطة - الأوقات الفعلية (15 دقيقة - 14 يوم)'
                    : 'Comprehensive service monitoring - Real timing (15min - 14 days)'
                  }
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isAutoRefresh ? 'bg-[#00ff88] animate-pulse' : 'bg-[#C0C5CE]/50'}`}></div>
                <span className="text-sm text-[#C0C5CE]/70 font-mono">
                  {language === 'ar' ? 'آخر تحديث' : 'Last Update'}: {lastUpdate.toLocaleTimeString()}
                </span>
              </div>
              
              <Button
                onClick={() => setIsAutoRefresh(!isAutoRefresh)}
                className={`${isAutoRefresh ? 'bg-[#00ff88]/20 text-[#00ff88]' : 'bg-[#C0C5CE]/20 text-[#C0C5CE]'} border-0 font-mono`}
              >
                {isAutoRefresh ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* ✅ ENHANCED: Navigation tabs */}
          <div className="flex space-x-1 bg-[#12151C] p-1 rounded-lg">
            {[
              { id: 'overview', label: language === 'ar' ? 'نظرة عامة' : 'Overview', icon: Eye },
              { id: 'active', label: language === 'ar' ? 'الخدمات النشطة' : 'Active Services', icon: Activity },
              { id: 'analytics', label: language === 'ar' ? 'التحليلات' : 'Analytics', icon: TrendingUp },
              { id: 'team', label: language === 'ar' ? 'الفريق' : 'Team', icon: Users }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedView(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md font-mono text-sm transition-all ${
                  selectedView === tab.id
                    ? 'bg-[#00d4ff] text-black'
                    : 'text-[#C0C5CE] hover:bg-[#00d4ff]/10 hover:text-[#00d4ff]'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* ✅ ENHANCED: System metrics overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <Activity className="w-5 h-5 text-[#00d4ff]" />
                <Badge className="bg-[#00ff88]/20 text-[#00ff88] font-mono">Live</Badge>
              </div>
              <div className="neo-dashboard-widget-value">{systemMetrics.activeServices}</div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">Active Services</div>
              <div className="neo-dashboard-widget-change positive">
                <TrendingUp className="w-3 h-3" />
                +{pipelineStats.running} running
              </div>
            </Card>

            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <Clock className="w-5 h-5 text-[#00ff88]" />
                <span className="text-xs text-[#C0C5CE]/70 font-mono">Avg</span>
              </div>
              <div className="neo-dashboard-widget-value text-[#00ff88]">{systemMetrics.averageTime}</div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">Completion Time</div>
              <div className="neo-dashboard-widget-change positive">
                <CheckCircle className="w-3 h-3" />
                {systemMetrics.completedToday} completed today
              </div>
            </Card>

            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <Users className="w-5 h-5 text-yellow-400" />
                <span className="text-xs text-[#C0C5CE]/70 font-mono">Team</span>
              </div>
              <div className="neo-dashboard-widget-value text-yellow-400">{systemMetrics.teamUtilization}%</div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">Utilization</div>
              <Progress value={systemMetrics.teamUtilization} className="h-2 mt-2" />
            </Card>

            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <Server className="w-5 h-5 text-[#C0C5CE]" />
                <span className="text-xs text-[#C0C5CE]/70 font-mono">System</span>
              </div>
              <div className="neo-dashboard-widget-value">{systemMetrics.serverLoad}%</div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">Server Load</div>
              <div className="flex items-center space-x-2 mt-2">
                <Cpu className="w-3 h-3 text-[#00d4ff]" />
                <span className="text-xs text-[#C0C5CE]/70">Optimal</span>
              </div>
            </Card>
          </div>

          {/* ✅ ENHANCED: Main content area based on selected view */}
          {selectedView === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* ✅ Active Pipelines Summary */}
              <div className="lg:col-span-2">
                <Card className="neo-card">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold text-[#C0C5CE] font-mono">
                        {language === 'ar' ? 'الخدمات النشطة' : 'Active Pipelines'}
                      </h3>
                      <Badge className="bg-[#00d4ff]/20 text-[#00d4ff] font-mono">
                        {activePipelines.length} {language === 'ar' ? 'نشط' : 'Active'}
                      </Badge>
                    </div>
                    
                    <div className="space-y-4">
                      {activePipelines.slice(0, 5).map(pipeline => {
                        const service = getServiceTemplate(pipeline.serviceId);
                        return (
                          <div key={pipeline.id} className="border border-[#00d4ff]/20 rounded-lg p-4 hover:border-[#00d4ff]/40 transition-all">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-3">
                                <Badge className={getPriorityBadge(pipeline.priority)}>
                                  {pipeline.priority.toUpperCase()}
                                </Badge>
                                <h4 className="font-mono text-[#C0C5CE]">{pipeline.clientName}</h4>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className={`text-sm font-mono ${getStatusColor(pipeline.status)}`}>
                                  {pipeline.status.toUpperCase()}
                                </span>
                                <Badge className="bg-[#C0C5CE]/10 text-[#C0C5CE] font-mono text-xs">
                                  {pipeline.region}
                                </Badge>
                              </div>
                            </div>
                            
                            <div className="mb-3">
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-[#C0C5CE]/70 font-mono">{service?.name}</span>
                                <span className="text-[#00ff88] font-mono">{Math.round(pipeline.progress)}%</span>
                              </div>
                              <Progress value={pipeline.progress} className="h-2" />
                            </div>
                            
                            <div className="flex items-center justify-between text-xs text-[#C0C5CE]/70">
                              <div className="flex items-center space-x-2">
                                <Clock className="w-3 h-3" />
                                <span className="font-mono">Running: {formatElapsedTime(pipeline.startTime)}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Users className="w-3 h-3" />
                                <span className="font-mono">{pipeline.assignedTeam.length} members</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Card>
              </div>

              {/* ✅ System Status & Quick Actions */}
              <div className="space-y-6">
                <Card className="neo-card">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-[#C0C5CE] font-mono mb-4">
                      {language === 'ar' ? 'حالة النظام' : 'System Status'}
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Database className="w-4 h-4 text-[#00ff88]" />
                          <span className="text-sm font-mono">Database</span>
                        </div>
                        <Badge className="bg-[#00ff88]/20 text-[#00ff88] font-mono">Healthy</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Network className="w-4 h-4 text-[#00ff88]" />
                          <span className="text-sm font-mono">Network</span>
                        </div>
                        <Badge className="bg-[#00ff88]/20 text-[#00ff88] font-mono">Optimal</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Shield className="w-4 h-4 text-[#00ff88]" />
                          <span className="text-sm font-mono">Security</span>
                        </div>
                        <Badge className="bg-[#00ff88]/20 text-[#00ff88] font-mono">Secure</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Globe className="w-4 h-4 text-[#00d4ff]" />
                          <span className="text-sm font-mono">CDN</span>
                        </div>
                        <Badge className="bg-[#00d4ff]/20 text-[#00d4ff] font-mono">Global</Badge>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="neo-card">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-[#C0C5CE] font-mono mb-4">
                      {language === 'ar' ? 'إجراءات سريعة' : 'Quick Actions'}
                    </h3>
                    
                    <div className="space-y-3">
                      <Button className="w-full neo-button-primary" onClick={() => onNavigate?.('admin-dashboard')}>
                        <Terminal className="w-4 h-4 mr-2" />
                        {language === 'ar' ? 'وحدة التحكم' : 'Admin Console'}
                      </Button>
                      
                      <Button className="w-full neo-button-outline" onClick={() => onNavigate?.('analytics')}>
                        <TrendingUp className="w-4 h-4 mr-2" />
                        {language === 'ar' ? 'التحليلات المتقدمة' : 'Advanced Analytics'}
                      </Button>
                      
                      <Button className="w-full neo-button-ghost" onClick={() => onNavigate?.('settings')}>
                        <Settings className="w-4 h-4 mr-2" />
                        {language === 'ar' ? 'الإعدادات' : 'Settings'}
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* ✅ ENHANCED: Active Services detailed view */}
          {selectedView === 'active' && (
            <Card className="neo-card">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#C0C5CE] font-mono mb-6">
                  {language === 'ar' ? 'تفاصيل الخدمات النشطة' : 'Active Services Details'}
                </h3>
                
                <div className="space-y-6">
                  {activePipelines.map(pipeline => {
                    const service = getServiceTemplate(pipeline.serviceId);
                    return (
                      <div key={pipeline.id} className="border border-[#00d4ff]/30 rounded-lg p-6 neo-interactive-card">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          {/* Pipeline Info */}
                          <div className="lg:col-span-2">
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <h4 className="text-lg font-bold text-[#C0C5CE] font-mono">{pipeline.clientName}</h4>
                                <p className="text-[#C0C5CE]/70 font-mono">{service?.name}</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge className={getPriorityBadge(pipeline.priority)}>
                                  {pipeline.priority.toUpperCase()}
                                </Badge>
                                <Badge className={`${getStatusColor(pipeline.status)} bg-opacity-20 font-mono`}>
                                  {pipeline.status.toUpperCase()}
                                </Badge>
                              </div>
                            </div>
                            
                            {/* Stage Progress */}
                            <div className="mb-4">
                              <div className="flex justify-between text-sm mb-2">
                                <span className="text-[#C0C5CE]/70 font-mono">
                                  Stage: {service?.stages[pipeline.currentStage] || 'Unknown'}
                                </span>
                                <span className="text-[#00ff88] font-mono">{Math.round(pipeline.progress)}%</span>
                              </div>
                              <Progress value={pipeline.progress} className="h-3" />
                            </div>
                            
                            {/* Stage Breakdown */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                              {service?.stages.map((stage, index) => (
                                <div key={stage} className={`text-xs p-2 rounded border font-mono ${
                                  index <= pipeline.currentStage 
                                    ? 'border-[#00ff88] bg-[#00ff88]/10 text-[#00ff88]'
                                    : 'border-[#C0C5CE]/20 bg-[#C0C5CE]/5 text-[#C0C5CE]/70'
                                }`}>
                                  {index < pipeline.currentStage && <CheckCircle className="w-3 h-3 inline mr-1" />}
                                  {index === pipeline.currentStage && <Zap className="w-3 h-3 inline mr-1 animate-pulse" />}
                                  {stage.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {/* Team & Stats */}
                          <div className="space-y-4">
                            <div>
                              <h5 className="text-sm font-semibold text-[#C0C5CE] font-mono mb-2">Assigned Team</h5>
                              <div className="space-y-1">
                                {pipeline.assignedTeam.map(member => (
                                  <div key={member} className="flex items-center space-x-2">
                                    <div className="w-6 h-6 bg-[#00d4ff]/20 rounded-full flex items-center justify-center">
                                      <span className="text-xs font-mono text-[#00d4ff]">
                                        {member.split(' ').map(n => n[0]).join('')}
                                      </span>
                                    </div>
                                    <span className="text-sm font-mono text-[#C0C5CE]">{member}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <h5 className="text-sm font-semibold text-[#C0C5CE] font-mono mb-2">Stats</h5>
                              <div className="space-y-2 text-sm font-mono">
                                <div className="flex justify-between">
                                  <span className="text-[#C0C5CE]/70">Started:</span>
                                  <span className="text-[#C0C5CE]">{formatElapsedTime(pipeline.startTime)} ago</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-[#C0C5CE]/70">Region:</span>
                                  <span className="text-[#C0C5CE]">{pipeline.region}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-[#C0C5CE]/70">Est. Time:</span>
                                  <span className="text-[#C0C5CE]">
                                    {service?.estimatedTime.min}-{service?.estimatedTime.max} {service?.estimatedTime.unit}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex space-x-2">
                              <Button size="sm" className="flex-1 neo-button-outline">
                                <Eye className="w-3 h-3 mr-1" />
                                View
                              </Button>
                              <Button size="sm" className="flex-1 neo-button-ghost">
                                <Settings className="w-3 h-3 mr-1" />
                                Manage
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>
          )}

        </div>
      </RTLContainer>
    </div>
  );
}