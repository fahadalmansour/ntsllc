import React from 'react';

interface Props { onNavigate: (section: string) => void; }

export function BookingPage({ onNavigate }: Props) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#C0C5CE] font-mono">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <button onClick={() => onNavigate('home')} className="text-[#00d4ff]/60 hover:text-[#00d4ff] text-sm mb-8 block transition-colors">
          ← Back to home
        </button>

        <h1 className="text-4xl font-bold text-[#00d4ff] mb-4">Book a free scoping call</h1>
        <p className="text-[#C0C5CE]/80 text-lg mb-10">
          30 minutes. No sales script. You leave with clarity on what your project needs, what it will cost, and how long it will take — whether you hire us or not.
        </p>

        <div className="space-y-4 mb-10">
          <div className="bg-[#12151C] border border-[#00d4ff]/20 rounded-lg p-5">
            <div className="text-[#00d4ff] font-bold text-sm mb-2">What we cover</div>
            <div className="space-y-2 text-sm text-[#C0C5CE]/70">
              <div>Your current setup and what is not working</div>
              <div>The platform and technology stack that fits your goals</div>
              <div>A realistic scope for the first deliverable</div>
              <div>Estimated timeline and fixed price range</div>
            </div>
          </div>

          <div className="bg-[#12151C] border border-[#00d4ff]/20 rounded-lg p-5">
            <div className="text-[#00d4ff] font-bold text-sm mb-2">Before the call</div>
            <div className="space-y-2 text-sm text-[#C0C5CE]/70">
              <div>No preparation required. Come with your questions.</div>
              <div>If you have an existing store, a link is helpful but not required.</div>
              <div>English or Arabic — your preference.</div>
            </div>
          </div>
        </div>

        <div className="bg-[#12151C] border border-[#00d4ff]/20 rounded-lg p-6">
          <div className="text-[#00d4ff] font-bold mb-4">Schedule your call</div>
          <div className="bg-[#0B0D12] border border-[#00d4ff]/10 rounded-lg p-6 text-center">
            <div className="text-[#C0C5CE]/50 text-sm mb-4">
              Calendar scheduling is being configured. To book immediately, reach out directly:
            </div>
            <a
              href="mailto:contact@neotechnology.solutions?subject=Scoping call request"
              className="text-[#00d4ff] hover:text-[#00b8d9] transition-colors text-sm font-medium"
            >
              contact@neotechnology.solutions
            </a>
            <div className="mt-3 text-[#C0C5CE]/40 text-xs">
              Include your timezone and preferred times. We respond within 4 hours during business hours.
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => onNavigate('contact')}
            className="border border-[#00d4ff]/50 text-[#00d4ff] px-8 py-3 rounded-lg hover:border-[#00d4ff] transition-colors text-sm"
          >
            Send us a message instead
          </button>
        </div>
      </div>
    </div>
  );
}
