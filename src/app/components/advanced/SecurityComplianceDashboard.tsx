import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Button } from '../ui/button';
import { Shield, Lock, Eye, AlertTriangle, CheckCircle, XCircle, Users, Key, FileText, Globe, Zap, Activity, Clock, Database } from 'lucide-react';

const SecurityComplianceDashboard = () => {
  const [securityScore, setSecurityScore] = useState(87);
  const [complianceStatus, setComplianceStatus] = useState({
    gdpr: { score: 94, status: 'compliant', lastAudit: '2024-01-15' },
    soc2: { score: 89, status: 'compliant', lastAudit: '2024-01-20' },
    iso27001: { score: 92, status: 'compliant', lastAudit: '2024-01-10' },
    hipaa: { score: 88, status: 'partial', lastAudit: '2024-01-25' }
  });

  const [securityAlerts, setSecurityAlerts] = useState([
    {
      id: 1,
      severity: 'high',
      type: 'Authentication',
      message: 'Multiple failed login attempts detected',
      timestamp: '2024-01-28 14:32:15',
      status: 'active'
    },
    {
      id: 2,
      severity: 'medium',
      type: 'Data Access',
      message: 'Unusual data export pattern detected',
      timestamp: '2024-01-28 13:45:22',
      status: 'investigating'
    },
    {
      id: 3,
      severity: 'low',
      type: 'System',
      message: 'SSL certificate expires in 30 days',
      timestamp: '2024-01-28 12:15:08',
      status: 'acknowledged'
    }
  ]);

  const [auditLogs, setAuditLogs] = useState([
    {
      id: 1,
      action: 'User Login',
      user: 'admin@neotechnology.solutions',
      ip: '192.168.1.100',
      timestamp: '2024-01-28 15:30:45',
      status: 'success'
    },
    {
      id: 2,
      action: 'Data Export',
      user: 'user@client.com',
      ip: '203.0.113.42',
      timestamp: '2024-01-28 15:25:12',
      status: 'success'
    },
    {
      id: 3,
      action: 'Permission Change',
      user: 'admin@neotechnology.solutions',
      ip: '192.168.1.100',
      timestamp: '2024-01-28 15:20:33',
      status: 'success'
    },
    {
      id: 4,
      action: 'Failed Login',
      user: 'unknown@suspicious.com',
      ip: '45.33.32.156',
      timestamp: '2024-01-28 15:15:20',
      status: 'failed'
    }
  ]);

  const [vulnerabilities, setVulnerabilities] = useState([
    {
      id: 1,
      title: 'Outdated NPM Dependencies',
      severity: 'medium',
      cvss: 6.2,
      affected: 'Frontend Components',
      status: 'in-progress',
      dueDate: '2024-02-15'
    },
    {
      id: 2,
      title: 'Weak Password Policy',
      severity: 'high',
      cvss: 7.8,
      affected: 'User Authentication',
      status: 'resolved',
      dueDate: '2024-01-30'
    },
    {
      id: 3,
      title: 'Missing CSP Headers',
      severity: 'low',
      cvss: 3.1,
      affected: 'Web Application',
      status: 'open',
      dueDate: '2024-02-28'
    }
  ]);

  const [complianceMetrics, setComplianceMetrics] = useState({
    dataRetention: 95,
    accessControls: 92,
    encryption: 98,
    auditTrails: 89,
    incidentResponse: 87,
    riskAssessment: 91
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update security score slightly
      setSecurityScore(prev => Math.max(80, Math.min(100, prev + (Math.random() - 0.5) * 2)));
      
      // Occasionally add new audit logs
      if (Math.random() < 0.3) {
        const newLog = {
          id: Date.now(),
          action: ['User Login', 'Data Access', 'File Upload', 'Settings Change'][Math.floor(Math.random() * 4)],
          user: `user${Math.floor(Math.random() * 100)}@example.com`,
          ip: `192.168.1.${Math.floor(Math.random() * 255)}`,
          timestamp: new Date().toLocaleString(),
          status: Math.random() > 0.9 ? 'failed' : 'success'
        };
        setAuditLogs(prev => [newLog, ...prev.slice(0, 9)]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const SecurityMetricCard = ({ title, value, status, icon: Icon, type = 'score' }) => {
    const getStatusColor = (status) => {
      switch (status) {
        case 'compliant': return 'text-[#4AE54A]';
        case 'partial': return 'text-yellow-400';
        case 'non-compliant': return 'text-red-400';
        default: return 'text-[#C0C5CE]';
      }
    };

    const getScoreColor = (score) => {
      if (score >= 90) return 'text-[#4AE54A]';
      if (score >= 70) return 'text-yellow-400';
      return 'text-red-400';
    };

    return (
      <Card className="bg-[#12151C] border-[#4AE54A]/20 card-hover-glow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-[#C0C5CE]/70 font-mono text-sm">{title}</p>
              <div className="mt-2">
                {type === 'score' ? (
                  <p className={`text-2xl font-mono font-medium ${getScoreColor(value)}`}>
                    {value}%
                  </p>
                ) : (
                  <Badge className={`${getStatusColor(status)} border-current font-mono`}>
                    {status}
                  </Badge>
                )}
              </div>
            </div>
            <div className="p-3 bg-[#4AE54A]/10 rounded-lg">
              <Icon className="w-6 h-6 text-[#4AE54A]" />
            </div>
          </div>
          {type === 'score' && (
            <div className="mt-4">
              <Progress value={value} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const AlertCard = ({ alert }) => {
    const getSeverityColor = (severity) => {
      switch (severity) {
        case 'high': return 'border-red-400 bg-red-400/10';
        case 'medium': return 'border-yellow-400 bg-yellow-400/10';
        case 'low': return 'border-blue-400 bg-blue-400/10';
        default: return 'border-[#C0C5CE]/20 bg-[#C0C5CE]/10';
      }
    };

    const getSeverityIcon = (severity) => {
      switch (severity) {
        case 'high': return <XCircle className="w-5 h-5 text-red-400" />;
        case 'medium': return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
        case 'low': return <Eye className="w-5 h-5 text-blue-400" />;
        default: return <CheckCircle className="w-5 h-5 text-[#C0C5CE]" />;
      }
    };

    return (
      <Card className={`${getSeverityColor(alert.severity)} border`}>
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              {getSeverityIcon(alert.severity)}
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <Badge variant="outline" className="font-mono text-xs">
                    {alert.type}
                  </Badge>
                  <Badge variant="outline" className={`font-mono text-xs ${
                    alert.severity === 'high' ? 'border-red-400 text-red-400' :
                    alert.severity === 'medium' ? 'border-yellow-400 text-yellow-400' :
                    'border-blue-400 text-blue-400'
                  }`}>
                    {alert.severity.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-[#C0C5CE] font-mono text-sm">{alert.message}</p>
                <p className="text-[#C0C5CE]/60 font-mono text-xs mt-1">{alert.timestamp}</p>
              </div>
            </div>
            <Button size="sm" variant="outline" className="font-mono">
              Investigate
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const VulnerabilityCard = ({ vulnerability }) => {
    const getSeverityColor = (severity) => {
      switch (severity) {
        case 'high': return 'text-red-400 border-red-400';
        case 'medium': return 'text-yellow-400 border-yellow-400';
        case 'low': return 'text-blue-400 border-blue-400';
        default: return 'text-[#C0C5CE] border-[#C0C5CE]/20';
      }
    };

    const getStatusColor = (status) => {
      switch (status) {
        case 'resolved': return 'text-[#4AE54A] border-[#4AE54A]';
        case 'in-progress': return 'text-yellow-400 border-yellow-400';
        case 'open': return 'text-red-400 border-red-400';
        default: return 'text-[#C0C5CE] border-[#C0C5CE]/20';
      }
    };

    return (
      <Card className="bg-[#12151C] border-[#4AE54A]/20">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h4 className="text-[#C0C5CE] font-mono font-medium">{vulnerability.title}</h4>
              <p className="text-[#C0C5CE]/60 font-mono text-xs mt-1">{vulnerability.affected}</p>
            </div>
            <div className="text-right">
              <Badge variant="outline" className={`font-mono text-xs ${getSeverityColor(vulnerability.severity)}`}>
                {vulnerability.severity.toUpperCase()}
              </Badge>
              <p className="text-[#C0C5CE]/60 font-mono text-xs mt-1">CVSS: {vulnerability.cvss}</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Badge variant="outline" className={`font-mono text-xs ${getStatusColor(vulnerability.status)}`}>
              {vulnerability.status.replace('-', ' ').toUpperCase()}
            </Badge>
            <span className="text-[#C0C5CE]/60 font-mono text-xs">
              Due: {vulnerability.dueDate}
            </span>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-[#0B0D12] terminal-theme p-6">
      <div className="max-w-[1400px] mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-mono text-[#4AE54A] mb-2">Security & Compliance</h1>
            <p className="text-[#C0C5CE]/70 font-mono">Enterprise security monitoring and compliance tracking</p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className={`font-mono neural-pulse ${
              securityScore >= 90 ? 'border-[#4AE54A] text-[#4AE54A]' :
              securityScore >= 70 ? 'border-yellow-400 text-yellow-400' :
              'border-red-400 text-red-400'
            }`}>
              Security Score: {securityScore}%
            </Badge>
            <Badge variant="outline" className="border-[#C0C5CE]/30 text-[#C0C5CE] font-mono">
              Last Scan: {new Date().toLocaleDateString()}
            </Badge>
          </div>
        </div>

        {/* Security Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <SecurityMetricCard
            title="Overall Security"
            value={securityScore}
            icon={Shield}
          />
          <SecurityMetricCard
            title="Access Control"
            value={complianceMetrics.accessControls}
            icon={Lock}
          />
          <SecurityMetricCard
            title="Data Encryption"
            value={complianceMetrics.encryption}
            icon={Key}
          />
          <SecurityMetricCard
            title="Audit Coverage"
            value={complianceMetrics.auditTrails}
            icon={FileText}
          />
        </div>

        {/* Main Dashboard */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-[#12151C] border border-[#4AE54A]/20">
            <TabsTrigger value="overview" className="font-mono">Overview</TabsTrigger>
            <TabsTrigger value="compliance" className="font-mono">Compliance</TabsTrigger>
            <TabsTrigger value="vulnerabilities" className="font-mono">Vulnerabilities</TabsTrigger>
            <TabsTrigger value="audit" className="font-mono">Audit Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Security Alerts */}
            <Card className="bg-[#12151C] border-[#4AE54A]/20">
              <CardHeader>
                <CardTitle className="text-[#4AE54A] font-mono flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Active Security Alerts
                </CardTitle>
                <CardDescription className="text-[#C0C5CE]/70 font-mono">
                  {securityAlerts.filter(a => a.status === 'active').length} active alerts requiring attention
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {securityAlerts.map(alert => (
                  <AlertCard key={alert.id} alert={alert} />
                ))}
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Compliance Status */}
              <Card className="bg-[#12151C] border-[#4AE54A]/20">
                <CardHeader>
                  <CardTitle className="text-[#4AE54A] font-mono">Compliance Status</CardTitle>
                  <CardDescription className="text-[#C0C5CE]/70 font-mono">
                    Current compliance framework status
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(complianceStatus).map(([framework, data]) => (
                    <div key={framework} className="flex items-center justify-between p-3 border border-[#4AE54A]/20 rounded-lg">
                      <div>
                        <span className="text-[#C0C5CE] font-mono font-medium">
                          {framework.toUpperCase()}
                        </span>
                        <p className="text-[#C0C5CE]/60 font-mono text-xs">
                          Last audit: {data.lastAudit}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[#4AE54A] font-mono text-sm">{data.score}%</span>
                        <Badge variant="outline" className={`font-mono text-xs ${
                          data.status === 'compliant' ? 'border-[#4AE54A] text-[#4AE54A]' :
                          data.status === 'partial' ? 'border-yellow-400 text-yellow-400' :
                          'border-red-400 text-red-400'
                        }`}>
                          {data.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Security Metrics */}
              <Card className="bg-[#12151C] border-[#4AE54A]/20">
                <CardHeader>
                  <CardTitle className="text-[#4AE54A] font-mono">Security Metrics</CardTitle>
                  <CardDescription className="text-[#C0C5CE]/70 font-mono">
                    Key security performance indicators
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(complianceMetrics).map(([metric, value]) => (
                    <div key={metric} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-[#C0C5CE] font-mono text-sm capitalize">
                          {metric.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span className="text-[#4AE54A] font-mono text-sm">{value}%</span>
                      </div>
                      <Progress value={value} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(complianceStatus).map(([framework, data]) => (
                <SecurityMetricCard
                  key={framework}
                  title={framework.toUpperCase()}
                  value={data.score}
                  status={data.status}
                  icon={Shield}
                />
              ))}
            </div>

            <Card className="bg-[#12151C] border-[#4AE54A]/20">
              <CardHeader>
                <CardTitle className="text-[#4AE54A] font-mono">Compliance Requirements</CardTitle>
                <CardDescription className="text-[#C0C5CE]/70 font-mono">
                  Track compliance requirements and deadlines
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert className="border-yellow-400/20 bg-yellow-400/10">
                    <AlertTriangle className="h-4 w-4 text-yellow-400" />
                    <AlertTitle className="text-yellow-400 font-mono">GDPR Review Due</AlertTitle>
                    <AlertDescription className="text-[#C0C5CE]/70 font-mono">
                      Quarterly GDPR compliance review due in 15 days
                    </AlertDescription>
                  </Alert>
                  <Alert className="border-blue-400/20 bg-blue-400/10">
                    <Eye className="h-4 w-4 text-blue-400" />
                    <AlertTitle className="text-blue-400 font-mono">SOC2 Audit Scheduled</AlertTitle>
                    <AlertDescription className="text-[#C0C5CE]/70 font-mono">
                      Annual SOC2 Type II audit scheduled for next month
                    </AlertDescription>
                  </Alert>
                  <Alert className="border-[#4AE54A]/20 bg-[#4AE54A]/10">
                    <CheckCircle className="h-4 w-4 text-[#4AE54A]" />
                    <AlertTitle className="text-[#4AE54A] font-mono">ISO 27001 Certified</AlertTitle>
                    <AlertDescription className="text-[#C0C5CE]/70 font-mono">
                      Successfully renewed ISO 27001 certification
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vulnerabilities" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SecurityMetricCard
                title="High Risk"
                value={vulnerabilities.filter(v => v.severity === 'high').length}
                icon={XCircle}
                type="count"
              />
              <SecurityMetricCard
                title="Medium Risk"
                value={vulnerabilities.filter(v => v.severity === 'medium').length}
                icon={AlertTriangle}
                type="count"
              />
              <SecurityMetricCard
                title="Low Risk"
                value={vulnerabilities.filter(v => v.severity === 'low').length}
                icon={Eye}
                type="count"
              />
            </div>

            <Card className="bg-[#12151C] border-[#4AE54A]/20">
              <CardHeader>
                <CardTitle className="text-[#4AE54A] font-mono">Vulnerability Management</CardTitle>
                <CardDescription className="text-[#C0C5CE]/70 font-mono">
                  Track and manage security vulnerabilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {vulnerabilities.map(vulnerability => (
                    <VulnerabilityCard key={vulnerability.id} vulnerability={vulnerability} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audit" className="space-y-6">
            <Card className="bg-[#12151C] border-[#4AE54A]/20">
              <CardHeader>
                <CardTitle className="text-[#4AE54A] font-mono flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  Recent Audit Logs
                </CardTitle>
                <CardDescription className="text-[#C0C5CE]/70 font-mono">
                  Real-time system activity and security events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {auditLogs.map(log => (
                    <div key={log.id} className="flex items-center justify-between p-3 border border-[#4AE54A]/20 rounded-lg font-mono text-sm">
                      <div className="flex items-center space-x-4">
                        <Badge variant="outline" className={`text-xs ${
                          log.status === 'success' ? 'border-[#4AE54A] text-[#4AE54A]' : 'border-red-400 text-red-400'
                        }`}>
                          {log.status}
                        </Badge>
                        <span className="text-[#C0C5CE]">{log.action}</span>
                        <span className="text-[#C0C5CE]/60">{log.user}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-[#C0C5CE]/60">
                        <span>{log.ip}</span>
                        <span>{log.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SecurityComplianceDashboard;