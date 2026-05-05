import React from 'react';
import { ArrowRight } from 'lucide-react';

interface Props { onNavigate: (section: string) => void; }

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

export function ServicesPage({ onNavigate }: Props) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#C0C5CE] font-mono">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-12">
          <button
            onClick={() => onNavigate('home')}
            className="text-[#00d4ff]/60 hover:text-[#00d4ff] text-sm mb-6 block transition-colors"
          >
            ← Back to home
          </button>
          <h1 className="text-4xl font-bold text-[#00d4ff] mb-4">
            Services built for serious e-commerce
          </h1>
          <p className="text-[#C0C5CE]/80 text-lg leading-relaxed max-w-3xl">
            Eight integrated service categories. Choose what you need today, add the rest as you grow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-[#12151C] border border-[#00d4ff]/20 rounded-lg p-6 hover:border-[#00d4ff]/40 transition-colors"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold mb-4"
                style={{ backgroundColor: service.iconBg, color: service.iconColor }}
              >
                {service.number}
              </div>
              <h3 className="text-lg font-bold text-[#00d4ff] mb-3">{service.title}</h3>
              <p className="text-[#C0C5CE]/70 text-sm leading-relaxed mb-4">{service.description}</p>
              <button
                onClick={() => onNavigate(service.key)}
                className="flex items-center gap-2 text-[#00d4ff] text-sm hover:gap-3 transition-all"
              >
                Learn more <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => onNavigate('contact')}
            style={{ padding: '0.75rem 2rem' }}
            className="bg-[#00d4ff] text-black font-bold rounded-lg hover:bg-[#00b8d9] transition-colors"
          >
            Book a scoping call
          </button>
          <button
            onClick={() => onNavigate('pricing')}
            style={{ padding: '0.75rem 2rem' }}
            className="border border-[#00d4ff]/50 text-[#00d4ff] rounded-lg hover:border-[#00d4ff] hover:bg-[#00d4ff]/10 transition-colors"
          >
            View pricing
          </button>
        </div>
      </div>
    </div>
  );
}
