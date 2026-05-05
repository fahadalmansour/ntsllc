import React from 'react';

interface HowItWorksProps {
  onNavigate?: (section: string) => void;
  className?: string;
}

const steps = [
  {
    number: '1',
    title: 'Discovery',
    description: 'Free 30-minute scoping call. No sales pressure, just an honest conversation.',
    color: '#00d4ff',
  },
  {
    number: '2',
    title: 'Proposal',
    description: 'Fixed pricing and exact deliverables within one business day.',
    color: '#00ff88',
  },
  {
    number: '3',
    title: 'Kickoff',
    description: '50% deposit + signed agreement → shared project workspace opens.',
    color: '#ffa500',
  },
  {
    number: '4',
    title: 'Build',
    description: 'Staging environment you can access from day one. Weekly updates.',
    color: '#7c6ef7',
  },
  {
    number: '5',
    title: 'Launch',
    description: 'Deploy to production after your approval. Final invoice on launch.',
    color: '#ff6b6b',
  },
  {
    number: '6',
    title: 'Support',
    description: 'Defined support window included. Quick-fix or maintenance after that.',
    color: '#4ae54a',
  },
];

export function HowItWorks({ onNavigate, className = '' }: HowItWorksProps) {
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
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">

          {/* Left — sticky heading */}
          <div className="lg:sticky lg:top-24">
            <div className="inline-flex items-center gap-2 bg-[#12151C] border border-[#00d4ff]/30 rounded-lg px-4 py-2 mb-6">
              <span className="text-sm text-[#C0C5CE] font-mono">$ process --show-steps</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-[#C0C5CE] font-mono mb-4">
              A clear process, <span className="text-[#00d4ff]">every time</span>
            </h2>
            <p className="text-[#C0C5CE]/80 font-mono text-lg mb-8">
              Six steps from first conversation to long-term partnership.
            </p>

            <button
              onClick={() => onNavigate?.('process')}
              className="border border-[#00d4ff]/50 text-[#00d4ff] px-8 py-3 rounded-lg hover:border-[#00d4ff] hover:bg-[#00d4ff]/10 transition-colors font-mono"
            >
              See full process →
            </button>
          </div>

          {/* Right — steps grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-[#12151C] border border-[#00d4ff]/20 rounded-lg p-6 hover:border-[#00d4ff]/40 transition-colors"
              >
                <div
                  className="text-4xl font-bold font-mono mb-3"
                  style={{ color: step.color }}
                >
                  {step.number}
                </div>
                <h3 className="text-lg font-bold text-[#C0C5CE] font-mono mb-2">
                  {step.title}
                </h3>
                <p className="text-[#C0C5CE]/70 font-mono text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
