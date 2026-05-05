import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { useLanguage } from '../../contexts/LanguageContext';
import { RTLContainer } from '../LanguageSwitcher';
import { 
  Bot,
  Brain,
  MessageCircle,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Languages,
  Sparkles,
  Zap,
  Clock,
  CheckCircle,
  AlertTriangle,
  Users,
  Globe,
  TrendingUp,
  Activity,
  Settings,
  Download,
  Upload,
  RefreshCw,
  Eye,
  EyeOff,
  Star,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Share,
  Bookmark,
  Flag,
  MoreHorizontal,
  Phone,
  Mail,
  Calendar,
  FileText,
  Camera,
  Paperclip,
  Smile,
  Search,
  Filter,
  Tag,
  Archive
} from 'lucide-react';

// ✅ ENHANCED: Advanced AI conversation system
interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai' | 'system';
  timestamp: Date;
  language: 'en' | 'ar';
  confidence?: number;
  intent?: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
  attachments?: Array<{
    type: 'image' | 'document' | 'audio';
    url: string;
    name: string;
  }>;
  suggestedResponses?: string[];
  escalated?: boolean;
  resolved?: boolean;
  rating?: number;
}

interface AICapability {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  confidence: number;
  usage: number;
  examples: string[];
  examplesAr: string[];
}

interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  company?: string;
  region: 'US' | 'GCC' | 'Global';
  tier: 'Basic' | 'Pro' | 'Enterprise';
  satisfactionScore: number;
  totalInteractions: number;
  resolvedQueries: number;
  averageResponseTime: number;
  preferredLanguage: 'en' | 'ar';
  lastSeen: Date;
}

interface AIInsight {
  id: string;
  type: 'trend' | 'issue' | 'opportunity' | 'feedback';
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  impact: number;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  recommendation: string;
  recommendationAr: string;
  automated: boolean;
}

// ✅ ENHANCED: Mock AI capabilities
const aiCapabilities: AICapability[] = [
  {
    id: 'store-setup',
    name: 'E-commerce Store Setup',
    nameAr: 'إعداد المتجر الإلكتروني',
    description: 'Complete guidance for WordPress, Shopify, Wix, and Zed store creation',
    descriptionAr: 'إرشاد كامل لإنشاء متاجر WordPress وShopify وWix وZed',
    confidence: 96,
    usage: 847,
    examples: [
      'How do I set up a Shopify store for GCC market?',
      'What plugins do I need for WordPress e-commerce?',
      'Best payment gateways for Middle East customers?'
    ],
    examplesAr: [
      'كيف أقوم بإعداد متجر Shopify للسوق الخليجي؟',
      'ما هي الإضافات المطلوبة للتجارة الإلكترونية في WordPress؟',
      'أفضل بوابات الدفع للعملاء في الشرق الأوسط؟'
    ]
  },
  {
    id: 'automation',
    name: 'N8N Workflow Automation',
    nameAr: 'أتمتة سير العمل N8N',
    description: 'Advanced automation workflows and integration solutions',
    descriptionAr: 'حلول أتمتة متقدمة وتكامل سير العمل',
    confidence: 92,
    usage: 623,
    examples: [
      'How to automate inventory management?',
      'Set up customer email sequences',
      'Connect CRM with e-commerce platform'
    ],
    examplesAr: [
      'كيفية أتمتة إدارة المخزون؟',
      'إعداد سلاسل البريد الإلكتروني للعملاء',
      'ربط نظام CRM مع منصة التجارة الإلكترونية'
    ]
  },
  {
    id: 'sync-management',
    name: 'NeoSync Data Management',
    nameAr: 'إدارة بيانات NeoSync',
    description: 'Real-time data synchronization and management solutions',
    descriptionAr: 'حلول مزامنة وإدارة البيانات الفورية',
    confidence: 89,
    usage: 1247,
    examples: [
      'Sync products across multiple platforms',
      'Real-time inventory updates',
      'Customer data consistency'
    ],
    examplesAr: [
      'مزامنة المنتجات عبر منصات متعددة',
      'تحديثات المخزون الفورية',
      'ثبات بيانات العملاء'
    ]
  },
  {
    id: 'brand-monitoring',
    name: 'Brand Protection & Monitoring',
    nameAr: 'حماية ومراقبة العلامة التجارية',
    description: 'Comprehensive brand monitoring and protection services',
    descriptionAr: 'خدمات مراقبة وحماية شاملة للعلامة التجارية',
    confidence: 94,
    usage: 445,
    examples: [
      'Monitor brand mentions across platforms',
      'Detect trademark violations',
      'Competitive intelligence tracking'
    ],
    examplesAr: [
      'مراقبة ذكر العلامة التجارية عبر المنصات',
      'اكتشاف انتهاكات العلامة التجارية',
      'تتبع المعلومات الاستخبارية التنافسية'
    ]
  }
];

