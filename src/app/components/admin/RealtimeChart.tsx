import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { 
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

interface RealtimeChartProps {
  title: string;
  type: 'revenue' | 'launches' | 'users' | 'performance';
  color: string;
  className?: string;
}

export function RealtimeChart({ title, type, color, className = '' }: RealtimeChartProps) {
  const [data, setData] = useState<any[]>([]);
  
  // Generate realistic sample data based on type
  useEffect(() => {
    const generateData = () => {
      const now = new Date();
      const dataPoints = [];
      
      for (let i = 23; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60 * 60 * 1000);
        const hour = time.getHours();
        
        let value;
        switch (type) {
          case 'revenue':
            // Higher during business hours
            value = Math.random() * 1000 + (hour >= 9 && hour <= 17 ? 500 : 100);
            break;
          case 'launches':
            // Peak during business hours
            value = Math.floor(Math.random() * 10 + (hour >= 9 && hour <= 17 ? 5 : 1));
            break;
          case 'users':
            // Gradual increase throughout day
            value = Math.floor(Math.random() * 50 + hour * 2);
            break;
          case 'performance':
            // Consistent high performance with minor fluctuations
            value = 95 + Math.random() * 5;
            break;
          default:
            value = Math.random() * 100;
        }
        
        dataPoints.push({
          time: time.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
          }),
          value: Math.round(value * 100) / 100,
          timestamp: time.getTime()
        });
      }
      
      return dataPoints;
    };
    
    setData(generateData());
    
    // Update data every 30 seconds for real-time effect
    const interval = setInterval(() => {
      setData(prevData => {
        const newData = [...prevData];
        const now = new Date();
        const hour = now.getHours();
        
        // Remove oldest point and add new one
        newData.shift();
        
        let newValue;
        switch (type) {
          case 'revenue':
            newValue = Math.random() * 1000 + (hour >= 9 && hour <= 17 ? 500 : 100);
            break;
          case 'launches':
            newValue = Math.floor(Math.random() * 10 + (hour >= 9 && hour <= 17 ? 5 : 1));
            break;
          case 'users':
            newValue = Math.floor(Math.random() * 50 + hour * 2);
            break;
          case 'performance':
            newValue = 95 + Math.random() * 5;
            break;
          default:
            newValue = Math.random() * 100;
        }
        
        newData.push({
          time: now.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
          }),
          value: Math.round(newValue * 100) / 100,
          timestamp: now.getTime()
        });
        
        return newData;
      });
    }, 30000);
    
    return () => clearInterval(interval);
  }, [type]);

  const formatValue = (value: number) => {
    switch (type) {
      case 'revenue':
        return `$${value.toFixed(0)}`;
      case 'launches':
        return `${value} stores`;
      case 'users':
        return `${value} users`;
      case 'performance':
        return `${value.toFixed(1)}%`;
      default:
        return value.toString();
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1a1a1a] border border-[#00d4ff]/30 rounded-lg p-3">
          <p className="text-[#a0a0a0] font-mono text-sm">{`Time: ${label}`}</p>
          <p className="text-white font-mono text-sm">
            <span className="text-[#00d4ff]">{title}: </span>
            {formatValue(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={`bg-[#1a1a1a] border-[#00d4ff]/30 p-6 ${className}`}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white font-mono">{title}</h3>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#00ff88] animate-pulse"></div>
          <span className="text-xs text-[#00ff88] font-mono">LIVE</span>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'revenue' ? (
            <AreaChart data={data}>
              <defs>
                <linearGradient id={`gradient-${type}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={color} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis 
                dataKey="time" 
                stroke="#666" 
                fontSize={12}
                fontFamily="JetBrains Mono"
              />
              <YAxis 
                stroke="#666" 
                fontSize={12}
                fontFamily="JetBrains Mono"
                tickFormatter={(value) => formatValue(value)}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke={color}
                fillOpacity={1}
                fill={`url(#gradient-${type})`}
                strokeWidth={2}
              />
            </AreaChart>
          ) : (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis 
                dataKey="time" 
                stroke="#666" 
                fontSize={12}
                fontFamily="JetBrains Mono"
              />
              <YAxis 
                stroke="#666" 
                fontSize={12}
                fontFamily="JetBrains Mono"
                tickFormatter={(value) => formatValue(value)}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={3}
                dot={{ fill: color, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: color, strokeWidth: 2 }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
      
      {/* Quick Stats */}
      <div className="mt-4 pt-4 border-t border-[#00d4ff]/20">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs text-[#a0a0a0] font-mono">Current</p>
            <p className="text-sm font-bold text-white font-mono">
              {data.length > 0 ? formatValue(data[data.length - 1]?.value || 0) : '0'}
            </p>
          </div>
          <div>
            <p className="text-xs text-[#a0a0a0] font-mono">Peak</p>
            <p className="text-sm font-bold text-[#00ff88] font-mono">
              {data.length > 0 ? formatValue(Math.max(...data.map(d => d.value))) : '0'}
            </p>
          </div>
          <div>
            <p className="text-xs text-[#a0a0a0] font-mono">Avg</p>
            <p className="text-sm font-bold text-[#00d4ff] font-mono">
              {data.length > 0 ? formatValue(data.reduce((a, b) => a + b.value, 0) / data.length) : '0'}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default RealtimeChart;