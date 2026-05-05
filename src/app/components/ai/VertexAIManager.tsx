import React, { useState } from 'react';
import { Brain, Cpu, Settings, Zap, Database, Code, BarChart3, Shield } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';

interface VertexAIManagerProps {
  onNavigate?: (section: string) => void;
}

export function VertexAIManager({ onNavigate }: VertexAIManagerProps) {
  const [activeModel, setActiveModel] = useState('gemini-pro');

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#C0C5CE] font-mono">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Brain className="w-8 h-8 text-[#00ff88] mr-3" />
            <div>
              <h1 className="text-[#C0C5CE] text-2xl font-semibold mb-2">Vertex AI Manager</h1>
              <div className="flex items-center text-[#C0C5CE]/70 text-sm">
                <span className="text-[#00ff88] mr-2">{'>'}</span>
                <span>Manage Google Cloud Vertex AI models and services</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button className="bg-[#00ff88] text-[#0a0a0a] hover:bg-[#00ff88]/90 font-semibold px-6 py-3">
              <Zap className="w-4 h-4 mr-2" />
              Deploy Model
            </Button>
          </div>
        </div>

        {/* Model Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { name: 'Gemini Pro', status: 'Active', usage: 87, requests: '2.3M' },
            { name: 'PaLM 2', status: 'Standby', usage: 23, requests: '892K' },
            { name: 'Codey', status: 'Active', usage: 65, requests: '1.7M' },
            { name: 'Imagen', status: 'Training', usage: 45, requests: '543K' }
          ].map((model, index) => (
            <Card key={index} className="bg-[#12151C] border-[#C0C5CE]/20 p-6 hover:border-[#00ff88]/50 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[#C0C5CE] font-semibold">{model.name}</h3>
                <Badge variant="secondary" className={`font-mono text-xs ${
                  model.status === 'Active' ? 'bg-[#00ff88]/20 text-[#00ff88]' :
                  model.status === 'Training' ? 'bg-yellow-400/20 text-yellow-400' :
                  'bg-[#C0C5CE]/20 text-[#C0C5CE]'
                }`}>
                  {model.status}
                </Badge>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[#C0C5CE]/70">Usage</span>
                    <span className="text-[#00ff88]">{model.usage}%</span>
                  </div>
                  <Progress value={model.usage} className="h-2" />
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-[#C0C5CE]/70">Requests</span>
                  <span className="text-[#00d4ff]">{model.requests}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="models" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-[#12151C] p-1">
            <TabsTrigger value="models" className="text-[#C0C5CE] data-[state=active]:bg-[#00ff88] data-[state=active]:text-[#0a0a0a] font-mono">
              Models
            </TabsTrigger>
            <TabsTrigger value="training" className="text-[#C0C5CE] data-[state=active]:bg-[#00ff88] data-[state=active]:text-[#0a0a0a] font-mono">
              Training
            </TabsTrigger>
            <TabsTrigger value="endpoints" className="text-[#C0C5CE] data-[state=active]:bg-[#00ff88] data-[state=active]:text-[#0a0a0a] font-mono">
              Endpoints
            </TabsTrigger>
            <TabsTrigger value="monitoring" className="text-[#C0C5CE] data-[state=active]:bg-[#00ff88] data-[state=active]:text-[#0a0a0a] font-mono">
              Monitoring
            </TabsTrigger>
          </TabsList>

          <TabsContent value="models" className="space-y-6">
            <Card className="bg-[#12151C] border-[#C0C5CE]/20 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[#00ff88] text-lg font-semibold">Available Models</h3>
                <Button variant="outline" className="border-[#C0C5CE]/20 text-[#C0C5CE] hover:bg-[#00ff88]/10 font-mono">
                  <Settings className="w-4 h-4 mr-2" />
                  Configure
                </Button>
              </div>

              <div className="space-y-4">
                {[
                  { 
                    name: 'Gemini Pro 1.5', 
                    type: 'Large Language Model', 
                    performance: 'High',
                    pricing: '$0.0025/1K tokens',
                    features: ['Text Generation', 'Code Analysis', 'Reasoning']
                  },
                  { 
                    name: 'PaLM 2 for Chat', 
                    type: 'Conversational AI', 
                    performance: 'Medium',
                    pricing: '$0.002/1K tokens',
                    features: ['Chat', 'Q&A', 'Summarization']
                  },
                  { 
                    name: 'Codey for Code Generation', 
                    type: 'Code Model', 
                    performance: 'High',
                    pricing: '$0.003/1K tokens',
                    features: ['Code Generation', 'Code Completion', 'Bug Detection']
                  }
                ].map((model, index) => (
                  <div key={index} className="bg-[#0B0D12] border border-[#C0C5CE]/20 rounded-lg p-4 hover:border-[#00ff88]/50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="text-[#C0C5CE] font-semibold text-base">{model.name}</h4>
                        <p className="text-[#C0C5CE]/70 text-sm">{model.type}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className={`font-mono text-xs ${
                          model.performance === 'High' ? 'bg-[#00ff88]/20 text-[#00ff88]' : 'bg-yellow-400/20 text-yellow-400'
                        }`}>
                          {model.performance}
                        </Badge>
                        <Button size="sm" className="bg-[#00d4ff] text-[#0a0a0a] hover:bg-[#00d4ff]/90 font-mono">
                          Deploy
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <span className="text-[#C0C5CE]/70 text-sm">Pricing: </span>
                        <span className="text-[#00d4ff] text-sm font-semibold">{model.pricing}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {model.features.map((feature, idx) => (
                          <span key={idx} className="px-2 py-1 bg-[#00ff88]/20 text-[#00ff88] text-xs rounded font-mono">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="training" className="space-y-6">
            <Card className="bg-[#12151C] border-[#C0C5CE]/20 p-6">
              <h3 className="text-[#00ff88] text-lg font-semibold mb-6">Training Jobs</h3>
              
              <div className="bg-[#0B0D12] border border-[#C0C5CE]/20 rounded-lg p-8 text-center">
                <Cpu className="w-16 h-16 text-[#C0C5CE]/50 mx-auto mb-4" />
                <h3 className="text-[#C0C5CE] text-xl font-semibold mb-2">Custom Model Training</h3>
                <p className="text-[#C0C5CE]/70 font-mono mb-6 max-w-2xl mx-auto">
                  Train custom AI models on your data using Vertex AI's training infrastructure. 
                  Fine-tune models for your specific e-commerce use cases.
                </p>
                <Button className="bg-[#00ff88] text-[#0a0a0a] hover:bg-[#00ff88]/90 font-semibold px-6 py-3">
                  Start Training Job
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="endpoints" className="space-y-6">
            <Card className="bg-[#12151C] border-[#C0C5CE]/20 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[#00ff88] text-lg font-semibold">Model Endpoints</h3>
                <Button className="bg-[#00ff88] text-[#0a0a0a] hover:bg-[#00ff88]/90 font-mono">
                  <Code className="w-4 h-4 mr-2" />
                  Create Endpoint
                </Button>
              </div>

              <div className="space-y-4">
                {[
                  { name: 'gemini-pro-endpoint', model: 'Gemini Pro', status: 'Running', traffic: '2.3K req/min' },
                  { name: 'codey-completion-api', model: 'Codey', status: 'Running', traffic: '892 req/min' },
                  { name: 'palm-chat-endpoint', model: 'PaLM 2', status: 'Stopped', traffic: '0 req/min' }
                ].map((endpoint, index) => (
                  <div key={index} className="bg-[#0B0D12] border border-[#C0C5CE]/20 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div>
                          <h4 className="text-[#C0C5CE] font-semibold">{endpoint.name}</h4>
                          <p className="text-[#C0C5CE]/70 text-sm">{endpoint.model}</p>
                        </div>
                        <Badge variant="secondary" className={`font-mono text-xs ${
                          endpoint.status === 'Running' ? 'bg-[#00ff88]/20 text-[#00ff88]' : 'bg-red-400/20 text-red-400'
                        }`}>
                          {endpoint.status}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-[#00d4ff] text-sm font-semibold">{endpoint.traffic}</p>
                        <p className="text-[#C0C5CE]/70 text-xs">Traffic</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-[#12151C] border-[#C0C5CE]/20 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[#00ff88] text-lg font-semibold">Performance Metrics</h3>
                  <BarChart3 className="w-5 h-5 text-[#C0C5CE]" />
                </div>
                
                <div className="space-y-4">
                  {[
                    { metric: 'Latency', value: '245ms', change: '-12%', good: true },
                    { metric: 'Throughput', value: '2.3K/min', change: '+18%', good: true },
                    { metric: 'Error Rate', value: '0.02%', change: '-5%', good: true },
                    { metric: 'Cost/Request', value: '$0.003', change: '-8%', good: true }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-[#C0C5CE] text-sm">{item.metric}</span>
                      <div className="text-right">
                        <span className="text-[#00d4ff] font-semibold">{item.value}</span>
                        <span className={`ml-2 text-xs ${item.good ? 'text-[#00ff88]' : 'text-red-400'}`}>
                          {item.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="bg-[#12151C] border-[#C0C5CE]/20 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[#00ff88] text-lg font-semibold">Security & Compliance</h3>
                  <Shield className="w-5 h-5 text-[#C0C5CE]" />
                </div>
                
                <div className="space-y-4">
                  {[
                    { check: 'Data Encryption', status: 'Enabled' },
                    { check: 'Access Controls', status: 'Configured' },
                    { check: 'Audit Logging', status: 'Active' },
                    { check: 'Compliance Check', status: 'Passed' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-[#C0C5CE] text-sm">{item.check}</span>
                      <Badge variant="secondary" className="bg-[#00ff88]/20 text-[#00ff88] font-mono text-xs">
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default VertexAIManager;