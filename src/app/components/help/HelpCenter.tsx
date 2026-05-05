import React, { useState } from 'react';
import { 
  HelpCircle, Search, Book, MessageCircle, Phone, Mail, 
  Clock, CheckCircle, ArrowRight, Star, Users, Zap,
  FileText, Video, Code, Database, Settings, Shield
} from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface HelpCenterProps {
  onNavigate?: (section: string) => void;
}

export function HelpCenter({ onNavigate }: HelpCenterProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const popularArticles = [
    {
      title: 'Getting Started with Lightning Launch',
      category: 'Quick Start',
      readTime: '5 min',
      rating: 4.8,
      views: 1547
    },
    {
      title: 'How to Integrate Shopify with NeoTech',
      category: 'Integrations',
      readTime: '8 min',
      rating: 4.9,
      views: 1203
    },
    {
      title: 'Setting Up Arabic Payment Methods',
      category: 'Payment Setup',
      readTime: '6 min',
      rating: 4.7,
      views: 892
    },
    {
      title: 'Troubleshooting WordPress Issues',
      category: 'Troubleshooting',
      readTime: '12 min',
      rating: 4.6,
      views: 756
    }
  ];

  const supportChannels = [
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: 'Live Chat',
      description: 'Chat with our technical experts',
      availability: 'Available 24/7',
      responseTime: 'Avg. 2 minutes',
      status: 'online'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone Support',
      description: 'Direct line to our support team',
      availability: 'Mon-Fri 9AM-6PM EST',
      responseTime: 'Immediate',
      status: 'available'
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email Support',
      description: 'Send us your technical questions',
      availability: 'Always available',
      responseTime: 'Avg. 4 hours',
      status: 'online'
    }
  ];

  const quickActions = [
    {
      icon: <Zap className="w-5 h-5" />,
      title: 'Order New Service',
      description: 'Start a new project',
      action: () => onNavigate?.('services')
    },
    {
      icon: <Settings className="w-5 h-5" />,
      title: 'Account Settings',
      description: 'Manage your account',
      action: () => onNavigate?.('settings')
    },
    {
      icon: <FileText className="w-5 h-5" />,
      title: 'View Documentation',
      description: 'Browse technical docs',
      action: () => {}
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      title: 'AI Assistant',
      description: 'Get instant help',
      action: () => onNavigate?.('ai-assistant')
    }
  ];

  const categories = [
    {
      icon: <Book className="w-8 h-8" />,
      title: 'Getting Started',
      description: 'Learn the basics of our platform',
      articles: 12,
      color: 'text-[#00ff88]'
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Development',
      description: 'Technical guides and code examples',
      articles: 28,
      color: 'text-[#00d4ff]'
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: 'Integrations',
      description: 'Connect with third-party services',
      articles: 15,
      color: 'text-[#00ff88]'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Security',
      description: 'Security best practices',
      articles: 8,
      color: 'text-[#00d4ff]'
    }
  ];

  const faqs = [
    {
      question: 'How quickly can my store be deployed?',
      answer: 'With our Lightning Launch service, your store can be live in just 4 hours. Thunder Setup takes 24 hours, and Storm Complete takes 72 hours for full deployment.'
    },
    {
      question: 'Do you support Arabic language and RTL layout?',
      answer: 'Yes! All our platforms come with full Arabic language support and RTL (Right-to-Left) layout compatibility, including Arabic payment methods like STC Pay and Tamara.'
    },
    {
      question: 'What platforms do you support?',
      answer: 'We support WordPress, Shopify, Wix, and our custom Zed platform. Each platform is optimized for different business needs and requirements.'
    },
    {
      question: 'Is technical support included?',
      answer: 'Yes! All packages include technical support. Lightning includes 1 month, Thunder includes 3 months, and Storm includes a full year of support.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#C0C5CE] font-mono">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <HelpCircle className="w-12 h-12 text-[#00ff88]" />
          </div>
          <h1 className="text-[#C0C5CE] text-3xl font-semibold mb-4">Help Center</h1>
          <p className="text-[#C0C5CE]/70 text-lg max-w-2xl mx-auto mb-6">
            Get help with your NeoTechnology Solutions platform. Find answers, tutorials, and expert support.
          </p>
          
          {/* Search */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#C0C5CE]/50 w-5 h-5" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for help articles, guides, and tutorials..."
              className="bg-[#12151C] border-[#C0C5CE]/20 text-[#C0C5CE] pl-12 h-14 text-base font-mono"
            />
            <Button className="absolute right-2 top-2 bg-[#00ff88] text-[#0a0a0a] hover:bg-[#00ff88]/90 font-mono">
              Search
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={action.action}
              className="h-auto p-4 flex flex-col items-center space-y-2 border-[#C0C5CE]/20 text-[#C0C5CE] hover:bg-[#00ff88]/10 hover:border-[#00ff88]/50 font-mono"
            >
              <div className="text-[#00ff88]">{action.icon}</div>
              <div className="text-center">
                <div className="font-semibold text-sm">{action.title}</div>
                <div className="text-xs text-[#C0C5CE]/70">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>

        {/* Support Channels */}
        <Card className="bg-[#12151C] border-[#C0C5CE]/20 p-6 mb-8">
          <h2 className="text-[#00ff88] text-xl font-semibold mb-6">Contact Support</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {supportChannels.map((channel, index) => (
              <div key={index} className="bg-[#0B0D12] border border-[#C0C5CE]/20 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="text-[#00d4ff]">{channel.icon}</div>
                  <div>
                    <h3 className="text-[#C0C5CE] font-semibold">{channel.title}</h3>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        channel.status === 'online' ? 'bg-[#00ff88]' : 'bg-yellow-400'
                      }`}></div>
                      <Badge variant="secondary" className={`font-mono text-xs ${
                        channel.status === 'online' ? 'bg-[#00ff88]/20 text-[#00ff88]' : 'bg-yellow-400/20 text-yellow-400'
                      }`}>
                        {channel.status === 'online' ? 'Online' : 'Available'}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <p className="text-[#C0C5CE]/70 text-sm mb-3">{channel.description}</p>
                
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#C0C5CE]/70">Availability:</span>
                    <span className="text-[#C0C5CE]">{channel.availability}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#C0C5CE]/70">Response:</span>
                    <span className="text-[#00d4ff]">{channel.responseTime}</span>
                  </div>
                </div>
                
                <Button size="sm" className="w-full mt-4 bg-[#00d4ff] text-[#0a0a0a] hover:bg-[#00d4ff]/90 font-mono">
                  Contact Now
                </Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="articles" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-[#12151C] p-1">
            <TabsTrigger value="articles" className="text-[#C0C5CE] data-[state=active]:bg-[#00ff88] data-[state=active]:text-[#0a0a0a] font-mono">
              Articles
            </TabsTrigger>
            <TabsTrigger value="categories" className="text-[#C0C5CE] data-[state=active]:bg-[#00ff88] data-[state=active]:text-[#0a0a0a] font-mono">
              Categories
            </TabsTrigger>
            <TabsTrigger value="faq" className="text-[#C0C5CE] data-[state=active]:bg-[#00ff88] data-[state=active]:text-[#0a0a0a] font-mono">
              FAQ
            </TabsTrigger>
            <TabsTrigger value="tutorials" className="text-[#C0C5CE] data-[state=active]:bg-[#00ff88] data-[state=active]:text-[#0a0a0a] font-mono">
              Tutorials
            </TabsTrigger>
          </TabsList>

          <TabsContent value="articles" className="space-y-6">
            <Card className="bg-[#12151C] border-[#C0C5CE]/20 p-6">
              <h3 className="text-[#00ff88] text-lg font-semibold mb-6">Popular Articles</h3>
              
              <div className="space-y-4">
                {popularArticles.map((article, index) => (
                  <div key={index} className="bg-[#0B0D12] border border-[#C0C5CE]/20 rounded-lg p-4 hover:border-[#00ff88]/50 transition-colors cursor-pointer group">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-[#C0C5CE] font-semibold mb-2 group-hover:text-[#00ff88] transition-colors">
                          {article.title}
                        </h4>
                        <div className="flex items-center space-x-4 text-sm text-[#C0C5CE]/70">
                          <Badge variant="secondary" className="bg-[#00d4ff]/20 text-[#00d4ff] font-mono text-xs">
                            {article.category}
                          </Badge>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{article.readTime}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 text-yellow-400" />
                            <span>{article.rating}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-3 h-3" />
                            <span>{article.views}</span>
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-[#C0C5CE]/50 group-hover:text-[#00ff88] transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categories.map((category, index) => (
                <Card key={index} className="bg-[#12151C] border-[#C0C5CE]/20 p-6 hover:border-[#00ff88]/50 transition-colors cursor-pointer group">
                  <div className="flex items-start space-x-4">
                    <div className={`${category.color} group-hover:text-[#00ff88] transition-colors`}>
                      {category.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[#C0C5CE] font-semibold text-lg mb-2 group-hover:text-[#00ff88] transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-[#C0C5CE]/70 text-sm mb-3">{category.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-[#00d4ff] text-sm font-semibold">
                          {category.articles} articles
                        </span>
                        <ArrowRight className="w-4 h-4 text-[#C0C5CE]/50 group-hover:text-[#00ff88] transition-colors" />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="faq" className="space-y-6">
            <Card className="bg-[#12151C] border-[#C0C5CE]/20 p-6">
              <h3 className="text-[#00ff88] text-lg font-semibold mb-6">Frequently Asked Questions</h3>
              
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-[#0B0D12] border border-[#C0C5CE]/20 rounded-lg p-4">
                    <h4 className="text-[#C0C5CE] font-semibold mb-3">{faq.question}</h4>
                    <p className="text-[#C0C5CE]/70 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="tutorials" className="space-y-6">
            <Card className="bg-[#12151C] border-[#C0C5CE]/20 p-8 text-center">
              <Video className="w-16 h-16 text-[#C0C5CE]/50 mx-auto mb-4" />
              <h3 className="text-[#C0C5CE] text-xl font-semibold mb-2">Video Tutorials</h3>
              <p className="text-[#C0C5CE]/70 font-mono mb-6 max-w-2xl mx-auto">
                Step-by-step video guides to help you master our platform. 
                From basic setup to advanced customization techniques.
              </p>
              <Button className="bg-[#00ff88] text-[#0a0a0a] hover:bg-[#00ff88]/90 font-semibold px-6 py-3">
                <Video className="w-4 h-4 mr-2" />
                Browse Video Library
              </Button>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default HelpCenter;