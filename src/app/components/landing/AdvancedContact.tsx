import React from 'react';

export function AdvancedContact({ onNavigate }: { onNavigate?: (section: string) => void }) {
  return (
    <section className="py-20 px-6 bg-[#0a0a0a] relative overflow-hidden font-mono">
      <div className="absolute inset-0 enterprise-grid opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">

          {/* Left — sticky heading */}
          <div className="lg:sticky lg:top-24">
            <div className="inline-flex items-center gap-2 bg-[#12151C] border border-[#00d4ff]/30 rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 bg-[#00ff88] rounded-full animate-pulse"></div>
              <span className="text-[#00d4ff] font-mono text-sm">Free 30-minute scoping call</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-[#C0C5CE] mb-4">
              Ready to <span className="text-[#00d4ff]">launch?</span>
            </h2>

            <p className="text-[#C0C5CE]/70 text-base leading-relaxed">
              Book a free 30-minute scoping call. No sales pressure, no commitment.
            </p>
          </div>

          {/* Right — CTAs + contact block */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onNavigate?.('book')}
                style={{ padding: '1rem 2rem', fontFamily: 'inherit' }}
                className="bg-[#00d4ff] text-black font-bold rounded-lg hover:bg-[#00b8d9] transition-colors text-lg"
              >
                Book a call
              </button>
              <button
                onClick={() => onNavigate?.('pricing')}
                style={{ padding: '1rem 2rem', fontFamily: 'inherit' }}
                className="border border-[#00d4ff]/50 text-[#00d4ff] rounded-lg hover:border-[#00d4ff] hover:bg-[#00d4ff]/10 transition-colors text-lg"
              >
                View pricing
              </button>
            </div>

            <div className="bg-[#12151C] border border-[#00d4ff]/20 rounded-lg p-6">
              <div className="font-mono text-sm space-y-1">
                <div className="text-[#00ff88]">$ contact --info</div>
                <div className="text-[#C0C5CE]/80">Email: hello@neotechnology.solutions</div>
                <div className="text-[#C0C5CE]/80">Website: neotechnology.solutions</div>
                <div className="text-[#C0C5CE]/80">Entity: NeoTechnology Solutions LLC (Wyoming)</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
