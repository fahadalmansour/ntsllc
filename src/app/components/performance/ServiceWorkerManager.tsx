import { useEffect, useState } from 'react';

interface ServiceWorkerState {
  isSupported: boolean;
  isRegistered: boolean;
  isActivated: boolean;
  updateAvailable: boolean;
  error: string | null;
}

const isProductionEnvironment = () => {
  if (typeof window === 'undefined') return false;
  
  const hostname = window.location.hostname;
  
  // ✅ SAFE: Only register in actual production environments
  return !hostname.includes('localhost') && 
         !hostname.includes('127.0.0.1') && 
         !hostname.includes('figma') &&
         !hostname.includes('dev') &&
         !hostname.includes('test') &&
         !hostname.includes('preview') &&
         process.env.NODE_ENV === 'production';
};

function useServiceWorker(): ServiceWorkerState {
  const [state, setState] = useState<ServiceWorkerState>({
    isSupported: false,
    isRegistered: false,
    isActivated: false,
    updateAvailable: false,
    error: null
  });

  useEffect(() => {
    // ✅ CRITICAL: Graceful early exit for development environments
    if (!isProductionEnvironment()) {
      setState(prev => ({ 
        ...prev, 
        isSupported: false,
        error: null // Don't show errors in development
      }));
      return;
    }

    // ✅ SAFE: Check service worker support
    if (!('serviceWorker' in navigator)) {
      setState(prev => ({ ...prev, isSupported: false }));
      return;
    }

    setState(prev => ({ ...prev, isSupported: true }));

    // ✅ SAFE: Register service worker with comprehensive error handling
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('✅ ServiceWorker registered successfully:', registration.scope);
        
        setState(prev => ({ 
          ...prev, 
          isRegistered: true,
          error: null
        }));

        // ✅ SAFE: Handle updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                setState(prev => ({ ...prev, updateAvailable: true }));
              }
            });
          }
        });

        // ✅ SAFE: Check if already activated
        if (registration.active) {
          setState(prev => ({ ...prev, isActivated: true }));
        }
      })
      .catch((error) => {
        // ✅ GRACEFUL: Log but don't break app
        console.warn('⚠️ ServiceWorker registration failed (app continues normally):', error);
        setState(prev => ({ 
          ...prev, 
          error: null, // Don't show user-facing errors
          isRegistered: false 
        }));
      });

    // ✅ SAFE: Listen for service worker ready state
    navigator.serviceWorker.ready
      .then(() => {
        setState(prev => ({ ...prev, isActivated: true }));
      })
      .catch((error) => {
        console.warn('⚠️ ServiceWorker ready failed (app continues normally):', error);
      });

  }, []);

  return state;
}

export default useServiceWorker;