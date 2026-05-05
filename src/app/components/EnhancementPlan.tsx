import React, { useState } from 'react';
import { 
  Target, 
  Users, 
  Shield, 
  Zap, 
  Globe, 
  Award,
  ChevronRight,
  CheckCircle,
  Clock,
  Star
} from 'lucide-react';
import { Button } from './ui/button';

export function EnhancementPlan() {
  const [selectedPhase, setSelectedPhase] = useState<number>(0);

  const enhancementPhases = [
    {
      phase: 1,
      title: "Trust & Credibility Boost",
      priority: "High",
      timeframe: "1-2 weeks",
      impact: "Immediate credibility increase",
      color: "border-red-400",
      icon: Shield,
      items: [
        {
          task: "Add Client Testimonials Section",
          description: "Create a dedicated testimonials component with real client feedback, photos, and company names",
          technical: "New Testimonials.tsx component with carousel functionality",
          impact: "Builds immediate trust and social proof"
        },
        {
          task: "Portfolio/Case Studies Gallery",
          description: "Showcase actual projects with before/after screenshots, technologies used, and results achieved",
          technical: "Portfolio.tsx with image gallery and project details modal",
          impact: "Demonstrates real capability and results"
        },
        {
          task: "Certification Badge Display",
          description: "Add official Firebase/Google Cloud certification badges with verification links",
          technical: "Certification component with official badge images and verification",
          impact: "Professional credibility and authority"
        },
        {
          task: "Privacy Policy & Terms of Service",
          description: "Professional legal pages with proper business terms and privacy compliance",
          technical: "Legal.tsx component with proper formatting and navigation",
          impact: "Business legitimacy and compliance"
        }
      ]
    },
    {
      phase: 2,
      title: "Professional Polish",
      priority: "High",
      timeframe: "1 week",
      impact: "Enhanced user experience",
      color: "border-yellow-400",
      icon: Star,
      items: [
        {
          task: "SEO & Meta Optimization",
          description: "Add proper meta tags, structured data, sitemap, and favicon",
          technical: "Head component with dynamic meta tags and JSON-LD schema",
          impact: "Better search visibility and professional presentation"
        },
        {
          task: "Contact Information Enhancement",
          description: "Add business address, phone number, business hours, and response time expectations",
          technical: "Enhanced Contact.tsx with complete business information",
          impact: "Accessibility and professional communication"
        },
        {
          task: "Loading States & Error Handling",
          description: "Improve loading animations and error messages throughout the application",
          technical: "Enhanced error boundaries and loading components",
          impact: "Professional user experience"
        },
        {
          task: "Social Media Integration",
          description: "Add social media links, sharing buttons, and social proof indicators",
          technical: "Social.tsx component with share functionality",
          impact: "Extended reach and credibility"
        }
      ]
    },
    {
      phase: 3,
      title: "Performance & Accessibility",
      priority: "Medium",
      timeframe: "1-2 weeks",
      impact: "Technical excellence",
      color: "border-[#4AE54A]",
      icon: Zap,
      items: [
        {
          task: "Image Optimization",
          description: "Implement lazy loading, WebP format, and proper image sizing",
          technical: "Enhanced ImageWithFallback component with optimization",
          impact: "Faster loading and better performance scores"
        },
        {
          task: "Accessibility Improvements",
          description: "Add ARIA labels, focus management, keyboard navigation, and screen reader support",
          technical: "Accessibility enhancements across all components",
          impact: "Inclusive design and compliance"
        },
        {
          task: "Performance Monitoring",
          description: "Implement Core Web Vitals tracking and performance analytics",
          technical: "Performance monitoring with Google Analytics integration",
          impact: "Data-driven optimization"
        },
        {
          task: "Progressive Web App Features",
          description: "Add service worker, offline support, and app-like features",
          technical: "PWA configuration with manifest and service worker",
          impact: "Modern web app experience"
        }
      ]
    },
    {
      phase: 4,
      title: "Advanced Features",
      priority: "Medium",
      timeframe: "2-3 weeks",
      impact: "Competitive advantage",
      color: "border-blue-400",
      icon: Globe,
      items: [
        {
          task: "Live Chat Integration",
          description: "Add real-time chat support for immediate customer engagement",
          technical: "Chat component with real-time messaging integration",
          impact: "Immediate customer support and increased conversions"
        },
        {
          task: "Interactive Project Calculator",
          description: "Build a tool for clients to estimate project costs and timelines",
          technical: "Calculator.tsx with dynamic pricing logic",
          impact: "Lead qualification and user engagement"
        },
        {
          task: "Blog/Resources Section",
          description: "Create a technical blog showcasing expertise and thought leadership",
          technical: "Blog component with CMS integration",
          impact: "SEO benefits and authority building"
        },
        {
          task: "Multi-language Support",
          description: "Add internationalization for broader market reach",
          technical: "i18n implementation with language switching",
          impact: "Expanded market opportunities"
        }
      ]
    }
  ];

  const quickWins = [
    {
      title: "Add Favicon & App Icons",
      time: "30 minutes",
      impact: "Professional browser presence"
    },
    {
      title: "Google My Business Setup",
      time: "1 hour",
      impact: "Local search visibility"
    },
    {
      title: "SSL Certificate Display",
      time: "15 minutes",
      impact: "Security confidence"
    },
    {
      title: "Contact Form Success Messages",
      time: "30 minutes",
      impact: "Better user feedback"
    },
    {
      title: "Mobile Menu Improvements",
      time: "45 minutes",
      impact: "Better mobile UX"
    }
  ];

  const currentPhase = enhancementPhases[selectedPhase];

  return (
    <div className="min-h-screen bg-[#0B0D12] terminal-theme py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <span className="text-[#4AE54A] font-mono mr-2">{'>'}</span>
            <h1 className="text-[#C0C5CE] font-mono text-3xl md:text-4xl font-semibold">
              enhancement --roadmap
            </h1>
          </div>
          <p className="text-[#C0C5CE]/70 font-mono text-lg">
            Strategic plan to elevate Neo Technology to enterprise excellence
          </p>
        </div>

        {/* Quick Wins Section */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <Zap className="w-6 h-6 text-[#4AE54A] mr-3" />
            <h2 className="text-[#C0C5CE] font-mono text-2xl font-semibold">Quick Wins (This Week)</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickWins.map((win, index) => (
              <div key={index} className="bg-[#12151C] border border-[#4AE54A]/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-[#4AE54A] font-mono text-sm font-semibold">{win.title}</h3>
                  <span className="text-[#C0C5CE]/60 font-mono text-xs">{win.time}</span>
                </div>
                <p className="text-[#C0C5CE]/70 font-mono text-xs">{win.impact}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Phase Selection */}
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <Target className="w-6 h-6 text-[#4AE54A] mr-3" />
            <h2 className="text-[#C0C5CE] font-mono text-2xl font-semibold">Enhancement Phases</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {enhancementPhases.map((phase, index) => {
              const IconComponent = phase.icon;
              return (
                <button
                  key={index}
                  onClick={() => setSelectedPhase(index)}
                  className={`bg-[#12151C] border-2 rounded-lg p-4 text-left transition-all duration-200 hover:border-[#4AE54A]/50 ${
                    selectedPhase === index ? phase.color : 'border-[#C0C5CE]/20'
                  }`}
                >
                  <div className="flex items-center mb-3">
                    <IconComponent className={`w-5 h-5 mr-2 ${
                      selectedPhase === index ? 'text-[#4AE54A]' : 'text-[#C0C5CE]'
                    }`} />
                    <span className="text-[#C0C5CE] font-mono text-sm">Phase {phase.phase}</span>
                  </div>
                  <h3 className={`font-mono text-sm font-semibold mb-2 ${
                    selectedPhase === index ? 'text-[#4AE54A]' : 'text-[#C0C5CE]'
                  }`}>
                    {phase.title}
                  </h3>
                  <div className="space-y-1">
                    <div className="text-[#C0C5CE]/60 font-mono text-xs">
                      Priority: {phase.priority}
                    </div>
                    <div className="text-[#C0C5CE]/60 font-mono text-xs">
                      Time: {phase.timeframe}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Phase Details */}
        <div className="bg-[#12151C] border border-[#C0C5CE]/20 rounded-lg p-8 mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-[#4AE54A] font-mono text-2xl font-semibold mb-2">
                Phase {currentPhase.phase}: {currentPhase.title}
              </h2>
              <div className="flex items-center space-x-6 text-sm font-mono text-[#C0C5CE]/70">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {currentPhase.timeframe}
                </div>
                <div className="flex items-center">
                  <Target className="w-4 h-4 mr-1" />
                  {currentPhase.priority} Priority
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[#4AE54A] font-mono text-sm font-semibold">Expected Impact:</div>
              <div className="text-[#C0C5CE]/70 font-mono text-sm">{currentPhase.impact}</div>
            </div>
          </div>

          <div className="space-y-6">
            {currentPhase.items.map((item, index) => (
              <div key={index} className="bg-[#0B0D12] border border-[#C0C5CE]/20 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-[#C0C5CE] font-mono text-lg font-semibold mb-2">
                      {index + 1}. {item.task}
                    </h3>
                    <p className="text-[#C0C5CE]/80 font-mono text-sm mb-3">
                      {item.description}
                    </p>
                  </div>
                  <div className="ml-4">
                    <CheckCircle className="w-5 h-5 text-[#C0C5CE]/30" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-[#4AE54A] font-mono text-sm font-semibold mb-2">
                      Technical Implementation:
                    </div>
                    <div className="text-[#C0C5CE]/70 font-mono text-sm">
                      {item.technical}
                    </div>
                  </div>
                  <div>
                    <div className="text-[#4AE54A] font-mono text-sm font-semibold mb-2">
                      Business Impact:
                    </div>
                    <div className="text-[#C0C5CE]/70 font-mono text-sm">
                      {item.impact}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Implementation Priority Matrix */}
        <div className="bg-[#12151C] border border-[#C0C5CE]/20 rounded-lg p-8 mb-12">
          <div className="flex items-center mb-6">
            <Award className="w-6 h-6 text-[#4AE54A] mr-3" />
            <h2 className="text-[#C0C5CE] font-mono text-2xl font-semibold">Priority Implementation Matrix</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="text-center">
                <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
                  <h3 className="text-red-400 font-mono text-lg font-semibold mb-2">Must Have</h3>
                  <p className="text-[#C0C5CE]/70 font-mono text-sm">Critical for credibility</p>
                </div>
              </div>
              <ul className="space-y-2">
                <li className="text-[#C0C5CE] font-mono text-sm flex items-center">
                  <span className="text-red-400 mr-2">•</span>
                  Client testimonials
                </li>
                <li className="text-[#C0C5CE] font-mono text-sm flex items-center">
                  <span className="text-red-400 mr-2">•</span>
                  Portfolio examples
                </li>
                <li className="text-[#C0C5CE] font-mono text-sm flex items-center">
                  <span className="text-red-400 mr-2">•</span>
                  Privacy policy
                </li>
                <li className="text-[#C0C5CE] font-mono text-sm flex items-center">
                  <span className="text-red-400 mr-2">•</span>
                  Contact information
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <div className="text-center">
                <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4">
                  <h3 className="text-yellow-400 font-mono text-lg font-semibold mb-2">Should Have</h3>
                  <p className="text-[#C0C5CE]/70 font-mono text-sm">Enhances professionalism</p>
                </div>
              </div>
              <ul className="space-y-2">
                <li className="text-[#C0C5CE] font-mono text-sm flex items-center">
                  <span className="text-yellow-400 mr-2">•</span>
                  SEO optimization
                </li>
                <li className="text-[#C0C5CE] font-mono text-sm flex items-center">
                  <span className="text-yellow-400 mr-2">•</span>
                  Performance monitoring
                </li>
                <li className="text-[#C0C5CE] font-mono text-sm flex items-center">
                  <span className="text-yellow-400 mr-2">•</span>
                  Social media integration
                </li>
                <li className="text-[#C0C5CE] font-mono text-sm flex items-center">
                  <span className="text-yellow-400 mr-2">•</span>
                  Accessibility improvements
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <div className="text-center">
                <div className="bg-[#4AE54A]/20 border border-[#4AE54A]/30 rounded-lg p-4">
                  <h3 className="text-[#4AE54A] font-mono text-lg font-semibold mb-2">Nice to Have</h3>
                  <p className="text-[#C0C5CE]/70 font-mono text-sm">Competitive advantage</p>
                </div>
              </div>
              <ul className="space-y-2">
                <li className="text-[#C0C5CE] font-mono text-sm flex items-center">
                  <span className="text-[#4AE54A] mr-2">•</span>
                  Live chat support
                </li>
                <li className="text-[#C0C5CE] font-mono text-sm flex items-center">
                  <span className="text-[#4AE54A] mr-2">•</span>
                  Project calculator
                </li>
                <li className="text-[#C0C5CE] font-mono text-sm flex items-center">
                  <span className="text-[#4AE54A] mr-2">•</span>
                  Multi-language support
                </li>
                <li className="text-[#C0C5CE] font-mono text-sm flex items-center">
                  <span className="text-[#4AE54A] mr-2">•</span>
                  Blog/resources section
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Plan */}
        <div className="bg-[#0B0D12] border border-[#4AE54A]/30 rounded-lg p-8">
          <div className="text-center">
            <h2 className="text-[#4AE54A] font-mono text-2xl font-semibold mb-4">
              Recommended Next Steps
            </h2>
            <p className="text-[#C0C5CE]/70 font-mono text-lg mb-8">
              Start with Phase 1 (Trust & Credibility) for maximum immediate impact
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="bg-[#12151C] border border-[#C0C5CE]/20 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <div className="text-[#4AE54A] font-mono text-sm font-semibold">Week 1-2:</div>
                    <div className="text-[#C0C5CE] font-mono text-sm">Implement testimonials and portfolio</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#4AE54A]" />
                </div>
              </div>
              
              <div className="bg-[#12151C] border border-[#C0C5CE]/20 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <div className="text-[#4AE54A] font-mono text-sm font-semibold">Week 3:</div>
                    <div className="text-[#C0C5CE] font-mono text-sm">Add legal pages and contact enhancements</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#4AE54A]" />
                </div>
              </div>
              
              <div className="bg-[#12151C] border border-[#C0C5CE]/20 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <div className="text-[#4AE54A] font-mono text-sm font-semibold">Week 4+:</div>
                    <div className="text-[#C0C5CE] font-mono text-sm">Continue with phases 2-4 based on business priorities</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#4AE54A]" />
                </div>
              </div>
            </div>
            
            <div className="inline-block bg-[#4AE54A]/10 border border-[#4AE54A]/30 rounded px-6 py-3">
              <span className="text-[#4AE54A] font-mono">
                Current Status: 8.5/10 Professional | Target: 9.5/10 Enterprise
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnhancementPlan;