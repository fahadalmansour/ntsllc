import React from 'react';

interface AnimatedIconProps {
  size?: number;
  className?: string;
  speed?: 'slow' | 'normal' | 'fast';
}

export const LoadingTerminal: React.FC<AnimatedIconProps> = ({ 
  size = 40, 
  className = "",
  speed = 'normal'
}) => {
  const speedValues = {
    slow: '3s',
    normal: '2s',
    fast: '1s'
  };

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 40 40" 
      className={className}
    >
      <defs>
        <linearGradient id="terminalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4AE54A" />
          <stop offset="50%" stopColor="#3DD83D" />
          <stop offset="100%" stopColor="#2FC72F" />
        </linearGradient>
      </defs>
      
      <rect 
        x="2" 
        y="8" 
        width="36" 
        height="24" 
        rx="2" 
        stroke="url(#terminalGradient)" 
        strokeWidth="2" 
        fill="none"
      />
      
      <polyline 
        points="6,14 10,18 6,22" 
        stroke="#4AE54A" 
        strokeWidth="2" 
        fill="none"
      >
        <animate 
          attributeName="opacity" 
          values="0.3;1;0.3" 
          dur={speedValues[speed]} 
          repeatCount="indefinite"
        />
      </polyline>
      
      <rect 
        x="12" 
        y="20" 
        width="8" 
        height="2" 
        fill="#4AE54A"
      >
        <animate 
          attributeName="opacity" 
          values="0;1;0" 
          dur="1s" 
          repeatCount="indefinite"
        />
      </rect>
    </svg>
  );
};

export const DataStream: React.FC<AnimatedIconProps> = ({ 
  size = 40, 
  className = "",
  speed = 'normal'
}) => {
  const speedValues = {
    slow: '4s',
    normal: '2.5s',
    fast: '1.5s'
  };

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 40 40" 
      className={className}
    >
      <defs>
        <linearGradient id="dataGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="50%" stopColor="#4AE54A" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
      
      {/* Data lines */}
      {[0, 1, 2, 3].map(i => (
        <line 
          key={i}
          x1="0" 
          y1={10 + i * 6} 
          x2="40" 
          y2={10 + i * 6} 
          stroke="url(#dataGradient)" 
          strokeWidth="2"
        >
          <animateTransform
            attributeName="transform"
            type="translate"
            values="-40,0;40,0;-40,0"
            dur={speedValues[speed]}
            repeatCount="indefinite"
            begin={`${i * 0.2}s`}
          />
        </line>
      ))}
      
      {/* Data packets */}
      {[0, 1, 2].map(i => (
        <circle 
          key={i}
          r="2" 
          fill="#4AE54A"
          opacity="0.8"
        >
          <animateMotion
            dur={speedValues[speed]}
            repeatCount="indefinite"
            begin={`${i * 0.7}s`}
          >
            <mpath xlinkHref={`#path${i}`}/>
          </animateMotion>
        </circle>
      ))}
      
      {/* Hidden paths for motion */}
      <defs>
        <path id="path0" d="M0,12 L40,12"/>
        <path id="path1" d="M0,20 L40,20"/>
        <path id="path2" d="M0,28 L40,28"/>
      </defs>
    </svg>
  );
};

export const NeuralPulse: React.FC<AnimatedIconProps> = ({ 
  size = 40, 
  className = "",
  speed = 'normal'
}) => {
  const speedValues = {
    slow: '3s',
    normal: '2s',
    fast: '1s'
  };

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 40 40" 
      className={className}
    >
      {/* Central node */}
      <circle cx="20" cy="20" r="3" fill="#4AE54A">
        <animate 
          attributeName="r" 
          values="3;5;3" 
          dur={speedValues[speed]} 
          repeatCount="indefinite"
        />
      </circle>
      
      {/* Surrounding nodes */}
      {[0, 1, 2, 3, 4, 5].map(i => {
        const angle = (i * 60) * Math.PI / 180;
        const x = 20 + 12 * Math.cos(angle);
        const y = 20 + 12 * Math.sin(angle);
        
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="2" fill="#4AE54A" opacity="0.7">
              <animate 
                attributeName="opacity" 
                values="0.3;1;0.3" 
                dur={speedValues[speed]} 
                repeatCount="indefinite"
                begin={`${i * 0.2}s`}
              />
            </circle>
            <line x1="20" y1="20" x2={x} y2={y} stroke="#4AE54A" strokeWidth="1" opacity="0.5">
              <animate 
                attributeName="opacity" 
                values="0.2;0.8;0.2" 
                dur={speedValues[speed]} 
                repeatCount="indefinite"
                begin={`${i * 0.2}s`}
              />
            </line>
          </g>
        );
      })}
      
      {/* Pulse rings */}
      <circle cx="20" cy="20" r="8" stroke="#4AE54A" strokeWidth="1" fill="none" opacity="0.3">
        <animate 
          attributeName="r" 
          values="8;16;8" 
          dur={speedValues[speed]} 
          repeatCount="indefinite"
        />
        <animate 
          attributeName="opacity" 
          values="0.5;0;0.5" 
          dur={speedValues[speed]} 
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
};

