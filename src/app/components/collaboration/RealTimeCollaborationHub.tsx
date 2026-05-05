import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar } from '../ui/avatar';
import { useLanguage } from '../../contexts/LanguageContext';
import { RTLContainer } from '../LanguageSwitcher';
import { 
  Users, 
  MessageSquare,
  Video,
  Share,
  Edit,
  Eye,
  Clock,
  Bell,
  Settings,
  Zap,
  Activity,
  Globe,
  Wifi,
  WifiOff,
  UserCheck,
  UserX,
  Send,
  Paperclip,
  Smile,
  MoreHorizontal,
  Phone,
  Monitor,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Volume2,
  VolumeX,
  FileText,
  Code,
  Image,
  Download
} from 'lucide-react';

interface CollaborationUser {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'away' | 'busy' | 'offline';
  role: string;
  location: string;
  timezone: string;
  currentActivity: string;
  lastSeen: Date;
  isTyping: boolean;
  cursor?: { x: number; y: number; color: string };
}

interface ChatMessage {
  id: string;
  userId: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'file' | 'code' | 'system';
  reactions?: { emoji: string; users: string[] }[];
  edited?: boolean;
  attachments?: { name: string; type: string; size: number; url: string }[];
}

interface ActiveSession {
  id: string;
  type: 'screen-share' | 'video-call' | 'code-review' | 'whiteboard';
  title: string;
  participants: string[];
  host: string;
  startTime: Date;
  duration: number;
  status: 'active' | 'paused' | 'ended';
}

interface ActivityFeed {
  id: string;
  userId: string;
  action: string;
  target: string;
  timestamp: Date;
  details?: string;
}

