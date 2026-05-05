import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { 
  Store, 
  Zap, 
  Code, 
  Brain, 
  Shield, 
  TrendingUp, 
  Globe, 
  Smartphone,
  Users,
  Star,
  CheckCircle,
  ArrowRight,
  Play,
  Sparkles,
  Award,
  Target,
  BarChart3,
  Rocket,
  Heart,
  Clock,
  DollarSign,
  MonitorSpeaker,
  Palette,
  Search,
  Lock,
  RefreshCw,
  Settings,
  Cloud,
  Database,
  Layers,
  Cpu,
  Wifi,
  Eye,
  MessageSquare,
  Mail,
  Phone,
  ArrowUp
} from 'lucide-react';

interface Feature {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  category: string;
}

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  cta: string;
}

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  platform: string;
}

const SaaSLanding = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [stats, setStats] = useState({
    stores: 12000,
    revenue: 45000000,
    users: 8500,
    uptime: 99.9
  });

  const features: Feature[] = [
    {
      icon: Store,
      title: 'Store Builder Studio',
      description: 'Create professional e-commerce stores in minutes with AI-powered templates',
      category: 'Builder'
    },
    {
      icon: Code,
      title: 'Code Analyzer & Fixer',
      description: 'Intelligent code analysis and optimization for WordPress, Shopify, and more',
      category: 'Analysis'
    },
    {
      icon: Brain,
      title: 'AI-Powered Optimization',
      description: 'Machine learning algorithms optimize your store for maximum conversions',
      category: 'AI'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Real-time insights and performance tracking across all platforms',
      category: 'Analytics'
    },
    {
      icon: Shield,
      title: 'Security & Compliance',
      description: 'Enterprise-grade security with GDPR, SOC2, and ISO27001 compliance',
      category: 'Security'
    },
    {
      icon: Globe,
      title: 'Multi-Platform Support',
      description: 'Works seamlessly with Shopify, WordPress, Wix, and custom platforms',
      category: 'Integration'
    }
  ];

  const platforms = [
    { name: 'Shopify', icon: Store, users: '2.1M+', integration: 'Native' },
    { name: 'WordPress', icon: Globe, users: '1.8M+', integration: 'Plugin' },
    { name: 'Wix', icon: Palette, users: '850K+', integration: 'App' },
    { name: 'Custom', icon: Code, users: '320K+', integration: 'API' }
  ];

  const pricingPlans: PricingPlan[] = [
    {
      name: 'Starter',
      price: '$29',
      period: '/month',
      description: 'Perfect for small businesses and startups',
      features: [
        'Up to 3 stores',
        'Basic code analysis',
        'Store templates',
        'Email support',
        'Basic analytics',
        'SSL certificates'
      ],
      cta: 'Start Free Trial'
    },
    {
      name: 'Professional',
      price: '$89',
      period: '/month',
      description: 'Ideal for growing e-commerce businesses',
      features: [
        'Up to 10 stores',
        'Advanced AI optimization',
        'Custom templates',
        'Priority support',
        'Advanced analytics',
        'A/B testing',
        'Multi-platform sync',
        'Performance monitoring'
      ],
      popular: true,
      cta: 'Start Free Trial'
    },
    {
      name: 'Enterprise',
      price: '$299',
      period: '/month',
      description: 'For large businesses and agencies',
      features: [
        'Unlimited stores',
        'White-label solution',
        'Custom AI models',
        '24/7 phone support',
        'Custom analytics',
        'API access',
        'Team management',
        'Dedicated account manager',
        'SLA guarantee'
      ],
      cta: 'Contact Sales'
    }
  ];

  const testimonials: Testimonial[] = [
    {
      name: 'Sarah Chen',
      role: 'E-commerce Director',
      company: 'TechVibe',
      content: 'NeoTechnology transformed our Shopify store performance. We saw 67% increase in conversions within the first month.',
      rating: 5,
      platform: 'Shopify'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Founder',
      company: 'GreenEats',
      content: 'The AI code analysis caught issues we never knew existed. Our WordPress site now loads 3x faster.',
      rating: 5,
      platform: 'WordPress'
    },
    {
      name: 'Emily Foster',
      role: 'CTO',
      company: 'StyleHub',
      content: 'Best investment we made. The platform saved us 6 months of development time and $50K in costs.',
      rating: 5,
      platform: 'Custom'
    },
    {
      name: 'David Kim',
      role: 'Marketing Manager',
      company: 'FitGear Pro',
      content: 'The analytics dashboard gives us insights we never had before. ROI increased by 145%.',
      rating: 5,
      platform: 'Wix'
    }
  ];

  // Animate stats
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        stores: prev.stores + Math.floor(Math.random() * 3),
        revenue: prev.revenue + Math.floor(Math.random() * 1000),
        users: prev.users + Math.floor(Math.random() * 2)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const FeatureCard = ({ feature, index }: { feature: Feature; index: number }) => {
    const IconComponent = feature.icon;
    const isActive = currentFeature === index;
    
    return (
      <Card 
        className={`cursor-pointer transition-all duration-300 ${
          isActive 
            ? 'border-[#4AE54A] bg-[#4AE54A]/5 ring-2 ring-[#4AE54A]/20' 
            : 'border-[#4AE54A]/20 hover:border-[#4AE54A]/40'
        } bg-[#12151C] card-hover-glow`}
        onClick={() => setCurrentFeature(index)}
      >
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-[#4AE54A]/10 rounded-lg">
              <IconComponent className="w-6 h-6 text-[#4AE54A]" />
            </div>
            <div className="flex-1">
              <Badge variant="outline" className="border-[#4AE54A]/30 text-[#4AE54A]/70 font-mono text-xs mb-2">
                {feature.category}
              </Badge>
              <h3 className="text-[#C0C5CE] font-mono font-medium mb-2">{feature.title}</h3>
              <p className="text-[#C0C5CE]/70 font-mono text-sm">{feature.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const PricingCard = ({ plan }: { plan: PricingPlan }) => (
    <Card className={`relative ${
      plan.popular 
        ? 'border-[#4AE54A] bg-[#4AE54A]/5 ring-2 ring-[#4AE54A]/20' 
        : 'border-[#4AE54A]/20'
    } bg-[#12151C]`}>
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-[#4AE54A] text-[#0B0D12] font-mono">Most Popular</Badge>
        </div>
      )}
      <CardHeader className="text-center">
        <CardTitle className="text-[#C0C5CE] font-mono">{plan.name}</CardTitle>
        <div className="flex items-baseline justify-center space-x-1">
          <span className="text-3xl text-[#4AE54A] font-mono font-medium">{plan.price}</span>
          <span className="text-[#C0C5CE]/60 font-mono text-sm">{plan.period}</span>
        </div>
        <CardDescription className="text-[#C0C5CE]/70 font-mono">
          {plan.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3">
              <CheckCircle className="w-4 h-4 text-[#4AE54A]" />
              <span className="text-[#C0C5CE]/80 font-mono text-sm">{feature}</span>
            </div>
          ))}
        </div>
        <Button 
          className={`w-full font-mono ${
            plan.popular 
              ? 'bg-[#4AE54A] text-[#0B0D12] hover:bg-[#4AE54A]/90' 
              : 'border-[#4AE54A] text-[#4AE54A] hover:bg-[#4AE54A]/10'
          }`}
          variant={plan.popular ? 'default' : 'outline'}
        >
          {plan.cta}
        </Button>
      </CardContent>
    </Card>
  );

  const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
    <Card className="bg-[#12151C] border-[#4AE54A]/20">
      <CardContent className="p-6">
        <div className="flex items-center space-x-1 mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
          ))}
        </div>
        <p className="text-[#C0C5CE] font-mono text-sm mb-4 italic">
          "{testimonial.content}"
        </p>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[#C0C5CE] font-mono font-medium text-sm">{testimonial.name}</div>
            <div className="text-[#C0C5CE]/60 font-mono text-xs">{testimonial.role}, {testimonial.company}</div>
          </div>
          <Badge variant="outline" className="border-[#4AE54A]/30 text-[#4AE54A]/70 font-mono text-xs">
            {testimonial.platform}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-[#0B0D12] terminal-theme">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6">
        <div className="absolute inset-0 enterprise-grid opacity-30"></div>
        <div className="max-w-6xl mx-auto text-center relative">
          <Badge variant="outline" className="border-[#4AE54A] text-[#4AE54A] font-mono mb-6 neural-pulse">
            🚀 AI-Powered E-commerce Platform
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-mono font-medium text-[#C0C5CE] mb-6 glow-text">
            Build, Optimize & Scale Your
            <span className="text-[#4AE54A] block">E-commerce Empire</span>
          </h1>
          
          <p className="text-xl text-[#C0C5CE]/80 font-mono mb-8 max-w-3xl mx-auto">
            The only platform you need to create professional stores, fix code issues, 
            and maximize conversions across Shopify, WordPress, Wix, and custom platforms.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
            <Button size="lg" className="bg-[#4AE54A] text-[#0B0D12] hover:bg-[#4AE54A]/90 font-mono px-8 py-3">
              <Rocket className="w-5 h-5 mr-2" />
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="border-[#4AE54A] text-[#4AE54A] hover:bg-[#4AE54A]/10 font-mono px-8 py-3">
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>

          {/* Email Capture */}
          <div className="max-w-md mx-auto">
            <div className="flex space-x-2">
              <Input
                placeholder="Enter your email for early access"
                className="bg-[#12151C] border-[#4AE54A]/30 text-[#C0C5CE] font-mono"
              />
              <Button className="bg-[#4AE54A] text-[#0B0D12] hover:bg-[#4AE54A]/90 font-mono">
                Get Access
              </Button>
            </div>
            <p className="text-[#C0C5CE]/50 font-mono text-xs mt-2">
              Join 12,000+ store owners. No spam, unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 border-t border-[#4AE54A]/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl text-[#4AE54A] font-mono font-medium mb-2 neural-pulse">
                {stats.stores.toLocaleString()}+
              </div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">Stores Built</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl text-[#4AE54A] font-mono font-medium mb-2">
                ${(stats.revenue / 1000000).toFixed(1)}M+
              </div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">Revenue Generated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl text-[#4AE54A] font-mono font-medium mb-2">
                {stats.users.toLocaleString()}+
              </div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl text-[#4AE54A] font-mono font-medium mb-2">
                {stats.uptime}%
              </div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">Uptime SLA</div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Support */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-[#C0C5CE] font-mono font-medium mb-4">
              Works With Your Favorite Platforms
            </h2>
            <p className="text-[#C0C5CE]/70 font-mono">
              Seamless integration with all major e-commerce platforms
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {platforms.map((platform) => {
              const IconComponent = platform.icon;
              return (
                <Card key={platform.name} className="bg-[#12151C] border-[#4AE54A]/20 text-center">
                  <CardContent className="p-6">
                    <IconComponent className="w-12 h-12 text-[#4AE54A] mx-auto mb-4" />
                    <h3 className="text-[#C0C5CE] font-mono font-medium mb-2">{platform.name}</h3>
                    <p className="text-[#C0C5CE]/60 font-mono text-sm mb-1">{platform.users} users</p>
                    <Badge variant="outline" className="border-[#4AE54A]/30 text-[#4AE54A]/70 font-mono text-xs">
                      {platform.integration}
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-[#12151C]/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-[#C0C5CE] font-mono font-medium mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-[#C0C5CE]/70 font-mono">
              Powerful features designed for modern e-commerce businesses
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-[#C0C5CE] font-mono font-medium mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-[#C0C5CE]/70 font-mono">
              See what our customers are saying about NeoTechnology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-6 bg-[#12151C]/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-[#C0C5CE] font-mono font-medium mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-[#C0C5CE]/70 font-mono">
              Choose the plan that fits your business needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <PricingCard key={index} plan={plan} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-[#C0C5CE]/60 font-mono text-sm mb-4">
              All plans include 14-day free trial • No setup fees • Cancel anytime
            </p>
            <Button variant="outline" className="border-[#4AE54A] text-[#4AE54A] hover:bg-[#4AE54A]/10 font-mono">
              Compare All Features
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl text-[#C0C5CE] font-mono font-medium mb-6">
            Ready to Transform Your E-commerce Business?
          </h2>
          <p className="text-xl text-[#C0C5CE]/80 font-mono mb-8">
            Join thousands of successful store owners who trust NeoTechnology to power their growth.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button size="lg" className="bg-[#4AE54A] text-[#0B0D12] hover:bg-[#4AE54A]/90 font-mono px-8 py-4 text-lg">
              <Rocket className="w-6 h-6 mr-2" />
              Start Your Free Trial
            </Button>
            <Button size="lg" variant="outline" className="border-[#4AE54A] text-[#4AE54A] hover:bg-[#4AE54A]/10 font-mono px-8 py-4 text-lg">
              <MessageSquare className="w-6 h-6 mr-2" />
              Talk to Sales
            </Button>
          </div>
          
          <div className="flex items-center justify-center space-x-6 mt-8 text-[#C0C5CE]/60 font-mono text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-[#4AE54A]" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-[#4AE54A]" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-[#4AE54A]" />
              <span>Setup in 5 minutes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#4AE54A]/20 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-[#4AE54A] font-mono font-medium mb-4">NeoTechnology</h3>
              <p className="text-[#C0C5CE]/70 font-mono text-sm mb-4">
                The ultimate e-commerce platform for building, optimizing, and scaling online stores.
              </p>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="border-[#4AE54A]/30 text-[#4AE54A]/70">
                  <Mail className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="border-[#4AE54A]/30 text-[#4AE54A]/70">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="border-[#4AE54A]/30 text-[#4AE54A]/70">
                  <MessageSquare className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="text-[#C0C5CE] font-mono font-medium mb-4">Product</h4>
              <div className="space-y-2 text-[#C0C5CE]/70 font-mono text-sm">
                <div>Store Builder</div>
                <div>Code Analyzer</div>
                <div>AI Optimization</div>
                <div>Analytics</div>
                <div>Security</div>
              </div>
            </div>
            
            <div>
              <h4 className="text-[#C0C5CE] font-mono font-medium mb-4">Platforms</h4>
              <div className="space-y-2 text-[#C0C5CE]/70 font-mono text-sm">
                <div>Shopify</div>
                <div>WordPress</div>
                <div>Wix</div>
                <div>Custom</div>
                <div>API</div>
              </div>
            </div>
            
            <div>
              <h4 className="text-[#C0C5CE] font-mono font-medium mb-4">Company</h4>
              <div className="space-y-2 text-[#C0C5CE]/70 font-mono text-sm">
                <div>About Us</div>
                <div>Careers</div>
                <div>Blog</div>
                <div>Contact</div>
                <div>Support</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-[#4AE54A]/20 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between">
            <div className="text-[#C0C5CE]/60 font-mono text-sm">
              © 2024 NeoTechnology Solutions LLC. All rights reserved.
            </div>
            <div className="flex space-x-6 text-[#C0C5CE]/60 font-mono text-sm mt-4 sm:mt-0">
              <div>Privacy Policy</div>
              <div>Terms of Service</div>
              <div>GDPR</div>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to top button */}
      <Button
        className="fixed bottom-6 right-6 bg-[#4AE54A] text-[#0B0D12] hover:bg-[#4AE54A]/90 p-3 rounded-full shadow-lg"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ArrowUp className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default SaaSLanding;