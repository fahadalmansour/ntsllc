import React from 'react';
import { CheckCircle } from 'lucide-react';

interface Props {
  serviceId: string;
  onNavigate: (section: string) => void;
}

const serviceData: Record<string, { title: string; heading: string; body: string; bullets: string[] }> = {
  'store-setup': {
    title: 'Store Setup & Integration',
    heading: 'Launch a store that\'s ready for real revenue',
    body: 'We build production-ready e-commerce stores on the platform that fits your business — Shopify, WooCommerce, Salla, Zid, or Wuilt. Every build includes a custom theme tailored to your brand, full SSL configuration, payment gateway integration, and inventory setup.',
    bullets: [
      'Platform selection consultation',
      'Custom theme design and development',
      'Domain configuration and SSL setup',
      'Payment gateway integration',
      'Inventory and product catalog setup',
      'Tax and shipping configuration',
      'Owner training and documentation',
    ],
  },
  'payments': {
    title: 'Payment Solutions',
    heading: 'Accept payments the way your customers expect to pay',
    body: 'The wrong payment setup costs you customers at checkout. We integrate the right combination of gateways for your market.',
    bullets: [
      'Stripe (US, global)',
      'Tap Payments (Gulf-wide, multi-method)',
      'HyperPay (high-volume processing)',
      'PayTabs (regional cards + SADAD)',
      'Moyasar (Saudi-focused)',
      'Amazon Payment Services (multi-currency)',
    ],
  },
  'automation': {
    title: 'Workflow Automation',
    heading: 'Stop doing what software should do for you',
    body: 'Your business runs on repetitive tasks. We automate them using n8n, the open-source workflow engine, hosted and managed by us. Choose from over 6,000 ready-made templates or commission a custom workflow.',
    bullets: [
      'Order-to-invoice automation',
      'Inventory sync across sales channels',
      'Abandoned cart recovery sequences',
      'WhatsApp order notifications',
      'Marketing email triggers',
      'Custom reporting dashboards',
    ],
  },
  'domain-hosting': {
    title: 'Domain & Hosting',
    heading: 'Every digital asset, in one dashboard',
    body: 'We provision and manage domains, professional email, SSL certificates, and VPS hosting through trusted reseller relationships with GoDaddy and Enom.',
    bullets: [
      'Domain registration and renewal',
      'DNS management',
      'SSL certificate provisioning',
      'Professional email (Google Workspace or Microsoft 365)',
      'VPS hosting from $5/month',
      'White-label reseller portal access',
    ],
  },
  'consulting': {
    title: 'AI-Powered Consulting',
    heading: 'Strategy and documentation, accelerated by AI',
    body: 'Built on the Claude Agent SDK and the Model Context Protocol, our consulting services produce business requirement documents, technical architectures, and compliance templates in days rather than weeks.',
    bullets: [
      'Business Requirements Documents (BRDs)',
      'Technical architecture diagrams',
      'Compliance and risk assessments',
      'Privacy policies and terms of service',
      'Integration roadmaps',
    ],
  },
  'brokerage': {
    title: 'Freelance Brokerage',
    heading: 'Hire developers without the hiring headaches',
    body: 'When your project needs talent outside our core services, we source, vet, and manage freelancers on your behalf. We hold the budget in escrow, oversee milestones, and step in when things go sideways.',
    bullets: [
      'Lite — Matchmaking and RFP preparation ($299)',
      'Plus — Vetting and project management (10% of project value)',
      'Pro — Full management with code review (15% of project value)',
    ],
  },
  'quick-fix': {
    title: 'Quick-Fix Support',
    heading: 'Technical problems, fixed at a fixed price',
    body: 'Some problems do not need a project. They need a fix. SSL not installing? Email going to spam? Site loading slowly? We solve common e-commerce technical issues at fixed, transparent prices.',
    bullets: [
      'SSL installation and renewal ($99)',
      'Email deliverability fixes ($149)',
      'Site speed optimization ($199)',
      'Plugin conflict resolution ($129)',
      'DNS troubleshooting ($99)',
      'Basic SEO audits ($249)',
    ],
  },
  'communication': {
    title: 'Communication Suite',
    heading: 'Reach customers where they actually are',
    body: 'We integrate the communication tools modern e-commerce runs on: transactional email, SMS, WhatsApp Business, and social posting — all wired into your store.',
    bullets: [
      'Transactional email (SendGrid, Resend)',
      'SMS (Twilio, regional providers)',
      'WhatsApp Business API',
      'Social media scheduling',
    ],
  },
};

export function ServiceDetailPage({ serviceId, onNavigate }: Props) {
  const service = serviceData[serviceId];

  if (!service) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-[#C0C5CE] font-mono flex items-center justify-center">
        <div className="text-center">
          <div className="text-[#00d4ff] text-2xl mb-4">Service not found</div>
          <button onClick={() => onNavigate('services')} className="text-[#00d4ff] underline">
            Back to services
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#C0C5CE] font-mono">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-8">
          <button
            onClick={() => onNavigate('services')}
            className="text-[#00d4ff]/60 hover:text-[#00d4ff] text-sm mb-2 block transition-colors"
          >
            ← Back to services
          </button>
          <div className="text-[#C0C5CE]/50 text-sm">Services / {service.title}</div>
        </div>

        <h1 className="text-4xl font-bold text-[#00d4ff] mb-3">{service.title}</h1>
        <h2 className="text-2xl text-[#C0C5CE] mb-8">{service.heading}</h2>

        <p className="text-[#C0C5CE]/80 leading-relaxed mb-10 text-lg">{service.body}</p>

        <div className="bg-[#12151C] border border-[#00d4ff]/20 rounded-lg p-8 mb-10">
          <h3 className="text-[#00d4ff] font-bold mb-6">What is included</h3>
          <div className="space-y-3">
            {service.bullets.map((bullet, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-[#00ff88] mt-0.5 flex-shrink-0" />
                <span className="text-[#C0C5CE]/80 text-sm">{bullet}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => onNavigate('contact')}
            className="bg-[#00d4ff] text-black font-bold px-8 py-3 rounded-lg hover:bg-[#00b8d9] transition-colors"
          >
            Book a scoping call →
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
