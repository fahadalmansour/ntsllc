import React, { useState, useEffect } from 'react';

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  memoryUsage: number;
}

function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    renderTime: 0,
    memoryUsage: 0
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // ✅ SAFE: Only show in development
    if (process.env.NODE_ENV !== 'development') return;

    // ✅ SAFE: Simple performance tracking
    const updateMetrics = () => {
      try {
        const navigation = performance.getEntriesByType('navigation')[0] as any;
        const memory = (performance as any).memory;
        
        setMetrics({
          loadTime: navigation?.loadEventEnd - navigation?.loadEventStart || 0,
          renderTime: performance.now(),
          memoryUsage: memory ? Math.round(memory.usedJSHeapSize / 1024 / 1024) : 0
        });
      } catch (error) {
        // ✅ GRACEFUL: Ignore errors silently
        console.debug('Performance monitoring unavailable');
      }
    };

    // ✅ SAFE: Update every 5 seconds
    const interval = setInterval(updateMetrics, 5000);
    updateMetrics();

    return () => clearInterval(interval);
  }, []);

  // ✅ HIDE: Don't show in production
  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="bg-gray-800 text-green-400 p-2 rounded-lg border border-green-400/30 font-mono text-xs"
      >
        ⚡ PERF
      </button>
      
      {isVisible && (
        <div className="mt-2 bg-gray-900 border border-green-400/30 rounded-lg p-3 text-xs font-mono space-y-1">
          <div className="text-green-400">Performance Monitor</div>
          <div className="text-gray-300">Load: {metrics.loadTime.toFixed(0)}ms</div>
          <div className="text-gray-300">Render: {metrics.renderTime.toFixed(0)}ms</div>
          <div className="text-gray-300">Memory: {metrics.memoryUsage}MB</div>
        </div>
      )}
    </div>
  );
}

export default PerformanceMonitor;