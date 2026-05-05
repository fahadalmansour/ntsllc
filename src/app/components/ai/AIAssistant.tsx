import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Mic, MicOff, Settings, Download, Trash2, Copy } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';

interface AIAssistantProps {
  onNavigate?: (section: string) => void;
}

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function AIAssistant({ onNavigate }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m your NeoTechnology AI Assistant. I can help you with e-commerce development, code analysis, platform optimization, and technical support. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateTyping = () => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 1500);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    simulateTyping();

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: generateAIResponse(inputValue),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    }, 2000);
  };

  const generateAIResponse = (input: string): string => {
    const responses = [
      'I can help you optimize your e-commerce platform for better performance. Would you like me to analyze your current setup?',
      'For WordPress integration, I recommend using our automated deployment system. It can set up your store in under 4 hours.',
      'Based on your query, I suggest implementing our AI-powered product recommendation engine to increase sales by 25-40%.',
      'I can assist with code analysis and debugging. Please share your code snippet and I\'ll identify potential issues.',
      'Our Shopify integration supports automatic inventory management and order processing. Would you like me to configure it?',
      'For Arabic market expansion, I recommend implementing RTL support and Arabic payment gateways like STC Pay and Tamara.'
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const clearChat = () => {
    setMessages([{
      id: '1',
      type: 'assistant',
      content: 'Chat cleared. How can I help you today?',
      timestamp: new Date()
    }]);
  };

  const quickPrompts = [
    'Analyze my e-commerce performance',
    'Help me debug WordPress issues',
    'Optimize Shopify store speed',
    'Set up Arabic payment methods',
    'Generate product descriptions',
    'Review my website code'
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#C0C5CE] font-mono">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Bot className="w-8 h-8 text-[#00ff88] mr-3" />
            <div>
              <h1 className="text-[#C0C5CE] text-2xl font-semibold mb-1">AI Assistant</h1>
              <div className="flex items-center text-[#C0C5CE]/70 text-sm">
                <span className="text-[#00ff88] mr-2">{'>'}</span>
                <span>Your intelligent e-commerce development partner</span>
                <Badge variant="secondary" className="bg-[#00ff88]/20 text-[#00ff88] font-mono text-xs ml-3">
                  Online
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={clearChat}
              className="border-[#C0C5CE]/20 text-[#C0C5CE] hover:bg-red-400/10 hover:border-red-400/50 font-mono"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear Chat
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="border-[#C0C5CE]/20 text-[#C0C5CE] hover:bg-[#00ff88]/10 font-mono"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="border-[#C0C5CE]/20 text-[#C0C5CE] hover:bg-[#00d4ff]/10 font-mono"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Quick Actions Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-[#12151C] border-[#C0C5CE]/20 p-4 mb-4">
              <h3 className="text-[#00ff88] font-semibold mb-4 text-sm">Quick Prompts</h3>
              <div className="space-y-2">
                {quickPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => setInputValue(prompt)}
                    className="w-full text-left p-3 bg-[#0B0D12] border border-[#C0C5CE]/20 rounded text-[#C0C5CE] text-xs hover:border-[#00ff88]/50 hover:bg-[#00ff88]/5 transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </Card>

            <Card className="bg-[#12151C] border-[#C0C5CE]/20 p-4">
              <h3 className="text-[#00ff88] font-semibold mb-4 text-sm">Capabilities</h3>
              <div className="space-y-3">
                {[
                  'Code Analysis & Debugging',
                  'E-commerce Optimization',
                  'WordPress/Shopify Support',
                  'Arabic Market Guidance',
                  'Performance Monitoring',
                  'Security Best Practices'
                ].map((capability, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#00ff88] rounded-full"></div>
                    <span className="text-[#C0C5CE] text-xs">{capability}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="bg-[#12151C] border-[#C0C5CE]/20 h-[600px] flex flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-3 max-w-[80%] ${
                      message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.type === 'user' 
                          ? 'bg-[#00d4ff]/20 border border-[#00d4ff]/50' 
                          : 'bg-[#00ff88]/20 border border-[#00ff88]/50'
                      }`}>
                        {message.type === 'user' ? (
                          <User className="w-4 h-4 text-[#00d4ff]" />
                        ) : (
                          <Bot className="w-4 h-4 text-[#00ff88]" />
                        )}
                      </div>
                      
                      <div className={`rounded-lg p-4 ${
                        message.type === 'user'
                          ? 'bg-[#00d4ff]/10 border border-[#00d4ff]/20'
                          : 'bg-[#0B0D12] border border-[#C0C5CE]/20'
                      }`}>
                        <p className="text-[#C0C5CE] text-sm leading-relaxed">{message.content}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-[#C0C5CE]/50 text-xs">
                            {message.timestamp.toLocaleTimeString()}
                          </span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyMessage(message.content)}
                            className="h-6 w-6 p-0 text-[#C0C5CE]/50 hover:text-[#00ff88]"
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-[#00ff88]/20 border border-[#00ff88]/50 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-[#00ff88]" />
                      </div>
                      <div className="bg-[#0B0D12] border border-[#C0C5CE]/20 rounded-lg p-4">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-[#00ff88] rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-[#00ff88] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 bg-[#00ff88] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-[#C0C5CE]/20 p-4">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 relative">
                    <Input
                      ref={inputRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything about your e-commerce platform..."
                      className="bg-[#0B0D12] border-[#C0C5CE]/20 text-[#C0C5CE] placeholder-[#C0C5CE]/50 font-mono text-sm pr-12"
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setIsListening(!isListening)}
                      className={`absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 ${
                        isListening ? 'text-red-400' : 'text-[#C0C5CE]/50'
                      } hover:text-[#00ff88]`}
                    >
                      {isListening ? <MicOff className="w-3 h-3" /> : <Mic className="w-3 h-3" />}
                    </Button>
                  </div>
                  <Button
                    onClick={handleSend}
                    disabled={!inputValue.trim()}
                    className="bg-[#00ff88] text-[#0a0a0a] hover:bg-[#00ff88]/90 disabled:opacity-50 disabled:cursor-not-allowed font-mono"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex items-center justify-between mt-3">
                  <span className="text-[#C0C5CE]/50 text-xs">
                    Press Enter to send, Shift+Enter for new line
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#00ff88] rounded-full animate-pulse"></div>
                    <span className="text-[#00ff88] text-xs font-semibold">AI Ready</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIAssistant;