import React, { useState } from 'react';

interface Props { onNavigate: (section: string) => void; }

type FormState = 'idle' | 'submitting' | 'success' | 'error';

const markets = ['Saudi Arabia', 'United Arab Emirates', 'Kuwait', 'Bahrain', 'Qatar', 'Oman', 'United States', 'Other'];
const stages = ['Planning — haven\'t started yet', 'Active — store is live', 'Scaling — past 1,000 orders/month', 'Enterprise — 10,000+ orders/month'];

export function ContactPage({ onNavigate }: Props) {
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    market: '',
    stage: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setErrorMsg('');

    try {
      const res = await fetch('/forms/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as any).message || `HTTP ${res.status}`);
      }

      setFormState('success');
    } catch (err: unknown) {
      setFormState('error');
      setErrorMsg(err instanceof Error ? err.message : 'Submission failed. Please try again or email us directly.');
    }
  };

  if (formState === 'success') {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-[#C0C5CE] font-mono flex items-center justify-center">
        <div className="max-w-lg w-full mx-4">
          <div className="bg-[#12151C] border border-[#00ff88]/30 rounded-lg p-8 text-center">
            <div className="text-[#00ff88] text-4xl mb-4">✓</div>
            <h2 className="text-xl font-bold text-[#00ff88] mb-3">Message received</h2>
            <p className="text-[#C0C5CE]/70 text-sm mb-6">
              We will respond within one business day. For urgent matters, reach us at contact@neotechnology.solutions.
            </p>
            <button onClick={() => onNavigate('home')} className="text-[#00d4ff] hover:text-[#00b8d9] text-sm transition-colors">
              ← Back to home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#C0C5CE] font-mono">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <button onClick={() => onNavigate('home')} className="text-[#00d4ff]/60 hover:text-[#00d4ff] text-sm mb-8 block transition-colors">
          ← Back to home
        </button>

        <h1 className="text-4xl font-bold text-[#00d4ff] mb-4">Contact</h1>
        <p className="text-[#C0C5CE]/80 text-lg mb-10">
          Tell us about your project. We respond within one business day.
        </p>

        <div className="bg-[#12151C] border border-[#00d4ff]/10 rounded-lg p-4 mb-8 text-xs text-[#C0C5CE]/50 space-y-1">
          <div>contact@neotechnology.solutions</div>
          <div>NeoTechnology Solutions LLC · Wyoming, United States</div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs text-[#00d4ff]/70 mb-1 uppercase tracking-wide">Full name *</label>
            <input
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full bg-[#12151C] border border-[#00d4ff]/20 rounded-lg px-4 py-3 text-sm text-[#C0C5CE] placeholder-[#C0C5CE]/30 focus:outline-none focus:border-[#00d4ff]/60 transition-colors"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-xs text-[#00d4ff]/70 mb-1 uppercase tracking-wide">Email address *</label>
            <input
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full bg-[#12151C] border border-[#00d4ff]/20 rounded-lg px-4 py-3 text-sm text-[#C0C5CE] placeholder-[#C0C5CE]/30 focus:outline-none focus:border-[#00d4ff]/60 transition-colors"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-xs text-[#00d4ff]/70 mb-1 uppercase tracking-wide">Company or store name</label>
            <input
              name="company"
              type="text"
              value={form.company}
              onChange={handleChange}
              className="w-full bg-[#12151C] border border-[#00d4ff]/20 rounded-lg px-4 py-3 text-sm text-[#C0C5CE] placeholder-[#C0C5CE]/30 focus:outline-none focus:border-[#00d4ff]/60 transition-colors"
              placeholder="Optional"
            />
          </div>

          <div>
            <label className="block text-xs text-[#00d4ff]/70 mb-1 uppercase tracking-wide">Primary market</label>
            <select
              name="market"
              value={form.market}
              onChange={handleChange}
              className="w-full bg-[#12151C] border border-[#00d4ff]/20 rounded-lg px-4 py-3 text-sm text-[#C0C5CE] focus:outline-none focus:border-[#00d4ff]/60 transition-colors appearance-none"
            >
              <option value="">Select market</option>
              {markets.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs text-[#00d4ff]/70 mb-1 uppercase tracking-wide">Business stage</label>
            <select
              name="stage"
              value={form.stage}
              onChange={handleChange}
              className="w-full bg-[#12151C] border border-[#00d4ff]/20 rounded-lg px-4 py-3 text-sm text-[#C0C5CE] focus:outline-none focus:border-[#00d4ff]/60 transition-colors appearance-none"
            >
              <option value="">Select stage</option>
              {stages.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs text-[#00d4ff]/70 mb-1 uppercase tracking-wide">Message *</label>
            <textarea
              name="message"
              required
              rows={5}
              value={form.message}
              onChange={handleChange}
              className="w-full bg-[#12151C] border border-[#00d4ff]/20 rounded-lg px-4 py-3 text-sm text-[#C0C5CE] placeholder-[#C0C5CE]/30 focus:outline-none focus:border-[#00d4ff]/60 transition-colors resize-none"
              placeholder="Describe what you need built or fixed..."
            />
          </div>

          {formState === 'error' && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-sm text-red-400">
              {errorMsg || 'Something went wrong. Please try again.'}
            </div>
          )}

          <button
            type="submit"
            disabled={formState === 'submitting'}
            className="w-full bg-[#00d4ff] text-black font-bold py-3 rounded-lg hover:bg-[#00b8d9] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {formState === 'submitting' ? 'Sending...' : 'Send message'}
          </button>
        </form>
      </div>
    </div>
  );
}
