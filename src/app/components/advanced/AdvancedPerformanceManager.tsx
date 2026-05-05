import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { useLanguage } from '../../contexts/LanguageContext';
import { RTLContainer } from '../LanguageSwitcher';
import { 
  Zap,
  TrendingUp,
  TrendingDown,
  Target,
  Clock,
  Cpu,
  MemoryStick,
  HardDrive,
  Network,
  Database,
  Server,
  Globe,
  Monitor,
  Smartphone,
  Tablet,
  Activity,
  Eye,
  Settings,
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Info,
  Download,
  Upload,
  Share,
  Filter,
  Calendar,
  BarChart3,
  PieChart,
  LineChart,
  Layers,
  Package,
  Bot,
  Brain,
  Sparkles,
  Rocket,
  Shield,
  Lock,
  Unlock,
  Users,
  DollarSign,
  Plus,
  Minus,
  ArrowUp,
  ArrowDown,
  ChevronRight,
  Maximize,
  Minimize,
  RefreshCw
} from 'lucide-react';

// ✅ ENHANCED: Performance metrics interfaces
interface PerformanceMetric {
  id: string;
  name: string;
  category: 'core-vitals' | 'network' | 'resource' | 'user-experience' | 'business';
  current: number;
  target: number;
  unit: string;
  trend: 'improving' | 'degrading' | 'stable';
  impact: 'low' | 'medium' | 'high' | 'critical';
  lastUpdated: Date;
  history: Array<{ timestamp: Date; value: number }>;
}

interface OptimizationRecommendation {
  id: string;
  type: 'performance' | 'cost' | 'user-experience' | 'technical-debt';
  title: string;
  description: string;
  effort: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high';
  estimatedImprovement: number;
  estimatedCost: number;
  timeToImplement: string;
  priority: number;
  autoImplementable: boolean;
}

interface RegionalPerformance {
  region: string;
  name: string;
  latency: number;
  throughput: number;
  availability: number;
  errorRate: number;
  userSatisfaction: number;
  loadBalancerEfficiency: number;
}

interface DevicePerformance {
  device: 'desktop' | 'mobile' | 'tablet';
  name: string;
  icon: React.ComponentType<any>;
  loadTime: number;
  interactivity: number;
  visualStability: number;
  userEngagement: number;
  bounceRate: number;
}

// ✅ ENHANCED: Mock performance data with real metrics
const performanceMetrics: PerformanceMetric[] = [
  {
    id: 'lcp',
    name: 'Largest Contentful Paint',
    category: 'core-vitals',
    current: 1.2,
    target: 2.5,
    unit: 's',
    trend: 'improving',
    impact: 'high',
    lastUpdated: new Date(),
    history: Array.from({ length: 24 }, (_, i) => ({
      timestamp: new Date(Date.now() - (23 - i) * 60 * 60 * 1000),
      value: 1.2 + Math.random() * 0.4
    }))
  },
  {
    id: 'fid',
    name: 'First Input Delay',
    category: 'core-vitals',
    current: 45,
    target: 100,
    unit: 'ms',
    trend: 'improving',
    impact: 'medium',
    lastUpdated: new Date(),
    history: Array.from({ length: 24 }, (_, i) => ({
      timestamp: new Date(Date.now() - (23 - i) * 60 * 60 * 1000),
      value: 45 + Math.random() * 20
    }))
  },
  {
    id: 'cls',
    name: 'Cumulative Layout Shift',
    category: 'core-vitals',
    current: 0.08,
    target: 0.1,
    unit: '',
    trend: 'stable',
    impact: 'medium',
    lastUpdated: new Date(),
    history: Array.from({ length: 24 }, (_, i) => ({
      timestamp: new Date(Date.now() - (23 - i) * 60 * 60 * 1000),
      value: 0.08 + Math.random() * 0.02
    }))
  },
  {
    id: 'ttfb',
    name: 'Time to First Byte',
    category: 'network',
    current: 89,
    target: 200,
    unit: 'ms',
    trend: 'improving',
    impact: 'high',
    lastUpdated: new Date(),
    history: Array.from({ length: 24 }, (_, i) => ({
      timestamp: new Date(Date.now() - (23 - i) * 60 * 60 * 1000),
      value: 89 + Math.random() * 30
    }))
  },
  {
    id: 'bundle-size',
    name: 'Bundle Size',
    category: 'resource',
    current: 245,
    target: 250,
    unit: 'KB',
    trend: 'improving',
    impact: 'medium',
    lastUpdated: new Date(),
    history: Array.from({ length: 24 }, (_, i) => ({
      timestamp: new Date(Date.now() - (23 - i) * 60 * 60 * 1000),
      value: 245 + Math.random() * 20
    }))
  },
  {
    id: 'conversion-rate',
    name: 'Conversion Rate',
    category: 'business',
    current: 4.7,
    target: 5.0,
    unit: '%',
    trend: 'improving',
    impact: 'critical',
    lastUpdated: new Date(),
    history: Array.from({ length: 24 }, (_, i) => ({
      timestamp: new Date(Date.now() - (23 - i) * 60 * 60 * 1000),
      value: 4.7 + Math.random() * 0.6
    }))
  }
];

