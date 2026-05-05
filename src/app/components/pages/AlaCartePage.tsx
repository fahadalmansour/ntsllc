import React from 'react';

interface Props { onNavigate: (section: string) => void; }

const sections = [
  {
    title: 'Store Setup & Integration',
    rows: [
      { service: 'Starter build (Salla or Zid)', price: '$999' },
      { service: 'Professional build (Shopify or WooCommerce)', price: '$2,499' },
      { service: 'Custom theme design', price: '$499' },
      { service: 'Platform migration', price: '$799' },
      { service: 'Arabic localization (RTL)', price: '$399' },
    ]
  },
  {
    title: 'Payment Solutions',
    rows: [
      { service: 'Single gateway integration', price: '$199' },
      { service: 'Full GCC gateway bundle (Mada + STC Pay + Apple Pay)', price: '$599' },
      { service: 'Stripe setup + optimization', price: '$299' },
      { service: 'Payment troubleshooting', price: '$149' },
    ]
  },
  {
    title: 'Workflow Automation',
    rows: [
      { service: 'n8n server setup + management', price: '$149 setup + $15/mo' },
      { service: 'Single workflow build', price: '$299' },
      { service: 'Workflow bundle (3 flows)', price: '$699' },
      { service: 'Custom workflow (complex)', price: 'From $499' },
    ]
  },
  {
    title: 'Domain & Hosting',
    rows: [
      { service: 'Domain registration (annual)', price: '$15–$30/yr' },
      { service: 'Managed VPS hosting', price: 'From $5/mo' },
      { service: 'Professional email setup', price: '$99' },
      { service: 'SSL installation', price: '$99' },
    ]
  },
  {
    title: 'AI-Powered Consulting',
    rows: [
      { service: 'Starter consultation + BRD', price: '$299' },
      { service: 'Technical architecture review', price: '$499' },
      { service: 'Compliance documentation set', price: '$699' },
      { service: 'Full consulting retainer (monthly)', price: 'Custom' },
    ]
  },
  {
    title: 'Freelance Brokerage',
    rows: [
      { service: 'Lite — Matchmaking + RFP', price: '$299' },
      { service: 'Plus — Full management', price: '10% of project value' },
      { service: 'Pro — Management + code review', price: '15% of project value' },
    ]
  },
  {
    title: 'Quick-Fix Support',
    rows: [
      { service: 'SSL installation / renewal', price: '$99' },
      { service: 'Email deliverability fix', price: '$149' },
      { service: 'Site speed optimization', price: '$199' },
      { service: 'Plugin conflict resolution', price: '$129' },
      { service: 'DNS troubleshooting', price: '$99' },
      { service: 'Basic SEO audit', price: '$249' },
    ]
  },
  {
    title: 'Communication Suite',
    rows: [
      { service: 'SendGrid or Resend setup', price: '$149' },
      { service: 'Twilio SMS integration', price: '$199' },
      { service: 'WhatsApp Business API setup', price: '$299' },
      { service: 'Full communication bundle', price: '$599' },
    ]
  },
];

const bundles = [
  { discount: '10% off', condition: 'Two services booked together' },
  { discount: '15% off', condition: 'Three or more services' },
  { discount: 'Custom pricing', condition: 'Enterprise scope or multi-month commitment' },
];

export function AlaCartePage({ onNavigate }: Props) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#C0C5CE] font-mono">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-12">
          <button onClick={() => onNavigate('pricing')} className="text-[#00d4ff]/60 hover:text-[#00d4ff] text-sm mb-4 block transition-colors">
            ← Back to pricing
          </button>
          <h1 className="text-4xl font-bold text-[#00d4ff] mb-4">A la carte pricing</h1>
          <p className="text-[#C0C5CE]/80 text-lg">Individual services at fixed, transparent prices.</p>
        </div>

        <div className="space-y-10">
          {sections.map((section, si) => (
            <div key={si} className="bg-[#12151C] border border-[#00d4ff]/20 rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-[#00d4ff]/20">
                <h2 className="text-[#00d4ff] font-bold text-lg">{section.title}</h2>
              </div>
              <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#00d4ff]/10">
                    <th className="text-left px-6 py-3 text-xs text-[#00d4ff]/60 uppercase">Service</th>
                    <th className="text-right px-6 py-3 text-xs text-[#00d4ff]/60 uppercase">Price (USD)</th>
                  </tr>
                </thead>
                <tbody>
                  {section.rows.map((row, ri) => (
                    <tr key={ri} className="border-b border-[#00d4ff]/10 last:border-0 hover:bg-[#0B0D12] transition-colors">
                      <td className="px-6 py-3 text-sm font-bold text-[#C0C5CE]">{row.service}</td>
                      <td className="px-6 py-3 text-sm text-right text-[#00ff88]">{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </div>
          ))}

          <div className="bg-[#12151C] border border-[#00ff88]/20 rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-[#00ff88]/20">
              <h2 className="text-[#00ff88] font-bold text-lg">Bundle discounts</h2>
            </div>
            <div className="overflow-x-auto">
            <table className="w-full">
              <tbody>
                {bundles.map((b, bi) => (
                  <tr key={bi} className="border-b border-[#00ff88]/10 last:border-0">
                    <td className="px-6 py-3 text-sm text-[#C0C5CE]">{b.condition}</td>
                    <td className="px-6 py-3 text-sm text-right text-[#00ff88] font-bold">{b.discount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <button onClick={() => onNavigate('contact')} className="bg-[#00d4ff] text-black font-bold px-8 py-3 rounded-lg hover:bg-[#00b8d9] transition-colors">
            Request a custom quote
          </button>
        </div>
      </div>
    </div>
  );
}
