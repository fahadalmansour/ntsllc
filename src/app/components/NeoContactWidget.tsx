import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { 
  MessageCircle, 
  X, 
  ArrowLeft, 
  Mail, 
  Send, 
  Globe,
  Clock,
  CheckCircle,
  Bot,
  Zap,
  Star,
  User,
  Building2
} from 'lucide-react';

interface ContactWidgetProps {
  className?: string;
}

type WidgetState = 'collapsed' | 'expanded' | 'chat' | 'email' | 'whatsapp';
type Language = 'en' | 'ar';
type Region = 'usa' | 'saudi' | 'uae' | 'other';
type ServiceType = 'shopify' | 'woocommerce' | 'salla' | 'zid' | 'custom' | 'saas';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai' | 'system';
  timestamp: Date;
}

interface EmailForm {
  name: string;
  email: string;
  company: string;
  region: Region;
  service: ServiceType;
  message: string;
}

export function NeoContactWidget({ className = '' }: ContactWidgetProps) {
  const [state, setState] = useState<WidgetState>('collapsed');
  const [language, setLanguage] = useState<Language>('en');
  const [isOnline, setIsOnline] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [emailForm, setEmailForm] = useState<EmailForm>({
    name: '',
    email: '',
    company: '',
    region: 'usa',
    service: 'shopify',
    message: ''
  });

  const chatEndRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);

  // Auto-detect user region and language
  useEffect(() => {
    const detectUserPreferences = () => {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const browserLang = navigator.language.toLowerCase();
      
      if (browserLang.includes('ar')) {
        setLanguage('ar');
      }
      
      if (timezone.includes('Riyadh') || timezone.includes('Saudi')) {
        setEmailForm(prev => ({ ...prev, region: 'saudi' }));
      } else if (timezone.includes('Dubai') || timezone.includes('UAE')) {
        setEmailForm(prev => ({ ...prev, region: 'uae' }));
      }
    };

    detectUserPreferences();
  }, []);

  // Initialize chat with greeting
  useEffect(() => {
    if (state === 'chat' && chatMessages.length === 0) {
      const greeting = getSmartGreeting();
      setChatMessages([
        {
          id: '1',
          text: greeting,
          sender: 'ai',
          timestamp: new Date()
        }
      ]);
    }
  }, [state]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        if (state !== 'collapsed') {
          setState('collapsed');
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [state]);

  const getSmartGreeting = (): string => {
    const hour = new Date().getHours();
    const isArabic = language === 'ar';
    
    if (isArabic) {
      if (hour < 12) return 'صباح الخير! كيف يمكننا مساعدتك اليوم؟';
      if (hour < 17) return 'مساء الخير! مرحباً بك في NeoTechnology Solutions';
      return 'مساء الخير! نحن هنا لمساعدتك';
    }
    
    if (hour < 12) return 'Good morning! Ready to launch in 48 minutes?';
    if (hour < 17) return 'Good afternoon! Let\'s build something amazing';
    return 'Good evening! How can we help transform your business?';
  };

  const getServicePrice = (service: ServiceType, region: Region): string => {
    const prices = {
      shopify: region === 'saudi' || region === 'uae' ? '4,899 SAR' : '$1,299',
      woocommerce: region === 'saudi' || region === 'uae' ? '7,149 SAR' : '$1,899',
      salla: '7,499 SAR',
      zid: '6,749 SAR',
      custom: region === 'saudi' || region === 'uae' ? '18,799+ SAR' : '$4,999+',
      saas: region === 'saudi' || region === 'uae' ? '189-1,124 SAR/mo' : '$49-299/mo'
    };
    return prices[service];
  };

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: currentMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(currentMessage);
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setChatMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('shopify')) {
      return `Great choice! Shopify setup starts at ${getServicePrice('shopify', emailForm.region)}. Our 48-minute setup includes:\n• Complete store configuration\n• Payment gateway integration\n• Mobile-responsive design\n• SEO optimization\n\nWould you like to get started?`;
    }
    
    if (message.includes('salla') || message.includes('سلة')) {
      return `Perfect for the Saudi market! Salla integration is 7,499 SAR and includes:\n• Complete Arabic store setup\n• Mada payment integration\n• STC Pay & Tamara support\n• Local shipping configuration\n\nShall we begin your setup?`;
    }
    
    if (message.includes('price') || message.includes('cost') || message.includes('سعر')) {
      return `Here are our current pricing options:\n• Shopify: ${getServicePrice('shopify', emailForm.region)}\n• WooCommerce: ${getServicePrice('woocommerce', emailForm.region)}\n• Salla: 7,499 SAR\n• Zid: 6,749 SAR\n• Custom Development: ${getServicePrice('custom', emailForm.region)}\n\nAll include our 48-minute setup guarantee!`;
    }
    
    if (message.includes('time') || message.includes('fast') || message.includes('quick')) {
      return `Our signature 48-minute setup is 2000% faster than industry standard (30-60 days)! This includes:\n• Complete platform configuration\n• Payment integration\n• Design customization\n• Testing & launch\n\nReady to experience the speed?`;
    }
    
    return `Thanks for your message! I'm Neo AI, powered by Vertex AI. I can help with:\n• E-commerce platform quotes\n• 48-minute setup process\n• Technical questions\n• Platform recommendations\n\nWhat specific service interests you most?`;
  };

  const handleEmailSubmit = () => {
    console.log('Email submitted:', emailForm);
    // Here you would integrate with your email service
    alert('Thank you! We\'ll respond within 2-4 hours.');
    setState('collapsed');
  };

  const handleWhatsAppOpen = () => {
    const message = encodeURIComponent(`Hello! I'm interested in NeoTechnology Solutions services. I'd like to learn more about your 48-minute setup process.`);
    const whatsappUrl = `https://wa.me/+1234567890?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  // Collapsed State
  if (state === 'collapsed') {
    return (
      <div 
        ref={widgetRef}
        className={`fixed bottom-6 right-6 z-50 ${className}`}
      >
        <div className="relative">
          {/* Notification Badge */}
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#00ff88] text-[#0a0a0a] text-xs font-bold flex items-center justify-center border-2 border-[#0a0a0a] animate-pulse">
              {unreadCount}
            </Badge>
          )}
          
          {/* Main Button */}
          <Button
            onClick={() => setState('expanded')}
            className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#00ff88] hover:from-[#00ff88] hover:to-[#00d4ff] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 relative overflow-hidden"
            style={{
              boxShadow: '0 0 20px rgba(0, 212, 255, 0.4)'
            }}
            data-animation="pulse"
          >
            {/* Circuit Pattern Background */}
            <div className="absolute inset-0 opacity-20">
              <div className="w-full h-full" style={{
                backgroundImage: `
                  linear-gradient(90deg, #ffffff 1px, transparent 1px),
                  linear-gradient(180deg, #ffffff 1px, transparent 1px)
                `,
                backgroundSize: '8px 8px'
              }} />
            </div>
            
            <div className="relative flex flex-col items-center justify-center text-[#0a0a0a]">
              <MessageCircle className="w-6 h-6 mb-1" />
              <span className="text-xs font-bold" style={{ fontFamily: 'JetBrains Mono' }}>
                Neo
              </span>
            </div>
          </Button>
        </div>
        
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes neo-pulse {
              0%, 100% { box-shadow: 0 0 20px rgba(0, 212, 255, 0.4); }
              50% { box-shadow: 0 0 30px rgba(0, 212, 255, 0.6), 0 0 40px rgba(0, 255, 136, 0.3); }
            }
            [data-animation="pulse"] {
              animation: neo-pulse 3s ease-in-out infinite;
            }
          `
        }} />
      </div>
    );
  }

  // Expanded Hub State
  if (state === 'expanded') {
    return (
      <div 
        ref={widgetRef}
        className={`fixed bottom-6 right-6 z-50 ${className}`}
      >
        <Card className="w-[420px] h-[480px] bg-[#1a1a1a] border border-[#00d4ff]/30 shadow-2xl overflow-hidden backdrop-blur-lg">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-[#00d4ff]/20 bg-[#1a1a1a]/95">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>
              Neo Connect Hub
            </h3>
            <Button
              onClick={() => setState('collapsed')}
              variant="ghost"
              size="sm"
              className="text-[#00d4ff] hover:bg-[#00d4ff]/10"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Circuit Board Background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="w-full h-full" style={{
              backgroundImage: `
                radial-gradient(circle at 25% 25%, #00d4ff 2px, transparent 2px),
                radial-gradient(circle at 75% 75%, #00d4ff 2px, transparent 2px),
                linear-gradient(90deg, #00d4ff 1px, transparent 1px),
                linear-gradient(180deg, #00d4ff 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px, 40px 40px, 20px 20px, 20px 20px'
            }} />
          </div>

          {/* Content */}
          <div className="p-6 space-y-6 relative overflow-y-auto max-h-[500px]">
            <div className="text-center">
              <h4 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Space Grotesk' }}>
                How can we help you today?
              </h4>
              <p className="text-[#a0a0a0]" style={{ fontFamily: 'Inter' }}>
                Choose your preferred channel:
              </p>
            </div>

            {/* Live Chat Option */}
            <Card 
              className="bg-[#0a0a0a] border border-[#00d4ff]/20 p-4 hover:border-[#00d4ff] hover:bg-[#00d4ff]/5 transition-all duration-300 cursor-pointer group"
              onClick={() => setState('chat')}
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-[#00d4ff]/20 rounded-lg flex items-center justify-center group-hover:bg-[#00d4ff]/30 transition-colors">
                  <MessageCircle className="w-5 h-5 text-[#00d4ff]" />
                </div>
                <div className="flex-1">
                  <h5 className="font-bold text-white mb-1" style={{ fontFamily: 'Space Grotesk' }}>
                    Live Chat
                  </h5>
                  <p className="text-[#a0a0a0] text-sm mb-2" style={{ fontFamily: 'Inter' }}>
                    Instant support with Neo AI
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-[#00ff88]">
                    <span>Powered by Vertex AI</span>
                    <span>Average response: &lt; 30 seconds</span>
                  </div>
                </div>
              </div>
              <Button className="w-full mt-3 bg-[#00d4ff] text-[#0a0a0a] hover:bg-[#00ff88] font-mono">
                Start Chat →
              </Button>
            </Card>

            {/* Email Support Option */}
            <Card 
              className="bg-[#0a0a0a] border border-[#00d4ff]/20 p-4 hover:border-[#00d4ff] hover:bg-[#00d4ff]/5 transition-all duration-300 cursor-pointer group"
              onClick={() => setState('email')}
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-[#00d4ff]/20 rounded-lg flex items-center justify-center group-hover:bg-[#00d4ff]/30 transition-colors">
                  <Mail className="w-5 h-5 text-[#00d4ff]" />
                </div>
                <div className="flex-1">
                  <h5 className="font-bold text-white mb-1" style={{ fontFamily: 'Space Grotesk' }}>
                    Email Support
                  </h5>
                  <p className="text-[#a0a0a0] text-sm mb-2" style={{ fontFamily: 'Inter' }}>
                    support@neotechnology.solutions
                  </p>
                  <div className="text-xs text-[#00ff88]">
                    Response time: 2-4 hours
                  </div>
                </div>
              </div>
              <Button className="w-full mt-3 bg-[#00d4ff] text-[#0a0a0a] hover:bg-[#00ff88] font-mono">
                Send Email →
              </Button>
            </Card>

            {/* WhatsApp Option */}
            <Card 
              className="bg-[#0a0a0a] border border-[#00d4ff]/20 p-4 hover:border-[#00d4ff] hover:bg-[#00d4ff]/5 transition-all duration-300 cursor-pointer group"
              onClick={() => setState('whatsapp')}
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-[#00ff88]/20 rounded-lg flex items-center justify-center group-hover:bg-[#00ff88]/30 transition-colors">
                  <span className="text-lg">💚</span>
                </div>
                <div className="flex-1">
                  <h5 className="font-bold text-white mb-1" style={{ fontFamily: 'Space Grotesk' }}>
                    WhatsApp Business
                  </h5>
                  <p className="text-[#a0a0a0] text-sm mb-2" style={{ fontFamily: 'Inter' }}>
                    Quick connect for all regions
                  </p>
                  <div className="text-xs text-[#00ff88]">
                    🇺🇸 🇸🇦 🇦🇪 Available 24/7
                  </div>
                </div>
              </div>
              <Button className="w-full mt-3 bg-[#00ff88] text-[#0a0a0a] hover:bg-[#00d4ff] font-mono">
                Open WhatsApp →
              </Button>
            </Card>

            {/* Status Indicator */}
            <div className="flex items-center justify-center space-x-2 text-sm">
              <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-[#00ff88] animate-pulse' : 'bg-yellow-500'}`} />
              <span className="text-[#a0a0a0]" style={{ fontFamily: 'JetBrains Mono' }}>
                {isOnline ? 'Online | Fahad\'s team is ready' : 'High Volume - 5 min wait'}
              </span>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Chat Interface
  if (state === 'chat') {
    return (
      <div 
        ref={widgetRef}
        className={`fixed bottom-6 right-6 z-50 ${className}`}
      >
        <Card className="w-[420px] h-[480px] bg-[#1a1a1a] border border-[#00d4ff]/30 shadow-2xl overflow-hidden backdrop-blur-lg flex flex-col">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b border-[#00d4ff]/20 bg-[#1a1a1a]/95">
            <div className="flex items-center space-x-3">
              <Button
                onClick={() => setState('expanded')}
                variant="ghost"
                size="sm"
                className="text-[#00d4ff] hover:bg-[#00d4ff]/10"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div className="flex items-center space-x-2">
                <Bot className="w-5 h-5 text-[#00ff88]" />
                <span className="font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>
                  Live Chat
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                onClick={toggleLanguage}
                variant="ghost"
                size="sm"
                className="text-[#00d4ff] hover:bg-[#00d4ff]/10 font-mono text-xs"
              >
                🌐 {language.toUpperCase()}
              </Button>
              <Button
                onClick={() => setState('collapsed')}
                variant="ghost"
                size="sm"
                className="text-[#00d4ff] hover:bg-[#00d4ff]/10"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-[#00d4ff] text-[#0a0a0a]'
                      : message.sender === 'ai'
                      ? 'bg-[#0a0a0a] text-white border border-[#00ff88]/20'
                      : 'bg-transparent text-[#a0a0a0] text-center'
                  }`}
                  style={{ fontFamily: message.sender === 'ai' ? 'JetBrains Mono' : 'Inter' }}
                >
                  {message.sender === 'ai' && (
                    <div className="flex items-center space-x-2 mb-2">
                      <Bot className="w-4 h-4 text-[#00ff88]" />
                      <span className="text-xs text-[#00ff88]">Neo AI Assistant</span>
                    </div>
                  )}
                  <div className="whitespace-pre-wrap text-sm">{message.text}</div>
                  <div className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-[#0a0a0a] border border-[#00ff88]/20 p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Bot className="w-4 h-4 text-[#00ff88]" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-[#00ff88] rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-[#00ff88] rounded-full animate-bounce-delay-1" />
                      <div className="w-2 h-2 bg-[#00ff88] rounded-full animate-bounce-delay-2" />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="p-3 border-t border-[#00d4ff]/20">
            <div className="grid grid-cols-2 gap-2 mb-3">
              <Button
                size="sm"
                variant="outline"
                className="border-[#00d4ff]/30 text-[#00d4ff] hover:bg-[#00d4ff]/10 font-mono text-xs"
                onClick={() => setCurrentMessage('I need Shopify setup')}
              >
                Shopify {getServicePrice('shopify', emailForm.region)}
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-[#00d4ff]/30 text-[#00d4ff] hover:bg-[#00d4ff]/10 font-mono text-xs"
                onClick={() => setCurrentMessage('Tell me about Salla')}
              >
                Salla Setup
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-[#00d4ff]/30 text-[#00d4ff] hover:bg-[#00d4ff]/10 font-mono text-xs"
                onClick={() => setCurrentMessage('I need a custom quote')}
              >
                Custom Quote
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-[#00d4ff]/30 text-[#00d4ff] hover:bg-[#00d4ff]/10 font-mono text-xs"
                onClick={() => setCurrentMessage('48-minute setup info')}
              >
                48min Setup
              </Button>
            </div>
            
            {/* Message Input */}
            <div className="flex items-center space-x-2">
              <Input
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-[#0a0a0a] border-[#00d4ff]/20 text-white placeholder-[#a0a0a0] font-mono"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button
                onClick={handleSendMessage}
                size="sm"
                className="bg-[#00d4ff] text-[#0a0a0a] hover:bg-[#00ff88]"
                disabled={!currentMessage.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Email Form
  if (state === 'email') {
    return (
      <div 
        ref={widgetRef}
        className={`fixed bottom-6 right-6 z-50 ${className}`}
      >
        <Card className="w-[420px] h-[580px] bg-[#1a1a1a] border border-[#00d4ff]/30 shadow-2xl overflow-hidden backdrop-blur-lg">
          {/* Email Header */}
          <div className="flex items-center justify-between p-4 border-b border-[#00d4ff]/20 bg-[#1a1a1a]/95">
            <div className="flex items-center space-x-3">
              <Button
                onClick={() => setState('expanded')}
                variant="ghost"
                size="sm"
                className="text-[#00d4ff] hover:bg-[#00d4ff]/10"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-[#00d4ff]" />
                <span className="font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>
                  Email Support
                </span>
              </div>
            </div>
            <Button
              onClick={() => setState('collapsed')}
              variant="ghost"
              size="sm"
              className="text-[#00d4ff] hover:bg-[#00d4ff]/10"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Email Form */}
          <div className="p-6 space-y-4 overflow-y-auto">
            <div className="text-center mb-4">
              <div className="font-mono text-[#00d4ff] text-sm mb-2">
                <span className="text-[#00ff88]">{'>'}</span> contact.initialize()
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-1">Name</label>
                <Input
                  value={emailForm.name}
                  onChange={(e) => setEmailForm(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-[#0a0a0a] border-[#00d4ff]/20 text-white"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-1">Email</label>
                <Input
                  type="email"
                  value={emailForm.email}
                  onChange={(e) => setEmailForm(prev => ({ ...prev, email: e.target.value }))}
                  className="bg-[#0a0a0a] border-[#00d4ff]/20 text-white"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-1">Company</label>
                <Input
                  value={emailForm.company}
                  onChange={(e) => setEmailForm(prev => ({ ...prev, company: e.target.value }))}
                  className="bg-[#0a0a0a] border-[#00d4ff]/20 text-white"
                  placeholder="Your company name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Your Region</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'usa', label: 'USA' },
                    { id: 'saudi', label: 'Saudi Arabia' },
                    { id: 'uae', label: 'UAE' },
                    { id: 'other', label: 'Other' }
                  ].map((region) => (
                    <Button
                      key={region.id}
                      variant={emailForm.region === region.id ? 'default' : 'outline'}
                      size="sm"
                      className={emailForm.region === region.id 
                        ? 'bg-[#00d4ff] text-[#0a0a0a]' 
                        : 'border-[#00d4ff]/30 text-[#00d4ff] hover:bg-[#00d4ff]/10'
                      }
                      onClick={() => setEmailForm(prev => ({ ...prev, region: region.id as Region }))}
                    >
                      {region.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Service Interest</label>
                <div className="space-y-2">
                  {[
                    { id: 'shopify', label: `Shopify (${getServicePrice('shopify', emailForm.region)})` },
                    { id: 'woocommerce', label: `WooCommerce (${getServicePrice('woocommerce', emailForm.region)})` },
                    { id: 'salla', label: 'Salla (7,499 SAR)' },
                    { id: 'zid', label: 'Zid (6,749 SAR)' },
                    { id: 'custom', label: `Custom Development (${getServicePrice('custom', emailForm.region)})` },
                    { id: 'saas', label: 'SaaS Platforms' }
                  ].map((service) => (
                    <Button
                      key={service.id}
                      variant={emailForm.service === service.id ? 'default' : 'outline'}
                      size="sm"
                      className={`w-full justify-start font-mono text-xs ${
                        emailForm.service === service.id 
                          ? 'bg-[#00d4ff] text-[#0a0a0a]' 
                          : 'border-[#00d4ff]/30 text-[#00d4ff] hover:bg-[#00d4ff]/10'
                      }`}
                      onClick={() => setEmailForm(prev => ({ ...prev, service: service.id as ServiceType }))}
                    >
                      {emailForm.service === service.id ? '◉' : '○'} {service.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-1">Message</label>
                <Textarea
                  value={emailForm.message}
                  onChange={(e) => setEmailForm(prev => ({ ...prev, message: e.target.value }))}
                  className="bg-[#0a0a0a] border-[#00d4ff]/20 text-white min-h-[80px]"
                  placeholder="Tell us about your project requirements..."
                />
              </div>

              <Button
                onClick={handleEmailSubmit}
                className="w-full bg-[#00d4ff] text-[#0a0a0a] hover:bg-[#00ff88] font-mono"
                disabled={!emailForm.name || !emailForm.email || !emailForm.message}
              >
                <Send className="w-4 h-4 mr-2" />
                Send Message →
              </Button>

              <div className="flex items-center justify-center space-x-2 text-sm text-[#00ff88]">
                <CheckCircle className="w-4 h-4" />
                <span style={{ fontFamily: 'JetBrains Mono' }}>
                  Responses within 2-4 hours
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // WhatsApp Interface
  if (state === 'whatsapp') {
    return (
      <div 
        ref={widgetRef}
        className={`fixed bottom-6 right-6 z-50 ${className}`}
      >
        <Card className="w-[420px] h-[480px] bg-[#1a1a1a] border border-[#00d4ff]/30 shadow-2xl overflow-hidden backdrop-blur-lg">
          {/* WhatsApp Header */}
          <div className="flex items-center justify-between p-4 border-b border-[#00d4ff]/20 bg-[#1a1a1a]/95">
            <div className="flex items-center space-x-3">
              <Button
                onClick={() => setState('expanded')}
                variant="ghost"
                size="sm"
                className="text-[#00d4ff] hover:bg-[#00d4ff]/10"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div className="flex items-center space-x-2">
                <span className="text-xl">💚</span>
                <span className="font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>
                  WhatsApp Business
                </span>
              </div>
            </div>
            <Button
              onClick={() => setState('collapsed')}
              variant="ghost"
              size="sm"
              className="text-[#00d4ff] hover:bg-[#00d4ff]/10"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* WhatsApp Content */}
          <div className="p-6 space-y-6 text-center">
            <div className="text-6xl mb-4">💚</div>
            
            <div>
              <h4 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Space Grotesk' }}>
                Connect via WhatsApp
              </h4>
              <p className="text-[#a0a0a0] mb-6" style={{ fontFamily: 'Inter' }}>
                One number for all markets
              </p>
            </div>

            <Card className="bg-[#0a0a0a] border border-[#00ff88]/20 p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Globe className="w-5 h-5 text-[#00ff88]" />
                  <span className="font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>
                    Global Support
                  </span>
                </div>
                
                <div className="space-y-2 text-sm text-[#a0a0a0]">
                  <div className="flex items-center justify-center space-x-2">
                    <span>🇺🇸</span>
                    <span>USA Clients</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <span>🇸🇦</span>
                    <span>Saudi Arabia (عربي)</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <span>🇦🇪</span>
                    <span>UAE Markets</span>
                  </div>
                </div>
                
                <div className="border-t border-[#00ff88]/20 pt-4">
                  <div className="flex items-center justify-center space-x-2 text-[#00ff88]">
                    <Clock className="w-4 h-4" />
                    <span className="font-mono text-sm">Available 24/7</span>
                  </div>
                  <p className="text-xs text-[#a0a0a0] mt-1">
                    Support in English & Arabic
                  </p>
                </div>
              </div>
            </Card>

            <Button
              onClick={handleWhatsAppOpen}
              className="w-full bg-[#00ff88] text-[#0a0a0a] hover:bg-[#00d4ff] font-mono py-3 text-lg"
            >
              Open WhatsApp →
            </Button>

            <div className="mt-6">
              <h5 className="text-sm font-bold text-white mb-3" style={{ fontFamily: 'Space Grotesk' }}>
                Quick Message Templates:
              </h5>
              <div className="space-y-2">
                {[
                  { text: 'I need Shopify setup', icon: '🛍️' },
                  { text: 'أريد متجر سلة', icon: '🛒' },
                  { text: 'Custom quote request', icon: '💼' },
                  { text: '48-minute setup info', icon: '⚡' }
                ].map((template, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="w-full border-[#00d4ff]/30 text-[#00d4ff] hover:bg-[#00d4ff]/10 font-mono text-xs justify-start"
                    onClick={() => {
                      const message = encodeURIComponent(`${template.text} - I'd like to learn more about NeoTechnology Solutions.`);
                      const whatsappUrl = `https://wa.me/+1234567890?text=${message}`;
                      window.open(whatsappUrl, '_blank');
                    }}
                  >
                    <span className="mr-2">{template.icon}</span>
                    {template.text}
                  </Button>
                ))}
              </div>
            </div>

            <div className="text-center text-xs text-[#a0a0a0] border-t border-[#00d4ff]/20 pt-4 font-mono">
              Founded by Fahad Almansour<br />
              Wyoming, USA | Serving Globally
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return null;
}