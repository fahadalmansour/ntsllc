import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { 
  X, 
  Save, 
  Plus, 
  Trash2, 
  DollarSign, 
  Clock, 
  Tag, 
  FileText,
  Globe,
  Zap,
  CheckCircle
} from 'lucide-react';

interface Service {
  id: string;
  name: string;
  category: string;
  price: number;
  currency: 'USD' | 'SAR';
  deliveryTime: string;
  description: string;
  features: string[];
  active: boolean;
  popular: boolean;
}

interface ServiceEditorProps {
  service?: Service | null;
  onClose: () => void;
  onSave: (service: Service) => void;
  className?: string;
}

export function ServiceEditor({ service, onClose, onSave, className = '' }: ServiceEditorProps) {
  const [formData, setFormData] = useState<Service>({
    id: '',
    name: '',
    category: 'E-commerce',
    price: 0,
    currency: 'USD',
    deliveryTime: '90 minutes',
    description: '',
    features: [],
    active: true,
    popular: false
  });
  
  const [newFeature, setNewFeature] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (service) {
      setFormData(service);
    }
  }, [service]);

  const categories = [
    'E-commerce',
    'SaaS Platform',
    'AI Integration', 
    'Code Analysis',
    'Store Builder',
    'Automation',
    'Marketing',
    'Support'
  ];

  const deliveryOptions = [
    '30 minutes',
    '60 minutes', 
    '90 minutes',
    '2 hours',
    '4 hours',
    '24 hours',
    '48 hours',
    '1 week'
  ];

  const handleInputChange = (field: keyof Service, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const serviceToSave = {
      ...formData,
      id: formData.id || `service-${Date.now()}`
    };
    
    onSave(serviceToSave);
    setIsSubmitting(false);
  };

  return (
    <div className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 ${className}`}>
      <Card className="bg-[#1a1a1a] border-[#00d4ff]/30 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white font-mono">
                {service ? 'Edit Service' : 'Create New Service'}
              </h2>
              <p className="text-[#a0a0a0] font-mono text-sm">
                Configure your service package details
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[#00d4ff]/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-[#a0a0a0] hover:text-white" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-[#a0a0a0] font-mono mb-2">
                  <Tag className="w-4 h-4 inline mr-2" />
                  Service Name
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="e.g., Shopify Store Setup"
                  className="bg-[#0a0a0a] border-[#00d4ff]/30 text-white font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-[#a0a0a0] font-mono mb-2">
                  <Globe className="w-4 h-4 inline mr-2" />
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-[#00d4ff]/30 rounded-lg px-3 py-2 text-white font-mono focus:border-[#00d4ff] focus:outline-none"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-[#a0a0a0] font-mono mb-2">
                <FileText className="w-4 h-4 inline mr-2" />
                Description
              </label>
              <Textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe what this service includes..."
                className="bg-[#0a0a0a] border-[#00d4ff]/30 text-white font-mono"
                rows={3}
                required
              />
            </div>

            {/* Pricing and Delivery */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm text-[#a0a0a0] font-mono mb-2">
                  <DollarSign className="w-4 h-4 inline mr-2" />
                  Price
                </label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', parseInt(e.target.value) || 0)}
                  placeholder="1299"
                  className="bg-[#0a0a0a] border-[#00d4ff]/30 text-white font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-[#a0a0a0] font-mono mb-2">
                  Currency
                </label>
                <select
                  value={formData.currency}
                  onChange={(e) => handleInputChange('currency', e.target.value as 'USD' | 'SAR')}
                  className="w-full bg-[#0a0a0a] border border-[#00d4ff]/30 rounded-lg px-3 py-2 text-white font-mono focus:border-[#00d4ff] focus:outline-none"
                >
                  <option value="USD">USD ($)</option>
                  <option value="SAR">SAR (ر.س)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-[#a0a0a0] font-mono mb-2">
                  <Clock className="w-4 h-4 inline mr-2" />
                  Delivery Time
                </label>
                <select
                  value={formData.deliveryTime}
                  onChange={(e) => handleInputChange('deliveryTime', e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-[#00d4ff]/30 rounded-lg px-3 py-2 text-white font-mono focus:border-[#00d4ff] focus:outline-none"
                >
                  {deliveryOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Features */}
            <div>
              <label className="block text-sm text-[#a0a0a0] font-mono mb-2">
                <Zap className="w-4 h-4 inline mr-2" />
                Features Included
              </label>
              
              <div className="space-y-3">
                {/* Add Feature Input */}
                <div className="flex gap-2">
                  <Input
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="Add a feature..."
                    className="bg-[#0a0a0a] border-[#00d4ff]/30 text-white font-mono"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                  />
                  <Button
                    type="button"
                    onClick={addFeature}
                    disabled={!newFeature.trim()}
                    className="bg-[#00d4ff] text-black hover:bg-[#00ff88] px-4"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {/* Features List */}
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex items-center justify-between bg-[#0a0a0a] border border-[#00d4ff]/20 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-[#00ff88]" />
                        <span className="text-white font-mono text-sm">{feature}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="p-1 hover:bg-red-500/10 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Settings */}
            <div className="flex gap-6">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.active}
                  onChange={(e) => handleInputChange('active', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00ff88]"></div>
                <span className="text-white font-mono text-sm">Active Service</span>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.popular}
                  onChange={(e) => handleInputChange('popular', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ffd93d]"></div>
                <span className="text-white font-mono text-sm">Popular Service</span>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-[#00d4ff]/20">
              <Button
                type="button"
                onClick={onClose}
                variant="outline"
                className="border-[#a0a0a0] text-[#a0a0a0] hover:bg-[#a0a0a0]/10 font-mono"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !formData.name || !formData.description}
                className="bg-gradient-to-r from-[#00d4ff] to-[#00ff88] text-black hover:from-[#00ff88] hover:to-[#00d4ff] font-mono font-bold"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    {service ? 'Update Service' : 'Create Service'}
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}

export default ServiceEditor;