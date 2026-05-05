import { useEffect, useCallback, useRef, useState } from 'react';

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  memoryUsage: number;
  fps: number;
  bundleSize: number;
  cacheHitRatio: number;
}

interface OptimizationConfig {
  enableLazyLoading: boolean;
  enablePrefetching: boolean;
  enableServiceWorker: boolean;
  maxCacheSize: number;
  preloadDelay: number;
}

export function usePerformanceOptimization(config: Partial<OptimizationConfig> = {}) {
  const defaultConfig: OptimizationConfig = {
    enableLazyLoading: true,
    enablePrefetching: true,
    enableServiceWorker: true,
    maxCacheSize: 100,
    preloadDelay: 2000
  };

  const finalConfig = { ...defaultConfig, ...config };
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    renderTime: 0,
    memoryUsage: 0,
    fps: 60,
    bundleSize: 0,
    cacheHitRatio: 0
  });

  const performanceObserverRef = useRef<PerformanceObserver | null>(null);
  const fpsCounterRef = useRef({ frames: 0, lastTime: performance.now() });
  const renderStartRef = useRef<number>(0);

  // Measure render performance
  const measureRenderStart = useCallback(() => {
    renderStartRef.current = performance.now();
  }, []);

  const measureRenderEnd = useCallback(() => {
    const renderTime = performance.now() - renderStartRef.current;
    setMetrics(prev => ({ ...prev, renderTime }));
  }, []);

  // FPS monitoring
  const measureFPS = useCallback(() => {
    const now = performance.now();
    const delta = now - fpsCounterRef.current.lastTime;
    
    fpsCounterRef.current.frames++;
    
    if (delta >= 1000) {
      const fps = Math.round((fpsCounterRef.current.frames * 1000) / delta);
      setMetrics(prev => ({ ...prev, fps }));
      fpsCounterRef.current.frames = 0;
      fpsCounterRef.current.lastTime = now;
    }
    
    requestAnimationFrame(measureFPS);
  }, []);

  // Memory monitoring
  const measureMemory = useCallback(() => {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      const memoryUsage = Math.round(memory.usedJSHeapSize / 1048576); // MB
      setMetrics(prev => ({ ...prev, memoryUsage }));
    }
  }, []);

  // Resource prefetching
  const prefetchResource = useCallback(async (url: string, type: 'script' | 'style' | 'image' = 'script') => {
    if (!finalConfig.enablePrefetching) return;

    try {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.as = type;
      link.href = url;
      
      if (type === 'style') {
        link.onload = () => {
          link.rel = 'stylesheet';
        };
      }
      
      document.head.appendChild(link);
    } catch (error) {
      console.warn('Failed to prefetch resource:', url, error);
    }
  }, [finalConfig.enablePrefetching]);

  // Preload critical resources
  const preloadCriticalResources = useCallback(async (resources: string[]) => {
    if (!finalConfig.enablePrefetching) return;

    for (const resource of resources) {
      setTimeout(() => {
        prefetchResource(resource);
      }, finalConfig.preloadDelay);
    }
  }, [finalConfig.enablePrefetching, finalConfig.preloadDelay, prefetchResource]);

  // Bundle size calculation
  const calculateBundleSize = useCallback(async () => {
    try {
      const scripts = Array.from(document.querySelectorAll('script[src]'));
      let totalSize = 0;
      
      for (const script of scripts) {
        try {
          const response = await fetch((script as HTMLScriptElement).src, { method: 'HEAD' });
          const size = response.headers.get('content-length');
          if (size) totalSize += parseInt(size);
        } catch (error) {
          // Ignore CORS errors
        }
      }
      
      const bundleSizeKB = Math.round(totalSize / 1024);
      setMetrics(prev => ({ ...prev, bundleSize: bundleSizeKB }));
    } catch (error) {
      console.warn('Bundle size calculation failed:', error);
    }
  }, []);

  // Cache optimization
  const optimizeCache = useCallback(async () => {
    if (!('caches' in window)) return;

    try {
      const cacheNames = await caches.keys();
      let totalEntries = 0;
      
      for (const cacheName of cacheNames) {
        const cache = await caches.open(cacheName);
        const keys = await cache.keys();
        totalEntries += keys.length;
        
        // Clean up old entries if cache is too large
        if (keys.length > finalConfig.maxCacheSize) {
          const entriesToDelete = keys.length - finalConfig.maxCacheSize;
          for (let i = 0; i < entriesToDelete; i++) {
            await cache.delete(keys[i]);
          }
        }
      }
      
      // Calculate cache hit ratio (simplified)
      const cacheHitRatio = Math.min(totalEntries / 100, 1);
      setMetrics(prev => ({ ...prev, cacheHitRatio }));
    } catch (error) {
      console.warn('Cache optimization failed:', error);
    }
  }, [finalConfig.maxCacheSize]);

  // Image lazy loading with Intersection Observer
  const setupLazyLoading = useCallback(() => {
    if (!finalConfig.enableLazyLoading || !('IntersectionObserver' in window)) return;

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });

    // Observe all images with data-src
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));

    return () => imageObserver.disconnect();
  }, [finalConfig.enableLazyLoading]);

  // Service Worker optimization
  const optimizeServiceWorker = useCallback(async () => {
    if (!finalConfig.enableServiceWorker || !('serviceWorker' in navigator)) return;

    try {
      const registration = await navigator.serviceWorker.ready;
      
      // Send optimization commands to service worker
      if (registration.active) {
        registration.active.postMessage({
          type: 'OPTIMIZE_CACHE',
          maxSize: finalConfig.maxCacheSize
        });
      }
    } catch (error) {
      console.warn('Service Worker optimization failed:', error);
    }
  }, [finalConfig.enableServiceWorker, finalConfig.maxCacheSize]);

  // Web Vitals monitoring
  const setupWebVitalsMonitoring = useCallback(() => {
    if (!('PerformanceObserver' in window)) return;

    try {
      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          setMetrics(prev => ({ 
            ...prev, 
            loadTime: Math.round(lastEntry.startTime) 
          }));
        }
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // Navigation timing
      const navigationObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming;
            const loadTime = navEntry.loadEventEnd - navEntry.navigationStart;
            setMetrics(prev => ({ ...prev, loadTime: Math.round(loadTime) }));
          }
        });
      });
      navigationObserver.observe({ entryTypes: ['navigation'] });

      performanceObserverRef.current = lcpObserver;

      return () => {
        lcpObserver.disconnect();
        navigationObserver.disconnect();
      };
    } catch (error) {
      console.warn('Web Vitals monitoring setup failed:', error);
    }
  }, []);

  // Resource hints injection
  const injectResourceHints = useCallback(() => {
    const hints = [
      { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
      { rel: 'dns-prefetch', href: '//fonts.gstatic.com' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com', crossorigin: true },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true }
    ];

    hints.forEach(hint => {
      const link = document.createElement('link');
      link.rel = hint.rel;
      link.href = hint.href;
      if (hint.crossorigin) link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }, []);

  // Performance budget checker
  const checkPerformanceBudget = useCallback(() => {
    const budgets = {
      loadTime: 3000, // 3 seconds
      bundleSize: 500, // 500KB
      memoryUsage: 100, // 100MB
      fps: 55 // 55 FPS minimum
    };

    const violations: string[] = [];

    if (metrics.loadTime > budgets.loadTime) {
      violations.push(`Load time (${metrics.loadTime}ms) exceeds budget (${budgets.loadTime}ms)`);
    }
    
    if (metrics.bundleSize > budgets.bundleSize) {
      violations.push(`Bundle size (${metrics.bundleSize}KB) exceeds budget (${budgets.bundleSize}KB)`);
    }
    
    if (metrics.memoryUsage > budgets.memoryUsage) {
      violations.push(`Memory usage (${metrics.memoryUsage}MB) exceeds budget (${budgets.memoryUsage}MB)`);
    }
    
    if (metrics.fps < budgets.fps) {
      violations.push(`FPS (${metrics.fps}) below budget (${budgets.fps})`);
    }

    if (violations.length > 0 && process.env.NODE_ENV === 'development') {
      console.warn('Performance Budget Violations:', violations);
    }

    return {
      withinBudget: violations.length === 0,
      violations
    };
  }, [metrics]);

  // Critical CSS injection
  const injectCriticalCSS = useCallback(() => {
    const criticalCSS = `
      .hero-container{min-height:100vh;background:linear-gradient(135deg,#0a0a0a 0%,#12151C 100%);position:relative;overflow:hidden}
      .hero-title{font-size:clamp(2.5rem,8vw,6rem);font-weight:700;line-height:1.1;margin:0 0 1rem 0;background:linear-gradient(135deg,#00d4ff,#00ff88);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
      .btn-primary{display:inline-flex;align-items:center;gap:.5rem;padding:.875rem 2rem;background:linear-gradient(135deg,#00d4ff,#00ff88);color:#0a0a0a;text-decoration:none;border-radius:.5rem;font-weight:600;font-size:1rem;border:none;cursor:pointer;transition:all .3s cubic-bezier(.4,0,.2,1);transform:translateZ(0);will-change:transform}
      .loading-spinner{display:flex;align-items:center;justify-content:center;min-height:100vh;background:#0a0a0a}
    `;

    const style = document.createElement('style');
    style.textContent = criticalCSS;
    style.id = 'critical-css';
    document.head.insertBefore(style, document.head.firstChild);
  }, []);

  // Initialize optimizations
  useEffect(() => {
    const cleanupFunctions: (() => void)[] = [];

    // Start FPS monitoring
    requestAnimationFrame(measureFPS);

    // Setup web vitals monitoring
    const webVitalsCleanup = setupWebVitalsMonitoring();
    if (webVitalsCleanup) cleanupFunctions.push(webVitalsCleanup);

    // Setup lazy loading
    const lazyLoadingCleanup = setupLazyLoading();
    if (lazyLoadingCleanup) cleanupFunctions.push(lazyLoadingCleanup);

    // Inject resource hints
    injectResourceHints();

    // Inject critical CSS if not already present
    if (!document.getElementById('critical-css')) {
      injectCriticalCSS();
    }

    // Calculate initial metrics
    setTimeout(() => {
      measureMemory();
      calculateBundleSize();
      optimizeCache();
      optimizeServiceWorker();
    }, 1000);

    // Periodic optimization
    const optimizationInterval = setInterval(() => {
      measureMemory();
      optimizeCache();
      checkPerformanceBudget();
    }, 30000); // Every 30 seconds

    cleanupFunctions.push(() => clearInterval(optimizationInterval));

    return () => {
      cleanupFunctions.forEach(cleanup => cleanup());
      if (performanceObserverRef.current) {
        performanceObserverRef.current.disconnect();
      }
    };
  }, [
    measureFPS,
    setupWebVitalsMonitoring,
    setupLazyLoading,
    injectResourceHints,
    injectCriticalCSS,
    measureMemory,
    calculateBundleSize,
    optimizeCache,
    optimizeServiceWorker,
    checkPerformanceBudget
  ]);

  return {
    metrics,
    measureRenderStart,
    measureRenderEnd,
    prefetchResource,
    preloadCriticalResources,
    optimizeCache,
    checkPerformanceBudget,
    config: finalConfig
  };
}

// Performance monitoring component
export function usePerformanceMonitor() {
  const [performanceData, setPerformanceData] = useState({
    navigationTiming: null as PerformanceNavigationTiming | null,
    resourceTiming: [] as PerformanceResourceTiming[],
    paintTiming: [] as PerformanceEntry[],
    webVitals: {
      lcp: 0,
      fid: 0,
      cls: 0,
      ttfb: 0
    }
  });

  useEffect(() => {
    if (!('performance' in window)) return;

    const collectPerformanceData = () => {
      // Navigation timing
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      // Resource timing
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      
      // Paint timing
      const paints = performance.getEntriesByType('paint');

      setPerformanceData(prev => ({
        ...prev,
        navigationTiming: navigation,
        resourceTiming: resources,
        paintTiming: paints
      }));
    };

    // Collect initial data
    if (document.readyState === 'complete') {
      collectPerformanceData();
    } else {
      window.addEventListener('load', collectPerformanceData);
    }

    // Web Vitals collection
    if ('PerformanceObserver' in window) {
      try {
        // LCP
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          setPerformanceData(prev => ({
            ...prev,
            webVitals: { ...prev.webVitals, lcp: lastEntry.startTime }
          }));
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // FID
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          setPerformanceData(prev => ({
            ...prev,
            webVitals: { 
              ...prev.webVitals, 
              fid: lastEntry.processingStart - lastEntry.startTime 
            }
          }));
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

        // CLS
        const clsObserver = new PerformanceObserver((list) => {
          let clsValue = 0;
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
          setPerformanceData(prev => ({
            ...prev,
            webVitals: { ...prev.webVitals, cls: clsValue }
          }));
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });

        return () => {
          lcpObserver.disconnect();
          fidObserver.disconnect();
          clsObserver.disconnect();
        };
      } catch (error) {
        console.warn('Performance monitoring setup failed:', error);
      }
    }
  }, []);

  return performanceData;
}

export default usePerformanceOptimization;