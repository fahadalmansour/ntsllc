import React, { useState } from 'react';
import { 
  ShoppingCart, Store, BarChart3, Package, Users, DollarSign, 
  Truck, Settings, Bell, Search, Filter, Plus, TrendingUp,
  Globe, Zap, Shield, Code, Database, Cpu
} from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { Input } from '../ui/input';

interface EcommerceMasterHubProps {
  onNavigate?: (section: string) => void;
}

export function EcommerceMasterHub({ onNavigate }: EcommerceMasterHubProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const dashboardMetrics = [
    { 
      label: 'Total Revenue', 
      value: '$127,450', 
      change: '+23.5%', 
      trend: 'up',
      icon: <DollarSign className="w-5 h-5" />,
      color: 'text-[#00ff88]'
    },
    { 
      label: 'Active Stores', 
      value: '47', 
      change: '+12%', 
      trend: 'up',
      icon: <Store className="w-5 h-5" />,
      color: 'text-[#00d4ff]'
    },
    { 
      label: 'Total Orders', 
      value: '2,847', 
      change: '+18.7%', 
      trend: 'up',
      icon: <ShoppingCart className="w-5 h-5" />,
      color: 'text-[#00ff88]'
    },
    { 
      label: 'Conversion Rate', 
      value: '4.2%', 
      change: '+0.8%', 
      trend: 'up',
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'text-[#00d4ff]'
    }
  ];

  const recentStores = [
    { name: 'Fashion Palace', platform: 'Shopify', status: 'Live', revenue: '$12,450', orders: 142 },
    { name: 'Tech Gadgets Pro', platform: 'WordPress', status: 'Live', revenue: '$8,920', orders: 89 },
    { name: 'Home Essentials', platform: 'Wix', status: 'Testing', revenue: '$5,670', orders: 67 },
    { name: 'Sports Zone', platform: 'Shopify', status: 'Live', revenue: '$15,230', orders: 203 }
  ];

  const platformStats = [
    { platform: 'Shopify', stores: 23, revenue: '$45,670', performance: 94 },
    { platform: 'WordPress', stores: 15, revenue: '$32,450', performance: 89 },
    { platform: 'Wix', stores: 7, revenue: '$18,890', performance: 87 },
    { platform: 'Zed', stores: 2, revenue: '$5,440', performance: 91 }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#C0C5CE] font-mono">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <ShoppingCart className="w-8 h-8 text-[#00ff88] mr-3" />
            <div>
              <h1 className="text-[#C0C5CE] text-2xl font-semibold mb-2">E-commerce Master Hub</h1>
              <div className="flex items-center text-[#C0C5CE]/70 text-sm">
                <span className="text-[#00ff88] mr-2">{'>'}</span>
                <span>Centralized control for all your e-commerce operations</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="outline" className="border-[#C0C5CE]/20 text-[#C0C5CE] hover:bg-[#00d4ff]/10 font-mono">
              <Bell className="w-4 h-4 mr-2" />
              Alerts
            </Button>
            <Button className="bg-[#00ff88] text-[#0a0a0a] hover:bg-[#00ff88]/90 font-semibold px-6 py-3">
              <Plus className="w-4 h-4 mr-2" />
              New Store
            </Button>
          </div>
        </div>

        {/* Dashboard Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardMetrics.map((metric, index) => (
            <Card key={index} className="bg-[#12151C] border-[#C0C5CE]/20 p-6 hover:border-[#00ff88]/50 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className={`${metric.color}`}>{metric.icon}</div>
                <span className={`text-sm font-semibold ${
                  metric.trend === 'up' ? 'text-[#00ff88]' : 'text-red-400'
                }`}>
                  {metric.change}
                </span>
              </div>
              <div className="text-2xl font-bold text-[#C0C5CE] mb-1">{metric.value}</div>
              <div className="text-[#C0C5CE]/70 text-sm">{metric.label}</div>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-[#12151C] p-1">
            <TabsTrigger value="overview" className="text-[#C0C5CE] data-[state=active]:bg-[#00ff88] data-[state=active]:text-[#0a0a0a] font-mono text-sm">
              Overview
            </TabsTrigger>
            <TabsTrigger value="stores" className="text-[#C0C5CE] data-[state=active]:bg-[#00ff88] data-[state=active]:text-[#0a0a0a] font-mono text-sm">
              Stores
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-[#C0C5CE] data-[state=active]:bg-[#00ff88] data-[state=active]:text-[#0a0a0a] font-mono text-sm">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="platforms" className="text-[#C0C5CE] data-[state=active]:bg-[#00ff88] data-[state=active]:text-[#0a0a0a] font-mono text-sm">
              Platforms
            </TabsTrigger>
            <TabsTrigger value="tools" className="text-[#C0C5CE] data-[state=active]:bg-[#00ff88] data-[state=active]:text-[#0a0a0a] font-mono text-sm">
              Tools
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Activity */}
              <div className="lg:col-span-2">
                <Card className="bg-[#12151C] border-[#C0C5CE]/20 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-[#00ff88] text-lg font-semibold">Recent Stores</h3>
                    <Button size="sm" variant="outline" className="border-[#C0C5CE]/20 text-[#C0C5CE] font-mono">
                      View All
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {recentStores.map((store, index) => (
                      <div key={index} className="bg-[#0B0D12] border border-[#C0C5CE]/20 rounded-lg p-4 hover:border-[#00ff88]/50 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <Store className="w-5 h-5 text-[#00d4ff]" />
                            <div>
                              <h4 className="text-[#C0C5CE] font-semibold">{store.name}</h4>
                              <p className="text-[#C0C5CE]/70 text-sm">{store.platform}</p>
                            </div>
                          </div>
                          <Badge variant="secondary" className={`font-mono text-xs ${
                            store.status === 'Live' ? 'bg-[#00ff88]/20 text-[#00ff88]' : 'bg-yellow-400/20 text-yellow-400'
                          }`}>
                            {store.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="text-[#C0C5CE]/70 text-sm">Revenue: </span>
                            <span className="text-[#00ff88] font-semibold">{store.revenue}</span>
                          </div>
                          <div>
                            <span className="text-[#C0C5CE]/70 text-sm">Orders: </span>
                            <span className="text-[#00d4ff] font-semibold">{store.orders}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Quick Actions */}
              <div>
                <Card className="bg-[#12151C] border-[#C0C5CE]/20 p-6 mb-6">
                  <h3 className="text-[#00ff88] text-lg font-semibold mb-4">Quick Actions</h3>
                  
                  <div className="space-y-3">
                    {[
                      { icon: <Plus className="w-4 h-4" />, label: 'Create New Store', action: 'store-builder' },
                      { icon: <BarChart3 className="w-4 h-4" />, label: 'View Analytics', action: 'analytics' },
                      { icon: <Code className="w-4 h-4" />, label: 'Code Analysis', action: 'code-analyzer' },
                      { icon: <Settings className="w-4 h-4" />, label: 'Platform Settings', action: 'settings' }
                    ].map((action, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="w-full justify-start border-[#C0C5CE]/20 text-[#C0C5CE] hover:bg-[#00ff88]/10 hover:border-[#00ff88]/50 font-mono"
                        onClick={() => onNavigate?.(action.action)}
                      >
                        {action.icon}
                        <span className="ml-2">{action.label}</span>
                      </Button>
                    ))}
                  </div>
                </Card>

                <Card className="bg-[#12151C] border-[#C0C5CE]/20 p-6">
                  <h3 className="text-[#00ff88] text-lg font-semibold mb-4">System Status</h3>
                  
                  <div className="space-y-3">
                    {[
                      { service: 'API Gateway', status: 'Operational', uptime: '99.9%' },
                      { service: 'Payment Processing', status: 'Operational', uptime: '99.8%' },
                      { service: 'CDN Network', status: 'Operational', uptime: '100%' },
                      { service: 'AI Services', status: 'Operational', uptime: '99.7%' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-[#00ff88] rounded-full"></div>
                          <span className="text-[#C0C5CE] text-sm">{item.service}</span>
                        </div>
                        <span className="text-[#00d4ff] text-sm font-semibold">{item.uptime}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="stores" className="space-y-6">
            <Card className="bg-[#12151C] border-[#C0C5CE]/20 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[#00ff88] text-lg font-semibold">Store Management</h3>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#C0C5CE]/50 w-4 h-4" />
                    <Input 
                      placeholder="Search stores..."
                      className="bg-[#0B0D12] border-[#C0C5CE]/20 text-[#C0C5CE] pl-10 font-mono w-64"
                    />
                  </div>
                  <Button size="sm" variant="outline" className="border-[#C0C5CE]/20 text-[#C0C5CE] font-mono">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recentStores.concat([
                  { name: 'Electronics Hub', platform: 'Shopify', status: 'Live', revenue: '$9,870', orders: 156 },
                  { name: 'Beauty Corner', platform: 'WordPress', status: 'Live', revenue: '$7,450', orders: 89 },
                  { name: 'Book Store Online', platform: 'Wix', status: 'Development', revenue: '$0', orders: 0 }
                ]).map((store, index) => (
                  <Card key={index} className="bg-[#0B0D12] border-[#C0C5CE]/20 p-4 hover:border-[#00ff88]/50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Store className="w-4 h-4 text-[#00d4ff]" />
                        <h4 className="text-[#C0C5CE] font-semibold text-sm">{store.name}</h4>
                      </div>
                      <Badge variant="secondary" className={`font-mono text-xs ${
                        store.status === 'Live' ? 'bg-[#00ff88]/20 text-[#00ff88]' : 
                        store.status === 'Testing' ? 'bg-yellow-400/20 text-yellow-400' :
                        'bg-[#C0C5CE]/20 text-[#C0C5CE]'
                      }`}>
                        {store.status}
                      </Badge>
                    </div>
                    
                    <div className="text-[#C0C5CE]/70 text-xs mb-3">Platform: {store.platform}</div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-[#C0C5CE]/70 text-xs">Revenue</span>
                        <span className="text-[#00ff88] text-xs font-semibold">{store.revenue}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#C0C5CE]/70 text-xs">Orders</span>
                        <span className="text-[#00d4ff] text-xs font-semibold">{store.orders}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 mt-4">
                      <Button size="sm" className="bg-[#00d4ff] text-[#0a0a0a] hover:bg-[#00d4ff]/90 font-mono text-xs flex-1">
                        Manage
                      </Button>
                      <Button size="sm" variant="outline" className="border-[#C0C5CE]/20 text-[#C0C5CE] font-mono text-xs">
                        <Settings className="w-3 h-3" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="platforms" className="space-y-6">
            <Card className="bg-[#12151C] border-[#C0C5CE]/20 p-6">
              <h3 className="text-[#00ff88] text-lg font-semibold mb-6">Platform Performance</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {platformStats.map((platform, index) => (
                  <div key={index} className="bg-[#0B0D12] border border-[#C0C5CE]/20 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-[#C0C5CE] font-semibold text-lg">{platform.platform}</h4>
                      <Badge variant="secondary" className="bg-[#00ff88]/20 text-[#00ff88] font-mono text-xs">
                        {platform.stores} stores
                      </Badge>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-[#C0C5CE]/70">Total Revenue</span>
                        <span className="text-[#00ff88] font-semibold">{platform.revenue}</span>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-[#C0C5CE]/70">Performance Score</span>
                          <span className="text-[#00d4ff] font-semibold">{platform.performance}%</span>
                        </div>
                        <Progress value={platform.performance} className="h-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { 
                  icon: <Code className="w-8 h-8" />, 
                  title: 'Code Analyzer', 
                  description: 'AI-powered code analysis and debugging',
                  action: 'code-analyzer'
                },
                { 
                  icon: <Store className="w-8 h-8" />, 
                  title: 'Store Builder', 
                  description: 'Create new e-commerce stores in minutes',
                  action: 'store-builder'
                },
                { 
                  icon: <Cpu className="w-8 h-8" />, 
                  title: 'AI Assistant', 
                  description: 'Get intelligent help with development',
                  action: 'ai-assistant'
                },
                { 
                  icon: <Database className="w-8 h-8" />, 
                  title: 'Content Manager', 
                  description: 'Manage all your content from one place',
                  action: 'content-manager'
                },
                { 
                  icon: <BarChart3 className="w-8 h-8" />, 
                  title: 'Analytics Hub', 
                  description: 'Comprehensive performance analytics',
                  action: 'analytics'
                },
                { 
                  icon: <Shield className="w-8 h-8" />, 
                  title: 'Security Center', 
                  description: 'Monitor and manage security settings',
                  action: 'security'
                }
              ].map((tool, index) => (
                <Card key={index} className="bg-[#12151C] border-[#C0C5CE]/20 p-6 hover:border-[#00ff88]/50 transition-colors cursor-pointer group">
                  <div 
                    onClick={() => onNavigate?.(tool.action)}
                    className="text-center"
                  >
                    <div className="text-[#00ff88] mb-4 flex justify-center group-hover:text-[#00d4ff] transition-colors">
                      {tool.icon}
                    </div>
                    <h3 className="text-[#C0C5CE] font-semibold mb-2">{tool.title}</h3>
                    <p className="text-[#C0C5CE]/70 text-sm mb-4">{tool.description}</p>
                    <Button size="sm" className="bg-[#00d4ff] text-[#0a0a0a] hover:bg-[#00d4ff]/90 font-mono">
                      Launch Tool
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="bg-[#12151C] border-[#C0C5CE]/20 p-8 text-center">
              <BarChart3 className="w-16 h-16 text-[#C0C5CE]/50 mx-auto mb-4" />
              <h3 className="text-[#C0C5CE] text-xl font-semibold mb-2">Advanced Analytics</h3>
              <p className="text-[#C0C5CE]/70 font-mono mb-6 max-w-2xl mx-auto">
                Comprehensive analytics and reporting for all your e-commerce platforms. 
                Track performance, monitor trends, and optimize your business.
              </p>
              <Button 
                className="bg-[#00ff88] text-[#0a0a0a] hover:bg-[#00ff88]/90 font-semibold px-6 py-3"
                onClick={() => onNavigate?.('analytics')}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Open Analytics Dashboard
              </Button>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default EcommerceMasterHub;