const mockCustomerProfiles: CustomerProfile[] = [
  {
    id: 'customer-001',
    name: 'Ahmed Al-Mansouri',
    email: 'ahmed@techstore.ae',
    company: 'Tech Store UAE',
    region: 'GCC',
    tier: 'Enterprise',
    satisfactionScore: 4.9,
    totalInteractions: 47,
    resolvedQueries: 44,
    averageResponseTime: 2.3,
    preferredLanguage: 'ar',
    lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000)
  },
  {
    id: 'customer-002',
    name: 'Sarah Johnson',
    email: 'sarah@innovate-retail.com',
    company: 'Innovate Retail Solutions',
    region: 'US',
    tier: 'Pro',
    satisfactionScore: 4.7,
    totalInteractions: 28,
    resolvedQueries: 26,
    averageResponseTime: 1.8,
    preferredLanguage: 'en',
    lastSeen: new Date(Date.now() - 30 * 60 * 1000)
  },
  {
    id: 'customer-003',
    name: 'Maria Rodriguez',
    email: 'maria@global-commerce.com',
    company: 'Global Commerce Inc',
    region: 'US',
    tier: 'Basic',
    satisfactionScore: 4.2,
    totalInteractions: 12,
    resolvedQueries: 11,
    averageResponseTime: 3.1,
    preferredLanguage: 'en',
    lastSeen: new Date(Date.now() - 24 * 60 * 60 * 1000)
  }
];

const aiInsights: AIInsight[] = [
  {
    id: 'insight-001',
    type: 'trend',
    title: 'Increased Store Setup Inquiries',
    titleAr: 'زيادة استفسارات إعداد المتاجر',
    description: '340% increase in Shopify setup questions from GCC region in the last week',
    descriptionAr: 'زيادة 340% في أسئلة إعداد Shopify من منطقة الخليج الأسبوع الماضي',
    impact: 85,
    urgency: 'high',
    recommendation: 'Prepare dedicated GCC Shopify setup templates and Arabic documentation',
    recommendationAr: 'إعداد قوالب Shopify مخصصة للخليج ووثائق عربية',
    automated: false
  },
  {
    id: 'insight-002',
    type: 'opportunity',
    title: 'AI Resolution Rate Optimization',
    titleAr: 'تحسين معدل الحل بالذكاء الاصطناعي',
    description: 'AI can now handle 78% of queries automatically, up from 65% last month',
    descriptionAr: 'يمكن للذكاء الاصطناعي الآن التعامل مع 78% من الاستفسارات تلقائياً، ارتفاعاً من 65% الشهر الماضي',
    impact: 92,
    urgency: 'medium',
    recommendation: 'Expand AI training data and implement advanced NLP models',
    recommendationAr: 'توسيع بيانات تدريب الذكاء الاصطناعي وتطبيق نماذج معالجة لغة طبيعية متقدمة',
    automated: true
  },
  {
    id: 'insight-003',
    type: 'issue',
    title: 'Arabic Language Processing Gap',
    titleAr: 'فجوة في معالجة اللغة العربية',
    description: 'Complex Arabic technical queries have lower resolution confidence (67%)',
    descriptionAr: 'الاستفسارات التقنية المعقدة بالعربية لها ثقة حل أقل (67%)',
    impact: 73,
    urgency: 'high',
    recommendation: 'Implement specialized Arabic NLP models and expand technical terminology database',
    recommendationAr: 'تطبيق نماذج معالجة لغة طبيعية عربية متخصصة وتوسيع قاعدة بيانات المصطلحات التقنية',
    automated: false
  }
];

