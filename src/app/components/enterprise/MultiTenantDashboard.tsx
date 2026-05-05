import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { useLanguage } from '../../contexts/LanguageContext';
import { RTLContainer } from '../LanguageSwitcher';
import { 
  Building,
  Globe,
  Users,
  Server,
  Database,
  Shield,
  Settings,
  Activity,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Key,
  Zap,
  Cpu,
  MemoryStick,
  HardDrive,
  Network,
  Cloud,
  Layers,
  Package,
  Target,
  Rocket,
  Brain,
  Bot,
  Sparkles,
  Plus,
  Minus,
  Edit,
  Trash,
  Copy,
  Share,
  Download,
  Upload,
  RefreshCw,
  Search,
  Filter,
  Calendar,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  Maximize,
  Minimize
} from 'lucide-react';

// ✅ ENHANCED: Multi-tenant architecture interfaces
interface Tenant {
  id: string;
  name: string;
  domain: string;
  plan: 'Starter' | 'Professional' | 'Enterprise' | 'Enterprise Plus';
  region: 'US-East' | 'US-West' | 'GCC-Central' | 'EU-West' | 'Asia-Pacific';
  status: 'active' | 'suspended' | 'maintenance' | 'migrating';
  users: number;
  maxUsers: number;
  storage: number;
  maxStorage: number;
  bandwidth: number;
  maxBandwidth: number;
  createdAt: Date;
  lastActivity: Date;
  monthlyRevenue: number;
  features: string[];
  customizations: Array<{
    type: 'branding' | 'domain' | 'integration' | 'workflow';
    name: string;
    enabled: boolean;
  }>;
  metrics: {
    uptime: number;
    responseTime: number;
    errorRate: number;
    satisfaction: number;
  };
}

interface TenantResource {
  id: string;
  tenantId: string;
  type: 'compute' | 'storage' | 'network' | 'database';
  name: string;
  allocated: number;
  used: number;
  limit: number;
  cost: number;
  region: string;
  autoScale: boolean;
  lastUpdated: Date;
}

interface GlobalMetrics {
  totalTenants: number;
  activeTenants: number;
  totalRevenue: number;
  totalUsers: number;
  globalUptime: number;
  averageResponseTime: number;
  resourceUtilization: number;
  costEfficiency: number;
}

