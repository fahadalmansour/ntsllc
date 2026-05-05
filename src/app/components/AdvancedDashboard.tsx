import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp,
  TrendingDown,
  BarChart3,
  Users,
  DollarSign,
  Activity,
  Server,
  Cpu,
  Database,
  Globe,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Zap,
  Target,
  LineChart,
  PieChart,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Bell,
  Settings,
  Eye,
  Search,
  ArrowUp,
  ArrowDown,
  Monitor,
  Smartphone,
  Tablet
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useAuth } from './contexts/AuthContext';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface MetricCard {
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: React.ReactNode;
  description: string;
}

interface SystemStatus {
  service: string;
  status: 'online' | 'warning' | 'offline';
  uptime: string;
  responseTime: string;
  lastCheck: string;
  details?: string;
}

interface TrafficData {
  source: string;
  visitors: number;
  conversion: number;
  revenue: number;
  trend: 'up' | 'down' | 'stable';
  devices: {
    desktop: number;
    mobile: number;
    tablet: number;
  };
}

interface RevenueData {
  period: string;
  revenue: number;
  growth: number;
  projects: number;
  clients: number;
}

interface AlertData {
  id: string;
  type: 'critical' | 'warning' | 'info';
  message: string;
  timestamp: Date;
  resolved: boolean;
  service?: string;
}

