import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard,
  Brain,
  MessageCircle,
  Rocket,
  BarChart3,
  Settings,
  User,
  Bell,
  Search,
  Plus,
  Filter,
  Download,
  Share2,
  Maximize2,
  Minimize2,
  RefreshCw,
  Zap,
  Target,
  TrendingUp,
  Shield,
  Globe,
  Code,
  Database,
  Server,
  Cpu,
  Activity,
  Users,
  ShoppingCart,
  DollarSign,
  Calendar,
  Clock,
  Star,
  ArrowUp,
  ArrowDown,
  Eye,
  ChevronRight,
  FileText,
  MessageSquare,
  Edit3
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';

// Simple placeholder components to avoid import errors
const ContentManager = () => (
  <div className="min-h-screen bg-[#0B0D12] p-6">
    <div className="max-w-7xl mx-auto">
      <div className="text-[#4AE54A] font-mono text-2xl mb-4">Content Manager</div>
      <div className="text-[#C0C5CE] font-mono">Content management system coming soon...</div>
    </div>
  </div>
);

const AdvancedDashboard = () => (
  <div className="min-h-screen bg-[#0B0D12] p-6">
    <div className="max-w-7xl mx-auto">
      <div className="text-[#4AE54A] font-mono text-2xl mb-4">Advanced Analytics</div>
      <div className="text-[#C0C5CE] font-mono">Advanced dashboard loading...</div>
    </div>
  </div>
);

const NeoAssistantAI = () => (
  <div className="min-h-screen bg-[#0B0D12] p-6">
    <div className="max-w-7xl mx-auto">
      <div className="text-[#4AE54A] font-mono text-2xl mb-4">NeoAssistant AI</div>
      <div className="text-[#C0C5CE] font-mono">AI Assistant interface loading...</div>
    </div>
  </div>
);

const NeoBot = () => (
  <div className="min-h-screen bg-[#0B0D12] p-6">
    <div className="max-w-7xl mx-auto">
      <div className="text-[#4AE54A] font-mono text-2xl mb-4">NeoBot</div>
      <div className="text-[#C0C5CE] font-mono">Chatbot interface loading...</div>
    </div>
  </div>
);

const NeoBotAI = () => (
  <div className="min-h-screen bg-[#0B0D12] p-6">
    <div className="max-w-7xl mx-auto">
      <div className="text-[#4AE54A] font-mono text-2xl mb-4">NeoBot AI</div>
      <div className="text-[#C0C5CE] font-mono">Enhanced AI chatbot loading...</div>
    </div>
  </div>
);

// Import interface type only, not component to avoid circular dependency
interface DashboardProps {
  onNavigate?: (section: string) => void;
}

interface DashboardMetric {
  label: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: React.ReactNode;
}

interface AIService {
  id: string;
  name: string;
  description: string;
  status: 'online' | 'offline' | 'maintenance';
  usage: number;
  requests: number;
  accuracy: number;
  icon: React.ReactNode;
}

interface RecentActivity {
  id: string;
  type: 'ai_request' | 'system_update' | 'user_action' | 'error' | 'deployment';
  message: string;
  timestamp: Date;
  user?: string;
  status: 'success' | 'warning' | 'error' | 'info';
}

// Helper functions
const getStatusColor = (status: string) => {
  switch (status) {
    case 'online': return 'text-green-400';
    case 'offline': return 'text-red-400';
    case 'maintenance': return 'text-yellow-400';
    default: return 'text-[#C0C5CE]';
  }
};

const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case 'success': return 'bg-green-400/20 text-green-400';
    case 'warning': return 'bg-yellow-400/20 text-yellow-400';
    case 'error': return 'bg-red-400/20 text-red-400';
    case 'info': return 'bg-blue-400/20 text-blue-400';
    default: return 'bg-[#C0C5CE]/20 text-[#C0C5CE]';
  }
};

const getTrendIcon = (trend: string, change: number) => {
  if (trend === 'stable') return null;
  return trend === 'up' ? (
    <ArrowUp className="w-3 h-3 text-green-400" />
  ) : (
    <ArrowDown className="w-3 h-3 text-red-400" />
  );
};

const formatTimeAgo = (date: Date) => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 }
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count > 0) {
      return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
    }
  }
  return 'Just now';
};

