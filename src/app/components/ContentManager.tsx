import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus,
  Edit3,
  Trash2,
  Save,
  X,
  Image as ImageIcon,
  Star,
  Eye,
  Calendar,
  User,
  Mail,
  Phone,
  Building,
  MessageSquare,
  DollarSign,
  Filter,
  Search,
  Download,
  BarChart3,
  TrendingUp,
  Users,
  FileText,
  Shield,
  Settings
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { useAuth } from './contexts/AuthContext';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { CMSSeeder } from './CMSSeeder';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  image: string;
  demoUrl: string;
  codeUrl: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  image: string;
  rating: number;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  service: string;
  budget: string;
  status: 'new' | 'in-progress' | 'completed';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

interface Analytics {
  portfolio: { total: number; featured: number };
  testimonials: { total: number; featured: number; avgRating: number };
  contacts: { total: number; new: number; inProgress: number; completed: number };
  services: { total: number; active: number };
}

export function ContentManager() {
  const { session } = useAuth();
  const [activeTab, setActiveTab] = useState('analytics');
  const [projects, setProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Form states
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);

  const baseURL = `https://${projectId}.supabase.co/functions/v1/make-server-b245be9a`;
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${session?.access_token}`
  };

  // API functions
  const fetchData = async () => {
    if (!session?.access_token) return;
    
    setLoading(true);
    try {
      const [projectsRes, testimonialsRes, contactsRes, analyticsRes] = await Promise.all([
        fetch(`${baseURL}/portfolio`, { headers }),
        fetch(`${baseURL}/testimonials`, { headers }),
        fetch(`${baseURL}/contacts`, { headers }),
        fetch(`${baseURL}/analytics`, { headers })
      ]);

      if (projectsRes.ok) {
        const data = await projectsRes.json();
        setProjects(data.projects || []);
      }

      if (testimonialsRes.ok) {
        const data = await testimonialsRes.json();
        setTestimonials(data.testimonials || []);
      }

      if (contactsRes.ok) {
        const data = await contactsRes.json();
        setContacts(data.contacts || []);
      }

      if (analyticsRes.ok) {
        const data = await analyticsRes.json();
        setAnalytics(data.analytics);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [session]);

  const saveProject = async (projectData: Partial<Project>) => {
    try {
      const url = editingProject 
        ? `${baseURL}/portfolio/${editingProject.id}` 
        : `${baseURL}/portfolio`;
      
      const method = editingProject ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(projectData)
      });

      if (response.ok) {
        await fetchData();
        setEditingProject(null);
        setShowProjectForm(false);
      }
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const deleteProject = async (projectId: string) => {
    try {
      const response = await fetch(`${baseURL}/portfolio/${projectId}`, {
        method: 'DELETE',
        headers
      });

      if (response.ok) {
        await fetchData();
      }
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const saveTestimonial = async (testimonialData: Partial<Testimonial>) => {
    try {
      const url = editingTestimonial 
        ? `${baseURL}/testimonials/${editingTestimonial.id}` 
        : `${baseURL}/testimonials`;
      
      const method = editingTestimonial ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(testimonialData)
      });

      if (response.ok) {
        await fetchData();
        setEditingTestimonial(null);
        setShowTestimonialForm(false);
      }
    } catch (error) {
      console.error('Error saving testimonial:', error);
    }
  };

  const deleteTestimonial = async (testimonialId: string) => {
    try {
      const response = await fetch(`${baseURL}/testimonials/${testimonialId}`, {
        method: 'DELETE',
        headers
      });

      if (response.ok) {
        await fetchData();
      }
    } catch (error) {
      console.error('Error deleting testimonial:', error);
    }
  };

  const updateContactStatus = async (contactId: string, status: string, notes?: string) => {
    try {
      const response = await fetch(`${baseURL}/contacts/${contactId}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ status, notes })
      });

      if (response.ok) {
        await fetchData();
      }
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  // Filter functions
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contact.company.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || contact.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-[#0B0D12] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-[#4AE54A] font-mono text-2xl mb-2">Content Management System</h1>
            <p className="text-[#C0C5CE]/70 font-mono">Manage your site content in real-time</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={fetchData}
              variant="outline"
              className="border-[#C0C5CE]/20 text-[#C0C5CE] font-mono"
              disabled={loading}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              {loading ? 'Loading...' : 'Refresh'}
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-[#12151C] border-[#C0C5CE]/20">
            <TabsTrigger value="analytics" className="font-mono">Analytics</TabsTrigger>
            <TabsTrigger value="portfolio" className="font-mono">Portfolio</TabsTrigger>
            <TabsTrigger value="testimonials" className="font-mono">Testimonials</TabsTrigger>
            <TabsTrigger value="contacts" className="font-mono">Lead Management</TabsTrigger>
          </TabsList>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            {/* CMS Seeder */}
            <CMSSeeder />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {analytics && (
                <>
                  <Card className="bg-[#12151C] border-[#C0C5CE]/20 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <FileText className="w-8 h-8 text-[#4AE54A]" />
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    </div>
                    <div className="text-2xl font-mono text-[#C0C5CE] mb-1">{analytics.portfolio.total}</div>
                    <div className="text-[#C0C5CE]/70 font-mono text-sm">Portfolio Projects</div>
                    <div className="text-[#4AE54A] font-mono text-xs mt-2">
                      {analytics.portfolio.featured} featured
                    </div>
                  </Card>

                  <Card className="bg-[#12151C] border-[#C0C5CE]/20 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Star className="w-8 h-8 text-[#4AE54A]" />
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    </div>
                    <div className="text-2xl font-mono text-[#C0C5CE] mb-1">{analytics.testimonials.total}</div>
                    <div className="text-[#C0C5CE]/70 font-mono text-sm">Client Testimonials</div>
                    <div className="text-[#4AE54A] font-mono text-xs mt-2">
                      {analytics.testimonials.avgRating.toFixed(1)}★ avg rating
                    </div>
                  </Card>

                  <Card className="bg-[#12151C] border-[#C0C5CE]/20 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Users className="w-8 h-8 text-[#4AE54A]" />
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    </div>
                    <div className="text-2xl font-mono text-[#C0C5CE] mb-1">{analytics.contacts.total}</div>
                    <div className="text-[#C0C5CE]/70 font-mono text-sm">Total Leads</div>
                    <div className="text-[#4AE54A] font-mono text-xs mt-2">
                      {analytics.contacts.new} new leads
                    </div>
                  </Card>

                  <Card className="bg-[#12151C] border-[#C0C5CE]/20 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Settings className="w-8 h-8 text-[#4AE54A]" />
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    </div>
                    <div className="text-2xl font-mono text-[#C0C5CE] mb-1">{analytics.services.active}</div>
                    <div className="text-[#C0C5CE]/70 font-mono text-sm">Active Services</div>
                    <div className="text-[#4AE54A] font-mono text-xs mt-2">
                      of {analytics.services.total} total
                    </div>
                  </Card>
                </>
              )}
            </div>

            {/* Recent Activity */}
            <Card className="bg-[#12151C] border-[#C0C5CE]/20 p-6">
              <h3 className="text-[#4AE54A] font-mono text-lg mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {contacts.slice(0, 5).map((contact) => (
                  <div key={contact.id} className="flex items-center justify-between p-4 bg-[#0B0D12] rounded-lg border border-[#C0C5CE]/20">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 rounded-full bg-[#4AE54A]"></div>
                      <div>
                        <div className="text-[#C0C5CE] font-mono">New lead from {contact.name}</div>
                        <div className="text-[#C0C5CE]/70 font-mono text-sm">{contact.email} • {contact.service}</div>
                      </div>
                    </div>
                    <div className="text-[#C0C5CE]/50 font-mono text-sm">
                      {formatDate(contact.createdAt)}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[#4AE54A] font-mono text-lg">Portfolio Management</h3>
              <Button
                onClick={() => {
                  setEditingProject(null);
                  setShowProjectForm(true);
                }}
                className="bg-[#4AE54A] text-[#0B0D12] hover:bg-[#4AE54A]/90 font-mono"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="bg-[#12151C] border-[#C0C5CE]/20 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-[#C0C5CE] font-mono">{project.title}</h4>
                    <div className="flex items-center space-x-2">
                      {project.featured && <Star className="w-4 h-4 text-yellow-400 fill-current" />}
                      <Button
                        onClick={() => {
                          setEditingProject(project);
                          setShowProjectForm(true);
                        }}
                        size="sm"
                        variant="outline"
                        className="border-[#C0C5CE]/20 text-[#C0C5CE] font-mono p-2"
                      >
                        <Edit3 className="w-3 h-3" />
                      </Button>
                      <Button
                        onClick={() => deleteProject(project.id)}
                        size="sm"
                        variant="outline"
                        className="border-red-400/20 text-red-400 font-mono p-2"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-[#C0C5CE]/70 font-mono text-sm mb-3">{project.description.substring(0, 100)}...</p>
                  <Badge variant="secondary" className="font-mono text-xs">{project.category}</Badge>
                  <div className="text-[#C0C5CE]/50 font-mono text-xs mt-3">
                    Updated {formatDate(project.updatedAt)}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[#4AE54A] font-mono text-lg">Testimonials Management</h3>
              <Button
                onClick={() => {
                  setEditingTestimonial(null);
                  setShowTestimonialForm(true);
                }}
                className="bg-[#4AE54A] text-[#0B0D12] hover:bg-[#4AE54A]/90 font-mono"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Testimonial
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="bg-[#12151C] border-[#C0C5CE]/20 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-[#4AE54A]/20 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-[#4AE54A]" />
                      </div>
                      <div>
                        <h4 className="text-[#C0C5CE] font-mono">{testimonial.name}</h4>
                        <p className="text-[#C0C5CE]/70 font-mono text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {testimonial.featured && <Star className="w-4 h-4 text-yellow-400 fill-current" />}
                      <Button
                        onClick={() => {
                          setEditingTestimonial(testimonial);
                          setShowTestimonialForm(true);
                        }}
                        size="sm"
                        variant="outline"
                        className="border-[#C0C5CE]/20 text-[#C0C5CE] font-mono p-2"
                      >
                        <Edit3 className="w-3 h-3" />
                      </Button>
                      <Button
                        onClick={() => deleteTestimonial(testimonial.id)}
                        size="sm"
                        variant="outline"
                        className="border-red-400/20 text-red-400 font-mono p-2"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-[#C0C5CE]/70 font-mono text-sm mb-3">"{testimonial.content.substring(0, 150)}..."</p>
                  <div className="flex items-center space-x-2 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-[#C0C5CE]/30'}`} 
                      />
                    ))}
                    <span className="text-[#C0C5CE]/70 font-mono text-sm">({testimonial.rating})</span>
                  </div>
                  <div className="text-[#C0C5CE]/50 font-mono text-xs">
                    Added {formatDate(testimonial.createdAt)}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Contacts Tab */}
          <TabsContent value="contacts">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[#4AE54A] font-mono text-lg">Lead Management</h3>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#C0C5CE]/50 w-4 h-4" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search leads..."
                    className="bg-[#12151C] border-[#C0C5CE]/20 text-[#C0C5CE] font-mono pl-10 w-64"
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-40 bg-[#12151C] border-[#C0C5CE]/20 text-[#C0C5CE] font-mono">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              {filteredContacts.map((contact) => (
                <Card key={contact.id} className="bg-[#12151C] border-[#C0C5CE]/20 p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-[#C0C5CE] font-mono text-lg">{contact.name}</h4>
                          <div className="flex items-center space-x-4 text-[#C0C5CE]/70 font-mono text-sm mt-1">
                            <span>{contact.email}</span>
                            {contact.phone && <span>• {contact.phone}</span>}
                            {contact.company && <span>• {contact.company}</span>}
                          </div>
                        </div>
                        <Badge
                          variant="secondary"
                          className={`font-mono ${
                            contact.status === 'new' ? 'bg-blue-400/20 text-blue-400' :
                            contact.status === 'in-progress' ? 'bg-yellow-400/20 text-yellow-400' :
                            'bg-green-400/20 text-green-400'
                          }`}
                        >
                          {contact.status}
                        </Badge>
                      </div>
                      
                      <p className="text-[#C0C5CE] font-mono text-sm mb-4 p-4 bg-[#0B0D12] rounded border border-[#C0C5CE]/20">
                        "{contact.message}"
                      </p>
                      
                      <div className="flex items-center space-x-4 text-[#C0C5CE]/70 font-mono text-sm">
                        <span>Service: {contact.service}</span>
                        {contact.budget && <span>• Budget: {contact.budget}</span>}
                        <span>• {formatDate(contact.createdAt)}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <Label className="text-[#C0C5CE] font-mono text-sm">Update Status</Label>
                        <Select
                          value={contact.status}
                          onValueChange={(value) => updateContactStatus(contact.id, value, contact.notes)}
                        >
                          <SelectTrigger className="bg-[#0B0D12] border-[#C0C5CE]/20 text-[#C0C5CE] font-mono mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label className="text-[#C0C5CE] font-mono text-sm">Notes</Label>
                        <Textarea
                          value={contact.notes || ''}
                          onChange={(e) => updateContactStatus(contact.id, contact.status, e.target.value)}
                          placeholder="Add notes..."
                          className="bg-[#0B0D12] border-[#C0C5CE]/20 text-[#C0C5CE] font-mono mt-1 min-h-[80px]"
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Project Form Modal */}
        <Dialog open={showProjectForm} onOpenChange={setShowProjectForm}>
          <DialogContent className="bg-[#12151C] border-[#C0C5CE]/20 text-[#C0C5CE] max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-mono">
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </DialogTitle>
            </DialogHeader>
            <ProjectForm
              project={editingProject}
              onSave={saveProject}
              onCancel={() => {
                setShowProjectForm(false);
                setEditingProject(null);
              }}
            />
          </DialogContent>
        </Dialog>

        {/* Testimonial Form Modal */}
        <Dialog open={showTestimonialForm} onOpenChange={setShowTestimonialForm}>
          <DialogContent className="bg-[#12151C] border-[#C0C5CE]/20 text-[#C0C5CE] max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-mono">
                {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
              </DialogTitle>
            </DialogHeader>
            <TestimonialForm
              testimonial={editingTestimonial}
              onSave={saveTestimonial}
              onCancel={() => {
                setShowTestimonialForm(false);
                setEditingTestimonial(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

// Project Form Component
function ProjectForm({ 
  project, 
  onSave, 
  onCancel 
}: { 
  project: Project | null; 
  onSave: (data: Partial<Project>) => void; 
  onCancel: () => void; 
}) {
  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    category: project?.category || 'Web Development',
    technologies: project?.technologies?.join(', ') || '',
    image: project?.image || '',
    demoUrl: project?.demoUrl || '',
    codeUrl: project?.codeUrl || '',
    featured: project?.featured || false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      technologies: formData.technologies.split(',').map(t => t.trim()).filter(t => t)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label className="text-[#C0C5CE] font-mono">Title</Label>
        <Input
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="bg-[#0B0D12] border-[#C0C5CE]/20 text-[#C0C5CE] font-mono mt-1"
          required
        />
      </div>
      
      <div>
        <Label className="text-[#C0C5CE] font-mono">Description</Label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="bg-[#0B0D12] border-[#C0C5CE]/20 text-[#C0C5CE] font-mono mt-1"
          rows={3}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-[#C0C5CE] font-mono">Category</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger className="bg-[#0B0D12] border-[#C0C5CE]/20 text-[#C0C5CE] font-mono mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Web Development">Web Development</SelectItem>
              <SelectItem value="Mobile App">Mobile App</SelectItem>
              <SelectItem value="E-commerce">E-commerce</SelectItem>
              <SelectItem value="AI/ML">AI/ML</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label className="text-[#C0C5CE] font-mono">Technologies (comma-separated)</Label>
          <Input
            value={formData.technologies}
            onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
            placeholder="React, TypeScript, Node.js"
            className="bg-[#0B0D12] border-[#C0C5CE]/20 text-[#C0C5CE] font-mono mt-1"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-[#C0C5CE] font-mono">Demo URL</Label>
          <Input
            type="url"
            value={formData.demoUrl}
            onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
            className="bg-[#0B0D12] border-[#C0C5CE]/20 text-[#C0C5CE] font-mono mt-1"
          />
        </div>
        
        <div>
          <Label className="text-[#C0C5CE] font-mono">Code URL</Label>
          <Input
            type="url"
            value={formData.codeUrl}
            onChange={(e) => setFormData({ ...formData, codeUrl: e.target.value })}
            className="bg-[#0B0D12] border-[#C0C5CE]/20 text-[#C0C5CE] font-mono mt-1"
          />
        </div>
      </div>

      <div>
        <Label className="text-[#C0C5CE] font-mono">Image URL</Label>
        <Input
          type="url"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          className="bg-[#0B0D12] border-[#C0C5CE]/20 text-[#C0C5CE] font-mono mt-1"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          checked={formData.featured}
          onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
        />
        <Label className="text-[#C0C5CE] font-mono">Featured Project</Label>
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <Button
          type="button"
          onClick={onCancel}
          variant="outline"
          className="border-[#C0C5CE]/20 text-[#C0C5CE] font-mono"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-[#4AE54A] text-[#0B0D12] hover:bg-[#4AE54A]/90 font-mono"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Project
        </Button>
      </div>
    </form>
  );
}

// Testimonial Form Component
function TestimonialForm({ 
  testimonial, 
  onSave, 
  onCancel 
}: { 
  testimonial: Testimonial | null; 
  onSave: (data: Partial<Testimonial>) => void; 
  onCancel: () => void; 
}) {
  const [formData, setFormData] = useState({
    name: testimonial?.name || '',
    role: testimonial?.role || '',
    company: testimonial?.company || '',
    content: testimonial?.content || '',
    image: testimonial?.image || '',
    rating: testimonial?.rating || 5,
    featured: testimonial?.featured || false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-[#C0C5CE] font-mono">Name</Label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="bg-[#0B0D12] border-[#C0C5CE]/20 text-[#C0C5CE] font-mono mt-1"
            required
          />
        </div>
        
        <div>
          <Label className="text-[#C0C5CE] font-mono">Role</Label>
          <Input
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="bg-[#0B0D12] border-[#C0C5CE]/20 text-[#C0C5CE] font-mono mt-1"
          />
        </div>
      </div>

      <div>
        <Label className="text-[#C0C5CE] font-mono">Company</Label>
        <Input
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          className="bg-[#0B0D12] border-[#C0C5CE]/20 text-[#C0C5CE] font-mono mt-1"
        />
      </div>
      
      <div>
        <Label className="text-[#C0C5CE] font-mono">Testimonial Content</Label>
        <Textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="bg-[#0B0D12] border-[#C0C5CE]/20 text-[#C0C5CE] font-mono mt-1"
          rows={4}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-[#C0C5CE] font-mono">Image URL</Label>
          <Input
            type="url"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="bg-[#0B0D12] border-[#C0C5CE]/20 text-[#C0C5CE] font-mono mt-1"
          />
        </div>
        
        <div>
          <Label className="text-[#C0C5CE] font-mono">Rating</Label>
          <Select value={formData.rating.toString()} onValueChange={(value) => setFormData({ ...formData, rating: parseInt(value) })}>
            <SelectTrigger className="bg-[#0B0D12] border-[#C0C5CE]/20 text-[#C0C5CE] font-mono mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5 Stars</SelectItem>
              <SelectItem value="4">4 Stars</SelectItem>
              <SelectItem value="3">3 Stars</SelectItem>
              <SelectItem value="2">2 Stars</SelectItem>
              <SelectItem value="1">1 Star</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          checked={formData.featured}
          onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
        />
        <Label className="text-[#C0C5CE] font-mono">Featured Testimonial</Label>
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <Button
          type="button"
          onClick={onCancel}
          variant="outline"
          className="border-[#C0C5CE]/20 text-[#C0C5CE] font-mono"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-[#4AE54A] text-[#0B0D12] hover:bg-[#4AE54A]/90 font-mono"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Testimonial
        </Button>
      </div>
    </form>
  );
}