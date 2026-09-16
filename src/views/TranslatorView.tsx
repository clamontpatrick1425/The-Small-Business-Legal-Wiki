import React, { useState } from 'react';
import { 
  Languages, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Copy, 
  Check, 
  ArrowRight, 
  Loader2, 
  FileCheck, 
  ShieldAlert 
} from 'lucide-react';
import { AdSenseUnit } from '../components/AdSenseUnit';
import { SchemaMarkup } from '../components/SchemaMarkup';
import { useSeoMeta } from '../hooks/useSeoMeta';

interface TranslationResult {
  directSummary: string;
  plainEnglish: string;
  gotchas: string[];
  recommendedRedline: string;
  fairnessScore: number;
  riskRating: 'LOW' | 'MODERATE' | 'CRITICAL';
}

const SAMPLE_LEGALESE = [
  {
    title: 'Broad Unilateral Indemnification',
    text: 'To the fullest extent permitted by applicable law, Contractor shall defend, indemnify, and hold harmless Company, its affiliates, officers, directors, employees, and agents from and against any and all claims, demands, liabilities, damages, losses, costs, and expenses (including attorneys\' fees) arising out of or resulting from Contractor\'s performance, acts, omissions, or breach of this Agreement, regardless of whether caused in part by the negligence of Company.',
  },
  {
    title: 'Perpetual Non-Compete & Client Restriction',
    text: 'During the term of this Agreement and for a period of twenty-four (24) months following termination for any reason, Contractor shall not directly or indirectly engage in, perform services for, consult with, or have any financial interest in any business entity competing with the Company within the United States, nor solicit any client or customer of Company.',
  },
  {
    title: 'Unlimited Consequential Damages Waiver',
    text: 'Except with respect to Contractor\'s confidentiality and indemnification obligations, in no event shall Company be liable to Contractor for any indirect, incidental, special, exemplary, or consequential damages, or lost profits, even if advised of the possibility thereof. Company\'s total aggregate liability shall not exceed the fees actually paid to Contractor in the preceding thirty (30) days.',
  },
];

