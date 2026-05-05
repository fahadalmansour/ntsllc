import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '../ui/button';
import { ArrowRight, Terminal, CheckCircle, ExternalLink } from 'lucide-react';

const services = [
  {
    id: 'store-setup',
    number: '01',
    title: 'Store Setup & Integration',
    description: 'Custom builds on Shopify, WooCommerce, Salla, Zid, and Wuilt — bilingual themes, SSL, and full payment gateway integration.',
    iconBg: '#1a1633',
    iconColor: '#7c6ef7',
    key: 'services/store-setup'
  },
  {
    id: 'payments',
    number: '02',
    title: 'Payment Solutions',
    description: 'Native support for Mada, STC Pay, Apple Pay, Tap, HyperPay, PayTabs, Moyasar, and Stripe — every major method, GCC and US.',
    iconBg: '#0d2318',
    iconColor: '#00ff88',
    key: 'services/payments'
  },
  {
    id: 'automation',
    number: '03',
    title: 'Workflow Automation',
    description: 'Managed n8n hosting with 6,000+ ready templates — invoicing, inventory sync, abandoned cart recovery, WhatsApp notifications.',
    iconBg: '#2a1208',
    iconColor: '#ff6b35',
    key: 'services/automation'
  },
  {
    id: 'domain-hosting',
    number: '04',
    title: 'Domain & Hosting',
    description: 'Domain registration, professional email, SSL, and VPS hosting through GoDaddy and Enom — managed from a single dashboard.',
    iconBg: '#1a0a14',
    iconColor: '#ff4d8d',
    key: 'services/domain-hosting'
  },
  {
    id: 'consulting',
    number: '05',
    title: 'AI-Powered Consulting',
    description: 'Built on Claude Agent SDK and the Model Context Protocol — generate BRDs, build automation flows, and produce compliant legal templates.',
    iconBg: '#061428',
    iconColor: '#00d4ff',
    key: 'services/consulting'
  },
  {
    id: 'brokerage',
    number: '06',
    title: 'Freelance Brokerage',
    description: 'A vetted developer and designer network, managed end-to-end with escrow protection and full quality assurance.',
    iconBg: '#1a0e00',
    iconColor: '#ffa500',
    key: 'services/brokerage'
  },
  {
    id: 'quick-fix',
    number: '07',
    title: 'Quick-Fix Support',
    description: 'On-demand technical help for SSL, performance tuning, plugin conflicts, and DNS — at fixed, transparent prices. $99–$299.',
    iconBg: '#141414',
    iconColor: '#888888',
    key: 'services/quick-fix'
  },
  {
    id: 'communication',
    number: '08',
    title: 'Communication Suite',
    description: 'Email (SendGrid/Resend), SMS (Twilio), WhatsApp Business API, and social posting — all integrated into your dashboard.',
    iconBg: '#0d1f0a',
    iconColor: '#4ae54a',
    key: 'services/communication'
  },
];

// ✅ ENHANCED: Service Card Component with terminal aesthetics
interface ServiceCardProps {
  service: typeof services[0];
  index: number;
  onSelect: (key: string) => void;
}

function ServiceCard({ service, index, onSelect }: ServiceCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 200);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      className={`
        relative group transition-all duration-500 transform
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="relative h-full bg-[#12151C] border border-[#00d4ff]/30 rounded-lg p-6 transition-all duration-300 hover:bg-[#1A1F2B] group-hover:shadow-2xl neo-card hover:border-[#00d4ff]/60"
        style={{ fontFamily: 'JetBrains Mono, monospace' }}
      >
        {/* Number badge */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#00d4ff]/20">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold font-mono"
            style={{ backgroundColor: service.iconBg, color: service.iconColor }}
          >
            {service.number}
          </div>
        </div>

        <h3 className="text-lg font-bold mb-3 text-[#00d4ff] neo-service-title">
          {service.title}
        </h3>

        <p className="text-[#C0C5CE]/80 mb-6 text-sm leading-relaxed">
          {service.description}
        </p>

        <Button
          onClick={() => onSelect(service.key)}
          className="w-full font-bold py-2 bg-[#00d4ff]/10 hover:bg-[#00d4ff]/20 text-[#00d4ff] border border-[#00d4ff]/30 hover:border-[#00d4ff]/60 transition-all duration-300"
          style={{ fontFamily: 'JetBrains Mono, monospace' }}
        >
          <span className="flex items-center justify-center gap-2">
            Learn more
            <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
          </span>
        </Button>
      </div>
    </div>
  );
}

// ✅ ENHANCED: CoreServices component with explicit styling
export function CoreServices({ onNavigate }: { onNavigate: (section: string) => void }) {
  const handleServiceSelect = useCallback((key: string) => {
    onNavigate(key);
  }, [onNavigate]);

  return (
    <section
      id="core-services"
      className="py-20 relative overflow-hidden"
      style={{
        backgroundColor: 'var(--neo-bg-primary)',
        color: 'var(--terminal-silver)',
        fontFamily: 'JetBrains Mono, monospace'
      }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(var(--neo-blue-primary) 1px, transparent 1px),
              linear-gradient(90deg, var(--neo-blue-primary) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#12151C]/80 border border-[#00d4ff]/30 rounded-full px-6 py-2 mb-6 neo-section-badge">
            <Terminal className="w-4 h-4 text-[#00d4ff]" />
            <span className="text-sm text-[#C0C5CE] font-mono">
              $ neo-services --list
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#00d4ff] neo-section-title">
            Eight services. One platform. Zero complexity.
          </h2>

          <p className="text-lg text-[#C0C5CE]/80 leading-relaxed neo-section-description">
            Stop assembling your tech stack from a dozen vendors. We deliver every layer of e-commerce infrastructure under one roof.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              onSelect={handleServiceSelect}
            />
          ))}
        </div>

        <div className="text-center">
          <Button
            onClick={() => onNavigate('services')}
            variant="outline"
            size="lg"
            className="border-[#00ff88] text-[#00ff88] hover:bg-[#00ff88]/10 px-8 py-4 text-lg rounded-lg transition-all duration-300 hover:border-[#00ff88]/80 neo-view-all-cta"
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              borderColor: 'var(--neo-green-primary)',
              color: 'var(--neo-green-primary)'
            }}
          >
            <span className="flex items-center gap-2">
              View all services
              <ExternalLink className="w-5 h-5" />
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
}