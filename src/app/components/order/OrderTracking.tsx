/**
 * Live Order Tracking Component
 * Real-time 90-minute setup progress tracking
 */

import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';
import { 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Play, 
  Zap,
  ExternalLink,
  MessageCircle,
  Download,
  RefreshCw
} from 'lucide-react';
import { Order, OrderMilestone } from '../../lib/database-schema';
import { getOrder } from '../../lib/order-management';

interface OrderTrackingProps {
  orderId: string;
  isLive?: boolean;
  language?: 'en' | 'ar';
}

export function OrderTracking({ orderId, isLive = false, language = 'en' }: OrderTrackingProps) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Fetch order data
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderData = await getOrder(orderId);
        setOrder(orderData);
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
    
    // Refresh every 30 seconds if live tracking
    if (isLive) {
      const interval = setInterval(fetchOrder, 30000);
      return () => clearInterval(interval);
    }
  }, [orderId, isLive]);

  // Update countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      
      if (order?.deadline) {
        const remaining = order.deadline.toMillis() - Date.now();
        setTimeRemaining(Math.max(0, remaining));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [order]);

  const formatTime = (milliseconds: number): string => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'completed': return 'text-[#00ff88]';
      case 'in_progress': return 'text-[#00d4ff]';
      case 'blocked': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-[#00ff88]" />;
      case 'in_progress': return <Play className="w-5 h-5 text-[#00d4ff] animate-pulse" />;
      case 'blocked': return <AlertCircle className="w-5 h-5 text-red-400" />;
      default: return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const calculateProgress = (): number => {
    if (!order?.milestones) return 0;
    const completed = order.milestones.filter(m => m.status === 'completed').length;
    return Math.round((completed / order.milestones.length) * 100);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="w-6 h-6 animate-spin text-[#00d4ff]" />
        <span className="ml-2 text-gray-300">Loading order details...</span>
      </div>
    );
  }

  if (!order) {
    return (
      <Card className="bg-[#1a1a1a] border border-red-500/30 p-8 text-center">
        <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Order Not Found</h3>
        <p className="text-gray-400">
          Order #{orderId} could not be found. Please check the order number and try again.
        </p>
      </Card>
    );
  }

  const progress = calculateProgress();
  const isCompleted = order.status === 'completed';
  const isInProgress = order.status === 'in_progress';

  return (
    <div className="space-y-6">
      {/* Order Header */}
      <Card className="bg-[#1a1a1a] border border-[#00d4ff]/30 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Order #{order.orderNumber}
            </h2>
            <div className="flex items-center gap-4">
              <Badge 
                className={`px-3 py-1 ${
                  isCompleted ? 'bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]/30' :
                  isInProgress ? 'bg-[#00d4ff]/20 text-[#00d4ff] border-[#00d4ff]/30' :
                  'bg-gray-600/20 text-gray-400 border-gray-600/30'
                }`}
              >
                {order.status.replace('_', ' ').toUpperCase()}
              </Badge>
              <span className="text-gray-400 font-mono">
                {order.service} • {order.package}
              </span>
            </div>
          </div>
          
          {/* Timer and Progress */}
          <div className="text-right">
            {isInProgress && (
              <div className="mb-2">
                <div className="text-2xl font-mono font-bold text-[#00d4ff]">
                  {formatTime(timeRemaining)}
                </div>
                <div className="text-sm text-gray-400">Time Remaining</div>
              </div>
            )}
            
            {isCompleted && order.actualDuration && (
              <div className="mb-2">
                <div className="text-2xl font-mono font-bold text-[#00ff88]">
                  {Math.round(order.actualDuration / 60000)}min
                </div>
                <div className="text-sm text-gray-400">
                  Completed {order.slaCompliant ? 'On Time' : 'Late'}
                </div>
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <Progress value={progress} className="w-32" />
              <span className="text-sm font-mono text-gray-400">{progress}%</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Live Progress Timeline */}
      <Card className="bg-[#1a1a1a] border border-[#00d4ff]/30 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Setup Progress</h3>
          {isLive && (
            <Badge className="bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]/30 px-3 py-1">
              <span className="w-2 h-2 bg-[#00ff88] rounded-full animate-pulse mr-2"></span>
              Live Tracking
            </Badge>
          )}
        </div>

        <div className="space-y-4">
          {order.milestones.map((milestone, index) => {
            const isActive = milestone.status === 'in_progress';
            const isCompleted = milestone.status === 'completed';
            const isBlocked = milestone.status === 'blocked';
            
            return (
              <div
                key={milestone.id}
                className={`flex items-start gap-4 p-4 rounded-lg border transition-all duration-300 ${
                  isActive ? 'border-[#00d4ff]/50 bg-[#00d4ff]/5' :
                  isCompleted ? 'border-[#00ff88]/30 bg-[#00ff88]/5' :
                  isBlocked ? 'border-red-500/30 bg-red-500/5' :
                  'border-gray-800 bg-gray-900/20'
                }`}
              >
                {/* Status Icon */}
                <div className="flex-shrink-0 mt-1">
                  {getStatusIcon(milestone.status)}
                </div>
                
                {/* Milestone Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={`font-medium ${getStatusColor(milestone.status)}`}>
                      {milestone.name}
                    </h4>
                    {isActive && (
                      <Zap className="w-4 h-4 text-[#00d4ff] animate-pulse" />
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-400 mb-2">
                    {milestone.description}
                  </p>
                  
                  {/* Timing Information */}
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>
                      Estimated: {milestone.estimatedDuration}min
                    </span>
                    {milestone.actualDuration && (
                      <span>
                        Actual: {milestone.actualDuration}min
                      </span>
                    )}
                    {milestone.completionTime && (
                      <span>
                        Completed: {milestone.completionTime.toDate().toLocaleTimeString()}
                      </span>
                    )}
                  </div>
                  
                  {milestone.notes && (
                    <div className="mt-2 p-2 bg-gray-800/50 rounded text-xs text-gray-300">
                      {milestone.notes}
                    </div>
                  )}
                </div>
                
                {/* Assignee */}
                <div className="text-xs text-gray-500 text-right">
                  {milestone.assignee.replace('_', ' ')}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Store Details (if completed) */}
      {isCompleted && order.storeUrl && (
        <Card className="bg-gradient-to-r from-[#00d4ff]/10 to-[#00ff88]/10 border border-[#00ff88]/30 p-6">
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-[#00ff88] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">
              🎉 Your Store is Live!
            </h3>
            <p className="text-gray-300 mb-6">
              Congratulations! Your store has been successfully launched and is ready to accept orders.
            </p>
            
            <div className="flex justify-center gap-4">
              <Button 
                onClick={() => window.open(order.storeUrl, '_blank')}
                className="bg-[#00ff88] text-black hover:bg-[#00d4ff] font-bold"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View Your Store
              </Button>
              
              <Button 
                variant="outline"
                className="border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff]/10"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* SLA Warning (if close to deadline) */}
      {isInProgress && timeRemaining > 0 && timeRemaining < 15 * 60 * 1000 && (
        <Card className="bg-yellow-500/10 border border-yellow-500/30 p-6">
          <div className="flex items-center gap-4">
            <AlertCircle className="w-8 h-8 text-yellow-400" />
            <div>
              <h4 className="text-lg font-bold text-yellow-400">
                Approaching 90-Minute Deadline
              </h4>
              <p className="text-gray-300">
                We're working hard to complete your store within our 90-minute promise. 
                Our team has been notified and is prioritizing your order.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Support Contact */}
      <Card className="bg-[#1a1a1a] border border-gray-800 p-6">
        <h4 className="text-lg font-bold text-white mb-4">Need Help?</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button 
            variant="outline"
            className="border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff]/10"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Live Chat Support
          </Button>
          <Button 
            variant="outline"
            className="border-[#00ff88] text-[#00ff88] hover:bg-[#00ff88]/10"
            onClick={() => window.open('https://wa.me/1234567890', '_blank')}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            WhatsApp Support
          </Button>
        </div>
        <p className="text-sm text-gray-400 mt-4 text-center">
          Average response time: Under 5 minutes
        </p>
      </Card>
    </div>
  );
}

export default OrderTracking;