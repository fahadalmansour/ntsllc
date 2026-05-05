import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bell, 
  X, 
  Check, 
  Info, 
  AlertTriangle, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  Settings,
  Filter,
  MoreHorizontal,
  Archive,
  Trash2,
  Star,
  StarOff,
  Eye,
  Volume2,
  VolumeX,
  Smartphone,
  Mail,
  MessageSquare,
  Zap
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Card } from '../ui/card';
import { useAuth } from '../contexts/AuthContext';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'system';
  category: 'system' | 'security' | 'billing' | 'api' | 'collaboration' | 'marketing';
  priority: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
  read: boolean;
  starred: boolean;
  archived: boolean;
  actionable: boolean;
  actions?: {
    label: string;
    action: () => void;
    primary?: boolean;
  }[];
  metadata?: {
    source?: string;
    userId?: string;
    projectId?: string;
    apiEndpoint?: string;
    amount?: number;
    currency?: string;
  };
  expires?: Date;
  persistent?: boolean;
}

interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  desktop: boolean;
  sound: boolean;
  categories: {
    system: boolean;
    security: boolean;
    billing: boolean;
    api: boolean;
    collaboration: boolean;
    marketing: boolean;
  };
  priority: {
    low: boolean;
    medium: boolean;
    high: boolean;
    critical: boolean;
  };
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
  };
}