const optimizationRecommendations: OptimizationRecommendation[] = [
  {
    id: 'rec-001',
    type: 'performance',
    title: 'Implement Advanced Image Optimization',
    description: 'Replace traditional images with WebP/AVIF formats and implement responsive image loading',
    effort: 'medium',
    impact: 'high',
    estimatedImprovement: 23,
    estimatedCost: 1200,
    timeToImplement: '3-5 days',
    priority: 95,
    autoImplementable: true
  },
  {
    id: 'rec-002',
    type: 'performance',
    title: 'Optimize Database Queries',
    description: 'Implement query caching and index optimization for frequently accessed data',
    effort: 'high',
    impact: 'critical',
    estimatedImprovement: 45,
    estimatedCost: 3500,
    timeToImplement: '1-2 weeks',
    priority: 98,
    autoImplementable: false
  },
  {
    id: 'rec-003',
    type: 'cost',
    title: 'Implement Smart CDN Caching',
    description: 'Optimize CDN cache headers and implement intelligent cache invalidation',
    effort: 'low',
    impact: 'medium',
    estimatedImprovement: 15,
    estimatedCost: 800,
    timeToImplement: '1-2 days',
    priority: 78,
    autoImplementable: true
  },
  {
    id: 'rec-004',
    type: 'user-experience',
    title: 'Enhance Mobile Performance',
    description: 'Implement mobile-specific optimizations and adaptive loading strategies',
    effort: 'medium',
    impact: 'high',
    estimatedImprovement: 35,
    estimatedCost: 2100,
    timeToImplement: '4-6 days',
    priority: 89,
    autoImplementable: false
  },
  {
    id: 'rec-005',
    type: 'technical-debt',
    title: 'Modernize Legacy Components',
    description: 'Refactor outdated components to use modern React patterns and optimization techniques',
    effort: 'high',
    impact: 'medium',
    estimatedImprovement: 18,
    estimatedCost: 4200,
    timeToImplement: '2-3 weeks',
    priority: 65,
    autoImplementable: false
  }
];

const regionalPerformance: RegionalPerformance[] = [
  {
    region: 'us-east-1',
    name: 'US East (Virginia)',
    latency: 67,
    throughput: 847,
    availability: 99.98,
    errorRate: 0.08,
    userSatisfaction: 96.2,
    loadBalancerEfficiency: 94.5
  },
  {
    region: 'us-west-2',
    name: 'US West (Oregon)',
    latency: 89,
    throughput: 623,
    availability: 99.95,
    errorRate: 0.12,
    userSatisfaction: 94.8,
    loadBalancerEfficiency: 91.2
  },
  {
    region: 'gcc-central',
    name: 'GCC Central (UAE)',
    latency: 134,
    throughput: 456,
    availability: 99.92,
    errorRate: 0.15,
    userSatisfaction: 93.4,
    loadBalancerEfficiency: 88.7
  },
  {
    region: 'eu-west-1',
    name: 'Europe (Ireland)',
    latency: 112,
    throughput: 534,
    availability: 99.96,
    errorRate: 0.09,
    userSatisfaction: 95.1,
    loadBalancerEfficiency: 92.8
  }
];

