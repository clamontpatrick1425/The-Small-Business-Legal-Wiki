import React, { useState } from 'react';
import { 
  Scale, 
  Search, 
  FileText, 
  BookOpen, 
  CheckSquare, 
  Languages, 
  MapPin, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  AlertCircle, 
  ExternalLink, 
  Building2, 
  FileCheck2, 
  Flame, 
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { ViewType, LegalStateInfo } from '../types';
import { ALL_STATES, LEGAL_CLAUSES, DOCUMENT_TEMPLATES, RECENT_LEGAL_ALERTS } from '../data/legalData';
import { AdSenseUnit } from '../components/AdSenseUnit';
import { SchemaMarkup } from '../components/SchemaMarkup';

interface HomeViewProps {
  onNavigate: (view: ViewType) => void;
  onSelectClause: (clauseId: string) => void;
  onSelectState: (state: LegalStateInfo) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onSelectClause,
  onSelectState,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStateCode, setSelectedStateCode] = useState('CA');

  const currentState = ALL_STATES.find(s => s.code === selectedStateCode) || ALL_STATES[0];

  const filteredClauses = LEGAL_CLAUSES.filter(c =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.plainEnglishTranslation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-12">
      {/* Dynamic Schema.org injection */}
      <SchemaMarkup
        pageType="Home"
        title="The Small Business Legal Wiki – Free Compliance & Legal Resource Hub"
        description="Comprehensive free legal document generators, state compliance guides, plain English clause library, and AI legal concierge."
        faqs={[
          {
            question: "Is The Small Business Legal Wiki really 100% free?",
            answer: "Yes. All legal templates, clause breakdowns, compliance quizzes, and state guides are 100% free with zero paywalls. Our open platform is monetized exclusively through certified Google AdSense publisher advertisements."
          },
          {
            question: "Do I need a lawyer if I use these free compliance templates?",
            answer: "Our templates are prepared based on standard commercial statutory standards, but every business is unique. We provide educational templates and recommend having a state-licensed attorney review complex agreements."
          },
          {
            question: "What is the Corporate Transparency Act (BOI) requirement in 2026?",
            answer: "All non-exempt domestic corporations and LLCs must report their Beneficial Owners (25%+ equity or substantial control) to FinCEN. Newly registered entities have 30 calendar days to file at FinCEN.gov/boi."
          }
        ]}
      />

      {/* TOP LEADERBOARD AD (728x90 Desktop / 320x50 Mobile) */}
      <AdSenseUnit format="leaderboard" slotId="home-top-leaderboard" />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-6 sm:p-10 lg:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Ultimate Free Small Business Compliance Resource Hub</span>
          </div>

          <h1 className="font-display font-bold text-3xl sm:text-5xl text-slate-100 tracking-tight leading-tight">
            Demystifying Legal Compliance for <span className="text-amber-400 underline decoration-amber-500/30">Every Small Business</span>.
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Zero paywalls. Zero subscriptions. Access free, state-specific legal document generators, plain English clause breakdowns, local city permit guides, and an AI compliance concierge.
          </p>

          {/* Search bar */}
          <div className="relative max-w-xl pt-2">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 15+ clauses, 50 states, NDAs, privacy policies, or local city permits..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-950/90 border border-slate-700/80 focus:border-amber-500/60 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none shadow-lg transition-all"
            />
          </div>

          {/* Value props badges */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300 pt-3">
            <span className="flex items-center gap-1.5 bg-slate-950/60 px-2.5 py-1 rounded-md border border-slate-800">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>50 US States Programmatic pSEO</span>
            </span>
            <span className="flex items-center gap-1.5 bg-slate-950/60 px-2.5 py-1 rounded-md border border-slate-800">
              <CheckSquare className="w-4 h-4 text-amber-400" />
              <span>FTC & CCPA 2026 Compliant</span>
            </span>
            <span className="flex items-center gap-1.5 bg-slate-950/60 px-2.5 py-1 rounded-md border border-slate-800">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              <span>100% Free Public Resource</span>
            </span>
          </div>
        </div>
      </section>

      {/* CORE UTILITIES GRID (4 Cards) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-slate-100">
              Free Commercial Compliance Utilities
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Instant legal generation, translation, and statutory risk audits with zero paywall friction.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Tool 1 */}
          <div 
            onClick={() => onNavigate('generator')}
            className="group p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 hover:bg-slate-850 transition-all cursor-pointer shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-100 text-base group-hover:text-amber-300 transition-colors">
                Instant Document Generator
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Generate state-compliant NDAs, Independent Contractor agreements, and CCPA Privacy Policies in under 3 minutes.
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform">
              <span>Launch Builder</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          {/* Tool 2 */}
          <div 
            onClick={() => onNavigate('clauses')}
            className="group p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 hover:bg-slate-850 transition-all cursor-pointer shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-100 text-base group-hover:text-cyan-300 transition-colors">
                Clause Library & Explanations
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Explore 15+ contract clauses with plain English translations, risk levels, and 40-60 word GEO direct answers.
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform">
              <span>Browse Clauses</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          {/* Tool 3 */}
          <div 
            onClick={() => onNavigate('checklists')}
            className="group p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 hover:bg-slate-850 transition-all cursor-pointer shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <CheckSquare className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-100 text-base group-hover:text-emerald-300 transition-colors">
                Compliance Audit Quiz
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Take an interactive 8-question audit to test your website for GDPR, CCPA, BOI, and corporate veil risks.
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform">
              <span>Start Free Audit</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          {/* Tool 4 */}
          <div 
            onClick={() => onNavigate('translator')}
            className="group p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-purple-500/40 hover:bg-slate-850 transition-all cursor-pointer shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Languages className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-100 text-base group-hover:text-purple-300 transition-colors">
                Legalese Translator
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Paste dense legal text or contract paragraphs to get instant plain English explanations and hidden traps.
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-semibold text-purple-400 group-hover:translate-x-1 transition-transform">
              <span>Translate Contract</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>
        </div>
      </section>

      {/* IN-CONTENT NATIVE AD */}
      <AdSenseUnit format="in-content" slotId="home-mid-native-ad" />

      {/* STATE COMPLIANCE MATRIX (pSEO Spoke Hub) */}
      <section className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-400">
              Programmatic State-by-State Regulatory Hubs
            </div>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-slate-100 mt-0.5">
              50 States Compliance & Corporate Law Matrix
            </h2>
          </div>

          {/* State selector pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {ALL_STATES.map((st) => (
              <button
                key={st.code}
                onClick={() => setSelectedStateCode(st.code)}
                className={`px-3 py-1 text-xs font-bold font-mono rounded-lg transition-all ${
                  selectedStateCode === st.code
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-100 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {st.code}
              </button>
            ))}
          </div>
        </div>

        {/* Selected State Details Card */}
        <div className="p-5 rounded-xl bg-slate-950 border border-amber-500/20 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-slate-100 text-lg">
                {currentState.name} ({currentState.code})
              </h3>
            </div>
            <p className="text-xs text-slate-400">
              Filing Agency: <strong className="text-slate-200">{currentState.filingAgency}</strong>
            </p>
            <div className="pt-2">
              <a
                href={currentState.officialGovUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-amber-400 hover:underline inline-flex items-center gap-1 font-semibold"
              >
                <span>Official {currentState.code} SOS Portal (.gov)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div>
              <span className="text-slate-400 block">Annual Mandatory Fee / Tax:</span>
              <span className="font-semibold text-slate-200">{currentState.annualFee}</span>
            </div>
            <div>
              <span className="text-slate-400 block">State Privacy Act Standard:</span>
              <span className="font-semibold text-amber-300">{currentState.privacyLaw} ({currentState.privacyStatus})</span>
            </div>
            <div>
              <span className="text-slate-400 block">Publication Mandate:</span>
              <span className={`font-semibold ${currentState.publicationRequirement ? 'text-rose-400' : 'text-emerald-400'}`}>
                {currentState.publicationRequirement ? 'Mandatory (Section 206 Notice)' : 'None Required'}
              </span>
            </div>
          </div>

          <div className="space-y-2 text-xs bg-slate-900/60 p-3.5 rounded-lg border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px] block mb-1">
                Notable State Statute / Red Flag
              </span>
              <p className="text-slate-300 leading-relaxed font-mono text-[11px]">
                {currentState.notableStatute}
              </p>
            </div>
            <button
              onClick={() => onNavigate('generator')}
              className="mt-2 w-full py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded text-xs transition-colors"
            >
              Generate {currentState.name} LLC Agreement →
            </button>
          </div>
        </div>
      </section>

      {/* CLAUSE DIRECTORY PREVIEW */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-slate-100">
              Popular Legal Clauses Explained
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Each clause has an authoritative 40-60 word GEO definition box and plain English translation.
            </p>
          </div>
          <button
            onClick={() => onNavigate('clauses')}
            className="text-xs font-semibold text-amber-400 hover:underline flex items-center gap-1"
          >
            <span>View All 15+ Clauses</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredClauses.slice(0, 6).map((clause) => (
            <div
              key={clause.id}
              onClick={() => onSelectClause(clause.id)}
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition-all cursor-pointer group shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    {clause.category}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      clause.riskLevel === 'CRITICAL'
                        ? 'bg-rose-500/20 text-rose-300'
                        : clause.riskLevel === 'HIGH'
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-blue-500/20 text-blue-300'
                    }`}
                  >
                    {clause.riskLevel} RISK
                  </span>
                </div>
                <h3 className="font-bold text-slate-100 text-sm group-hover:text-amber-300 transition-colors">
                  {clause.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {clause.plainEnglishTranslation}
                </p>
              </div>

              <div className="pt-3 mt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-amber-400 font-semibold">
                <span className="text-[11px] text-slate-400 font-mono">
                  {clause.officialGovSource.agency}
                </span>
                <span className="group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  <span>Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RECENT REGULATORY ALERTS (.gov Feed) */}
      <section className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-400" />
            <h3 className="font-display font-bold text-lg text-slate-100">
              Live Regulatory Compliance Alerts (.gov Monitor)
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">Updated Weekly</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {RECENT_LEGAL_ALERTS.map((alert) => (
            <div key={alert.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="font-semibold text-amber-400">{alert.agency}</span>
                <span>{alert.date}</span>
              </div>
              <h4 className="font-bold text-slate-100 text-xs sm:text-sm">{alert.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{alert.summary}</p>
              <div className="pt-2">
                <a
                  href={alert.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-amber-400 hover:underline flex items-center gap-1"
                >
                  <span>Official Agency Guidance</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
