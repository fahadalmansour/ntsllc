import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  MessageCircle, 
  Eye, 
  MousePointer2, 
  Cursor,
  User,
  Crown,
  Wifi,
  WifiOff,
  Bell,
  Send,
  Smile,
  MoreHorizontal,
  Settings,
  UserPlus,
  Volume2,
  VolumeX
} from 'lucide-react';
import { Avatar } from '../ui/avatar';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { useAuth } from '../contexts/AuthContext';

interface CollaboratorCursor {
  id: string;
  x: number;
  y: number;
  user: {
    id: string;
    name: string;
    avatar?: string;
    color: string;
    role: 'owner' | 'admin' | 'member' | 'viewer';
  };
  lastUpdate: number;
  active: boolean;
}

interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  message: string;
  timestamp: Date;
  type: 'message' | 'system' | 'reaction';
  reactions?: { emoji: string; users: string[] }[];
}

interface CollaborationSession {
  id: string;
  name: string;
  isActive: boolean;
  activeUsers: number;
  totalUsers: number;
  createdAt: Date;
  lastActivity: Date;
}

const CURSOR_COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
  '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
];

export function RealTimeCollaboration() {
  const { user } = useAuth();
  const [isCollaborationOpen, setIsCollaborationOpen] = useState(false);
  const [cursors, setCursors] = useState<CollaboratorCursor[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [activeUsers, setActiveUsers] = useState<number>(1);
  const [session, setSession] = useState<CollaborationSession | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showCursors, setShowCursors] = useState(true);
  const [showChat, setShowChat] = useState(true);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<WebSocket | null>(null);

  // Initialize collaboration session
  useEffect(() => {
    if (user) {
      const sessionData: CollaborationSession = {
        id: 'demo-session-' + Date.now(),
        name: 'Neo Technology Dashboard',
        isActive: true,
        activeUsers: Math.floor(Math.random() * 5) + 1,
        totalUsers: Math.floor(Math.random() * 20) + 5,
        createdAt: new Date(),
        lastActivity: new Date()
      };
      setSession(sessionData);
      setActiveUsers(sessionData.activeUsers);
    }
  }, [user]);

  // Simulate WebSocket connection
  useEffect(() => {
    if (!user) return;

    // Simulate connection
    setTimeout(() => setIsConnected(true), 1000);

    // Simulate other users' cursors
    const simulateCursors = () => {
      const mockCursors: CollaboratorCursor[] = [];
      const userCount = Math.floor(Math.random() * 4) + 1;
      
      for (let i = 0; i < userCount; i++) {
        mockCursors.push({
          id: `user-${i}`,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          user: {
            id: `user-${i}`,
            name: ['Alex Chen', 'Sarah Kim', 'Marcus Rodriguez', 'Emily Johnson'][i] || 'Anonymous',
            color: CURSOR_COLORS[i % CURSOR_COLORS.length],
            role: i === 0 ? 'admin' : 'member'
          },
          lastUpdate: Date.now(),
          active: Math.random() > 0.3
        });
      }
      
      setCursors(mockCursors);
    };

    // Initial cursors
    simulateCursors();

    // Update cursors periodically
    const cursorInterval = setInterval(() => {
      setCursors(prev => prev.map(cursor => ({
        ...cursor,
        x: Math.max(0, Math.min(window.innerWidth, cursor.x + (Math.random() - 0.5) * 100)),
        y: Math.max(0, Math.min(window.innerHeight, cursor.y + (Math.random() - 0.5) * 100)),
        lastUpdate: Date.now(),
        active: Math.random() > 0.2
      })));
    }, 2000);

    // Simulate chat messages
    const chatMessages = [
      "Welcome to the collaborative session!",
      "The dashboard looks great! 🚀",
      "I love the terminal theme",
      "Can we add more analytics widgets?",
      "The performance metrics are impressive"
    ];

    let messageIndex = 0;
    const messageInterval = setInterval(() => {
      if (messageIndex < chatMessages.length) {
        const randomUser = ['Alex Chen', 'Sarah Kim', 'Marcus Rodriguez'][Math.floor(Math.random() * 3)];
        addChatMessage({
          id: `msg-${Date.now()}`,
          userId: `user-${Math.floor(Math.random() * 3)}`,
          userName: randomUser,
          message: chatMessages[messageIndex],
          timestamp: new Date(),
          type: 'message'
        });
        messageIndex++;
      }
    }, 8000);

    return () => {
      clearInterval(cursorInterval);
      clearInterval(messageInterval);
    };
  }, [user]);

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const addChatMessage = useCallback((message: ChatMessage) => {
    setChatMessages(prev => [...prev, message].slice(-50)); // Keep last 50 messages
    
    if (soundEnabled && message.userId !== user?.uid) {
      // Play notification sound (you could add actual audio here)
      console.log('🔔 New message sound');
    }
  }, [soundEnabled, user?.uid]);

  const sendMessage = useCallback(() => {
    if (!newMessage.trim() || !user) return;

    const message: ChatMessage = {
      id: `msg-${Date.now()}`,
      userId: user.uid,
      userName: user.displayName || 'You',
      userAvatar: user.photoURL || undefined,
      message: newMessage.trim(),
      timestamp: new Date(),
      type: 'message'
    };

    addChatMessage(message);
    setNewMessage('');
  }, [newMessage, user, addChatMessage]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }, [sendMessage]);

  if (!user) return null;

  return (
    <>
      {/* Collaboration Cursors */}
      {showCursors && (
        <div className="fixed inset-0 pointer-events-none z-40">
          <AnimatePresence>
            {cursors.filter(cursor => cursor.active).map((cursor) => (
              <motion.div
                key={cursor.id}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  x: cursor.x,
                  y: cursor.y
                }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="absolute pointer-events-none"
                style={{ left: -10, top: -10 }}
              >
                <div className="relative">
                  <MousePointer2 
                    className="w-5 h-5" 
                    style={{ color: cursor.user.color }}
                    fill={cursor.user.color}
                  />
                  <div 
                    className="absolute left-3 top-1 px-2 py-1 rounded text-xs font-mono whitespace-nowrap shadow-lg"
                    style={{ backgroundColor: cursor.user.color, color: 'white' }}
                  >
                    {cursor.user.name}
                    {cursor.user.role === 'admin' && <Crown className="w-3 h-3 inline ml-1" />}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Collaboration Status Bar */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-16 right-4 z-30"
      >
        <div className="bg-[#12151C] border border-[#C0C5CE]/20 rounded-lg p-3 shadow-lg">
          <div className="flex items-center space-x-3">
            {/* Connection Status */}
            <div className="flex items-center space-x-2">
              {isConnected ? (
                <Wifi className="w-4 h-4 text-green-400" />
              ) : (
                <WifiOff className="w-4 h-4 text-red-400" />
              )}
              <span className={`font-mono text-sm ${isConnected ? 'text-green-400' : 'text-red-400'}`}>
                {isConnected ? 'Connected' : 'Connecting...'}
              </span>
            </div>

            {/* Active Users */}
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-[#4AE54A]" />
              <span className="text-[#C0C5CE] font-mono text-sm">{activeUsers} online</span>
            </div>

            {/* Collaboration Controls */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCollaborationOpen(!isCollaborationOpen)}
                className="text-[#C0C5CE] hover:text-[#4AE54A] p-1"
              >
                <MessageCircle className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCursors(!showCursors)}
                className={`p-1 ${showCursors ? 'text-[#4AE54A]' : 'text-[#C0C5CE]'}`}
              >
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Collaboration Panel */}
      <AnimatePresence>
        {isCollaborationOpen && (
          <motion.div
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            className="fixed top-16 right-4 w-80 h-[70vh] bg-[#12151C] border border-[#C0C5CE]/20 rounded-lg shadow-xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#C0C5CE]/20">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-[#4AE54A]" />
                <h3 className="text-[#4AE54A] font-mono text-lg">Collaboration</h3>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={`p-1 ${soundEnabled ? 'text-[#4AE54A]' : 'text-[#C0C5CE]'}`}
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsCollaborationOpen(false)}
                  className="text-[#C0C5CE] hover:text-[#4AE54A] p-1"
                >
                  ×
                </Button>
              </div>
            </div>

            {/* Active Users */}
            <div className="p-4 border-b border-[#C0C5CE]/20">
              <div className="space-y-2">
                {/* Current User */}
                <div className="flex items-center space-x-3 p-2 bg-[#4AE54A]/10 rounded">
                  <Avatar className="w-6 h-6">
                    <div className="w-6 h-6 bg-[#4AE54A] rounded-full flex items-center justify-center">
                      <User className="w-3 h-3 text-[#0B0D12]" />
                    </div>
                  </Avatar>
                  <div className="flex-1">
                    <div className="text-[#4AE54A] font-mono text-sm">You</div>
                    <div className="text-[#C0C5CE]/70 font-mono text-xs">Owner</div>
                  </div>
                  <Crown className="w-4 h-4 text-yellow-400" />
                </div>

                {/* Other Users */}
                {cursors.slice(0, 3).map((cursor) => (
                  <div key={cursor.id} className="flex items-center space-x-3 p-2 rounded">
                    <Avatar className="w-6 h-6">
                      <div 
                        className="w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: cursor.user.color }}
                      >
                        <User className="w-3 h-3 text-white" />
                      </div>
                    </Avatar>
                    <div className="flex-1">
                      <div className="text-[#C0C5CE] font-mono text-sm">{cursor.user.name}</div>
                      <div className="text-[#C0C5CE]/70 font-mono text-xs capitalize">{cursor.user.role}</div>
                    </div>
                    {cursor.active && (
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Messages */}
            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-3"
            >
              {chatMessages.map((message) => (
                <div key={message.id} className="space-y-1">
                  {message.type === 'system' ? (
                    <div className="text-center">
                      <span className="text-[#C0C5CE]/60 font-mono text-xs bg-[#C0C5CE]/10 px-2 py-1 rounded">
                        {message.message}
                      </span>
                    </div>
                  ) : (
                    <div className={`${message.userId === user.uid ? 'text-right' : 'text-left'}`}>
                      <div className="text-[#C0C5CE]/70 font-mono text-xs mb-1">
                        {message.userName} • {message.timestamp.toLocaleTimeString()}
                      </div>
                      <div 
                        className={`inline-block p-2 rounded-lg max-w-[80%] font-mono text-sm ${
                          message.userId === user.uid 
                            ? 'bg-[#4AE54A] text-[#0B0D12]' 
                            : 'bg-[#0B0D12] text-[#C0C5CE] border border-[#C0C5CE]/20'
                        }`}
                      >
                        {message.message}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-[#C0C5CE]/20">
              <div className="flex items-center space-x-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  className="bg-[#0B0D12] border-[#C0C5CE]/20 text-[#C0C5CE] font-mono text-sm"
                />
                <Button
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-[#4AE54A] text-[#0B0D12] hover:bg-[#4AE54A]/90 p-2"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default RealTimeCollaboration;