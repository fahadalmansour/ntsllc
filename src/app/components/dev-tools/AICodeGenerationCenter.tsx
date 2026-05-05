import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { useLanguage } from '../../contexts/LanguageContext';
import { RTLContainer } from '../LanguageSwitcher';
import { 
  Code, 
  Bot,
  Sparkles,
  FileCode,
  GitBranch,
  Download,
  Copy,
  Play,
  Pause,
  RotateCcw,
  Settings,
  Brain,
  Zap,
  Terminal,
  Cpu,
  Database,
  Globe,
  Shield,
  Layers,
  CheckCircle,
  AlertTriangle,
  Clock,
  TrendingUp,
  Search,
  Filter,
  Upload,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';

interface CodeTemplate {
  id: string;
  name: string;
  description: string;
  category: 'react' | 'nodejs' | 'python' | 'typescript' | 'database' | 'api';
  complexity: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  framework: string;
  estimatedTime: string;
  tags: string[];
  code: string;
  dependencies: string[];
  usage: number;
  rating: number;
}

interface GenerationRequest {
  id: string;
  prompt: string;
  language: string;
  framework: string;
  complexity: string;
  status: 'pending' | 'generating' | 'completed' | 'error';
  progress: number;
  startTime: Date;
  estimatedTime: number;
  result?: string;
  feedback?: {
    rating: number;
    comment: string;
  };
}

interface AIModel {
  id: string;
  name: string;
  description: string;
  specialization: string[];
  accuracy: number;
  speed: string;
  status: 'active' | 'training' | 'offline';
}

export default function AICodeGenerationCenter({ onNavigate }: { onNavigate?: (section: string) => void }) {
  const { isRTL, language } = useLanguage();
  
  const [activeTab, setActiveTab] = useState<'generate' | 'templates' | 'history' | 'models'>('generate');
  const [prompt, setPrompt] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('typescript');
  const [selectedFramework, setSelectedFramework] = useState('react');
  const [selectedComplexity, setSelectedComplexity] = useState('intermediate');
  const [generationInProgress, setGenerationInProgress] = useState(false);
  
  const [aiModels, setAiModels] = useState<AIModel[]>([
    {
      id: 'neocode-primary',
      name: 'NeoCode Primary',
      description: 'Advanced code generation with enterprise patterns',
      specialization: ['React', 'TypeScript', 'Node.js', 'Database Design'],
      accuracy: 94.7,
      speed: 'Fast',
      status: 'active'
    },
    {
      id: 'neocode-backend',
      name: 'NeoCode Backend',
      description: 'Specialized in API development and database optimization',
      specialization: ['API Design', 'Database', 'Microservices', 'Security'],
      accuracy: 92.3,
      speed: 'Medium',
      status: 'active'
    },
    {
      id: 'neocode-frontend',
      name: 'NeoCode Frontend',
      description: 'UI/UX focused code generation with modern frameworks',
      specialization: ['React', 'Vue', 'Angular', 'CSS Frameworks'],
      accuracy: 96.1,
      speed: 'Very Fast',
      status: 'active'
    }
  ]);

  const [codeTemplates, setCodeTemplates] = useState<CodeTemplate[]>([
    {
      id: 'react-dashboard',
      name: 'React Dashboard Component',
      description: 'Complete dashboard with analytics and charts',
      category: 'react',
      complexity: 'intermediate',
      framework: 'React + TypeScript',
      estimatedTime: '15-30 min',
      tags: ['dashboard', 'analytics', 'charts', 'responsive'],
      code: `import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  data: any[];
  title: string;
}

export function Dashboard({ data, title }: DashboardProps) {
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    activeUsers: 0,
    revenue: 0,
    growth: 0
  });

  useEffect(() => {
    // Calculate metrics from data
    setMetrics({
      totalUsers: data.length,
      activeUsers: data.filter(d => d.active).length,
      revenue: data.reduce((sum, d) => sum + d.revenue, 0),
      growth: 12.5
    });
  }, [data]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-6">
      <h1 className="text-3xl font-bold text-[#C0C5CE] mb-8">{title}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="neo-dashboard-widget">
          <div className="p-6">
            <div className="text-2xl font-bold text-[#00d4ff]">{metrics.totalUsers}</div>
            <div className="text-[#C0C5CE]/70">Total Users</div>
          </div>
        </Card>
        {/* More dashboard widgets */}
      </div>
      
      <Card className="neo-card">
        <div className="p-6">
          <h3 className="text-xl font-semibold text-[#C0C5CE] mb-4">Analytics Chart</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="date" stroke="#C0C5CE" />
              <YAxis stroke="#C0C5CE" />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#00d4ff" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}`,
      dependencies: ['recharts', 'react', '@types/react'],
      usage: 1247,
      rating: 4.8
    },
    {
      id: 'nodejs-api',
      name: 'Node.js REST API',
      description: 'Enterprise-grade API with authentication and validation',
      category: 'nodejs',
      complexity: 'advanced',
      framework: 'Express + TypeScript',
      estimatedTime: '45-60 min',
      tags: ['api', 'express', 'authentication', 'validation'],
      code: `import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { body, validationResult } from 'express-validator';

const app = express();
app.use(express.json());

interface User {
  id: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
}

// In-memory store (use database in production)
const users: User[] = [];

// Middleware
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'secret', (err: any, user: any) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Routes
app.post('/api/register', [
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  
  // Check if user exists
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: 'User already exists' });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const user: User = {
    id: Date.now().toString(),
    email,
    password: hashedPassword,
    role: 'user'
  };
  
  users.push(user);
  
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '24h' }
  );
  
  res.status(201).json({ token, user: { id: user.id, email: user.email, role: user.role } });
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }
  
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }
  
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '24h' }
  );
  
  res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
});

app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Protected route accessed', user: req.user });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`,
      dependencies: ['express', 'jsonwebtoken', 'bcryptjs', 'express-validator', '@types/express'],
      usage: 892,
      rating: 4.9
    },
    {
      id: 'python-ml',
      name: 'Python ML Model',
      description: 'Machine learning model with data preprocessing',
      category: 'python',
      complexity: 'expert',
      framework: 'TensorFlow + Pandas',
      estimatedTime: '60-120 min',
      tags: ['machine-learning', 'tensorflow', 'data-science'],
      code: `import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import joblib

class MLPipeline:
    def __init__(self):
        self.model = RandomForestClassifier(n_estimators=100, random_state=42)
        self.scaler = StandardScaler()
        self.is_trained = False
    
    def load_data(self, file_path: str) -> pd.DataFrame:
        """Load and preprocess data"""
        try:
            data = pd.read_csv(file_path)
            print(f"Data loaded successfully: {data.shape}")
            return data
        except Exception as e:
            print(f"Error loading data: {e}")
            return None
    
    def preprocess_data(self, data: pd.DataFrame, target_column: str):
        """Preprocess the data for training"""
        # Handle missing values
        data = data.fillna(data.mean())
        
        # Separate features and target
        X = data.drop(columns=[target_column])
        y = data[target_column]
        
        # Split the data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42, stratify=y
        )
        
        # Scale features
        X_train_scaled = self.scaler.fit_transform(X_train)
        X_test_scaled = self.scaler.transform(X_test)
        
        return X_train_scaled, X_test_scaled, y_train, y_test
    
    def train(self, X_train, y_train):
        """Train the model"""
        print("Training model...")
        self.model.fit(X_train, y_train)
        self.is_trained = True
        print("Model trained successfully!")
    
    def evaluate(self, X_test, y_test):
        """Evaluate the model"""
        if not self.is_trained:
            raise Exception("Model must be trained before evaluation")
        
        predictions = self.model.predict(X_test)
        accuracy = accuracy_score(y_test, predictions)
        
        print(f"Accuracy: {accuracy:.4f}")
        print("\nClassification Report:")
        print(classification_report(y_test, predictions))
        
        return accuracy, predictions
    
    def predict(self, X):
        """Make predictions"""
        if not self.is_trained:
            raise Exception("Model must be trained before prediction")
        
        X_scaled = self.scaler.transform(X)
        return self.model.predict(X_scaled)
    
    def save_model(self, filepath: str):
        """Save the trained model"""
        if not self.is_trained:
            raise Exception("Model must be trained before saving")
        
        model_data = {
            'model': self.model,
            'scaler': self.scaler
        }
        joblib.dump(model_data, filepath)
        print(f"Model saved to {filepath}")
    
    def load_model(self, filepath: str):
        """Load a trained model"""
        model_data = joblib.load(filepath)
        self.model = model_data['model']
        self.scaler = model_data['scaler']
        self.is_trained = True
        print(f"Model loaded from {filepath}")

# Example usage
if __name__ == "__main__":
    pipeline = MLPipeline()
    
    # Load and preprocess data
    data = pipeline.load_data("your_dataset.csv")
    if data is not None:
        X_train, X_test, y_train, y_test = pipeline.preprocess_data(data, "target_column")
        
        # Train and evaluate
        pipeline.train(X_train, y_train)
        accuracy, predictions = pipeline.evaluate(X_test, y_test)
        
        # Save model
        pipeline.save_model("trained_model.pkl")`,
      dependencies: ['pandas', 'numpy', 'scikit-learn', 'joblib'],
      usage: 523,
      rating: 4.7
    }
  ]);

  const [generationHistory, setGenerationHistory] = useState<GenerationRequest[]>([
    {
      id: 'gen-001',
      prompt: 'Create a React component for user authentication with TypeScript',
      language: 'typescript',
      framework: 'react',
      complexity: 'intermediate',
      status: 'completed',
      progress: 100,
      startTime: new Date(Date.now() - 1800000),
      estimatedTime: 120,
      result: 'Generated successfully with 247 lines of code',
      feedback: { rating: 5, comment: 'Perfect implementation with proper TypeScript types' }
    },
    {
      id: 'gen-002',
      prompt: 'Build a Node.js API for handling file uploads with validation',
      language: 'javascript',
      framework: 'nodejs',
      complexity: 'advanced',
      status: 'completed',
      progress: 100,
      startTime: new Date(Date.now() - 3600000),
      estimatedTime: 180,
      result: 'Generated with Express.js and Multer integration',
      feedback: { rating: 4, comment: 'Good implementation, could use more error handling' }
    },
    {
      id: 'gen-003',
      prompt: 'Create a Python script for data analysis with pandas',
      language: 'python',
      framework: 'pandas',
      complexity: 'beginner',
      status: 'generating',
      progress: 67,
      startTime: new Date(Date.now() - 300000),
      estimatedTime: 90
    }
  ]);

  const [selectedModel, setSelectedModel] = useState('neocode-primary');

  // Simulate AI generation
  const handleGenerate = useCallback(() => {
    if (!prompt.trim()) return;

    setGenerationInProgress(true);
    
    const newRequest: GenerationRequest = {
      id: `gen-${Date.now()}`,
      prompt,
      language: selectedLanguage,
      framework: selectedFramework,
      complexity: selectedComplexity,
      status: 'generating',
      progress: 0,
      startTime: new Date(),
      estimatedTime: getEstimatedTime(selectedComplexity)
    };

    setGenerationHistory(prev => [newRequest, ...prev]);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setGenerationHistory(prev => prev.map(req => {
        if (req.id === newRequest.id && req.status === 'generating') {
          const newProgress = Math.min(100, req.progress + Math.random() * 15);
          if (newProgress >= 100) {
            clearInterval(progressInterval);
            setGenerationInProgress(false);
            return {
              ...req,
              status: 'completed' as const,
              progress: 100,
              result: `Generated ${Math.floor(Math.random() * 500) + 100} lines of optimized ${selectedLanguage} code`
            };
          }
          return { ...req, progress: newProgress };
        }
        return req;
      }));
    }, 500);

    // Clear form
    setPrompt('');
  }, [prompt, selectedLanguage, selectedFramework, selectedComplexity]);

  const getEstimatedTime = (complexity: string) => {
    switch (complexity) {
      case 'beginner': return 60;
      case 'intermediate': return 120;
      case 'advanced': return 180;
      case 'expert': return 300;
      default: return 120;
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'beginner': return 'bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]/30';
      case 'intermediate': return 'bg-[#00d4ff]/20 text-[#00d4ff] border-[#00d4ff]/30';
      case 'advanced': return 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30';
      case 'expert': return 'bg-red-400/20 text-red-400 border-red-400/30';
      default: return 'bg-[#C0C5CE]/20 text-[#C0C5CE] border-[#C0C5CE]/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]/30';
      case 'generating': return 'bg-[#00d4ff]/20 text-[#00d4ff] border-[#00d4ff]/30';
      case 'pending': return 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30';
      case 'error': return 'bg-red-400/20 text-red-400 border-red-400/30';
      default: return 'bg-[#C0C5CE]/20 text-[#C0C5CE] border-[#C0C5CE]/30';
    }
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m ${seconds % 60}s`;
  };

  const renderGenerateTab = () => (
    <div className="space-y-6">
      {/* AI Model Selection */}
      <Card className="neo-card">
        <div className="p-6">
          <h3 className="text-[#00ff88] font-mono text-lg mb-4">
            {language === 'ar' ? 'اختيار نموذج الذكاء الاصطناعي' : 'AI Model Selection'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {aiModels.map(model => (
              <div 
                key={model.id}
                className={`neo-interactive-card p-4 cursor-pointer ${
                  selectedModel === model.id ? 'border-[#00d4ff]' : ''
                }`}
                onClick={() => setSelectedModel(model.id)}
              >
                <div className="neo-flex-between mb-3">
                  <div className="text-[#C0C5CE] font-semibold">{model.name}</div>
                  <Badge className={model.status === 'active' ? 'bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]/30' : 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30'}>
                    {model.status}
                  </Badge>
                </div>
                
                <p className="text-[#C0C5CE]/80 text-sm mb-3">{model.description}</p>
                
                <div className="space-y-2 text-xs">
                  <div className="neo-flex-between">
                    <span className="text-[#C0C5CE]/70">Accuracy:</span>
                    <span className="text-[#00ff88]">{model.accuracy}%</span>
                  </div>
                  <div className="neo-flex-between">
                    <span className="text-[#C0C5CE]/70">Speed:</span>
                    <span className="text-[#00d4ff]">{model.speed}</span>
                  </div>
                </div>
                
                <div className="mt-3">
                  <div className="text-xs text-[#C0C5CE]/70 mb-1">Specializations:</div>
                  <div className="flex flex-wrap gap-1">
                    {model.specialization.slice(0, 2).map(spec => (
                      <Badge key={spec} className="bg-[#00d4ff]/10 text-[#00d4ff] border-[#00d4ff]/20 text-xs">
                        {spec}
                      </Badge>
                    ))}
                    {model.specialization.length > 2 && (
                      <Badge className="bg-[#C0C5CE]/10 text-[#C0C5CE] border-[#C0C5CE]/20 text-xs">
                        +{model.specialization.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Code Generation Form */}
      <Card className="neo-card">
        <div className="p-6">
          <h3 className="text-[#00ff88] font-mono text-lg mb-6">
            {language === 'ar' ? 'إنشاء الكود بالذكاء الاصطناعي' : 'AI Code Generation'}
          </h3>
          
          <div className="space-y-6">
            {/* Prompt Input */}
            <div>
              <label className="neo-form-label required">
                {language === 'ar' ? 'وصف المطلوب' : 'Description'}
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={language === 'ar' 
                  ? 'اكتب وصفاً مفصلاً للكود المطلوب...'
                  : 'Describe the code you want to generate in detail...'
                }
                className="neo-form-textarea"
                rows={4}
              />
            </div>

            {/* Configuration */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="neo-form-label">
                  {language === 'ar' ? 'لغة البرمجة' : 'Programming Language'}
                </label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="neo-form-select"
                >
                  <option value="typescript">TypeScript</option>
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                  <option value="go">Go</option>
                  <option value="rust">Rust</option>
                </select>
              </div>

              <div>
                <label className="neo-form-label">
                  {language === 'ar' ? 'الإطار' : 'Framework'}
                </label>
                <select
                  value={selectedFramework}
                  onChange={(e) => setSelectedFramework(e.target.value)}
                  className="neo-form-select"
                >
                  <option value="react">React</option>
                  <option value="nodejs">Node.js</option>
                  <option value="nextjs">Next.js</option>
                  <option value="express">Express</option>
                  <option value="fastapi">FastAPI</option>
                  <option value="django">Django</option>
                </select>
              </div>

              <div>
                <label className="neo-form-label">
                  {language === 'ar' ? 'مستوى التعقيد' : 'Complexity Level'}
                </label>
                <select
                  value={selectedComplexity}
                  onChange={(e) => setSelectedComplexity(e.target.value)}
                  className="neo-form-select"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
              </div>
            </div>

            {/* Generate Button */}
            <div className="neo-flex-between">
              <div className="text-sm text-[#C0C5CE]/70">
                {language === 'ar' 
                  ? `الوقت المتوقع: ${formatDuration(getEstimatedTime(selectedComplexity))}`
                  : `Estimated time: ${formatDuration(getEstimatedTime(selectedComplexity))}`
                }
              </div>
              
              <Button 
                className="neo-button-primary"
                onClick={handleGenerate}
                disabled={!prompt.trim() || generationInProgress}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {generationInProgress 
                  ? (language === 'ar' ? 'جاري الإنشاء...' : 'Generating...')
                  : (language === 'ar' ? 'إنشاء الكود' : 'Generate Code')
                }
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderTemplatesTab = () => (
    <div className="space-y-6">
      <div className="neo-flex-between">
        <h3 className="text-[#00ff88] font-mono text-xl">
          {language === 'ar' ? 'قوالب الكود' : 'Code Templates'}
        </h3>
        <div className="neo-flex-start neo-space-sm">
          <Search className="w-4 h-4 text-[#C0C5CE]/70" />
          <input
            type="text"
            placeholder={language === 'ar' ? 'البحث في القوالب...' : 'Search templates...'}
            className="neo-form-input w-64"
          />
          <Filter className="w-4 h-4 text-[#C0C5CE]/70" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {codeTemplates.map(template => (
          <Card key={template.id} className="neo-interactive-card">
            <div className="p-6">
              <div className="neo-flex-between mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-[#C0C5CE] mb-2">
                    {template.name}
                  </h4>
                  <p className="text-[#C0C5CE]/80 text-sm">
                    {template.description}
                  </p>
                </div>
                <Badge className={getComplexityColor(template.complexity)}>
                  {template.complexity}
                </Badge>
              </div>

              <div className="space-y-3 mb-4">
                <div className="neo-flex-between text-sm">
                  <span className="text-[#C0C5CE]/70">Framework:</span>
                  <span className="text-[#00d4ff]">{template.framework}</span>
                </div>
                <div className="neo-flex-between text-sm">
                  <span className="text-[#C0C5CE]/70">Est. Time:</span>
                  <span className="text-[#00ff88]">{template.estimatedTime}</span>
                </div>
                <div className="neo-flex-between text-sm">
                  <span className="text-[#C0C5CE]/70">Usage:</span>
                  <span className="text-[#C0C5CE]">{template.usage}</span>
                </div>
                <div className="neo-flex-between text-sm">
                  <span className="text-[#C0C5CE]/70">Rating:</span>
                  <div className="neo-flex-start neo-space-xs">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-yellow-400">{template.rating}</span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {template.tags.map(tag => (
                    <Badge key={tag} className="bg-[#00d4ff]/10 text-[#00d4ff] border-[#00d4ff]/20 text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="neo-flex-between">
                <div className="neo-flex-start neo-space-sm">
                  <Button className="neo-button-outline text-sm">
                    <Eye className="w-3 h-3 mr-1" />
                    Preview
                  </Button>
                  <Button className="neo-button-ghost text-sm">
                    <Copy className="w-3 h-3 mr-1" />
                    Copy
                  </Button>
                </div>
                <Button className="neo-button-primary text-sm">
                  <Download className="w-3 h-3 mr-1" />
                  Use Template
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderHistoryTab = () => (
    <div className="space-y-6">
      <h3 className="text-[#00ff88] font-mono text-xl">
        {language === 'ar' ? 'سجل الإنشاء' : 'Generation History'}
      </h3>

      <div className="space-y-4">
        {generationHistory.map(request => (
          <Card key={request.id} className="neo-interactive-card">
            <div className="p-6">
              <div className="neo-flex-between mb-4">
                <div className="flex-1">
                  <div className="text-[#C0C5CE] font-semibold mb-2">
                    {request.prompt.slice(0, 80)}...
                  </div>
                  <div className="neo-flex-start neo-space-sm text-sm text-[#C0C5CE]/70">
                    <span>{request.language}</span>
                    <span>•</span>
                    <span>{request.framework}</span>
                    <span>•</span>
                    <span>{request.complexity}</span>
                  </div>
                </div>
                
                <div className="neo-flex-start neo-space-sm">
                  <Badge className={getStatusColor(request.status)}>
                    {request.status}
                  </Badge>
                  {request.status === 'generating' && (
                    <Button className="neo-button-ghost text-xs">
                      <Pause className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              </div>

              {request.status === 'generating' && (
                <div className="mb-4">
                  <div className="neo-flex-between text-sm mb-2">
                    <span className="text-[#C0C5CE]/70">Progress:</span>
                    <span className="text-[#00ff88]">{request.progress.toFixed(0)}%</span>
                  </div>
                  <Progress value={request.progress} className="h-2" />
                </div>
              )}

              {request.result && (
                <div className="mb-4 p-3 bg-[#0B0D12] border border-[#00d4ff]/20 rounded">
                  <div className="text-sm text-[#C0C5CE]/80">
                    {request.result}
                  </div>
                </div>
              )}

              <div className="neo-flex-between text-xs text-[#C0C5CE]/60">
                <div className="neo-flex-start neo-space-sm">
                  <Clock className="w-3 h-3" />
                  <span>{request.startTime.toLocaleString()}</span>
                </div>
                
                {request.status === 'completed' && (
                  <div className="neo-flex-start neo-space-sm">
                    <Button className="neo-button-ghost text-xs">
                      <Eye className="w-3 h-3 mr-1" />
                      View Code
                    </Button>
                    <Button className="neo-button-ghost text-xs">
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
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
              <Bot className="w-8 h-8 text-[#00d4ff]" />
              <div>
                <h1 className="text-3xl font-bold text-[#C0C5CE]">
                  {language === 'ar' ? 'مركز إنشاء الكود بالذكاء الاصطناعي' : 'AI Code Generation Center'}
                </h1>
                <p className="text-[#C0C5CE]/80 text-lg">
                  {language === 'ar' 
                    ? 'إنشاء كود عالي الجودة بالذكاء الاصطناعي المتقدم'
                    : 'Generate high-quality code with advanced AI technology'
                  }
                </p>
              </div>
            </div>
            
            <div className="neo-flex-start neo-space-sm">
              <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse"></div>
              <span className="text-[#00ff88] text-sm font-mono">
                {language === 'ar' ? 'نشط' : 'AI Active'}
              </span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="neo-flex-start neo-space-sm mb-8">
            {[
              { key: 'generate', label: language === 'ar' ? 'إنشاء' : 'Generate', icon: Sparkles },
              { key: 'templates', label: language === 'ar' ? 'قوالب' : 'Templates', icon: FileCode },
              { key: 'history', label: language === 'ar' ? 'السجل' : 'History', icon: Clock },
              { key: 'models', label: language === 'ar' ? 'النماذج' : 'Models', icon: Brain }
            ].map(({ key, label, icon: Icon }) => (
              <Button
                key={key}
                className={`${
                  activeTab === key 
                    ? 'neo-button-primary' 
                    : 'neo-button-ghost'
                } neo-flex-start neo-space-xs`}
                onClick={() => setActiveTab(key as any)}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'generate' && renderGenerateTab()}
          {activeTab === 'templates' && renderTemplatesTab()}
          {activeTab === 'history' && renderHistoryTab()}

          {/* Terminal Status */}
          <Card className="neo-card">
            <div className="p-6">
              <div className="neo-flex-between mb-4">
                <div className="neo-flex-start neo-space-sm">
                  <Terminal className="w-5 h-5 text-[#00d4ff]" />
                  <h3 className="text-[#00ff88] font-mono text-lg">
                    {language === 'ar' ? 'حالة الذكاء الاصطناعي' : 'AI Generation Status'}
                  </h3>
                </div>
                <Badge className="bg-[#00d4ff]/20 text-[#00d4ff] border-[#00d4ff]/30">
                  <Brain className="w-3 h-3 mr-1" />
                  {language === 'ar' ? 'نشط' : 'Active'}
                </Badge>
              </div>
              
              <div className="bg-[#0B0D12] border border-[#00d4ff]/20 rounded-lg p-4 font-mono text-sm">
                <div className="space-y-2">
                  <div className="text-[#00ff88]">
                    neo@ai-codegen:~$ status --models --generation --performance
                  </div>
                  <div className="text-[#C0C5CE]/80">
                    🤖 AI Models: {aiModels.filter(m => m.status === 'active').length}/{aiModels.length} active<br/>
                    ⚡ Generation Queue: {generationHistory.filter(g => g.status === 'generating').length} running<br/>
                    📊 Success Rate: 94.7% (last 30 days)<br/>
                    🏆 Total Generated: {generationHistory.length} code templates<br/>
                    ⏱️ Avg Generation Time: 2.3 minutes
                  </div>
                  
                  <div className="text-[#00ff88] mt-4">
                    neo@ai-codegen:~$ optimize --model-performance --auto-tune
                  </div>
                  <div className="text-[#C0C5CE]/80">
                    🔧 Model optimization in progress...<br/>
                    ✅ Neural network weights updated<br/>
                    ✅ Code pattern recognition enhanced<br/>
                    ✅ Performance benchmarks improved by 12%
                  </div>
                  
                  <div className="text-[#00ff88] mt-4 neo-typing-cursor">
                    neo@ai-codegen:~$ ready --generate-code --enterprise-grade█
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </RTLContainer>
    </div>
  );
}