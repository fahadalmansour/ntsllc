import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { 
  CreditCard, 
  DollarSign, 
  Calendar, 
  Download, 
  Receipt, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Settings,
  Star,
  Crown,
  Zap,
  Shield,
  Users,
  BarChart3,
  Globe,
  Package,
  ArrowRight,
  Plus,
  Minus,
  RefreshCw,
  Eye,
  Edit,
  Trash2,
  Bell,
  Mail,
  Phone,
  Lock,
  Unlock,
  Award
} from 'lucide-react';

interface Subscription {
  id: string;
  plan: string;
  status: 'active' | 'cancelled' | 'past_due' | 'trialing';
  nextBilling: string;
  amount: number;
  currency: string;
  features: string[];
  usage: {
    stores: { current: number; limit: number };
    users: { current: number; limit: number };
    apiCalls: { current: number; limit: number };
    storage: { current: number; limit: number };
  };
}

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  description: string;
  downloadUrl: string;
}

interface PaymentMethod {
  id: string;
  type: 'card' | 'bank' | 'paypal';
  last4: string;
  brand: string;
  expiryDate: string;
  isDefault: boolean;
}

const BillingDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [subscription] = useState<Subscription>({
    id: 'sub_1234567890',
    plan: 'Professional',
    status: 'active',
    nextBilling: '2024-02-28',
    amount: 89,
    currency: 'USD',
    features: [
      'Up to 10 stores',
      'Advanced AI optimization',
      'Custom templates',
      'Priority support',
      'Advanced analytics',
      'A/B testing'
    ],
    usage: {
      stores: { current: 7, limit: 10 },
      users: { current: 12, limit: 25 },
      apiCalls: { current: 8450, limit: 10000 },
      storage: { current: 2.3, limit: 5 }
    }
  });

  const [invoices] = useState<Invoice[]>([
    {
      id: 'inv_001',
      date: '2024-01-28',
      amount: 89,
      status: 'paid',
      description: 'Professional Plan - Monthly',
      downloadUrl: '/invoices/inv_001.pdf'
    },
    {
      id: 'inv_002',
      date: '2023-12-28',
      amount: 89,
      status: 'paid',
      description: 'Professional Plan - Monthly',
      downloadUrl: '/invoices/inv_002.pdf'
    },
    {
      id: 'inv_003',
      date: '2023-11-28',
      amount: 89,
      status: 'paid',
      description: 'Professional Plan - Monthly',
      downloadUrl: '/invoices/inv_003.pdf'
    },
    {
      id: 'inv_004',
      date: '2023-10-28',
      amount: 29,
      status: 'paid',
      description: 'Starter Plan - Monthly',
      downloadUrl: '/invoices/inv_004.pdf'
    }
  ]);

  const [paymentMethods] = useState<PaymentMethod[]>([
    {
      id: 'card_1',
      type: 'card',
      last4: '4242',
      brand: 'Visa',
      expiryDate: '12/26',
      isDefault: true
    },
    {
      id: 'card_2',
      type: 'card',
      last4: '5555',
      brand: 'Mastercard',
      expiryDate: '08/25',
      isDefault: false
    }
  ]);

  const [plans] = useState([
    {
      name: 'Starter',
      price: 29,
      features: ['Up to 3 stores', 'Basic analytics', 'Email support'],
      current: false
    },
    {
      name: 'Professional',
      price: 89,
      features: ['Up to 10 stores', 'Advanced AI', 'Priority support'],
      current: true
    },
    {
      name: 'Enterprise',
      price: 299,
      features: ['Unlimited stores', 'White-label', 'Dedicated support'],
      current: false
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-[#4AE54A] border-[#4AE54A]';
      case 'trialing': return 'text-blue-400 border-blue-400';
      case 'past_due': return 'text-orange-400 border-orange-400';
      case 'cancelled': return 'text-red-400 border-red-400';
      default: return 'text-[#C0C5CE] border-[#C0C5CE]/50';
    }
  };

  const getUsagePercentage = (current: number, limit: number) => {
    return Math.min((current / limit) * 100, 100);
  };

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return 'text-red-400';
    if (percentage >= 75) return 'text-orange-400';
    if (percentage >= 50) return 'text-yellow-400';
    return 'text-[#4AE54A]';
  };

  const handleUpgrade = async (planName: string) => {
    setIsUpgrading(true);
    // Simulate upgrade process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsUpgrading(false);
  };

  const UsageCard = ({ title, current, limit, unit }: { 
    title: string; 
    current: number; 
    limit: number; 
    unit: string; 
  }) => {
    const percentage = getUsagePercentage(current, limit);
    const color = getUsageColor(percentage);
    
    return (
      <Card className="bg-[#12151C] border-[#4AE54A]/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-[#C0C5CE] font-mono font-medium">{title}</h4>
            <Badge variant="outline" className={`font-mono text-xs ${color} border-current`}>
              {percentage.toFixed(0)}%
            </Badge>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-mono">
              <span className="text-[#C0C5CE]/70">Used</span>
              <span className={color}>
                {typeof current === 'number' && current < 10 ? current.toFixed(1) : Math.floor(current)} / {limit} {unit}
              </span>
            </div>
            <Progress value={percentage} className="h-2" />
          </div>
          {percentage > 80 && (
            <Alert className="mt-4 border-orange-400/20 bg-orange-400/10">
              <AlertTriangle className="h-4 w-4 text-orange-400" />
              <AlertDescription className="text-orange-400 font-mono text-sm">
                {percentage > 95 ? 'Limit almost reached' : 'Consider upgrading soon'}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    );
  };

  const InvoiceRow = ({ invoice }: { invoice: Invoice }) => (
    <div className="flex items-center justify-between p-4 border border-[#4AE54A]/20 rounded-lg bg-[#0B0D12]/50">
      <div className="flex items-center space-x-4">
        <div className="p-2 bg-[#4AE54A]/10 rounded">
          <Receipt className="w-4 h-4 text-[#4AE54A]" />
        </div>
        <div>
          <div className="text-[#C0C5CE] font-mono font-medium text-sm">{invoice.description}</div>
          <div className="text-[#C0C5CE]/60 font-mono text-xs">{invoice.date}</div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <div className="text-[#4AE54A] font-mono font-medium">${invoice.amount}</div>
          <Badge variant="outline" className={`font-mono text-xs ${
            invoice.status === 'paid' ? 'border-[#4AE54A] text-[#4AE54A]' :
            invoice.status === 'pending' ? 'border-yellow-400 text-yellow-400' :
            'border-red-400 text-red-400'
          }`}>
            {invoice.status.toUpperCase()}
          </Badge>
        </div>
        <Button size="sm" variant="outline" className="font-mono">
          <Download className="w-3 h-3 mr-1" />
          PDF
        </Button>
      </div>
    </div>
  );

  const PaymentMethodCard = ({ method }: { method: PaymentMethod }) => (
    <Card className="bg-[#12151C] border-[#4AE54A]/20">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#4AE54A]/10 rounded">
              <CreditCard className="w-4 h-4 text-[#4AE54A]" />
            </div>
            <div>
              <div className="text-[#C0C5CE] font-mono font-medium text-sm">
                {method.brand} •••• {method.last4}
              </div>
              <div className="text-[#C0C5CE]/60 font-mono text-xs">
                Expires {method.expiryDate}
              </div>
            </div>
          </div>
          {method.isDefault && (
            <Badge variant="outline" className="border-[#4AE54A] text-[#4AE54A] font-mono text-xs">
              Default
            </Badge>
          )}
        </div>
        <div className="flex space-x-2">
          <Button size="sm" variant="outline" className="font-mono">
            <Edit className="w-3 h-3 mr-1" />
            Edit
          </Button>
          {!method.isDefault && (
            <Button size="sm" variant="outline" className="font-mono">
              <Trash2 className="w-3 h-3 mr-1" />
              Remove
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-[#0B0D12] terminal-theme p-6">
      <div className="max-w-[1400px] mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-mono text-[#4AE54A] mb-2 flex items-center">
              <CreditCard className="w-8 h-8 mr-3" />
              Billing & Subscription
            </h1>
            <p className="text-[#C0C5CE]/70 font-mono">Manage your subscription, usage, and billing information</p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className={`font-mono neural-pulse ${getStatusColor(subscription.status)}`}>
              {subscription.plan} - {subscription.status.toUpperCase()}
            </Badge>
          </div>
        </div>

        {/* Current Plan Overview */}
        <Card className="bg-[#12151C] border-[#4AE54A]/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-[#4AE54A] font-mono flex items-center">
                  <Crown className="w-5 h-5 mr-2" />
                  Current Plan: {subscription.plan}
                </CardTitle>
                <CardDescription className="text-[#C0C5CE]/70 font-mono">
                  Next billing: {subscription.nextBilling} • ${subscription.amount}/month
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" className="border-[#4AE54A] text-[#4AE54A] hover:bg-[#4AE54A]/10 font-mono">
                  <Settings className="w-4 h-4 mr-2" />
                  Manage Plan
                </Button>
                <Button className="bg-[#4AE54A] text-[#0B0D12] hover:bg-[#4AE54A]/90 font-mono">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Upgrade
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-[#C0C5CE] font-mono font-medium mb-3">Plan Features</h4>
                <div className="space-y-2">
                  {subscription.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-[#4AE54A]" />
                      <span className="text-[#C0C5CE]/80 font-mono text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-[#C0C5CE] font-mono font-medium mb-3">Billing Information</h4>
                <div className="space-y-2 text-[#C0C5CE]/70 font-mono text-sm">
                  <div className="flex justify-between">
                    <span>Plan Amount:</span>
                    <span className="text-[#4AE54A]">${subscription.amount}/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Next Billing:</span>
                    <span>{subscription.nextBilling}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <Badge variant="outline" className={`font-mono text-xs ${getStatusColor(subscription.status)}`}>
                      {subscription.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-[#12151C] border border-[#4AE54A]/20">
            <TabsTrigger value="overview" className="font-mono">Usage Overview</TabsTrigger>
            <TabsTrigger value="invoices" className="font-mono">Invoices</TabsTrigger>
            <TabsTrigger value="payment" className="font-mono">Payment Methods</TabsTrigger>
            <TabsTrigger value="plans" className="font-mono">Change Plan</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Usage Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <UsageCard
                title="Stores"
                current={subscription.usage.stores.current}
                limit={subscription.usage.stores.limit}
                unit="stores"
              />
              <UsageCard
                title="Team Members"
                current={subscription.usage.users.current}
                limit={subscription.usage.users.limit}
                unit="users"
              />
              <UsageCard
                title="API Calls"
                current={subscription.usage.apiCalls.current}
                limit={subscription.usage.apiCalls.limit}
                unit="calls"
              />
              <UsageCard
                title="Storage"
                current={subscription.usage.storage.current}
                limit={subscription.usage.storage.limit}
                unit="GB"
              />
            </div>

            {/* Usage Alerts */}
            <Card className="bg-[#12151C] border-[#4AE54A]/20">
              <CardHeader>
                <CardTitle className="text-[#4AE54A] font-mono">Usage Alerts</CardTitle>
                <CardDescription className="text-[#C0C5CE]/70 font-mono">
                  Monitor your usage and get notified when approaching limits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert className="border-orange-400/20 bg-orange-400/10">
                    <AlertTriangle className="h-4 w-4 text-orange-400" />
                    <AlertTitle className="text-orange-400 font-mono">API Usage Warning</AlertTitle>
                    <AlertDescription className="text-[#C0C5CE]/70 font-mono">
                      You've used 84.5% of your monthly API calls. Consider upgrading to avoid service interruption.
                    </AlertDescription>
                  </Alert>
                  <Alert className="border-blue-400/20 bg-blue-400/10">
                    <Bell className="h-4 w-4 text-blue-400" />
                    <AlertTitle className="text-blue-400 font-mono">Storage Optimization</AlertTitle>
                    <AlertDescription className="text-[#C0C5CE]/70 font-mono">
                      Enable automatic image compression to reduce storage usage by up to 60%.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="invoices" className="space-y-6">
            <Card className="bg-[#12151C] border-[#4AE54A]/20">
              <CardHeader>
                <CardTitle className="text-[#4AE54A] font-mono">Invoice History</CardTitle>
                <CardDescription className="text-[#C0C5CE]/70 font-mono">
                  Download and manage your billing invoices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {invoices.map((invoice) => (
                    <InvoiceRow key={invoice.id} invoice={invoice} />
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Button variant="outline" className="border-[#4AE54A] text-[#4AE54A] hover:bg-[#4AE54A]/10 font-mono">
                    Load More Invoices
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payment" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-[#12151C] border-[#4AE54A]/20">
                <CardHeader>
                  <CardTitle className="text-[#4AE54A] font-mono">Payment Methods</CardTitle>
                  <CardDescription className="text-[#C0C5CE]/70 font-mono">
                    Manage your payment methods and billing preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {paymentMethods.map((method) => (
                    <PaymentMethodCard key={method.id} method={method} />
                  ))}
                  <Button className="w-full bg-[#4AE54A] text-[#0B0D12] hover:bg-[#4AE54A]/90 font-mono">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Payment Method
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-[#12151C] border-[#4AE54A]/20">
                <CardHeader>
                  <CardTitle className="text-[#4AE54A] font-mono">Billing Settings</CardTitle>
                  <CardDescription className="text-[#C0C5CE]/70 font-mono">
                    Configure billing preferences and notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border border-[#4AE54A]/20 rounded">
                      <div>
                        <div className="text-[#C0C5CE] font-mono font-medium text-sm">Email Invoices</div>
                        <div className="text-[#C0C5CE]/60 font-mono text-xs">Receive invoices via email</div>
                      </div>
                      <Badge variant="outline" className="border-[#4AE54A] text-[#4AE54A] font-mono text-xs">
                        Enabled
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-[#4AE54A]/20 rounded">
                      <div>
                        <div className="text-[#C0C5CE] font-mono font-medium text-sm">Usage Alerts</div>
                        <div className="text-[#C0C5CE]/60 font-mono text-xs">Get notified when approaching limits</div>
                      </div>
                      <Badge variant="outline" className="border-[#4AE54A] text-[#4AE54A] font-mono text-xs">
                        Enabled
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-[#4AE54A]/20 rounded">
                      <div>
                        <div className="text-[#C0C5CE] font-mono font-medium text-sm">Auto-renewal</div>
                        <div className="text-[#C0C5CE]/60 font-mono text-xs">Automatically renew subscription</div>
                      </div>
                      <Badge variant="outline" className="border-[#4AE54A] text-[#4AE54A] font-mono text-xs">
                        Enabled
                      </Badge>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full border-[#4AE54A] text-[#4AE54A] hover:bg-[#4AE54A]/10 font-mono">
                    Update Settings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="plans" className="space-y-6">
            <Card className="bg-[#12151C] border-[#4AE54A]/20">
              <CardHeader>
                <CardTitle className="text-[#4AE54A] font-mono">Change Plan</CardTitle>
                <CardDescription className="text-[#C0C5CE]/70 font-mono">
                  Upgrade or downgrade your subscription plan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {plans.map((plan) => (
                    <Card key={plan.name} className={`relative ${
                      plan.current 
                        ? 'border-[#4AE54A] bg-[#4AE54A]/5 ring-2 ring-[#4AE54A]/20' 
                        : 'border-[#4AE54A]/20'
                    }`}>
                      {plan.current && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <Badge className="bg-[#4AE54A] text-[#0B0D12] font-mono">Current Plan</Badge>
                        </div>
                      )}
                      <CardHeader className="text-center">
                        <CardTitle className="text-[#C0C5CE] font-mono">{plan.name}</CardTitle>
                        <div className="text-3xl text-[#4AE54A] font-mono font-medium">
                          ${plan.price}<span className="text-sm text-[#C0C5CE]/60">/month</span>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          {plan.features.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-[#4AE54A]" />
                              <span className="text-[#C0C5CE]/80 font-mono text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                        <Button 
                          className={`w-full font-mono ${
                            plan.current
                              ? 'bg-[#C0C5CE]/20 text-[#C0C5CE] cursor-not-allowed' 
                              : 'bg-[#4AE54A] text-[#0B0D12] hover:bg-[#4AE54A]/90'
                          }`}
                          disabled={plan.current || isUpgrading}
                          onClick={() => handleUpgrade(plan.name)}
                        >
                          {isUpgrading ? (
                            <>
                              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                              Processing...
                            </>
                          ) : plan.current ? (
                            'Current Plan'
                          ) : (
                            <>
                              <ArrowRight className="w-4 h-4 mr-2" />
                              {plan.price > 89 ? 'Upgrade' : 'Downgrade'}
                            </>
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BillingDashboard;