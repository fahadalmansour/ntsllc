import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, Download, Smartphone, Monitor, RefreshCw, Bell, BellOff } from 'lucide-react';

interface PWAState {
  isOnline: boolean;
  isInstallable: boolean;
  isInstalled: boolean;
  hasUpdate: boolean;
  notificationsEnabled: boolean;
}

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const PWAManager: React.FC = () => {
  const [pwaState, setPwaState] = useState<PWAState>({
    isOnline: navigator.onLine,
    isInstallable: false,
    isInstalled: false,
    hasUpdate: false,
    notificationsEnabled: false
  });

  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);

  useEffect(() => {
    // Check if already installed
    const isInstalled = window.matchMedia('(display-mode: standalone)').matches || 
                       (window.navigator as any).standalone === true;
    
    // Check notification permission
    const notificationsEnabled = Notification.permission === 'granted';

    setPwaState(prev => ({ ...prev, isInstalled, notificationsEnabled }));

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setPwaState(prev => ({ ...prev, isInstallable: true }));
      
      // Show install prompt after a delay if not installed
      if (!isInstalled) {
        setTimeout(() => setShowInstallPrompt(true), 5000);
      }
    };

    // Listen for successful install
    const handleAppInstalled = () => {
      console.log('PWA was installed');
      setPwaState(prev => ({ ...prev, isInstalled: true, isInstallable: false }));
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
    };

    // Listen for online/offline changes
    const handleOnline = () => setPwaState(prev => ({ ...prev, isOnline: true }));
    const handleOffline = () => setPwaState(prev => ({ ...prev, isOnline: false }));

    // Service Worker update detection
    const handleServiceWorkerUpdate = () => {
      setPwaState(prev => ({ ...prev, hasUpdate: true }));
      setShowUpdatePrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Register service worker update listener
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', handleServiceWorkerUpdate);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.removeEventListener('controllerchange', handleServiceWorkerUpdate);
      }
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    
    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const handleUpdateClick = () => {
    window.location.reload();
  };

  const requestNotificationPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      setPwaState(prev => ({ ...prev, notificationsEnabled: permission === 'granted' }));
      
      if (permission === 'granted') {
        new Notification('Neo Technology', {
          body: 'Notifications enabled successfully!',
          icon: '/favicon.ico',
          badge: '/favicon.ico'
        });
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };

  return (
    <>
      {/* Connection Status */}
      <div className="fixed top-4 right-4 z-50">
        <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-mono transition-all duration-300 ${
          pwaState.isOnline 
            ? 'bg-[#4AE54A]/20 border-[#4AE54A]/40 text-[#4AE54A]' 
            : 'bg-red-500/20 border-red-400/40 text-red-400'
        }`}>
          {pwaState.isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
          {pwaState.isOnline ? 'Online' : 'Offline'}
        </div>
      </div>

      {/* Install Prompt */}
      {showInstallPrompt && !pwaState.isInstalled && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:w-96 z-50">
          <div className="bg-[#12151C] border border-[#4AE54A]/40 rounded-lg p-4 shadow-lg shadow-[#4AE54A]/10">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-[#4AE54A]/20 rounded-lg">
                <Smartphone className="w-5 h-5 text-[#4AE54A]" />
              </div>
              <div className="flex-1">
                <h3 className="font-mono text-sm text-[#C0C5CE] mb-1">Install Neo Technology</h3>
                <p className="text-xs text-[#C0C5CE]/70 mb-3">
                  Install our app for faster access and offline capabilities
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={handleInstallClick}
                    className="bg-[#4AE54A] text-[#0B0D12] font-mono text-xs px-3 py-1.5 rounded hover:bg-[#4AE54A]/90 transition-colors"
                  >
                    Install
                  </button>
                  <button
                    onClick={() => setShowInstallPrompt(false)}
                    className="border border-[#C0C5CE]/40 text-[#C0C5CE] font-mono text-xs px-3 py-1.5 rounded hover:bg-[#C0C5CE]/10 transition-colors"
                  >
                    Later
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Update Prompt */}
      {showUpdatePrompt && (
        <div className="fixed top-4 left-4 right-4 md:left-auto md:w-96 z-50">
          <div className="bg-[#12151C] border border-blue-400/40 rounded-lg p-4 shadow-lg shadow-blue-400/10">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <RefreshCw className="w-5 h-5 text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-mono text-sm text-[#C0C5CE] mb-1">Update Available</h3>
                <p className="text-xs text-[#C0C5CE]/70 mb-3">
                  A new version is available with improvements and bug fixes
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={handleUpdateClick}
                    className="bg-blue-500 text-white font-mono text-xs px-3 py-1.5 rounded hover:bg-blue-600 transition-colors"
                  >
                    Update Now
                  </button>
                  <button
                    onClick={() => setShowUpdatePrompt(false)}
                    className="border border-[#C0C5CE]/40 text-[#C0C5CE] font-mono text-xs px-3 py-1.5 rounded hover:bg-[#C0C5CE]/10 transition-colors"
                  >
                    Later
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PWA Controls in bottom corner */}
      <div className="fixed bottom-4 left-4 z-40">
        <div className="flex flex-col gap-2">
          {/* Install button (when installable but not installed) */}
          {pwaState.isInstallable && !pwaState.isInstalled && (
            <button
              onClick={handleInstallClick}
              className="p-2 bg-[#4AE54A]/20 hover:bg-[#4AE54A]/30 border border-[#4AE54A]/40 rounded-lg transition-all duration-200 group"
              title="Install App"
            >
              <Download className="w-4 h-4 text-[#4AE54A] group-hover:scale-110 transition-transform" />
            </button>
          )}

          {/* Notification toggle */}
          <button
            onClick={requestNotificationPermission}
            className={`p-2 border rounded-lg transition-all duration-200 group ${
              pwaState.notificationsEnabled
                ? 'bg-[#4AE54A]/20 hover:bg-[#4AE54A]/30 border-[#4AE54A]/40'
                : 'bg-[#C0C5CE]/20 hover:bg-[#C0C5CE]/30 border-[#C0C5CE]/40'
            }`}
            title={pwaState.notificationsEnabled ? 'Notifications Enabled' : 'Enable Notifications'}
          >
            {pwaState.notificationsEnabled ? (
              <Bell className="w-4 h-4 text-[#4AE54A] group-hover:scale-110 transition-transform" />
            ) : (
              <BellOff className="w-4 h-4 text-[#C0C5CE] group-hover:scale-110 transition-transform" />
            )}
          </button>

          {/* App info (when installed) */}
          {pwaState.isInstalled && (
            <div className="p-2 bg-[#4AE54A]/20 border border-[#4AE54A]/40 rounded-lg">
              <Monitor className="w-4 h-4 text-[#4AE54A]" title="App Installed" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// Service Worker registration helper
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered successfully:', registration);
      
      // Check for updates periodically
      setInterval(() => {
        registration.update();
      }, 60000); // Check every minute
      
      return registration;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  }
};

// Push notification helpers
export const subscribeToPushNotifications = async () => {
  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: process.env.NEXT_PUBLIC_VAPID_KEY // Add your VAPID key
    });
    
    console.log('Push subscription successful:', subscription);
    return subscription;
  } catch (error) {
    console.error('Push subscription failed:', error);
  }
};

// PWA utilities
export const PWAUtils = {
  isStandalone: () => {
    return window.matchMedia('(display-mode: standalone)').matches || 
           (window.navigator as any).standalone === true;
  },
  
  isOnline: () => navigator.onLine,
  
  getInstallPrompt: () => {
    return new Promise<BeforeInstallPromptEvent>((resolve, reject) => {
      const handlePrompt = (e: Event) => {
        e.preventDefault();
        window.removeEventListener('beforeinstallprompt', handlePrompt);
        resolve(e as BeforeInstallPromptEvent);
      };
      
      window.addEventListener('beforeinstallprompt', handlePrompt);
      
      // Timeout after 10 seconds
      setTimeout(() => {
        window.removeEventListener('beforeinstallprompt', handlePrompt);
        reject(new Error('Install prompt timeout'));
      }, 10000);
    });
  }
};