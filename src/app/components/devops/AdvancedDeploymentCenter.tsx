import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { useLanguage } from '../../contexts/LanguageContext';
import { RTLContainer } from '../LanguageSwitcher';
import { 
  Rocket, 
  GitBranch,
  CheckCircle,
  XCircle,
  Clock,
  Zap,
  Server,
  Database,
  Globe,
  Code,
  Package,
  Deploy,
  RefreshCw,
  Play,
  Pause,
  StopCircle,
  Settings,
  Monitor,
  AlertTriangle,
  TrendingUp,
  Activity,
  Terminal,
  GitCommit,
  GitMerge,
  Upload,
  Download,
  Cloud,
  HardDrive
} from 'lucide-react';

interface DeploymentPipeline {
  id: string;
  name: string;
  branch: string;
  environment: 'development' | 'staging' | 'production';
  status: 'pending' | 'running' | 'success' | 'failed' | 'cancelled';
  progress: number;
  startTime: Date;
  duration: number;
  commitHash: string;
  commitMessage: string;
  author: string;
  tests: {
    unit: { passed: number; failed: number; total: number; };
    integration: { passed: number; failed: number; total: number; };
    e2e: { passed: number; failed: number; total: number; };
  };
}

interface Environment {
  name: string;
  status: 'healthy' | 'degraded' | 'down';
  uptime: number;
  lastDeploy: Date;
  version: string;
  instances: number;
  cpu: number;
  memory: number;
  requests: number;
  errors: number;
}

interface DeploymentMetrics {
  deploymentsToday: number;
  successRate: number;
  averageTime: number;
  failureRecovery: number;
  uptime: number;
  performance: number;
}

