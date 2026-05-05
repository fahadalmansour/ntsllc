import React from 'react';
import { CheckCircle } from 'lucide-react';

interface Props {
  caseId: string;
  onNavigate: (section: string) => void;
}

const useCases: Record<string, {
  title: string;
  headline: string;
  lead: string;
  includes: string[];
  package: string;
  packageKey: string;
}> = {
  'saudi-fashion': {
    title: 'For Saudi Fashion and Lifestyle Brands',
    headline: 'Built for Saudi merchants who refuse to compromise on either local relevance or technical quality',
    lead: 'Saudi e-commerce is one of the fastest-growing markets in the world, but generic global platforms are not built for it. Mada is the dominant payment method, Arabic-first design is not optional, and VAT compliance is mandatory from day one.',
    includes: [
      'Salla, Zid, or Shopify with full Arabic localization',
      'Right-to-left checkout with native Arabic typography',
      'Mada, Apple Pay, and STC Pay integration',
      'VAT-compliant invoicing (15%) with ZATCA-aligned formatting',
      'WhatsApp order notification automation',
      'Compliance with Saudi e-commerce disclosure requirements',
    ],
    package: 'GCC Special — $3,499',
    packageKey: 'pricing',
  },
  'us-dropshipping': {
    title: 'For US Dropshipping and Digital-First Merchants',
    headline: 'The technical foundation US merchants need to scale past their first 1,000 orders',
    lead: 'Dropshipping and digital-first commerce demand rapid iteration, tight margins, and zero tolerance for downtime. We build US-focused stores with the automation infrastructure to handle volume.',
    includes: [
      'Shopify or WooCommerce with custom theme',
      'Stripe, Apple Pay, and Google Pay integration',
      'Dedicated n8n automation server with three custom workflows',
      'Real-time inventory sync across suppliers',
      'Abandoned cart recovery sequences',
      'Daily sales reporting dashboard',
    ],
    package: 'Professional — $2,499',
    packageKey: 'pricing',
  },
  'marketplace': {
    title: 'For Multi-Vendor Marketplaces and Aggregators',
    headline: 'Marketplace infrastructure that handles complexity without becoming complex',
    lead: 'Multi-vendor marketplaces have requirements no single-store platform handles well: vendor onboarding flows, split payments, multi-currency pricing, and varied compliance across jurisdictions.',
    includes: [
      'Custom marketplace architecture and platform selection',
      'Multi-vendor onboarding and management portal',
      'Split payment processing across multiple gateways',
      'Multi-currency pricing with automatic conversion',
      'Country-specific tax handling (US sales tax, GCC VAT)',
      'Custom mobile application (optional)',
    ],
    package: 'Enterprise — Custom pricing',
    packageKey: 'contact',
  },
};

export function UseCasePage({ caseId, onNavigate }: Props) {
  const useCase = useCases[caseId];

  if (!useCase) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-[#C0C5CE] font-mono flex items-center justify-center">
        <div className="text-center">
          <div className="text-[#00d4ff] text-2xl mb-4">Use case not found</div>
          <button onClick={() => onNavigate('home')} className="text-[#00d4ff] underline">Back to home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#C0C5CE] font-mono">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <button onClick={() => onNavigate('home')} className="text-[#00d4ff]/60 hover:text-[#00d4ff] text-sm mb-8 block transition-colors">
          ← Back to home
        </button>

        <h1 className="text-3xl font-bold text-[#00d4ff] mb-4">{useCase.title}</h1>
        <h2 className="text-2xl text-[#C0C5CE] mb-8 leading-tight">{useCase.headline}</h2>

        <p className="text-[#C0C5CE]/80 leading-relaxed mb-10 text-lg">{useCase.lead}</p>

        <div className="bg-[#12151C] border border-[#00d4ff]/20 rounded-lg p-8 mb-8">
          <h3 className="text-[#00d4ff] font-bold mb-6">What is included</h3>
          <div className="space-y-3">
            {useCase.includes.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-[#00ff88] mt-0.5 flex-shrink-0" />
                <span className="text-[#C0C5CE]/80 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0B0D12] border border-[#00ff88]/20 rounded-lg p-6 mb-8">
          <div className="text-[#00ff88] font-bold text-sm mb-1">Recommended package</div>
          <div className="text-[#C0C5CE] text-lg">{useCase.package}</div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => onNavigate(useCase.packageKey)}
            className="bg-[#00d4ff] text-black font-bold px-8 py-3 rounded-lg hover:bg-[#00b8d9] transition-colors"
          >
            {useCase.packageKey === 'contact' ? 'Talk to sales' : 'View pricing'}
          </button>
          <button
            onClick={() => onNavigate('book')}
            className="border border-[#00d4ff]/50 text-[#00d4ff] px-8 py-3 rounded-lg hover:border-[#00d4ff] transition-colors"
          >
            Book a scoping call
          </button>
        </div>
      </div>
    </div>
  );
}
