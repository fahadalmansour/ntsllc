import React from 'react';
import { Code, Search, AlertTriangle, CheckCircle, Zap, FileText } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface CodeAnalyzerProps {
  onNavigate?: (section: string) => void;
}

export function CodeAnalyzer({ onNavigate }: CodeAnalyzerProps) {
  return (
    <div className="min-h-screen bg-[#0B0D12] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Code className="w-8 h-8 text-[#4AE54A] mr-3" />
            <div>
              <h1 className="text-[#C0C5CE] font-mono text-2xl mb-2">AI Code Analyzer</h1>
              <div className="flex items-center text-[#C0C5CE]/70 font-mono text-sm">
                <span className="text-[#4AE54A] mr-2">{'>'}</span>
                <span>Analyze, debug, and optimize your code with AI</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="outline" className="border-[#C0C5CE]/20 text-[#C0C5CE] font-mono">
              <FileText className="w-4 h-4 mr-2" />
              Upload Code
            </Button>
            <Button className="bg-[#4AE54A] text-[#0B0D12] hover:bg-[#4AE54A]/90 font-mono">
              <Zap className="w-4 h-4 mr-2" />
              Analyze
            </Button>
          </div>
        </div>

        {/* Analysis Results */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Issues Found */}
          <Card className="bg-[#12151C] border-[#C0C5CE]/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-yellow-400 mr-2" />
                <h3 className="text-[#C0C5CE] font-mono text-lg">Issues Found</h3>
              </div>
              <Badge variant="secondary" className="bg-yellow-400/20 text-yellow-400 font-mono">
                12
              </Badge>
            </div>
            
            <div className="space-y-3">
              {[
                { type: 'Warning', message: 'Unused variable detected', line: 42 },
                { type: 'Error', message: 'Missing semicolon', line: 128 },
                { type: 'Warning', message: 'Function complexity too high', line: 89 }
              ].map((issue, index) => (
                <div key={index} className="p-3 bg-[#0B0D12] border border-[#C0C5CE]/20 rounded">
                  <div className="flex items-center justify-between mb-1">
                    <Badge variant="secondary" className={`font-mono text-xs ${
                      issue.type === 'Error' ? 'bg-red-400/20 text-red-400' : 'bg-yellow-400/20 text-yellow-400'
                    }`}>
                      {issue.type}
                    </Badge>
                    <span className="text-[#C0C5CE]/50 font-mono text-xs">Line {issue.line}</span>
                  </div>
                  <p className="text-[#C0C5CE] font-mono text-sm">{issue.message}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Code Quality */}
          <Card className="bg-[#12151C] border-[#C0C5CE]/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                <h3 className="text-[#C0C5CE] font-mono text-lg">Code Quality</h3>
              </div>
              <Badge variant="secondary" className="bg-green-400/20 text-green-400 font-mono">
                Grade A
              </Badge>
            </div>
            
            <div className="space-y-4">
              {[
                { metric: 'Maintainability', score: 85 },
                { metric: 'Readability', score: 92 },
                { metric: 'Performance', score: 78 },
                { metric: 'Security', score: 95 }
              ].map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#C0C5CE] font-mono text-sm">{metric.metric}</span>
                    <span className="text-[#4AE54A] font-mono text-sm">{metric.score}%</span>
                  </div>
                  <div className="w-full bg-[#0B0D12] rounded-full h-2">
                    <div 
                      className="bg-[#4AE54A] h-2 rounded-full" 
                      style={{ width: `${metric.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Suggestions */}
          <Card className="bg-[#12151C] border-[#C0C5CE]/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Zap className="w-5 h-5 text-[#4AE54A] mr-2" />
                <h3 className="text-[#C0C5CE] font-mono text-lg">AI Suggestions</h3>
              </div>
              <Badge variant="secondary" className="bg-blue-400/20 text-blue-400 font-mono">
                8
              </Badge>
            </div>
            
            <div className="space-y-3">
              {[
                'Consider using const instead of let for immutable variables',
                'Extract repeated code into a reusable function',
                'Add error handling for API calls',
                'Optimize database queries for better performance'
              ].map((suggestion, index) => (
                <div key={index} className="p-3 bg-[#0B0D12] border border-[#C0C5CE]/20 rounded">
                  <p className="text-[#C0C5CE] font-mono text-sm">{suggestion}</p>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-[#4AE54A] hover:text-[#4AE54A]/80 font-mono mt-2 p-0 h-auto"
                  >
                    Apply Fix →
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Code Input Area */}
        <Card className="bg-[#12151C] border-[#C0C5CE]/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#C0C5CE] font-mono text-lg">Code Input</h3>
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="outline" className="border-[#C0C5CE]/20 text-[#C0C5CE] font-mono">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
              <Button size="sm" className="bg-[#4AE54A] text-[#0B0D12] hover:bg-[#4AE54A]/90 font-mono">
                <Zap className="w-4 h-4 mr-2" />
                Analyze
              </Button>
            </div>
          </div>
          
          <div className="bg-[#0B0D12] border border-[#C0C5CE]/10 rounded p-4 min-h-[200px] font-mono text-sm text-[#C0C5CE]">
            <div className="text-[#C0C5CE]/50 font-mono text-sm mb-4">
              Paste your code here or upload a file for AI-powered analysis...
            </div>
            <div className="bg-[#0B0D12] border border-[#C0C5CE]/10 rounded p-4 min-h-[200px] font-mono text-sm text-[#C0C5CE]">
              <div className="text-[#4AE54A]">// Example JavaScript code</div>
              <div className="text-[#C0C5CE]">function calculateTotal(items) {'{'}</div>
              <div className="text-[#C0C5CE] ml-4">let total = 0;</div>
              <div className="text-[#C0C5CE] ml-4">for (let i = 0; i &lt; items.length; i++) {'{'}</div>
              <div className="text-[#C0C5CE] ml-8">total += items[i].price;</div>
              <div className="text-[#C0C5CE] ml-4">{'}'}</div>
              <div className="text-[#C0C5CE] ml-4">return total;</div>
              <div className="text-[#C0C5CE]">{'}'}</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default CodeAnalyzer;