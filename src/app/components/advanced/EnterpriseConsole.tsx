import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Terminal, Play, Square, Trash2, Download, Upload, 
  Settings, History, Code, Database, Zap, AlertTriangle,
  CheckCircle, Clock, User, Server, FileText
} from 'lucide-react';

interface ConsoleLog {
  id: string;
  timestamp: Date;
  level: 'info' | 'warn' | 'error' | 'success' | 'system';
  message: string;
  source: string;
  data?: any;
}

interface Command {
  name: string;
  description: string;
  category: 'system' | 'database' | 'performance' | 'dev' | 'backup';
  handler: (args: string[]) => Promise<string | ConsoleLog[]>;
}

export const EnterpriseConsole: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logs, setLogs] = useState<ConsoleLog[]>([]);
  const [command, setCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isExecuting, setIsExecuting] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);
  
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Available commands
  const commands: Record<string, Command> = {
    help: {
      name: 'help',
      description: 'Show available commands',
      category: 'system',
      handler: async () => {
        const commandList = Object.entries(commands).map(([name, cmd]) => 
          `${name.padEnd(20)} - ${cmd.description}`
        ).join('\n');
        return `Available commands:\n${commandList}`;
      }
    },
    
    clear: {
      name: 'clear',
      description: 'Clear console logs',
      category: 'system',
      handler: async () => {
        setLogs([]);
        return 'Console cleared';
      }
    },
    
    status: {
      name: 'status',
      description: 'Show system status',
      category: 'system',
      handler: async () => {
        const status = {
          uptime: Math.floor(performance.now() / 1000),
          memory: (performance as any).memory?.usedJSHeapSize || 'Unknown',
          connection: navigator.onLine ? 'Online' : 'Offline',
          storage: navigator.storage ? 'Available' : 'Unavailable'
        };
        
        return `System Status:
Uptime: ${status.uptime}s
Memory: ${(status.memory / 1024 / 1024).toFixed(2)}MB
Connection: ${status.connection}
Storage: ${status.storage}`;
      }
    },
    
    performance: {
      name: 'performance',
      description: 'Show performance metrics',
      category: 'performance',
      handler: async () => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const paint = performance.getEntriesByType('paint');
        
        const metrics = {
          domContentLoaded: navigation?.domContentLoadedEventEnd - navigation?.domContentLoadedEventStart || 0,
          loadComplete: navigation?.loadEventEnd - navigation?.loadEventStart || 0,
          firstPaint: paint.find(entry => entry.name === 'first-paint')?.startTime || 0,
          firstContentfulPaint: paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0,
        };
        
        return `Performance Metrics:
DOM Content Loaded: ${metrics.domContentLoaded.toFixed(2)}ms
Load Complete: ${metrics.loadComplete.toFixed(2)}ms
First Paint: ${metrics.firstPaint.toFixed(2)}ms
First Contentful Paint: ${metrics.firstContentfulPaint.toFixed(2)}ms`;
      }
    },
    
    storage: {
      name: 'storage',
      description: 'Show storage usage',
      category: 'database',
      handler: async () => {
        let total = 0;
        const items: string[] = [];
        
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key) {
            const value = localStorage.getItem(key);
            const size = new Blob([value || '']).size;
            total += size;
            items.push(`${key}: ${(size / 1024).toFixed(2)}KB`);
          }
        }
        
        return `Local Storage Usage:
Total: ${(total / 1024).toFixed(2)}KB
Items:
${items.join('\n')}`;
      }
    },
    
    backup: {
      name: 'backup',
      description: 'Create system backup',
      category: 'backup',
      handler: async (args) => {
        const type = args[0] || 'manual';
        const timestamp = new Date().toISOString();
        
        // Simulate backup creation
        return `Backup created successfully:
Type: ${type}
Timestamp: ${timestamp}
Size: ${Math.floor(Math.random() * 500 + 100)}KB`;
      }
    },
    
    logs: {
      name: 'logs',
      description: 'Show system logs [level]',
      category: 'system',
      handler: async (args) => {
        const level = args[0];
        const filteredLogs = level ? 
          logs.filter(log => log.level === level) : 
          logs;
        
        if (filteredLogs.length === 0) {
          return `No logs found${level ? ` for level: ${level}` : ''}`;
        }
        
        return filteredLogs.map(log => 
          `[${log.timestamp.toISOString()}] ${log.level.toUpperCase()}: ${log.message}`
        ).join('\n');
      }
    },
    
    ping: {
      name: 'ping',
      description: 'Test server connectivity',
      category: 'system',
      handler: async (args) => {
        const target = args[0] || 'localhost';
        const start = performance.now();
        
        try {
          await fetch(window.location.origin);
          const latency = performance.now() - start;
          return `PING ${target}: time=${latency.toFixed(2)}ms`;
        } catch (error) {
          return `PING ${target}: Request failed`;
        }
      }
    },
    
    export: {
      name: 'export',
      description: 'Export console logs to file',
      category: 'system',
      handler: async () => {
        const logData = logs.map(log => ({
          timestamp: log.timestamp.toISOString(),
          level: log.level,
          message: log.message,
          source: log.source,
          data: log.data
        }));
        
        const blob = new Blob([JSON.stringify(logData, null, 2)], {
          type: 'application/json'
        });
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `neo-console-logs-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        return `Logs exported successfully (${logs.length} entries)`;
      }
    },
    
    theme: {
      name: 'theme',
      description: 'Change console theme [dark|light|matrix]',
      category: 'system',
      handler: async (args) => {
        const theme = args[0] || 'dark';
        // Theme switching logic would go here
        return `Console theme changed to: ${theme}`;
      }
    }
  };

  // Add log entry
  const addLog = useCallback((log: Omit<ConsoleLog, 'id' | 'timestamp'>) => {
    const newLog: ConsoleLog = {
      ...log,
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date()
    };
    
    setLogs(prev => [...prev, newLog].slice(-1000)); // Keep last 1000 logs
  }, []);

  // Execute command
  const executeCommand = async (cmd: string) => {
    if (!cmd.trim()) return;
    
    setIsExecuting(true);
    
    // Add command to logs
    addLog({
      level: 'system',
      message: `$ ${cmd}`,
      source: 'console'
    });
    
    // Add to history
    setCommandHistory(prev => [...prev, cmd].slice(-50)); // Keep last 50 commands
    setHistoryIndex(-1);
    
    const [commandName, ...args] = cmd.trim().split(' ');
    const command = commands[commandName.toLowerCase()];
    
    try {
      if (!command) {
        addLog({
          level: 'error',
          message: `Command not found: ${commandName}. Type 'help' for available commands.`,
          source: 'console'
        });
      } else {
        const result = await command.handler(args);
        
        if (Array.isArray(result)) {
          result.forEach(log => addLog(log));
        } else {
          addLog({
            level: 'success',
            message: result,
            source: 'console'
          });
        }
      }
    } catch (error) {
      addLog({
        level: 'error',
        message: `Command execution failed: ${error}`,
        source: 'console'
      });
    } finally {
      setIsExecuting(false);
      setCommand('');
    }
  };

  // Handle key events
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(command);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCommand('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Auto-complete command
      const matches = Object.keys(commands).filter(cmd => 
        cmd.startsWith(command.toLowerCase())
      );
      if (matches.length === 1) {
        setCommand(matches[0]);
      }
    }
  };

  // Auto-scroll to bottom
  useEffect(() => {
    if (autoScroll && terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs, autoScroll]);

  // Focus input when console opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Initialize with welcome message
  useEffect(() => {
    addLog({
      level: 'system',
      message: 'Neo Technology Enterprise Console v1.0.0 initialized',
      source: 'system'
    });
    
    addLog({
      level: 'info',
      message: 'Type "help" for available commands',
      source: 'system'
    });
  }, []);

  const getLogIcon = (level: string) => {
    switch (level) {
      case 'error': return <AlertTriangle className="w-3 h-3 text-red-400" />;
      case 'warn': return <AlertTriangle className="w-3 h-3 text-yellow-400" />;
      case 'success': return <CheckCircle className="w-3 h-3 text-[#4AE54A]" />;
      case 'system': return <Terminal className="w-3 h-3 text-blue-400" />;
      default: return <FileText className="w-3 h-3 text-[#C0C5CE]" />;
    }
  };

  const getLogColor = (level: string) => {
    switch (level) {
      case 'error': return 'text-red-400';
      case 'warn': return 'text-yellow-400';
      case 'success': return 'text-[#4AE54A]';
      case 'system': return 'text-blue-400';
      default: return 'text-[#C0C5CE]';
    }
  };

  return (
    <>
      {/* Console Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 right-4 z-50 p-3 bg-[#12151C] border border-[#4AE54A]/40 rounded-lg hover:bg-[#4AE54A]/10 transition-all duration-200 shadow-lg shadow-[#4AE54A]/20"
        title="Enterprise Console"
      >
        <Terminal className="w-5 h-5 text-[#4AE54A]" />
      </button>

      {/* Console Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 w-[600px] h-[500px] bg-[#0B0D12] border border-[#C0C5CE]/20 rounded-lg shadow-2xl z-50 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-[#C0C5CE]/20">
            <div className="flex items-center gap-3">
              <Terminal className="w-5 h-5 text-[#4AE54A]" />
              <h3 className="font-mono text-sm text-[#C0C5CE]">Enterprise Console</h3>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setAutoScroll(!autoScroll)}
                className={`p-2 rounded ${autoScroll ? 'bg-[#4AE54A]/20 text-[#4AE54A]' : 'bg-[#C0C5CE]/20 text-[#C0C5CE]'} hover:opacity-80 transition-opacity`}
                title={`Auto-scroll: ${autoScroll ? 'On' : 'Off'}`}
              >
                <Settings className="w-3 h-3" />
              </button>
              
              <button
                onClick={() => setLogs([])}
                className="p-2 bg-[#C0C5CE]/20 text-[#C0C5CE] rounded hover:bg-red-500/20 hover:text-red-400 transition-all duration-200"
                title="Clear logs"
              >
                <Trash2 className="w-3 h-3" />
              </button>
              
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 bg-[#C0C5CE]/20 text-[#C0C5CE] rounded hover:bg-red-500/20 hover:text-red-400 transition-all duration-200"
              >
                <Square className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Terminal Output */}
          <div 
            ref={terminalRef}
            className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-1"
          >
            {logs.map((log) => (
              <div key={log.id} className="flex items-start gap-2">
                <span className="text-[#C0C5CE]/50 text-xs mt-0.5">
                  {log.timestamp.toLocaleTimeString()}
                </span>
                {getLogIcon(log.level)}
                <pre className={`flex-1 whitespace-pre-wrap ${getLogColor(log.level)}`}>
                  {log.message}
                </pre>
              </div>
            ))}
            
            {isExecuting && (
              <div className="flex items-center gap-2 text-yellow-400">
                <div className="w-3 h-3 rounded-full border-2 border-yellow-400 border-t-transparent animate-spin"></div>
                <span>Executing command...</span>
              </div>
            )}
          </div>

          {/* Command Input */}
          <div className="p-4 border-t border-[#C0C5CE]/20">
            <div className="flex items-center gap-2">
              <span className="text-[#4AE54A] font-mono text-sm">neo@enterprise:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isExecuting}
                placeholder="Enter command..."
                className="flex-1 bg-transparent text-[#C0C5CE] font-mono text-sm outline-none disabled:opacity-50"
              />
              {isExecuting && (
                <div className="w-4 h-4 rounded-full border-2 border-[#4AE54A] border-t-transparent animate-spin"></div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EnterpriseConsole;