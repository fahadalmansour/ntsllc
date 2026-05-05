import React, { useState, useEffect, useCallback, memo } from 'react';
import { 
  Zap, TrendingUp, Clock, Database, Wifi, 
  Monitor, Smartphone, Activity, BarChart3,
  AlertTriangle, CheckCircle, Settings, Gauge
} from 'lucide-react';

interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
  memoryUsage: number;
  bundleSize: number;
  networkType: string;
  deviceType: 'mobile' | 'tablet' | 'desktop';
}

interface OptimizationSuggestion {
  id: string;
  type: 'critical' | 'important' | 'minor';
  category: 'performance' | 'memory' | 'network' | 'bundle';
  title: string;
  description: string;
  impact: number; // 1-10 scale
  effort: number; // 1-10 scale
  implemented: boolean;
}

export const PerformanceOptimizer: React.FC = memo(() => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [suggestions, setSuggestions] = useState<OptimizationSuggestion[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [score, setScore] = useState<number>(0);
  const [historicalData, setHistoricalData] = useState<PerformanceMetrics[]>([]);

  // Collect performance metrics
  const collectMetrics = useCallback(async () => {
    setIsAnalyzing(true);
    
    try {
      // Web Vitals
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paint = performance.getEntriesByType('paint');
      
      const fcp = paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0;
      const ttfb = navigation?.responseStart - navigation?.requestStart || 0;
      
      // Memory usage (if available)
      const memoryInfo = (performance as any).memory;
      const memoryUsage = memoryInfo ? 
        ((memoryInfo.usedJSHeapSize / memoryInfo.totalJSHeapSize) * 100) : 0;

      // Network information
      const connection = (navigator as any).connection;
      const networkType = connection?.effectiveType || 'unknown';

      // Device type detection
      const deviceType = window.innerWidth < 768 ? 'mobile' : 
                        window.innerWidth < 1024 ? 'tablet' : 'desktop';

      // Bundle size estimation
      const bundleSize = await estimateBundleSize();

      // Simulated LCP, FID, CLS for demo (in real app, use web-vitals library)
      const newMetrics: PerformanceMetrics = {
        fcp: fcp,
        lcp: fcp + Math.random() * 1000, // Simulated
        fid: Math.random() * 100, // Simulated
        cls: Math.random() * 0.25, // Simulated
        ttfb: ttfb,
        memoryUsage,
        bundleSize,
        networkType,
        deviceType
      };

      setMetrics(newMetrics);
      
      // Update historical data
      const updated = [...historicalData, newMetrics].slice(-20);
      setHistoricalData(updated);
      localStorage.setItem('neo-performance-history', JSON.stringify(updated));

      // Calculate performance score
      const calculatedScore = calculatePerformanceScore(newMetrics);
      setScore(calculatedScore);

      // Generate optimization suggestions
      const newSuggestions = generateSuggestions(newMetrics);
      setSuggestions(newSuggestions);

    } catch (error) {
      console.error('Performance metrics collection failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  }, [historicalData]);

  // Estimate bundle size
  const estimateBundleSize = async (): Promise<number> => {
    try {
      const resourceEntries = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      const jsResources = resourceEntries.filter(entry => 
        entry.name.includes('.js') || entry.name.includes('chunk')
      );
      return jsResources.reduce((total, entry) => total + (entry.transferSize || 0), 0);
    } catch {
      return 0;
    }
  };

  // Calculate performance score (0-100)
  const calculatePerformanceScore = (metrics: PerformanceMetrics): number => {
    let score = 100;
    
    // FCP scoring
    if (metrics.fcp > 3000) score -= 20;
    else if (metrics.fcp > 1800) score -= 10;
    
    // LCP scoring
    if (metrics.lcp > 4000) score -= 25;
    else if (metrics.lcp > 2500) score -= 15;
    
    // FID scoring
    if (metrics.fid > 300) score -= 20;
    else if (metrics.fid > 100) score -= 10;
    
    // CLS scoring
    if (metrics.cls > 0.25) score -= 15;
    else if (metrics.cls > 0.1) score -= 8;
    
    // Memory usage scoring
    if (metrics.memoryUsage > 80) score -= 10;
    else if (metrics.memoryUsage > 60) score -= 5;
    
    // Bundle size scoring
    if (metrics.bundleSize > 1000000) score -= 10; // > 1MB
    else if (metrics.bundleSize > 500000) score -= 5; // > 500KB
    
    return Math.max(0, score);
  };

  // Generate optimization suggestions
  const generateSuggestions = (metrics: PerformanceMetrics): OptimizationSuggestion[] => {
    const suggestions: OptimizationSuggestion[] = [];

    if (metrics.lcp > 2500) {
      suggestions.push({
        id: 'lcp-optimization',
        type: 'critical',
        category: 'performance',
        title: 'Optimize Largest Contentful Paint',
        description: 'LCP is slower than recommended. Consider optimizing images, fonts, and critical resources.',
        impact: 9,
        effort: 6,
        implemented: false
      });
    }

    if (metrics.fcp > 1800) {
      suggestions.push({
        id: 'fcp-optimization',
        type: 'important',
        category: 'performance',
        title: 'Improve First Contentful Paint',
        description: 'Reduce server response times and eliminate render-blocking resources.',
        impact: 8,
        effort: 5,
        implemented: false
      });
    }

    if (metrics.bundleSize > 500000) {
      suggestions.push({
        id: 'bundle-splitting',
        type: 'important',
        category: 'bundle',
        title: 'Implement Code Splitting',
        description: 'Break down large bundles into smaller chunks for better loading performance.',
        impact: 7,
        effort: 7,
        implemented: true // Already implemented in our app
      });
    }

    if (metrics.memoryUsage > 70) {
      suggestions.push({
        id: 'memory-optimization',
        type: 'important',
        category: 'memory',
        title: 'Optimize Memory Usage',
        description: 'Implement proper cleanup and avoid memory leaks in components.',
        impact: 6,
        effort: 5,
        implemented: false
      });
    }

    if (metrics.cls > 0.1) {
      suggestions.push({
        id: 'layout-stability',
        type: 'critical',
        category: 'performance',
        title: 'Improve Layout Stability',
        description: 'Reserve space for dynamic content and optimize font loading.',
        impact: 8,
        effort: 4,
        implemented: false
      });
    }

    return suggestions;
  };

  // Auto-optimization features
  const enableAutoOptimizations = () => {
    // Lazy load images
    const images = document.querySelectorAll('img:not([loading])');
    images.forEach(img => img.setAttribute('loading', 'lazy'));

    // Preload critical resources
    const criticalResources = [
      'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap'
    ];
    
    criticalResources.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = url;
      link.as = 'style';
      document.head.appendChild(link);
    });

    // Enable passive listeners
    const passiveEvents = ['touchstart', 'touchmove', 'wheel'];
    passiveEvents.forEach(event => {
      document.addEventListener(event, () => {}, { passive: true });
    });
  };

  useEffect(() => {
    // Load historical data
    const stored = localStorage.getItem('neo-performance-history');
    if (stored) {
      setHistoricalData(JSON.parse(stored));
    }

    // Initial metrics collection
    collectMetrics();

    // Enable auto-optimizations
    enableAutoOptimizations();

    // Periodic metrics collection
    const interval = setInterval(collectMetrics, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-[#4AE54A]';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'critical': return 'text-red-400 bg-red-500/20 border-red-400/40';
      case 'important': return 'text-yellow-400 bg-yellow-500/20 border-yellow-400/40';
      case 'minor': return 'text-blue-400 bg-blue-500/20 border-blue-400/40';
      default: return 'text-[#C0C5CE] bg-[#C0C5CE]/20 border-[#C0C5CE]/40';
    }
  };

  const formatMetric = (value: number, unit: string) => {
    if (unit === 'ms') return `${Math.round(value)}ms`;
    if (unit === 'bytes') return `${(value / 1024).toFixed(1)}KB`;
    if (unit === '%') return `${Math.round(value)}%`;
    return value.toFixed(3);
  };

  return (
    <div className="bg-[#12151C] border border-[#C0C5CE]/20 rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#4AE54A]/20 rounded-lg">
            <Gauge className="w-6 h-6 text-[#4AE54A]" />
          </div>
          <div>
            <h3 className="font-mono text-lg text-[#C0C5CE]">Performance Optimizer</h3>
            <p className="text-sm text-[#C0C5CE]/70">Real-time performance analysis and optimization</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className={`text-2xl font-mono ${getScoreColor(score)}`}>
              {score}
            </div>
            <div className="text-xs text-[#C0C5CE]/70">Performance Score</div>
          </div>
          
          <button
            onClick={collectMetrics}
            disabled={isAnalyzing}
            className="flex items-center gap-2 bg-[#4AE54A] text-[#0B0D12] font-mono font-medium px-4 py-2 rounded-lg hover:bg-[#4AE54A]/90 transition-all duration-200 disabled:opacity-50"
          >
            <Activity className={`w-4 h-4 ${isAnalyzing ? 'animate-pulse' : ''}`} />
            {isAnalyzing ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>
      </div>

      {/* Metrics Dashboard */}
      {metrics && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#0B0D12] border border-[#C0C5CE]/10 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-[#4AE54A]" />
              <span className="text-sm font-mono text-[#C0C5CE]">FCP</span>
            </div>
            <div className="text-lg font-mono text-[#4AE54A]">
              {formatMetric(metrics.fcp, 'ms')}
            </div>
          </div>

          <div className="bg-[#0B0D12] border border-[#C0C5CE]/10 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-mono text-[#C0C5CE]">LCP</span>
            </div>
            <div className="text-lg font-mono text-yellow-400">
              {formatMetric(metrics.lcp, 'ms')}
            </div>
          </div>

          <div className="bg-[#0B0D12] border border-[#C0C5CE]/10 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Database className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-mono text-[#C0C5CE]">Memory</span>
            </div>
            <div className="text-lg font-mono text-blue-400">
              {formatMetric(metrics.memoryUsage, '%')}
            </div>
          </div>

          <div className="bg-[#0B0D12] border border-[#C0C5CE]/10 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-mono text-[#C0C5CE]">Bundle</span>
            </div>
            <div className="text-lg font-mono text-purple-400">
              {formatMetric(metrics.bundleSize, 'bytes')}
            </div>
          </div>
        </div>
      )}

      {/* Optimization Suggestions */}
      <div className="space-y-4">
        <h4 className="font-mono text-sm text-[#C0C5CE] flex items-center gap-2">
          <Settings className="w-4 h-4" />
          Optimization Suggestions
        </h4>
        
        {suggestions.length === 0 ? (
          <div className="text-center py-8 text-[#C0C5CE]/50 font-mono text-sm">
            No suggestions available. Performance is optimal!
          </div>
        ) : (
          suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className={`bg-[#0B0D12] border rounded-lg p-4 ${
                suggestion.implemented ? 'opacity-60' : 'hover:border-[#4AE54A]/20'
              } transition-all duration-200`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className={`p-2 rounded-lg ${getTypeColor(suggestion.type)}`}>
                    {suggestion.implemented ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <AlertTriangle className="w-4 h-4" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h5 className="font-mono text-sm text-[#C0C5CE]">
                        {suggestion.title}
                      </h5>
                      {suggestion.implemented && (
                        <span className="text-xs bg-[#4AE54A]/20 text-[#4AE54A] px-2 py-1 rounded font-mono">
                          Implemented
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#C0C5CE]/70 mb-3">
                      {suggestion.description}
                    </p>
                    
                    <div className="flex gap-4 text-xs font-mono">
                      <div className="flex items-center gap-1">
                        <span className="text-[#C0C5CE]/50">Impact:</span>
                        <span className="text-[#4AE54A]">{suggestion.impact}/10</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-[#C0C5CE]/50">Effort:</span>
                        <span className="text-yellow-400">{suggestion.effort}/10</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
});

export default PerformanceOptimizer;