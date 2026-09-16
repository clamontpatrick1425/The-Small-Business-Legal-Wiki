import { useEffect } from 'react';
import { ViewType } from '../types';

export interface SeoMetaOptions {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogType?: 'website' | 'article';
  keywords?: string[];
}

export const VIEW_SEO_PRESETS: Record<ViewType, { title: string; description: string }> = {
  home: {
    title: 'The Small Business Legal Wiki – Free Compliance & Legal Resource Hub',
    description: 'Access 5,000+ free small business legal templates, state-by-state compliance guides, contract clause translations, and municipal permit directories.',
  },
  generator: {
    title: 'Instant Legal Document & Contract Generator – Free Small Business Templates',
    description: 'Draft customized NDAs, contractor agreements, website privacy policies, and LLC operating agreements with 50-state statutory compliance and zero paywalls.',
  },
  clauses: {
    title: 'Contract Clause Library: Plain English Legal Explanations & Risk Audits',
    description: 'Deconstruct high-risk clauses including indemnification, non-competes, and liability caps with plain-English translations, gotchas, and redline templates.',
  },
  checklists: {
    title: 'Small Business Compliance Audit & Statutory Readiness Checklist (2026)',
    description: 'Interactive corporate compliance score audit covering state annual reports, worker classification, registered agent rules, and municipal licensing.',
  },
  translator: {
    title: 'Plain English Contract & Legalese Translator – Free AI Legal Analyzer',
    description: 'Translate intimidating legal contracts into clear plain English, audit hidden traps, calculate fairness scores, and generate balanced redlines.',
  },
  'local-hubs': {
    title: 'Municipal Business License & Local Compliance Hubs – City Hall Directory',
    description: 'Search physical city licensing offices, county clerk assumed name filing centers, SBDC advisory hubs, and local tax requirements across major US metros.',
  },
  architecture: {
    title: 'Programmatic SEO, GEO & AdSense Monetization Architecture Blueprint',
    description: 'Technical reference architecture for Next.js 14+ app routers, PostgreSQL DDL schemas, MDX content templates, and live Share of Model (SoM) testing.',
  },
  'clause-detail': {
    title: 'Legal Clause Deep-Dive & Statutory Citation – The Small Business Legal Wiki',
    description: 'Examine contract clause language, risk level ratings, practical counter-proposals, and authoritative .gov statutory references.',
  },
};

/**
 * Helper to update or insert a meta tag in document.head
 */
function setMetaTag(selector: string, attributeName: string, attributeValue: string, content: string) {
  if (typeof document === 'undefined') return;

  let element = document.querySelector(selector) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

/**
 * Helper to update or insert a link tag in document.head
 */
function setLinkTag(rel: string, href: string) {
  if (typeof document === 'undefined') return;

  let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

/**
 * Hook to dynamically update document title and meta tags based on navigation or custom input
 */
export function useSeoMeta(options: SeoMetaOptions = {}, currentView?: ViewType) {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    // Determine target title and description
    const preset = currentView ? VIEW_SEO_PRESETS[currentView] : null;
    const finalTitle = options.title || preset?.title || VIEW_SEO_PRESETS.home.title;
    const finalDescription = options.description || preset?.description || VIEW_SEO_PRESETS.home.description;
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://complywiki.com';
    const finalUrl = options.canonicalUrl || (typeof window !== 'undefined' ? window.location.href : origin);
    const finalOgType = options.ogType || (currentView === 'clauses' || currentView === 'clause-detail' ? 'article' : 'website');

    // 1. Update document title
    document.title = finalTitle;

    // 2. Update meta description
    setMetaTag('meta[name="description"]', 'name', 'description', finalDescription);

    // 3. Update OpenGraph tags
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', finalTitle);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', finalDescription);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', finalUrl);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', finalOgType);
    setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'The Small Business Legal Wiki');

    // 4. Update Twitter Card tags
    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', finalTitle);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', finalDescription);

    // 5. Update Canonical Link
    setLinkTag('canonical', finalUrl);

    // 6. Keywords if provided
    if (options.keywords && options.keywords.length > 0) {
      setMetaTag('meta[name="keywords"]', 'name', 'keywords', options.keywords.join(', '));
    }
  }, [
    options.title,
    options.description,
    options.canonicalUrl,
    options.ogType,
    options.keywords,
    currentView,
  ]);
}
