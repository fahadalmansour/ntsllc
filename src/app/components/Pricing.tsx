import React from 'react';
import { CheckCircle } from 'lucide-react';

interface PricingProps {
  onNavigate?: (section: string) => void;
}

const packages = [
  {
    name: 'Starter',
    price: '$999',
    subtitle: 'For new merchants launching their first store.',
    popular: false,
    features: [
      'Domain + SSL + hosting',
      'One payment gateway',
      'Custom theme',
      'One automation flow',
      '30 days of support',
    ],
    cta: 'Choose Starter',
    ctaKey: 'contact',
  },
  {
    name: 'Professional',
    price: '$2,499',
    subtitle: 'For growing merchants ready to scale operations.',
    popular: true,
    features: [
      'Everything in Starter',
      'Reports dashboard',
      'CRM or Sheets integration',
      'Dedicated n8n server',
      'Three automation flows',
    ],
    cta: 'Choose Professional',
    ctaKey: 'contact',
  },
  {
    name: 'GCC Special',
    price: '$3,499',
    subtitle: 'For merchants serving Gulf markets.',
    popular: false,
    features: [
      'Mada, Apple Pay, STC Pay',
      'Full Arabic localization (RTL)',
      'VAT setup (15% / 5%)',
      'Three legal consultations',
      'Compliance review',
    ],
    cta: 'Choose GCC',
    ctaKey: 'contact',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    subtitle: 'For merchants operating at scale.',
    popular: false,
    features: [
      'Multi-vendor marketplace',
      'Advanced reporting',
      'Mobile application',
      'Dedicated SLA',
      'Ongoing maintenance',
    ],
    cta: 'Talk to sales',
    ctaKey: 'contact',
  },
];

export function Pricing({ onNavigate }: PricingProps) {
  return (
    <section className="min-h-screen bg-[#0a0a0a] py-20 px-6 font-mono">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#12151C] border border-[#00d4ff]/30 rounded-full px-6 py-2 mb-6">
            <div className="w-2 h-2 bg-[#00ff88] rounded-full animate-pulse"></div>
            <span className="text-sm text-[#C0C5CE] font-mono">$ pricing --packages</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-[#00d4ff] mb-4">
            Pricing built around your business, not your budget meeting
          </h1>
          <p className="text-xl text-[#C0C5CE]/80 max-w-3xl mx-auto">
            Fixed prices. Clear deliverables. No hourly surprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 pt-4">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`relative bg-[#12151C] rounded-lg p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl flex flex-col ${
                pkg.popular
                  ? 'border-2 border-[#00d4ff] shadow-[0_0_30px_rgba(0,212,255,0.2)]'
                  : 'border border-[#00d4ff]/20 hover:border-[#00d4ff]/50'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-[#00d4ff] text-black px-4 py-1 rounded-full text-xs font-bold">
                    MOST POPULAR
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h2 className="text-xl font-bold text-[#C0C5CE] mb-2">{pkg.name}</h2>
                <div className="text-3xl font-bold text-[#00d4ff] mb-2">{pkg.price}</div>
                <p className="text-sm text-[#C0C5CE]/70">{pkg.subtitle}</p>
              </div>

              <div className="space-y-3 mb-6 flex-1 flex flex-col justify-start">
                {pkg.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#00ff88] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-[#C0C5CE]/80">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => onNavigate?.(pkg.ctaKey)}
                className={`w-full py-3 px-4 rounded-lg font-bold text-sm transition-all duration-300 ${
                  pkg.popular
                    ? 'bg-[#00d4ff] text-black hover:bg-[#00b8d9]'
                    : 'border border-[#00d4ff]/50 text-[#00d4ff] hover:border-[#00d4ff] hover:bg-[#00d4ff]/10'
                }`}
              >
                {pkg.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center text-sm text-[#C0C5CE]/60">
          All prices in USD. One-time setup fees. Add-ons: managed n8n server $149 setup + $15/mo · quick-fix services $99–$299 per ticket.
        </div>
      </div>
    </section>
  );
}

export default Pricing;
