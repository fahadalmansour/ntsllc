import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { useLanguage } from '../../contexts/LanguageContext';
import { RTLContainer } from '../LanguageSwitcher';
import { 
  Code,
  Terminal,
  Zap,
  Database,
  Server,
  Git,
  Boxes,
  FileCode,
  Bug,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Download,
  Upload,
  Share,
  Copy,
  Check,
  X,
  Eye,
  EyeOff,
  Layers,
  Package,
  Cpu,
  MemoryStick,
  HardDrive,
  Network,
  Clock,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Info,
  Search,
  Filter,
  Maximize,
  Minimize,
  RefreshCw,
  Save,
  Trash,
  Edit,
  Plus,
  Monitor,
  Smartphone,
  Tablet,
  Globe,
  Shield,
  Lock,
  Unlock,
  Key,
  Users,
  Target,
  Rocket,
  Bot,
  Brain,
  Sparkles
} from 'lucide-react';

// ✅ ENHANCED: Developer tool interfaces
interface CodeAnalysis {
  id: string;
  filename: string;
  language: string;
  lines: number;
  complexity: number;
  bugs: number;
  vulnerabilities: number;
  coverage: number;
  performance: number;
  maintainability: 'A' | 'B' | 'C' | 'D' | 'F';
  lastAnalyzed: Date;
}

interface APIEndpoint {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  status: 'healthy' | 'warning' | 'error' | 'deprecated';
  responseTime: number;
  uptime: number;
  requestCount: number;
  errorRate: number;
  lastCall: Date;
}

interface DeploymentTarget {
  id: string;
  name: string;
  environment: 'development' | 'staging' | 'production';
  status: 'active' | 'deploying' | 'failed' | 'stopped';
  version: string;
  instances: number;
  cpu: number;
  memory: number;
  lastDeployment: Date;
  region: string;
}

interface LogEntry {
  id: string;
  timestamp: Date;
  level: 'debug' | 'info' | 'warn' | 'error' | 'fatal';
  service: string;
  message: string;
  metadata?: Record<string, any>;
}

// ✅ ENHANCED: Mock developer data
const codeAnalyses: CodeAnalysis[] = [
  {
    id: 'file-001',
    filename: 'RealTimePipelineMonitor.tsx',
    language: 'TypeScript',
    lines: 847,
    complexity: 23,
    bugs: 2,
    vulnerabilities: 0,
    coverage: 89,
    performance: 94,
    maintainability: 'A',
    lastAnalyzed: new Date(Date.now() - 2 * 60 * 60 * 1000)
  },
  {
    id: 'file-002',
    filename: 'SmartCommandCenter.tsx',
    language: 'TypeScript',
    lines: 1205,
    complexity: 31,
    bugs: 1,
    vulnerabilities: 0,
    coverage: 92,
    performance: 91,
    maintainability: 'A',
    lastAnalyzed: new Date(Date.now() - 4 * 60 * 60 * 1000)
  },
  {
    id: 'file-003',
    filename: 'PredictiveAnalytics.tsx',
    language: 'TypeScript',
    lines: 1456,
    complexity: 45,
    bugs: 3,
    vulnerabilities: 1,
    coverage: 85,
    performance: 88,
    maintainability: 'B',
    lastAnalyzed: new Date(Date.now() - 1 * 60 * 60 * 1000)
  },
  {
    id: 'file-004',
    filename: 'index.tsx',
    language: 'TypeScript',
    lines: 234,
    complexity: 8,
    bugs: 0,
    vulnerabilities: 0,
    coverage: 95,
    performance: 97,
    maintainability: 'A',
    lastAnalyzed: new Date(Date.now() - 30 * 60 * 1000)
  }
];

const apiEndpoints: APIEndpoint[] = [
  {
    id: 'api-001',
    method: 'POST',
    path: '/api/v1/store/setup',
    status: 'healthy',
    responseTime: 145,
    uptime: 99.97,
    requestCount: 15847,
    errorRate: 0.12,
    lastCall: new Date(Date.now() - 5 * 60 * 1000)
  },
  {
    id: 'api-002',
    method: 'GET',
    path: '/api/v1/analytics/dashboard',
    status: 'healthy',
    responseTime: 89,
    uptime: 99.99,
    requestCount: 45623,
    errorRate: 0.05,
    lastCall: new Date(Date.now() - 2 * 60 * 1000)
  },
  {
    id: 'api-003',
    method: 'PUT',
    path: '/api/v1/pipeline/status',
    status: 'warning',
    responseTime: 234,
    uptime: 98.45,
    requestCount: 8934,
    errorRate: 1.2,
    lastCall: new Date(Date.now() - 1 * 60 * 1000)
  },
  {
    id: 'api-004',
    method: 'DELETE',
    path: '/api/v1/legacy/cleanup',
    status: 'deprecated',
    responseTime: 567,
    uptime: 95.23,
    requestCount: 123,
    errorRate: 5.7,
    lastCall: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  }
];

