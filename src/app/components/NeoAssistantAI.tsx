import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, 
  MessageCircle, 
  Search, 
  Lightbulb,
  Code,
  Settings,
  HelpCircle,
  Zap,
  Target,
  BookOpen,
  Monitor,
  Database,
  Globe,
  Shield,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Clock,
  Star,
  Send,
  Mic,
  MicOff,
  Volume2
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

interface AssistantMessage {
  id: string;
  type: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  category?: 'guidance' | 'code' | 'platform' | 'troubleshoot';
  actions?: Array<{
    label: string;
    action: string;
    type: 'button' | 'link' | 'code';
  }>;
}

interface KnowledgeBase {
  category: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  articles: number;
  lastUpdated: string;
}

export function NeoAssistantAI() {
  const [messages, setMessages] = useState<AssistantMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: 'all', label: 'All Topics', icon: <Globe className="w-4 h-4" /> },
    { id: 'platform', label: 'Platform', icon: <Monitor className="w-4 h-4" /> },
    { id: 'code', label: 'Code Help', icon: <Code className="w-4 h-4" /> },
    { id: 'deployment', label: 'Deployment', icon: <Zap className="w-4 h-4" /> },
    { id: 'troubleshoot', label: 'Troubleshoot', icon: <AlertCircle className="w-4 h-4" /> }
  ];

  const knowledgeBase: KnowledgeBase[] = [
    {
      category: 'Platform Setup',
      title: 'Getting Started with NeoTechnology',
      description: 'Complete setup guide for all our services',
      icon: <Monitor className="w-5 h-5" />,
      articles: 15,
      lastUpdated: 'Today'
    },
    {
      category: 'Development',
      title: 'Code Integration & APIs',
      description: 'Integration guides and API documentation',
      icon: <Code className="w-5 h-5" />,
      articles: 32,
      lastUpdated: '2 days ago'
    },
    {
      category: 'AI Services',
      title: 'NeoBuilder & AI Tools',
      description: 'Using our AI-powered development tools',
      icon: <Brain className="w-5 h-5" />,
      articles: 18,
      lastUpdated: 'Yesterday'
    },
    {
      category: 'Deployment',
      title: 'Multi-Platform Deployment',
      description: 'Deploy to WordPress, Shopify, Salla & more',
      icon: <Globe className="w-5 h-5" />,
      articles: 24,
      lastUpdated: '3 days ago'
    }
  ];

  const commonQuestions = [
    "How do I integrate NeoBuilder AI?",
    "Setup multi-platform deployment",
    "Troubleshoot build errors",
    "Configure AI assistance",
    "Export to Shopify guide",
    "Performance optimization tips"
  ];

  useEffect(() => {
    // Initialize with welcome message
    setMessages([
      {
        id: '1',
        type: 'assistant',
        content: `> NeoAssistant AI initialized...
> Terminal connection established
> Ready for assistance

Hello! I'm your intelligent assistant for NeoTechnology Solutions. I can help you with:

• Platform guidance and setup
• Code analysis and optimization  
• Deployment troubleshooting
• AI service configuration
• Performance recommendations

How can I assist you today?`,
        timestamp: new Date(),
        category: 'guidance',
        actions: [
          { label: 'View Documentation', action: '/docs', type: 'link' },
          { label: 'Quick Setup', action: 'setup', type: 'button' }
        ]
      }
    ]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: AssistantMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const response = generateAIResponse(inputValue);
      setMessages(prev => [...prev, response]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (input: string): AssistantMessage => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('neobuilder') || lowerInput.includes('ai builder')) {
      return {
        id: Date.now().toString(),
        type: 'assistant',
        content: `> Analyzing NeoBuilder AI query...
> Documentation loaded

NeoBuilder AI is our flagship AI-powered website builder. Here's what you need to know:

🚀 **Core Features:**
• Natural language website generation
• Multi-platform export (WordPress, Shopify, Salla, Wix, Zed)
• Real-time editing with AI suggestions
• Responsive design optimization

⚡ **Quick Start:**
1. \`neobuilder init --project="your-project"\`
2. Describe your website requirements
3. AI generates optimized code
4. Export to your preferred platform

Would you like me to guide you through the setup process?`,
        timestamp: new Date(),
        category: 'platform',
        actions: [
          { label: 'Start NeoBuilder', action: 'neobuilder-init', type: 'button' },
          { label: 'View Examples', action: '/examples', type: 'link' }
        ]
      };
    }

    if (lowerInput.includes('deploy') || lowerInput.includes('export')) {
      return {
        id: Date.now().toString(),
        type: 'assistant',
        content: `> Deployment analysis initiated...
> Multi-platform support verified

**Deployment Options Available:**

📦 **WordPress** (Free)
• Complete themes with WooCommerce
• Custom post types and fields
• SEO optimized structure

🛍️ **Shopify** (From $29/month)
• Liquid template generation
• Product catalog integration
• Checkout customization

🌟 **Salla** (From $19/month)
• Arabic RTL support
• Local payment gateways
• Saudi market optimized

Which platform would you like deployment guidance for?`,
        timestamp: new Date(),
        category: 'deployment',
        actions: [
          { label: 'WordPress Guide', action: 'wordpress-deploy', type: 'button' },
          { label: 'Shopify Setup', action: 'shopify-deploy', type: 'button' },
          { label: 'Salla Integration', action: 'salla-deploy', type: 'button' }
        ]
      };
    }

    if (lowerInput.includes('error') || lowerInput.includes('bug') || lowerInput.includes('issue')) {
      return {
        id: Date.now().toString(),
        type: 'assistant',
        content: `> Error diagnostics running...
> System health check complete

**Common Issues & Solutions:**

🔧 **Build Errors:**
• Check dependency versions
• Verify environment variables
• Clear cache: \`rm -rf node_modules && npm install\`

⚡ **Performance Issues:**
• Optimize images and assets
• Enable code splitting
• Check bundle size with analyzer

🔐 **Authentication Problems:**
• Verify API keys configuration
• Check Firebase setup
• Review CORS settings

Can you describe the specific error you're encountering?`,
        timestamp: new Date(),
        category: 'troubleshoot',
        actions: [
          { label: 'Run Diagnostics', action: 'diagnostics', type: 'button' },
          { label: 'Contact Support', action: '/support', type: 'link' }
        ]
      };
    }

    return {
      id: Date.now().toString(),
      type: 'assistant',
      content: `> Processing your request...
> Knowledge base searched

I understand you're asking about: "${input}"

I'm here to help with any NeoTechnology platform questions. I can assist with:

• **Platform Setup**: Configuration and initial setup
• **Development**: Code examples and best practices  
• **AI Services**: NeoBuilder, NeoBot, and automation tools
• **Deployment**: Multi-platform export and publishing
• **Troubleshooting**: Error resolution and optimization

Could you provide more specific details about what you'd like to accomplish?`,
      timestamp: new Date(),
      category: 'guidance',
      actions: [
        { label: 'Browse Docs', action: '/docs', type: 'link' },
        { label: 'Live Chat', action: 'live-chat', type: 'button' }
      ]
    };
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
    handleSendMessage();
  };

  return (
    <div className="min-h-screen bg-[#0B0D12] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Brain className="w-8 h-8 text-[#4AE54A] mr-3" />
            <div>
              <h1 className="text-[#C0C5CE] font-mono text-2xl mb-2">NeoAssistant AI</h1>
              <div className="flex items-center text-[#C0C5CE]/70 font-mono text-sm">
                <span className="text-[#4AE54A] mr-2">{'>'}</span>
                <span>Intelligent platform guidance and technical support</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Knowledge Base Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-[#12151C] border-[#C0C5CE]/20 p-6 mb-6">
              <h3 className="text-[#4AE54A] font-mono text-lg mb-4">Knowledge Base</h3>
              <div className="space-y-4">
                {knowledgeBase.map((kb, index) => (
                  <div key={index} className="bg-[#0B0D12] border border-[#C0C5CE]/10 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <div className="text-[#4AE54A] mr-2">{kb.icon}</div>
                      <div className="text-[#C0C5CE] font-mono text-sm font-semibold">{kb.category}</div>
                    </div>
                    <div className="text-[#C0C5CE]/80 font-mono text-xs mb-2">{kb.title}</div>
                    <div className="text-[#C0C5CE]/60 font-mono text-xs mb-3">{kb.description}</div>
                    <div className="flex justify-between items-center">
                      <Badge variant="secondary" className="bg-[#4AE54A]/10 text-[#4AE54A] font-mono text-xs">
                        {kb.articles} articles
                      </Badge>
                      <span className="text-[#C0C5CE]/50 font-mono text-xs">{kb.lastUpdated}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Questions */}
            <Card className="bg-[#12151C] border-[#C0C5CE]/20 p-6">
              <h3 className="text-[#4AE54A] font-mono text-lg mb-4">Quick Questions</h3>
              <div className="space-y-2">
                {commonQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="w-full text-left bg-[#0B0D12] border border-[#C0C5CE]/10 rounded-lg p-3 hover:border-[#4AE54A]/50 transition-colors duration-200"
                  >
                    <div className="text-[#C0C5CE] font-mono text-xs">{question}</div>
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="bg-[#12151C] border-[#C0C5CE]/20 h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="flex items-center justify-between p-4 border-b border-[#C0C5CE]/10">
                <div className="flex items-center">
                  <div className="flex space-x-2 mr-4">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-[#C0C5CE] font-mono text-sm">neoassistant@terminal:~$</span>
                </div>
                <div className="flex items-center space-x-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`flex items-center space-x-1 px-3 py-1 rounded-md font-mono text-xs transition-colors duration-200 ${
                        activeCategory === category.id
                          ? 'bg-[#4AE54A]/20 text-[#4AE54A]'
                          : 'text-[#C0C5CE]/70 hover:text-[#C0C5CE]'
                      }`}
                    >
                      {category.icon}
                      <span>{category.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] ${
                        message.type === 'user' 
                          ? 'bg-[#4AE54A]/20 text-[#C0C5CE]' 
                          : 'bg-[#0B0D12] border border-[#C0C5CE]/20 text-[#C0C5CE]'
                      } rounded-lg p-4`}>
                        <div className="font-mono text-sm whitespace-pre-wrap">{message.content}</div>
                        
                        {message.actions && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {message.actions.map((action, index) => (
                              <Button
                                key={index}
                                size="sm"
                                variant="outline"
                                className="bg-[#4AE54A]/10 border-[#4AE54A]/30 text-[#4AE54A] hover:bg-[#4AE54A]/20 font-mono text-xs"
                              >
                                {action.label}
                              </Button>
                            ))}
                          </div>
                        )}
                        
                        <div className="text-[#C0C5CE]/50 font-mono text-xs mt-2">
                          {message.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-[#0B0D12] border border-[#C0C5CE]/20 rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-[#4AE54A] rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-[#4AE54A] rounded-full animate-pulse delay-100"></div>
                        <div className="w-2 h-2 bg-[#4AE54A] rounded-full animate-pulse delay-200"></div>
                        <span className="text-[#C0C5CE]/70 font-mono text-sm">Analyzing...</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-[#C0C5CE]/10">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 relative">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Ask me anything about NeoTechnology..."
                      className="bg-[#0B0D12] border-[#C0C5CE]/20 text-[#C0C5CE] font-mono"
                    />
                  </div>
                  <Button
                    onClick={() => setIsListening(!isListening)}
                    variant="outline"
                    size="sm"
                    className={`border-[#C0C5CE]/20 ${
                      isListening 
                        ? 'bg-[#4AE54A]/20 text-[#4AE54A]' 
                        : 'text-[#C0C5CE] hover:text-[#4AE54A]'
                    }`}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </Button>
                  <Button
                    onClick={handleSendMessage}
                    className="bg-[#4AE54A] text-[#0B0D12] hover:bg-[#4AE54A]/90"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}