const devicePerformance: DevicePerformance[] = [
  {
    device: 'desktop',
    name: 'Desktop',
    icon: Monitor,
    loadTime: 1.2,
    interactivity: 95,
    visualStability: 97,
    userEngagement: 8.4,
    bounceRate: 12.3
  },
  {
    device: 'mobile',
    name: 'Mobile',
    icon: Smartphone,
    loadTime: 2.1,
    interactivity: 87,
    visualStability: 89,
    userEngagement: 6.2,
    bounceRate: 18.7
  },
  {
    device: 'tablet',
    name: 'Tablet',
    icon: Tablet,
    loadTime: 1.8,
    interactivity: 91,
    visualStability: 93,
    userEngagement: 7.1,
    bounceRate: 15.4
  }
];

export function AdvancedPerformanceManager({ onNavigate }: { onNavigate?: (section: string) => void }) {
  const { isRTL, language } = useLanguage();
  const [selectedView, setSelectedView] = useState<'overview' | 'metrics' | 'recommendations' | 'regional' | 'optimization'>('overview');
  const [metrics, setMetrics] = useState<PerformanceMetric[]>(performanceMetrics);
  const [recommendations, setRecommendations] = useState<OptimizationRecommendation[]>(optimizationRecommendations);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'1h' | '24h' | '7d' | '30d'>('24h');
  const [autoOptimizationEnabled, setAutoOptimizationEnabled] = useState(true);
  const [lastOptimization, setLastOptimization] = useState(new Date());

  // ✅ ENHANCED: Real-time performance monitoring
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => {
        const variation = (Math.random() - 0.5) * 0.1;
        const newValue = Math.max(0, metric.current + variation);
        
        return {
          ...metric,
          current: newValue,
          trend: newValue > metric.current ? 'improving' : newValue < metric.current ? 'degrading' : 'stable',
          lastUpdated: new Date(),
          history: [
            ...metric.history.slice(1),
            { timestamp: new Date(), value: newValue }
          ]
        };
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // ✅ ENHANCED: Auto-optimization engine
  useEffect(() => {
    if (!autoOptimizationEnabled) return;

    const optimizationInterval = setInterval(() => {
      const autoRecommendations = recommendations.filter(rec => rec.autoImplementable && rec.priority > 80);
      
      if (autoRecommendations.length > 0) {
        setIsOptimizing(true);
        setTimeout(() => {
          setIsOptimizing(false);
          setLastOptimization(new Date());
          
          // Simulate performance improvements
          setMetrics(prev => prev.map(metric => ({
            ...metric,
            current: metric.current * 0.95 // 5% improvement
          })));
        }, 3000);
      }
    }, 30000);

    return () => clearInterval(optimizationInterval);
  }, [autoOptimizationEnabled, recommendations]);

  // ✅ ENHANCED: Performance scoring
  const getPerformanceScore = useCallback((metric: PerformanceMetric) => {
    const ratio = metric.current / metric.target;
    
    if (metric.category === 'core-vitals' || metric.name.includes('Rate')) {
      return Math.min(100, (metric.target / metric.current) * 100);
    }
    
    return Math.min(100, (1 - Math.abs(1 - ratio)) * 100);
  }, []);

  const getTrendColor = useCallback((trend: PerformanceMetric['trend']) => {
    switch (trend) {
      case 'improving': return 'text-[#00ff88]';
      case 'degrading': return 'text-red-400';
      case 'stable': return 'text-[#C0C5CE]';
      default: return 'text-[#C0C5CE]';
    }
  }, []);

  const getTrendIcon = useCallback((trend: PerformanceMetric['trend']) => {
    switch (trend) {
      case 'improving': return TrendingUp;
      case 'degrading': return TrendingDown;
      case 'stable': return Minus;
      default: return Minus;
    }
  }, []);

  // ✅ ENHANCED: Impact color mapping
  const getImpactColor = useCallback((impact: string) => {
    switch (impact) {
      case 'low': return 'text-[#00ff88]';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-orange-400';
      case 'critical': return 'text-red-400';
      default: return 'text-[#C0C5CE]';
    }
  }, []);

  const getEffortBadge = useCallback((effort: string) => {
    const variants = {
      low: 'bg-[#00ff88]/20 text-[#00ff88]',
      medium: 'bg-yellow-400/20 text-yellow-400',
      high: 'bg-red-400/20 text-red-400'
    };
    return variants[effort as keyof typeof variants] || 'bg-[#C0C5CE]/20 text-[#C0C5CE]';
  }, []);

  // ✅ ENHANCED: Statistics calculation
  const overallStats = useMemo(() => {
    const avgScore = metrics.reduce((sum, metric) => sum + getPerformanceScore(metric), 0) / metrics.length;
    const criticalIssues = metrics.filter(metric => metric.impact === 'critical' && getPerformanceScore(metric) < 80).length;
    const improving = metrics.filter(metric => metric.trend === 'improving').length;
    const totalSavings = recommendations.reduce((sum, rec) => sum + rec.estimatedCost, 0);
    
    return {
      avgScore: Math.round(avgScore),
      criticalIssues,
      improving,
      totalSavings
    };
  }, [metrics, recommendations, getPerformanceScore]);

  const executeOptimization = useCallback((recommendationId: string) => {
    setIsOptimizing(true);
    setTimeout(() => {
      setRecommendations(prev => prev.filter(rec => rec.id !== recommendationId));
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        current: metric.current * 0.9 // 10% improvement
      })));
      setIsOptimizing(false);
      setLastOptimization(new Date());
    }, 4000);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#C0C5CE] font-mono">
      {/* ✅ ENHANCED: Performance grid background */}
      <div className="fixed inset-0 enterprise-grid opacity-8 pointer-events-none"></div>
      
      <RTLContainer className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        <div className={`space-y-8 ${isRTL ? 'text-right' : 'text-left'}`}>
          
          {/* ✅ ENHANCED: Performance manager header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#00ff88] via-[#00d4ff] to-purple-500 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-black" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-[#C0C5CE]">
                  {language === 'ar' ? 'مدير الأداء المتقدم' : 'Advanced Performance Manager'}
                </h1>
                <p className="text-[#C0C5CE]/70 mt-1">
                  {language === 'ar' 
                    ? 'تحسين شامل ومراقبة مستمرة للأداء مع تحليلات متقدمة'
                    : 'Comprehensive optimization and continuous monitoring with advanced analytics'
                  }
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${autoOptimizationEnabled ? 'bg-[#00ff88] animate-pulse' : 'bg-[#C0C5CE]/50'}`}></div>
                <span className="text-sm text-[#C0C5CE]/70 font-mono">
                  {language === 'ar' ? 'التحسين التلقائي' : 'Auto-Optimization'}: {autoOptimizationEnabled ? 'ON' : 'OFF'}
                </span>
              </div>
              
              <Button
                onClick={() => setAutoOptimizationEnabled(!autoOptimizationEnabled)}
                className={`${autoOptimizationEnabled ? 'bg-[#00ff88]/20 text-[#00ff88]' : 'bg-[#C0C5CE]/20 text-[#C0C5CE]'} border-0 font-mono`}
              >
                {autoOptimizationEnabled ? <Bot className="w-4 h-4" /> : <Brain className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* ✅ ENHANCED: Performance overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <Target className="w-5 h-5 text-[#00ff88]" />
                <Badge className="bg-[#00ff88]/20 text-[#00ff88] font-mono">Score</Badge>
              </div>
              <div className="neo-dashboard-widget-value text-[#00ff88]">{overallStats.avgScore}</div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">Performance Score</div>
              <div className="neo-dashboard-widget-change positive">
                <TrendingUp className="w-3 h-3" />
                {overallStats.improving} metrics improving
              </div>
            </Card>

            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <Clock className="w-5 h-5 text-[#00d4ff]" />
                <span className="text-xs text-[#C0C5CE]/70 font-mono">Speed</span>
              </div>
              <div className="neo-dashboard-widget-value text-[#00d4ff]">1.2s</div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">Load Time</div>
              <div className="neo-dashboard-widget-change positive">
                <TrendingDown className="w-3 h-3" />
                -23% faster
              </div>
            </Card>

            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <AlertTriangle className="w-5 h-5 text-yellow-400" />
                <span className="text-xs text-[#C0C5CE]/70 font-mono">Issues</span>
              </div>
              <div className="neo-dashboard-widget-value text-yellow-400">{overallStats.criticalIssues}</div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">Critical Issues</div>
              <div className="neo-dashboard-widget-change">
                <Shield className="w-3 h-3" />
                {recommendations.filter(r => r.autoImplementable).length} auto-fixable
              </div>
            </Card>

            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <DollarSign className="w-5 h-5 text-purple-400" />
                <span className="text-xs text-[#C0C5CE]/70 font-mono">Savings</span>
              </div>
              <div className="neo-dashboard-widget-value text-purple-400">${overallStats.totalSavings.toLocaleString()}</div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">Potential Monthly</div>
              <div className="neo-dashboard-widget-change positive">
                <Rocket className="w-3 h-3" />
                ROI: 340%
              </div>
            </Card>
          </div>

          {/* ✅ ENHANCED: Navigation tabs */}
          <div className="flex space-x-1 bg-[#12151C] p-1 rounded-lg">
            {[
              { id: 'overview', label: language === 'ar' ? 'نظرة عامة' : 'Overview', icon: Eye },
              { id: 'metrics', label: language === 'ar' ? 'المقاييس' : 'Core Metrics', icon: BarChart3 },
              { id: 'recommendations', label: language === 'ar' ? 'التوصيات' : 'Recommendations', icon: Sparkles },
              { id: 'regional', label: language === 'ar' ? 'الأداء الإقليمي' : 'Regional', icon: Globe },
              { id: 'optimization', label: language === 'ar' ? 'التحسين' : 'Optimization', icon: Rocket }
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

          {/* ✅ ENHANCED: Main content based on view */}
          {selectedView === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Core Web Vitals */}
              <Card className="neo-card">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#C0C5CE] font-mono mb-6">
                    {language === 'ar' ? 'مؤشرات الويب الأساسية' : 'Core Web Vitals'}
                  </h3>
                  
                  <div className="space-y-4">
                    {metrics.filter(metric => metric.category === 'core-vitals').map(metric => {
                      const score = getPerformanceScore(metric);
                      const TrendIcon = getTrendIcon(metric.trend);
                      
                      return (
                        <div key={metric.id} className="border border-[#00d4ff]/20 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-mono text-[#C0C5CE] font-semibold">{metric.name}</h4>
                            <div className="flex items-center space-x-2">
                              <Badge className={`${score >= 90 ? 'bg-[#00ff88]/20 text-[#00ff88]' : 
                                                score >= 70 ? 'bg-yellow-400/20 text-yellow-400' : 
                                                'bg-red-400/20 text-red-400'} font-mono`}>
                                {Math.round(score)}
                              </Badge>
                              <TrendIcon className={`w-4 h-4 ${getTrendColor(metric.trend)}`} />
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[#C0C5CE]/70 text-sm font-mono">Current</span>
                            <span className="text-[#C0C5CE] font-mono">
                              {metric.current.toFixed(metric.unit === 's' ? 1 : 0)}{metric.unit}
                            </span>
                          </div>
                          
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-[#C0C5CE]/70 text-sm font-mono">Target</span>
                            <span className="text-[#00ff88] font-mono">
                              {metric.target.toFixed(metric.unit === 's' ? 1 : 0)}{metric.unit}
                            </span>
                          </div>
                          
                          <Progress value={score} className="h-2" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Card>

              {/* Device Performance */}
              <Card className="neo-card">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#C0C5CE] font-mono mb-6">
                    {language === 'ar' ? 'أداء الأجهزة' : 'Device Performance'}
                  </h3>
                  
                  <div className="space-y-4">
                    {devicePerformance.map(device => {
                      const DeviceIcon = device.icon;
                      return (
                        <div key={device.device} className="border border-[#C0C5CE]/20 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <DeviceIcon className="w-5 h-5 text-[#00d4ff]" />
                              <h4 className="font-mono text-[#C0C5CE] font-semibold">{device.name}</h4>
                            </div>
                            <Badge className={`${device.loadTime < 2 ? 'bg-[#00ff88]/20 text-[#00ff88]' : 
                                             device.loadTime < 3 ? 'bg-yellow-400/20 text-yellow-400' : 
                                             'bg-red-400/20 text-red-400'} font-mono`}>
                              {device.loadTime}s
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                            <div>
                              <div className="text-[#C0C5CE]/70">Interactivity</div>
                              <div className="text-[#00ff88]">{device.interactivity}%</div>
                            </div>
                            <div>
                              <div className="text-[#C0C5CE]/70">Visual Stability</div>
                              <div className="text-[#00d4ff]">{device.visualStability}%</div>
                            </div>
                            <div>
                              <div className="text-[#C0C5CE]/70">Engagement</div>
                              <div className="text-[#C0C5CE]">{device.userEngagement}min</div>
                            </div>
                            <div>
                              <div className="text-[#C0C5CE]/70">Bounce Rate</div>
                              <div className="text-yellow-400">{device.bounceRate}%</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* ✅ ENHANCED: Recommendations view */}
          {selectedView === 'recommendations' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-[#C0C5CE] font-mono">
                  {language === 'ar' ? 'توصيات التحسين الذكية' : 'Smart Optimization Recommendations'}
                </h3>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-[#C0C5CE]/70 font-mono">
                    {language === 'ar' ? 'آخر تحسين' : 'Last Optimization'}: {lastOptimization.toLocaleTimeString()}
                  </span>
                  {isOptimizing && (
                    <Badge className="bg-[#00d4ff]/20 text-[#00d4ff] font-mono animate-pulse">
                      Optimizing...
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="space-y-4">
                {recommendations
                  .sort((a, b) => b.priority - a.priority)
                  .map(recommendation => (
                    <Card key={recommendation.id} className="neo-interactive-card">
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <Badge className={getEffortBadge(recommendation.effort)}>
                                {recommendation.effort.toUpperCase()} EFFORT
                              </Badge>
                              <Badge className={`${recommendation.impact === 'critical' ? 'bg-red-400/20 text-red-400' :
                                                recommendation.impact === 'high' ? 'bg-orange-400/20 text-orange-400' :
                                                recommendation.impact === 'medium' ? 'bg-yellow-400/20 text-yellow-400' :
                                                'bg-[#00ff88]/20 text-[#00ff88]'} font-mono`}>
                                {recommendation.impact.toUpperCase()} IMPACT
                              </Badge>
                              {recommendation.autoImplementable && (
                                <Badge className="bg-[#00d4ff]/20 text-[#00d4ff] font-mono">
                                  AUTO
                                </Badge>
                              )}
                            </div>
                            <h4 className="font-bold text-[#C0C5CE] font-mono text-lg mb-2">
                              {recommendation.title}
                            </h4>
                            <p className="text-[#C0C5CE]/80 text-sm mb-3">
                              {recommendation.description}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-mono text-[#00ff88] mb-1">
                              {recommendation.priority}
                            </div>
                            <div className="text-xs text-[#C0C5CE]/70 font-mono">
                              Priority Score
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm font-mono mb-4">
                          <div>
                            <div className="text-[#C0C5CE]/70">Improvement</div>
                            <div className="text-[#00ff88]">+{recommendation.estimatedImprovement}%</div>
                          </div>
                          <div>
                            <div className="text-[#C0C5CE]/70">Cost</div>
                            <div className="text-[#C0C5CE]">${recommendation.estimatedCost.toLocaleString()}</div>
                          </div>
                          <div>
                            <div className="text-[#C0C5CE]/70">Time</div>
                            <div className="text-[#C0C5CE]">{recommendation.timeToImplement}</div>
                          </div>
                          <div>
                            <div className="text-[#C0C5CE]/70">ROI</div>
                            <div className="text-[#00ff88]">
                              {Math.round((recommendation.estimatedImprovement * 1000) / recommendation.estimatedCost)}%
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between pt-4 border-t border-[#C0C5CE]/20">
                          <div className="text-xs text-[#C0C5CE]/70 font-mono">
                            Type: {recommendation.type.replace('-', ' ').toUpperCase()}
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" className="neo-button-outline">
                              <Eye className="w-3 h-3 mr-1" />
                              Details
                            </Button>
                            <Button 
                              size="sm" 
                              className="neo-button-primary"
                              onClick={() => executeOptimization(recommendation.id)}
                              disabled={isOptimizing}
                            >
                              {isOptimizing ? (
                                <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                              ) : (
                                <Rocket className="w-3 h-3 mr-1" />
                              )}
                              {recommendation.autoImplementable ? 'Auto-Apply' : 'Implement'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            </div>
          )}

          {/* ✅ ENHANCED: Regional performance view */}
          {selectedView === 'regional' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-[#C0C5CE] font-mono">
                {language === 'ar' ? 'الأداء الإقليمي العالمي' : 'Global Regional Performance'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {regionalPerformance.map(region => (
                  <Card key={region.region} className="neo-interactive-card">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <Globe className="w-6 h-6 text-[#00d4ff]" />
                          <div>
                            <h4 className="font-bold text-[#C0C5CE] font-mono">{region.name}</h4>
                            <p className="text-[#C0C5CE]/70 text-sm font-mono">{region.region}</p>
                          </div>
                        </div>
                        <Badge className={`${region.availability >= 99.9 ? 'bg-[#00ff88]/20 text-[#00ff88]' : 
                                         region.availability >= 99.5 ? 'bg-yellow-400/20 text-yellow-400' : 
                                         'bg-red-400/20 text-red-400'} font-mono`}>
                          {region.availability}% UP
                        </Badge>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-[#C0C5CE]/70 text-sm font-mono">Latency</span>
                          <span className={`font-mono ${region.latency < 100 ? 'text-[#00ff88]' : 
                                          region.latency < 200 ? 'text-yellow-400' : 'text-red-400'}`}>
                            {region.latency}ms
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-[#C0C5CE]/70 text-sm font-mono">Throughput</span>
                          <span className="text-[#00d4ff] font-mono">{region.throughput} req/s</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-[#C0C5CE]/70 text-sm font-mono">Error Rate</span>
                          <span className={`font-mono ${region.errorRate < 0.1 ? 'text-[#00ff88]' : 
                                          region.errorRate < 1 ? 'text-yellow-400' : 'text-red-400'}`}>
                            {region.errorRate}%
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-[#C0C5CE]/70 text-sm font-mono">User Satisfaction</span>
                          <span className="text-[#00ff88] font-mono">{region.userSatisfaction}%</span>
                        </div>
                        
                        <div className="pt-3 border-t border-[#C0C5CE]/20">
                          <div className="flex justify-between items-center">
                            <span className="text-[#C0C5CE]/70 text-sm font-mono">Load Balancer</span>
                            <span className="text-[#C0C5CE] font-mono">{region.loadBalancerEfficiency}%</span>
                          </div>
                          <Progress value={region.loadBalancerEfficiency} className="h-2 mt-1" />
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