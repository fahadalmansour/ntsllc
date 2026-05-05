import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { useLanguage } from '../../contexts/LanguageContext';
import { RTLContainer } from '../LanguageSwitcher';
import { 
  Globe, 
  Zap,
  Shield,
  Key,
  Activity,
  BarChart3,
  Settings,
  Plus,
  Edit,
  Trash2,
  Copy,
  Eye,
  EyeOff,
  Clock,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Download,
  Upload,
  Database,
  Server,
  Network,
  Lock,
  Unlock,
  Terminal,
  Code,
  Search,
  Filter,
  FileText,
  Send,
  Cpu,
  HardDrive
} from 'lucide-react';

interface APIEndpoint {
  id: string;
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  name: string;
  description: string;
  version: string;
  status: 'active' | 'deprecated' | 'maintenance' | 'beta';
  authentication: 'none' | 'api-key' | 'oauth' | 'jwt';
  rateLimit: {
    requests: number;
    window: string;
  };
  responseTime: number;
  requests24h: number;
  successRate: number;
  errors24h: number;
  lastModified: Date;
  tags: string[];
}

interface APIKey {
  id: string;
  name: string;
  key: string;
  permissions: string[];
  rateLimits: {
    requests: number;
    window: string;
  };
  usage24h: number;
  lastUsed: Date;
  status: 'active' | 'expired' | 'revoked';
  expiresAt: Date;
  createdAt: Date;
}

interface TrafficMetrics {
  totalRequests: number;
  requestsPerSecond: number;
  averageResponseTime: number;
  errorRate: number;
  bandwidthUsed: number;
  activeConnections: number;
  cacheHitRate: number;
  uptime: number;
}

interface SecurityEvent {
  id: string;
  type: 'authentication_failure' | 'rate_limit_exceeded' | 'suspicious_activity' | 'blocked_request';
  severity: 'low' | 'medium' | 'high' | 'critical';
  source: string;
  endpoint: string;
  timestamp: Date;
  details: string;
  action: 'blocked' | 'warned' | 'logged';
}

