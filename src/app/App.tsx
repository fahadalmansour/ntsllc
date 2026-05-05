import React, { useState, useCallback, useMemo, Suspense, lazy, useEffect, useRef } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { useLanguage } from './contexts/LanguageContext';
import { RTLContainer } from './components/LanguageSwitcher';

import DesignSystemProvider from './components/design/DesignSystemProvider';

import { Header } from './components/Header';
import { Footer } from './components/Footer';

import { Hero } from './components/Hero';
import { CoreServices } from './components/landing/CoreServices';
import { ProblemSolution } from './components/landing/ProblemSolution';
import { HowItWorks } from './components/landing/HowItWorks';
import { TechnologyStack } from './components/landing/TechnologyStack';
import { Testimonials } from './components/Testimonials';
import { FAQSection } from './components/landing/FAQSection';
import { CaseStudies } from './components/landing/CaseStudies';
import { AdvancedContact } from './components/landing/AdvancedContact';

import { Services } from './components/Services';
import { About } from './components/About';
import { Portfolio } from './components/Portfolio';
import { Pricing } from './components/Pricing';

import { ServicesPage } from './components/pages/ServicesPage';
import { ServiceDetailPage } from './components/pages/ServiceDetailPage';
import { AlaCartePage } from './components/pages/AlaCartePage';
import { UseCasePage } from './components/pages/UseCasePage';
import { ProcessPage } from './components/pages/ProcessPage';
import { WhyNeoPage } from './components/pages/WhyNeoPage';
import { BlogIndexPage } from './components/pages/BlogIndexPage';
import { BlogPostPage } from './components/pages/BlogPostPage';
import { ContactPage } from './components/pages/ContactPage';
import { BookingPage } from './components/pages/BookingPage';
import { FAQPage } from './components/pages/FAQPage';
import { LegalPage } from './components/pages/LegalPage';

import PerformanceMonitor from './components/performance/PerformanceMonitor';
import AdvancedPerformanceOptimizer from './components/performance/AdvancedPerformanceOptimizer';
import useServiceWorker from './components/performance/ServiceWorkerManager';

