import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Store, 
  Palette, 
  Layout, 
  ShoppingCart, 
  CreditCard, 
  Truck,
  Settings,
  Eye,
  Code,
  Download,
  Upload,
  Zap,
  Sparkles,
  Monitor,
  Smartphone,
  Tablet,
  Globe,
  Lock,
  Star,
  Heart,
  Share2,
  Plus,
  Minus,
  RotateCcw,
  Save,
  Play,
  Pause,
  ArrowLeft,
  ArrowRight,
  MousePointer,
  Type,
  Image as ImageIcon,
  Video,
  Grid,
  Layers,
  Copy,
  Trash2,
  Move,
  RefreshCw,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface StoreTemplate {
  id: string;
  name: string;
  category: string;
  preview: string;
  features: string[];
  price: string;
  rating: number;
  downloads: number;
  responsive: boolean;
  ecommercePlatform: string[];
}

interface BuildStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  current: boolean;
}

const StoreBuilder = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [buildingStore, setBuildingStore] = useState(false);
  const [buildProgress, setBuildProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  const [storeData, setStoreData] = useState({
    name: '',
    description: '',
    category: '',
    colors: {
      primary: '#4AE54A',
      secondary: '#0B0D12',
      accent: '#C0C5CE'
    },
    branding: {
      logo: '',
      slogan: ''
    }
  });

  const [templates] = useState<StoreTemplate[]>([
    {
      id: 'tech-minimal',
      name: 'Tech Minimal',
      category: 'Electronics',
      preview: '/templates/tech-minimal.jpg',
      features: ['Clean Design', 'Fast Loading', 'Mobile Optimized', 'SEO Ready'],
      price: 'Free',
      rating: 4.8,
      downloads: 12400,
      responsive: true,
      ecommercePlatform: ['Shopify', 'WordPress', 'Custom']
    },
    {
      id: 'fashion-modern',
      name: 'Fashion Modern',
      category: 'Fashion',
      preview: '/templates/fashion-modern.jpg',
      features: ['Gallery Focus', 'Product Zoom', 'Size Guide', 'Wishlist'],
      price: '$29',
      rating: 4.9,
      downloads: 8900,
      responsive: true,
      ecommercePlatform: ['Shopify', 'Wix']
    },
    {
      id: 'organic-fresh',
      name: 'Organic Fresh',
      category: 'Food & Beverage',
      preview: '/templates/organic-fresh.jpg',
      features: ['Green Theme', 'Recipe Blog', 'Subscription Box', 'Local Delivery'],
      price: '$39',
      rating: 4.7,
      downloads: 5600,
      responsive: true,
      ecommercePlatform: ['WordPress', 'Custom']
    },
    {
      id: 'luxury-gold',
      name: 'Luxury Gold',
      category: 'Jewelry',
      preview: '/templates/luxury-gold.jpg',
      features: ['Elegant Design', 'Video Backgrounds', 'VIP Program', 'Custom Jewelry'],
      price: '$49',
      rating: 4.9,
      downloads: 3200,
      responsive: true,
      ecommercePlatform: ['Shopify', 'Custom']
    },
    {
      id: 'sports-dynamic',
      name: 'Sports Dynamic',
      category: 'Sports',
      preview: '/templates/sports-dynamic.jpg',
      features: ['Action Focused', 'Team Store', 'Event Calendar', 'Performance Tracking'],
      price: '$35',
      rating: 4.6,
      downloads: 7800,
      responsive: true,
      ecommercePlatform: ['Shopify', 'WordPress', 'Wix']
    },
    {
      id: 'books-classic',
      name: 'Books Classic',
      category: 'Books',
      preview: '/templates/books-classic.jpg',
      features: ['Reading Experience', 'Author Profiles', 'Book Reviews', 'Reading Lists'],
      price: '$25',
      rating: 4.5,
      downloads: 4300,
      responsive: true,
      ecommercePlatform: ['WordPress', 'Custom']
    }
  ]);

  const [buildSteps] = useState<BuildStep[]>([
    {
      id: 'template',
      title: 'Choose Template',
      description: 'Select a professional template that matches your brand',
      completed: false,
      current: true
    },
    {
      id: 'customize',
      title: 'Customize Design',
      description: 'Personalize colors, fonts, and layout to match your vision',
      completed: false,
      current: false
    },
    {
      id: 'content',
      title: 'Add Content',
      description: 'Upload products, images, and write compelling copy',
      completed: false,
      current: false
    },
    {
      id: 'features',
      title: 'Configure Features',
      description: 'Set up payments, shipping, and advanced functionality',
      completed: false,
      current: false
    },
    {
      id: 'optimize',
      title: 'AI Optimization',
      description: 'Let AI optimize your store for performance and conversions',
      completed: false,
      current: false
    },
    {
      id: 'launch',
      title: 'Launch Store',
      description: 'Go live with your professionally built e-commerce store',
      completed: false,
      current: false
    }
  ]);

  // AI Store Generation
  const generateStoreWithAI = async () => {
    setIsGeneratingAI(true);
    
    try {
      // Simulate AI generation process
      for (let i = 0; i <= 100; i += 10) {
        setBuildProgress(i);
        await new Promise(resolve => setTimeout(resolve, 300));
      }
      
      // Auto-fill store data based on AI recommendations
      setStoreData({
        name: 'TechFlow Store',
        description: 'Premium electronics and gadgets for tech enthusiasts',
        category: 'Electronics',
        colors: {
          primary: '#4AE54A',
          secondary: '#0B0D12',
          accent: '#C0C5CE'
        },
        branding: {
          logo: 'AI Generated Logo',
          slogan: 'Innovation at Your Fingertips'
        }
      });
      
      setSelectedTemplate('tech-minimal');
      setBuildProgress(0);
    } catch (error) {
      console.error('AI generation failed:', error);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const startBuilding = async () => {
    if (!selectedTemplate) return;
    
    setBuildingStore(true);
    
    // Simulate building process
    for (let i = 0; i <= 100; i += 5) {
      setBuildProgress(i);
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    setBuildingStore(false);
    setBuildProgress(0);
  };

  const TemplateCard = ({ template }: { template: StoreTemplate }) => {
    const isSelected = selectedTemplate === template.id;
    
    return (
      <Card className={`cursor-pointer transition-all duration-300 ${
        isSelected 
          ? 'border-[#4AE54A] bg-[#4AE54A]/5 ring-2 ring-[#4AE54A]/20' 
          : 'border-[#4AE54A]/20 hover:border-[#4AE54A]/40'
      } bg-[#12151C]`}
      onClick={() => setSelectedTemplate(template.id)}
      >
        <CardContent className="p-0">
          {/* Template Preview */}
          <div className="aspect-video bg-gradient-to-br from-[#4AE54A]/10 to-[#0B0D12] rounded-t-lg flex items-center justify-center relative overflow-hidden">
            <div className="text-[#4AE54A]/50 font-mono text-lg">
              {template.name} Preview
            </div>
            <div className="absolute top-2 right-2">
              {template.responsive && (
                <Badge variant="outline" className="border-[#4AE54A] text-[#4AE54A] font-mono text-xs">
                  Responsive
                </Badge>
              )}
            </div>
          </div>
          
          {/* Template Info */}
          <div className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-[#C0C5CE] font-mono font-medium">{template.name}</h3>
                <p className="text-[#C0C5CE]/60 font-mono text-sm">{template.category}</p>
              </div>
              <div className="text-right">
                <div className="text-[#4AE54A] font-mono font-medium">{template.price}</div>
                <div className="flex items-center space-x-1 mt-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span className="text-[#C0C5CE]/60 font-mono text-xs">{template.rating}</span>
                </div>
              </div>
            </div>
            
            {/* Features */}
            <div className="space-y-2 mb-3">
              {template.features.slice(0, 2).map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="w-3 h-3 text-[#4AE54A]" />
                  <span className="text-[#C0C5CE]/70 font-mono text-xs">{feature}</span>
                </div>
              ))}
              {template.features.length > 2 && (
                <div className="text-[#C0C5CE]/50 font-mono text-xs">
                  +{template.features.length - 2} more features
                </div>
              )}
            </div>
            
            {/* Platform Support */}
            <div className="flex flex-wrap gap-1 mb-3">
              {template.ecommercePlatform.map((platform, index) => (
                <Badge key={index} variant="outline" className="border-[#C0C5CE]/30 text-[#C0C5CE]/70 font-mono text-xs">
                  {platform}
                </Badge>
              ))}
            </div>
            
            {/* Stats */}
            <div className="flex items-center justify-between text-[#C0C5CE]/50 font-mono text-xs">
              <span>{template.downloads.toLocaleString()} downloads</span>
              {isSelected && (
                <CheckCircle className="w-4 h-4 text-[#4AE54A]" />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const BuildingProgress = () => (
    <Card className="bg-[#12151C] border-[#4AE54A]/20">
      <CardHeader>
        <CardTitle className="text-[#4AE54A] font-mono flex items-center">
          <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
          Building Your Store
        </CardTitle>
        <CardDescription className="text-[#C0C5CE]/70 font-mono">
          AI is creating your professional e-commerce store...
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Progress value={buildProgress} className="h-3" />
          <div className="flex justify-between text-[#C0C5CE]/60 font-mono text-sm">
            <span>Progress: {buildProgress}%</span>
            <span>Estimated time: {Math.max(1, Math.ceil((100 - buildProgress) / 10))} minutes</span>
          </div>
          <div className="text-[#C0C5CE]/70 font-mono text-sm">
            {buildProgress < 20 && "Setting up template structure..."}
            {buildProgress >= 20 && buildProgress < 40 && "Applying custom branding..."}
            {buildProgress >= 40 && buildProgress < 60 && "Configuring e-commerce features..."}
            {buildProgress >= 60 && buildProgress < 80 && "Optimizing for performance..."}
            {buildProgress >= 80 && "Finalizing your store..."}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-[#0B0D12] terminal-theme p-6">
      <div className="max-w-[1400px] mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-mono text-[#4AE54A] mb-2 flex items-center">
              <Store className="w-8 h-8 mr-3" />
              Store Builder Studio
            </h1>
            <p className="text-[#C0C5CE]/70 font-mono">Create professional e-commerce stores in minutes with AI</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              className="border-[#4AE54A] text-[#4AE54A] hover:bg-[#4AE54A]/10 font-mono"
              onClick={generateStoreWithAI}
              disabled={isGeneratingAI}
            >
              {isGeneratingAI ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI Generate Store
                </>
              )}
            </Button>
            <Button 
              className="bg-[#4AE54A] text-[#0B0D12] hover:bg-[#4AE54A]/90 font-mono"
              onClick={startBuilding}
              disabled={!selectedTemplate || buildingStore}
            >
              {buildingStore ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Building...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Start Building
                </>
              )}
            </Button>
          </div>
        </div>

        {/* AI Generation Progress */}
        {isGeneratingAI && (
          <Card className="bg-[#12151C] border-yellow-400/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
                <div>
                  <h3 className="text-yellow-400 font-mono font-medium">AI Store Generation</h3>
                  <p className="text-[#C0C5CE]/70 font-mono text-sm">Creating a custom store based on your requirements...</p>
                </div>
              </div>
              <Progress value={buildProgress} className="h-3" />
              <p className="text-[#C0C5CE]/60 font-mono text-sm mt-2">{buildProgress}% Complete</p>
            </CardContent>
          </Card>
        )}

        {/* Building Progress */}
        {buildingStore && <BuildingProgress />}

        {/* Build Steps Progress */}
        <Card className="bg-[#12151C] border-[#4AE54A]/20">
          <CardHeader>
            <CardTitle className="text-[#4AE54A] font-mono">Build Progress</CardTitle>
            <CardDescription className="text-[#C0C5CE]/70 font-mono">
              Follow these steps to create your perfect store
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              {buildSteps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 font-mono text-sm ${
                    step.completed ? 'bg-[#4AE54A] border-[#4AE54A] text-[#0B0D12]' :
                    step.current ? 'border-[#4AE54A] text-[#4AE54A]' :
                    'border-[#C0C5CE]/30 text-[#C0C5CE]/50'
                  }`}>
                    {step.completed ? <CheckCircle className="w-4 h-4" /> : index + 1}
                  </div>
                  {index < buildSteps.length - 1 && (
                    <div className={`w-12 h-0.5 mx-2 ${
                      step.completed ? 'bg-[#4AE54A]' : 'bg-[#C0C5CE]/20'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4">
              <h4 className="text-[#C0C5CE] font-mono font-medium">
                {buildSteps.find(s => s.current)?.title}
              </h4>
              <p className="text-[#C0C5CE]/60 font-mono text-sm">
                {buildSteps.find(s => s.current)?.description}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="templates" className="space-y-6">
          <TabsList className="bg-[#12151C] border border-[#4AE54A]/20">
            <TabsTrigger value="templates" className="font-mono">Templates</TabsTrigger>
            <TabsTrigger value="customize" className="font-mono">Customize</TabsTrigger>
            <TabsTrigger value="preview" className="font-mono">Preview</TabsTrigger>
            <TabsTrigger value="settings" className="font-mono">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="templates" className="space-y-6">
            {/* Template Categories */}
            <Card className="bg-[#12151C] border-[#4AE54A]/20">
              <CardHeader>
                <CardTitle className="text-[#4AE54A] font-mono">Choose Your Template</CardTitle>
                <CardDescription className="text-[#C0C5CE]/70 font-mono">
                  Professional templates optimized for conversion and performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {templates.map((template) => (
                    <TemplateCard key={template.id} template={template} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customize" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Customization Panel */}
              <Card className="bg-[#12151C] border-[#4AE54A]/20">
                <CardHeader>
                  <CardTitle className="text-[#4AE54A] font-mono">Store Customization</CardTitle>
                  <CardDescription className="text-[#C0C5CE]/70 font-mono">
                    Personalize your store's appearance and branding
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Basic Info */}
                  <div className="space-y-4">
                    <h3 className="text-[#C0C5CE] font-mono font-medium">Basic Information</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-[#C0C5CE]/70 font-mono text-sm">Store Name</label>
                        <Input
                          value={storeData.name}
                          onChange={(e) => setStoreData(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Enter your store name"
                          className="bg-[#0B0D12] border-[#4AE54A]/30 text-[#C0C5CE] font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[#C0C5CE]/70 font-mono text-sm">Description</label>
                        <Textarea
                          value={storeData.description}
                          onChange={(e) => setStoreData(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Describe your store and products"
                          className="bg-[#0B0D12] border-[#4AE54A]/30 text-[#C0C5CE] font-mono"
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Color Scheme */}
                  <div className="space-y-4">
                    <h3 className="text-[#C0C5CE] font-mono font-medium">Color Scheme</h3>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="text-[#C0C5CE]/70 font-mono text-sm">Primary</label>
                        <div className="flex items-center space-x-2 mt-1">
                          <div 
                            className="w-8 h-8 rounded border border-[#4AE54A]/30"
                            style={{ backgroundColor: storeData.colors.primary }}
                          />
                          <Input
                            value={storeData.colors.primary}
                            onChange={(e) => setStoreData(prev => ({
                              ...prev,
                              colors: { ...prev.colors, primary: e.target.value }
                            }))}
                            className="bg-[#0B0D12] border-[#4AE54A]/30 text-[#C0C5CE] font-mono text-xs"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[#C0C5CE]/70 font-mono text-sm">Secondary</label>
                        <div className="flex items-center space-x-2 mt-1">
                          <div 
                            className="w-8 h-8 rounded border border-[#4AE54A]/30"
                            style={{ backgroundColor: storeData.colors.secondary }}
                          />
                          <Input
                            value={storeData.colors.secondary}
                            onChange={(e) => setStoreData(prev => ({
                              ...prev,
                              colors: { ...prev.colors, secondary: e.target.value }
                            }))}
                            className="bg-[#0B0D12] border-[#4AE54A]/30 text-[#C0C5CE] font-mono text-xs"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[#C0C5CE]/70 font-mono text-sm">Accent</label>
                        <div className="flex items-center space-x-2 mt-1">
                          <div 
                            className="w-8 h-8 rounded border border-[#4AE54A]/30"
                            style={{ backgroundColor: storeData.colors.accent }}
                          />
                          <Input
                            value={storeData.colors.accent}
                            onChange={(e) => setStoreData(prev => ({
                              ...prev,
                              colors: { ...prev.colors, accent: e.target.value }
                            }))}
                            className="bg-[#0B0D12] border-[#4AE54A]/30 text-[#C0C5CE] font-mono text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Branding */}
                  <div className="space-y-4">
                    <h3 className="text-[#C0C5CE] font-mono font-medium">Branding</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-[#C0C5CE]/70 font-mono text-sm">Logo Upload</label>
                        <div className="border-2 border-dashed border-[#4AE54A]/30 rounded-lg p-4 text-center hover:border-[#4AE54A]/50 transition-colors cursor-pointer">
                          <Upload className="w-6 h-6 text-[#4AE54A] mx-auto mb-2" />
                          <p className="text-[#C0C5CE]/70 font-mono text-sm">Click to upload logo</p>
                        </div>
                      </div>
                      <div>
                        <label className="text-[#C0C5CE]/70 font-mono text-sm">Slogan</label>
                        <Input
                          value={storeData.branding.slogan}
                          onChange={(e) => setStoreData(prev => ({
                            ...prev,
                            branding: { ...prev.branding, slogan: e.target.value }
                          }))}
                          placeholder="Your store's tagline"
                          className="bg-[#0B0D12] border-[#4AE54A]/30 text-[#C0C5CE] font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Live Preview */}
              <Card className="bg-[#12151C] border-[#4AE54A]/20">
                <CardHeader>
                  <CardTitle className="text-[#4AE54A] font-mono flex items-center justify-between">
                    Live Preview
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant={previewDevice === 'desktop' ? 'default' : 'outline'}
                        onClick={() => setPreviewDevice('desktop')}
                        className="font-mono"
                      >
                        <Monitor className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant={previewDevice === 'tablet' ? 'default' : 'outline'}
                        onClick={() => setPreviewDevice('tablet')}
                        className="font-mono"
                      >
                        <Tablet className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant={previewDevice === 'mobile' ? 'default' : 'outline'}
                        onClick={() => setPreviewDevice('mobile')}
                        className="font-mono"
                      >
                        <Smartphone className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`border border-[#4AE54A]/20 rounded-lg overflow-hidden ${
                    previewDevice === 'desktop' ? 'aspect-video' :
                    previewDevice === 'tablet' ? 'aspect-[4/5] max-w-md mx-auto' :
                    'aspect-[9/16] max-w-sm mx-auto'
                  }`}>
                    <div 
                      className="w-full h-full flex items-center justify-center text-[#C0C5CE]/50 font-mono"
                      style={{ 
                        background: `linear-gradient(135deg, ${storeData.colors.primary}10, ${storeData.colors.secondary})`
                      }}
                    >
                      <div className="text-center">
                        <Store className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <h3 className="text-lg font-medium mb-2">{storeData.name || 'Your Store Name'}</h3>
                        <p className="text-sm opacity-70">{storeData.branding.slogan || 'Your slogan here'}</p>
                        <div className="mt-4 text-xs">
                          {previewDevice.charAt(0).toUpperCase() + previewDevice.slice(1)} Preview
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="space-y-6">
            <Card className="bg-[#12151C] border-[#4AE54A]/20">
              <CardHeader>
                <CardTitle className="text-[#4AE54A] font-mono">Store Preview</CardTitle>
                <CardDescription className="text-[#C0C5CE]/70 font-mono">
                  Preview your store before launching
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-[#4AE54A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Eye className="w-8 h-8 text-[#4AE54A]" />
                    </div>
                    <h3 className="text-xl text-[#C0C5CE] font-mono font-medium mb-2">Full Preview Coming Soon</h3>
                    <p className="text-[#C0C5CE]/70 font-mono">
                      Interactive store preview with real-time editing capabilities
                    </p>
                  </div>
                  <Button className="bg-[#4AE54A] text-[#0B0D12] hover:bg-[#4AE54A]/90 font-mono">
                    Launch Preview
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-[#12151C] border-[#4AE54A]/20">
              <CardHeader>
                <CardTitle className="text-[#4AE54A] font-mono">Store Settings</CardTitle>
                <CardDescription className="text-[#C0C5CE]/70 font-mono">
                  Configure advanced store features and integrations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-[#4AE54A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Settings className="w-8 h-8 text-[#4AE54A]" />
                    </div>
                    <h3 className="text-xl text-[#C0C5CE] font-mono font-medium mb-2">Advanced Settings</h3>
                    <p className="text-[#C0C5CE]/70 font-mono">
                      Payment gateways, shipping options, SEO settings, and more
                    </p>
                  </div>
                  <Button className="bg-[#4AE54A] text-[#0B0D12] hover:bg-[#4AE54A]/90 font-mono">
                    Configure Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StoreBuilder;