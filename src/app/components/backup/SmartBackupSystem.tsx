import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { useLanguage } from '../../contexts/LanguageContext';
import { RTLContainer } from '../LanguageSwitcher';
import { 
  HardDrive, 
  Cloud,
  Shield,
  Download,
  Upload,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Database,
  FileText,
  Folder,
  Archive,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Calendar,
  Timer,
  Zap,
  Activity,
  Terminal,
  Eye,
  Edit,
  Trash2,
  Copy,
  Search,
  Filter,
  Plus,
  TrendingUp,
  Lock,
  Unlock,
  Server,
  Globe
} from 'lucide-react';

interface BackupJob {
  id: string;
  name: string;
  type: 'full' | 'incremental' | 'differential';
  source: string;
  destination: string;
  schedule: string;
  status: 'running' | 'completed' | 'failed' | 'scheduled' | 'paused';
  progress: number;
  startTime: Date;
  duration: number;
  size: number;
  compressed: number;
  encrypted: boolean;
  retention: number;
  lastRun: Date;
  nextRun: Date;
  successRate: number;
}

interface BackupStorage {
  id: string;
  name: string;
  type: 'local' | 'cloud' | 'hybrid';
  provider: string;
  location: string;
  capacity: number;
  used: number;
  available: number;
  status: 'healthy' | 'warning' | 'error';
  encryption: boolean;
  compression: boolean;
  deduplication: boolean;
  accessTime: number;
  reliability: number;
}

interface RestorePoint {
  id: string;
  name: string;
  type: 'automatic' | 'manual' | 'scheduled';
  timestamp: Date;
  size: number;
  compressed: number;
  verified: boolean;
  metadata: {
    source: string;
    version: string;
    checksum: string;
    components: string[];
  };
  restoreTime: number;
  status: 'valid' | 'corrupted' | 'expired';
}

interface BackupMetrics {
  totalJobs: number;
  activeJobs: number;
  successRate: number;
  totalSize: number;
  storageUsed: number;
  compressionRatio: number;
  encryptionRate: number;
  averageRestoreTime: number;
  dataProtected: number;
  lastBackup: Date;
}

