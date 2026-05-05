import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useLanguage } from '../../contexts/LanguageContext';
import { RTLContainer } from '../LanguageSwitcher';
import { 
  Code,
  Play,
  Pause,
  Square,
  Save,
  Upload,
  Download,
  Copy,
  Trash,
  Edit,
  FileText,
  Folder,
  FolderOpen,
  Plus,
  Minus,
  Search,
  Replace,
  Settings,
  Terminal,
  Bug,
  Zap,
  Brain,
  Sparkles,
  Eye,
  EyeOff,
  Maximize,
  Minimize,
  RotateCcw,
  RotateCw,
  GitBranch,
  GitCommit,
  GitMerge,
  Server,
  Database,
  Cloud,
  Cpu,
  Activity,
  Target,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  Clock,
  Users,
  Share,
  ExternalLink,
  Layers,
  Package,
  Wrench,
  Monitor,
  Smartphone,
  Tablet,
  Chrome,
  Firefox,
  Palette,
  Type,
  Layout,
  Grid,
  MousePointer,
  Keyboard,
  Volume2,
  VolumeX,
  RefreshCw,
  Power,
  Wifi,
  WifiOff
} from 'lucide-react';

// ✅ ENHANCED: Advanced code editor interfaces
interface CodeFile {
  id: string;
  name: string;
  path: string;
  language: 'typescript' | 'javascript' | 'html' | 'css' | 'json' | 'python' | 'sql' | 'yaml';
  content: string;
  size: number;
  lastModified: Date;
  version: number;
  isModified: boolean;
  isActive: boolean;
  breakpoints: number[];
  errors: Array<{
    line: number;
    column: number;
    message: string;
    severity: 'error' | 'warning' | 'info';
  }>;
}

interface AICodeSuggestion {
  id: string;
  type: 'completion' | 'refactor' | 'optimization' | 'bug-fix' | 'documentation';
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  confidence: number;
  originalCode: string;
  suggestedCode: string;
  explanation: string;
  explanationAr: string;
  performance: {
    executionTime: number;
    memoryUsage: number;
    codeQuality: number;
  };
  applicable: boolean;
}

interface CodeSnippet {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  language: string;
  category: 'component' | 'utility' | 'hook' | 'service' | 'template';
  code: string;
  tags: string[];
  usage: number;
  rating: number;
  author: string;
}

interface BuildConfiguration {
  id: string;
  name: string;
  environment: 'development' | 'staging' | 'production';
  framework: 'react' | 'vue' | 'angular' | 'next' | 'nuxt';
  buildTool: 'webpack' | 'vite' | 'rollup' | 'esbuild';
  target: string[];
  optimizations: {
    minification: boolean;
    treeshaking: boolean;
    compression: boolean;
    sourcemaps: boolean;
  };
  lastBuild: Date;
  buildTime: number;
  outputSize: number;
}

