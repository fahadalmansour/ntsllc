import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Avatar } from '../ui/avatar';
import { useLanguage } from '../../contexts/LanguageContext';
import { RTLContainer } from '../LanguageSwitcher';
import { 
  Users, 
  User, 
  UserPlus,
  Clock, 
  CheckCircle, 
  AlertTriangle,
  BarChart3,
  Settings,
  Mail,
  MessageSquare,
  Video,
  Calendar,
  FileText,
  Star,
  Award,
  Target,
  TrendingUp,
  Activity,
  Phone,
  Globe,
  MapPin,
  Shield,
  Zap
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'online' | 'busy' | 'away' | 'offline';
  location: string;
  timezone: string;
  skills: string[];
  rating: number;
  completedProjects: number;
  currentProjects: number;
  workload: number;
  availability: string;
  joinDate: Date;
}

interface Project {
  id: string;
  name: string;
  client: string;
  service: string;
  assignedTo: string[];
  status: 'planning' | 'in-progress' | 'review' | 'completed' | 'on-hold';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  progress: number;
  deadline: Date;
  estimatedHours: number;
  actualHours: number;
  value: number;
}

interface TeamMetrics {
  totalMembers: number;
  activeProjects: number;
  completionRate: number;
  averageRating: number;
  totalRevenue: number;
  clientSatisfaction: number;
}

