/**
 * Schema.org JSON-LD Structured Data Utility Service
 * Dynamically generates and injects valid JSON-LD schemas into document.head
 * Compliant with Google Rich Results for FAQPage, HowTo, Article, LocalBusiness, and BreadcrumbList.
 */

export interface FaqItem {
  question: string;
  answer: string;
}

export interface HowToStep {
  name: string;
  text: string;
  url?: string;
  image?: string;
}

export interface HowToData {
  name: string;
  description: string;
  totalTime?: string;
  estimatedCost?: {
    currency: string;
    value: string | number;
  };
  steps: HowToStep[];
}

export interface ArticleData {
  headline: string;
  description: string;
  url?: string;
  authorName?: string;
  datePublished?: string;
  dateModified?: string;
  keywords?: string[];
  articleSection?: string;
}

export interface LocalBusinessData {
  name: string;
  city: string;
  state: string;
  phone: string;
  address: string;
  postalCode?: string;
  url?: string;
}

export interface BreadcrumbItem {
  name: string;
  item: string;
}

export interface SchemaBuildOptions {
  url?: string;
  article?: ArticleData;
  faqs?: FaqItem[];
  howTo?: HowToData;
  localBusiness?: LocalBusinessData;
  breadcrumbs?: BreadcrumbItem[];
}

const DEFAULT_ORIGIN = typeof window !== 'undefined' ? window.location.origin : 'https://complywiki.com';
const ORGANIZATION_ID = `${DEFAULT_ORIGIN}/#organization`;
const WEBSITE_ID = `${DEFAULT_ORIGIN}/#website`;

/**
 * Creates the core LegalService / Organization entity node
 */
export function createOrganizationNode() {
  return {
    '@type': 'LegalService',
    '@id': ORGANIZATION_ID,
    name: 'The Small Business Legal Wiki',
    alternateName: 'ComplyWiki',
    url: DEFAULT_ORIGIN,
    logo: {
      '@type': 'ImageObject',
      '@id': `${DEFAULT_ORIGIN}/#logo`,
      url: `${DEFAULT_ORIGIN}/assets/logo.png`,
    },
    image: { '@id': `${DEFAULT_ORIGIN}/#logo` },
    description: 'Comprehensive free small business compliance resource hub, legal clause encyclopedia, and automated contract generator.',
    priceRange: '$0 (100% Free Public Resource)',
    areaServed: 'US',
    knowsAbout: [
      'Small Business Compliance',
      'Contract Law',
      'State Licensing Requirements',
      'Corporate Formalities',
      'NDAs and Commercial Agreements',
    ],
    sameAs: [
      'https://twitter.com/complywiki',
      'https://linkedin.com/company/complywiki',
      'https://github.com/complywiki/open-legal-templates',
    ],
  };
}

/**
 * Creates the WebSite entity node
 */
export function createWebSiteNode() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: DEFAULT_ORIGIN,
    name: 'The Small Business Legal Wiki',
    description: 'Free small business legal library, contract templates, and statutory compliance guides.',
    publisher: { '@id': ORGANIZATION_ID },
  };
}

/**
 * Generates an Article Schema node for deep legal guides & clauses
 */
export function createArticleNode(data: ArticleData, canonicalUrl?: string) {
  const pageUrl = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : DEFAULT_ORIGIN);
  return {
    '@type': 'Article',
    '@id': `${pageUrl}#article`,
    isPartOf: { '@id': WEBSITE_ID },
    headline: data.headline,
    description: data.description,
    inLanguage: 'en-US',
    mainEntityOfPage: pageUrl,
    datePublished: data.datePublished || '2026-01-01T00:00:00Z',
    dateModified: data.dateModified || new Date().toISOString(),
    articleSection: data.articleSection || 'Legal Guides',
    keywords: data.keywords?.join(', '),
    publisher: { '@id': ORGANIZATION_ID },
    author: {
      '@type': 'Organization',
      name: data.authorName || 'The Small Business Legal Wiki Editorial Board',
      url: DEFAULT_ORIGIN,
    },
  };
}