// ✅ ENHANCED: Mock multi-tenant data
const mockTenants: Tenant[] = [
  {
    id: 'tenant-001',
    name: 'Global Retail Corp',
    domain: 'globalretail.neotech.solutions',
    plan: 'Enterprise Plus',
    region: 'US-East',
    status: 'active',
    users: 847,
    maxUsers: 1000,
    storage: 2847,
    maxStorage: 5000,
    bandwidth: 12450,
    maxBandwidth: 50000,
    createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000),
    lastActivity: new Date(Date.now() - 5 * 60 * 1000),
    monthlyRevenue: 12500,
    features: ['Advanced Analytics', 'Custom Branding', 'API Access', 'Priority Support', 'Multi-Region'],
    customizations: [
      { type: 'branding', name: 'Custom Logo & Colors', enabled: true },
      { type: 'domain', name: 'Custom Domain', enabled: true },
      { type: 'integration', name: 'Salesforce Integration', enabled: true },
      { type: 'workflow', name: 'Custom Approval Workflow', enabled: true }
    ],
    metrics: {
      uptime: 99.98,
      responseTime: 89,
      errorRate: 0.02,
      satisfaction: 4.9
    }
  },
  {
    id: 'tenant-002',
    name: 'UAE Commerce Hub',
    domain: 'uaecommerce.neotech.solutions',
    plan: 'Enterprise',
    region: 'GCC-Central',
    status: 'active',
    users: 523,
    maxUsers: 750,
    storage: 1876,
    maxStorage: 3000,
    bandwidth: 8934,
    maxBandwidth: 30000,
    createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000),
    lastActivity: new Date(Date.now() - 12 * 60 * 1000),
    monthlyRevenue: 8750,
    features: ['Advanced Analytics', 'Custom Branding', 'API Access', 'RTL Support'],
    customizations: [
      { type: 'branding', name: 'Arabic Branding', enabled: true },
      { type: 'domain', name: 'Custom Domain', enabled: true },
      { type: 'integration', name: 'Local Payment Gateways', enabled: true },
      { type: 'workflow', name: 'Arabic Content Workflow', enabled: true }
    ],
    metrics: {
      uptime: 99.95,
      responseTime: 134,
      errorRate: 0.05,
      satisfaction: 4.7
    }
  },
  {
    id: 'tenant-003',
    name: 'StartupTech Solutions',
    domain: 'startuptech.neotech.solutions',
    plan: 'Professional',
    region: 'US-West',
    status: 'active',
    users: 156,
    maxUsers: 250,
    storage: 567,
    maxStorage: 1000,
    bandwidth: 3421,
    maxBandwidth: 10000,
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
    lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000),
    monthlyRevenue: 3500,
    features: ['Basic Analytics', 'Standard Support', 'API Access'],
    customizations: [
      { type: 'branding', name: 'Basic Branding', enabled: true },
      { type: 'domain', name: 'Subdomain', enabled: true },
      { type: 'integration', name: 'Stripe Integration', enabled: true }
    ],
    metrics: {
      uptime: 99.89,
      responseTime: 167,
      errorRate: 0.08,
      satisfaction: 4.4
    }
  },
  {
    id: 'tenant-004',
    name: 'European E-commerce Ltd',
    domain: 'eurocommerce.neotech.solutions',
    plan: 'Enterprise',
    region: 'EU-West',
    status: 'migrating',
    users: 734,
    maxUsers: 750,
    storage: 2134,
    maxStorage: 3000,
    bandwidth: 9876,
    maxBandwidth: 30000,
    createdAt: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000),
    lastActivity: new Date(Date.now() - 45 * 60 * 1000),
    monthlyRevenue: 9200,
    features: ['Advanced Analytics', 'Custom Branding', 'API Access', 'GDPR Compliance'],
    customizations: [
      { type: 'branding', name: 'EU Compliance Branding', enabled: true },
      { type: 'domain', name: 'Custom Domain', enabled: true },
      { type: 'integration', name: 'GDPR Tools', enabled: true },
      { type: 'workflow', name: 'Compliance Workflow', enabled: true }
    ],
    metrics: {
      uptime: 99.92,
      responseTime: 112,
      errorRate: 0.03,
      satisfaction: 4.8
    }
  }
];

const mockTenantResources: TenantResource[] = [
  {
    id: 'resource-001',
    tenantId: 'tenant-001',
    type: 'compute',
    name: 'Primary Compute Cluster',
    allocated: 16,
    used: 12.4,
    limit: 20,
    cost: 2847.50,
    region: 'US-East',
    autoScale: true,
    lastUpdated: new Date()
  },
  {
    id: 'resource-002',
    tenantId: 'tenant-001',
    type: 'storage',
    name: 'Document Storage',
    allocated: 5000,
    used: 2847,
    limit: 10000,
    cost: 1245.30,
    region: 'US-East',
    autoScale: true,
    lastUpdated: new Date()
  },
  {
    id: 'resource-003',
    tenantId: 'tenant-002',
    type: 'compute',
    name: 'GCC Compute Cluster',
    allocated: 12,
    used: 8.9,
    limit: 16,
    cost: 1923.75,
    region: 'GCC-Central',
    autoScale: true,
    lastUpdated: new Date()
  }
];