// ✅ ENHANCED: Mock code files for e-commerce platform
const mockCodeFiles: CodeFile[] = [
  {
    id: 'file-001',
    name: 'App.tsx',
    path: '/src/App.tsx',
    language: 'typescript',
    content: `import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { Dashboard } from './components/Dashboard';
import { ProductCatalog } from './components/ProductCatalog';
import { OrderManagement } from './components/OrderManagement';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-[#0a0a0a] text-[#C0C5CE]">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<ProductCatalog />} />
              <Route path="/orders" element={<OrderManagement />} />
              <Route path="/analytics" element={<AnalyticsDashboard />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;`,
    size: 1247,
    lastModified: new Date(Date.now() - 2 * 60 * 60 * 1000),
    version: 12,
    isModified: false,
    isActive: true,
    breakpoints: [15, 23],
    errors: []
  },
  {
    id: 'file-002',
    name: 'ProductService.ts',
    path: '/src/services/ProductService.ts',
    language: 'typescript',
    content: `import { Product, ProductFilters, ApiResponse } from '../types';
import { apiClient } from './ApiClient';

export class ProductService {
  private static instance: ProductService;
  private cache = new Map<string, Product[]>();

  static getInstance(): ProductService {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService();
    }
    return ProductService.instance;
  }

  async getProducts(filters?: ProductFilters): Promise<ApiResponse<Product[]>> {
    const cacheKey = JSON.stringify(filters || {});
    
    if (this.cache.has(cacheKey)) {
      return {
        data: this.cache.get(cacheKey)!,
        success: true,
        message: 'Products retrieved from cache'
      };
    }

    try {
      const response = await apiClient.get<Product[]>('/api/products', {
        params: filters
      });
      
      this.cache.set(cacheKey, response.data);
      
      return {
        data: response.data,
        success: true,
        message: 'Products retrieved successfully'
      };
    } catch (error) {
      return {
        data: [],
        success: false,
        message: 'Failed to retrieve products'
      };
    }
  }

  async createProduct(product: Omit<Product, 'id'>): Promise<ApiResponse<Product>> {
    try {
      const response = await apiClient.post<Product>('/api/products', product);
      this.cache.clear(); // Invalidate cache
      
      return {
        data: response.data,
        success: true,
        message: 'Product created successfully'
      };
    } catch (error) {
      return {
        data: null,
        success: false,
        message: 'Failed to create product'
      };
    }
  }
}`,
    size: 2156,
    lastModified: new Date(Date.now() - 30 * 60 * 1000),
    version: 8,
    isModified: true,
    isActive: false,
    breakpoints: [35, 47],
    errors: [
      {
        line: 29,
        column: 18,
        message: 'Type assertion may be unnecessary',
        severity: 'warning'
      }
    ]
  },
  {
    id: 'file-003',
    name: 'styles.css',
    path: '/src/styles/globals.css',
    language: 'css',
    content: `/* NeoTechnology Solutions - Global Styles */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap');

:root {
  --neo-blue: #00d4ff;
  --neo-green: #00ff88;
  --neo-bg: #0a0a0a;
  --neo-text: #C0C5CE;
  --neo-border: rgba(0, 212, 255, 0.3);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'JetBrains Mono', monospace;
  background-color: var(--neo-bg);
  color: var(--neo-text);
  line-height: 1.6;
}

.neo-button-primary {
  background: linear-gradient(135deg, var(--neo-blue), var(--neo-green));
  color: #000;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.neo-button-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 212, 255, 0.3);
}

.neo-card {
  background: rgba(18, 21, 28, 0.8);
  border: 1px solid var(--neo-border);
  border-radius: 0.75rem;
  backdrop-filter: blur(12px);
}

.neo-dashboard-widget {
  @apply neo-card;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
}

.neo-dashboard-widget::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--neo-blue), var(--neo-green));
}

/* Neural network animation */
@keyframes neural-pulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.8; }
}

.neural-network {
  background-image: 
    radial-gradient(circle at 25% 25%, var(--neo-blue) 1px, transparent 1px),
    radial-gradient(circle at 75% 75%, var(--neo-green) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: neural-pulse 3s ease-in-out infinite;
}`,
    size: 1654,
    lastModified: new Date(Date.now() - 45 * 60 * 1000),
    version: 15,
    isModified: false,
    isActive: false,
    breakpoints: [],
    errors: []
  }
];