/**
 * Generates an FAQPage Schema node for People-Also-Ask snippet dominance
 */
export function createFaqPageNode(faqs: FaqItem[], canonicalUrl?: string) {
  if (!faqs || faqs.length === 0) return null;
  const pageUrl = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : DEFAULT_ORIGIN);

  return {
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    isPartOf: { '@id': WEBSITE_ID },
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generates a HowTo Schema node for multi-step legal processes and guides
 */
export function createHowToNode(data: HowToData, canonicalUrl?: string) {
  if (!data || !data.steps || data.steps.length === 0) return null;
  const pageUrl = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : DEFAULT_ORIGIN);

  return {
    '@type': 'HowTo',
    '@id': `${pageUrl}#howto`,
    isPartOf: { '@id': WEBSITE_ID },
    name: data.name,
    description: data.description,
    totalTime: data.totalTime || 'PT10M',
    estimatedCost: data.estimatedCost
      ? {
          '@type': 'MonetaryAmount',
          currency: data.estimatedCost.currency,
          value: data.estimatedCost.value,
        }
      : {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0',
        },
    step: data.steps.map((step, idx) => ({
      '@type': 'HowToStep',
      position: idx + 1,
      name: step.name,
      text: step.text,
      url: step.url || `${pageUrl}#step-${idx + 1}`,
      ...(step.image ? { image: step.image } : {}),
    })),
  };
}

/**
 * Generates a LocalBusiness / ProfessionalService node for municipal licensing hubs
 */
export function createLocalBusinessNode(data: LocalBusinessData, canonicalUrl?: string) {
  const pageUrl = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : DEFAULT_ORIGIN);

  return {
    '@type': 'ProfessionalService',
    '@id': `${pageUrl}#localOffice`,
    name: `${data.city} Small Business Compliance Center`,
    telephone: data.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: data.address,
      addressLocality: data.city,
      addressRegion: data.state,
      addressCountry: 'US',
      ...(data.postalCode ? { postalCode: data.postalCode } : {}),
    },
    provider: { '@id': ORGANIZATION_ID },
  };
}

/**
 * Generates a BreadcrumbList Schema node
 */
export function createBreadcrumbNode(items: BreadcrumbItem[]) {
  if (!items || items.length === 0) return null;

  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
}

/**
 * Builds a unified @graph container with all specified nodes
 */
export function buildSchemaGraph(options: SchemaBuildOptions) {
  const nodes: any[] = [
    createOrganizationNode(),
    createWebSiteNode(),
  ];

  if (options.article) {
    nodes.push(createArticleNode(options.article, options.url));
  }

  if (options.faqs && options.faqs.length > 0) {
    const faqNode = createFaqPageNode(options.faqs, options.url);
    if (faqNode) nodes.push(faqNode);
  }

  if (options.howTo) {
    const howToNode = createHowToNode(options.howTo, options.url);
    if (howToNode) nodes.push(howToNode);
  }

  if (options.localBusiness) {
    nodes.push(createLocalBusinessNode(options.localBusiness, options.url));
  }

  if (options.breadcrumbs && options.breadcrumbs.length > 0) {
    const breadcrumbNode = createBreadcrumbNode(options.breadcrumbs);
    if (breadcrumbNode) nodes.push(breadcrumbNode);
  }

  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  };
}

/**
 * Injects or updates a JSON-LD structured data script tag in document.head
 */
export function injectJsonLd(schemaGraph: object, scriptId = 'complywiki-schema-jsonld'): void {
  if (typeof document === 'undefined') return;

  try {
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.text = JSON.stringify(schemaGraph, null, 2);
  } catch (err) {
    console.error('Failed to inject JSON-LD script into head:', err);
  }
}

/**
 * Removes the injected JSON-LD script tag from document.head
 */
export function removeJsonLd(scriptId = 'complywiki-schema-jsonld'): void {
  if (typeof document === 'undefined') return;
  const scriptTag = document.getElementById(scriptId);
  if (scriptTag && scriptTag.parentNode) {
    scriptTag.parentNode.removeChild(scriptTag);
  }
}
