import React, { useState, useEffect, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

function TerminalLine({ text, delay, isCommand = false }: { text: string; delay: number; isCommand?: boolean }) {
  const [display, setDisplay] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      let i = 0;
      const iv = setInterval(() => {
        if (i <= text.length) { setDisplay(text.slice(0, i)); i++; }
        else { clearInterval(iv); setDone(true); }
      }, 38);
      return () => clearInterval(iv);
    }, delay);
    return () => clearTimeout(t);
  }, [text, delay]);

  return (
    <div className="font-mono text-xs leading-relaxed">
      {isCommand
        ? <><span style={{ color: '#00ff88' }}>$ </span><span style={{ color: '#00d4ff' }}>{display}</span></>
        : <span style={{ color: '#C0C5CE', opacity: 0.85 }}>{display}</span>
      }
      {!done && <span style={{ color: '#00ff88' }} className="animate-pulse">▌</span>}
    </div>
  );
}

const TERMINAL_LINES = [
  { text: 'neotech init --platform=production', isCommand: true, delay: 500 },
  { text: '✓  store-setup ............ ready', isCommand: false, delay: 1300 },
  { text: '✓  payment-gateways ....... 8+ active', isCommand: false, delay: 2000 },
  { text: '✓  automation ............. 6,000+ templates', isCommand: false, delay: 2700 },
  { text: '✓  markets ................ US + GCC online', isCommand: false, delay: 3400 },
  { text: 'STATUS: READY FOR DEPLOYMENT', isCommand: false, delay: 4200 },
];

const METRICS = [
  { value: '6,000+', label: 'Automation templates' },
  { value: '8+',     label: 'Payment gateways' },
  { value: '7 days', label: 'First staging' },
  { value: 'GCC+US', label: 'Active markets' },
];

export function Hero({ onNavigate }: { onNavigate: (section: string) => void }) {
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { const t = setTimeout(() => setMounted(true), 80); return () => clearTimeout(t); }, []);

  const scrollToServices = useCallback(() => {
    document.querySelector('#core-services')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const fade = (delay = 0) => ({
    opacity: mounted ? 1 : 0,
    transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
    transform: mounted ? 'translateY(0)' : 'translateY(14px)',
  });

  return (
    <section
      className="relative h-screen flex flex-col overflow-hidden"
      style={{ backgroundColor: '#0a0a0a', fontFamily: "'JetBrains Mono', monospace" }}
    >
      {/* ── Background ── */}
      {/* Ambient radial glows */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: [
          'radial-gradient(ellipse 70% 55% at 75% 45%, rgba(0,212,255,0.07) 0%, transparent 65%)',
          'radial-gradient(ellipse 45% 35% at 8% 85%, rgba(0,255,136,0.04) 0%, transparent 60%)',
        ].join(', ')
      }} />
      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: [
          'linear-gradient(rgba(0,212,255,0.06) 1px, transparent 1px)',
          'linear-gradient(90deg, rgba(0,212,255,0.06) 1px, transparent 1px)',
        ].join(', '),
        backgroundSize: '40px 40px',
      }} />
      {/* CRT scan lines */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.07) 2px, rgba(0,0,0,0.07) 4px)',
      }} />

      {/* ── Main grid ── */}
      <div className="relative z-10 flex-1 flex items-center pt-16">
        <div className="w-full px-6 lg:px-14 xl:px-20 py-4">
          <div className="grid lg:grid-cols-[3fr_2fr] gap-10 xl:gap-16 items-center max-w-[1400px] mx-auto">

            {/* ── LEFT: Editorial headline ── */}
            <div className="relative">

              {/* Watermark chapter number */}
              <div
                className="absolute pointer-events-none select-none"
                style={{
                  top: '-30px', left: '-12px',
                  fontSize: 'clamp(100px, 15vw, 200px)',
                  fontFamily: "'Bebas Neue', monospace",
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                  color: 'transparent',
                  WebkitTextStroke: '1px rgba(0,212,255,0.07)',
                  zIndex: 0,
                  userSelect: 'none',
                }}
              >
                01
              </div>

              {/* Status pill */}
              <div className="relative z-10 mb-4" style={fade(200)}>
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5"
                  style={{
                    border: '1px solid rgba(0,255,136,0.25)',
                    backgroundColor: 'rgba(0,255,136,0.05)',
                    borderRadius: '3px',
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse block" />
                  <span className="font-mono text-xs tracking-widest" style={{ color: '#00ff88' }}>
                    ONLINE · WYOMING LLC · NEOTECHNOLOGY SOLUTIONS
                  </span>
                </div>
              </div>

              {/* Stacked display headline */}
              <h1 className="relative z-10 leading-none mb-4" style={{ ...fade(320) }}>
                <span
                  className="block"
                  style={{
                    fontFamily: "'Bebas Neue', monospace",
                    fontSize: 'clamp(36px, 5.2vw, 76px)',
                    letterSpacing: '0.03em',
                    color: '#C0C5CE',
                  }}
                >
                  THE COMPLETE
                </span>
                <span
                  className="block"
                  style={{
                    fontFamily: "'Bebas Neue', monospace",
                    fontSize: 'clamp(36px, 5.2vw, 76px)',
                    letterSpacing: '0.03em',
                    color: 'transparent',
                    WebkitTextStroke: '2px #00d4ff',
                    textShadow: '0 0 50px rgba(0,212,255,0.35)',
                  }}
                >
                  E-COMMERCE
                </span>
                <span
                  className="block"
                  style={{
                    fontFamily: "'Bebas Neue', monospace",
                    fontSize: 'clamp(36px, 5.2vw, 76px)',
                    letterSpacing: '0.03em',
                    color: '#C0C5CE',
                  }}
                >
                  TECHNOLOGY
                </span>
                <span
                  className="block"
                  style={{
                    fontFamily: "'Bebas Neue', monospace",
                    fontSize: 'clamp(36px, 5.2vw, 76px)',
                    letterSpacing: '0.03em',
                    color: '#C0C5CE',
                    opacity: 0.55,
                  }}
                >
                  PARTNER
                </span>
              </h1>

              {/* Sub-copy */}
              <p
                className="relative z-10 font-mono text-sm leading-relaxed max-w-xl mb-5"
                style={{ color: 'rgba(192,197,206,0.7)', ...fade(460) }}
              >
                From first store setup to advanced workflow automation — NeoTechnology Solutions delivers the complete technical infrastructure GCC and US merchants need.
              </p>

              {/* CTA row */}
              <div className="relative z-10 flex flex-wrap gap-4 mb-5" style={fade(560)}>
                <button
                  onClick={() => onNavigate('pricing')}
                  className="font-mono text-sm font-bold tracking-widest px-8 py-3 transition-all duration-200"
                  style={{
                    backgroundColor: '#00d4ff',
                    color: '#0a0a0a',
                    border: '2px solid #00d4ff',
                    borderRadius: '3px',
                    boxShadow: '0 0 30px rgba(0,212,255,0.22)',
                  }}
                  onMouseEnter={e => Object.assign((e.currentTarget as HTMLElement).style, { boxShadow: '0 0 55px rgba(0,212,255,0.45)', transform: 'translateY(-2px)' })}
                  onMouseLeave={e => Object.assign((e.currentTarget as HTMLElement).style, { boxShadow: '0 0 30px rgba(0,212,255,0.22)', transform: 'translateY(0)' })}
                >
                  VIEW PRICING
                </button>
                <button
                  onClick={() => onNavigate('services')}
                  className="font-mono text-sm font-bold tracking-widest px-8 py-3 transition-all duration-200"
                  style={{
                    backgroundColor: 'transparent',
                    color: '#00ff88',
                    border: '2px solid rgba(0,255,136,0.35)',
                    borderRadius: '3px',
                  }}
                  onMouseEnter={e => Object.assign((e.currentTarget as HTMLElement).style, { borderColor: '#00ff88', backgroundColor: 'rgba(0,255,136,0.07)' })}
                  onMouseLeave={e => Object.assign((e.currentTarget as HTMLElement).style, { borderColor: 'rgba(0,255,136,0.35)', backgroundColor: 'transparent' })}
                >
                  EXPLORE SERVICES
                </button>
              </div>

              {/* Metrics strip */}
              <div
                className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-0"
                style={{
                  borderTop: '1px solid rgba(0,212,255,0.12)',
                  ...fade(700),
                }}
              >
                {METRICS.map((m, i) => (
                  <div key={i} className="pt-4 pr-6">
                    <div
                      className="font-mono font-bold mb-1"
                      style={{ fontSize: 'clamp(18px, 2vw, 24px)', color: '#00d4ff' }}
                    >
                      {m.value}
                    </div>
                    <div className="font-mono text-xs" style={{ color: 'rgba(192,197,206,0.45)' }}>
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT: Terminal panel ── */}
            <div style={fade(440)}>
              <div
                className="relative overflow-hidden"
                style={{
                  border: '1px solid rgba(0,212,255,0.22)',
                  borderRadius: '5px',
                  boxShadow: '0 0 70px rgba(0,212,255,0.1), inset 0 0 40px rgba(0,212,255,0.02)',
                }}
              >
                {/* Title bar */}
                <div
                  className="flex items-center justify-between px-4 py-3"
                  style={{ backgroundColor: '#0B0D12', borderBottom: '1px solid rgba(0,212,255,0.14)' }}
                >
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#ff5f57' }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#febc2e' }} />
                    <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: '#00ff88' }} />
                  </div>
                  <span className="font-mono text-xs" style={{ color: 'rgba(192,197,206,0.4)' }}>
                    neo@deployment-terminal
                  </span>
                  <span className="font-mono text-xs" style={{ color: 'rgba(0,212,255,0.5)' }}>
                    {new Date().toLocaleTimeString()}
                  </span>
                </div>

                {/* Terminal body */}
                <div
                  className="p-6 space-y-2.5"
                  style={{ backgroundColor: '#080A0F', minHeight: '240px' }}
                >
                  {TERMINAL_LINES.map((l, i) => (
                    <TerminalLine key={i} text={l.text} delay={l.delay} isCommand={l.isCommand} />
                  ))}
                </div>

                {/* Cyan status bar */}
                <div
                  className="flex items-center justify-between px-4 py-2 font-mono text-xs font-bold tracking-wider"
                  style={{ backgroundColor: '#00d4ff', color: '#0a0a0a' }}
                >
                  <span>● READY</span>
                  <span>neotechnology.solutions</span>
                  <span>Wyoming LLC</span>
                </div>
              </div>

              {/* Mini sub-terminal */}
              <div
                className="mt-3 px-4 py-3 font-mono text-xs"
                style={{
                  backgroundColor: '#0B0D12',
                  border: '1px solid rgba(0,255,136,0.15)',
                  borderRadius: '4px',
                }}
              >
                <span style={{ color: '#00ff88' }}>$ </span>
                <span style={{ color: 'rgba(192,197,206,0.6)' }}>
                  Ready for deployment · First staging in 7 days
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 flex justify-center pb-6">
        <button
          onClick={scrollToServices}
          className="p-2 transition-colors duration-200 animate-bounce"
          style={{ color: 'rgba(0,212,255,0.35)' }}
          aria-label={language === 'ar' ? 'انتقل للأسفل' : 'Scroll to services'}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(0,212,255,0.8)')}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(0,212,255,0.35)')}
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
