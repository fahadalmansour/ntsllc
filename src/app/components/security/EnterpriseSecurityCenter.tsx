import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { useLanguage } from '../../contexts/LanguageContext';
import { RTLContainer } from '../LanguageSwitcher';
import { 
  Shield, 
  Lock, 
  Eye,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Activity,
  Globe,
  Key,
  Database,
  Network,
  UserCheck,
  FileCheck,
  Settings,
  Zap,
  TrendingUp,
  Clock,
  MapPin,
  Smartphone,
  Monitor,
  RefreshCw,
  Search,
  Filter,
  Download,
  Upload
} from 'lucide-react';

interface SecurityThreat {
  id: string;
  type: 'brute-force' | 'ddos' | 'injection' | 'unauthorized-access' | 'data-breach';
  severity: 'low' | 'medium' | 'high' | 'critical';
  source: string;
  target: string;
  timestamp: Date;
  status: 'detected' | 'mitigated' | 'blocked' | 'investigating';
  details: string;
}

interface ComplianceItem {
  standard: string;
  status: 'compliant' | 'non-compliant' | 'partial';
  score: number;
  lastAudit: Date;
  issues: number;
  requirements: number;
}

interface SecurityMetrics {
  securityScore: number;
  threatsBlocked: number;
  vulnerabilitiesFixed: number;
  complianceRate: number;
  uptime: number;
  failedLogins: number;
  dataEncrypted: number;
  certificateExpiry: number;
}

