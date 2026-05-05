import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Rocket, 
  Brain, 
  Zap, 
  Target,
  TrendingUp,
  BarChart3,
  Cpu,
  Database,
  Network,
  Layers,
  Code2,
  GitBranch,
  Search,
  Filter,
  Settings,
  Download,
  Upload,
  Play,
  Pause,
  Square,
  RotateCcw,
  Save,
  Share2,
  Eye,
  EyeOff,
  MessageSquare,
  Lightbulb,
  Star,
  CheckCircle,
  AlertTriangle,
  Info,
  Clock
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface AIModel {
  id: string;
  name: string;
  type: 'nlp' | 'vision' | 'prediction' | 'generation';
  status: 'training' | 'ready' | 'deployed' | 'updating';
  accuracy: number;
  lastTrained: Date;
  version: string;
}

interface TrainingData {
  id: string;
  name: string;
  type: 'text' | 'image' | 'code' | 'structured';
  size: string;
  samples: number;
  quality: number;
  lastUpdated: Date;
}

interface Prediction {
  id: string;
  input: string;
  output: any;
  confidence: number;
  timestamp: Date;
  model: string;
  processingTime: number;
}

interface LearningMetric {
  metric: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
}

export function NeoBotAI() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [models, setModels] = useState<AIModel[]>([]);
  const [trainingData, setTrainingData] = useState<TrainingData[]>([]);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [metrics, setMetrics] = useState<LearningMetric[]>([]);
  const [isTraining, setIsTraining] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [inputQuery, setInputQuery] = useState('');
  const [realTimeMode, setRealTimeMode] = useState(false);

  // Initialize sample data
  useEffect(() => {
    setModels([
      {
        id: 'nlp-001',
        name: 'Natural Language Processor',
        type: 'nlp',
        status: 'ready',
        accuracy: 94.5,
        lastTrained: new Date(2024, 1, 15),
        version: '2.1.0'
      },
      {
        id: 'vision-001',
        name: 'Computer Vision Engine',
        type: 'vision',
        status: 'deployed',
        accuracy: 91.2,
        lastTrained: new Date(2024, 1, 10),
        version: '1.8.3'
      },
      {
        id: 'predict-001',
        name: 'Predictive Analytics',
        type: 'prediction',
        status: 'training',
        accuracy: 87.8,
        lastTrained: new Date(2024, 1, 12),
        version: '3.0.0-beta'
      },
      {
        id: 'gen-001',
        name: 'Code Generation AI',
        type: 'generation',
        status: 'ready',
        accuracy: 96.1,
        lastTrained: new Date(2024, 1, 18),
        version: '4.2.1'
      }
    ]);

    setTrainingData([
      {
        id: 'data-001',
        name: 'Web Development Corpus',
        type: 'text',
        size: '15.2 GB',
        samples: 125000,
        quality: 98.5,
        lastUpdated: new Date(2024, 1, 18)
      },
      {
        id: 'data-002',
        name: 'UI/UX Design Dataset',
        type: 'image',
        size: '8.7 GB',
        samples: 45000,
        quality: 95.2,
        lastUpdated: new Date(2024, 1, 16)
      },
      {
        id: 'data-003',
        name: 'Code Repository Analysis',
        type: 'code',
        size: '22.1 GB',
        samples: 89000,
        quality: 99.1,
        lastUpdated: new Date(2024, 1, 20)
      }
    ]);

    setMetrics([
      { metric: 'Model Accuracy', value: 94.2, change: 2.3, trend: 'up' },
      { metric: 'Processing Speed', value: 156.7, change: -5.2, trend: 'down' },
      { metric: 'Training Efficiency', value: 89.4, change: 7.8, trend: 'up' },
      { metric: 'Prediction Confidence', value: 91.8, change: 1.2, trend: 'up' },
      { metric: 'Data Quality Score', value: 97.6, change: 0.8, trend: 'stable' },
      { metric: 'Resource Utilization', value: 73.2, change: -8.4, trend: 'down' }
    ]);

    setPredictions([
      {
        id: 'pred-001',
        input: 'Generate React component for user authentication',
        output: 'Generated modern authentication component with hooks and validation',
        confidence: 96.8,
        timestamp: new Date(),
        model: 'gen-001',
        processingTime: 245
      },
      {
        id: 'pred-002',
        input: 'Optimize database query performance',
        output: 'Suggested indexing strategy and query restructuring (34% improvement)',
        confidence: 92.1,
        timestamp: new Date(Date.now() - 300000),
        model: 'predict-001',
        processingTime: 189
      }
    ]);
  }, []);

  const handleTrainModel = async (modelId: string) => {
    setIsTraining(true);
    // Simulate training process
    const trainingSteps = 10;
    for (let i = 0; i <= trainingSteps; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));
      // Update training progress here
    }
    setIsTraining(false);
    
    // Update model status
    setModels(prev => prev.map(model => 
      model.id === modelId 
        ? { ...model, status: 'ready', accuracy: model.accuracy + Math.random() * 2 }
        : model
    ));
  };

  const handlePrediction = async () => {
    if (!inputQuery.trim()) return;

    const newPrediction: Prediction = {
      id: `pred-${Date.now()}`,
      input: inputQuery,
      output: 'Processing your request with advanced AI analysis...',
      confidence: Math.random() * 20 + 80,
      timestamp: new Date(),
      model: selectedModel || 'nlp-001',
      processingTime: Math.random() * 300 + 100
    };

    setPredictions(prev => [newPrediction, ...prev]);
    setInputQuery('');

    // Simulate AI processing
    setTimeout(() => {
      setPredictions(prev => prev.map(pred => 
        pred.id === newPrediction.id
          ? { ...pred, output: generateAIResponse(inputQuery) }
          : pred
      ));
    }, 2000);
  };

  const generateAIResponse = (input: string): string => {
    const responses = [
      'Based on advanced pattern analysis, I recommend implementing a microservices architecture with containerized deployment.',
      'Machine learning analysis suggests optimizing your database queries could improve performance by 45-67%.',
      'Natural language processing indicates this feature would benefit from progressive enhancement and accessibility improvements.',
      'Computer vision analysis shows your UI could be enhanced with better color contrast and responsive design patterns.',
      'Predictive modeling suggests implementing caching strategies and CDN optimization for better scalability.'
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'text-[#4AE54A]';
      case 'deployed': return 'text-blue-400';
      case 'training': return 'text-yellow-400';
      case 'updating': return 'text-orange-400';
      default: return 'text-[#C0C5CE]';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'nlp': return <MessageSquare className="w-4 h-4" />;
      case 'vision': return <Eye className="w-4 h-4" />;
      case 'prediction': return <TrendingUp className="w-4 h-4" />;
      case 'generation': return <Code2 className="w-4 h-4" />;
      default: return <Brain className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0D12] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Rocket className="w-8 h-8 text-[#4AE54A] mr-3" />
              <div>
                <h1 className="text-[#C0C5CE] font-mono text-2xl mb-2">NeoBot AI</h1>
                <div className="flex items-center text-[#C0C5CE]/70 font-mono text-sm">
                  <span className="text-[#4AE54A] mr-2">{'>'}</span>
                  <span>Enhanced AI-powered bot with advanced learning capabilities</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-[#C0C5CE] font-mono text-sm">AI System Online</span>
              </div>
              <Button
                onClick={() => setRealTimeMode(!realTimeMode)}
                variant="outline"
                className={`border-[#C0C5CE]/20 font-mono ${
                  realTimeMode ? 'bg-[#4AE54A]/20 text-[#4AE54A]' : 'text-[#C0C5CE]'
                }`}
              >
                {realTimeMode ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                Real-time Mode
              </Button>
            </div>
          </div>
        </div>

        {/* Main Interface */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-[#12151C] border-[#C0C5CE]/20">
            <TabsTrigger value="dashboard" className="font-mono">Dashboard</TabsTrigger>
            <TabsTrigger value="models" className="font-mono">AI Models</TabsTrigger>
            <TabsTrigger value="training" className="font-mono">Training</TabsTrigger>
            <TabsTrigger value="predictions" className="font-mono">Predictions</TabsTrigger>
            <TabsTrigger value="analytics" className="font-mono">Analytics</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* System Status */}
              <Card className="bg-[#12151C] border-[#C0C5CE]/20 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[#4AE54A] font-mono text-lg">System Status</h3>
                  <Cpu className="w-5 h-5 text-[#4AE54A]" />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[#C0C5CE] font-mono text-sm">CPU Usage</span>
                    <span className="text-[#4AE54A] font-mono text-sm">67%</span>
                  </div>
                  <Progress value={67} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-[#C0C5CE] font-mono text-sm">Memory</span>
                    <span className="text-[#4AE54A] font-mono text-sm">84%</span>
                  </div>
                  <Progress value={84} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-[#C0C5CE] font-mono text-sm">GPU Utilization</span>
                    <span className="text-[#4AE54A] font-mono text-sm">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
              </Card>

              {/* Active Models */}
              <Card className="bg-[#12151C] border-[#C0C5CE]/20 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[#4AE54A] font-mono text-lg">Active Models</h3>
                  <Brain className="w-5 h-5 text-[#4AE54A]" />
                </div>
                <div className="space-y-3">
                  {models.slice(0, 3).map((model) => (
                    <div key={model.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(model.type)}
                        <span className="text-[#C0C5CE] font-mono text-sm">{model.name}</span>
                      </div>
                      <Badge variant="secondary" className={`font-mono text-xs ${getStatusColor(model.status)}`}>
                        {model.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Performance Metrics */}
              <Card className="bg-[#12151C] border-[#C0C5CE]/20 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[#4AE54A] font-mono text-lg">Performance</h3>
                  <BarChart3 className="w-5 h-5 text-[#4AE54A]" />
                </div>
                <div className="space-y-3">
                  {metrics.slice(0, 3).map((metric, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-[#C0C5CE] font-mono text-sm">{metric.metric}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-[#4AE54A] font-mono text-sm">{metric.value}%</span>
                        <TrendingUp className={`w-3 h-3 ${
                          metric.trend === 'up' ? 'text-green-400' : 
                          metric.trend === 'down' ? 'text-red-400' : 'text-yellow-400'
                        }`} />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Quick Prediction Interface */}
            <Card className="bg-[#12151C] border-[#C0C5CE]/20 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[#4AE54A] font-mono text-lg">Quick AI Prediction</h3>
                <Lightbulb className="w-5 h-5 text-[#4AE54A]" />
              </div>
              <div className="flex space-x-4">
                <Input
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handlePrediction()}
                  placeholder="Ask AI anything about your project..."
                  className="bg-[#0B0D12] border-[#C0C5CE]/20 text-[#C0C5CE] font-mono flex-1"
                />
                <Button
                  onClick={handlePrediction}
                  className="bg-[#4AE54A] text-[#0B0D12] hover:bg-[#4AE54A]/90 font-mono"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Predict
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* AI Models Tab */}
          <TabsContent value="models" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {models.map((model) => (
                <Card key={model.id} className="bg-[#12151C] border-[#C0C5CE]/20 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {getTypeIcon(model.type)}
                      <div>
                        <h3 className="text-[#C0C5CE] font-mono text-lg">{model.name}</h3>
                        <p className="text-[#C0C5CE]/70 font-mono text-sm">v{model.version}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className={`font-mono ${getStatusColor(model.status)}`}>
                      {model.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[#C0C5CE] font-mono text-sm">Accuracy</span>
                      <span className="text-[#4AE54A] font-mono text-sm">{model.accuracy.toFixed(1)}%</span>
                    </div>
                    <Progress value={model.accuracy} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-[#C0C5CE] font-mono text-sm">Last Trained</span>
                      <span className="text-[#C0C5CE]/70 font-mono text-sm">
                        {model.lastTrained.toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="flex space-x-2 mt-4">
                      <Button
                        onClick={() => handleTrainModel(model.id)}
                        disabled={model.status === 'training' || isTraining}
                        size="sm"
                        className="bg-[#4AE54A] text-[#0B0D12] hover:bg-[#4AE54A]/90 font-mono flex-1"
                      >
                        {model.status === 'training' ? 'Training...' : 'Train Model'}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-[#C0C5CE]/20 text-[#C0C5CE] font-mono"
                      >
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Training Tab */}
          <TabsContent value="training" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {trainingData.map((data) => (
                <Card key={data.id} className="bg-[#12151C] border-[#C0C5CE]/20 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[#C0C5CE] font-mono text-lg">{data.name}</h3>
                    <Database className="w-5 h-5 text-[#4AE54A]" />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[#C0C5CE] font-mono text-sm">Type</span>
                      <Badge variant="secondary" className="font-mono text-xs">
                        {data.type}
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-[#C0C5CE] font-mono text-sm">Size</span>
                      <span className="text-[#4AE54A] font-mono text-sm">{data.size}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-[#C0C5CE] font-mono text-sm">Samples</span>
                      <span className="text-[#4AE54A] font-mono text-sm">{data.samples.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-[#C0C5CE] font-mono text-sm">Quality</span>
                      <span className="text-[#4AE54A] font-mono text-sm">{data.quality}%</span>
                    </div>
                    <Progress value={data.quality} className="h-2" />
                    
                    <div className="flex space-x-2 mt-4">
                      <Button
                        size="sm"
                        className="bg-[#4AE54A] text-[#0B0D12] hover:bg-[#4AE54A]/90 font-mono flex-1"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Update
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-[#C0C5CE]/20 text-[#C0C5CE] font-mono"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Predictions Tab */}
          <TabsContent value="predictions" className="space-y-6">
            <Card className="bg-[#12151C] border-[#C0C5CE]/20 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[#4AE54A] font-mono text-lg">Recent Predictions</h3>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-[#C0C5CE]/20 text-[#C0C5CE] font-mono"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
              
              <div className="space-y-4">
                {predictions.map((prediction) => (
                  <div key={prediction.id} className="bg-[#0B0D12] border border-[#C0C5CE]/20 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="text-[#C0C5CE] font-mono text-sm mb-2">
                          <span className="text-[#4AE54A]">Query:</span> {prediction.input}
                        </div>
                        <div className="text-[#C0C5CE]/80 font-mono text-sm">
                          <span className="text-[#4AE54A]">Result:</span> {prediction.output}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-4">
                        <span className="text-[#C0C5CE]/70 font-mono">
                          Confidence: <span className="text-[#4AE54A]">{prediction.confidence.toFixed(1)}%</span>
                        </span>
                        <span className="text-[#C0C5CE]/70 font-mono">
                          Model: <span className="text-[#4AE54A]">{prediction.model}</span>
                        </span>
                        <span className="text-[#C0C5CE]/70 font-mono">
                          Time: <span className="text-[#4AE54A]">{prediction.processingTime}ms</span>
                        </span>
                      </div>
                      <span className="text-[#C0C5CE]/50 font-mono">
                        {prediction.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {metrics.map((metric, index) => (
                <Card key={index} className="bg-[#12151C] border-[#C0C5CE]/20 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[#C0C5CE] font-mono text-lg">{metric.metric}</h3>
                    <TrendingUp className={`w-5 h-5 ${
                      metric.trend === 'up' ? 'text-green-400' : 
                      metric.trend === 'down' ? 'text-red-400' : 'text-yellow-400'
                    }`} />
                  </div>
                  
                  <div className="text-3xl font-mono text-[#4AE54A] mb-2">
                    {metric.value.toFixed(1)}%
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`font-mono text-sm ${
                      metric.change > 0 ? 'text-green-400' : 
                      metric.change < 0 ? 'text-red-400' : 'text-yellow-400'
                    }`}>
                      {metric.change > 0 ? '+' : ''}{metric.change.toFixed(1)}%
                    </span>
                    <span className="text-[#C0C5CE]/70 font-mono text-sm">vs last week</span>
                  </div>
                  
                  <Progress value={metric.value} className="h-2 mt-4" />
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}