export default function RealTimeCollaborationHub({ onNavigate }: { onNavigate?: (section: string) => void }) {
  const { isRTL, language } = useLanguage();
  
  const [users, setUsers] = useState<CollaborationUser[]>([
    {
      id: 'user-001',
      name: 'Fahad Almansour',
      avatar: '👨‍💼',
      status: 'online',
      role: 'Founder & CEO',
      location: 'Wyoming, USA',
      timezone: 'GMT-7',
      currentActivity: 'Reviewing security implementation',
      lastSeen: new Date(),
      isTyping: false,
      cursor: { x: 450, y: 200, color: '#00d4ff' }
    },
    {
      id: 'user-002',
      name: 'Sarah Mitchell',
      avatar: '👩‍💻',
      status: 'online',
      role: 'Lead Developer',
      location: 'California, USA',
      timezone: 'GMT-8',
      currentActivity: 'Working on deployment pipeline',
      lastSeen: new Date(),
      isTyping: true,
      cursor: { x: 320, y: 150, color: '#00ff88' }
    },
    {
      id: 'user-003',
      name: 'Ahmed Al-Rashid',
      avatar: '👨‍💻',
      status: 'busy',
      role: 'Senior Frontend Developer',
      location: 'Dubai, UAE',
      timezone: 'GMT+4',
      currentActivity: 'Code review session',
      lastSeen: new Date(Date.now() - 300000),
      isTyping: false,
      cursor: { x: 180, y: 350, color: '#ffeb3b' }
    },
    {
      id: 'user-004',
      name: 'Maria Rodriguez',
      avatar: '👩‍🎨',
      status: 'away',
      role: 'UX/UI Designer',
      location: 'Barcelona, Spain',
      timezone: 'GMT+1',
      currentActivity: 'Design system updates',
      lastSeen: new Date(Date.now() - 900000),
      isTyping: false
    }
  ]);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-001',
      userId: 'user-002',
      content: 'The new security center looks amazing! The real-time threat detection is working perfectly.',
      timestamp: new Date(Date.now() - 600000),
      type: 'text'
    },
    {
      id: 'msg-002',
      userId: 'user-001',
      content: 'Thanks Sarah! The team did an excellent job. How\'s the deployment pipeline coming along?',
      timestamp: new Date(Date.now() - 480000),
      type: 'text',
      reactions: [{ emoji: '👍', users: ['user-002', 'user-003'] }]
    },
    {
      id: 'msg-003',
      userId: 'user-003',
      content: 'I\'ve optimized the Docker containers. Build time reduced by 40%.',
      timestamp: new Date(Date.now() - 360000),
      type: 'text'
    },
    {
      id: 'msg-004',
      userId: 'user-002',
      content: 'deployment-config.yml',
      timestamp: new Date(Date.now() - 240000),
      type: 'file',
      attachments: [{ name: 'deployment-config.yml', type: 'yaml', size: 2847, url: '#' }]
    }
  ]);

  const [activeSessions, setActiveSessions] = useState<ActiveSession[]>([
    {
      id: 'session-001',
      type: 'screen-share',
      title: 'Security Review Meeting',
      participants: ['user-001', 'user-002', 'user-003'],
      host: 'user-001',
      startTime: new Date(Date.now() - 1800000),
      duration: 1800,
      status: 'active'
    },
    {
      id: 'session-002',
      type: 'code-review',
      title: 'Deployment Pipeline Code Review',
      participants: ['user-002', 'user-003'],
      host: 'user-002',
      startTime: new Date(Date.now() - 900000),
      duration: 900,
      status: 'active'
    }
  ]);

  const [activityFeed, setActivityFeed] = useState<ActivityFeed[]>([
    {
      id: 'activity-001',
      userId: 'user-002',
      action: 'committed',
      target: 'deployment-pipeline',
      timestamp: new Date(Date.now() - 300000),
      details: 'Added automated rollback functionality'
    },
    {
      id: 'activity-002',
      userId: 'user-003',
      action: 'reviewed',
      target: 'security-center.tsx',
      timestamp: new Date(Date.now() - 600000),
      details: 'Approved with suggestions'
    },
    {
      id: 'activity-003',
      userId: 'user-001',
      action: 'deployed',
      target: 'production',
      timestamp: new Date(Date.now() - 900000),
      details: 'v2.4.1 with security enhancements'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate typing indicators
      setUsers(prev => prev.map(user => ({
        ...user,
        isTyping: Math.random() > 0.95 && user.status === 'online'
      })));

      // Simulate cursor movements
      setUsers(prev => prev.map(user => {
        if (user.cursor && user.status === 'online') {
          return {
            ...user,
            cursor: {
              ...user.cursor,
              x: Math.max(0, Math.min(800, user.cursor.x + (Math.random() - 0.5) * 50)),
              y: Math.max(0, Math.min(600, user.cursor.y + (Math.random() - 0.5) * 50))
            }
          };
        }
        return user;
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-[#00ff88] border-[#00ff88]';
      case 'busy': return 'bg-red-400 border-red-400';
      case 'away': return 'bg-yellow-400 border-yellow-400';
      case 'offline': return 'bg-[#C0C5CE]/50 border-[#C0C5CE]/50';
      default: return 'bg-[#C0C5CE]/50 border-[#C0C5CE]/50';
    }
  };

  const getSessionTypeIcon = (type: string) => {
    switch (type) {
      case 'screen-share': return Monitor;
      case 'video-call': return Video;
      case 'code-review': return Code;
      case 'whiteboard': return Edit;
      default: return MessageSquare;
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: `msg-${Date.now()}`,
        userId: 'user-001', // Current user
        content: newMessage,
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, message]);
      setNewMessage('');
    }
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#C0C5CE] font-mono">
      {/* Terminal grid background */}
      <div className="fixed inset-0 enterprise-grid opacity-10 pointer-events-none"></div>
      
      <RTLContainer className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className={`space-y-8 ${isRTL ? 'text-right' : 'text-left'}`}>
          
          {/* Header */}
          <div className="neo-flex-between mb-8">
            <div className="neo-flex-start neo-space-md">
              <Users className="w-8 h-8 text-[#00d4ff]" />
              <div>
                <h1 className="text-3xl font-bold text-[#C0C5CE]">
                  {language === 'ar' ? 'مركز التعاون المباشر' : 'Real-Time Collaboration Hub'}
                </h1>
                <p className="text-[#C0C5CE]/80 text-lg">
                  {language === 'ar' 
                    ? 'تعاون مباشر متقدم للفرق الموزعة'
                    : 'Advanced real-time collaboration for distributed teams'
                  }
                </p>
              </div>
            </div>
            
            <div className="neo-flex-start neo-space-sm">
              <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse"></div>
              <span className="text-[#00ff88] text-sm font-mono">
                {users.filter(u => u.status === 'online').length} {language === 'ar' ? 'متصل' : 'Online'}
              </span>
            </div>
          </div>

          {/* Live Collaboration Area */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Main Chat & Collaboration */}
            <div className="lg:col-span-3 space-y-6">
              
              {/* Active Sessions */}
              <Card className="neo-card">
                <div className="p-6">
                  <div className="neo-flex-between mb-4">
                    <h3 className="text-[#00ff88] font-mono text-lg">
                      {language === 'ar' ? 'الجلسات النشطة' : 'Active Sessions'}
                    </h3>
                    <Button className="neo-button-primary text-xs">
                      <Video className="w-3 h-3 mr-1" />
                      {language === 'ar' ? 'جلسة جديدة' : 'New Session'}
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeSessions.map((session) => {
                      const SessionIcon = getSessionTypeIcon(session.type);
                      return (
                        <div key={session.id} className="neo-interactive-card p-4">
                          <div className="neo-flex-between mb-3">
                            <div className="neo-flex-start neo-space-sm">
                              <SessionIcon className="w-5 h-5 text-[#00d4ff]" />
                              <div>
                                <div className="font-semibold text-[#C0C5CE] text-sm">
                                  {session.title}
                                </div>
                                <div className="text-xs text-[#C0C5CE]/70">
                                  {session.participants.length} participants
                                </div>
                              </div>
                            </div>
                            
                            <Badge className="bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]/30">
                              Live
                            </Badge>
                          </div>

                          <div className="neo-flex-start neo-space-xs mb-3">
                            {session.participants.slice(0, 3).map(participantId => {
                              const user = users.find(u => u.id === participantId);
                              return user ? (
                                <div key={participantId} className="w-6 h-6 bg-[#12151C] rounded-full flex items-center justify-center text-xs">
                                  {user.avatar}
                                </div>
                              ) : null;
                            })}
                            {session.participants.length > 3 && (
                              <div className="w-6 h-6 bg-[#00d4ff]/20 rounded-full flex items-center justify-center text-xs text-[#00d4ff]">
                                +{session.participants.length - 3}
                              </div>
                            )}
                          </div>

                          <div className="neo-flex-between text-xs">
                            <span className="text-[#C0C5CE]/70">
                              Duration: {formatDuration(session.duration)}
                            </span>
                            <Button className="neo-button-ghost text-xs">
                              {language === 'ar' ? 'انضمام' : 'Join'}
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Card>

              {/* Chat Interface */}
              <Card className="neo-card">
                <div className="p-6">
                  <div className="neo-flex-between mb-4">
                    <h3 className="text-[#00ff88] font-mono text-lg">
                      {language === 'ar' ? 'محادثة الفريق' : 'Team Chat'}
                    </h3>
                    <div className="neo-flex-start neo-space-sm">
                      <Bell className="w-4 h-4 text-[#C0C5CE]/70" />
                      <Settings className="w-4 h-4 text-[#C0C5CE]/70" />
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="h-64 overflow-y-auto mb-4 space-y-3 bg-[#0B0D12] rounded-lg p-4">
                    {messages.map((message) => {
                      const user = users.find(u => u.id === message.userId);
                      return (
                        <div key={message.id} className="neo-flex-start neo-space-sm">
                          <div className="w-8 h-8 bg-[#12151C] rounded-full flex items-center justify-center text-sm flex-shrink-0">
                            {user?.avatar}
                          </div>
                          <div className="flex-1">
                            <div className="neo-flex-start neo-space-sm mb-1">
                              <span className="text-[#C0C5CE] font-semibold text-sm">
                                {user?.name}
                              </span>
                              <span className="text-[#C0C5CE]/60 text-xs">
                                {formatTime(message.timestamp)}
                              </span>
                              {message.edited && (
                                <span className="text-[#C0C5CE]/50 text-xs">(edited)</span>
                              )}
                            </div>
                            
                            {message.type === 'text' ? (
                              <div className="text-[#C0C5CE]/90 text-sm">
                                {message.content}
                              </div>
                            ) : message.type === 'file' && message.attachments ? (
                              <div className="bg-[#12151C] border border-[#00d4ff]/20 rounded-lg p-3 mt-2">
                                <div className="neo-flex-start neo-space-sm">
                                  <Paperclip className="w-4 h-4 text-[#00d4ff]" />
                                  <div>
                                    <div className="text-[#00d4ff] text-sm font-medium">
                                      {message.attachments[0].name}
                                    </div>
                                    <div className="text-[#C0C5CE]/60 text-xs">
                                      {(message.attachments[0].size / 1024).toFixed(1)} KB
                                    </div>
                                  </div>
                                  <Button className="neo-button-ghost text-xs ml-auto">
                                    <Download className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                            ) : null}

                            {message.reactions && message.reactions.length > 0 && (
                              <div className="neo-flex-start neo-space-xs mt-2">
                                {message.reactions.map((reaction, index) => (
                                  <div key={index} className="bg-[#12151C] border border-[#00d4ff]/20 rounded-full px-2 py-1 text-xs neo-flex-start neo-space-xs">
                                    <span>{reaction.emoji}</span>
                                    <span className="text-[#00d4ff]">{reaction.users.length}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    {/* Typing indicators */}
                    {users.filter(u => u.isTyping).map(user => (
                      <div key={`typing-${user.id}`} className="neo-flex-start neo-space-sm opacity-60">
                        <div className="w-8 h-8 bg-[#12151C] rounded-full flex items-center justify-center text-sm">
                          {user.avatar}
                        </div>
                        <div className="text-[#C0C5CE]/70 text-sm italic">
                          {user.name} is typing...
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="neo-flex-start neo-space-sm">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder={language === 'ar' ? 'اكتب رسالة...' : 'Type a message...'}
                      className="neo-form-input flex-1"
                    />
                    <Button className="neo-button-ghost" onClick={handleSendMessage}>
                      <Send className="w-4 h-4" />
                    </Button>
                    <Button className="neo-button-ghost">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <Button className="neo-button-ghost">
                      <Smile className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar - Users & Activity */}
            <div className="space-y-6">
              
              {/* Online Users */}
              <Card className="neo-card">
                <div className="p-6">
                  <div className="neo-flex-between mb-4">
                    <h3 className="text-[#00ff88] font-mono text-lg">
                      {language === 'ar' ? 'الفريق' : 'Team Members'}
                    </h3>
                    <span className="text-[#00d4ff] text-sm">
                      {users.filter(u => u.status === 'online').length}/{users.length}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {users.map((user) => (
                      <div key={user.id} className="neo-interactive-card p-3">
                        <div className="neo-flex-between mb-2">
                          <div className="neo-flex-start neo-space-sm">
                            <div className="relative">
                              <div className="w-8 h-8 bg-[#12151C] rounded-full flex items-center justify-center">
                                {user.avatar}
                              </div>
                              <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-[#12151C] ${getStatusColor(user.status)}`}></div>
                            </div>
                            <div>
                              <div className="font-semibold text-[#C0C5CE] text-sm">
                                {user.name}
                              </div>
                              <div className="text-xs text-[#C0C5CE]/70">
                                {user.role}
                              </div>
                            </div>
                          </div>
                          
                          <div className="neo-flex-start neo-space-xs">
                            <Button className="neo-button-ghost p-1">
                              <MessageSquare className="w-3 h-3" />
                            </Button>
                            <Button className="neo-button-ghost p-1">
                              <Video className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>

                        <div className="text-xs text-[#C0C5CE]/80">
                          {user.currentActivity}
                        </div>
                        
                        <div className="text-xs text-[#C0C5CE]/60 mt-1">
                          {user.location} ({user.timezone})
                        </div>

                        {user.isTyping && (
                          <div className="text-xs text-[#00d4ff] mt-1 animate-pulse">
                            Typing...
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Activity Feed */}
              <Card className="neo-card">
                <div className="p-6">
                  <div className="neo-flex-between mb-4">
                    <h3 className="text-[#00ff88] font-mono text-lg">
                      {language === 'ar' ? 'النشاط المباشر' : 'Live Activity'}
                    </h3>
                    <Activity className="w-4 h-4 text-[#00d4ff]" />
                  </div>

                  <div className="space-y-3">
                    {activityFeed.map((activity) => {
                      const user = users.find(u => u.id === activity.userId);
                      return (
                        <div key={activity.id} className="border-l-2 border-[#00d4ff]/30 pl-3">
                          <div className="text-sm text-[#C0C5CE]">
                            <span className="text-[#00d4ff]">{user?.name}</span> {activity.action} <span className="text-[#00ff88]">{activity.target}</span>
                          </div>
                          {activity.details && (
                            <div className="text-xs text-[#C0C5CE]/70 mt-1">
                              {activity.details}
                            </div>
                          )}
                          <div className="text-xs text-[#C0C5CE]/60 mt-1">
                            {formatTime(activity.timestamp)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Collaboration Command Terminal */}
          <Card className="neo-card">
            <div className="p-6">
              <div className="neo-flex-between mb-4">
                <div className="neo-flex-start neo-space-sm">
                  <Zap className="w-5 h-5 text-[#00d4ff]" />
                  <h3 className="text-[#00ff88] font-mono text-lg">
                    {language === 'ar' ? 'أوامر التعاون' : 'Collaboration Command Center'}
                  </h3>
                </div>
                <Badge className="bg-[#00d4ff]/20 text-[#00d4ff] border-[#00d4ff]/30">
                  <Activity className="w-3 h-3 mr-1" />
                  {language === 'ar' ? 'مباشر' : 'Live'}
                </Badge>
              </div>
              
              <div className="bg-[#0B0D12] border border-[#00d4ff]/20 rounded-lg p-4 font-mono text-sm">
                <div className="space-y-2">
                  <div className="text-[#00ff88]">
                    neo@collaboration:~$ status --team --sessions --activity
                  </div>
                  <div className="text-[#C0C5CE]/80">
                    👥 Team Status: {users.filter(u => u.status === 'online').length}/{users.length} online<br/>
                    🎥 Active Sessions: {activeSessions.length} (video calls, screen shares, code reviews)<br/>
                    💬 Messages Today: {messages.length} in team chat<br/>
                    🔄 Real-time Collaboration: Cursors, typing indicators, live edits active
                  </div>
                  
                  <div className="text-[#00ff88] mt-4">
                    neo@collaboration:~$ start-session --type=screen-share --invite=all
                  </div>
                  <div className="text-[#C0C5CE]/80">
                    🖥️ Initiating screen share session...<br/>
                    ✅ Audio/video permissions granted<br/>
                    ✅ Screen capture initialized<br/>
                    📧 Invitations sent to {users.filter(u => u.status === 'online').length} online team members
                  </div>
                  
                  <div className="text-[#00ff88] mt-4">
                    neo@collaboration:~$ sync --real-time --cursors --presence
                  </div>
                  <div className="text-[#C0C5CE]/80">
                    🔄 Real-time synchronization active:<br/>
                    • Live cursor tracking: {users.filter(u => u.cursor).length} users visible<br/>
                    • Presence indicators: Updated every 2 seconds<br/>
                    • Conflict resolution: Operational transformation enabled<br/>
                    • Latency: &lt;50ms average
                  </div>
                  
                  <div className="text-[#00ff88] mt-4 neo-typing-cursor">
                    neo@collaboration:~$ optimize --bandwidth --quality --auto█
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Live Cursors Overlay */}
          <div className="fixed inset-0 pointer-events-none z-50">
            {users.filter(u => u.cursor && u.status === 'online').map(user => (
              <div
                key={user.id}
                className="absolute transition-all duration-100 ease-out"
                style={{
                  left: user.cursor!.x,
                  top: user.cursor!.y,
                  transform: 'translate(-2px, -2px)'
                }}
              >
                <div
                  className="w-4 h-4 rounded-full border-2 border-white"
                  style={{ backgroundColor: user.cursor!.color }}
                ></div>
                <div
                  className="ml-2 mt-1 px-2 py-1 rounded text-xs text-white font-mono text-nowrap"
                  style={{ backgroundColor: user.cursor!.color }}
                >
                  {user.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </RTLContainer>
    </div>
  );
}