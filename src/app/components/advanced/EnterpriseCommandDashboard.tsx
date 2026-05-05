import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useLanguage } from '../../contexts/LanguageContext';
import { RTLContainer } from '../LanguageSwitcher';
import { 
  Command,
  Terminal,
  Activity,
  Brain,
  Code,
  Zap,
  Eye,
  Settings,
  BarChart3,
  TrendingUp,
  Users,
  Server,
  Database,
  Globe,
  Shield,
  Rocket,
  Bot,
  Sparkles,
  Target,
  Clock,
  CheckCircle,
  ArrowRight,
  ChevronRight,
  Play,
  Layers,
  Monitor,
  Cpu,
  MemoryStick,
  Network,
  HardDrive,
  AlertTriangle,
  Info,
  Plus,
  ExternalLink,
  Maximize,
  Grid,
  Layout,
  PieChart
} from 'lucide-react';

// ✅ ENHANCED: Advanced feature modules
interface AdvancedModule {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  icon: React.ComponentType<any>;
  category: 'monitoring' | 'analytics' | 'development' | 'management' | 'performance';
  complexity: 'basic' | 'intermediate' | 'advanced' | 'expert';
  features: string[];
  featuresAr: string[];
  estimatedTime: string;
  estimatedTimeAr: string;
  status: 'ready' | 'beta' | 'new' | 'updated';
  route: string;
  color: string;
  bgGradient: string;
}

const advancedModules: AdvancedModule[] = [
  {
    id: 'real-time-pipeline',
    name: 'Real-Time Pipeline Monitor',
    nameAr: 'مراقب خط الأنابيب المباشر',
    description: 'Comprehensive real-time monitoring of service pipelines with variable timing (15min - 14 days)',
    descriptionAr: 'مراقبة شاملة مباشرة لخطوط الأنابيب مع أوقات متغيرة (15 دقيقة - 14 يوم)',
    icon: Activity,
    category: 'monitoring',
    complexity: 'advanced',
    features: [
      'Real-time service tracking',
      'Variable timing analysis', 
      'Multi-stage progress',
      'Team allocation',
      'Regional performance',
      'Automated alerts'
    ],
    featuresAr: [
      'تتبع الخدمات المباشر',
      'تحليل التوقيت المتغير',
      'تقدم متعدد المراحل', 
      'تخصيص الفريق',
      'الأداء الإقليمي',
      'التنبيهات التلقائية'
    ],
    estimatedTime: '15min - 4hrs',
    estimatedTimeAr: '15 دقيقة - 4 ساعات',
    status: 'new',
    route: 'real-time-pipeline-monitor',
    color: '#00d4ff',
    bgGradient: 'from-[#00d4ff] to-blue-500'
  },
  {
    id: 'smart-command-center',
    name: 'Smart Command Center',
    nameAr: 'مركز القيادة الذكي',
    description: 'AI-powered central command with auto-scaling and resource optimization',
    descriptionAr: 'مركز قيادة مركزي مدعوم بالذكاء الاصطناعي مع توسع تلقائي وتحسين الموارد',
    icon: Command,
    category: 'management',
    complexity: 'expert',
    features: [
      'Auto-scaling intelligence',
      'Resource optimization',
      'Global infrastructure',
      'Cost optimization',
      'Terminal interface',
      'Command automation'
    ],
    featuresAr: [
      'ذكاء التوسع التلقائي',
      'تحسين الموارد',
      'البنية التحتية العالمية',
      'تحسين التكاليف',
      'واجهة الطرفية',
      'أتمتة الأوامر'
    ],
    estimatedTime: '2-6hrs setup',
    estimatedTimeAr: '2-6 ساعات للإعداد',
    status: 'new',
    route: 'smart-command-center',
    color: '#00ff88',
    bgGradient: 'from-[#00ff88] to-green-500'
  },
  {
    id: 'predictive-analytics',
    name: 'Predictive Analytics Dashboard',
    nameAr: 'لوحة التحليلات التنبؤية',
    description: 'AI-powered predictions and insights for performance and business optimization',
    descriptionAr: 'تنبؤات ورؤى مدعومة بالذكاء الاصطناعي للأداء وتحسين الأعمال',
    icon: Brain,
    category: 'analytics',
    complexity: 'advanced',
    features: [
      'AI predictions',
      'Performance forecasting',
      'Business insights',
      'Cost optimization',
      'Risk assessment',
      'Smart recommendations'
    ],
    featuresAr: [
      'تنبؤات الذكاء الاصطناعي',
      'توقعات الأداء',
      'رؤى الأعمال',
      'تحسين التكاليف',
      'تقييم المخاطر',
      'توصيات ذكية'
    ],
    estimatedTime: '30min - 2hrs',
    estimatedTimeAr: '30 دقيقة - ساعتان',
    status: 'new',
    route: 'predictive-analytics-dashboard',
    color: '#8b5cf6',
    bgGradient: 'from-purple-500 to-[#8b5cf6]'
  },
  {
    id: 'enhanced-developer-tools',
    name: 'Enhanced Developer Tools',
    nameAr: 'أدوات المطورين المتقدمة',
    description: 'Comprehensive development toolkit with code analysis, API monitoring, and deployment',
    descriptionAr: 'مجموعة أدوات تطوير شاملة مع تحليل الكود ومراقبة APIs والنشر',
    icon: Code,
    category: 'development',
    complexity: 'intermediate',
    features: [
      'Code quality analysis',
      'API endpoint monitoring',
      'Deployment management',
      'Real-time logs',
      'Performance metrics',
      'Development workflow'
    ],
    featuresAr: [
      'تحليل جودة الكود',
      'مراقبة نقاط API',
      'إدارة النشر',
      'السجلات المباشرة',
      'مقاييس الأداء',
      'سير عمل التطوير'
    ],
    estimatedTime: '45min - 3hrs',
    estimatedTimeAr: '45 دقيقة - 3 ساعات',
    status: 'new',
    route: 'enhanced-developer-tools',
    color: '#f59e0b',
    bgGradient: 'from-amber-500 to-orange-500'
  },
  {
    id: 'advanced-performance-manager',
    name: 'Advanced Performance Manager',
    nameAr: 'مدير الأداء المتقدم',
    description: 'Comprehensive performance optimization with Core Web Vitals and regional analysis',
    descriptionAr: 'تحسين أداء شامل مع مقاييس الويب الأساسية والتحليل الإقليمي',
    icon: Zap,
    category: 'performance',
    complexity: 'advanced',
    features: [
      'Core Web Vitals',
      'Performance scoring',
      'Regional optimization',
      'Device analysis',
      'Auto-optimization',
      'Cost savings tracking'
    ],
    featuresAr: [
      'مقاييس الويب الأساسية',
      'تقييم الأداء',
      'التحسين الإقليمي',
      'تحليل الأجهزة',
      'التحسين التلقائي',
      'تتبع توفير التكاليف'
    ],
    estimatedTime: '20min - 1hr',
    estimatedTimeAr: '20 دقيقة - ساعة واحدة',
    status: 'new',
    route: 'advanced-performance-manager',
    color: '#ef4444',
    bgGradient: 'from-red-500 to-pink-500'
  }
];

