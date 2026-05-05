import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { 
  Code, 
  Upload, 
  Download, 
  Zap, 
  Brain, 
  Search, 
  Bug, 
  Shield, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Folder,
  RefreshCw,
  PlayCircle,
  Settings,
  BarChart3,
  Target,
  Lightbulb,
  Copy,
  Save,
  Eye,
  Edit,
  Trash2,
  Plus,
  ArrowRight,
  ArrowDown,
  ChevronRight,
  ChevronDown,
  Terminal,
  Layers,
  Globe,
  Smartphone,
  Monitor,
  Star,
  Award,
  Sparkles
} from 'lucide-react';

interface CodeIssue {
  id: string;
  type: 'error' | 'warning' | 'info' | 'performance' | 'security';
  severity: 'critical' | 'high' | 'medium' | 'low';
  message: string;
  file: string;
  line: number;
  column: number;
  suggestion: string;
  fixable: boolean;
  category: string;
}

interface AnalysisResult {
  summary: {
    totalIssues: number;
    critical: number;
    high: number;
    medium: number;
    low: number;
    performance: number;
    security: number;
    codeQuality: number;
  };
  files: {
    analyzed: number;
    withIssues: number;
    clean: number;
  };
  metrics: {
    complexity: number;
    maintainability: number;
    testCoverage: number;
    duplication: number;
  };
}

interface OptimizationSuggestion {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  effort: 'easy' | 'medium' | 'hard';
  category: string;
  beforeCode: string;
  afterCode: string;
  benefits: string[];
}

