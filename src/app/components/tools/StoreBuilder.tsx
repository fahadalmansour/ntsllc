import React from 'react';
import { Store, Palette, Layers, Settings, Eye, Code, Zap } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

interface StoreBuilderProps {
  onNavigate?: (section: string) => void;
}

export function StoreBuilder({ onNavigate }: StoreBuilderProps) {
  return (
    <div className="min-h-screen bg-[#0B0D12] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Store className="w-8 h-8 text-[#4AE54A] mr-3" />
            <div>
              <h1 className="text-[#C0C5CE] font-mono text-2xl mb-2">AI Store Builder</h1>
              <div className="flex items-center text-[#C0C5CE]/70 font-mono text-sm">
                <span className="text-[#4AE54A] mr-2">{'>'}</span>
                <span>Build professional e-commerce stores with AI assistance</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="outline" className="border-[#C0C5CE]/20 text-[#C0C5CE] font-mono">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button className="bg-[#4AE54A] text-[#0B0D12] hover:bg-[#4AE54A]/90 font-mono">
              <Zap className="w-4 h-4 mr-2" />
              Build Store
            </Button>
          </div>
        </div>

        {/* Store Builder Tools */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Design Tools */}
          <Card className="bg-[#12151C] border-[#C0C5CE]/20 p-6">
            <div className="flex items-center mb-6">
              <Palette className="w-6 h-6 text-[#4AE54A] mr-3" />
              <h3 className="text-[#C0C5CE] font-mono text-lg">Design Tools</h3>
            </div>
            
            <div className="space-y-4">
              {[
                'Theme Customization',
                'Color Schemes',
                'Typography Settings',
                'Layout Designer',
                'Mobile Responsive'
              ].map((tool, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-[#0B0D12] rounded border border-[#C0C5CE]/20 hover:border-[#4AE54A]/50 transition-colors cursor-pointer">
                  <span className="text-[#C0C5CE] font-mono text-sm">{tool}</span>
                  <Button size="sm" variant="ghost" className="text-[#4AE54A]">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Components */}
          <Card className="bg-[#12151C] border-[#C0C5CE]/20 p-6">
            <div className="flex items-center mb-6">
              <Layers className="w-6 h-6 text-[#4AE54A] mr-3" />
              <h3 className="text-[#C0C5CE] font-mono text-lg">Components</h3>
            </div>
            
            <div className="space-y-4">
              {[
                'Product Grid',
                'Shopping Cart',
                'Checkout Form',
                'Payment Gateway',
                'User Reviews'
              ].map((component, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-[#0B0D12] rounded border border-[#C0C5CE]/20 hover:border-[#4AE54A]/50 transition-colors cursor-pointer">
                  <span className="text-[#C0C5CE] font-mono text-sm">{component}</span>
                  <Button size="sm" variant="ghost" className="text-[#4AE54A]">
                    <Code className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* AI Features */}
          <Card className="bg-[#12151C] border-[#C0C5CE]/20 p-6">
            <div className="flex items-center mb-6">
              <Zap className="w-6 h-6 text-[#4AE54A] mr-3" />
              <h3 className="text-[#C0C5CE] font-mono text-lg">AI Features</h3>
            </div>
            
            <div className="space-y-4">
              {[
                'Auto Content Generation',
                'Smart Product Recommendations',
                'SEO Optimization',
                'Performance Analytics',
                'A/B Testing'
              ].map((feature, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-[#0B0D12] rounded border border-[#C0C5CE]/20 hover:border-[#4AE54A]/50 transition-colors cursor-pointer">
                  <span className="text-[#C0C5CE] font-mono text-sm">{feature}</span>
                  <Button size="sm" variant="ghost" className="text-[#4AE54A]">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Start */}
        <Card className="bg-[#12151C] border-[#C0C5CE]/20 p-8 mt-8 text-center">
          <Store className="w-16 h-16 text-[#C0C5CE]/50 mx-auto mb-4" />
          <h3 className="text-[#C0C5CE] font-mono text-xl mb-2">AI-Powered Store Builder</h3>
          <p className="text-[#C0C5CE]/70 font-mono mb-6 max-w-2xl mx-auto">
            Create professional e-commerce stores in minutes with our AI-powered builder. 
            Choose from templates, customize designs, and launch your store with intelligent automation.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Button className="bg-[#4AE54A] text-[#0B0D12] hover:bg-[#4AE54A]/90 font-mono">
              <Zap className="w-4 h-4 mr-2" />
              Start Building
            </Button>
            <Button variant="outline" className="border-[#C0C5CE]/20 text-[#C0C5CE] font-mono">
              View Templates
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default StoreBuilder;