import React, { useState, useEffect } from 'react';

interface TerminalVisualsProps {
  className?: string;
  showMatrix?: boolean;
  showScanLines?: boolean;
  showFloatingCode?: boolean;
  showCircuitBoard?: boolean;
  intensity?: 'low' | 'medium' | 'high';
}

export function TerminalVisuals({ 
  className = '',
  showMatrix = true,
  showScanLines = true,
  showFloatingCode = true,
  showCircuitBoard = true,
  intensity = 'medium'
}: TerminalVisualsProps) {
  const [matrixChars, setMatrixChars] = useState<string[]>([]);
  const [codeSnippets, setCodeSnippets] = useState<Array<{id: number, text: string, x: number, y: number, speed: number}>>([]);

  // Matrix characters including binary, Japanese, and coding symbols
  const matrixCharacters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン{}[]();<>=+-*/&|!@#$%^~`';
  
  // Terminal commands and code snippets
  const terminalCommands = [
    'npm install --save react',
    'git commit -m "feat: new feature"',
    'docker build -t app:latest .',
    'kubectl scale deployment --replicas=3',
    'ssh user@production.server',
    'npm run build && npm run deploy',
    'curl -X POST /api/deploy',
    'systemctl restart nginx',
    'pm2 restart all',
    'yarn test --coverage',
    'const result = await api.call()',
    'firebase deploy --only functions',
    'stripe.charges.create({})',
    'vertexAI.generateResponse()',
    'cloudflare.cache.purge()',
    'postgresql.query.execute()',
    'redis.set("key", "value")',
    'mongodb.find().limit(10)',
    'aws s3 sync ./build s3://bucket',
    'gcloud compute instances list'
  ];

  const getIntensitySettings = () => {
    switch (intensity) {
      case 'low':
        return { matrixCount: 20, codeCount: 3, opacity: 0.1 };
      case 'high':
        return { matrixCount: 80, codeCount: 8, opacity: 0.4 };
      default:
        return { matrixCount: 50, codeCount: 5, opacity: 0.2 };
    }
  };

  const settings = getIntensitySettings();

  // Matrix rain effect
  useEffect(() => {
    if (!showMatrix) return;

    const createMatrixRain = () => {
      const chars = [];
      for (let i = 0; i < settings.matrixCount; i++) {
        chars.push(matrixCharacters[Math.floor(Math.random() * matrixCharacters.length)]);
      }
      setMatrixChars(chars);
    };

    createMatrixRain();
    const interval = setInterval(createMatrixRain, 2000);
    return () => clearInterval(interval);
  }, [showMatrix, settings.matrixCount]);

  // Floating code snippets
  useEffect(() => {
    if (!showFloatingCode) return;

    const createCodeSnippet = () => {
      const newSnippet = {
        id: Math.random(),
        text: terminalCommands[Math.floor(Math.random() * terminalCommands.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        speed: 0.5 + Math.random() * 1
      };
      setCodeSnippets(prev => [...prev.slice(-settings.codeCount), newSnippet]);
    };

    const interval = setInterval(createCodeSnippet, 3000);
    return () => clearInterval(interval);
  }, [showFloatingCode, settings.codeCount]);

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Matrix Rain Effect */}
      {showMatrix && (
        <div className="absolute inset-0">
          {matrixChars.map((char, index) => (
            <div
              key={index}
              className="absolute text-[#00d4ff] font-mono text-xs matrix-effect"
              style={{
                left: `${(index * 2.5) % 100}%`,
                top: '-20px',
                animationDelay: `${index * 0.1}s`,
                animationDuration: `${3 + (index % 4)}s`,
                opacity: settings.opacity * 0.8
              }}
            >
              {char}
            </div>
          ))}
        </div>
      )}

      {/* Floating Code Snippets */}
      {showFloatingCode && (
        <div className="absolute inset-0">
          {codeSnippets.map((snippet) => (
            <div
              key={snippet.id}
              className="absolute font-mono text-xs text-[#00ff88] data-flow-effect"
              style={{
                left: `${snippet.x}%`,
                top: `${snippet.y}%`,
                animationDuration: `${snippet.speed * 6}s`,
                opacity: settings.opacity
              }}
            >
              <span className="text-[#C0C5CE]">$</span> {snippet.text}
            </div>
          ))}
        </div>
      )}

      {/* Terminal Scan Lines */}
      {showScanLines && (
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #00d4ff 2px, #00d4ff 4px)',
              opacity: settings.opacity * 0.3,
              animation: 'scanLines 0.1s linear infinite'
            }}
          />
        </div>
      )}

      {/* Circuit Board Pattern */}
      {showCircuitBoard && (
        <div 
          className="absolute inset-0 circuit-glow-animation"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 20%, #00d4ff 1px, transparent 1px),
              radial-gradient(circle at 60% 60%, #00d4ff 1px, transparent 1px),
              radial-gradient(circle at 80% 20%, #00d4ff 1px, transparent 1px),
              radial-gradient(circle at 40% 80%, #00d4ff 1px, transparent 1px),
              linear-gradient(90deg, #00d4ff 0.5px, transparent 0.5px),
              linear-gradient(180deg, #00d4ff 0.5px, transparent 0.5px)
            `,
            backgroundSize: '50px 50px, 50px 50px, 50px 50px, 50px 50px, 25px 25px, 25px 25px',
            opacity: settings.opacity * 0.6
          }}
        />
      )}

      {/* Neural Network Nodes */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-[#00ff88] rounded-full neural-pulse"
            style={{
              left: `${20 + (i * 15)}%`,
              top: `${30 + Math.sin(i) * 20}%`,
              animationDelay: `${i * 0.5}s`,
              opacity: settings.opacity * 1.5
            }}
          />
        ))}
      </div>

      {/* Data Flow Lines */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent data-flow-effect"
            style={{
              top: `${25 + (i * 25)}%`,
              left: '0%',
              right: '0%',
              animationDelay: `${i * 2}s`,
              animationDuration: '4s',
              opacity: settings.opacity * 0.8
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Terminal Window Component
interface TerminalWindowProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'compact' | 'minimal';
}

export function TerminalWindow({ 
  title = 'neo@terminal', 
  children, 
  className = '',
  variant = 'default' 
}: TerminalWindowProps) {
  return (
    <div className={`bg-[#1a1a1a] border border-[#00d4ff]/30 rounded-lg overflow-hidden shadow-2xl ${className}`}>
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#1a1a1a] border-b border-[#00d4ff]/20">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        {variant !== 'minimal' && (
          <div className="font-mono text-sm text-[#00d4ff]">
            {title}
          </div>
        )}
        <div className="w-16"></div>
      </div>
      
      {/* Terminal Content */}
      <div className={`font-mono text-sm ${variant === 'compact' ? 'p-4' : 'p-6'}`}>
        {children}
      </div>
    </div>
  );
}

// Command Line Interface Component
interface CLIOutputProps {
  lines: string[];
  typing?: boolean;
  prompt?: string;
  className?: string;
}

export function CLIOutput({ 
  lines, 
  typing = false, 
  prompt = '$', 
  className = '' 
}: CLIOutputProps) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    if (!typing || currentLine >= lines.length) {
      setDisplayedLines(lines);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayedLines(lines.slice(0, currentLine + 1));
      setCurrentLine(prev => prev + 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [currentLine, lines, typing]);

  return (
    <div className={`text-left whitespace-pre-line leading-relaxed ${className}`}>
      {displayedLines.map((line, index) => (
        <div 
          key={index} 
          className={`${
            line.startsWith('>') ? 'text-[#00d4ff]' :
            line.startsWith('✓') ? 'text-[#00ff88]' :
            line.startsWith('✗') ? 'text-red-400' :
            line.startsWith(prompt) ? 'text-[#00ff88]' :
            line.startsWith('//') ? 'text-gray-500' :
            'text-[#C0C5CE]'
          }`}
        >
          {line}
          {typing && index === displayedLines.length - 1 && (
            <span className="animate-pulse text-[#00ff88]">|</span>
          )}
        </div>
      ))}
    </div>
  );
}

// ASCII Art Component
interface ASCIIArtProps {
  art: string[];
  className?: string;
  color?: string;
}

export function ASCIIArt({ art, className = '', color = '#00ff88' }: ASCIIArtProps) {
  return (
    <div className={`font-mono text-xs select-none ${className}`} style={{ color }}>
      {art.map((line, index) => (
        <div key={index}>{line}</div>
      ))}
    </div>
  );
}

// Pre-defined ASCII Arts
export const NEOTECHNOLOGY_ASCII = [
  '┌─────────────────────────────────────────┐',
  '│  ███╗   ██╗███████╗ ██████╗ ████████╗  │',
  '│  ████╗  ██║██╔════╝██╔═══██╗╚══██╔══╝  │',
  '│  ██╔██╗ ██║█████╗  ██║   ██║   ██║     │',
  '│  ██║╚██╗██║██╔══╝  ██║   ██║   ██║     │',
  '│  ██║ ╚████║███████╗╚██████╔╝   ██║     │',
  '│  ╚═╝  ╚═══╝╚══════╝ ╚═════╝    ╚═╝     │',
  '│        Technology Solutions             │',
  '└─────────────────────────────────────────┘'
];

export const PROGRESS_BAR_ASCII = [
  'Loading... ▓▓▓▓▓▓▓▓▓░ 90%',
  '████████████████████ 100% Complete',
  'Deployment successful ✓'
];

export const SYSTEM_STATUS_ASCII = [
  '╭─ System Status ──────────────────╮',
  '│ CPU: ████████░░ 82%             │',
  '│ RAM: ██████░░░░ 64%             │',
  '│ SSD: ████░░░░░░ 43%             │',
  '│ Network: Online ✓               │',
  '╰─────────────────────────────────╯'
];