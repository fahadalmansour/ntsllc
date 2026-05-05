import React from 'react';

interface Props { onNavigate: (section: string) => void; }

const steps = [
  {
    number: '1',
    title: 'Discovery',
    body: 'We start with a free 30-minute scoping call. No sales script, no pitch deck — just an honest conversation about what you need, what you have, and what will actually work for your business. You will leave with clarity, whether you hire us or not.',
  },
  {
    number: '2',
    title: 'Proposal',
    body: 'Within one business day, you receive a written proposal: exact scope, exact deliverables, exact price. No ranges, no "it depends." If the proposal does not fit, we adjust it once before moving on.',
  },
  {
    number: '3',
    title: 'Kickoff',
    body: 'After a 50% deposit and signed agreement, we open a shared workspace. You get access to our project management system, a dedicated Slack or WhatsApp thread, and a project timeline with milestones.',
  },
  {
    number: '4',
    title: 'Build',
    body: 'Development happens on a staging environment you can access from day one. We provide weekly written updates. If something needs to change mid-project, we handle scope changes with a written amendment — no surprises.',
  },
  {
    number: '5',
    title: 'Launch',
    body: 'Once you have reviewed and approved every deliverable on staging, we deploy to production. The final invoice is triggered at this point, not before. We handle DNS changes, SSL activation, and go-live testing.',
  },
  {
    number: '6',
    title: 'Support',
    body: 'Every package includes a defined support window after launch. During that window, we fix anything that breaks at no charge. After the window, support is available as quick-fix tickets or an ongoing maintenance agreement.',
  },
];

export function ProcessPage({ onNavigate }: Props) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#C0C5CE] font-mono">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <button onClick={() => onNavigate('home')} className="text-[#00d4ff]/60 hover:text-[#00d4ff] text-sm mb-8 block transition-colors">
          ← Back to home
        </button>

        <h1 className="text-4xl font-bold text-[#00d4ff] mb-4">How we work</h1>
        <p className="text-[#C0C5CE]/80 text-lg mb-12">
          Six steps from first conversation to long-term partnership.
        </p>

        <div className="space-y-6">
          {steps.map((step, i) => (
            <div key={i} className="bg-[#12151C] border border-[#00d4ff]/20 rounded-lg p-8 hover:border-[#00d4ff]/40 transition-colors">
              <div className="flex items-start gap-6">
                <div className="text-4xl font-bold text-[#00d4ff] flex-shrink-0 w-8">{step.number}</div>
                <div>
                  <h3 className="text-xl font-bold text-[#C0C5CE] mb-3">{step.title}</h3>
                  <p className="text-[#C0C5CE]/70 leading-relaxed text-sm">{step.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => onNavigate('book')}
            className="bg-[#00d4ff] text-black font-bold px-8 py-3 rounded-lg hover:bg-[#00b8d9] transition-colors mr-4"
          >
            Book a free scoping call
          </button>
          <button
            onClick={() => onNavigate('pricing')}
            className="border border-[#00d4ff]/50 text-[#00d4ff] px-8 py-3 rounded-lg hover:border-[#00d4ff] transition-colors"
          >
            View pricing
          </button>
        </div>
      </div>
    </div>
  );
}