const deploymentTargets: DeploymentTarget[] = [
  {
    id: 'deploy-001',
    name: 'Production US-East',
    environment: 'production',
    status: 'active',
    version: 'v2.4.7',
    instances: 12,
    cpu: 67,
    memory: 72,
    lastDeployment: new Date(Date.now() - 6 * 60 * 60 * 1000),
    region: 'us-east-1'
  },
  {
    id: 'deploy-002',
    name: 'Production GCC',
    environment: 'production',
    status: 'active',
    version: 'v2.4.7',
    instances: 8,
    cpu: 89,
    memory: 91,
    lastDeployment: new Date(Date.now() - 6 * 60 * 60 * 1000),
    region: 'gcc-central'
  },
  {
    id: 'deploy-003',
    name: 'Staging Environment',
    environment: 'staging',
    status: 'deploying',
    version: 'v2.5.0-beta',
    instances: 4,
    cpu: 45,
    memory: 52,
    lastDeployment: new Date(Date.now() - 15 * 60 * 1000),
    region: 'us-west-2'
  },
  {
    id: 'deploy-004',
    name: 'Development',
    environment: 'development',
    status: 'active',
    version: 'v2.5.0-dev',
    instances: 2,
    cpu: 23,
    memory: 34,
    lastDeployment: new Date(Date.now() - 2 * 60 * 60 * 1000),
    region: 'local'
  }
];

const recentLogs: LogEntry[] = [
  {
    id: 'log-001',
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    level: 'info',
    service: 'pipeline-monitor',
    message: 'Pipeline pipeline-001 completed successfully',
    metadata: { duration: '2h 15m', client: 'Tech Innovators LLC' }
  },
  {
    id: 'log-002',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    level: 'warn',
    service: 'api-gateway',
    message: 'High latency detected on /api/v1/pipeline/status',
    metadata: { responseTime: '234ms', threshold: '200ms' }
  },
  {
    id: 'log-003',
    timestamp: new Date(Date.now() - 8 * 60 * 1000),
    level: 'error',
    service: 'database',
    message: 'Connection pool exhaustion in us-east region',
    metadata: { activeConnections: 95, maxConnections: 100 }
  },
  {
    id: 'log-004',
    timestamp: new Date(Date.now() - 12 * 60 * 1000),
    level: 'info',
    service: 'auto-scaler',
    message: 'Scaled up CPU cluster in gcc-central region',
    metadata: { instances: 8, newInstances: 10 }
  }
];

