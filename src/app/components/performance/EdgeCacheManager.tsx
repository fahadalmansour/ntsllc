import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { useLanguage } from '../../contexts/LanguageContext';
import { RTLContainer } from '../LanguageSwitcher';
import { 
  Zap, 
  Globe, 
  RefreshCw, 
  TrendingUp, 
  Server, 
  Clock,
  Database,
  Network,
  BarChart3,
  Settings
} from 'lucide-react';

interface CacheRegion {
  id: string;
  name: string;
  location: string;
  hitRate: number;
  latency: number;
  storage: number;
  maxStorage: number;
  status: 'active' | 'degraded' | 'offline';
  lastUpdate: Date;
}

interface CacheMetrics {
  globalHitRate: number;
  totalRequests: number;
  cacheMisses: number;
  totalStorage: number;
  averageLatency: number;
  bandwidth: number;
}

export default function EdgeCacheManager({ onNavigate }: { onNavigate?: (section: string) => void }) {
  const { isRTL, language } = useLanguage();
  const [cacheRegions, setCacheRegions] = useState<CacheRegion[]>([
    {
      id: 'us-east',
      name: 'US East (Virginia)',
      location: 'Virginia, USA',
      hitRate: 94.8,
      latency: 12,
      storage: 847,
      maxStorage: 1024,
      status: 'active',
      lastUpdate: new Date()
    },
    {
      id: 'gcc-dubai',
      name: 'GCC Central (Dubai)',
      location: 'Dubai, UAE',
      hitRate: 91.2,
      latency: 18,
      storage: 623,
      maxStorage: 1024,
      status: 'active',
      lastUpdate: new Date()
    },
    {
      id: 'us-west',
      name: 'US West (Oregon)',
      location: 'Oregon, USA',
      hitRate: 89.4,
      latency: 15,
      storage: 512,
      maxStorage: 1024,
      status: 'active',
      lastUpdate: new Date()
    },
    {
      id: 'eu-central',
      name: 'EU Central (Frankfurt)',
      location: 'Frankfurt, Germany',
      hitRate: 87.6,
      latency: 22,
      storage: 734,
      maxStorage: 1024,
      status: 'degraded',
      lastUpdate: new Date()
    }
  ]);

  const [globalMetrics, setGlobalMetrics] = useState<CacheMetrics>({
    globalHitRate: 90.8,
    totalRequests: 1247832,
    cacheMisses: 114859,
    totalStorage: 2716,
    averageLatency: 16.8,
    bandwidth: 847.3
  });

  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(30);

  // Simulate real-time updates
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      setCacheRegions(prev => prev.map(region => ({
        ...region,
        hitRate: Math.max(85, Math.min(98, region.hitRate + (Math.random() - 0.5) * 2)),
        latency: Math.max(8, Math.min(50, region.latency + (Math.random() - 0.5) * 4)),
        storage: Math.max(100, Math.min(region.maxStorage * 0.95, region.storage + (Math.random() - 0.5) * 20)),
        lastUpdate: new Date()
      })));

      setGlobalMetrics(prev => ({
        ...prev,
        globalHitRate: Math.max(85, Math.min(98, prev.globalHitRate + (Math.random() - 0.5) * 1)),
        totalRequests: prev.totalRequests + Math.floor(Math.random() * 100),
        averageLatency: Math.max(10, Math.min(30, prev.averageLatency + (Math.random() - 0.5) * 2)),
        bandwidth: Math.max(500, Math.min(1200, prev.bandwidth + (Math.random() - 0.5) * 50))
      }));
    }, refreshInterval * 1000);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval]);

  const handlePurgeCache = useCallback((regionId: string) => {
    setCacheRegions(prev => prev.map(region => 
      region.id === regionId 
        ? { ...region, storage: 0, hitRate: 0, lastUpdate: new Date() }
        : region
    ));
  }, []);

  const handlePrewarmCache = useCallback((regionId: string) => {
    setCacheRegions(prev => prev.map(region => 
      region.id === regionId 
        ? { ...region, storage: region.maxStorage * 0.6, hitRate: 95, lastUpdate: new Date() }
        : region
    ));
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]/30';
      case 'degraded': return 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30';
      case 'offline': return 'bg-red-400/20 text-red-400 border-red-400/30';
      default: return 'bg-[#C0C5CE]/20 text-[#C0C5CE] border-[#C0C5CE]/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return '🟢';
      case 'degraded': return '🟡';
      case 'offline': return '🔴';
      default: return '⚪';
    }
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
              <Zap className="w-8 h-8 text-[#00d4ff]" />
              <div>
                <h1 className="text-3xl font-bold text-[#C0C5CE]">
                  {language === 'ar' ? 'إدارة ذاكرة التخزين المؤقت' : 'Edge Cache Manager'}
                </h1>
                <p className="text-[#C0C5CE]/80 text-lg">
                  {language === 'ar' 
                    ? 'مراقبة وإدارة شبكة CDN العالمية'
                    : 'Monitor and manage global CDN network'
                  }
                </p>
              </div>
            </div>
            
            <div className="neo-flex-start neo-space-sm">
              <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse"></div>
              <span className="text-[#00ff88] text-sm font-mono">
                {language === 'ar' ? 'متصل' : 'Live'}
              </span>
            </div>
          </div>

          {/* Global Metrics Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <BarChart3 className="w-5 h-5 text-[#00d4ff]" />
                <Badge className={getStatusColor('active')}>
                  {globalMetrics.globalHitRate.toFixed(1)}%
                </Badge>
              </div>
              <div className="neo-dashboard-widget-value">
                {globalMetrics.globalHitRate.toFixed(1)}%
              </div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">
                {language === 'ar' ? 'معدل النجاح العالمي' : 'Global Hit Rate'}
              </div>
            </Card>

            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <Globe className="w-5 h-5 text-[#00ff88]" />
                <Badge className="bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]/30">
                  +{Math.floor(Math.random() * 1000)}
                </Badge>
              </div>
              <div className="neo-dashboard-widget-value">
                {(globalMetrics.totalRequests / 1000000).toFixed(2)}M
              </div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">
                {language === 'ar' ? 'إجمالي الطلبات' : 'Total Requests'}
              </div>
            </Card>

            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <Clock className="w-5 h-5 text-[#00d4ff]" />
                <Badge className="bg-[#00d4ff]/20 text-[#00d4ff] border-[#00d4ff]/30">
                  {globalMetrics.averageLatency.toFixed(1)}ms
                </Badge>
              </div>
              <div className="neo-dashboard-widget-value">
                {globalMetrics.averageLatency.toFixed(0)}ms
              </div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">
                {language === 'ar' ? 'متوسط زمن الاستجابة' : 'Avg Latency'}
              </div>
            </Card>

            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <Database className="w-5 h-5 text-[#00ff88]" />
                <Badge className="bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]/30">
                  {((globalMetrics.totalStorage / 4096) * 100).toFixed(0)}%
                </Badge>
              </div>
              <div className="neo-dashboard-widget-value">
                {(globalMetrics.totalStorage / 1024).toFixed(1)}GB
              </div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">
                {language === 'ar' ? 'إجمالي التخزين' : 'Total Storage'}
              </div>
            </Card>

            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <Network className="w-5 h-5 text-[#00d4ff]" />
                <Badge className="bg-[#00d4ff]/20 text-[#00d4ff] border-[#00d4ff]/30">
                  Live
                </Badge>
              </div>
              <div className="neo-dashboard-widget-value">
                {globalMetrics.bandwidth.toFixed(0)}
              </div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">
                {language === 'ar' ? 'عرض النطاق (Mbps)' : 'Bandwidth (Mbps)'}
              </div>
            </Card>

            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <Server className="w-5 h-5 text-[#00ff88]" />
                <Badge className="bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]/30">
                  {cacheRegions.filter(r => r.status === 'active').length}/4
                </Badge>
              </div>
              <div className="neo-dashboard-widget-value">
                {cacheRegions.filter(r => r.status === 'active').length}
              </div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">
                {language === 'ar' ? 'المناطق النشطة' : 'Active Regions'}
              </div>
            </Card>
          </div>

          {/* Controls */}
          <div className="neo-flex-between mb-6">
            <div className="neo-flex-start neo-space-md">
              <Button 
                className="neo-button-primary"
                onClick={() => setCacheRegions(prev => prev.map(r => ({ ...r, lastUpdate: new Date() })))}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                {language === 'ar' ? 'تحديث البيانات' : 'Refresh Data'}
              </Button>
              
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
              </div>
            </div>

            <div className="neo-flex-start neo-space-sm">
              <Settings className="w-4 h-4 text-[#C0C5CE]/70" />
              <select
                value={refreshInterval}
                onChange={(e) => setRefreshInterval(parseInt(e.target.value))}
                className="neo-form-select"
              >
                <option value={10}>10s</option>
                <option value={30}>30s</option>
                <option value={60}>1m</option>
                <option value={300}>5m</option>
              </select>
            </div>
          </div>

          {/* Regional Cache Status */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {cacheRegions.map((region) => (
              <Card key={region.id} className="neo-interactive-card">
                <div className="p-6">
                  {/* Region Header */}
                  <div className="neo-flex-between mb-4">
                    <div className="neo-flex-start neo-space-md">
                      <div className="text-2xl">
                        {getStatusIcon(region.status)}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-[#C0C5CE] font-mono">
                          {region.name}
                        </h3>
                        <p className="text-[#C0C5CE]/70 text-sm font-mono">
                          {region.location}
                        </p>
                      </div>
                    </div>
                    
                    <Badge className={getStatusColor(region.status)}>
                      {language === 'ar' ? 
                        (region.status === 'active' ? 'نشط' : 
                         region.status === 'degraded' ? 'متدهور' : 'غير متصل') :
                        region.status.charAt(0).toUpperCase() + region.status.slice(1)
                      }
                    </Badge>
                  </div>

                  {/* Metrics */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <div className="neo-flex-between mb-2">
                        <span className="text-[#C0C5CE]/70 text-sm font-mono">
                          {language === 'ar' ? 'معدل النجاح' : 'Hit Rate'}
                        </span>
                        <span className="text-[#00ff88] font-mono">
                          {region.hitRate.toFixed(1)}%
                        </span>
                      </div>
                      <Progress 
                        value={region.hitRate} 
                        className="h-2"
                      />
                    </div>

                    <div>
                      <div className="neo-flex-between mb-2">
                        <span className="text-[#C0C5CE]/70 text-sm font-mono">
                          {language === 'ar' ? 'استخدام التخزين' : 'Storage Usage'}
                        </span>
                        <span className="text-[#00d4ff] font-mono">
                          {region.storage}MB / {region.maxStorage}MB
                        </span>
                      </div>
                      <Progress 
                        value={(region.storage / region.maxStorage) * 100} 
                        className="h-2"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-[#C0C5CE]/70 font-mono">
                          {language === 'ar' ? 'زمن الاستجابة:' : 'Latency:'}
                        </span>
                        <div className="text-[#00ff88] font-mono font-semibold">
                          {region.latency}ms
                        </div>
                      </div>
                      <div>
                        <span className="text-[#C0C5CE]/70 font-mono">
                          {language === 'ar' ? 'آخر تحديث:' : 'Last Update:'}
                        </span>
                        <div className="text-[#00d4ff] font-mono font-semibold">
                          {region.lastUpdate.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="neo-flex-start neo-space-sm">
                    <Button 
                      className="neo-button-ghost text-xs"
                      onClick={() => handlePurgeCache(region.id)}
                    >
                      {language === 'ar' ? 'مسح التخزين' : 'Purge Cache'}
                    </Button>
                    <Button 
                      className="neo-button-outline text-xs"
                      onClick={() => handlePrewarmCache(region.id)}
                    >
                      {language === 'ar' ? 'تسخين مسبق' : 'Prewarm'}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Terminal Command Log */}
          <Card className="neo-card">
            <div className="p-6">
              <h3 className="text-[#00ff88] font-mono text-lg mb-4">
                {language === 'ar' ? 'سجل أوامر الذاكرة المؤقتة' : 'Cache Command Log'}
              </h3>
              
              <div className="bg-[#0B0D12] border border-[#00d4ff]/20 rounded-lg p-4 font-mono text-sm">
                <div className="space-y-2">
                  <div className="text-[#00ff88]">
                    neo@cache-manager:~$ cache status --global
                  </div>
                  <div className="text-[#C0C5CE]/80">
                    Global hit rate: {globalMetrics.globalHitRate.toFixed(1)}%<br/>
                    Active regions: {cacheRegions.filter(r => r.status === 'active').length}/4<br/>
                    Total storage: {(globalMetrics.totalStorage / 1024).toFixed(1)}GB<br/>
                    Average latency: {globalMetrics.averageLatency.toFixed(1)}ms
                  </div>
                  
                  <div className="text-[#00ff88] mt-4">
                    neo@cache-manager:~$ cache optimize --auto
                  </div>
                  <div className="text-[#C0C5CE]/80">
                    Optimizing cache distribution...<br/>
                    ✓ Regional balancing complete<br/>
                    ✓ TTL policies updated<br/>
                    ✓ Bandwidth allocation optimized
                  </div>
                  
                  <div className="text-[#00ff88] mt-4 neo-typing-cursor">
                    neo@cache-manager:~$ monitoring --live█
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