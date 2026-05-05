import React, { useEffect, useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  Search, 
  TrendingUp, 
  Globe, 
  Target, 
  BarChart3, 
  CheckCircle, 
  AlertTriangle,
  Clock,
  Users,
  Zap,
  Shield,
  Award
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface SEOMetric {
  name: string;
  current: number;
  target: number;
  status: 'excellent' | 'good' | 'needs-improvement' | 'poor';
  description: string;
}

interface SEOAnalysis {
  score: number;
  metrics: SEOMetric[];
  recommendations: string[];
  keywords: { term: string; volume: number; difficulty: number; }[];
  competitors: { domain: string; score: number; traffic: number; }[];
}

const SEO_DATA: SEOAnalysis = {
  score: 87,
  metrics: [
    {
      name: 'Core Web Vitals',
      current: 92,
      target: 90,
      status: 'excellent',
      description: 'Page loading performance and user experience metrics'
    },
    {
      name: 'Mobile Friendliness',
      current: 98,
      target: 95,
      status: 'excellent',
      description: 'Mobile responsiveness and touch-friendly design'
    },
    {
      name: 'Technical SEO',
      current: 85,
      target: 90,
      status: 'good',
      description: 'Site structure, crawlability, and indexing'
    },
    {
      name: 'Content Quality',
      current: 78,
      target: 85,
      status: 'good',
      description: 'Content relevance, depth, and keyword optimization'
    },
    {
      name: 'Backlink Profile',
      current: 65,
      target: 75,
      status: 'needs-improvement',
      description: 'Domain authority and link building strategy'
    },
    {
      name: 'Local SEO',
      current: 82,
      target: 80,
      status: 'excellent',
      description: 'Geographic targeting for US and GCC markets'
    }
  ],
  recommendations: [
    'Implement structured data markup for e-commerce services',
    'Optimize meta descriptions for higher click-through rates',
    'Build high-quality backlinks from technology and business websites',
    'Create location-specific landing pages for GCC markets',
    'Improve internal linking structure for better page authority distribution',
    'Add Arabic language hreflang tags for international SEO'
  ],
  keywords: [
    { term: 'e-commerce development', volume: 12000, difficulty: 65 },
    { term: 'shopify store setup', volume: 8500, difficulty: 45 },
    { term: 'wordpress e-commerce', volume: 15000, difficulty: 70 },
    { term: 'gcc e-commerce solutions', volume: 2500, difficulty: 35 },
    { term: 'n8n automation', volume: 3200, difficulty: 40 },
    { term: 'store optimization', volume: 6800, difficulty: 55 }
  ],
  competitors: [
    { domain: 'shopify.com', score: 95, traffic: 85000000 },
    { domain: 'woocommerce.com', score: 88, traffic: 25000000 },
    { domain: 'bigcommerce.com', score: 82, traffic: 8500000 },
    { domain: 'wix.com', score: 79, traffic: 45000000 }
  ]
};

export function SEOOptimizer({ onNavigate }: { onNavigate?: (section: string) => void }) {
  const { language } = useLanguage();
  const [analysisData, setAnalysisData] = useState<SEOAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'metrics' | 'keywords' | 'competitors'>('overview');

  useEffect(() => {
    // Simulate SEO analysis loading
    const timer = setTimeout(() => {
      setAnalysisData(SEO_DATA);
      setIsAnalyzing(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-[#00ff88]';
      case 'good': return 'text-[#00d4ff]';
      case 'needs-improvement': return 'text-[#ffd93d]';
      case 'poor': return 'text-[#ff6b6b]';
      default: return 'text-[#C0C5CE]';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <CheckCircle className="w-4 h-4" />;
      case 'good': return <CheckCircle className="w-4 h-4" />;
      case 'needs-improvement': return <AlertTriangle className="w-4 h-4" />;
      case 'poor': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  if (isAnalyzing || !analysisData) {
    return (
      <section className="min-h-screen bg-[#0a0a0a] py-20 px-6 relative overflow-hidden">
        <div className="fixed inset-0 enterprise-grid opacity-10 pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <Card className="neo-card">
            <div className="p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-6 relative">
                <div className="absolute inset-0 border-4 border-transparent border-t-[#00d4ff] border-r-[#00d4ff] rounded-full animate-spin"></div>
                <div className="absolute inset-2 border-4 border-transparent border-b-[#00ff88] border-l-[#00ff88] rounded-full animate-spin" style={{ animationDirection: 'reverse' }}></div>
              </div>
              <h3 className="text-2xl font-bold text-[#C0C5CE] mb-4 font-mono">
                {language === 'ar' ? 'تحليل SEO قيد التشغيل...' : 'SEO Analysis in Progress...'}
              </h3>
              <p className="text-[#C0C5CE]/70 font-mono">
                {language === 'ar' 
                  ? 'نحلل موقعك وننشئ تقريراً شاملاً حول الأداء'
                  : 'Analyzing your site and generating comprehensive performance report'
                }
              </p>
            </div>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#0a0a0a] py-20 px-6 relative overflow-hidden">
      <div className="fixed inset-0 enterprise-grid opacity-10 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#12151C] border border-[#00ff88]/30 rounded-full">
            <div className="w-2 h-2 bg-[#00ff88] rounded-full animate-pulse"></div>
            <span className="text-[#00ff88] font-mono text-sm">
              {language === 'ar' ? 'تحليل SEO المتقدم' : 'Advanced SEO Analysis'}
            </span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-[#C0C5CE] font-mono">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#00ff88]">
              SEO Performance
            </span>
            <br />
            Dashboard
          </h2>
        </div>

        {/* Overall Score */}
        <Card className="neo-card">
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              
              {/* Score Circle */}
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      stroke="rgba(192, 197, 206, 0.2)"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={`${(analysisData.score / 100) * 314} 314`}
                      className="transition-all duration-1000"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#00d4ff" />
                        <stop offset="100%" stopColor="#00ff88" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[#C0C5CE] font-mono">
                        {analysisData.score}
                      </div>
                      <div className="text-sm text-[#C0C5CE]/70 font-mono">/ 100</div>
                    </div>
                  </div>
                </div>
                <Badge className="bg-[#00ff88]/20 text-[#00ff88] font-mono">
                  Excellent Score
                </Badge>
              </div>

              {/* Key Metrics */}
              <div className="md:col-span-2 grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-[#0B0D12] rounded-lg border border-[#00d4ff]/20">
                  <TrendingUp className="w-8 h-8 text-[#00d4ff] mx-auto mb-2" />
                  <div className="text-2xl font-bold text-[#C0C5CE] font-mono">+245%</div>
                  <div className="text-sm text-[#C0C5CE]/70 font-mono">Traffic Growth</div>
                </div>
                
                <div className="text-center p-4 bg-[#0B0D12] rounded-lg border border-[#00ff88]/20">
                  <Search className="w-8 h-8 text-[#00ff88] mx-auto mb-2" />
                  <div className="text-2xl font-bold text-[#C0C5CE] font-mono">#3</div>
                  <div className="text-sm text-[#C0C5CE]/70 font-mono">Avg. Ranking</div>
                </div>
                
                <div className="text-center p-4 bg-[#0B0D12] rounded-lg border border-[#ffd93d]/20">
                  <Globe className="w-8 h-8 text-[#ffd93d] mx-auto mb-2" />
                  <div className="text-2xl font-bold text-[#C0C5CE] font-mono">8</div>
                  <div className="text-sm text-[#C0C5CE]/70 font-mono">Markets</div>
                </div>
                
                <div className="text-center p-4 bg-[#0B0D12] rounded-lg border border-[#ff6b6b]/20">
                  <Users className="w-8 h-8 text-[#ff6b6b] mx-auto mb-2" />
                  <div className="text-2xl font-bold text-[#C0C5CE] font-mono">15K</div>
                  <div className="text-sm text-[#C0C5CE]/70 font-mono">Monthly Users</div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'metrics', label: 'Metrics', icon: Target },
            { id: 'keywords', label: 'Keywords', icon: Search },
            { id: 'competitors', label: 'Competitors', icon: TrendingUp }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-mono text-sm transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-[#00d4ff] text-black'
                    : 'bg-[#12151C] text-[#C0C5CE] hover:bg-[#00d4ff]/20 hover:text-[#00d4ff] border border-[#C0C5CE]/20'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Recent Improvements */}
              <Card className="neo-card">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#C0C5CE] mb-6 font-mono flex items-center gap-2">
                    <Zap className="w-5 h-5 text-[#00ff88]" />
                    Recent Improvements
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-[#0B0D12] rounded-lg">
                      <CheckCircle className="w-5 h-5 text-[#00ff88] flex-shrink-0" />
                      <div>
                        <div className="text-[#C0C5CE] font-mono text-sm">
                          Implemented Arabic hreflang tags
                        </div>
                        <div className="text-[#C0C5CE]/60 font-mono text-xs">
                          +12% organic traffic from GCC markets
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-[#0B0D12] rounded-lg">
                      <CheckCircle className="w-5 h-5 text-[#00ff88] flex-shrink-0" />
                      <div>
                        <div className="text-[#C0C5CE] font-mono text-sm">
                          Optimized Core Web Vitals
                        </div>
                        <div className="text-[#C0C5CE]/60 font-mono text-xs">
                          Page load time reduced by 40%
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-[#0B0D12] rounded-lg">
                      <CheckCircle className="w-5 h-5 text-[#00ff88] flex-shrink-0" />
                      <div>
                        <div className="text-[#C0C5CE] font-mono text-sm">
                          Added structured data markup
                        </div>
                        <div className="text-[#C0C5CE]/60 font-mono text-xs">
                          Rich snippets appearing in 78% of searches
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Recommendations */}
              <Card className="neo-card">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#C0C5CE] mb-6 font-mono flex items-center gap-2">
                    <Target className="w-5 h-5 text-[#00d4ff]" />
                    Priority Recommendations
                  </h3>
                  <div className="space-y-3">
                    {analysisData.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-[#0B0D12] rounded-lg">
                        <div className="w-6 h-6 bg-[#00d4ff]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0">
                          <div className="w-2 h-2 bg-[#00d4ff] rounded-full"></div>
                        </div>
                        <div className="text-[#C0C5CE] font-mono text-sm leading-relaxed">
                          {rec}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'metrics' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {analysisData.metrics.map((metric, index) => (
                <Card key={metric.name} className="neo-card">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold text-[#C0C5CE] font-mono text-lg">
                        {metric.name}
                      </h4>
                      <div className={`flex items-center gap-1 ${getStatusColor(metric.status)}`}>
                        {getStatusIcon(metric.status)}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm font-mono mb-2">
                          <span className="text-[#C0C5CE]/70">Current</span>
                          <span className="text-[#C0C5CE]">{metric.current}%</span>
                        </div>
                        <div className="w-full bg-[#0B0D12] rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-[#00d4ff] to-[#00ff88] h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${metric.current}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="text-xs text-[#C0C5CE]/60 font-mono">
                        {metric.description}
                      </div>
                      
                      <Badge className={`${getStatusColor(metric.status)} text-xs`}>
                        {metric.status.replace('-', ' ').toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {activeTab === 'keywords' && (
            <Card className="neo-card">
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#C0C5CE] mb-6 font-mono flex items-center gap-2">
                  <Search className="w-5 h-5 text-[#00d4ff]" />
                  Keyword Performance
                </h3>
                <div className="overflow-x-auto">
                  <table className="neo-table">
                    <thead className="neo-table-header">
                      <tr>
                        <th>Keyword</th>
                        <th>Monthly Volume</th>
                        <th>Difficulty</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {analysisData.keywords.map((keyword, index) => (
                        <tr key={keyword.term} className="neo-table-row">
                          <td className="neo-table-cell">
                            <div className="font-mono text-[#C0C5CE]">{keyword.term}</div>
                          </td>
                          <td className="neo-table-cell">
                            <div className="font-mono text-[#00ff88]">
                              {keyword.volume.toLocaleString()}
                            </div>
                          </td>
                          <td className="neo-table-cell">
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-[#0B0D12] rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    keyword.difficulty < 40 ? 'bg-[#00ff88]' :
                                    keyword.difficulty < 70 ? 'bg-[#ffd93d]' : 'bg-[#ff6b6b]'
                                  }`}
                                  style={{ width: `${keyword.difficulty}%` }}
                                ></div>
                              </div>
                              <span className="font-mono text-xs text-[#C0C5CE]">
                                {keyword.difficulty}%
                              </span>
                            </div>
                          </td>
                          <td className="neo-table-cell">
                            <Badge className={`text-xs ${
                              keyword.difficulty < 40 ? 'bg-[#00ff88]/20 text-[#00ff88]' :
                              keyword.difficulty < 70 ? 'bg-[#ffd93d]/20 text-[#ffd93d]' : 
                              'bg-[#ff6b6b]/20 text-[#ff6b6b]'
                            }`}>
                              {keyword.difficulty < 40 ? 'Easy' :
                               keyword.difficulty < 70 ? 'Medium' : 'Hard'}
                            </Badge>
                          </td>
                          <td className="neo-table-cell">
                            <button className="neo-table-action">
                              Optimize
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'competitors' && (
            <Card className="neo-card">
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#C0C5CE] mb-6 font-mono flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#00d4ff]" />
                  Competitive Analysis
                </h3>
                <div className="space-y-4">
                  {analysisData.competitors.map((competitor, index) => (
                    <div key={competitor.domain} className="flex items-center justify-between p-4 bg-[#0B0D12] rounded-lg border border-[#C0C5CE]/20">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#00d4ff] to-[#00ff88] rounded-lg flex items-center justify-center">
                          <span className="text-white font-mono font-bold text-sm">
                            #{index + 1}
                          </span>
                        </div>
                        <div>
                          <div className="font-mono text-[#C0C5CE] font-bold">
                            {competitor.domain}
                          </div>
                          <div className="font-mono text-[#C0C5CE]/60 text-sm">
                            {competitor.traffic.toLocaleString()} monthly visits
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-mono text-[#C0C5CE] font-bold">
                            {competitor.score}/100
                          </div>
                          <div className="font-mono text-[#C0C5CE]/60 text-xs">
                            SEO Score
                          </div>
                        </div>
                        <div className="w-16 bg-[#12151C] rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-[#00d4ff] to-[#00ff88] h-2 rounded-full"
                            style={{ width: `${competitor.score}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* CTA */}
        <Card className="neo-card">
          <div className="p-8 text-center">
            <Award className="w-12 h-12 text-[#00ff88] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-[#C0C5CE] mb-4 font-mono">
              {language === 'ar' ? 'هل تريد تحسين ترتيبك؟' : 'Want to Improve Your Rankings?'}
            </h3>
            <p className="text-[#C0C5CE]/80 mb-6 font-mono max-w-2xl mx-auto">
              {language === 'ar' 
                ? 'احصل على استراتيجية SEO مخصصة لتحسين ظهورك في محركات البحث وزيادة الزيارات'
                : 'Get a custom SEO strategy to improve your search visibility and drive more organic traffic'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => onNavigate?.('contact')}
                className="neo-button-primary"
              >
                {language === 'ar' ? 'احصل على استشارة مجانية' : 'Get Free SEO Consultation'}
              </Button>
              <Button 
                onClick={() => onNavigate?.('services')}
                className="neo-button-outline"
              >
                {language === 'ar' ? 'عرض الخدمات' : 'View Our Services'}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}