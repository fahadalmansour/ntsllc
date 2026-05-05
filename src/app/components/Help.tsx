import React, { useState } from 'react';
import { 
  HelpCircle, 
  Search, 
  Book, 
  Video, 
  MessageCircle, 
  Mail, 
  Phone, 
  FileText, 
  Play,
  ChevronRight,
  ExternalLink,
  Download,
  Lightbulb,
  Zap,
  Shield,
  Cpu,
  Globe,
  Code,
  Users,
  Star
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';

export function Help() {
  const [searchQuery, setSearchQuery] = useState('');

  const quickActions = [
    { icon: Video, title: 'Getting Started', desc: 'Learn the basics in 5 minutes', badge: 'Popular' },
    { icon: Book, title: 'User Guide', desc: 'Complete documentation', badge: null },
    { icon: MessageCircle, title: 'Contact Support', desc: 'Get help from our team', badge: 'Fast' },
    { icon: Code, title: 'API Documentation', desc: 'Developer resources', badge: 'Technical' }
  ];

  const helpCategories = [
    {
      title: 'Getting Started',
      icon: Lightbulb,
      articles: [
        'Setting up your first project',
        'Understanding the dashboard',
        'Configuring your workspace',
        'Basic navigation guide'
      ]
    },
    {
      title: 'AI Features',
      icon: Zap,
      articles: [
        'Using Vertex AI Manager',
        'Code analysis tools',
        'AI-powered suggestions',
        'Training custom models'
      ]
    },
    {
      title: 'E-commerce',
      icon: Globe,
      articles: [
        'Building your store',
        'Managing products',
        'Payment integration',
        'Analytics and reporting'
      ]
    },
    {
      title: 'Security',
      icon: Shield,
      articles: [
        'Account security',
        'Two-factor authentication',
        'Data encryption',
        'Compliance standards'
      ]
    },
    {
      title: 'Performance',
      icon: Cpu,
      articles: [
        'Optimizing load times',
        'Cache management',
        'Resource monitoring',
        'Troubleshooting issues'
      ]
    },
    {
      title: 'Collaboration',
      icon: Users,
      articles: [
        'Team management',
        'Real-time collaboration',
        'Permission settings',
        'Sharing projects'
      ]
    }
  ];

  const tutorials = [
    {
      title: 'Complete Platform Overview',
      duration: '15 min',
      level: 'Beginner',
      description: 'Get familiar with all platform features'
    },
    {
      title: 'Building Your First E-commerce Store',
      duration: '25 min',
      level: 'Intermediate',
      description: 'Step-by-step store creation guide'
    },
    {
      title: 'Advanced AI Tools Masterclass',
      duration: '45 min',
      level: 'Advanced',
      description: 'Leverage AI for maximum productivity'
    },
    {
      title: 'Performance Optimization',
      duration: '20 min',
      level: 'Intermediate',
      description: 'Make your projects lightning fast'
    }
  ];

  const faqs = [
    {
      question: 'How do I start a new e-commerce project?',
      answer: 'Navigate to the E-commerce Platform section and click "Create New Store". Follow the guided setup process to configure your store settings, add products, and customize your design.'
    },
    {
      question: 'What AI features are available?',
      answer: 'Our platform includes Vertex AI integration for code analysis, automated testing, performance optimization, and intelligent suggestions. Access these through the AI Features dashboard.'
    },
    {
      question: 'How secure is my data?',
      answer: 'We use enterprise-grade encryption, regular security audits, and comply with international standards including GDPR and SOC 2. Your data is protected with multiple layers of security.'
    },
    {
      question: 'Can I integrate with existing systems?',
      answer: 'Yes! Our platform offers comprehensive API access and supports integrations with popular services like WordPress, Shopify, WooCommerce, and custom systems through our API.'
    },
    {
      question: 'What support plans are available?',
      answer: 'We offer multiple support tiers: Community (free), Professional (24/7 chat), and Enterprise (dedicated support manager). All plans include access to documentation and tutorials.'
    }
  ];

  const filteredCategories = helpCategories.filter(category =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.articles.some(article => article.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#0B0D12] terminal-theme pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-mono text-[#4AE54A] glow-text mb-4">Help Center</h1>
          <p className="text-xl text-[#C0C5CE] font-mono mb-8">
            Everything you need to succeed with NeoTechnology
          </p>
          
          {/* Search */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#C0C5CE] w-5 h-5" />
            <Input
              placeholder="Search for help articles, tutorials, and guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-4 bg-[#12151C] border-[#4AE54A]/20 text-[#C0C5CE] font-mono text-lg"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {quickActions.map((action, index) => (
            <Card key={index} className="bg-[#12151C] border-[#4AE54A]/20 p-6 hover:border-[#4AE54A]/40 transition-all cursor-pointer group">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#4AE54A]/20 rounded-lg flex items-center justify-center group-hover:bg-[#4AE54A]/30 transition-colors">
                  <action.icon className="w-6 h-6 text-[#4AE54A]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-mono text-[#C0C5CE] group-hover:text-[#4AE54A] transition-colors">
                      {action.title}
                    </h3>
                    {action.badge && (
                      <Badge className="bg-[#4AE54A]/20 text-[#4AE54A] text-xs">
                        {action.badge}
                      </Badge>
                    )}
                  </div>
                  <p className="text-[#C0C5CE]/60 font-mono text-sm">{action.desc}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-[#C0C5CE]/40 group-hover:text-[#4AE54A] transition-colors" />
              </div>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="articles" className="space-y-8">
          <TabsList className="bg-[#12151C] border border-[#4AE54A]/20">
            <TabsTrigger value="articles" className="font-mono data-[state=active]:text-[#4AE54A]">
              <Book className="w-4 h-4 mr-2" />
              Articles
            </TabsTrigger>
            <TabsTrigger value="tutorials" className="font-mono data-[state=active]:text-[#4AE54A]">
              <Video className="w-4 h-4 mr-2" />
              Tutorials
            </TabsTrigger>
            <TabsTrigger value="faq" className="font-mono data-[state=active]:text-[#4AE54A]">
              <HelpCircle className="w-4 h-4 mr-2" />
              FAQ
            </TabsTrigger>
            <TabsTrigger value="contact" className="font-mono data-[state=active]:text-[#4AE54A]">
              <MessageCircle className="w-4 h-4 mr-2" />
              Contact
            </TabsTrigger>
          </TabsList>

          {/* Articles Tab */}
          <TabsContent value="articles">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.map((category, index) => (
                <Card key={index} className="bg-[#12151C] border-[#4AE54A]/20 p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-[#4AE54A]/20 rounded-lg flex items-center justify-center">
                      <category.icon className="w-5 h-5 text-[#4AE54A]" />
                    </div>
                    <h3 className="text-lg font-mono text-[#4AE54A]">{category.title}</h3>
                  </div>
                  <div className="space-y-3">
                    {category.articles.map((article, articleIndex) => (
                      <button
                        key={articleIndex}
                        className="block w-full text-left p-2 rounded hover:bg-[#4AE54A]/10 transition-colors group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[#C0C5CE] font-mono text-sm group-hover:text-[#4AE54A] transition-colors">
                            {article}
                          </span>
                          <ChevronRight className="w-4 h-4 text-[#C0C5CE]/40 group-hover:text-[#4AE54A] transition-colors" />
                        </div>
                      </button>
                    ))}
                  </div>
                  <Button 
                    variant="ghost" 
                    className="w-full mt-4 text-[#4AE54A] hover:bg-[#4AE54A]/10 font-mono"
                  >
                    View All Articles
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tutorials Tab */}
          <TabsContent value="tutorials">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tutorials.map((tutorial, index) => (
                <Card key={index} className="bg-[#12151C] border-[#4AE54A]/20 p-6 hover:border-[#4AE54A]/40 transition-all cursor-pointer group">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-[#4AE54A]/20 rounded-lg flex items-center justify-center group-hover:bg-[#4AE54A]/30 transition-colors">
                      <Play className="w-8 h-8 text-[#4AE54A]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-mono text-[#4AE54A] mb-2 group-hover:text-[#5af45a] transition-colors">
                        {tutorial.title}
                      </h3>
                      <p className="text-[#C0C5CE]/60 font-mono text-sm mb-3">
                        {tutorial.description}
                      </p>
                      <div className="flex items-center space-x-4">
                        <Badge className="bg-[#4AE54A]/20 text-[#4AE54A]">
                          {tutorial.duration}
                        </Badge>
                        <Badge 
                          className={`${
                            tutorial.level === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                            tutorial.level === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                          }`}
                        >
                          {tutorial.level}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* FAQ Tab */}
          <TabsContent value="faq">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="bg-[#12151C] border-[#4AE54A]/20 p-6">
                  <h3 className="text-lg font-mono text-[#4AE54A] mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-[#C0C5CE] font-mono text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Live Chat */}
              <Card className="bg-[#12151C] border-[#4AE54A]/20 p-6 text-center">
                <div className="w-16 h-16 bg-[#4AE54A]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-[#4AE54A]" />
                </div>
                <h3 className="text-lg font-mono text-[#4AE54A] mb-2">Live Chat</h3>
                <p className="text-[#C0C5CE]/60 font-mono text-sm mb-4">
                  Get instant help from our support team
                </p>
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <div className="w-2 h-2 bg-[#4AE54A] rounded-full animate-pulse"></div>
                  <span className="text-[#4AE54A] font-mono text-sm">Online Now</span>
                </div>
                <Button className="w-full bg-[#4AE54A] text-[#0B0D12] hover:bg-[#4AE54A]/90 font-mono">
                  Start Chat
                </Button>
              </Card>

              {/* Email Support */}
              <Card className="bg-[#12151C] border-[#4AE54A]/20 p-6 text-center">
                <div className="w-16 h-16 bg-[#4AE54A]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-[#4AE54A]" />
                </div>
                <h3 className="text-lg font-mono text-[#4AE54A] mb-2">Email Support</h3>
                <p className="text-[#C0C5CE]/60 font-mono text-sm mb-4">
                  Send us detailed questions and feedback
                </p>
                <p className="text-[#4AE54A] font-mono text-sm mb-4">
                  support@neotechnology.com
                </p>
                <Button 
                  variant="outline" 
                  className="w-full border-[#4AE54A]/30 text-[#4AE54A] hover:bg-[#4AE54A]/10 font-mono"
                >
                  Send Email
                </Button>
              </Card>

              {/* Phone Support */}
              <Card className="bg-[#12151C] border-[#4AE54A]/20 p-6 text-center">
                <div className="w-16 h-16 bg-[#4AE54A]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-[#4AE54A]" />
                </div>
                <h3 className="text-lg font-mono text-[#4AE54A] mb-2">Phone Support</h3>
                <p className="text-[#C0C5CE]/60 font-mono text-sm mb-4">
                  Speak directly with our experts
                </p>
                <p className="text-[#4AE54A] font-mono text-sm mb-2">
                  +1 (555) 123-4567
                </p>
                <p className="text-[#C0C5CE]/60 font-mono text-xs mb-4">
                  Available 9 AM - 6 PM EST
                </p>
                <Button 
                  variant="outline" 
                  className="w-full border-[#4AE54A]/30 text-[#4AE54A] hover:bg-[#4AE54A]/10 font-mono"
                >
                  Call Now
                </Button>
              </Card>
            </div>

            {/* Additional Resources */}
            <Card className="bg-[#12151C] border-[#4AE54A]/20 p-6 mt-8">
              <h3 className="text-xl font-mono text-[#4AE54A] mb-4">Additional Resources</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-mono text-[#C0C5CE] mb-3">Documentation</h4>
                  <div className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start text-[#C0C5CE] hover:text-[#4AE54A] font-mono">
                      <FileText className="w-4 h-4 mr-2" />
                      API Documentation
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-[#C0C5CE] hover:text-[#4AE54A] font-mono">
                      <Download className="w-4 h-4 mr-2" />
                      User Manual PDF
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-[#C0C5CE] hover:text-[#4AE54A] font-mono">
                      <Book className="w-4 h-4 mr-2" />
                      Developer Guide
                    </Button>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-mono text-[#C0C5CE] mb-3">Community</h4>
                  <div className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start text-[#C0C5CE] hover:text-[#4AE54A] font-mono">
                      <Users className="w-4 h-4 mr-2" />
                      Community Forum
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-[#C0C5CE] hover:text-[#4AE54A] font-mono">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Discord Server
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-[#C0C5CE] hover:text-[#4AE54A] font-mono">
                      <Star className="w-4 h-4 mr-2" />
                      Feature Requests
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}