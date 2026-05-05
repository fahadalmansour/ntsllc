import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { useLanguage } from '../../contexts/LanguageContext';
import { RTLContainer } from '../LanguageSwitcher';
import { 
  Command,
  Terminal,
  Cpu,
  MemoryStick,
  HardDrive,
  Network,
  Globe,
  Shield,
  Zap,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Users,
  Clock,
  Activity,
  Database,
  Cloud,
  Server,
  Wifi,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Layers,
  BarChart3,
  PieChart,
  LineChart,
  Target,
  Rocket,
  Brain,
  Bot,
  Smartphone,
  Monitor,
  Tablet
} from 'lucide-react';

// ✅ ENHANCED: Real system metrics with auto-scaling intelligence
interface SystemResource {
  id: string;
  name: string;
  type: 'cpu' | 'memory' | 'storage' | 'network' | 'database';
  current: number;
  maximum: number;
  optimal: number;
  threshold: number;
  autoScale: boolean;
  status: 'healthy' | 'warning' | 'critical' | 'scaling';
  region: string;
  cost: number;
}

interface AutoScalingRule {
  id: string;
  resource: string;
  trigger: 'cpu' | 'memory' | 'requests' | 'latency';
  threshold: number;
  action: 'scale_up' | 'scale_down' | 'migrate' | 'optimize';
  cooldown: number;
  enabled: boolean;
}

interface GlobalMetrics {
  totalRequests: number;
  averageLatency: number;
  errorRate: number;
  uptime: number;
  activeUsers: number;
  revenue: number;
  costOptimization: number;
  carbonFootprint: number;
}

// ✅ ENHANCED: Mock intelligent system data
const systemResources: SystemResource[] = [
  {
    id: 'cpu-us-east',
    name: 'US East CPU Cluster',
    type: 'cpu',
    current: 67,
    maximum: 100,
    optimal: 70,
    threshold: 85,
    autoScale: true,
    status: 'healthy',
    region: 'US-East-1',
    cost: 2847.50
  },
  {
    id: 'cpu-gcc-central',
    name: 'GCC Central CPU Cluster',
    type: 'cpu',
    current: 89,
    maximum: 100,
    optimal: 70,
    threshold: 85,
    autoScale: true,
    status: 'scaling',
    region: 'GCC-Central',
    cost: 1923.75
  },
  {
    id: 'memory-global',
    name: 'Global Memory Pool',
    type: 'memory',
    current: 45,
    maximum: 100,
    optimal: 60,
    threshold: 80,
    autoScale: true,
    status: 'healthy',
    region: 'Global',
    cost: 3456.20
  },
  {
    id: 'database-primary',
    name: 'Primary Database Cluster',
    type: 'database',
    current: 72,
    maximum: 100,
    optimal: 75,
    threshold: 90,
    autoScale: false,
    status: 'warning',
    region: 'Multi-Region',
    cost: 5698.40
  },
  {
    id: 'network-cdn',
    name: 'Global CDN Network',
    type: 'network',
    current: 34,
    maximum: 100,
    optimal: 50,
    threshold: 75,
    autoScale: true,
    status: 'healthy',
    region: 'Global',
    cost: 1876.30
  }
];

const autoScalingRules: AutoScalingRule[] = [
  {
    id: 'rule-cpu-scale-up',
    resource: 'CPU',
    trigger: 'cpu',
    threshold: 85,
    action: 'scale_up',
    cooldown: 300,
    enabled: true
  },
  {
    id: 'rule-memory-optimize',
    resource: 'Memory',
    trigger: 'memory',
    threshold: 80,
    action: 'optimize',
    cooldown: 180,
    enabled: true
  },
  {
    id: 'rule-latency-migrate',
    resource: 'Network',
    trigger: 'latency',
    threshold: 200,
    action: 'migrate',
    cooldown: 600,
    enabled: false
  }
];

