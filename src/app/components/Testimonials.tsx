import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote, Terminal, Users, Award, Clock, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';

interface TestimonialsProps {
  onNavigate?: (section: string) => void;
}

const guarantees = [
  {
    icon: CheckCircle,
    color: '#00d4ff',
    title: 'Fixed-price contract',
    body: 'You see the exact price before signing. No hourly billing, no scope creep charges.'
  },
  {
    icon: Terminal,
    color: '#00ff88',
    title: 'Staging from day one',
    body: 'Access a live staging environment from week one and review every build increment.'
  },
  {
    icon: Award,
    color: '#ffa500',
    title: 'Full IP ownership',
    body: 'Every line of code and every asset transfers to you on final payment — no lock-in.'
  },
  {
    icon: Clock,
    color: '#7c6ef7',
    title: '30-day support included',
    body: 'Post-launch support window in every package. No asterisks, no add-on fee.'
  }
];

const stats = [
  { value: '7', label: 'Days to first staging', color: '#00d4ff' },
  { value: '50%', label: 'Deposit to start', color: '#00ff88' },
  { value: '$0', label: 'Surprise fees', color: '#ffa500' },
  { value: '100%', label: 'IP transferred to you', color: '#7c6ef7' }
];

export function Testimonials({ onNavigate }: TestimonialsProps) {
  return (
    <section className="bg-[#0B0D12] py-20 px-6 relative" id="testimonials">
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">

          {/* Left — sticky heading + stats */}
          <div className="lg:sticky lg:top-24">
            <div className="inline-flex items-center gap-2 bg-[#12151C] border border-[#00d4ff]/30 rounded-lg px-4 py-2 mb-6">
              <Terminal className="w-4 h-4 text-[#00d4ff]" />
              <span className="text-sm text-[#C0C5CE] font-mono">$ client.testimonials()</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-[#C0C5CE] font-mono mb-4">
              Built on trust.{' '}
              <span className="text-[#00d4ff]">Proven by results.</span>
            </h2>

            <p className="text-[#C0C5CE]/70 font-mono text-sm leading-relaxed mb-10">
              Client testimonials are added as projects complete. In the meantime, here is exactly what every engagement guarantees.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <div key={i} className="bg-[#12151C] border border-[#00d4ff]/20 rounded-lg p-4">
                  <div className="text-2xl font-bold font-mono mb-1" style={{ color: s.color }}>
                    {s.value}
                  </div>
                  <div className="text-[#C0C5CE]/60 font-mono text-xs">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <button
                onClick={() => onNavigate?.('contact')}
                className="border border-[#00ff88]/50 text-[#00ff88] px-8 py-3 rounded-lg hover:border-[#00ff88] hover:bg-[#00ff88]/10 transition-colors font-mono"
              >
                Book a free call →
              </button>
            </div>
          </div>

          {/* Right — guarantee cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {guarantees.map((g, i) => {
              const Icon = g.icon;
              return (
                <div
                  key={i}
                  className="bg-[#12151C] border border-[#00d4ff]/20 rounded-lg p-8 hover:border-[#00d4ff]/40 transition-colors"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${g.color}15` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: g.color }} />
                  </div>
                  <h3 className="text-lg font-bold font-mono mb-3" style={{ color: g.color }}>
                    {g.title}
                  </h3>
                  <p className="text-[#C0C5CE]/80 font-mono text-sm leading-relaxed">
                    {g.body}
                  </p>
                </div>
              );
            })}

            {/* Coming soon card */}
            <div className="sm:col-span-2 bg-[#12151C] border border-[#00d4ff]/10 rounded-lg p-8 border-dashed">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-2 h-2 bg-[#00ff88] rounded-full animate-pulse" />
                <span className="text-[#00ff88] font-mono text-sm">ACCEPTING FIRST CLIENTS</span>
              </div>
              <p className="text-[#C0C5CE]/60 font-mono text-sm leading-relaxed">
                We are actively onboarding early clients. Your project will be documented and featured here upon completion — with your permission.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Testimonials;
