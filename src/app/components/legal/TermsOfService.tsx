import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { 
  ArrowLeft,
  FileText,
  Shield,
  Clock,
  DollarSign,
  Globe,
  Users,
  AlertTriangle,
  Check,
  Download,
  Printer,
  Mail
} from 'lucide-react';

interface TermsOfServiceProps {
  onBack?: () => void;
}

export function TermsOfService({ onBack }: TermsOfServiceProps) {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', title: 'Overview', icon: FileText },
    { id: 'services', title: 'Service Delivery', icon: Clock },
    { id: 'payment', title: 'Payment Terms', icon: DollarSign },
    { id: 'refunds', title: 'Refund Policy', icon: Shield },
    { id: 'sla', title: 'Service Level Agreement', icon: Users },
    { id: 'legal', title: 'Legal & Compliance', icon: Globe },
    { id: 'contact', title: 'Contact Information', icon: Mail }
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="bg-[#00d4ff]/10 border border-[#00d4ff]/30 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#00d4ff]" />
                Master Service Agreement - Time Guarantee 2.0
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-400">Policy Version:</div>
                  <div className="text-white font-mono">2.5 - Time Guarantee 2.0</div>
                </div>
                <div>
                  <div className="text-gray-400">Last Updated:</div>
                  <div className="text-white font-mono">September 12, 2025</div>
                </div>
                <div>
                  <div className="text-gray-400">Company:</div>
                  <div className="text-white">NeoTechnology Solutions LLC</div>
                </div>
                <div>
                  <div className="text-gray-400">Jurisdiction:</div>
                  <div className="text-white">Wyoming, USA</div>
                </div>
              </div>
              
              {/* New Guarantee Badge */}
              <div className="mt-4 p-3 bg-gradient-to-r from-[#00d4ff]/20 to-[#00ff88]/20 rounded-lg border border-[#00ff88]/30">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#00ff88]" />
                  <div className="font-bold text-white">NEW: 50% Value Back Guarantee</div>
                </div>
                <div className="text-sm text-gray-300 mt-1">
                  25% cash refund + 25% Neo Wallet credits for late deliveries
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-bold text-white">Key Definitions</h4>
              <div className="space-y-3">
                <div className="bg-[#1a1a1a] p-4 rounded-lg">
                  <div className="font-bold text-[#00d4ff] mb-1">"Services"</div>
                  <div className="text-gray-300 text-sm">
                    E-commerce setup, automation, and SaaS products provided by NeoTechnology Solutions LLC.
                  </div>
                </div>
                <div className="bg-[#1a1a1a] p-4 rounded-lg">
                  <div className="font-bold text-[#00d4ff] mb-1">"Client"</div>
                  <div className="text-gray-300 text-sm">
                    The individual or entity purchasing Services from NeoTechnology Solutions.
                  </div>
                </div>
                <div className="bg-[#1a1a1a] p-4 rounded-lg">
                  <div className="font-bold text-[#00d4ff] mb-1">"Deliverables"</div>
                  <div className="text-gray-300 text-sm">
                    Completed store, automations, or access to SaaS platforms as specified in the Order.
                  </div>
                </div>
                <div className="bg-[#1a1a1a] p-4 rounded-lg">
                  <div className="font-bold text-[#00ff88] mb-1">"Neo Wallet"</div>
                  <div className="text-gray-300 text-sm">
                    Client's personal credit account with NeoTechnology. Credits never expire, are fully transferable, and can be used for any service. Includes automatic 10% bonus on manual deposits.
                  </div>
                </div>
                <div className="bg-[#1a1a1a] p-4 rounded-lg">
                  <div className="font-bold text-[#ffd93d] mb-1">"Time Guarantee"</div>
                  <div className="text-gray-300 text-sm">
                    Our promise to deliver services within specified timeframes or provide automatic compensation of 25% cash refund + 25% Neo Wallet credits (50% total value).
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'services':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#00ff88]" />
              ⏱️ TIME GUARANTEE 2.0: "On Time or 50% Value Back"
            </h3>

            {/* Time Guarantee Promise */}
            <div className="bg-gradient-to-r from-[#00d4ff]/10 to-[#00ff88]/10 border border-[#00d4ff]/30 rounded-lg p-6 mb-6">
              <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#00ff88]" />
                The Neo Promise: "On Time or Credits + Cash Back"
              </h4>
              <p className="text-gray-300 mb-4">
                If we miss our deadline, you receive AUTOMATIC compensation:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-[#1a1a1a] p-4 rounded-lg">
                  <div className="text-[#00d4ff] font-bold mb-2">💰 25% CASH REFUND</div>
                  <div className="text-gray-300">Returned to your original payment method</div>
                  <div className="text-xs text-gray-400 mt-1">Processed within 5-7 business days</div>
                </div>
                <div className="bg-[#1a1a1a] p-4 rounded-lg">
                  <div className="text-[#00ff88] font-bold mb-2">🎯 25% NEO WALLET CREDITS</div>
                  <div className="text-gray-300">For future services • Never expires</div>
                  <div className="text-xs text-gray-400 mt-1">Available immediately • Transferable</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-[#1a1a1a] border border-[#00d4ff]/30 p-6">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-[#00d4ff]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-6 h-6 text-[#00d4ff]" />
                  </div>
                  <h4 className="font-bold text-white">Lightning Launch</h4>
                  <div className="text-[#00d4ff] font-mono text-sm">4 Hours • $799</div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="bg-[#0a0a0a] p-3 rounded-lg">
                    <div className="text-white font-medium">5-6 hours late:</div>
                    <div className="text-gray-300">• $80 cash refund</div>
                    <div className="text-gray-300">• $80 wallet credit</div>
                  </div>
                  <div className="bg-[#0a0a0a] p-3 rounded-lg">
                    <div className="text-white font-medium">6-8 hours late:</div>
                    <div className="text-gray-300">• $160 cash refund</div>
                    <div className="text-gray-300">• $160 wallet credit</div>
                  </div>
                  <div className="bg-[#ff6b6b]/10 p-3 rounded-lg">
                    <div className="text-[#ff6b6b] font-medium">Over 8 hours:</div>
                    <div className="text-gray-300">• $200 cash refund</div>
                    <div className="text-gray-300">• $200 wallet credit</div>
                    <div className="text-[#ff6b6b] font-bold">Total: $400 (50%)</div>
                  </div>
                </div>
              </Card>

              <Card className="bg-[#1a1a1a] border border-[#00ff88]/30 p-6">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-[#00ff88]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-6 h-6 text-[#00ff88]" />
                  </div>
                  <h4 className="font-bold text-white">Thunder Setup</h4>
                  <div className="text-[#00ff88] font-mono text-sm">24 Hours • $1,299</div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="bg-[#0a0a0a] p-3 rounded-lg">
                    <div className="text-white font-medium">28-36 hours late:</div>
                    <div className="text-gray-300">• $130 cash refund</div>
                    <div className="text-gray-300">• $130 wallet credit</div>
                  </div>
                  <div className="bg-[#0a0a0a] p-3 rounded-lg">
                    <div className="text-white font-medium">36-48 hours late:</div>
                    <div className="text-gray-300">• $260 cash refund</div>
                    <div className="text-gray-300">• $260 wallet credit</div>
                  </div>
                  <div className="bg-[#ff6b6b]/10 p-3 rounded-lg">
                    <div className="text-[#ff6b6b] font-medium">Over 48 hours:</div>
                    <div className="text-gray-300">• $325 cash refund</div>
                    <div className="text-gray-300">• $325 wallet credit</div>
                    <div className="text-[#ff6b6b] font-bold">Total: $650 (50%)</div>
                  </div>
                </div>
              </Card>

              <Card className="bg-[#1a1a1a] border border-[#ffd93d]/30 p-6">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-[#ffd93d]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-6 h-6 text-[#ffd93d]" />
                  </div>
                  <h4 className="font-bold text-white">Storm Complete</h4>
                  <div className="text-[#ffd93d] font-mono text-sm">72 Hours • $2,999</div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="bg-[#0a0a0a] p-3 rounded-lg">
                    <div className="text-white font-medium">96-108 hours late:</div>
                    <div className="text-gray-300">• $300 cash refund</div>
                    <div className="text-gray-300">• $300 wallet credit</div>
                  </div>
                  <div className="bg-[#0a0a0a] p-3 rounded-lg">
                    <div className="text-white font-medium">108-120 hours late:</div>
                    <div className="text-gray-300">• $600 cash refund</div>
                    <div className="text-gray-300">• $600 wallet credit</div>
                  </div>
                  <div className="bg-[#ff6b6b]/10 p-3 rounded-lg">
                    <div className="text-[#ff6b6b] font-medium">Over 120 hours:</div>
                    <div className="text-gray-300">• $750 cash refund</div>
                    <div className="text-gray-300">• $750 wallet credit</div>
                    <div className="text-[#ff6b6b] font-bold">Total: $1,500 (50%)</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Neo Wallet System */}
            <div className="bg-[#12151C] border border-[#00ff88]/30 rounded-lg p-6">
              <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-[#00ff88]" />
                💳 Neo Wallet System
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-bold text-[#00ff88] mb-3">What is Neo Wallet?</h5>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div>• Your personal credit account with NeoTechnology</div>
                    <div>• Never expires - use anytime</div>
                    <div>• Transferable to team members</div>
                    <div>• Can be used for ANY service</div>
                    <div>• Combines with promotions</div>
                  </div>
                </div>
                <div>
                  <h5 className="font-bold text-[#00d4ff] mb-3">Wallet Benefits</h5>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div>✓ Use for any service or product</div>
                    <div>✓ Stack with discounts</div>
                    <div>✓ Transfer to colleagues</div>
                    <div>✓ Priority support included</div>
                    <div>✓ Automatic 10% bonus on deposits</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#ff6b6b]/10 border border-[#ff6b6b]/30 rounded-lg p-6">
              <h4 className="font-bold text-[#ff6b6b] mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Important Service Guarantees
              </h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#00ff88] mt-0.5 flex-shrink-0" />
                  <span>All assets must be provided upfront for Lightning Launch</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#00ff88] mt-0.5 flex-shrink-0" />
                  <span>Penalty discounts automatically applied for delays</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#00ff88] mt-0.5 flex-shrink-0" />
                  <span>Grace periods included for unforeseen technical issues</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'payment':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-[#00ff88]" />
              Payment Terms & Processing
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-[#1a1a1a] border border-[#00d4ff]/30 p-6">
                <h4 className="font-bold text-white mb-4">Deposit Requirements</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Lightning Launch:</span>
                    <span className="text-[#00d4ff] font-mono">50% deposit</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Thunder Setup:</span>
                    <span className="text-[#00d4ff] font-mono">40% deposit</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Storm Complete:</span>
                    <span className="text-[#00d4ff] font-mono">30% deposit</span>
                  </div>
                </div>
              </Card>

              <Card className="bg-[#1a1a1a] border border-[#00ff88]/30 p-6">
                <h4 className="font-bold text-white mb-4">Payment Methods</h4>
                <div className="space-y-2 text-sm">
                  <div className="font-bold text-[#00ff88] mb-2">US Clients:</div>
                  <div className="text-gray-300">• Stripe (2.9% + $0.30)</div>
                  <div className="text-gray-300">• PayPal (2.9% + $0.30)</div>
                  <div className="text-gray-300">• Wire Transfer</div>
                  <div className="text-gray-300">• Crypto (USDC, USDT)</div>
                  
                  <div className="font-bold text-[#00ff88] mb-2 mt-4">GCC Clients:</div>
                  <div className="text-gray-300">• Mada (2.0%)</div>
                  <div className="text-gray-300">• STC Pay (1.75%)</div>
                  <div className="text-gray-300">• Tamara (2.5% BNPL)</div>
                  <div className="text-gray-300">• Tabby (2.5% installments)</div>
                </div>
              </Card>
            </div>

            <div className="bg-[#ffd93d]/10 border border-[#ffd93d]/30 rounded-lg p-6">
              <h4 className="font-bold text-[#ffd93d] mb-3">Currency & Tax Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-400 mb-2">United States:</div>
                  <div className="text-gray-300">• Prices in USD</div>
                  <div className="text-gray-300">• Sales tax where applicable</div>
                  <div className="text-gray-300">• Fixed exchange rate protection</div>
                </div>
                <div>
                  <div className="text-gray-400 mb-2">GCC Markets:</div>
                  <div className="text-gray-300">• Prices in SAR (1 USD = 3.75 SAR)</div>
                  <div className="text-gray-300">• Saudi VAT (15%)</div>
                  <div className="text-gray-300">• UAE VAT (5%)</div>
                </div>
              </div>
            </div>

            <div className="bg-[#ff6b6b]/10 border border-[#ff6b6b]/30 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-[#ff6b6b] mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-300">
                  <strong className="text-[#ff6b6b]">Late Payment:</strong> 1.5% monthly interest on overdue amounts. 
                  Service suspension after 7 days. Collection fees charged to client.
                </div>
              </div>
            </div>
          </div>
        );

      case 'refunds':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#00ff88]" />
              Automatic Compensation & Refund Policy
            </h3>

            {/* Performance Track Record */}
            <div className="bg-gradient-to-r from-[#00ff88]/10 to-[#00d4ff]/10 border border-[#00ff88]/30 rounded-lg p-6 mb-6">
              <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                <Check className="w-5 h-5 text-[#00ff88]" />
                🎯 Our Track Record (Last 12 Months)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                <div className="bg-[#1a1a1a] p-4 rounded-lg">
                  <div className="text-2xl font-bold text-[#00d4ff] mb-1">97%</div>
                  <div className="text-sm text-gray-300">Lightning On-Time</div>
                </div>
                <div className="bg-[#1a1a1a] p-4 rounded-lg">
                  <div className="text-2xl font-bold text-[#00ff88] mb-1">98%</div>
                  <div className="text-sm text-gray-300">Thunder On-Time</div>
                </div>
                <div className="bg-[#1a1a1a] p-4 rounded-lg">
                  <div className="text-2xl font-bold text-[#ffd93d] mb-1">99%</div>
                  <div className="text-sm text-gray-300">Storm On-Time</div>
                </div>
                <div className="bg-[#1a1a1a] p-4 rounded-lg">
                  <div className="text-2xl font-bold text-white mb-1">4.9/5</div>
                  <div className="text-sm text-gray-300">Client Satisfaction</div>
                </div>
              </div>
              <div className="text-center mt-4">
                <div className="text-sm text-gray-400">
                  Average delivery vs. promise: <span className="text-[#00ff88] font-bold">23% faster</span>
                </div>
              </div>
            </div>

            {/* Automatic Compensation Structure */}
            <div className="bg-[#12151C] border border-[#00d4ff]/30 rounded-lg p-6 mb-6">
              <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#00d4ff]" />
                ⚡ Automatic Compensation Processing
              </h4>
              <div className="space-y-4">
                <div className="bg-[#1a1a1a] p-4 rounded-lg">
                  <h5 className="font-bold text-[#00ff88] mb-2">No Claim Needed</h5>
                  <div className="text-sm text-gray-300 space-y-1">
                    <div>• System automatically calculates delays</div>
                    <div>• Compensation initiated within 24 hours</div>
                    <div>• Email confirmation sent immediately</div>
                    <div>• No questions asked, no forms to fill</div>
                  </div>
                </div>
                <div className="bg-[#1a1a1a] p-4 rounded-lg">
                  <h5 className="font-bold text-[#00d4ff] mb-2">Dual Compensation Method</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-white font-medium mb-1">💰 Cash Refund (25%)</div>
                      <div className="text-gray-300">• Processed to original payment method</div>
                      <div className="text-gray-300">• Appears in 5-7 business days</div>
                      <div className="text-gray-300">• No processing fees deducted</div>
                    </div>
                    <div>
                      <div className="text-white font-medium mb-1">🎯 Wallet Credit (25%)</div>
                      <div className="text-gray-300">• Added to Neo Wallet immediately</div>
                      <div className="text-gray-300">• Never expires, fully transferable</div>
                      <div className="text-gray-300">• Can be used for any service</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-[#1a1a1a] border border-[#00d4ff]/30 p-6">
                <h4 className="font-bold text-white mb-4">Lightning Launch Compensation</h4>
                <div className="space-y-3 text-sm">
                  <div className="bg-[#0a0a0a] p-3 rounded-lg">
                    <div className="text-[#00d4ff] font-bold mb-2">5-6 hours late</div>
                    <div className="text-gray-300">$80 cash + $80 credit</div>
                    <div className="text-xs text-gray-400">Total value: $160</div>
                  </div>
                  <div className="bg-[#0a0a0a] p-3 rounded-lg">
                    <div className="text-[#00d4ff] font-bold mb-2">6-8 hours late</div>
                    <div className="text-gray-300">$160 cash + $160 credit</div>
                    <div className="text-xs text-gray-400">Total value: $320</div>
                  </div>
                  <div className="bg-[#ff6b6b]/10 p-3 rounded-lg">
                    <div className="text-[#ff6b6b] font-bold mb-2">Over 8 hours</div>
                    <div className="text-gray-300">$200 cash + $200 credit</div>
                    <div className="text-[#ff6b6b] font-bold">Maximum: $400 (50%)</div>
                  </div>
                </div>
              </Card>

              <Card className="bg-[#1a1a1a] border border-[#00ff88]/30 p-6">
                <h4 className="font-bold text-white mb-4">Thunder Setup Compensation</h4>
                <div className="space-y-3 text-sm">
                  <div className="bg-[#0a0a0a] p-3 rounded-lg">
                    <div className="text-[#00ff88] font-bold mb-2">28-36 hours late</div>
                    <div className="text-gray-300">$130 cash + $130 credit</div>
                    <div className="text-xs text-gray-400">Total value: $260</div>
                  </div>
                  <div className="bg-[#0a0a0a] p-3 rounded-lg">
                    <div className="text-[#00ff88] font-bold mb-2">36-48 hours late</div>
                    <div className="text-gray-300">$260 cash + $260 credit</div>
                    <div className="text-xs text-gray-400">Total value: $520</div>
                  </div>
                  <div className="bg-[#ff6b6b]/10 p-3 rounded-lg">
                    <div className="text-[#ff6b6b] font-bold mb-2">Over 48 hours</div>
                    <div className="text-gray-300">$325 cash + $325 credit</div>
                    <div className="text-[#ff6b6b] font-bold">Maximum: $650 (50%)</div>
                  </div>
                </div>
              </Card>

              <Card className="bg-[#1a1a1a] border border-[#ffd93d]/30 p-6">
                <h4 className="font-bold text-white mb-4">Storm Complete Compensation</h4>
                <div className="space-y-3 text-sm">
                  <div className="bg-[#0a0a0a] p-3 rounded-lg">
                    <div className="text-[#ffd93d] font-bold mb-2">96-108 hours late</div>
                    <div className="text-gray-300">$300 cash + $300 credit</div>
                    <div className="text-xs text-gray-400">Total value: $600</div>
                  </div>
                  <div className="bg-[#0a0a0a] p-3 rounded-lg">
                    <div className="text-[#ffd93d] font-bold mb-2">108-120 hours late</div>
                    <div className="text-gray-300">$600 cash + $600 credit</div>
                    <div className="text-xs text-gray-400">Total value: $1,200</div>
                  </div>
                  <div className="bg-[#ff6b6b]/10 p-3 rounded-lg">
                    <div className="text-[#ff6b6b] font-bold mb-2">Over 120 hours</div>
                    <div className="text-gray-300">$750 cash + $750 credit</div>
                    <div className="text-[#ff6b6b] font-bold">Maximum: $1,500 (50%)</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Additional Compensation */}
            <div className="bg-[#00ff88]/10 border border-[#00ff88]/30 rounded-lg p-6">
              <h4 className="font-bold text-[#00ff88] mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                🎁 "Make It Right" Bonus Package
              </h4>
              <p className="text-gray-300 text-sm mb-4">
                When we miss our guarantee, we don't just compensate - we make it right with additional value.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-bold text-white mb-2">Automatic Bonuses:</div>
                  <div className="space-y-1 text-gray-300">
                    <div>• 1 month free hosting</div>
                    <div>• Priority support for 60 days</div>
                    <div>• 20% discount on next service</div>
                    <div>• Free N8N template ($99 value)</div>
                  </div>
                </div>
                <div>
                  <div className="font-bold text-white mb-2">Guarantee Exceptions:</div>
                  <div className="space-y-1 text-gray-300">
                    <div>• Client-caused delays</div>
                    <div>• Third-party approval delays</div>
                    <div>• Platform outages (Shopify/WooCommerce)</div>
                    <div>• Force majeure events</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Industry Comparison */}
            <div className="bg-[#12151C] border border-[#ffd93d]/30 rounded-lg p-6">
              <h4 className="font-bold text-[#ffd93d] mb-4 flex items-center gap-2">
                <Check className="w-4 h-4" />
                📊 Industry Comparison
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-[#1a1a1a] p-4 rounded-lg">
                  <div className="font-bold text-red-400 mb-2">Other Agencies</div>
                  <div className="space-y-1 text-gray-300">
                    <div>❌ No time guarantee</div>
                    <div>❌ "Done when it's done"</div>
                    <div>❌ Zero compensation</div>
                    <div>❌ 30-60 day delivery</div>
                  </div>
                </div>
                <div className="bg-[#1a1a1a] p-4 rounded-lg">
                  <div className="font-bold text-yellow-400 mb-2">Competitors</div>
                  <div className="space-y-1 text-gray-300">
                    <div>🔶 Complex terms</div>
                    <div>🔶 Store credit only</div>
                    <div>🔶 Credits expire</div>
                    <div>🔶 Maximum 20% back</div>
                  </div>
                </div>
                <div className="bg-[#1a1a1a] p-4 rounded-lg">
                  <div className="font-bold text-[#00ff88] mb-2">NeoTechnology</div>
                  <div className="space-y-1 text-gray-300">
                    <div>✅ Clear guarantee</div>
                    <div>✅ 25% real cash back</div>
                    <div>✅ 25% never-expiring credit</div>
                    <div>✅ 4-72 hour delivery</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'sla':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-[#00d4ff]" />
              Service Level Agreement (SLA)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-[#1a1a1a] border border-[#00d4ff]/30 p-6">
                <h4 className="font-bold text-white mb-4">Uptime Guarantees</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">E-commerce Stores:</span>
                    <Badge className="bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]/30">
                      99.9%
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">SaaS Platforms:</span>
                    <Badge className="bg-[#00d4ff]/20 text-[#00d4ff] border-[#00d4ff]/30">
                      99.5%
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-400 mt-3">
                    Credit: 5% per hour of downtime beyond SLA
                  </div>
                </div>
              </Card>

              <Card className="bg-[#1a1a1a] border border-[#00ff88]/30 p-6">
                <h4 className="font-bold text-white mb-4">Support Response Times</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Lightning Launch:</span>
                    <span className="text-[#00d4ff] font-mono">24 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Thunder Setup:</span>
                    <span className="text-[#00ff88] font-mono">12 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Storm Complete:</span>
                    <span className="text-[#ffd93d] font-mono">2 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Emergency (Storm):</span>
                    <span className="text-[#ff6b6b] font-mono">90 minutes</span>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="bg-[#1a1a1a] border border-[#ffd93d]/30 p-6">
              <h4 className="font-bold text-white mb-4">Performance Standards</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#00d4ff] mb-1">3s</div>
                  <div className="text-gray-400 text-sm">Page Load Time</div>
                  <div className="text-xs text-gray-500">Maximum allowed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#00ff88] mb-1">90+</div>
                  <div className="text-gray-400 text-sm">Mobile Score</div>
                  <div className="text-xs text-gray-500">Google PageSpeed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#ffd93d] mb-1">99%</div>
                  <div className="text-gray-400 text-sm">Checkout Success</div>
                  <div className="text-xs text-gray-500">Completion rate</div>
                </div>
              </div>
            </Card>
          </div>
        );

      case 'legal':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#00d4ff]" />
              Legal & Compliance
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-[#1a1a1a] border border-[#00d4ff]/30 p-6">
                <h4 className="font-bold text-white mb-4">US Compliance</h4>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-[#00ff88]" />
                    <span>Wyoming LLC Registration: Valid</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-[#00ff88]" />
                    <span>Business License: Active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-[#00ff88]" />
                    <span>FTC Compliant Terms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-[#00ff88]" />
                    <span>CCPA Privacy Compliant</span>
                  </div>
                </div>
              </Card>

              <Card className="bg-[#1a1a1a] border border-[#00ff88]/30 p-6">
                <h4 className="font-bold text-white mb-4">GCC Compliance</h4>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-[#00ff88]" />
                    <span>Saudi PDPL Compliant</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-[#00ff88]" />
                    <span>ZATCA VAT Registration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-[#00ff88]" />
                    <span>TDRA UAE Compliant</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-[#00ff88]" />
                    <span>Sharia Compliance Available</span>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="bg-[#1a1a1a] border border-[#ffd93d]/30 p-6">
              <h4 className="font-bold text-white mb-4">Dispute Resolution</h4>
              <div className="space-y-4">
                <div>
                  <div className="font-bold text-[#ffd93d] mb-2">1. Negotiation</div>
                  <div className="text-gray-300 text-sm">Good faith discussion first - 30 days to resolve</div>
                </div>
                <div>
                  <div className="font-bold text-[#ffd93d] mb-2">2. Arbitration</div>
                  <div className="text-gray-300 text-sm">
                    Binding arbitration in Wyoming (US clients) or Dubai/Abu Dhabi (GCC clients)
                  </div>
                </div>
                <div>
                  <div className="font-bold text-[#ffd93d] mb-2">3. Exceptions</div>
                  <div className="text-gray-300 text-sm">
                    Injunctive relief in courts, small claims allowed, IP disputes in federal court
                  </div>
                </div>
              </div>
            </Card>

            <div className="bg-[#ff6b6b]/10 border border-[#ff6b6b]/30 rounded-lg p-6">
              <h4 className="font-bold text-[#ff6b6b] mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Limitation of Liability
              </h4>
              <div className="text-sm text-gray-300 space-y-2">
                <div>• Maximum liability: Total fees paid to NeoTechnology</div>
                <div>• No warranty on third-party services or integrations</div>
                <div>• No guarantee of business success or specific results</div>
                <div>• Results depend on client's market execution and strategy</div>
              </div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#00d4ff]" />
              Contact Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-[#1a1a1a] border border-[#00d4ff]/30 p-6">
                <h4 className="font-bold text-white mb-4">Legal & Compliance</h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="text-gray-400">Company:</div>
                    <div className="text-white">NeoTechnology Solutions LLC</div>
                  </div>
                  <div>
                    <div className="text-gray-400">CEO & Founder:</div>
                    <div className="text-white">Fahad Almansour</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Headquarters:</div>
                    <div className="text-white">Wyoming, USA</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Legal Email:</div>
                    <div className="text-[#00d4ff]">legal@neotechnology.solutions</div>
                  </div>
                </div>
              </Card>

              <Card className="bg-[#1a1a1a] border border-[#00ff88]/30 p-6">
                <h4 className="font-bold text-white mb-4">Support Channels</h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="text-gray-400">General Support:</div>
                    <div className="text-[#00ff88]">support@neotechnology.solutions</div>
                  </div>
                  <div>
                    <div className="text-gray-400">GCC Support:</div>
                    <div className="text-[#00ff88]">gcc@neotechnology.solutions</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Phone (US):</div>
                    <div className="text-white">+1 (307) 555-0100</div>
                  </div>
                  <div>
                    <div className="text-gray-400">WhatsApp:</div>
                    <div className="text-[#00d4ff]">Available globally 24/7</div>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="bg-[#1a1a1a] border border-[#ffd93d]/30 p-6">
              <h4 className="font-bold text-white mb-4">Regional Offices</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="font-bold text-[#ffd93d] mb-2">🇺🇸 United States</div>
                  <div className="text-sm text-gray-300 space-y-1">
                    <div>Governed by Wyoming law</div>
                    <div>Venue: Cheyenne, Wyoming</div>
                    <div>Language: English</div>
                    <div>Time Zone: Mountain Time (MT)</div>
                  </div>
                </div>
                <div>
                  <div className="font-bold text-[#ffd93d] mb-2">🇸🇦🇦🇪 GCC Markets</div>
                  <div className="text-sm text-gray-300 space-y-1">
                    <div>Governed by DIFC/ADGM law</div>
                    <div>Venue: Dubai/Abu Dhabi</div>
                    <div>Language: English/Arabic</div>
                    <div>Time Zone: Gulf Standard Time (GST)</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] terminal-theme">
      {/* Header */}
      <div className="bg-[#12151C] border-b border-[#C0C5CE]/20 p-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            {onBack && (
              <Button
                onClick={onBack}
                variant="outline"
                className="border-[#00d4ff]/30 text-[#00d4ff] hover:bg-[#00d4ff]/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}
            <div>
              <h1 className="text-2xl font-bold text-white">Terms of Service</h1>
              <p className="text-gray-400 font-mono text-sm">
                NeoTechnology Solutions LLC - Master Service Agreement
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" className="border-[#00d4ff]/30 text-[#00d4ff] hover:bg-[#00d4ff]/10">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            <Button variant="outline" className="border-[#00ff88]/30 text-[#00ff88] hover:bg-[#00ff88]/10">
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="flex gap-6">
          {/* Sidebar Navigation */}
          <div className="w-64 flex-shrink-0">
            <Card className="bg-[#12151C] border border-[#C0C5CE]/20 p-4 sticky top-6">
              <h3 className="font-bold text-white mb-4">Sections</h3>
              <div className="space-y-1">
                {sections.map((section) => {
                  const IconComponent = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all ${
                        activeSection === section.id
                          ? 'bg-[#00d4ff]/20 text-[#00d4ff] border border-[#00d4ff]/30'
                          : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      <span className="text-sm">{section.title}</span>
                    </button>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <Card className="bg-[#12151C] border border-[#C0C5CE]/20 overflow-hidden">
              <div className="overflow-y-auto max-h-[80vh] p-8">
                {renderSection()}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TermsOfService;