export default function EnterpriseSecurityCenter({ onNavigate }: { onNavigate?: (section: string) => void }) {
  const { isRTL, language } = useLanguage();
  
  const [securityMetrics, setSecurityMetrics] = useState<SecurityMetrics>({
    securityScore: 94.7,
    threatsBlocked: 2847,
    vulnerabilitiesFixed: 156,
    complianceRate: 97.2,
    uptime: 99.97,
    failedLogins: 23,
    dataEncrypted: 100,
    certificateExpiry: 45
  });

  const [threats, setThreats] = useState<SecurityThreat[]>([
    {
      id: 'thr-001',
      type: 'brute-force',
      severity: 'high',
      source: '203.145.67.89',
      target: '/admin/login',
      timestamp: new Date(),
      status: 'blocked',
      details: 'Multiple failed login attempts detected from suspicious IP'
    },
    {
      id: 'thr-002',
      type: 'ddos',
      severity: 'medium',
      source: 'Multiple IPs',
      target: 'api.neotech.com',
      timestamp: new Date(Date.now() - 1800000),
      status: 'mitigated',
      details: 'Distributed attack pattern identified and mitigated'
    },
    {
      id: 'thr-003',
      type: 'injection',
      severity: 'critical',
      source: '91.203.45.12',
      target: '/api/users',
      timestamp: new Date(Date.now() - 3600000),
      status: 'investigating',
      details: 'SQL injection attempt on user database endpoint'
    }
  ]);

  const [compliance, setCompliance] = useState<ComplianceItem[]>([
    {
      standard: 'SOC 2 Type II',
      status: 'compliant',
      score: 98.5,
      lastAudit: new Date('2024-09-15'),
      issues: 0,
      requirements: 247
    },
    {
      standard: 'ISO 27001',
      status: 'compliant',
      score: 96.8,
      lastAudit: new Date('2024-08-20'),
      issues: 2,
      requirements: 312
    },
    {
      standard: 'GDPR',
      status: 'compliant',
      score: 97.9,
      lastAudit: new Date('2024-09-10'),
      issues: 1,
      requirements: 89
    },
    {
      standard: 'HIPAA',
      status: 'partial',
      score: 89.2,
      lastAudit: new Date('2024-07-25'),
      issues: 8,
      requirements: 156
    }
  ]);

  const [timeframe, setTimeframe] = useState<'24h' | '7d' | '30d' | '90d'>('24h');
  const [selectedThreatType, setSelectedThreatType] = useState<string>('all');

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSecurityMetrics(prev => ({
        ...prev,
        threatsBlocked: prev.threatsBlocked + Math.floor(Math.random() * 3),
        failedLogins: Math.max(0, prev.failedLogins + (Math.random() > 0.7 ? 1 : -1))
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-[#C0C5CE]/20 text-[#C0C5CE] border-[#C0C5CE]/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'blocked': return 'bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]/30';
      case 'mitigated': return 'bg-[#00d4ff]/20 text-[#00d4ff] border-[#00d4ff]/30';
      case 'investigating': return 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30';
      case 'detected': return 'bg-red-400/20 text-red-400 border-red-400/30';
      default: return 'bg-[#C0C5CE]/20 text-[#C0C5CE] border-[#C0C5CE]/30';
    }
  };

  const getComplianceColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]/30';
      case 'partial': return 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30';
      case 'non-compliant': return 'bg-red-400/20 text-red-400 border-red-400/30';
      default: return 'bg-[#C0C5CE]/20 text-[#C0C5CE] border-[#C0C5CE]/30';
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

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
                  {language === 'ar' ? 'مركز الأمان المؤسسي' : 'Enterprise Security Center'}
                </h1>
                <p className="text-[#C0C5CE]/80 text-lg">
                  {language === 'ar' 
                    ? 'مراقبة شاملة للأمان والامتثال والتهديدات'
                    : 'Comprehensive security monitoring & compliance management'
                  }
                </p>
              </div>
            </div>
            
            <div className="neo-flex-start neo-space-sm">
              <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse"></div>
              <span className="text-[#00ff88] text-sm font-mono">
                {language === 'ar' ? 'آمن' : 'Secure'}
              </span>
            </div>
          </div>

          {/* Security Metrics Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <Shield className="w-5 h-5 text-[#00ff88]" />
                <Badge className="bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]/30">
                  Excellent
                </Badge>
              </div>
              <div className="neo-dashboard-widget-value">
                {securityMetrics.securityScore}%
              </div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">
                {language === 'ar' ? 'نقاط الأمان' : 'Security Score'}
              </div>
              <div className="mt-2">
                <Progress value={securityMetrics.securityScore} className="h-2" />
              </div>
            </Card>

            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <AlertTriangle className="w-5 h-5 text-[#00d4ff]" />
                <Badge className="bg-[#00d4ff]/20 text-[#00d4ff] border-[#00d4ff]/30">
                  +{Math.floor(Math.random() * 50)}
                </Badge>
              </div>
              <div className="neo-dashboard-widget-value">
                {formatNumber(securityMetrics.threatsBlocked)}
              </div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">
                {language === 'ar' ? 'التهديدات المحجوبة' : 'Threats Blocked'}
              </div>
              <div className="mt-2 text-xs text-[#00ff88] font-mono">
                {securityMetrics.failedLogins} failed logins today
              </div>
            </Card>

            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <FileCheck className="w-5 h-5 text-[#00ff88]" />
                <Badge className="bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]/30">
                  {securityMetrics.complianceRate}%
                </Badge>
              </div>
              <div className="neo-dashboard-widget-value">
                {securityMetrics.complianceRate}%
              </div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">
                {language === 'ar' ? 'معدل الامتثال' : 'Compliance Rate'}
              </div>
              <div className="mt-2">
                <Progress value={securityMetrics.complianceRate} className="h-2" />
              </div>
            </Card>

            <Card className="neo-dashboard-widget">
              <div className="neo-dashboard-widget-header">
                <TrendingUp className="w-5 h-5 text-[#00d4ff]" />
                <Badge className="bg-[#00d4ff]/20 text-[#00d4ff] border-[#00d4ff]/30">
                  {securityMetrics.uptime}%
                </Badge>
              </div>
              <div className="neo-dashboard-widget-value">
                {securityMetrics.uptime}%
              </div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">
                {language === 'ar' ? 'وقت التشغيل' : 'System Uptime'}
              </div>
              <div className="mt-2 text-xs text-[#00ff88] font-mono">
                {securityMetrics.dataEncrypted}% data encrypted
              </div>
            </Card>
          </div>

          {/* Controls */}
          <div className="neo-flex-between mb-6">
            <div className="neo-flex-start neo-space-sm">
              {(['24h', '7d', '30d', '90d'] as const).map((period) => (
                <Button
                  key={period}
                  className={`${
                    timeframe === period 
                      ? 'neo-button-primary' 
                      : 'neo-button-ghost'
                  } text-sm`}
                  onClick={() => setTimeframe(period)}
                >
                  {period === '24h' ? (language === 'ar' ? '24 ساعة' : '24 Hours') :
                   period === '7d' ? (language === 'ar' ? '7 أيام' : '7 Days') :
                   period === '30d' ? (language === 'ar' ? '30 يوم' : '30 Days') :
                   (language === 'ar' ? '90 يوم' : '90 Days')}
                </Button>
              ))}
            </div>

            <div className="neo-flex-start neo-space-sm">
              <Filter className="w-4 h-4 text-[#C0C5CE]/70" />
              <select
                value={selectedThreatType}
                onChange={(e) => setSelectedThreatType(e.target.value)}
                className="neo-form-select"
              >
                <option value="all">{language === 'ar' ? 'جميع التهديدات' : 'All Threats'}</option>
                <option value="brute-force">{language === 'ar' ? 'القوة الغاشمة' : 'Brute Force'}</option>
                <option value="ddos">DDoS</option>
                <option value="injection">{language === 'ar' ? 'حقن SQL' : 'SQL Injection'}</option>
              </select>
            </div>
          </div>

          {/* Threats & Compliance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Real-time Threats */}
            <Card className="neo-card">
              <div className="p-6">
                <div className="neo-flex-between mb-6">
                  <h3 className="text-[#00ff88] font-mono text-xl">
                    {language === 'ar' ? 'التهديدات المباشرة' : 'Real-time Threats'}
                  </h3>
                  <div className="neo-flex-start neo-space-xs">
                    <Activity className="w-4 h-4 text-[#00d4ff]" />
                    <span className="text-[#00d4ff] text-sm">Live</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {threats.map((threat) => (
                    <div key={threat.id} className="neo-interactive-card p-4">
                      <div className="neo-flex-between mb-3">
                        <div className="neo-flex-start neo-space-sm">
                          <AlertTriangle className="w-4 h-4 text-orange-400" />
                          <div>
                            <div className="font-semibold text-[#C0C5CE] text-sm">
                              {threat.type.replace('-', ' ').toUpperCase()}
                            </div>
                            <div className="text-xs text-[#C0C5CE]/70">
                              From: {threat.source}
                            </div>
                          </div>
                        </div>
                        
                        <div className="neo-flex-start neo-space-xs">
                          <Badge className={getSeverityColor(threat.severity)}>
                            {threat.severity}
                          </Badge>
                          <Badge className={getStatusColor(threat.status)}>
                            {threat.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="text-xs text-[#C0C5CE]/80 mb-2">
                        Target: <span className="text-[#00d4ff]">{threat.target}</span>
                      </div>

                      <div className="text-xs text-[#C0C5CE]/80 mb-3">
                        {threat.details}
                      </div>

                      <div className="neo-flex-between text-xs">
                        <span className="text-[#C0C5CE]/60">
                          {threat.timestamp.toLocaleTimeString()}
                        </span>
                        <Button className="neo-button-ghost text-xs">
                          {language === 'ar' ? 'تفاصيل' : 'Details'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Compliance Status */}
            <Card className="neo-card">
              <div className="p-6">
                <div className="neo-flex-between mb-6">
                  <h3 className="text-[#00ff88] font-mono text-xl">
                    {language === 'ar' ? 'حالة الامتثال' : 'Compliance Status'}
                  </h3>
                  <FileCheck className="w-5 h-5 text-[#00d4ff]" />
                </div>

                <div className="space-y-4">
                  {compliance.map((item) => (
                    <div key={item.standard} className="neo-interactive-card p-4">
                      <div className="neo-flex-between mb-3">
                        <div>
                          <div className="font-semibold text-[#C0C5CE]">
                            {item.standard}
                          </div>
                          <div className="text-xs text-[#C0C5CE]/70">
                            Last audit: {item.lastAudit.toLocaleDateString()}
                          </div>
                        </div>
                        
                        <Badge className={getComplianceColor(item.status)}>
                          {item.status}
                        </Badge>
                      </div>

                      <div className="neo-flex-between text-xs mb-2">
                        <span className="text-[#C0C5CE]/70">
                          {language === 'ar' ? 'النتيجة:' : 'Score:'}
                        </span>
                        <span className="text-[#00ff88]">
                          {item.score.toFixed(1)}%
                        </span>
                      </div>

                      <Progress value={item.score} className="h-2 mb-3" />

                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="text-[#C0C5CE]/70">
                            {language === 'ar' ? 'المتطلبات:' : 'Requirements:'}
                          </span>
                          <div className="text-[#00d4ff]">
                            {item.requirements}
                          </div>
                        </div>
                        <div>
                          <span className="text-[#C0C5CE]/70">
                            {language === 'ar' ? 'المشاكل:' : 'Issues:'}
                          </span>
                          <div className={item.issues > 0 ? 'text-orange-400' : 'text-[#00ff88]'}>
                            {item.issues}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Security Command Terminal */}
          <Card className="neo-card">
            <div className="p-6">
              <div className="neo-flex-between mb-4">
                <div className="neo-flex-start neo-space-sm">
                  <Lock className="w-5 h-5 text-[#00d4ff]" />
                  <h3 className="text-[#00ff88] font-mono text-lg">
                    {language === 'ar' ? 'أوامر الأمان' : 'Security Command Center'}
                  </h3>
                </div>
                <Badge className="bg-[#00d4ff]/20 text-[#00d4ff] border-[#00d4ff]/30">
                  <Zap className="w-3 h-3 mr-1" />
                  {language === 'ar' ? 'نشط' : 'Active'}
                </Badge>
              </div>
              
              <div className="bg-[#0B0D12] border border-[#00d4ff]/20 rounded-lg p-4 font-mono text-sm">
                <div className="space-y-2">
                  <div className="text-[#00ff88]">
                    neo@security:~$ status --comprehensive --real-time
                  </div>
                  <div className="text-[#C0C5CE]/80">
                    🔒 Security Status: SECURE (Score: {securityMetrics.securityScore}%)<br/>
                    🛡️ Active protections: WAF, DDoS Shield, Rate Limiting, 2FA<br/>
                    🔍 Threats blocked today: {securityMetrics.threatsBlocked}<br/>
                    📊 Compliance: {compliance.filter(c => c.status === 'compliant').length}/4 standards compliant<br/>
                    🔐 SSL/TLS: Valid certificates, {securityMetrics.certificateExpiry} days until renewal
                  </div>
                  
                  <div className="text-[#00ff88] mt-4">
                    neo@security:~$ scan --vulnerabilities --automated
                  </div>
                  <div className="text-[#C0C5CE]/80">
                    🔎 Vulnerability scan initiated...<br/>
                    ✅ Web application: No critical issues found<br/>
                    ✅ Database security: Encrypted at rest and in transit<br/>
                    ✅ API endpoints: Rate limited and authenticated<br/>
                    ⚠️ Certificate renewal reminder: 45 days remaining
                  </div>
                  
                  <div className="text-[#00ff88] mt-4">
                    neo@security:~$ compliance --audit --generate-report
                  </div>
                  <div className="text-[#C0C5CE]/80">
                    📋 Generating compliance report...<br/>
                    • SOC 2: ✅ Compliant (98.5% score)<br/>
                    • ISO 27001: ✅ Compliant (96.8% score)<br/>
                    • GDPR: ✅ Compliant (97.9% score)<br/>
                    • HIPAA: ⚠️ Partial compliance (89.2% score - 8 issues to resolve)
                  </div>
                  
                  <div className="text-[#00ff88] mt-4 neo-typing-cursor">
                    neo@security:~$ monitor --real-time --threat-intelligence█
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              className="neo-button-primary p-4 h-auto"
              onClick={() => onNavigate?.('security-audit')}
            >
              <Search className="w-5 h-5 mb-2" />
              <div className="text-sm">
                {language === 'ar' ? 'تدقيق أمني' : 'Security Audit'}
              </div>
            </Button>
            
            <Button 
              className="neo-button-outline p-4 h-auto"
              onClick={() => onNavigate?.('threat-intelligence')}
            >
              <Eye className="w-5 h-5 mb-2" />
              <div className="text-sm">
                {language === 'ar' ? 'استخبارات التهديدات' : 'Threat Intel'}
              </div>
            </Button>
            
            <Button 
              className="neo-button-success p-4 h-auto"
              onClick={() => onNavigate?.('compliance-reports')}
            >
              <FileCheck className="w-5 h-5 mb-2" />
              <div className="text-sm">
                {language === 'ar' ? 'تقارير الامتثال' : 'Compliance Reports'}
              </div>
            </Button>
            
            <Button 
              className="neo-button-ghost p-4 h-auto"
              onClick={() => onNavigate?.('security-settings')}
            >
              <Settings className="w-5 h-5 mb-2" />
              <div className="text-sm">
                {language === 'ar' ? 'إعدادات الأمان' : 'Security Settings'}
              </div>
            </Button>
          </div>
        </div>
      </RTLContainer>
    </div>
  );
}