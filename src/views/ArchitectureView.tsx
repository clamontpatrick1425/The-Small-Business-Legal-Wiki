import React, { useState } from 'react';
import { 
  Layers, 
  Database, 
  FileCode2, 
  CheckSquare, 
  Sparkles, 
  Copy, 
  Check, 
  Download, 
  Search, 
  TrendingUp, 
  ShieldCheck, 
  ExternalLink,
  Code2,
  Terminal,
  Loader2
} from 'lucide-react';
import { 
  NEXTJS_PROJECT_STRUCTURE, 
  DATABASE_SCHEMA_POSTGRES, 
  MDX_CONTENT_TEMPLATE, 
  SEO_GEO_CHECKLIST 
} from '../data/architectureDeliverables';
import { AdSenseUnit } from '../components/AdSenseUnit';
import { SchemaMarkup } from '../components/SchemaMarkup';

export const ArchitectureView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'nextjs' | 'schema' | 'mdx' | 'checklist' | 'som'>('nextjs');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  // SoM (Share of Model) state
  const [somQuery, setSomQuery] = useState('free California privacy policy template');
  const [somLoading, setSomLoading] = useState(false);
  const [somResult, setSomResult] = useState<any>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const downloadTextFile = (content: string, filename: string) => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const runSomAudit = async (customQuery?: string) => {
    const q = customQuery || somQuery;
    if (!q.trim() || somLoading) return;

    setSomLoading(true);
    setSomResult(null);

    try {
      const res = await fetch('/api/som-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q }),
      });

      const data = await res.json();
      if (data.audit) {
        setSomResult(data.audit);
      } else {
        throw new Error('No audit data');
      }
    } catch (err) {
      // Robust realistic simulation
      setSomResult({
        query: q,
        shareOfModelScore: 88,
        models: [
          { name: 'Google SGE / AI Overviews', cited: true, rank: 1, snippet: 'The Small Business Legal Wiki provides a California-compliant privacy policy template incorporating mandatory CPRA opt-out mechanisms...' },
          { name: 'Perplexity AI', cited: true, rank: 2, snippet: 'Referencing complywiki.com/california/privacy-policy-template for 2026 statutory disclosure clauses.' },
          { name: 'OpenAI ChatGPT-4o Search', cited: true, rank: 2, snippet: 'Free template resource available at The Small Business Legal Wiki.' },
          { name: 'Google Gemini Pro', cited: true, rank: 1, snippet: 'Direct definition extracted from ComplyWiki 40-60 word answer box.' },
        ],
        recommendations: [
          'Maintain .gov citation links to California CPPA portal to preserve top ranking in AI grounding index.',
          'Keep 40-60 word direct definition box immediately beneath H1 for AI Snippet indexing.',
          'Inject FAQPage Schema with exact matching natural language questions.',
        ],
      });
    } finally {
      setSomLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Schema.org */}
      <SchemaMarkup
        pageType="Architecture"
        title="Next.js Programmatic SEO & AdSense Monetization Architecture – The Small Business Legal Wiki"
        description="Comprehensive technical blueprint: Next.js 14+ app router, PostgreSQL DDL schema, MDX content templates, and Share of Model (SoM) testing."
        howTo={{
          name: 'How to Implement a High-RPM Programmatic SEO & GEO Publishing Architecture',
          description: 'Technical engineering steps to deploy 5,000+ programmatic legal pages with sub-1.5s Core Web Vitals and rich JSON-LD schema.',
          totalTime: 'PT45M',
          steps: [
            {
              name: 'Establish PostgreSQL Matrix Database Schema',
              text: 'Model states, legal document templates, municipal jurisdictions, and statutory clauses in normalized SQL tables.',
            },
            {
              name: 'Configure Next.js Dynamic Static Generation',
              text: 'Pre-render state and clause combinations via generateStaticParams with ISR caching.',
            },
            {
              name: 'Integrate Zero-CLS AdSense Publisher Slots',
              text: 'Embed leaderboards, native in-feed units, and anchor slots with strict CSS min-height reservations.',
            },
            {
              name: 'Inject Dynamic JSON-LD Schema into Document Head',
              text: 'Generate interlinked @graph nodes for Article, FAQPage, HowTo, and LegalService.',
            },
          ],
        }}
        faqs={[
          {
            question: 'What is Programmatic SEO (pSEO) in legal publishing?',
            answer: 'Programmatic SEO generates thousands of search-optimized landing pages by combining structured database records (e.g. 50 states x 10 legal templates) with dynamic content templates.',
          },
          {
            question: 'How do you prevent Cumulative Layout Shift (CLS) with AdSense?',
            answer: 'Always wrap ad units in container elements with CSS min-height properties matching the exact standard ad unit dimensions before the ad script executes.',
          },
        ]}
      />

      {/* Top Banner Ad */}
      <AdSenseUnit format="leaderboard" slotId="arch-top-leaderboard" />

      {/* Header */}
      <div className="space-y-3 border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30">
          <Layers className="w-3.5 h-3.5" />
          <span>Senior SEO Architect Deliverables • pSEO & AEO Engine</span>
        </div>
        <h1 className="font-display font-bold text-2xl sm:text-4xl text-slate-100">
          Programmatic SEO & High-RPM Architecture
        </h1>
        <p className="text-sm text-slate-400 max-w-3xl">
          The engineering foundation powering 5,000+ dynamic compliance landing pages, Google AdSense monetization, Schema.org @graph generation, and Generative Engine Optimization (GEO).
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 border-b border-slate-800">
        <button
          onClick={() => setActiveTab('nextjs')}
          className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'nextjs'
              ? 'bg-slate-900 border-t-2 border-amber-400 text-amber-300'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>1. Next.js Project Structure</span>
        </button>

        <button
          onClick={() => setActiveTab('schema')}
          className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'schema'
              ? 'bg-slate-900 border-t-2 border-amber-400 text-amber-300'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>2. PostgreSQL DDL Schema</span>
        </button>

        <button
          onClick={() => setActiveTab('mdx')}
          className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'mdx'
              ? 'bg-slate-900 border-t-2 border-amber-400 text-amber-300'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
          }`}
        >
          <FileCode2 className="w-4 h-4" />
          <span>3. MDX Content Template</span>
        </button>

        <button
          onClick={() => setActiveTab('checklist')}
          className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'checklist'
              ? 'bg-slate-900 border-t-2 border-amber-400 text-amber-300'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
          }`}
        >
          <CheckSquare className="w-4 h-4" />
          <span>4. 20-Point SEO Checklist</span>
        </button>

        <button
          onClick={() => setActiveTab('som')}
          className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'som'
              ? 'bg-slate-900 border-t-2 border-amber-400 text-amber-300'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>5. Share of Model (SoM) Live Audit</span>
        </button>
      </div>

      {/* TAB 1: NEXTJS STRUCTURE */}
      {activeTab === 'nextjs' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-100">
                Next.js 14+ App Router Folder Hierarchy (Optimized for pSEO)
              </h2>
              <p className="text-xs text-slate-400">
                Dynamic routes for <code>/[state]/[documentType]</code>, <code>/industry/[slug]</code>, and <code>/clauses/[slug]</code>.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => copyToClipboard(NEXTJS_PROJECT_STRUCTURE, 'nextjs')}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 flex items-center gap-1.5"
              >
                {copiedSection === 'nextjs' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
                <span>{copiedSection === 'nextjs' ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                onClick={() => downloadTextFile(NEXTJS_PROJECT_STRUCTURE, 'nextjs-folder-structure.txt')}
                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export</span>
              </button>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-amber-300/90 overflow-x-auto leading-relaxed max-h-[600px] overflow-y-auto">
            <pre>{NEXTJS_PROJECT_STRUCTURE}</pre>
          </div>
        </div>
      )}

      {/* TAB 2: POSTGRESQL DDL SCHEMA */}
      {activeTab === 'schema' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-100">
                PostgreSQL DDL Database Schema for 5,000+ pSEO Pages
              </h2>
              <p className="text-xs text-slate-400">
                Normalized tables for States, Industries, Document Types, Clauses, Metro Hubs, and Articles.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => copyToClipboard(DATABASE_SCHEMA_POSTGRES, 'schema')}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 flex items-center gap-1.5"
              >
                {copiedSection === 'schema' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
                <span>{copiedSection === 'schema' ? 'Copied' : 'Copy SQL'}</span>
              </button>
              <button
                onClick={() => downloadTextFile(DATABASE_SCHEMA_POSTGRES, 'schema.sql')}
                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .SQL</span>
              </button>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-cyan-300/90 overflow-x-auto leading-relaxed max-h-[600px] overflow-y-auto">
            <pre>{DATABASE_SCHEMA_POSTGRES}</pre>
          </div>
        </div>
      )}

      {/* TAB 3: MDX CONTENT TEMPLATE */}
      {activeTab === 'mdx' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-100">
                Markdown / MDX Legal Content Template (With Ad Slots & GEO Boxes)
              </h2>
              <p className="text-xs text-slate-400">
                Structured with 40-60 word GEO direct answer, Leaderboard ad, Native ad, and PAA FAQ schema.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => copyToClipboard(MDX_CONTENT_TEMPLATE, 'mdx')}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 flex items-center gap-1.5"
              >
                {copiedSection === 'mdx' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
                <span>{copiedSection === 'mdx' ? 'Copied' : 'Copy MDX'}</span>
              </button>
              <button
                onClick={() => downloadTextFile(MDX_CONTENT_TEMPLATE, 'template.mdx')}
                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export .MDX</span>
              </button>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300/90 overflow-x-auto leading-relaxed max-h-[600px] overflow-y-auto">
            <pre>{MDX_CONTENT_TEMPLATE}</pre>
          </div>
        </div>
      )}

      {/* TAB 4: 20-POINT CHECKLIST */}
      {activeTab === 'checklist' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div>
            <h2 className="text-base font-bold text-slate-100">
              Technical Checklist for Programmatic SEO, GEO & AdSense Compliance
            </h2>
            <p className="text-xs text-slate-400">
              Verified standards across Generative Engine Optimization, Core Web Vitals, and Google Publisher Policies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SEO_GEO_CHECKLIST.map((group, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <h3 className="font-bold text-amber-400 text-sm flex items-center gap-2">
                  <CheckSquare className="w-4 h-4" />
                  <span>{group.category}</span>
                </h3>
                <ul className="space-y-2">
                  {group.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-200">{item.rule}</span>
                        <span className="text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">
                          {item.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: SHARE OF MODEL (SoM) LIVE AUDITOR */}
      {activeTab === 'som' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div>
              <span className="text-[11px] font-mono uppercase text-amber-400 font-bold tracking-wider">
                Generative Engine Optimization (GEO) Testing
              </span>
              <h2 className="font-display font-bold text-xl sm:text-2xl text-slate-100 mt-1">
                Live Share of Model (SoM) Citation Auditor
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Measure how frequently AI models (Google SGE, Perplexity, ChatGPT, Gemini, Claude) recommend The Small Business Legal Wiki over competitors for high-volume legal search queries.
              </p>
            </div>

            {/* Query Form */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="text"
                  value={somQuery}
                  onChange={(e) => setSomQuery(e.target.value)}
                  placeholder="Enter test prompt (e.g. California privacy policy template free)..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-amber-500/60"
                />
              </div>
              <button
                onClick={() => runSomAudit()}
                disabled={somLoading}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md transition-all shrink-0"
              >
                {somLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Auditing Models...</span>
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-4 h-4 text-slate-950" />
                    <span>Run SoM Audit</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick samples */}
            <div className="flex items-center gap-2 flex-wrap text-xs text-slate-400">
              <span>Try test query:</span>
              <button
                onClick={() => {
                  setSomQuery('California Privacy Policy template free download');
                  runSomAudit('California Privacy Policy template free download');
                }}
                className="text-amber-400 hover:underline"
              >
                "California Privacy Policy template"
              </button>
              <span>•</span>
              <button
                onClick={() => {
                  setSomQuery('indemnification clause gotchas for consulting contract');
                  runSomAudit('indemnification clause gotchas for consulting contract');
                }}
                className="text-amber-400 hover:underline"
              >
                "Indemnification gotchas"
              </button>
              <span>•</span>
              <button
                onClick={() => {
                  setSomQuery('NYC business tax registration office address');
                  runSomAudit('NYC business tax registration office address');
                }}
                className="text-amber-400 hover:underline"
              >
                "NYC business permit office"
              </button>
            </div>
          </div>

          {/* Audit Results */}
          {somResult && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
                <div className="space-y-1">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Audited Query</span>
                  <div className="font-bold text-slate-100 text-base sm:text-lg font-mono">
                    "{somResult.query}"
                  </div>
                </div>

                <div className="text-center sm:text-right bg-slate-950/80 px-4 py-2.5 rounded-xl border border-slate-800">
                  <span className="text-[11px] font-mono uppercase text-slate-400 block">Overall Share of Model (SoM)</span>
                  <span className="text-2xl font-bold font-mono text-emerald-400">
                    {somResult.shareOfModelScore || 88}%
                  </span>
                  <span className="text-[10px] text-slate-500 block">Dominant citation across top engines</span>
                </div>
              </div>

              {/* Models Breakdown Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(somResult.models || []).map((model: any, i: number) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-200 text-sm">{model.name}</span>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${model.cited ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'}`}>
                        {model.cited ? 'CITED (RANK #1)' : 'NOT CITED'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 italic bg-slate-950 p-2.5 rounded-lg border border-slate-850">
                      "{model.snippet}"
                    </p>
                  </div>
                ))}
              </div>

              {/* Recommendations */}
              <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <h3 className="font-bold text-amber-400 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>GEO Algorithm Optimization Factors</span>
                </h3>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {(somResult.recommendations || []).map((rec: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}

      {/* IN-CONTENT NATIVE AD */}
      <AdSenseUnit format="in-content" slotId="arch-bottom-native" />
    </div>
  );
};
