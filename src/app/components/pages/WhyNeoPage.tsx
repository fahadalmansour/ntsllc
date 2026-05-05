import React from 'react';
import { CheckCircle, X } from 'lucide-react';

interface Props { onNavigate: (section: string) => void; }

const comparison = [
  {
    aspect: 'Accountability',
    freelancer: 'Single person — no backup',
    inhouse: 'Requires hiring + management',
    neo: 'One contract, one team, one outcome',
  },
  {
    aspect: 'Cost',
    freelancer: 'Low upfront, unpredictable total',
    inhouse: 'High fixed cost ($60K+/yr)',
    neo: 'Fixed-price packages, no surprises',
  },
  {
    aspect: 'Speed',
    freelancer: 'Variable — depends on individual',
    inhouse: '3–6 months to hire + onboard',
    neo: 'Starter live in 7–10 business days',
  },
  {
    aspect: 'Legal protection',
    freelancer: 'Minimal',
    inhouse: 'Employment contracts',
    neo: 'US LLC contract, IP transfer, NDA',
  },
  {
    aspect: 'GCC expertise',
    freelancer: 'Rare',
    inhouse: 'Requires specific hiring',
    neo: 'Built-in: Mada, STC Pay, VAT, RTL',
  },
  {
    aspect: 'AI capabilities',
    freelancer: 'Individual skill',
    inhouse: 'Requires AI specialist',
    neo: 'Claude SDK + MCP integrated',
  },
];

export function WhyNeoPage({ onNavigate }: Props) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#C0C5CE] font-mono">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <button onClick={() => onNavigate('home')} className="text-[#00d4ff]/60 hover:text-[#00d4ff] text-sm mb-8 block transition-colors">
          ← Back to home
        </button>

        <h1 className="text-4xl font-bold text-[#00d4ff] mb-4">Why NeoTechnology Solutions</h1>
        <p className="text-[#C0C5CE]/80 text-lg mb-12 max-w-3xl">
          Every merchant faces the same build-vs-buy decision. Here is how the three real options compare.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#12151C] border border-red-500/20 rounded-lg p-6">
            <h2 className="text-lg font-bold text-red-400 mb-3">Freelancer</h2>
            <p className="text-[#C0C5CE]/70 text-sm leading-relaxed">
              Individual contractors can deliver specific tasks cheaply, but they carry single-point-of-failure risk, no legal accountability, and no breadth across e-commerce, payments, and automation simultaneously.
            </p>
          </div>
          <div className="bg-[#12151C] border border-yellow-500/20 rounded-lg p-6">
            <h2 className="text-lg font-bold text-yellow-400 mb-3">In-house team</h2>
            <p className="text-[#C0C5CE]/70 text-sm leading-relaxed">
              Hiring gives you control, but the overhead is significant. A mid-level developer costs $80K–$120K per year before benefits, management time, and equipment. And you still need specialists for GCC markets.
            </p>
          </div>
          <div className="bg-[#12151C] border border-[#00d4ff]/30 rounded-lg p-6">
            <h2 className="text-lg font-bold text-[#00d4ff] mb-3">NeoTechnology Solutions</h2>
            <p className="text-[#C0C5CE]/70 text-sm leading-relaxed">
              One contract. Eight service categories. US-incorporated with clear IP transfer, NDAs, and Wyoming contract law. GCC expertise built in. Fixed prices with no surprises.
            </p>
          </div>
        </div>

        <div className="bg-[#12151C] border border-[#00d4ff]/20 rounded-lg overflow-hidden mb-12">
          <div className="px-6 py-4 border-b border-[#00d4ff]/20">
            <h2 className="text-[#00d4ff] font-bold">Head-to-head comparison</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-[#00d4ff]/10">
                  <th className="text-left px-6 py-3 text-xs text-[#00d4ff]/60 uppercase">Aspect</th>
                  <th className="text-left px-6 py-3 text-xs text-red-400/60 uppercase">Freelancer</th>
                  <th className="text-left px-6 py-3 text-xs text-yellow-400/60 uppercase">In-house</th>
                  <th className="text-left px-6 py-3 text-xs text-[#00d4ff]/60 uppercase">NeoTechnology</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={i} className="border-b border-[#00d4ff]/10 last:border-0 hover:bg-[#0B0D12] transition-colors">
                    <td className="px-6 py-3 text-sm font-bold text-[#C0C5CE]">{row.aspect}</td>
                    <td className="px-6 py-3 text-sm text-[#C0C5CE]/60">{row.freelancer}</td>
                    <td className="px-6 py-3 text-sm text-[#C0C5CE]/60">{row.inhouse}</td>
                    <td className="px-6 py-3 text-sm text-[#00ff88] font-medium">{row.neo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center">
          <button onClick={() => onNavigate('book')} className="bg-[#00d4ff] text-black font-bold px-8 py-3 rounded-lg hover:bg-[#00b8d9] transition-colors mr-4">
            Book a free call
          </button>
          <button onClick={() => onNavigate('pricing')} className="border border-[#00d4ff]/50 text-[#00d4ff] px-8 py-3 rounded-lg hover:border-[#00d4ff] transition-colors">
            View pricing
          </button>
        </div>
      </div>
    </div>
  );
}
