import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { AdminSidebar } from './AdminSidebar';
import DashboardCard from './DashboardCard';
import RealtimeChart from './RealtimeChart';
import QuickActions from './QuickActions';
import { 
  BarChart3, 
  DollarSign, 
  ShoppingCart, 
  Users,
  TrendingUp,
  Activity,
  Settings,
  Bell,
  Search,
  Filter,
  Download,
  Plus,
  Edit2,
  Trash2,
  Eye,
  AlertCircle,
  CheckCircle,
  Clock,
  Globe,
  Zap,
  Code,
  Shield,
  Database,
  Cloud,
  Monitor,
  Smartphone,
  CreditCard,
  FileText,
  Mail,
  Phone
} from 'lucide-react';

interface AdminDashboardProps {
  onNavigate?: (section: string) => void;
}

type AdminView = 'overview' | 'services' | 'content' | 'clients' | 'analytics' | 'billing' | 'security' | 'settings';

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const [currentView, setCurrentView] = useState<AdminView>('overview');
  const [stats, setStats] = useState({
    totalRevenue: 128450,
    activeStores: 47,
    newClients: 23,
    automations: 186,
    conversionRate: 18.5,
    avgSetupTime: 90
  });

  const [recentActivities, setRecentActivities] = useState([
    { id: 1, type: 'store_created', client: 'Saudi Digital Solutions', time: '5 minutes ago', status: 'success', amount: '$2,499' },
    { id: 2, type: 'payment_received', amount: '$4,299', client: 'UAE Tech Corp', time: '18 minutes ago', status: 'success' },
    { id: 3, type: 'automation_deployed', service: 'Vertex AI Integration', time: '1 hour ago', status: 'success', client: 'Innovation Labs' },
    { id: 4, type: 'client_onboarded', client: 'Wyoming Retail Co', time: '2 hours ago', status: 'pending', amount: '$1,299' },
    { id: 5, type: 'code_analysis', service: 'WooCommerce Optimization', time: '3 hours ago', status: 'completed', client: 'E-Store Plus' }
  ]);

  const [quickMetrics, setQuickMetrics] = useState({
    responseTime: '< 2 hours',
    setupSuccess: '98.7%',
    clientSatisfaction: '4.9/5',
    systemUptime: '99.97%'
  });

  const handleAdminNavigation = (section: string) => {
    if (section === 'admin-overview') {
      setCurrentView('overview');
    } else if (section.includes('admin') || section === 'overview') {
      setCurrentView(section.replace('admin-', '') as AdminView);
    } else {
      // Navigate to external sections
      onNavigate?.(section);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* Sidebar */}
      <AdminSidebar onNavigate={handleAdminNavigation} />
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* Render current admin view */}
          {currentView === 'overview' ? (
            <div className="space-y-6">
              {/* Welcome Header */}
              <div className="bg-gradient-to-r from-[#00d4ff]/10 to-[#00ff88]/10 rounded-lg p-6 border border-[#00d4ff]/20">
                <h1 className="text-3xl font-bold text-white mb-2">
                  Welcome back, Fahad! 👋
                </h1>
                <p className="text-gray-400">
                  NeoTechnology Solutions Control Center - Everything at your fingertips
                </p>
              </div>

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <DashboardCard
                  title="Total Revenue"
                  value={`${stats.totalRevenue.toLocaleString()}`}
                  change="+12.5%"
                  icon={<DollarSign className="w-6 h-6 text-[#00ff88]" />}
                  trend="up"
                />
                <DashboardCard
                  title="Active Stores"
                  value={stats.activeStores}
                  change="+8"
                  icon={<ShoppingCart className="w-6 h-6 text-[#00d4ff]" />}
                  trend="up"
                />
                <DashboardCard
                  title="New Clients"
                  value={stats.newClients}
                  change="+23%"
                  icon={<Users className="w-6 h-6 text-[#00ff88]" />}
                  trend="up"
                />
                <DashboardCard
                  title="Avg Setup Time"
                  value={`${stats.avgSetupTime} min`}
                  change="-5 min"
                  icon={<Activity className="w-6 h-6 text-[#00d4ff]" />}
                  trend="down"
                />
              </div>

              {/* Quick Actions */}
              <QuickActions onNavigate={handleAdminNavigation} />

              {/* Analytics Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RealtimeChart 
                  title="Revenue Overview" 
                  type="revenue"
                  color="#00ff88"
                />
                <RealtimeChart 
                  title="Store Launches" 
                  type="launches"
                  color="#00d4ff"
                />
              </div>
            </div>
          ) : (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2 font-mono">
                    🚀 NeoTechnology Control Center
                  </h1>
                  <p className="text-[#a0a0a0] font-mono text-lg">
                    Welcome back, Fahad! Managing the future of e-commerce automation.
                  </p>
                  <div className="flex items-center space-x-4 mt-3">
                    <Badge className="bg-[#00ff88]/20 text-[#00ff88] font-mono">
                      🟢 All Systems Operational
                    </Badge>
                    <Badge className="bg-[#00d4ff]/20 text-[#00d4ff] font-mono">
                      📍 Wyoming, USA
                    </Badge>
                    <Badge className="bg-[#ffd93d]/20 text-[#ffd93d] font-mono">
                      ⚡ 90-Min Delivery Promise
                    </Badge>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    className="border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff]/10 font-mono"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export Analytics
                  </Button>
                  <Button className="bg-gradient-to-r from-[#00d4ff] to-[#00ff88] text-black hover:from-[#00ff88] hover:to-[#00d4ff] font-mono font-bold">
                    <Plus className="w-4 h-4 mr-2" />
                    Launch New Service
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Real-time Activity Feed */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card className="bg-[#1a1a1a] border-[#00d4ff]/30 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white font-mono">🔄 Live Activity Feed</h2>
                <Badge className="bg-[#00ff88]/20 text-[#00ff88] animate-pulse font-mono">
                  ● LIVE
                </Badge>
              </div>
              <div className="space-y-4 max-h-80 overflow-y-auto">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start justify-between p-4 bg-[#0a0a0a] rounded-lg border border-[#00d4ff]/20 hover:border-[#00d4ff]/40 transition-all">
                    <div className="flex items-start space-x-3">
                      {activity.status === 'success' ? (
                        <CheckCircle className="w-5 h-5 text-[#00ff88] mt-0.5" />
                      ) : activity.status === 'completed' ? (
                        <Zap className="w-5 h-5 text-[#00d4ff] mt-0.5" />
                      ) : (
                        <Clock className="w-5 h-5 text-[#ffd93d] mt-0.5" />
                      )}
                      <div>
                        <p className="text-white font-mono text-sm">
                          {activity.type === 'store_created' && (
                            <span>🏪 New store launched for <span className="text-[#00d4ff]">{activity.client}</span></span>
                          )}
                          {activity.type === 'payment_received' && (
                            <span>💰 Payment received from <span className="text-[#00ff88]">{activity.client}</span>: {activity.amount}</span>
                          )}
                          {activity.type === 'automation_deployed' && (
                            <span>🤖 {activity.service} deployed for <span className="text-[#00d4ff]">{activity.client}</span></span>
                          )}
                          {activity.type === 'client_onboarded' && (
                            <span>👋 Welcome <span className="text-[#00ff88]">{activity.client}</span> to NeoTech!</span>
                          )}
                          {activity.type === 'code_analysis' && (
                            <span>🔍 {activity.service} completed for <span className="text-[#00d4ff]">{activity.client}</span></span>
                          )}
                        </p>
                        <p className="text-[#a0a0a0] text-xs font-mono">{activity.time}</p>
                      </div>
                    </div>
                    <Badge 
                      className={`font-mono ${
                        activity.status === 'success' ? 'bg-[#00ff88]/20 text-[#00ff88]' : 
                        activity.status === 'completed' ? 'bg-[#00d4ff]/20 text-[#00d4ff]' :
                        'bg-[#ffd93d]/20 text-[#ffd93d]'
                      }`}
                    >
                      {activity.status.toUpperCase()}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>

            {/* Performance Metrics */}
            <Card className="bg-[#1a1a1a] border-[#00d4ff]/30 p-6">
              <h2 className="text-2xl font-bold text-white font-mono mb-6">📊 Performance Metrics</h2>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-[#a0a0a0] font-mono">⚡ Avg Response Time</span>
                    <span className="text-[#00ff88] font-mono font-bold">{quickMetrics.responseTime}</span>
                  </div>
                  <div className="w-full bg-[#0a0a0a] rounded-full h-3">
                    <div className="bg-gradient-to-r from-[#00ff88] to-[#00d4ff] h-3 rounded-full" style={{width: '95%'}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-[#a0a0a0] font-mono">🎯 Setup Success Rate</span>
                    <span className="text-[#00ff88] font-mono font-bold">{quickMetrics.setupSuccess}</span>
                  </div>
                  <div className="w-full bg-[#0a0a0a] rounded-full h-3">
                    <div className="bg-gradient-to-r from-[#00d4ff] to-[#00ff88] h-3 rounded-full" style={{width: '98.7%'}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-[#a0a0a0] font-mono">⭐ Client Satisfaction</span>
                    <span className="text-[#ffd93d] font-mono font-bold">{quickMetrics.clientSatisfaction}</span>
                  </div>
                  <div className="w-full bg-[#0a0a0a] rounded-full h-3">
                    <div className="bg-gradient-to-r from-[#ffd93d] to-[#00ff88] h-3 rounded-full" style={{width: '98%'}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-[#a0a0a0] font-mono">🖥️ System Uptime</span>
                    <span className="text-[#00ff88] font-mono font-bold">{quickMetrics.systemUptime}</span>
                  </div>
                  <div className="w-full bg-[#0a0a0a] rounded-full h-3">
                    <div className="bg-gradient-to-r from-[#00ff88] to-[#00d4ff] h-3 rounded-full" style={{width: '99.97%'}}></div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Actions & System Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-[#1a1a1a] border-[#00d4ff]/30 p-6">
              <h3 className="text-xl font-bold text-white font-mono mb-4">🚀 Quick Actions</h3>
              <div className="space-y-3">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-[#a0a0a0] hover:text-[#00d4ff] hover:bg-[#00d4ff]/10 font-mono"
                  onClick={() => handleAdminNavigation('services')}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Service Package
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-[#a0a0a0] hover:text-[#00ff88] hover:bg-[#00ff88]/10 font-mono"
                  onClick={() => handleAdminNavigation('ecommerce-master-hub')}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Launch E-commerce Hub
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-[#a0a0a0] hover:text-[#00d4ff] hover:bg-[#00d4ff]/10 font-mono"
                  onClick={() => handleAdminNavigation('vertex-ai-manager')}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Manage AI Services
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-[#a0a0a0] hover:text-[#ffd93d] hover:bg-[#ffd93d]/10 font-mono"
                  onClick={() => handleAdminNavigation('settings')}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Platform Settings
                </Button>
              </div>
            </Card>

            <Card className="bg-[#1a1a1a] border-[#00d4ff]/30 p-6">
              <h3 className="text-xl font-bold text-white font-mono mb-4">🌍 Global Reach</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[#a0a0a0] font-mono text-sm">🇺🇸 United States</span>
                  <Badge className="bg-[#00ff88]/20 text-[#00ff88] font-mono">Active</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#a0a0a0] font-mono text-sm">🇸🇦 Saudi Arabia</span>
                  <Badge className="bg-[#00ff88]/20 text-[#00ff88] font-mono">Active</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#a0a0a0] font-mono text-sm">🇦🇪 UAE</span>
                  <Badge className="bg-[#00ff88]/20 text-[#00ff88] font-mono">Active</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#a0a0a0] font-mono text-sm">💰 Multi-Currency</span>
                  <Badge className="bg-[#00d4ff]/20 text-[#00d4ff] font-mono">USD/SAR</Badge>
                </div>
              </div>
            </Card>

            <Card className="bg-[#1a1a1a] border-[#00d4ff]/30 p-6">
              <h3 className="text-xl font-bold text-white font-mono mb-4">🔐 System Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[#a0a0a0] font-mono text-sm">API Gateway</span>
                  <Badge className="bg-[#00ff88]/20 text-[#00ff88] font-mono">Online</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#a0a0a0] font-mono text-sm">Database Cluster</span>
                  <Badge className="bg-[#00ff88]/20 text-[#00ff88] font-mono">Healthy</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#a0a0a0] font-mono text-sm">Vertex AI</span>
                  <Badge className="bg-[#00d4ff]/20 text-[#00d4ff] font-mono">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#a0a0a0] font-mono text-sm">Security Scans</span>
                  <Badge className="bg-[#00ff88]/20 text-[#00ff88] font-mono">Passed</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#a0a0a0] font-mono text-sm">Backups</span>
                  <Badge className="bg-[#00ff88]/20 text-[#00ff88] font-mono">Current</Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;