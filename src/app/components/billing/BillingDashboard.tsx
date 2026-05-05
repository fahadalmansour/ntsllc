import React, { useState } from 'react';
import { 
  CreditCard, DollarSign, Calendar, Download, AlertTriangle, 
  CheckCircle, Clock, Settings, Plus, FileText, Receipt,
  TrendingUp, BarChart3, Zap, Shield
} from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';

interface BillingDashboardProps {
  onNavigate?: (section: string) => void;
}

export function BillingDashboard({ onNavigate }: BillingDashboardProps) {
  const [billingPeriod, setBillingPeriod] = useState('monthly');

  const currentPlan = {
    name: 'Storm Complete',
    price: '$2,999',
    period: 'One-time',
    features: [
      'Complete e-commerce platform',
      'AI and advanced analytics',
      'Full process automation',
      'Custom design and branding',
      'Intensive training and handover',
      'Full year technical support'
    ],
    status: 'Active',
    nextBilling: 'Support until Dec 2024'
  };

  const invoices = [
    { id: 'INV-2024-001', date: '2024-01-15', amount: '$2,999', status: 'Paid', service: 'Storm Complete Package' },
    { id: 'INV-2023-087', date: '2023-12-01', amount: '$1,299', status: 'Paid', service: 'Thunder Setup' },
    { id: 'INV-2023-065', date: '2023-11-15', amount: '$799', status: 'Paid', service: 'Lightning Launch' },
    { id: 'INV-2023-054', date: '2023-10-30', amount: '$150', status: 'Paid', service: 'Additional Support Hours' }
  ];

  const usageMetrics = [
    { metric: 'AI API Calls', used: 47200, limit: 100000, unit: 'calls' },
    { metric: 'Storage', used: 12.5, limit: 100, unit: 'GB' },
    { metric: 'Bandwidth', used: 340, limit: 1000, unit: 'GB' },
    { metric: 'Support Hours', used: 8, limit: 40, unit: 'hours' }
  ];

  const availableServices = [
    {
      name: 'Lightning Launch',
      price: '$799',
      period: 'One-time',
      deliveryTime: '4 hours',
      description: 'Complete online store in 4 hours',
      popular: false
    },
    {
      name: 'Thunder Setup',
      price: '$1,299',
      period: 'One-time',
      deliveryTime: '24 hours',
      description: 'Advanced store with custom features',
      popular: true
    },
    {
      name: 'Storm Complete',
      price: '$2,999',
      period: 'One-time',
      deliveryTime: '72 hours',
      description: 'Complete e-commerce platform',
      popular: false
    },
    {
      name: 'Additional Support',
      price: '$75',
      period: 'Per hour',
      deliveryTime: 'On-demand',
      description: 'Extra technical support hours',
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#C0C5CE] font-mono">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <CreditCard className="w-8 h-8 text-[#00ff88] mr-3" />
            <div>
              <h1 className="text-[#C0C5CE] text-2xl font-semibold mb-2">Billing Dashboard</h1>
              <div className="flex items-center text-[#C0C5CE]/70 text-sm">
                <span className="text-[#00ff88] mr-2">{'>'}</span>
                <span>Manage your billing, invoices, and subscription details</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="outline" className="border-[#C0C5CE]/20 text-[#C0C5CE] hover:bg-[#00d4ff]/10 font-mono">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Button className="bg-[#00ff88] text-[#0a0a0a] hover:bg-[#00ff88]/90 font-semibold px-6 py-3">
              <Plus className="w-4 h-4 mr-2" />
              Upgrade Plan
            </Button>
          </div>
        </div>

        {/* Current Plan Overview */}
        <Card className="bg-[#12151C] border-[#C0C5CE]/20 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[#00ff88] text-xl font-semibold">Current Plan</h2>
            <Badge variant="secondary" className="bg-[#00ff88]/20 text-[#00ff88] font-mono">
              {currentPlan.status}
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-[#C0C5CE] text-lg font-semibold mb-1">{currentPlan.name}</h3>
                  <p className="text-[#C0C5CE]/70 text-sm">{currentPlan.nextBilling}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#00d4ff]">{currentPlan.price}</div>
                  <div className="text-[#C0C5CE]/70 text-sm">{currentPlan.period}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {currentPlan.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-[#00ff88]" />
                    <span className="text-[#C0C5CE] text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0B0D12] border border-[#C0C5CE]/20 rounded-lg p-4">
              <h4 className="text-[#00ff88] font-semibold mb-3">Quick Actions</h4>
              <div className="space-y-2">
                <Button size="sm" variant="outline" className="w-full border-[#C0C5CE]/20 text-[#C0C5CE] font-mono justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  View Contract
                </Button>
                <Button size="sm" variant="outline" className="w-full border-[#C0C5CE]/20 text-[#C0C5CE] font-mono justify-start">
                  <Receipt className="w-4 h-4 mr-2" />
                  Download Invoice
                </Button>
                <Button size="sm" variant="outline" className="w-full border-[#C0C5CE]/20 text-[#C0C5CE] font-mono justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  Billing Settings
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="usage" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-[#12151C] p-1">
            <TabsTrigger value="usage" className="text-[#C0C5CE] data-[state=active]:bg-[#00ff88] data-[state=active]:text-[#0a0a0a] font-mono">
              Usage
            </TabsTrigger>
            <TabsTrigger value="invoices" className="text-[#C0C5CE] data-[state=active]:bg-[#00ff88] data-[state=active]:text-[#0a0a0a] font-mono">
              Invoices
            </TabsTrigger>
            <TabsTrigger value="services" className="text-[#C0C5CE] data-[state=active]:bg-[#00ff88] data-[state=active]:text-[#0a0a0a] font-mono">
              Services
            </TabsTrigger>
            <TabsTrigger value="payment" className="text-[#C0C5CE] data-[state=active]:bg-[#00ff88] data-[state=active]:text-[#0a0a0a] font-mono">
              Payment
            </TabsTrigger>
          </TabsList>

          <TabsContent value="usage" className="space-y-6">
            <Card className="bg-[#12151C] border-[#C0C5CE]/20 p-6">
              <h3 className="text-[#00ff88] text-lg font-semibold mb-6">Usage Overview</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {usageMetrics.map((metric, index) => (
                  <div key={index} className="bg-[#0B0D12] border border-[#C0C5CE]/20 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-[#C0C5CE] font-semibold">{metric.metric}</h4>
                      <span className="text-[#00d4ff] text-sm font-semibold">
                        {metric.used.toLocaleString()} / {metric.limit.toLocaleString()} {metric.unit}
                      </span>
                    </div>
                    
                    <Progress value={(metric.used / metric.limit) * 100} className="h-2 mb-2" />
                    
                    <div className="flex justify-between text-xs text-[#C0C5CE]/70">
                      <span>{((metric.used / metric.limit) * 100).toFixed(1)}% used</span>
                      <span>{(metric.limit - metric.used).toLocaleString()} {metric.unit} remaining</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-[#0B0D12] border border-[#00ff88]/20 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-[#00ff88]" />
                  <span className="text-[#00ff88] font-semibold">All systems operating within limits</span>
                </div>
                <p className="text-[#C0C5CE]/70 text-sm">
                  Your current usage is well within the allocated limits. Support hours renew monthly.
                </p>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="invoices" className="space-y-6">
            <Card className="bg-[#12151C] border-[#C0C5CE]/20 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[#00ff88] text-lg font-semibold">Invoice History</h3>
                <Button size="sm" variant="outline" className="border-[#C0C5CE]/20 text-[#C0C5CE] font-mono">
                  <Download className="w-4 h-4 mr-2" />
                  Download All
                </Button>
              </div>

              <div className="space-y-3">
                {invoices.map((invoice, index) => (
                  <div key={index} className="bg-[#0B0D12] border border-[#C0C5CE]/20 rounded-lg p-4 hover:border-[#00ff88]/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Receipt className="w-5 h-5 text-[#00d4ff]" />
                        <div>
                          <h4 className="text-[#C0C5CE] font-semibold">{invoice.id}</h4>
                          <p className="text-[#C0C5CE]/70 text-sm">{invoice.service}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-[#00ff88] font-semibold">{invoice.amount}</div>
                          <div className="text-[#C0C5CE]/70 text-sm">{invoice.date}</div>
                        </div>
                        
                        <Badge variant="secondary" className="bg-[#00ff88]/20 text-[#00ff88] font-mono text-xs">
                          {invoice.status}
                        </Badge>
                        
                        <Button size="sm" variant="outline" className="border-[#C0C5CE]/20 text-[#C0C5CE] font-mono">
                          <Download className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <Card className="bg-[#12151C] border-[#C0C5CE]/20 p-6">
              <h3 className="text-[#00ff88] text-lg font-semibold mb-6">Available Services</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {availableServices.map((service, index) => (
                  <div key={index} className={`bg-[#0B0D12] border rounded-lg p-6 relative ${
                    service.popular ? 'border-[#00ff88]/50' : 'border-[#C0C5CE]/20'
                  }`}>
                    {service.popular && (
                      <div className="absolute -top-2 left-4">
                        <Badge variant="secondary" className="bg-[#00ff88] text-[#0a0a0a] font-mono text-xs">
                          Most Popular
                        </Badge>
                      </div>
                    )}
                    
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-[#C0C5CE] font-semibold text-lg mb-1">{service.name}</h4>
                        <p className="text-[#C0C5CE]/70 text-sm">{service.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-[#00d4ff]">{service.price}</div>
                        <div className="text-[#C0C5CE]/70 text-xs">{service.period}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-[#00ff88]" />
                        <span className="text-[#C0C5CE] text-sm">Delivery: {service.deliveryTime}</span>
                      </div>
                    </div>
                    
                    <Button 
                      className={`w-full font-mono ${
                        service.popular 
                          ? 'bg-[#00ff88] text-[#0a0a0a] hover:bg-[#00ff88]/90' 
                          : 'bg-[#00d4ff] text-[#0a0a0a] hover:bg-[#00d4ff]/90'
                      }`}
                    >
                      Order Now
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="payment" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-[#12151C] border-[#C0C5CE]/20 p-6">
                <h3 className="text-[#00ff88] text-lg font-semibold mb-6">Payment Methods</h3>
                
                <div className="space-y-4">
                  <div className="bg-[#0B0D12] border border-[#C0C5CE]/20 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <CreditCard className="w-5 h-5 text-[#00d4ff]" />
                        <div>
                          <h4 className="text-[#C0C5CE] font-semibold">•••• •••• •••• 4242</h4>
                          <p className="text-[#C0C5CE]/70 text-sm">Expires 12/2025</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-[#00ff88]/20 text-[#00ff88] font-mono text-xs">
                        Primary
                      </Badge>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full border-[#C0C5CE]/20 text-[#C0C5CE] font-mono">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Payment Method
                  </Button>
                </div>
              </Card>

              <Card className="bg-[#12151C] border-[#C0C5CE]/20 p-6">
                <h3 className="text-[#00ff88] text-lg font-semibold mb-6">Billing Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-[#C0C5CE]/70 text-sm">Company Name</label>
                    <p className="text-[#C0C5CE] font-semibold">NeoTechnology Solutions</p>
                  </div>
                  
                  <div>
                    <label className="text-[#C0C5CE]/70 text-sm">Billing Address</label>
                    <p className="text-[#C0C5CE]">123 Business Ave<br />Suite 100<br />Tech City, TC 12345</p>
                  </div>
                  
                  <div>
                    <label className="text-[#C0C5CE]/70 text-sm">Tax ID</label>
                    <p className="text-[#C0C5CE] font-semibold">123-456-789</p>
                  </div>
                  
                  <Button variant="outline" className="w-full border-[#C0C5CE]/20 text-[#C0C5CE] font-mono">
                    <Settings className="w-4 h-4 mr-2" />
                    Update Information
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default BillingDashboard;