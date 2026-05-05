import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingBag,
  FileText,
  Users,
  BarChart3,
  Settings,
  Package,
  DollarSign,
  Bell,
  Shield,
  LogOut,
  Globe,
  Code,
  Zap,
  Database,
  Cloud
} from 'lucide-react';
import { NeoIcon } from '../icons/NeoLogo';

interface AdminSidebarProps {
  onNavigate?: (section: string) => void;
}

const menuItems = [
  { href: 'admin-overview', icon: LayoutDashboard, label: 'Overview', category: 'main' },
  { href: 'services', icon: ShoppingBag, label: 'Services', category: 'main' },
  { href: 'content-manager', icon: FileText, label: 'Content', category: 'main' },
  { href: 'ecommerce-master-hub', icon: Package, label: 'E-commerce Hub', category: 'business' },
  { href: 'store-builder', icon: Globe, label: 'Store Builder', category: 'business' },
  { href: 'code-analyzer', icon: Code, label: 'Code Analyzer', category: 'tools' },
  { href: 'vertex-ai-manager', icon: Zap, label: 'AI Manager', category: 'ai' },
  { href: 'analytics', icon: BarChart3, label: 'Analytics', category: 'insights' },
  { href: 'billing', icon: DollarSign, label: 'Billing', category: 'business' },
  { href: 'security', icon: Shield, label: 'Security', category: 'system' },
  { href: 'settings', icon: Settings, label: 'Settings', category: 'system' },
];

export function AdminSidebar({ onNavigate }: AdminSidebarProps) {
  const [currentPath, setCurrentPath] = useState('admin-overview');

  const handleNavigation = (path: string) => {
    setCurrentPath(path);
    onNavigate?.(path);
  };

  const categories = {
    main: 'Core Functions',
    business: 'Business Tools',
    tools: 'Developer Tools',
    ai: 'AI & Automation',
    insights: 'Analytics',
    system: 'System & Config'
  };

  return (
    <div className="w-64 bg-[#1a1a1a] border-r border-[#00d4ff]/20 flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-[#00d4ff]/20">
        <div className="flex items-center space-x-3">
          <NeoIcon 
            width={32} 
            height={32} 
            animated={true}
            className="hover:scale-110 transition-transform duration-300"
          />
          <div>
            <h1 className="text-xl font-bold text-white font-mono">
              Neo<span className="text-[#00d4ff]">Admin</span>
            </h1>
            <p className="text-xs text-[#a0a0a0] font-mono">Control Panel v2.0</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {Object.entries(categories).map(([categoryKey, categoryLabel]) => (
          <div key={categoryKey} className="mb-6">
            <h3 className="text-xs text-[#00d4ff] font-mono font-medium mb-2 px-3">
              ./{categoryKey}/
            </h3>
            <div className="space-y-1">
              {menuItems
                .filter(item => item.category === categoryKey)
                .map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavigation(item.href)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 text-left font-mono text-sm group ${
                    currentPath === item.href
                      ? 'bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/30'
                      : 'text-[#a0a0a0] hover:text-white hover:bg-[#00d4ff]/5'
                  }`}
                >
                  <item.icon className={`w-4 h-4 ${
                    currentPath === item.href ? 'text-[#00d4ff]' : 'text-[#a0a0a0] group-hover:text-[#00ff88]'
                  }`} />
                  <span>{item.label}</span>
                  {currentPath === item.href && (
                    <div className="ml-auto w-2 h-2 bg-[#00ff88] rounded-full animate-pulse" />
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-[#00d4ff]/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#00ff88] flex items-center justify-center text-white font-bold text-sm">
            FA
          </div>
          <div className="flex-1">
            <p className="text-white text-sm font-medium font-mono">Fahad Almansour</p>
            <p className="text-[#a0a0a0] text-xs font-mono">CEO & Founder</p>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-[#a0a0a0]">System Status</span>
            <span className="text-[#00ff88]">Online</span>
          </div>
          <div className="flex justify-between text-xs font-mono">
            <span className="text-[#a0a0a0]">Active Users</span>
            <span className="text-white">127</span>
          </div>
          <div className="flex justify-between text-xs font-mono">
            <span className="text-[#a0a0a0]">Revenue Today</span>
            <span className="text-[#00ff88]">$2,340</span>
          </div>
        </div>

        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors font-mono text-sm">
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}