export function AICustomerServiceBot({ onNavigate }: { onNavigate?: (section: string) => void }) {
  const { isRTL, language } = useLanguage();
  const [selectedView, setSelectedView] = useState<'chat' | 'analytics' | 'training' | 'insights' | 'customers'>('chat');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'system-welcome',
      content: language === 'ar' 
        ? 'مرحباً! أنا NeoBot، مساعدك الذكي لحلول التجارة الإلكترونية. كيف يمكنني مساعدتك اليوم؟'
        : 'Hello! I\'m NeoBot, your intelligent e-commerce solutions assistant. How can I help you today?',
      sender: 'ai',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      language: language,
      confidence: 100,
      intent: 'greeting'
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [aiTyping, setAiTyping] = useState(false);
  const [customerProfiles, setCustomerProfiles] = useState<CustomerProfile[]>(mockCustomerProfiles);
  const [insights, setInsights] = useState<AIInsight[]>(aiInsights);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerProfile | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // ✅ ENHANCED: Real-time AI simulation
  useEffect(() => {
    const interval = setInterval(() => {
      // Update AI capabilities usage
      setCustomerProfiles(prev => prev.map(customer => ({
        ...customer,
        satisfactionScore: Math.max(4.0, Math.min(5.0, customer.satisfactionScore + (Math.random() - 0.5) * 0.1)),
        totalInteractions: customer.totalInteractions + Math.floor(Math.random() * 2)
      })));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // ✅ ENHANCED: Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ✅ ENHANCED: AI response generation
  const generateAIResponse = useCallback(async (userMessage: string, userLanguage: 'en' | 'ar') => {
    setAiTyping(true);
    
    // Simulate AI processing time (2-5 seconds)
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));

    // Smart response based on message content
    let response = '';
    let intent = 'general';
    let confidence = 85 + Math.random() * 15;

    // ✅ ENHANCED: Intelligent response system
    if (userMessage.toLowerCase().includes('store') || userMessage.includes('متجر')) {
      intent = 'store-setup';
      response = userLanguage === 'ar' 
        ? 'ممتاز! يمكنني مساعدتك في إعداد متجرك الإلكتروني. نحن نختص في WordPress وShopify وWix وZed. ما هي المنصة التي تفضل استخدامها؟ الوقت المقدر: 15 دقيقة - 4 ساعات حسب التعقيد.'
        : 'Excellent! I can help you set up your e-commerce store. We specialize in WordPress, Shopify, Wix, and Zed. Which platform would you prefer to use? Estimated time: 15 minutes - 4 hours depending on complexity.';
      confidence = 94;
    } else if (userMessage.toLowerCase().includes('automation') || userMessage.includes('أتمتة')) {
      intent = 'automation';
      response = userLanguage === 'ar'
        ? 'رائع! أتمتة N8N يمكنها تحويل عملك بالكامل. يمكنني إعداد workflows للمخزون، البريد الإلكتروني، وإدارة العملاء. ما العملية التي تريد أتمتتها أولاً؟ الوقت المقدر: 30 دقيقة - 8 ساعات.'
        : 'Great! N8N automation can transform your entire business. I can set up workflows for inventory, email marketing, and customer management. What process would you like to automate first? Estimated time: 30 minutes - 8 hours.';
      confidence = 91;
    } else if (userMessage.toLowerCase().includes('sync') || userMessage.includes('مزامنة')) {
      intent = 'sync';
      response = userLanguage === 'ar'
        ? 'NeoSync هو الحل المثالي لمزامنة البيانات! يمكنني إعداد مزامنة فورية بين منصاتك المختلفة. هل تريد مزامنة المنتجات أم العملاء أم كليهما؟ الوقت المقدر: 15-30 دقيقة.'
        : 'NeoSync is perfect for data synchronization! I can set up real-time sync between your different platforms. Would you like to sync products, customers, or both? Estimated time: 15-30 minutes.';
      confidence = 87;
    } else if (userMessage.toLowerCase().includes('brand') || userMessage.includes('علامة')) {
      intent = 'brand-monitoring';
      response = userLanguage === 'ar'
        ? 'مراقبة العلامة التجارية أمر بالغ الأهمية! يمكنني إعداد Brand Checker لمراقبة علامتك التجارية عبر الإنترنت وحمايتها من الانتهاكات. هل تريد مراقبة أساسية أم شاملة؟ الوقت المقدر: 10-20 دقيقة للإعداد.'
        : 'Brand monitoring is crucial! I can set up Brand Checker to monitor and protect your brand online from violations. Would you like basic or comprehensive monitoring? Estimated time: 10-20 minutes for setup.';
      confidence = 93;
    } else {
      response = userLanguage === 'ar'
        ? 'شكراً لك على تواصلك معنا! أنا هنا لمساعدتك في جميع احتياجات التجارة الإلكترونية. يمكنني المساعدة في إعداد المتاجر، الأتمتة، مزامنة البيانات، ومراقبة العلامة التجارية. ما الخدمة التي تحتاجها؟'
        : 'Thank you for reaching out! I\'m here to help with all your e-commerce needs. I can assist with store setup, automation, data sync, and brand monitoring. What service do you need help with?';
      confidence = 82;
    }

    // Create AI response message
    const aiMessage: Message = {
      id: `ai-${Date.now()}`,
      content: response,
      sender: 'ai',
      timestamp: new Date(),
      language: userLanguage,
      confidence: Math.round(confidence),
      intent,
      sentiment: 'positive',
      suggestedResponses: userLanguage === 'ar' ? [
        'أريد المزيد من التفاصيل',
        'كم التكلفة؟',
        'متى يمكن البدء؟'
      ] : [
        'Tell me more details',
        'What\'s the cost?',
        'When can we start?'
      ]
    };

    setMessages(prev => [...prev, aiMessage]);
    setAiTyping(false);
  }, []);

  // ✅ ENHANCED: Send message handler
  const sendMessage = useCallback(async () => {
    if (!currentMessage.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: currentMessage,
      sender: 'user',
      timestamp: new Date(),
      language: language
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');

    // Generate AI response
    await generateAIResponse(currentMessage, language);
  }, [currentMessage, language, generateAIResponse]);

  // ✅ ENHANCED: Voice recognition (mock)
  const toggleVoiceRecognition = useCallback(() => {
    if (!isListening) {
      setIsListening(true);
      setTimeout(() => {
        setIsListening(false);
        setCurrentMessage(language === 'ar' 
          ? 'أريد إعداد متجر إلكتروني جديد'
          : 'I want to set up a new e-commerce store'
        );
      }, 3000);
    } else {
      setIsListening(false);
    }
  }, [isListening, language]);

  // ✅ ENHANCED: Text-to-speech (mock)
  const toggleTextToSpeech = useCallback(() => {
    setIsSpeaking(!isSpeaking);
    setTimeout(() => setIsSpeaking(false), 3000);
  }, [isSpeaking]);

  // ✅ ENHANCED: Message rating system
  const rateMessage = useCallback((messageId: string, rating: number) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, rating } : msg
    ));
  }, []);

  // ✅ ENHANCED: Statistics calculation
  const botStats = useMemo(() => {
    const totalMessages = messages.length;
    const aiMessages = messages.filter(msg => msg.sender === 'ai');
    const avgConfidence = aiMessages.reduce((sum, msg) => sum + (msg.confidence || 0), 0) / aiMessages.length;
    const resolvedConversations = Math.floor(totalMessages * 0.87);
    const avgResponseTime = 2.4;

    return {
      totalMessages,
      avgConfidence: Math.round(avgConfidence),
      resolvedConversations,
      avgResponseTime
    };
  }, [messages]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#C0C5CE] font-mono">
      {/* ✅ ENHANCED: AI neural network background */}
      <div className="fixed inset-0 neural-network opacity-10 pointer-events-none"></div>
      
      <RTLContainer className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        <div className={`space-y-8 ${isRTL ? 'text-right' : 'text-left'}`}>
          
          {/* ✅ ENHANCED: AI bot header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#00d4ff] via-purple-500 to-[#00ff88] rounded-lg flex items-center justify-center animate-pulse">
                <Bot className="w-6 h-6 text-black" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-[#C0C5CE]">
                  {language === 'ar' ? 'NeoBot - المساعد الذكي للعملاء' : 'NeoBot - AI Customer Service'}
                </h1>
                <p className="text-[#C0C5CE]/70 mt-1">
                  {language === 'ar' 
                    ? 'ذكاء اصطناعي متقدم مع دعم كامل للعربية والإنجليزية - حل فوري للاستفسارات'
                    : 'Advanced AI with full Arabic & English support - Instant query resolution'
                  }
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse"></div>
                <span className="text-sm text-[#C0C5CE]/70 font-mono">
                  {language === 'ar' ? 'متصل ونشط' : 'Online & Active'}
                </span>
              </div>
              <Badge className="bg-gradient-to-r from-purple-500 to-[#00d4ff] text-black font-mono animate-pulse">
                AI POWERED
              </Badge>
            </div>
          </div>

          {/* ✅ ENHANCED: Bot statistics overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <MessageCircle className="w-5 h-5 text-[#00d4ff]" />
                <Badge className="bg-[#00d4ff]/20 text-[#00d4ff] font-mono">Live</Badge>
              </div>
              <div className="neo-dashboard-widget-value text-[#00d4ff]">{botStats.totalMessages}</div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">Total Interactions</div>
              <div className="neo-dashboard-widget-change positive">
                <Activity className="w-3 h-3" />
                +12% this week
              </div>
            </Card>

            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <Brain className="w-5 h-5 text-purple-400" />
                <span className="text-xs text-[#C0C5CE]/70 font-mono">AI</span>
              </div>
              <div className="neo-dashboard-widget-value text-purple-400">{botStats.avgConfidence}%</div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">Confidence Level</div>
              <div className="neo-dashboard-widget-change positive">
                <Sparkles className="w-3 h-3" />
                Learning actively
              </div>
            </Card>

            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <CheckCircle className="w-5 h-5 text-[#00ff88]" />
                <span className="text-xs text-[#C0C5CE]/70 font-mono">Resolution</span>
              </div>
              <div className="neo-dashboard-widget-value text-[#00ff88]">78%</div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">Auto-Resolution</div>
              <div className="neo-dashboard-widget-change positive">
                <TrendingUp className="w-3 h-3" />
                +13% improvement
              </div>
            </Card>

            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <Clock className="w-5 h-5 text-yellow-400" />
                <span className="text-xs text-[#C0C5CE]/70 font-mono">Speed</span>
              </div>
              <div className="neo-dashboard-widget-value text-yellow-400">{botStats.avgResponseTime}s</div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">Avg Response</div>
              <div className="neo-dashboard-widget-change positive">
                <Zap className="w-3 h-3" />
                Instant responses
              </div>
            </Card>
          </div>

          {/* ✅ ENHANCED: Navigation tabs */}
          <div className="flex space-x-1 bg-[#12151C] p-1 rounded-lg">
            {[
              { id: 'chat', label: language === 'ar' ? 'المحادثة' : 'Live Chat', icon: MessageCircle },
              { id: 'analytics', label: language === 'ar' ? 'التحليلات' : 'Analytics', icon: Activity },
              { id: 'training', label: language === 'ar' ? 'التدريب' : 'Training', icon: Brain },
              { id: 'insights', label: language === 'ar' ? 'الرؤى' : 'AI Insights', icon: Sparkles },
              { id: 'customers', label: language === 'ar' ? 'العملاء' : 'Customers', icon: Users }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedView(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md font-mono text-sm transition-all ${
                  selectedView === tab.id
                    ? 'bg-[#00d4ff] text-black'
                    : 'text-[#C0C5CE] hover:bg-[#00d4ff]/10 hover:text-[#00d4ff]'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* ✅ ENHANCED: Chat interface */}
          {selectedView === 'chat' && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Main chat area */}
              <div className="lg:col-span-3">
                <Card className="neo-card h-[600px] flex flex-col">
                  <div className="p-4 border-b border-[#00d4ff]/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#00d4ff] to-purple-500 rounded-full flex items-center justify-center">
                          <Bot className="w-4 h-4 text-black" />
                        </div>
                        <div>
                          <h3 className="font-mono text-[#C0C5CE] font-semibold">NeoBot AI Assistant</h3>
                          <p className="text-xs text-[#C0C5CE]/70 font-mono">
                            {language === 'ar' ? 'متاح 24/7 - دعم فوري' : 'Available 24/7 - Instant Support'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          onClick={toggleVoiceRecognition}
                          className={`${isListening ? 'bg-red-400/20 text-red-400' : 'bg-[#00d4ff]/20 text-[#00d4ff]'} border-0 font-mono`}
                        >
                          {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                        </Button>
                        
                        <Button
                          size="sm"
                          onClick={toggleTextToSpeech}
                          className={`${isSpeaking ? 'bg-[#00ff88]/20 text-[#00ff88]' : 'bg-[#C0C5CE]/20 text-[#C0C5CE]'} border-0 font-mono`}
                        >
                          {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </Button>
                        
                        <Badge className="bg-[#00ff88]/20 text-[#00ff88] font-mono">
                          <Languages className="w-3 h-3 mr-1" />
                          {language.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  {/* Messages area */}
                  <div className="flex-1 p-4 overflow-y-auto space-y-4">
                    {messages.map(message => (
                      <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] ${message.sender === 'user' 
                          ? 'bg-[#00d4ff]/20 border border-[#00d4ff]/40' 
                          : 'bg-[#12151C] border border-[#C0C5CE]/20'} rounded-lg p-4`}>
                          
                          {message.sender === 'ai' && (
                            <div className="flex items-center space-x-2 mb-2">
                              <Bot className="w-4 h-4 text-[#00d4ff]" />
                              <span className="text-xs text-[#00d4ff] font-mono">NeoBot</span>
                              {message.confidence && (
                                <Badge className="bg-purple-400/20 text-purple-400 text-xs font-mono">
                                  {message.confidence}% confident
                                </Badge>
                              )}
                            </div>
                          )}
                          
                          <p className="text-[#C0C5CE] font-mono text-sm leading-relaxed">
                            {message.content}
                          </p>
                          
                          <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#C0C5CE]/10">
                            <span className="text-xs text-[#C0C5CE]/60 font-mono">
                              {message.timestamp.toLocaleTimeString()}
                            </span>
                            
                            {message.sender === 'ai' && (
                              <div className="flex items-center space-x-1">
                                <button
                                  onClick={() => rateMessage(message.id, 5)}
                                  className={`p-1 rounded ${message.rating === 5 ? 'text-[#00ff88]' : 'text-[#C0C5CE]/50 hover:text-[#00ff88]'} transition-colors`}
                                >
                                  <ThumbsUp className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={() => rateMessage(message.id, 1)}
                                  className={`p-1 rounded ${message.rating === 1 ? 'text-red-400' : 'text-[#C0C5CE]/50 hover:text-red-400'} transition-colors`}
                                >
                                  <ThumbsDown className="w-3 h-3" />
                                </button>
                              </div>
                            )}
                          </div>
                          
                          {message.suggestedResponses && (
                            <div className="mt-3 space-y-1">
                              {message.suggestedResponses.map((suggestion, index) => (
                                <button
                                  key={index}
                                  onClick={() => setCurrentMessage(suggestion)}
                                  className="block w-full text-left text-xs bg-[#00d4ff]/10 text-[#00d4ff] p-2 rounded font-mono hover:bg-[#00d4ff]/20 transition-colors"
                                >
                                  {suggestion}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    {aiTyping && (
                      <div className="flex justify-start">
                        <div className="bg-[#12151C] border border-[#C0C5CE]/20 rounded-lg p-4">
                          <div className="flex items-center space-x-2">
                            <Bot className="w-4 h-4 text-[#00d4ff] animate-pulse" />
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-[#00d4ff] rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-[#00d4ff] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 bg-[#00d4ff] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                            <span className="text-xs text-[#C0C5CE]/70 font-mono">
                              {language === 'ar' ? 'NeoBot يكتب...' : 'NeoBot is typing...'}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </div>
                  
                  {/* Input area */}
                  <div className="p-4 border-t border-[#00d4ff]/20">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 relative">
                        <input
                          ref={inputRef}
                          type="text"
                          value={currentMessage}
                          onChange={(e) => setCurrentMessage(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              sendMessage();
                            }
                          }}
                          placeholder={language === 'ar' 
                            ? 'اكتب استفسارك هنا... (اضغط Enter للإرسال)'
                            : 'Type your query here... (Press Enter to send)'
                          }
                          className="w-full bg-[#0B0D12] border border-[#00d4ff]/30 rounded-lg px-4 py-3 text-[#C0C5CE] font-mono focus:border-[#00d4ff] focus:outline-none placeholder:text-[#C0C5CE]/50"
                          disabled={aiTyping}
                        />
                        {isListening && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                          </div>
                        )}
                      </div>
                      
                      <Button
                        onClick={sendMessage}
                        disabled={aiTyping || !currentMessage.trim()}
                        className="neo-button-primary"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    {/* Quick actions */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {[
                        { text: language === 'ar' ? 'إعداد متجر' : 'Store Setup', value: language === 'ar' ? 'أريد إعداد متجر جديد' : 'I want to set up a new store' },
                        { text: language === 'ar' ? 'أتمتة العمليات' : 'Automation', value: language === 'ar' ? 'كيف يمكنني أتمتة عملياتي؟' : 'How can I automate my processes?' },
                        { text: language === 'ar' ? 'مزامنة البيانات' : 'Data Sync', value: language === 'ar' ? 'أحتاج مساعدة في مزامنة البيانات' : 'I need help with data synchronization' },
                        { text: language === 'ar' ? 'مراقبة العلامة' : 'Brand Monitor', value: language === 'ar' ? 'كيف أحمي علامتي التجارية؟' : 'How do I protect my brand online?' }
                      ].map(action => (
                        <button
                          key={action.text}
                          onClick={() => setCurrentMessage(action.value)}
                          className="text-xs bg-[#12151C] border border-[#00d4ff]/20 text-[#00d4ff] px-3 py-1 rounded font-mono hover:bg-[#00d4ff]/10 transition-colors"
                        >
                          {action.text}
                        </button>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>

              {/* Chat sidebar */}
              <div className="space-y-6">
                <Card className="neo-card">
                  <div className="p-4">
                    <h4 className="font-mono text-[#C0C5CE] font-semibold mb-4">
                      {language === 'ar' ? 'قدرات الذكاء الاصطناعي' : 'AI Capabilities'}
                    </h4>
                    
                    <div className="space-y-3">
                      {aiCapabilities.slice(0, 4).map(capability => (
                        <div key={capability.id} className="border border-[#00d4ff]/20 rounded p-3 hover:border-[#00d4ff]/40 transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="text-sm font-mono text-[#C0C5CE]">
                              {language === 'ar' ? capability.nameAr : capability.name}
                            </h5>
                            <Badge className="bg-[#00ff88]/20 text-[#00ff88] text-xs font-mono">
                              {capability.confidence}%
                            </Badge>
                          </div>
                          <p className="text-xs text-[#C0C5CE]/70 font-mono">
                            {language === 'ar' ? capability.descriptionAr : capability.description}
                          </p>
                          <div className="mt-2">
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-[#C0C5CE]/70 font-mono">Usage</span>
                              <span className="text-[#00ff88] font-mono">{capability.usage} queries</span>
                            </div>
                            <Progress value={capability.confidence} className="h-1" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

                <Card className="neo-card">
                  <div className="p-4">
                    <h4 className="font-mono text-[#C0C5CE] font-semibold mb-4">
                      {language === 'ar' ? 'إعدادات سريعة' : 'Quick Settings'}
                    </h4>
                    
                    <div className="space-y-3">
                      <Button className="w-full neo-button-outline" onClick={() => onNavigate?.('smart-command-center')}>
                        <Brain className="w-4 h-4 mr-2" />
                        {language === 'ar' ? 'مركز القيادة' : 'Command Center'}
                      </Button>
                      
                      <Button className="w-full neo-button-ghost" onClick={() => onNavigate?.('predictive-analytics-dashboard')}>
                        <Activity className="w-4 h-4 mr-2" />
                        {language === 'ar' ? 'التحليلات' : 'Analytics'}
                      </Button>
                      
                      <Button className="w-full neo-button-ghost">
                        <Settings className="w-4 h-4 mr-2" />
                        {language === 'ar' ? 'إعدادات البوت' : 'Bot Settings'}
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* ✅ ENHANCED: AI insights view */}
          {selectedView === 'insights' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-[#C0C5CE] font-mono">
                {language === 'ar' ? 'رؤى الذكاء الاصطناعي' : 'AI-Powered Insights'}
              </h3>
              
              <div className="space-y-4">
                {insights.map(insight => (
                  <Card key={insight.id} className="neo-interactive-card">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <Badge className={`${insight.urgency === 'critical' ? 'bg-red-400/20 text-red-400' :
                                             insight.urgency === 'high' ? 'bg-orange-400/20 text-orange-400' :
                                             insight.urgency === 'medium' ? 'bg-yellow-400/20 text-yellow-400' :
                                             'bg-[#00ff88]/20 text-[#00ff88]'} font-mono`}>
                              {insight.urgency.toUpperCase()}
                            </Badge>
                            <Badge className={`${insight.type === 'trend' ? 'bg-[#00d4ff]/20 text-[#00d4ff]' :
                                             insight.type === 'issue' ? 'bg-red-400/20 text-red-400' :
                                             insight.type === 'opportunity' ? 'bg-[#00ff88]/20 text-[#00ff88]' :
                                             'bg-purple-400/20 text-purple-400'} font-mono text-xs`}>
                              {insight.type.toUpperCase()}
                            </Badge>
                            {insight.automated && (
                              <Badge className="bg-gradient-to-r from-purple-500 to-[#00d4ff] text-black text-xs font-mono">
                                AI AUTO
                              </Badge>
                            )}
                          </div>
                          
                          <h4 className="text-lg font-bold text-[#C0C5CE] font-mono mb-2">
                            {language === 'ar' ? insight.titleAr : insight.title}
                          </h4>
                          <p className="text-[#C0C5CE]/80 text-sm mb-3">
                            {language === 'ar' ? insight.descriptionAr : insight.description}
                          </p>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-2xl font-mono text-[#00ff88] mb-1">
                            {insight.impact}
                          </div>
                          <div className="text-xs text-[#C0C5CE]/70 font-mono">
                            Impact Score
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-[#0B0D12] border border-[#00d4ff]/20 rounded p-3 mb-4">
                        <h5 className="text-sm font-semibold text-[#00d4ff] font-mono mb-1">
                          {language === 'ar' ? 'توصية الذكاء الاصطناعي:' : 'AI Recommendation:'}
                        </h5>
                        <p className="text-sm text-[#C0C5CE]/90 font-mono">
                          {language === 'ar' ? insight.recommendationAr : insight.recommendation}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Sparkles className="w-4 h-4 text-purple-400" />
                          <span className="text-xs text-[#C0C5CE]/70 font-mono">
                            {language === 'ar' ? 'مدعوم بالذكاء الاصطناعي' : 'AI-Powered Analysis'}
                          </span>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button size="sm" className="neo-button-outline">
                            <Eye className="w-3 h-3 mr-1" />
                            {language === 'ar' ? 'عرض' : 'View'}
                          </Button>
                          {insight.automated && (
                            <Button size="sm" className="neo-button-primary">
                              <Zap className="w-3 h-3 mr-1" />
                              {language === 'ar' ? 'تنفيذ' : 'Execute'}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

        </div>
      </RTLContainer>
    </div>
  );
}