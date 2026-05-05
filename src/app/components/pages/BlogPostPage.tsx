import React from 'react';

interface Props { onNavigate: (section: string) => void; }

export function BlogPostPage({ onNavigate }: Props) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#C0C5CE] font-mono">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <button onClick={() => onNavigate('blog')} className="text-[#00d4ff]/60 hover:text-[#00d4ff] text-sm mb-8 block transition-colors">
          ← Back to insights
        </button>

        <div className="text-[#C0C5CE]/50 text-xs mb-4">May 2026 · 12 min read · Payment Solutions</div>

        <h1 className="text-3xl font-bold text-[#00d4ff] mb-8 leading-tight">
          The complete guide to choosing a payment gateway for your Saudi e-commerce store
        </h1>

        <div className="space-y-6 text-sm text-[#C0C5CE]/80 leading-relaxed">

          <p>
            Choosing the wrong payment gateway is one of the most expensive mistakes a Saudi e-commerce merchant can make. The costs are not always obvious — a gateway that works for US merchants may decline 30–40% of Saudi cards, display no Arabic UI at checkout, and leave you legally exposed under SAMA regulations. This guide covers what actually matters when evaluating a gateway for the Saudi market.
          </p>

          <h2 className="text-lg font-bold text-[#C0C5CE] pt-4">The Saudi payment landscape in 2026</h2>

          <p>
            Saudi Arabia's digital payment market is dominated by a small number of methods that most global gateways handle poorly. Mada, the Saudi national debit network, accounts for the majority of card transactions. Apple Pay adoption is high among smartphone users. STC Pay, operated by STC, is the dominant mobile wallet. Tamara and Tabby lead the buy-now-pay-later segment.
          </p>

          <p>
            Any gateway that cannot process Mada natively will lose a significant share of Saudi transactions. "Natively" means more than technical support — it means no redirect to an external Mada form, no friction that breaks the checkout flow, and proper Arabic display throughout.
          </p>

          <h2 className="text-lg font-bold text-[#C0C5CE] pt-4">The five gateways worth evaluating</h2>

          <div className="bg-[#12151C] border border-[#00d4ff]/20 rounded-lg p-6 space-y-5">
            <div>
              <div className="text-[#00d4ff] font-bold mb-1">Moyasar</div>
              <p>Saudi-founded, Saudi-focused. Mada, Visa, Mastercard, Apple Pay, and STC Pay in a single integration. Arabic-first dashboard, SAMA-compliant, VAT invoicing built in. Best choice for pure Saudi-market stores. Pricing: 1.9% per transaction, no monthly fees at entry level.</p>
            </div>
            <div>
              <div className="text-[#00d4ff] font-bold mb-1">Tap Payments</div>
              <p>Gulf-wide coverage. Strong in Saudi Arabia, UAE, Kuwait, Bahrain, and Qatar with a single API. Handles Mada, KNET, BENEFIT, and regional methods. Better choice if you sell across multiple GCC countries. Pricing: varies by market and volume.</p>
            </div>
            <div>
              <div className="text-[#00d4ff] font-bold mb-1">HyperPay</div>
              <p>High-volume regional processor. Preferred by larger merchants processing millions monthly. Offers advanced fraud tools and dedicated support. Not the best fit for stores under SAR 500,000/month in volume. Pricing: negotiated by volume.</p>
            </div>
            <div>
              <div className="text-[#00d4ff] font-bold mb-1">PayTabs</div>
              <p>Middle East and North Africa coverage. Supports SADAD (Saudi bill payment) which Moyasar and Tap do not. Useful if your customer base includes B2B buyers who pay via SADAD. Pricing: 2.5–2.85% per transaction.</p>
            </div>
            <div>
              <div className="text-[#00d4ff] font-bold mb-1">Stripe</div>
              <p>Stripe does not support Mada natively as of 2026. It processes Visa and Mastercard issued by Saudi banks, but Mada-branded debit cards will fail. Stripe is appropriate for Saudi merchants selling to US or European customers, not for domestic Saudi checkout.</p>
            </div>
          </div>

          <h2 className="text-lg font-bold text-[#C0C5CE] pt-4">What to look for beyond payment methods</h2>

          <p>
            The payment method list is the starting point, not the complete picture. Before committing to a gateway, evaluate these four factors:
          </p>

          <p>
            <span className="text-[#00d4ff]">SAMA compliance.</span> The Saudi Central Bank (SAMA) regulates payment processing in the Kingdom. Your gateway must hold the appropriate license. Both Moyasar and Tap Payments are SAMA-licensed. An unlicensed gateway is an operational and legal risk.
          </p>

          <p>
            <span className="text-[#00d4ff]">3DS2 and fraud handling.</span> 3D Secure 2 is mandatory for card transactions above certain thresholds in Saudi Arabia. A gateway that does not implement 3DS2 correctly will face high decline rates from issuing banks. Ask specifically about 3DS2 and exemption handling before signing.
          </p>

          <p>
            <span className="text-[#00d4ff]">Refund and chargeback process.</span> Saudi consumers have high chargeback rates in some categories. The time to dispute resolution and the gateway's chargeback fee structure matters significantly at scale.
          </p>

          <p>
            <span className="text-[#00d4ff]">Settlement currency and timing.</span> Most Saudi gateways settle in SAR to a Saudi bank account. If you need USD settlement to a US entity — for example, if you are operating through a US LLC — confirm the settlement options and foreign exchange rates explicitly.
          </p>

          <h2 className="text-lg font-bold text-[#C0C5CE] pt-4">Our recommendation by use case</h2>

          <div className="bg-[#12151C] border border-[#00ff88]/20 rounded-lg p-6 space-y-3 text-sm">
            <div className="flex gap-3">
              <span className="text-[#00ff88] flex-shrink-0">▸</span>
              <span><span className="text-[#C0C5CE]">Saudi-only store, under SAR 1M/year:</span> Moyasar</span>
            </div>
            <div className="flex gap-3">
              <span className="text-[#00ff88] flex-shrink-0">▸</span>
              <span><span className="text-[#C0C5CE]">Multi-GCC store:</span> Tap Payments</span>
            </div>
            <div className="flex gap-3">
              <span className="text-[#00ff88] flex-shrink-0">▸</span>
              <span><span className="text-[#C0C5CE]">High-volume Saudi merchant (SAR 5M+/year):</span> HyperPay</span>
            </div>
            <div className="flex gap-3">
              <span className="text-[#00ff88] flex-shrink-0">▸</span>
              <span><span className="text-[#C0C5CE]">B2B with SADAD requirement:</span> PayTabs</span>
            </div>
            <div className="flex gap-3">
              <span className="text-[#00ff88] flex-shrink-0">▸</span>
              <span><span className="text-[#C0C5CE]">Selling to US/EU from Saudi Arabia:</span> Stripe (plus a GCC gateway for domestic)</span>
            </div>
          </div>

          <p>
            The right answer for most merchants is a primary GCC gateway plus Stripe as a secondary for international orders. We typically implement Moyasar or Tap as the primary and Stripe as the fallback, with routing logic that detects card BIN country and directs accordingly.
          </p>

          <p className="text-[#C0C5CE]/60 text-xs border-t border-[#00d4ff]/10 pt-6">
            This article reflects the state of the Saudi payment ecosystem as of May 2026. Gateway features and pricing change frequently. Verify current terms directly with each provider before integration.
          </p>
        </div>

        <div className="mt-12 flex gap-4">
          <button
            onClick={() => onNavigate('contact')}
            className="bg-[#00d4ff] text-black font-bold px-8 py-3 rounded-lg hover:bg-[#00b8d9] transition-colors text-sm"
          >
            Get payment setup help
          </button>
          <button
            onClick={() => onNavigate('blog')}
            className="border border-[#00d4ff]/50 text-[#00d4ff] px-8 py-3 rounded-lg hover:border-[#00d4ff] transition-colors text-sm"
          >
            More articles
          </button>
        </div>
      </div>
    </div>
  );
}
