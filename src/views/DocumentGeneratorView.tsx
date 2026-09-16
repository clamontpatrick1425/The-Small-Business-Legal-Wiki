import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Copy, 
  Printer, 
  Check, 
  AlertTriangle, 
  Sparkles, 
  ArrowRight, 
  RefreshCw, 
  ShieldCheck, 
  ChevronDown 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DOCUMENT_TEMPLATES, ALL_STATES } from '../data/legalData';
import { LegalStateInfo } from '../types';
import { AdSenseUnit } from '../components/AdSenseUnit';
import { SchemaMarkup } from '../components/SchemaMarkup';
import { useSeoMeta } from '../hooks/useSeoMeta';

interface DocumentGeneratorViewProps {
  initialState?: LegalStateInfo;
}

export const DocumentGeneratorView: React.FC<DocumentGeneratorViewProps> = ({ initialState }) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState(DOCUMENT_TEMPLATES[0].id);
  const [selectedStateCode, setSelectedStateCode] = useState(initialState ? initialState.code : 'CA');
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Form, 2: Interstitial Ad, 3: Generated Doc
  const [copied, setCopied] = useState(false);

  const currentTemplate = DOCUMENT_TEMPLATES.find(t => t.id === selectedTemplateId) || DOCUMENT_TEMPLATES[0];
  const currentState = ALL_STATES.find(s => s.code === selectedStateCode) || ALL_STATES[0];

  // Dynamic SEO Meta updates for exact document & state pairing
  useSeoMeta({
    title: `Free ${currentTemplate.title} (${currentState.name} Compliant) – Generator | ComplyWiki`,
    description: `Instantly create a customized, state-compliant ${currentTemplate.title} for ${currentState.name}. 100% free with zero paywall.`,
  });

  // Form field state
  const [formData, setFormData] = useState({
    companyName: 'Acme Technologies LLC',
    counterpartyName: 'Apex Strategic Partners Inc.',
    effectiveDate: new Date().toISOString().split('T')[0],
    governingState: 'California',
    purposeDescription: 'evaluation of potential commercial joint venture and proprietary software integration',
    termMonths: '24',
    websiteUrl: 'https://example.com',
    contactEmail: 'privacy@example.com',
  });

  const handleFieldChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleStartGeneration = (e: React.FormEvent) => {
    e.preventDefault();
    // Transition to Step 2 (Vignette Interstitial Ad)
    setStep(2);
  };

  const handleVignetteCompleted = () => {
    // Transition to Step 3 (Rendered Document)
    setStep(3);
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#f59e0b', '#d97706', '#fbbf24', '#ffffff'],
    });
  };

  // Compile final document text with variable token replacements
  const compiledDocument = currentTemplate.generateText({
    ...formData,
    state: currentState.name,
    governingState: currentState.name,
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(compiledDocument);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([compiledDocument], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `${currentTemplate.slug}-${selectedStateCode.toLowerCase()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#10b981', '#f59e0b', '#ffffff'],
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Schema.org integration */}
      <SchemaMarkup
        pageType="Document"
        title={`Free ${currentTemplate.title} (${currentState.name} Compliant) – Generator`}
        description={`Instantly create a customized, state-compliant ${currentTemplate.title} for ${currentState.name}. 100% free with zero paywall.`}
        howTo={{
          name: `How to Generate a ${currentState.name}-Compliant ${currentTemplate.title}`,
          description: `Four-step process to draft, customize, review, and execute a legally binding ${currentTemplate.title} in ${currentState.name}.`,
          totalTime: 'PT5M',
          estimatedCost: { currency: 'USD', value: 0 },
          steps: [
            {
              name: 'Select Governing State & Legal Template',
              text: `Select ${currentState.name} to apply relevant local statutory disclosures and liability restrictions.`,
            },
            {
              name: 'Enter Contracting Parties & Business Terms',
              text: 'Input official legal entity names, effective dates, contract duration, and business purpose definitions.',
            },
            {
              name: 'Review Statutory Clauses & Liability Caps',
              text: 'Verify confidentiality terms, governing law jurisdiction, and mutual remedies.',
            },
            {
              name: 'Export, Download, and Execute',
              text: 'Copy the finalized document to your clipboard or download as plain text (.txt) for e-signature or paper execution.',
            },
          ],
        }}
        faqs={[
          {
            question: `Is this ${currentTemplate.title} legally binding in ${currentState.name}?`,
            answer: `Yes, when executed with mutual consideration, proper authority, and compliant with ${currentState.name} statutory disclosure requirements.`
          },
          {
            question: `Can I edit the generated agreement after downloading?`,
            answer: `Yes. You can copy the full text to your clipboard or download as plain text (.txt) to import directly into Microsoft Word or Google Docs.`
          }
        ]}
      />

      {/* Top Banner Ad */}
      <AdSenseUnit format="leaderboard" slotId="generator-top-leaderboard" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Zero Paywall • No Signup Required • 100% Free</span>
          </div>
          <h1 className="font-display font-bold text-2xl sm:text-4xl text-slate-100">
            Free Legal Document Generator
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Programmatic templates calibrated for 50 state jurisdictions and 2026 statutory standards.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className={`px-2.5 py-1 rounded-md font-bold ${step === 1 ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'}`}>
            1. Configure
          </span>
          <span className="text-slate-600">→</span>
          <span className={`px-2.5 py-1 rounded-md font-bold ${step === 2 ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'}`}>
            2. Interstitial
          </span>
          <span className="text-slate-600">→</span>
          <span className={`px-2.5 py-1 rounded-md font-bold ${step === 3 ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300'}`}>
            3. Final Document
          </span>
        </div>
      </div>

      {/* STEP 1: FORM CONFIGURATION */}
      {step === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={handleStartGeneration} className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
              <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-400" />
                <span>Step 1: Choose Template & Jurisdiction</span>
              </h2>

              {/* Template Picker */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Select Legal Document Template
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {DOCUMENT_TEMPLATES.map((tmpl) => (
                    <div
                      key={tmpl.id}
                      onClick={() => setSelectedTemplateId(tmpl.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        selectedTemplateId === tmpl.id
                          ? 'bg-amber-500/10 border-amber-500/60 shadow-md text-slate-100'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-bold text-sm text-slate-200">{tmpl.title}</div>
                      <div className="text-[11px] text-slate-400 mt-1 line-clamp-2">{tmpl.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Jurisdiction Picker */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Governing State Jurisdiction
                  </label>
                  <select
                    value={selectedStateCode}
                    onChange={(e) => {
                      setSelectedStateCode(e.target.value);
                      const st = ALL_STATES.find(s => s.code === e.target.value);
                      if (st) setFormData(prev => ({ ...prev, governingState: st.name }));
                    }}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500/60"
                  >
                    {ALL_STATES.map((s) => (
                      <option key={s.code} value={s.code}>
                        {s.name} ({s.code}) - {s.filingAgency}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Effective Date
                  </label>
                  <input
                    type="date"
                    value={formData.effectiveDate}
                    onChange={(e) => handleFieldChange('effectiveDate', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500/60"
                  />
                </div>
              </div>

              {/* Dynamic Party Names depending on template */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    {selectedTemplateId === 'privacy-policy' ? 'Business / Website Name' : 'Company / Disclosing Party Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => handleFieldChange('companyName', e.target.value)}
                    placeholder="e.g. Acme Studio LLC"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500/60"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    {selectedTemplateId === 'privacy-policy' ? 'Website URL' : 'Counterparty / Contractor Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={selectedTemplateId === 'privacy-policy' ? formData.websiteUrl : formData.counterpartyName}
                    onChange={(e) => handleFieldChange(selectedTemplateId === 'privacy-policy' ? 'websiteUrl' : 'counterpartyName', e.target.value)}
                    placeholder={selectedTemplateId === 'privacy-policy' ? 'https://example.com' : 'e.g. Apex Strategic Inc.'}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500/60"
                  />
                </div>
              </div>

              {/* Additional Context Field */}
              {selectedTemplateId === 'nda-mutual' && (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Specific Business Purpose
                  </label>
                  <input
                    type="text"
                    value={formData.purposeDescription}
                    onChange={(e) => handleFieldChange('purposeDescription', e.target.value)}
                    placeholder="e.g., evaluating potential joint venture and software licensing"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500/60"
                  />
                </div>
              )}

              {/* State Notice Box */}
              <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs text-slate-300 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-300 block mb-0.5">
                    {currentState.name} Statutory Guarantee
                  </span>
                  <p className="leading-relaxed">
                    This generated agreement automatically adheres to <strong>{currentState.notableStatute}</strong>. Applicable mandatory disclosures and dispute resolution procedures are calibrated for {currentState.name} state courts.
                  </p>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 active:scale-98"
              >
                <span>Generate Free {currentState.name} Document</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Sticky Sidebar Ad */}
          <div className="hidden lg:block">
            <AdSenseUnit format="sticky-sidebar" slotId="generator-sidebar" />
          </div>
        </div>
      )}

      {/* STEP 2: INTERSTITIAL VIGNETTE AD MODAL */}
      {step === 2 && (
        <AdSenseUnit
          format="vignette"
          slotId="generator-interstitial"
          onAdClose={handleVignetteCompleted}
        />
      )}

      {/* STEP 3: RENDERED DOCUMENT */}
      {step === 3 && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-md">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="text-xs font-bold text-slate-200">
                {currentTemplate.title} ({currentState.name})
              </span>
              <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                • {compiledDocument.split('\n').length} Clauses Formatted
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setStep(1)}
                className="px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Edit Fields</span>
              </button>

              <button
                onClick={handleCopy}
                className="px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
                <span>{copied ? 'Copied!' : 'Copy Text'}</span>
              </button>

              <button
                onClick={handlePrint}
                className="px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5 text-cyan-400" />
                <span>Print</span>
              </button>

              <button
                onClick={handleDownload}
                className="px-4 py-1.5 text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg transition-all flex items-center gap-1.5 shadow-md"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .TXT</span>
              </button>
            </div>
          </div>

          {/* Document Content Paper Layout */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-10 font-mono text-xs sm:text-sm text-slate-200 leading-relaxed shadow-2xl overflow-x-auto whitespace-pre-wrap selection:bg-amber-500/30 selection:text-amber-200">
            {compiledDocument}
          </div>

          {/* IN-CONTENT NATIVE AD */}
          <AdSenseUnit format="in-content" slotId="generator-post-native" />

          {/* Statutory Educational Notice */}
          <div className="p-4 rounded-xl bg-slate-900 border border-amber-500/20 flex items-start gap-3 text-xs text-slate-400">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <p>
              <strong>Notice:</strong> This generated document is provided for educational and administrative convenience. Because local statutory codes evolve, we recommend having counsel licensed in {currentState.name} review documents involving material commercial liability or proprietary IP.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