// Sample data
const metrics: DashboardMetric[] = [
  {
    label: 'Total AI Requests',
    value: '12,847',
    change: 23.5,
    trend: 'up',
    icon: <Brain className="w-5 h-5" />
  },
  {
    label: 'Active Users',
    value: '1,247',
    change: 12.3,
    trend: 'up',
    icon: <Users className="w-5 h-5" />
  },
  {
    label: 'Revenue Generated',
    value: '$24,891',
    change: 8.7,
    trend: 'up',
    icon: <DollarSign className="w-5 h-5" />
  },
  {
    label: 'System Uptime',
    value: '99.9%',
    change: 0.1,
    trend: 'stable',
    icon: <Activity className="w-5 h-5" />
  },
  {
    label: 'AI Accuracy',
    value: '94.2%',
    change: 2.1,
    trend: 'up',
    icon: <Target className="w-5 h-5" />
  },
  {
    label: 'Response Time',
    value: '245ms',
    change: -15.2,
    trend: 'up',
    icon: <Zap className="w-5 h-5" />
  }
];

const aiServices: AIService[] = [
  {
    id: 'neoassistant',
    name: 'NeoAssistant AI',
    description: 'Intelligent platform guidance and technical support',
    status: 'online',
    usage: 87.3,
    requests: 3247,
    accuracy: 94.5,
    icon: <Brain className="w-6 h-6" />
  },
  {
    id: 'neobot',
    name: 'NeoBot',
    description: 'Conversational chatbot with terminal-style interactions',
    status: 'online',
    usage: 76.8,
    requests: 5891,
    accuracy: 91.2,
    icon: <MessageCircle className="w-6 h-6" />
  },
  {
    id: 'neobotai',
    name: 'NeoBot AI',
    description: 'Enhanced AI with machine learning capabilities',
    status: 'online',
    usage: 92.1,
    requests: 1829,
    accuracy: 96.8,
    icon: <Rocket className="w-6 h-6" />
  }
];

const recentActivity: RecentActivity[] = [
  {
    id: '1',
    type: 'ai_request',
    message: 'NeoBuilder AI generated new e-commerce template',
    timestamp: new Date(Date.now() - 300000),
    user: 'user@example.com',
    status: 'success'
  },
  {
    id: '2',
    type: 'system_update',
    message: 'AI models updated to version 2.1.0',
    timestamp: new Date(Date.now() - 600000),
    status: 'info'
  },
  {
    id: '3',
    type: 'user_action',
    message: 'New deployment to Shopify completed',
    timestamp: new Date(Date.now() - 900000),
    user: 'admin@neotechnology.solutions',
    status: 'success'
  },
  {
    id: '4',
    type: 'error',
    message: 'Rate limit exceeded for API endpoint',
    timestamp: new Date(Date.now() - 1200000),
    status: 'warning'
  },
  {
    id: '5',
    type: 'deployment',
    message: 'WordPress site deployed successfully',
    timestamp: new Date(Date.now() - 1500000),
    user: 'client@company.com',
    status: 'success'
  }
];

