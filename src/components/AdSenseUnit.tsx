import React, { useState, useEffect } from 'react';
import { ExternalLink, ShieldCheck, Sparkles, X, Info } from 'lucide-react';
import { AdFormat } from '../types';

interface AdSenseUnitProps {
  format: AdFormat;
  slotId?: string;
  className?: string;
  onAdClose?: () => void;
}

// Global state for AdSense Simulation metrics
export interface AdMetrics {
  impressions: number;
  clicks: number;
  simulatedRpm: number;
  estRevenue: number;
  pvu: number; // Page Views per User
}

let globalAdMetrics: AdMetrics = {
  impressions: 48,
  clicks: 3,
  simulatedRpm: 34.80, // High-value legal & business compliance RPM
  estRevenue: 1.67,
  pvu: 3.4,
};

const listeners: Array<(m: AdMetrics) => void> = [];

export function recordAdImpression() {
  globalAdMetrics.impressions += 1;
  globalAdMetrics.estRevenue = +( (globalAdMetrics.impressions / 1000) * globalAdMetrics.simulatedRpm ).toFixed(2);
  listeners.forEach(l => l({ ...globalAdMetrics }));
}

export function recordAdClick() {
  globalAdMetrics.clicks += 1;
  listeners.forEach(l => l({ ...globalAdMetrics }));
}

export function useAdMetrics() {
  const [metrics, setMetrics] = useState<AdMetrics>(globalAdMetrics);
  useEffect(() => {
    listeners.push(setMetrics);
    return () => {
      const idx = listeners.indexOf(setMetrics);
      if (idx > -1) listeners.splice(idx, 1);
    };
  }, []);
  return metrics;
}

