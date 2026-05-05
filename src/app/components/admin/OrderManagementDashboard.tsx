/**
 * Admin Order Management Dashboard
 * Real-time monitoring of 90-minute setup processes
 */

import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { 
  Timer, 
  AlertTriangle, 
  CheckCircle, 
  Play, 
  Pause,
  Users,
  Clock,
  TrendingUp,
  Filter,
  Search,
  Bell,
  Zap,
  Target
} from 'lucide-react';
import { Order } from '../../lib/database-schema';

interface OrderStats {
  activeOrders: number;
  completedToday: number;
  avgSetupTime: number;
  slaCompliance: number;
  upcomingDeadlines: number;
}

export function OrderManagementDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<OrderStats>({
    activeOrders: 0,
    completedToday: 0,
    avgSetupTime: 0,
    slaCompliance: 0,
    upcomingDeadlines: 0
  });
  const [filter, setFilter] = useState<'all' | 'active' | 'completing_soon' | 'overdue'>('active');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - replace with real Firebase queries
  useEffect(() => {
    // Simulate real-time data fetching
    const mockOrders: Order[] = [
      {
        id: '1',
        orderNumber: 'OT-2024-001',
        clientId: 'client1',
        service: 'shopify',
        package: 'premium',
        status: 'in_progress',
        subtotal: 1899,
        tax: 0,
        total: 1899,
        currency: 'USD',
        startTime: { toMillis: () => Date.now() - 45 * 60 * 1000 } as any,
        deadline: { toMillis: () => Date.now() + 45 * 60 * 1000 } as any,
        actualDuration: undefined,
        slaCompliant: true,
        paymentStatus: 'captured',
        paymentMethod: 'stripe',
        storeName: 'Fashion Forward Store',
        assignedTeam: ['dev1', 'designer1'],
        projectManager: 'pm1',
        milestones: [],
        requirements: {} as any,
        createdAt: { toMillis: () => Date.now() - 50 * 60 * 1000 } as any,
        updatedAt: { toMillis: () => Date.now() } as any
      },
      {
        id: '2',
        orderNumber: 'OT-2024-002',
        clientId: 'client2',
        service: 'woocommerce',
        package: 'basic',
        status: 'in_progress',
        subtotal: 1299,
        tax: 0,
        total: 1299,
        currency: 'USD',
        startTime: { toMillis: () => Date.now() - 85 * 60 * 1000 } as any,
        deadline: { toMillis: () => Date.now() + 5 * 60 * 1000 } as any,
        actualDuration: undefined,
        slaCompliant: true,
        paymentStatus: 'captured',
        paymentMethod: 'stripe',
        storeName: 'Tech Gadgets Hub',
        assignedTeam: ['dev2'],
        projectManager: 'pm2',
        milestones: [],
        requirements: {} as any,
        createdAt: { toMillis: () => Date.now() - 90 * 60 * 1000 } as any,
        updatedAt: { toMillis: () => Date.now() } as any
      }
    ];

    setOrders(mockOrders);
    setStats({
      activeOrders: 2,
      completedToday: 8,
      avgSetupTime: 87,
      slaCompliance: 98.5,
      upcomingDeadlines: 1
    });
  }, []);

  const formatTimeRemaining = (deadline: any): string => {
    if (!deadline) return '--';
    const remaining = deadline.toMillis() - Date.now();
    if (remaining <= 0) return 'OVERDUE';
    
    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getTimeRemainingColor = (deadline: any): string => {
    if (!deadline) return 'text-gray-400';
    const remaining = deadline.toMillis() - Date.now();
    
    if (remaining <= 0) return 'text-red-400';
    if (remaining <= 15 * 60 * 1000) return 'text-yellow-400'; // 15 minutes
    return 'text-[#00ff88]';
  };

  const getUrgencyBadge = (deadline: any) => {
    if (!deadline) return null;
    const remaining = deadline.toMillis() - Date.now();
    
    if (remaining <= 0) {
      return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">OVERDUE</Badge>;
    }
    if (remaining <= 15 * 60 * 1000) {
      return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 animate-pulse">URGENT</Badge>;
    }
    return null;
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.storeName.toLowerCase().includes(searchTerm.toLowerCase());
    
    switch (filter) {
      case 'active':
        return matchesSearch && order.status === 'in_progress';
      case 'completing_soon':
        if (!order.deadline) return false;
        const remaining = order.deadline.toMillis() - Date.now();
        return matchesSearch && remaining <= 30 * 60 * 1000 && remaining > 0; // 30 minutes
      case 'overdue':
        if (!order.deadline) return false;
        return matchesSearch && order.deadline.toMillis() < Date.now();
      default:
        return matchesSearch;
    }
  });

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Order Management</h1>
          <p className="text-gray-400">Real-time monitoring of 90-minute setup processes</p>
        </div>
        
        <div className="flex items-center gap-4">
          <Button className="bg-[#00d4ff] text-black hover:bg-[#00ff88]">
            <Bell className="w-4 h-4 mr-2" />
            Alert Settings
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="bg-[#1a1a1a] border border-[#00d4ff]/30 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Active Orders</p>
              <p className="text-2xl font-bold text-[#00d4ff]">{stats.activeOrders}</p>
            </div>
            <Timer className="w-8 h-8 text-[#00d4ff]" />
          </div>
        </Card>

        <Card className="bg-[#1a1a1a] border border-[#00ff88]/30 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Completed Today</p>
              <p className="text-2xl font-bold text-[#00ff88]">{stats.completedToday}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-[#00ff88]" />
          </div>
        </Card>

        <Card className="bg-[#1a1a1a] border border-[#ffd93d]/30 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Avg Setup Time</p>
              <p className="text-2xl font-bold text-[#ffd93d]">{stats.avgSetupTime}min</p>
            </div>
            <Clock className="w-8 h-8 text-[#ffd93d]" />
          </div>
        </Card>

        <Card className="bg-[#1a1a1a] border border-[#00ff88]/30 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">SLA Compliance</p>
              <p className="text-2xl font-bold text-[#00ff88]">{stats.slaCompliance}%</p>
            </div>
            <Target className="w-8 h-8 text-[#00ff88]" />
          </div>
        </Card>

        <Card className="bg-[#1a1a1a] border border-red-500/30 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Urgent Orders</p>
              <p className="text-2xl font-bold text-red-400">{stats.upcomingDeadlines}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex gap-2">
          {[
            { key: 'all', label: 'All Orders' },
            { key: 'active', label: 'Active' },
            { key: 'completing_soon', label: 'Completing Soon' },
            { key: 'overdue', label: 'Overdue' }
          ].map(({ key, label }) => (
            <Button
              key={key}
              variant={filter === key ? "default" : "outline"}
              onClick={() => setFilter(key as any)}
              className={filter === key ? "bg-[#00d4ff] text-black" : "border-gray-600 text-gray-400"}
            >
              <Filter className="w-4 h-4 mr-2" />
              {label}
            </Button>
          ))}
        </div>
        
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#1a1a1a] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#00d4ff] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Active Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => {
          const timeRemaining = formatTimeRemaining(order.deadline);
          const urgencyBadge = getUrgencyBadge(order.deadline);
          const progress = Math.floor(Math.random() * 100); // Mock progress

          return (
            <Card key={order.id} className="bg-[#1a1a1a] border border-gray-800 hover:border-[#00d4ff]/50 transition-all duration-300">
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  
                  {/* Order Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-white">{order.orderNumber}</h3>
                      {urgencyBadge}
                      <Badge className="bg-[#00d4ff]/20 text-[#00d4ff] border-[#00d4ff]/30">
                        {order.service.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-300 mb-1">{order.storeName}</p>
                    <p className="text-sm text-gray-400">
                      Package: {order.package} • ${order.total} {order.currency}
                    </p>
                  </div>

                  {/* Progress */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Progress</span>
                      <span className="text-sm font-mono text-gray-400">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>

                  {/* Time Remaining */}
                  <div className="text-center lg:text-right">
                    <div className={`text-2xl font-mono font-bold ${getTimeRemainingColor(order.deadline)}`}>
                      {timeRemaining}
                    </div>
                    <div className="text-sm text-gray-400">
                      {timeRemaining === 'OVERDUE' ? 'Time Exceeded' : 'Remaining'}
                    </div>
                  </div>

                  {/* Team */}
                  <div className="text-center lg:text-right">
                    <div className="flex items-center gap-1 mb-1">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-400">{order.assignedTeam.length}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      PM: {order.projectManager}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-[#00d4ff] text-black hover:bg-[#00ff88]">
                      <Play className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    
                    {timeRemaining !== 'OVERDUE' && (
                      <Button size="sm" variant="outline" className="border-gray-600 text-gray-400">
                        <Pause className="w-4 h-4 mr-1" />
                        Pause
                      </Button>
                    )}
                  </div>
                </div>

                {/* Quick Actions for Urgent Orders */}
                {urgencyBadge && (
                  <div className="mt-4 pt-4 border-t border-gray-800">
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-yellow-400">⚠️ Requires immediate attention</span>
                      <div className="flex gap-2 ml-auto">
                        <Button size="sm" className="bg-yellow-500 text-black hover:bg-yellow-400">
                          <Zap className="w-4 h-4 mr-1" />
                          Escalate
                        </Button>
                        <Button size="sm" className="bg-[#00ff88] text-black hover:bg-[#00d4ff]">
                          <Users className="w-4 h-4 mr-1" />
                          Add Resources
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          );
        })}

        {filteredOrders.length === 0 && (
          <Card className="bg-[#1a1a1a] border border-gray-800 p-12 text-center">
            <div className="text-gray-400">
              <Timer className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No orders found</h3>
              <p>No orders match your current filter criteria.</p>
            </div>
          </Card>
        )}
      </div>

      {/* Performance Insights */}
      <Card className="bg-[#1a1a1a] border border-[#00d4ff]/30 p-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-[#00d4ff]" />
          Performance Insights
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#00ff88] mb-1">2.3min</div>
            <div className="text-sm text-gray-400">Avg time saved per order this week</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-[#00d4ff] mb-1">15</div>
            <div className="text-sm text-gray-400">Orders ahead of schedule today</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-[#ffd93d] mb-1">1</div>
            <div className="text-sm text-gray-400">SLA breaches this month</div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default OrderManagementDashboard;