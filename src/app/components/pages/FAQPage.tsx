import React, { useState } from 'react';

interface Props { onNavigate: (section: string) => void; }

const faqs = [
  {
    category: 'Timeline',
    question: 'How long does a typical project take?',
    answer: 'The Starter package (Salla or Zid build) delivers in 7–10 business days from signed agreement and deposit. The Professional package (Shopify or WooCommerce) takes 14–21 business days. The GCC Special is 14–21 business days. Enterprise timelines are defined in the proposal. These are delivery targets, not estimates — if we cannot meet a timeline, we tell you before signing, not after.',
  },
  {
    category: 'Platforms',
    question: 'Which e-commerce platforms do you work with?',
    answer: 'We build on Shopify, WooCommerce, Salla, Zid, and Wuilt. We also build custom stores for use cases that none of these cover well, primarily multi-vendor marketplaces. We do not have a preferred platform — we recommend based on your market, order volume, and operational requirements.',
  },
  {
    category: 'Ownership',
    question: 'Do you own the code or do I?',
    answer: 'You own everything, always. Every project includes a written IP assignment in the contract. The code, design assets, domain, and data belong to you from day one. We retain no license to your work after delivery.',
  },
  {
    category: 'Support',
    question: 'What happens if something breaks after launch?',
    answer: 'Every package includes a post-launch support window: Starter gets 7 days, Professional and GCC Special get 14 days, Enterprise gets 30 days. During that window, anything that breaks at no additional charge. After the window, support is available as fixed-price quick-fix tickets or an ongoing maintenance agreement. We define "break" in the contract — it means something we built stops working as specified, not new feature requests.',
  },
  {
    category: 'Hosting',
    question: 'Do you provide hosting?',
    answer: 'Yes, as an optional add-on. We provision and manage VPS hosting through GoDaddy and Enom reseller accounts from $5/month. We also configure and manage free-tier options (Vercel, Firebase Hosting) for appropriate projects. For most e-commerce stores, the platform itself handles hosting — Shopify, Salla, and Zid include hosting in their subscription.',
  },
  {
    category: 'Payments',
    question: 'Which payment gateways can you integrate?',
    answer: 'We integrate Moyasar, Tap Payments, HyperPay, PayTabs, Amazon Payment Services, and Stripe. For GCC merchants, we default to Moyasar or Tap as the primary gateway, with Stripe as a secondary for international orders. The GCC Special package includes a full gateway bundle: Mada, Apple Pay, and STC Pay. All GCC integrations are tested against 3DS2 requirements.',
  },
  {
    category: 'Process',
    question: 'What do you need from me to get started?',
    answer: 'We need a 30-minute scoping call, a signed agreement, and a 50% deposit. That is all. We do not require you to write a specification document, choose technology in advance, or have existing credentials. We handle platform account creation, domain setup, and technical onboarding as part of the project.',
  },
  {
    category: 'Legal',
    question: 'What entity are you contracting with?',
    answer: 'NeoTechnology Solutions LLC, a Wyoming limited liability company (Filing ID 2025-001744917, EIN 36-5148912). All contracts are governed by Wyoming law and specify US federal courts as the dispute resolution venue. Every project includes a mutual NDA and IP assignment. We are set up specifically to give GCC entrepreneurs the legal clarity of a US contract.',
  },
  {
    category: 'Consulting',
    question: 'What does AI-powered consulting actually mean?',
    answer: 'Our consulting engagements use the Claude Agent SDK and the Model Context Protocol to produce business requirement documents, technical architecture diagrams, compliance templates, and integration roadmaps significantly faster than traditional consulting. A BRD that would take a consultant two weeks takes us two to four days. You get the same document quality at a fraction of the cost.',
  },
  {
    category: 'Pricing',
    question: 'Can I pay in SAR or other currencies?',
    answer: 'Invoices are issued in USD. We accept international wire transfers, SWIFT payments, and Wise transfers. The USD amounts are fixed in the contract — we do not adjust for exchange rate movements between signing and payment. If you need SAR-denominated invoicing for accounting purposes, contact us before signing.',
  },
];

export function FAQPage({ onNavigate }: Props) {
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(i)) {
        next.delete(i);
      } else {
        next.add(i);
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#C0C5CE] font-mono">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <button onClick={() => onNavigate('home')} className="text-[#00d4ff]/60 hover:text-[#00d4ff] text-sm mb-8 block transition-colors">
          ← Back to home
        </button>

        <h1 className="text-4xl font-bold text-[#00d4ff] mb-4">FAQ</h1>
        <p className="text-[#C0C5CE]/80 text-lg mb-12">
          Answers to the questions we hear most often.
        </p>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-[#12151C] border border-[#00d4ff]/20 rounded-lg overflow-hidden hover:border-[#00d4ff]/40 transition-colors"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-start gap-4 px-6 py-5 text-left"
              >
                <span className="text-[#00d4ff]/40 text-xs flex-shrink-0 mt-0.5 font-bold">[{faq.category}]</span>
                <span className="flex-1 text-sm font-bold text-[#C0C5CE] leading-snug">{faq.question}</span>
                <span className="text-[#00d4ff]/60 flex-shrink-0 text-lg leading-none">
                  {expanded.has(i) ? '−' : '+'}
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-200 ${expanded.has(i) ? 'max-h-[800px]' : 'max-h-0'}`}
              >
                <div className="px-6 pb-5 text-sm text-[#C0C5CE]/70 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-[#12151C] border border-[#00d4ff]/20 rounded-lg p-8 text-center">
          <div className="text-[#C0C5CE]/70 text-sm mb-4">
            Question not answered here?
          </div>
          <button
            onClick={() => onNavigate('book')}
            className="bg-[#00d4ff] text-black font-bold px-8 py-3 rounded-lg hover:bg-[#00b8d9] transition-colors text-sm"
          >
            Book a free call
          </button>
        </div>
      </div>
    </div>
  );
}