export function AdvancedDashboard() {
  const { session } = useAuth();
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [alerts, setAlerts] = useState<AlertData[]>([]);

  const baseURL = `https://${projectId}.supabase.co/functions/v1/make-server-b245be9a`;
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${session?.access_token}`
  };

  // Real-time metrics data
  const metrics: MetricCard[] = [
    {
      title: 'Total Revenue',
      value: '$124,891',
      change: 23.5,
      trend: 'up',
      icon: <DollarSign className="w-6 h-6" />,
      description: 'Monthly recurring revenue'
    },
    {
      title: 'Active Projects',
      value: '47',
      change: 12.3,
      trend: 'up',
      icon: <Target className="w-6 h-6" />,
      description: 'Currently in development'
    },
    {
      title: 'System Uptime',
      value: '99.97%',
      change: 0.1,
      trend: 'stable',
      icon: <Activity className="w-6 h-6" />,
      description: 'Last 30 days average'
    },
    {
      title: 'Client Satisfaction',
      value: '4.9/5',
      change: 5.2,
      trend: 'up',
      icon: <Users className="w-6 h-6" />,
      description: 'Based on recent reviews'
    },
    {
      title: 'API Requests',
      value: '2.4M',
      change: 18.7,
      trend: 'up',
      icon: <Zap className="w-6 h-6" />,
      description: 'Last 24 hours'
    },
    {
      title: 'Response Time',
      value: '187ms',
      change: -15.3,
      trend: 'up',
      icon: <Clock className="w-6 h-6" />,
      description: 'Average server response'
    }
  ];

  // System status monitoring
  const systemStatus: SystemStatus[] = [
    {
      service: 'Web Applications',
      status: 'online',
      uptime: '99.9%',
      responseTime: '143ms',
      lastCheck: '30s ago'
    },
    {
      service: 'Database Cluster',
      status: 'online',
      uptime: '100%',
      responseTime: '23ms',
      lastCheck: '15s ago'
    },
    {
      service: 'AI Services',
      status: 'warning',
      uptime: '98.1%',
      responseTime: '892ms',
      lastCheck: '45s ago',
      details: 'High response time detected'
    },
    {
      service: 'CDN Network',
      status: 'online',
      uptime: '99.8%',
      responseTime: '67ms',
      lastCheck: '20s ago'
    },
    {
      service: 'Analytics Pipeline',
      status: 'online',
      uptime: '99.6%',
      responseTime: '234ms',
      lastCheck: '10s ago'
    }
  ];

  // Traffic analytics data
  const trafficData: TrafficData[] = [
    {
      source: 'Organic Search',
      visitors: 12847,
      conversion: 3.2,
      revenue: 47891,
      trend: 'up',
      devices: { desktop: 45, mobile: 42, tablet: 13 }
    },
    {
      source: 'Direct Traffic',
      visitors: 8934,
      conversion: 4.7,
      revenue: 32156,
      trend: 'up',
      devices: { desktop: 52, mobile: 38, tablet: 10 }
    },
    {
      source: 'Social Media',
      visitors: 5621,
      conversion: 2.1,
      revenue: 18734,
      trend: 'down',
      devices: { desktop: 28, mobile: 65, tablet: 7 }
    },
    {
      source: 'Paid Advertising',
      visitors: 4392,
      conversion: 5.8,
      revenue: 28945,
      trend: 'up',
      devices: { desktop: 41, mobile: 51, tablet: 8 }
    }
  ];

  // Revenue tracking
  const revenueData: RevenueData[] = [
    { period: 'Jan 2024', revenue: 89234, growth: 15.2, projects: 12, clients: 8 },
    { period: 'Feb 2024', revenue: 94567, growth: 6.0, projects: 14, clients: 10 },
    { period: 'Mar 2024', revenue: 103891, growth: 9.9, projects: 16, clients: 12 },
    { period: 'Apr 2024', revenue: 118234, growth: 13.8, projects: 18, clients: 14 },
    { period: 'May 2024', revenue: 124891, growth: 5.6, projects: 19, clients: 15 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'offline': return 'text-red-400';
      default: return 'text-[#C0C5CE]';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-400/20 text-green-400';
      case 'warning': return 'bg-yellow-400/20 text-yellow-400';
      case 'offline': return 'bg-red-400/20 text-red-400';
      default: return 'bg-[#C0C5CE]/20 text-[#C0C5CE]';
    }
  };

  const getTrendIcon = (trend: string, change: number) => {
    if (trend === 'stable') return null;
    return trend === 'up' ? (
      <ArrowUp className="w-4 h-4 text-green-400" />
    ) : (
      <ArrowDown className="w-4 h-4 text-red-400" />
    );
  };

  const refreshData = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Here you would fetch real data from your backend
    } catch (error) {
      console.error('Error refreshing data:', error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0B0D12] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <BarChart3 className="w-8 h-8 text-[#4AE54A] mr-3" />
            <div>
              <h1 className="text-[#C0C5CE] font-mono text-2xl mb-2">Advanced Analytics Dashboard</h1>
              <div className="flex items-center text-[#C0C5CE]/70 font-mono text-sm">
                <span className="text-[#4AE54A] mr-2">{'>'}</span>
                <span>Real-time business intelligence and monitoring</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-[#C0C5CE] font-mono text-sm">Live Data</span>
            </div>
            
            <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
              <SelectTrigger className="w-32 bg-[#12151C] border-[#C0C5CE]/20 text-[#C0C5CE] font-mono">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24h</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>

            <Button
              onClick={refreshData}
              variant="outline"
              className="border-[#C0C5CE]/20 text-[#C0C5CE] font-mono"
              disabled={loading}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Updating...' : 'Refresh'}
            </Button>
          </div>
        </div>

        {/* Quick Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-[#12151C] border-[#C0C5CE]/20 p-6 hover:border-[#4AE54A]/50 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-[#4AE54A]">{metric.icon}</div>
                  <div className="flex items-center space-x-1">
                    {getTrendIcon(metric.trend, metric.change)}
                    <span className={`font-mono text-sm ${
                      metric.trend === 'up' ? 'text-green-400' : 
                      metric.trend === 'down' ? 'text-red-400' : 'text-[#C0C5CE]'
                    }`}>
                      {metric.change > 0 ? '+' : ''}{metric.change}%
                    </span>
                  </div>
                </div>
                <div className="text-2xl font-mono text-[#C0C5CE] mb-1">{metric.value}</div>
                <div className="text-[#C0C5CE]/70 font-mono text-sm mb-2">{metric.title}</div>
                <div className="text-[#C0C5CE]/50 font-mono text-xs">{metric.description}</div>
              </Card>
            </motion.div>
          ))}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-[#12151C] border-[#C0C5CE]/20 grid grid-cols-5 w-full">
            <TabsTrigger value="overview" className="font-mono">Overview</TabsTrigger>
            <TabsTrigger value="traffic" className="font-mono">Traffic</TabsTrigger>
            <TabsTrigger value="revenue" className="font-mono">Revenue</TabsTrigger>
            <TabsTrigger value="system" className="font-mono">System</TabsTrigger>
            <TabsTrigger value="alerts" className="font-mono">Alerts</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Real-time Activity */}
              <div className="lg:col-span-2">
                <Card className="bg-[#12151C] border-[#C0C5CE]/20 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-[#4AE54A] font-mono text-lg">Real-time Activity</h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                      <span className="text-[#C0C5CE] font-mono text-sm">Live</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4 max-h-80 overflow-y-auto">
                    {Array.from({ length: 8 }, (_, i) => (
                      <div key={i} className="flex items-start space-x-3 p-3 bg-[#0B0D12] rounded border border-[#C0C5CE]/20">
                        <div className="w-2 h-2 rounded-full bg-[#4AE54A] mt-2"></div>
                        <div className="flex-1">
                          <div className="text-[#C0C5CE] font-mono text-sm">
                            {[
                              'New project deployment completed',
                              'Client payment received - $5,000',
                              'AI model training completed',
                              'Server optimization applied',
                              'New lead generated from website',
                              'Database backup completed',
                              'Email campaign sent - 2,400 recipients',
                              'Performance monitoring alert resolved'
                            ][i]}
                          </div>
                          <div className="text-[#C0C5CE]/50 font-mono text-xs mt-1">
                            {Math.floor(Math.random() * 60) + 1} minutes ago
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Quick Stats */}
              <div className="space-y-6">
                <Card className="bg-[#12151C] border-[#C0C5CE]/20 p-6">
                  <h3 className="text-[#4AE54A] font-mono text-lg mb-6">Performance Summary</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[#C0C5CE] font-mono text-sm">Server Load</span>
                        <span className="text-[#4AE54A] font-mono text-sm">67%</span>
                      </div>
                      <Progress value={67} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[#C0C5CE] font-mono text-sm">Memory Usage</span>
                        <span className="text-[#4AE54A] font-mono text-sm">43%</span>
                      </div>
                      <Progress value={43} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[#C0C5CE] font-mono text-sm">Disk Usage</span>
                        <span className="text-[#4AE54A] font-mono text-sm">78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[#C0C5CE] font-mono text-sm">Network I/O</span>
                        <span className="text-[#4AE54A] font-mono text-sm">34%</span>
                      </div>
                      <Progress value={34} className="h-2" />
                    </div>
                  </div>
                </Card>

                <Card className="bg-[#12151C] border-[#C0C5CE]/20 p-6">
                  <h3 className="text-[#4AE54A] font-mono text-lg mb-6">Top Locations</h3>
                  
                  <div className="space-y-3">
                    {[
                      { country: 'United States', percentage: 45, flag: '🇺🇸' },
                      { country: 'Canada', percentage: 18, flag: '🇨🇦' },
                      { country: 'United Kingdom', percentage: 12, flag: '🇬🇧' },
                      { country: 'Germany', percentage: 8, flag: '🇩🇪' },
                      { country: 'Australia', percentage: 7, flag: '🇦🇺' }
                    ].map((location) => (
                      <div key={location.country} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span>{location.flag}</span>
                          <span className="text-[#C0C5CE] font-mono text-sm">{location.country}</span>
                        </div>
                        <span className="text-[#4AE54A] font-mono text-sm">{location.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Traffic Tab */}
          <TabsContent value="traffic">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Traffic Sources */}
              <Card className="bg-[#12151C] border-[#C0C5CE]/20 p-6">
                <h3 className="text-[#4AE54A] font-mono text-lg mb-6">Traffic Sources</h3>
                
                <div className="space-y-4">
                  {trafficData.map((source) => (
                    <div key={source.source} className="bg-[#0B0D12] border border-[#C0C5CE]/20 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-[#C0C5CE] font-mono text-lg">{source.source}</h4>
                        <div className="flex items-center space-x-1">
                          {getTrendIcon(source.trend, 0)}
                          <span className={`font-mono text-sm ${
                            source.trend === 'up' ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {source.trend === 'up' ? '+' : '-'}5%
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                          <div className="text-[#C0C5CE]/70 font-mono text-xs mb-1">Visitors</div>
                          <div className="text-[#4AE54A] font-mono text-lg">{source.visitors.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-[#C0C5CE]/70 font-mono text-xs mb-1">Conversion</div>
                          <div className="text-[#4AE54A] font-mono text-lg">{source.conversion}%</div>
                        </div>
                        <div>
                          <div className="text-[#C0C5CE]/70 font-mono text-xs mb-1">Revenue</div>
                          <div className="text-[#4AE54A] font-mono text-lg">${source.revenue.toLocaleString()}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-xs font-mono">
                        <div className="flex items-center space-x-1">
                          <Monitor className="w-3 h-3 text-[#C0C5CE]" />
                          <span className="text-[#C0C5CE]/70">{source.devices.desktop}%</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Smartphone className="w-3 h-3 text-[#C0C5CE]" />
                          <span className="text-[#C0C5CE]/70">{source.devices.mobile}%</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Tablet className="w-3 h-3 text-[#C0C5CE]" />
                          <span className="text-[#C0C5CE]/70">{source.devices.tablet}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Device Analytics */}
              <Card className="bg-[#12151C] border-[#C0C5CE]/20 p-6">
                <h3 className="text-[#4AE54A] font-mono text-lg mb-6">Device Analytics</h3>
                
                <div className="space-y-6">
                  <div className="bg-[#0B0D12] border border-[#C0C5CE]/20 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Monitor className="w-5 h-5 text-[#4AE54A]" />
                        <span className="text-[#C0C5CE] font-mono">Desktop</span>
                      </div>
                      <span className="text-[#4AE54A] font-mono text-xl">42%</span>
                    </div>
                    <Progress value={42} className="h-2 mb-2" />
                    <div className="text-[#C0C5CE]/70 font-mono text-xs">18,492 sessions</div>
                  </div>
                  
                  <div className="bg-[#0B0D12] border border-[#C0C5CE]/20 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Smartphone className="w-5 h-5 text-[#4AE54A]" />
                        <span className="text-[#C0C5CE] font-mono">Mobile</span>
                      </div>
                      <span className="text-[#4AE54A] font-mono text-xl">48%</span>
                    </div>
                    <Progress value={48} className="h-2 mb-2" />
                    <div className="text-[#C0C5CE]/70 font-mono text-xs">21,156 sessions</div>
                  </div>
                  
                  <div className="bg-[#0B0D12] border border-[#C0C5CE]/20 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Tablet className="w-5 h-5 text-[#4AE54A]" />
                        <span className="text-[#C0C5CE] font-mono">Tablet</span>
                      </div>
                      <span className="text-[#4AE54A] font-mono text-xl">10%</span>
                    </div>
                    <Progress value={10} className="h-2 mb-2" />
                    <div className="text-[#C0C5CE]/70 font-mono text-xs">4,394 sessions</div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* System Tab */}
          <TabsContent value="system">
            <Card className="bg-[#12151C] border-[#C0C5CE]/20 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[#4AE54A] font-mono text-lg">System Status</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                  <span className="text-green-400 font-mono text-sm">All Systems Operational</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {systemStatus.map((system) => (
                  <div key={system.service} className="bg-[#0B0D12] border border-[#C0C5CE]/20 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-[#C0C5CE] font-mono">{system.service}</h4>
                      <Badge variant="secondary" className={`font-mono text-xs ${getStatusBadgeColor(system.status)}`}>
                        {system.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 text-sm font-mono">
                      <div className="flex justify-between">
                        <span className="text-[#C0C5CE]/70">Uptime:</span>
                        <span className="text-[#4AE54A]">{system.uptime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#C0C5CE]/70">Response:</span>
                        <span className="text-[#4AE54A]">{system.responseTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#C0C5CE]/70">Last Check:</span>
                        <span className="text-[#C0C5CE]/60">{system.lastCheck}</span>
                      </div>
                    </div>
                    
                    {system.details && (
                      <div className="mt-3 p-2 bg-yellow-400/10 border border-yellow-400/20 rounded text-xs font-mono text-yellow-400">
                        {system.details}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}