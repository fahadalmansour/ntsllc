import React, { useState, useMemo } from 'react';
import { ExternalLink, Github, Calendar, Users, Zap, TrendingUp, Code, Globe, Smartphone, ShoppingCart, Search, Filter, Star, Award, Clock, DollarSign, Target, BarChart3, Play, Download, Share2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  technologies: string[];
  features: string[];
  results: {
    metric: string;
    value: string;
    description: string;
  }[];
  client: {
    name: string;
    industry: string;
    size: string;
  };
  timeline: string;
  image: string;
  demoUrl?: string;
  codeUrl?: string;
  testimonial?: {
    text: string;
    author: string;
    role: string;
  };
  rating: number;
  tags: string[];
  complexity: 'low' | 'medium' | 'high' | 'enterprise';
  status: 'completed' | 'in-progress' | 'maintenance';
  liveMetrics?: {
    uptime: string;
    performance: string;
    users: string;
    satisfaction: string;
  };
  caseStudyUrl?: string;
  awards?: string[];
}

export function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    { key: 'all', label: 'All Projects', icon: Globe },
    { key: 'ecommerce', label: 'E-commerce', icon: ShoppingCart },
    { key: 'webapp', label: 'Web Apps', icon: Code },
    { key: 'mobile', label: 'Mobile Apps', icon: Smartphone },
    { key: 'automation', label: 'Automation', icon: Zap },
    { key: 'ai', label: 'AI/ML', icon: Target },
    { key: 'blockchain', label: 'Blockchain', icon: Award }
  ];

  const projects: Project[] = [
    {
      id: 1,
      title: 'TechStart E-commerce Platform',
      category: 'ecommerce',
      description: 'Modern e-commerce platform with Firebase integration and real-time inventory management',
      longDescription: 'Complete rebuild of TechStart Solutions e-commerce platform using React, Firebase, and Shopify API. Implemented real-time inventory sync, advanced analytics, and automated marketing workflows.',
      technologies: ['React', 'Firebase', 'Shopify API', 'Google Analytics', 'Stripe', 'Tailwind CSS'],
      features: [
        'Real-time inventory synchronization',
        'Advanced product filtering and search',
        'Automated email marketing integration',
        'Multi-payment gateway support',
        'Performance-optimized image delivery',
        'Mobile-responsive PWA design'
      ],
      results: [
        { metric: 'Conversion Rate', value: '+40%', description: 'Increased from 2.1% to 2.9%' },
        { metric: 'Page Load Speed', value: '+50%', description: 'Reduced from 4.2s to 2.1s' },
        { metric: 'Mobile Sales', value: '+65%', description: 'Improved mobile user experience' },
        { metric: 'Cart Abandonment', value: '-25%', description: 'Streamlined checkout process' }
      ],
      client: {
        name: 'TechStart Solutions',
        industry: 'Technology Hardware',
        size: 'Mid-size (50-200 employees)'
      },
      timeline: '3 months',
      image: 'https://images.unsplash.com/photo-1657256031812-4702fe316f1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBlLWNvbW1lcmNlJTIwd2Vic2l0ZSUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NTY4MzE0MjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      demoUrl: 'https://techstart-demo.neotechnology.solutions',
      testimonial: {
        text: 'Neo Technology transformed our e-commerce platform beyond expectations. The terminal-style dashboard is unique and the results speak for themselves.',
        author: 'Sarah Chen',
        role: 'CEO, TechStart Solutions'
      },
      rating: 5,
      tags: ['React', 'Firebase', 'E-commerce', 'Real-time'],
      complexity: 'high',
      status: 'completed',
      liveMetrics: {
        uptime: '99.9%',
        performance: '95/100',
        users: '12K+ MAU',
        satisfaction: '4.8/5'
      },
      caseStudyUrl: 'https://neotechnology.solutions/case-study-techstart',
      awards: ['Best E-commerce Innovation 2024', 'Firebase Excellence Award']
    },
    {
      id: 2,
      title: 'Marketing Automation Suite',
      category: 'automation',
      description: 'Comprehensive automation platform integrating Zapier, n8n, and Google Cloud services',
      longDescription: 'Built a complete marketing automation platform for Digital Marketing Pro, integrating multiple tools and creating custom workflows that save 20+ hours per week.',
      technologies: ['Node.js', 'Zapier API', 'n8n', 'Google Cloud Functions', 'Firebase', 'React Dashboard'],
      features: [
        'Multi-platform workflow automation',
        'Custom trigger and action builder',
        'Real-time analytics dashboard',
        'Client report automation',
        'Lead scoring and nurturing',
        'Social media scheduling integration'
      ],
      results: [
        { metric: 'Time Saved', value: '20+ hrs/week', description: 'Automated repetitive tasks' },
        { metric: 'Lead Generation', value: '+200%', description: 'Improved lead qualification' },
        { metric: 'Client Retention', value: '+35%', description: 'Better service delivery' },
        { metric: 'Error Reduction', value: '-85%', description: 'Eliminated manual errors' }
      ],
      client: {
        name: 'Digital Marketing Pro',
        industry: 'Digital Marketing',
        size: 'Small business (10-50 employees)'
      },
      timeline: '2 months',
      image: 'https://images.unsplash.com/photo-1688889716873-76cad41bb3b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJrZXRpbmclMjBhdXRvbWF0aW9uJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc1NjgzMTQyOHww&ixlib=rb-4.1.0&q=80&w=1080',
      demoUrl: 'https://automation-demo.neotechnology.solutions',
      testimonial: {
        text: 'The automation workflows they built have revolutionized our operations. We can now focus on strategy instead of manual tasks.',
        author: 'Marcus Rodriguez',
        role: 'Founder, Digital Marketing Pro'
      },
      rating: 5,
      tags: ['Automation', 'Zapier', 'n8n', 'Analytics'],
      complexity: 'medium',
      status: 'completed',
      liveMetrics: {
        uptime: '99.8%',
        performance: '92/100',
        users: '500+ workflows',
        satisfaction: '4.9/5'
      },
      caseStudyUrl: 'https://neotechnology.solutions/case-study-automation'
    },
    {
      id: 3,
      title: 'CloudScale Infrastructure Migration',
      category: 'webapp',
      description: 'Complete cloud migration and AI integration for enterprise infrastructure',
      longDescription: 'Migrated CloudScale Innovations entire infrastructure to Google Cloud Platform, implementing serverless architecture and AI-powered features for competitive advantage.',
      technologies: ['Google Cloud Platform', 'Firebase', 'Cloud Functions', 'AI/ML APIs', 'Docker', 'Kubernetes'],
      features: [
        'Serverless architecture implementation',
        'AI-powered data processing',
        'Auto-scaling infrastructure',
        'Advanced monitoring and alerting',
        'Cost optimization strategies',
        'Zero-downtime deployment pipeline'
      ],
      results: [
        { metric: 'Cost Reduction', value: '-60%', description: 'Optimized cloud spending' },
        { metric: 'Uptime', value: '99.9%', description: 'Improved reliability' },
        { metric: 'Deployment Speed', value: '+400%', description: 'Faster release cycles' },
        { metric: 'Scalability', value: '10x', description: 'Handle traffic spikes' }
      ],
      client: {
        name: 'CloudScale Innovations',
        industry: 'Cloud Services',
        size: 'Enterprise (200+ employees)'
      },
      timeline: '4 months',
      image: 'https://images.unsplash.com/photo-1667984390553-7f439e6ae401?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG91ZCUyMGluZnJhc3RydWN0dXJlJTIwc2VydmVyfGVufDF8fHx8MTc1NjgzMTQzMXww&ixlib=rb-4.1.0&q=80&w=1080',
      codeUrl: 'https://github.com/neotechnology/cloudscale-migration',
      testimonial: {
        text: 'Their expertise in Google Cloud and Firebase is outstanding. The migration was seamless and the AI features give us a real competitive edge.',
        author: 'Emily Johnson',
        role: 'CTO, CloudScale Innovations'
      },
      rating: 5,
      tags: ['Google Cloud', 'Firebase', 'AI/ML', 'Migration'],
      complexity: 'enterprise',
      status: 'completed',
      liveMetrics: {
        uptime: '99.99%',
        performance: '98/100',
        users: '100K+ requests/day',
        satisfaction: '4.9/5'
      },
      caseStudyUrl: 'https://neotechnology.solutions/case-study-cloudscale',
      awards: ['Google Cloud Partner Excellence 2024']
    },
    {
      id: 4,
      title: 'Retail Connect Marketplace Integration',
      category: 'ecommerce',
      description: 'Multi-platform marketplace integration with real-time inventory synchronization',
      longDescription: 'Created a comprehensive marketplace integration platform connecting inventory across Amazon, eBay, and custom e-commerce sites with real-time synchronization and automated reporting.',
      technologies: ['Python', 'Amazon API', 'eBay API', 'WooCommerce', 'Firebase Firestore', 'React Admin'],
      features: [
        'Multi-marketplace inventory sync',
        'Automated listing management',
        'Real-time order processing',
        'Unified analytics dashboard',
        'Price optimization algorithms',
        'Automated compliance reporting'
      ],
      results: [
        { metric: 'Inventory Accuracy', value: '99.5%', description: 'Eliminated overselling' },
        { metric: 'Order Processing', value: '+80%', description: 'Faster fulfillment' },
        { metric: 'Revenue Growth', value: '+45%', description: 'Expanded market reach' },
        { metric: 'Manual Tasks', value: '-70%', description: 'Automation implementation' }
      ],
      client: {
        name: 'Retail Connect',
        industry: 'Retail/E-commerce',
        size: 'Mid-size (100-200 employees)'
      },
      timeline: '3.5 months',
      image: 'https://images.unsplash.com/photo-1644984875410-e11486d2b94f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRhaWwlMjBtYXJrZXRwbGFjZSUyMG1vYmlsZSUyMGFwcHxlbnwxfHx8fDE3NTY4MzE0MzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      demoUrl: 'https://retail-connect-demo.neotechnology.solutions',
      testimonial: {
        text: 'The marketplace integration platform has transformed our operations. Real-time sync across all channels is a game-changer.',
        author: 'David Park',
        role: 'Operations Manager, Retail Connect'
      },
      rating: 5,
      tags: ['Integration', 'Marketplace', 'API', 'Real-time'],
      complexity: 'high',
      status: 'completed',
      liveMetrics: {
        uptime: '99.7%',
        performance: '94/100',
        users: '50K+ SKUs',
        satisfaction: '4.7/5'
      },
      caseStudyUrl: 'https://neotechnology.solutions/case-study-retail-connect'
    },
    {
      id: 5,
      title: 'AI-Powered Investment Platform',
      category: 'ai',
      description: 'Machine learning platform for algorithmic trading and portfolio optimization',
      longDescription: 'Developed a sophisticated AI investment platform using advanced machine learning models for real-time market analysis, risk assessment, and automated trading strategies.',
      technologies: ['Python', 'TensorFlow', 'Firebase ML', 'Google Cloud AI', 'React', 'WebSocket'],
      features: [
        'Real-time market analysis',
        'Predictive modeling algorithms',
        'Automated trading strategies',
        'Risk assessment and management',
        'Portfolio optimization',
        'Advanced data visualization'
      ],
      results: [
        { metric: 'ROI Improvement', value: '+127%', description: 'Average portfolio performance' },
        { metric: 'Risk Reduction', value: '-34%', description: 'Volatility management' },
        { metric: 'Prediction Accuracy', value: '94.3%', description: 'Market trend forecasting' },
        { metric: 'Processing Speed', value: '<50ms', description: 'Real-time analysis' }
      ],
      client: {
        name: 'QuantTech Capital',
        industry: 'Financial Technology',
        size: 'Mid-size (75-150 employees)'
      },
      timeline: '6 months',
      image: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaSUyMGZpbmFuY2UlMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzU2ODMxNDM3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      demoUrl: 'https://quanttech-demo.neotechnology.solutions',
      testimonial: {
        text: 'The AI models they developed have revolutionized our trading strategies. The platform consistently outperforms traditional methods.',
        author: 'Michael Thompson',
        role: 'Chief Investment Officer, QuantTech Capital'
      },
      rating: 5,
      tags: ['AI/ML', 'FinTech', 'Real-time', 'Analytics'],
      complexity: 'enterprise',
      status: 'completed',
      liveMetrics: {
        uptime: '99.95%',
        performance: '97/100',
        users: '$50M+ AUM',
        satisfaction: '4.9/5'
      },
      caseStudyUrl: 'https://neotechnology.solutions/case-study-quanttech',
      awards: ['FinTech Innovation Award 2024', 'AI Excellence in Finance']
    },
    {
      id: 6,
      title: 'Blockchain Supply Chain Tracker',
      category: 'blockchain',
      description: 'Decentralized supply chain management with smart contract automation',
      longDescription: 'Built a comprehensive blockchain-based supply chain tracking system with smart contracts for automated compliance, transparency, and real-time monitoring across global logistics networks.',
      technologies: ['Solidity', 'Ethereum', 'Web3.js', 'IPFS', 'React', 'Node.js'],
      features: [
        'Smart contract automation',
        'Immutable audit trails',
        'Real-time tracking',
        'Automated compliance checks',
        'Multi-party verification',
        'Decentralized data storage'
      ],
      results: [
        { metric: 'Transparency', value: '100%', description: 'Complete supply chain visibility' },
        { metric: 'Processing Time', value: '-75%', description: 'Automated workflows' },
        { metric: 'Cost Reduction', value: '-45%', description: 'Eliminated intermediaries' },
        { metric: 'Compliance Rate', value: '99.8%', description: 'Automated verification' }
      ],
      client: {
        name: 'GlobalChain Logistics',
        industry: 'Supply Chain & Logistics',
        size: 'Enterprise (500+ employees)'
      },
      timeline: '8 months',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9ja2NoYWluJTIwc3VwcGx5JTIwY2hhaW58ZW58MXx8fHwxNzU2ODMxNDQwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      demoUrl: 'https://globalchain-demo.neotechnology.solutions',
      codeUrl: 'https://github.com/neotechnology/blockchain-supply-chain',
      testimonial: {
        text: 'The blockchain solution provides unprecedented transparency and automation in our supply chain. It has transformed how we operate globally.',
        author: 'Anna Rodriguez',
        role: 'VP of Operations, GlobalChain Logistics'
      },
      rating: 5,
      tags: ['Blockchain', 'Smart Contracts', 'Supply Chain', 'Web3'],
      complexity: 'enterprise',
      status: 'completed',
      liveMetrics: {
        uptime: '99.9%',
        performance: '96/100',
        users: '10K+ transactions/day',
        satisfaction: '4.8/5'
      },
      caseStudyUrl: 'https://neotechnology.solutions/case-study-globalchain',
      awards: ['Blockchain Innovation Award 2024']
    }
  ];

  const filteredProjects = useMemo(() => {
    let filtered = selectedCategory === 'all' 
      ? projects 
      : projects.filter(project => project.category === selectedCategory);
    
    if (searchTerm) {
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase())) ||
        project.client.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [selectedCategory, searchTerm, projects]);

  const handleCategoryChange = (category: string) => {
    setIsLoading(true);
    setSelectedCategory(category);
    setTimeout(() => setIsLoading(false), 300); // Simulate loading for smooth transition
  };

  return (
    <section className="min-h-screen bg-[#12151C] py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <span className="text-[#4AE54A] font-mono mr-2">{'>'}</span>
            <h2 className="text-[#C0C5CE] font-mono text-3xl md:text-4xl font-semibold">
              portfolio --showcase
            </h2>
          </div>
          <p className="text-[#C0C5CE]/70 font-mono text-lg mb-8">
            Real projects, measurable results, satisfied clients
          </p>

          {/* Search and Filter Controls */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
            {/* Search Bar */}
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#C0C5CE]/50 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search projects, technologies, or clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-[#0B0D12] border border-[#C0C5CE]/20 text-[#C0C5CE] font-mono text-sm pl-10 pr-4 py-2 rounded-lg focus:border-[#4AE54A]/50 focus:ring-1 focus:ring-[#4AE54A]/20 transition-all duration-200"
              />
            </div>
            
            {/* Results Counter */}
            {(searchTerm || selectedCategory !== 'all') && (
              <div className="text-[#C0C5CE]/60 font-mono text-sm">
                {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
              </div>
            )}
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.key}
                  onClick={() => handleCategoryChange(category.key)}
                  disabled={isLoading}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-mono text-sm transition-all duration-200 ${
                    selectedCategory === category.key
                      ? 'bg-[#4AE54A] text-[#0B0D12] font-semibold'
                      : 'bg-[#0B0D12] border border-[#C0C5CE]/20 text-[#C0C5CE] hover:border-[#4AE54A]/50 hover:text-[#4AE54A]'
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#4AE54A] border-t-transparent"></div>
            <span className="ml-3 text-[#C0C5CE] font-mono">Loading projects...</span>
          </div>
        )}

        {/* No Results State */}
        {!isLoading && filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-[#0B0D12] border border-[#C0C5CE]/20 rounded-lg p-8 max-w-md mx-auto">
              <Search className="w-12 h-12 text-[#C0C5CE]/50 mx-auto mb-4" />
              <h3 className="text-[#C0C5CE] font-mono text-lg font-semibold mb-2">No projects found</h3>
              <p className="text-[#C0C5CE]/70 font-mono text-sm mb-4">
                Try adjusting your search terms or category filter
              </p>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                variant="outline"
                className="border border-[#4AE54A] text-[#4AE54A] font-mono hover:bg-[#4AE54A]/10"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        )}

        {/* Projects Grid */}
        {!isLoading && filteredProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="bg-[#0B0D12] border border-[#C0C5CE]/20 rounded-lg overflow-hidden hover:border-[#4AE54A]/50 transition-all duration-300 group cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
              onClick={() => setSelectedProject(project)}
            >
              {/* Project Image */}
              <div className="relative h-48 bg-[#12151C] border-b border-[#C0C5CE]/20">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12]/60 to-transparent"></div>
                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                  <span className="bg-[#4AE54A] text-[#0B0D12] px-2 py-1 rounded text-xs font-mono font-semibold uppercase">
                    {project.category}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-mono font-semibold uppercase ${
                    project.complexity === 'enterprise' ? 'bg-purple-500 text-white' :
                    project.complexity === 'high' ? 'bg-red-500 text-white' :
                    project.complexity === 'medium' ? 'bg-yellow-500 text-black' :
                    'bg-green-500 text-black'
                  }`}>
                    {project.complexity}
                  </span>
                </div>
                
                <div className="absolute top-4 right-4 flex flex-col items-end space-y-2">
                  <div className="flex items-center space-x-1 bg-[#0B0D12]/80 rounded px-2 py-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < project.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} />
                    ))}
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-mono ${
                    project.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                    project.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[#4AE54A] font-mono text-lg font-semibold group-hover:text-[#4AE54A] transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex items-center text-[#C0C5CE]/60 font-mono text-xs">
                    <Calendar className="w-3 h-3 mr-1" />
                    {project.timeline}
                  </div>
                </div>

                <p className="text-[#C0C5CE]/80 font-mono text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="bg-[#12151C] border border-[#C0C5CE]/20 text-[#C0C5CE] px-2 py-1 rounded text-xs font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-[#C0C5CE]/60 text-xs font-mono">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>

                {/* Live Metrics (if available) */}
                {project.liveMetrics && (
                  <div className="bg-[#0B0D12] border border-[#4AE54A]/20 rounded p-3 mb-4">
                    <div className="flex items-center mb-2">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse mr-2"></div>
                      <span className="text-[#4AE54A] font-mono text-xs">Live Metrics</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      <div>
                        <span className="text-[#C0C5CE]/70">Uptime: </span>
                        <span className="text-[#4AE54A]">{project.liveMetrics.uptime}</span>
                      </div>
                      <div>
                        <span className="text-[#C0C5CE]/70">Performance: </span>
                        <span className="text-[#4AE54A]">{project.liveMetrics.performance}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Key Results */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {project.results.slice(0, 2).map((result) => (
                    <div key={result.metric} className="text-center">
                      <div className="text-[#4AE54A] font-mono text-xl font-bold">
                        {result.value}
                      </div>
                      <div className="text-[#C0C5CE]/70 font-mono text-xs">
                        {result.metric}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Client Info */}
                <div className="text-[#C0C5CE]/60 font-mono text-xs mb-4">
                  <div className="flex items-center">
                    <Users className="w-3 h-3 mr-1" />
                    {project.client.name} • {project.client.industry}
                  </div>
                </div>

                {/* Awards (if available) */}
                {project.awards && project.awards.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <Award className="w-3 h-3 text-yellow-400 mr-1" />
                      <span className="text-yellow-400 font-mono text-xs">Award Winner</span>
                    </div>
                    <div className="text-[#C0C5CE]/70 font-mono text-xs">
                      {project.awards[0]}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(project);
                    }}
                    variant="ghost"
                    size="sm"
                    className="text-[#4AE54A] hover:text-[#4AE54A] hover:bg-[#4AE54A]/10 font-mono"
                  >
                    View Details
                  </Button>
                  
                  <div className="flex items-center space-x-1">
                    {project.caseStudyUrl && (
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.caseStudyUrl, '_blank');
                        }}
                        variant="ghost"
                        size="sm"
                        className="text-[#C0C5CE] hover:text-[#4AE54A] font-mono p-1"
                        title="Case Study"
                      >
                        <BarChart3 className="w-3 h-3" />
                      </Button>
                    )}
                    {project.demoUrl && (
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.demoUrl, '_blank');
                        }}
                        variant="ghost"
                        size="sm"
                        className="text-[#C0C5CE] hover:text-[#4AE54A] font-mono p-1"
                        title="Live Demo"
                      >
                        <Play className="w-3 h-3" />
                      </Button>
                    )}
                    {project.codeUrl && (
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.codeUrl, '_blank');
                        }}
                        variant="ghost"
                        size="sm"
                        className="text-[#C0C5CE] hover:text-[#4AE54A] font-mono p-1"
                        title="Source Code"
                      >
                        <Github className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          </div>
        )}

        {/* Stats Summary */}
        <div className="bg-[#0B0D12] border border-[#C0C5CE]/20 rounded-lg p-8 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-[#4AE54A] font-mono text-3xl font-bold mb-2">50+</div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">Projects Delivered</div>
            </div>
            <div>
              <div className="text-[#4AE54A] font-mono text-3xl font-bold mb-2">98%</div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-[#4AE54A] font-mono text-3xl font-bold mb-2">24h</div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">Average Response</div>
            </div>
            <div>
              <div className="text-[#4AE54A] font-mono text-3xl font-bold mb-2">5.0</div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">Average Rating</div>
            </div>
          </div>
        </div>

        {/* Project Detail Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-[#0B0D12]/90 backdrop-blur-sm flex items-center justify-center p-6 z-50">
            <div className="bg-[#12151C] border border-[#C0C5CE]/20 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-[#C0C5CE]/20">
                <h3 className="text-[#4AE54A] font-mono text-2xl font-semibold">
                  {selectedProject.title}
                </h3>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-[#C0C5CE] hover:text-[#4AE54A] font-mono"
                >
                  ✕
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {/* Project Overview */}
                <div className="mb-8">
                  <h4 className="text-[#C0C5CE] font-mono text-lg font-semibold mb-3">Project Overview</h4>
                  <p className="text-[#C0C5CE]/80 font-mono text-sm leading-relaxed mb-4">
                    {selectedProject.longDescription}
                  </p>
                </div>

                {/* Technologies & Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="text-[#C0C5CE] font-mono text-lg font-semibold mb-3">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="bg-[#0B0D12] border border-[#4AE54A]/30 text-[#4AE54A] px-3 py-1 rounded font-mono text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[#C0C5CE] font-mono text-lg font-semibold mb-3">Key Features</h4>
                    <ul className="space-y-2">
                      {selectedProject.features.map((feature, index) => (
                        <li key={index} className="text-[#C0C5CE]/80 font-mono text-sm flex items-start">
                          <span className="text-[#4AE54A] mr-2">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Results */}
                <div className="mb-8">
                  <h4 className="text-[#C0C5CE] font-mono text-lg font-semibold mb-4">Measurable Results</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {selectedProject.results.map((result) => (
                      <div key={result.metric} className="bg-[#0B0D12] border border-[#C0C5CE]/20 rounded-lg p-4 text-center">
                        <div className="text-[#4AE54A] font-mono text-2xl font-bold mb-1">
                          {result.value}
                        </div>
                        <div className="text-[#C0C5CE] font-mono text-sm font-semibold mb-1">
                          {result.metric}
                        </div>
                        <div className="text-[#C0C5CE]/60 font-mono text-xs">
                          {result.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Client Testimonial */}
                {selectedProject.testimonial && (
                  <div className="bg-[#0B0D12] border border-[#4AE54A]/30 rounded-lg p-6 mb-6">
                    <div className="text-[#C0C5CE] font-mono text-sm leading-relaxed mb-4">
                      "{selectedProject.testimonial.text}"
                    </div>
                    <div className="text-[#4AE54A] font-mono text-sm font-semibold">
                      — {selectedProject.testimonial.author}
                    </div>
                    <div className="text-[#C0C5CE]/70 font-mono text-xs">
                      {selectedProject.testimonial.role}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-center space-x-4">
                  {selectedProject.demoUrl && (
                    <Button
                      onClick={() => window.open(selectedProject.demoUrl, '_blank')}
                      className="bg-[#4AE54A] text-[#0B0D12] font-mono font-semibold px-6 py-2 rounded hover:bg-[#4AE54A]/90 transition-colors duration-200"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Live Demo
                    </Button>
                  )}
                  {selectedProject.codeUrl && (
                    <Button
                      onClick={() => window.open(selectedProject.codeUrl, '_blank')}
                      variant="outline"
                      className="border border-[#4AE54A] text-[#4AE54A] font-mono font-semibold px-6 py-2 rounded hover:bg-[#4AE54A]/10 transition-colors duration-200"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      View Code
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Portfolio;