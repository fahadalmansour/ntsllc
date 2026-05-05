import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Input } from '../ui/input';
import { Select } from '../ui/select';
import { 
  Store, 
  Zap, 
  Code, 
  BarChart3, 
  Search, 
  Palette, 
  ShoppingCart, 
  CreditCard, 
  Globe, 
  Smartphone,
  Monitor,
  Rocket,
  Shield,
  Brain,
  CheckCircle,
  AlertTriangle,
  Clock,
  Users,
  DollarSign,
  TrendingUp,
  Settings,
  Plus,
  ArrowRight,
  Star,
  Play,
  Download,
  Upload,
  RefreshCw,
  Target,
  Award,
  Sparkles
} from 'lucide-react';

interface StoreData {
  id: string;
  name: string;
  platform: 'wordpress' | 'shopify' | 'wix' | 'custom';
  status: 'active' | 'building' | 'analyzing' | 'optimizing';
  performance: number;
  sales: number;
  visitors: number;
  lastUpdated: string;
  issues: number;
  optimizations: number;
}

interface PlatformIntegration {
  name: string;
  platform: string;
  status: 'connected' | 'disconnected' | 'syncing';
  stores: number;
  icon: React.ComponentType<any>;
  color: string;
}

const EcommercePlatform = () => {
  const [selectedStore, setSelectedStore] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [buildProgress, setBuildProgress] = useState(0);

  const [userStores, setUserStores] = useState<StoreData[]>([
    {
      id: '1',
      name: 'TechGadgets Pro',
      platform: 'shopify',
      status: 'active',
      performance: 87,
      sales: 15420,
      visitors: 2340,
      lastUpdated: '2 hours ago',
      issues: 2,
      optimizations: 8
    },
    {
      id: '2', 
      name: 'Fashion Boutique',
      platform: 'wordpress',
      status: 'optimizing',
      performance: 73,
      sales: 8920,
      visitors: 1890,
      lastUpdated: '1 day ago',
      issues: 5,
      optimizations: 3
    },
    {
      id: '3',
      name: 'Organic Foods',
      platform: 'wix',
      status: 'analyzing',
      performance: 65,
      sales: 5680,
      visitors: 980,
      lastUpdated: '3 hours ago',
      issues: 8,
      optimizations: 1
    }
  ]);

  const [platformIntegrations] = useState<PlatformIntegration[]>([
    {
      name: 'Shopify',
      platform: 'shopify',
      status: 'connected',
      stores: 1,
      icon: ShoppingCart,
      color: '#4AE54A'
    },
    {
      name: 'WordPress + WooCommerce', 
      platform: 'wordpress',
      status: 'connected',
      stores: 1,
      icon: Globe,
      color: '#4AE54A'
    },
    {
      name: 'Wix',
      platform: 'wix', 
      status: 'connected',
      stores: 1,
      icon: Palette,
      color: '#4AE54A'
    },
    {
      name: 'Custom Platform',
      platform: 'custom',
      status: 'disconnected',
      stores: 0,
      icon: Code,
      color: '#C0C5CE'
    }
  ]);

  const [aiInsights] = useState([
    {
      type: 'Performance',
      message: 'Your Shopify store can load 34% faster with image optimization',
      severity: 'medium',
      action: 'Optimize Images',
      impact: '+34% Speed'
    },
    {
      type: 'SEO',
      message: 'Missing meta descriptions on 12 product pages',
      severity: 'high',
      action: 'Fix SEO',
      impact: '+67% Visibility'
    },
    {
      type: 'Conversion',
      message: 'Add trust badges to increase conversion rate',
      severity: 'medium', 
      action: 'Add Badges',
      impact: '+23% Conversions'
    },
    {
      type: 'Security',
      message: 'SSL certificate expires in 30 days',
      severity: 'low',
      action: 'Renew SSL',
      impact: 'Maintain Trust'
    }
  ]);

  // Simulate store analysis
  const analyzeStore = async (storeId: string) => {
    setIsAnalyzing(true);
    setSelectedStore(storeId);
    
    // Simulate analysis progress
    for (let i = 0; i <= 100; i += 10) {
      setBuildProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    // Update store status
    setUserStores(prev => prev.map(store => 
      store.id === storeId 
        ? { ...store, status: 'active', performance: Math.min(100, store.performance + 15) }
        : store
    ));
    
    setIsAnalyzing(false);
    setBuildProgress(0);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-[#4AE54A] border-[#4AE54A]';
      case 'building': return 'text-blue-400 border-blue-400';
      case 'analyzing': return 'text-yellow-400 border-yellow-400';
      case 'optimizing': return 'text-orange-400 border-orange-400';
      default: return 'text-[#C0C5CE] border-[#C0C5CE]/50';
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'shopify': return ShoppingCart;
      case 'wordpress': return Globe;
      case 'wix': return Palette;
      default: return Code;
    }
  };

  const StoreCard = ({ store }: { store: StoreData }) => {
    const IconComponent = getPlatformIcon(store.platform);
    
    return (
      <Card className="bg-[#12151C] border-[#4AE54A]/20 card-hover-glow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-[#4AE54A]/10 rounded-lg">
                <IconComponent className="w-5 h-5 text-[#4AE54A]" />
              </div>
              <div>
                <h3 className="text-[#C0C5CE] font-mono font-medium">{store.name}</h3>
                <p className="text-[#C0C5CE]/60 font-mono text-sm capitalize">{store.platform}</p>
              </div>
            </div>
            <Badge variant="outline" className={`font-mono text-xs ${getStatusColor(store.status)}`}>
              {store.status.toUpperCase()}
            </Badge>
          </div>

          <div className="space-y-3 mb-4">
            <div className="flex justify-between text-sm font-mono">
              <span className="text-[#C0C5CE]/70">Performance</span>
              <span className="text-[#4AE54A]">{store.performance}%</span>
            </div>
            <Progress value={store.performance} className="h-2" />
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <div className="text-[#C0C5CE]/70 font-mono text-xs">Sales</div>
                <div className="text-[#4AE54A] font-mono text-sm">${store.sales.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-[#C0C5CE]/70 font-mono text-xs">Visitors</div>
                <div className="text-[#4AE54A] font-mono text-sm">{store.visitors.toLocaleString()}</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-xs font-mono text-[#C0C5CE]/60">
              {store.issues > 0 && (
                <div className="flex items-center space-x-1">
                  <AlertTriangle className="w-3 h-3 text-red-400" />
                  <span>{store.issues} issues</span>
                </div>
              )}
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-3 h-3 text-[#4AE54A]" />
                <span>{store.optimizations} optimized</span>
              </div>
            </div>
            <Button 
              size="sm" 
              variant="outline"
              className="border-[#4AE54A] text-[#4AE54A] hover:bg-[#4AE54A]/10 font-mono"
              onClick={() => analyzeStore(store.id)}
              disabled={isAnalyzing}
            >
              {isAnalyzing && selectedStore === store.id ? (
                <RefreshCw className="w-3 h-3 animate-spin" />
              ) : (
                'Analyze'
              )}
            </Button>
          </div>

          <div className="text-[#C0C5CE]/40 font-mono text-xs mt-2">
            Updated {store.lastUpdated}
          </div>
        </CardContent>
      </Card>
    );
  };

  const InsightCard = ({ insight }: { insight: any }) => {
    const getSeverityColor = (severity: string) => {
      switch (severity) {
        case 'high': return 'border-red-400 bg-red-400/10 text-red-400';
        case 'medium': return 'border-yellow-400 bg-yellow-400/10 text-yellow-400';
        case 'low': return 'border-blue-400 bg-blue-400/10 text-blue-400';
        default: return 'border-[#C0C5CE]/20 bg-[#C0C5CE]/10 text-[#C0C5CE]';
      }
    };

    return (
      <Card className={`border ${getSeverityColor(insight.severity)}`}>
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <Badge variant="outline" className="font-mono text-xs mb-2">
                {insight.type}
              </Badge>
              <p className="text-[#C0C5CE] font-mono text-sm">{insight.message}</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-[#C0C5CE]/60 font-mono text-xs">
              Impact: {insight.impact}
            </div>
            <Button size="sm" variant="outline" className="font-mono">
              {insight.action}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-[#0B0D12] terminal-theme p-6">
      <div className="max-w-[1400px] mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-mono text-[#4AE54A] mb-2 flex items-center">
              <Store className="w-8 h-8 mr-3" />
              E-commerce Command Center
            </h1>
            <p className="text-[#C0C5CE]/70 font-mono">Manage, optimize, and scale your online stores</p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="border-[#4AE54A] text-[#4AE54A] font-mono neural-pulse">
              {userStores.length} Stores Active
            </Badge>
            <Button className="bg-[#4AE54A] text-[#0B0D12] hover:bg-[#4AE54A]/90 font-mono">
              <Plus className="w-4 h-4 mr-2" />
              Add Store
            </Button>
          </div>
        </div>

        {/* Analysis Progress */}
        {isAnalyzing && (
          <Card className="bg-[#12151C] border-yellow-400/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <RefreshCw className="w-6 h-6 text-yellow-400 animate-spin" />
                <div>
                  <h3 className="text-yellow-400 font-mono font-medium">AI Analysis in Progress</h3>
                  <p className="text-[#C0C5CE]/70 font-mono text-sm">Deep scanning your e-commerce store...</p>
                </div>
              </div>
              <Progress value={buildProgress} className="h-3" />
              <p className="text-[#C0C5CE]/60 font-mono text-sm mt-2">{buildProgress}% Complete</p>
            </CardContent>
          </Card>
        )}

        {/* Platform Integrations */}
        <Card className="bg-[#12151C] border-[#4AE54A]/20">
          <CardHeader>
            <CardTitle className="text-[#4AE54A] font-mono">Platform Integrations</CardTitle>
            <CardDescription className="text-[#C0C5CE]/70 font-mono">
              Connected e-commerce platforms and management tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {platformIntegrations.map((integration) => {
                const IconComponent = integration.icon;
                return (
                  <div key={integration.platform} className="border border-[#4AE54A]/20 rounded-lg p-4 hover:bg-[#4AE54A]/5 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <IconComponent className={`w-6 h-6`} style={{ color: integration.color }} />
                      <Badge variant="outline" className={`font-mono text-xs ${
                        integration.status === 'connected' ? 'border-[#4AE54A] text-[#4AE54A]' : 'border-[#C0C5CE]/50 text-[#C0C5CE]/50'
                      }`}>
                        {integration.status}
                      </Badge>
                    </div>
                    <h4 className="text-[#C0C5CE] font-mono font-medium text-sm mb-1">{integration.name}</h4>
                    <p className="text-[#C0C5CE]/60 font-mono text-xs">
                      {integration.stores} store{integration.stores !== 1 ? 's' : ''} connected
                    </p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Main Dashboard */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-[#12151C] border border-[#4AE54A]/20">
            <TabsTrigger value="overview" className="font-mono">Overview</TabsTrigger>
            <TabsTrigger value="stores" className="font-mono">My Stores</TabsTrigger>
            <TabsTrigger value="builder" className="font-mono">Store Builder</TabsTrigger>
            <TabsTrigger value="optimizer" className="font-mono">Code Optimizer</TabsTrigger>
            <TabsTrigger value="analytics" className="font-mono">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* AI Insights */}
            <Card className="bg-[#12151C] border-[#4AE54A]/20">
              <CardHeader>
                <CardTitle className="text-[#4AE54A] font-mono flex items-center">
                  <Brain className="w-5 h-5 mr-2" />
                  AI-Powered Insights
                </CardTitle>
                <CardDescription className="text-[#C0C5CE]/70 font-mono">
                  Intelligent recommendations to optimize your stores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {aiInsights.map((insight, index) => (
                    <InsightCard key={index} insight={insight} />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-[#12151C] border-[#4AE54A]/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[#C0C5CE]/70 font-mono text-sm">Total Revenue</p>
                      <p className="text-2xl text-[#4AE54A] font-mono font-medium">$30,020</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-[#4AE54A]" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#12151C] border-[#4AE54A]/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[#C0C5CE]/70 font-mono text-sm">Active Stores</p>
                      <p className="text-2xl text-[#4AE54A] font-mono font-medium">{userStores.length}</p>
                    </div>
                    <Store className="w-8 h-8 text-[#4AE54A]" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#12151C] border-[#4AE54A]/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[#C0C5CE]/70 font-mono text-sm">Total Visitors</p>
                      <p className="text-2xl text-[#4AE54A] font-mono font-medium">5,210</p>
                    </div>
                    <Users className="w-8 h-8 text-[#4AE54A]" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#12151C] border-[#4AE54A]/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[#C0C5CE]/70 font-mono text-sm">Avg Performance</p>
                      <p className="text-2xl text-[#4AE54A] font-mono font-medium">75%</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-[#4AE54A]" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="stores" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {userStores.map((store) => (
                <StoreCard key={store.id} store={store} />
              ))}
              
              {/* Add New Store Card */}
              <Card className="bg-[#12151C] border-[#4AE54A]/20 border-dashed card-hover-glow">
                <CardContent className="p-6 flex flex-col items-center justify-center min-h-[200px]">
                  <div className="p-4 bg-[#4AE54A]/10 rounded-full mb-4">
                    <Plus className="w-8 h-8 text-[#4AE54A]" />
                  </div>
                  <h3 className="text-[#C0C5CE] font-mono font-medium mb-2">Add New Store</h3>
                  <p className="text-[#C0C5CE]/60 font-mono text-sm text-center mb-4">
                    Connect your existing store or create a new one
                  </p>
                  <Button className="bg-[#4AE54A] text-[#0B0D12] hover:bg-[#4AE54A]/90 font-mono">
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="builder" className="space-y-6">
            <Card className="bg-[#12151C] border-[#4AE54A]/20">
              <CardHeader>
                <CardTitle className="text-[#4AE54A] font-mono flex items-center">
                  <Rocket className="w-5 h-5 mr-2" />
                  Store Builder Studio
                </CardTitle>
                <CardDescription className="text-[#C0C5CE]/70 font-mono">
                  Create professional e-commerce stores in minutes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-[#4AE54A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-8 h-8 text-[#4AE54A]" />
                    </div>
                    <h3 className="text-xl text-[#C0C5CE] font-mono font-medium mb-2">Store Builder Coming Soon</h3>
                    <p className="text-[#C0C5CE]/70 font-mono">
                      Revolutionary AI-powered store builder with drag-and-drop interface
                    </p>
                  </div>
                  <Button className="bg-[#4AE54A] text-[#0B0D12] hover:bg-[#4AE54A]/90 font-mono">
                    Join Beta Waitlist
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="optimizer" className="space-y-6">
            <Card className="bg-[#12151C] border-[#4AE54A]/20">
              <CardHeader>
                <CardTitle className="text-[#4AE54A] font-mono flex items-center">
                  <Code className="w-5 h-5 mr-2" />
                  Code Optimizer & Fixer
                </CardTitle>
                <CardDescription className="text-[#C0C5CE]/70 font-mono">
                  AI-powered code analysis and optimization for your stores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-[#4AE54A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Code className="w-8 h-8 text-[#4AE54A]" />
                    </div>
                    <h3 className="text-xl text-[#C0C5CE] font-mono font-medium mb-2">Code Optimizer</h3>
                    <p className="text-[#C0C5CE]/70 font-mono mb-4">
                      Upload your code for instant analysis and optimization
                    </p>
                  </div>
                  <div className="space-y-4 max-w-md mx-auto">
                    <div className="border-2 border-dashed border-[#4AE54A]/30 rounded-lg p-8 hover:border-[#4AE54A]/50 transition-colors">
                      <Upload className="w-8 h-8 text-[#4AE54A] mx-auto mb-2" />
                      <p className="text-[#C0C5CE]/70 font-mono text-sm">Drop your files here or click to upload</p>
                    </div>
                    <Button className="w-full bg-[#4AE54A] text-[#0B0D12] hover:bg-[#4AE54A]/90 font-mono">
                      Start Analysis
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="bg-[#12151C] border-[#4AE54A]/20">
              <CardHeader>
                <CardTitle className="text-[#4AE54A] font-mono flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Advanced Analytics
                </CardTitle>
                <CardDescription className="text-[#C0C5CE]/70 font-mono">
                  Comprehensive analytics across all your stores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-[#4AE54A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BarChart3 className="w-8 h-8 text-[#4AE54A]" />
                    </div>
                    <h3 className="text-xl text-[#C0C5CE] font-mono font-medium mb-2">Analytics Dashboard</h3>
                    <p className="text-[#C0C5CE]/70 font-mono mb-4">
                      Detailed insights and reporting for all connected stores
                    </p>
                  </div>
                  <Button 
                    className="bg-[#4AE54A] text-[#0B0D12] hover:bg-[#4AE54A]/90 font-mono"
                    onClick={() => window.location.href = '#analytics'}
                  >
                    View Full Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EcommercePlatform;