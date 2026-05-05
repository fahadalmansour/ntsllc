import { useState, useEffect } from 'react';

export function About({ onNavigate }: { onNavigate?: (section: string) => void }) {
  const [activeCommand, setActiveCommand] = useState(0);

  const commands = [
    { cmd: 'cat company-info.json', delay: 1000 },
    { cmd: 'grep -r "mission" *', delay: 2500 },
    { cmd: 'cat markets.json', delay: 4000 },
  ];

  useEffect(() => {
    const timers = commands.map((command, index) =>
      setTimeout(() => setActiveCommand(index + 1), command.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section id="about" className="min-h-screen bg-[#0B0D12] py-20 px-6 font-mono">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <span className="text-[#00d4ff] mr-2">{'>'}</span>
            <h2 className="text-[#C0C5CE] font-mono text-3xl md:text-4xl font-semibold">
              About NeoTechnology Solutions
            </h2>
          </div>
          <p className="text-[#C0C5CE]/70 font-mono text-lg">
            NeoTechnology Solutions LLC is a US-incorporated technology company, registered in the State of Wyoming. We build the technical infrastructure that powers modern e-commerce.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Company Terminal */}
          <div className="bg-[#12151C] rounded-lg border border-[#00d4ff]/30 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-[#0B0D12] border-b border-[#00d4ff]/20">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-[#00ff88]"></div>
              </div>
              <div className="text-[#C0C5CE] font-mono text-sm">about-us.terminal</div>
              <div className="w-16"></div>
            </div>

            <div className="p-6 font-mono text-sm space-y-4">
              <div className="flex items-center">
                <span className="text-[#00ff88] mr-2">neotech@solutions:~$</span>
                <span className="text-[#C0C5CE]">cat company-info.json</span>
              </div>

              {activeCommand >= 1 && (
                <div className="text-[#C0C5CE]/80 space-y-2 animate-in slide-in-from-bottom-2 duration-500">
                  <div>{'{'}</div>
                  <div className="ml-4">"name": "NeoTechnology Solutions LLC",</div>
                  <div className="ml-4">"incorporation": "Wyoming, United States",</div>
                  <div className="ml-4">"filing_id": "2025-001744917",</div>
                  <div className="ml-4">"ein": "36-5148912",</div>
                  <div className="ml-4">"markets": ["US", "GCC"],</div>
                  <div className="ml-4">"contact": "hello@neotechnology.solutions"</div>
                  <div>{'}'}</div>
                </div>
              )}

              {activeCommand >= 2 && (
                <>
                  <div className="flex items-center mt-6">
                    <span className="text-[#00ff88] mr-2">neotech@solutions:~$</span>
                    <span className="text-[#C0C5CE]">grep -r "mission" *</span>
                  </div>
                  <div className="text-[#C0C5CE]/80 animate-in slide-in-from-bottom-2 duration-500">
                    <div className="bg-[#00ff88]/10 p-3 rounded border-l-2 border-[#00ff88] text-sm">
                      {">"} mission: "We exist to remove the technical complexity that holds online merchants back. Every hour a store owner spends fighting plugins, debugging payment gateways, or chasing freelancers is an hour not spent growing the business. We give that time back."
                    </div>
                  </div>
                </>
              )}

              {activeCommand >= 3 && (
                <>
                  <div className="flex items-center mt-6">
                    <span className="text-[#00ff88] mr-2">neotech@solutions:~$</span>
                    <span className="text-[#C0C5CE]">cat markets.json</span>
                  </div>
                  <div className="text-[#C0C5CE]/80 animate-in slide-in-from-bottom-2 duration-500 space-y-1 text-sm">
                    <div className="text-[#00d4ff]">Gulf (GCC):</div>
                    <div className="ml-4">Saudi Arabia, UAE, Kuwait, Qatar, Bahrain, Oman</div>
                    <div className="ml-4 text-[#C0C5CE]/60">Local payment methods · Arabic localization · VAT compliance</div>
                    <div className="text-[#00d4ff] mt-2">United States:</div>
                    <div className="ml-4">Stripe-grade payment infrastructure</div>
                    <div className="ml-4 text-[#C0C5CE]/60">Wyoming-based legal frameworks</div>
                  </div>
                </>
              )}

              <div className="flex items-center mt-4">
                <span className="text-[#00ff88] mr-2">neotech@solutions:~$</span>
                <span className="text-[#C0C5CE] animate-pulse">|</span>
              </div>
            </div>
          </div>

          {/* Approach & Standards */}
          <div className="space-y-6">
            <div className="bg-[#12151C] rounded-lg border border-[#00d4ff]/30 p-6">
              <h3 className="text-[#00d4ff] font-mono text-xl mb-4 flex items-center">
                <span className="mr-2">{'>'}</span>
                approach:
              </h3>
              <p className="text-[#C0C5CE]/80 font-mono text-sm leading-relaxed">
                One contract. One point of accountability. One team that owns the outcome — from store setup and payment integration to workflow automation and AI-driven operations.
              </p>
            </div>

            <div className="bg-[#12151C] rounded-lg border border-[#00d4ff]/30 p-6">
              <h3 className="text-[#00d4ff] font-mono text-xl mb-4 flex items-center">
                <span className="mr-2">{'>'}</span>
                standards:
              </h3>
              <div className="space-y-3 font-mono text-sm">
                <div className="flex items-start">
                  <span className="text-[#00ff88] mr-3 mt-1">001</span>
                  <div>
                    <div className="text-[#C0C5CE] font-semibold">Technical excellence</div>
                    <div className="text-[#C0C5CE]/70">Production-grade code, reviewed and tested before delivery</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-[#00ff88] mr-3 mt-1">010</span>
                  <div>
                    <div className="text-[#C0C5CE] font-semibold">Regulatory compliance</div>
                    <div className="text-[#C0C5CE]/70">US and GCC requirements handled end-to-end</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-[#00ff88] mr-3 mt-1">011</span>
                  <div>
                    <div className="text-[#C0C5CE] font-semibold">Transparent pricing</div>
                    <div className="text-[#C0C5CE]/70">Fixed-price packages with no hidden fees or surprises</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#12151C] rounded-lg border border-[#00d4ff]/30 p-6">
              <div className="font-mono text-sm space-y-2">
                <div className="text-[#00ff88]">$ cat entity-info.txt</div>
                <div className="text-[#C0C5CE]/80">NeoTechnology Solutions LLC</div>
                <div className="text-[#C0C5CE]/60">Wyoming LLC · Filing ID: 2025-001744917</div>
                <div className="text-[#C0C5CE]/60">EIN: 36-5148912</div>
                <div className="text-[#C0C5CE]/60">hello@neotechnology.solutions</div>
                <div className="text-[#C0C5CE]/60">neotechnology.solutions</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