// AI Services Overview component
function AIServicesOverview({ setActiveView }: { setActiveView: (view: any) => void }) {
  return (
    <div className="min-h-screen bg-[#0B0D12] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Brain className="w-8 h-8 text-[#4AE54A] mr-3" />
            <div>
              <h1 className="text-[#C0C5CE] font-mono text-2xl mb-2">AI Services Overview</h1>
              <div className="flex items-center text-[#C0C5CE]/70 font-mono text-sm">
                <span className="text-[#4AE54A] mr-2">{'>'}</span>
                <span>Monitor and manage AI-powered services</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setActiveView('advanced')}
              className="bg-[#4AE54A] text-[#0B0D12] hover:bg-[#4AE54A]/90 font-mono"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Advanced Analytics
            </Button>
            <Button
              onClick={() => setActiveView('cms')}
              variant="outline"
              className="border-[#C0C5CE]/20 text-[#C0C5CE] hover:bg-[#4AE54A]/10 font-mono"
            >
              <FileText className="w-4 h-4 mr-2" />
              Content Manager
            </Button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <Card key={index} className="bg-[#12151C] border-[#C0C5CE]/20 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-[#4AE54A]">{metric.icon}</div>
                <div className="flex items-center space-x-1">
                  {getTrendIcon(metric.trend, metric.change)}
                  <span className={`font-mono text-sm ${
                    metric.trend === 'up' ? 'text-green-400' : 
                    metric.trend === 'down' ? 'text-red-400' : 'text-[#C0C5CE]'
                  }`}>
                    {metric.change > 0 ? '+' : ''}{metric.change}%
                  </span>
                </div>
              </div>
              <div className="text-2xl font-mono text-[#C0C5CE] mb-1">{metric.value}</div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">{metric.label}</div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* AI Services */}
          <div className="lg:col-span-2">
            <Card className="bg-[#12151C] border-[#C0C5CE]/20 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[#4AE54A] font-mono text-lg">AI Services</h3>
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-[#C0C5CE]/20 text-[#C0C5CE] font-mono"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                  <Button
                    size="sm"
                    className="bg-[#4AE54A] text-[#0B0D12] hover:bg-[#4AE54A]/90 font-mono"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Service
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {aiServices.map((service) => (
                  <div key={service.id} className="bg-[#0B0D12] border border-[#C0C5CE]/20 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-[#4AE54A]">{service.icon}</div>
                        <div>
                          <h4 className="text-[#C0C5CE] font-mono text-lg">{service.name}</h4>
                          <p className="text-[#C0C5CE]/70 font-mono text-sm">{service.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className={`font-mono ${getStatusColor(service.status)}`}>
                          {service.status}
                        </Badge>
                        <Button
                          onClick={() => setActiveView(service.id as any)}
                          size="sm"
                          className="bg-[#4AE54A] text-[#0B0D12] hover:bg-[#4AE54A]/90 font-mono"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Open
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-[#C0C5CE]/70 font-mono text-xs mb-1">Usage</div>
                        <div className="text-[#4AE54A] font-mono text-lg">{service.usage}%</div>
                        <Progress value={service.usage} className="h-1 mt-1" />
                      </div>
                      <div>
                        <div className="text-[#C0C5CE]/70 font-mono text-xs mb-1">Requests</div>
                        <div className="text-[#4AE54A] font-mono text-lg">{service.requests.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-[#C0C5CE]/70 font-mono text-xs mb-1">Accuracy</div>
                        <div className="text-[#4AE54A] font-mono text-lg">{service.accuracy}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Recent Activity */}
          <div>
            <Card className="bg-[#12151C] border-[#C0C5CE]/20 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[#4AE54A] font-mono text-lg">Recent Activity</h3>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-[#C0C5CE]/20 text-[#C0C5CE] font-mono"
                >
                  <Filter className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4 max-h-96 overflow-y-auto">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.status === 'success' ? 'bg-green-400' :
                      activity.status === 'warning' ? 'bg-yellow-400' :
                      activity.status === 'error' ? 'bg-red-400' :
                      'bg-blue-400'
                    }`}></div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[#C0C5CE] font-mono text-sm mb-1">
                        {activity.message}
                      </div>
                      {activity.user && (
                        <div className="text-[#C0C5CE]/50 font-mono text-xs mb-1">
                          by {activity.user}
                        </div>
                      )}
                      <div className="text-[#C0C5CE]/50 font-mono text-xs">
                        {formatTimeAgo(activity.timestamp)}
                      </div>
                    </div>
                    <Badge variant="secondary" className={`font-mono text-xs ${getStatusBadgeColor(activity.status)}`}>
                      {activity.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>

            {/* System Status */}
            <Card className="bg-[#12151C] border-[#C0C5CE]/20 p-6 mt-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[#4AE54A] font-mono text-lg">System Status</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                  <span className="text-green-400 font-mono text-sm">All Systems Operational</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Server className="w-4 h-4 text-[#C0C5CE]" />
                    <span className="text-[#C0C5CE] font-mono text-sm">API Server</span>
                  </div>
                  <Badge variant="secondary" className="bg-green-400/20 text-green-400 font-mono text-xs">
                    Online
                  </Badge>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Database className="w-4 h-4 text-[#C0C5CE]" />
                    <span className="text-[#C0C5CE] font-mono text-sm">Database</span>
                  </div>
                  <Badge variant="secondary" className="bg-green-400/20 text-green-400 font-mono text-xs">
                    Online
                  </Badge>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Brain className="w-4 h-4 text-[#C0C5CE]" />
                    <span className="text-[#C0C5CE] font-mono text-sm">AI Services</span>
                  </div>
                  <Badge variant="secondary" className="bg-green-400/20 text-green-400 font-mono text-xs">
                    Online
                  </Badge>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-[#C0C5CE]" />
                    <span className="text-[#C0C5CE] font-mono text-sm">Security</span>
                  </div>
                  <Badge variant="secondary" className="bg-green-400/20 text-green-400 font-mono text-xs">
                    Secure
                  </Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <Card className="bg-[#12151C] border-[#C0C5CE]/20 p-6 mt-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[#4AE54A] font-mono text-lg">Quick Actions</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              className="bg-[#0B0D12] border border-[#C0C5CE]/20 text-[#C0C5CE] hover:bg-[#4AE54A]/10 hover:text-[#4AE54A] font-mono h-auto p-4 flex flex-col items-center space-y-2"
              variant="outline"
            >
              <Code className="w-6 h-6" />
              <span>Generate Code</span>
            </Button>
            
            <Button
              className="bg-[#0B0D12] border border-[#C0C5CE]/20 text-[#C0C5CE] hover:bg-[#4AE54A]/10 hover:text-[#4AE54A] font-mono h-auto p-4 flex flex-col items-center space-y-2"
              variant="outline"
            >
              <Globe className="w-6 h-6" />
              <span>Deploy Site</span>
            </Button>
            
            <Button
              className="bg-[#0B0D12] border border-[#C0C5CE]/20 text-[#C0C5CE] hover:bg-[#4AE54A]/10 hover:text-[#4AE54A] font-mono h-auto p-4 flex flex-col items-center space-y-2"
              variant="outline"
            >
              <BarChart3 className="w-6 h-6" />
              <span>View Analytics</span>
            </Button>
            
            <Button
              className="bg-[#0B0D12] border border-[#C0C5CE]/20 text-[#C0C5CE] hover:bg-[#4AE54A]/10 hover:text-[#4AE54A] font-mono h-auto p-4 flex flex-col items-center space-y-2"
              variant="outline"
            >
              <Settings className="w-6 h-6" />
              <span>Settings</span>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

// Main Dashboard component
export function Dashboard({ onNavigate }: DashboardProps) {
  const [activeView, setActiveView] = useState<'cms' | 'overview' | 'advanced' | 'neoassistant' | 'neobot' | 'neobotai'>('advanced');

  // Content Management System view
  if (activeView === 'cms') {
    return <ContentManager />;
  }

  // Advanced Analytics Dashboard view (new primary dashboard)
  if (activeView === 'advanced') {
    return <AdvancedDashboard />;
  }

  if (activeView !== 'overview') {
    return (
      <div className="min-h-screen bg-[#0B0D12]">
        {/* Header */}
        <div className="bg-[#12151C] border-b border-[#C0C5CE]/20 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setActiveView('cms')}
                variant="ghost"
                className="text-[#C0C5CE] hover:text-[#4AE54A] font-mono"
              >
                <ChevronRight className="w-4 h-4 mr-2 rotate-180" />
                Back to Dashboard
              </Button>
              <div className="text-[#4AE54A] font-mono text-lg">
                {activeView === 'overview' && 'AI Services Overview'}
                {activeView === 'advanced' && 'Advanced Analytics'}
                {activeView === 'neoassistant' && 'NeoAssistant AI'}
                {activeView === 'neobot' && 'NeoBot'}
                {activeView === 'neobotai' && 'NeoBot AI'}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-[#C0C5CE] font-mono text-sm">Online</span>
            </div>
          </div>
        </div>

        {/* AI Service Content */}
        {activeView === 'overview' && <AIServicesOverview setActiveView={setActiveView} />}
        {activeView === 'advanced' && <AdvancedDashboard />}
        {activeView === 'neoassistant' && <NeoAssistantAI />}
        {activeView === 'neobot' && <NeoBot />}
        {activeView === 'neobotai' && <NeoBotAI />}
      </div>
    );
  }

  // This should never be reached now, but kept for safety  
  return <AdvancedDashboard />;
}

export default Dashboard;