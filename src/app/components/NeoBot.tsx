import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageCircle, 
  Bot, 
  User, 
  Send, 
  Settings,
  Minimize2,
  Maximize2,
  X,
  MoreHorizontal,
  Smile,
  Paperclip,
  Image,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Coffee,
  Code,
  Globe,
  Zap,
  Star,
  Heart,
  ThumbsUp,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar } from './ui/avatar';

interface ChatMessage {
  id: string;
  type: 'user' | 'bot' | 'system';
  content: string;
  timestamp: Date;
  status?: 'sending' | 'sent' | 'delivered' | 'read';
  reactions?: Array<{ emoji: string; count: number; users: string[] }>;
  quickReplies?: string[];
}

interface BotPersonality {
  name: string;
  role: string;
  avatar: string;
  greeting: string;
  traits: string[];
}

export function NeoBot() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [currentPersonality, setCurrentPersonality] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const personalities: BotPersonality[] = [
    {
      name: 'Neo',
      role: 'Technical Assistant',
      avatar: '🤖',
      greeting: 'Hello! I\'m Neo, your technical assistant. Ready to help with any development questions!',
      traits: ['Technical', 'Helpful', 'Precise']
    },
    {
      name: 'Luna',
      role: 'Creative Guide',
      avatar: '🌙',
      greeting: 'Hi there! I\'m Luna, here to spark your creativity and guide your projects to success!',
      traits: ['Creative', 'Inspiring', 'Friendly']
    },
    {
      name: 'Sage',
      role: 'Knowledge Expert',
      avatar: '🧙‍♂️',
      greeting: 'Greetings! I\'m Sage, your knowledge expert. Let\'s explore the depths of technology together!',
      traits: ['Wise', 'Comprehensive', 'Patient']
    }
  ];

  const quickReplies = [
    "How do I get started?",
    "Show me examples",
    "Explain this feature",
    "What's new?",
    "Help with deployment",
    "Troubleshoot issue"
  ];

  const emojis = ['👍', '❤️', '😊', '🚀', '💡', '🔥', '✨', '🎉'];

  useEffect(() => {
    const bot = personalities[currentPersonality];
    setMessages([
      {
        id: '1',
        type: 'system',
        content: `> NeoBot terminal initialized...
> Personality module loaded: ${bot.name} (${bot.role})
> Connection established`,
        timestamp: new Date()
      },
      {
        id: '2',
        type: 'bot',
        content: bot.greeting,
        timestamp: new Date(),
        quickReplies: quickReplies.slice(0, 3)
      }
    ]);
  }, [currentPersonality]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
      status: 'sent'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot typing and response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const generateBotResponse = (input: string): ChatMessage => {
    const bot = personalities[currentPersonality];
    const lowerInput = input.toLowerCase();
    
    const responses = {
      greeting: [
        `Hello! ${bot.name} here. How can I assist you with your NeoTechnology projects today?`,
        `Hey there! Ready to dive into some amazing tech solutions? Let's go!`,
        `Hi! I'm excited to help you build something incredible. What's on your mind?`
      ],
      help: [
        `I'm here to help! I can assist with:
• Platform setup and configuration
• Code examples and best practices
• Deployment guidance
• Troubleshooting issues
• Feature explanations

What would you like to explore?`,
        `Absolutely! I can guide you through any aspect of our platform. What specific area would you like help with?`,
        `Let me help you out! Whether it's technical questions, setup guidance, or creative ideas, I'm here for you.`
      ],
      features: [
        `Our platform offers amazing features:
🚀 NeoBuilder AI - AI-powered website generation
💬 NeoBot (that's me!) - Interactive assistance
🧠 NeoAssistant AI - Technical support
🔧 Multi-platform deployment
🎨 Custom integrations

Which one interests you most?`,
        `Great question! We have a comprehensive suite of tools designed to streamline your development process. What type of project are you working on?`
      ],
      compliment: [
        `Aww, thank you! That made my circuits happy! 😊 How can I help make your day even better?`,
        `You're pretty awesome yourself! Now, what exciting project can we work on together?`,
        `Thanks for the kind words! Ready to build something amazing?`
      ]
    };

    let responseType = 'default';
    let quickReplies: string[] = [];

    if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
      responseType = 'greeting';
      quickReplies = ['Show me features', 'Get started', 'Help me choose'];
    } else if (lowerInput.includes('help') || lowerInput.includes('assist') || lowerInput.includes('support')) {
      responseType = 'help';
      quickReplies = ['Platform setup', 'Code examples', 'Deployment help'];
    } else if (lowerInput.includes('feature') || lowerInput.includes('what can') || lowerInput.includes('capabilities')) {
      responseType = 'features';
      quickReplies = ['NeoBuilder AI', 'Multi-platform deployment', 'Learn more'];
    } else if (lowerInput.includes('good') || lowerInput.includes('great') || lowerInput.includes('awesome') || lowerInput.includes('love')) {
      responseType = 'compliment';
      quickReplies = ['Show examples', 'Start project', 'Tell me more'];
    }

    const responseArray = responses[responseType as keyof typeof responses] || [
      `That's interesting! Tell me more about what you're trying to accomplish.`,
      `I understand what you're looking for. Let me provide some guidance on that.`,
      `Great question! Here's what I know about that topic...`,
      `Let me help you with that! Based on your request, I'd recommend...`
    ];

    const selectedResponse = responseArray[Math.floor(Math.random() * responseArray.length)];

    return {
      id: Date.now().toString(),
      type: 'bot',
      content: selectedResponse,
      timestamp: new Date(),
      quickReplies: quickReplies.length > 0 ? quickReplies : undefined
    };
  };

  const handleQuickReply = (reply: string) => {
    setInputValue(reply);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const addReaction = (messageId: string, emoji: string) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const reactions = msg.reactions || [];
        const existingReaction = reactions.find(r => r.emoji === emoji);
        
        if (existingReaction) {
          existingReaction.count += 1;
          existingReaction.users.push('user');
        } else {
          reactions.push({ emoji, count: 1, users: ['user'] });
        }
        
        return { ...msg, reactions };
      }
      return msg;
    }));
  };

  const switchPersonality = () => {
    const nextPersonality = (currentPersonality + 1) % personalities.length;
    setCurrentPersonality(nextPersonality);
  };

  const currentBot = personalities[currentPersonality];

  if (isMinimized) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={(e) => {
            e.preventDefault();
            const options = [
              { label: "1. Continue with chat", action: () => setIsMinimized(false) },
              { label: "2. Email us", action: () => window.open("mailto:support@neotechnology.solutions?subject=Support Request&body=Hello, I need assistance with...") },
              { label: "3. WhatsApp", action: () => window.open("https://wa.me/1234567890?text=Hello, I need help with...") }
            ];
            
            const choice = window.prompt(
              "How would you like to get help?\n\n" + 
              options.map(opt => opt.label).join("\n") + 
              "\n\nEnter 1, 2, or 3:"
            );
            
            const selectedOption = options.find(opt => opt.label.startsWith(choice));
            if (selectedOption) {
              selectedOption.action();
            }
          }}
          className="bg-[#4AE54A] text-[#0B0D12] hover:bg-[#4AE54A]/90 rounded-full w-16 h-16 shadow-lg"
        >
          <MessageCircle className="w-8 h-8" />
        </Button>
      </motion.div>
    );
  }

  return null;
}

export default NeoBot;