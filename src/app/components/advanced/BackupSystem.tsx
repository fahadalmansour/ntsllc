import React, { useState, useEffect } from 'react';
import { 
  Download, Upload, Shield, AlertTriangle, CheckCircle, 
  Clock, Database, Cloud, HardDrive, RefreshCw, Settings,
  FileText, Archive, Trash2
} from 'lucide-react';

interface BackupData {
  id: string;
  timestamp: string;
  version: string;
  size: number;
  type: 'auto' | 'manual';
  description?: string;
  hash: string;
}

interface BackupSystemState {
  isEnabled: boolean;
  autoBackupInterval: number; // in minutes
  maxBackups: number;
  compressionEnabled: boolean;
  encryptionEnabled: boolean;
  cloudSyncEnabled: boolean;
  lastBackup?: string;
  nextBackup?: string;
  totalBackups: number;
  totalSize: number;
}

export const BackupSystem: React.FC = () => {
  const [backups, setBackups] = useState<BackupData[]>([]);
  const [settings, setSettings] = useState<BackupSystemState>({
    isEnabled: true,
    autoBackupInterval: 30, // 30 minutes
    maxBackups: 10,
    compressionEnabled: true,
    encryptionEnabled: true,
    cloudSyncEnabled: false,
    totalBackups: 0,
    totalSize: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    loadBackups();
    loadSettings();
    if (settings.isEnabled) {
      scheduleAutoBackup();
    }
  }, [settings.isEnabled, settings.autoBackupInterval]);

  const loadBackups = () => {
    try {
      const stored = localStorage.getItem('neo-backups');
      if (stored) {
        const backupList = JSON.parse(stored);
        setBackups(backupList);
        setSettings(prev => ({
          ...prev,
          totalBackups: backupList.length,
          totalSize: backupList.reduce((total: number, backup: BackupData) => total + backup.size, 0),
          lastBackup: backupList[0]?.timestamp
        }));
      }
    } catch (error) {
      console.error('Failed to load backups:', error);
    }
  };

  const loadSettings = () => {
    try {
      const stored = localStorage.getItem('neo-backup-settings');
      if (stored) {
        setSettings(prev => ({ ...prev, ...JSON.parse(stored) }));
      }
    } catch (error) {
      console.error('Failed to load backup settings:', error);
    }
  };

  const saveSettings = (newSettings: Partial<BackupSystemState>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem('neo-backup-settings', JSON.stringify(updated));
  };

  const generateBackupData = () => {
    // Collect application state
    const appData = {
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      userData: {
        preferences: localStorage.getItem('neo-preferences'),
        session: localStorage.getItem('neo-session'),
        cache: localStorage.getItem('neo-cache'),
        errors: localStorage.getItem('neo-errors')
      },
      systemInfo: {
        userAgent: navigator.userAgent,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        screen: {
          width: screen.width,
          height: screen.height
        }
      }
    };

    return JSON.stringify(appData);
  };

  const createBackup = async (type: 'auto' | 'manual' = 'manual', description?: string) => {
    setIsLoading(true);
    try {
      const data = generateBackupData();
      let processedData = data;

      // Compression simulation (in real app, use pako or similar)
      if (settings.compressionEnabled) {
        // Simulate compression by removing whitespace
        processedData = JSON.stringify(JSON.parse(data));
      }

      // Generate hash for integrity checking
      const hash = await generateHash(processedData);

      const backup: BackupData = {
        id: `backup-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        size: new Blob([processedData]).size,
        type,
        description,
        hash
      };

      // Store backup data
      localStorage.setItem(`neo-backup-${backup.id}`, processedData);

      // Update backup list
      const updatedBackups = [backup, ...backups].slice(0, settings.maxBackups);
      setBackups(updatedBackups);
      localStorage.setItem('neo-backups', JSON.stringify(updatedBackups));

      // Clean up old backups
      if (backups.length >= settings.maxBackups) {
        const toDelete = backups.slice(settings.maxBackups - 1);
        toDelete.forEach(backup => {
          localStorage.removeItem(`neo-backup-${backup.id}`);
        });
      }

      // Update settings
      saveSettings({
        lastBackup: backup.timestamp,
        totalBackups: updatedBackups.length,
        totalSize: updatedBackups.reduce((total, b) => total + b.size, 0)
      });

      console.log(`${type} backup created successfully:`, backup.id);
    } catch (error) {
      console.error('Backup creation failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const restoreBackup = async (backupId: string) => {
    try {
      const backupData = localStorage.getItem(`neo-backup-${backupId}`);
      if (!backupData) {
        throw new Error('Backup data not found');
      }

      // Verify backup integrity
      const backup = backups.find(b => b.id === backupId);
      if (backup) {
        const currentHash = await generateHash(backupData);
        if (currentHash !== backup.hash) {
          throw new Error('Backup integrity check failed');
        }
      }

      const data = JSON.parse(backupData);
      
      // Restore user data
      if (data.userData) {
        Object.entries(data.userData).forEach(([key, value]) => {
          if (value) {
            localStorage.setItem(key, value as string);
          }
        });
      }

      console.log('Backup restored successfully:', backupId);
      
      // Reload page to apply restored state
      window.location.reload();
    } catch (error) {
      console.error('Backup restore failed:', error);
    }
  };

  const downloadBackup = (backupId: string) => {
    try {
      const backupData = localStorage.getItem(`neo-backup-${backupId}`);
      const backup = backups.find(b => b.id === backupId);
      
      if (!backupData || !backup) {
        throw new Error('Backup not found');
      }

      const blob = new Blob([backupData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `neo-backup-${backup.timestamp.split('T')[0]}-${backup.id}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Backup download failed:', error);
    }
  };

  const deleteBackup = (backupId: string) => {
    try {
      localStorage.removeItem(`neo-backup-${backupId}`);
      const updatedBackups = backups.filter(b => b.id !== backupId);
      setBackups(updatedBackups);
      localStorage.setItem('neo-backups', JSON.stringify(updatedBackups));
      
      saveSettings({
        totalBackups: updatedBackups.length,
        totalSize: updatedBackups.reduce((total, b) => total + b.size, 0)
      });
    } catch (error) {
      console.error('Backup deletion failed:', error);
    }
  };

  const scheduleAutoBackup = () => {
    if (!settings.isEnabled || settings.autoBackupInterval <= 0) return;

    const interval = setInterval(() => {
      createBackup('auto', 'Scheduled automatic backup');
    }, settings.autoBackupInterval * 60 * 1000);

    return () => clearInterval(interval);
  };

  const generateHash = async (data: string): Promise<string> => {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="bg-[#12151C] border border-[#C0C5CE]/20 rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#4AE54A]/20 rounded-lg">
            <Shield className="w-6 h-6 text-[#4AE54A]" />
          </div>
          <div>
            <h3 className="font-mono text-lg text-[#C0C5CE]">Backup System</h3>
            <p className="text-sm text-[#C0C5CE]/70">Data protection and recovery</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 bg-[#C0C5CE]/20 hover:bg-[#C0C5CE]/30 border border-[#C0C5CE]/40 rounded-lg transition-all duration-200"
          >
            <Settings className="w-4 h-4 text-[#C0C5CE]" />
          </button>
          
          <button
            onClick={() => createBackup('manual', 'Manual backup')}
            disabled={isLoading}
            className="flex items-center gap-2 bg-[#4AE54A] text-[#0B0D12] font-mono font-medium px-4 py-2 rounded-lg hover:bg-[#4AE54A]/90 transition-all duration-200 disabled:opacity-50"
          >
            {isLoading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Archive className="w-4 h-4" />
            )}
            Backup Now
          </button>
        </div>
      </div>

      {/* Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#0B0D12] border border-[#C0C5CE]/10 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Database className="w-4 h-4 text-[#4AE54A]" />
            <span className="text-sm font-mono text-[#C0C5CE]">Total Backups</span>
          </div>
          <div className="text-lg font-mono text-[#4AE54A]">{settings.totalBackups}</div>
        </div>

        <div className="bg-[#0B0D12] border border-[#C0C5CE]/10 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <HardDrive className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-mono text-[#C0C5CE]">Total Size</span>
          </div>
          <div className="text-lg font-mono text-blue-400">{formatSize(settings.totalSize)}</div>
        </div>

        <div className="bg-[#0B0D12] border border-[#C0C5CE]/10 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-mono text-[#C0C5CE]">Last Backup</span>
          </div>
          <div className="text-sm font-mono text-yellow-400">
            {settings.lastBackup ? formatDate(settings.lastBackup) : 'Never'}
          </div>
        </div>

        <div className="bg-[#0B0D12] border border-[#C0C5CE]/10 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-[#4AE54A]" />
            <span className="text-sm font-mono text-[#C0C5CE]">Status</span>
          </div>
          <div className={`text-sm font-mono ${settings.isEnabled ? 'text-[#4AE54A]' : 'text-red-400'}`}>
            {settings.isEnabled ? 'Active' : 'Disabled'}
          </div>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-[#0B0D12] border border-[#C0C5CE]/10 rounded-lg p-4 mb-6">
          <h4 className="font-mono text-sm text-[#C0C5CE] mb-4">Backup Settings</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-[#C0C5CE]/70 mb-2">
                Auto Backup Interval (minutes)
              </label>
              <input
                type="number"
                min="5"
                max="1440"
                value={settings.autoBackupInterval}
                onChange={(e) => saveSettings({ autoBackupInterval: parseInt(e.target.value) })}
                className="w-full bg-[#12151C] border border-[#C0C5CE]/20 rounded px-3 py-2 text-sm font-mono text-[#C0C5CE]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#C0C5CE]/70 mb-2">
                Maximum Backups
              </label>
              <input
                type="number"
                min="1"
                max="50"
                value={settings.maxBackups}
                onChange={(e) => saveSettings({ maxBackups: parseInt(e.target.value) })}
                className="w-full bg-[#12151C] border border-[#C0C5CE]/20 rounded px-3 py-2 text-sm font-mono text-[#C0C5CE]"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={settings.compressionEnabled}
                  onChange={(e) => saveSettings({ compressionEnabled: e.target.checked })}
                  className="rounded"
                />
                <span className="text-xs font-mono text-[#C0C5CE]">Enable Compression</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={settings.encryptionEnabled}
                  onChange={(e) => saveSettings({ encryptionEnabled: e.target.checked })}
                  className="rounded"
                />
                <span className="text-xs font-mono text-[#C0C5CE]">Enable Encryption</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Backup List */}
      <div className="space-y-3">
        <h4 className="font-mono text-sm text-[#C0C5CE]">Recent Backups</h4>
        
        {backups.length === 0 ? (
          <div className="text-center py-8 text-[#C0C5CE]/50 font-mono text-sm">
            No backups available. Create your first backup to get started.
          </div>
        ) : (
          backups.map((backup) => (
            <div
              key={backup.id}
              className="bg-[#0B0D12] border border-[#C0C5CE]/10 rounded-lg p-4 hover:border-[#4AE54A]/20 transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    backup.type === 'auto' 
                      ? 'bg-blue-500/20 text-blue-400' 
                      : 'bg-[#4AE54A]/20 text-[#4AE54A]'
                  }`}>
                    {backup.type === 'auto' ? <Clock className="w-4 h-4" /> : <Archive className="w-4 h-4" />}
                  </div>
                  
                  <div>
                    <div className="font-mono text-sm text-[#C0C5CE]">
                      {backup.description || `${backup.type} backup`}
                    </div>
                    <div className="text-xs text-[#C0C5CE]/70 font-mono">
                      {formatDate(backup.timestamp)} • {formatSize(backup.size)}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => downloadBackup(backup.id)}
                    className="p-2 bg-[#C0C5CE]/20 hover:bg-[#C0C5CE]/30 border border-[#C0C5CE]/40 rounded-lg transition-all duration-200"
                    title="Download"
                  >
                    <Download className="w-4 h-4 text-[#C0C5CE]" />
                  </button>
                  
                  <button
                    onClick={() => restoreBackup(backup.id)}
                    className="p-2 bg-[#4AE54A]/20 hover:bg-[#4AE54A]/30 border border-[#4AE54A]/40 rounded-lg transition-all duration-200"
                    title="Restore"
                  >
                    <Upload className="w-4 h-4 text-[#4AE54A]" />
                  </button>
                  
                  <button
                    onClick={() => deleteBackup(backup.id)}
                    className="p-2 bg-red-500/20 hover:bg-red-500/30 border border-red-400/40 rounded-lg transition-all duration-200"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};