export default function AdvancedDeploymentCenter({ onNavigate }: { onNavigate?: (section: string) => void }) {
  const { isRTL, language } = useLanguage();
  
  const [deploymentMetrics, setDeploymentMetrics] = useState<DeploymentMetrics>({
    deploymentsToday: 12,
    successRate: 98.7,
    averageTime: 8.5,
    failureRecovery: 2.3,
    uptime: 99.95,
    performance: 94.2
  });

  const [pipelines, setPipelines] = useState<DeploymentPipeline[]>([
    {
      id: 'pip-001',
      name: 'NeoTech Main Platform',
      branch: 'main',
      environment: 'production',
      status: 'running',
      progress: 75,
      startTime: new Date(Date.now() - 300000),
      duration: 480,
      commitHash: 'a7f8d2c',
      commitMessage: 'feat: Advanced Security Center implementation',
      author: 'Fahad Almansour',
      tests: {
        unit: { passed: 247, failed: 2, total: 249 },
        integration: { passed: 89, failed: 0, total: 89 },
        e2e: { passed: 34, failed: 1, total: 35 }
      }
    },
    {
      id: 'pip-002',
      name: 'API Gateway Service',
      branch: 'feature/rate-limiting',
      environment: 'staging',
      status: 'success',
      progress: 100,
      startTime: new Date(Date.now() - 900000),
      duration: 520,
      commitHash: 'b9e3f1a',
      commitMessage: 'fix: Enhanced rate limiting for enterprise clients',
      author: 'DevOps Team',
      tests: {
        unit: { passed: 156, failed: 0, total: 156 },
        integration: { passed: 67, failed: 0, total: 67 },
        e2e: { passed: 23, failed: 0, total: 23 }
      }
    },
    {
      id: 'pip-003',
      name: 'Analytics Dashboard',
      branch: 'develop',
      environment: 'development',
      status: 'failed',
      progress: 60,
      startTime: new Date(Date.now() - 1200000),
      duration: 890,
      commitHash: 'c4d5e6f',
      commitMessage: 'refactor: Customer insights dashboard optimization',
      author: 'Analytics Team',
      tests: {
        unit: { passed: 189, failed: 8, total: 197 },
        integration: { passed: 45, failed: 3, total: 48 },
        e2e: { passed: 12, failed: 5, total: 17 }
      }
    }
  ]);

  const [environments, setEnvironments] = useState<Environment[]>([
    {
      name: 'Production',
      status: 'healthy',
      uptime: 99.97,
      lastDeploy: new Date(Date.now() - 1800000),
      version: 'v2.4.1',
      instances: 8,
      cpu: 23.5,
      memory: 67.2,
      requests: 2847,
      errors: 3
    },
    {
      name: 'Staging',
      status: 'healthy',
      uptime: 99.89,
      lastDeploy: new Date(Date.now() - 300000),
      version: 'v2.4.2-rc.1',
      instances: 4,
      cpu: 18.9,
      memory: 45.3,
      requests: 456,
      errors: 0
    },
    {
      name: 'Development',
      status: 'degraded',
      uptime: 98.23,
      lastDeploy: new Date(Date.now() - 600000),
      version: 'v2.5.0-alpha',
      instances: 2,
      cpu: 67.8,
      memory: 89.1,
      requests: 123,
      errors: 12
    }
  ]);

  const [selectedEnvironment, setSelectedEnvironment] = useState<string>('production');

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPipelines(prev => prev.map(pipeline => {
        if (pipeline.status === 'running' && pipeline.progress < 100) {
          return {
            ...pipeline,
            progress: Math.min(100, pipeline.progress + Math.floor(Math.random() * 5))
          };
        }
        return pipeline;
      }));

      setEnvironments(prev => prev.map(env => ({
        ...env,
        cpu: Math.max(10, Math.min(90, env.cpu + (Math.random() - 0.5) * 5)),
        memory: Math.max(20, Math.min(95, env.memory + (Math.random() - 0.5) * 3)),
        requests: env.requests + Math.floor(Math.random() * 20),
        errors: Math.max(0, env.errors + (Math.random() > 0.9 ? 1 : 0))
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': case 'healthy': return 'bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]/30';
      case 'running': case 'pending': return 'bg-[#00d4ff]/20 text-[#00d4ff] border-[#00d4ff]/30';
      case 'failed': case 'down': return 'bg-red-400/20 text-red-400 border-red-400/30';
      case 'degraded': case 'cancelled': return 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30';
      default: return 'bg-[#C0C5CE]/20 text-[#C0C5CE] border-[#C0C5CE]/30';
    }
  };

  const getEnvironmentIcon = (env: string) => {
    switch (env) {
      case 'production': return '🚀';
      case 'staging': return '🧪';
      case 'development': return '⚡';
      default: return '📦';
    }
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#C0C5CE] font-mono">
      {/* Terminal grid background */}
      <div className="fixed inset-0 enterprise-grid opacity-10 pointer-events-none"></div>
      
      <RTLContainer className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className={`space-y-8 ${isRTL ? 'text-right' : 'text-left'}`}>
          
          {/* Header */}
          <div className="neo-flex-between mb-8">
            <div className="neo-flex-start neo-space-md">
              <Rocket className="w-8 h-8 text-[#00d4ff]" />
              <div>
                <h1 className="text-3xl font-bold text-[#C0C5CE]">
                  {language === 'ar' ? 'مركز النشر المتقدم' : 'Advanced Deployment Center'}
                </h1>
                <p className="text-[#C0C5CE]/80 text-lg">
                  {language === 'ar' 
                    ? 'إدارة شاملة للنشر والبيئات والأنابيب'
                    : 'Comprehensive CI/CD pipeline & environment management'
                  }
                </p>
              </div>
            </div>
            
            <div className="neo-flex-start neo-space-sm">
              <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse"></div>
              <span className="text-[#00ff88] text-sm font-mono">
                {pipelines.filter(p => p.status === 'running').length} {language === 'ar' ? 'نشط' : 'Active'}
              </span>
            </div>
          </div>

          {/* Deployment Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <Rocket className="w-5 h-5 text-[#00d4ff]" />
                <Badge className="bg-[#00d4ff]/20 text-[#00d4ff] border-[#00d4ff]/30">
                  Today
                </Badge>
              </div>
              <div className="neo-dashboard-widget-value">
                {deploymentMetrics.deploymentsToday}
              </div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">
                {language === 'ar' ? 'عمليات النشر' : 'Deployments'}
              </div>
            </Card>

            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <CheckCircle className="w-5 h-5 text-[#00ff88]" />
                <Badge className="bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]/30">
                  {deploymentMetrics.successRate}%
                </Badge>
              </div>
              <div className="neo-dashboard-widget-value">
                {deploymentMetrics.successRate}%
              </div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">
                {language === 'ar' ? 'معدل النجاح' : 'Success Rate'}
              </div>
            </Card>

            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <Clock className="w-5 h-5 text-[#00d4ff]" />
                <Badge className="bg-[#00d4ff]/20 text-[#00d4ff] border-[#00d4ff]/30">
                  {formatDuration(deploymentMetrics.averageTime * 60)}
                </Badge>
              </div>
              <div className="neo-dashboard-widget-value">
                {deploymentMetrics.averageTime}m
              </div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">
                {language === 'ar' ? 'متوسط الوقت' : 'Avg Time'}
              </div>
            </Card>

            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <RefreshCw className="w-5 h-5 text-[#00ff88]" />
                <Badge className="bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]/30">
                  Fast
                </Badge>
              </div>
              <div className="neo-dashboard-widget-value">
                {deploymentMetrics.failureRecovery}m
              </div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">
                {language === 'ar' ? 'وقت الاستعادة' : 'Recovery Time'}
              </div>
            </Card>

            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <TrendingUp className="w-5 h-5 text-[#00ff88]" />
                <Badge className="bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]/30">
                  {deploymentMetrics.uptime}%
                </Badge>
              </div>
              <div className="neo-dashboard-widget-value">
                {deploymentMetrics.uptime}%
              </div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">
                {language === 'ar' ? 'وقت التشغيل' : 'Uptime'}
              </div>
            </Card>

            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <Zap className="w-5 h-5 text-[#00d4ff]" />
                <Badge className="bg-[#00d4ff]/20 text-[#00d4ff] border-[#00d4ff]/30">
                  Excellent
                </Badge>
              </div>
              <div className="neo-dashboard-widget-value">
                {deploymentMetrics.performance}%
              </div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">
                {language === 'ar' ? 'الأداء' : 'Performance'}
              </div>
            </Card>
          </div>

          {/* Active Pipelines & Environment Status */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Active Pipelines */}
            <div className="lg:col-span-2">
              <Card className="neo-card">
                <div className="p-6">
                  <div className="neo-flex-between mb-6">
                    <h3 className="text-[#00ff88] font-mono text-xl">
                      {language === 'ar' ? 'الأنابيب النشطة' : 'Active Pipelines'}
                    </h3>
                    <Button className="neo-button-ghost text-xs">
                      <Play className="w-3 h-3 mr-1" />
                      {language === 'ar' ? 'تشغيل جديد' : 'New Deploy'}
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {pipelines.map((pipeline) => (
                      <div key={pipeline.id} className="neo-interactive-card p-4">
                        <div className="neo-flex-between mb-3">
                          <div className="neo-flex-start neo-space-sm">
                            <div className="text-lg">
                              {getEnvironmentIcon(pipeline.environment)}
                            </div>
                            <div>
                              <div className="font-semibold text-[#C0C5CE]">
                                {pipeline.name}
                              </div>
                              <div className="text-xs text-[#C0C5CE]/70">
                                {pipeline.branch} • by {pipeline.author}
                              </div>
                            </div>
                          </div>
                          
                          <Badge className={getStatusColor(pipeline.status)}>
                            {pipeline.status}
                          </Badge>
                        </div>

                        <div className="text-xs text-[#C0C5CE]/80 mb-3">
                          <GitCommit className="w-3 h-3 inline mr-1" />
                          {pipeline.commitHash}: {pipeline.commitMessage}
                        </div>

                        <div className="neo-flex-between text-xs mb-2">
                          <span className="text-[#C0C5CE]/70">
                            {language === 'ar' ? 'التقدم:' : 'Progress:'}
                          </span>
                          <span className="text-[#00ff88]">
                            {pipeline.progress}%
                          </span>
                        </div>

                        <Progress value={pipeline.progress} className="h-2 mb-3" />

                        <div className="grid grid-cols-3 gap-3 text-xs">
                          <div className="text-center">
                            <div className="text-[#C0C5CE]/70">Unit Tests</div>
                            <div className={`${pipeline.tests.unit.failed > 0 ? 'text-red-400' : 'text-[#00ff88]'}`}>
                              {pipeline.tests.unit.passed}/{pipeline.tests.unit.total}
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-[#C0C5CE]/70">Integration</div>
                            <div className={`${pipeline.tests.integration.failed > 0 ? 'text-red-400' : 'text-[#00ff88]'}`}>
                              {pipeline.tests.integration.passed}/{pipeline.tests.integration.total}
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-[#C0C5CE]/70">E2E</div>
                            <div className={`${pipeline.tests.e2e.failed > 0 ? 'text-red-400' : 'text-[#00ff88]'}`}>
                              {pipeline.tests.e2e.passed}/{pipeline.tests.e2e.total}
                            </div>
                          </div>
                        </div>

                        <div className="neo-flex-between mt-3 text-xs">
                          <span className="text-[#C0C5CE]/60">
                            Started: {pipeline.startTime.toLocaleTimeString()}
                          </span>
                          <span className="text-[#00d4ff]">
                            Duration: {formatDuration(pipeline.duration)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            {/* Environment Status */}
            <Card className="neo-card">
              <div className="p-6">
                <div className="neo-flex-between mb-6">
                  <h3 className="text-[#00ff88] font-mono text-xl">
                    {language === 'ar' ? 'حالة البيئات' : 'Environment Status'}
                  </h3>
                  <Monitor className="w-5 h-5 text-[#00d4ff]" />
                </div>

                <div className="space-y-4">
                  {environments.map((env) => (
                    <div key={env.name} className="neo-interactive-card p-4">
                      <div className="neo-flex-between mb-3">
                        <div className="neo-flex-start neo-space-sm">
                          <div className="text-lg">
                            {getEnvironmentIcon(env.name.toLowerCase())}
                          </div>
                          <div>
                            <div className="font-semibold text-[#C0C5CE]">
                              {env.name}
                            </div>
                            <div className="text-xs text-[#C0C5CE]/70">
                              {env.version} • {env.instances} instances
                            </div>
                          </div>
                        </div>
                        
                        <Badge className={getStatusColor(env.status)}>
                          {env.status}
                        </Badge>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="neo-flex-between">
                          <span className="text-[#C0C5CE]/70">CPU:</span>
                          <span className="text-[#00d4ff]">{env.cpu.toFixed(1)}%</span>
                        </div>
                        <Progress value={env.cpu} className="h-1" />
                        
                        <div className="neo-flex-between">
                          <span className="text-[#C0C5CE]/70">Memory:</span>
                          <span className="text-[#00d4ff]">{env.memory.toFixed(1)}%</span>
                        </div>
                        <Progress value={env.memory} className="h-1" />
                        
                        <div className="neo-flex-between">
                          <span className="text-[#C0C5CE]/70">Uptime:</span>
                          <span className="text-[#00ff88]">{env.uptime}%</span>
                        </div>
                        
                        <div className="neo-flex-between">
                          <span className="text-[#C0C5CE]/70">Requests:</span>
                          <span className="text-[#00ff88]">{formatNumber(env.requests)}</span>
                        </div>
                        
                        <div className="neo-flex-between">
                          <span className="text-[#C0C5CE]/70">Errors:</span>
                          <span className={env.errors > 0 ? 'text-red-400' : 'text-[#00ff88]'}>
                            {env.errors}
                          </span>
                        </div>
                      </div>

                      <div className="text-xs text-[#C0C5CE]/60 mt-3">
                        Last deploy: {env.lastDeploy.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* DevOps Command Terminal */}
          <Card className="neo-card">
            <div className="p-6">
              <div className="neo-flex-between mb-4">
                <div className="neo-flex-start neo-space-sm">
                  <Terminal className="w-5 h-5 text-[#00d4ff]" />
                  <h3 className="text-[#00ff88] font-mono text-lg">
                    {language === 'ar' ? 'مركز أوامر DevOps' : 'DevOps Command Center'}
                  </h3>
                </div>
                <Badge className="bg-[#00d4ff]/20 text-[#00d4ff] border-[#00d4ff]/30">
                  <Activity className="w-3 h-3 mr-1" />
                  {language === 'ar' ? 'مباشر' : 'Live'}
                </Badge>
              </div>
              
              <div className="bg-[#0B0D12] border border-[#00d4ff]/20 rounded-lg p-4 font-mono text-sm">
                <div className="space-y-2">
                  <div className="text-[#00ff88]">
                    neo@devops:~$ status --all-environments --metrics
                  </div>
                  <div className="text-[#C0C5CE]/80">
                    🚀 Production: ✅ Healthy ({environments[0].uptime}% uptime)<br/>
                    🧪 Staging: ✅ Healthy ({environments[1].uptime}% uptime)<br/>
                    ⚡ Development: ⚠️ Degraded ({environments[2].uptime}% uptime)<br/>
                    📊 Success Rate: {deploymentMetrics.successRate}% ({deploymentMetrics.deploymentsToday} deployments today)
                  </div>
                  
                  <div className="text-[#00ff88] mt-4">
                    neo@devops:~$ deploy --environment=production --branch=main --auto-test
                  </div>
                  <div className="text-[#C0C5CE]/80">
                    🔄 Deployment pipeline initiated...<br/>
                    ✅ Code checkout complete<br/>
                    ✅ Dependencies installed<br/>
                    🧪 Running test suite: {pipelines[0].tests.unit.passed + pipelines[0].tests.integration.passed + pipelines[0].tests.e2e.passed} tests passing<br/>
                    📦 Building production bundle... (75% complete)
                  </div>
                  
                  <div className="text-[#00ff88] mt-4">
                    neo@devops:~$ monitor --infrastructure --real-time
                  </div>
                  <div className="text-[#C0C5CE]/80">
                    🖥️ Infrastructure Status:<br/>
                    • Load Balancers: 2/2 healthy<br/>
                    • Database Clusters: 3/3 operational<br/>
                    • CDN Edge Locations: 47/47 active<br/>
                    • Container Instances: {environments.reduce((sum, env) => sum + env.instances, 0)} running
                  </div>
                  
                  <div className="text-[#00ff88] mt-4 neo-typing-cursor">
                    neo@devops:~$ optimize --performance --auto-scale█
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </RTLContainer>
    </div>
  );
}