export default function TeamManagementSystem({ onNavigate }: { onNavigate?: (section: string) => void }) {
  const { isRTL, language } = useLanguage();
  
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: 'tm-001',
      name: 'Ahmed Al-Rashid',
      role: 'Senior E-commerce Developer',
      avatar: '👨‍💻',
      status: 'online',
      location: 'Dubai, UAE',
      timezone: 'GMT+4',
      skills: ['WordPress', 'Shopify', 'WooCommerce', 'React'],
      rating: 4.9,
      completedProjects: 127,
      currentProjects: 3,
      workload: 85,
      availability: 'Available',
      joinDate: new Date('2023-01-15')
    },
    {
      id: 'tm-002',
      name: 'Sarah Johnson',
      role: 'UI/UX Designer',
      avatar: '👩‍🎨',
      status: 'busy',
      location: 'Wyoming, USA',
      timezone: 'GMT-7',
      skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
      rating: 4.8,
      completedProjects: 89,
      currentProjects: 2,
      workload: 70,
      availability: 'Busy until 3 PM',
      joinDate: new Date('2023-03-10')
    },
    {
      id: 'tm-003',
      name: 'Omar Al-Mansoori',
      role: 'DevOps Engineer',
      avatar: '⚙️',
      status: 'online',
      location: 'Riyadh, KSA',
      timezone: 'GMT+3',
      skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
      rating: 4.7,
      completedProjects: 156,
      currentProjects: 4,
      workload: 90,
      availability: 'Available',
      joinDate: new Date('2022-11-20')
    },
    {
      id: 'tm-004',
      name: 'Emily Chen',
      role: 'Marketing Automation Specialist',
      avatar: '📊',
      status: 'away',
      location: 'California, USA',
      timezone: 'GMT-8',
      skills: ['N8N', 'Zapier', 'Email Marketing', 'Analytics'],
      rating: 4.6,
      completedProjects: 73,
      currentProjects: 2,
      workload: 60,
      availability: 'Back at 9 AM',
      joinDate: new Date('2023-06-05')
    },
    {
      id: 'tm-005',
      name: 'Khalid Al-Zahra',
      role: 'Full-Stack Developer',
      avatar: '🚀',
      status: 'online',
      location: 'Kuwait City, Kuwait',
      timezone: 'GMT+3',
      skills: ['Node.js', 'React', 'MongoDB', 'TypeScript'],
      rating: 4.8,
      completedProjects: 94,
      currentProjects: 3,
      workload: 75,
      availability: 'Available',
      joinDate: new Date('2023-02-28')
    }
  ]);

  const [projects, setProjects] = useState<Project[]>([
    {
      id: 'proj-001',
      name: 'TechMart Store Setup',
      client: 'TechMart Solutions',
      service: 'Store Setup',
      assignedTo: ['tm-001', 'tm-002'],
      status: 'in-progress',
      priority: 'high',
      progress: 75,
      deadline: new Date('2024-10-15'),
      estimatedHours: 40,
      actualHours: 32,
      value: 1299
    },
    {
      id: 'proj-002',
      name: 'Fashion Brand Automation',
      client: 'Luxury Fashion Co.',
      service: 'N8N Automation',
      assignedTo: ['tm-004', 'tm-005'],
      status: 'in-progress',
      priority: 'medium',
      progress: 45,
      deadline: new Date('2024-10-20'),
      estimatedHours: 60,
      actualHours: 28,
      value: 2499
    },
    {
      id: 'proj-003',
      name: 'Healthcare Platform Sync',
      client: 'MedCare Systems',
      service: 'NeoSync',
      assignedTo: ['tm-003', 'tm-001'],
      status: 'review',
      priority: 'urgent',
      progress: 95,
      deadline: new Date('2024-10-12'),
      estimatedHours: 25,
      actualHours: 24,
      value: 899
    }
  ]);

  const [teamMetrics, setTeamMetrics] = useState<TeamMetrics>({
    totalMembers: 5,
    activeProjects: 3,
    completionRate: 94.2,
    averageRating: 4.76,
    totalRevenue: 847392,
    clientSatisfaction: 96.8
  });

  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [viewMode, setViewMode] = useState<'overview' | 'members' | 'projects' | 'analytics'>('overview');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-[#00ff88] border-[#00ff88]';
      case 'busy': return 'bg-red-400 border-red-400';
      case 'away': return 'bg-yellow-400 border-yellow-400';
      case 'offline': return 'bg-[#C0C5CE]/50 border-[#C0C5CE]/50';
      default: return 'bg-[#C0C5CE]/50 border-[#C0C5CE]/50';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-400/20 text-red-400 border-red-400/30';
      case 'high': return 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30';
      case 'medium': return 'bg-[#00d4ff]/20 text-[#00d4ff] border-[#00d4ff]/30';
      case 'low': return 'bg-[#C0C5CE]/20 text-[#C0C5CE] border-[#C0C5CE]/30';
      default: return 'bg-[#C0C5CE]/20 text-[#C0C5CE] border-[#C0C5CE]/30';
    }
  };

  const getProjectStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]/30';
      case 'in-progress': return 'bg-[#00d4ff]/20 text-[#00d4ff] border-[#00d4ff]/30';
      case 'review': return 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30';
      case 'planning': return 'bg-[#C0C5CE]/20 text-[#C0C5CE] border-[#C0C5CE]/30';
      case 'on-hold': return 'bg-red-400/20 text-red-400 border-red-400/30';
      default: return 'bg-[#C0C5CE]/20 text-[#C0C5CE] border-[#C0C5CE]/30';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Team Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card className="neo-dashboard-widget">
          <div className="neo-dashboard-widget-header">
            <Users className="w-5 h-5 text-[#00d4ff]" />
            <Badge className="bg-[#00d4ff]/20 text-[#00d4ff] border-[#00d4ff]/30">
              Active
            </Badge>
          </div>
          <div className="neo-dashboard-widget-value">
            {teamMetrics.totalMembers}
          </div>
          <div className="text-[#C0C5CE]/70 font-mono text-sm">
            {language === 'ar' ? 'أعضاء الفريق' : 'Team Members'}
          </div>
        </Card>

        <Card className="neo-dashboard-widget">
          <div className="neo-dashboard-widget-header">
            <FileText className="w-5 h-5 text-[#00ff88]" />
            <Badge className="bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]/30">
              {teamMetrics.activeProjects}
            </Badge>
          </div>
          <div className="neo-dashboard-widget-value">
            {teamMetrics.activeProjects}
          </div>
          <div className="text-[#C0C5CE]/70 font-mono text-sm">
            {language === 'ar' ? 'المشاريع النشطة' : 'Active Projects'}
          </div>
        </Card>

        <Card className="neo-dashboard-widget">
          <div className="neo-dashboard-widget-header">
            <CheckCircle className="w-5 h-5 text-[#00ff88]" />
            <Badge className="bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]/30">
              {teamMetrics.completionRate}%
            </Badge>
          </div>
          <div className="neo-dashboard-widget-value">
            {teamMetrics.completionRate}%
          </div>
          <div className="text-[#C0C5CE]/70 font-mono text-sm">
            {language === 'ar' ? 'معدل الإنجاز' : 'Completion Rate'}
          </div>
        </Card>

        <Card className="neo-dashboard-widget">
          <div className="neo-dashboard-widget-header">
            <Star className="w-5 h-5 text-[#00d4ff]" />
            <Badge className="bg-[#00d4ff]/20 text-[#00d4ff] border-[#00d4ff]/30">
              ★ {teamMetrics.averageRating}
            </Badge>
          </div>
          <div className="neo-dashboard-widget-value">
            {teamMetrics.averageRating}
          </div>
          <div className="text-[#C0C5CE]/70 font-mono text-sm">
            {language === 'ar' ? 'متوسط التقييم' : 'Avg Rating'}
          </div>
        </Card>

        <Card className="neo-dashboard-widget">
          <div className="neo-dashboard-widget-header">
            <TrendingUp className="w-5 h-5 text-[#00ff88]" />
            <Badge className="bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]/30">
              +23%
            </Badge>
          </div>
          <div className="neo-dashboard-widget-value">
            {formatCurrency(teamMetrics.totalRevenue)}
          </div>
          <div className="text-[#C0C5CE]/70 font-mono text-sm">
            {language === 'ar' ? 'إجمالي الإيرادات' : 'Total Revenue'}
          </div>
        </Card>

        <Card className="neo-dashboard-widget">
          <div className="neo-dashboard-widget-header">
            <Award className="w-5 h-5 text-[#00d4ff]" />
            <Badge className="bg-[#00d4ff]/20 text-[#00d4ff] border-[#00d4ff]/30">
              Excellent
            </Badge>
          </div>
          <div className="neo-dashboard-widget-value">
            {teamMetrics.clientSatisfaction}%
          </div>
          <div className="text-[#C0C5CE]/70 font-mono text-sm">
            {language === 'ar' ? 'رضا العملاء' : 'Client Satisfaction'}
          </div>
        </Card>
      </div>

      {/* Team Status & Active Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Team Status */}
        <Card className="neo-card">
          <div className="p-6">
            <div className="neo-flex-between mb-6">
              <h3 className="text-[#00ff88] font-mono text-xl">
                {language === 'ar' ? 'حالة الفريق' : 'Team Status'}
              </h3>
              <div className="neo-flex-start neo-space-xs">
                <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse"></div>
                <span className="text-[#00ff88] text-sm">Live</span>
              </div>
            </div>

            <div className="space-y-4">
              {teamMembers.slice(0, 4).map((member) => (
                <div 
                  key={member.id} 
                  className="neo-interactive-card p-4 cursor-pointer"
                  onClick={() => setSelectedMember(member)}
                >
                  <div className="neo-flex-between">
                    <div className="neo-flex-start neo-space-sm">
                      <div className="relative">
                        <div className="w-10 h-10 bg-[#12151C] rounded-full flex items-center justify-center text-lg">
                          {member.avatar}
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-[#12151C] ${getStatusColor(member.status)}`}></div>
                      </div>
                      <div>
                        <div className="font-semibold text-[#C0C5CE]">
                          {member.name}
                        </div>
                        <div className="text-xs text-[#C0C5CE]/70">
                          {member.role}
                        </div>
                        <div className="text-xs text-[#00d4ff]">
                          {member.location}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm font-semibold text-[#00ff88]">
                        ★ {member.rating}
                      </div>
                      <div className="text-xs text-[#C0C5CE]/70">
                        {member.currentProjects} {language === 'ar' ? 'مشاريع' : 'projects'}
                      </div>
                      <div className="w-16 mt-1">
                        <Progress value={member.workload} className="h-1" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Active Projects */}
        <Card className="neo-card">
          <div className="p-6">
            <div className="neo-flex-between mb-6">
              <h3 className="text-[#00ff88] font-mono text-xl">
                {language === 'ar' ? 'المشاريع النشطة' : 'Active Projects'}
              </h3>
              <Button className="neo-button-ghost text-xs">
                {language === 'ar' ? 'عرض الكل' : 'View All'}
              </Button>
            </div>

            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="neo-interactive-card p-4">
                  <div className="neo-flex-between mb-3">
                    <div>
                      <div className="font-semibold text-[#C0C5CE]">
                        {project.name}
                      </div>
                      <div className="text-xs text-[#C0C5CE]/70">
                        {project.client} • {project.service}
                      </div>
                    </div>
                    
                    <div className="neo-flex-start neo-space-xs">
                      <Badge className={getPriorityColor(project.priority)}>
                        {project.priority}
                      </Badge>
                      <Badge className={getProjectStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="neo-flex-between text-xs mb-2">
                    <span className="text-[#C0C5CE]/70">
                      {language === 'ar' ? 'التقدم:' : 'Progress:'}
                    </span>
                    <span className="text-[#00ff88]">
                      {project.progress}%
                    </span>
                  </div>

                  <Progress value={project.progress} className="h-2 mb-3" />

                  <div className="neo-flex-between">
                    <div className="neo-flex-start neo-space-xs">
                      {project.assignedTo.slice(0, 2).map(memberId => {
                        const member = teamMembers.find(m => m.id === memberId);
                        return member ? (
                          <div key={memberId} className="w-6 h-6 bg-[#12151C] rounded-full flex items-center justify-center text-xs">
                            {member.avatar}
                          </div>
                        ) : null;
                      })}
                      {project.assignedTo.length > 2 && (
                        <div className="w-6 h-6 bg-[#00d4ff]/20 rounded-full flex items-center justify-center text-xs text-[#00d4ff]">
                          +{project.assignedTo.length - 2}
                        </div>
                      )}
                    </div>
                    
                    <div className="text-right">
                      <div className="text-xs text-[#00d4ff]">
                        {formatCurrency(project.value)}
                      </div>
                      <div className="text-xs text-[#C0C5CE]/70">
                        {Math.ceil((project.deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days left
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
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
                  {language === 'ar' ? 'إدارة فرق العمل' : 'Team Management System'}
                </h1>
                <p className="text-[#C0C5CE]/80 text-lg">
                  {language === 'ar' 
                    ? 'إدارة شاملة للفرق والمشاريع والأداء'
                    : 'Comprehensive team, project & performance management'
                  }
                </p>
              </div>
            </div>
            
            <div className="neo-flex-start neo-space-sm">
              <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse"></div>
              <span className="text-[#00ff88] text-sm font-mono">
                {teamMembers.filter(m => m.status === 'online').length} {language === 'ar' ? 'متصل' : 'Online'}
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div className="neo-flex-start neo-space-sm mb-8">
            {[
              { key: 'overview', label: language === 'ar' ? 'نظرة عامة' : 'Overview', icon: BarChart3 },
              { key: 'members', label: language === 'ar' ? 'الأعضاء' : 'Members', icon: Users },
              { key: 'projects', label: language === 'ar' ? 'المشاريع' : 'Projects', icon: FileText },
              { key: 'analytics', label: language === 'ar' ? 'التحليلات' : 'Analytics', icon: TrendingUp }
            ].map(({ key, label, icon: Icon }) => (
              <Button
                key={key}
                className={`${
                  viewMode === key 
                    ? 'neo-button-primary' 
                    : 'neo-button-ghost'
                } neo-flex-start neo-space-xs`}
                onClick={() => setViewMode(key as any)}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Button>
            ))}
          </div>

          {/* Content */}
          {viewMode === 'overview' && renderOverview()}

          {/* Terminal Activity Log */}
          <Card className="neo-card">
            <div className="p-6">
              <div className="neo-flex-between mb-4">
                <div className="neo-flex-start neo-space-sm">
                  <Activity className="w-5 h-5 text-[#00d4ff]" />
                  <h3 className="text-[#00ff88] font-mono text-lg">
                    {language === 'ar' ? 'سجل النشاط المباشر' : 'Live Activity Feed'}
                  </h3>
                </div>
                <Badge className="bg-[#00d4ff]/20 text-[#00d4ff] border-[#00d4ff]/30">
                  <Zap className="w-3 h-3 mr-1" />
                  {language === 'ar' ? 'مباشر' : 'Live'}
                </Badge>
              </div>
              
              <div className="bg-[#0B0D12] border border-[#00d4ff]/20 rounded-lg p-4 font-mono text-sm">
                <div className="space-y-2">
                  <div className="text-[#00ff88]">
                    neo@team-mgmt:~$ monitor --team-activity --real-time
                  </div>
                  <div className="text-[#C0C5CE]/80">
                    🟢 Ahmed Al-Rashid: Completed "TechMart product catalog setup"<br/>
                    📊 Sarah Johnson: Updated UI designs for Fashion Brand project<br/>
                    ⚡ Omar Al-Mansoori: Deployed staging environment for MedCare<br/>
                    📧 Emily Chen: Configured automation workflow for new client<br/>
                    🚀 Khalid Al-Zahra: Started code review for payment integration
                  </div>
                  
                  <div className="text-[#00ff88] mt-4">
                    neo@team-mgmt:~$ performance --summary --today
                  </div>
                  <div className="text-[#C0C5CE]/80">
                    📈 Team Productivity: +18% vs yesterday<br/>
                    ✅ Tasks Completed: 47/52 (90.4%)<br/>
                    ⏱️ Average Task Time: 2.3 hours<br/>
                    🎯 Client Satisfaction: 97.2% (all-time high)
                  </div>
                  
                  <div className="text-[#00ff88] mt-4 neo-typing-cursor">
                    neo@team-mgmt:~$ optimize --workload --auto-assign█
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </RTLContainer>

      {/* Member Detail Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="neo-card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="neo-flex-between mb-6">
                <div className="neo-flex-start neo-space-md">
                  <div className="relative">
                    <div className="w-16 h-16 bg-[#12151C] rounded-full flex items-center justify-center text-2xl">
                      {selectedMember.avatar}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#12151C] ${getStatusColor(selectedMember.status)}`}></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#C0C5CE]">
                      {selectedMember.name}
                    </h3>
                    <p className="text-[#C0C5CE]/70">
                      {selectedMember.role}
                    </p>
                    <div className="neo-flex-start neo-space-sm mt-2">
                      <MapPin className="w-4 h-4 text-[#00d4ff]" />
                      <span className="text-sm text-[#00d4ff]">
                        {selectedMember.location} ({selectedMember.timezone})
                      </span>
                    </div>
                  </div>
                </div>
                <Button 
                  className="neo-button-ghost"
                  onClick={() => setSelectedMember(null)}
                >
                  ✕
                </Button>
              </div>

              {/* Member Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-[#00ff88] font-mono text-sm mb-2">
                      {language === 'ar' ? 'الإحصائيات' : 'Statistics'}
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="neo-flex-between">
                        <span className="text-[#C0C5CE]/70">Rating:</span>
                        <span className="text-[#00ff88]">★ {selectedMember.rating}</span>
                      </div>
                      <div className="neo-flex-between">
                        <span className="text-[#C0C5CE]/70">Completed:</span>
                        <span className="text-[#00d4ff]">{selectedMember.completedProjects}</span>
                      </div>
                      <div className="neo-flex-between">
                        <span className="text-[#C0C5CE]/70">Current:</span>
                        <span className="text-[#00d4ff]">{selectedMember.currentProjects}</span>
                      </div>
                      <div className="neo-flex-between">
                        <span className="text-[#C0C5CE]/70">Workload:</span>
                        <span className="text-[#00ff88]">{selectedMember.workload}%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[#00ff88] font-mono text-sm mb-2">
                      {language === 'ar' ? 'المهارات' : 'Skills'}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedMember.skills.map(skill => (
                        <Badge key={skill} className="bg-[#00d4ff]/20 text-[#00d4ff] border-[#00d4ff]/30">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-[#00ff88] font-mono text-sm mb-2">
                      {language === 'ar' ? 'التوفر' : 'Availability'}
                    </h4>
                    <div className="text-sm text-[#C0C5CE]">
                      {selectedMember.availability}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[#00ff88] font-mono text-sm mb-2">
                      {language === 'ar' ? 'إجراءات سريعة' : 'Quick Actions'}
                    </h4>
                    <div className="space-y-2">
                      <Button className="neo-button-outline w-full text-sm">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        {language === 'ar' ? 'إرسال رسالة' : 'Send Message'}
                      </Button>
                      <Button className="neo-button-outline w-full text-sm">
                        <Video className="w-4 h-4 mr-2" />
                        {language === 'ar' ? 'مكالمة فيديو' : 'Video Call'}
                      </Button>
                      <Button className="neo-button-outline w-full text-sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        {language === 'ar' ? 'جدولة اجتماع' : 'Schedule Meeting'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}