export const QuantumField: React.FC<AnimatedIconProps> = ({ 
  size = 40, 
  className = "",
  speed = 'normal'
}) => {
  const speedValues = {
    slow: '6s',
    normal: '4s',
    fast: '2s'
  };

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 40 40" 
      className={className}
    >
      <defs>
        <radialGradient id="quantumGradient">
          <stop offset="0%" stopColor="#4AE54A" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#4AE54A" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#4AE54A" stopOpacity="0.1" />
        </radialGradient>
      </defs>
      
      {/* Quantum field */}
      <circle cx="20" cy="20" r="18" fill="url(#quantumGradient)">
        <animate 
          attributeName="r" 
          values="18;22;18" 
          dur={speedValues[speed]} 
          repeatCount="indefinite"
        />
      </circle>
      
      {/* Orbiting particles */}
      {[0, 1, 2].map(i => {
        const delay = i * 1.33;
        return (
          <circle key={i} r="1.5" fill="#4AE54A">
            <animateTransform
              attributeName="transform"
              type="rotate"
              values={`0 20 20;360 20 20`}
              dur={speedValues[speed]}
              repeatCount="indefinite"
              begin={`${delay}s`}
            />
            <animateMotion
              dur={speedValues[speed]}
              repeatCount="indefinite"
              begin={`${delay}s`}
            >
              <mpath xlinkHref="#orbit"/>
            </animateMotion>
          </circle>
        );
      })}
      
      {/* Central core */}
      <circle cx="20" cy="20" r="2" fill="#4AE54A">
        <animate 
          attributeName="opacity" 
          values="0.5;1;0.5" 
          dur="1s" 
          repeatCount="indefinite"
        />
      </circle>
      
      {/* Hidden orbit path */}
      <defs>
        <path id="orbit" d="M20,8 A12,12 0 1,1 20,32 A12,12 0 1,1 20,8"/>
      </defs>
    </svg>
  );
};

export const MatrixRain: React.FC<AnimatedIconProps> = ({ 
  size = 40, 
  className = "",
  speed = 'normal'
}) => {
  const speedValues = {
    slow: '3s',
    normal: '2s',
    fast: '1s'
  };

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 40 40" 
      className={className}
    >
      {/* Matrix columns */}
      {[0, 1, 2, 3, 4].map(col => (
        <g key={col}>
          {[0, 1, 2, 3, 4, 5].map(row => (
            <text
              key={row}
              x={4 + col * 8}
              y={4 + row * 6}
              fontSize="4"
              fill="#4AE54A"
              fontFamily="monospace"
              opacity="0"
            >
              {Math.random() > 0.5 ? '1' : '0'}
              <animate
                attributeName="opacity"
                values="0;1;0"
                dur={speedValues[speed]}
                repeatCount="indefinite"
                begin={`${(col * 0.2) + (row * 0.1)}s`}
              />
            </text>
          ))}
        </g>
      ))}
      
      {/* Falling streams */}
      {[0, 1, 2, 3, 4].map(i => (
        <line
          key={i}
          x1={4 + i * 8}
          y1="0"
          x2={4 + i * 8}
          y2="40"
          stroke="#4AE54A"
          strokeWidth="1"
          opacity="0.3"
        >
          <animate
            attributeName="opacity"
            values="0;0.7;0"
            dur={speedValues[speed]}
            repeatCount="indefinite"
            begin={`${i * 0.3}s`}
          />
        </line>
      ))}
    </svg>
  );
};

export const HolographicGrid: React.FC<AnimatedIconProps> = ({ 
  size = 40, 
  className = "",
  speed = 'normal'
}) => {
  const speedValues = {
    slow: '4s',
    normal: '3s',
    fast: '2s'
  };

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 40 40" 
      className={className}
    >
      <defs>
        <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4AE54A" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#4AE54A" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#4AE54A" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      
      {/* Grid lines */}
      {[0, 1, 2, 3, 4].map(i => (
        <g key={i}>
          <line
            x1={i * 10}
            y1="0"
            x2={i * 10}
            y2="40"
            stroke="url(#gridGradient)"
            strokeWidth="1"
          >
            <animate
              attributeName="opacity"
              values="0.3;1;0.3"
              dur={speedValues[speed]}
              repeatCount="indefinite"
              begin={`${i * 0.2}s`}
            />
          </line>
          <line
            x1="0"
            y1={i * 10}
            x2="40"
            y2={i * 10}
            stroke="url(#gridGradient)"
            strokeWidth="1"
          >
            <animate
              attributeName="opacity"
              values="0.3;1;0.3"
              dur={speedValues[speed]}
              repeatCount="indefinite"
              begin={`${i * 0.2}s`}
            />
          </line>
        </g>
      ))}
      
      {/* Grid intersections */}
      {[1, 2, 3].map(x => 
        [1, 2, 3].map(y => (
          <circle
            key={`${x}-${y}`}
            cx={x * 10}
            cy={y * 10}
            r="1.5"
            fill="#4AE54A"
          >
            <animate
              attributeName="r"
              values="1;2;1"
              dur={speedValues[speed]}
              repeatCount="indefinite"
              begin={`${(x + y) * 0.3}s`}
            />
            <animate
              attributeName="opacity"
              values="0.5;1;0.5"
              dur={speedValues[speed]}
              repeatCount="indefinite"
              begin={`${(x + y) * 0.3}s`}
            />
          </circle>
        ))
      )}
    </svg>
  );
};

// Export all animated icons
export const AnimatedIcons = {
  LoadingTerminal,
  DataStream,
  NeuralPulse,
  QuantumField,
  MatrixRain,
  HolographicGrid
};

export default AnimatedIcons;