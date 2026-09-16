import React, { useEffect, useState } from 'react';
import { Code2, Check, Copy, ExternalLink, X, FileCheck2, HelpCircle, ListOrdered } from 'lucide-react';
import { 
  buildSchemaGraph, 
  injectJsonLd, 
  FaqItem, 
  HowToData, 
  LocalBusinessData, 
  BreadcrumbItem, 
  ArticleData 
} from '../services/schemaService';

interface SchemaMarkupProps {
  pageType: 'Home' | 'Document' | 'Clause' | 'LocalHub' | 'Checklist' | 'Architecture';
  title: string;
  description: string;
  url?: string;
  faqs?: FaqItem[];
  howTo?: HowToData;
  breadcrumbs?: BreadcrumbItem[];
  localBusinessData?: LocalBusinessData;
  articleData?: Partial<ArticleData>;
}

export const SchemaMarkup: React.FC<SchemaMarkupProps> = ({
  pageType,
  title,
  description,
  url,
  faqs = [],
  howTo,
  breadcrumbs,
  localBusinessData,
  articleData,
}) => {
  const [showInspector, setShowInspector] = useState(false);
  const [copied, setCopied] = useState(false);

  // Construct complete Article node metadata
  const fullArticle: ArticleData = {
    headline: title,
    description: description,
    url: url,
    articleSection: pageType,
    authorName: 'The Small Business Legal Wiki Editorial Board',
    datePublished: '2026-01-01T00:00:00Z',
    dateModified: new Date().toISOString(),
    ...articleData,
  };

  // Build the complete Schema.org @graph using the unified Schema Service
  const schemaGraph = buildSchemaGraph({
    url,
    article: fullArticle,
    faqs,
    howTo,
    breadcrumbs,
    localBusiness: localBusinessData,
  });

  const jsonString = JSON.stringify(schemaGraph, null, 2);

  // Dynamically inject into document.head
  useEffect(() => {
    injectJsonLd(schemaGraph, 'complywiki-schema-jsonld');
  }, [jsonString]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const detectedTypes = schemaGraph['@graph']?.map((node: any) => node['@type']) || [];

  return (
    <>
      <div className="flex items-center justify-between my-2 text-xs">
        <div className="hidden sm:flex items-center gap-2 text-slate-400 font-mono text-[11px]">
          <span className="text-emerald-400 font-bold">● Active JSON-LD Head Injection:</span>
          {detectedTypes.map((type: string, i: number) => (
            <span key={i} className="px-1.5 py-0.5 bg-slate-900 border border-slate-800 rounded text-slate-300">
              {type}
            </span>
          ))}
        </div>

        <button
          onClick={() => setShowInspector(true)}
          className="ml-auto inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono font-medium text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-md transition-all shadow-sm active:scale-98"
          title="Inspect live Schema.org JSON-LD graph injected into document.head"
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>Inspect Live JSON-LD Schema</span>
        </button>
      </div>

      {showInspector && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-2xl w-full p-5 shadow-2xl flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-amber-400" />
                <div>
                  <h3 className="text-sm font-bold text-slate-100">Live Schema.org JSON-LD Inspector</h3>
                  <p className="text-[11px] text-slate-400">
                    Dynamically generated and injected into document.head for rich search snippets
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowInspector(false)}
                className="p-1 text-slate-400 hover:text-slate-200 rounded hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Schema badges */}
            <div className="flex flex-wrap items-center gap-1.5 pt-3">
              <span className="text-[11px] text-slate-400 mr-1">Injected Nodes:</span>
              {detectedTypes.map((type: string, i: number) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30"
                >
                  {type === 'FAQPage' && <HelpCircle className="w-3 h-3 text-cyan-400" />}
                  {type === 'HowTo' && <ListOrdered className="w-3 h-3 text-emerald-400" />}
                  {type === 'Article' && <FileCheck2 className="w-3 h-3 text-purple-400" />}
                  <span>{type}</span>
                </span>
              ))}
            </div>

            <div className="my-3 overflow-y-auto bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs text-amber-200/90 leading-relaxed max-h-[50vh]">
              <pre>{jsonString}</pre>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
              <a
                href="https://search.google.com/test/rich-results"
                target="_blank"
                rel="noreferrer"
                className="text-amber-400 hover:underline flex items-center gap-1"
              >
                <span>Test in Google Rich Results</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={copyToClipboard}
                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-md flex items-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy JSON-LD'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
