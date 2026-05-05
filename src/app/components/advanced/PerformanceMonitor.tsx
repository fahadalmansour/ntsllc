import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Zap, Clock, AlertTriangle, TrendingUp, Cpu, Database, Globe2, Wifi, Shield } from 'lucide-react';

interface PerformanceMetrics {
  pageLoadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  firstInputDelay: number;
  cumulativeLayoutShift: number;
  timeToInteractive: number;
  navigationTiming: PerformanceNavigationTiming | null;
  resourceTimings: PerformanceResourceTiming[];
  memoryUsage?: any;
  connectionInfo?: any;
  vitals: {
    lcp: number;
    fid: number;
    cls: number;
  };
}

interface SystemHealth {
  cpu: number;
  memory: number;
  network: number;
  database: number;
  cache: number;
  api: number;
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [systemHealth, setSystemHealth] = useState<SystemHealth>({
    cpu: 0,
    memory: 0,
    network: 0,
    database: 0,
    cache: 0,
    api: 0
  });
  const [showDetails, setShowDetails] = useState(false);
  const [performanceScore, setPerformanceScore] = useState(0);

  const collectPerformanceMetrics = useCallback(() => {
    if (typeof window === 'undefined') return;

    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    
    // Core Web Vitals calculation
    const calculateVitals = () => {
      let lcp = 0;
      let fid = 0;
      let cls = 0;

      // LCP - Largest Contentful Paint
      if ('PerformanceObserver' in window) {
        try {
          new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            if (lastEntry) {
              lcp = lastEntry.startTime;
            }
          }).observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
          // Fallback for browsers that don't support LCP
          lcp = navigation ? navigation.loadEventEnd - navigation.fetchStart : 0;
        }
      }

      return { lcp, fid, cls };
    };

    const vitals = calculateVitals();
    
    const newMetrics: PerformanceMetrics = {
      pageLoadTime: navigation ? navigation.loadEventEnd - navigation.fetchStart : 0,
      firstContentfulPaint: navigation ? navigation.loadEventStart - navigation.fetchStart : 0,
      largestContentfulPaint: vitals.lcp,
      firstInputDelay: vitals.fid,
      cumulativeLayoutShift: vitals.cls,
      timeToInteractive: navigation ? navigation.domInteractive - navigation.fetchStart : 0,
      navigationTiming: navigation,
      resourceTimings: resources,
      memoryUsage: (performance as any).memory || null,
      connectionInfo: (navigator as any).connection || null,
      vitals
    };

    setMetrics(newMetrics);

