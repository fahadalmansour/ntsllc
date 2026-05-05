import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Eye, 
  Search, 
  Filter, 
  Upload,
  Download,
  FileText,
  Image,
  Video,
  Globe,
  Calendar,
  User,
  Tag,
  MoreVertical
} from 'lucide-react';

interface ContentItem {
  id: string;
  title: string;
  type: 'page' | 'blog' | 'media' | 'template' | 'video';
  status: 'published' | 'draft' | 'archived';
  author: string;
  lastModified: Date;
  views?: number;
  tags: string[];
  description?: string;
  url?: string;
  size?: string;
}

interface ContentEditorProps {
  type: string;
  className?: string;
}

export function ContentEditor({ type, className = '' }: ContentEditorProps) {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(true);

  // Sample data generator
  useEffect(() => {
    const generateSampleData = (): ContentItem[] => {
      const sampleData: Record<string, ContentItem[]> = {
        pages: [
          {
            id: '1',
            title: 'Home Page',
            type: 'page',
            status: 'published',
            author: 'Fahad Almansour',
            lastModified: new Date('2024-01-15'),
            views: 15420,
            tags: ['homepage', 'hero', 'main'],
            description: 'Main landing page with hero section'
          },
          {
            id: '2',
            title: 'Services Overview',
            type: 'page',
            status: 'published',
            author: 'Fahad Almansour',
            lastModified: new Date('2024-01-14'),
            views: 8930,
            tags: ['services', 'pricing', 'packages'],
            description: 'Comprehensive services and pricing page'
          },
          {
            id: '3',
            title: 'About Us',
            type: 'page',
            status: 'draft',
            author: 'Fahad Almansour',
            lastModified: new Date('2024-01-13'),
            views: 0,
            tags: ['about', 'team', 'company'],
            description: 'Company information and team details'
          }
        ],
        blog: [
          {
            id: '4',
            title: 'The Future of E-commerce Automation',
            type: 'blog',
            status: 'published',
            author: 'Fahad Almansour',
            lastModified: new Date('2024-01-12'),
            views: 2340,
            tags: ['automation', 'ecommerce', 'ai'],
            description: 'How AI is transforming online retail'
          },
          {
            id: '5',
            title: '90-Minute Store Setup: How We Do It',
            type: 'blog',
            status: 'published',
            author: 'Fahad Almansour',
            lastModified: new Date('2024-01-10'),
            views: 1876,
            tags: ['setup', 'shopify', 'speed'],
            description: 'Behind the scenes of our rapid deployment process'
          }
        ],
        media: [
          {
            id: '6',
            title: 'Neo Logo Circuit Board.svg',
            type: 'media',
            status: 'published',
            author: 'Design Team',
            lastModified: new Date('2024-01-11'),
            tags: ['logo', 'branding', 'svg'],
            size: '45 KB',
            url: '/assets/neo-logo.svg'
          },
          {
            id: '7',
            title: 'Hero Background Pattern.png',
            type: 'media',
            status: 'published',
            author: 'Design Team',
            lastModified: new Date('2024-01-09'),
            tags: ['background', 'pattern', 'hero'],
            size: '234 KB',
            url: '/assets/hero-bg.png'
          }
        ],
        templates: [
          {
            id: '8',
            title: 'Welcome Email Template',
            type: 'template',
            status: 'published',
            author: 'Marketing Team',
            lastModified: new Date('2024-01-08'),
            tags: ['email', 'welcome', 'onboarding'],
            description: 'New client welcome email template'
          }
        ],
        videos: [
          {
            id: '9',
            title: 'NeoTech Platform Demo',
            type: 'video',
            status: 'published',
            author: 'Video Team',
            lastModified: new Date('2024-01-07'),
            views: 5420,
            tags: ['demo', 'platform', 'tutorial'],
            size: '128 MB',
            description: 'Complete platform walkthrough'
          }
        ]
      };

      return sampleData[type] || [];
    };

    setIsLoading(true);
    setTimeout(() => {
      setItems(generateSampleData());
      setIsLoading(false);
    }, 500);
  }, [type]);

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-[#00ff88]/20 text-[#00ff88]';
      case 'draft': return 'bg-[#ffd93d]/20 text-[#ffd93d]';
      case 'archived': return 'bg-[#a0a0a0]/20 text-[#a0a0a0]';
      default: return 'bg-[#00d4ff]/20 text-[#00d4ff]';
    }
  };

  const getTypeIcon = (itemType: string) => {
    switch (itemType) {
      case 'page': return FileText;
      case 'blog': return Globe;
      case 'media': return Image;
      case 'template': return FileText;
      case 'video': return Video;
      default: return FileText;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="bg-[#1a1a1a] border-[#00d4ff]/20 p-6">
            <div className="animate-pulse">
              <div className="h-4 bg-[#00d4ff]/20 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-[#a0a0a0]/20 rounded w-1/2"></div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#a0a0a0] w-4 h-4" />
          <Input
            placeholder={`Search ${type}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-[#1a1a1a] border-[#00d4ff]/30 text-white font-mono pl-10"
          />
        </div>
        
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-[#1a1a1a] border border-[#00d4ff]/30 rounded-lg px-4 py-2 text-white font-mono focus:border-[#00d4ff] focus:outline-none"
        >
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>

        <div className="flex gap-2">
          <Button
            onClick={() => setViewMode('grid')}
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            className="font-mono"
          >
            Grid
          </Button>
          <Button
            onClick={() => setViewMode('list')}
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            className="font-mono"
          >
            List
          </Button>
        </div>
      </div>

      {/* Content Items */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const IconComponent = getTypeIcon(item.type);
            return (
              <Card key={item.id} className="bg-[#1a1a1a] border-[#00d4ff]/20 p-6 hover:border-[#00d4ff]/40 transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-[#00d4ff]/10 rounded-lg">
                      <IconComponent className="w-5 h-5 text-[#00d4ff]" />
                    </div>
                    <div>
                      <h3 className="text-white font-mono font-medium text-sm line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-[#a0a0a0] font-mono text-xs">
                        by {item.author}
                      </p>
                    </div>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-[#00d4ff]/10 rounded">
                    <MoreVertical className="w-4 h-4 text-[#a0a0a0]" />
                  </button>
                </div>

                {item.description && (
                  <p className="text-[#a0a0a0] font-mono text-xs mb-4 line-clamp-2">
                    {item.description}
                  </p>
                )}

                <div className="flex items-center justify-between mb-3">
                  <Badge className={`font-mono text-xs ${getStatusColor(item.status)}`}>
                    {item.status.toUpperCase()}
                  </Badge>
                  {item.views && (
                    <div className="flex items-center space-x-1">
                      <Eye className="w-3 h-3 text-[#a0a0a0]" />
                      <span className="text-[#a0a0a0] font-mono text-xs">
                        {item.views.toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {item.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} className="bg-[#00ff88]/10 text-[#00ff88] font-mono text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex justify-between items-center text-xs text-[#a0a0a0] font-mono mb-4">
                  <span>Modified: {item.lastModified.toLocaleDateString()}</span>
                  {item.size && <span>{item.size}</span>}
                </div>

                <div className="flex space-x-2">
                  <Button size="sm" className="flex-1 bg-[#00d4ff] text-black hover:bg-[#00ff88] font-mono">
                    <Edit2 className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" className="border-[#a0a0a0] text-[#a0a0a0] hover:bg-[#a0a0a0]/10">
                    <Eye className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="outline" className="border-red-400 text-red-400 hover:bg-red-400/10">
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="bg-[#1a1a1a] border-[#00d4ff]/30 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#00d4ff]/20">
                  <th className="text-left px-6 py-4 text-sm text-[#a0a0a0] font-mono">Title</th>
                  <th className="text-left px-6 py-4 text-sm text-[#a0a0a0] font-mono">Status</th>
                  <th className="text-left px-6 py-4 text-sm text-[#a0a0a0] font-mono">Author</th>
                  <th className="text-left px-6 py-4 text-sm text-[#a0a0a0] font-mono">Modified</th>
                  <th className="text-left px-6 py-4 text-sm text-[#a0a0a0] font-mono">Views</th>
                  <th className="text-left px-6 py-4 text-sm text-[#a0a0a0] font-mono">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => {
                  const IconComponent = getTypeIcon(item.type);
                  return (
                    <tr key={item.id} className="border-b border-[#00d4ff]/10 hover:bg-[#00d4ff]/5">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <IconComponent className="w-4 h-4 text-[#00d4ff]" />
                          <div>
                            <div className="text-white font-mono text-sm">{item.title}</div>
                            {item.description && (
                              <div className="text-[#a0a0a0] font-mono text-xs">{item.description}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={`font-mono text-xs ${getStatusColor(item.status)}`}>
                          {item.status.toUpperCase()}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-[#a0a0a0] font-mono text-sm">{item.author}</td>
                      <td className="px-6 py-4 text-[#a0a0a0] font-mono text-sm">
                        {item.lastModified.toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-[#a0a0a0] font-mono text-sm">
                        {item.views ? item.views.toLocaleString() : '—'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <Button size="sm" className="bg-[#00d4ff] text-black hover:bg-[#00ff88] font-mono">
                            <Edit2 className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline" className="border-[#a0a0a0] text-[#a0a0a0] hover:bg-[#a0a0a0]/10">
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline" className="border-red-400 text-red-400 hover:bg-red-400/10">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {filteredItems.length === 0 && (
        <Card className="bg-[#1a1a1a] border-[#00d4ff]/20 p-12 text-center">
          <div className="text-[#a0a0a0] font-mono">
            <FileText className="w-12 h-12 mx-auto mb-4 text-[#00d4ff]" />
            <h3 className="text-lg font-medium mb-2">No content found</h3>
            <p className="text-sm">
              {searchTerm ? 'Try adjusting your search terms' : `No ${type} created yet`}
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}

export default ContentEditor;