const aiCodeSuggestions: AICodeSuggestion[] = [
  {
    id: 'suggestion-001',
    type: 'optimization',
    title: 'Optimize API Caching Strategy',
    titleAr: 'تحسين استراتيجية تخزين API المؤقت',
    description: 'Implement smarter caching with TTL and cache invalidation strategies',
    descriptionAr: 'تطبيق تخزين مؤقت أذكى مع TTL واستراتيجيات إبطال التخزين المؤقت',
    confidence: 94,
    originalCode: `this.cache.set(cacheKey, response.data);`,
    suggestedCode: `this.cache.set(cacheKey, {
  data: response.data,
  timestamp: Date.now(),
  ttl: 5 * 60 * 1000 // 5 minutes
});`,
    explanation: 'Adding TTL-based caching will prevent stale data and improve performance',
    explanationAr: 'إضافة تخزين مؤقت قائم على TTL سيمنع البيانات القديمة ويحسن الأداء',
    performance: {
      executionTime: -23,
      memoryUsage: +12,
      codeQuality: +18
    },
    applicable: true
  },
  {
    id: 'suggestion-002',
    type: 'bug-fix',
    title: 'Handle Network Timeout Errors',
    titleAr: 'التعامل مع أخطاء انتهاء مهلة الشبكة',
    description: 'Add proper error handling for network timeouts and retries',
    descriptionAr: 'إضافة معالجة صحيحة لأخطاء انتهاء مهلة الشبكة والمحاولات',
    confidence: 89,
    originalCode: `} catch (error) {
  return {
    data: [],
    success: false,
    message: 'Failed to retrieve products'
  };
}`,
    suggestedCode: `} catch (error) {
  const isTimeout = error.code === 'TIMEOUT';
  const isNetworkError = !error.response;
  
  return {
    data: [],
    success: false,
    message: isTimeout 
      ? 'Request timeout - please try again'
      : isNetworkError 
        ? 'Network error - check connection'
        : 'Failed to retrieve products',
    errorCode: error.code
  };
}`,
    explanation: 'Better error classification helps with debugging and user experience',
    explanationAr: 'تصنيف أفضل للأخطاء يساعد في التصحيح وتجربة المستخدم',
    performance: {
      executionTime: +5,
      memoryUsage: +3,
      codeQuality: +25
    },
    applicable: true
  },
  {
    id: 'suggestion-003',
    type: 'refactor',
    title: 'Extract CSS Custom Properties',
    titleAr: 'استخراج خصائص CSS المخصصة',
    description: 'Convert hardcoded values to CSS custom properties for better maintainability',
    descriptionAr: 'تحويل القيم المشفرة إلى خصائص CSS مخصصة لصيانة أفضل',
    confidence: 91,
    originalCode: `box-shadow: 0 8px 25px rgba(0, 212, 255, 0.3);`,
    suggestedCode: `box-shadow: 0 8px 25px var(--neo-shadow-blue);`,
    explanation: 'Using CSS custom properties makes theming and maintenance easier',
    explanationAr: 'استخدام خصائص CSS المخصصة يجعل التصميم والصيانة أسهل',
    performance: {
      executionTime: 0,
      memoryUsage: 0,
      codeQuality: +15
    },
    applicable: true
  }
];

const codeSnippets: CodeSnippet[] = [
  {
    id: 'snippet-001',
    name: 'API Service Hook',
    nameAr: 'خطاف خدمة API',
    description: 'Custom React hook for API calls with caching and error handling',
    descriptionAr: 'خطاف React مخصص لاستدعاءات API مع التخزين المؤقت ومعالجة الأخطاء',
    language: 'typescript',
    category: 'hook',
    code: `import { useState, useEffect, useCallback } from 'react';

interface UseApiOptions<T> {
  url: string;
  params?: Record<string, any>;
  dependencies?: any[];
  immediate?: boolean;
}

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useApi<T>(options: UseApiOptions<T>) {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null
  });

  const fetchData = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await fetch(options.url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        ...options.params && { body: JSON.stringify(options.params) }
      });
      
      if (!response.ok) throw new Error('Request failed');
      
      const data = await response.json();
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }));
    }
  }, [options.url, JSON.stringify(options.params)]);

  useEffect(() => {
    if (options.immediate !== false) {
      fetchData();
    }
  }, [fetchData, ...(options.dependencies || [])]);

  return { ...state, refetch: fetchData };
}`,
    tags: ['react', 'typescript', 'api', 'hook', 'caching'],
    usage: 247,
    rating: 4.8,
    author: 'NeoTech Team'
  },
  {
    id: 'snippet-002',
    name: 'E-commerce Product Card',
    nameAr: 'بطاقة منتج التجارة الإلكترونية',
    description: 'Responsive product card component with animations and actions',
    descriptionAr: 'مكون بطاقة منتج متجاوب مع الرسوم المتحركة والإجراءات',
    language: 'typescript',
    category: 'component',
    code: `import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ShoppingCart, Heart, Eye } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
  rating: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string) => void;
  onWishlist: (productId: string) => void;
  onQuickView: (productId: string) => void;
}

export function ProductCard({ product, onAddToCart, onWishlist, onQuickView }: ProductCardProps) {
  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        
        {!product.inStock && (
          <Badge className="absolute top-2 right-2 bg-red-500/20 text-red-400">
            Out of Stock
          </Badge>
        )}
        
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-1">
          <Button size="sm" variant="secondary" onClick={() => onWishlist(product.id)}>
            <Heart className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="secondary" onClick={() => onQuickView(product.id)}>
            <Eye className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <div className="p-4">
        <Badge className="mb-2 text-xs">{product.category}</Badge>
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-[#00ff88]">
            \${product.price}
          </span>
          <div className="flex items-center">
            <span className="text-yellow-400">★</span>
            <span className="ml-1 text-sm">{product.rating}</span>
          </div>
        </div>
        
        <Button 
          className="w-full neo-button-primary"
          disabled={!product.inStock}
          onClick={() => onAddToCart(product.id)}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {product.inStock ? 'Add to Cart' : 'Unavailable'}
        </Button>
      </div>
    </Card>
  );
}`,
    tags: ['react', 'typescript', 'ecommerce', 'component', 'responsive'],
    usage: 189,
    rating: 4.9,
    author: 'NeoTech Team'
  }
];

