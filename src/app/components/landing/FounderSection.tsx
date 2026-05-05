import React from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  MapPin, 
  LinkedinIcon, 
  TwitterIcon, 
  GithubIcon, 
  Quote, 
  Star,
  Users,
  Building,
  Award,
  ExternalLink
} from 'lucide-react';

interface FounderSectionProps {
  onNavigate?: (section: string) => void;
  className?: string;
}

export function FounderSection({ onNavigate, className = '' }: FounderSectionProps) {
  const achievements = [
    { icon: Building, label: 'CEO & Founder', value: 'NeoTechnology Solutions' },
    { icon: Users, label: 'Clients Served', value: '500+' },
    { icon: Star, label: 'Client Rating', value: '4.9/5' },
    { icon: Award, label: 'Revenue Generated', value: '$50M+' }
  ];

  const timeline = [
    { year: '2018', event: 'Started in e-commerce consulting' },
    { year: '2020', event: 'Founded NeoTechnology Solutions' },
    { year: '2022', event: 'Launched 90-minute store setup' },
    { year: '2024', event: 'Expanded to GCC markets' }
  ];

  const values = [
    {
      title: 'Speed Without Compromise',
      description: 'Why wait 30-60 days when you can have it in 90 minutes?'
    },
    {
      title: 'Transparent Pricing',
      description: 'No hidden fees, no surprises. What you see is what you pay.'
    },
    {
      title: 'Client Success First',
      description: 'Your success is our success. We don\'t win unless you win.'
    }
  ];

  return (
    <section className={`py-20 bg-[#0a0a0a] ${className}`} id="founder">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-[#00d4ff]/20 text-[#00d4ff] border-[#00d4ff]/30 px-4 py-2 font-mono mb-6">
            Meet the Founder
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            The Vision Behind 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#00ff88]">
              {' '}90-Minute Stores
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From frustrated entrepreneur to industry innovator - 
            the story of how one vision changed e-commerce forever.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          
          {/* Left Side - Photo and Bio */}
          <div className="space-y-8">
            
            {/* Founder Photo and Info */}
            <Card className="bg-[#1a1a1a] border border-[#00d4ff]/30 p-8 text-center relative overflow-hidden">
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00d4ff]/5 to-[#00ff88]/5"></div>
              
              <div className="relative z-10">
                {/* Professional Photo Placeholder */}
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#00ff88] mx-auto mb-6 flex items-center justify-center">
                  <div className="w-30 h-30 rounded-full bg-[#1a1a1a] flex items-center justify-center text-3xl font-bold text-white">
                    FA
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">Fahad Almansour</h3>
                <p className="text-[#00d4ff] font-medium mb-2">CEO & Founder</p>
                <div className="flex items-center justify-center space-x-2 text-gray-400 mb-6">
                  <MapPin className="w-4 h-4" />
                  <span className="font-mono text-sm">Wyoming, USA</span>
                </div>

                {/* Social Links */}
                <div className="flex justify-center space-x-4 mb-6">
                  <Button variant="outline" size="sm" className="border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff]/10">
                    <LinkedinIcon className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff]/10">
                    <TwitterIcon className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff]/10">
                    <GithubIcon className="w-4 h-4" />
                  </Button>
                </div>

                {/* Achievements Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => {
                    const IconComponent = achievement.icon;
                    return (
                      <div key={index} className="text-center p-4 bg-[#0a0a0a] rounded-lg">
                        <IconComponent className="w-6 h-6 text-[#00d4ff] mx-auto mb-2" />
                        <div className="text-lg font-bold text-white">{achievement.value}</div>
                        <div className="text-xs text-gray-400">{achievement.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>
            
            {/* Company Timeline */}
            <Card className="bg-[#1a1a1a] border border-[#00ff88]/30 p-6">
              <h4 className="text-lg font-bold text-white mb-6 flex items-center">
                <Award className="w-5 h-5 text-[#00ff88] mr-2" />
                Company Journey
              </h4>
              <div className="space-y-4">
                {timeline.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-[#00ff88]/20 flex items-center justify-center text-[#00ff88] font-bold text-sm">
                      {item.year}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-300 text-sm">{item.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Side - Story and Values */}
          <div className="space-y-8">
            
            {/* Founder Story */}
            <Card className="bg-[#1a1a1a] border border-[#00d4ff]/30 p-8">
              <div className="flex items-start space-x-4 mb-6">
                <Quote className="w-8 h-8 text-[#00d4ff] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-xl font-bold text-white mb-4">Why I Started NeoTechnology</h4>
                  <div className="space-y-4 text-gray-300">
                    <p>
                      After watching too many entrepreneurs wait months for their stores while 
                      paying outrageous fees, I knew there had to be a better way.
                    </p>
                    <p>
                      <span className="text-[#00d4ff] font-medium">The problem was clear:</span> Traditional 
                      agencies were stuck in the past, charging $10,000+ and taking 30-60 days for 
                      what modern technology could do in 90 minutes.
                    </p>
                    <p>
                      <span className="text-[#00ff88] font-medium">The solution:</span> Combine AI automation 
                      with human expertise to deliver enterprise-level results at startup speed.
                    </p>
                    <p>
                      Today, we've launched 500+ stores and generated over $50M in revenue for our clients. 
                      But the real victory? <span className="text-[#ffd93d] font-medium">Watching entrepreneurs 
                      start selling the same day they decide to launch.</span>
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Company Values */}
            <Card className="bg-[#1a1a1a] border border-[#00ff88]/30 p-8">
              <h4 className="text-xl font-bold text-white mb-6">Our Core Values</h4>
              <div className="space-y-6">
                {values.map((value, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-2 h-2 rounded-full bg-[#00ff88] mt-2 flex-shrink-0"></div>
                    <div>
                      <h5 className="text-[#00ff88] font-medium mb-1">{value.title}</h5>
                      <p className="text-gray-300 text-sm">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Personal Mission */}
            <Card className="bg-gradient-to-r from-[#00d4ff]/10 to-[#00ff88]/10 border border-[#00d4ff]/30 p-8">
              <h4 className="text-xl font-bold text-white mb-4 text-center">My Personal Mission</h4>
              <div className="text-center">
                <p className="text-gray-300 mb-6 text-lg italic">
                  "To democratize e-commerce by making professional store creation 
                  accessible, affordable, and lightning-fast for every entrepreneur."
                </p>
                <div className="text-[#00d4ff] font-mono text-sm">
                  - Fahad Almansour, CEO & Founder
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-[#00d4ff]/10 px-6 py-3 rounded-full border border-[#00d4ff]/30 mb-6">
            <span className="w-2 h-2 bg-[#00ff88] rounded-full animate-pulse"></span>
            <span className="text-[#00d4ff] font-mono">Personally Available for Consultation</span>
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-4">
            Want to Work Directly with Fahad?
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Book a personal consultation and get insights from someone who's launched 500+ stores. 
            Limited slots available each month.
          </p>
          
          <div className="flex justify-center space-x-4">
            <Button 
              onClick={() => onNavigate?.('auth')}
              className="bg-gradient-to-r from-[#00d4ff] to-[#00ff88] text-black hover:scale-105 transition-transform font-bold px-8 py-3 text-lg"
            >
              Book Consultation
              <ExternalLink className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              onClick={() => onNavigate?.('contact')}
              variant="outline"
              className="border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff]/10 px-8 py-3 text-lg"
            >
              Send Message
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FounderSection;