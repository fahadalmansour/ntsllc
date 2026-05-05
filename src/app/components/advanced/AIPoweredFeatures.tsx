import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Brain, Zap, TrendingUp, Target, Lightbulb, Code, Database, Cpu, Network, Bot, Sparkles, Eye, MessageSquare, Settings, PlayCircle, PauseCircle } from 'lucide-react';

const AIPoweredFeatures = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiInsights, setAiInsights] = useState([
    {
      id: 1,
      type: 'Performance Optimization',
      insight: 'Database queries can be optimized by 34% using intelligent indexing',
      confidence: 92,
      impact: 'high',
      recommendation: 'Implement composite indexes on frequently joined tables',
      status: 'pending'
    },
    {
      id: 2,
      type: 'User Experience',
      insight: 'Users are 67% more likely to convert on mobile-optimized checkout flow',
      confidence: 89,
      impact: 'high',
      recommendation: 'Redesign checkout process with AI-guided UX improvements',
      status: 'implementing'
    },
    {
      id: 3,
      type: 'Security Enhancement',
      insight: 'Anomalous login patterns detected, suggesting need for adaptive authentication',
      confidence: 95,
      impact: 'medium',
      recommendation: 'Deploy ML-based behavioral authentication system',
      status: 'completed'
    },
    {
      id: 4,
      type: 'Cost Optimization',
      insight: 'Cloud resource utilization can be reduced by 28% with intelligent scaling',
      confidence: 84,
      impact: 'medium',
      recommendation: 'Implement AI-driven auto-scaling policies',
      status: 'pending'
    }
  ]);

  const [predictiveModels, setPredictiveModels] = useState([
    {
      name: 'Revenue Forecasting',
      accuracy: 94.2,
      status: 'active',
      lastTrained: '2024-01-25',
      nextPrediction: '$127,500 (+18%)',
      dataPoints: 15420
    },
    {
      name: 'Churn Prediction',
      accuracy: 89.7,
      status: 'active',
      lastTrained: '2024-01-26',
      nextPrediction: '12 at-risk customers',
      dataPoints: 8900
    },
    {
      name: 'Demand Forecasting',
      accuracy: 91.3,
      status: 'training',
      lastTrained: '2024-01-20',
      nextPrediction: 'Update in progress',
      dataPoints: 22100
    },
    {
      name: 'Performance Anomaly',
      accuracy: 87.4,
      status: 'active',
      lastTrained: '2024-01-27',
      nextPrediction: 'No anomalies detected',
      dataPoints: 45200
    }
  ]);

  const [aiChatHistory, setAiChatHistory] = useState([
    {
      id: 1,
      user: 'system',
      message: 'AI Assistant initialized. How can I help optimize your business today?',
      timestamp: '14:30:00'
    },
    {
      id: 2,
      user: 'human',
      message: 'Analyze our user engagement patterns for the last month',
      timestamp: '14:30:15'
    },
    {
      id: 3,
      user: 'ai',
      message: 'Analysis complete. I found 3 key patterns: 1) Mobile users have 42% higher engagement, 2) Weekend sessions are 23% longer, 3) Users from organic search show 67% better retention. Would you like detailed recommendations?',
      timestamp: '14:30:32'
    }
  ]);

  const [codeGeneration, setCodeGeneration] = useState({
    prompt: '',
    generatedCode: '',
    language: 'typescript',
    isGenerating: false
  });

  const [smartRecommendations, setSmartRecommendations] = useState([
    {
      id: 1,
      category: 'Performance',
      title: 'Optimize API Response Times',
      description: 'Implement caching layer for frequently accessed endpoints',
      priority: 'high',
      estimatedImpact: '34% faster response times',
      effort: 'medium',
      tags: ['backend', 'performance', 'caching']
    },
    {
      id: 2,
      category: 'User Experience',
      title: 'Personalized Dashboard Layouts',
      description: 'Use ML to customize dashboard based on user behavior patterns',
      priority: 'medium',
      estimatedImpact: '28% increased user engagement',
      effort: 'high',
      tags: ['frontend', 'ml', 'personalization']
    },
    {
      id: 3,
      category: 'Security',
      title: 'Intelligent Threat Detection',
      description: 'Deploy ML models to detect unusual access patterns',
      priority: 'high',
      estimatedImpact: '89% reduction in security incidents',
      effort: 'medium',
      tags: ['security', 'ml', 'monitoring']
    }
  ]);

  const aiCapabilities = [
    { subject: 'Prediction', fullMark: 100, value: 94 },
    { subject: 'Optimization', fullMark: 100, value: 87 },
    { subject: 'Analysis', fullMark: 100, value: 92 },
    { subject: 'Automation', fullMark: 100, value: 89 },
    { subject: 'Personalization', fullMark: 100, value: 85 },
    { subject: 'Security', fullMark: 100, value: 91 }
  ];

  const performanceData = [
    { name: 'Jan', aiOptimized: 65, traditional: 45 },
    { name: 'Feb', aiOptimized: 72, traditional: 48 },
    { name: 'Mar', aiOptimized: 78, traditional: 52 },
    { name: 'Apr', aiOptimized: 85, traditional: 54 },
    { name: 'May', aiOptimized: 92, traditional: 57 },
    { name: 'Jun', aiOptimized: 98, traditional: 59 }
  ];

  useEffect(() => {
    // Simulate AI processing
    const interval = setInterval(() => {
      if (Math.random() < 0.2) {
        setIsProcessing(true);
        setTimeout(() => setIsProcessing(false), 3000);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const generateCode = async () => {
    setCodeGeneration(prev => ({ ...prev, isGenerating: true }));
    
    // Simulate API call
    setTimeout(() => {
      const sampleCode = `// AI-Generated ${codeGeneration.language} Code
import React, { useState, useEffect } from 'react';

interface DataPoint {
  id: string;
  value: number;
  timestamp: Date;
}

const OptimizedComponent: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // AI-optimized data fetching
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/optimized-data');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="optimized-container">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {data.map(point => (
            <div key={point.id}>{point.value}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OptimizedComponent;`;

      setCodeGeneration(prev => ({
        ...prev,
        generatedCode: sampleCode,
        isGenerating: false
      }));
    }, 2000);
  };

  const sendAIMessage = (message: string) => {
    const newMessage = {
      id: Date.now(),
      user: 'human',
      message,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setAiChatHistory(prev => [...prev, newMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        user: 'ai',
        message: 'I\'m analyzing your request. Based on current data patterns, I recommend implementing the following optimizations...',
        timestamp: new Date().toLocaleTimeString()
      };
      setAiChatHistory(prev => [...prev, aiResponse]);
    }, 1500);
  };

  const InsightCard = ({ insight }) => {
    const getImpactColor = (impact) => {
      switch (impact) {
        case 'high': return 'text-red-400 border-red-400';
        case 'medium': return 'text-yellow-400 border-yellow-400';
        case 'low': return 'text-blue-400 border-blue-400';
        default: return 'text-[#C0C5CE] border-[#C0C5CE]/20';
      }
    };

    const getStatusColor = (status) => {
      switch (status) {
        case 'completed': return 'text-[#4AE54A] border-[#4AE54A]';
        case 'implementing': return 'text-yellow-400 border-yellow-400';
        case 'pending': return 'text-[#C0C5CE] border-[#C0C5CE]/50';
        default: return 'text-[#C0C5CE] border-[#C0C5CE]/20';
      }
    };

    return (
      <Card className="bg-[#12151C] border-[#4AE54A]/20 card-hover-glow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <Badge variant="outline" className="font-mono text-xs mb-2">
                {insight.type}
              </Badge>
              <h4 className="text-[#C0C5CE] font-mono font-medium mb-2">{insight.insight}</h4>
              <p className="text-[#C0C5CE]/70 font-mono text-sm">{insight.recommendation}</p>
            </div>
            <div className="text-right">
              <div className="text-[#4AE54A] font-mono text-lg font-medium">{insight.confidence}%</div>
              <div className="text-[#C0C5CE]/60 font-mono text-xs">confidence</div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Badge variant="outline" className={`font-mono text-xs ${getImpactColor(insight.impact)}`}>
              {insight.impact.toUpperCase()} IMPACT
            </Badge>
            <Badge variant="outline" className={`font-mono text-xs ${getStatusColor(insight.status)}`}>
              {insight.status.toUpperCase()}
            </Badge>
          </div>
          <div className="mt-4">
            <Progress value={insight.confidence} className="h-2" />
          </div>
        </CardContent>
      </Card>
    );
  };

  const ModelCard = ({ model }) => {
    const getStatusColor = (status) => {
      switch (status) {
        case 'active': return 'text-[#4AE54A] border-[#4AE54A]';
        case 'training': return 'text-yellow-400 border-yellow-400';
        case 'inactive': return 'text-[#C0C5CE]/50 border-[#C0C5CE]/50';
        default: return 'text-[#C0C5CE] border-[#C0C5CE]/20';
      }
    };

    return (
      <Card className="bg-[#12151C] border-[#4AE54A]/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-[#C0C5CE] font-mono font-medium">{model.name}</h4>
            <Badge variant="outline" className={`font-mono text-xs ${getStatusColor(model.status)}`}>
              {model.status.toUpperCase()}
            </Badge>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-[#C0C5CE]/70 font-mono text-sm">Accuracy</span>
              <span className="text-[#4AE54A] font-mono text-sm">{model.accuracy}%</span>
            </div>
            <Progress value={model.accuracy} className="h-2" />
            <div className="flex justify-between text-[#C0C5CE]/60 font-mono text-xs">
              <span>Data Points: {model.dataPoints.toLocaleString()}</span>
              <span>Trained: {model.lastTrained}</span>
            </div>
            <div className="border-t border-[#4AE54A]/20 pt-3">
              <span className="text-[#C0C5CE]/70 font-mono text-sm">Next Prediction:</span>
              <p className="text-[#4AE54A] font-mono text-sm mt-1">{model.nextPrediction}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-[#0B0D12] terminal-theme p-6">
      <div className="max-w-[1400px] mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-mono text-[#4AE54A] mb-2 flex items-center">
              <Brain className="w-8 h-8 mr-3" />
              AI-Powered Features
            </h1>
            <p className="text-[#C0C5CE]/70 font-mono">Intelligent automation and predictive insights</p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className={`font-mono neural-pulse ${
              isProcessing ? 'border-yellow-400 text-yellow-400' : 'border-[#4AE54A] text-[#4AE54A]'
            }`}>
              {isProcessing ? 'Processing...' : 'AI Active'}
            </Badge>
            <Badge variant="outline" className="border-[#C0C5CE]/30 text-[#C0C5CE] font-mono">
              Models: {predictiveModels.filter(m => m.status === 'active').length} Active
            </Badge>
          </div>
        </div>

        {/* AI Capabilities Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-[#12151C] border-[#4AE54A]/20">
            <CardHeader>
              <CardTitle className="text-[#4AE54A] font-mono flex items-center">
                <Sparkles className="w-5 h-5 mr-2" />
                AI Capabilities Matrix
              </CardTitle>
              <CardDescription className="text-[#C0C5CE]/70 font-mono">
                Current AI system performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={aiCapabilities}>
                  <PolarGrid stroke="#4AE54A20" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#C0C5CE', fontSize: 12, fontFamily: 'JetBrains Mono' }} />
                  <PolarRadiusAxis angle={0} domain={[0, 100]} tick={{ fill: '#C0C5CE', fontSize: 10, fontFamily: 'JetBrains Mono' }} />
                  <Radar name="AI Performance" dataKey="value" stroke="#4AE54A" fill="#4AE54A" fillOpacity={0.2} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-[#12151C] border-[#4AE54A]/20">
            <CardHeader>
              <CardTitle className="text-[#4AE54A] font-mono">Performance Comparison</CardTitle>
              <CardDescription className="text-[#C0C5CE]/70 font-mono">
                AI-optimized vs traditional approaches
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={performanceData}>
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
                  <Bar dataKey="aiOptimized" fill="#4AE54A" name="AI-Optimized" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="traditional" fill="#C0C5CE" name="Traditional" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Main AI Features */}
        <Tabs defaultValue="insights" className="space-y-6">
          <TabsList className="bg-[#12151C] border border-[#4AE54A]/20">
            <TabsTrigger value="insights" className="font-mono">Smart Insights</TabsTrigger>
            <TabsTrigger value="models" className="font-mono">Predictive Models</TabsTrigger>
            <TabsTrigger value="automation" className="font-mono">Automation</TabsTrigger>
            <TabsTrigger value="chat" className="font-mono">AI Assistant</TabsTrigger>
            <TabsTrigger value="code" className="font-mono">Code Generation</TabsTrigger>
          </TabsList>

          <TabsContent value="insights" className="space-y-6">
            <Card className="bg-[#12151C] border-[#4AE54A]/20">
              <CardHeader>
                <CardTitle className="text-[#4AE54A] font-mono flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2" />
                  AI-Generated Insights
                </CardTitle>
                <CardDescription className="text-[#C0C5CE]/70 font-mono">
                  Intelligent recommendations based on data analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  {aiInsights.map(insight => (
                    <InsightCard key={insight.id} insight={insight} />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#12151C] border-[#4AE54A]/20">
              <CardHeader>
                <CardTitle className="text-[#4AE54A] font-mono">Smart Recommendations</CardTitle>
                <CardDescription className="text-[#C0C5CE]/70 font-mono">
                  Personalized improvement suggestions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {smartRecommendations.map(rec => (
                    <div key={rec.id} className="border border-[#4AE54A]/20 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge variant="outline" className="font-mono text-xs">
                              {rec.category}
                            </Badge>
                            <Badge variant="outline" className={`font-mono text-xs ${
                              rec.priority === 'high' ? 'border-red-400 text-red-400' :
                              rec.priority === 'medium' ? 'border-yellow-400 text-yellow-400' :
                              'border-blue-400 text-blue-400'
                            }`}>
                              {rec.priority.toUpperCase()}
                            </Badge>
                          </div>
                          <h4 className="text-[#C0C5CE] font-mono font-medium mb-1">{rec.title}</h4>
                          <p className="text-[#C0C5CE]/70 font-mono text-sm">{rec.description}</p>
                        </div>
                        <Button size="sm" variant="outline" className="font-mono">
                          Implement
                        </Button>
                      </div>
                      <div className="flex items-center justify-between text-[#C0C5CE]/60 font-mono text-xs">
                        <span>Impact: {rec.estimatedImpact}</span>
                        <span>Effort: {rec.effort}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {rec.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="font-mono text-xs border-[#C0C5CE]/30">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="models" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {predictiveModels.map(model => (
                <ModelCard key={model.name} model={model} />
              ))}
            </div>

            <Card className="bg-[#12151C] border-[#4AE54A]/20">
              <CardHeader>
                <CardTitle className="text-[#4AE54A] font-mono">Model Training Pipeline</CardTitle>
                <CardDescription className="text-[#C0C5CE]/70 font-mono">
                  Automated model retraining and optimization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-[#4AE54A]/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Database className="w-6 h-6 text-[#4AE54A]" />
                      <div>
                        <h4 className="text-[#C0C5CE] font-mono font-medium">Data Processing</h4>
                        <p className="text-[#C0C5CE]/60 font-mono text-sm">Continuous data ingestion</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-[#4AE54A] text-[#4AE54A] font-mono">
                      Active
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-[#4AE54A]/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Cpu className="w-6 h-6 text-[#4AE54A]" />
                      <div>
                        <h4 className="text-[#C0C5CE] font-mono font-medium">Model Training</h4>
                        <p className="text-[#C0C5CE]/60 font-mono text-sm">Automated retraining schedule</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-yellow-400 text-yellow-400 font-mono">
                      In Progress
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-[#4AE54A]/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Network className="w-6 h-6 text-[#4AE54A]" />
                      <div>
                        <h4 className="text-[#C0C5CE] font-mono font-medium">Model Deployment</h4>
                        <p className="text-[#C0C5CE]/60 font-mono text-sm">Automated A/B testing</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-[#4AE54A] text-[#4AE54A] font-mono">
                      Ready
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="automation" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="bg-[#12151C] border-[#4AE54A]/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-[#4AE54A]/10 rounded-lg">
                      <Zap className="w-6 h-6 text-[#4AE54A]" />
                    </div>
                    <Badge variant="outline" className="border-[#4AE54A] text-[#4AE54A] font-mono">
                      Active
                    </Badge>
                  </div>
                  <h3 className="text-[#C0C5CE] font-mono font-medium mb-2">Auto-Scaling</h3>
                  <p className="text-[#C0C5CE]/70 font-mono text-sm mb-4">
                    Intelligent resource management based on usage patterns
                  </p>
                  <div className="text-[#4AE54A] font-mono text-sm">
                    28% cost reduction
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#12151C] border-[#4AE54A]/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-[#4AE54A]/10 rounded-lg">
                      <Target className="w-6 h-6 text-[#4AE54A]" />
                    </div>
                    <Badge variant="outline" className="border-[#4AE54A] text-[#4AE54A] font-mono">
                      Active
                    </Badge>
                  </div>
                  <h3 className="text-[#C0C5CE] font-mono font-medium mb-2">Smart Caching</h3>
                  <p className="text-[#C0C5CE]/70 font-mono text-sm mb-4">
                    Predictive content caching for optimal performance
                  </p>
                  <div className="text-[#4AE54A] font-mono text-sm">
                    67% faster load times
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#12151C] border-[#4AE54A]/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-[#4AE54A]/10 rounded-lg">
                      <Bot className="w-6 h-6 text-[#4AE54A]" />
                    </div>
                    <Badge variant="outline" className="border-yellow-400 text-yellow-400 font-mono">
                      Training
                    </Badge>
                  </div>
                  <h3 className="text-[#C0C5CE] font-mono font-medium mb-2">Auto-Testing</h3>
                  <p className="text-[#C0C5CE]/70 font-mono text-sm mb-4">
                    AI-generated test cases and automated quality assurance
                  </p>
                  <div className="text-yellow-400 font-mono text-sm">
                    Beta testing
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="chat" className="space-y-6">
            <Card className="bg-[#12151C] border-[#4AE54A]/20">
              <CardHeader>
                <CardTitle className="text-[#4AE54A] font-mono flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  AI Business Assistant
                </CardTitle>
                <CardDescription className="text-[#C0C5CE]/70 font-mono">
                  Intelligent business insights and recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto mb-4">
                  {aiChatHistory.map(message => (
                    <div key={message.id} className={`flex ${message.user === 'human' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-3xl p-3 rounded-lg font-mono text-sm ${
                        message.user === 'human' 
                          ? 'bg-[#4AE54A]/20 text-[#C0C5CE]' 
                          : message.user === 'ai'
                          ? 'bg-[#0B0D12] border border-[#4AE54A]/30 text-[#C0C5CE]'
                          : 'bg-[#12151C] text-[#C0C5CE]/70'
                      }`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs opacity-60">
                            {message.user === 'ai' ? '🤖 AI Assistant' : 
                             message.user === 'human' ? '👤 You' : '⚡ System'}
                          </span>
                          <span className="text-xs opacity-60">{message.timestamp}</span>
                        </div>
                        <div>{message.message}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Ask AI about your business metrics..."
                    className="flex-1 bg-[#0B0D12] border-[#4AE54A]/30 text-[#C0C5CE] font-mono"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && e.target.value.trim()) {
                        sendAIMessage(e.target.value);
                        e.target.value = '';
                      }
                    }}
                  />
                  <Button 
                    variant="outline"
                    className="border-[#4AE54A] text-[#4AE54A] hover:bg-[#4AE54A]/10 font-mono"
                  >
                    Send
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="code" className="space-y-6">
            <Card className="bg-[#12151C] border-[#4AE54A]/20">
              <CardHeader>
                <CardTitle className="text-[#4AE54A] font-mono flex items-center">
                  <Code className="w-5 h-5 mr-2" />
                  AI Code Generation
                </CardTitle>
                <CardDescription className="text-[#C0C5CE]/70 font-mono">
                  Generate optimized code snippets and components
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[#C0C5CE]/70 font-mono text-sm">Language</label>
                    <select 
                      className="w-full mt-1 bg-[#0B0D12] border border-[#4AE54A]/30 rounded p-2 text-[#C0C5CE] font-mono"
                      value={codeGeneration.language}
                      onChange={(e) => setCodeGeneration(prev => ({...prev, language: e.target.value}))}
                    >
                      <option value="typescript">TypeScript</option>
                      <option value="javascript">JavaScript</option>
                      <option value="python">Python</option>
                      <option value="go">Go</option>
                      <option value="rust">Rust</option>
                    </select>
                  </div>
                  <div className="lg:col-span-2">
                    <label className="text-[#C0C5CE]/70 font-mono text-sm">Code Description</label>
                    <Input
                      placeholder="Describe the code you want to generate..."
                      className="mt-1 bg-[#0B0D12] border-[#4AE54A]/30 text-[#C0C5CE] font-mono"
                      value={codeGeneration.prompt}
                      onChange={(e) => setCodeGeneration(prev => ({...prev, prompt: e.target.value}))}
                    />
                  </div>
                </div>
                
                <Button 
                  onClick={generateCode}
                  disabled={codeGeneration.isGenerating}
                  className="bg-[#4AE54A] text-[#0B0D12] hover:bg-[#4AE54A]/90 font-mono"
                >
                  {codeGeneration.isGenerating ? (
                    <>
                      <Settings className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Code
                    </>
                  )}
                </Button>

                {codeGeneration.generatedCode && (
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[#C0C5CE]/70 font-mono text-sm">Generated Code:</span>
                      <Button size="sm" variant="outline" className="font-mono">
                        Copy
                      </Button>
                    </div>
                    <pre className="bg-[#0B0D12] border border-[#4AE54A]/20 rounded p-4 overflow-x-auto">
                      <code className="text-[#C0C5CE] font-mono text-sm">
                        {codeGeneration.generatedCode}
                      </code>
                    </pre>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AIPoweredFeatures;