import React from 'react';

interface NeoLogoProps {
  width?: number;
  height?: number;
  animated?: boolean;
  variant?: 'full' | 'icon' | 'text';
  className?: string;
}

export const NeoLogo: React.FC<NeoLogoProps> = ({ 
  width = 200, 
  height = 60, 
  animated = true,
  variant = 'full',
  className = ''
}) => {
  const viewBox = variant === 'icon' ? '0 0 60 60' : '0 0 200 60';
  
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox={viewBox}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Neo Blue to Green Gradient */}
        <linearGradient id="neoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00d4ff" stopOpacity={1} />
          <stop offset="100%" stopColor="#00ff88" stopOpacity={1} />
        </linearGradient>
        
        {/* Glow Effect */}
        <filter id="neoGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        
        {/* Circuit Animation Filter */}
        <filter id="circuitGlow">
          <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Circuit Pattern Background */}
      {animated && variant !== 'text' && (
        <g opacity="0.3">
          {/* Horizontal circuit lines */}
          <line x1="5" y1="15" x2="35" y2="15" stroke="#00d4ff" strokeWidth="1">
            <animate attributeName="stroke-opacity" 
                     values="0.3;1;0.3" dur="3s" repeatCount="indefinite"/>
          </line>
          <line x1="5" y1="30" x2="35" y2="30" stroke="#00d4ff" strokeWidth="1">
            <animate attributeName="stroke-opacity" 
                     values="0.5;0.8;0.5" dur="2.5s" repeatCount="indefinite"/>
          </line>
          <line x1="5" y1="45" x2="45" y2="45" stroke="#00d4ff" strokeWidth="1">
            <animate attributeName="stroke-opacity" 
                     values="0.4;0.9;0.4" dur="2.8s" repeatCount="indefinite"/>
          </line>
          
          {/* Vertical connections */}
          <line x1="35" y1="15" x2="35" y2="30" stroke="#00d4ff" strokeWidth="1"/>
          <line x1="45" y1="30" x2="45" y2="45" stroke="#00d4ff" strokeWidth="1"/>
          
          {/* Circuit nodes */}
          <circle cx="5" cy="15" r="2" fill="#00ff88">
            {animated && (
              <animate attributeName="opacity" 
                       values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>
            )}
          </circle>
          <circle cx="35" cy="15" r="2" fill="#00ff88">
            {animated && (
              <animate attributeName="opacity" 
                       values="0.8;0.4;0.8" dur="1.8s" repeatCount="indefinite"/>
            )}
          </circle>
          <circle cx="35" cy="30" r="2" fill="#00ff88">
            {animated && (
              <animate attributeName="opacity" 
                       values="0.6;1;0.6" dur="2.2s" repeatCount="indefinite"/>
            )}
          </circle>
          <circle cx="5" cy="30" r="2" fill="#00ff88"/>
          <circle cx="45" cy="45" r="2" fill="#00ff88"/>
          <circle cx="5" cy="45" r="2" fill="#00ff88"/>
        </g>
      )}
      
      {/* Logo Icon */}
      {(variant === 'icon' || variant === 'full') && (
        <g>
          {/* Hexagon shape (representing tech/digital) */}
          <path d="M 15 20 L 30 10 L 45 20 L 45 40 L 30 50 L 15 40 Z" 
                fill="none" 
                stroke="url(#neoGradient)" 
                strokeWidth="2"
                filter="url(#neoGlow)"/>
          
          {/* Inner circuit design */}
          <g transform="translate(30, 30)">
            {/* Center node */}
            <circle cx="0" cy="0" r="3" fill="#00d4ff">
              {animated && (
                <animate attributeName="r" 
                         values="3;4;3" dur="2s" repeatCount="indefinite"/>
              )}
            </circle>
            
            {/* Connected nodes */}
            <circle cx="-8" cy="-8" r="2" fill="#00ff88"/>
            <circle cx="8" cy="-8" r="2" fill="#00ff88"/>
            <circle cx="-8" cy="8" r="2" fill="#00ff88"/>
            <circle cx="8" cy="8" r="2" fill="#00ff88"/>
            
            {/* Connection lines */}
            <line x1="0" y1="0" x2="-8" y2="-8" stroke="#00d4ff" strokeWidth="1" opacity="0.7">
              {animated && (
                <animate attributeName="opacity" 
                         values="0.7;1;0.7" dur="1.5s" repeatCount="indefinite"/>
              )}
            </line>
            <line x1="0" y1="0" x2="8" y2="-8" stroke="#00d4ff" strokeWidth="1" opacity="0.7">
              {animated && (
                <animate attributeName="opacity" 
                         values="0.5;0.9;0.5" dur="1.8s" repeatCount="indefinite"/>
              )}
            </line>
            <line x1="0" y1="0" x2="-8" y2="8" stroke="#00d4ff" strokeWidth="1" opacity="0.7">
              {animated && (
                <animate attributeName="opacity" 
                         values="0.6;1;0.6" dur="1.3s" repeatCount="indefinite"/>
              )}
            </line>
            <line x1="0" y1="0" x2="8" y2="8" stroke="#00d4ff" strokeWidth="1" opacity="0.7">
              {animated && (
                <animate attributeName="opacity" 
                         values="0.8;0.4;0.8" dur="1.7s" repeatCount="indefinite"/>
              )}
            </line>
          </g>
          
          {/* Letter N (stylized) inside hexagon */}
          <path d="M 22 35 L 22 25 L 38 35 L 38 25" 
                fill="none" 
                stroke="#ffffff" 
                strokeWidth="2" 
                strokeLinecap="round"
                filter="url(#neoGlow)"/>
        </g>
      )}
      
      {/* Company Name */}
      {(variant === 'text' || variant === 'full') && (
        <g>
          <text x={variant === 'text' ? "0" : "55"} y={variant === 'text' ? "25" : "35"} 
                fontFamily="'Space Grotesk', 'Inter', sans-serif" 
                fontSize={variant === 'text' ? "24" : "20"} 
                fontWeight="bold" 
                fill="#ffffff">
            Neo<tspan fill="url(#neoGradient)">Technology</tspan>
          </text>
          
          {/* Tagline */}
          {variant === 'full' && (
            <text x="55" y="48" 
                  fontFamily="'Inter', sans-serif" 
                  fontSize="8" 
                  fill="#a0a0a0">
              AI-Powered Solutions by Fahad Almansour
            </text>
          )}
        </g>
      )}
      
      {/* Animated Pulse Effect */}
      {animated && variant !== 'text' && (
        <circle cx="30" cy="30" r="25" 
                fill="none" 
                stroke="#00d4ff" 
                strokeWidth="0.5" 
                opacity="0">
          <animate attributeName="r" 
                   values="25;35;25" 
                   dur="3s" 
                   repeatCount="indefinite"/>
          <animate attributeName="opacity" 
                   values="0;0.3;0" 
                   dur="3s" 
                   repeatCount="indefinite"/>
        </circle>
      )}
    </svg>
  );
};

// Convenience components for specific variants
export const NeoIcon: React.FC<Omit<NeoLogoProps, 'variant'>> = (props) => (
  <NeoLogo {...props} variant="icon" />
);

export const NeoText: React.FC<Omit<NeoLogoProps, 'variant'>> = (props) => (
  <NeoLogo {...props} variant="text" />
);

// Compact logo for header/navigation use
export const NeoCompactLogo: React.FC<Omit<NeoLogoProps, 'variant'>> = ({ 
  width = 180, 
  height = 45, 
  animated = true,
  className = ''
}) => (
  <NeoLogo 
    width={width} 
    height={height} 
    variant="full" 
    animated={animated}
    className={`hover:scale-105 transition-transform duration-300 ${className}`}
  />
);

export default NeoLogo;