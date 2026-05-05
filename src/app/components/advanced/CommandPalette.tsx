import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Command, 
  ArrowRight, 
  Home, 
  User, 
  Settings, 
  BarChart3, 
  FileText, 
  Zap, 
  Globe, 
  Code, 
  Database, 
  Terminal, 
  Palette, 
  Moon, 
  Sun,
  Maximize,
  Minimize,
  Copy,
  Download,
  Share,
  Bell,
  Mail,
  Calendar,
  Folder,
  Bookmark
} from 'lucide-react';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { useAuth } from '../contexts/AuthContext';

interface Command {
  id: string;
  title: string;
  description: string;
  category: 'navigation' | 'actions' | 'settings' | 'developer' | 'ai' | 'data';
  icon: React.ReactNode;
  shortcut?: string;
  action: () => void;
  keywords?: string[];
  requiresAuth?: boolean;
  premium?: boolean;
}

interface CommandPaletteProps {
  onNavigate?: (section: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

function CommandPalette({ onNavigate, isOpen, onClose }: CommandPaletteProps) {
  const { user } = useAuth();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentCommands, setRecentCommands] = useState<string[]>([]);

  const allCommands: Command[] = useMemo(() => [
    // Navigation Commands
    {
      id: 'nav-home',
      title: 'Go to Home',
      description: 'Navigate to the landing page',
      category: 'navigation',
      icon: <Home className="w-4 h-4" />,
      shortcut: 'Ctrl+H',
      action: () => onNavigate?.('home'),
      keywords: ['home', 'landing', 'main']
    },
    {
      id: 'nav-dashboard',
      title: 'Open Dashboard',
      description: 'Access your analytics dashboard',
      category: 'navigation',
      icon: <BarChart3 className="w-4 h-4" />,
      shortcut: 'Ctrl+D',
      action: () => onNavigate?.('dashboard'),
      keywords: ['dashboard', 'analytics', 'metrics'],
      requiresAuth: true
    },
    {
      id: 'nav-portfolio',
      title: 'View Portfolio',
      description: 'Browse our project showcase',
      category: 'navigation',
      icon: <Folder className="w-4 h-4" />,
      shortcut: 'Ctrl+P',
      action: () => onNavigate?.('portfolio'),
      keywords: ['portfolio', 'projects', 'showcase', 'work']
    },
    {
      id: 'nav-services',
      title: 'View Services',
      description: 'Explore our service offerings',
      category: 'navigation',
      icon: <Globe className="w-4 h-4" />,
      action: () => onNavigate?.('services'),
      keywords: ['services', 'offerings', 'solutions']
    },
    {
      id: 'nav-about',
      title: 'About Us',
      description: 'Learn about Neo Technology',
      category: 'navigation',
      icon: <User className="w-4 h-4" />,
      action: () => onNavigate?.('about'),
      keywords: ['about', 'team', 'company', 'info']
    },
    {
      id: 'nav-contact',
      title: 'Contact Us',
      description: 'Get in touch with our team',
      category: 'navigation',
      icon: <Mail className="w-4 h-4" />,
      action: () => onNavigate?.('contact'),
      keywords: ['contact', 'email', 'reach', 'support']
    },

    // Action Commands
    {
      id: 'action-copy-url',
      title: 'Copy Current URL',
      description: 'Copy the current page URL to clipboard',
      category: 'actions',
      icon: <Copy className="w-4 h-4" />,
      shortcut: 'Ctrl+Shift+C',
      action: () => {
        navigator.clipboard.writeText(window.location.href);
        // You could add a toast notification here
      },
      keywords: ['copy', 'url', 'link', 'clipboard']
    },
    {
      id: 'action-share',
      title: 'Share Page',
      description: 'Share current page via Web Share API',
      category: 'actions',
      icon: <Share className="w-4 h-4" />,
      action: () => {
        if (navigator.share) {
          navigator.share({
            title: 'Neo Technology',
            url: window.location.href
          });
        }
      },
      keywords: ['share', 'social', 'send']
    },
    {
      id: 'action-download-portfolio',
      title: 'Download Portfolio',
      description: 'Download portfolio as PDF',
      category: 'actions',
      icon: <Download className="w-4 h-4" />,
      action: () => {
        // Implementation for PDF download
        console.log('Downloading portfolio...');
      },
      keywords: ['download', 'pdf', 'portfolio', 'export']
    },
    {
      id: 'action-bookmark',
      title: 'Bookmark Page',
      description: 'Add current page to bookmarks',
      category: 'actions',
      icon: <Bookmark className="w-4 h-4" />,
      shortcut: 'Ctrl+B',
      action: () => {
        // Add to browser bookmarks (limited support)
        console.log('Adding bookmark...');
      },
      keywords: ['bookmark', 'save', 'favorite']
    },

    // Settings Commands
    {
      id: 'settings-theme',
      title: 'Toggle Dark Mode',
      description: 'Switch between light and dark themes',
      category: 'settings',
      icon: <Moon className="w-4 h-4" />,
      shortcut: 'Ctrl+Shift+D',
      action: () => {
        // Theme toggle implementation
        document.documentElement.classList.toggle('dark');
      },
      keywords: ['theme', 'dark', 'light', 'mode']
    },
    {
      id: 'settings-fullscreen',
      title: 'Toggle Fullscreen',
      description: 'Enter or exit fullscreen mode',
      category: 'settings',
      icon: <Maximize className="w-4 h-4" />,
      shortcut: 'F11',
      action: () => {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          document.documentElement.requestFullscreen();
        }
      },
      keywords: ['fullscreen', 'maximize', 'expand']
    },
    {
      id: 'settings-notifications',
      title: 'Notification Settings',
      description: 'Manage notification preferences',
      category: 'settings',
      icon: <Bell className="w-4 h-4" />,
      action: () => {
        console.log('Opening notification settings...');
      },
      keywords: ['notifications', 'alerts', 'settings'],
      requiresAuth: true
    },

    // Developer Commands
    {
      id: 'dev-console',
      title: 'Open Developer Console',
      description: 'Open browser developer tools',
      category: 'developer',
      icon: <Terminal className="w-4 h-4" />,
      shortcut: 'F12',
      action: () => {
        // This will be handled by browser
        console.log('Opening developer tools...');
      },
      keywords: ['console', 'developer', 'debug', 'tools']
    },
    {
      id: 'dev-performance',
      title: 'Performance Monitor',
      description: 'View performance metrics',
      category: 'developer',
      icon: <Zap className="w-4 h-4" />,
      action: () => {
        console.log('Opening performance monitor...');
      },
      keywords: ['performance', 'metrics', 'speed', 'monitor']
    },
    {
      id: 'dev-api-docs',
      title: 'API Documentation',
      description: 'View API documentation',
      category: 'developer',
      icon: <Code className="w-4 h-4" />,
      action: () => {
        window.open('/api-docs', '_blank');
      },
      keywords: ['api', 'documentation', 'docs', 'reference'],
      premium: true
    },

    // AI Commands
    {
      id: 'ai-neobot',
      title: 'Open NeoBot AI',
      description: 'Launch AI assistant',
      category: 'ai',
      icon: <Zap className="w-4 h-4" />,
      shortcut: 'Ctrl+Shift+A',
      action: () => {
        console.log('Opening NeoBot AI...');
      },
      keywords: ['ai', 'neobot', 'assistant', 'chat'],
      premium: true
    },
    {
      id: 'ai-analysis',
      title: 'AI Site Analysis',
      description: 'Get AI-powered insights',
      category: 'ai',
      icon: <BarChart3 className="w-4 h-4" />,
      action: () => {
        console.log('Running AI analysis...');
      },
      keywords: ['ai', 'analysis', 'insights', 'smart'],
      premium: true
    },

    // Data Commands
    {
      id: 'data-export',
      title: 'Export Data',
      description: 'Export your data',
      category: 'data',
      icon: <Database className="w-4 h-4" />,
      action: () => {
        console.log('Exporting data...');
      },
      keywords: ['export', 'data', 'backup'],
      requiresAuth: true
    },
    {
      id: 'data-import',
      title: 'Import Data',
      description: 'Import external data',
      category: 'data',
      icon: <Download className="w-4 h-4" />,
      action: () => {
        console.log('Importing data...');
      },
      keywords: ['import', 'data', 'upload'],
      requiresAuth: true
    }
  ], [onNavigate]);

