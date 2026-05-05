import React from 'react';

interface ProblemSolutionProps {
  onNavigate?: (section: string) => void;
  className?: string;
}

const cards = [
  {
    number: '01',
    title: 'US-incorporated structure',
    body: 'A Wyoming LLC framework gives every client engagement the predictability of US contract law, clear IP protection, and transparent governance.',
    color: '#00d4ff',
  },
  {
    number: '02',
    title: 'E-commerce native',
    body: 'Every line of code, every workflow, every integration is built specifically for online stores — Shopify, WooCommerce, Salla, Zid, and beyond.',
    color: '#00ff88',
  },
  {
    number: '03',
    title: 'Transparent pricing',
    body: 'Fixed-price packages starting at $999. No hourly billing, no surprise fees, no vendor lock-in. You see the price before you commit.',
    color: '#ffa500',
  },
  {
    number: '04',
    title: 'AI-native operations',
    body: 'Powered by Claude Agent SDK and MCP, our automation turns multi-step setup into one-click workflows — and keeps getting smarter as you scale.',
    color: '#7c6ef7',
  },
];

export function ProblemSolution({ onNavigate, className = '' }: ProblemSolutionProps) {
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
              <span className="text-sm text-[#C0C5CE] font-mono">$ why-neotechnology --list</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-[#C0C5CE] font-mono mb-6">
              Built for merchants who{' '}
              <span className="text-[#00d4ff]">refuse to compromise</span>
            </h2>

            <p className="text-[#C0C5CE]/60 font-mono text-sm leading-relaxed">
              Four principles we never trade away — no matter the project size.
            </p>
          </div>

          {/* Right — cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {cards.map((card, index) => (
              <div
                key={index}
                className="bg-[#12151C] border border-[#00d4ff]/20 rounded-lg p-8 hover:border-[#00d4ff]/40 transition-colors"
              >
                <div
                  className="text-3xl font-bold font-mono mb-4"
                  style={{ color: card.color }}
                >
                  {card.number}
                </div>
                <h3
                  className="text-xl font-bold font-mono mb-3"
                  style={{ color: card.color }}
                >
                  {card.title}
                </h3>
                <p className="text-[#C0C5CE]/80 font-mono leading-relaxed text-sm">
                  {card.body}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
