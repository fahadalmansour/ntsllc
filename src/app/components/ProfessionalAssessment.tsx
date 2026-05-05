import React from 'react';
import { CheckCircle, AlertTriangle, TrendingUp, Star } from 'lucide-react';

export function ProfessionalAssessment() {
  const strengths = [
    {
      category: "Visual Design & Branding",
      score: 9,
      items: [
        "Consistent terminal/CLI aesthetic throughout",
        "Professional dark theme with excellent contrast",
        "Thoughtful use of JetBrains Mono typography",
        "Brand-appropriate color scheme (#0B0D12, #4AE54A)",
        "Terminal window mockups enhance tech credibility"
      ]
    },
    {
      category: "Technical Architecture",
      score: 9,
      items: [
        "Clean component separation and organization",
        "Proper TypeScript implementation",
        "Authentication system with Supabase",
        "Firebase integration for real data handling",
        "Responsive design considerations",
        "Protected routes and state management"
      ]
    },
    {
      category: "Business Content",
      score: 8,
      items: [
        "Comprehensive service offerings clearly defined",
        "Firebase/Google Cloud certification highlighted",
        "Specific technologies and platforms mentioned",
        "AI-powered services demonstrate innovation",
        "Clear value propositions for each service"
      ]
    },
    {
      category: "User Experience",
      score: 8,
      items: [
        "Intuitive navigation with smooth scrolling",
        "Loading states and error handling",
        "Typewriter animation adds engagement",
        "Consistent interaction patterns",
        "Mobile-responsive layout"
      ]
    }
  ];

  const improvements = [
    {
      priority: "High",
      area: "Business Credibility",
      suggestions: [
        "Add testimonials from real clients",
        "Include case studies or portfolio examples",
        "Display certifications with official badges",
        "Add team member profiles",
        "Include company location/contact info"
      ]
    },
    {
      priority: "High", 
      area: "Trust Signals",
      suggestions: [
        "Add privacy policy and terms of service links",
        "Include security badges or compliance certifications",
        "Display years in business or client count",
        "Add SSL certificate indicators",
        "Include business registration details"
      ]
    },
    {
      priority: "Medium",
      area: "Professional Polish",
      suggestions: [
        "Add favicon and proper meta tags",
        "Implement structured data for SEO",
        "Add social media links",
        "Include business hours and response times",
        "Add live chat or immediate contact options"
      ]
    },
    {
      priority: "Medium",
      area: "Performance & Accessibility",
      suggestions: [
        "Optimize images and implement lazy loading",
        "Add proper ARIA labels for screen readers",
        "Implement focus management for keyboard navigation",
        "Add skip links and semantic HTML",
        "Test with accessibility tools"
      ]
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 9) return "text-[#4AE54A]";
    if (score >= 7) return "text-yellow-400";
    return "text-red-400";
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "text-red-400";
      case "Medium": return "text-yellow-400";
      case "Low": return "text-[#4AE54A]";
      default: return "text-[#C0C5CE]";
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0D12] terminal-theme py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <span className="text-[#4AE54A] font-mono mr-2">{'>'}</span>
            <h1 className="text-[#C0C5CE] font-mono text-3xl md:text-4xl font-semibold">
              professionalism --audit
            </h1>
          </div>
          <p className="text-[#C0C5CE]/70 font-mono text-lg">
            Comprehensive assessment of Neo Technology landing page
          </p>
        </div>

        {/* Overall Score */}
        <div className="bg-[#12151C] border border-[#C0C5CE]/20 rounded-lg p-8 mb-12">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Star className="w-8 h-8 text-[#4AE54A] mr-3" />
              <span className="text-[#4AE54A] font-mono text-4xl font-bold">8.5</span>
              <span className="text-[#C0C5CE] font-mono text-xl ml-2">/10</span>
            </div>
            <h2 className="text-[#C0C5CE] font-mono text-2xl mb-4">Overall Professional Rating</h2>
            <p className="text-[#C0C5CE]/70 font-mono text-lg mb-6">
              Highly professional with strong technical foundation. Ready for business use with minor enhancements.
            </p>
            <div className="inline-block bg-[#4AE54A]/10 border border-[#4AE54A]/30 rounded px-4 py-2">
              <span className="text-[#4AE54A] font-mono">Status: Production Ready ✓</span>
            </div>
          </div>
        </div>

        {/* Strengths */}
        <div className="mb-12">
          <div className="flex items-center mb-8">
            <CheckCircle className="w-6 h-6 text-[#4AE54A] mr-3" />
            <h2 className="text-[#C0C5CE] font-mono text-2xl font-semibold">Current Strengths</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {strengths.map((strength, index) => (
              <div key={index} className="bg-[#12151C] border border-[#C0C5CE]/20 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[#4AE54A] font-mono text-lg font-semibold">
                    {strength.category}
                  </h3>
                  <div className="flex items-center">
                    <span className={`font-mono text-xl font-bold ${getScoreColor(strength.score)}`}>
                      {strength.score}
                    </span>
                    <span className="text-[#C0C5CE] font-mono ml-1">/10</span>
                  </div>
                </div>
                <ul className="space-y-2">
                  {strength.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <span className="text-[#4AE54A] mr-2 mt-1">✓</span>
                      <span className="text-[#C0C5CE]/80 font-mono text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Improvement Areas */}
        <div className="mb-12">
          <div className="flex items-center mb-8">
            <TrendingUp className="w-6 h-6 text-yellow-400 mr-3" />
            <h2 className="text-[#C0C5CE] font-mono text-2xl font-semibold">Enhancement Opportunities</h2>
          </div>
          
          <div className="space-y-6">
            {improvements.map((improvement, index) => (
              <div key={index} className="bg-[#12151C] border border-[#C0C5CE]/20 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[#C0C5CE] font-mono text-lg font-semibold">
                    {improvement.area}
                  </h3>
                  <div className={`px-3 py-1 rounded font-mono text-sm ${getPriorityColor(improvement.priority)}`}>
                    {improvement.priority} Priority
                  </div>
                </div>
                <ul className="space-y-2">
                  {improvement.suggestions.map((suggestion, suggestionIndex) => (
                    <li key={suggestionIndex} className="flex items-start">
                      <span className="text-yellow-400 mr-2 mt-1">▶</span>
                      <span className="text-[#C0C5CE]/80 font-mono text-sm">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Standards Checklist */}
        <div className="bg-[#12151C] border border-[#C0C5CE]/20 rounded-lg p-8">
          <div className="flex items-center mb-6">
            <AlertTriangle className="w-6 h-6 text-[#4AE54A] mr-3" />
            <h2 className="text-[#C0C5CE] font-mono text-2xl font-semibold">Professional Standards Checklist</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-[#4AE54A] font-mono text-lg mb-4">✅ Already Implemented</h3>
              <ul className="space-y-2">
                <li className="flex items-center font-mono text-sm text-[#C0C5CE]">
                  <CheckCircle className="w-4 h-4 text-[#4AE54A] mr-2" />
                  Professional visual design
                </li>
                <li className="flex items-center font-mono text-sm text-[#C0C5CE]">
                  <CheckCircle className="w-4 h-4 text-[#4AE54A] mr-2" />
                  Clear service descriptions
                </li>
                <li className="flex items-center font-mono text-sm text-[#C0C5CE]">
                  <CheckCircle className="w-4 h-4 text-[#4AE54A] mr-2" />
                  Contact form functionality
                </li>
                <li className="flex items-center font-mono text-sm text-[#C0C5CE]">
                  <CheckCircle className="w-4 h-4 text-[#4AE54A] mr-2" />
                  Mobile responsiveness
                </li>
                <li className="flex items-center font-mono text-sm text-[#C0C5CE]">
                  <CheckCircle className="w-4 h-4 text-[#4AE54A] mr-2" />
                  User authentication
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-yellow-400 font-mono text-lg mb-4">⚠️ Recommended Additions</h3>
              <ul className="space-y-2">
                <li className="flex items-center font-mono text-sm text-[#C0C5CE]">
                  <AlertTriangle className="w-4 h-4 text-yellow-400 mr-2" />
                  Client testimonials
                </li>
                <li className="flex items-center font-mono text-sm text-[#C0C5CE]">
                  <AlertTriangle className="w-4 h-4 text-yellow-400 mr-2" />
                  Portfolio examples
                </li>
                <li className="flex items-center font-mono text-sm text-[#C0C5CE]">
                  <AlertTriangle className="w-4 h-4 text-yellow-400 mr-2" />
                  Privacy policy
                </li>
                <li className="flex items-center font-mono text-sm text-[#C0C5CE]">
                  <AlertTriangle className="w-4 h-4 text-yellow-400 mr-2" />
                  Business credentials
                </li>
                <li className="flex items-center font-mono text-sm text-[#C0C5CE]">
                  <AlertTriangle className="w-4 h-4 text-yellow-400 mr-2" />
                  Performance optimization
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#C0C5CE]/20">
            <div className="text-center">
              <p className="text-[#C0C5CE] font-mono mb-4">
                <span className="text-[#4AE54A]">Verdict:</span> Your site demonstrates high professionalism and is ready for business use. 
                The terminal aesthetic is unique and memorable while maintaining excellent usability.
              </p>
              <div className="inline-block bg-[#0B0D12] border border-[#4AE54A]/30 rounded px-6 py-3">
                <span className="text-[#4AE54A] font-mono">Professional Grade: Enterprise Ready</span>
              </div>
            </div>
          </div>
        </div>

        {/* Command Line Summary */}
        <div className="mt-12 bg-[#0B0D12] border border-[#C0C5CE]/20 rounded-lg p-6">
          <div className="font-mono">
            <div className="flex items-center mb-2">
              <span className="text-[#4AE54A] mr-2">user@neotechnology:~$</span>
              <span className="text-[#C0C5CE]">echo "Professional assessment complete"</span>
            </div>
            <div className="text-[#C0C5CE]/70 ml-6">
              ✅ Design: Excellent terminal aesthetic<br />
              ✅ Content: Comprehensive business services<br />
              ✅ Technical: Solid architecture and functionality<br />
              ⚠️ Enhancement: Add testimonials and trust signals<br />
              🚀 Status: Ready for production deployment
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfessionalAssessment;