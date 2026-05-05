import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Code, 
  Key, 
  Activity, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  Database, 
  Globe,
  Lock,
  Unlock,
  Copy,
  RefreshCw,
  Eye,
  EyeOff,
  Download,
  Settings,
  BarChart3,
  Zap,
  Shield,
  AlertTriangle,
  Plus,
  Trash2,
  Edit,
  ExternalLink
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { useAuth } from '../contexts/AuthContext';

interface APIKey {
  id: string;
  name: string;
  key: string;
  permissions: string[];
  rateLimitRequests: number;
  rateLimitPeriod: 'hour' | 'day' | 'month';
  status: 'active' | 'inactive' | 'revoked';
  createdAt: Date;
  lastUsed: Date;
  usage: {
    requests: number;
    bandwidth: number;
    errors: number;
  };
  environment: 'development' | 'staging' | 'production';
}

interface APIEndpoint {
  id: string;
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  description: string;
  category: string;
  authentication: 'none' | 'api-key' | 'oauth' | 'jwt';
  rateLimited: boolean;
  status: 'active' | 'deprecated' | 'beta';
  responseTime: number;
  successRate: number;
  usage: number;
  documentation: string;
}

interface APIAnalytics {
  totalRequests: number;
  successfulRequests: number;
  errorRequests: number;
  averageResponseTime: number;
  uniqueUsers: number;
  topEndpoints: { endpoint: string; requests: number }[];
  errorBreakdown: { code: number; count: number; message: string }[];
  geographicDistribution: { country: string; requests: number }[];
  timeSeriesData: { timestamp: Date; requests: number; errors: number }[];
}

export function APIManagement() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedKey, setSelectedKey] = useState<APIKey | null>(null);
  const [showCreateKey, setShowCreateKey] = useState(false);
  const [showKeyValue, setShowKeyValue] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState('24h');

  // Mock data - in real implementation, this would come from your API
  const apiKeys: APIKey[] = [
    {
      id: '1',
      name: 'Production Dashboard',
      key: 'neotech_pk_live_1234567890abcdef',
      permissions: ['read', 'write', 'analytics'],
      rateLimitRequests: 10000,
      rateLimitPeriod: 'hour',
      status: 'active',
      createdAt: new Date('2024-01-15'),
      lastUsed: new Date(),
      usage: {
        requests: 8750,
        bandwidth: 125.6,
        errors: 23
      },
      environment: 'production'
    },
    {
      id: '2',
      name: 'Development Testing',
      key: 'neotech_sk_test_abcdef1234567890',
      permissions: ['read', 'write'],
      rateLimitRequests: 1000,
      rateLimitPeriod: 'hour',
      status: 'active',
      createdAt: new Date('2024-02-01'),
      lastUsed: new Date(Date.now() - 3600000),
      usage: {
        requests: 234,
        bandwidth: 12.3,
        errors: 5
      },
      environment: 'development'
    },
    {
      id: '3',
      name: 'Analytics Service',
      key: 'neotech_pk_analytics_fedcba0987654321',
      permissions: ['read', 'analytics'],
      rateLimitRequests: 5000,
      rateLimitPeriod: 'day',
      status: 'inactive',
      createdAt: new Date('2023-12-20'),
      lastUsed: new Date(Date.now() - 86400000 * 7),
      usage: {
        requests: 0,
        bandwidth: 0,
        errors: 0
      },
      environment: 'staging'
    }
  ];

  const apiEndpoints: APIEndpoint[] = [
    {
      id: '1',
      path: '/api/v1/analytics/dashboard',
      method: 'GET',
      description: 'Get dashboard analytics data',
      category: 'Analytics',
      authentication: 'api-key',
      rateLimited: true,
      status: 'active',
      responseTime: 147,
      successRate: 99.2,
      usage: 15420,
      documentation: '/docs/analytics/dashboard'
    },
    {
      id: '2',
      path: '/api/v1/projects',
      method: 'POST',
      description: 'Create new project',
      category: 'Projects',
      authentication: 'jwt',
      rateLimited: true,
      status: 'active',
      responseTime: 234,
      successRate: 97.8,
      usage: 8934,
      documentation: '/docs/projects/create'
    },
    {
      id: '3',
      path: '/api/v1/users/profile',
      method: 'GET',
      description: 'Get user profile information',
      category: 'Users',
      authentication: 'oauth',
      rateLimited: false,
      status: 'active',
      responseTime: 89,
      successRate: 99.8,
      usage: 23567,
      documentation: '/docs/users/profile'
    },
    {
      id: '4',
      path: '/api/v1/ai/generate',
      method: 'POST',
      description: 'Generate AI content',
      category: 'AI Services',
      authentication: 'api-key',
      rateLimited: true,
      status: 'beta',
      responseTime: 1247,
      successRate: 94.5,
      usage: 3421,
      documentation: '/docs/ai/generate'
    }
  ];

  const analytics: APIAnalytics = {
    totalRequests: 124567,
    successfulRequests: 121234,
    errorRequests: 3333,
    averageResponseTime: 245,
    uniqueUsers: 1847,
    topEndpoints: [
      { endpoint: '/api/v1/users/profile', requests: 23567 },
      { endpoint: '/api/v1/analytics/dashboard', requests: 15420 },
      { endpoint: '/api/v1/projects', requests: 8934 },
      { endpoint: '/api/v1/ai/generate', requests: 3421 }
    ],
    errorBreakdown: [
      { code: 404, count: 1234, message: 'Not Found' },
      { code: 500, count: 867, message: 'Internal Server Error' },
      { code: 403, count: 654, message: 'Forbidden' },
      { code: 429, count: 578, message: 'Rate Limited' }
    ],
    geographicDistribution: [
      { country: 'United States', requests: 45678 },
      { country: 'Canada', requests: 23456 },
      { country: 'United Kingdom', requests: 15432 },
      { country: 'Germany', requests: 12345 },
      { country: 'Australia', requests: 8765 }
    ],
    timeSeriesData: [] // Would contain actual time series data
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const generateAPIKey = () => {
    const prefix = 'neotech_pk_live_';
    const key = prefix + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    return key;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400';
      case 'inactive': return 'bg-yellow-500/20 text-yellow-400';
      case 'revoked': return 'bg-red-500/20 text-red-400';
      case 'beta': return 'bg-blue-500/20 text-blue-400';
      case 'deprecated': return 'bg-gray-500/20 text-gray-400';
      default: return 'bg-[#C0C5CE]/20 text-[#C0C5CE]';
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-blue-500/20 text-blue-400';
      case 'POST': return 'bg-green-500/20 text-green-400';
      case 'PUT': return 'bg-yellow-500/20 text-yellow-400';
      case 'DELETE': return 'bg-red-500/20 text-red-400';
      case 'PATCH': return 'bg-purple-500/20 text-purple-400';
      default: return 'bg-[#C0C5CE]/20 text-[#C0C5CE]';
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#0B0D12] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Code className="w-8 h-8 text-[#4AE54A] mr-3" />
            <div>
              <h1 className="text-[#C0C5CE] font-mono text-2xl mb-2">API Management</h1>
              <div className="flex items-center text-[#C0C5CE]/70 font-mono text-sm">
                <span className="text-[#4AE54A] mr-2">{'>'}</span>
                <span>Enterprise API gateway and analytics platform</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32 bg-[#12151C] border-[#C0C5CE]/20 text-[#C0C5CE] font-mono">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">Last Hour</SelectItem>
                <SelectItem value="24h">Last 24h</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
              </SelectContent>
            </Select>

            <Button
              onClick={() => setShowCreateKey(true)}
              className="bg-[#4AE54A] text-[#0B0D12] hover:bg-[#4AE54A]/90 font-mono"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create API Key
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-[#12151C] border-[#C0C5CE]/20 grid grid-cols-4 w-full">
            <TabsTrigger value="overview" className="font-mono">Overview</TabsTrigger>
            <TabsTrigger value="keys" className="font-mono">API Keys</TabsTrigger>
            <TabsTrigger value="endpoints" className="font-mono">Endpoints</TabsTrigger>
            <TabsTrigger value="analytics" className="font-mono">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                {
                  title: 'Total Requests',
                  value: analytics.totalRequests.toLocaleString(),
                  change: '+12.5%',
                  icon: <Activity className="w-6 h-6" />
                },
                {
                  title: 'Success Rate',
                  value: `${((analytics.successfulRequests / analytics.totalRequests) * 100).toFixed(1)}%`,
                  change: '+0.3%',
                  icon: <CheckCircle className="w-6 h-6" />
                },
                {
                  title: 'Avg Response Time',
                  value: `${analytics.averageResponseTime}ms`,
                  change: '-5.2%',
                  icon: <Clock className="w-6 h-6" />
                },
                {
                  title: 'Unique Users',
                  value: analytics.uniqueUsers.toLocaleString(),
                  change: '+8.7%',
                  icon: <Database className="w-6 h-6" />
                }
              ].map((metric, index) => (
                <motion.div
                  key={metric.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-[#12151C] border-[#C0C5CE]/20 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-[#4AE54A]">{metric.icon}</div>
                      <span className="text-green-400 font-mono text-sm">{metric.change}</span>
                    </div>
                    <div className="text-2xl font-mono text-[#C0C5CE] mb-1">{metric.value}</div>
                    <div className="text-[#C0C5CE]/70 font-mono text-sm">{metric.title}</div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Real-time Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-[#12151C] border-[#C0C5CE]/20 p-6">
                <h3 className="text-[#4AE54A] font-mono text-lg mb-6">Top Endpoints</h3>
                <div className="space-y-4">
                  {analytics.topEndpoints.map((endpoint) => (
                    <div key={endpoint.endpoint} className="flex items-center justify-between">
                      <span className="text-[#C0C5CE] font-mono text-sm truncate">
                        {endpoint.endpoint}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="text-[#4AE54A] font-mono text-sm">
                          {endpoint.requests.toLocaleString()}
                        </span>
                        <div className="w-20 h-2 bg-[#C0C5CE]/20 rounded-full">
                          <div 
                            className="h-2 bg-[#4AE54A] rounded-full"
                            style={{ width: `${(endpoint.requests / analytics.topEndpoints[0].requests) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="bg-[#12151C] border-[#C0C5CE]/20 p-6">
                <h3 className="text-[#4AE54A] font-mono text-lg mb-6">Error Breakdown</h3>
                <div className="space-y-4">
                  {analytics.errorBreakdown.map((error) => (
                    <div key={error.code} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant="secondary" 
                          className={`font-mono text-xs ${
                            error.code >= 500 ? 'bg-red-500/20 text-red-400' : 
                            error.code >= 400 ? 'bg-yellow-500/20 text-yellow-400' : 
                            'bg-blue-500/20 text-blue-400'
                          }`}
                        >
                          {error.code}
                        </Badge>
                        <span className="text-[#C0C5CE] font-mono text-sm">{error.message}</span>
                      </div>
                      <span className="text-[#4AE54A] font-mono text-sm">{error.count}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* API Keys Tab */}
          <TabsContent value="keys">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {apiKeys.map((key) => (
                <motion.div
                  key={key.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-[#12151C] border border-[#C0C5CE]/20 rounded-lg p-6 hover:border-[#4AE54A]/50 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[#4AE54A] font-mono text-lg">{key.name}</h3>
                    <Badge variant="secondary" className={`font-mono text-xs ${getStatusColor(key.status)}`}>
                      {key.status}
                    </Badge>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm font-mono">
                      <span className="text-[#C0C5CE]/70">Environment:</span>
                      <span className="text-[#C0C5CE]">{key.environment}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm font-mono">
                      <span className="text-[#C0C5CE]/70">Rate Limit:</span>
                      <span className="text-[#C0C5CE]">{key.rateLimitRequests.toLocaleString()}/{key.rateLimitPeriod}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm font-mono">
                      <span className="text-[#C0C5CE]/70">Last Used:</span>
                      <span className="text-[#C0C5CE]">{key.lastUsed.toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Usage Statistics */}
                  <div className="bg-[#0B0D12] border border-[#C0C5CE]/20 rounded p-3 mb-4">
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <div className="text-[#4AE54A] font-mono text-lg">{key.usage.requests.toLocaleString()}</div>
                        <div className="text-[#C0C5CE]/70 font-mono text-xs">Requests</div>
                      </div>
                      <div>
                        <div className="text-[#4AE54A] font-mono text-lg">{key.usage.bandwidth.toFixed(1)}MB</div>
                        <div className="text-[#C0C5CE]/70 font-mono text-xs">Bandwidth</div>
                      </div>
                      <div>
                        <div className="text-[#4AE54A] font-mono text-lg">{key.usage.errors}</div>
                        <div className="text-[#C0C5CE]/70 font-mono text-xs">Errors</div>
                      </div>
                    </div>
                  </div>

                  {/* API Key Display */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[#C0C5CE]/70 font-mono text-xs">API Key</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowKeyValue(showKeyValue === key.id ? null : key.id)}
                        className="text-[#C0C5CE] hover:text-[#4AE54A] p-1"
                      >
                        {showKeyValue === key.id ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      </Button>
                    </div>
                    <div className="bg-[#0B0D12] border border-[#C0C5CE]/20 rounded p-2 flex items-center justify-between">
                      <code className="text-[#C0C5CE] font-mono text-xs">
                        {showKeyValue === key.id ? key.key : '••••••••••••••••••••••••••••••••'}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(key.key)}
                        className="text-[#C0C5CE] hover:text-[#4AE54A] p-1"
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[#C0C5CE] hover:text-[#4AE54A] font-mono flex-1"
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[#C0C5CE] hover:text-red-400 font-mono"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Endpoints Tab */}
          <TabsContent value="endpoints">
            <div className="space-y-4">
              {apiEndpoints.map((endpoint) => (
                <motion.div
                  key={endpoint.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#12151C] border border-[#C0C5CE]/20 rounded-lg p-6 hover:border-[#4AE54A]/50 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <Badge variant="secondary" className={`font-mono text-xs ${getMethodColor(endpoint.method)}`}>
                        {endpoint.method}
                      </Badge>
                      <code className="text-[#4AE54A] font-mono text-lg">{endpoint.path}</code>
                      <Badge variant="secondary" className={`font-mono text-xs ${getStatusColor(endpoint.status)}`}>
                        {endpoint.status}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(endpoint.documentation, '_blank')}
                        className="text-[#C0C5CE] hover:text-[#4AE54A] font-mono"
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Docs
                      </Button>
                    </div>
                  </div>

                  <p className="text-[#C0C5CE] font-mono text-sm mb-4">{endpoint.description}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-[#4AE54A] font-mono text-lg">{endpoint.responseTime}ms</div>
                      <div className="text-[#C0C5CE]/70 font-mono text-xs">Response Time</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[#4AE54A] font-mono text-lg">{endpoint.successRate}%</div>
                      <div className="text-[#C0C5CE]/70 font-mono text-xs">Success Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[#4AE54A] font-mono text-lg">{endpoint.usage.toLocaleString()}</div>
                      <div className="text-[#C0C5CE]/70 font-mono text-xs">Total Calls</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1">
                        {endpoint.authentication === 'none' ? (
                          <Unlock className="w-4 h-4 text-yellow-400" />
                        ) : (
                          <Lock className="w-4 h-4 text-green-400" />
                        )}
                      </div>
                      <div className="text-[#C0C5CE]/70 font-mono text-xs">{endpoint.authentication}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-xs font-mono text-[#C0C5CE]/70">
                    <span>Category: {endpoint.category}</span>
                    <span>•</span>
                    <span>Rate Limited: {endpoint.rateLimited ? 'Yes' : 'No'}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-[#12151C] border-[#C0C5CE]/20 p-6">
                <h3 className="text-[#4AE54A] font-mono text-lg mb-6">Geographic Distribution</h3>
                <div className="space-y-4">
                  {analytics.geographicDistribution.map((location) => (
                    <div key={location.country} className="flex items-center justify-between">
                      <span className="text-[#C0C5CE] font-mono text-sm">{location.country}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-[#C0C5CE]/20 rounded-full">
                          <div 
                            className="h-2 bg-[#4AE54A] rounded-full"
                            style={{ width: `${(location.requests / analytics.geographicDistribution[0].requests) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-[#4AE54A] font-mono text-sm min-w-[60px] text-right">
                          {location.requests.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="bg-[#12151C] border-[#C0C5CE]/20 p-6">
                <h3 className="text-[#4AE54A] font-mono text-lg mb-6">Performance Metrics</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[#C0C5CE] font-mono text-sm">API Uptime</span>
                      <span className="text-[#4AE54A] font-mono text-sm">99.97%</span>
                    </div>
                    <Progress value={99.97} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[#C0C5CE] font-mono text-sm">Cache Hit Rate</span>
                      <span className="text-[#4AE54A] font-mono text-sm">87.3%</span>
                    </div>
                    <Progress value={87.3} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[#C0C5CE] font-mono text-sm">Rate Limit Usage</span>
                      <span className="text-yellow-400 font-mono text-sm">67.2%</span>
                    </div>
                    <Progress value={67.2} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[#C0C5CE] font-mono text-sm">Error Rate</span>
                      <span className="text-red-400 font-mono text-sm">2.7%</span>
                    </div>
                    <Progress value={2.7} className="h-2" />
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default APIManagement;