export function AdvancedCodeEditor({ onNavigate }: { onNavigate?: (section: string) => void }) {
  const { isRTL, language } = useLanguage();
  const [selectedView, setSelectedView] = useState<'editor' | 'ai-assistant' | 'snippets' | 'build' | 'debug'>('editor');
  const [codeFiles, setCodeFiles] = useState<CodeFile[]>(mockCodeFiles);
  const [activeFile, setActiveFile] = useState<CodeFile | null>(mockCodeFiles[0]);
  const [suggestions, setSuggestions] = useState<AICodeSuggestion[]>(aiCodeSuggestions);
  const [isAIEnabled, setIsAIEnabled] = useState(true);
  const [isDebugging, setIsDebugging] = useState(false);
  const [buildConfigs, setBuildConfigs] = useState<BuildConfiguration[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [replaceQuery, setReplaceQuery] = useState('');
  const [editorTheme, setEditorTheme] = useState<'dark' | 'light' | 'matrix'>('dark');
  const editorRef = useRef<HTMLTextAreaElement>(null);

  // ✅ ENHANCED: File operations
  const openFile = useCallback((file: CodeFile) => {
    setCodeFiles(prev => prev.map(f => ({ ...f, isActive: f.id === file.id })));
    setActiveFile(file);
  }, []);

  const saveFile = useCallback((file: CodeFile) => {
    setCodeFiles(prev => prev.map(f => 
      f.id === file.id 
        ? { 
            ...f, 
            isModified: false, 
            version: f.version + 1, 
            lastModified: new Date() 
          }
        : f
    ));
  }, []);

  const updateFileContent = useCallback((fileId: string, content: string) => {
    setCodeFiles(prev => prev.map(f => 
      f.id === fileId 
        ? { ...f, content, isModified: true, size: content.length }
        : f
    ));
    
    if (activeFile?.id === fileId) {
      setActiveFile(prev => prev ? { ...prev, content, isModified: true } : null);
    }
  }, [activeFile]);

  // ✅ ENHANCED: AI code analysis
  const analyzeCode = useCallback(async (code: string) => {
    if (!isAIEnabled) return;

    // Simulate AI analysis
    const newSuggestions: AICodeSuggestion[] = [];
    
    // Check for common patterns and improvements
    if (code.includes('console.log')) {
      newSuggestions.push({
        id: `suggestion-${Date.now()}`,
        type: 'optimization',
        title: 'Remove Debug Logs',
        titleAr: 'إزالة سجلات التصحيح',
        description: 'Remove console.log statements from production code',
        descriptionAr: 'إزالة بيانات console.log من كود الإنتاج',
        confidence: 95,
        originalCode: 'console.log(...)',
        suggestedCode: '// Remove or replace with proper logging',
        explanation: 'Console logs can impact performance and expose sensitive information',
        explanationAr: 'سجلات الكونسول يمكن أن تؤثر على الأداء وتكشف معلومات حساسة',
        performance: { executionTime: -5, memoryUsage: -2, codeQuality: +10 },
        applicable: true
      });
    }

    setSuggestions(prev => [...prev, ...newSuggestions]);
  }, [isAIEnabled]);

  // ✅ ENHANCED: Code editing with AI assistance
  useEffect(() => {
    if (activeFile && isAIEnabled) {
      const timer = setTimeout(() => {
        analyzeCode(activeFile.content);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [activeFile?.content, analyzeCode, isAIEnabled]);

  // ✅ ENHANCED: Syntax highlighting (simplified)
  const highlightSyntax = useCallback((code: string, language: string) => {
    // This is a simplified syntax highlighter
    // In a real implementation, you'd use a proper syntax highlighting library
    let highlighted = code;
    
    if (language === 'typescript' || language === 'javascript') {
      highlighted = highlighted
        .replace(/(import|export|const|let|var|function|class|interface|type)/g, '<span class="text-[#00d4ff]">$1</span>')
        .replace(/(string|number|boolean|object|Array)/g, '<span class="text-[#00ff88]">$1</span>')
        .replace(/('.*?'|".*?")/g, '<span class="text-yellow-400">$1</span>')
        .replace(/(\/\/.*$)/gm, '<span class="text-[#C0C5CE]/50">$1</span>');
    } else if (language === 'css') {
      highlighted = highlighted
        .replace(/([a-zA-Z-]+)(\s*:)/g, '<span class="text-[#00d4ff]">$1</span>$2')
        .replace(/(#[a-fA-F0-9]{3,6})/g, '<span class="text-[#00ff88]">$1</span>')
        .replace(/(\d+px|\d+rem|\d+%)/g, '<span class="text-yellow-400">$1</span>');
    }
    
    return highlighted;
  }, []);

  // ✅ ENHANCED: Build and deployment
  const buildProject = useCallback(async (config: BuildConfiguration) => {
    console.log('Building project with config:', config);
    // Simulate build process
    return new Promise(resolve => {
      setTimeout(() => {
        console.log('Build completed successfully');
        resolve('Build completed');
      }, 3000);
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#C0C5CE] font-mono">
      {/* ✅ ENHANCED: Code matrix background */}
      <div className="fixed inset-0 code-matrix opacity-5 pointer-events-none"></div>
      
      <RTLContainer className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        <div className={`space-y-8 ${isRTL ? 'text-right' : 'text-left'}`}>
          
          {/* ✅ ENHANCED: Code editor header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#00d4ff] via-purple-500 to-[#00ff88] rounded-lg flex items-center justify-center">
                <Code className="w-6 h-6 text-black" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-[#C0C5CE]">
                  {language === 'ar' ? 'محرر الكود المتقدم' : 'Advanced Code Editor'}
                </h1>
                <p className="text-[#C0C5CE]/70 mt-1">
                  {language === 'ar' 
                    ? 'بيئة تطوير متكاملة مع ذكاء اصطناعي وأدوات تصحيح متطورة'
                    : 'Integrated development environment with AI assistance and advanced debugging tools'
                  }
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge className={`${isAIEnabled ? 'bg-[#00ff88]/20 text-[#00ff88]' : 'bg-[#C0C5CE]/20 text-[#C0C5CE]'} font-mono`}>
                <Brain className="w-3 h-3 mr-1" />
                AI: {isAIEnabled ? 'ON' : 'OFF'}
              </Badge>
              
              <Badge className={`${isDebugging ? 'bg-yellow-400/20 text-yellow-400' : 'bg-[#C0C5CE]/20 text-[#C0C5CE]'} font-mono`}>
                <Bug className="w-3 h-3 mr-1" />
                Debug: {isDebugging ? 'ON' : 'OFF'}
              </Badge>
            </div>
          </div>

          {/* ✅ ENHANCED: Navigation tabs */}
          <div className="flex space-x-1 bg-[#12151C] p-1 rounded-lg">
            {[
              { id: 'editor', label: language === 'ar' ? 'المحرر' : 'Editor', icon: Code },
              { id: 'ai-assistant', label: language === 'ar' ? 'مساعد الذكاء الاصطناعي' : 'AI Assistant', icon: Brain },
              { id: 'snippets', label: language === 'ar' ? 'مقاطع الكود' : 'Snippets', icon: Package },
              { id: 'build', label: language === 'ar' ? 'البناء' : 'Build', icon: Settings },
              { id: 'debug', label: language === 'ar' ? 'التصحيح' : 'Debug', icon: Bug }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedView(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md font-mono text-sm transition-all ${
                  selectedView === tab.id
                    ? 'bg-[#00d4ff] text-black'
                    : 'text-[#C0C5CE] hover:bg-[#00d4ff]/10 hover:text-[#00d4ff]'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* ✅ ENHANCED: Main editor interface */}
          {selectedView === 'editor' && (
            <div className="grid grid-cols-12 gap-6 h-[800px]">
              {/* File explorer */}
              <div className="col-span-3">
                <Card className="neo-card h-full">
                  <div className="p-4 border-b border-[#00d4ff]/20">
                    <h4 className="font-mono text-[#C0C5CE] font-semibold">
                      {language === 'ar' ? 'مستكشف الملفات' : 'File Explorer'}
                    </h4>
                  </div>
                  
                  <div className="p-4 space-y-2">
                    {codeFiles.map(file => (
                      <div
                        key={file.id}
                        onClick={() => openFile(file)}
                        className={`flex items-center space-x-2 p-2 rounded cursor-pointer transition-colors ${
                          file.isActive 
                            ? 'bg-[#00d4ff]/20 text-[#00d4ff]' 
                            : 'hover:bg-[#12151C] text-[#C0C5CE]'
                        }`}
                      >
                        <FileText className="w-4 h-4" />
                        <span className="text-sm font-mono">{file.name}</span>
                        {file.isModified && (
                          <div className="w-2 h-2 bg-[#00ff88] rounded-full"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Main editor */}
              <div className="col-span-6">
                <Card className="neo-card h-full flex flex-col">
                  {/* Editor toolbar */}
                  <div className="p-4 border-b border-[#00d4ff]/20 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {activeFile && (
                        <>
                          <span className="font-mono text-[#C0C5CE]">{activeFile.name}</span>
                          <Badge className="text-xs">v{activeFile.version}</Badge>
                          {activeFile.isModified && (
                            <Badge className="bg-[#00ff88]/20 text-[#00ff88] text-xs">Modified</Badge>
                          )}
                        </>
                      )}
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" className="neo-button-outline" onClick={() => activeFile && saveFile(activeFile)}>
                        <Save className="w-3 h-3 mr-1" />
                        Save
                      </Button>
                      <Button size="sm" className="neo-button-ghost">
                        <Play className="w-3 h-3 mr-1" />
                        Run
                      </Button>
                    </div>
                  </div>
                  
                  {/* Code editor area */}
                  <div className="flex-1 relative">
                    {activeFile ? (
                      <div className="h-full flex">
                        {/* Line numbers */}
                        <div className="w-12 bg-[#0B0D12] border-r border-[#00d4ff]/20 p-2">
                          {activeFile.content.split('\n').map((_, index) => (
                            <div key={index} className="text-xs text-[#C0C5CE]/50 font-mono text-right">
                              {index + 1}
                            </div>
                          ))}
                        </div>
                        
                        {/* Code content */}
                        <textarea
                          ref={editorRef}
                          value={activeFile.content}
                          onChange={(e) => updateFileContent(activeFile.id, e.target.value)}
                          className="flex-1 bg-[#0B0D12] text-[#C0C5CE] p-4 font-mono text-sm leading-relaxed resize-none focus:outline-none"
                          spellCheck={false}
                          style={{
                            fontFamily: 'JetBrains Mono, monospace',
                            tabSize: 2
                          }}
                        />
                      </div>
                    ) : (
                      <div className="h-full flex items-center justify-center text-[#C0C5CE]/50">
                        <div className="text-center">
                          <Code className="w-12 h-12 mx-auto mb-4" />
                          <p className="font-mono">
                            {language === 'ar' ? 'اختر ملف للتحرير' : 'Select a file to edit'}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              </div>

              {/* Side panel */}
              <div className="col-span-3">
                <Card className="neo-card h-full">
                  <div className="p-4 border-b border-[#00d4ff]/20">
                    <h4 className="font-mono text-[#C0C5CE] font-semibold">
                      {language === 'ar' ? 'لوحة المعلومات' : 'Info Panel'}
                    </h4>
                  </div>
                  
                  <div className="p-4 space-y-4">
                    {/* File info */}
                    {activeFile && (
                      <div>
                        <h5 className="text-sm font-semibold text-[#C0C5CE] font-mono mb-2">
                          {language === 'ar' ? 'معلومات الملف' : 'File Info'}
                        </h5>
                        <div className="space-y-1 text-xs font-mono">
                          <div className="flex justify-between">
                            <span className="text-[#C0C5CE]/70">Size:</span>
                            <span className="text-[#00d4ff]">{activeFile.size} bytes</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#C0C5CE]/70">Lines:</span>
                            <span className="text-[#00ff88]">{activeFile.content.split('\n').length}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#C0C5CE]/70">Language:</span>
                            <span className="text-yellow-400">{activeFile.language}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#C0C5CE]/70">Modified:</span>
                            <span className="text-purple-400">
                              {activeFile.lastModified.toLocaleTimeString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Errors and warnings */}
                    {activeFile && activeFile.errors.length > 0 && (
                      <div>
                        <h5 className="text-sm font-semibold text-[#C0C5CE] font-mono mb-2">
                          {language === 'ar' ? 'المشاكل' : 'Problems'}
                        </h5>
                        <div className="space-y-2">
                          {activeFile.errors.map((error, index) => (
                            <div key={index} className="p-2 bg-[#0B0D12] rounded border-l-2 border-red-400">
                              <div className="flex items-center space-x-2 mb-1">
                                <AlertTriangle className="w-3 h-3 text-red-400" />
                                <span className="text-xs text-red-400 font-mono">
                                  Line {error.line}:{error.column}
                                </span>
                              </div>
                              <p className="text-xs text-[#C0C5CE]/80 font-mono">{error.message}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Quick actions */}
                    <div>
                      <h5 className="text-sm font-semibold text-[#C0C5CE] font-mono mb-2">
                        {language === 'ar' ? 'إجراءات سريعة' : 'Quick Actions'}
                      </h5>
                      <div className="space-y-2">
                        <Button size="sm" className="w-full neo-button-outline">
                          <Search className="w-3 h-3 mr-1" />
                          Find & Replace
                        </Button>
                        <Button size="sm" className="w-full neo-button-ghost">
                          <GitCommit className="w-3 h-3 mr-1" />
                          Git Commit
                        </Button>
                        <Button size="sm" className="w-full neo-button-ghost">
                          <RefreshCw className="w-3 h-3 mr-1" />
                          Format Code
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* ✅ ENHANCED: AI Assistant */}
          {selectedView === 'ai-assistant' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-[#C0C5CE] font-mono">
                {language === 'ar' ? 'مساعد الذكاء الاصطناعي للكود' : 'AI Code Assistant'}
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {suggestions.map(suggestion => (
                  <Card key={suggestion.id} className="neo-interactive-card">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <Badge className={`${suggestion.type === 'optimization' ? 'bg-[#00ff88]/20 text-[#00ff88]' :
                                             suggestion.type === 'bug-fix' ? 'bg-red-400/20 text-red-400' :
                                             suggestion.type === 'refactor' ? 'bg-[#00d4ff]/20 text-[#00d4ff]' :
                                             'bg-purple-400/20 text-purple-400'} font-mono`}>
                              {suggestion.type.toUpperCase()}
                            </Badge>
                            <Badge className="bg-gradient-to-r from-purple-500 to-[#00d4ff] text-black text-xs font-mono">
                              AI SUGGESTED
                            </Badge>
                          </div>
                          
                          <h4 className="text-lg font-bold text-[#C0C5CE] font-mono mb-2">
                            {language === 'ar' ? suggestion.titleAr : suggestion.title}
                          </h4>
                          <p className="text-[#C0C5CE]/80 text-sm mb-3">
                            {language === 'ar' ? suggestion.descriptionAr : suggestion.description}
                          </p>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-xl font-mono text-[#00ff88] mb-1">
                            {suggestion.confidence}%
                          </div>
                          <div className="text-xs text-[#C0C5CE]/70 font-mono">
                            Confidence
                          </div>
                        </div>
                      </div>
                      
                      {/* Code comparison */}
                      <div className="space-y-4 mb-4">
                        <div>
                          <h5 className="text-sm font-semibold text-[#C0C5CE] font-mono mb-2">
                            {language === 'ar' ? 'الكود الحالي:' : 'Current Code:'}
                          </h5>
                          <pre className="bg-[#0B0D12] border border-red-400/30 rounded p-3 text-xs font-mono text-[#C0C5CE] overflow-x-auto">
                            {suggestion.originalCode}
                          </pre>
                        </div>
                        
                        <div>
                          <h5 className="text-sm font-semibold text-[#C0C5CE] font-mono mb-2">
                            {language === 'ar' ? 'الكود المقترح:' : 'Suggested Code:'}
                          </h5>
                          <pre className="bg-[#0B0D12] border border-[#00ff88]/30 rounded p-3 text-xs font-mono text-[#C0C5CE] overflow-x-auto">
                            {suggestion.suggestedCode}
                          </pre>
                        </div>
                      </div>
                      
                      {/* Performance impact */}
                      <div className="grid grid-cols-3 gap-4 text-xs font-mono mb-4">
                        <div>
                          <div className="text-[#C0C5CE]/70">Execution Time</div>
                          <div className={suggestion.performance.executionTime >= 0 ? 'text-red-400' : 'text-[#00ff88]'}>
                            {suggestion.performance.executionTime >= 0 ? '+' : ''}{suggestion.performance.executionTime}%
                          </div>
                        </div>
                        <div>
                          <div className="text-[#C0C5CE]/70">Memory Usage</div>
                          <div className={suggestion.performance.memoryUsage >= 0 ? 'text-red-400' : 'text-[#00ff88]'}>
                            {suggestion.performance.memoryUsage >= 0 ? '+' : ''}{suggestion.performance.memoryUsage}%
                          </div>
                        </div>
                        <div>
                          <div className="text-[#C0C5CE]/70">Code Quality</div>
                          <div className="text-[#00ff88]">
                            +{suggestion.performance.codeQuality}%
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-[#0B0D12] border border-[#00d4ff]/20 rounded p-3 mb-4">
                        <h5 className="text-sm font-semibold text-[#00d4ff] font-mono mb-1">
                          {language === 'ar' ? 'شرح التحسين:' : 'Optimization Explanation:'}
                        </h5>
                        <p className="text-sm text-[#C0C5CE]/90 font-mono">
                          {language === 'ar' ? suggestion.explanationAr : suggestion.explanation}
                        </p>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          className="flex-1 neo-button-primary"
                          disabled={!suggestion.applicable}
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {language === 'ar' ? 'تطبيق' : 'Apply'}
                        </Button>
                        
                        <Button size="sm" className="flex-1 neo-button-outline">
                          <Eye className="w-3 h-3 mr-1" />
                          {language === 'ar' ? 'معاينة' : 'Preview'}
                        </Button>
                        
                        <Button size="sm" className="neo-button-ghost">
                          <XCircle className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

        </div>
      </RTLContainer>
    </div>
  );
}