export function SmartCommandCenter({ onNavigate }: { onNavigate?: (section: string) => void }) {
  const { isRTL, language } = useLanguage();
  const [resources, setResources] = useState<SystemResource[]>(systemResources);
  const [scalingRules, setScalingRules] = useState<AutoScalingRule[]>(autoScalingRules);
  const [globalMetrics, setGlobalMetrics] = useState<GlobalMetrics>({
    totalRequests: 2847593,
    averageLatency: 89,
    errorRate: 0.12,
    uptime: 99.97,
    activeUsers: 8247,
    revenue: 284750,
    costOptimization: 23.4,
    carbonFootprint: 89.2
  });
  const [selectedView, setSelectedView] = useState<'overview' | 'resources' | 'scaling' | 'analytics' | 'security'>('overview');
  const [autoOptimize, setAutoOptimize] = useState(true);
  const [commandHistory, setCommandHistory] = useState<string[]>([
    '$ neo-scale --analyze-load --region=all',
    '$ neo-optimize --memory --threshold=80',
    '$ neo-deploy --service=store-setup --region=gcc',
    '$ neo-monitor --alerts=critical --notify=true'
  ]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);

  // ✅ ENHANCED: Real-time system simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setResources(prev => prev.map(resource => {
        let newCurrent = resource.current;
        let newStatus = resource.status;

        // Simulate resource usage changes
        if (resource.autoScale && resource.status === 'scaling') {
          newCurrent = Math.max(resource.optimal - 10, newCurrent - 5);
          if (newCurrent <= resource.optimal) {
            newStatus = 'healthy';
          }
        } else {
          const change = (Math.random() - 0.5) * 8;
          newCurrent = Math.max(0, Math.min(100, newCurrent + change));
          
          if (newCurrent >= resource.threshold) {
            newStatus = 'critical';
            if (resource.autoScale) {
              newStatus = 'scaling';
            }
          } else if (newCurrent >= resource.optimal + 10) {
            newStatus = 'warning';
          } else {
            newStatus = 'healthy';
          }
        }

        return {
          ...resource,
          current: newCurrent,
          status: newStatus
        };
      }));

      // Update global metrics
      setGlobalMetrics(prev => ({
        ...prev,
        totalRequests: prev.totalRequests + Math.floor(Math.random() * 100 + 50),
        averageLatency: Math.max(50, Math.min(200, prev.averageLatency + (Math.random() - 0.5) * 20)),
        activeUsers: Math.max(5000, Math.min(15000, prev.activeUsers + Math.floor((Math.random() - 0.5) * 200)))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // ✅ ENHANCED: Auto-optimization engine
  useEffect(() => {
    if (!autoOptimize) return;

    const optimizationInterval = setInterval(() => {
      resources.forEach(resource => {
        if (resource.status === 'critical' && resource.autoScale) {
          executeCommand(`auto-scale ${resource.id} --action=scale_up`);
        } else if (resource.current < resource.optimal - 20 && resource.autoScale) {
          executeCommand(`auto-optimize ${resource.id} --action=scale_down`);
        }
      });
    }, 10000);

    return () => clearInterval(optimizationInterval);
  }, [autoOptimize, resources]);

  // ✅ ENHANCED: Command execution system
  const executeCommand = useCallback((command: string) => {
    setIsExecuting(true);
    setCommandHistory(prev => [`$ ${command}`, ...prev.slice(0, 9)]);
    
    setTimeout(() => {
      setIsExecuting(false);
      
      // Simulate command effects
      if (command.includes('auto-scale')) {
        const resourceId = command.split(' ')[1];
        setResources(prev => prev.map(r => 
          r.id === resourceId ? { ...r, status: 'scaling' } : r
        ));
      }
    }, 2000);
  }, []);

  // ✅ ENHANCED: Resource status colors
  const getStatusColor = useCallback((status: SystemResource['status']) => {
    switch (status) {
      case 'healthy': return 'text-[#00ff88]';
      case 'warning': return 'text-yellow-400';
      case 'critical': return 'text-red-400';
      case 'scaling': return 'text-[#00d4ff]';
      default: return 'text-[#C0C5CE]';
    }
  }, []);

  const getStatusBadge = useCallback((status: SystemResource['status']) => {
    const variants = {
      healthy: 'bg-[#00ff88]/20 text-[#00ff88]',
      warning: 'bg-yellow-400/20 text-yellow-400',
      critical: 'bg-red-400/20 text-red-400',
      scaling: 'bg-[#00d4ff]/20 text-[#00d4ff]'
    };
    return variants[status];
  }, []);

  // ✅ ENHANCED: Resource type icons
  const getResourceIcon = useCallback((type: SystemResource['type']) => {
    switch (type) {
      case 'cpu': return Cpu;
      case 'memory': return MemoryStick;
      case 'storage': return HardDrive;
      case 'network': return Network;
      case 'database': return Database;
      default: return Server;
    }
  }, []);

  // ✅ ENHANCED: Cost calculation
  const totalMonthlyCost = useMemo(() => {
    return resources.reduce((total, resource) => total + resource.cost, 0);
  }, [resources]);

  const costOptimizationSavings = useMemo(() => {
    return totalMonthlyCost * (globalMetrics.costOptimization / 100);
  }, [totalMonthlyCost, globalMetrics.costOptimization]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#C0C5CE] font-mono">
      {/* ✅ ENHANCED: Command center grid background */}
      <div className="fixed inset-0 enterprise-grid opacity-8 pointer-events-none"></div>
      
      <RTLContainer className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        <div className={`space-y-8 ${isRTL ? 'text-right' : 'text-left'}`}>
          
          {/* ✅ ENHANCED: Command center header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#00d4ff] to-[#00ff88] rounded-lg flex items-center justify-center">
                <Command className="w-6 h-6 text-black" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-[#C0C5CE]">
                  {language === 'ar' ? 'مركز القيادة الذكي' : 'Smart Command Center'}
                </h1>
                <p className="text-[#C0C5CE]/70 mt-1">
                  {language === 'ar' 
                    ? 'إدارة شاملة وتحسين تلقائي للموارد العالمية'
                    : 'Comprehensive management with auto-optimization for global resources'
                  }
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${autoOptimize ? 'bg-[#00ff88] animate-pulse' : 'bg-[#C0C5CE]/50'}`}></div>
                <span className="text-sm text-[#C0C5CE]/70 font-mono">
                  {language === 'ar' ? 'التحسين التلقائي' : 'Auto-Optimize'}: {autoOptimize ? 'ON' : 'OFF'}
                </span>
              </div>
              
              <Button
                onClick={() => setAutoOptimize(!autoOptimize)}
                className={`${autoOptimize ? 'bg-[#00ff88]/20 text-[#00ff88]' : 'bg-[#C0C5CE]/20 text-[#C0C5CE]'} border-0 font-mono`}
              >
                {autoOptimize ? <Brain className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* ✅ ENHANCED: Global status overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <Globe className="w-5 h-5 text-[#00d4ff]" />
                <Badge className="bg-[#00ff88]/20 text-[#00ff88] font-mono">Global</Badge>
              </div>
              <div className="neo-dashboard-widget-value">{globalMetrics.uptime}%</div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">System Uptime</div>
              <div className="neo-dashboard-widget-change positive">
                <CheckCircle className="w-3 h-3" />
                {globalMetrics.totalRequests.toLocaleString()} requests
              </div>
            </Card>

            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <Zap className="w-5 h-5 text-[#00ff88]" />
                <span className="text-xs text-[#C0C5CE]/70 font-mono">Performance</span>
              </div>
              <div className="neo-dashboard-widget-value text-[#00ff88]">{globalMetrics.averageLatency}ms</div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">Average Latency</div>
              <div className="neo-dashboard-widget-change positive">
                <TrendingDown className="w-3 h-3" />
                -12ms from yesterday
              </div>
            </Card>

            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <Users className="w-5 h-5 text-yellow-400" />
                <span className="text-xs text-[#C0C5CE]/70 font-mono">Active</span>
              </div>
              <div className="neo-dashboard-widget-value text-yellow-400">{globalMetrics.activeUsers.toLocaleString()}</div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">Active Users</div>
              <div className="neo-dashboard-widget-change positive">
                <TrendingUp className="w-3 h-3" />
                +5.7% growth
              </div>
            </Card>

            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <Target className="w-5 h-5 text-[#C0C5CE]" />
                <span className="text-xs text-[#C0C5CE]/70 font-mono">Optimization</span>
              </div>
              <div className="neo-dashboard-widget-value">${costOptimizationSavings.toLocaleString()}</div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">Monthly Savings</div>
              <div className="neo-dashboard-widget-change positive">
                <TrendingUp className="w-3 h-3" />
                {globalMetrics.costOptimization}% optimized
              </div>
            </Card>
          </div>

          {/* ✅ ENHANCED: Navigation tabs */}
          <div className="flex space-x-1 bg-[#12151C] p-1 rounded-lg">
            {[
              { id: 'overview', label: language === 'ar' ? 'لوحة المراقبة' : 'Overview', icon: Eye },
              { id: 'resources', label: language === 'ar' ? 'الموارد' : 'Resources', icon: Server },
              { id: 'scaling', label: language === 'ar' ? 'التوسع التلقائي' : 'Auto-Scaling', icon: Rocket },
              { id: 'analytics', label: language === 'ar' ? 'التحليلات' : 'Analytics', icon: BarChart3 },
              { id: 'security', label: language === 'ar' ? 'الأمان' : 'Security', icon: Shield }
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

          {/* ✅ ENHANCED: Command terminal */}
          <Card className="neo-card">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[#C0C5CE] font-mono">
                  {language === 'ar' ? 'طرفية الأوامر' : 'Command Terminal'}
                </h3>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${isExecuting ? 'bg-[#00d4ff] animate-pulse' : 'bg-[#00ff88]'}`}></div>
                  <span className="text-xs text-[#C0C5CE]/70 font-mono">
                    {isExecuting ? 'Executing...' : 'Ready'}
                  </span>
                </div>
              </div>
              
              <div className="bg-[#0B0D12] border border-[#00d4ff]/30 rounded-lg p-4 mb-4">
                <div className="h-32 overflow-y-auto space-y-1">
                  {commandHistory.map((cmd, index) => (
                    <div key={index} className="text-sm font-mono">
                      <span className="text-[#00ff88]">neo@command-center:~</span>
                      <span className="text-[#00d4ff] ml-2">{cmd}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-[#00ff88] font-mono">neo@command-center:~$</span>
                <input
                  type="text"
                  value={currentCommand}
                  onChange={(e) => setCurrentCommand(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && currentCommand.trim()) {
                      executeCommand(currentCommand);
                      setCurrentCommand('');
                    }
                  }}
                  className="flex-1 bg-transparent text-[#00d4ff] font-mono border-none outline-none"
                  placeholder="Enter command..."
                  disabled={isExecuting}
                />
                <Button
                  onClick={() => {
                    if (currentCommand.trim()) {
                      executeCommand(currentCommand);
                      setCurrentCommand('');
                    }
                  }}
                  disabled={isExecuting || !currentCommand.trim()}
                  className="neo-button-primary"
                >
                  <Terminal className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {[
                  'neo-status --all',
                  'neo-scale --auto',
                  'neo-optimize --resources',
                  'neo-deploy --latest'
                ].map(cmd => (
                  <Button
                    key={cmd}
                    onClick={() => setCurrentCommand(cmd)}
                    className="neo-button-ghost text-xs"
                  >
                    {cmd}
                  </Button>
                ))}
              </div>
            </div>
          </Card>

          {/* ✅ ENHANCED: Main content based on selected view */}
          {selectedView === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Resource Status */}
              <div className="lg:col-span-2">
                <Card className="neo-card">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-[#C0C5CE] font-mono mb-6">
                      {language === 'ar' ? 'حالة الموارد المباشرة' : 'Live Resource Status'}
                    </h3>
                    
                    <div className="space-y-4">
                      {resources.map(resource => {
                        const Icon = getResourceIcon(resource.type);
                        return (
                          <div key={resource.id} className="border border-[#00d4ff]/20 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-3">
                                <Icon className="w-5 h-5 text-[#00d4ff]" />
                                <div>
                                  <h4 className="font-mono text-[#C0C5CE] font-semibold">{resource.name}</h4>
                                  <p className="text-xs text-[#C0C5CE]/70 font-mono">{resource.region}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge className={getStatusBadge(resource.status)}>
                                  {resource.status.toUpperCase()}
                                </Badge>
                                {resource.autoScale && (
                                  <Badge className="bg-[#00ff88]/10 text-[#00ff88] font-mono text-xs">
                                    AUTO
                                  </Badge>
                                )}
                              </div>
                            </div>
                            
                            <div className="mb-3">
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-[#C0C5CE]/70 font-mono">Usage</span>
                                <span className={`font-mono ${getStatusColor(resource.status)}`}>
                                  {Math.round(resource.current)}%
                                </span>
                              </div>
                              <Progress value={resource.current} className="h-2" />
                            </div>
                            
                            <div className="flex items-center justify-between text-xs text-[#C0C5CE]/70 font-mono">
                              <span>Optimal: {resource.optimal}%</span>
                              <span>Threshold: {resource.threshold}%</span>
                              <span>Cost: ${resource.cost.toLocaleString()}/mo</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Card>
              </div>

              {/* Quick Actions & Alerts */}
              <div className="space-y-6">
                <Card className="neo-card">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-[#C0C5CE] font-mono mb-4">
                      {language === 'ar' ? 'التنبيهات النشطة' : 'Active Alerts'}
                    </h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3 p-3 bg-red-400/10 border border-red-400/30 rounded-lg">
                        <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5" />
                        <div>
                          <p className="text-sm font-mono text-red-400">High CPU Usage</p>
                          <p className="text-xs text-[#C0C5CE]/70 font-mono">GCC Central at 89%</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3 p-3 bg-yellow-400/10 border border-yellow-400/30 rounded-lg">
                        <Clock className="w-4 h-4 text-yellow-400 mt-0.5" />
                        <div>
                          <p className="text-sm font-mono text-yellow-400">Database Warning</p>
                          <p className="text-xs text-[#C0C5CE]/70 font-mono">Query latency increased</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3 p-3 bg-[#00ff88]/10 border border-[#00ff88]/30 rounded-lg">
                        <CheckCircle className="w-4 h-4 text-[#00ff88] mt-0.5" />
                        <div>
                          <p className="text-sm font-mono text-[#00ff88]">Auto-Scale Success</p>
                          <p className="text-xs text-[#C0C5CE]/70 font-mono">Memory optimized +12%</p>
                        </div>
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
                      <Button className="w-full neo-button-primary" onClick={() => executeCommand('neo-status --all')}>
                        <Activity className="w-4 h-4 mr-2" />
                        {language === 'ar' ? 'فحص شامل' : 'Full System Scan'}
                      </Button>
                      
                      <Button className="w-full neo-button-success" onClick={() => executeCommand('neo-optimize --auto')}>
                        <Rocket className="w-4 h-4 mr-2" />
                        {language === 'ar' ? 'تحسين تلقائي' : 'Auto Optimize'}
                      </Button>
                      
                      <Button className="w-full neo-button-outline" onClick={() => onNavigate?.('analytics')}>
                        <BarChart3 className="w-4 h-4 mr-2" />
                        {language === 'ar' ? 'تحليلات متقدمة' : 'Advanced Analytics'}
                      </Button>
                      
                      <Button className="w-full neo-button-ghost" onClick={() => onNavigate?.('settings')}>
                        <Settings className="w-4 h-4 mr-2" />
                        {language === 'ar' ? 'إعدادات النظام' : 'System Settings'}
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* ✅ ENHANCED: Resource management view */}
          {selectedView === 'resources' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {resources.map(resource => {
                  const Icon = getResourceIcon(resource.type);
                  return (
                    <Card key={resource.id} className="neo-interactive-card">
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <Icon className="w-8 h-8 text-[#00d4ff]" />
                          <Badge className={getStatusBadge(resource.status)}>
                            {resource.status.toUpperCase()}
                          </Badge>
                        </div>
                        
                        <h3 className="text-lg font-bold text-[#C0C5CE] font-mono mb-2">
                          {resource.name}
                        </h3>
                        <p className="text-sm text-[#C0C5CE]/70 font-mono mb-4">{resource.region}</p>
                        
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-[#C0C5CE]/70 font-mono">Current Usage</span>
                              <span className={`font-mono ${getStatusColor(resource.status)}`}>
                                {Math.round(resource.current)}%
                              </span>
                            </div>
                            <Progress value={resource.current} className="h-3" />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                            <div>
                              <span className="text-[#C0C5CE]/70">Optimal:</span>
                              <span className="text-[#00ff88] ml-1">{resource.optimal}%</span>
                            </div>
                            <div>
                              <span className="text-[#C0C5CE]/70">Threshold:</span>
                              <span className="text-yellow-400 ml-1">{resource.threshold}%</span>
                            </div>
                          </div>
                          
                          <div className="pt-3 border-t border-[#C0C5CE]/20">
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-[#C0C5CE]/70 font-mono">Monthly Cost</span>
                              <span className="text-sm font-mono text-[#C0C5CE]">${resource.cost.toLocaleString()}</span>
                            </div>
                            
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center space-x-1">
                                {resource.autoScale ? (
                                  <Badge className="bg-[#00ff88]/20 text-[#00ff88] text-xs font-mono">AUTO</Badge>
                                ) : (
                                  <Badge className="bg-[#C0C5CE]/20 text-[#C0C5CE] text-xs font-mono">MANUAL</Badge>
                                )}
                              </div>
                              
                              <div className="flex space-x-1">
                                <Button size="sm" className="neo-button-ghost">
                                  <Settings className="w-3 h-3" />
                                </Button>
                                <Button size="sm" className="neo-button-outline">
                                  <Eye className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </RTLContainer>
    </div>
  );
}