const ArabicContact = lazy(() => import('./components/ArabicContact'));
const ComparisonAnalysis = lazy(() => import('./components/analysis/ComparisonAnalysis'));
const HelpCenter = lazy(() => import('./components/help/HelpCenter'));
const SecurityCenter = lazy(() => import('./components/security/SecurityCenter'));
const RTLDemo = lazy(() => import('./components/demos/RTLDemo'));

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; errorDetails: string }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, errorDetails: '' };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorDetails: error.message };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Terminal Error Boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0a0a0a] text-[#C0C5CE] font-mono relative overflow-hidden">
          <div
            className="fixed inset-0 pointer-events-none opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 107, 107, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 107, 107, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}
          />
          <div className="flex items-center justify-center min-h-screen relative z-10">
            <div className="bg-[#12151C] border border-red-500/30 rounded-lg p-8 max-w-2xl mx-4 text-center">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-red-500/20">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <div className="w-3 h-3 bg-yellow-500/50 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500/50 rounded-full"></div>
                </div>
                <span className="text-sm text-red-400 font-mono">neo@error-handler:~$</span>
              </div>
              <div className="space-y-6">
                <div className="text-red-400 text-2xl font-bold animate-pulse">SYSTEM ERROR DETECTED</div>
                <div className="bg-[#0B0D12] border border-red-500/20 rounded-lg p-4 text-left">
                  <div className="text-red-400 text-sm mb-2">$ error-trace --detailed</div>
                  <div className="text-red-300 text-xs space-y-1">
                    <div>⚠️ Fatal exception in component tree</div>
                    <div>📍 Location: {this.state.errorDetails}</div>
                    <div>🔧 Recovery: Attempting system restart...</div>
                  </div>
                </div>
                <p className="text-[#C0C5CE]/80 text-sm">
                  The application encountered an unexpected error. The system will attempt to recover automatically.
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-mono font-bold transition-all duration-300 hover:scale-105 neo-glow"
                >
                  RESTART SYSTEM
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const preloadStrategies = {
  high: (importFn: () => Promise<any>) => {
    const timer = setTimeout(() => {
      importFn().catch((error) => {
        console.warn('High priority preload failed (non-critical):', error.message);
      });
    }, 1000);
    return () => clearTimeout(timer);
  },
  medium: (importFn: () => Promise<any>) => {
    const timer = setTimeout(() => {
      importFn().catch((error) => {
        console.warn('Medium priority preload failed (non-critical):', error.message);
      });
    }, 3000);
    return () => clearTimeout(timer);
  },
  low: (importFn: () => Promise<any>) => {
    const timer = setTimeout(() => {
      importFn().catch((error) => {
        console.warn('Low priority preload failed (non-critical):', error.message);
      });
    }, 5000);
    return () => clearTimeout(timer);
  }
};

function LoadingSpinner() {
  const [loadingText, setLoadingText] = useState('Initializing NeoTech Systems');
  const [dots, setDots] = useState('');

  useEffect(() => {
    const textCycle = [
      'Initializing NeoTech Systems',
      'Loading Terminal Interface',
      'Establishing Secure Connection',
      'Preparing Content',
      'Almost Ready...'
    ];
    let textIndex = 0;
    const textTimer = setInterval(() => {
      setLoadingText(textCycle[textIndex % textCycle.length]);
      textIndex++;
    }, 1500);
    let dotCount = 0;
    const dotTimer = setInterval(() => {
      setDots('.'.repeat((dotCount % 4)));
      dotCount++;
    }, 500);
    return () => {
      clearInterval(textTimer);
      clearInterval(dotTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#C0C5CE] font-mono relative overflow-hidden">
      <div
        className="fixed inset-0 pointer-events-none opacity-10 animate-pulse"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      <div className="flex items-center justify-center min-h-screen relative z-10">
        <div className="bg-[#12151C] border border-[#00d4ff]/30 rounded-lg p-8 text-center max-w-md mx-4 neo-glow">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#00d4ff]/20">
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <span className="text-sm text-[#00d4ff] font-mono">neo@loading:~$</span>
          </div>
          <div className="space-y-6">
            <div className="relative">
              <div className="w-20 h-20 mx-auto relative">
                <div className="absolute inset-0 border-4 border-transparent border-t-[#00d4ff] border-r-[#00d4ff] rounded-full animate-spin"></div>
                <div className="absolute inset-2 border-4 border-transparent border-b-[#00ff88] border-l-[#00ff88] rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2 h-2 bg-[#00d4ff] rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-[#00d4ff] text-lg font-bold">neo@tech:~$ loading{dots}</div>
              <div className="text-[#C0C5CE]/80 text-sm">{loadingText}</div>
              <div className="mt-4">
                <div className="w-full bg-[#0B0D12] border border-[#00d4ff]/20 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#00d4ff] to-[#00ff88] rounded-full animate-pulse"
                    style={{ width: '70%' }}
                  />
                </div>
                <div className="text-xs text-[#C0C5CE]/60 mt-2">Loading core systems...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionWrapper({ id, children, onVisible }: {
  id: string;
  children: React.ReactNode;
  onVisible: (id: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onVisible(id);
          observer.unobserve(element);
        }
      },
      { threshold: 0.1, rootMargin: '100px 0px 100px 0px' }
    );
    observer.observe(element);
    return () => {
      if (element) observer.unobserve(element);
    };
  }, [id, onVisible]);

  return <div ref={ref} className="section-wrapper">{children}</div>;
}

function HomeContent({ onNavigate }: { onNavigate: (section: string) => void }) {
  const [visibleSections, setVisibleSections] = useState(new Set([
    'hero', 'services', 'problem', 'how-it-works', 'technology',
    'testimonials', 'faq', 'case-studies', 'advanced-contact'
  ]));

  const handleSectionVisible = useCallback((sectionId: string) => {
    setVisibleSections(prev => new Set([...prev, sectionId]));
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#C0C5CE] font-mono relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-8"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 212, 255, 0.12) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 212, 255, 0.12) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 136, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 136, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            transform: 'rotate(45deg) scale(1.5)'
          }}
        />
      </div>

      <div className="relative z-10">
        <SectionWrapper id="hero" onVisible={handleSectionVisible}>
          <Hero onNavigate={onNavigate} />
        </SectionWrapper>

        <SectionWrapper id="services" onVisible={handleSectionVisible}>
          {visibleSections.has('services') && (
            <div className="animate-fade-in">
              <CoreServices onNavigate={onNavigate} />
            </div>
          )}
        </SectionWrapper>

        <SectionWrapper id="problem" onVisible={handleSectionVisible}>
          {visibleSections.has('problem') && (
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <ProblemSolution onNavigate={onNavigate} />
            </div>
          )}
        </SectionWrapper>

        <SectionWrapper id="how-it-works" onVisible={handleSectionVisible}>
          {visibleSections.has('how-it-works') && (
            <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <HowItWorks onNavigate={onNavigate} />
            </div>
          )}
        </SectionWrapper>

        <SectionWrapper id="technology" onVisible={handleSectionVisible}>
          {visibleSections.has('technology') && (
            <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <TechnologyStack onNavigate={onNavigate} />
            </div>
          )}
        </SectionWrapper>

        <SectionWrapper id="testimonials" onVisible={handleSectionVisible}>
          {visibleSections.has('testimonials') && (
            <div className="animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <Testimonials onNavigate={onNavigate} />
            </div>
          )}
        </SectionWrapper>

        <SectionWrapper id="faq" onVisible={handleSectionVisible}>
          {visibleSections.has('faq') && (
            <div className="animate-fade-in" style={{ animationDelay: '1.0s' }}>
              <FAQSection onNavigate={onNavigate} />
            </div>
          )}
        </SectionWrapper>

        <SectionWrapper id="case-studies" onVisible={handleSectionVisible}>
          {visibleSections.has('case-studies') && (
            <div className="animate-fade-in" style={{ animationDelay: '1.2s' }}>
              <CaseStudies onNavigate={onNavigate} />
            </div>
          )}
        </SectionWrapper>

        <SectionWrapper id="advanced-contact" onVisible={handleSectionVisible}>
          {visibleSections.has('advanced-contact') && (
            <div className="animate-fade-in" style={{ animationDelay: '1.4s' }}>
              <AdvancedContact onNavigate={onNavigate} />
            </div>
          )}
        </SectionWrapper>
      </div>
    </div>
  );
}

function AppContent() {
  const { isRTL } = useLanguage();
  const [currentSection, setCurrentSection] = useState('home');
  const serviceWorker = useServiceWorker();

  useEffect(() => {
    if (currentSection === 'home') {
      const cleanups = [
        preloadStrategies.high(() => import('./components/Services')),
        preloadStrategies.medium(() => import('./components/About')),
        preloadStrategies.medium(() => import('./components/Pricing')),
        preloadStrategies.low(() => import('./components/help/HelpCenter')),
        preloadStrategies.low(() => import('./components/ArabicContact'))
      ];
      return () => cleanups.forEach(cleanup => cleanup());
    }
  }, [currentSection]);

  const handleNavigate = useCallback((section: string) => {
    setCurrentSection(section);
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const SuspenseWrapper = useCallback(({ children }: { children: React.ReactNode }) => (
    <Suspense fallback={<LoadingSpinner />}>
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    </Suspense>
  ), []);

  const TerminalSectionWrapper = useCallback(({ children }: { children: React.ReactNode }) => (
    <div
      className="min-h-screen relative"
      style={{
        backgroundColor: 'var(--neo-bg-primary)',
        color: 'var(--terminal-silver)',
        fontFamily: 'JetBrains Mono, monospace'
      }}
    >
      <div className="fixed inset-0 pointer-events-none enterprise-grid" />
      <div className="relative z-10">{children}</div>
    </div>
  ), []);

  const renderCurrentSection = useMemo(() => {
    switch (currentSection) {
      case 'home':
        return <HomeContent onNavigate={handleNavigate} />;

      case 'services':
        return (
          <TerminalSectionWrapper>
            <ServicesPage onNavigate={handleNavigate} />
          </TerminalSectionWrapper>
        );

      case 'services/store-setup':
      case 'services/payments':
      case 'services/automation':
      case 'services/domain-hosting':
      case 'services/consulting':
      case 'services/brokerage':
      case 'services/quick-fix':
      case 'services/communication':
        return (
          <TerminalSectionWrapper>
            <ServiceDetailPage serviceId={currentSection.replace('services/', '')} onNavigate={handleNavigate} />
          </TerminalSectionWrapper>
        );

      case 'pricing/a-la-carte':
        return (
          <TerminalSectionWrapper>
            <AlaCartePage onNavigate={handleNavigate} />
          </TerminalSectionWrapper>
        );

      case 'use-cases/saudi-fashion':
      case 'use-cases/us-dropshipping':
      case 'use-cases/marketplace':
        return (
          <TerminalSectionWrapper>
            <UseCasePage caseId={currentSection.replace('use-cases/', '')} onNavigate={handleNavigate} />
          </TerminalSectionWrapper>
        );

      case 'process':
        return (
          <TerminalSectionWrapper>
            <ProcessPage onNavigate={handleNavigate} />
          </TerminalSectionWrapper>
        );

      case 'why-neotechnology':
        return (
          <TerminalSectionWrapper>
            <WhyNeoPage onNavigate={handleNavigate} />
          </TerminalSectionWrapper>
        );

      case 'blog':
        return (
          <TerminalSectionWrapper>
            <BlogIndexPage onNavigate={handleNavigate} />
          </TerminalSectionWrapper>
        );

      case 'blog/post':
        return (
          <TerminalSectionWrapper>
            <BlogPostPage onNavigate={handleNavigate} />
          </TerminalSectionWrapper>
        );

      case 'contact':
        return (
          <TerminalSectionWrapper>
            <ContactPage onNavigate={handleNavigate} />
          </TerminalSectionWrapper>
        );

      case 'book':
        return (
          <TerminalSectionWrapper>
            <BookingPage onNavigate={handleNavigate} />
          </TerminalSectionWrapper>
        );

      case 'faq':
        return (
          <TerminalSectionWrapper>
            <FAQPage onNavigate={handleNavigate} />
          </TerminalSectionWrapper>
        );

      case 'legal/privacy':
      case 'legal/terms':
      case 'legal/refund':
      case 'legal/cookies':
      case 'legal/acceptable-use':
      case 'legal/sla':
      case 'legal/dpa':
        return (
          <TerminalSectionWrapper>
            <LegalPage docId={currentSection.replace('legal/', '')} onNavigate={handleNavigate} />
          </TerminalSectionWrapper>
        );

      case 'about':
        return (
          <TerminalSectionWrapper>
            <About onNavigate={handleNavigate} />
          </TerminalSectionWrapper>
        );
      case 'technology':
        return (
          <TerminalSectionWrapper>
            <TechnologyStack onNavigate={handleNavigate} />
          </TerminalSectionWrapper>
        );
      case 'portfolio':
        return (
          <TerminalSectionWrapper>
            <Portfolio onNavigate={handleNavigate} />
          </TerminalSectionWrapper>
        );
      case 'pricing':
        return (
          <TerminalSectionWrapper>
            <Pricing onNavigate={handleNavigate} />
          </TerminalSectionWrapper>
        );
      case 'comparison-analysis':
        return (
          <SuspenseWrapper>
            <ComparisonAnalysis onNavigate={handleNavigate} />
          </SuspenseWrapper>
        );
      case 'help':
        return (
          <SuspenseWrapper>
            <HelpCenter onNavigate={handleNavigate} />
          </SuspenseWrapper>
        );
      case 'security':
        return (
          <SuspenseWrapper>
            <SecurityCenter onNavigate={handleNavigate} />
          </SuspenseWrapper>
        );
      case 'rtl-demo':
        return (
          <SuspenseWrapper>
            <RTLDemo onNavigate={handleNavigate} />
          </SuspenseWrapper>
        );

      default:
        return <HomeContent onNavigate={handleNavigate} />;
    }
  }, [currentSection, handleNavigate, SuspenseWrapper, TerminalSectionWrapper]);

  return (
    <RTLContainer className="min-h-screen terminal-theme">
      <div className="min-h-screen relative">
        <div className="fixed inset-0 pointer-events-none enterprise-grid" style={{ zIndex: 0 }} />
        <Header onNavigate={handleNavigate} />
        <main className="flex-1 relative" style={{ zIndex: 1 }}>
          {renderCurrentSection}
        </main>
        <Footer onNavigate={handleNavigate} />
        {process.env.NODE_ENV === 'development' && (
          <div className="fixed bottom-4 left-4 z-50 space-y-2 no-print">
            <AdvancedPerformanceOptimizer />
            <PerformanceMonitor />
          </div>
        )}
      </div>
    </RTLContainer>
  );
}

function App() {
  return (
    <LanguageProvider defaultLanguage="en">
      <DesignSystemProvider
        forceOverrides={true}
        terminalMode={true}
        debugMode={process.env.NODE_ENV === 'development'}
      >
        <ErrorBoundary>
          <AppContent />
        </ErrorBoundary>
      </DesignSystemProvider>
    </LanguageProvider>
  );
}

export default App;
