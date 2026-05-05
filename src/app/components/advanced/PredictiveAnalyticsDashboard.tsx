import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { useLanguage } from '../../contexts/LanguageContext';
import { RTLContainer } from '../LanguageSwitcher';
import { 
  Brain,
  TrendingUp,
  TrendingDown,
  Target,
  Zap,
  Clock,
  DollarSign,
  Users,
  Globe,
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Settings,
  Download,
  Share,
  Filter,
  Calendar,
  ArrowUp,
  ArrowDown,
  Minus,
  Plus,
  Layers,
  Database,
  Server,
  Cpu,
  MemoryStick,
  Network,
  Shield,
  Rocket,
  Bot,
  Sparkles,
  ChevronRight,
  Info,
  AlertCircle,
  TrendingUp as Growth
} from 'lucide-react';

// ✅ ENHANCED: AI-powered predictions and insights
interface PredictiveInsight {
  id: string;
  type: 'performance' | 'cost' | 'demand' | 'capacity' | 'security' | 'optimization';
  title: string;
  description: string;
  confidence: number;
  impact: 'low' | 'medium' | 'high' | 'critical';
  timeframe: string;
  actionable: boolean;
  recommendation: string;
  estimatedSavings?: number;
  riskLevel: number;
}

interface MetricTrend {
  id: string;
  name: string;
  current: number;
  predicted: number;
  change: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  confidence: number;
  category: 'performance' | 'business' | 'technical' | 'financial';
}

interface SmartAlert {
  id: string;
  severity: 'info' | 'warning' | 'critical';
  title: string;
  message: string;
  predictedImpact: string;
  recommendation: string;
  autoResolvable: boolean;
  timestamp: Date;
}

// ✅ ENHANCED: Mock AI-generated insights
const predictiveInsights: PredictiveInsight[] = [
  {
    id: 'insight-001',
    type: 'demand',
    title: 'Expected Traffic Surge',
    description: 'AI predicts 340% increase in store setup requests during Black Friday week',
    confidence: 94,
    impact: 'critical',
    timeframe: '14-21 Nov 2024',
    actionable: true,
    recommendation: 'Scale infrastructure 48 hours ahead. Pre-provision 12 additional CPU clusters.',
    estimatedSavings: 45000,
    riskLevel: 15
  },
  {
    id: 'insight-002',
    type: 'cost',
    title: 'Cost Optimization Opportunity',
    description: 'Database queries can be optimized to reduce latency by 60% and costs by 23%',
    confidence: 87,
    impact: 'high',
    timeframe: 'Next 30 days',
    actionable: true,
    recommendation: 'Implement query caching and index optimization. Estimated ROI: 340%',
    estimatedSavings: 12400,
    riskLevel: 8
  },
  {
    id: 'insight-003',
    type: 'performance',
    title: 'Latency Prediction',
    description: 'GCC region may experience increased latency due to network infrastructure updates',
    confidence: 78,
    impact: 'medium',
    timeframe: '5-10 Dec 2024',
    actionable: true,
    recommendation: 'Temporarily route traffic through backup UAE servers',
    riskLevel: 25
  },
  {
    id: 'insight-004',
    type: 'security',
    title: 'Security Pattern Detection',
    description: 'AI detected unusual API call patterns suggesting potential security threat',
    confidence: 91,
    impact: 'high',
    timeframe: 'Next 7 days',
    actionable: true,
    recommendation: 'Enable enhanced monitoring and rate limiting on affected endpoints',
    riskLevel: 35
  }
];

