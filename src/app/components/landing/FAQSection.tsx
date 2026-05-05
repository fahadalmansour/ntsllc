import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'How long does a typical project take?',
    a: 'Starter packages launch in 7–10 business days. Professional packages typically take 3–4 weeks. GCC Special engagements run 4–6 weeks due to localization requirements. Enterprise timelines are scoped individually.',
    category: 'Timeline'
  },
  {
    q: 'Do you work with platforms other than the ones listed?',
    a: 'Yes. While we specialize in Shopify, WooCommerce, Salla, Zid, and Wuilt, we have worked on Magento, BigCommerce, and custom-built stores. Send us your platform details and we will confirm fit.',
    category: 'Platforms'
  },
  {
    q: 'Who owns the code and assets you build?',
    a: 'You do. Every deliverable — code, designs, automation workflows, documentation — transfers to you upon final payment. We retain no ownership and no licensing claims over your work.',
    category: 'Ownership'
  },
  {
    q: 'What happens if something breaks after launch?',
    a: 'Every package includes a defined support window (30 days minimum). After that, you can purchase support as quick-fix tickets ($99–$299) or upgrade to an ongoing maintenance agreement.',
    category: 'Support'
  },
  {
    q: 'Do you handle hosting after launch?',
    a: 'Yes, optionally. We offer managed VPS hosting from $5/month and managed n8n automation servers at $149 setup + $15/month. You can also self-host if preferred.',
    category: 'Hosting'
  },
  {
    q: 'How do payments work?',
    a: '50% deposit to begin, 50% upon final delivery. We accept Stripe (cards, ACH, Apple Pay) and bank wires. Enterprise engagements may use milestone-based billing.',
    category: 'Payments'
  },
  {
    q: 'Can I see the work before paying the final invoice?',
    a: 'Always. You will have full access to a staging environment from the first week of any engagement. Final payment is only triggered after you have reviewed and approved the deliverables.',
    category: 'Process'
  },
  {
    q: 'Do you sign NDAs?',
    a: 'Yes. We sign mutual non-disclosure agreements before any project kickoff that involves sharing confidential business information.',
    category: 'Legal'
  },
  {
    q: "What if I'm not technical and don't know what I need?",
    a: "That is exactly who our consulting service is built for. A $299 starter consultation produces a complete requirements document that lays out what you need, why, and what it should cost.",
    category: 'Consulting'
  },
  {
    q: 'Are your prices negotiable?',
    a: 'Our published packages are fixed-price. For Enterprise scope or multi-package commitments, custom pricing is available — schedule a call to discuss.',
    category: 'Pricing'
  },
];

export function FAQSection({ onNavigate }: { onNavigate?: (section: string) => void }) {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const toggleExpanded = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <section className="min-h-screen bg-[#0a0a0a] py-20 px-6 relative overflow-hidden font-mono">
      <div className="absolute inset-0 enterprise-grid opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">

          {/* Left — sticky heading */}
          <div className="lg:sticky lg:top-24">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#12151C] border border-[#00d4ff]/30 rounded-full mb-6">
              <div className="w-2 h-2 bg-[#00ff88] rounded-full animate-pulse"></div>
              <span className="text-[#00d4ff] font-mono text-sm">Frequently Asked Questions</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-[#C0C5CE] mb-6">
              <span className="text-[#00d4ff]">Common questions,</span>
              <br />
              honest answers
            </h2>

            <div className="bg-[#12151C] border border-[#00d4ff]/20 rounded-lg p-6 mt-8">
              <h3 className="text-base font-bold text-[#C0C5CE] mb-2">Still have questions?</h3>
              <p className="text-[#C0C5CE]/60 mb-4 text-sm">
                Book a free 30-minute call — no sales pressure, just answers.
              </p>
              <button
                onClick={() => onNavigate?.('book')}
                className="bg-[#00d4ff] text-black font-bold px-6 py-2.5 rounded-lg hover:bg-[#00b8d9] transition-colors text-sm"
              >
                Book a free call
              </button>
            </div>
          </div>

          {/* Right — accordion */}
          <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isExpanded = expandedItems.has(index);

            return (
              <div
                key={index}
                className="bg-[#12151C] border border-[#00d4ff]/20 rounded-lg overflow-hidden hover:border-[#00d4ff]/40 transition-colors"
              >
                <button
                  onClick={() => toggleExpanded(index)}
                  className="w-full p-6 text-left flex items-start justify-between gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-[#00d4ff]/60 font-mono">[{faq.category}]</span>
                    </div>
                    <h3 className="text-[#C0C5CE] font-mono font-semibold leading-relaxed">
                      {faq.q}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[#00d4ff] flex-shrink-0 mt-1 transition-transform duration-200 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6">
                    <div className="border-t border-[#00d4ff]/10 pt-4">
                      <div className="bg-[#0B0D12] rounded-lg p-4 border-l-2 border-[#00ff88]">
                        <p className="text-[#C0C5CE]/80 font-mono leading-relaxed text-sm">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
}
