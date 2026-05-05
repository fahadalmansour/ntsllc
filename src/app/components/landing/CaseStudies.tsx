import React from 'react';

export function CaseStudies({ onNavigate }: { onNavigate?: (section: string) => void }) {
  return (
    <section className="py-20 px-6 bg-[#0a0a0a] relative overflow-hidden font-mono">
      <div className="absolute inset-0 enterprise-grid opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">

          {/* Left — sticky heading */}
          <div className="lg:sticky lg:top-24">
            <div className="inline-flex items-center gap-2 bg-[#12151C] border border-[#00d4ff]/30 rounded-lg px-4 py-2 mb-6">
              <span className="text-sm text-[#C0C5CE] font-mono">$ partner --info</span>
            </div>

            <h2 className="text-4xl font-bold text-[#C0C5CE] mb-4">
              Regional partner
            </h2>
            <p className="text-[#C0C5CE]/60 text-base">
              For clients operating in Saudi Arabia, we work alongside an independent local partner.
            </p>
          </div>

          {/* Right — partner card */}
          <div className="bg-[#12151C] border border-[#00d4ff]/20 rounded-lg p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-[#00d4ff]/10 border border-[#00d4ff]/30 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-[#00d4ff] font-bold text-lg">SA</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#C0C5CE] mb-1">
                Fahad Saad Fahad Almansour Office for Electronic Services
              </h3>
              <div className="inline-flex items-center gap-2 bg-[#00d4ff]/10 border border-[#00d4ff]/30 rounded-full px-3 py-1">
                <div className="w-1.5 h-1.5 bg-[#00ff88] rounded-full"></div>
                <span className="text-xs text-[#00d4ff]">Honorary partner · Saudi Arabia</span>
              </div>
            </div>
          </div>

          <p className="text-[#C0C5CE]/80 leading-relaxed mb-6">
            An independent Saudi-registered office that supports our regional client relationships and on-the-ground engagement in the Kingdom.
          </p>

          <div className="bg-[#0B0D12] border border-[#C0C5CE]/10 rounded-lg p-4">
            <p className="text-[#C0C5CE]/50 text-xs leading-relaxed">
              NeoTechnology Solutions LLC and the Almansour Office are separate legal entities; this is a relationship-based partnership, not a parent-subsidiary structure.
            </p>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
