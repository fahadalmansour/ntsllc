import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Database, Check, Loader2 } from 'lucide-react';
import { useAuth } from './contexts/AuthContext';
import { projectId } from '../utils/supabase/info';

export function CMSSeeder() {
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);
  const [seeded, setSeeded] = useState(false);
  const [status, setStatus] = useState<string>('');

  const baseURL = `https://${projectId}.supabase.co/functions/v1/make-server-b245be9a`;
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${session?.access_token}`
  };

  const sampleProjects = [
    {
      title: "NeoCommerce Platform",
      description: "Advanced e-commerce platform built with React, Node.js, and Firebase. Features real-time inventory, AI-powered recommendations, and integrated payment processing.",
      category: "E-commerce",
      technologies: ["React", "Node.js", "Firebase", "Stripe", "AI/ML"],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      demoUrl: "https://neocommerce-demo.netlify.app",
      codeUrl: "https://github.com/neotechnology/neocommerce",
      featured: true
    },
    {
      title: "Smart Analytics Dashboard",
      description: "Real-time analytics dashboard with AI insights, automated reporting, and custom visualization tools for enterprise clients.",
      category: "Web Development",
      technologies: ["TypeScript", "React", "D3.js", "Python", "TensorFlow"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      demoUrl: "https://analytics-demo.neotechnology.solutions",
      codeUrl: "",
      featured: true
    },
    {
      title: "Mobile Fitness Tracker",
      description: "Cross-platform mobile app for fitness tracking with social features, progress analytics, and personalized workout recommendations.",
      category: "Mobile App",
      technologies: ["React Native", "Firebase", "Redux", "Node.js"],
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
      demoUrl: "",
      codeUrl: "https://github.com/neotechnology/fitness-tracker",
      featured: false
    },
    {
      title: "AI Content Generator",
      description: "Intelligent content generation platform using OpenAI GPT-4, with custom training, brand voice optimization, and multi-format output.",
      category: "AI/ML",
      technologies: ["Python", "OpenAI API", "React", "FastAPI", "PostgreSQL"],
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
      demoUrl: "https://ai-content-demo.neotechnology.solutions",
      codeUrl: "",
      featured: true
    },
    {
      title: "Restaurant Management System",
      description: "Comprehensive restaurant management solution with inventory tracking, staff scheduling, customer orders, and financial reporting.",
      category: "Web Development",
      technologies: ["Vue.js", "Laravel", "MySQL", "Redis"],
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
      demoUrl: "https://restaurant-demo.neotechnology.solutions",
      codeUrl: "",
      featured: false
    }
  ];

  const sampleTestimonials = [
    {
      name: "Sarah Chen",
      role: "CEO",
      company: "TechStart Inc.",
      content: "NeoTechnology transformed our startup idea into a fully functional e-commerce platform in just 6 weeks. Their expertise in Firebase and modern web technologies is unmatched. The team's attention to detail and ability to deliver on time exceeded our expectations.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      rating: 5,
      featured: true
    },
    {
      name: "Michael Rodriguez",
      role: "CTO",
      company: "DataFlow Solutions",
      content: "The analytics dashboard they built for us has revolutionized how we understand our business data. The AI-powered insights have helped us identify trends we never saw before. Incredible work!",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      rating: 5,
      featured: true
    },
    {
      name: "Emily Johnson",
      role: "Product Manager",
      company: "FitLife Pro",
      content: "Our mobile fitness app went from concept to App Store in record time. The React Native development was flawless, and the Firebase backend handles our growing user base perfectly.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      rating: 5,
      featured: false
    },
    {
      name: "David Park",
      role: "Marketing Director",
      company: "Content Creators Co.",
      content: "The AI content generator has increased our content production by 400% while maintaining quality. The custom training for our brand voice was a game-changer.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      rating: 5,
      featured: true
    },
    {
      name: "Lisa Thompson",
      role: "Owner",
      company: "Bella Vista Restaurant",
      content: "The restaurant management system streamlined our entire operation. From inventory to staff scheduling, everything is automated and efficient. Highly recommended!",
      image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop&crop=face",
      rating: 5,
      featured: false
    }
  ];

  const seedData = async () => {
    if (!session?.access_token) return;
    
    setLoading(true);
    setStatus('Initializing CMS seeding...');
    
    try {
      // Seed portfolio projects
      setStatus('Creating portfolio projects...');
      for (const project of sampleProjects) {
        const response = await fetch(`${baseURL}/portfolio`, {
          method: 'POST',
          headers,
          body: JSON.stringify(project)
        });
        
        if (!response.ok) {
          throw new Error(`Failed to create project: ${project.title}`);
        }
        
        // Small delay between requests
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      // Seed testimonials
      setStatus('Creating testimonials...');
      for (const testimonial of sampleTestimonials) {
        const response = await fetch(`${baseURL}/testimonials`, {
          method: 'POST',
          headers,
          body: JSON.stringify(testimonial)
        });
        
        if (!response.ok) {
          throw new Error(`Failed to create testimonial: ${testimonial.name}`);
        }
        
        // Small delay between requests
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      setStatus('CMS seeding completed successfully!');
      setSeeded(true);
      
    } catch (error) {
      console.error('Error seeding CMS:', error);
      setStatus(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-[#12151C] border-[#C0C5CE]/20 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Database className="w-6 h-6 text-[#4AE54A]" />
          <div>
            <h3 className="text-[#4AE54A] font-mono text-lg">CMS Data Seeder</h3>
            <p className="text-[#C0C5CE]/70 font-mono text-sm">
              Populate your CMS with sample portfolio projects and testimonials
            </p>
          </div>
        </div>
        
        <Button
          onClick={seedData}
          disabled={loading || seeded}
          className="bg-[#4AE54A] text-[#0B0D12] hover:bg-[#4AE54A]/90 font-mono"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Seeding...
            </>
          ) : seeded ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Data Seeded
            </>
          ) : (
            'Seed Sample Data'
          )}
        </Button>
      </div>
      
      {status && (
        <div className="bg-[#0B0D12] border border-[#C0C5CE]/20 rounded p-4 font-mono text-sm">
          <div className="text-[#C0C5CE]">
            Status: <span className={seeded ? 'text-[#4AE54A]' : loading ? 'text-yellow-400' : 'text-red-400'}>
              {status}
            </span>
          </div>
        </div>
      )}
      
      <div className="mt-4 text-[#C0C5CE]/70 font-mono text-xs">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-[#4AE54A] mb-1">Will create:</div>
            <div>• {sampleProjects.length} Portfolio Projects</div>
            <div>• {sampleTestimonials.length} Client Testimonials</div>
          </div>
          <div>
            <div className="text-[#4AE54A] mb-1">Features included:</div>
            <div>• Real project images</div>
            <div>• Professional testimonials</div>
            <div>• Featured/non-featured content</div>
          </div>
        </div>
      </div>
    </Card>
  );
}