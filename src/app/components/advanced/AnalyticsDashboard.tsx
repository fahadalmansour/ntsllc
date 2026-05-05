import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, Users, DollarSign, Activity, Eye, Clock, Globe, Zap, Target, Brain, Layers } from 'lucide-react';

const AnalyticsDashboard = () => {
  const [realTimeData, setRealTimeData] = useState({
    activeUsers: 1247,
    revenue: 89420,
    conversions: 342,
    pageViews: 15680,
    avgSessionTime: '4m 32s',
    bounceRate: 28.4,
    loadTime: 1.2,
    errorRate: 0.03
  });

  const [trendData, setTrendData] = useState([
    { name: 'Jan', revenue: 65000, users: 980, conversions: 245 },
    { name: 'Feb', revenue: 72000, users: 1120, conversions: 289 },
    { name: 'Mar', revenue: 68000, users: 1050, conversions: 267 },
    { name: 'Apr', revenue: 78000, users: 1290, conversions: 315 },
    { name: 'May', revenue: 85000, users: 1380, conversions: 358 },
    { name: 'Jun', revenue: 89420, users: 1247, conversions: 342 }
  ]);

  const [trafficSources, setTrafficSources] = useState([
    { name: 'Organic Search', value: 45, color: '#4AE54A' },
    { name: 'Direct', value: 28, color: '#C0C5CE' },
    { name: 'Social Media', value: 15, color: '#FFD700' },
    { name: 'Referrals', value: 8, color: '#FF6B6B' },
    { name: 'Email', value: 4, color: '#4ECDC4' }
  ]);

  const [userJourney, setUserJourney] = useState([
    { stage: 'Awareness', users: 10000, conversion: 100 },
    { stage: 'Interest', users: 3500, conversion: 35 },
    { stage: 'Consideration', users: 1200, conversion: 12 },
    { stage: 'Purchase', users: 420, conversion: 4.2 },
    { stage: 'Retention', users: 315, conversion: 3.15 }
  ]);

  const [predictiveInsights, setPredictiveInsights] = useState([
    { metric: 'Revenue Growth', prediction: '+23%', confidence: 87, trend: 'up' },
    { metric: 'User Acquisition', prediction: '+15%', confidence: 92, trend: 'up' },
    { metric: 'Churn Rate', prediction: '-8%', confidence: 78, trend: 'down' },
    { metric: 'Customer LTV', prediction: '+31%', confidence: 85, trend: 'up' }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10 - 5),
        revenue: prev.revenue + Math.floor(Math.random() * 1000 - 500),
        pageViews: prev.pageViews + Math.floor(Math.random() * 50),
        conversions: prev.conversions + Math.floor(Math.random() * 3 - 1)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const MetricCard = ({ title, value, change, icon: Icon, format = 'number' }) => {
    const formatValue = (val) => {
      if (format === 'currency') return `$${val.toLocaleString()}`;
      if (format === 'percentage') return `${val}%`;
      if (format === 'time') return val;
      return val.toLocaleString();
    };

    return (
      <Card className="bg-[#12151C] border-[#4AE54A]/20 card-hover-glow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#C0C5CE]/70 font-mono text-sm">{title}</p>
              <p className="text-2xl text-[#4AE54A] font-mono font-medium mt-1">
                {formatValue(value)}
              </p>
              {change && (
                <div className={`flex items-center mt-2 text-sm font-mono ${
                  change > 0 ? 'text-[#4AE54A]' : 'text-red-400'
                }`}>
                  {change > 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                  {Math.abs(change)}%
                </div>
              )}
            </div>
            <div className="p-3 bg-[#4AE54A]/10 rounded-lg">
              <Icon className="w-6 h-6 text-[#4AE54A]" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const CustomerJourneyViz = () => (
    <Card className="bg-[#12151C] border-[#4AE54A]/20">
      <CardHeader>
        <CardTitle className="text-[#4AE54A] font-mono">Customer Journey Funnel</CardTitle>
        <CardDescription className="text-[#C0C5CE]/70 font-mono">
          Conversion rates through each stage
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {userJourney.map((stage, index) => (
            <div key={stage.stage} className="relative">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[#C0C5CE] font-mono text-sm">{stage.stage}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-[#4AE54A] font-mono text-sm">
                    {stage.users.toLocaleString()} users
                  </span>
                  <Badge variant="outline" className="border-[#4AE54A]/30 text-[#4AE54A] font-mono">
                    {stage.conversion}%
                  </Badge>
                </div>
              </div>
              <div className="relative">
                <Progress 
                  value={stage.conversion} 
                  className="h-3 bg-[#0B0D12]" 
                />
                <div 
                  className="absolute top-0 left-0 h-3 bg-gradient-to-r from-[#4AE54A] to-[#4AE54A]/70 rounded-full transition-all duration-500"
                  style={{ width: `${stage.conversion}%` }}
                />
              </div>
              {index < userJourney.length - 1 && (
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#4AE54A]/50" />
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const PredictiveInsights = () => (
    <Card className="bg-[#12151C] border-[#4AE54A]/20">
      <CardHeader>
        <CardTitle className="text-[#4AE54A] font-mono flex items-center">
          <Brain className="w-5 h-5 mr-2" />
          AI Predictive Insights
        </CardTitle>
        <CardDescription className="text-[#C0C5CE]/70 font-mono">
          Next 30 days forecast with confidence intervals
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {predictiveInsights.map((insight) => (
            <div key={insight.metric} className="border border-[#4AE54A]/20 rounded-lg p-4 bg-[#0B0D12]/50">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[#C0C5CE] font-mono text-sm">{insight.metric}</span>
                <div className="flex items-center space-x-2">
                  <span className={`font-mono font-medium ${
                    insight.trend === 'up' ? 'text-[#4AE54A]' : 'text-red-400'
                  }`}>
                    {insight.prediction}
                  </span>
                  {insight.trend === 'up' ? 
                    <TrendingUp className="w-4 h-4 text-[#4AE54A]" /> : 
                    <TrendingDown className="w-4 h-4 text-red-400" />
                  }
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#C0C5CE]/60 font-mono text-xs">Confidence</span>
                <div className="flex items-center space-x-2">
                  <Progress value={insight.confidence} className="w-20 h-2" />
                  <span className="text-[#4AE54A] font-mono text-xs">{insight.confidence}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-[#0B0D12] terminal-theme p-6">
      <div className="max-w-[1400px] mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-mono text-[#4AE54A] mb-2">Analytics Dashboard</h1>
            <p className="text-[#C0C5CE]/70 font-mono">Real-time business intelligence and insights</p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="border-[#4AE54A] text-[#4AE54A] font-mono neural-pulse">
              Live Data
            </Badge>
            <Badge variant="outline" className="border-[#C0C5CE]/30 text-[#C0C5CE] font-mono">
              Updated: {new Date().toLocaleTimeString()}
            </Badge>
          </div>
        </div>

        {/* Real-time Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Active Users"
            value={realTimeData.activeUsers}
            change={12.5}
            icon={Users}
          />
          <MetricCard
            title="Revenue"
            value={realTimeData.revenue}
            change={23.1}
            icon={DollarSign}
            format="currency"
          />
          <MetricCard
            title="Conversions"
            value={realTimeData.conversions}
            change={8.7}
            icon={Target}
          />
          <MetricCard
            title="Page Views"
            value={realTimeData.pageViews}
            change={15.3}
            icon={Eye}
          />
        </div>

        {/* Main Analytics */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-[#12151C] border border-[#4AE54A]/20">
            <TabsTrigger value="overview" className="font-mono">Overview</TabsTrigger>
            <TabsTrigger value="revenue" className="font-mono">Revenue</TabsTrigger>
            <TabsTrigger value="users" className="font-mono">Users</TabsTrigger>
            <TabsTrigger value="performance" className="font-mono">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Trends */}
              <Card className="bg-[#12151C] border-[#4AE54A]/20">
                <CardHeader>
                  <CardTitle className="text-[#4AE54A] font-mono">Revenue Trends</CardTitle>
                  <CardDescription className="text-[#C0C5CE]/70 font-mono">
                    6-month revenue performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#4AE54A20" />
                      <XAxis dataKey="name" stroke="#C0C5CE" fontSize={12} fontFamily="JetBrains Mono" />
                      <YAxis stroke="#C0C5CE" fontSize={12} fontFamily="JetBrains Mono" />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: '#12151C',
                          border: '1px solid #4AE54A40',
                          borderRadius: '8px',
                          fontFamily: 'JetBrains Mono'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#4AE54A" 
                        fill="url(#revenueGradient)" 
                        strokeWidth={2}
                      />
                      <defs>
                        <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4AE54A" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#4AE54A" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Traffic Sources */}
              <Card className="bg-[#12151C] border-[#4AE54A]/20">
                <CardHeader>
                  <CardTitle className="text-[#4AE54A] font-mono">Traffic Sources</CardTitle>
                  <CardDescription className="text-[#C0C5CE]/70 font-mono">
                    Visitor acquisition channels
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={trafficSources}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {trafficSources.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: '#12151C',
                          border: '1px solid #4AE54A40',
                          borderRadius: '8px',
                          fontFamily: 'JetBrains Mono'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CustomerJourneyViz />
              <PredictiveInsights />
            </div>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <MetricCard
                title="Monthly Recurring Revenue"
                value={68420}
                change={15.8}
                icon={DollarSign}
                format="currency"
              />
              <MetricCard
                title="Average Order Value"
                value={247}
                change={12.3}
                icon={TrendingUp}
                format="currency"
              />
              <MetricCard
                title="Customer LTV"
                value={1580}
                change={28.7}
                icon={Target}
                format="currency"
              />
            </div>

            <Card className="bg-[#12151C] border-[#4AE54A]/20">
              <CardHeader>
                <CardTitle className="text-[#4AE54A] font-mono">Revenue Analysis</CardTitle>
                <CardDescription className="text-[#C0C5CE]/70 font-mono">
                  Detailed revenue breakdown and trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#4AE54A20" />
                    <XAxis dataKey="name" stroke="#C0C5CE" fontSize={12} fontFamily="JetBrains Mono" />
                    <YAxis stroke="#C0C5CE" fontSize={12} fontFamily="JetBrains Mono" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#12151C',
                        border: '1px solid #4AE54A40',
                        borderRadius: '8px',
                        fontFamily: 'JetBrains Mono'
                      }}
                    />
                    <Bar dataKey="revenue" fill="#4AE54A" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Total Users"
                value={realTimeData.activeUsers}
                change={18.4}
                icon={Users}
              />
              <MetricCard
                title="Session Duration"
                value={realTimeData.avgSessionTime}
                change={7.2}
                icon={Clock}
                format="time"
              />
              <MetricCard
                title="Bounce Rate"
                value={realTimeData.bounceRate}
                change={-5.3}
                icon={Activity}
                format="percentage"
              />
              <MetricCard
                title="Return Visitors"
                value={67.8}
                change={12.1}
                icon={Globe}
                format="percentage"
              />
            </div>

            <Card className="bg-[#12151C] border-[#4AE54A]/20">
              <CardHeader>
                <CardTitle className="text-[#4AE54A] font-mono">User Growth</CardTitle>
                <CardDescription className="text-[#C0C5CE]/70 font-mono">
                  User acquisition and retention metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#4AE54A20" />
                    <XAxis dataKey="name" stroke="#C0C5CE" fontSize={12} fontFamily="JetBrains Mono" />
                    <YAxis stroke="#C0C5CE" fontSize={12} fontFamily="JetBrains Mono" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#12151C',
                        border: '1px solid #4AE54A40',
                        borderRadius: '8px',
                        fontFamily: 'JetBrains Mono'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="users" 
                      stroke="#4AE54A" 
                      strokeWidth={3}
                      dot={{ fill: '#4AE54A', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Page Load Time"
                value={realTimeData.loadTime}
                change={-8.3}
                icon={Zap}
                format="time"
              />
              <MetricCard
                title="Error Rate"
                value={realTimeData.errorRate}
                change={-12.7}
                icon={Activity}
                format="percentage"
              />
              <MetricCard
                title="Uptime"
                value={99.97}
                change={0.1}
                icon={Globe}
                format="percentage"
              />
              <MetricCard
                title="API Response"
                value={245}
                change={-15.2}
                icon={Layers}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;