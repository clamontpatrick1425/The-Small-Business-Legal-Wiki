import React, { useEffect, useState } from 'react';
import { Code2, Check, Copy, ExternalLink, X } from 'lucide-react';

interface SchemaMarkupProps {
  pageType: 'Home' | 'Document' | 'Clause' | 'LocalHub' | 'Checklist' | 'Architecture';
  title: string;
  description: string;
  url?: string;
  faqs?: Array<{ question: string; answer: string }>;
  localBusinessData?: {
    name: string;
    city: string;
    state: string;
    phone: string;
    address: string;
  };
}

export const SchemaMarkup: React.FC<SchemaMarkupProps> = ({
  pageType,
  title,
  description,
  url = typeof window !== 'undefined' ? window.location.href : 'https://complywiki.com',
  faqs = [],
  localBusinessData,
}) => {
  const [showInspector, setShowInspector] = useState(false);
  const [copied, setCopied] = useState(false);

  // Generate interlinked Schema.org @graph
  const schemaGraph: any = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LegalService',
        '@id': 'https://complywiki.com/#organization',
        name: 'The Small Business Legal Wiki',
        alternateName: 'ComplyWiki',
        url: 'https://complywiki.com',
        logo: {
          '@type': 'ImageObject',
          '@id': 'https://complywiki.com/#logo',
          url: 'https://complywiki.com/assets/logo.png',
        },
        image: { '@id': 'https://complywiki.com/#logo' },
        description: 'Comprehensive free business compliance resource hub and programmatic legal library.',
        priceRange: '$0 (100% Free Public Resource)',
        areaServed: 'US',
        sameAs: [
          'https://twitter.com/complywiki',
          'https://linkedin.com/company/complywiki',
          'https://github.com/complywiki/open-legal-templates',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://complywiki.com/#website',
        url: 'https://complywiki.com',
        name: 'The Small Business Legal Wiki',
        publisher: { '@id': 'https://complywiki.com/#organization' },
      },
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        isPartOf: { '@id': 'https://complywiki.com/#website' },
        headline: title,
        description: description,
        inLanguage: 'en-US',
        mainEntityOfPage: url,
        datePublished: '2026-01-01T00:00:00Z',
        dateModified: new Date().toISOString(),
        publisher: { '@id': 'https://complywiki.com/#organization' },
        author: {
          '@type': 'Organization',
          name: 'The Small Business Legal Wiki Editorial Board',
        },
      },
    ],
  };

  // Add FAQPage node if FAQs exist
  if (faqs && faqs.length > 0) {
    schemaGraph['@graph'].push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: faqs.map(f => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.answer,
        },
      })),
    });
  }

  // Add LocalBusiness node if viewing a local metro hub
  if (localBusinessData) {
    schemaGraph['@graph'].push({
      '@type': 'ProfessionalService',
      '@id': `${url}#localOffice`,
      name: `${localBusinessData.city} Small Business Compliance Center`,
      telephone: localBusinessData.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: localBusinessData.address,
        addressLocality: localBusinessData.city,
        addressRegion: localBusinessData.state,
        addressCountry: 'US',
      },
      provider: { '@id': 'https://complywiki.com/#organization' },
    });
  }

  const jsonString = JSON.stringify(schemaGraph, null, 2);

  // Inject or update in DOM
  useEffect(() => {
    let scriptTag = document.getElementById('complywiki-schema-jsonld') as HTMLScriptElement;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'complywiki-schema-jsonld';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.text = jsonString;
  }, [jsonString]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="flex items-center justify-end my-2">
        <button
          onClick={() => setShowInspector(true)}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono font-medium text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-md transition-all shadow-sm"
          title="Inspect live Schema.org JSON-LD graph for this page"
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
                  <p className="text-[11px] text-slate-400">Validated for Google Rich Results, FAQPage, & SGE citations</p>
                </div>
              </div>
              <button
                onClick={() => setShowInspector(false)}
                className="p-1 text-slate-400 hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="my-3 overflow-y-auto bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs text-amber-200/90 leading-relaxed">
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
