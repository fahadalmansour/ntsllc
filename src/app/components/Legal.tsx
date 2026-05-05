import React, { useState } from 'react';
import { Shield, FileText, ArrowLeft, Calendar, Mail, MapPin, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { TermsOfService } from './legal/TermsOfService';

interface LegalProps {
  type: 'privacy' | 'terms';
  onBack?: () => void;
}

export function Legal({ type, onBack }: LegalProps) {
  const [activeSection, setActiveSection] = useState<string>('');

  // If type is 'terms', render the comprehensive TermsOfService component
  if (type === 'terms') {
    return <TermsOfService onBack={onBack} />;
  }

  const lastUpdated = "January 15, 2025";
  const companyInfo = {
    name: "Neo Technology Solutions",
    website: "neotechnology.solutions",
    email: "legal@neotechnology.solutions",
    phone: "+1 (555) 123-4567",
    address: "123 Tech Street, Innovation District, Tech City, TC 12345"
  };

  const PrivacyPolicy = () => (
    <div className="space-y-8">
      {/* Introduction */}
      <section id="introduction">
        <h3 className="text-[#4AE54A] font-mono text-xl font-semibold mb-4">1. Introduction</h3>
        <div className="text-[#C0C5CE]/80 font-mono text-sm leading-relaxed space-y-3">
          <p>
            At Neo Technology Solutions ("we," "our," or "us"), we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website {companyInfo.website} and use our services.
          </p>
          <p>
            This policy applies to all users of our website and services, including but not limited to Firebase development, Google Cloud solutions, e-commerce platforms, and AI-powered tools.
          </p>
        </div>
      </section>

      {/* Information We Collect */}
      <section id="collection">
        <h3 className="text-[#4AE54A] font-mono text-xl font-semibold mb-4">2. Information We Collect</h3>
        <div className="text-[#C0C5CE]/80 font-mono text-sm leading-relaxed space-y-4">
          <div>
            <h4 className="text-[#C0C5CE] font-semibold mb-2">Personal Information</h4>
            <ul className="space-y-1 ml-4">
              <li>• Name, email address, phone number, and business information</li>
              <li>• Project requirements and technical specifications</li>
              <li>• Communication preferences and contact history</li>
              <li>• Payment and billing information (processed securely via third parties)</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-[#C0C5CE] font-semibold mb-2">Technical Information</h4>
            <ul className="space-y-1 ml-4">
              <li>• IP address, browser type, and device information</li>
              <li>• Website usage data and analytics (via Google Analytics)</li>
              <li>• Cookies and similar tracking technologies</li>
              <li>• Performance metrics and error logs</li>
            </ul>
          </div>
        </div>
      </section>

      {/* How We Use Information */}
      <section id="usage">
        <h3 className="text-[#4AE54A] font-mono text-xl font-semibold mb-4">3. How We Use Your Information</h3>
        <div className="text-[#C0C5CE]/80 font-mono text-sm leading-relaxed">
          <ul className="space-y-2">
            <li>• Provide and deliver our development and consulting services</li>
            <li>• Communicate with you about projects, updates, and support</li>
            <li>• Process payments and manage billing</li>
            <li>• Improve our website, services, and user experience</li>
            <li>• Comply with legal obligations and protect our rights</li>
            <li>• Send marketing communications (with your consent)</li>
          </ul>
        </div>
      </section>

      {/* Data Security */}
      <section id="security">
        <h3 className="text-[#4AE54A] font-mono text-xl font-semibold mb-4">4. Data Security</h3>
        <div className="text-[#C0C5CE]/80 font-mono text-sm leading-relaxed space-y-3">
          <p>
            We implement industry-standard security measures to protect your information, including:
          </p>
          <ul className="space-y-1 ml-4">
            <li>• SSL/TLS encryption for data transmission</li>
            <li>• Secure cloud storage using Firebase and Google Cloud</li>
            <li>• Access controls and authentication systems</li>
            <li>• Regular security audits and updates</li>
            <li>• Employee training on data protection</li>
          </ul>
        </div>
      </section>

      {/* Third-Party Services */}
      <section id="third-party">
        <h3 className="text-[#4AE54A] font-mono text-xl font-semibold mb-4">5. Third-Party Services</h3>
        <div className="text-[#C0C5CE]/80 font-mono text-sm leading-relaxed space-y-3">
          <p>We use trusted third-party services to enhance our offerings:</p>
          <ul className="space-y-1 ml-4">
            <li>• Google Analytics for website analytics</li>
            <li>• Firebase for database and authentication</li>
            <li>• Supabase for additional backend services</li>
            <li>• Stripe for payment processing</li>
            <li>• Zapier and n8n for automation services</li>
          </ul>
          <p>Each service has its own privacy policy, and we encourage you to review them.</p>
        </div>
      </section>

      {/* Your Rights */}
      <section id="rights">
        <h3 className="text-[#4AE54A] font-mono text-xl font-semibold mb-4">6. Your Rights</h3>
        <div className="text-[#C0C5CE]/80 font-mono text-sm leading-relaxed space-y-2">
          <p>You have the right to:</p>
          <ul className="space-y-1 ml-4">
            <li>• Access your personal information</li>
            <li>• Correct inaccurate or incomplete data</li>
            <li>• Request deletion of your information</li>
            <li>• Opt-out of marketing communications</li>
            <li>• Export your data in a portable format</li>
          </ul>
          <p>Contact us at {companyInfo.email} to exercise these rights.</p>
        </div>
      </section>

      {/* Contact Information */}
      <section id="contact">
        <h3 className="text-[#4AE54A] font-mono text-xl font-semibold mb-4">7. Contact Us</h3>
        <div className="text-[#C0C5CE]/80 font-mono text-sm leading-relaxed space-y-2">
          <p>For questions about this Privacy Policy, contact us:</p>
          <div className="bg-[#0B0D12] border border-[#C0C5CE]/20 rounded-lg p-4 mt-4">
            <div className="space-y-2">
              <div className="flex items-center"><Mail className="w-4 h-4 mr-2" /> {companyInfo.email}</div>
              <div className="flex items-center"><Phone className="w-4 h-4 mr-2" /> {companyInfo.phone}</div>
              <div className="flex items-start"><MapPin className="w-4 h-4 mr-2 mt-0.5" /> {companyInfo.address}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const TermsOfServiceComponent = () => {
    // Return the full comprehensive Terms of Service component
    // This will render in place of the entire Legal component content
    return null; // We'll handle this differently
  };

  const content = type === 'privacy' ? <PrivacyPolicy /> : <TermsOfServiceComponent />;
  const title = type === 'privacy' ? 'Privacy Policy' : 'Terms of Service';
  const icon = type === 'privacy' ? Shield : FileText;
  const IconComponent = icon;

  return (
    <div className="min-h-screen bg-[#0B0D12] terminal-theme py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          {onBack && (
            <Button
              onClick={onBack}
              variant="ghost"
              className="text-[#C0C5CE] hover:text-[#4AE54A] font-mono mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Site
            </Button>
          )}
          
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <IconComponent className="w-8 h-8 text-[#4AE54A] mr-3" />
              <h1 className="text-[#C0C5CE] font-mono text-3xl md:text-4xl font-semibold">
                {title}
              </h1>
            </div>
            
            <div className="flex items-center justify-center space-x-4 text-[#C0C5CE]/70 font-mono text-sm">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                Last Updated: {lastUpdated}
              </div>
              <div>•</div>
              <div>{companyInfo.name}</div>
            </div>
          </div>

          {/* Table of Contents */}
          <div className="bg-[#12151C] border border-[#C0C5CE]/20 rounded-lg p-6">
            <h2 className="text-[#4AE54A] font-mono text-lg font-semibold mb-4">Table of Contents</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {type === 'privacy' ? (
                <>
                  <a href="#introduction" className="text-[#C0C5CE] hover:text-[#4AE54A] font-mono text-sm transition-colors">1. Introduction</a>
                  <a href="#collection" className="text-[#C0C5CE] hover:text-[#4AE54A] font-mono text-sm transition-colors">2. Information We Collect</a>
                  <a href="#usage" className="text-[#C0C5CE] hover:text-[#4AE54A] font-mono text-sm transition-colors">3. How We Use Information</a>
                  <a href="#security" className="text-[#C0C5CE] hover:text-[#4AE54A] font-mono text-sm transition-colors">4. Data Security</a>
                  <a href="#third-party" className="text-[#C0C5CE] hover:text-[#4AE54A] font-mono text-sm transition-colors">5. Third-Party Services</a>
                  <a href="#rights" className="text-[#C0C5CE] hover:text-[#4AE54A] font-mono text-sm transition-colors">6. Your Rights</a>
                  <a href="#contact" className="text-[#C0C5CE] hover:text-[#4AE54A] font-mono text-sm transition-colors">7. Contact Us</a>
                </>
              ) : (
                <>
                  <a href="#introduction" className="text-[#C0C5CE] hover:text-[#4AE54A] font-mono text-sm transition-colors">1. Agreement to Terms</a>
                  <a href="#services" className="text-[#C0C5CE] hover:text-[#4AE54A] font-mono text-sm transition-colors">2. Our Services</a>
                  <a href="#responsibilities" className="text-[#C0C5CE] hover:text-[#4AE54A] font-mono text-sm transition-colors">3. Client Responsibilities</a>
                  <a href="#payment" className="text-[#C0C5CE] hover:text-[#4AE54A] font-mono text-sm transition-colors">4. Payment Terms</a>
                  <a href="#ip" className="text-[#C0C5CE] hover:text-[#4AE54A] font-mono text-sm transition-colors">5. Intellectual Property</a>
                  <a href="#liability" className="text-[#C0C5CE] hover:text-[#4AE54A] font-mono text-sm transition-colors">6. Limitation of Liability</a>
                  <a href="#termination" className="text-[#C0C5CE] hover:text-[#4AE54A] font-mono text-sm transition-colors">7. Termination</a>
                  <a href="#changes" className="text-[#C0C5CE] hover:text-[#4AE54A] font-mono text-sm transition-colors">8. Changes to Terms</a>
                  <a href="#contact" className="text-[#C0C5CE] hover:text-[#4AE54A] font-mono text-sm transition-colors">9. Contact Information</a>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-[#12151C] border border-[#C0C5CE]/20 rounded-lg overflow-hidden">
          <div className="overflow-y-auto max-h-[70vh] p-8">
            <div className="prose prose-invert max-w-none">
              {content}
            </div>
          </div>
        </div>

        {/* Professional Credentials Section */}
        <div className="mt-12 mb-8">
          <div className="bg-[#12151C] border border-[#C0C5CE]/20 rounded-lg p-8">
            <h3 className="text-[#4AE54A] font-mono text-xl font-semibold mb-6 text-center">
              Professional Compliance & Credentials
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-[#0B0D12] border border-[#4AE54A]/30 rounded-lg p-4 mb-3">
                  <Shield className="w-8 h-8 text-[#4AE54A] mx-auto mb-2" />
                  <div className="text-[#C0C5CE] font-mono text-sm font-semibold">GDPR Compliant</div>
                </div>
                <p className="text-[#C0C5CE]/70 font-mono text-xs">
                  Full compliance with European data protection regulations
                </p>
              </div>

              <div className="text-center">
                <div className="bg-[#0B0D12] border border-[#4AE54A]/30 rounded-lg p-4 mb-3">
                  <FileText className="w-8 h-8 text-[#4AE54A] mx-auto mb-2" />
                  <div className="text-[#C0C5CE] font-mono text-sm font-semibold">SOC 2 Ready</div>
                </div>
                <p className="text-[#C0C5CE]/70 font-mono text-xs">
                  Security controls meeting enterprise standards
                </p>
              </div>

              <div className="text-center">
                <div className="bg-[#0B0D12] border border-[#4AE54A]/30 rounded-lg p-4 mb-3">
                  <div className="w-8 h-8 bg-[#4AE54A] rounded text-[#0B0D12] flex items-center justify-center mx-auto mb-2 font-mono text-xs font-bold">
                    SSL
                  </div>
                  <div className="text-[#C0C5CE] font-mono text-sm font-semibold">Encrypted</div>
                </div>
                <p className="text-[#C0C5CE]/70 font-mono text-xs">
                  All data transmission secured with SSL/TLS encryption
                </p>
              </div>
            </div>

            <div className="mt-6 text-center">
              <div className="inline-flex items-center space-x-4 text-[#C0C5CE]/60 font-mono text-xs">
                <span>🔒 ISO 27001 Aligned</span>
                <span>•</span>
                <span>⚡ Firebase Certified</span>
                <span>•</span>
                <span>☁️ Google Cloud Partner</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="bg-[#0B0D12] border border-[#4AE54A]/30 rounded-lg p-6 inline-block">
            <h3 className="text-[#4AE54A] font-mono text-lg font-semibold mb-2">
              Questions about this {title.toLowerCase()}?
            </h3>
            <p className="text-[#C0C5CE]/70 font-mono text-sm mb-4">
              We're here to help clarify any concerns or questions you may have.
            </p>
            <Button
              onClick={() => window.location.href = `mailto:${companyInfo.email}`}
              className="bg-[#4AE54A] text-[#0B0D12] font-mono font-semibold px-6 py-2 rounded hover:bg-[#4AE54A]/90 transition-colors duration-200"
            >
              <Mail className="w-4 h-4 mr-2" />
              Contact Legal Team
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Legal;