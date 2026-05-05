import React from 'react';

interface Props { onNavigate: (section: string) => void; }

const articles = [
  {
    number: '01',
    title: 'The complete guide to choosing a payment gateway for your Saudi e-commerce store',
    available: true,
    key: 'blog/post',
  },
  {
    number: '02',
    title: 'Salla vs. Zid vs. Shopify: which platform is right for GCC merchants in 2026?',
    available: false,
    key: null,
  },
  {
    number: '03',
    title: 'How to register a US LLC as a Saudi entrepreneur — a practical walkthrough',
    available: false,
    key: null,
  },
  {
    number: '04',
    title: 'ZATCA compliance for e-commerce stores: VAT invoicing and e-invoicing requirements',
    available: false,
    key: null,
  },
  {
    number: '05',
    title: 'n8n automation for e-commerce: the 10 workflows every store owner should run',
    available: false,
    key: null,
  },
  {
    number: '06',
    title: 'Why most Arabic RTL implementations break at checkout — and how to fix them',
    available: false,
    key: null,
  },
  {
    number: '07',
    title: 'WhatsApp Business API vs. standard WhatsApp: what merchants need to know',
    available: false,
    key: null,
  },
  {
    number: '08',
    title: 'The true cost of building an e-commerce store: a line-by-line breakdown',
    available: false,
    key: null,
  },
  {
    number: '09',
    title: 'How to migrate from WooCommerce to Shopify without losing orders or SEO',
    available: false,
    key: null,
  },
  {
    number: '10',
    title: 'US dropshipping in 2026: the automation stack that makes thin margins work',
    available: false,
    key: null,
  },
];

export function BlogIndexPage({ onNavigate }: Props) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#C0C5CE] font-mono">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <button onClick={() => onNavigate('home')} className="text-[#00d4ff]/60 hover:text-[#00d4ff] text-sm mb-8 block transition-colors">
          ← Back to home
        </button>

        <h1 className="text-4xl font-bold text-[#00d4ff] mb-4">Insights</h1>
        <p className="text-[#C0C5CE]/80 text-lg mb-12">
          For serious e-commerce operators building in the GCC and US markets.
        </p>

        <div className="space-y-3">
          {articles.map((article) => (
            <div
              key={article.number}
              className="bg-[#12151C] border border-[#00d4ff]/20 rounded-lg p-6 hover:border-[#00d4ff]/40 transition-colors"
            >
              <div className="flex items-start gap-4">
                <span className="text-[#00d4ff]/40 text-sm font-bold flex-shrink-0 w-8">{article.number}</span>
                <div className="flex-1 min-w-0">
                  {article.available && article.key ? (
                    <button
                      onClick={() => onNavigate(article.key!)}
                      className="text-[#C0C5CE] hover:text-[#00d4ff] text-left transition-colors leading-snug font-medium text-sm"
                    >
                      {article.title}
                    </button>
                  ) : (
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-[#C0C5CE]/50 text-sm leading-snug">{article.title}</span>
                      <span className="text-xs text-[#C0C5CE]/30 border border-[#C0C5CE]/20 rounded px-2 py-0.5 flex-shrink-0">
                        coming soon
                      </span>
                    </div>
                  )}
                </div>
                {article.available && (
                  <span className="text-[#00d4ff] text-sm flex-shrink-0">→</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-[#12151C] border border-[#00ff88]/20 rounded-lg p-6 text-center">
          <div className="text-[#C0C5CE]/70 text-sm mb-3">
            New articles published monthly. Questions before the next article?
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="text-[#00d4ff] hover:text-[#00b8d9] text-sm transition-colors"
          >
            Contact us directly →
          </button>
        </div>
      </div>
    </div>
  );
}