  const filteredCommands = useMemo(() => {
    if (!query.trim()) {
      // Show recent commands first when no query
      const recent = recentCommands.map(id => allCommands.find(cmd => cmd.id === id)).filter(Boolean) as Command[];
      const remaining = allCommands.filter(cmd => !recentCommands.includes(cmd.id));
      return [...recent, ...remaining];
    }

    const lowercaseQuery = query.toLowerCase();
    return allCommands.filter(command => {
      // Filter out commands that require auth if user is not authenticated
      if (command.requiresAuth && !user) return false;
      
      return (
        command.title.toLowerCase().includes(lowercaseQuery) ||
        command.description.toLowerCase().includes(lowercaseQuery) ||
        command.keywords?.some(keyword => keyword.toLowerCase().includes(lowercaseQuery)) ||
        command.category.toLowerCase().includes(lowercaseQuery)
      );
    }).sort((a, b) => {
      // Prioritize exact matches
      const aExact = a.title.toLowerCase().startsWith(lowercaseQuery);
      const bExact = b.title.toLowerCase().startsWith(lowercaseQuery);
      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;
      
      // Then by category relevance
      const categoryOrder = ['navigation', 'actions', 'ai', 'settings', 'developer', 'data'];
      return categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category);
    });
  }, [query, allCommands, user, recentCommands]);

  const executeCommand = useCallback((command: Command) => {
    // Add to recent commands
    setRecentCommands(prev => {
      const filtered = prev.filter(id => id !== command.id);
      return [command.id, ...filtered].slice(0, 5);
    });
    
    command.action();
    onClose();
  }, [onClose]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, filteredCommands.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          executeCommand(filteredCommands[selectedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        onClose();
        break;
    }
  }, [isOpen, selectedIndex, filteredCommands, executeCommand, onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'navigation': return <Home className="w-3 h-3" />;
      case 'actions': return <Zap className="w-3 h-3" />;
      case 'settings': return <Settings className="w-3 h-3" />;
      case 'developer': return <Terminal className="w-3 h-3" />;
      case 'ai': return <Zap className="w-3 h-3" />;
      case 'data': return <Database className="w-3 h-3" />;
      default: return <Command className="w-3 h-3" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'navigation': return 'text-blue-400';
      case 'actions': return 'text-green-400';
      case 'settings': return 'text-yellow-400';
      case 'developer': return 'text-purple-400';
      case 'ai': return 'text-pink-400';
      case 'data': return 'text-orange-400';
      default: return 'text-[#C0C5CE]';
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-[#0B0D12]/80 backdrop-blur-sm z-50 flex items-start justify-center pt-20"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="bg-[#12151C] border border-[#C0C5CE]/20 rounded-lg w-full max-w-2xl mx-4 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center space-x-3 p-4 border-b border-[#C0C5CE]/20">
            <Search className="w-5 h-5 text-[#C0C5CE]/50" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search commands or type to get started..."
              className="bg-transparent border-none text-[#C0C5CE] font-mono text-lg focus:ring-0 focus:outline-none"
              autoFocus
            />
            <div className="flex items-center space-x-1">
              <Badge variant="secondary" className="font-mono text-xs bg-[#C0C5CE]/10 text-[#C0C5CE]/70">
                ⌘K
              </Badge>
            </div>
          </div>

          {/* Commands List */}
          <div className="max-h-96 overflow-y-auto">
            {filteredCommands.length === 0 ? (
              <div className="p-8 text-center">
                <Search className="w-12 h-12 text-[#C0C5CE]/30 mx-auto mb-3" />
                <p className="text-[#C0C5CE]/70 font-mono">No commands found</p>
                <p className="text-[#C0C5CE]/50 font-mono text-sm mt-1">Try a different search term</p>
              </div>
            ) : (
              <div className="py-2">
                {filteredCommands.map((command, index) => (
                  <motion.div
                    key={command.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`flex items-center space-x-3 px-4 py-3 cursor-pointer transition-all duration-150 ${
                      index === selectedIndex 
                        ? 'bg-[#4AE54A]/10 border-l-2 border-[#4AE54A]' 
                        : 'hover:bg-[#C0C5CE]/5'
                    }`}
                    onClick={() => executeCommand(command)}
                  >
                    {/* Command Icon */}
                    <div className="text-[#4AE54A] flex-shrink-0">
                      {command.icon}
                    </div>

                    {/* Command Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-[#C0C5CE] font-mono text-sm font-medium truncate">
                          {command.title}
                        </h3>
                        {command.premium && (
                          <Badge variant="secondary" className="font-mono text-xs bg-yellow-500/20 text-yellow-400">
                            PRO
                          </Badge>
                        )}
                      </div>
                      <p className="text-[#C0C5CE]/60 font-mono text-xs truncate">
                        {command.description}
                      </p>
                    </div>

                    {/* Category and Shortcut */}
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      <div className={`flex items-center space-x-1 ${getCategoryColor(command.category)}`}>
                        {getCategoryIcon(command.category)}
                        <span className="font-mono text-xs capitalize">{command.category}</span>
                      </div>
                      {command.shortcut && (
                        <Badge variant="outline" className="font-mono text-xs border-[#C0C5CE]/20 text-[#C0C5CE]/60">
                          {command.shortcut}
                        </Badge>
                      )}
                      <ArrowRight className="w-3 h-3 text-[#C0C5CE]/40" />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-2 border-t border-[#C0C5CE]/20 bg-[#0B0D12]/50">
            <div className="flex items-center space-x-4 text-xs font-mono text-[#C0C5CE]/60">
              <div className="flex items-center space-x-1">
                <kbd className="px-1 py-0.5 bg-[#C0C5CE]/10 rounded text-xs">↑↓</kbd>
                <span>Navigate</span>
              </div>
              <div className="flex items-center space-x-1">
                <kbd className="px-1 py-0.5 bg-[#C0C5CE]/10 rounded text-xs">↵</kbd>
                <span>Select</span>
              </div>
              <div className="flex items-center space-x-1">
                <kbd className="px-1 py-0.5 bg-[#C0C5CE]/10 rounded text-xs">Esc</kbd>
                <span>Close</span>
              </div>
            </div>
            <div className="text-xs font-mono text-[#C0C5CE]/50">
              {filteredCommands.length} commands
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Set display name for debugging
CommandPalette.displayName = 'CommandPalette';

// Default export for lazy loading
export default CommandPalette;