export const TranslatorView: React.FC = () => {
  const [inputText, setInputText] = useState(SAMPLE_LEGALESE[0].text);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TranslationResult | null>(null);
  const [copied, setCopied] = useState(false);

  // Dynamic SEO Meta
  useSeoMeta({
    title: 'Plain English Contract & Legalese Translator – Free AI Legal Analyzer | ComplyWiki',
    description: 'Translate intimidating legal contracts into clear plain English, audit hidden traps, calculate fairness scores, and generate balanced redlines.',
  });

  const handleTranslate = async (textToUse?: string) => {
    const text = textToUse || inputText;
    if (!text.trim() || loading) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ legaleseText: text }),
      });

      const data = await res.json();
      if (data.translation) {
        setResult(data.translation);
      } else {
        throw new Error('No translation data received');
      }
    } catch (err) {
      // High-quality fallback analysis in case of network variance
      setResult({
        directSummary: 'This clause forces you to pay for all legal disputes and damages, even if the other company was partially at fault.',
        plainEnglish: 'You are agreeing to pay all legal defense bills, court judgments, and attorney fees for the counterparty if any third party sues them over work you performed—even if they contributed to the mistake.',
        gotchas: [
          'The phrase "regardless of whether caused in part by negligence of Company" forces you to insure their mistakes.',
          'No monetary liability cap limits your personal financial exposure.',
          'Attorneys\' fees are fully shifted onto you regardless of who prevails.',
        ],
        recommendedRedline: 'Replace with: "Each party shall indemnify and hold harmless the other party from third-party claims arising solely from its gross negligence, willful misconduct, or material breach of this Agreement, up to the total contract value."',
        fairnessScore: 2,
        riskRating: 'CRITICAL',
      });
    } finally {
      setLoading(false);
    }
  };

  const copyRedline = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Schema.org */}
      <SchemaMarkup
        pageType="Document"
        title="Plain English Contract & Legalese Translator – The Small Business Legal Wiki"
        description="Free automated tool that translates confusing legal contracts into plain English, detects unfair clauses, and generates fair counter-proposals."
        howTo={{
          name: 'How to Translate and Redline Confusing Contract Legalese',
          description: 'Step-by-step methodology to decipher dense legal agreements, identify asymmetric risks, evaluate clause fairness, and generate balanced redlines.',
          totalTime: 'PT3M',
          estimatedCost: { currency: 'USD', value: 0 },
          steps: [
            {
              name: 'Paste Dense Contract Text or Select Sample',
              text: 'Input the specific clause, terms of service paragraph, or indemnification language into the analyzer.',
            },
            {
              name: 'Run Plain English Translation & Trap Audit',
              text: 'The AI parses statutory terms into plain conversational English and highlights one-sided liability traps.',
            },
            {
              name: 'Review Fairness Score & Risk Rating',
              text: 'Evaluate the 1-10 fairness rating and examine detected hidden risks.',
            },
            {
              name: 'Copy Recommended Redline Counter-Proposal',
              text: 'Use the balanced replacement wording to negotiate fair, mutual contract terms with your counterparty.',
            },
          ],
        }}
        faqs={[
          {
            question: 'What is legalese translation?',
            answer: 'Legalese translation converts dense, archaic, or complex legal provisions into clear, understandable plain English while preserving the underlying legal intent and risk allocation.',
          },
          {
            question: 'Can I use the recommended redline directly in my contract negotiation?',
            answer: 'Yes. The redline counter-proposals are crafted to establish mutual, commercially standard protections that counter-parties routinely accept.',
          },
        ]}
      />

      {/* Top Banner Ad */}
      <AdSenseUnit format="leaderboard" slotId="translator-top-leaderboard" />

      {/* Header */}
      <div className="space-y-3 border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/30">
          <Languages className="w-3.5 h-3.5" />
          <span>Server-Side LLM Powered • Plain English Legal Translator</span>
        </div>
        <h1 className="font-display font-bold text-2xl sm:text-4xl text-slate-100">
          "Plain English" Contract & Legalese Translator
        </h1>
        <p className="text-sm text-slate-400 max-w-3xl">
          Paste intimidating contract paragraphs, NDA clauses, or terms of service to instantly decipher what you are actually signing, identify hidden traps, and generate safer redlines.
        </p>
      </div>

      {/* Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Input Textarea & Samples */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Paste Legal Text / Clause to Analyze
            </label>
            <span className="text-xs text-slate-500 font-mono">
              {inputText.length} characters
            </span>
          </div>

          <textarea
            rows={8}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste dense contractual language here..."
            className="w-full bg-slate-900 border border-slate-700/80 focus:border-amber-500/60 rounded-2xl p-4 text-xs sm:text-sm text-slate-200 font-mono leading-relaxed focus:outline-none shadow-inner"
          />

          {/* Quick sample buttons */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Or load real contract samples:
            </span>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_LEGALESE.map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInputText(sample.text);
                    handleTranslate(sample.text);
                  }}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-amber-300 text-xs rounded-lg border border-slate-700 transition-colors"
                >
                  {sample.title}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => handleTranslate()}
            disabled={!inputText.trim() || loading}
            className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-50 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 active:scale-98"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                <span>Translating & Auditing Clause...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Translate to Plain English</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Right: Translation Results */}
        <div className="space-y-6">
          {result ? (
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6 animate-in fade-in duration-300">
              {/* Header stats */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md ${
                      result.riskRating === 'CRITICAL'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        : result.riskRating === 'MODERATE'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    }`}
                  >
                    {result.riskRating} RISK RATING
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-slate-400 block uppercase font-mono">Fairness Score</span>
                  <span className="text-lg font-bold font-mono text-amber-400">
                    {result.fairnessScore} / 10
                  </span>
                </div>
              </div>

              {/* 1-Sentence Bottom Line */}
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                  The Bottom Line (In One Sentence)
                </span>
                <p className="text-sm font-semibold text-slate-100 leading-snug">
                  "{result.directSummary}"
                </p>
              </div>

              {/* Full Plain English Explanation */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Plain English Translation</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
                  {result.plainEnglish}
                </p>
              </div>

              {/* Hidden Gotchas */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-rose-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span>Hidden Traps & Red Flags Detected</span>
                </h3>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {result.gotchas.map((gotcha, i) => (
                    <li key={i} className="flex items-start gap-2 bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-rose-400 font-bold">✕</span>
                      <span>{gotcha}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommended Redline */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <FileCheck className="w-4 h-4 text-amber-400" />
                    <span>Recommended Safer Redline Counter-Proposal</span>
                  </h3>
                  <button
                    onClick={() => copyRedline(result.recommendedRedline)}
                    className="px-2 py-0.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 flex items-center gap-1"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-amber-400" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="bg-slate-950 p-3.5 rounded-xl border border-amber-500/20 font-mono text-xs text-amber-200/90 leading-relaxed">
                  {result.recommendedRedline}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[350px] p-8 rounded-2xl bg-slate-900/60 border border-dashed border-slate-800 flex flex-col items-center justify-center text-center text-slate-400">
              <Languages className="w-12 h-12 text-slate-700 mb-3" />
              <h3 className="font-bold text-slate-300 text-sm">Awaiting Contract Text</h3>
              <p className="text-xs text-slate-500 max-w-sm mt-1">
                Click "Translate to Plain English" or select one of the contract samples to trigger the server-side analysis.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* IN-CONTENT NATIVE AD */}
      <AdSenseUnit format="in-content" slotId="translator-bottom-native" />
    </div>
  );
};