export default function SmartBackupSystem({ onNavigate }: { onNavigate?: (section: string) => void }) {
  const { isRTL, language } = useLanguage();
  
  const [activeTab, setActiveTab] = useState<'jobs' | 'storage' | 'restore' | 'schedule' | 'analytics'>('jobs');
  
  const [backupJobs, setBackupJobs] = useState<BackupJob[]>([
    {
      id: 'job-001',
      name: 'Database Full Backup',
      type: 'full',
      source: 'PostgreSQL Main Database',
      destination: 'AWS S3 Primary',
      schedule: 'Daily at 02:00 UTC',
      status: 'completed',
      progress: 100,
      startTime: new Date(Date.now() - 7200000),
      duration: 3840,
      size: 2.4e9,
      compressed: 847e6,
      encrypted: true,
      retention: 30,
      lastRun: new Date(Date.now() - 7200000),
      nextRun: new Date(Date.now() + 64800000),
      successRate: 99.2
    },
    {
      id: 'job-002',
      name: 'Application Files Incremental',
      type: 'incremental',
      source: '/var/www/neotech',
      destination: 'Local NAS + Azure Blob',
      schedule: 'Every 6 hours',
      status: 'running',
      progress: 67,
      startTime: new Date(Date.now() - 1800000),
      duration: 0,
      size: 1.2e9,
      compressed: 456e6,
      encrypted: true,
      retention: 14,
      lastRun: new Date(Date.now() - 21600000),
      nextRun: new Date(Date.now() + 19800000),
      successRate: 98.7
    },
    {
      id: 'job-003',
      name: 'User Data Differential',
      type: 'differential',
      source: '/data/users',
      destination: 'Google Cloud Storage',
      schedule: 'Weekly on Sunday',
      status: 'scheduled',
      progress: 0,
      startTime: new Date(),
      duration: 0,
      size: 847e6,
      compressed: 234e6,
      encrypted: true,
      retention: 90,
      lastRun: new Date(Date.now() - 604800000),
      nextRun: new Date(Date.now() + 86400000),
      successRate: 97.4
    },
    {
      id: 'job-004',
      name: 'Configuration Backup',
      type: 'full',
      source: '/etc/neotech',
      destination: 'Multi-Region Mirror',
      schedule: 'Daily at 01:00 UTC',
      status: 'failed',
      progress: 45,
      startTime: new Date(Date.now() - 3600000),
      duration: 0,
      size: 45e6,
      compressed: 12e6,
      encrypted: true,
      retention: 365,
      lastRun: new Date(Date.now() - 86400000),
      nextRun: new Date(Date.now() + 82800000),
      successRate: 95.8
    }
  ]);

  const [storageLocations, setStorageLocations] = useState<BackupStorage[]>([
    {
      id: 'storage-001',
      name: 'AWS S3 Primary',
      type: 'cloud',
      provider: 'Amazon Web Services',
      location: 'us-east-1',
      capacity: 10e12,
      used: 2.3e12,
      available: 7.7e12,
      status: 'healthy',
      encryption: true,
      compression: true,
      deduplication: true,
      accessTime: 45,
      reliability: 99.9
    },
    {
      id: 'storage-002',
      name: 'Local NAS Cluster',
      type: 'local',
      provider: 'Synology',
      location: 'Data Center Rack A',
      capacity: 24e12,
      used: 8.7e12,
      available: 15.3e12,
      status: 'healthy',
      encryption: true,
      compression: true,
      deduplication: true,
      accessTime: 12,
      reliability: 99.7
    },
    {
      id: 'storage-003',
      name: 'Azure Blob Cold',
      type: 'cloud',
      provider: 'Microsoft Azure',
      location: 'West Europe',
      capacity: 5e12,
      used: 1.2e12,
      available: 3.8e12,
      status: 'warning',
      encryption: true,
      compression: false,
      deduplication: false,
      accessTime: 180,
      reliability: 99.8
    }
  ]);

  const [restorePoints, setRestorePoints] = useState<RestorePoint[]>([
    {
      id: 'restore-001',
      name: 'Pre-Production Deploy',
      type: 'manual',
      timestamp: new Date(Date.now() - 3600000),
      size: 2.4e9,
      compressed: 847e6,
      verified: true,
      metadata: {
        source: 'Full System Snapshot',
        version: 'v2.4.1',
        checksum: 'sha256:7f8a9b2c3d4e5f6g',
        components: ['database', 'application', 'configs', 'assets']
      },
      restoreTime: 1200,
      status: 'valid'
    },
    {
      id: 'restore-002',
      name: 'Daily Auto Backup',
      type: 'automatic',
      timestamp: new Date(Date.now() - 86400000),
      size: 2.1e9,
      compressed: 734e6,
      verified: true,
      metadata: {
        source: 'Database + Critical Files',
        version: 'v2.4.0',
        checksum: 'sha256:9a1b2c3d4e5f6g7h',
        components: ['database', 'configs']
      },
      restoreTime: 890,
      status: 'valid'
    },
    {
      id: 'restore-003',
      name: 'Weekly System Backup',
      type: 'scheduled',
      timestamp: new Date(Date.now() - 604800000),
      size: 3.2e9,
      compressed: 1.1e9,
      verified: false,
      metadata: {
        source: 'Complete System Image',
        version: 'v2.3.8',
        checksum: 'sha256:5c6d7e8f9g0h1i2j',
        components: ['database', 'application', 'configs', 'assets', 'logs']
      },
      restoreTime: 2400,
      status: 'valid'
    }
  ]);

  const [backupMetrics, setBackupMetrics] = useState<BackupMetrics>({
    totalJobs: 4,
    activeJobs: 1,
    successRate: 97.8,
    totalSize: 8.4e9,
    storageUsed: 12.2e12,
    compressionRatio: 3.2,
    encryptionRate: 100,
    averageRestoreTime: 1163,
    dataProtected: 99.97,
    lastBackup: new Date(Date.now() - 1800000)
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBackupJobs(prev => prev.map(job => {
        if (job.status === 'running' && job.progress < 100) {
          return {
            ...job,
            progress: Math.min(100, job.progress + Math.random() * 5)
          };
        }
        return job;
      }));

      setBackupMetrics(prev => ({
        ...prev,
        storageUsed: prev.storageUsed + Math.random() * 1e6,
        averageRestoreTime: Math.max(500, prev.averageRestoreTime + (Math.random() - 0.5) * 50)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': case 'healthy': case 'valid': return 'bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]/30';
      case 'running': case 'scheduled': return 'bg-[#00d4ff]/20 text-[#00d4ff] border-[#00d4ff]/30';
      case 'failed': case 'error': case 'corrupted': return 'bg-red-400/20 text-red-400 border-red-400/30';
      case 'warning': case 'expired': return 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30';
      case 'paused': return 'bg-[#C0C5CE]/20 text-[#C0C5CE] border-[#C0C5CE]/30';
      default: return 'bg-[#C0C5CE]/20 text-[#C0C5CE] border-[#C0C5CE]/30';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'full': return 'bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]/30';
      case 'incremental': return 'bg-[#00d4ff]/20 text-[#00d4ff] border-[#00d4ff]/30';
      case 'differential': return 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30';
      default: return 'bg-[#C0C5CE]/20 text-[#C0C5CE] border-[#C0C5CE]/30';
    }
  };

  const formatBytes = (bytes: number) => {
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const renderJobsTab = () => (
    <div className="space-y-6">
      <div className="neo-flex-between">
        <h3 className="text-[#00ff88] font-mono text-xl">
          {language === 'ar' ? 'مهام النسخ الاحتياطي' : 'Backup Jobs'}
        </h3>
        <div className="neo-flex-start neo-space-sm">
          <Search className="w-4 h-4 text-[#C0C5CE]/70" />
          <input
            type="text"
            placeholder={language === 'ar' ? 'البحث في المهام...' : 'Search jobs...'}
            className="neo-form-input w-64"
          />
          <Button className="neo-button-primary">
            <Plus className="w-4 h-4 mr-2" />
            {language === 'ar' ? 'إضافة مهمة' : 'Add Job'}
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {backupJobs.map(job => (
          <Card key={job.id} className="neo-interactive-card">
            <div className="p-6">
              <div className="neo-flex-between mb-4">
                <div className="neo-flex-start neo-space-sm">
                  <HardDrive className="w-5 h-5 text-[#00d4ff]" />
                  <div>
                    <div className="font-semibold text-[#C0C5CE]">
                      {job.name}
                    </div>
                    <div className="text-sm text-[#C0C5CE]/70">
                      {job.source} → {job.destination}
                    </div>
                  </div>
                </div>
                
                <div className="neo-flex-start neo-space-sm">
                  <Badge className={getTypeColor(job.type)}>
                    {job.type}
                  </Badge>
                  <Badge className={getStatusColor(job.status)}>
                    {job.status}
                  </Badge>
                  {job.encrypted && (
                    <Badge className="bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]/30">
                      <Lock className="w-3 h-3 mr-1" />
                      Encrypted
                    </Badge>
                  )}
                </div>
              </div>

              {job.status === 'running' && (
                <div className="mb-4">
                  <div className="neo-flex-between text-sm mb-2">
                    <span className="text-[#C0C5CE]/70">Progress:</span>
                    <span className="text-[#00ff88]">{job.progress.toFixed(0)}%</span>
                  </div>
                  <Progress value={job.progress} className="h-2" />
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <div className="text-xs text-[#C0C5CE]/70">Size</div>
                  <div className="text-sm font-semibold text-[#00d4ff]">
                    {formatBytes(job.size)}
                  </div>
                  <div className="text-xs text-[#00ff88]">
                    {formatBytes(job.compressed)} compressed
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[#C0C5CE]/70">Schedule</div>
                  <div className="text-sm font-semibold text-[#C0C5CE]">
                    {job.schedule}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[#C0C5CE]/70">Success Rate</div>
                  <div className={`text-sm font-semibold ${
                    job.successRate > 95 ? 'text-[#00ff88]' :
                    job.successRate > 90 ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>
                    {job.successRate}%
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[#C0C5CE]/70">Next Run</div>
                  <div className="text-sm font-semibold text-[#00d4ff]">
                    {job.nextRun.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="neo-flex-between">
                <div className="text-xs text-[#C0C5CE]/60">
                  Last run: {job.lastRun.toLocaleString()}
                  {job.duration > 0 && ` (${formatDuration(job.duration)})`}
                </div>
                
                <div className="neo-flex-start neo-space-sm">
                  {job.status === 'running' ? (
                    <Button className="neo-button-ghost text-sm">
                      <Pause className="w-3 h-3 mr-1" />
                      Pause
                    </Button>
                  ) : (
                    <Button className="neo-button-ghost text-sm">
                      <Play className="w-3 h-3 mr-1" />
                      Run Now
                    </Button>
                  )}
                  <Button className="neo-button-ghost text-sm">
                    <Eye className="w-3 h-3 mr-1" />
                    Logs
                  </Button>
                  <Button className="neo-button-ghost text-sm">
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderStorageTab = () => (
    <div className="space-y-6">
      <h3 className="text-[#00ff88] font-mono text-xl">
        {language === 'ar' ? 'مواقع التخزين' : 'Storage Locations'}
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {storageLocations.map(storage => (
          <Card key={storage.id} className="neo-interactive-card">
            <div className="p-6">
              <div className="neo-flex-between mb-4">
                <div className="neo-flex-start neo-space-sm">
                  {storage.type === 'cloud' ? 
                    <Cloud className="w-5 h-5 text-[#00d4ff]" /> : 
                    <Server className="w-5 h-5 text-[#00ff88]" />
                  }
                  <div>
                    <div className="font-semibold text-[#C0C5CE]">
                      {storage.name}
                    </div>
                    <div className="text-sm text-[#C0C5CE]/70">
                      {storage.provider} • {storage.location}
                    </div>
                  </div>
                </div>
                
                <Badge className={getStatusColor(storage.status)}>
                  {storage.status}
                </Badge>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="neo-flex-between text-sm mb-2">
                    <span className="text-[#C0C5CE]/70">Storage Usage:</span>
                    <span className="text-[#00d4ff]">
                      {formatBytes(storage.used)} / {formatBytes(storage.capacity)}
                    </span>
                  </div>
                  <Progress 
                    value={(storage.used / storage.capacity) * 100} 
                    className="h-2" 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-[#C0C5CE]/70">Available:</span>
                    <div className="text-[#00ff88] font-semibold">
                      {formatBytes(storage.available)}
                    </div>
                  </div>
                  <div>
                    <span className="text-[#C0C5CE]/70">Access Time:</span>
                    <div className={`font-semibold ${
                      storage.accessTime < 60 ? 'text-[#00ff88]' :
                      storage.accessTime < 300 ? 'text-yellow-400' :
                      'text-red-400'
                    }`}>
                      {storage.accessTime}s
                    </div>
                  </div>
                  <div>
                    <span className="text-[#C0C5CE]/70">Reliability:</span>
                    <div className="text-[#00ff88] font-semibold">
                      {storage.reliability}%
                    </div>
                  </div>
                  <div>
                    <span className="text-[#C0C5CE]/70">Type:</span>
                    <div className="text-[#00d4ff] font-semibold capitalize">
                      {storage.type}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#C0C5CE]/10">
                  <div className="text-xs text-[#C0C5CE]/70 mb-2">Features:</div>
                  <div className="flex flex-wrap gap-2">
                    {storage.encryption && (
                      <Badge className="bg-[#00ff88]/10 text-[#00ff88] border-[#00ff88]/20 text-xs">
                        <Lock className="w-3 h-3 mr-1" />
                        Encrypted
                      </Badge>
                    )}
                    {storage.compression && (
                      <Badge className="bg-[#00d4ff]/10 text-[#00d4ff] border-[#00d4ff]/20 text-xs">
                        <Archive className="w-3 h-3 mr-1" />
                        Compressed
                      </Badge>
                    )}
                    {storage.deduplication && (
                      <Badge className="bg-yellow-400/10 text-yellow-400 border-yellow-400/20 text-xs">
                        <Copy className="w-3 h-3 mr-1" />
                        Deduplicated
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderRestoreTab = () => (
    <div className="space-y-6">
      <div className="neo-flex-between">
        <h3 className="text-[#00ff88] font-mono text-xl">
          {language === 'ar' ? 'نقاط الاستعادة' : 'Restore Points'}
        </h3>
        <Button className="neo-button-primary">
          <RotateCcw className="w-4 h-4 mr-2" />
          {language === 'ar' ? 'إنشاء نقطة' : 'Create Point'}
        </Button>
      </div>

      <div className="space-y-4">
        {restorePoints.map(point => (
          <Card key={point.id} className="neo-interactive-card">
            <div className="p-6">
              <div className="neo-flex-between mb-4">
                <div className="neo-flex-start neo-space-sm">
                  <Database className="w-5 h-5 text-[#00d4ff]" />
                  <div>
                    <div className="font-semibold text-[#C0C5CE]">
                      {point.name}
                    </div>
                    <div className="text-sm text-[#C0C5CE]/70">
                      {point.timestamp.toLocaleString()}
                    </div>
                  </div>
                </div>
                
                <div className="neo-flex-start neo-space-sm">
                  <Badge className={getStatusColor(point.status)}>
                    {point.status}
                  </Badge>
                  {point.verified && (
                    <Badge className="bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]/30">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <div className="text-xs text-[#C0C5CE]/70">Size</div>
                  <div className="text-sm font-semibold text-[#00d4ff]">
                    {formatBytes(point.size)}
                  </div>
                  <div className="text-xs text-[#00ff88]">
                    {formatBytes(point.compressed)} compressed
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[#C0C5CE]/70">Type</div>
                  <div className="text-sm font-semibold text-[#C0C5CE] capitalize">
                    {point.type}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[#C0C5CE]/70">Restore Time</div>
                  <div className="text-sm font-semibold text-[#00ff88]">
                    ~{formatDuration(point.restoreTime)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[#C0C5CE]/70">Version</div>
                  <div className="text-sm font-semibold text-[#00d4ff]">
                    {point.metadata.version}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-xs text-[#C0C5CE]/70 mb-2">Components:</div>
                <div className="flex flex-wrap gap-1">
                  {point.metadata.components.map(component => (
                    <Badge key={component} className="bg-[#00d4ff]/10 text-[#00d4ff] border-[#00d4ff]/20 text-xs">
                      {component}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="neo-flex-between">
                <div className="text-xs text-[#C0C5CE]/60 font-mono">
                  Checksum: {point.metadata.checksum}
                </div>
                
                <div className="neo-flex-start neo-space-sm">
                  <Button className="neo-button-primary text-sm">
                    <Download className="w-3 h-3 mr-1" />
                    Restore
                  </Button>
                  <Button className="neo-button-ghost text-sm">
                    <Eye className="w-3 h-3 mr-1" />
                    Details
                  </Button>
                  <Button className="neo-button-ghost text-sm">
                    <RefreshCw className="w-3 h-3 mr-1" />
                    Verify
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#C0C5CE] font-mono">
      {/* Terminal grid background */}
      <div className="fixed inset-0 enterprise-grid opacity-10 pointer-events-none"></div>
      
      <RTLContainer className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className={`space-y-8 ${isRTL ? 'text-right' : 'text-left'}`}>
          
          {/* Header */}
          <div className="neo-flex-between mb-8">
            <div className="neo-flex-start neo-space-md">
              <Shield className="w-8 h-8 text-[#00d4ff]" />
              <div>
                <h1 className="text-3xl font-bold text-[#C0C5CE]">
                  {language === 'ar' ? 'نظام النسخ الاحتياطي الذكي' : 'Smart Backup System'}
                </h1>
                <p className="text-[#C0C5CE]/80 text-lg">
                  {language === 'ar' 
                    ? 'حماية ذكية للبيانات مع استعادة سريعة وآمنة'
                    : 'Intelligent data protection with fast, secure recovery'
                  }
                </p>
              </div>
            </div>
            
            <div className="neo-flex-start neo-space-sm">
              <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse"></div>
              <span className="text-[#00ff88] text-sm font-mono">
                {backupJobs.filter(j => j.status === 'running').length} {language === 'ar' ? 'نشط' : 'Active'}
              </span>
            </div>
          </div>

          {/* Backup Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <HardDrive className="w-5 h-5 text-[#00d4ff]" />
                <Badge className="bg-[#00d4ff]/20 text-[#00d4ff] border-[#00d4ff]/30">
                  {backupMetrics.activeJobs} Active
                </Badge>
              </div>
              <div className="neo-dashboard-widget-value">
                {backupMetrics.totalJobs}
              </div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">
                {language === 'ar' ? 'مهام النسخ' : 'Backup Jobs'}
              </div>
            </Card>

            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <CheckCircle className="w-5 h-5 text-[#00ff88]" />
                <Badge className="bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]/30">
                  {backupMetrics.successRate}%
                </Badge>
              </div>
              <div className="neo-dashboard-widget-value">
                {backupMetrics.successRate}%
              </div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">
                {language === 'ar' ? 'معدل النجاح' : 'Success Rate'}
              </div>
            </Card>

            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <Database className="w-5 h-5 text-[#00ff88]" />
                <Badge className="bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]/30">
                  {backupMetrics.dataProtected}%
                </Badge>
              </div>
              <div className="neo-dashboard-widget-value">
                {formatBytes(backupMetrics.storageUsed)}
              </div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">
                {language === 'ar' ? 'البيانات المحمية' : 'Data Protected'}
              </div>
            </Card>

            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <Clock className="w-5 h-5 text-[#00d4ff]" />
                <Badge className="bg-[#00d4ff]/20 text-[#00d4ff] border-[#00d4ff]/30">
                  Fast
                </Badge>
              </div>
              <div className="neo-dashboard-widget-value">
                {formatDuration(backupMetrics.averageRestoreTime)}
              </div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">
                {language === 'ar' ? 'وقت الاستعادة' : 'Avg Restore Time'}
              </div>
            </Card>
          </div>

          {/* Navigation Tabs */}
          <div className="neo-flex-start neo-space-sm mb-8">
            {[
              { key: 'jobs', label: language === 'ar' ? 'المهام' : 'Jobs', icon: HardDrive },
              { key: 'storage', label: language === 'ar' ? 'التخزين' : 'Storage', icon: Cloud },
              { key: 'restore', label: language === 'ar' ? 'الاستعادة' : 'Restore', icon: RotateCcw },
              { key: 'analytics', label: language === 'ar' ? 'التحليلات' : 'Analytics', icon: TrendingUp }
            ].map(({ key, label, icon: Icon }) => (
              <Button
                key={key}
                className={`${
                  activeTab === key 
                    ? 'neo-button-primary' 
                    : 'neo-button-ghost'
                } neo-flex-start neo-space-xs`}
                onClick={() => setActiveTab(key as any)}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'jobs' && renderJobsTab()}
          {activeTab === 'storage' && renderStorageTab()}
          {activeTab === 'restore' && renderRestoreTab()}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h3 className="text-[#00ff88] font-mono text-xl">
                {language === 'ar' ? 'تحليلات النسخ الاحتياطي' : 'Backup Analytics'}
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="neo-card">
                  <div className="p-6">
                    <h4 className="text-[#00ff88] font-mono text-lg mb-4">
                      {language === 'ar' ? 'إحصائيات الضغط' : 'Compression Statistics'}
                    </h4>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="neo-flex-between text-sm mb-2">
                          <span className="text-[#C0C5CE]/70">Compression Ratio:</span>
                          <span className="text-[#00ff88]">{backupMetrics.compressionRatio}:1</span>
                        </div>
                        <Progress value={(backupMetrics.compressionRatio / 5) * 100} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="neo-flex-between text-sm mb-2">
                          <span className="text-[#C0C5CE]/70">Encryption Rate:</span>
                          <span className="text-[#00ff88]">{backupMetrics.encryptionRate}%</span>
                        </div>
                        <Progress value={backupMetrics.encryptionRate} className="h-2" />
                      </div>
                      
                      <div className="text-xs text-[#C0C5CE]/70">
                        Space saved: {formatBytes(backupMetrics.totalSize * (backupMetrics.compressionRatio - 1) / backupMetrics.compressionRatio)}
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="neo-card">
                  <div className="p-6">
                    <h4 className="text-[#00ff88] font-mono text-lg mb-4">
                      {language === 'ar' ? 'أداء الاستعادة' : 'Restore Performance'}
                    </h4>
                    
                    <div className="space-y-3">
                      {restorePoints.slice(0, 3).map(point => (
                        <div key={point.id} className="neo-flex-between">
                          <div>
                            <div className="text-sm font-semibold text-[#C0C5CE]">
                              {point.name}
                            </div>
                            <div className="text-xs text-[#C0C5CE]/70">
                              {formatBytes(point.size)}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-semibold text-[#00d4ff]">
                              {formatDuration(point.restoreTime)}
                            </div>
                            <div className={`text-xs ${
                              point.restoreTime < 1800 ? 'text-[#00ff88]' :
                              point.restoreTime < 3600 ? 'text-yellow-400' :
                              'text-red-400'
                            }`}>
                              {point.verified ? 'Verified' : 'Pending'}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* Backup Command Terminal */}
          <Card className="neo-card">
            <div className="p-6">
              <div className="neo-flex-between mb-4">
                <div className="neo-flex-start neo-space-sm">
                  <Terminal className="w-5 h-5 text-[#00d4ff]" />
                  <h3 className="text-[#00ff88] font-mono text-lg">
                    {language === 'ar' ? 'مركز أوامر النسخ الاحتياطي' : 'Backup Command Center'}
                  </h3>
                </div>
                <Badge className="bg-[#00d4ff]/20 text-[#00d4ff] border-[#00d4ff]/30">
                  <Activity className="w-3 h-3 mr-1" />
                  {language === 'ar' ? 'نشط' : 'Active'}
                </Badge>
              </div>
              
              <div className="bg-[#0B0D12] border border-[#00d4ff]/20 rounded-lg p-4 font-mono text-sm">
                <div className="space-y-2">
                  <div className="text-[#00ff88]">
                    neo@backup-system:~$ status --all-jobs --storage --metrics
                  </div>
                  <div className="text-[#C0C5CE]/80">
                    💾 Backup System Status: Operational<br/>
                    📊 Active Jobs: {backupMetrics.activeJobs}/{backupMetrics.totalJobs}<br/>
                    ✅ Success Rate: {backupMetrics.successRate}% (last 30 days)<br/>
                    🗄️ Storage Used: {formatBytes(backupMetrics.storageUsed)} across {storageLocations.length} locations<br/>
                    🔒 Encryption: {backupMetrics.encryptionRate}% of backups encrypted<br/>
                    ⚡ Avg Restore Time: {formatDuration(backupMetrics.averageRestoreTime)}
                  </div>
                  
                  <div className="text-[#00ff88] mt-4">
                    neo@backup-system:~$ optimize --compression --deduplication --scheduling
                  </div>
                  <div className="text-[#C0C5CE]/80">
                    🗜️ Compression optimization: {backupMetrics.compressionRatio}:1 ratio achieved<br/>
                    🔄 Deduplication running: Space savings of 40% detected<br/>
                    📅 Schedule optimization: Jobs distributed for minimal overlap<br/>
                    🚀 Performance tuning: Parallel backup streams active<br/>
                    ☁️ Multi-cloud sync: {storageLocations.filter(s => s.type === 'cloud').length} cloud providers configured
                  </div>
                  
                  <div className="text-[#00ff88] mt-4">
                    neo@backup-system:~$ verify --integrity --restore-points --auto-heal
                  </div>
                  <div className="text-[#C0C5CE]/80">
                    🔍 Integrity verification: {restorePoints.filter(r => r.verified).length}/{restorePoints.length} restore points verified<br/>
                    🩹 Auto-healing: Corrupted blocks automatically repaired<br/>
                    📈 Recovery testing: Automated monthly restore tests passed<br/>
                    🛡️ Disaster recovery: Multi-region failover ready
                  </div>
                  
                  <div className="text-[#00ff88] mt-4 neo-typing-cursor">
                    neo@backup-system:~$ protect --continuous --enterprise-grade█
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </RTLContainer>
    </div>
  );
}