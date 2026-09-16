import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Shield,
  FileText,
  Cookie,
  Printer,
  Copy,
  Check,
  Search,
  ExternalLink,
  AlertTriangle,
  Scale,
  Lock,
  Globe,
  Sliders,
  CheckCircle2,
  Building,
  Mail,
  Phone,
  MapPin,
  HelpCircle,
  Clock,
} from 'lucide-react';

export type LegalModalTab = 'privacy' | 'terms' | 'cookies';

interface LegalPoliciesModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: LegalModalTab;
}

export const LegalPoliciesModal: React.FC<LegalPoliciesModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'privacy',
}) => {
  const [activeTab, setActiveTab] = useState<LegalModalTab>(initialTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [doNotSellOptOut, setDoNotSellOptOut] = useState(() => {
    try {
      return localStorage.getItem('complywiki_cpra_optout') === 'true';
    } catch {
      return false;
    }
  });
  const [optOutSaved, setOptOutSaved] = useState(false);

  // Sync initial tab when modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setSearchQuery('');
      setCopied(false);
      setOptOutSaved(false);
    }
  }, [isOpen, initialTab]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock background body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleCopyCurrentPolicy = () => {
    const el = document.getElementById(`policy-text-container-${activeTab}`);
    if (el) {
      const text = el.innerText;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleToggleDoNotSell = () => {
    const next = !doNotSellOptOut;
    setDoNotSellOptOut(next);
    try {
      localStorage.setItem('complywiki_cpra_optout', String(next));
    } catch {}
    setOptOutSaved(true);
    setTimeout(() => setOptOutSaved(false), 3000);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-md transition-opacity duration-200 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 border-b border-slate-800 bg-slate-900/90 gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="legal-modal-title" className="font-display text-lg sm:text-xl font-bold text-slate-100">
                  Legal Compliance & Terms
                </h2>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Active 2026
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                The Small Business Legal Wiki (ComplyWiki) • Wilmington, DE
              </p>
            </div>
          </div>

          {/* Quick Actions & Close */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={handleCopyCurrentPolicy}
              title="Copy current document text"
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-300 hover:text-slate-100 transition-colors flex items-center gap-1.5"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy Text</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              title="Print document"
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-300 hover:text-slate-100 transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden xs:inline">Print</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-500/20 hover:text-red-400 border border-slate-700 text-slate-400 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation & Search Bar */}
        <div className="bg-slate-950/60 border-b border-slate-800 px-4 sm:px-6 py-3 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Tabs */}
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('privacy')}
              className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'privacy'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Privacy Policy</span>
            </button>

            <button
              onClick={() => setActiveTab('terms')}
              className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'terms'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Terms of Use</span>
            </button>

            <button
              onClick={() => setActiveTab('cookies')}
              className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'cookies'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Cookie className="w-3.5 h-3.5" />
              <span>Cookies & CPRA</span>
            </button>
          </div>

          {/* Quick Search inside document */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search clauses (e.g. AdSense, GDPR, Delaware)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-64 pl-8 pr-3 py-1.5 text-xs rounded-lg bg-slate-900 border border-slate-700 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 text-xs"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Policy Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6 text-slate-300 text-sm leading-relaxed">
          {/* TAB 1: PRIVACY POLICY */}
          {activeTab === 'privacy' && (
            <div id="policy-text-container-privacy" className="space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-xl font-bold text-slate-100 font-display">
                    Privacy Policy
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Last Updated: January 1, 2026 • Version 3.4</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  This comprehensive Privacy Policy discloses how The Small Business Legal Wiki ("ComplyWiki", "we", "us", or "our") collects, protects, utilizes, and discloses information gathered through your use of our open legal education repository, automated document formatting tools, and associated web services.
                </p>
              </div>

              {/* Mandatory AdSense Disclosure Callout */}
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-100 text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-amber-300 uppercase tracking-wider text-[11px]">
                  <Shield className="w-4 h-4 text-amber-400" />
                  <span>Google AdSense & Third-Party Advertising Disclosures</span>
                </div>
                <p>
                  We partner with Google AdSense and certified third-party ad networks to display relevant commercial advertisements. Third-party vendors, including Google, use cookies (such as the DoubleClick DART cookie) to serve advertisements based on your prior visits to our website or other websites across the Internet. You may opt out of personalized advertising at any time by visiting{' '}
                  <a
                    href="https://adssettings.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-amber-300 hover:text-amber-200 inline-flex items-center gap-0.5"
                  >
                    Google Ads Settings <ExternalLink className="w-3 h-3" />
                  </a>{' '}
                  or by utilizing the{' '}
                  <a
                    href="https://optout.aboutads.info/"
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-amber-300 hover:text-amber-200 inline-flex items-center gap-0.5"
                  >
                    AboutAds.info Consumer Choice Portal <ExternalLink className="w-3 h-3" />
                  </a>.
                </p>
              </div>

              {/* Section 1 */}
              <section className="space-y-2">
                <h4 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <span className="text-amber-400 font-mono text-xs">01.</span>
                  <span>Categories of Information We Collect</span>
                </h4>
                <p>
                  In operating our legal reference wiki and document formatting generators, we collect information across three primary classifications:
                </p>
                <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs text-slate-300">
                  <li>
                    <strong className="text-slate-100">Voluntarily Disclosed Operational Data:</strong> Information you voluntarily enter into our document generators (such as company name, effective date, governing state, and contact details). <em>Critical Notice:</em> All document assembly is executed client-side inside your browser environment; we do not store, index, or sell user-authored draft agreements or NDA party names on our persistent server databases.
                  </li>
                  <li>
                    <strong className="text-slate-100">AI Concierge & Translator Queries:</strong> Prompts, clause redline excerpts, or compliance queries submitted to our automated assistant are transmitted via TLS 1.3 encrypted HTTPS requests to server-side Google Gemini models strictly to generate instantaneous educational responses. Queries are processed ephemerally and are never sold or utilized for cross-site behavioral targeting.
                  </li>
                  <li>
                    <strong className="text-slate-100">Automatically Gathered Technical & Diagnostic Data:</strong> Standard server logs, IP addresses, browser specifications, HTTP referrer headers, device screen resolutions, and navigation timestamps collected to maintain site availability and resist denial-of-service abuse.
                  </li>
                </ul>
              </section>

              {/* Section 2 */}
              <section className="space-y-2">
                <h4 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <span className="text-amber-400 font-mono text-xs">02.</span>
                  <span>Cookies, Web Beacons, and Tracking Technologies</span>
                </h4>
                <p>
                  Cookies are small alphanumeric files placed on your terminal equipment. We classify our cookie usage into three operational groups:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div className="p-3 rounded-lg bg-slate-800/70 border border-slate-700/60 text-xs">
                    <span className="font-semibold text-amber-400 block mb-1">Essential / Functional</span>
                    <p className="text-slate-400 text-[11px]">
                      Manages state preferences, dark mode styling, and legal acceptance records. Cannot be disabled without breaking site function.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-800/70 border border-slate-700/60 text-xs">
                    <span className="font-semibold text-amber-400 block mb-1">Google AdSense / DART</span>
                    <p className="text-slate-400 text-[11px]">
                      Enables Google and its advertising partners to serve contextually relevant and personalized advertisements based on browsing behavior.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-800/70 border border-slate-700/60 text-xs">
                    <span className="font-semibold text-amber-400 block mb-1">Telemetry & Core Web Vitals</span>
                    <p className="text-slate-400 text-[11px]">
                      Measures Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS) to maintain sub-1.5s page load benchmarks.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 3 */}
              <section className="space-y-2">
                <h4 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <span className="text-amber-400 font-mono text-xs">03.</span>
                  <span>California Consumer Privacy Act (CCPA / CPRA) Disclosures</span>
                </h4>
                <p className="text-xs text-slate-300">
                  Under the California Consumer Privacy Act of 2018 as amended by the California Privacy Rights Act of 2020 (Cal. Civ. Code § 1798.100 et seq.), California residents possess specific statutory rights regarding their personal information:
                </p>
                <div className="space-y-1.5 text-xs text-slate-300 pl-2">
                  <p>
                    <strong className="text-slate-100">Right to Know & Access:</strong> You have the right to request disclosure of the specific categories of personal information collected, the business purposes, and the third parties with whom it was shared during the preceding 12 months.
                  </p>
                  <p>
                    <strong className="text-slate-100">Right to Delete & Correct:</strong> You have the right to request deletion or correction of inaccurate personal information held by us, subject to statutory exceptions.
                  </p>
                  <p>
                    <strong className="text-slate-100">Right to Opt-Out of Sale or Sharing:</strong> We do not sell your personal information for monetary remuneration. However, the transmission of advertising identifiers to third-party ad networks may constitute "sharing" under California law. You may exercise your right to opt out at any time via the "Cookies & CPRA" tab in this modal.
                  </p>
                  <p>
                    <strong className="text-slate-100">Global Privacy Control (GPC):</strong> Our web platform honors Global Privacy Control (GPC) opt-out preference signals transmitted by your browser.
                  </p>
                  <p>
                    <strong className="text-slate-100">Non-Discrimination:</strong> We will never deny service, charge different prices, or provide degraded service levels for exercising your privacy rights.
                  </p>
                </div>
              </section>

              {/* Section 4 */}
              <section className="space-y-2">
                <h4 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <span className="text-amber-400 font-mono text-xs">04.</span>
                  <span>European Union (GDPR) & UK GDPR Compliance</span>
                </h4>
                <p className="text-xs text-slate-300">
                  For users situated within the European Economic Area (EEA) or the United Kingdom, Regulation (EU) 2016/679 governs personal data processing:
                </p>
                <ul className="list-disc list-inside space-y-1 text-xs text-slate-300 pl-2">
                  <li><strong>Lawful Bases:</strong> We process data under Article 6(1)(f) (Legitimate Interests in maintaining an educational legal repository) and Article 6(1)(a) (Consent for third-party advertising cookies).</li>
                  <li><strong>Data Subject Rights:</strong> You hold the rights of Access (Art. 15), Rectification (Art. 16), Erasure (Art. 17), Restriction (Art. 18), Data Portability (Art. 20), and Objection (Art. 21).</li>
                  <li><strong>Supervisory Authority:</strong> You possess the unconditional right to lodge a complaint with an EU Member State Data Protection Authority (DPA) or the UK Information Commissioner's Office (ICO).</li>
                </ul>
              </section>

              {/* Section 5 */}
              <section className="space-y-2">
                <h4 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <span className="text-amber-400 font-mono text-xs">05.</span>
                  <span>Data Security & Infrastructure Safeguards</span>
                </h4>
                <p className="text-xs text-slate-300">
                  We enforce enterprise-tier technical and organizational measures, including 256-bit TLS encryption in transit, strict Content Security Policies (CSP), role-based access restrictions, and ephemeral server processing. However, no internet transmission can be guaranteed 100% immune from malicious compromise.
                </p>
              </section>

              {/* Section 6 */}
              <section className="space-y-2">
                <h4 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <span className="text-amber-400 font-mono text-xs">06.</span>
                  <span>Children's Privacy Protection (COPPA)</span>
                </h4>
                <p className="text-xs text-slate-300">
                  Our service is strictly intended for adult entrepreneurs, commercial operators, and business managers aged 18 and older. We do not knowingly solicit, process, or retain personal data from children under 13 (or under 16 in specified jurisdictions).
                </p>
              </section>

              {/* Section 7: Contact Info */}
              <section className="p-4 rounded-xl bg-slate-850 border border-slate-800 space-y-2 text-xs">
                <span className="font-bold text-slate-100 block">Contacting the Data Protection Officer (DPO)</span>
                <p className="text-slate-400">
                  If you wish to submit a verifiable consumer request or have questions regarding this Privacy Policy:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-amber-400" />
                    <span>privacy@complywiki.com</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>(800) 555-9454</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>1209 Orange St, Wilmington, DE</span>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* TAB 2: TERMS OF USE */}
          {activeTab === 'terms' && (
            <div id="policy-text-container-terms" className="space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-xl font-bold text-slate-100 font-display">
                    Terms of Use Agreement
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Effective Date: January 1, 2026 • Version 4.1</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  PLEASE READ THESE TERMS OF USE CAREFULLY BEFORE ACCESSING OR USING THE SMALL BUSINESS LEGAL WIKI. BY BROWSING OUR PAGES, GENERATING CONTRACT TEMPLATES, AUDITING CLAUSES, OR SUBMITTING INQUIRIES, YOU EXPRESSLY AGREE TO BE BOUND BY THESE LEGALLY BINDING TERMS.
                </p>
              </div>

              {/* CRITICAL STATUTORY ATTORNEY-CLIENT DISCLAIMER */}
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-200 text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-red-300 uppercase tracking-wider text-[11px]">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <span>Statutory Disclaimer — No Attorney-Client Relationship</span>
                </div>
                <p className="leading-relaxed">
                  The Small Business Legal Wiki (ComplyWiki) is an automated educational compliance repository and document formatting platform. <strong>WE ARE NOT A LAW FIRM, ARE NOT ATTORNEYS, AND DO NOT PROVIDE FORMAL LEGAL, TAX, REGULATORY, OR INVESTMENT ADVICE.</strong> No transmission of information, contract drafting, or AI-generated response creates an attorney-client relationship, fiduciary duty, or privileged communication between you and ComplyWiki. Because state and federal laws evolve rapidly and local municipal rules vary, you should always retain licensed legal counsel in your specific jurisdiction before executing binding commercial contracts.
                </p>
              </div>

              {/* Section 1 */}
              <section className="space-y-2">
                <h4 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <span className="text-amber-400 font-mono text-xs">01.</span>
                  <span>Grant of Limited License & Acceptable Use</span>
                </h4>
                <p className="text-xs text-slate-300">
                  Subject to your strict compliance with these Terms, ComplyWiki grants you a revocable, non-exclusive, non-transferable, limited personal and commercial license to view our educational content, format legal instruments (including NDAs, Independent Contractor Agreements, and Privacy Policies), and download customized templates for your legitimate small business operations.
                </p>
                <p className="text-xs text-slate-300">
                  <strong className="text-slate-100">Prohibited Conduct:</strong> You agree that you shall NOT:
                </p>
                <ul className="list-disc list-inside space-y-1 text-xs text-slate-400 pl-2">
                  <li>Deploy automated scrapers, bots, crawlers, or extraction algorithms to harvest the wiki database for resale or competing directory construction.</li>
                  <li>Frame, mirror, or repackage ComplyWiki tools behind commercial subscription paywalls.</li>
                  <li>Circumvent, tamper with, or interfere with security controls, rate limiters, or server operations.</li>
                  <li>Submit unlawful, fraudulent, defamatory, or infringing materials through our AI concierge or generator forms.</li>
                </ul>
              </section>

              {/* Section 2 */}
              <section className="space-y-2">
                <h4 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <span className="text-amber-400 font-mono text-xs">02.</span>
                  <span>Intellectual Property Rights</span>
                </h4>
                <p className="text-xs text-slate-300">
                  All software source code, site architecture, visual design elements, interactive calculators, proprietary clause translations, and trademarked branding are the exclusive intellectual property of ComplyWiki protected under United States and international copyright, trademark, and trade dress laws. Public domain statutory citations, federal register codes, and standard common-law legal doctrines referenced herein remain in the public domain.
                </p>
              </section>

              {/* Section 3 */}
              <section className="space-y-2">
                <h4 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <span className="text-amber-400 font-mono text-xs">03.</span>
                  <span>Disclaimer of Warranties ("AS-IS")</span>
                </h4>
                <p className="text-xs text-slate-300">
                  TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, COMPLYWIKI AND ALL CONTENT, CONTRACT TEMPLATES, LOCAL LICENSING DIRECTORIES, AND AUTOMATED TOOLS ARE PROVIDED STRICTLY ON AN <strong>"AS-IS"</strong> AND <strong>"AS-AVAILABLE"</strong> BASIS. WE DISCLAIM ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING WITHOUT LIMITATION WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, JURISDICTIONAL ENFORCEABILITY, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT CONTRACT TEMPLATES WILL MEET YOUR PARTICULAR TRANSACTIONAL GOALS OR GUARANTEE STATUTORY PROTECTION AGAINST CIVIL LITIGATION.
                </p>
              </section>

              {/* Section 4 */}
              <section className="space-y-2">
                <h4 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <span className="text-amber-400 font-mono text-xs">04.</span>
                  <span>Strict Limitation of Liability</span>
                </h4>
                <p className="text-xs text-slate-300">
                  UNDER NO CIRCUMSTANCES SHALL COMPLYWIKI, ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, PUNITIVE, OR EXEMPLARY DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF BUSINESS PROFITS, CONTRACTUAL BREACHES, REGULATORY FINES, OR LITIGATION COSTS ARISING FROM YOUR USE OF OR RELIANCE UPON OUR SITE CONTENT OR CONTRACT TEMPLATES. IN NO EVENT SHALL OUR TOTAL AGGREGATE LIABILITY EXCEED THE GREATER OF ONE HUNDRED UNITED STATES DOLLARS ($100.00 USD) OR THE ACTUAL FEES PAID BY YOU TO COMPLYWIKI OVER THE PRECEDING TWELVE (12) MONTHS.
                </p>
              </section>

              {/* Section 5 */}
              <section className="space-y-2">
                <h4 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <span className="text-amber-400 font-mono text-xs">05.</span>
                  <span>Mandatory Binding Individual Arbitration & Class Action Waiver</span>
                </h4>
                <p className="text-xs text-slate-300">
                  Any dispute, controversy, or claim arising out of or relating to these Terms, the breach thereof, or the use of ComplyWiki services shall be settled by binding arbitration administered by the American Arbitration Association (AAA) in accordance with its Commercial Arbitration Rules.
                </p>
                <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700 text-xs text-amber-200">
                  <strong>CLASS ACTION WAIVER:</strong> YOU AND COMPLYWIKI AGREE THAT EACH PARTY MAY BRING CLAIMS AGAINST THE OTHER ONLY IN AN INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS, COLLECTIVE, CONSOLIDATED, OR REPRESENTATIVE PROCEEDING.
                </div>
              </section>

              {/* Section 6 */}
              <section className="space-y-2">
                <h4 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <span className="text-amber-400 font-mono text-xs">06.</span>
                  <span>Governing Law & Severability</span>
                </h4>
                <p className="text-xs text-slate-300">
                  These Terms and any related disputes shall be governed by and construed in accordance with the laws of the State of Delaware, United States, without giving effect to any principles of conflicts of law. If any provision of these Terms is deemed unlawful, void, or unenforceable by an arbitrator or court of competent jurisdiction, that provision shall be deemed severable and shall not affect the validity and enforceability of any remaining provisions.
                </p>
              </section>

              {/* Section 7 */}
              <section className="space-y-2">
                <h4 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <span className="text-amber-400 font-mono text-xs">07.</span>
                  <span>Third-Party Links & Advertising Sponsors</span>
                </h4>
                <p className="text-xs text-slate-300">
                  Our web application displays commercial advertisements served via Google AdSense and contains external links to official government agencies (such as FinCEN, the SBA, IRS, and state Secretaries of State). We do not control, endorse, investigate, or assume responsibility for the offerings, accuracy, or privacy practices of third-party advertisers or external websites.
                </p>
              </section>
            </div>
          )}

          {/* TAB 3: COOKIES & CPRA PREFERENCES */}
          {activeTab === 'cookies' && (
            <div id="policy-text-container-cookies" className="space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-xl font-bold text-slate-100 font-display">
                    Cookie Policy & Do Not Sell / Share Preferences
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>CPRA & GDPR Opt-Out Center</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Configure your advertising preferences, review our cookie taxonomy, or affirmatively exercise your statutory right under the California Consumer Privacy Act (CPRA) to opt out of the "sale" or "sharing" of personal data for cross-context behavioral advertising.
                </p>
              </div>

              {/* Interactive CPRA Do Not Sell Toggle Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-850 border border-amber-500/40 shadow-lg space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-amber-400" />
                      <h4 className="font-bold text-slate-100 text-sm">
                        Do Not Sell or Share My Personal Information (CPRA Opt-Out)
                      </h4>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
                      Under the California Privacy Rights Act (CPRA), using third-party advertising cookies that facilitate personalized ads is classified as "sharing" personal data. Toggling this setting to <strong>ACTIVE</strong> notifies our platform to suppress personalized advertising cookies on this device.
                    </p>
                  </div>

                  {/* Toggle Button */}
                  <button
                    onClick={handleToggleDoNotSell}
                    className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-slate-900 ${
                      doNotSellOptOut ? 'bg-amber-500' : 'bg-slate-700'
                    }`}
                    role="switch"
                    aria-checked={doNotSellOptOut}
                  >
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-slate-950 shadow-lg ring-0 transition duration-200 ease-in-out ${
                        doNotSellOptOut ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="text-slate-400 font-mono">
                    Status:{' '}
                    <strong className={doNotSellOptOut ? 'text-emerald-400' : 'text-slate-300'}>
                      {doNotSellOptOut ? 'OPTED OUT (Personalized Sharing Blocked)' : 'STANDARD (Personalized Ads Allowed)'}
                    </strong>
                  </span>
                  {optOutSaved && (
                    <span className="text-emerald-400 flex items-center gap-1 font-medium animate-fadeIn">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Preference persisted in LocalStorage
                    </span>
                  )}
                </div>
              </div>

              {/* Cookie Inventory Breakdown */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-100 uppercase tracking-wider text-xs">
                  Detailed Cookie Audit & Expiration Schedule
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
                    <thead className="bg-slate-850 text-slate-300 uppercase tracking-wider text-[10px] font-mono border-b border-slate-800">
                      <tr>
                        <th className="p-3">Cookie Name</th>
                        <th className="p-3">Provider</th>
                        <th className="p-3">Purpose</th>
                        <th className="p-3">Retention</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80 text-slate-300">
                      <tr className="hover:bg-slate-850/50">
                        <td className="p-3 font-mono text-amber-300">__gads / __gpi</td>
                        <td className="p-3">Google AdSense</td>
                        <td className="p-3">Registers ad frequency, impressions, and prevents click-fraud</td>
                        <td className="p-3 text-slate-400">13 Months</td>
                      </tr>
                      <tr className="hover:bg-slate-850/50">
                        <td className="p-3 font-mono text-amber-300">IDE / test_cookie</td>
                        <td className="p-3">doubleclick.net</td>
                        <td className="p-3">Evaluates user browser cookie capabilities and target relevance</td>
                        <td className="p-3 text-slate-400">1 Year</td>
                      </tr>
                      <tr className="hover:bg-slate-850/50">
                        <td className="p-3 font-mono text-amber-300">complywiki_cpra_optout</td>
                        <td className="p-3">ComplyWiki (Local)</td>
                        <td className="p-3">Stores your affirmative Do Not Sell / Share preference</td>
                        <td className="p-3 text-slate-400">Persistent</td>
                      </tr>
                      <tr className="hover:bg-slate-850/50">
                        <td className="p-3 font-mono text-amber-300">complywiki_state_pref</td>
                        <td className="p-3">ComplyWiki (Local)</td>
                        <td className="p-3">Preserves your chosen governing state for quick document drafting</td>
                        <td className="p-3 text-slate-400">Session / Local</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* External Opt-Out Portals */}
              <div className="p-4 rounded-xl bg-slate-850 border border-slate-800 space-y-2 text-xs">
                <span className="font-bold text-slate-100 block">External Industry Opt-Out Registries</span>
                <p className="text-slate-400">
                  You can enact broad, industry-wide behavioral advertising opt-outs across hundreds of advertising networks through these recognized consumer protection portals:
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <a
                    href="https://optout.aboutads.info/"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-amber-300 hover:text-amber-200 transition-colors flex items-center gap-1.5"
                  >
                    <span>Digital Advertising Alliance (DAA)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://optout.networkadvertising.org/"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-amber-300 hover:text-amber-200 transition-colors flex items-center gap-1.5"
                  >
                    <span>Network Advertising Initiative (NAI)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.youronlinechoices.eu/"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-amber-300 hover:text-amber-200 transition-colors flex items-center gap-1.5"
                  >
                    <span>EDAA Consumer Choices (EU)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-900/90 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Official Legal Record • Document Hash: #CW-2026-9482</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all shadow-md shadow-amber-500/10 active:scale-95"
            >
              I Understand & Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
