import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Plus, 
  Rocket, 
  Zap, 
  Users, 
  ShoppingCart, 
  Code, 
  Settings, 
  Mail,
  Bell,
  Download,
  Upload,
  RefreshCw,
  Eye,
  Edit,
  Trash2,
  Search
} from 'lucide-react';

interface QuickActionsProps {
  onNavigate?: (section: string) => void;
  className?: string;
}

export function QuickActions({ onNavigate, className = '' }: QuickActionsProps) {
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  const handleAction = async (action: string, route?: string) => {
    setIsProcessing(action);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (route && onNavigate) {
      onNavigate(route);
    }
    
    setIsProcessing(null);
  };

  const primaryActions = [
    {
      id: 'new-service',
      label: 'Add New Service',
      description: 'Create a new service package',
      icon: Plus,
      color: 'from-[#00d4ff] to-[#00ff88]',
      route: 'services'
    },
    {
      id: 'launch-store',
      label: 'Launch Store',
      description: 'Deploy new e-commerce store',
      icon: Rocket,
      color: 'from-[#00ff88] to-[#00d4ff]',
      route: 'store-builder'
    },
    {
      id: 'ai-analysis',
      label: 'Run AI Analysis',
      description: 'Analyze code and performance',
      icon: Zap,
      color: 'from-[#ffd93d] to-[#00ff88]',
      route: 'code-analyzer'
    },
    {
      id: 'manage-clients',
      label: 'Client Dashboard',
      description: 'View and manage clients',
      icon: Users,
      color: 'from-[#00d4ff] to-[#ffd93d]',
      route: 'content-manager'
    }
  ];

  const secondaryActions = [
    { id: 'view-orders', label: 'View Orders', icon: ShoppingCart, count: 12 },
    { id: 'system-health', label: 'System Health', icon: Eye, status: 'healthy' },
    { id: 'backup-data', label: 'Backup Data', icon: Download, lastRun: '2 hours ago' },
    { id: 'notifications', label: 'Notifications', icon: Bell, count: 5 },
    { id: 'settings', label: 'Settings', icon: Settings, route: 'settings' },
    { id: 'refresh-cache', label: 'Refresh Cache', icon: RefreshCw, action: 'refresh' }
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Primary Quick Actions */}
      <Card className="bg-[#1a1a1a] border-[#00d4ff]/30 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white font-mono">🚀 Quick Actions</h2>
          <Badge className="bg-[#00ff88]/20 text-[#00ff88] font-mono">
            Ready to Deploy
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {primaryActions.map((action) => (
            <Button
              key={action.id}
              onClick={() => handleAction(action.id, action.route)}
              disabled={isProcessing === action.id}
              className={`h-auto p-4 bg-gradient-to-r ${action.color} text-black hover:scale-105 transition-all duration-300 relative overflow-hidden group`}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="w-full h-full" style={{
                  backgroundImage: `
                    linear-gradient(90deg, #ffffff 1px, transparent 1px),
                    linear-gradient(180deg, #ffffff 1px, transparent 1px)
                  `,
                  backgroundSize: '8px 8px'
                }} />
              </div>
              
              <div className="relative z-10 flex flex-col items-center space-y-2">
                {isProcessing === action.id ? (
                  <RefreshCw className="w-6 h-6 animate-spin" />
                ) : (
                  <action.icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                )}
                <div className="text-center">
                  <div className="font-bold font-mono text-sm">{action.label}</div>
                  <div className="text-xs opacity-80 font-mono">{action.description}</div>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </Card>

      {/* Secondary Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {secondaryActions.map((action) => (
          <Card key={action.id} className="bg-[#1a1a1a] border-[#00d4ff]/20 p-4 hover:border-[#00d4ff]/40 transition-all duration-300">
            <button
              onClick={() => handleAction(action.id, action.route)}
              disabled={isProcessing === action.id}
              className="w-full flex items-center justify-between text-left group"
            >
              <div className="flex items-center space-x-3">
                {isProcessing === action.id ? (
                  <RefreshCw className="w-5 h-5 text-[#00d4ff] animate-spin" />
                ) : (
                  <action.icon className="w-5 h-5 text-[#00d4ff] group-hover:text-[#00ff88] transition-colors" />
                )}
                <div>
                  <div className="text-white font-mono text-sm font-medium">{action.label}</div>
                  {'lastRun' in action && (
                    <div className="text-[#a0a0a0] font-mono text-xs">Last: {action.lastRun}</div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {'count' in action && (
                  <Badge className="bg-[#00ff88]/20 text-[#00ff88] font-mono text-xs">
                    {action.count}
                  </Badge>
                )}
                {'status' in action && action.status === 'healthy' && (
                  <div className="w-2 h-2 bg-[#00ff88] rounded-full animate-pulse"></div>
                )}
              </div>
            </button>
          </Card>
        ))}
      </div>

      {/* System Overview Mini Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-[#1a1a1a] border-[#00d4ff]/20 p-4 text-center">
          <div className="text-2xl font-bold text-[#00ff88] font-mono">99.9%</div>
          <div className="text-xs text-[#a0a0a0] font-mono">Uptime</div>
        </Card>
        
        <Card className="bg-[#1a1a1a] border-[#00d4ff]/20 p-4 text-center">
          <div className="text-2xl font-bold text-[#00d4ff] font-mono">90min</div>
          <div className="text-xs text-[#a0a0a0] font-mono">Avg Deploy</div>
        </Card>
        
        <Card className="bg-[#1a1a1a] border-[#00d4ff]/20 p-4 text-center">
          <div className="text-2xl font-bold text-[#ffd93d] font-mono">4.9/5</div>
          <div className="text-xs text-[#a0a0a0] font-mono">Rating</div>
        </Card>
        
        <Card className="bg-[#1a1a1a] border-[#00d4ff]/20 p-4 text-center">
          <div className="text-2xl font-bold text-[#00ff88] font-mono">$2.3K</div>
          <div className="text-xs text-[#a0a0a0] font-mono">Today</div>
        </Card>
      </div>
    </div>
  );
}

export default QuickActions;