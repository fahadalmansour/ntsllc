import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  Target, 
  Users, 
  Shield, 
  Globe, 
  Database, 
  Code, 
  BarChart3,
  Layers,
  Cloud,
  Lock,
  MessageSquare,
  Bell,
  Command,
  Activity,
  Eye,
  Sparkles,
  Rocket,
  Star,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Play,
  Pause,
  Clock
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from './NotificationSystem';

interface Feature {
  id: string;
  title: string;
  description: string;
  category: 'performance' | 'collaboration' | 'analytics' | 'security' | 'automation' | 'ai';
  icon: React.ReactNode;
  status: 'active' | 'beta' | 'coming-soon';
  metrics?: {
    label: string;
    value: string;
    trend?: 'up' | 'down' | 'stable';
  }[];
  demo?: () => void;
  premium?: boolean;
}

const enterpriseFeatures: Feature[] = [
  {
    id: 'performance-monitoring',
    title: 'Real-time Performance Monitoring',
    description: 'Advanced performance analytics with Core Web Vitals tracking, system health monitoring, and automated optimization suggestions.',
    category: 'performance',
    icon: <Activity className="w-6 h-6" />,
    status: 'active',
    metrics: [
      { label: 'Response Time', value: '147ms', trend: 'down' },
      { label: 'Uptime', value: '99.97%', trend: 'up' },
      { label: 'Performance Score', value: '96/100', trend: 'up' }
    ]
  },
  {
    id: 'command-palette',
    title: 'Advanced Command Palette',
    description: 'VS Code-style command palette with intelligent search, keyboard shortcuts, and contextual actions for power users.',
    category: 'automation',
    icon: <Command className="w-6 h-6" />,
    status: 'active',
    metrics: [
      { label: 'Commands', value: '47+', trend: 'up' },
      { label: 'Shortcuts', value: '23', trend: 'stable' },
      { label: 'Categories', value: '6', trend: 'stable' }
    ]
  },
  {
    id: 'real-time-collaboration',
    title: 'Real-time Collaboration',
    description: 'Live cursor tracking, real-time chat, presence awareness, and collaborative editing for distributed teams.',
    category: 'collaboration',
    icon: <Users className="w-6 h-6" />,
    status: 'active',
    metrics: [
      { label: 'Active Users', value: '8', trend: 'up' },
      { label: 'Messages', value: '234', trend: 'up' },
      { label: 'Sessions', value: '12', trend: 'stable' }
    ]
  },
  {
    id: 'api-management',
    title: 'Enterprise API Management',
    description: 'Comprehensive API gateway with rate limiting, analytics, documentation, key management, and monitoring.',
    category: 'analytics',
    icon: <Code className="w-6 h-6" />,
    status: 'active',
    metrics: [
      { label: 'API Calls', value: '124K', trend: 'up' },
      { label: 'Success Rate', value: '99.2%', trend: 'up' },
      { label: 'Avg Response', value: '245ms', trend: 'down' }
    ],
    premium: true
  },
  {
    id: 'notification-system',
    title: 'Smart Notification System',
    description: 'Intelligent notification center with categorization, filtering, real-time updates, and multi-channel delivery.',
    category: 'automation',
    icon: <Bell className="w-6 h-6" />,
    status: 'active',
    metrics: [
      { label: 'Notifications', value: '45', trend: 'up' },
      { label: 'Channels', value: '4', trend: 'stable' },
      { label: 'Read Rate', value: '87%', trend: 'up' }
    ]
  },
  {
    id: 'advanced-analytics',
    title: 'Advanced Analytics Dashboard',
    description: 'Business intelligence with real-time metrics, predictive analytics, custom dashboards, and automated reporting.',
    category: 'analytics',
    icon: <BarChart3 className="w-6 h-6" />,
    status: 'active',
    metrics: [
      { label: 'Data Points', value: '2.4M', trend: 'up' },
      { label: 'Dashboards', value: '12', trend: 'up' },
      { label: 'Accuracy', value: '94.3%', trend: 'up' }
    ],
    premium: true
  },
  {
    id: 'ai-powered-insights',
    title: 'AI-Powered Insights',
    description: 'Machine learning models for predictive analytics, automated optimization, and intelligent recommendations.',
    category: 'ai',
    icon: <Sparkles className="w-6 h-6" />,
    status: 'beta',
    metrics: [
      { label: 'ML Models', value: '6', trend: 'up' },
      { label: 'Predictions', value: '1.2K', trend: 'up' },
      { label: 'Accuracy', value: '91.7%', trend: 'up' }
    ],
    premium: true
  },
  {
    id: 'security-center',
    title: 'Advanced Security Center',
    description: 'Comprehensive security monitoring with threat detection, audit logs, compliance tracking, and automated responses.',
    category: 'security',
    icon: <Shield className="w-6 h-6" />,
    status: 'beta',
    metrics: [
      { label: 'Security Score', value: '98/100', trend: 'up' },
      { label: 'Threats Blocked', value: '234', trend: 'down' },
      { label: 'Compliance', value: '100%', trend: 'stable' }
    ],
    premium: true
  },
  {
    id: 'workflow-automation',
    title: 'Intelligent Workflow Automation',
    description: 'No-code workflow builder with AI triggers, multi-system integration, and intelligent decision making.',
    category: 'automation',
    icon: <Zap className="w-6 h-6" />,
    status: 'coming-soon',
    metrics: [
      { label: 'Workflows', value: '23', trend: 'up' },
      { label: 'Triggers', value: '156', trend: 'up' },
      { label: 'Success Rate', value: '97.8%', trend: 'up' }
    ],
    premium: true
  }
];