export function EnhancedDeveloperTools({ onNavigate }: { onNavigate?: (section: string) => void }) {
  const { isRTL, language } = useLanguage();
  const [selectedTool, setSelectedTool] = useState<'overview' | 'code' | 'api' | 'deploy' | 'logs' | 'monitor'>('overview');
  const [analyses, setAnalyses] = useState<CodeAnalysis[]>(codeAnalyses);
  const [endpoints, setEndpoints] = useState<APIEndpoint[]>(apiEndpoints);
  const [deployments, setDeployments] = useState<DeploymentTarget[]>(deploymentTargets);
  const [logs, setLogs] = useState<LogEntry[]>(recentLogs);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [selectedDeployment, setSelectedDeployment] = useState<string | null>(null);
  const [logFilter, setLogFilter] = useState<'all' | 'error' | 'warn' | 'info'>('all');

  // ✅ ENHANCED: Real-time monitoring simulation
  useEffect(() => {
    const interval = setInterval(() => {
      // Update API endpoints
      setEndpoints(prev => prev.map(endpoint => ({
        ...endpoint,
        responseTime: Math.max(50, endpoint.responseTime + (Math.random() - 0.5) * 20),
        requestCount: endpoint.requestCount + Math.floor(Math.random() * 10),
        errorRate: Math.max(0, endpoint.errorRate + (Math.random() - 0.5) * 0.1)
      })));

      // Update deployments
      setDeployments(prev => prev.map(deployment => {
        if (deployment.status === 'deploying') {
          return {
            ...deployment,
            status: Math.random() > 0.3 ? 'active' : 'deploying'
          };
        }
        return {
          ...deployment,
          cpu: Math.max(0, Math.min(100, deployment.cpu + (Math.random() - 0.5) * 10)),
          memory: Math.max(0, Math.min(100, deployment.memory + (Math.random() - 0.5) * 8))
        };
      }));

      // Add new log entry occasionally
      if (Math.random() > 0.7) {
        const levels: LogEntry['level'][] = ['info', 'warn', 'error'];
        const services = ['pipeline-monitor', 'api-gateway', 'database', 'auto-scaler'];
        const messages = [
          'System health check completed',
          'Cache invalidation triggered',
          'Auto-scaling event detected',
          'Database backup completed'
        ];

        const newLog: LogEntry = {
          id: `log-${Date.now()}`,
          timestamp: new Date(),
          level: levels[Math.floor(Math.random() * levels.length)],
          service: services[Math.floor(Math.random() * services.length)],
          message: messages[Math.floor(Math.random() * messages.length)]
        };

        setLogs(prev => [newLog, ...prev.slice(0, 19)]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // ✅ ENHANCED: Status color mapping
  const getStatusColor = useCallback((status: string) => {
    switch (status) {
      case 'healthy':
      case 'active':
        return 'text-[#00ff88]';
      case 'warning':
      case 'deploying':
        return 'text-yellow-400';
      case 'error':
      case 'failed':
        return 'text-red-400';
      case 'deprecated':
      case 'stopped':
        return 'text-[#C0C5CE]/50';
      default:
        return 'text-[#C0C5CE]';
    }
  }, []);

  const getStatusBadge = useCallback((status: string) => {
    const variants: Record<string, string> = {
      healthy: 'bg-[#00ff88]/20 text-[#00ff88]',
      active: 'bg-[#00ff88]/20 text-[#00ff88]',
      warning: 'bg-yellow-400/20 text-yellow-400',
      deploying: 'bg-[#00d4ff]/20 text-[#00d4ff]',
      error: 'bg-red-400/20 text-red-400',
      failed: 'bg-red-400/20 text-red-400',
      deprecated: 'bg-[#C0C5CE]/20 text-[#C0C5CE]',
      stopped: 'bg-[#C0C5CE]/20 text-[#C0C5CE]'
    };
    return variants[status] || 'bg-[#C0C5CE]/20 text-[#C0C5CE]';
  }, []);

  // ✅ ENHANCED: Log level colors
  const getLogLevelColor = useCallback((level: LogEntry['level']) => {
    switch (level) {
      case 'debug': return 'text-[#C0C5CE]/60';
      case 'info': return 'text-[#00d4ff]';
      case 'warn': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      case 'fatal': return 'text-red-600';
      default: return 'text-[#C0C5CE]';
    }
  }, []);

  // ✅ ENHANCED: Code analysis
  const runCodeAnalysis = useCallback(() => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setAnalyses(prev => prev.map(analysis => ({
        ...analysis,
        coverage: Math.min(100, analysis.coverage + Math.random() * 5),
        performance: Math.min(100, analysis.performance + Math.random() * 3),
        bugs: Math.max(0, analysis.bugs - Math.floor(Math.random() * 2)),
        lastAnalyzed: new Date()
      })));
      setIsAnalyzing(false);
    }, 3000);
  }, []);

  // ✅ ENHANCED: Filtered logs
  const filteredLogs = useMemo(() => {
    if (logFilter === 'all') return logs;
    return logs.filter(log => log.level === logFilter);
  }, [logs, logFilter]);

  // ✅ ENHANCED: Statistics
  const overallStats = useMemo(() => {
    const totalLines = analyses.reduce((sum, a) => sum + a.lines, 0);
    const totalBugs = analyses.reduce((sum, a) => sum + a.bugs, 0);
    const avgCoverage = analyses.reduce((sum, a) => sum + a.coverage, 0) / analyses.length;
    const avgPerformance = analyses.reduce((sum, a) => sum + a.performance, 0) / analyses.length;
    
    const healthyEndpoints = endpoints.filter(e => e.status === 'healthy').length;
    const activeDeployments = deployments.filter(d => d.status === 'active').length;
    
    return {
      totalLines,
      totalBugs,
      avgCoverage: Math.round(avgCoverage),
      avgPerformance: Math.round(avgPerformance),
      healthyEndpoints,
      activeDeployments
    };
  }, [analyses, endpoints, deployments]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#C0C5CE] font-mono">
      {/* ✅ ENHANCED: Developer grid background */}
      <div className="fixed inset-0 enterprise-grid opacity-8 pointer-events-none"></div>
      
      <RTLContainer className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        <div className={`space-y-8 ${isRTL ? 'text-right' : 'text-left'}`}>
          
          {/* ✅ ENHANCED: Developer tools header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-[#00d4ff] rounded-lg flex items-center justify-center">
                <Code className="w-6 h-6 text-black" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-[#C0C5CE]">
                  {language === 'ar' ? 'أدوات المطورين المتقدمة' : 'Enhanced Developer Tools'}
                </h1>
                <p className="text-[#C0C5CE]/70 mt-1">
                  {language === 'ar' 
                    ? 'مجموعة شاملة من أدوات التطوير والمراقبة والنشر'
                    : 'Comprehensive suite for development, monitoring, and deployment'
                  }
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                onClick={runCodeAnalysis}
                disabled={isAnalyzing}
                className="bg-gradient-to-r from-purple-500 to-[#00d4ff] text-black font-mono hover:from-[#00d4ff] hover:to-purple-500"
              >
                {isAnalyzing ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
                {language === 'ar' ? 'تحليل شامل' : 'Full Analysis'}
              </Button>
            </div>
          </div>

          {/* ✅ ENHANCED: Overview metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <FileCode className="w-5 h-5 text-purple-400" />
                <Badge className="bg-purple-400/20 text-purple-400 font-mono">Code</Badge>
              </div>
              <div className="neo-dashboard-widget-value text-purple-400">{overallStats.totalLines.toLocaleString()}</div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">Lines of Code</div>
              <div className="neo-dashboard-widget-change positive">
                <CheckCircle className="w-3 h-3" />
                {overallStats.totalBugs} bugs found
              </div>
            </Card>

            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <Shield className="w-5 h-5 text-[#00ff88]" />
                <span className="text-xs text-[#C0C5CE]/70 font-mono">Quality</span>
              </div>
              <div className="neo-dashboard-widget-value text-[#00ff88]">{overallStats.avgCoverage}%</div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">Test Coverage</div>
              <div className="neo-dashboard-widget-change positive">
                <TrendingUp className="w-3 h-3" />
                {overallStats.avgPerformance}% performance
              </div>
            </Card>

            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <Server className="w-5 h-5 text-[#00d4ff]" />
                <span className="text-xs text-[#C0C5CE]/70 font-mono">APIs</span>
              </div>
              <div className="neo-dashboard-widget-value">{overallStats.healthyEndpoints}/{endpoints.length}</div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">Healthy Endpoints</div>
              <div className="neo-dashboard-widget-change positive">
                <Activity className="w-3 h-3" />
                {Math.round(overallStats.healthyEndpoints / endpoints.length * 100)}% uptime
              </div>
            </Card>

            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <Rocket className="w-5 h-5 text-yellow-400" />
                <span className="text-xs text-[#C0C5CE]/70 font-mono">Deploy</span>
              </div>
              <div className="neo-dashboard-widget-value text-yellow-400">{overallStats.activeDeployments}</div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">Active Deployments</div>
              <div className="neo-dashboard-widget-change positive">
                <Globe className="w-3 h-3" />
                Multi-region
              </div>
            </Card>
          </div>

          {/* ✅ ENHANCED: Tool navigation */}
          <div className="flex space-x-1 bg-[#12151C] p-1 rounded-lg">
            {[
              { id: 'overview', label: language === 'ar' ? 'نظرة عامة' : 'Overview', icon: Eye },
              { id: 'code', label: language === 'ar' ? 'تحليل الكود' : 'Code Analysis', icon: FileCode },
              { id: 'api', label: language === 'ar' ? 'واجهات API' : 'API Monitor', icon: Database },
              { id: 'deploy', label: language === 'ar' ? 'النشر' : 'Deployments', icon: Rocket },
              { id: 'logs', label: language === 'ar' ? 'السجلات' : 'Logs', icon: Terminal },
              { id: 'monitor', label: language === 'ar' ? 'المراقبة' : 'Monitoring', icon: Activity }
            ].map(tool => (
              <button
                key={tool.id}
                onClick={() => setSelectedTool(tool.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md font-mono text-sm transition-all ${
                  selectedTool === tool.id
                    ? 'bg-[#00d4ff] text-black'
                    : 'text-[#C0C5CE] hover:bg-[#00d4ff]/10 hover:text-[#00d4ff]'
                }`}
              >
                <tool.icon className="w-4 h-4" />
                <span>{tool.label}</span>
              </button>
            ))}
          </div>

          {/* ✅ ENHANCED: Tool content based on selection */}
          {selectedTool === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Activity */}
              <Card className="neo-card">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#C0C5CE] font-mono mb-6">
                    {language === 'ar' ? 'النشاط الأخير' : 'Recent Activity'}
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-[#00ff88]/10 border border-[#00ff88]/30 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-[#00ff88]" />
                      <div className="flex-1">
                        <p className="text-sm font-mono text-[#00ff88]">Code Analysis Completed</p>
                        <p className="text-xs text-[#C0C5CE]/70 font-mono">
                          {overallStats.totalBugs} bugs found, {overallStats.avgCoverage}% coverage
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-[#00d4ff]/10 border border-[#00d4ff]/30 rounded-lg">
                      <Rocket className="w-4 h-4 text-[#00d4ff]" />
                      <div className="flex-1">
                        <p className="text-sm font-mono text-[#00d4ff]">Deployment Successful</p>
                        <p className="text-xs text-[#C0C5CE]/70 font-mono">
                          v2.4.7 deployed to production environments
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-yellow-400/10 border border-yellow-400/30 rounded-lg">
                      <AlertTriangle className="w-4 h-4 text-yellow-400" />
                      <div className="flex-1">
                        <p className="text-sm font-mono text-yellow-400">API Performance Warning</p>
                        <p className="text-xs text-[#C0C5CE]/70 font-mono">
                          /api/v1/pipeline/status showing increased latency
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="neo-card">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#C0C5CE] font-mono mb-6">
                    {language === 'ar' ? 'إجراءات سريعة' : 'Quick Actions'}
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button className="neo-button-primary h-16 flex-col" onClick={() => setSelectedTool('code')}>
                      <FileCode className="w-5 h-5 mb-1" />
                      <span className="text-xs">Code Analysis</span>
                    </Button>
                    
                    <Button className="neo-button-success h-16 flex-col" onClick={() => setSelectedTool('deploy')}>
                      <Rocket className="w-5 h-5 mb-1" />
                      <span className="text-xs">Deploy</span>
                    </Button>
                    
                    <Button className="neo-button-outline h-16 flex-col" onClick={() => setSelectedTool('api')}>
                      <Database className="w-5 h-5 mb-1" />
                      <span className="text-xs">API Monitor</span>
                    </Button>
                    
                    <Button className="neo-button-ghost h-16 flex-col" onClick={() => setSelectedTool('logs')}>
                      <Terminal className="w-5 h-5 mb-1" />
                      <span className="text-xs">View Logs</span>
                    </Button>
                  </div>
                  
                  <div className="mt-6 space-y-3">
                    <Button className="w-full neo-button-outline" onClick={() => onNavigate?.('smart-command-center')}>
                      <Bot className="w-4 h-4 mr-2" />
                      {language === 'ar' ? 'مركز القيادة الذكي' : 'Smart Command Center'}
                    </Button>
                    
                    <Button className="w-full neo-button-ghost" onClick={() => onNavigate?.('predictive-analytics')}>
                      <Brain className="w-4 h-4 mr-2" />
                      {language === 'ar' ? 'التحليلات التنبؤية' : 'Predictive Analytics'}
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* ✅ ENHANCED: Code analysis view */}
          {selectedTool === 'code' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-[#C0C5CE] font-mono">
                  {language === 'ar' ? 'تحليل جودة الكود' : 'Code Quality Analysis'}
                </h3>
                <Button
                  onClick={runCodeAnalysis}
                  disabled={isAnalyzing}
                  className="neo-button-primary"
                >
                  {isAnalyzing ? (
                    <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <Play className="w-4 h-4 mr-2" />
                  )}
                  {language === 'ar' ? 'تشغيل التحليل' : 'Run Analysis'}
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {analyses.map(analysis => (
                  <Card key={analysis.id} className="neo-interactive-card">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <FileCode className="w-6 h-6 text-[#00d4ff]" />
                        <Badge className={`font-mono text-xs ${
                          analysis.maintainability === 'A' ? 'bg-[#00ff88]/20 text-[#00ff88]' :
                          analysis.maintainability === 'B' ? 'bg-[#00d4ff]/20 text-[#00d4ff]' :
                          analysis.maintainability === 'C' ? 'bg-yellow-400/20 text-yellow-400' :
                          'bg-red-400/20 text-red-400'
                        }`}>
                          Grade {analysis.maintainability}
                        </Badge>
                      </div>
                      
                      <h4 className="font-bold text-[#C0C5CE] font-mono text-lg mb-2">
                        {analysis.filename}
                      </h4>
                      <p className="text-[#C0C5CE]/70 text-sm font-mono mb-4">
                        {analysis.language} • {analysis.lines.toLocaleString()} lines
                      </p>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-[#C0C5CE]/70 font-mono">Test Coverage</span>
                            <span className="text-[#00ff88] font-mono">{analysis.coverage}%</span>
                          </div>
                          <Progress value={analysis.coverage} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-[#C0C5CE]/70 font-mono">Performance</span>
                            <span className="text-[#00d4ff] font-mono">{analysis.performance}%</span>
                          </div>
                          <Progress value={analysis.performance} className="h-2" />
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 text-xs font-mono pt-3 border-t border-[#C0C5CE]/20">
                          <div className="text-center">
                            <div className="text-red-400">{analysis.bugs}</div>
                            <div className="text-[#C0C5CE]/70">Bugs</div>
                          </div>
                          <div className="text-center">
                            <div className="text-yellow-400">{analysis.vulnerabilities}</div>
                            <div className="text-[#C0C5CE]/70">Vulnerabilities</div>
                          </div>
                          <div className="text-center">
                            <div className="text-[#00ff88]">{analysis.complexity}</div>
                            <div className="text-[#C0C5CE]/70">Complexity</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 mt-4">
                        <Button size="sm" className="flex-1 neo-button-outline">
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                        <Button size="sm" className="flex-1 neo-button-ghost">
                          <Edit className="w-3 h-3 mr-1" />
                          Fix
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* ✅ ENHANCED: API monitoring view */}
          {selectedTool === 'api' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-[#C0C5CE] font-mono">
                {language === 'ar' ? 'مراقبة واجهات API' : 'API Endpoint Monitoring'}
              </h3>
              
              <div className="space-y-4">
                {endpoints.map(endpoint => (
                  <Card key={endpoint.id} className="neo-interactive-card">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <Badge className={`font-mono ${
                            endpoint.method === 'GET' ? 'bg-[#00ff88]/20 text-[#00ff88]' :
                            endpoint.method === 'POST' ? 'bg-[#00d4ff]/20 text-[#00d4ff]' :
                            endpoint.method === 'PUT' ? 'bg-yellow-400/20 text-yellow-400' :
                            'bg-red-400/20 text-red-400'
                          }`}>
                            {endpoint.method}
                          </Badge>
                          <code className="text-[#C0C5CE] font-mono">{endpoint.path}</code>
                        </div>
                        <Badge className={getStatusBadge(endpoint.status)}>
                          {endpoint.status.toUpperCase()}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm font-mono">
                        <div>
                          <div className="text-[#C0C5CE]/70">Response Time</div>
                          <div className={`${endpoint.responseTime > 200 ? 'text-yellow-400' : 'text-[#00ff88]'}`}>
                            {Math.round(endpoint.responseTime)}ms
                          </div>
                        </div>
                        <div>
                          <div className="text-[#C0C5CE]/70">Uptime</div>
                          <div className="text-[#00ff88]">{endpoint.uptime}%</div>
                        </div>
                        <div>
                          <div className="text-[#C0C5CE]/70">Requests</div>
                          <div className="text-[#C0C5CE]">{endpoint.requestCount.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-[#C0C5CE]/70">Error Rate</div>
                          <div className={`${endpoint.errorRate > 1 ? 'text-red-400' : 'text-[#00ff88]'}`}>
                            {endpoint.errorRate.toFixed(2)}%
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#C0C5CE]/20">
                        <div className="text-xs text-[#C0C5CE]/70 font-mono">
                          Last call: {endpoint.lastCall.toLocaleTimeString()}
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" className="neo-button-outline">
                            <Activity className="w-3 h-3 mr-1" />
                            Monitor
                          </Button>
                          <Button size="sm" className="neo-button-ghost">
                            <Settings className="w-3 h-3 mr-1" />
                            Configure
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

        </div>
      </RTLContainer>
    </div>
  );
}