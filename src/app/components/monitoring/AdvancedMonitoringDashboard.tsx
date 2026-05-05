import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { useLanguage } from '../../contexts/LanguageContext';
import { RTLContainer } from '../LanguageSwitcher';
import { 
  Monitor, 
  Activity,
  Server,
  Database,
  Globe,
  Cpu,
  HardDrive,
  Wifi,
  Zap,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Bell,
  Settings,
  BarChart3,
  PieChart,
  LineChart,
  RefreshCw,
  Download,
  Upload,
  Shield,
  Users,
  Eye,
  Terminal,
  Layers,
  Network,
  Cloud,
  Lock
} from 'lucide-react';

interface SystemMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: 'healthy' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  change: number;
  threshold: {
    warning: number;
    critical: number;
  };
  history: number[];
}

interface ServiceStatus {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'degraded' | 'maintenance';
  uptime: number;
  responseTime: number;
  requests: number;
  errors: number;
  lastCheck: Date;
  dependencies: string[];
}

interface Alert {
  id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  type: 'performance' | 'security' | 'availability' | 'capacity';
  message: string;
  service: string;
  timestamp: Date;
  status: 'active' | 'acknowledged' | 'resolved';
  details?: string;
}

interface NetworkMetric {
  id: string;
  endpoint: string;
  latency: number;
  bandwidth: number;
  packetLoss: number;
  status: 'good' | 'fair' | 'poor';
  location: string;
}

