import React from 'react';
import { Scale, AlertTriangle, ShieldCheck, ExternalLink, Mail, Phone, MapPin } from 'lucide-react';
import { ViewType } from '../types';

interface FooterProps {
  onNavigate: (view: ViewType) => void;
  onOpenLegalModal: (initialTab: 'privacy' | 'terms' | 'cookies') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenLegalModal }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-sm mt-16 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* MANDATORY LEGAL DISCLAIMER BANNER */}
        <div className="mb-10 p-4 rounded-xl bg-amber-500/5 border border-amber-500/30 text-amber-200/90 text-xs leading-relaxed flex items-start gap-3 shadow-inner">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold uppercase tracking-wider text-amber-300 block text-[11px]">
              Statutory Educational Disclaimer — Not Formal Legal Counsel
            </span>
            <p>
              The Small Business Legal Wiki (ComplyWiki) is an open educational compliance repository and automated document formatting tool. 
              The information, clauses, templates, and AI answers provided do not constitute legal, tax, or financial advice and do not create 
              an attorney-client relationship. State regulatory requirements change frequently. We strongly recommend having a licensed attorney 
              in your specific state jurisdiction review critical commercial contracts and corporate filings.
            </p>
          </div>
        </div>

        {/* 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10 pb-8 border-b border-slate-800/80">
          {/* Column 1: Brand & NAP */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Scale className="w-4 h-4" />
              </div>
              <span className="font-display font-bold text-slate-100 text-base">The Small Business Legal Wiki</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              The premier zero-paywall business compliance repository. Dedicated to empowering small business owners, freelancers, and startups with authoritative legal templates and local regulatory transparency.
            </p>
            {/* NAP (Name, Address, Phone) strictly matching LocalBusiness schema */}
            <div className="space-y-1 text-xs text-slate-300 pt-2 border-t border-slate-900">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400/80 shrink-0" />
                <span>1209 Orange Street, Wilmington, DE 19801</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-amber-400/80 shrink-0" />
                <span>(800) 555-WIKI / (800) 555-9454</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-amber-400/80 shrink-0" />
                <span>counsel@complywiki.com</span>
              </div>
            </div>
          </div>

          {/* Column 2: Free Legal Tools */}
          <div className="space-y-2">
            <h4 className="font-semibold text-slate-100 text-xs tracking-wider uppercase">Free Legal Utilities</h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => onNavigate('generator')} className="hover:text-amber-300 transition-colors">
                  Instant Document Generator (NDA, Contractor, Privacy)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('clauses')} className="hover:text-amber-300 transition-colors">
                  Clause Library & Risk Explanations
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('checklists')} className="hover:text-amber-300 transition-colors">
                  Interactive GDPR & CCPA Compliance Quiz
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('translator')} className="hover:text-amber-300 transition-colors">
                  "Plain English" Legal Contract Translator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('local-hubs')} className="hover:text-amber-300 transition-colors">
                  City Hall & Licensing Office Maps (Local SEO)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('architecture')} className="hover:text-amber-300 transition-colors">
                  Next.js pSEO Architecture & Schema Engine
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Official .gov Verified Citations */}
          <div className="space-y-2">
            <h4 className="font-semibold text-slate-100 text-xs tracking-wider uppercase flex items-center gap-1">
              <span>Official Government Sources</span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a href="https://www.fincen.gov/boi" target="_blank" rel="noreferrer" className="hover:text-amber-300 transition-colors flex items-center gap-1">
                  <span>FinCEN Beneficial Ownership (BOI)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://www.ftc.gov/business-guidance" target="_blank" rel="noreferrer" className="hover:text-amber-300 transition-colors flex items-center gap-1">
                  <span>FTC Small Business Guidance</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://www.sba.gov/business-guide" target="_blank" rel="noreferrer" className="hover:text-amber-300 transition-colors flex items-center gap-1">
                  <span>U.S. Small Business Administration (SBA)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://www.irs.gov/businesses/small-businesses-self-employed" target="_blank" rel="noreferrer" className="hover:text-amber-300 transition-colors flex items-center gap-1">
                  <span>IRS EIN & Self-Employed Tax Center</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://cppa.ca.gov/" target="_blank" rel="noreferrer" className="hover:text-amber-300 transition-colors flex items-center gap-1">
                  <span>California Privacy Protection Agency</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Monetization & Compliance Transparency */}
          <div className="space-y-2">
            <h4 className="font-semibold text-slate-100 text-xs tracking-wider uppercase">Monetization & Trust</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              We uphold Google AdSense certified publisher standards. Ads are non-intrusive and never gated behind forced software downloads or hidden billing traps.
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-mono text-slate-400">
              <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">ads.txt Validated</span>
              <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">HTTPS 256-Bit</span>
              <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">WCAG AA Compliant</span>
            </div>
            <div className="pt-2 flex flex-col gap-1 text-xs">
              <button
                onClick={() => onOpenLegalModal('privacy')}
                className="text-amber-400/90 hover:text-amber-300 transition-colors text-left flex items-center gap-1"
              >
                <span>→ Privacy Policy & AdSense Disclosures</span>
              </button>
              <button
                onClick={() => onOpenLegalModal('terms')}
                className="text-amber-400/90 hover:text-amber-300 transition-colors text-left flex items-center gap-1"
              >
                <span>→ Terms of Use & Legal Licensing</span>
              </button>
              <button
                onClick={() => onOpenLegalModal('cookies')}
                className="text-amber-400/90 hover:text-amber-300 transition-colors text-left flex items-center gap-1"
              >
                <span>→ Cookie Policy & Do Not Sell (CPRA)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            © {new Date().getFullYear()} The Small Business Legal Wiki (ComplyWiki). All Rights Reserved.
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <button
              onClick={() => onOpenLegalModal('privacy')}
              className="hover:text-amber-300 hover:underline transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onOpenLegalModal('terms')}
              className="hover:text-amber-300 hover:underline transition-colors"
            >
              Terms of Use
            </button>
            <button
              onClick={() => onOpenLegalModal('cookies')}
              className="hover:text-amber-300 hover:underline transition-colors"
            >
              Cookie Policy & CPRA
            </button>
            <button
              onClick={() => onNavigate('architecture')}
              className="text-amber-400/90 hover:underline font-mono"
            >
              Next.js pSEO Architecture
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
