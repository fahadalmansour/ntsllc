import React from 'react';
import { FileText, Plus, Search, Filter, Edit, Trash2 } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface ContentManagerProps {
  onNavigate?: (section: string) => void;
}

export function ContentManager({ onNavigate }: ContentManagerProps) {
  return (
    <div className="min-h-screen bg-[#0B0D12] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <FileText className="w-8 h-8 text-[#4AE54A] mr-3" />
            <div>
              <h1 className="text-[#C0C5CE] font-mono text-2xl mb-2">Content Manager</h1>
              <div className="flex items-center text-[#C0C5CE]/70 font-mono text-sm">
                <span className="text-[#4AE54A] mr-2">{'>'}</span>
                <span>Manage your website content and data</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button className="bg-[#4AE54A] text-[#0B0D12] hover:bg-[#4AE54A]/90 font-mono">
              <Plus className="w-4 h-4 mr-2" />
              Add Content
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="bg-[#12151C] border-[#C0C5CE]/20 p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#C0C5CE]/50 w-4 h-4" />
              <Input 
                placeholder="Search content..."
                className="bg-[#0B0D12] border-[#C0C5CE]/20 text-[#C0C5CE] pl-10 font-mono"
              />
            </div>
            <Button variant="outline" className="border-[#C0C5CE]/20 text-[#C0C5CE] font-mono">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </Card>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Sample Content Items */}
          {[
            { id: 1, title: 'Homepage Content', type: 'Page', status: 'Published', lastModified: '2 hours ago' },
            { id: 2, title: 'Product Descriptions', type: 'Product', status: 'Draft', lastModified: '1 day ago' },
            { id: 3, title: 'Blog Posts', type: 'Blog', status: 'Published', lastModified: '3 days ago' },
            { id: 4, title: 'About Us Page', type: 'Page', status: 'Published', lastModified: '1 week ago' },
            { id: 5, title: 'Contact Form', type: 'Form', status: 'Published', lastModified: '2 weeks ago' },
            { id: 6, title: 'Footer Content', type: 'Component', status: 'Published', lastModified: '1 month ago' }
          ].map((item) => (
            <Card key={item.id} className="bg-[#12151C] border-[#C0C5CE]/20 p-6 hover:border-[#4AE54A]/50 transition-colors group">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-[#C0C5CE] font-mono text-lg mb-1">{item.title}</h3>
                  <p className="text-[#C0C5CE]/70 font-mono text-sm">{item.type}</p>
                </div>
                <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="sm" variant="ghost" className="text-[#C0C5CE] hover:text-[#4AE54A]">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-[#C0C5CE] hover:text-red-400">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded text-xs font-mono ${
                  item.status === 'Published' 
                    ? 'bg-green-400/20 text-green-400' 
                    : 'bg-yellow-400/20 text-yellow-400'
                }`}>
                  {item.status}
                </span>
                <span className="text-[#C0C5CE]/50 font-mono text-xs">{item.lastModified}</span>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State for New Users */}
        <Card className="bg-[#12151C] border-[#C0C5CE]/20 p-12 text-center mt-8">
          <FileText className="w-16 h-16 text-[#C0C5CE]/50 mx-auto mb-4" />
          <h3 className="text-[#C0C5CE] font-mono text-xl mb-2">Content Management System</h3>
          <p className="text-[#C0C5CE]/70 font-mono mb-6">
            Create, edit, and manage all your website content from one central location.
          </p>
          <Button className="bg-[#4AE54A] text-[#0B0D12] hover:bg-[#4AE54A]/90 font-mono">
            <Plus className="w-4 h-4 mr-2" />
            Create Your First Content
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default ContentManager;