    // Calculate performance score (Google Lighthouse style)
    const score = calculatePerformanceScore(newMetrics);
    setPerformanceScore(score);

  }, []);

  const calculatePerformanceScore = (metrics: PerformanceMetrics): number => {
    let score = 100;
    
    // LCP scoring (0-2.5s = good, 2.5-4s = needs improvement, >4s = poor)
    if (metrics.largestContentfulPaint > 4000) score -= 30;
    else if (metrics.largestContentfulPaint > 2500) score -= 15;
    
    // FID scoring (0-100ms = good, 100-300ms = needs improvement, >300ms = poor)
    if (metrics.firstInputDelay > 300) score -= 25;
    else if (metrics.firstInputDelay > 100) score -= 10;
    
    // CLS scoring (0-0.1 = good, 0.1-0.25 = needs improvement, >0.25 = poor)
    if (metrics.cumulativeLayoutShift > 0.25) score -= 20;
    else if (metrics.cumulativeLayoutShift > 0.1) score -= 10;
    
    // Page load time scoring
    if (metrics.pageLoadTime > 3000) score -= 15;
    else if (metrics.pageLoadTime > 1500) score -= 8;
    
    return Math.max(0, Math.round(score));
  };

  const simulateSystemHealth = useCallback(() => {
    // Simulate real-time system metrics
    setSystemHealth(prev => ({
      cpu: Math.max(10, Math.min(90, prev.cpu + (Math.random() - 0.5) * 10)),
      memory: Math.max(20, Math.min(85, prev.memory + (Math.random() - 0.5) * 8)),
      network: Math.max(70, Math.min(99, prev.network + (Math.random() - 0.5) * 5)),
      database: Math.max(80, Math.min(99, prev.database + (Math.random() - 0.5) * 3)),
      cache: Math.max(85, Math.min(99, prev.cache + (Math.random() - 0.5) * 4)),
      api: Math.max(75, Math.min(98, prev.api + (Math.random() - 0.5) * 6))
    }));
  }, []);

  useEffect(() => {
    // Initial metrics collection
    setTimeout(collectPerformanceMetrics, 1000);
    
    // Initialize system health
    setSystemHealth({
      cpu: 67,
      memory: 45,
      network: 94,
      database: 89,
      cache: 92,
      api: 87
    });

    // Update system health every 2 seconds
    const healthInterval = setInterval(simulateSystemHealth, 2000);
    
    // Collect metrics every 10 seconds
    const metricsInterval = setInterval(collectPerformanceMetrics, 10000);

    return () => {
      clearInterval(healthInterval);
      clearInterval(metricsInterval);
    };
  }, [collectPerformanceMetrics, simulateSystemHealth]);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getHealthColor = (value: number) => {
    if (value >= 90) return 'text-green-400';
    if (value >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (!metrics) {
    return (
      <div className="fixed bottom-4 right-4 bg-[#12151C] border border-[#C0C5CE]/20 rounded-lg p-3 z-50">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#4AE54A] border-t-transparent"></div>
          <span className="text-[#C0C5CE] font-mono text-sm">Collecting metrics...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Performance Score Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <div
          onClick={() => setShowDetails(!showDetails)}
          className="bg-[#12151C] border border-[#C0C5CE]/20 rounded-lg p-3 cursor-pointer hover:border-[#4AE54A]/50 transition-all duration-300 group"
        >
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-[#4AE54A]" />
              <span className="text-[#C0C5CE] font-mono text-sm">Performance</span>
            </div>
            <div className={`font-mono text-lg font-bold ${getScoreColor(performanceScore)}`}>
              {performanceScore}
            </div>
          </div>
          
          {/* Mini system health indicators */}
          <div className="flex items-center space-x-1 mt-2">
            <div className="flex items-center space-x-1">
              <div className={`w-2 h-2 rounded-full ${systemHealth.cpu > 80 ? 'bg-green-400' : systemHealth.cpu > 60 ? 'bg-yellow-400' : 'bg-red-400'}`}></div>
              <span className="text-[#C0C5CE]/70 font-mono text-xs">CPU</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className={`w-2 h-2 rounded-full ${systemHealth.network > 90 ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
              <span className="text-[#C0C5CE]/70 font-mono text-xs">NET</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className={`w-2 h-2 rounded-full ${systemHealth.database > 85 ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
              <span className="text-[#C0C5CE]/70 font-mono text-xs">DB</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Detailed Performance Panel */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            className="fixed top-4 right-4 w-96 bg-[#12151C] border border-[#C0C5CE]/20 rounded-lg p-6 z-50 max-h-[80vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-[#4AE54A]" />
                <h3 className="text-[#4AE54A] font-mono text-lg">Performance Monitor</h3>
              </div>
              <button
                onClick={() => setShowDetails(false)}
                className="text-[#C0C5CE]/70 hover:text-[#4AE54A] font-mono text-xl"
              >
                ×
              </button>
            </div>

            {/* Overall Score */}
            <div className="bg-[#0B0D12] border border-[#C0C5CE]/20 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#C0C5CE] font-mono text-sm">Performance Score</span>
                <div className={`font-mono text-2xl font-bold ${getScoreColor(performanceScore)}`}>
                  {performanceScore}/100
                </div>
              </div>
              <div className="w-full bg-[#C0C5CE]/20 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    performanceScore >= 90 ? 'bg-green-400' : 
                    performanceScore >= 70 ? 'bg-yellow-400' : 'bg-red-400'
                  }`}
                  style={{ width: `${performanceScore}%` }}
                ></div>
              </div>
            </div>

            {/* Core Web Vitals */}
            <div className="mb-6">
              <h4 className="text-[#4AE54A] font-mono text-sm mb-3">Core Web Vitals</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[#C0C5CE] font-mono text-xs">LCP (Largest Contentful Paint)</span>
                  <span className={`font-mono text-sm ${metrics.largestContentfulPaint < 2500 ? 'text-green-400' : 'text-yellow-400'}`}>
                    {(metrics.largestContentfulPaint / 1000).toFixed(2)}s
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#C0C5CE] font-mono text-xs">FID (First Input Delay)</span>
                  <span className={`font-mono text-sm ${metrics.firstInputDelay < 100 ? 'text-green-400' : 'text-yellow-400'}`}>
                    {metrics.firstInputDelay.toFixed(0)}ms
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#C0C5CE] font-mono text-xs">CLS (Cumulative Layout Shift)</span>
                  <span className={`font-mono text-sm ${metrics.cumulativeLayoutShift < 0.1 ? 'text-green-400' : 'text-yellow-400'}`}>
                    {metrics.cumulativeLayoutShift.toFixed(3)}
                  </span>
                </div>
              </div>
            </div>

            {/* System Health */}
            <div className="mb-6">
              <h4 className="text-[#4AE54A] font-mono text-sm mb-3">System Health</h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'CPU Usage', value: systemHealth.cpu, icon: Cpu },
                  { label: 'Memory', value: systemHealth.memory, icon: Database },
                  { label: 'Network', value: systemHealth.network, icon: Wifi },
                  { label: 'Database', value: systemHealth.database, icon: Database },
                  { label: 'Cache Hit', value: systemHealth.cache, icon: Zap },
                  { label: 'API Health', value: systemHealth.api, icon: Globe2 }
                ].map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={item.label} className="bg-[#0B0D12] border border-[#C0C5CE]/20 rounded p-3">
                      <div className="flex items-center justify-between mb-1">
                        <IconComponent className="w-3 h-3 text-[#4AE54A]" />
                        <span className={`font-mono text-sm ${getHealthColor(item.value)}`}>
                          {item.value.toFixed(0)}%
                        </span>
                      </div>
                      <div className="text-[#C0C5CE]/70 font-mono text-xs">{item.label}</div>
                      <div className="w-full bg-[#C0C5CE]/20 rounded-full h-1 mt-1">
                        <div
                          className={`h-1 rounded-full transition-all duration-500 ${
                            item.value >= 90 ? 'bg-green-400' : 
                            item.value >= 70 ? 'bg-yellow-400' : 'bg-red-400'
                          }`}
                          style={{ width: `${item.value}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Detailed Metrics */}
            <div>
              <h4 className="text-[#4AE54A] font-mono text-sm mb-3">Detailed Metrics</h4>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-[#C0C5CE]/70">Page Load Time</span>
                  <span className="text-[#C0C5CE]">{(metrics.pageLoadTime / 1000).toFixed(2)}s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#C0C5CE]/70">Time to Interactive</span>
                  <span className="text-[#C0C5CE]">{(metrics.timeToInteractive / 1000).toFixed(2)}s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#C0C5CE]/70">Resources Loaded</span>
                  <span className="text-[#C0C5CE]">{metrics.resourceTimings.length}</span>
                </div>
                {metrics.memoryUsage && (
                  <div className="flex justify-between">
                    <span className="text-[#C0C5CE]/70">JS Heap Size</span>
                    <span className="text-[#C0C5CE]">
                      {(metrics.memoryUsage.usedJSHeapSize / 1024 / 1024).toFixed(1)}MB
                    </span>
                  </div>
                )}
                {metrics.connectionInfo && (
                  <div className="flex justify-between">
                    <span className="text-[#C0C5CE]/70">Connection</span>
                    <span className="text-[#C0C5CE]">{metrics.connectionInfo.effectiveType}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2 mt-6 pt-4 border-t border-[#C0C5CE]/20">
              <button
                onClick={collectPerformanceMetrics}
                className="bg-[#4AE54A] text-[#0B0D12] px-3 py-1 rounded font-mono text-xs hover:bg-[#4AE54A]/90 transition-colors"
              >
                Refresh
              </button>
              <button className="border border-[#C0C5CE]/20 text-[#C0C5CE] px-3 py-1 rounded font-mono text-xs hover:border-[#4AE54A]/50 transition-colors">
                Export
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default PerformanceMonitor;