const CodeAnalyzer = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const [codeInput, setCodeInput] = useState(`// Your e-commerce website code
import React, { useState, useEffect } from 'react';

const ProductPage = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch('/api/products/' + productId)
      .then(response => response.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      });
  }, [productId]);

  if (loading) return <div>Loading...</div>;
  
  return (
    <div className="product-page">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <span className="price">${product.price}</span>
    </div>
  );
};

export default ProductPage;`);

  const [analysisResults] = useState<AnalysisResult>({
    summary: {
      totalIssues: 12,
      critical: 2,
      high: 4,
      medium: 5,
      low: 1,
      performance: 6,
      security: 3,
      codeQuality: 78
    },
    files: {
      analyzed: 45,
      withIssues: 23,
      clean: 22
    },
    metrics: {
      complexity: 6.4,
      maintainability: 72,
      testCoverage: 45,
      duplication: 8.2
    }
  });

  const [codeIssues] = useState<CodeIssue[]>([
    {
      id: '1',
      type: 'security',
      severity: 'critical',
      message: 'Potential XSS vulnerability: Unescaped user input',
      file: 'ProductReview.jsx',
      line: 23,
      column: 15,
      suggestion: 'Use proper input sanitization and escape user content',
      fixable: true,
      category: 'Security'
    },
    {
      id: '2',
      type: 'performance',
      severity: 'high',
      message: 'Unnecessary re-renders: Missing dependency in useEffect',
      file: 'ProductPage.jsx',
      line: 8,
      column: 5,
      suggestion: 'Add missing dependencies to useEffect dependency array',
      fixable: true,
      category: 'Performance'
    },
    {
      id: '3',
      type: 'error',
      severity: 'critical',
      message: 'TypeError: Cannot read property of undefined',
      file: 'CartComponent.jsx',
      line: 45,
      column: 12,
      suggestion: 'Add null/undefined checks before accessing object properties',
      fixable: true,
      category: 'Runtime Error'
    },
    {
      id: '4',
      type: 'warning',
      severity: 'medium',
      message: 'Unused variable: oldPrice',
      file: 'PriceDisplay.jsx',
      line: 12,
      column: 9,
      suggestion: 'Remove unused variable or implement discount logic',
      fixable: true,
      category: 'Code Quality'
    },
    {
      id: '5',
      type: 'performance',
      severity: 'high',
      message: 'Large bundle size: Consider code splitting',
      file: 'App.jsx',
      line: 1,
      column: 1,
      suggestion: 'Implement lazy loading for non-critical components',
      fixable: false,
      category: 'Bundle Optimization'
    },
    {
      id: '6',
      type: 'security',
      severity: 'medium',
      message: 'Missing input validation for user data',
      file: 'ContactForm.jsx',
      line: 34,
      column: 8,
      suggestion: 'Add client and server-side input validation',
      fixable: true,
      category: 'Input Validation'
    }
  ]);

  const [optimizations] = useState<OptimizationSuggestion[]>([
    {
      id: '1',
      title: 'Implement React.memo for Product Cards',
      description: 'Prevent unnecessary re-renders of product cards when parent component updates',
      impact: 'high',
      effort: 'easy',
      category: 'Performance',
      beforeCode: `const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>${product.price}</p>
    </div>
  );
};`,
      afterCode: `const ProductCard = React.memo(({ product }) => {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>${product.price}</p>
    </div>
  );
});`,
      benefits: ['37% faster rendering', 'Reduced CPU usage', 'Better user experience']
    },
    {
      id: '2',
      title: 'Add Error Boundaries',
      description: 'Gracefully handle JavaScript errors in React components',
      impact: 'high',
      effort: 'medium',
      category: 'Error Handling',
      beforeCode: `// No error handling
const App = () => {
  return <ProductList />;
};`,
      afterCode: `class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

const App = () => {
  return (
    <ErrorBoundary>
      <ProductList />
    </ErrorBoundary>
  );
};`,
      benefits: ['Better error handling', 'Improved user experience', 'Easier debugging']
    },
    {
      id: '3',
      title: 'Optimize Image Loading',
      description: 'Implement lazy loading and responsive images for better performance',
      impact: 'high',
      effort: 'medium',
      category: 'Performance',
      beforeCode: `<img src={product.image} alt={product.name} />`,
      afterCode: `<img 
  src={product.image} 
  alt={product.name}
  loading="lazy"
  srcSet={generateSrcSet(product.image)}
  sizes="(max-width: 768px) 100vw, 50vw"
/>`,
      benefits: ['45% faster page load', 'Reduced bandwidth usage', 'Better mobile performance']
    }
  ]);

  // Simulate code analysis
  const analyzeCode = async () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setAnalysisComplete(false);
    
    // Simulate analysis progress
    const stages = [
      'Parsing code structure...',
      'Analyzing syntax and patterns...',
      'Checking for security vulnerabilities...',
      'Evaluating performance issues...',
      'Running quality checks...',
      'Generating optimization suggestions...',
      'Finalizing analysis report...'
    ];
    
    for (let i = 0; i <= 100; i += 10) {
      setAnalysisProgress(i);
      await new Promise(resolve => setTimeout(resolve, 300));
    }
    
    setIsAnalyzing(false);
    setAnalysisComplete(true);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400 border-red-400 bg-red-400/10';
      case 'high': return 'text-orange-400 border-orange-400 bg-orange-400/10';
      case 'medium': return 'text-yellow-400 border-yellow-400 bg-yellow-400/10';
      case 'low': return 'text-blue-400 border-blue-400 bg-blue-400/10';
      default: return 'text-[#C0C5CE] border-[#C0C5CE]/20 bg-[#C0C5CE]/10';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'error': return <XCircle className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'security': return <Shield className="w-4 h-4" />;
      case 'performance': return <Zap className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  const IssueCard = ({ issue }: { issue: CodeIssue }) => (
    <Card className={`border ${getSeverityColor(issue.severity)}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            {getTypeIcon(issue.type)}
            <Badge variant="outline" className="font-mono text-xs">
              {issue.category}
            </Badge>
            <Badge variant="outline" className={`font-mono text-xs ${getSeverityColor(issue.severity)}`}>
              {issue.severity.toUpperCase()}
            </Badge>
          </div>
          {issue.fixable && (
            <Button size="sm" variant="outline" className="font-mono">
              Auto Fix
            </Button>
          )}
        </div>
        
        <h4 className="text-[#C0C5CE] font-mono font-medium mb-2">{issue.message}</h4>
        <p className="text-[#C0C5CE]/70 font-mono text-sm mb-3">{issue.suggestion}</p>
        
        <div className="flex items-center justify-between text-[#C0C5CE]/60 font-mono text-xs">
          <span>{issue.file}:{issue.line}:{issue.column}</span>
          <Button size="sm" variant="ghost" className="font-mono">
            <Eye className="w-3 h-3 mr-1" />
            View
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const OptimizationCard = ({ optimization }: { optimization: OptimizationSuggestion }) => {
    const [expanded, setExpanded] = useState(false);
    
    const getImpactColor = (impact: string) => {
      switch (impact) {
        case 'high': return 'text-[#4AE54A] border-[#4AE54A]';
        case 'medium': return 'text-yellow-400 border-yellow-400';
        case 'low': return 'text-blue-400 border-blue-400';
        default: return 'text-[#C0C5CE] border-[#C0C5CE]/20';
      }
    };

    const getEffortColor = (effort: string) => {
      switch (effort) {
        case 'easy': return 'text-[#4AE54A] border-[#4AE54A]';
        case 'medium': return 'text-yellow-400 border-yellow-400';
        case 'hard': return 'text-red-400 border-red-400';
        default: return 'text-[#C0C5CE] border-[#C0C5CE]/20';
      }
    };

    return (
      <Card className="bg-[#12151C] border-[#4AE54A]/20">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h4 className="text-[#C0C5CE] font-mono font-medium mb-1">{optimization.title}</h4>
              <p className="text-[#C0C5CE]/70 font-mono text-sm">{optimization.description}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className={`font-mono text-xs ${getImpactColor(optimization.impact)}`}>
                {optimization.impact} impact
              </Badge>
              <Badge variant="outline" className={`font-mono text-xs ${getEffortColor(optimization.effort)}`}>
                {optimization.effort}
              </Badge>
            </div>
          </div>

          {/* Benefits */}
          <div className="space-y-1 mb-3">
            {optimization.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-2">
                <CheckCircle className="w-3 h-3 text-[#4AE54A]" />
                <span className="text-[#C0C5CE]/70 font-mono text-xs">{benefit}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpanded(!expanded)}
              className="font-mono text-[#C0C5CE]/70"
            >
              {expanded ? <ChevronDown className="w-4 h-4 mr-1" /> : <ChevronRight className="w-4 h-4 mr-1" />}
              {expanded ? 'Hide Code' : 'Show Code'}
            </Button>
            <Button size="sm" className="bg-[#4AE54A] text-[#0B0D12] hover:bg-[#4AE54A]/90 font-mono">
              Apply Fix
            </Button>
          </div>

          {expanded && (
            <div className="mt-4 space-y-3">
              <div>
                <h5 className="text-[#C0C5CE]/70 font-mono text-sm mb-2">Before:</h5>
                <pre className="bg-[#0B0D12] border border-[#C0C5CE]/20 rounded p-3 overflow-x-auto">
                  <code className="text-[#C0C5CE] font-mono text-xs">{optimization.beforeCode}</code>
                </pre>
              </div>
              <div>
                <h5 className="text-[#4AE54A] font-mono text-sm mb-2">After:</h5>
                <pre className="bg-[#0B0D12] border border-[#4AE54A]/30 rounded p-3 overflow-x-auto">
                  <code className="text-[#C0C5CE] font-mono text-xs">{optimization.afterCode}</code>
                </pre>
              </div>
            </div>
          )}
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
            <h1 className="text-3xl font-mono text-[#4AE54A] mb-2 flex items-center">
              <Code className="w-8 h-8 mr-3" />
              AI Code Analyzer & Optimizer
            </h1>
            <p className="text-[#C0C5CE]/70 font-mono">Intelligent code analysis for e-commerce platforms</p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="border-[#4AE54A] text-[#4AE54A] font-mono neural-pulse">
              {analysisComplete ? 'Analysis Complete' : 'Ready to Analyze'}
            </Badge>
          </div>
        </div>

        {/* Code Input & Upload */}
        <Card className="bg-[#12151C] border-[#4AE54A]/20">
          <CardHeader>
            <CardTitle className="text-[#4AE54A] font-mono">Code Input</CardTitle>
            <CardDescription className="text-[#C0C5CE]/70 font-mono">
              Upload files or paste your code for instant analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="paste" className="space-y-4">
              <TabsList className="bg-[#0B0D12] border border-[#4AE54A]/20">
                <TabsTrigger value="paste" className="font-mono">Paste Code</TabsTrigger>
                <TabsTrigger value="upload" className="font-mono">Upload Files</TabsTrigger>
                <TabsTrigger value="github" className="font-mono">GitHub Repo</TabsTrigger>
              </TabsList>

              <TabsContent value="paste" className="space-y-4">
                <Textarea
                  value={codeInput}
                  onChange={(e) => setCodeInput(e.target.value)}
                  placeholder="Paste your e-commerce code here..."
                  className="bg-[#0B0D12] border-[#4AE54A]/30 text-[#C0C5CE] font-mono text-sm min-h-[300px]"
                />
                <div className="flex justify-between">
                  <div className="text-[#C0C5CE]/60 font-mono text-sm">
                    {codeInput.split('\n').length} lines, {codeInput.length} characters
                  </div>
                  <Button 
                    onClick={analyzeCode}
                    disabled={isAnalyzing || !codeInput.trim()}
                    className="bg-[#4AE54A] text-[#0B0D12] hover:bg-[#4AE54A]/90 font-mono"
                  >
                    {isAnalyzing ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Brain className="w-4 h-4 mr-2" />
                        Analyze Code
                      </>
                    )}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="upload" className="space-y-4">
                <div className="border-2 border-dashed border-[#4AE54A]/30 rounded-lg p-8 text-center hover:border-[#4AE54A]/50 transition-colors">
                  <Upload className="w-12 h-12 text-[#4AE54A] mx-auto mb-4" />
                  <h3 className="text-[#C0C5CE] font-mono font-medium mb-2">Drop files here</h3>
                  <p className="text-[#C0C5CE]/70 font-mono text-sm mb-4">
                    Supports .js, .jsx, .ts, .tsx, .html, .css, .php files
                  </p>
                  <Button variant="outline" className="border-[#4AE54A] text-[#4AE54A] hover:bg-[#4AE54A]/10 font-mono">
                    Browse Files
                  </Button>
                </div>
                
                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-[#C0C5CE] font-mono font-medium">Uploaded Files:</h4>
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-[#0B0D12] rounded border border-[#4AE54A]/20">
                        <div className="flex items-center space-x-2">
                          <FileText className="w-4 h-4 text-[#4AE54A]" />
                          <span className="text-[#C0C5CE] font-mono text-sm">{file}</span>
                        </div>
                        <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="github" className="space-y-4">
                <div className="space-y-3">
                  <Input
                    placeholder="https://github.com/username/repository"
                    className="bg-[#0B0D12] border-[#4AE54A]/30 text-[#C0C5CE] font-mono"
                  />
                  <Button className="w-full bg-[#4AE54A] text-[#0B0D12] hover:bg-[#4AE54A]/90 font-mono">
                    <Globe className="w-4 h-4 mr-2" />
                    Connect Repository
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Analysis Progress */}
        {isAnalyzing && (
          <Card className="bg-[#12151C] border-yellow-400/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <RefreshCw className="w-6 h-6 text-yellow-400 animate-spin" />
                <div>
                  <h3 className="text-yellow-400 font-mono font-medium">AI Code Analysis in Progress</h3>
                  <p className="text-[#C0C5CE]/70 font-mono text-sm">Deep scanning your code for issues and optimizations...</p>
                </div>
              </div>
              <Progress value={analysisProgress} className="h-3" />
              <p className="text-[#C0C5CE]/60 font-mono text-sm mt-2">{analysisProgress}% Complete</p>
            </CardContent>
          </Card>
        )}

        {/* Analysis Results */}
        {analysisComplete && (
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="bg-[#12151C] border border-[#4AE54A]/20">
              <TabsTrigger value="overview" className="font-mono">Overview</TabsTrigger>
              <TabsTrigger value="issues" className="font-mono">Issues</TabsTrigger>
              <TabsTrigger value="optimizations" className="font-mono">Optimizations</TabsTrigger>
              <TabsTrigger value="metrics" className="font-mono">Metrics</TabsTrigger>
              <TabsTrigger value="report" className="font-mono">Report</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-[#12151C] border-[#4AE54A]/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[#C0C5CE]/70 font-mono text-sm">Total Issues</p>
                        <p className="text-2xl text-red-400 font-mono font-medium">{analysisResults.summary.totalIssues}</p>
                      </div>
                      <Bug className="w-8 h-8 text-red-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#12151C] border-[#4AE54A]/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[#C0C5CE]/70 font-mono text-sm">Code Quality</p>
                        <p className="text-2xl text-[#4AE54A] font-mono font-medium">{analysisResults.summary.codeQuality}%</p>
                      </div>
                      <Star className="w-8 h-8 text-[#4AE54A]" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#12151C] border-[#4AE54A]/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[#C0C5CE]/70 font-mono text-sm">Files Analyzed</p>
                        <p className="text-2xl text-[#4AE54A] font-mono font-medium">{analysisResults.files.analyzed}</p>
                      </div>
                      <FileText className="w-8 h-8 text-[#4AE54A]" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#12151C] border-[#4AE54A]/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[#C0C5CE]/70 font-mono text-sm">Performance Score</p>
                        <p className="text-2xl text-[#4AE54A] font-mono font-medium">87%</p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-[#4AE54A]" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Issue Distribution */}
              <Card className="bg-[#12151C] border-[#4AE54A]/20">
                <CardHeader>
                  <CardTitle className="text-[#4AE54A] font-mono">Issue Distribution</CardTitle>
                  <CardDescription className="text-[#C0C5CE]/70 font-mono">
                    Breakdown of issues by severity level
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-red-400 rounded"></div>
                        <span className="text-[#C0C5CE] font-mono">Critical</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-32 bg-[#0B0D12] rounded-full h-2">
                          <div className="bg-red-400 h-2 rounded-full" style={{ width: `${(analysisResults.summary.critical / analysisResults.summary.totalIssues) * 100}%` }}></div>
                        </div>
                        <span className="text-red-400 font-mono text-sm">{analysisResults.summary.critical}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-orange-400 rounded"></div>
                        <span className="text-[#C0C5CE] font-mono">High</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-32 bg-[#0B0D12] rounded-full h-2">
                          <div className="bg-orange-400 h-2 rounded-full" style={{ width: `${(analysisResults.summary.high / analysisResults.summary.totalIssues) * 100}%` }}></div>
                        </div>
                        <span className="text-orange-400 font-mono text-sm">{analysisResults.summary.high}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-yellow-400 rounded"></div>
                        <span className="text-[#C0C5CE] font-mono">Medium</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-32 bg-[#0B0D12] rounded-full h-2">
                          <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${(analysisResults.summary.medium / analysisResults.summary.totalIssues) * 100}%` }}></div>
                        </div>
                        <span className="text-yellow-400 font-mono text-sm">{analysisResults.summary.medium}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-blue-400 rounded"></div>
                        <span className="text-[#C0C5CE] font-mono">Low</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-32 bg-[#0B0D12] rounded-full h-2">
                          <div className="bg-blue-400 h-2 rounded-full" style={{ width: `${(analysisResults.summary.low / analysisResults.summary.totalIssues) * 100}%` }}></div>
                        </div>
                        <span className="text-blue-400 font-mono text-sm">{analysisResults.summary.low}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="issues" className="space-y-6">
              {/* Filters */}
              <Card className="bg-[#12151C] border-[#4AE54A]/20">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-[#C0C5CE]/70 font-mono text-sm">Filter:</span>
                      <Button size="sm" variant="outline" className="font-mono">All</Button>
                      <Button size="sm" variant="ghost" className="font-mono">Critical</Button>
                      <Button size="sm" variant="ghost" className="font-mono">Security</Button>
                      <Button size="sm" variant="ghost" className="font-mono">Performance</Button>
                    </div>
                    <div className="flex-1"></div>
                    <Button size="sm" className="bg-[#4AE54A] text-[#0B0D12] hover:bg-[#4AE54A]/90 font-mono">
                      Fix All Auto-Fixable
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Issues List */}
              <div className="space-y-4">
                {codeIssues.map((issue) => (
                  <IssueCard key={issue.id} issue={issue} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="optimizations" className="space-y-6">
              <Card className="bg-[#12151C] border-[#4AE54A]/20">
                <CardHeader>
                  <CardTitle className="text-[#4AE54A] font-mono flex items-center">
                    <Lightbulb className="w-5 h-5 mr-2" />
                    AI-Powered Optimizations
                  </CardTitle>
                  <CardDescription className="text-[#C0C5CE]/70 font-mono">
                    Intelligent suggestions to improve your code performance and quality
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {optimizations.map((optimization) => (
                      <OptimizationCard key={optimization.id} optimization={optimization} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="metrics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-[#12151C] border-[#4AE54A]/20">
                  <CardHeader>
                    <CardTitle className="text-[#4AE54A] font-mono">Code Metrics</CardTitle>
                    <CardDescription className="text-[#C0C5CE]/70 font-mono">
                      Technical debt and complexity analysis
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-[#C0C5CE]/70 font-mono text-sm">Complexity</span>
                        <span className="text-[#4AE54A] font-mono text-sm">{analysisResults.metrics.complexity}/10</span>
                      </div>
                      <Progress value={analysisResults.metrics.complexity * 10} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-[#C0C5CE]/70 font-mono text-sm">Maintainability</span>
                        <span className="text-[#4AE54A] font-mono text-sm">{analysisResults.metrics.maintainability}%</span>
                      </div>
                      <Progress value={analysisResults.metrics.maintainability} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-[#C0C5CE]/70 font-mono text-sm">Test Coverage</span>
                        <span className="text-yellow-400 font-mono text-sm">{analysisResults.metrics.testCoverage}%</span>
                      </div>
                      <Progress value={analysisResults.metrics.testCoverage} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-[#C0C5CE]/70 font-mono text-sm">Code Duplication</span>
                        <span className="text-orange-400 font-mono text-sm">{analysisResults.metrics.duplication}%</span>
                      </div>
                      <Progress value={analysisResults.metrics.duplication} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#12151C] border-[#4AE54A]/20">
                  <CardHeader>
                    <CardTitle className="text-[#4AE54A] font-mono">File Analysis</CardTitle>
                    <CardDescription className="text-[#C0C5CE]/70 font-mono">
                      Overview of analyzed files and their status
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-[#0B0D12] rounded">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-[#4AE54A]" />
                        <span className="text-[#C0C5CE] font-mono">Clean Files</span>
                      </div>
                      <span className="text-[#4AE54A] font-mono">{analysisResults.files.clean}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-[#0B0D12] rounded">
                      <div className="flex items-center space-x-3">
                        <AlertTriangle className="w-5 h-5 text-orange-400" />
                        <span className="text-[#C0C5CE] font-mono">Files with Issues</span>
                      </div>
                      <span className="text-orange-400 font-mono">{analysisResults.files.withIssues}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-[#0B0D12] rounded">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-[#C0C5CE]" />
                        <span className="text-[#C0C5CE] font-mono">Total Analyzed</span>
                      </div>
                      <span className="text-[#C0C5CE] font-mono">{analysisResults.files.analyzed}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="report" className="space-y-6">
              <Card className="bg-[#12151C] border-[#4AE54A]/20">
                <CardHeader>
                  <CardTitle className="text-[#4AE54A] font-mono">Analysis Report</CardTitle>
                  <CardDescription className="text-[#C0C5CE]/70 font-mono">
                    Download detailed analysis report for your team
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <div className="mb-6">
                      <div className="w-16 h-16 bg-[#4AE54A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText className="w-8 h-8 text-[#4AE54A]" />
                      </div>
                      <h3 className="text-xl text-[#C0C5CE] font-mono font-medium mb-2">Comprehensive Report</h3>
                      <p className="text-[#C0C5CE]/70 font-mono">
                        Detailed PDF report with all findings, recommendations, and code examples
                      </p>
                    </div>
                    <div className="flex justify-center space-x-4">
                      <Button className="bg-[#4AE54A] text-[#0B0D12] hover:bg-[#4AE54A]/90 font-mono">
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF Report
                      </Button>
                      <Button variant="outline" className="border-[#4AE54A] text-[#4AE54A] hover:bg-[#4AE54A]/10 font-mono">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share Report
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default CodeAnalyzer;