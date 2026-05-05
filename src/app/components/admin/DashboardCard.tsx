import React from 'react';
import { Card } from '../ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  change: string;
  icon: React.ReactNode;
  trend: 'up' | 'down';
  className?: string;
}

export function DashboardCard({ 
  title, 
  value, 
  change, 
  icon, 
  trend, 
  className = '' 
}: DashboardCardProps) {
  return (
    <Card className={`bg-[#1a1a1a] border-[#00d4ff]/30 p-6 hover:border-[#00d4ff]/50 transition-all duration-300 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-[#a0a0a0] text-sm font-mono mb-1">{title}</p>
          <p className="text-3xl font-bold text-white font-mono mb-2">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          <div className="flex items-center space-x-2">
            {trend === 'up' ? (
              <TrendingUp className="w-4 h-4 text-[#00ff88]" />
            ) : (
              <TrendingDown className="w-4 h-4 text-[#ff6b6b]" />
            )}
            <span className={`text-sm font-mono ${
              trend === 'up' ? 'text-[#00ff88]' : 'text-[#ff6b6b]'
            }`}>
              {change}
            </span>
          </div>
        </div>
        <div className={`p-3 rounded-lg ${
          trend === 'up' ? 'bg-[#00ff88]/10' : 'bg-[#00d4ff]/10'
        }`}>
          {icon}
        </div>
      </div>
    </Card>
  );
}

export default DashboardCard;