interface NotificationContextType {
  notifications: Notification[];
  settings: NotificationSettings;
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read' | 'starred' | 'archived'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  toggleStar: (id: string) => void;
  archiveNotification: (id: string) => void;
  updateSettings: (settings: Partial<NotificationSettings>) => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
};

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [settings, setSettings] = useState<NotificationSettings>({
    email: true,
    push: true,
    sms: false,
    desktop: true,
    sound: true,
    categories: {
      system: true,
      security: true,
      billing: true,
      api: true,
      collaboration: true,
      marketing: false
    },
    priority: {
      low: false,
      medium: true,
      high: true,
      critical: true
    },
    quietHours: {
      enabled: false,
      start: '22:00',
      end: '08:00'
    }
  });

  const unreadCount = notifications.filter(n => !n.read && !n.archived).length;

  const addNotification = useCallback((notificationData: Omit<Notification, 'id' | 'timestamp' | 'read' | 'starred' | 'archived'>) => {
    const notification: Notification = {
      ...notificationData,
      id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      read: false,
      starred: false,
      archived: false
    };

    setNotifications(prev => [notification, ...prev]);

    // Play notification sound if enabled
    if (settings.sound && settings.categories[notification.category] && settings.priority[notification.priority]) {
      // Play sound (you would implement actual sound playing here)
      console.log('🔔 Notification sound');
    }

    // Show desktop notification if supported and enabled
    if (settings.desktop && 'Notification' in window && Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/favicon.ico',
        badge: '/favicon.ico'
      });
    }

    // Auto-expire notification if specified
    if (notification.expires) {
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== notification.id));
      }, notification.expires.getTime() - Date.now());
    }
  }, [settings]);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const deleteNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const toggleStar = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, starred: !n.starred } : n
    ));
  }, []);

  const archiveNotification = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, archived: true, read: true } : n
    ));
  }, []);

  const updateSettings = useCallback((newSettings: Partial<NotificationSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  // Initialize with some demo notifications
  useEffect(() => {
    const demoNotifications: Omit<Notification, 'id' | 'timestamp' | 'read' | 'starred' | 'archived'>[] = [
      {
        title: 'API Rate Limit Warning',
        message: 'You are approaching your API rate limit (85% usage)',
        type: 'warning',
        category: 'api',
        priority: 'high',
        actionable: true,
        actions: [
          { label: 'View Usage', action: () => console.log('View API usage') },
          { label: 'Upgrade Plan', action: () => console.log('Upgrade plan'), primary: true }
        ],
        metadata: { apiEndpoint: '/api/v1/analytics' }
      },
      {
        title: 'New Project Created',
        message: 'Sarah Chen created a new project: "E-commerce Analytics Dashboard"',
        type: 'info',
        category: 'collaboration',
        priority: 'medium',
        actionable: true,
        actions: [
          { label: 'View Project', action: () => console.log('View project'), primary: true }
        ],
        metadata: { userId: 'sarah_chen_123', projectId: 'proj_456' }
      },
      {
        title: 'Security Alert',
        message: 'Unusual login activity detected from new location (Toronto, CA)',
        type: 'error',
        category: 'security',
        priority: 'critical',
        actionable: true,
        actions: [
          { label: 'Review Activity', action: () => console.log('Review activity'), primary: true },
          { label: 'Secure Account', action: () => console.log('Secure account') }
        ]
      },
      {
        title: 'Monthly Usage Report',
        message: 'Your monthly analytics report is ready for download',
        type: 'info',
        category: 'system',
        priority: 'low',
        actionable: true,
        actions: [
          { label: 'Download Report', action: () => console.log('Download report'), primary: true }
        ]
      },
      {
        title: 'Payment Successful',
        message: 'Your subscription has been renewed successfully',
        type: 'success',
        category: 'billing',
        priority: 'medium',
        actionable: false,
        metadata: { amount: 99.99, currency: 'USD' }
      }
    ];

    // Add demo notifications with staggered timing
    demoNotifications.forEach((notification, index) => {
      setTimeout(() => addNotification(notification), index * 2000);
    });
  }, [addNotification]);

  // Request notification permissions
  useEffect(() => {
    if (settings.desktop && 'Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, [settings.desktop]);

  return (
    <NotificationContext.Provider value={{
      notifications,
      settings,
      unreadCount,
      addNotification,
      markAsRead,
      markAllAsRead,
      deleteNotification,
      toggleStar,
      archiveNotification,
      updateSettings
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationCenter({ isOpen, onClose }: NotificationCenterProps) {
  const { 
    notifications, 
    settings, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    deleteNotification, 
    toggleStar, 
    archiveNotification,
    updateSettings 
  } = useNotifications();

  const [activeTab, setActiveTab] = useState('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      case 'error': return <AlertCircle className="w-4 h-4 text-red-400" />;
      case 'info': return <Info className="w-4 h-4 text-blue-400" />;
      default: return <Bell className="w-4 h-4 text-[#4AE54A]" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'security': return '🔒';
      case 'billing': return '💳';
      case 'api': return '⚡';
      case 'collaboration': return '👥';
      case 'marketing': return '📈';
      default: return '⚙️';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'border-l-red-500 bg-red-500/5';
      case 'high': return 'border-l-orange-500 bg-orange-500/5';
      case 'medium': return 'border-l-yellow-500 bg-yellow-500/5';
      case 'low': return 'border-l-blue-500 bg-blue-500/5';
      default: return 'border-l-[#4AE54A] bg-[#4AE54A]/5';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesTab = activeTab === 'all' || 
      (activeTab === 'unread' && !notification.read) ||
      (activeTab === 'starred' && notification.starred) ||
      (activeTab === 'archived' && notification.archived);
    
    const matchesCategory = filterCategory === 'all' || notification.category === filterCategory;
    
    const matchesSearch = !searchQuery || 
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesTab && matchesCategory && matchesSearch;
  });

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-[#0B0D12]/80 backdrop-blur-sm z-50 flex justify-end"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, x: 400 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 400 }}
          className="w-full max-w-md h-full bg-[#12151C] border-l border-[#C0C5CE]/20 shadow-xl overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-[#C0C5CE]/20">
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-[#4AE54A]" />
              <h2 className="text-[#4AE54A] font-mono text-lg">Notifications</h2>
              {unreadCount > 0 && (
                <Badge variant="secondary" className="bg-red-500 text-white font-mono text-xs">
                  {unreadCount}
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSettings(!showSettings)}
                className="text-[#C0C5CE] hover:text-[#4AE54A] p-1"
              >
                <Settings className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-[#C0C5CE] hover:text-[#4AE54A] p-1"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Settings Panel */}
          <AnimatePresence>
            {showSettings && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-b border-[#C0C5CE]/20 bg-[#0B0D12]"
              >
                <div className="p-4 space-y-4">
                  <h3 className="text-[#4AE54A] font-mono text-sm">Notification Settings</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch 
                        checked={settings.sound}
                        onCheckedChange={(checked) => updateSettings({ sound: checked })}
                      />
                      <span className="text-[#C0C5CE] font-mono text-sm">Sound</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch 
                        checked={settings.desktop}
                        onCheckedChange={(checked) => updateSettings({ desktop: checked })}
                      />
                      <span className="text-[#C0C5CE] font-mono text-sm">Desktop</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch 
                        checked={settings.email}
                        onCheckedChange={(checked) => updateSettings({ email: checked })}
                      />
                      <span className="text-[#C0C5CE] font-mono text-sm">Email</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch 
                        checked={settings.push}
                        onCheckedChange={(checked) => updateSettings({ push: checked })}
                      />
                      <span className="text-[#C0C5CE] font-mono text-sm">Push</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Search and Filters */}
          <div className="p-4 space-y-3 border-b border-[#C0C5CE]/20">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notifications..."
              className="bg-[#0B0D12] border-[#C0C5CE]/20 text-[#C0C5CE] font-mono text-sm"
            />
            
            <div className="flex items-center space-x-2">
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="flex-1 bg-[#0B0D12] border-[#C0C5CE]/20 text-[#C0C5CE] font-mono text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                  <SelectItem value="billing">Billing</SelectItem>
                  <SelectItem value="api">API</SelectItem>
                  <SelectItem value="collaboration">Collaboration</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
              
              {unreadCount > 0 && (
                <Button
                  onClick={markAllAsRead}
                  variant="ghost"
                  size="sm"
                  className="text-[#4AE54A] hover:text-[#4AE54A] font-mono text-xs"
                >
                  Mark all read
                </Button>
              )}
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="bg-[#0B0D12] border-b border-[#C0C5CE]/20 grid grid-cols-4 w-full rounded-none">
              <TabsTrigger value="all" className="font-mono text-xs">All</TabsTrigger>
              <TabsTrigger value="unread" className="font-mono text-xs">Unread</TabsTrigger>
              <TabsTrigger value="starred" className="font-mono text-xs">Starred</TabsTrigger>
              <TabsTrigger value="archived" className="font-mono text-xs">Archive</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="flex-1 overflow-y-auto p-0 m-0">
              {filteredNotifications.length === 0 ? (
                <div className="flex items-center justify-center h-full p-8">
                  <div className="text-center">
                    <Bell className="w-12 h-12 text-[#C0C5CE]/30 mx-auto mb-3" />
                    <p className="text-[#C0C5CE]/70 font-mono text-sm">No notifications found</p>
                  </div>
                </div>
              ) : (
                <div className="divide-y divide-[#C0C5CE]/20">
                  {filteredNotifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 hover:bg-[#C0C5CE]/5 transition-colors border-l-2 ${getPriorityColor(notification.priority)} ${
                        !notification.read ? 'bg-[#4AE54A]/5' : ''
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-1">
                            <h3 className={`font-mono text-sm ${!notification.read ? 'text-[#C0C5CE] font-semibold' : 'text-[#C0C5CE]/80'}`}>
                              {notification.title}
                            </h3>
                            <div className="flex items-center space-x-1 ml-2">
                              <span className="text-xs">{getCategoryIcon(notification.category)}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleStar(notification.id);
                                }}
                                className="text-[#C0C5CE]/50 hover:text-yellow-400 p-0 h-auto"
                              >
                                {notification.starred ? <Star className="w-3 h-3 fill-current" /> : <StarOff className="w-3 h-3" />}
                              </Button>
                            </div>
                          </div>
                          
                          <p className="text-[#C0C5CE]/70 font-mono text-xs mb-2 leading-relaxed">
                            {notification.message}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-[#C0C5CE]/50 font-mono text-xs">
                              {notification.timestamp.toLocaleString()}
                            </span>
                            
                            {notification.priority === 'critical' && (
                              <Badge variant="secondary" className="bg-red-500/20 text-red-400 font-mono text-xs">
                                Critical
                              </Badge>
                            )}
                          </div>
                          
                          {notification.actions && notification.actions.length > 0 && (
                            <div className="flex items-center space-x-2 mt-3">
                              {notification.actions.map((action, index) => (
                                <Button
                                  key={index}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    action.action();
                                  }}
                                  variant={action.primary ? "default" : "ghost"}
                                  size="sm"
                                  className={`font-mono text-xs ${
                                    action.primary 
                                      ? 'bg-[#4AE54A] text-[#0B0D12] hover:bg-[#4AE54A]/90'
                                      : 'text-[#C0C5CE] hover:text-[#4AE54A]'
                                  }`}
                                >
                                  {action.label}
                                </Button>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex flex-col items-center space-y-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Show more options menu
                            }}
                            className="text-[#C0C5CE]/50 hover:text-[#C0C5CE] p-1 h-auto"
                          >
                            <MoreHorizontal className="w-3 h-3" />
                          </Button>
                          
                          {!notification.read && (
                            <div className="w-2 h-2 bg-[#4AE54A] rounded-full"></div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Floating Notification Bell
export function NotificationBell() {
  const { unreadCount } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant="ghost"
        className="relative text-[#C0C5CE] hover:text-[#4AE54A] p-2"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
          >
            <span className="text-white font-mono text-xs">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          </motion.div>
        )}
      </Button>
      
      <NotificationCenter isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}