export default function AdvancedMonitoringDashboard({ onNavigate }: { onNavigate?: (section: string) => void }) {
  const { isRTL, language } = useLanguage();
  
  const [systemMetrics, setSystemMetrics] = useState<SystemMetric[]>([
    {
      id: 'cpu',
      name: 'CPU Usage',
      value: 23.5,
      unit: '%',
      status: 'healthy',
      trend: 'stable',
      change: 0.2,
      threshold: { warning: 70, critical: 90 },
      history: [20, 22, 25, 23, 24, 23.5]
    },
    {
      id: 'memory',
      name: 'Memory Usage',
      value: 67.8,
      unit: '%',
      status: 'warning',
      trend: 'up',
      change: 5.3,
      threshold: { warning: 80, critical: 95 },
      history: [60, 62, 65, 67, 67.8]
    },
    {
      id: 'disk',
      name: 'Disk Usage',
      value: 45.2,
      unit: '%',
      status: 'healthy',
      trend: 'up',
      change: 1.8,
      threshold: { warning: 80, critical: 95 },
      history: [40, 42, 43, 44, 45.2]
    },
    {
      id: 'network',
      name: 'Network I/O',
      value: 234.7,
      unit: 'MB/s',
      status: 'healthy',
      trend: 'down',
      change: -12.4,
      threshold: { warning: 500, critical: 800 },
      history: [250, 245, 240, 236, 234.7]
    }
  ]);

  const [services, setServices] = useState<ServiceStatus[]>([
    {
      id: 'web-app',
      name: 'Web Application',
      status: 'online',
      uptime: 99.97,
      responseTime: 342,
      requests: 47892,
      errors: 23,
      lastCheck: new Date(),
      dependencies: ['database', 'cache', 'storage']
    },
    {
      id: 'api-gateway',
      name: 'API Gateway',
      status: 'online',
      uptime: 99.94,
      responseTime: 156,
      requests: 124573,
      errors: 47,
      lastCheck: new Date(),
      dependencies: ['authentication', 'rate-limiter']
    },
    {
      id: 'database',
      name: 'Database Cluster',
      status: 'online',
      uptime: 99.99,
      responseTime: 89,
      requests: 89234,
      errors: 2,
      lastCheck: new Date(),
      dependencies: ['storage', 'backup']
    },
    {
      id: 'cache',
      name: 'Redis Cache',
      status: 'degraded',
      uptime: 98.73,
      responseTime: 234,
      requests: 234567,
      errors: 156,
      lastCheck: new Date(),
      dependencies: ['memory']
    },
    {
      id: 'storage',
      name: 'Object Storage',
      status: 'online',
      uptime: 99.98,
      responseTime: 445,
      requests: 34567,
      errors: 8,
      lastCheck: new Date(),
      dependencies: []
    }
  ]);

  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: 'alert-001',
      severity: 'medium',
      type: 'performance',
      message: 'Memory usage approaching warning threshold',
      service: 'Web Application',
      timestamp: new Date(Date.now() - 300000),
      status: 'active',
      details: 'Memory usage has increased to 67.8% and trending upward'
    },
    {
      id: 'alert-002',
      severity: 'high',
      type: 'availability',
      message: 'Redis Cache experiencing degraded performance',
      service: 'Redis Cache',
      timestamp: new Date(Date.now() - 600000),
      status: 'acknowledged',
      details: 'Response time increased by 300% in the last 10 minutes'
    },
    {
      id: 'alert-003',
      severity: 'low',
      type: 'capacity',
      message: 'Disk usage growing steadily',
      service: 'Object Storage',
      timestamp: new Date(Date.now() - 1200000),
      status: 'resolved',
      details: 'Disk usage increased by 1.8% over the past hour'
    }
  ]);

  const [networkMetrics, setNetworkMetrics] = useState<NetworkMetric[]>([
    {
      id: 'us-east',
      endpoint: 'us-east-1.api.neotech.com',
      latency: 23,
      bandwidth: 847.3,
      packetLoss: 0.02,
      status: 'good',
      location: 'Virginia, USA'
    },
    {
      id: 'gcc-central',
      endpoint: 'gcc-central.api.neotech.com',
      latency: 45,
      bandwidth: 623.7,
      packetLoss: 0.08,
      status: 'good',
      location: 'Dubai, UAE'
    },
    {
      id: 'eu-west',
      endpoint: 'eu-west-1.api.neotech.com',
      latency: 67,
      bandwidth: 534.2,
      packetLoss: 0.15,
      status: 'fair',
      location: 'Frankfurt, Germany'
    }
  ]);

  const [refreshInterval, setRefreshInterval] = useState(30);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'1h' | '6h' | '24h' | '7d'>('1h');

  // Simulate real-time updates
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      // Update system metrics
      setSystemMetrics(prev => prev.map(metric => {
        const change = (Math.random() - 0.5) * 5;
        const newValue = Math.max(0, Math.min(100, metric.value + change));
        
        let status: 'healthy' | 'warning' | 'critical' = 'healthy';
        if (newValue >= metric.threshold.critical) status = 'critical';
        else if (newValue >= metric.threshold.warning) status = 'warning';

        return {
          ...metric,
          value: newValue,
          status,
          trend: change > 1 ? 'up' : change < -1 ? 'down' : 'stable',
          change: change,
          history: [...metric.history.slice(-4), newValue]
        };
      }));

      // Update services
      setServices(prev => prev.map(service => ({
        ...service,
        responseTime: Math.max(50, service.responseTime + (Math.random() - 0.5) * 20),
        requests: service.requests + Math.floor(Math.random() * 100),
        errors: Math.max(0, service.errors + (Math.random() > 0.9 ? 1 : 0)),
        lastCheck: new Date()
      })));

      // Update network metrics
      setNetworkMetrics(prev => prev.map(metric => ({
        ...metric,
        latency: Math.max(10, metric.latency + (Math.random() - 0.5) * 10),
        bandwidth: Math.max(100, metric.bandwidth + (Math.random() - 0.5) * 50),
        packetLoss: Math.max(0, Math.min(1, metric.packetLoss + (Math.random() - 0.5) * 0.02))
      })));
    }, refreshInterval * 1000);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': case 'online': case 'good': return 'bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]/30';
      case 'warning': case 'degraded': case 'fair': return 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30';
      case 'critical': case 'offline': case 'poor': return 'bg-red-400/20 text-red-400 border-red-400/30';
      case 'maintenance': return 'bg-[#00d4ff]/20 text-[#00d4ff] border-[#00d4ff]/30';
      default: return 'bg-[#C0C5CE]/20 text-[#C0C5CE] border-[#C0C5CE]/30';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-[#C0C5CE]/20 text-[#C0C5CE] border-[#C0C5CE]/30';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return TrendingUp;
      case 'down': return TrendingDown;
      default: return Activity;
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatBytes = (bytes: number) => {
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
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
              <Monitor className="w-8 h-8 text-[#00d4ff]" />
              <div>
                <h1 className="text-3xl font-bold text-[#C0C5CE]">
                  {language === 'ar' ? 'لوحة المراقبة المتقدمة' : 'Advanced Monitoring Dashboard'}
                </h1>
                <p className="text-[#C0C5CE]/80 text-lg">
                  {language === 'ar' 
                    ? 'مراقبة شاملة للأنظمة والخدمات في الوقت الفعلي'
                    : 'Comprehensive real-time system and service monitoring'
                  }
                </p>
              </div>
            </div>
            
            <div className="neo-flex-start neo-space-sm">
              <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse"></div>
              <span className="text-[#00ff88] text-sm font-mono">
                {language === 'ar' ? 'مراقبة مباشرة' : 'Live Monitoring'}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="neo-flex-between mb-6">
            <div className="neo-flex-start neo-space-sm">
              {(['1h', '6h', '24h', '7d'] as const).map((period) => (
                <Button
                  key={period}
                  className={`${
                    selectedTimeframe === period 
                      ? 'neo-button-primary' 
                      : 'neo-button-ghost'
                  } text-sm`}
                  onClick={() => setSelectedTimeframe(period)}
                >
                  {period === '1h' ? (language === 'ar' ? 'ساعة' : '1 Hour') :
                   period === '6h' ? (language === 'ar' ? '6 ساعات' : '6 Hours') :
                   period === '24h' ? (language === 'ar' ? '24 ساعة' : '24 Hours') :
                   (language === 'ar' ? '7 أيام' : '7 Days')}
                </Button>
              ))}
            </div>

            <div className="neo-flex-start neo-space-sm">
              <label className="neo-form-label text-sm">
                {language === 'ar' ? 'التحديث التلقائي:' : 'Auto-refresh:'}
              </label>
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                className="w-4 h-4 accent-[#00d4ff]"
              />
              
              <select
                value={refreshInterval}
                onChange={(e) => setRefreshInterval(parseInt(e.target.value))}
                className="neo-form-select text-sm"
              >
                <option value={10}>10s</option>
                <option value={30}>30s</option>
                <option value={60}>1m</option>
                <option value={300}>5m</option>
              </select>
            </div>
          </div>

          {/* System Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {systemMetrics.map((metric) => {
              const TrendIcon = getTrendIcon(metric.trend);
              return (
                <Card key={metric.id} className="neo-dashboard-widget">
                  <div className="neo-dashboard-widget-header">
                    <Cpu className="w-5 h-5 text-[#00d4ff]" />
                    <Badge className={getStatusColor(metric.status)}>
                      {metric.status}
                    </Badge>
                  </div>
                  <div className="neo-dashboard-widget-value">
                    {metric.value.toFixed(1)}{metric.unit}
                  </div>
                  <div className="text-[#C0C5CE]/70 font-mono text-sm mb-2">
                    {metric.name}
                  </div>
                  <div className="neo-flex-between items-center">
                    <div className={`neo-flex-start neo-space-xs text-xs ${
                      metric.change > 0 ? 'text-red-400' : 
                      metric.change < 0 ? 'text-[#00ff88]' : 'text-[#C0C5CE]'
                    }`}>
                      <TrendIcon className="w-3 h-3" />
                      <span>{Math.abs(metric.change).toFixed(1)}%</span>
                    </div>
                    <Progress value={metric.value} className="h-1 flex-1 ml-3" />
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Active Alerts */}
          <Card className="neo-card mb-8">
            <div className="p-6">
              <div className="neo-flex-between mb-6">
                <h3 className="text-[#00ff88] font-mono text-xl">
                  {language === 'ar' ? 'التنبيهات النشطة' : 'Active Alerts'}
                </h3>
                <div className="neo-flex-start neo-space-sm">
                  <Badge className="bg-red-400/20 text-red-400 border-red-400/30">
                    {alerts.filter(a => a.status === 'active').length} Active
                  </Badge>
                  <Bell className="w-4 h-4 text-[#00d4ff]" />
                </div>
              </div>

              <div className="space-y-4">
                {alerts.slice(0, 5).map((alert) => (
                  <div key={alert.id} className="neo-interactive-card p-4">
                    <div className="neo-flex-between mb-3">
                      <div className="neo-flex-start neo-space-sm">
                        <AlertTriangle className="w-5 h-5 text-orange-400" />
                        <div>
                          <div className="font-semibold text-[#C0C5CE]">
                            {alert.message}
                          </div>
                          <div className="text-xs text-[#C0C5CE]/70">
                            {alert.service} • {alert.timestamp.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      
                      <div className="neo-flex-start neo-space-xs">
                        <Badge className={getSeverityColor(alert.severity)}>
                          {alert.severity}
                        </Badge>
                        <Badge className={
                          alert.status === 'active' ? 'bg-red-400/20 text-red-400 border-red-400/30' :
                          alert.status === 'acknowledged' ? 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30' :
                          'bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]/30'
                        }>
                          {alert.status}
                        </Badge>
                      </div>
                    </div>

                    {alert.details && (
                      <div className="text-xs text-[#C0C5CE]/80 mb-3 pl-7">
                        {alert.details}
                      </div>
                    )}

                    <div className="neo-flex-end neo-space-sm">
                      {alert.status === 'active' && (
                        <Button className="neo-button-outline text-xs">
                          Acknowledge
                        </Button>
                      )}
                      <Button className="neo-button-ghost text-xs">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Services Status & Network Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Services Status */}
            <Card className="neo-card">
              <div className="p-6">
                <div className="neo-flex-between mb-6">
                  <h3 className="text-[#00ff88] font-mono text-xl">
                    {language === 'ar' ? 'حالة الخدمات' : 'Services Status'}
                  </h3>
                  <div className="neo-flex-start neo-space-xs">
                    <Server className="w-4 h-4 text-[#00d4ff]" />
                    <span className="text-[#00d4ff] text-sm">
                      {services.filter(s => s.status === 'online').length}/{services.length}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {services.map((service) => (
                    <div key={service.id} className="neo-interactive-card p-4">
                      <div className="neo-flex-between mb-3">
                        <div className="neo-flex-start neo-space-sm">
                          <div className={`w-3 h-3 rounded-full ${
                            service.status === 'online' ? 'bg-[#00ff88]' :
                            service.status === 'degraded' ? 'bg-yellow-400' :
                            service.status === 'offline' ? 'bg-red-400' :
                            'bg-[#00d4ff]'
                          }`}></div>
                          <div>
                            <div className="font-semibold text-[#C0C5CE]">
                              {service.name}
                            </div>
                            <div className="text-xs text-[#C0C5CE]/70">
                              Uptime: {service.uptime}% • {formatNumber(service.requests)} requests
                            </div>
                          </div>
                        </div>
                        
                        <Badge className={getStatusColor(service.status)}>
                          {service.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-xs">
                        <div>
                          <span className="text-[#C0C5CE]/70">Response:</span>
                          <div className={`font-semibold ${
                            service.responseTime < 200 ? 'text-[#00ff88]' :
                            service.responseTime < 500 ? 'text-yellow-400' :
                            'text-red-400'
                          }`}>
                            {service.responseTime}ms
                          </div>
                        </div>
                        <div>
                          <span className="text-[#C0C5CE]/70">Errors:</span>
                          <div className={`font-semibold ${
                            service.errors === 0 ? 'text-[#00ff88]' :
                            service.errors < 10 ? 'text-yellow-400' :
                            'text-red-400'
                          }`}>
                            {service.errors}
                          </div>
                        </div>
                        <div>
                          <span className="text-[#C0C5CE]/70">Last Check:</span>
                          <div className="text-[#00d4ff] font-semibold">
                            {service.lastCheck.toLocaleTimeString()}
                          </div>
                        </div>
                      </div>

                      {service.dependencies.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-[#C0C5CE]/10">
                          <div className="text-xs text-[#C0C5CE]/70 mb-2">Dependencies:</div>
                          <div className="flex flex-wrap gap-1">
                            {service.dependencies.map(dep => (
                              <Badge key={dep} className="bg-[#00d4ff]/10 text-[#00d4ff] border-[#00d4ff]/20 text-xs">
                                {dep}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Network Metrics */}
            <Card className="neo-card">
              <div className="p-6">
                <div className="neo-flex-between mb-6">
                  <h3 className="text-[#00ff88] font-mono text-xl">
                    {language === 'ar' ? 'مقاييس الشبكة' : 'Network Metrics'}
                  </h3>
                  <Network className="w-5 h-5 text-[#00d4ff]" />
                </div>

                <div className="space-y-4">
                  {networkMetrics.map((metric) => (
                    <div key={metric.id} className="neo-interactive-card p-4">
                      <div className="neo-flex-between mb-3">
                        <div>
                          <div className="font-semibold text-[#C0C5CE] text-sm">
                            {metric.endpoint}
                          </div>
                          <div className="text-xs text-[#C0C5CE]/70">
                            {metric.location}
                          </div>
                        </div>
                        
                        <Badge className={getStatusColor(metric.status)}>
                          {metric.status}
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="neo-flex-between text-xs mb-1">
                            <span className="text-[#C0C5CE]/70">Latency:</span>
                            <span className={`${
                              metric.latency < 50 ? 'text-[#00ff88]' :
                              metric.latency < 100 ? 'text-yellow-400' :
                              'text-red-400'
                            }`}>
                              {metric.latency}ms
                            </span>
                          </div>
                          <Progress 
                            value={Math.min(100, (metric.latency / 200) * 100)} 
                            className="h-1" 
                          />
                        </div>

                        <div>
                          <div className="neo-flex-between text-xs mb-1">
                            <span className="text-[#C0C5CE]/70">Bandwidth:</span>
                            <span className="text-[#00d4ff]">
                              {metric.bandwidth.toFixed(1)} Mbps
                            </span>
                          </div>
                          <Progress 
                            value={Math.min(100, (metric.bandwidth / 1000) * 100)} 
                            className="h-1" 
                          />
                        </div>

                        <div className="neo-flex-between text-xs">
                          <span className="text-[#C0C5CE]/70">Packet Loss:</span>
                          <span className={`${
                            metric.packetLoss < 0.1 ? 'text-[#00ff88]' :
                            metric.packetLoss < 0.5 ? 'text-yellow-400' :
                            'text-red-400'
                          }`}>
                            {(metric.packetLoss * 100).toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Monitoring Command Terminal */}
          <Card className="neo-card">
            <div className="p-6">
              <div className="neo-flex-between mb-4">
                <div className="neo-flex-start neo-space-sm">
                  <Terminal className="w-5 h-5 text-[#00d4ff]" />
                  <h3 className="text-[#00ff88] font-mono text-lg">
                    {language === 'ar' ? 'مركز أوامر المراقبة' : 'Monitoring Command Center'}
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
                    neo@monitoring:~$ status --all-systems --real-time
                  </div>
                  <div className="text-[#C0C5CE]/80">
                    🖥️ System Health: {systemMetrics.filter(m => m.status === 'healthy').length}/{systemMetrics.length} metrics healthy<br/>
                    🚀 Services: {services.filter(s => s.status === 'online').length}/{services.length} online<br/>
                    🚨 Active Alerts: {alerts.filter(a => a.status === 'active').length}<br/>
                    🌐 Network: {networkMetrics.filter(n => n.status === 'good').length}/{networkMetrics.length} endpoints optimal<br/>
                    📊 Overall System Status: Operational
                  </div>
                  
                  <div className="text-[#00ff88] mt-4">
                    neo@monitoring:~$ analyze --performance --trends --predictions
                  </div>
                  <div className="text-[#C0C5CE]/80">
                    📈 Performance Analysis:<br/>
                    • CPU utilization stable at 23.5% (trending normal)<br/>
                    • Memory usage at 67.8% (watch threshold: 80%)<br/>
                    • Network latency avg: {networkMetrics.reduce((sum, m) => sum + m.latency, 0) / networkMetrics.length}ms<br/>
                    • Predicted scaling needed in next 72 hours: No
                  </div>
                  
                  <div className="text-[#00ff88] mt-4">
                    neo@monitoring:~$ automate --alerts --scaling --optimization
                  </div>
                  <div className="text-[#C0C5CE]/80">
                    ⚡ Automation Status:<br/>
                    • Auto-scaling: Enabled (threshold: 80% CPU for 5min)<br/>
                    • Alert routing: Active (24/7 monitoring team)<br/>
                    • Performance optimization: Running background tasks<br/>
                    • Backup systems: Verified and synchronized
                  </div>
                  
                  <div className="text-[#00ff88] mt-4 neo-typing-cursor">
                    neo@monitoring:~$ maintain --watch --enterprise-grade█
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