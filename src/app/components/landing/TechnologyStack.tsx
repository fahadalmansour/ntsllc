import React from 'react';

interface TechnologyStackProps {
  onNavigate?: (section: string) => void;
  className?: string;
}

const platforms = [
  'Shopify', 'WooCommerce', 'Salla', 'Zid', 'Wuilt',
  'Stripe', 'Tap Payments', 'HyperPay', 'PayTabs', 'Moyasar',
  'Mada', 'STC Pay', 'Apple Pay', 'n8n', 'SendGrid',
  'Twilio', 'WhatsApp Business', 'Google Workspace', 'GoDaddy', 'Cloudflare'
];

export function TechnologyStack({ onNavigate, className = '' }: TechnologyStackProps) {
  return (
    <section className={`py-20 px-6 bg-[#0a0a0a] relative ${className}`}>
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#12151C] border border-[#00d4ff]/30 rounded-lg px-4 py-2 mb-6">
            <span className="text-sm text-[#C0C5CE] font-mono">$ integrations --list-all</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-[#C0C5CE] font-mono mb-4">
            Every platform your business{' '}
            <span className="text-[#00d4ff]">already uses</span>
          </h2>
        </div>

        <div className="bg-[#12151C] border border-[#00d4ff]/20 rounded-lg p-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {platforms.map((platform, index) => (
              <div
                key={index}
                className="bg-[#0B0D12] border border-[#00d4ff]/20 rounded-lg px-4 py-2 font-mono text-sm text-[#C0C5CE]/80 hover:border-[#00d4ff]/60 hover:text-[#00d4ff] transition-colors cursor-default"
              >
                {platform}
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <div className="font-mono text-xs text-[#C0C5CE]/40">
              $ integrations --count
            </div>
            <div className="font-mono text-[#00ff88] mt-1 mb-6">
              {platforms.length} platforms integrated · more added regularly
            </div>
            <button
              onClick={() => onNavigate?.('services')}
              className="border border-[#00d4ff]/50 text-[#00d4ff] px-6 py-2 rounded-lg hover:border-[#00d4ff] hover:bg-[#00d4ff]/10 transition-colors font-mono text-sm"
            >
              See how we use these platforms →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TechnologyStack;