export function FeatureShowcase() {
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [demoMode, setDemoMode] = useState(false);
  const [currentDemo, setCurrentDemo] = useState<string | null>(null);
  
  const categories = [
    { key: 'all', label: 'All Features', icon: <Globe className="w-4 h-4" /> },
    { key: 'performance', label: 'Performance', icon: <Activity className="w-4 h-4" /> },
    { key: 'collaboration', label: 'Collaboration', icon: <Users className="w-4 h-4" /> },
    { key: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
    { key: 'security', label: 'Security', icon: <Shield className="w-4 h-4" /> },
    { key: 'automation', label: 'Automation', icon: <Zap className="w-4 h-4" /> },
    { key: 'ai', label: 'AI & ML', icon: <Sparkles className="w-4 h-4" /> }
  ];

  const filteredFeatures = selectedCategory === 'all' 
    ? enterpriseFeatures 
    : enterpriseFeatures.filter(feature => feature.category === selectedCategory);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400';
      case 'beta': return 'bg-blue-500/20 text-blue-400';
      case 'coming-soon': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-[#C0C5CE]/20 text-[#C0C5CE]';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'performance': return 'text-green-400';
      case 'collaboration': return 'text-blue-400';
      case 'analytics': return 'text-purple-400';
      case 'security': return 'text-red-400';
      case 'automation': return 'text-yellow-400';
      case 'ai': return 'text-pink-400';
      default: return 'text-[#4AE54A]';
    }
  };

  const runDemo = (featureId: string) => {
    setCurrentDemo(featureId);
    
    switch (featureId) {
      case 'notification-system':
        addNotification({
          title: 'Feature Demo',
          message: 'This is a demo notification showing the advanced notification system in action!',
          type: 'info',
          category: 'system',
          priority: 'medium',
          actionable: true,
          actions: [
            { label: 'Cool!', action: () => console.log('Demo action') }
          ]
        });
        break;
        
      case 'performance-monitoring':
        // Trigger performance monitoring display
        console.log('Performance monitoring demo triggered');
        break;
        
      case 'command-palette':
        // This would trigger the command palette
        console.log('Command palette demo - Press Ctrl+K to see it in action!');
        break;
        
      default:
        console.log(`Demo for ${featureId} triggered`);
    }
    
    setTimeout(() => setCurrentDemo(null), 2000);
  };

  return (
    <section className="py-20 px-6 bg-[#12151C]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center mb-6"
          >
            <Rocket className="w-8 h-8 text-[#4AE54A] mr-3" />
            <h2 className="text-[#C0C5CE] font-mono text-3xl md:text-4xl">
              enterprise --features
            </h2>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[#C0C5CE]/70 font-mono text-lg max-w-3xl mx-auto mb-8"
          >
            World-class enterprise features that rival Fortune 500 platforms. 
            Built with 10x engineering excellence and modern architecture.
          </motion.p>

          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {categories.map((category) => (
              <Button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                variant={selectedCategory === category.key ? "default" : "outline"}
                className={`font-mono ${
                  selectedCategory === category.key
                    ? 'bg-[#4AE54A] text-[#0B0D12]'
                    : 'border-[#C0C5CE]/20 text-[#C0C5CE] hover:border-[#4AE54A]/50 hover:text-[#4AE54A]'
                }`}
              >
                {category.icon}
                <span className="ml-2">{category.label}</span>
              </Button>
            ))}
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {filteredFeatures.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group"
              >
                <Card className="bg-[#0B0D12] border-[#C0C5CE]/20 p-6 h-full hover:border-[#4AE54A]/50 transition-all duration-300 relative overflow-hidden">
                  {/* Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#4AE54A]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Header */}
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-br from-[#4AE54A]/20 to-[#4AE54A]/5 ${getCategoryColor(feature.category)}`}>
                        {feature.icon}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className={`font-mono text-xs ${getStatusColor(feature.status)}`}>
                          {feature.status.replace('-', ' ')}
                        </Badge>
                        {feature.premium && (
                          <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400 font-mono text-xs">
                            PRO
                          </Badge>
                        )}
                      </div>
                    </div>

                    <h3 className="text-[#4AE54A] font-mono text-xl mb-3 group-hover:text-[#4AE54A] transition-colors">
                      {feature.title}
                    </h3>

                    <p className="text-[#C0C5CE]/80 font-mono text-sm leading-relaxed mb-6">
                      {feature.description}
                    </p>

                    {/* Metrics */}
                    {feature.metrics && (
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {feature.metrics.map((metric, idx) => (
                          <div key={idx} className="text-center">
                            <div className="text-[#4AE54A] font-mono text-lg font-bold">
                              {metric.value}
                            </div>
                            <div className="text-[#C0C5CE]/60 font-mono text-xs">
                              {metric.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-3">
                      {feature.status === 'active' && (
                        <>
                          <Button
                            onClick={() => runDemo(feature.id)}
                            disabled={currentDemo === feature.id}
                            className="flex-1 bg-[#4AE54A] text-[#0B0D12] hover:bg-[#4AE54A]/90 font-mono"
                          >
                            {currentDemo === feature.id ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#0B0D12] border-t-transparent mr-2" />
                                Running...
                              </>
                            ) : (
                              <>
                                <Play className="w-4 h-4 mr-2" />
                                Try Demo
                              </>
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            className="border-[#C0C5CE]/20 text-[#C0C5CE] hover:border-[#4AE54A]/50 hover:text-[#4AE54A] font-mono"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                      
                      {feature.status === 'coming-soon' && (
                        <Button
                          disabled
                          className="flex-1 bg-[#C0C5CE]/20 text-[#C0C5CE]/50 font-mono cursor-not-allowed"
                        >
                          <Clock className="w-4 h-4 mr-2" />
                          Coming Soon
                        </Button>
                      )}
                    </div>

                    {/* Demo Indicator */}
                    {currentDemo === feature.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute inset-0 bg-[#4AE54A]/10 backdrop-blur-sm border border-[#4AE54A]/30 rounded-lg flex items-center justify-center"
                      >
                        <div className="text-[#4AE54A] font-mono text-center">
                          <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                          <div className="text-sm">Demo Active!</div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-20"
        >
          <div className="bg-[#0B0D12] border border-[#4AE54A]/30 rounded-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-[#4AE54A] font-mono text-2xl mb-4">
              Ready to Experience Enterprise Excellence?
            </h3>
            <p className="text-[#C0C5CE]/80 font-mono mb-6">
              Join the platform that's revolutionizing how businesses build, deploy, and scale their digital infrastructure.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <Button
                onClick={() => user ? null : console.log('Navigate to auth')}
                className="bg-[#4AE54A] text-[#0B0D12] hover:bg-[#4AE54A]/90 font-mono px-8 py-3"
              >
                {user ? 'Explore Dashboard' : 'Get Started'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                className="border-[#4AE54A] text-[#4AE54A] hover:bg-[#4AE54A]/10 font-mono px-8 py-3"
              >
                View Documentation
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default FeatureShowcase;