export function MultiTenantDashboard({ onNavigate }: { onNavigate?: (section: string) => void }) {
  const { isRTL, language } = useLanguage();
  const [selectedView, setSelectedView] = useState<'overview' | 'tenants' | 'resources' | 'billing' | 'security'>('overview');
  const [tenants, setTenants] = useState<Tenant[]>(mockTenants);
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [tenantResources, setTenantResources] = useState<TenantResource[]>(mockTenantResources);
  const [globalMetrics, setGlobalMetrics] = useState<GlobalMetrics>({
    totalTenants: 47,
    activeTenants: 44,
    totalRevenue: 487500,
    totalUsers: 8247,
    globalUptime: 99.94,
    averageResponseTime: 123,
    resourceUtilization: 67,
    costEfficiency: 89
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRegion, setFilterRegion] = useState<'all' | 'US-East' | 'US-West' | 'GCC-Central' | 'EU-West' | 'Asia-Pacific'>('all');
  const [filterPlan, setFilterPlan] = useState<'all' | 'Starter' | 'Professional' | 'Enterprise' | 'Enterprise Plus'>('all');

  // ✅ ENHANCED: Real-time tenant monitoring
  useEffect(() => {
    const interval = setInterval(() => {
      setTenants(prev => prev.map(tenant => ({
        ...tenant,
        users: Math.max(0, tenant.users + Math.floor((Math.random() - 0.5) * 4)),
        storage: Math.max(0, tenant.storage + Math.floor((Math.random() - 0.5) * 20)),
        bandwidth: Math.max(0, tenant.bandwidth + Math.floor((Math.random() - 0.5) * 100)),
        metrics: {
          ...tenant.metrics,
          uptime: Math.max(99.8, Math.min(100, tenant.metrics.uptime + (Math.random() - 0.5) * 0.02)),
          responseTime: Math.max(50, tenant.metrics.responseTime + (Math.random() - 0.5) * 10)
        }
      })));

      setGlobalMetrics(prev => ({
        ...prev,
        totalUsers: prev.totalUsers + Math.floor((Math.random() - 0.5) * 10),
        resourceUtilization: Math.max(50, Math.min(90, prev.resourceUtilization + (Math.random() - 0.5) * 3))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // ✅ ENHANCED: Filter tenants
  const filteredTenants = useMemo(() => {
    return tenants.filter(tenant => {
      const matchesSearch = tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tenant.domain.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRegion = filterRegion === 'all' || tenant.region === filterRegion;
      const matchesPlan = filterPlan === 'all' || tenant.plan === filterPlan;
      
      return matchesSearch && matchesRegion && matchesPlan;
    });
  }, [tenants, searchQuery, filterRegion, filterPlan]);

  // ✅ ENHANCED: Status color mapping
  const getStatusColor = useCallback((status: Tenant['status']) => {
    switch (status) {
      case 'active': return 'text-[#00ff88]';
      case 'suspended': return 'text-red-400';
      case 'maintenance': return 'text-yellow-400';
      case 'migrating': return 'text-[#00d4ff]';
      default: return 'text-[#C0C5CE]';
    }
  }, []);

  const getStatusBadge = useCallback((status: Tenant['status']) => {
    const variants = {
      active: 'bg-[#00ff88]/20 text-[#00ff88]',
      suspended: 'bg-red-400/20 text-red-400',
      maintenance: 'bg-yellow-400/20 text-yellow-400',
      migrating: 'bg-[#00d4ff]/20 text-[#00d4ff]'
    };
    return variants[status];
  }, []);

  const getPlanColor = useCallback((plan: Tenant['plan']) => {
    switch (plan) {
      case 'Starter': return 'text-[#C0C5CE]';
      case 'Professional': return 'text-[#00d4ff]';
      case 'Enterprise': return 'text-[#00ff88]';
      case 'Enterprise Plus': return 'text-purple-400';
      default: return 'text-[#C0C5CE]';
    }
  }, []);

  // ✅ ENHANCED: Resource utilization calculation
  const calculateResourceUsage = useCallback((used: number, limit: number) => {
    return Math.round((used / limit) * 100);
  }, []);

  const getUsageColor = useCallback((percentage: number) => {
    if (percentage >= 90) return 'text-red-400';
    if (percentage >= 75) return 'text-yellow-400';
    if (percentage >= 50) return 'text-[#00d4ff]';
    return 'text-[#00ff88]';
  }, []);

  // ✅ ENHANCED: Tenant actions
  const suspendTenant = useCallback((tenantId: string) => {
    setTenants(prev => prev.map(tenant => 
      tenant.id === tenantId 
        ? { ...tenant, status: tenant.status === 'active' ? 'suspended' : 'active' }
        : tenant
    ));
  }, []);

  const scaleTenantResources = useCallback((tenantId: string) => {
    setTenants(prev => prev.map(tenant => 
      tenant.id === tenantId 
        ? { 
            ...tenant, 
            maxUsers: tenant.maxUsers + 100,
            maxStorage: tenant.maxStorage + 1000,
            maxBandwidth: tenant.maxBandwidth + 10000
          }
        : tenant
    ));
  }, []);

  // ✅ ENHANCED: Global statistics
  const globalStats = useMemo(() => {
    const activeTenantsCount = tenants.filter(t => t.status === 'active').length;
    const totalRevenue = tenants.reduce((sum, tenant) => sum + tenant.monthlyRevenue, 0);
    const totalUsers = tenants.reduce((sum, tenant) => sum + tenant.users, 0);
    const avgSatisfaction = tenants.reduce((sum, tenant) => sum + tenant.metrics.satisfaction, 0) / tenants.length;
    
    return {
      activeTenantsCount,
      totalRevenue,
      totalUsers,
      avgSatisfaction: Math.round(avgSatisfaction * 10) / 10
    };
  }, [tenants]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#C0C5CE] font-mono">
      {/* ✅ ENHANCED: Multi-tenant grid background */}
      <div className="fixed inset-0 enterprise-grid opacity-8 pointer-events-none"></div>
      
      <RTLContainer className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        <div className={`space-y-8 ${isRTL ? 'text-right' : 'text-left'}`}>
          
          {/* ✅ ENHANCED: Multi-tenant header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#00d4ff] via-[#00ff88] to-purple-500 rounded-lg flex items-center justify-center">
                <Building className="w-6 h-6 text-black" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-[#C0C5CE]">
                  {language === 'ar' ? 'إدارة العملاء المؤسسيين' : 'Multi-Tenant Enterprise Dashboard'}
                </h1>
                <p className="text-[#C0C5CE]/70 mt-1">
                  {language === 'ar' 
                    ? 'إدارة شاملة للعملاء الكبار مع موارد مخصصة وأمان متقدم'
                    : 'Comprehensive management for enterprise clients with dedicated resources and advanced security'
                  }
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button className="neo-button-primary">
                <Plus className="w-4 h-4 mr-2" />
                {language === 'ar' ? 'عميل جديد' : 'New Tenant'}
              </Button>
            </div>
          </div>

          {/* ✅ ENHANCED: Global overview metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <Building className="w-5 h-5 text-[#00d4ff]" />
                <Badge className="bg-[#00d4ff]/20 text-[#00d4ff] font-mono">Global</Badge>
              </div>
              <div className="neo-dashboard-widget-value text-[#00d4ff]">{globalStats.activeTenantsCount}</div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">Active Tenants</div>
              <div className="neo-dashboard-widget-change positive">
                <TrendingUp className="w-3 h-3" />
                +{globalMetrics.totalTenants - globalStats.activeTenantsCount} pending
              </div>
            </Card>

            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <DollarSign className="w-5 h-5 text-[#00ff88]" />
                <span className="text-xs text-[#C0C5CE]/70 font-mono">Revenue</span>
              </div>
              <div className="neo-dashboard-widget-value text-[#00ff88]">${globalStats.totalRevenue.toLocaleString()}</div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">Monthly Revenue</div>
              <div className="neo-dashboard-widget-change positive">
                <TrendingUp className="w-3 h-3" />
                +23% growth
              </div>
            </Card>

            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <Users className="w-5 h-5 text-yellow-400" />
                <span className="text-xs text-[#C0C5CE]/70 font-mono">Users</span>
              </div>
              <div className="neo-dashboard-widget-value text-yellow-400">{globalStats.totalUsers.toLocaleString()}</div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">Total Users</div>
              <div className="neo-dashboard-widget-change positive">
                <Activity className="w-3 h-3" />
                {globalMetrics.activeTenants} active now
              </div>
            </Card>

            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <Target className="w-5 h-5 text-purple-400" />
                <span className="text-xs text-[#C0C5CE]/70 font-mono">Satisfaction</span>
              </div>
              <div className="neo-dashboard-widget-value text-purple-400">{globalStats.avgSatisfaction}</div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">Avg Satisfaction</div>
              <div className="neo-dashboard-widget-change positive">
                <CheckCircle className="w-3 h-3" />
                {globalMetrics.costEfficiency}% efficiency
              </div>
            </Card>
          </div>

          {/* ✅ ENHANCED: Navigation tabs */}
          <div className="flex space-x-1 bg-[#12151C] p-1 rounded-lg">
            {[
              { id: 'overview', label: language === 'ar' ? 'نظرة عامة' : 'Overview', icon: Eye },
              { id: 'tenants', label: language === 'ar' ? 'العملاء' : 'Tenants', icon: Building },
              { id: 'resources', label: language === 'ar' ? 'الموارد' : 'Resources', icon: Server },
              { id: 'billing', label: language === 'ar' ? 'الفواتير' : 'Billing', icon: DollarSign },
              { id: 'security', label: language === 'ar' ? 'الأمان' : 'Security', icon: Shield }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedView(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md font-mono text-sm transition-all ${
                  selectedView === tab.id
                    ? 'bg-[#00d4ff] text-black'
                    : 'text-[#C0C5CE] hover:bg-[#00d4ff]/10 hover:text-[#00d4ff]'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* ✅ ENHANCED: Tenant management interface */}
          {selectedView === 'tenants' && (
            <div className="space-y-6">
              {/* Search and filters */}
              <div className="flex items-center justify-between bg-[#12151C] p-4 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#C0C5CE]/50" />
                    <input
                      type="text"
                      placeholder={language === 'ar' ? 'البحث عن عميل...' : 'Search tenants...'}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 bg-[#0B0D12] border border-[#00d4ff]/30 rounded text-[#C0C5CE] font-mono focus:border-[#00d4ff] focus:outline-none"
                    />
                  </div>
                  
                  <select
                    value={filterRegion}
                    onChange={(e) => setFilterRegion(e.target.value as any)}
                    className="bg-[#0B0D12] border border-[#00d4ff]/30 text-[#C0C5CE] rounded px-3 py-2 text-sm font-mono"
                  >
                    <option value="all">All Regions</option>
                    <option value="US-East">US East</option>
                    <option value="US-West">US West</option>
                    <option value="GCC-Central">GCC Central</option>
                    <option value="EU-West">EU West</option>
                    <option value="Asia-Pacific">Asia Pacific</option>
                  </select>
                  
                  <select
                    value={filterPlan}
                    onChange={(e) => setFilterPlan(e.target.value as any)}
                    className="bg-[#0B0D12] border border-[#00d4ff]/30 text-[#C0C5CE] rounded px-3 py-2 text-sm font-mono"
                  >
                    <option value="all">All Plans</option>
                    <option value="Starter">Starter</option>
                    <option value="Professional">Professional</option>
                    <option value="Enterprise">Enterprise</option>
                    <option value="Enterprise Plus">Enterprise Plus</option>
                  </select>
                </div>
                
                <div className="text-sm text-[#C0C5CE]/70 font-mono">
                  {filteredTenants.length} {language === 'ar' ? 'عميل' : 'tenants'}
                </div>
              </div>

              {/* Tenant grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTenants.map(tenant => {
                  const storageUsage = calculateResourceUsage(tenant.storage, tenant.maxStorage);
                  const userUsage = calculateResourceUsage(tenant.users, tenant.maxUsers);
                  const bandwidthUsage = calculateResourceUsage(tenant.bandwidth, tenant.maxBandwidth);
                  
                  return (
                    <Card key={tenant.id} className="neo-interactive-card">
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <Globe className="w-5 h-5 text-[#00d4ff]" />
                              <Badge className={getStatusBadge(tenant.status)}>
                                {tenant.status.toUpperCase()}
                              </Badge>
                              <Badge className={`${getPlanColor(tenant.plan)} bg-opacity-20 font-mono text-xs`}>
                                {tenant.plan}
                              </Badge>
                            </div>
                            <h4 className="text-lg font-bold text-[#C0C5CE] font-mono mb-1">
                              {tenant.name}
                            </h4>
                            <p className="text-[#C0C5CE]/70 text-sm font-mono">
                              {tenant.domain}
                            </p>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-lg font-mono text-[#00ff88] mb-1">
                              ${tenant.monthlyRevenue.toLocaleString()}
                            </div>
                            <div className="text-xs text-[#C0C5CE]/70 font-mono">
                              Monthly
                            </div>
                          </div>
                        </div>
                        
                        {/* Resource usage indicators */}
                        <div className="space-y-3 mb-4">
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-[#C0C5CE]/70 font-mono">Users</span>
                              <span className={`font-mono ${getUsageColor(userUsage)}`}>
                                {tenant.users}/{tenant.maxUsers} ({userUsage}%)
                              </span>
                            </div>
                            <Progress value={userUsage} className="h-2" />
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-[#C0C5CE]/70 font-mono">Storage (GB)</span>
                              <span className={`font-mono ${getUsageColor(storageUsage)}`}>
                                {tenant.storage}/{tenant.maxStorage} ({storageUsage}%)
                              </span>
                            </div>
                            <Progress value={storageUsage} className="h-2" />
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-[#C0C5CE]/70 font-mono">Bandwidth (GB)</span>
                              <span className={`font-mono ${getUsageColor(bandwidthUsage)}`}>
                                {tenant.bandwidth}/{tenant.maxBandwidth} ({bandwidthUsage}%)
                              </span>
                            </div>
                            <Progress value={bandwidthUsage} className="h-2" />
                          </div>
                        </div>
                        
                        {/* Performance metrics */}
                        <div className="grid grid-cols-2 gap-4 text-xs font-mono mb-4">
                          <div>
                            <div className="text-[#C0C5CE]/70">Uptime</div>
                            <div className="text-[#00ff88]">{tenant.metrics.uptime}%</div>
                          </div>
                          <div>
                            <div className="text-[#C0C5CE]/70">Response</div>
                            <div className="text-[#00d4ff]">{Math.round(tenant.metrics.responseTime)}ms</div>
                          </div>
                          <div>
                            <div className="text-[#C0C5CE]/70">Error Rate</div>
                            <div className="text-[#00ff88]">{tenant.metrics.errorRate}%</div>
                          </div>
                          <div>
                            <div className="text-[#C0C5CE]/70">Satisfaction</div>
                            <div className="text-yellow-400">{tenant.metrics.satisfaction}/5</div>
                          </div>
                        </div>
                        
                        {/* Action buttons */}
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            className="flex-1 neo-button-outline"
                            onClick={() => setSelectedTenant(tenant)}
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            {language === 'ar' ? 'عرض' : 'View'}
                          </Button>
                          
                          <Button 
                            size="sm" 
                            className="flex-1 neo-button-ghost"
                            onClick={() => scaleTenantResources(tenant.id)}
                          >
                            <Rocket className="w-3 h-3 mr-1" />
                            {language === 'ar' ? 'توسيع' : 'Scale'}
                          </Button>
                          
                          <Button 
                            size="sm" 
                            className={`${tenant.status === 'active' ? 'neo-button-error' : 'neo-button-success'}`}
                            onClick={() => suspendTenant(tenant.id)}
                          >
                            {tenant.status === 'active' ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* ✅ ENHANCED: Resource overview */}
          {selectedView === 'resources' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-[#C0C5CE] font-mono">
                {language === 'ar' ? 'إدارة الموارد العالمية' : 'Global Resource Management'}
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Resource allocation */}
                <Card className="neo-card">
                  <div className="p-6">
                    <h4 className="text-xl font-semibold text-[#C0C5CE] font-mono mb-6">
                      {language === 'ar' ? 'توزيع الموارد' : 'Resource Allocation'}
                    </h4>
                    
                    <div className="space-y-4">
                      {['compute', 'storage', 'network', 'database'].map(resourceType => {
                        const resources = tenantResources.filter(r => r.type === resourceType);
                        const totalUsed = resources.reduce((sum, r) => sum + r.used, 0);
                        const totalLimit = resources.reduce((sum, r) => sum + r.limit, 0);
                        const usage = Math.round((totalUsed / totalLimit) * 100);
                        
                        return (
                          <div key={resourceType} className="border border-[#00d4ff]/20 rounded p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                {resourceType === 'compute' && <Cpu className="w-4 h-4 text-[#00d4ff]" />}
                                {resourceType === 'storage' && <HardDrive className="w-4 h-4 text-[#00ff88]" />}
                                {resourceType === 'network' && <Network className="w-4 h-4 text-yellow-400" />}
                                {resourceType === 'database' && <Database className="w-4 h-4 text-purple-400" />}
                                <span className="font-mono text-[#C0C5CE] capitalize">
                                  {resourceType}
                                </span>
                              </div>
                              <span className={`font-mono text-sm ${getUsageColor(usage)}`}>
                                {usage}%
                              </span>
                            </div>
                            <Progress value={usage} className="h-2 mb-2" />
                            <div className="flex justify-between text-xs text-[#C0C5CE]/70 font-mono">
                              <span>Used: {totalUsed.toLocaleString()}</span>
                              <span>Limit: {totalLimit.toLocaleString()}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Card>

                {/* Cost optimization */}
                <Card className="neo-card">
                  <div className="p-6">
                    <h4 className="text-xl font-semibold text-[#C0C5CE] font-mono mb-6">
                      {language === 'ar' ? 'تحسين التكاليف' : 'Cost Optimization'}
                    </h4>
                    
                    <div className="space-y-4">
                      <div className="bg-[#0B0D12] border border-[#00ff88]/30 rounded p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[#00ff88] font-mono font-semibold">Potential Savings</span>
                          <span className="text-[#00ff88] font-mono text-lg">$12,400/month</span>
                        </div>
                        <p className="text-[#C0C5CE]/80 text-sm font-mono">
                          {language === 'ar' 
                            ? 'التحسين الذكي للموارد يمكن أن يوفر 23% من التكاليف الشهرية'
                            : 'Smart resource optimization can save 23% of monthly costs'
                          }
                        </p>
                      </div>
                      
                      <div className="space-y-3">
                        <h5 className="text-sm font-semibold text-[#C0C5CE] font-mono">
                          {language === 'ar' ? 'توصيات التحسين' : 'Optimization Recommendations'}
                        </h5>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-3 bg-[#0B0D12] rounded">
                            <div className="flex items-center space-x-2">
                              <Cpu className="w-4 h-4 text-[#00d4ff]" />
                              <span className="text-sm font-mono text-[#C0C5CE]">
                                {language === 'ar' ? 'تحسين CPU' : 'CPU Optimization'}
                              </span>
                            </div>
                            <Badge className="bg-[#00ff88]/20 text-[#00ff88] font-mono text-xs">
                              -$2,400/mo
                            </Badge>
                          </div>
                          
                          <div className="flex items-center justify-between p-3 bg-[#0B0D12] rounded">
                            <div className="flex items-center space-x-2">
                              <HardDrive className="w-4 h-4 text-[#00ff88]" />
                              <span className="text-sm font-mono text-[#C0C5CE]">
                                {language === 'ar' ? 'ضغط التخزين' : 'Storage Compression'}
                              </span>
                            </div>
                            <Badge className="bg-[#00ff88]/20 text-[#00ff88] font-mono text-xs">
                              -$1,800/mo
                            </Badge>
                          </div>
                          
                          <div className="flex items-center justify-between p-3 bg-[#0B0D12] rounded">
                            <div className="flex items-center space-x-2">
                              <Network className="w-4 h-4 text-yellow-400" />
                              <span className="text-sm font-mono text-[#C0C5CE]">
                                {language === 'ar' ? 'تحسين الشبكة' : 'Network Optimization'}
                              </span>
                            </div>
                            <Badge className="bg-[#00ff88]/20 text-[#00ff88] font-mono text-xs">
                              -$3,200/mo
                            </Badge>
                          </div>
                        </div>
                        
                        <Button className="w-full neo-button-success mt-4">
                          <Sparkles className="w-4 h-4 mr-2" />
                          {language === 'ar' ? 'تطبيق التحسين التلقائي' : 'Apply Auto-Optimization'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

        </div>
      </RTLContainer>
    </div>
  );
}