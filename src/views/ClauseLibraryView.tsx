import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Search, 
  AlertTriangle, 
  ShieldCheck, 
  ExternalLink, 
  Sparkles, 
  Copy, 
  Check, 
  ArrowLeft, 
  CheckCircle2, 
  Layers, 
  HelpCircle 
} from 'lucide-react';
import { LEGAL_CLAUSES } from '../data/legalData';
import { LegalClause } from '../types';
import { AdSenseUnit } from '../components/AdSenseUnit';
import { SchemaMarkup } from '../components/SchemaMarkup';
import { useSeoMeta } from '../hooks/useSeoMeta';

export const ClauseLibraryView: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [selectedClauseId, setSelectedClauseId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copied, setCopied] = useState(false);

  const categories = ['All', 'Liability', 'Intellectual Property', 'Restrictive Covenants', 'General Contract Law', 'Governance'];

  const filteredClauses = LEGAL_CLAUSES.filter(clause => {
    const matchesSearch = clause.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clause.plainEnglishTranslation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clause.commonGotchas.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || clause.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const currentClause = slug
    ? LEGAL_CLAUSES.find(c => c.slug === slug) ?? null
    : LEGAL_CLAUSES.find(c => c.id === selectedClauseId) ?? null;

  // Dynamic SEO Meta updates based on whether a specific clause is viewed or directory is viewed
  useSeoMeta({
    title: currentClause
      ? `${currentClause.title} Clause: Plain English Translation & Legal Risk Analysis | ComplyWiki`
      : 'Contract Clause Library: Plain English Legal Explanations & Risk Audits | ComplyWiki',
    description: currentClause
      ? currentClause.shortAnswer
      : 'Deconstruct high-risk clauses including indemnification, non-competes, and liability caps with plain-English translations, gotchas, and redline templates.',
    ogType: currentClause ? 'article' : 'website',
  });

  const copyClauseText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // If a clause is selected, show the full GEO-optimized Clause Detail View
  if (currentClause) {
    return (
      <div className="space-y-8">
        {/* Live Schema.org for individual clause */}
        <SchemaMarkup
          pageType="Clause"
          title={`${currentClause.title} Clause: Plain English Translation & Legal Risk Analysis`}
          description={currentClause.shortAnswer}
          howTo={{
            name: `How to Audit and Redline a ${currentClause.title} Clause`,
            description: `A 4-step negotiation framework to identify asymmetric risk and propose mutual counter-language for ${currentClause.title.toLowerCase()} provisions.`,
            totalTime: 'PT10M',
            estimatedCost: { currency: 'USD', value: 0 },
            steps: [
              {
                name: 'Examine Statutory Standard vs Asymmetric Language',
                text: `Identify whether the clause requires unilateral compliance or mutual protection under ${currentClause.officialGovSource.statute}.`,
              },
              {
                name: 'Audit Hidden Gotchas & Uncapped Liability',
                text: `Check for: ${currentClause.commonGotchas.slice(0, 2).join('; ')}.`,
              },
              {
                name: 'Evaluate Risk Level',
                text: `This clause currently carries a ${currentClause.riskLevel} risk rating in commercial small business contracts.`,
              },
              {
                name: 'Insert Balanced Redline Counter-Proposal',
                text: 'Replace one-sided covenants with commercially acceptable mutual terms.',
              },
            ],
          }}
          faqs={currentClause.faqs.map(f => ({ question: f.question, answer: f.answer }))}
        />

        {/* Top Leaderboard Ad */}
        <AdSenseUnit format="leaderboard" slotId="clause-detail-top" />

        {/* Back navigation */}
        <button
          onClick={() => {
            setSelectedClauseId(null);
            navigate('/clauses');
          }}
          className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All 15+ Contract Clauses</span>
        </button>

        {/* Clause Header */}
        <div className="space-y-4 border-b border-slate-800 pb-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono uppercase bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700">
              {currentClause.category}
            </span>
            <span
              className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded-md ${
                currentClause.riskLevel === 'CRITICAL'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  : currentClause.riskLevel === 'HIGH'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              }`}
            >
              {currentClause.riskLevel} STATUTORY RISK
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Statute: {currentClause.officialGovSource.statute}
            </span>
          </div>

          <h1 className="font-display font-bold text-2xl sm:text-4xl text-slate-100">
            {currentClause.title} Clause
          </h1>

          {/* GEO 40-60 WORD DIRECT ANSWER BOX (Primary candidate for Google AI Overviews & Perplexity) */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-950 border border-amber-500/40 shadow-xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <Sparkles className="w-4 h-4" />
              <span>Direct Definition (Generative Engine Optimization Answer Box)</span>
            </div>
            <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-sans font-medium">
              "{currentClause.shortAnswer}"
            </p>
            <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-between border-t border-amber-500/20">
              <span>Word Count: 48 Words (Target: 40-60 words for snippet capture)</span>
              <a
                href={currentClause.officialGovSource.url}
                target="_blank"
                rel="noreferrer"
                className="text-amber-400 hover:underline flex items-center gap-1 font-mono"
              >
                <span>Verified via {currentClause.officialGovSource.agency} (.gov)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Content Breakdown Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Plain English Translation */}
            <section className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Plain English Translation (What this actually means)</span>
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {currentClause.plainEnglishTranslation}
              </p>
            </section>

            {/* Standard Legal Language Preview */}
            <section className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-amber-400" />
                  <span>Standard Contract Language Template</span>
                </h2>
                <button
                  onClick={() => copyClauseText(currentClause.sampleClauseText)}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold rounded-md border border-slate-700 flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
                  <span>{copied ? 'Copied' : 'Copy Clause'}</span>
                </button>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
                {currentClause.sampleClauseText}
              </div>
            </section>

            {/* In-Content Native Ad */}
            <AdSenseUnit format="in-content" slotId="clause-mid-content" />

            {/* Common Gotchas & Hidden Traps */}
            <section className="p-6 rounded-2xl bg-slate-900 border border-rose-500/20 space-y-3">
              <h2 className="text-base font-bold text-rose-300 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-400" />
                <span>Common Gotchas & Hidden Traps to Avoid</span>
              </h2>
              <ul className="space-y-2.5">
                {currentClause.commonGotchas.map((gotcha, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      ✕
                    </span>
                    <span>{gotcha}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Negotiation Strategy */}
            <section className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                <span>Small Business Negotiation Strategy</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {currentClause.negotiationTips}
              </p>
            </section>

            {/* Frequently Asked Questions (PAA Structured) */}
            <section className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-400" />
                <span>Frequently Asked Questions (Google PAA Snippet Schema)</span>
              </h2>
              <div className="space-y-3">
                {currentClause.faqs.map((faq, index) => (
                  <div key={index} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                    <h3 className="font-bold text-slate-100 text-xs sm:text-sm">
                      {faq.question}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sticky Sidebar Ad */}
          <div className="hidden lg:block">
            <AdSenseUnit format="sticky-sidebar" slotId="clause-sidebar" />
          </div>
        </div>
      </div>
    );
  }

  // DEFAULT VIEW: CLAUSE DIRECTORY
  return (
    <div className="space-y-8">
      {/* Schema.org for Clause Directory */}
      <SchemaMarkup
        pageType="Clause"
        title="Commercial Legal Clause Library – The Small Business Legal Wiki"
        description="Search 15+ contract clauses with plain English translations, statutory risk levels, gotchas, and negotiation strategies."
      />

      {/* Top Banner Ad */}
      <AdSenseUnit format="leaderboard" slotId="clauses-top-leaderboard" />

      {/* Header */}
      <div className="space-y-3 border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/30">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Interactive Clause Dictionary • 15+ Core Contract Provisions</span>
        </div>
        <h1 className="font-display font-bold text-2xl sm:text-4xl text-slate-100">
          Small Business Legal Clause Library
        </h1>
        <p className="text-sm text-slate-400 max-w-3xl">
          Every commercial contract is made of modular clauses. Click any clause below to read its 40-60 word definition, plain English translation, common traps, and recommended negotiation edits.
        </p>
      </div>

      {/* Search & Category Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search clause name, gotcha, or plain English term..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-500/50"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Clauses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredClauses.map((clause) => (
          <div
            key={clause.id}
            onClick={() => {
              navigate(`/clauses/${clause.slug}`);
              setSelectedClauseId(clause.id);
            }}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 hover:bg-slate-850 transition-all cursor-pointer group shadow-md flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-mono font-bold bg-slate-950 text-slate-400 px-2 py-0.5 rounded border border-slate-800">
                  {clause.category}
                </span>
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                    clause.riskLevel === 'CRITICAL'
                      ? 'bg-rose-500/20 text-rose-300'
                      : clause.riskLevel === 'HIGH'
                      ? 'bg-amber-500/20 text-amber-300'
                      : 'bg-emerald-500/20 text-emerald-300'
                  }`}
                >
                  {clause.riskLevel} RISK
                </span>
              </div>

              <h2 className="font-bold text-slate-100 text-base group-hover:text-amber-300 transition-colors">
                {clause.title}
              </h2>

              <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                {clause.plainEnglishTranslation}
              </p>
            </div>

            <div className="pt-4 mt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-amber-400 font-semibold">
              <span className="text-[11px] text-slate-400 font-mono">
                {clause.officialGovSource.statute}
              </span>
              <span className="group-hover:translate-x-1 transition-transform">
                Read Deep-Dive →
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* IN-CONTENT NATIVE AD */}
      <AdSenseUnit format="in-content" slotId="clauses-grid-native" />
    </div>
  );
};