export default function EnterpriseAPIGateway({ onNavigate }: { onNavigate?: (section: string) => void }) {
  const { isRTL, language } = useLanguage();
  
  const [activeTab, setActiveTab] = useState<'endpoints' | 'keys' | 'analytics' | 'security' | 'docs'>('endpoints');
  const [showKeyValues, setShowKeyValues] = useState<Record<string, boolean>>({});
  
  const [apiEndpoints, setApiEndpoints] = useState<APIEndpoint[]>([
    {
      id: 'ep-001',
      path: '/api/v1/stores',
      method: 'GET',
      name: 'List Stores',
      description: 'Retrieve all e-commerce stores for authenticated user',
      version: 'v1.2.0',
      status: 'active',
      authentication: 'jwt',
      rateLimit: { requests: 1000, window: '1h' },
      responseTime: 145,
      requests24h: 8472,
      successRate: 99.7,
      errors24h: 23,
      lastModified: new Date('2024-09-20'),
      tags: ['stores', 'ecommerce', 'read']
    },
    {
      id: 'ep-002',
      path: '/api/v1/stores',
      method: 'POST',
      name: 'Create Store',
      description: 'Create a new e-commerce store with specified configuration',
      version: 'v1.2.0',
      status: 'active',
      authentication: 'jwt',
      rateLimit: { requests: 100, window: '1h' },
      responseTime: 2340,
      requests24h: 247,
      successRate: 98.9,
      errors24h: 3,
      lastModified: new Date('2024-09-18'),
      tags: ['stores', 'ecommerce', 'write']
    },
    {
      id: 'ep-003',
      path: '/api/v1/analytics/revenue',
      method: 'GET',
      name: 'Revenue Analytics',
      description: 'Retrieve revenue analytics and performance metrics',
      version: 'v1.1.0',
      status: 'active',
      authentication: 'api-key',
      rateLimit: { requests: 500, window: '1h' },
      responseTime: 678,
      requests24h: 1847,
      successRate: 99.2,
      errors24h: 15,
      lastModified: new Date('2024-09-15'),
      tags: ['analytics', 'revenue', 'metrics']
    },
    {
      id: 'ep-004',
      path: '/api/v1/automations/n8n',
      method: 'POST',
      name: 'Create N8N Workflow',
      description: 'Create and deploy N8N automation workflows',
      version: 'v2.0.0-beta',
      status: 'beta',
      authentication: 'oauth',
      rateLimit: { requests: 50, window: '1h' },
      responseTime: 3450,
      requests24h: 89,
      successRate: 97.8,
      errors24h: 2,
      lastModified: new Date('2024-09-22'),
      tags: ['automation', 'n8n', 'workflow']
    }
  ]);

  const [apiKeys, setApiKeys] = useState<APIKey[]>([
    {
      id: 'key-001',
      name: 'Production Frontend',
      key: 'neotech_pk_live_7f8a9b2c3d4e5f6g7h8i9j0k1l2m3n4o',
      permissions: ['stores:read', 'analytics:read', 'users:read'],
      rateLimits: { requests: 10000, window: '1h' },
      usage24h: 8472,
      lastUsed: new Date(),
      status: 'active',
      expiresAt: new Date('2025-09-24'),
      createdAt: new Date('2024-01-15')
    },
    {
      id: 'key-002',
      name: 'Mobile App',
      key: 'neotech_pk_live_1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p',
      permissions: ['stores:read', 'stores:write', 'analytics:read'],
      rateLimits: { requests: 5000, window: '1h' },
      usage24h: 2847,
      lastUsed: new Date(Date.now() - 300000),
      status: 'active',
      expiresAt: new Date('2025-06-15'),
      createdAt: new Date('2024-03-20')
    },
    {
      id: 'key-003',
      name: 'Analytics Service',
      key: 'neotech_pk_live_9z8y7x6w5v4u3t2s1r0q9p8o7n6m5l4k',
      permissions: ['analytics:read', 'analytics:write'],
      rateLimits: { requests: 2000, window: '1h' },
      usage24h: 1247,
      lastUsed: new Date(Date.now() - 1800000),
      status: 'active',
      expiresAt: new Date('2025-12-31'),
      createdAt: new Date('2024-05-10')
    }
  ]);

  const [trafficMetrics, setTrafficMetrics] = useState<TrafficMetrics>({
    totalRequests: 124573,
    requestsPerSecond: 45.7,
    averageResponseTime: 234,
    errorRate: 0.8,
    bandwidthUsed: 847.3,
    activeConnections: 2847,
    cacheHitRate: 87.4,
    uptime: 99.97
  });

  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([
    {
      id: 'sec-001',
      type: 'rate_limit_exceeded',
      severity: 'medium',
      source: '203.145.67.89',
      endpoint: '/api/v1/stores',
      timestamp: new Date(Date.now() - 300000),
      details: 'Client exceeded rate limit of 1000 requests/hour',
      action: 'blocked'
    },
    {
      id: 'sec-002',
      type: 'authentication_failure',
      severity: 'high',
      source: '91.203.45.12',
      endpoint: '/api/v1/analytics/revenue',
      timestamp: new Date(Date.now() - 600000),
      details: 'Multiple failed authentication attempts with invalid API key',
      action: 'blocked'
    },
    {
      id: 'sec-003',
      type: 'suspicious_activity',
      severity: 'low',
      source: '185.47.92.34',
      endpoint: '/api/v1/automations/n8n',
      timestamp: new Date(Date.now() - 900000),
      details: 'Unusual request pattern detected from this IP',
      action: 'logged'
    }
  ]);

  // Real-time updates simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setTrafficMetrics(prev => ({
        ...prev,
        totalRequests: prev.totalRequests + Math.floor(Math.random() * 10),
        requestsPerSecond: Math.max(10, prev.requestsPerSecond + (Math.random() - 0.5) * 5),
        averageResponseTime: Math.max(100, prev.averageResponseTime + (Math.random() - 0.5) * 20),
        activeConnections: Math.max(1000, prev.activeConnections + Math.floor((Math.random() - 0.5) * 100))
      }));

      setApiEndpoints(prev => prev.map(endpoint => ({
        ...endpoint,
        requests24h: endpoint.requests24h + Math.floor(Math.random() * 5),
        responseTime: Math.max(50, endpoint.responseTime + (Math.random() - 0.5) * 20)
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]/30';
      case 'deprecated': return 'bg-red-400/20 text-red-400 border-red-400/30';
      case 'maintenance': return 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30';
      case 'beta': return 'bg-[#00d4ff]/20 text-[#00d4ff] border-[#00d4ff]/30';
      case 'expired': case 'revoked': return 'bg-red-400/20 text-red-400 border-red-400/30';
      default: return 'bg-[#C0C5CE]/20 text-[#C0C5CE] border-[#C0C5CE]/30';
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]/30';
      case 'POST': return 'bg-[#00d4ff]/20 text-[#00d4ff] border-[#00d4ff]/30';
      case 'PUT': return 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30';
      case 'DELETE': return 'bg-red-400/20 text-red-400 border-red-400/30';
      case 'PATCH': return 'bg-purple-400/20 text-purple-400 border-purple-400/30';
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

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const toggleKeyVisibility = (keyId: string) => {
    setShowKeyValues(prev => ({ ...prev, [keyId]: !prev[keyId] }));
  };

  const maskApiKey = (key: string) => {
    return key.slice(0, 12) + '...' + key.slice(-8);
  };

  const renderEndpointsTab = () => (
    <div className="space-y-6">
      <div className="neo-flex-between">
        <h3 className="text-[#00ff88] font-mono text-xl">
          {language === 'ar' ? 'نقاط النهاية' : 'API Endpoints'}
        </h3>
        <div className="neo-flex-start neo-space-sm">
          <Search className="w-4 h-4 text-[#C0C5CE]/70" />
          <input
            type="text"
            placeholder={language === 'ar' ? 'البحث في النقاط...' : 'Search endpoints...'}
            className="neo-form-input w-64"
          />
          <Button className="neo-button-primary">
            <Plus className="w-4 h-4 mr-2" />
            {language === 'ar' ? 'إضافة' : 'Add Endpoint'}
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {apiEndpoints.map(endpoint => (
          <Card key={endpoint.id} className="neo-interactive-card">
            <div className="p-6">
              <div className="neo-flex-between mb-4">
                <div className="neo-flex-start neo-space-sm">
                  <Badge className={getMethodColor(endpoint.method)}>
                    {endpoint.method}
                  </Badge>
                  <div>
                    <div className="font-semibold text-[#C0C5CE]">
                      {endpoint.name}
                    </div>
                    <div className="text-sm text-[#00d4ff] font-mono">
                      {endpoint.path}
                    </div>
                  </div>
                </div>
                
                <div className="neo-flex-start neo-space-sm">
                  <Badge className={getStatusColor(endpoint.status)}>
                    {endpoint.status}
                  </Badge>
                  <Badge className="bg-[#C0C5CE]/10 text-[#C0C5CE] border-[#C0C5CE]/20">
                    {endpoint.version}
                  </Badge>
                </div>
              </div>

              <p className="text-[#C0C5CE]/80 text-sm mb-4">
                {endpoint.description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <div className="text-xs text-[#C0C5CE]/70">Response Time</div>
                  <div className={`text-sm font-semibold ${
                    endpoint.responseTime < 500 ? 'text-[#00ff88]' :
                    endpoint.responseTime < 1000 ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>
                    {endpoint.responseTime}ms
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[#C0C5CE]/70">24h Requests</div>
                  <div className="text-sm font-semibold text-[#00d4ff]">
                    {formatNumber(endpoint.requests24h)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[#C0C5CE]/70">Success Rate</div>
                  <div className="text-sm font-semibold text-[#00ff88]">
                    {endpoint.successRate}%
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[#C0C5CE]/70">Rate Limit</div>
                  <div className="text-sm font-semibold text-[#C0C5CE]">
                    {endpoint.rateLimit.requests}/{endpoint.rateLimit.window}
                  </div>
                </div>
              </div>

              <div className="neo-flex-between">
                <div className="neo-flex-start neo-space-sm">
                  <div className="flex flex-wrap gap-1">
                    {endpoint.tags.map(tag => (
                      <Badge key={tag} className="bg-[#00d4ff]/10 text-[#00d4ff] border-[#00d4ff]/20 text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="neo-flex-start neo-space-sm">
                  <Button className="neo-button-ghost text-sm">
                    <Eye className="w-3 h-3 mr-1" />
                    Test
                  </Button>
                  <Button className="neo-button-ghost text-sm">
                    <FileText className="w-3 h-3 mr-1" />
                    Docs
                  </Button>
                  <Button className="neo-button-ghost text-sm">
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderKeysTab = () => (
    <div className="space-y-6">
      <div className="neo-flex-between">
        <h3 className="text-[#00ff88] font-mono text-xl">
          {language === 'ar' ? 'مفاتيح API' : 'API Keys'}
        </h3>
        <Button className="neo-button-primary">
          <Plus className="w-4 h-4 mr-2" />
          {language === 'ar' ? 'إنشاء مفتاح' : 'Create Key'}
        </Button>
      </div>

      <div className="space-y-4">
        {apiKeys.map(apiKey => (
          <Card key={apiKey.id} className="neo-interactive-card">
            <div className="p-6">
              <div className="neo-flex-between mb-4">
                <div>
                  <div className="font-semibold text-[#C0C5CE] mb-1">
                    {apiKey.name}
                  </div>
                  <div className="text-sm text-[#C0C5CE]/70">
                    Created: {apiKey.createdAt.toLocaleDateString()}
                  </div>
                </div>
                
                <div className="neo-flex-start neo-space-sm">
                  <Badge className={getStatusColor(apiKey.status)}>
                    {apiKey.status}
                  </Badge>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-xs text-[#C0C5CE]/70 mb-2">API Key</div>
                <div className="neo-flex-start neo-space-sm">
                  <div className="neo-form-input flex-1 font-mono text-sm">
                    {showKeyValues[apiKey.id] ? apiKey.key : maskApiKey(apiKey.key)}
                  </div>
                  <Button 
                    className="neo-button-ghost"
                    onClick={() => toggleKeyVisibility(apiKey.id)}
                  >
                    {showKeyValues[apiKey.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  <Button className="neo-button-ghost">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <div className="text-xs text-[#C0C5CE]/70">Usage (24h)</div>
                  <div className="text-sm font-semibold text-[#00d4ff]">
                    {formatNumber(apiKey.usage24h)} / {formatNumber(apiKey.rateLimits.requests)}
                  </div>
                  <Progress 
                    value={(apiKey.usage24h / apiKey.rateLimits.requests) * 100} 
                    className="h-1 mt-1" 
                  />
                </div>
                <div>
                  <div className="text-xs text-[#C0C5CE]/70">Last Used</div>
                  <div className="text-sm font-semibold text-[#00ff88]">
                    {apiKey.lastUsed.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[#C0C5CE]/70">Expires</div>
                  <div className={`text-sm font-semibold ${
                    apiKey.expiresAt > new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) 
                      ? 'text-[#00ff88]' 
                      : 'text-yellow-400'
                  }`}>
                    {apiKey.expiresAt.toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-xs text-[#C0C5CE]/70 mb-2">Permissions</div>
                <div className="flex flex-wrap gap-1">
                  {apiKey.permissions.map(permission => (
                    <Badge key={permission} className="bg-[#00ff88]/10 text-[#00ff88] border-[#00ff88]/20 text-xs">
                      {permission}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="neo-flex-end neo-space-sm">
                <Button className="neo-button-outline text-sm">
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                <Button className="neo-button-ghost text-sm">
                  <RefreshCw className="w-3 h-3 mr-1" />
                  Regenerate
                </Button>
                <Button className="neo-button-error text-sm">
                  <Trash2 className="w-3 h-3 mr-1" />
                  Revoke
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderAnalyticsTab = () => (
    <div className="space-y-6">
      {/* Traffic Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="neo-dashboard-widget">
          <div className="neo-dashboard-widget-header">
            <Activity className="w-5 h-5 text-[#00d4ff]" />
            <Badge className="bg-[#00d4ff]/20 text-[#00d4ff] border-[#00d4ff]/30">
              {trafficMetrics.requestsPerSecond.toFixed(1)}/s
            </Badge>
          </div>
          <div className="neo-dashboard-widget-value">
            {formatNumber(trafficMetrics.totalRequests)}
          </div>
          <div className="text-[#C0C5CE]/70 font-mono text-sm">
            {language === 'ar' ? 'إجمالي الطلبات' : 'Total Requests'}
          </div>
        </Card>

        <Card className="neo-dashboard-widget">
          <div className="neo-dashboard-widget-header">
            <Clock className="w-5 h-5 text-[#00ff88]" />
            <Badge className="bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]/30">
              Good
            </Badge>
          </div>
          <div className="neo-dashboard-widget-value">
            {trafficMetrics.averageResponseTime}ms
          </div>
          <div className="text-[#C0C5CE]/70 font-mono text-sm">
            {language === 'ar' ? 'متوسط الاستجابة' : 'Avg Response Time'}
          </div>
        </Card>

        <Card className="neo-dashboard-widget">
          <div className="neo-dashboard-widget-header">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
            <Badge className="bg-yellow-400/20 text-yellow-400 border-yellow-400/30">
              {trafficMetrics.errorRate}%
            </Badge>
          </div>
          <div className="neo-dashboard-widget-value">
            {trafficMetrics.errorRate}%
          </div>
          <div className="text-[#C0C5CE]/70 font-mono text-sm">
            {language === 'ar' ? 'معدل الأخطاء' : 'Error Rate'}
          </div>
        </Card>

        <Card className="neo-dashboard-widget">
          <div className="neo-dashboard-widget-header">
            <Users className="w-5 h-5 text-[#00d4ff]" />
            <Badge className="bg-[#00d4ff]/20 text-[#00d4ff] border-[#00d4ff]/30">
              Live
            </Badge>
          </div>
          <div className="neo-dashboard-widget-value">
            {formatNumber(trafficMetrics.activeConnections)}
          </div>
          <div className="text-[#C0C5CE]/70 font-mono text-sm">
            {language === 'ar' ? 'الاتصالات النشطة' : 'Active Connections'}
          </div>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="neo-card">
          <div className="p-6">
            <h4 className="text-[#00ff88] font-mono text-lg mb-4">
              {language === 'ar' ? 'مقاييس الأداء' : 'Performance Metrics'}
            </h4>
            
            <div className="space-y-4">
              <div>
                <div className="neo-flex-between text-sm mb-2">
                  <span className="text-[#C0C5CE]/70">Cache Hit Rate:</span>
                  <span className="text-[#00ff88]">{trafficMetrics.cacheHitRate}%</span>
                </div>
                <Progress value={trafficMetrics.cacheHitRate} className="h-2" />
              </div>
              
              <div>
                <div className="neo-flex-between text-sm mb-2">
                  <span className="text-[#C0C5CE]/70">Bandwidth Used:</span>
                  <span className="text-[#00d4ff]">{trafficMetrics.bandwidthUsed} MB/s</span>
                </div>
                <Progress value={(trafficMetrics.bandwidthUsed / 1000) * 100} className="h-2" />
              </div>
              
              <div>
                <div className="neo-flex-between text-sm mb-2">
                  <span className="text-[#C0C5CE]/70">System Uptime:</span>
                  <span className="text-[#00ff88]">{trafficMetrics.uptime}%</span>
                </div>
                <Progress value={trafficMetrics.uptime} className="h-2" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="neo-card">
          <div className="p-6">
            <h4 className="text-[#00ff88] font-mono text-lg mb-4">
              {language === 'ar' ? 'أكثر النقاط استخداماً' : 'Top Endpoints'}
            </h4>
            
            <div className="space-y-3">
              {apiEndpoints
                .sort((a, b) => b.requests24h - a.requests24h)
                .slice(0, 5)
                .map(endpoint => (
                  <div key={endpoint.id} className="neo-flex-between">
                    <div>
                      <div className="text-sm font-semibold text-[#C0C5CE]">
                        {endpoint.method} {endpoint.path}
                      </div>
                      <div className="text-xs text-[#C0C5CE]/70">
                        {endpoint.name}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-[#00d4ff]">
                        {formatNumber(endpoint.requests24h)}
                      </div>
                      <div className="text-xs text-[#00ff88]">
                        {endpoint.successRate}% success
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#C0C5CE] font-mono">
      {/* Terminal grid background */}
      <div className="fixed inset-0 enterprise-grid opacity-10 pointer-events-none"></div>
      
      <RTLContainer className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className={`space-y-8 ${isRTL ? 'text-right' : 'text-left'}`}>
          
          {/* Header */}
          <div className="neo-flex-between mb-8">
            <div className="neo-flex-start neo-space-md">
              <Globe className="w-8 h-8 text-[#00d4ff]" />
              <div>
                <h1 className="text-3xl font-bold text-[#C0C5CE]">
                  {language === 'ar' ? 'بوابة API المؤسسية' : 'Enterprise API Gateway'}
                </h1>
                <p className="text-[#C0C5CE]/80 text-lg">
                  {language === 'ar' 
                    ? 'إدارة شاملة لواجهات برمجة التطبيقات والأمان'
                    : 'Comprehensive API management, security & analytics'
                  }
                </p>
              </div>
            </div>
            
            <div className="neo-flex-start neo-space-sm">
              <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse"></div>
              <span className="text-[#00ff88] text-sm font-mono">
                {apiEndpoints.filter(e => e.status === 'active').length} {language === 'ar' ? 'نشط' : 'Active'}
              </span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="neo-flex-start neo-space-sm mb-8">
            {[
              { key: 'endpoints', label: language === 'ar' ? 'النقاط' : 'Endpoints', icon: Globe },
              { key: 'keys', label: language === 'ar' ? 'المفاتيح' : 'API Keys', icon: Key },
              { key: 'analytics', label: language === 'ar' ? 'التحليلات' : 'Analytics', icon: BarChart3 },
              { key: 'security', label: language === 'ar' ? 'الأمان' : 'Security', icon: Shield }
            ].map(({ key, label, icon: Icon }) => (
              <Button
                key={key}
                className={`${
                  activeTab === key 
                    ? 'neo-button-primary' 
                    : 'neo-button-ghost'
                } neo-flex-start neo-space-xs`}
                onClick={() => setActiveTab(key as any)}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'endpoints' && renderEndpointsTab()}
          {activeTab === 'keys' && renderKeysTab()}
          {activeTab === 'analytics' && renderAnalyticsTab()}

          {/* Security Events */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <h3 className="text-[#00ff88] font-mono text-xl">
                {language === 'ar' ? 'أحداث الأمان' : 'Security Events'}
              </h3>

              <div className="space-y-4">
                {securityEvents.map(event => (
                  <Card key={event.id} className="neo-interactive-card">
                    <div className="p-4">
                      <div className="neo-flex-between mb-3">
                        <div className="neo-flex-start neo-space-sm">
                          <Shield className="w-4 h-4 text-red-400" />
                          <div>
                            <div className="font-semibold text-[#C0C5CE] text-sm">
                              {event.type.replace('_', ' ').toUpperCase()}
                            </div>
                            <div className="text-xs text-[#C0C5CE]/70">
                              {event.source} → {event.endpoint}
                            </div>
                          </div>
                        </div>
                        
                        <div className="neo-flex-start neo-space-xs">
                          <Badge className={getSeverityColor(event.severity)}>
                            {event.severity}
                          </Badge>
                          <Badge className={
                            event.action === 'blocked' ? 'bg-red-400/20 text-red-400 border-red-400/30' :
                            event.action === 'warned' ? 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30' :
                            'bg-[#00d4ff]/20 text-[#00d4ff] border-[#00d4ff]/30'
                          }>
                            {event.action}
                          </Badge>
                        </div>
                      </div>

                      <p className="text-[#C0C5CE]/80 text-sm mb-2">
                        {event.details}
                      </p>

                      <div className="text-xs text-[#C0C5CE]/60">
                        {event.timestamp.toLocaleString()}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* API Gateway Terminal */}
          <Card className="neo-card">
            <div className="p-6">
              <div className="neo-flex-between mb-4">
                <div className="neo-flex-start neo-space-sm">
                  <Terminal className="w-5 h-5 text-[#00d4ff]" />
                  <h3 className="text-[#00ff88] font-mono text-lg">
                    {language === 'ar' ? 'مركز أوامر البوابة' : 'API Gateway Command Center'}
                  </h3>
                </div>
                <Badge className="bg-[#00d4ff]/20 text-[#00d4ff] border-[#00d4ff]/30">
                  <Zap className="w-3 h-3 mr-1" />
                  {language === 'ar' ? 'نشط' : 'Active'}
                </Badge>
              </div>
              
              <div className="bg-[#0B0D12] border border-[#00d4ff]/20 rounded-lg p-4 font-mono text-sm">
                <div className="space-y-2">
                  <div className="text-[#00ff88]">
                    neo@api-gateway:~$ status --endpoints --traffic --security
                  </div>
                  <div className="text-[#C0C5CE]/80">
                    🌐 API Gateway Status: Operational<br/>
                    📡 Active Endpoints: {apiEndpoints.filter(e => e.status === 'active').length}/{apiEndpoints.length}<br/>
                    🔑 API Keys: {apiKeys.filter(k => k.status === 'active').length} active<br/>
                    📊 Traffic: {trafficMetrics.requestsPerSecond.toFixed(1)} req/s<br/>
                    ⚡ Response Time: {trafficMetrics.averageResponseTime}ms avg<br/>
                    🛡️ Security Events: {securityEvents.filter(e => e.severity === 'high' || e.severity === 'critical').length} high priority
                  </div>
                  
                  <div className="text-[#00ff88] mt-4">
                    neo@api-gateway:~$ monitor --rate-limiting --authentication --caching
                  </div>
                  <div className="text-[#C0C5CE]/80">
                    🚦 Rate Limiting: Active (per-key limits enforced)<br/>
                    🔐 Authentication: JWT + API Key validation<br/>
                    💾 Cache Hit Rate: {trafficMetrics.cacheHitRate}%<br/>
                    🔄 Auto-scaling: Enabled (threshold: 80% CPU)<br/>
                    📈 Load Balancing: Round-robin across 4 instances
                  </div>
                  
                  <div className="text-[#00ff88] mt-4">
                    neo@api-gateway:~$ optimize --performance --security --reliability
                  </div>
                  <div className="text-[#C0C5CE]/80">
                    ⚡ Performance optimization: Background cache warming<br/>
                    🛡️ Security scanning: Real-time threat detection<br/>
                    🔄 Health checks: All endpoints responding normally<br/>
                    📊 Analytics: Real-time metrics collection active
                  </div>
                  
                  <div className="text-[#00ff88] mt-4 neo-typing-cursor">
                    neo@api-gateway:~$ serve --enterprise-grade --24x7█
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