export const AdSenseUnit: React.FC<AdSenseUnitProps> = ({
  format,
  slotId = 'default-slot',
  className = '',
  onAdClose,
}) => {
  const [closed, setClosed] = useState(false);
  const [vignetteTimer, setVignetteTimer] = useState(5);

  useEffect(() => {
    // Record impression upon mounting
    recordAdImpression();
  }, [format]);

  useEffect(() => {
    if (format === 'vignette' && vignetteTimer > 0) {
      const timer = setInterval(() => {
        setVignetteTimer(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [format, vignetteTimer]);

  if (closed) return null;

  // LEADERBOARD (728x90 Desktop / 320x50 Mobile)
  if (format === 'leaderboard') {
    return (
      <div className={`w-full my-4 flex flex-col items-center ${className}`}>
        <div className="text-[10px] tracking-wider text-slate-300 font-semibold uppercase mb-1 flex items-center gap-1">
          <span>Advertisement</span>
          <span className="text-amber-500">•</span>
          <span>Google AdSense (Slot #{slotId})</span>
        </div>
        <div 
          onClick={recordAdClick}
          className="w-full max-w-[728px] h-[90px] bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-amber-500/20 rounded-lg p-3 flex items-center justify-between shadow-lg hover:border-amber-500/40 transition-all cursor-pointer relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl group-hover:bg-amber-500/10 transition-all pointer-events-none" />
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-100 text-sm sm:text-base group-hover:text-amber-300 transition-colors">
                  Northwest Registered Agent – $39 State LLC Formation
                </span>
                <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-1.5 py-0.5 rounded">Ad</span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Free privacy by default. Keep your personal address off public state records in all 50 states.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-semibold text-amber-400 group-hover:underline flex items-center gap-1">
              <span>Visit Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>
    );
  }

  // IN-CONTENT NATIVE AD
  if (format === 'in-content') {
    return (
      <div 
        onClick={recordAdClick}
        className={`my-6 p-4 rounded-xl bg-slate-900/90 border border-slate-700/60 shadow-md hover:border-amber-500/30 transition-all cursor-pointer ${className}`}
      >
        <div className="flex items-center justify-between text-[11px] text-slate-300 mb-2 border-b border-slate-800 pb-1.5">
          <span className="font-semibold uppercase tracking-wider text-amber-400/90">Sponsored Business Solution</span>
          <span className="text-slate-400">Google AdSense Certified</span>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="font-bold text-slate-100 text-base hover:text-amber-300 transition-colors flex items-center gap-2">
              Hiscox Small Business General Liability Insurance
              <Sparkles className="w-4 h-4 text-amber-400" />
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              Protect your consulting, LLC, or agency operations against indemnification claims and third-party liabilities. Instant certificates online from $29/mo.
            </p>
          </div>
          <button className="shrink-0 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors shadow-sm">
            Get Free Quote
          </button>
        </div>
      </div>
    );
  }

  // STICKY SIDEBAR (300x600 Half-Page Banner)
  if (format === 'sticky-sidebar') {
    return (
      <div className={`w-full max-w-[300px] sticky top-24 space-y-2 ${className}`}>
        <div className="text-[10px] uppercase font-semibold text-slate-300 tracking-wider text-center">
          Sponsored Partner
        </div>
        <div 
          onClick={recordAdClick}
          className="h-[520px] rounded-xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-5 flex flex-col justify-between shadow-2xl hover:border-amber-500/30 transition-all cursor-pointer relative overflow-hidden group text-center"
        >
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-500 to-amber-300" />
          
          <div>
            <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 mx-auto flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <span className="text-[10px] uppercase tracking-widest text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded-full">
              High-RPM Partner
            </span>
            <h3 className="font-display font-bold text-slate-100 text-lg mt-3 group-hover:text-amber-300 transition-colors">
              Stripe Atlas & Mercury Banking
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Incorporate your Delaware or Wyoming C-Corp/LLC in 3 days. Includes corporate bank account, federal EIN, and post-formation compliance monitoring.
            </p>
          </div>

          <div className="space-y-3 bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
            <div className="text-xs font-mono text-emerald-400 font-medium">✓ Guaranteed EIN & BOI Report</div>
            <div className="text-xs font-mono text-emerald-400 font-medium">✓ No U.S. SSN Required</div>
            <div className="text-xs font-mono text-emerald-400 font-medium">✓ Over $50k in Startup Credits</div>
          </div>

          <div>
            <button className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-all shadow-md">
              Open Business Account →
            </button>
            <p className="text-[10px] text-slate-300 mt-2">Free legal wiki partner referral</p>
          </div>
        </div>
      </div>
    );
  }

  // ANCHOR AD (Mobile Sticky Bottom Banner)
  if (format === 'anchor') {
    return (
      <div className="fixed bottom-0 inset-x-0 z-40 bg-slate-950/95 border-t border-amber-500/30 p-2 sm:hidden shadow-2xl backdrop-blur-md">
        <div className="flex items-center justify-between max-w-md mx-auto px-2">
          <div className="flex items-center gap-2 overflow-hidden" onClick={recordAdClick}>
            <span className="bg-amber-500 text-slate-950 font-black text-[9px] px-1 rounded uppercase">AD</span>
            <div className="truncate">
              <div className="text-xs font-bold text-slate-100 truncate">QuickBooks Online – 50% Off 3 Months</div>
              <div className="text-[10px] text-slate-400 truncate">Automate small business taxes and payroll compliance.</div>
            </div>
          </div>
          <button 
            onClick={() => setClosed(true)} 
            className="p-1 text-slate-400 hover:text-slate-200 ml-2"
            aria-label="Close Ad"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // VIGNETTE / INTERSTITIAL (Full-Screen Step Transition Modal)
  if (format === 'vignette') {
    return (
      <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-amber-500/40 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-300">
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500 animate-pulse" />
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                Sponsored Interstitial
              </span>
              <span className="text-xs text-slate-400">Step 2: Processing Document</span>
            </div>
            {vignetteTimer > 0 ? (
              <span className="text-xs font-mono text-amber-400 bg-slate-800 px-2 py-1 rounded">
                Skip in {vignetteTimer}s
              </span>
            ) : (
              <button 
                onClick={() => {
                  setClosed(true);
                  if (onAdClose) onAdClose();
                }}
                className="px-3 py-1 bg-amber-500 text-slate-950 text-xs font-bold rounded-lg hover:bg-amber-400 transition-colors"
              >
                Skip Ad & View Document →
              </button>
            )}
          </div>

          <div 
            onClick={() => {
              recordAdClick();
              setClosed(true);
              if (onAdClose) onAdClose();
            }}
            className="p-5 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/40 cursor-pointer group transition-all"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg">
                BOI
              </div>
              <div>
                <h3 className="font-bold text-slate-100 group-hover:text-amber-300 text-base">
                  FinCEN BOI Direct Filing Portal (2026 Mandate)
                </h3>
                <p className="text-xs text-slate-400">Federal Corporate Transparency Act Filing Service</p>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              Avoid the $591/day civil non-compliance penalty. Submit your Beneficial Ownership Information (BOI) report in under 5 minutes with automated FinCEN validation and certified confirmation ID.
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-slate-900 text-xs text-amber-400 font-semibold">
              <span>Instant Confirmation Record</span>
              <span className="group-hover:translate-x-1 transition-transform">File Report Now →</span>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Info className="w-3.5 h-3.5" />
              Free tools funded 100% by Google AdSense
            </span>
            <button
              disabled={vignetteTimer > 0}
              onClick={() => {
                setClosed(true);
                if (onAdClose) onAdClose();
              }}
              className={`text-xs underline ${vignetteTimer > 0 ? 'text-slate-600 cursor-not-allowed' : 'text-slate-300 hover:text-amber-300'}`}
            >
              Continue to document
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
