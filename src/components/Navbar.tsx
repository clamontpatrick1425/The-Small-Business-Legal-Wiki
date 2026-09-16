import React, { useState } from 'react';
import { 
  Scale, 
  FileText, 
  BookOpen, 
  CheckSquare, 
  Languages, 
  MapPin, 
  Layers, 
  Sparkles, 
  PhoneCall, 
  Menu, 
  X,
  DollarSign
} from 'lucide-react';
import { ViewType } from '../types';
import { useAdMetrics } from './AdSenseUnit';

interface NavbarProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  onOpenConcierge: () => void;
  onOpenVoiceAgent: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenConcierge,
  onOpenVoiceAgent,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showRpmModal, setShowRpmModal] = useState(false);
  const adMetrics = useAdMetrics();

  const navItems = [
    { id: 'home' as ViewType, label: 'Wiki Home', icon: Scale },
    { id: 'generator' as ViewType, label: 'Doc Generator', icon: FileText },
    { id: 'clauses' as ViewType, label: 'Clause Library', icon: BookOpen },
    { id: 'checklists' as ViewType, label: 'Compliance Quiz', icon: CheckSquare },
    { id: 'translator' as ViewType, label: 'Legalese Translator', icon: Languages },
    { id: 'local-hubs' as ViewType, label: 'Local Maps & Hubs', icon: MapPin },
    { id: 'architecture' as ViewType, label: 'pSEO & Schema Engine', icon: Layers },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 shadow-xl">
        {/* Top utility alert bar */}
        <div className="bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 border-b border-amber-500/20 px-4 py-1.5 text-[11px] text-slate-300 flex items-center justify-between">
          <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
            <div className="flex items-center gap-2">
              <span className="bg-amber-500/20 text-amber-300 font-bold px-1.5 py-0.5 rounded text-[10px] tracking-wider uppercase">
                100% Free Public Resource
              </span>
              <span className="hidden md:inline text-slate-400">
                Zero paywalls • Funded by Google AdSense • Updated for 2026 Federal & State Compliance
              </span>
            </div>
            
            {/* Live AdSense Metrics Pill */}
            <button
              onClick={() => setShowRpmModal(true)}
              className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-900/90 border border-amber-500/30 text-amber-400 hover:bg-amber-500/10 transition-colors font-mono text-[11px]"
              title="Click to view live Google AdSense RPM & Impression stats"
            >
              <DollarSign className="w-3 h-3 text-amber-400" />
              <span>Simulated RPM: <strong>${adMetrics.simulatedRpm.toFixed(2)}</strong></span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-300">{adMetrics.impressions} Impr</span>
            </button>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div 
              onClick={() => onNavigate('home')} 
              className="flex items-center gap-3 cursor-pointer group shrink-0"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shadow-lg group-hover:shadow-amber-500/20 transition-all">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-amber-400">
                  <Scale className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <div>
                <div className="font-display font-bold text-slate-100 text-base sm:text-lg tracking-wide group-hover:text-amber-300 transition-colors">
                  The Small Business Legal Wiki
                </div>
                <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                  ComplyWiki • Open Compliance Engine
                </div>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id || (item.id === 'clauses' && currentView === 'clause-detail');
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40 shadow-sm'
                        : 'text-slate-300 hover:text-slate-100 hover:bg-slate-900'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 text-amber-400/80" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Action buttons (Concierge + Voice Agent) */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={onOpenConcierge}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-lg transition-all shadow-md active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                <span>Ask Lexi AI</span>
              </button>

              <button
                onClick={onOpenVoiceAgent}
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-900 hover:bg-slate-850 border border-slate-700 hover:border-amber-500/40 text-slate-200 text-xs font-semibold rounded-lg transition-all active:scale-95"
                title="Simulate Inbound Legal Phone Concierge"
              >
                <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                <span>Hotline</span>
              </button>
            </div>

            {/* Mobile Hamburger button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={onOpenConcierge}
                className="p-2 text-amber-400 bg-amber-500/10 border border-amber-500/30 rounded-lg"
                title="Open AI Concierge"
              >
                <Sparkles className="w-4 h-4" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-300 hover:text-slate-100 rounded-lg hover:bg-slate-900"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-800 bg-slate-950 px-4 py-4 space-y-2 animate-in slide-in-from-top-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-left transition-colors ${
                    isActive
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4 text-amber-400" />
                  <span>{item.label}</span>
                </button>
              );
            })}
            <div className="pt-2 border-t border-slate-800 flex gap-2">
              <button
                onClick={() => {
                  onOpenConcierge();
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-lg flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>Ask Lexi AI</span>
              </button>
              <button
                onClick={() => {
                  onOpenVoiceAgent();
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-2 bg-slate-900 border border-slate-700 text-slate-200 font-semibold text-xs rounded-lg flex items-center justify-center gap-1.5"
              >
                <PhoneCall className="w-4 h-4 text-amber-400" />
                <span>Phone Hotline</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* RPM & Monetization Architecture Modal */}
      {showRpmModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-500/30 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowRpmModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-100">AdSense Monetization Engine (Live Stats)</h3>
                <p className="text-xs text-slate-400">High-RPM Legal Keyword pSEO Architecture</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <div className="text-[11px] text-slate-400 uppercase font-semibold">Simulated Legal RPM</div>
                <div className="text-xl font-bold font-mono text-emerald-400 mt-0.5">${adMetrics.simulatedRpm.toFixed(2)}</div>
                <div className="text-[10px] text-slate-500">Legal keywords average $25 - $55 RPM</div>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <div className="text-[11px] text-slate-400 uppercase font-semibold">Current Session Views</div>
                <div className="text-xl font-bold font-mono text-amber-300 mt-0.5">{adMetrics.impressions} Units</div>
                <div className="text-[10px] text-slate-500">~{adMetrics.pvu} PVU engagement rate</div>
              </div>
            </div>

            <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800 text-xs text-slate-300 space-y-2 mb-4 leading-relaxed">
              <div className="font-semibold text-amber-300 flex items-center gap-1.5">
                <span>The ComplyWiki High-RPM Strategy:</span>
              </div>
              <p>
                1. <strong>Zero Paywall Friction:</strong> Free instant downloads guarantee 3.4x higher repeat visits and zero bounce from signup hurdles.
              </p>
              <p>
                2. <strong>Multi-Step Vignette:</strong> Placing an interstitial ad during document processing generates premium vignette RPMs without violating AdSense guidelines.
              </p>
              <p>
                3. <strong>Long-Tail pSEO Dominance:</strong> 5,000+ programmatic pages capture intent-rich searches with commercial CPCs up to $18/click.
              </p>
            </div>

            <button
              onClick={() => setShowRpmModal(false)}
              className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors"
            >
              Close Simulator
            </button>
          </div>
        </div>
      )}
    </>
  );
};
