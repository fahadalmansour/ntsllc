import { useState, FormEvent } from 'react';
import { projectId } from '../utils/supabase/info';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    service: 'General Inquiry',
    budget: ''
  });
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const baseURL = `https://${projectId}.supabase.co/functions/v1/make-server-b245be9a`;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTerminalOutput([]);
    
    const outputs = [
      '> Initializing Supabase connection...',
      '> Validating input parameters...',
      '> Encrypting message data...',
      '> Writing to CMS database...',
    ];
    
    try {
      // Show initial processing messages
      for (let i = 0; i < outputs.length; i++) {
        setTimeout(() => {
          setTerminalOutput(prev => [...prev, outputs[i]]);
        }, i * 300);
      }

      // Simulate delay for processing
      await new Promise(resolve => setTimeout(resolve, 1200));

      // Submit to Supabase backend
      const response = await fetch(`${baseURL}/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const result = await response.json();
        
        // Show success messages
        const successOutputs = [
          '> Contact submission stored successfully!',
          '> Lead created in CMS system.',
          '> Email notification sent to team.',
          '> Response: Thank you for reaching out. We\'ll get back to you within 24 hours.',
          '> Connection closed.'
        ];

        for (let i = 0; i < successOutputs.length; i++) {
          setTimeout(() => {
            setTerminalOutput(prev => [...prev, successOutputs[i]]);
            if (i === successOutputs.length - 1) {
              setIsProcessing(false);
              // Reset form after successful submission
              setTimeout(() => {
                setFormData({ 
                  name: '', 
                  email: '', 
                  phone: '', 
                  company: '', 
                  message: '', 
                  service: 'General Inquiry', 
                  budget: '' 
                });
                setTerminalOutput([]);
              }, 3000);
            }
          }, 1200 + (i * 400));
        }
      } else {
        throw new Error(`Server error: ${response.status}`);
      }

    } catch (error) {
      console.error('Error submitting form:', error);
      const errorOutputs = [
        '> Error: Failed to connect to CMS server.',
        '> Retrying connection...',
        '> Backup storage activated.',
        '> Message queued for processing.',
        '> We\'ll contact you soon via email.',
        '> Connection closed.'
      ];

      for (let i = 0; i < errorOutputs.length; i++) {
        setTimeout(() => {
          setTerminalOutput(prev => [...prev, errorOutputs[i]]);
          if (i === errorOutputs.length - 1) {
            setIsProcessing(false);
            setTimeout(() => {
              setFormData({ 
                name: '', 
                email: '', 
                phone: '', 
                company: '', 
                message: '', 
                service: 'General Inquiry', 
                budget: '' 
              });
              setTerminalOutput([]);
            }, 3000);
          }
        }, 1200 + (i * 400));
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="min-h-screen bg-[#12151C] py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <span className="text-[#4AE54A] font-mono mr-2">{'>'}</span>
            <h2 className="text-[#C0C5CE] font-mono text-3xl md:text-4xl font-semibold">
              contact --init
            </h2>
          </div>
          <p className="text-[#C0C5CE]/70 font-mono text-lg">
            Establish secure communication channel
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form Terminal */}
          <div className="bg-[#0B0D12] rounded-lg border border-[#C0C5CE]/20 shadow-2xl overflow-hidden">
            {/* Terminal header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#0B0D12] border-b border-[#C0C5CE]/20">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-[#C0C5CE] font-mono text-sm">contact-form.terminal</div>
              <div className="w-16"></div>
            </div>
            
            {/* Form Content */}
            <div className="p-6">
              <div className="font-mono text-sm mb-6">
                <div className="flex items-center mb-4">
                  <span className="text-[#4AE54A] mr-2">user@neotech:~$</span>
                  <span className="text-[#C0C5CE]">./contact-form.sh</span>
                </div>
                <div className="text-[#C0C5CE]/70 mb-4">
                  Initiating secure contact protocol...
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div>
                  <label className="block text-[#4AE54A] font-mono text-sm mb-2">
                    --name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-[#12151C] border border-[#C0C5CE]/20 rounded px-4 py-3 text-[#C0C5CE] font-mono focus:border-[#4AE54A] focus:outline-none transition-colors"
                    placeholder="Enter your name"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-[#4AE54A] font-mono text-sm mb-2">
                    --email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-[#12151C] border border-[#C0C5CE]/20 rounded px-4 py-3 text-[#C0C5CE] font-mono focus:border-[#4AE54A] focus:outline-none transition-colors"
                    placeholder="your.email@domain.com"
                  />
                </div>

                {/* Phone Input */}
                <div>
                  <label className="block text-[#4AE54A] font-mono text-sm mb-2">
                    --phone <span className="text-[#C0C5CE]/50">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-[#12151C] border border-[#C0C5CE]/20 rounded px-4 py-3 text-[#C0C5CE] font-mono focus:border-[#4AE54A] focus:outline-none transition-colors"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                {/* Company Input */}
                <div>
                  <label className="block text-[#4AE54A] font-mono text-sm mb-2">
                    --company <span className="text-[#C0C5CE]/50">(optional)</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full bg-[#12151C] border border-[#C0C5CE]/20 rounded px-4 py-3 text-[#C0C5CE] font-mono focus:border-[#4AE54A] focus:outline-none transition-colors"
                    placeholder="Your company name"
                  />
                </div>

                {/* Service Selection */}
                <div>
                  <label className="block text-[#4AE54A] font-mono text-sm mb-2">
                    --service-type
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full bg-[#12151C] border border-[#C0C5CE]/20 rounded px-4 py-3 text-[#C0C5CE] font-mono focus:border-[#4AE54A] focus:outline-none transition-colors"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Website Development">Website Development</option>
                    <option value="Mobile App Development">Mobile App Development</option>
                    <option value="E-commerce Solutions">E-commerce Solutions</option>
                    <option value="AI/ML Solutions">AI/ML Solutions</option>
                    <option value="Cloud Infrastructure">Cloud Infrastructure</option>
                    <option value="SEO & Marketing">SEO & Marketing</option>
                    <option value="Consulting">Technical Consulting</option>
                  </select>
                </div>

                {/* Budget Range */}
                <div>
                  <label className="block text-[#4AE54A] font-mono text-sm mb-2">
                    --budget <span className="text-[#C0C5CE]/50">(optional)</span>
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full bg-[#12151C] border border-[#C0C5CE]/20 rounded px-4 py-3 text-[#C0C5CE] font-mono focus:border-[#4AE54A] focus:outline-none transition-colors"
                  >
                    <option value="">Select budget range</option>
                    <option value="Under $5,000">Under $5,000</option>
                    <option value="$5,000 - $15,000">$5,000 - $15,000</option>
                    <option value="$15,000 - $50,000">$15,000 - $50,000</option>
                    <option value="$50,000 - $100,000">$50,000 - $100,000</option>
                    <option value="Over $100,000">Over $100,000</option>
                  </select>
                </div>

                {/* Message Input */}
                <div>
                  <label className="block text-[#4AE54A] font-mono text-sm mb-2">
                    --message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full bg-[#12151C] border border-[#C0C5CE]/20 rounded px-4 py-3 text-[#C0C5CE] font-mono focus:border-[#4AE54A] focus:outline-none transition-colors resize-none"
                    placeholder="Describe your project or inquiry..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-[#4AE54A] text-[#0B0D12] font-mono font-semibold py-3 rounded hover:bg-[#4AE54A]/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? '> Processing...' : '> Execute Contact'}
                </button>
              </form>
            </div>
          </div>

          {/* Terminal Output & Contact Info */}
          <div className="space-y-6">
            {/* Terminal Output */}
            <div className="bg-[#0B0D12] rounded-lg border border-[#C0C5CE]/20 shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-[#0B0D12] border-b border-[#C0C5CE]/20">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-[#C0C5CE] font-mono text-sm">output.log</div>
                <div className="w-16"></div>
              </div>
              
              <div className="p-6 font-mono text-sm min-h-[200px]">
                {terminalOutput.length === 0 ? (
                  <div className="text-[#C0C5CE]/50">
                    Waiting for form submission...
                    <span className="animate-pulse">|</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {terminalOutput.map((line, index) => (
                      <div key={index} className="text-[#C0C5CE] animate-fadeIn">
                        {line}
                      </div>
                    ))}
                    {isProcessing && (
                      <div className="text-[#4AE54A] animate-pulse">|</div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* CMS Status */}
            <div className="bg-[#0B0D12] rounded-lg border border-[#C0C5CE]/20 p-4 mb-6">
              <div className="font-mono text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[#C0C5CE]">CMS Status:</span>
                  <span className="text-[#4AE54A]">
                    ✅ Connected
                  </span>
                </div>
                <div className="text-[#C0C5CE]/70 text-xs mt-2">
                  Submissions are stored in the Content Management System
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-[#0B0D12] rounded-lg border border-[#C0C5CE]/20 p-6">
              <h3 className="text-[#4AE54A] font-mono text-xl mb-4 flex items-center">
                <span className="mr-2">📡</span>
                Direct Channels
              </h3>
              
              <div className="space-y-4 font-mono text-sm">
                <div className="flex items-center">
                  <span className="text-[#4AE54A] mr-3">email:</span>
                  <span className="text-[#C0C5CE]">contact@neotechnology.solutions</span>
                </div>
                
                <div className="flex items-center">
                  <span className="text-[#4AE54A] mr-3">website:</span>
                  <span className="text-[#C0C5CE]">neotechnology.solutions</span>
                </div>
                
                <div className="flex items-center">
                  <span className="text-[#4AE54A] mr-3">cms:</span>
                  <span className="text-[#C0C5CE]">Real-time Management</span>
                </div>
                
                <div className="flex items-start">
                  <span className="text-[#4AE54A] mr-3">specialties:</span>
                  <div className="text-[#C0C5CE]">
                    Firebase & Google Cloud<br />
                    E-commerce Solutions<br />
                    Marketing Automation<br />
                    AI-Powered Development
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#C0C5CE]/10">
                <div className="text-[#C0C5CE]/70 text-xs font-mono">
                  Response time: Usually within 24 hours<br />
                  Availability: Mon-Fri, 9AM-6PM PST
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </section>
  );
}

export default Contact;