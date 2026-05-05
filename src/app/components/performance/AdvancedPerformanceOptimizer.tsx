import React, { useState, useEffect } from 'react';

function AdvancedPerformanceOptimizer() {
  const [isActive, setIsActive] = useState(false);
  const [stats, setStats] = useState({
    fps: 0,
    memory: 0,
    components: 0
  });

  useEffect(() => {
    // ✅ SAFE: Only run in development
    if (process.env.NODE_ENV !== 'development') return;

    if (!isActive) return;

    // ✅ SIMPLE: Basic FPS monitoring
    let frames = 0;
    let lastTime = performance.now();

    const measureFPS = () => {
      frames++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime + 1000) {
        setStats(prev => ({
          ...prev,
          fps: Math.round((frames * 1000) / (currentTime - lastTime)),
          memory: (performance as any).memory ? 
            Math.round((performance as any).memory.usedJSHeapSize / 1024 / 1024) : 0,
          components: document.querySelectorAll('[data-component]').length
        }));
        
        frames = 0;
        lastTime = currentTime;
      }
      
      if (isActive) {
        requestAnimationFrame(measureFPS);
      }
    };

    requestAnimationFrame(measureFPS);
  }, [isActive]);

  // ✅ HIDE: Don't show in production
  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div className="fixed bottom-16 left-4 z-50">
      <button
        onClick={() => setIsActive(!isActive)}
        className={`p-2 rounded-lg border font-mono text-xs transition-colors ${
          isActive 
            ? 'bg-green-900 text-green-400 border-green-400/30' 
            : 'bg-gray-800 text-gray-400 border-gray-400/30'
        }`}
      >
        🚀 OPT
      </button>
      
      {isActive && (
        <div className="mt-2 bg-gray-900 border border-green-400/30 rounded-lg p-3 text-xs font-mono space-y-1">
          <div className="text-green-400">Performance Optimizer</div>
          <div className="text-gray-300">FPS: {stats.fps}</div>
          <div className="text-gray-300">Memory: {stats.memory}MB</div>
          <div className="text-gray-300">Components: {stats.components}</div>
        </div>
      )}
    </div>
  );
}

export default AdvancedPerformanceOptimizer;