const metricTrends: MetricTrend[] = [
  {
    id: 'revenue',
    name: 'Monthly Revenue',
    current: 284750,
    predicted: 342600,
    change: 20.3,
    unit: 'USD',
    trend: 'up',
    confidence: 89,
    category: 'business'
  },
  {
    id: 'users',
    name: 'Active Users',
    current: 8247,
    predicted: 12580,
    change: 52.6,
    unit: 'users',
    trend: 'up',
    confidence: 76,
    category: 'business'
  },
  {
    id: 'latency',
    name: 'Avg Response Time',
    current: 89,
    predicted: 67,
    change: -24.7,
    unit: 'ms',
    trend: 'down',
    confidence: 82,
    category: 'performance'
  },
  {
    id: 'costs',
    name: 'Infrastructure Costs',
    current: 15875,
    predicted: 13200,
    change: -16.8,
    unit: 'USD',
    trend: 'down',
    confidence: 85,
    category: 'financial'
  },
  {
    id: 'satisfaction',
    name: 'Customer Satisfaction',
    current: 94.2,
    predicted: 96.8,
    change: 2.8,
    unit: '%',
    trend: 'up',
    confidence: 74,
    category: 'business'
  },
  {
    id: 'uptime',
    name: 'System Uptime',
    current: 99.97,
    predicted: 99.99,
    change: 0.02,
    unit: '%',
    trend: 'up',
    confidence: 93,
    category: 'technical'
  }
];

const smartAlerts: SmartAlert[] = [
  {
    id: 'alert-001',
    severity: 'critical',
    title: 'Predicted Capacity Bottleneck',
    message: 'AI models predict CPU exhaustion in US-East region within 72 hours',
    predictedImpact: '23% performance degradation, potential service interruption',
    recommendation: 'Auto-scale CPU clusters or migrate workloads to US-West',
    autoResolvable: true,
    timestamp: new Date(Date.now() - 45 * 60 * 1000)
  },
  {
    id: 'alert-002',
    severity: 'warning',
    title: 'Unusual Traffic Pattern',
    message: 'AI detected 156% increase in N8N automation requests from new clients',
    predictedImpact: 'Potential queue buildup, increased response times',
    recommendation: 'Consider pre-emptive scaling or client communication',
    autoResolvable: false,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
  },
  {
    id: 'alert-003',
    severity: 'info',
    title: 'Optimization Success',
    message: 'Database optimization completed with 34% performance improvement',
    predictedImpact: 'Reduced latency, improved user experience',
    recommendation: 'Monitor for 24h and apply similar optimizations to other regions',
    autoResolvable: false,
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000)
  }
];

