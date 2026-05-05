import React, { Suspense, lazy, ComponentType } from 'react';
import { Loader2, Zap, Activity } from 'lucide-react';

interface LazyWrapperProps {
  loading?: boolean;
  error?: boolean;
  loadingText?: string;
  minLoadTime?: number;
}

// Simplified loading component to prevent timeouts
export const AdvancedLoader: React.FC<LazyWrapperProps> = ({ 
  loadingText = "Loading..."
}) => {
  return (
    <div className="min-h-[200px] bg-[#0B0D12] terminal-theme flex items-center justify-center">
      <div className="text-center space-y-3">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#4AE54A] border-t-transparent mx-auto"></div>
        <div className="font-mono text-[#C0C5CE] text-sm">{loadingText}</div>
      </div>
    </div>
  );
};

// Optimized lazy loading with retry mechanism and displayName handling
export function createLazyComponent<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  options: {
    retryCount?: number;
    displayName?: string;
  } = {}
) {
  const { retryCount = 3, displayName } = options;

  // Create retry wrapper
  const loadWithRetry = async (retries = retryCount): Promise<{ default: T }> => {
    try {
      const module = await importFunc();
      
      // Ensure the component has a displayName for debugging
      if (module.default && typeof module.default === 'function') {
        if (!module.default.displayName && displayName) {
          module.default.displayName = displayName;
        }
      }
      
      return module;
    } catch (error) {
      if (retries > 0) {
        console.warn(`Component load failed, retrying... (${retryCount - retries + 1}/${retryCount})`);
        // Wait before retry with exponential backoff
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount - retries) * 1000));
        return loadWithRetry(retries - 1);
      }
      throw error;
    }
  };

  const LazyComponent = lazy(loadWithRetry);
  
  // Set displayName for the lazy component wrapper
  if (displayName) {
    LazyComponent.displayName = `Lazy(${displayName})`;
  }
  
  return LazyComponent;
}

// Preload function for critical components
export function preloadComponent(importFunc: () => Promise<{ default: ComponentType<any> }>) {
  importFunc().catch(error => {
    console.warn('Component preload failed:', error);
  });
}

// Smart preloader that preloads based on user behavior
export class SmartPreloader {
  private static preloadedComponents = new Set<string>();
  private static intersectionObserver?: IntersectionObserver;

  static preloadOnHover(
    element: HTMLElement, 
    importFunc: () => Promise<{ default: ComponentType<any> }>,
    componentName: string
  ) {
    if (this.preloadedComponents.has(componentName)) return;

    const handleHover = () => {
      this.preloadedComponents.add(componentName);
      importFunc().catch(error => {
        console.warn(`Preload failed for ${componentName}:`, error);
        this.preloadedComponents.delete(componentName);
      });
      element.removeEventListener('mouseenter', handleHover);
    };

    element.addEventListener('mouseenter', handleHover, { once: true });
  }

  static preloadOnVisible(
    element: HTMLElement,
    importFunc: () => Promise<{ default: ComponentType<any> }>,
    componentName: string
  ) {
    if (this.preloadedComponents.has(componentName)) return;

    if (!this.intersectionObserver) {
      this.intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const data = entry.target.getAttribute('data-preload');
              if (data) {
                const { importFunc, componentName } = JSON.parse(data);
                this.preloadedComponents.add(componentName);
                importFunc().catch((error: Error) => {
                  console.warn(`Preload failed for ${componentName}:`, error);
                  this.preloadedComponents.delete(componentName);
                });
                this.intersectionObserver?.unobserve(entry.target);
              }
            }
          });
        },
        {
          rootMargin: '100px' // Start loading 100px before element comes into view
        }
      );
    }

    element.setAttribute('data-preload', JSON.stringify({ importFunc, componentName }));
    this.intersectionObserver.observe(element);
  }
}

// Bundle size analyzer
export class BundleAnalyzer {
  private static chunks = new Map<string, number>();

  static recordChunkLoad(chunkName: string, size: number) {
    this.chunks.set(chunkName, size);
    console.log(`Chunk loaded: ${chunkName} (${(size / 1024).toFixed(2)}KB)`);
  }

  static getLoadedChunks() {
    return Array.from(this.chunks.entries()).map(([name, size]) => ({
      name,
      size,
      sizeKB: (size / 1024).toFixed(2)
    }));
  }

  static getTotalSize() {
    return Array.from(this.chunks.values()).reduce((total, size) => total + size, 0);
  }
}

// Simplified Service Worker registration to prevent timeout issues
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      // Skip service worker registration in development to prevent issues
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.info('Service Worker skipped in development');
        return null;
      }
      
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered:', registration);
      return registration;
    } catch (error) {
      console.info('Service Worker registration failed:', error);
      return null;
    }
  }
  return null;
};