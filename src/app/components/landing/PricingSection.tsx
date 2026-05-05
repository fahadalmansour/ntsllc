import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  Check, 
  Star, 
  Zap, 
  Clock, 
  ShoppingCart,
  Workflow,
  Database,
  Search,
  DollarSign,
  ArrowRight,
  Shield,
  Crown
} from 'lucide-react';

interface PricingSectionProps {
  onNavigate?: (section: string) => void;
  className?: string;
}

export function PricingSection({ onNavigate, className = '' }: PricingSectionProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState('complete');

  const setupPlans = [
    {
      id: 'basic-setup',
      name: 'Basic Store Setup',
      subtitle: 'Perfect for getting started',
      price: 1299,
      originalPrice: 2999,
      currency: 'USD',
      delivery: '90 minutes',
      icon: ShoppingCart,
      popular: false,
      features: [
        'Platform setup (Shopify/WooCommerce)',
        'Payment gateway integration',
        'Mobile-responsive design',
        'Basic SEO optimization',
        'SSL certificate',
        'Product catalog (up to 50 items)',
        'Order management system',
        '30-day support'
      ],
      color: '#00d4ff'
    },
    {
      id: 'premium-setup',
      name: 'Premium Store Setup',
      subtitle: 'Most popular choice',
      price: 1899,
      originalPrice: 4999,
      currency: 'USD',
      delivery: '90 minutes',
      icon: Star,
      popular: true,
      features: [
        'Everything in Basic',
        'Advanced SEO optimization',
        'Custom design elements',
        'Product catalog (unlimited)',
        'Email marketing setup',
        'Analytics & tracking',
        'Social media integration',
        '90-day support'
      ],
      color: '#00ff88'
    },
    {
      id: 'enterprise-setup',
      name: 'Enterprise Setup',
      subtitle: 'For serious businesses',
      price: 3999,
      originalPrice: 9999,
      currency: 'USD',
      delivery: '90 minutes',
      icon: Crown,
      popular: false,
      features: [
        'Everything in Premium',
        'Multi-platform setup',
        'Advanced integrations',
        'Custom automations',
        'Priority support',
        'Performance optimization',
        'Security hardening',
        '1-year support'
      ],
      color: '#ffd93d'
    }
  ];

  const saasPlans = [
    {
      id: 'automation',
      name: 'N8N Automation',
      subtitle: 'Workflow automation',
      monthlyPrice: 29,
      annualPrice: 290,
      features: [
        '50+ workflow templates',
        'Email automation',
        'CRM integrations',
        'Social media posting',
        'Data synchronization',
        'Custom triggers',
        'Analytics reporting',
        'Community support'
      ],
      icon: Workflow,
      color: '#00ff88'
    },
    {
      id: 'neosync',
      name: 'NeoSync Pro',
      subtitle: 'Notion integration',
      monthlyPrice: 99,
      annualPrice: 990,
      features: [
        'Real-time Notion sync',
        'Custom field mapping',
        'Multi-platform support',
        'Automated backups',
        'Team collaboration',
        'Version control',
        'API access',
        'Priority support'
      ],
      icon: Database,
      color: '#ffd93d'
    },
    {
      id: 'brand-checker',
      name: 'Brand Guardian',
      subtitle: 'Brand monitoring',
      monthlyPrice: 49,
      annualPrice: 490,
      features: [
        '127 platforms monitored',
        'AI-powered detection',
        'Real-time alerts',
        'Competitor analysis',
        'DMCA assistance',
        'Monthly reports',
        'Team notifications',
        'Legal resources'
      ],
      icon: Search,
      color: '#ff6b6b'
    }
  ];

  const bundleOffer = {
    name: 'Complete Business Package',
    description: 'Store setup + All SaaS tools for 1 year',
    setupPrice: 1899,
    saasValue: 2124,
    bundlePrice: 2499,
    savings: 1524,
    features: [
      'Premium Store Setup (90 minutes)',
      'N8N Automation (1 year)',
      'NeoSync Pro (1 year)',
      'Brand Guardian (1 year)',
      'Priority support',
      'Quarterly strategy calls',
      'Performance optimization',
      'Growth consulting'
    ]
  };

  const calculateAnnualSavings = (monthly: number, annual: number) => {
    return (monthly * 12) - annual;
  };

  return (
    <section className={`py-20 bg-[#0a0a0a] ${className}`} id="pricing">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-[#00d4ff]/20 text-[#00d4ff] border-[#00d4ff]/30 px-4 py-2 font-mono mb-6">
            Transparent Pricing
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Simple, Honest
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#00ff88]">
              {' '}Pricing
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            No hidden fees, no surprises. Choose the plan that fits your business 
            and start selling in 90 minutes.
          </p>
        </div>

        {/* Store Setup Plans */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-[#C0C5CE] mb-4">Store Setup Plans</h3>
            <p className="text-gray-300">One-time payment, 90-minute delivery, lifetime ownership</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {setupPlans.map((plan) => {
              const IconComponent = plan.icon;
              return (
                <Card 
                  key={plan.id}
                  className={`relative p-8 transition-all duration-300 ${
                    plan.popular 
                      ? 'bg-[#1a1a1a] border-[#00ff88] shadow-lg shadow-[#00ff88]/20 scale-105' 
                      : 'bg-[#1a1a1a] border-gray-800 hover:border-[#00d4ff]/50'
                  }`}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-[#00ff88] text-black px-4 py-1 font-bold">
                        MOST POPULAR
                      </Badge>
                    </div>
                  )}

                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: `${plan.color}20` }}
                    >
                      <IconComponent 
                        className="w-8 h-8" 
                        style={{ color: plan.color }} 
                      />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">{plan.name}</h4>
                    <p className="text-gray-400 text-sm">{plan.subtitle}</p>
                  </div>

                  {/* Pricing */}
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <span className="text-4xl font-bold text-[#C0C5CE]">${plan.price.toLocaleString()}</span>
                      <span className="text-lg text-gray-500 line-through">${plan.originalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-sm">
                      <Clock className="w-4 h-4 text-[#00ff88]" />
                      <span className="text-[#00ff88] font-mono">{plan.delivery}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <Check className="w-4 h-4 text-[#00ff88] flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Button 
                    onClick={() => onNavigate?.('auth')}
                    className={`w-full font-bold transition-all ${
                      plan.popular
                        ? 'bg-[#00ff88] text-black hover:bg-[#00d4ff]'
                        : 'bg-[#00d4ff] text-black hover:bg-[#00ff88]'
                    }`}
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>

        {/* SaaS Subscription Plans */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-[#C0C5CE] mb-4">SaaS Subscriptions</h3>
            <p className="text-gray-300 mb-6">Ongoing tools to scale your business</p>
            
            {/* Billing Toggle */}
            <div className="inline-flex bg-[#1a1a1a] border border-[#00d4ff]/30 rounded-lg p-1">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 rounded-md font-mono text-sm transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-[#00d4ff] text-black'
                    : 'text-gray-400 hover:text-[#C0C5CE]'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-4 py-2 rounded-md font-mono text-sm transition-all ${
                  billingCycle === 'annual'
                    ? 'bg-[#00d4ff] text-black'
                    : 'text-gray-400 hover:text-[#C0C5CE]'
                }`}
              >
                Annual (Save 20%)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {saasPlans.map((plan) => {
              const IconComponent = plan.icon;
              const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice;
              const savings = calculateAnnualSavings(plan.monthlyPrice, plan.annualPrice);
              
              return (
                <Card 
                  key={plan.id}
                  className="bg-[#1a1a1a] border border-gray-800 hover:border-[#00d4ff]/50 p-8 transition-all duration-300"
                >
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: `${plan.color}20` }}
                    >
                      <IconComponent 
                        className="w-8 h-8" 
                        style={{ color: plan.color }} 
                      />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">{plan.name}</h4>
                    <p className="text-gray-400 text-sm">{plan.subtitle}</p>
                  </div>

                  {/* Pricing */}
                  <div className="text-center mb-8">
                    <div className="text-4xl font-bold text-[#C0C5CE] mb-2">
                      ${price}
                      <span className="text-lg text-gray-400 font-normal">
                        /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                      </span>
                    </div>
                    {billingCycle === 'annual' && (
                      <Badge className="bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]/30 px-2 py-1 text-xs">
                        Save ${savings}/year
                      </Badge>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <Check className="w-4 h-4 text-[#00ff88] flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Button 
                    onClick={() => onNavigate?.('auth')}
                    variant="outline"
                    className="w-full border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff]/10 font-bold"
                  >
                    Start Free Trial
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Bundle Offer */}
        <Card className="bg-gradient-to-r from-[#00d4ff]/10 to-[#00ff88]/10 border border-[#00d4ff]/30 p-8 text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Crown className="w-8 h-8 text-[#ffd93d] mr-3" />
            <h3 className="text-3xl font-bold text-[#C0C5CE]">{bundleOffer.name}</h3>
            <Crown className="w-8 h-8 text-[#ffd93d] ml-3" />
          </div>
          
          <p className="text-gray-300 mb-8 text-lg">{bundleOffer.description}</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-bold text-[#C0C5CE] mb-4">What's Included:</h4>
              <div className="space-y-2 text-left">
                {bundleOffer.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check className="w-4 h-4 text-[#00ff88] flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <div className="bg-[#1a1a1a] rounded-lg p-6">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-gray-300">
                    <span>Store Setup:</span>
                    <span>${bundleOffer.setupPrice}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>SaaS Tools (1 year):</span>
                    <span>${bundleOffer.saasValue}</span>
                  </div>
                  <div className="border-t border-gray-600 pt-2">
                    <div className="flex justify-between text-gray-500 line-through">
                      <span>Regular Price:</span>
                      <span>${bundleOffer.setupPrice + bundleOffer.saasValue}</span>
                    </div>
                    <div className="flex justify-between text-[#00ff88] text-xl font-bold">
                      <span>Bundle Price:</span>
                      <span>${bundleOffer.bundlePrice}</span>
                    </div>
                    <div className="text-center mt-2">
                      <Badge className="bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]/30 px-3 py-1">
                        Save ${bundleOffer.savings}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <Button 
            onClick={() => onNavigate?.('auth')}
            className="bg-gradient-to-r from-[#00d4ff] to-[#00ff88] text-black hover:scale-105 transition-transform font-bold px-12 py-4 text-xl"
          >
            <Zap className="w-6 h-6 mr-2" />
            Get Complete Package
          </Button>
        </Card>

        {/* Money Back Guarantee */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-[#00ff88]/10 px-6 py-3 rounded-full border border-[#00ff88]/30 mb-6">
            <Shield className="w-4 h-4 text-[#00ff88]" />
            <span className="text-[#00ff88] font-mono">30-Day Money-Back Guarantee</span>
          </div>
          
          <p className="text-gray-300 max-w-2xl mx-auto">
            Not satisfied with your store? Get a full refund within 30 days, no questions asked. 
            We're that confident in our 90-minute setup process.
          </p>
        </div>
      </div>
    </section>
  );
}

export default PricingSection;