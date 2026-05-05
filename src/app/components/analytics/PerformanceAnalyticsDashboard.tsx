/**
 * Performance Analytics Dashboard with Deeper Insights
 * Real-time metrics and advanced analytics for the 90-minute promise
 */

import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  RadialBarChart,
  RadialBar
} from 'recharts';
import { 
  Clock, 
  Target, 
  TrendingUp, 
  TrendingDown,
  Users, 
  DollarSign, 
  AlertTriangle, 
  CheckCircle, 
  Zap,
  Globe,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Star,
  Trophy,
  Flame,
  Shield,
  Brain,
  Activity,
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon
} from 'lucide-react';

interface MetricData {
  date: string;
  setupTime: number;
  slaCompliance: number;
  revenue: number;
  clientSatisfaction: number;
  orders: number;
  teamEfficiency: number;
}

interface TeamPerformance {
  memberId: string;
  name: string;
  role: string;
  completedOrders: number;
  avgSetupTime: number;
  slaCompliance: number;
  clientRating: number;
  efficiency: number;
  language: 'en' | 'ar' | 'both';
}

interface PlatformMetrics {
  platform: string;
  orders: number;
  avgTime: number;
  revenue: number;
  successRate: number;
  growth: number;
}

export function PerformanceAnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('setupTime');
  const [loading, setLoading] = useState(false);

  // Mock data - in production, this would come from Firebase Analytics
  const [metricsData] = useState<MetricData[]>([
    { date: '2024-01-01', setupTime: 87, slaCompliance: 98, revenue: 15420, clientSatisfaction: 4.8, orders: 12, teamEfficiency: 92 },
    { date: '2024-01-02', setupTime: 82, slaCompliance: 100, revenue: 18750, clientSatisfaction: 4.9, orders: 15, teamEfficiency: 95 },
    { date: '2024-01-03', setupTime: 89, slaCompliance: 96, revenue: 22100, clientSatisfaction: 4.7, orders: 18, teamEfficiency: 88 },
    { date: '2024-01-04', setupTime: 78, slaCompliance: 100, revenue: 25600, clientSatisfaction: 4.9, orders: 21, teamEfficiency: 97 },
    { date: '2024-01-05', setupTime: 85, slaCompliance: 98, revenue: 19800, clientSatisfaction: 4.8, orders: 16, teamEfficiency: 90 },
    { date: '2024-01-06', setupTime: 76, slaCompliance: 100, revenue: 28400, clientSatisfaction: 5.0, orders: 24, teamEfficiency: 98 },
    { date: '2024-01-07', setupTime: 83, slaCompliance: 99, revenue: 31200, clientSatisfaction: 4.9, orders: 27, teamEfficiency: 94 }
  ]);

  const [teamPerformance] = useState<TeamPerformance[]>([
    { memberId: 'pm001', name: 'Sarah Johnson', role: 'Project Manager', completedOrders: 45, avgSetupTime: 82, slaCompliance: 98, clientRating: 4.8, efficiency: 95, language: 'en' },
    { memberId: 'pm002', name: 'Ahmed Al-Rashid', role: 'Project Manager', completedOrders: 38, avgSetupTime: 75, slaCompliance: 97, clientRating: 4.9, efficiency: 97, language: 'both' },
    { memberId: 'dev001', name: 'Marcus Chen', role: 'Developer', completedOrders: 52, avgSetupTime: 45, slaCompliance: 99, clientRating: 4.7, efficiency: 94, language: 'en' },
    { memberId: 'dev002', name: 'Fatima Hassan', role: 'Developer', completedOrders: 41, avgSetupTime: 48, slaCompliance: 98, clientRating: 4.8, efficiency: 96, language: 'both' },
    { memberId: 'des001', name: 'Emily Rodriguez', role: 'Designer', completedOrders: 35, avgSetupTime: 58, slaCompliance: 95, clientRating: 4.9, efficiency: 92, language: 'en' },
    { memberId: 'des002', name: 'Omar Al-Mahmoud', role: 'Designer', completedOrders: 28, avgSetupTime: 52, slaCompliance: 96, clientRating: 4.8, efficiency: 93, language: 'both' }
  ]);

  const [platformMetrics] = useState<PlatformMetrics[]>([
    { platform: 'Shopify', orders: 156, avgTime: 78, revenue: 124800, successRate: 99, growth: 15 },
    { platform: 'WooCommerce', orders: 89, avgTime: 85, revenue: 71200, successRate: 97, growth: 8 },
    { platform: 'Salla', orders: 67, avgTime: 72, revenue: 53600, successRate: 98, growth: 25 },
    { platform: 'Zid', orders: 43, avgTime: 69, revenue: 34400, successRate: 96, growth: 32 }
  ]);

  const currentMetrics = {
    totalOrders: metricsData.reduce((sum, day) => sum + day.orders, 0),
    avgSetupTime: Math.round(metricsData.reduce((sum, day) => sum + day.setupTime, 0) / metricsData.length),
    slaCompliance: Math.round(metricsData.reduce((sum, day) => sum + day.slaCompliance, 0) / metricsData.length),
    totalRevenue: metricsData.reduce((sum, day) => sum + day.revenue, 0),
    avgSatisfaction: (metricsData.reduce((sum, day) => sum + day.clientSatisfaction, 0) / metricsData.length).toFixed(1),
    teamEfficiency: Math.round(metricsData.reduce((sum, day) => sum + day.teamEfficiency, 0) / metricsData.length)
  };

  const refreshData = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  const exportData = () => {
    // In production, this would generate and download CSV/Excel
    console.log('Exporting analytics data...');
  };

  return (
    <div className="space-y-6 p-6 bg-[#0a0a0a] min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Performance Analytics</h1>
          <p className="text-gray-400">Deep insights into your 90-minute delivery promise</p>
        </div>
        
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            variant="outline" 
            onClick={refreshData}
            disabled={loading}
            className="border-gray-600"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          
          <Button 
            variant="outline" 
            onClick={exportData}
            className="border-gray-600"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <MetricCard
          title="Total Orders"
          value={currentMetrics.totalOrders.toString()}
          icon={<Target className="w-5 h-5" />}
          trend="+12%"
          trendUp={true}
          color="blue"
        />
        
        <MetricCard
          title="Avg Setup Time"
          value={`${currentMetrics.avgSetupTime}min`}
          icon={<Clock className="w-5 h-5" />}
          trend="-3min"
          trendUp={true}
          color="green"
          target="90min"
        />
        
        <MetricCard
          title="SLA Compliance"
          value={`${currentMetrics.slaCompliance}%`}
          icon={<Shield className="w-5 h-5" />}
          trend="+2%"
          trendUp={true}
          color="green"
          target="95%"
        />
        
        <MetricCard
          title="Revenue"
          value={`$${(currentMetrics.totalRevenue / 1000).toFixed(0)}k`}
          icon={<DollarSign className="w-5 h-5" />}
          trend="+18%"
          trendUp={true}
          color="yellow"
        />
        
        <MetricCard
          title="Client Rating"
          value={currentMetrics.avgSatisfaction}
          icon={<Star className="w-5 h-5" />}
          trend="+0.1"
          trendUp={true}
          color="purple"
          target="4.5"
        />
        
        <MetricCard
          title="Team Efficiency"
          value={`${currentMetrics.teamEfficiency}%`}
          icon={<Activity className="w-5 h-5" />}
          trend="+5%"
          trendUp={true}
          color="cyan"
        />
      </div>

      {/* Main Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="platforms">Platforms</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Setup Time Trend */}
            <Card className="p-6 bg-[#1a1a1a] border border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">Setup Time Trend</h3>
                <Badge className="bg-[#00ff88]/20 text-[#00ff88]">
                  Target: 90min
                </Badge>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={metricsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="date" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="setupTime" 
                    stroke="#00d4ff" 
                    strokeWidth={2}
                    dot={{ fill: '#00d4ff', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="90" 
                    stroke="#ff6b6b" 
                    strokeDasharray="5 5"
                    strokeWidth={1}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* SLA Compliance */}
            <Card className="p-6 bg-[#1a1a1a] border border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">SLA Compliance Rate</h3>
                <Badge className="bg-[#00ff88]/20 text-[#00ff88]">
                  {currentMetrics.slaCompliance}%
                </Badge>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={metricsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="date" stroke="#666" />
                  <YAxis domain={[90, 100]} stroke="#666" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="slaCompliance" 
                    stroke="#00ff88" 
                    fill="url(#slaGradient)"
                    strokeWidth={2}
                  />
                  <defs>
                    <linearGradient id="slaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00ff88" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#00ff88" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Revenue and Orders */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 bg-[#1a1a1a] border border-gray-800">
              <h3 className="text-lg font-bold text-white mb-4">Revenue & Orders</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={metricsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="date" stroke="#666" />
                  <YAxis yAxisId="left" stroke="#666" />
                  <YAxis yAxisId="right" orientation="right" stroke="#666" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Bar yAxisId="left" dataKey="revenue" fill="#00d4ff" />
                  <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#00ff88" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Client Satisfaction */}
            <Card className="p-6 bg-[#1a1a1a] border border-gray-800">
              <h3 className="text-lg font-bold text-white mb-4">Client Satisfaction</h3>
              <div className="flex items-center justify-center mb-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#00ff88] mb-2">
                    {currentMetrics.avgSatisfaction}
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${
                          star <= Math.round(parseFloat(currentMetrics.avgSatisfaction))
                            ? 'text-[#00ff88] fill-current'
                            : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-sm text-gray-400 mt-1">Average Rating</div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={metricsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="date" stroke="#666" />
                  <YAxis domain={[4, 5]} stroke="#666" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="clientSatisfaction" 
                    stroke="#00ff88" 
                    strokeWidth={3}
                    dot={{ fill: '#00ff88', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Performance Gauge */}
            <Card className="p-6 bg-[#1a1a1a] border border-gray-800">
              <h3 className="text-lg font-bold text-white mb-4">Overall Performance</h3>
              <div className="relative">
                <ResponsiveContainer width="100%" height={200}>
                  <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={[
                    { name: 'Performance', value: currentMetrics.teamEfficiency, fill: '#00ff88' }
                  ]}>
                    <RadialBar dataKey="value" fill="#00ff88" />
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#00ff88]">
                      {currentMetrics.teamEfficiency}%
                    </div>
                    <div className="text-sm text-gray-400">Efficiency</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Speed Metrics */}
            <Card className="p-6 bg-[#1a1a1a] border border-gray-800">
              <h3 className="text-lg font-bold text-white mb-4">Speed Metrics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Fastest Setup</span>
                  <span className="text-[#00ff88] font-bold">76min</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Average Setup</span>
                  <span className="text-white font-bold">{currentMetrics.avgSetupTime}min</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">SLA Target</span>
                  <span className="text-[#00d4ff] font-bold">90min</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Time Saved</span>
                  <span className="text-[#00ff88] font-bold">
                    {90 - currentMetrics.avgSetupTime}min
                  </span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-[#00ff88]/10 rounded-lg">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-[#00ff88]" />
                  <span className="text-sm text-[#00ff88]">
                    Beating SLA by {((90 - currentMetrics.avgSetupTime) / 90 * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </Card>

            {/* Quality Metrics */}
            <Card className="p-6 bg-[#1a1a1a] border border-gray-800">
              <h3 className="text-lg font-bold text-white mb-4">Quality Metrics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Success Rate</span>
                  <span className="text-[#00ff88] font-bold">
                    {currentMetrics.slaCompliance}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Client Rating</span>
                  <span className="text-[#00ff88] font-bold">
                    {currentMetrics.avgSatisfaction}/5.0
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Repeat Clients</span>
                  <span className="text-white font-bold">24%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Referrals</span>
                  <span className="text-white font-bold">31%</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-[#00d4ff]/10 rounded-lg">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-[#00d4ff]" />
                  <span className="text-sm text-[#00d4ff]">
                    Exceeding 4.5 target by {((parseFloat(currentMetrics.avgSatisfaction) - 4.5) * 100 / 4.5).toFixed(1)}%
                  </span>
                </div>
              </div>
            </Card>
          </div>

          {/* Detailed Performance Charts */}
          <Card className="p-6 bg-[#1a1a1a] border border-gray-800">
            <h3 className="text-lg font-bold text-white mb-4">Performance Correlation</h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={metricsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="date" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="setupTime" 
                  stroke="#00d4ff" 
                  name="Setup Time (min)"
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="slaCompliance" 
                  stroke="#00ff88" 
                  name="SLA Compliance (%)"
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="teamEfficiency" 
                  stroke="#ffd93d" 
                  name="Team Efficiency (%)"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        {/* Team Tab */}
        <TabsContent value="team" className="space-y-6">
          <Card className="p-6 bg-[#1a1a1a] border border-gray-800">
            <h3 className="text-lg font-bold text-white mb-6">Team Performance Leaderboard</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 text-gray-400">Team Member</th>
                    <th className="text-center py-3 text-gray-400">Orders</th>
                    <th className="text-center py-3 text-gray-400">Avg Time</th>
                    <th className="text-center py-3 text-gray-400">SLA</th>
                    <th className="text-center py-3 text-gray-400">Rating</th>
                    <th className="text-center py-3 text-gray-400">Efficiency</th>
                    <th className="text-center py-3 text-gray-400">Language</th>
                  </tr>
                </thead>
                <tbody>
                  {teamPerformance
                    .sort((a, b) => b.efficiency - a.efficiency)
                    .map((member, index) => (
                    <tr key={member.memberId} className="border-b border-gray-800">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          {index === 0 && <Trophy className="w-5 h-5 text-yellow-500" />}
                          {index === 1 && <Trophy className="w-5 h-5 text-gray-400" />}
                          {index === 2 && <Trophy className="w-5 h-5 text-orange-500" />}
                          <div>
                            <div className="font-medium text-white">{member.name}</div>
                            <div className="text-sm text-gray-400">{member.role}</div>
                          </div>
                        </div>
                      </td>
                      <td className="text-center text-white">{member.completedOrders}</td>
                      <td className="text-center">
                        <span className={member.avgSetupTime <= 60 ? 'text-[#00ff88]' : 'text-white'}>
                          {member.avgSetupTime}min
                        </span>
                      </td>
                      <td className="text-center">
                        <span className={member.slaCompliance >= 95 ? 'text-[#00ff88]' : 'text-white'}>
                          {member.slaCompliance}%
                        </span>
                      </td>
                      <td className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <span className="text-white">{member.clientRating}</span>
                          <Star className="w-4 h-4 text-[#00ff88] fill-current" />
                        </div>
                      </td>
                      <td className="text-center">
                        <Badge className={
                          member.efficiency >= 95 
                            ? 'bg-[#00ff88]/20 text-[#00ff88]'
                            : member.efficiency >= 90
                            ? 'bg-[#00d4ff]/20 text-[#00d4ff]'
                            : 'bg-gray-600/20 text-gray-400'
                        }>
                          {member.efficiency}%
                        </Badge>
                      </td>
                      <td className="text-center">
                        <Badge className={
                          member.language === 'both'
                            ? 'bg-purple-500/20 text-purple-400'
                            : 'bg-gray-600/20 text-gray-400'
                        }>
                          {member.language === 'both' ? '🌍 EN/AR' : member.language === 'ar' ? '🇸🇦 AR' : '🇺🇸 EN'}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* Platforms Tab */}
        <TabsContent value="platforms" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 bg-[#1a1a1a] border border-gray-800">
              <h3 className="text-lg font-bold text-white mb-4">Platform Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={platformMetrics}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    dataKey="orders"
                    nameKey="platform"
                  >
                    {platformMetrics.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={['#00d4ff', '#00ff88', '#ffd93d', '#ff6b6b'][index % 4]} 
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6 bg-[#1a1a1a] border border-gray-800">
              <h3 className="text-lg font-bold text-white mb-4">Platform Performance</h3>
              <div className="space-y-4">
                {platformMetrics.map((platform, index) => (
                  <div key={platform.platform} className="p-4 bg-[#0f0f0f] rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-white">{platform.platform}</span>
                      <Badge className={
                        platform.growth > 20 
                          ? 'bg-[#00ff88]/20 text-[#00ff88]'
                          : platform.growth > 10
                          ? 'bg-[#00d4ff]/20 text-[#00d4ff]'
                          : 'bg-gray-600/20 text-gray-400'
                      }>
                        +{platform.growth}%
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-gray-400">Orders</div>
                        <div className="text-white font-bold">{platform.orders}</div>
                      </div>
                      <div>
                        <div className="text-gray-400">Avg Time</div>
                        <div className="text-white font-bold">{platform.avgTime}min</div>
                      </div>
                      <div>
                        <div className="text-gray-400">Success</div>
                        <div className="text-white font-bold">{platform.successRate}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* AI Insights Tab */}
        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 bg-[#1a1a1a] border border-gray-800">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="w-6 h-6 text-[#00d4ff]" />
                <h3 className="text-lg font-bold text-white">AI Predictions</h3>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-[#00d4ff]/10 rounded-lg border border-[#00d4ff]/20">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-[#00d4ff]" />
                    <span className="font-medium text-[#00d4ff]">Optimization Opportunity</span>
                  </div>
                  <p className="text-sm text-gray-300">
                    By optimizing WooCommerce setup templates, you could reduce average setup time by 8-12 minutes.
                  </p>
                </div>
                
                <div className="p-4 bg-[#00ff88]/10 rounded-lg border border-[#00ff88]/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-[#00ff88]" />
                    <span className="font-medium text-[#00ff88]">Capacity Alert</span>
                  </div>
                  <p className="text-sm text-gray-300">
                    Current team can handle up to 35 orders/day. Consider hiring for projected 40% growth.
                  </p>
                </div>
                
                <div className="p-4 bg-[#ffd93d]/10 rounded-lg border border-[#ffd93d]/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Flame className="w-4 h-4 text-[#ffd93d]" />
                    <span className="font-medium text-[#ffd93d]">Market Trend</span>
                  </div>
                  <p className="text-sm text-gray-300">
                    Salla platform showing 25% growth - consider expanding Arabic-speaking team capacity.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-[#1a1a1a] border border-gray-800">
              <div className="flex items-center gap-3 mb-4">
                <Activity className="w-6 h-6 text-[#00ff88]" />
                <h3 className="text-lg font-bold text-white">Smart Recommendations</h3>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-[#0f0f0f] rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-[#00ff88]" />
                    <span className="font-medium text-white">High Priority</span>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">
                    Ahmed Al-Rashid consistently outperforms on Arabic projects. Consider promoting to Senior PM.
                  </p>
                  <Button size="sm" className="bg-[#00ff88] text-black">
                    Review Performance
                  </Button>
                </div>
                
                <div className="p-4 bg-[#0f0f0f] rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-[#00d4ff]" />
                    <span className="font-medium text-white">Team Balance</span>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">
                    Designer capacity at 80%. Consider onboarding junior designer for overflow.
                  </p>
                  <Button size="sm" variant="outline" className="border-[#00d4ff] text-[#00d4ff]">
                    View Hiring Plan
                  </Button>
                </div>
                
                <div className="p-4 bg-[#0f0f0f] rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="w-4 h-4 text-purple-400" />
                    <span className="font-medium text-white">Market Expansion</span>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">
                    Strong performance in GCC. Consider expanding to Jordan and Egypt markets.
                  </p>
                  <Button size="sm" variant="outline" className="border-purple-400 text-purple-400">
                    Market Analysis
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Metric Card Component
function MetricCard({ 
  title, 
  value, 
  icon, 
  trend, 
  trendUp, 
  color, 
  target 
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  trendUp: boolean;
  color: string;
  target?: string;
}) {
  const colorClasses = {
    blue: 'text-[#00d4ff]',
    green: 'text-[#00ff88]',
    yellow: 'text-[#ffd93d]',
    purple: 'text-purple-400',
    cyan: 'text-cyan-400'
  };

  return (
    <Card className="p-4 bg-[#1a1a1a] border border-gray-800">
      <div className="flex items-center justify-between mb-2">
        <div className={`p-2 rounded-lg bg-${color === 'blue' ? '[#00d4ff]' : color === 'green' ? '[#00ff88]' : color === 'yellow' ? '[#ffd93d]' : color === 'purple' ? 'purple-400' : 'cyan-400'}/20 ${colorClasses[color]}`}>
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-sm ${trendUp ? 'text-[#00ff88]' : 'text-red-400'}`}>
          {trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {trend}
        </div>
      </div>
      <div className="space-y-1">
        <div className="text-2xl font-bold text-white">{value}</div>
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-400">{title}</div>
          {target && (
            <div className="text-xs text-gray-500">Target: {target}</div>
          )}
        </div>
      </div>
    </Card>
  );
}

export default PerformanceAnalyticsDashboard;