/**
 * Capacity Status Widget - Small status indicator for the interface
 * Shows current capacity status in a compact format
 */

import React, { useState, useEffect } from 'react';
import { Activity, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { useLanguage } from '../../contexts/LanguageContext';
import { LocalizedText } from '../LanguageSwitcher';
import { getCurrentCapacityLoad, CapacityStatus } from '../../lib/capacity-management';

interface CapacityStatusWidgetProps {
  showDetails?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function CapacityStatusWidget({ 
  showDetails = false, 
  onClick,
  className = '' 
}: CapacityStatusWidgetProps) {
  const { language, isRTL } = useLanguage();
  const [capacity, setCapacity] = useState<CapacityStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCapacity = async () => {
      try {
        const data = await getCurrentCapacityLoad();
        setCapacity(data);
      } catch (error) {
        console.error('Failed to load capacity status:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCapacity();
    
    // Update every 2 minutes
    const interval = setInterval(loadCapacity, 2 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading || !capacity) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
        <span className="text-xs text-gray-500">
          <LocalizedText arText="جاري التحميل..." enText="Loading..." />
        </span>
      </div>
    );
  }

  const getStatusColor = (mode: string, utilization: number) => {
    if (mode === 'peak') return 'bg-red-500';
    if (mode === 'busy' || utilization > 80) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStatusIcon = (mode: string) => {
    switch (mode) {
      case 'peak': return <AlertCircle className="w-3 h-3" />;
      case 'busy': return <Clock className="w-3 h-3" />;
      default: return <CheckCircle className="w-3 h-3" />;
    }
  };

  const getStatusText = (mode: string) => {
    switch (mode) {
      case 'peak': 
        return language === 'ar' ? 'ذروة' : 'Peak';
      case 'busy': 
        return language === 'ar' ? 'مشغول' : 'Busy';
      default: 
        return language === 'ar' ? 'عادي' : 'Normal';
    }
  };

  const tooltipContent = (
    <div className={`p-2 space-y-1 ${isRTL ? 'text-right' : 'text-left'}`}>
      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
        <span className="text-xs text-gray-300">
          <LocalizedText arText="الاستخدام:" enText="Utilization:" />
        </span>
        <span className="text-xs text-white font-mono">{capacity.current}%</span>
      </div>
      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
        <span className="text-xs text-gray-300">
          <LocalizedText arText="المشاريع:" enText="Projects:" />
        </span>
        <span className="text-xs text-white font-mono">{capacity.activeProjects}</span>
      </div>
      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
        <span className="text-xs text-gray-300">
          <LocalizedText arText="الفريق:" enText="Team:" />
        </span>
        <span className="text-xs text-white font-mono">
          {capacity.teamAvailable}/{capacity.totalTeam}
        </span>
      </div>
      {capacity.majorClients.length > 0 && (
        <div className="border-t border-gray-600 pt-1 mt-1">
          <span className="text-xs text-yellow-400">
            <LocalizedText 
              arText={`مشروع مؤسسي: ${capacity.majorClients[0].name}`}
              enText={`Enterprise: ${capacity.majorClients[0].name}`}
            />
          </span>
        </div>
      )}
    </div>
  );

  if (showDetails) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClick}
              className={`flex items-center gap-2 hover:bg-gray-800/50 ${className}`}
            >
              <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={`w-2 h-2 rounded-full ${getStatusColor(capacity.mode, capacity.current)}`}></div>
                <span className="text-xs text-gray-300">
                  <LocalizedText arText="السعة:" enText="Capacity:" />
                </span>
                <span className="text-xs text-white font-mono">{capacity.current}%</span>
                <Badge variant="outline" className="text-xs px-2 py-0">
                  {getStatusText(capacity.mode)}
                </Badge>
              </div>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="bg-[#1a1a1a] border-[#00d4ff]/30">
            {tooltipContent}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  // Simple indicator version
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div 
            className={`flex items-center gap-2 cursor-pointer ${className}`}
            onClick={onClick}
          >
            <div className={`w-2 h-2 rounded-full ${getStatusColor(capacity.mode, capacity.current)} animate-pulse`}></div>
            <span className="text-xs text-gray-400 hover:text-gray-300 transition-colors">
              <LocalizedText 
                arText={`النظام: ${getStatusText(capacity.mode)}`}
                enText={`System: ${getStatusText(capacity.mode)}`}
              />
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="bg-[#1a1a1a] border-[#00d4ff]/30">
          {tooltipContent}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

/**
 * Compact version for mobile or minimal spaces
 */
export function CapacityIndicator({ onClick, className = '' }: { onClick?: () => void; className?: string }) {
  const [capacity, setCapacity] = useState<CapacityStatus | null>(null);

  useEffect(() => {
    const loadCapacity = async () => {
      try {
        const data = await getCurrentCapacityLoad();
        setCapacity(data);
      } catch (error) {
        console.error('Failed to load capacity:', error);
      }
    };

    loadCapacity();
    const interval = setInterval(loadCapacity, 2 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (!capacity) {
    return <div className={`w-2 h-2 bg-gray-500 rounded-full animate-pulse ${className}`}></div>;
  }

  const getStatusColor = (mode: string, utilization: number) => {
    if (mode === 'peak') return 'bg-red-500';
    if (mode === 'busy' || utilization > 80) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div 
      className={`w-2 h-2 rounded-full cursor-pointer ${getStatusColor(capacity.mode, capacity.current)} ${
        capacity.mode !== 'standard' ? 'animate-pulse' : ''
      } ${className}`}
      onClick={onClick}
      title={`System: ${capacity.mode} (${capacity.current}%)`}
    ></div>
  );
}