// ✅ ENHANCED: Quick access cards for existing features
const quickAccessCards = [
  {
    id: 'analytics',
    name: 'Analytics Hub',
    nameAr: 'مركز التحليلات',
    icon: BarChart3,
    route: 'analytics',
    color: '#00d4ff'
  },
  {
    id: 'admin',
    name: 'Admin Dashboard',
    nameAr: 'لوحة الإدارة',
    icon: Settings,
    route: 'admin-dashboard',
    color: '#00ff88'
  },
  {
    id: 'store-builder',
    name: 'Store Builder',
    nameAr: 'منشئ المتاجر',
    icon: Monitor,
    route: 'store-builder',
    color: '#8b5cf6'
  },
  {
    id: 'capacity',
    name: 'Capacity Management',
    nameAr: 'إدارة السعة',
    icon: Server,
    route: 'capacity-management',
    color: '#f59e0b'
  }
];

export function EnterpriseCommandDashboard({ onNavigate }: { onNavigate?: (section: string) => void }) {
  const { isRTL, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'monitoring' | 'analytics' | 'development' | 'management' | 'performance'>('all');
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);
  const [systemStats, setSystemStats] = useState({
    activeModules: 12,
    uptime: 99.97,
    performance: 94,
    efficiency: 87
  });

  // ✅ ENHANCED: Filter modules by category
  const filteredModules = useMemo(() => {
    if (selectedCategory === 'all') return advancedModules;
    return advancedModules.filter(module => module.category === selectedCategory);
  }, [selectedCategory]);

  // ✅ ENHANCED: Category statistics
  const categoryStats = useMemo(() => {
    const stats = advancedModules.reduce((acc, module) => {
      acc[module.category] = (acc[module.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return stats;
  }, []);

  // ✅ ENHANCED: Status color mapping
  const getStatusColor = useCallback((status: string) => {
    switch (status) {
      case 'ready': return 'bg-[#00ff88]/20 text-[#00ff88]';
      case 'beta': return 'bg-yellow-400/20 text-yellow-400';
      case 'new': return 'bg-[#00d4ff]/20 text-[#00d4ff]';
      case 'updated': return 'bg-purple-400/20 text-purple-400';
      default: return 'bg-[#C0C5CE]/20 text-[#C0C5CE]';
    }
  }, []);

  const getComplexityColor = useCallback((complexity: string) => {
    switch (complexity) {
      case 'basic': return 'text-[#00ff88]';
      case 'intermediate': return 'text-yellow-400';
      case 'advanced': return 'text-orange-400';
      case 'expert': return 'text-red-400';
      default: return 'text-[#C0C5CE]';
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#C0C5CE] font-mono">
      {/* ✅ ENHANCED: Enterprise command grid background */}
      <div className="fixed inset-0 enterprise-grid opacity-8 pointer-events-none"></div>
      
      <RTLContainer className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        <div className={`space-y-8 ${isRTL ? 'text-right' : 'text-left'}`}>
          
          {/* ✅ ENHANCED: Enterprise header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#00d4ff] via-purple-500 to-[#00ff88] rounded-lg flex items-center justify-center">
                <Command className="w-8 h-8 text-black" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#C0C5CE] mb-4">
              {language === 'ar' ? 'لوحة القيادة المؤسسية' : 'Enterprise Command Dashboard'}
            </h1>
            <p className="text-xl text-[#C0C5CE]/80 max-w-3xl mx-auto">
              {language === 'ar' 
                ? 'الوصول المركزي لجميع الأدوات والميزات المتقدمة لمنصة NeoTechnology Solutions'
                : 'Central access to all advanced tools and features of NeoTechnology Solutions platform'
              }
            </p>
          </div>

          {/* ✅ ENHANCED: System overview metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <Grid className="w-5 h-5 text-[#00d4ff]" />
                <Badge className="bg-[#00d4ff]/20 text-[#00d4ff] font-mono">System</Badge>
              </div>
              <div className="neo-dashboard-widget-value text-[#00d4ff]">{systemStats.activeModules}</div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">Active Modules</div>
              <div className="neo-dashboard-widget-change positive">
                <CheckCircle className="w-3 h-3" />
                All operational
              </div>
            </Card>

            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <Activity className="w-5 h-5 text-[#00ff88]" />
                <span className="text-xs text-[#C0C5CE]/70 font-mono">Uptime</span>
              </div>
              <div className="neo-dashboard-widget-value text-[#00ff88]">{systemStats.uptime}%</div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">System Uptime</div>
              <div className="neo-dashboard-widget-change positive">
                <TrendingUp className="w-3 h-3" />
                +0.02% this month
              </div>
            </Card>

            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span className="text-xs text-[#C0C5CE]/70 font-mono">Performance</span>
              </div>
              <div className="neo-dashboard-widget-value text-yellow-400">{systemStats.performance}%</div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">Avg Performance</div>
              <div className="neo-dashboard-widget-change positive">
                <Target className="w-3 h-3" />
                Above baseline
              </div>
            </Card>

            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <Bot className="w-5 h-5 text-purple-400" />
                <span className="text-xs text-[#C0C5CE]/70 font-mono">Efficiency</span>
              </div>
              <div className="neo-dashboard-widget-value text-purple-400">{systemStats.efficiency}%</div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">AI Efficiency</div>
              <div className="neo-dashboard-widget-change positive">
                <Brain className="w-3 h-3" />
                Auto-optimized
              </div>
            </Card>
          </div>

          {/* ✅ ENHANCED: Category filter navigation */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: language === 'ar' ? 'الكل' : 'All', count: advancedModules.length },
                { id: 'monitoring', label: language === 'ar' ? 'المراقبة' : 'Monitoring', count: categoryStats.monitoring || 0 },
                { id: 'analytics', label: language === 'ar' ? 'التحليلات' : 'Analytics', count: categoryStats.analytics || 0 },
                { id: 'development', label: language === 'ar' ? 'التطوير' : 'Development', count: categoryStats.development || 0 },
                { id: 'management', label: language === 'ar' ? 'الإدارة' : 'Management', count: categoryStats.management || 0 },
                { id: 'performance', label: language === 'ar' ? 'الأداء' : 'Performance', count: categoryStats.performance || 0 }
              ].map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id as any)}
                  className={`px-4 py-2 rounded-lg font-mono text-sm transition-all ${
                    selectedCategory === category.id
                      ? 'bg-[#00d4ff] text-black'
                      : 'bg-[#12151C] text-[#C0C5CE] hover:bg-[#00d4ff]/20 hover:text-[#00d4ff]'
                  }`}
                >
                  {category.label} ({category.count})
                </button>
              ))}
            </div>
          </div>

          {/* ✅ ENHANCED: Advanced modules grid */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-[#C0C5CE] mb-6 font-mono">
              {language === 'ar' ? 'الوحدات المتقدمة' : 'Advanced Modules'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredModules.map(module => {
                const ModuleIcon = module.icon;
                return (
                  <Card 
                    key={module.id} 
                    className="neo-interactive-card relative overflow-hidden"
                    onMouseEnter={() => setHoveredModule(module.id)}
                    onMouseLeave={() => setHoveredModule(null)}
                  >
                    {/* ✅ Gradient overlay on hover */}
                    <div 
                      className={`absolute inset-0 opacity-0 transition-opacity duration-300 ${
                        hoveredModule === module.id ? 'opacity-5' : ''
                      }`}
                      style={{
                        background: `linear-gradient(135deg, ${module.color}20, transparent)`
                      }}
                    />
                    
                    <div className="p-6 relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div 
                          className="w-12 h-12 rounded-lg flex items-center justify-center"
                          style={{ 
                            background: `linear-gradient(135deg, ${module.color}20, ${module.color}10)`,
                            border: `1px solid ${module.color}30`
                          }}
                        >
                          <ModuleIcon className="w-6 h-6" style={{ color: module.color }} />
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <Badge className={getStatusColor(module.status)}>
                            {module.status.toUpperCase()}
                          </Badge>
                          <span className={`text-xs font-mono ${getComplexityColor(module.complexity)}`}>
                            {module.complexity.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      
                      <h4 className="text-lg font-bold text-[#C0C5CE] font-mono mb-2">
                        {language === 'ar' ? module.nameAr : module.name}
                      </h4>
                      <p className="text-[#C0C5CE]/80 text-sm mb-4 line-clamp-2">
                        {language === 'ar' ? module.descriptionAr : module.description}
                      </p>
                      
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-[#C0C5CE]/70">
                            {language === 'ar' ? 'الوقت المقدر:' : 'Est. Time:'}
                          </span>
                          <span className="text-[#00ff88]">
                            {language === 'ar' ? module.estimatedTimeAr : module.estimatedTime}
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {(language === 'ar' ? module.featuresAr : module.features).slice(0, 3).map((feature, index) => (
                            <span 
                              key={index}
                              className="text-xs bg-[#12151C] text-[#C0C5CE]/70 px-2 py-1 rounded font-mono"
                            >
                              {feature}
                            </span>
                          ))}
                          {module.features.length > 3 && (
                            <span className="text-xs text-[#C0C5CE]/50 font-mono">
                              +{module.features.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full neo-button-primary"
                        onClick={() => onNavigate?.(module.route)}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        {language === 'ar' ? 'فتح الوحدة' : 'Open Module'}
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* ✅ ENHANCED: Quick access section */}
          <div>
            <h3 className="text-2xl font-bold text-[#C0C5CE] mb-6 font-mono">
              {language === 'ar' ? 'الوصول السريع' : 'Quick Access'}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickAccessCards.map(card => {
                const CardIcon = card.icon;
                return (
                  <Card key={card.id} className="neo-interactive-card">
                    <div className="p-4">
                      <div className="flex flex-col items-center space-y-3">
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ 
                            background: `${card.color}20`,
                            border: `1px solid ${card.color}30`
                          }}
                        >
                          <CardIcon className="w-5 h-5" style={{ color: card.color }} />
                        </div>
                        <span className="text-sm font-mono text-[#C0C5CE] text-center">
                          {language === 'ar' ? card.nameAr : card.name}
                        </span>
                        <Button 
                          size="sm" 
                          className="neo-button-ghost w-full"
                          onClick={() => onNavigate?.(card.route)}
                        >
                          <ArrowRight className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* ✅ ENHANCED: System information footer */}
          <div className="mt-12 p-6 bg-[#12151C] border border-[#00d4ff]/20 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-[#00ff88]/20 rounded-lg flex items-center justify-center">
                  <Info className="w-4 h-4 text-[#00ff88]" />
                </div>
                <div>
                  <h4 className="font-mono text-[#C0C5CE] font-semibold">
                    {language === 'ar' ? 'NeoTechnology Solutions - منصة مؤسسية' : 'NeoTechnology Solutions - Enterprise Platform'}
                  </h4>
                  <p className="text-[#C0C5CE]/70 text-sm font-mono">
                    {language === 'ar' 
                      ? 'جميع الأدوات متاحة وجاهزة للاستخدام مع دعم كامل للعربية والتوقيتات المتغيرة'
                      : 'All tools are available and ready with full Arabic support and variable timing'
                    }
                  </p>
                </div>
              </div>
              <Badge className="bg-[#00ff88]/20 text-[#00ff88] font-mono">
                {language === 'ar' ? 'جاهز للإنتاج' : 'Production Ready'}
              </Badge>
            </div>
          </div>

        </div>
      </RTLContainer>
    </div>
  );
}