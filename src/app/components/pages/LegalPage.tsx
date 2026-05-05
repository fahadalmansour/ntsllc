import React from 'react';

interface Props {
  docId: string;
  onNavigate: (section: string) => void;
}

const docs: Record<string, { title: string; description: string }> = {
  'privacy': {
    title: 'Privacy Policy',
    description: 'Our privacy policy covers how NeoTechnology Solutions LLC collects, processes, stores, and protects personal data submitted through this website and through project engagements.',
  },
  'terms': {
    title: 'Terms of Service',
    description: 'Our terms of service govern the relationship between NeoTechnology Solutions LLC and clients engaging our services, including scope, delivery, payment, intellectual property, and dispute resolution.',
  },
  'refund': {
    title: 'Refund Policy',
    description: 'Our refund policy defines the conditions under which deposits and payments are refundable, including project cancellation, scope disputes, and non-delivery scenarios.',
  },
  'cookies': {
    title: 'Cookie Notice',
    description: 'Our cookie notice explains the cookies and similar technologies used on this website, including analytics, functional, and preference cookies.',
  },
  'acceptable-use': {
    title: 'Acceptable Use Policy',
    description: 'Our acceptable use policy defines permitted and prohibited uses of systems, software, and services delivered by NeoTechnology Solutions LLC.',
  },
  'sla': {
    title: 'Service Level Agreement',
    description: 'Our standard SLA defines uptime commitments, response time targets, and escalation procedures for ongoing support and maintenance agreements.',
  },
  'dpa': {
    title: 'Data Processing Agreement',
    description: 'Our data processing agreement governs the processing of personal data on behalf of clients and covers GDPR and applicable data protection obligations.',
  },
};

export function LegalPage({ docId, onNavigate }: Props) {
  const doc = docs[docId];

  if (!doc) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-[#C0C5CE] font-mono flex items-center justify-center">
        <div className="text-center">
          <div className="text-[#00d4ff] text-2xl mb-4">Document not found</div>
          <button onClick={() => onNavigate('home')} className="text-[#00d4ff] underline">Back to home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#C0C5CE] font-mono">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <button onClick={() => onNavigate('home')} className="text-[#00d4ff]/60 hover:text-[#00d4ff] text-sm mb-8 block transition-colors">
          ← Back to home
        </button>

        <div className="text-[#C0C5CE]/50 text-xs mb-4">NeoTechnology Solutions LLC · Legal</div>

        <h1 className="text-4xl font-bold text-[#00d4ff] mb-4">{doc.title}</h1>

        <p className="text-[#C0C5CE]/80 text-lg mb-10">{doc.description}</p>

        <div className="bg-[#12151C] border border-yellow-500/20 rounded-lg p-8">
          <div className="text-yellow-400 font-bold text-sm mb-3">Document in preparation</div>
          <p className="text-[#C0C5CE]/70 text-sm leading-relaxed mb-4">
            This document is currently being drafted by our legal team. The full text will be published here before the site launch.
          </p>
          <p className="text-[#C0C5CE]/70 text-sm leading-relaxed">
            If you require a copy of this document for due diligence or contractual purposes, contact us directly and we will provide the current draft under NDA.
          </p>
        </div>

        <div className="mt-8 text-sm text-[#C0C5CE]/50">
          <div>NeoTechnology Solutions LLC</div>
          <div>Wyoming, United States</div>
          <div className="mt-1">contact@neotechnology.solutions</div>
        </div>
      </div>
    </div>
  );
}