export function PredictiveAnalyticsDashboard({ onNavigate }: { onNavigate?: (section: string) => void }) {
  const { isRTL, language } = useLanguage();
  const [selectedTimeframe, setSelectedTimeframe] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'performance' | 'business' | 'technical' | 'financial'>('all');
  const [insights, setInsights] = useState<PredictiveInsight[]>(predictiveInsights);
  const [trends, setTrends] = useState<MetricTrend[]>(metricTrends);
  const [alerts, setAlerts] = useState<SmartAlert[]>(smartAlerts);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [lastAnalysis, setLastAnalysis] = useState(new Date());

  // ✅ ENHANCED: Real-time AI analysis simulation
  useEffect(() => {
    const analysisInterval = setInterval(() => {
      setIsAnalyzing(true);
      
      setTimeout(() => {
        // Update trends with AI predictions
        setTrends(prev => prev.map(trend => ({
          ...trend,
          current: trend.current + (Math.random() - 0.5) * 2,
          predicted: trend.predicted + (Math.random() - 0.5) * 5,
          confidence: Math.max(70, Math.min(95, trend.confidence + (Math.random() - 0.5) * 4))
        })));
        
        setLastAnalysis(new Date());
        setIsAnalyzing(false);
      }, 3000);
    }, 30000);

    return () => clearInterval(analysisInterval);
  }, []);

  // ✅ ENHANCED: Impact color mapping
  const getImpactColor = useCallback((impact: PredictiveInsight['impact']) => {
    switch (impact) {
      case 'low': return 'text-[#00ff88]';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-orange-400';
      case 'critical': return 'text-red-400';
      default: return 'text-[#C0C5CE]';
    }
  }, []);

  const getImpactBadge = useCallback((impact: PredictiveInsight['impact']) => {
    const variants = {
      low: 'bg-[#00ff88]/20 text-[#00ff88]',
      medium: 'bg-yellow-400/20 text-yellow-400',
      high: 'bg-orange-400/20 text-orange-400',
      critical: 'bg-red-400/20 text-red-400'
    };
    return variants[impact];
  }, []);

  // ✅ ENHANCED: Trend direction icons
  const getTrendIcon = useCallback((trend: MetricTrend['trend']) => {
    switch (trend) {
      case 'up': return ArrowUp;
      case 'down': return ArrowDown;
      case 'stable': return Minus;
      default: return Minus;
    }
  }, []);

  const getTrendColor = useCallback((trend: MetricTrend['trend'], change: number) => {
    if (trend === 'stable') return 'text-[#C0C5CE]';
    // Positive change is good for revenue, users, satisfaction, uptime
    // Negative change is good for latency, costs
    const isPositiveGood = ['revenue', 'users', 'satisfaction', 'uptime'].includes(trend as any);
    const isGoodChange = isPositiveGood ? change > 0 : change < 0;
    return isGoodChange ? 'text-[#00ff88]' : 'text-red-400';
  }, []);

  // ✅ ENHANCED: Alert severity mapping
  const getAlertColor = useCallback((severity: SmartAlert['severity']) => {
    switch (severity) {
      case 'info': return 'text-[#00d4ff]';
      case 'warning': return 'text-yellow-400';
      case 'critical': return 'text-red-400';
      default: return 'text-[#C0C5CE]';
    }
  }, []);

  const getAlertIcon = useCallback((severity: SmartAlert['severity']) => {
    switch (severity) {
      case 'info': return Info;
      case 'warning': return AlertTriangle;
      case 'critical': return AlertCircle;
      default: return Info;
    }
  }, []);

  // ✅ ENHANCED: Filtered data
  const filteredTrends = useMemo(() => {
    if (selectedCategory === 'all') return trends;
    return trends.filter(trend => trend.category === selectedCategory);
  }, [trends, selectedCategory]);

  const highPriorityInsights = useMemo(() => {
    return insights.filter(insight => ['high', 'critical'].includes(insight.impact));
  }, [insights]);

  const totalPotentialSavings = useMemo(() => {
    return insights.reduce((total, insight) => total + (insight.estimatedSavings || 0), 0);
  }, [insights]);

  const averageConfidence = useMemo(() => {
    const total = insights.reduce((sum, insight) => sum + insight.confidence, 0);
    return Math.round(total / insights.length);
  }, [insights]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#C0C5CE] font-mono">
      {/* ✅ ENHANCED: AI-powered background pattern */}
      <div className="fixed inset-0 enterprise-grid opacity-8 pointer-events-none"></div>
      
      <RTLContainer className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        <div className={`space-y-8 ${isRTL ? 'text-right' : 'text-left'}`}>
          
          {/* ✅ ENHANCED: AI Analytics header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#00d4ff] via-purple-500 to-[#00ff88] rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-black" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-[#C0C5CE]">
                  {language === 'ar' ? 'لوحة التحليلات التنبؤية' : 'Predictive Analytics Dashboard'}
                </h1>
                <p className="text-[#C0C5CE]/70 mt-1">
                  {language === 'ar' 
                    ? 'تحليلات مدعومة بالذكاء الاصطناعي للتنبؤ والتحسين المستمر'
                    : 'AI-powered insights for prediction and continuous optimization'
                  }
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isAnalyzing ? 'bg-purple-400 animate-pulse' : 'bg-[#00ff88]'}`}></div>
                <span className="text-sm text-[#C0C5CE]/70 font-mono">
                  {language === 'ar' ? 'آخر تحليل' : 'Last Analysis'}: {lastAnalysis.toLocaleTimeString()}
                </span>
              </div>
              
              <Button
                onClick={() => setIsAnalyzing(true)}
                disabled={isAnalyzing}
                className="bg-gradient-to-r from-[#00d4ff] to-purple-500 text-black font-mono hover:from-purple-500 hover:to-[#00ff88]"
              >
                {isAnalyzing ? (
                  <Bot className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
                {language === 'ar' ? 'تحليل فوري' : 'Analyze Now'}
              </Button>
            </div>
          </div>

          {/* ✅ ENHANCED: AI Insights overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <Brain className="w-5 h-5 text-purple-400" />
                <Badge className="bg-purple-400/20 text-purple-400 font-mono">AI</Badge>
              </div>
              <div className="neo-dashboard-widget-value text-purple-400">{insights.length}</div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">Active Insights</div>
              <div className="neo-dashboard-widget-change positive">
                <Target className="w-3 h-3" />
                {averageConfidence}% avg confidence
              </div>
            </Card>

            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <DollarSign className="w-5 h-5 text-[#00ff88]" />
                <span className="text-xs text-[#C0C5CE]/70 font-mono">Savings</span>
              </div>
              <div className="neo-dashboard-widget-value text-[#00ff88]">${totalPotentialSavings.toLocaleString()}</div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">Potential Monthly</div>
              <div className="neo-dashboard-widget-change positive">
                <TrendingUp className="w-3 h-3" />
                {Math.round(totalPotentialSavings / 15875 * 100)}% cost reduction
              </div>
            </Card>

            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <AlertTriangle className="w-5 h-5 text-yellow-400" />
                <span className="text-xs text-[#C0C5CE]/70 font-mono">Alerts</span>
              </div>
              <div className="neo-dashboard-widget-value text-yellow-400">{alerts.length}</div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">Smart Alerts</div>
              <div className="neo-dashboard-widget-change">
                <Clock className="w-3 h-3" />
                {alerts.filter(a => a.autoResolvable).length} auto-resolvable
              </div>
            </Card>

            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <Rocket className="w-5 h-5 text-[#00d4ff]" />
                <span className="text-xs text-[#C0C5CE]/70 font-mono">Performance</span>
              </div>
              <div className="neo-dashboard-widget-value">{highPriorityInsights.length}</div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">High Priority</div>
              <div className="neo-dashboard-widget-change positive">
                <CheckCircle className="w-3 h-3" />
                {insights.filter(i => i.actionable).length} actionable
              </div>
            </Card>
          </div>

          {/* ✅ ENHANCED: Filter controls */}
          <div className="flex items-center justify-between bg-[#12151C] p-4 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-[#C0C5CE]/70" />
                <span className="text-sm text-[#C0C5CE]/70 font-mono">Timeframe:</span>
              </div>
              <div className="flex space-x-1">
                {[
                  { id: '7d', label: '7 Days' },
                  { id: '30d', label: '30 Days' },
                  { id: '90d', label: '3 Months' },
                  { id: '1y', label: '1 Year' }
                ].map(period => (
                  <button
                    key={period.id}
                    onClick={() => setSelectedTimeframe(period.id as any)}
                    className={`px-3 py-1 rounded text-sm font-mono transition-all ${
                      selectedTimeframe === period.id
                        ? 'bg-[#00d4ff] text-black'
                        : 'text-[#C0C5CE] hover:bg-[#00d4ff]/10 hover:text-[#00d4ff]'
                    }`}
                  >
                    {period.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-[#C0C5CE]/70" />
                <span className="text-sm text-[#C0C5CE]/70 font-mono">Category:</span>
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as any)}
                className="bg-[#0B0D12] border border-[#00d4ff]/30 text-[#C0C5CE] rounded px-3 py-1 text-sm font-mono"
              >
                <option value="all">All Categories</option>
                <option value="performance">Performance</option>
                <option value="business">Business</option>
                <option value="technical">Technical</option>
                <option value="financial">Financial</option>
              </select>
            </div>
          </div>

          {/* ✅ ENHANCED: Main analytics content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* AI Insights */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="neo-card">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-[#C0C5CE] font-mono">
                      {language === 'ar' ? 'رؤى الذكاء الاصطناعي' : 'AI-Powered Insights'}
                    </h3>
                    <Badge className="bg-purple-400/20 text-purple-400 font-mono">
                      {insights.length} {language === 'ar' ? 'رؤية' : 'Insights'}
                    </Badge>
                  </div>
                  
                  <div className="space-y-4">
                    {insights.map(insight => (
                      <div key={insight.id} className="border border-[#00d4ff]/20 rounded-lg p-4 hover:border-[#00d4ff]/40 transition-all">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <Badge className={getImpactBadge(insight.impact)}>
                                {insight.impact.toUpperCase()}
                              </Badge>
                              <Badge className="bg-[#C0C5CE]/10 text-[#C0C5CE] font-mono text-xs">
                                {insight.type.toUpperCase()}
                              </Badge>
                              {insight.actionable && (
                                <Badge className="bg-[#00ff88]/20 text-[#00ff88] font-mono text-xs">
                                  ACTIONABLE
                                </Badge>
                              )}
                            </div>
                            <h4 className="font-bold text-[#C0C5CE] font-mono text-lg mb-2">
                              {insight.title}
                            </h4>
                            <p className="text-[#C0C5CE]/80 text-sm mb-3">
                              {insight.description}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-mono text-[#00ff88] mb-1">
                              {insight.confidence}% confidence
                            </div>
                            <div className="text-xs text-[#C0C5CE]/70 font-mono">
                              {insight.timeframe}
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-[#0B0D12] border border-[#00d4ff]/20 rounded p-3 mb-3">
                          <h5 className="text-sm font-semibold text-[#00d4ff] font-mono mb-1">
                            AI Recommendation:
                          </h5>
                          <p className="text-sm text-[#C0C5CE]/90 font-mono">
                            {insight.recommendation}
                          </p>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-xs font-mono">
                            {insight.estimatedSavings && (
                              <div className="flex items-center space-x-1">
                                <DollarSign className="w-3 h-3 text-[#00ff88]" />
                                <span className="text-[#00ff88]">${insight.estimatedSavings.toLocaleString()} savings</span>
                              </div>
                            )}
                            <div className="flex items-center space-x-1">
                              <AlertTriangle className="w-3 h-3 text-yellow-400" />
                              <span className="text-[#C0C5CE]/70">{insight.riskLevel}% risk</span>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button size="sm" className="neo-button-outline">
                              <Eye className="w-3 h-3 mr-1" />
                              Details
                            </Button>
                            {insight.actionable && (
                              <Button size="sm" className="neo-button-primary">
                                <Rocket className="w-3 h-3 mr-1" />
                                Execute
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Predictive Trends */}
              <Card className="neo-card">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#C0C5CE] font-mono mb-6">
                    {language === 'ar' ? 'الاتجاهات التنبؤية' : 'Predictive Trends'}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredTrends.map(trend => {
                      const TrendIcon = getTrendIcon(trend.trend);
                      return (
                        <div key={trend.id} className="border border-[#C0C5CE]/20 rounded-lg p-4 hover:border-[#00d4ff]/40 transition-all">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-mono text-[#C0C5CE] font-semibold">{trend.name}</h4>
                            <Badge className={`${trend.category === 'business' ? 'bg-[#00ff88]/20 text-[#00ff88]' : 
                                             trend.category === 'performance' ? 'bg-[#00d4ff]/20 text-[#00d4ff]' :
                                             trend.category === 'financial' ? 'bg-yellow-400/20 text-yellow-400' :
                                             'bg-[#C0C5CE]/20 text-[#C0C5CE]'} font-mono text-xs`}>
                              {trend.category.toUpperCase()}
                            </Badge>
                          </div>
                          
                          <div className="space-y-2 mb-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-[#C0C5CE]/70 font-mono">Current:</span>
                              <span className="text-[#C0C5CE] font-mono">
                                {trend.current.toLocaleString()} {trend.unit}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-[#C0C5CE]/70 font-mono">Predicted:</span>
                              <span className="text-[#00d4ff] font-mono">
                                {trend.predicted.toLocaleString()} {trend.unit}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className={`flex items-center space-x-1 ${getTrendColor(trend.trend, trend.change)}`}>
                              <TrendIcon className="w-4 h-4" />
                              <span className="font-mono text-sm">
                                {Math.abs(trend.change)}%
                              </span>
                            </div>
                            <div className="text-xs text-[#C0C5CE]/70 font-mono">
                              {trend.confidence}% confidence
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Card>
            </div>

            {/* Smart Alerts & Actions */}
            <div className="space-y-6">
              <Card className="neo-card">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-[#C0C5CE] font-mono mb-4">
                    {language === 'ar' ? 'التنبيهات الذكية' : 'Smart Alerts'}
                  </h3>
                  
                  <div className="space-y-3">
                    {alerts.map(alert => {
                      const AlertIcon = getAlertIcon(alert.severity);
                      return (
                        <div key={alert.id} className={`border rounded-lg p-4 ${
                          alert.severity === 'critical' ? 'border-red-400/40 bg-red-400/5' :
                          alert.severity === 'warning' ? 'border-yellow-400/40 bg-yellow-400/5' :
                          'border-[#00d4ff]/40 bg-[#00d4ff]/5'
                        }`}>
                          <div className="flex items-start space-x-3">
                            <AlertIcon className={`w-4 h-4 mt-0.5 ${getAlertColor(alert.severity)}`} />
                            <div className="flex-1">
                              <h4 className={`font-mono font-semibold text-sm ${getAlertColor(alert.severity)}`}>
                                {alert.title}
                              </h4>
                              <p className="text-[#C0C5CE]/80 text-xs font-mono mt-1">
                                {alert.message}
                              </p>
                              
                              <div className="mt-2 p-2 bg-[#0B0D12] rounded text-xs">
                                <div className="text-[#C0C5CE]/70 font-mono mb-1">Impact:</div>
                                <div className="text-[#C0C5CE] font-mono">{alert.predictedImpact}</div>
                              </div>
                              
                              <div className="mt-2 p-2 bg-[#00d4ff]/10 rounded text-xs">
                                <div className="text-[#00d4ff] font-mono mb-1">Recommendation:</div>
                                <div className="text-[#C0C5CE] font-mono">{alert.recommendation}</div>
                              </div>
                              
                              <div className="flex items-center justify-between mt-3">
                                <div className="text-xs text-[#C0C5CE]/60 font-mono">
                                  {alert.timestamp.toLocaleTimeString()}
                                </div>
                                {alert.autoResolvable && (
                                  <Button size="sm" className="neo-button-success text-xs">
                                    <Bot className="w-3 h-3 mr-1" />
                                    Auto-Resolve
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Card>

              <Card className="neo-card">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-[#C0C5CE] font-mono mb-4">
                    {language === 'ar' ? 'إجراءات ذكية' : 'Smart Actions'}
                  </h3>
                  
                  <div className="space-y-3">
                    <Button className="w-full neo-button-primary" onClick={() => onNavigate?.('real-time-pipeline')}>
                      <Activity className="w-4 h-4 mr-2" />
                      {language === 'ar' ? 'مراقب الأنابيب' : 'Pipeline Monitor'}
                    </Button>
                    
                    <Button className="w-full neo-button-success" onClick={() => onNavigate?.('smart-command-center')}>
                      <Brain className="w-4 h-4 mr-2" />
                      {language === 'ar' ? 'مركز القيادة' : 'Command Center'}
                    </Button>
                    
                    <Button className="w-full neo-button-outline" onClick={() => onNavigate?.('capacity-management')}>
                      <Rocket className="w-4 h-4 mr-2" />
                      {language === 'ar' ? 'إدارة السعة' : 'Capacity Management'}
                    </Button>
                    
                    <Button className="w-full neo-button-ghost">
                      <Download className="w-4 h-4 mr-2" />
                      {language === 'ar' ? 'تصدير التقرير' : 'Export Report'}
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>

        </div>
      </RTLContainer>
    </div>
  );
}