export const NEXTJS_PROJECT_STRUCTURE = `
comply-wiki-nextjs/
├── app/
│   ├── layout.tsx                     # Global layout, fonts, Google AdSense script loader, Organization JSON-LD
│   ├── page.tsx                       # High-traffic homepage, global search, state matrix, recent legal alerts
│   ├── robots.ts                      # Unrestricted crawler access: GPTBot, PerplexityBot, Google-Extended
│   ├── sitemap.ts                     # Dynamic programmatic XML sitemap generator (5,000+ URLs chunked)
│   │
│   ├── [state]/                       # pSEO Route: State Hubs (e.g. /california, /new-york)
│   │   ├── page.tsx                   # State compliance overview, franchise taxes, privacy laws
│   │   └── [documentType]/            # pSEO Route: [State] + [Document Type]
│   │       ├── page.tsx               # e.g., /california/privacy-policy-template
│   │       └── opengraph-image.tsx    # Dynamic edge-rendered OG share cards per state + document
│   │
│   ├── industry/                      # pSEO Route: Industry Compliance Hubs
│   │   └── [industrySlug]/            # e.g., /industry/dental-practice-hipaa-checklist
│   │       └── page.tsx               # Industry specific compliance requirements & checklists
│   │
│   ├── clauses/                       # Clause Library Directory
│   │   ├── page.tsx                   # Categorized clause index with search & risk filters
│   │   └── [clauseSlug]/              # pSEO Route: Individual Clause Deep-Dive
│   │       ├── page.tsx               # e.g., /clauses/indemnification-clause (GEO answer box + schema)
│   │       └── opengraph-image.tsx    # Dynamic clause share card
│   │
│   ├── local/                         # Local Compliance & City Permits Hubs
│   │   └── [citySlug]/                # pSEO Route: e.g., /local/los-angeles-business-permits
│   │       └── page.tsx               # City hall locator, county clerk, LocalBusiness schema, local maps
│   │
│   ├── tools/                         # Free Utility Suite
│   │   ├── generator/                 # Instant Document Generator (Step 1 Form -> Step 2 Vignette -> Step 3 Result)
│   │   ├── translator/                # Plain English Legal Translator (LLM-powered)
│   │   └── checklist/                 # Interactive Compliance Quiz
│   │
│   └── api/                           # Server-side API endpoints
│       ├── generate-document/route.ts # PDF & plain-text generation endpoint
│       ├── translate/route.ts         # Server-side Gemini LLM translation proxy (no exposed keys)
│       └── chat/route.ts              # AI Concierge conversation endpoint
│
├── components/
│   ├── ads/
│   │   ├── AdSenseUnit.tsx            # Responsive AdSense slots (Leaderboard, Native, Sticky Sidebar, Anchor)
│   │   ├── VignetteAdModal.tsx        # Interstitial modal ad with countdown & impression triggers
│   │   └── StickyFooterAd.tsx         # Mobile anchor banner
│   ├── seo/
│   │   ├── GeoAnswerBox.tsx           # 40-60 word authoritative answer box for AI Snippets / SGE
│   │   ├── SchemaGraph.tsx            # Interlinked Schema.org JSON-LD (@graph with FAQ, Article, HowTo)
│   │   └── GovSourceCitation.tsx      # Verified .gov authority link badge
│   └── concierge/
│       ├── ChatWidget.tsx             # Floating Lexi AI Concierge
│       └── VoiceAgentModal.tsx        # Inbound phone concierge simulator
│
├── lib/
│   ├── db.ts                          # PostgreSQL client (Drizzle ORM / Prisma)
│   └── pseo-engine.ts                 # Programmatic content compilation engine & keyword generator
│
└── public/
    └── ads.txt                        # Authorized Digital Sellers file for Google AdSense compliance
`;

export const DATABASE_SCHEMA_POSTGRES = `-- =========================================================================
-- DATABASE SCHEMA: THE SMALL BUSINESS LEGAL WIKI (ComplyWiki)
-- Engine: PostgreSQL 15+ (Optimized for 5,000+ Programmatic SEO Dynamic Pages)
-- =========================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. JURISDICTIONS (50 US States + DC + Territories)
CREATE TABLE states (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(2) UNIQUE NOT NULL,               -- e.g., 'CA', 'NY', 'DE'
    name VARCHAR(64) UNIQUE NOT NULL,              -- e.g., 'California'
    slug VARCHAR(64) UNIQUE NOT NULL,              -- e.g., 'california'
    filing_agency VARCHAR(255) NOT NULL,           -- e.g., 'California Secretary of State'
    annual_fee_description TEXT NOT NULL,
    privacy_law_name VARCHAR(255),                 -- e.g., 'CCPA / CPRA'
    privacy_status VARCHAR(32) DEFAULT 'Active',
    corporate_veil_strictness VARCHAR(32) DEFAULT 'High',
    publication_requirement BOOLEAN DEFAULT FALSE, -- e.g., TRUE for New York LLC Law § 206
    notable_statute TEXT,
    official_portal_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. INDUSTRIES
CREATE TABLE industries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(128) UNIQUE NOT NULL,             -- e.g., 'Dental Practice', 'Shopify E-Commerce'
    slug VARCHAR(128) UNIQUE NOT NULL,             -- e.g., 'dental-practices'
    naics_code VARCHAR(16),                        -- NAICS classification code
    primary_regulatory_agency VARCHAR(255),        -- e.g., 'HHS / OCR', 'FTC'
    high_risk_compliance_flags TEXT[],             -- e.g., ARRAY['HIPAA', 'PCI-DSS', 'OSHA']
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. DOCUMENT TYPES (Legal Templates)
CREATE TABLE document_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,                   -- e.g., 'Privacy Policy Template'
    slug VARCHAR(255) UNIQUE NOT NULL,             -- e.g., 'privacy-policy-template'
    category VARCHAR(64) NOT NULL,                 -- e.g., 'Privacy', 'Corporate', 'Employment'
    description TEXT NOT NULL,
    geo_direct_definition TEXT NOT NULL,           -- 40-60 words concise answer for AI Snippets
    default_form_fields JSONB NOT NULL,            -- Form schema for generator
    template_markdown TEXT NOT NULL,               -- Base document template with variable tokens
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. CLAUSE LIBRARY (Individual Clause pSEO Pages)
CREATE TABLE legal_clauses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,                   -- e.g., 'Indemnification & Hold Harmless'
    slug VARCHAR(255) UNIQUE NOT NULL,             -- e.g., 'indemnification-clause'
    category VARCHAR(64) NOT NULL,                 -- 'Liability', 'Intellectual Property', etc.
    risk_level VARCHAR(16) NOT NULL,               -- 'LOW', 'MODERATE', 'HIGH', 'CRITICAL'
    geo_direct_answer TEXT NOT NULL,               -- 40-60 words neutral direct answer
    plain_english_translation TEXT NOT NULL,
    standard_clause_text TEXT NOT NULL,
    common_gotchas TEXT[] NOT NULL,
    negotiation_tips TEXT NOT NULL,
    official_statute_citation VARCHAR(255),
    official_gov_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. LOCAL METRO COMPLIANCE HUBS (Local SEO & Maps)
CREATE TABLE metro_hubs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    city_name VARCHAR(128) NOT NULL,               -- e.g., 'Los Angeles'
    state_code VARCHAR(2) REFERENCES states(code),
    slug VARCHAR(128) UNIQUE NOT NULL,             -- e.g., 'los-angeles-business-permits'
    metro_population VARCHAR(32),
    regulation_strictness VARCHAR(32) DEFAULT 'High',
    city_hall_name VARCHAR(255) NOT NULL,
    city_hall_address TEXT NOT NULL,
    city_hall_phone VARCHAR(32),
    geo_latitude NUMERIC(10, 6) NOT NULL,
    geo_longitude NUMERIC(10, 6) NOT NULL,
    county_clerk_name VARCHAR(255),
    county_clerk_address TEXT,
    sbdc_office_address TEXT,
    required_permits JSONB NOT NULL,               -- Array of {name, agency, frequency, cost, desc}
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. PROGRAMMATIC GENERATED ARTICLES (Cache / pSEO Store)
CREATE TABLE pseo_articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) UNIQUE NOT NULL,             -- e.g., 'california-privacy-policy-template'
    state_id UUID REFERENCES states(id),
    document_type_id UUID REFERENCES document_types(id),
    industry_id UUID REFERENCES industries(id),
    meta_title VARCHAR(120) NOT NULL,              -- 50-60 characters
    meta_description VARCHAR(200) NOT NULL,        -- 140-160 characters
    h1_headline VARCHAR(255) NOT NULL,
    geo_answer_block TEXT NOT NULL,                -- 40-60 word direct answer placed right below H1
    content_body TEXT NOT NULL,                    -- Markdown/HTML article body
    faq_schema JSONB NOT NULL,                     -- Array of {question, answer}
    last_verified_gov_date DATE DEFAULT CURRENT_DATE,
    target_search_volume INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. SHARE OF MODEL (SoM) CITATION LOGS
CREATE TABLE ai_citations_som (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    test_prompt TEXT NOT NULL,                     -- e.g., 'best free privacy policy generator California'
    model_name VARCHAR(64) NOT NULL,               -- 'Google SGE', 'Perplexity', 'ChatGPT'
    cited_complywiki BOOLEAN NOT NULL,
    citation_url TEXT,
    extracted_snippet TEXT,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- INDEXES FOR INSTANT SUB-MILLISECOND LOOKUPS
CREATE INDEX idx_pseo_slug ON pseo_articles(slug);
CREATE INDEX idx_pseo_state ON pseo_articles(state_id);
CREATE INDEX idx_pseo_doc ON pseo_articles(document_type_id);
CREATE INDEX idx_clauses_slug ON legal_clauses(slug);
CREATE INDEX idx_metro_slug ON metro_hubs(slug);
`;

export const MDX_CONTENT_TEMPLATE = `---
title: "[State] [Document Type]: Free Legal Template & Statutory Guide"
description: "Generate a legally compliant [Document Type] in [State]. Includes mandatory [Statute Name] disclosures, plain English breakdown, and free PDF download."
dateUpdated: "2026-09-16"
jurisdiction: "[State]"
statutoryCitation: "[Official State Code § XXX]"
author: "Senior Regulatory Counsel, The Small Business Legal Wiki"
reviewer: "Verified against [Official State Agency] guidelines"
schemaType: ["Article", "HowTo", "FAQPage"]
---

import { GeoAnswerBox } from '@/components/seo/GeoAnswerBox';
import { AdSenseUnit } from '@/components/ads/AdSenseUnit';
import { SchemaGraph } from '@/components/seo/SchemaGraph';
import { DocumentGeneratorCTA } from '@/components/tools/DocumentGeneratorCTA';

{/* 1. ABOVE-THE-FOLD LEADERBOARD AD (728x90 Desktop / 320x50 Mobile) */}
<AdSenseUnit format="leaderboard" slotId="pseo-top-leaderboard" />

# [State] [Document Type] (Free Template & 2026 Compliance Guide)

{/* 2. GEO DIRECT ANSWER BOX (40-60 Words — Prime candidate for Google AI Overview / Perplexity) */}
<GeoAnswerBox 
  headline="Do businesses in [State] legally require a [Document Type]?"
  answer="Yes. Under [State Statute, e.g. Cal. Civ. Code § 1798.100], any commercial entity collecting personal data or contracting services in [State] must provide a compliant [Document Type]. Failure to include mandatory disclosures exposes businesses to statutory fines up to $[Amount] per violation."
  authority="Verified via [State Agency Name] (.gov)"
  sourceUrl="https://[agency].[state].gov"
/>

## Key Statutory Requirements in [State]

To satisfy [State] regulatory review, your [Document Type] must incorporate the following specific provisions:

- **Mandatory Disclosure [A]**: Description of required notice under [State Code].
- **Cure Period [B]**: Statutory [30-day] cure timeline before civil penalties accrue.
- **Consumer / Signer Rights [C]**: Explicit opt-out and dispute mechanisms.

{/* 3. IN-CONTENT NATIVE AD UNIT (High RPM Placement) */}
<AdSenseUnit format="in-content" slotId="pseo-mid-content-native" />

## Comparative Matrix: Standard vs. [State]-Compliant Requirements

| Provision | Generic Federal Standard | [State] Statutory Standard | Risk Level if Omitted |
| :--- | :--- | :--- | :--- |
| **Liability Cap** | Any agreed amount | Must exclude gross negligence | High |
| **Notice Period** | Reasonable notice (14 days) | Strict statutory notice ([X] days) | Critical |
| **Dispute Venue** | Neutral forum | In-state venue required by Labor Code | Moderate |

## Generate Your [State] [Document Type] Instantly

Use our zero-friction builder to customize, review, and export your legal document in under 3 minutes. No credit card or account registration required.

<DocumentGeneratorCTA templateId="[document-slug]" defaultState="[state-code]" />

## Frequently Asked Questions (Structured for Google PAA & AI Snippets)

### How often must I update my [Document Type] in [State]?
You should review and update your document whenever state regulatory statutes amend (typically annually) or whenever your business expands into new data collection categories.

### Can an out-of-state LLC use this [Document Type] for [State] clients?
Yes, provided the document includes specific choice-of-law and forum-selection language compliant with [State] commercial code.

{/* 4. SCHEMA.ORG AUTOMATIC GRAPH INJECTION */}
<SchemaGraph 
  pageType="Article"
  headline="[State] [Document Type] Compliance Guide"
  faqs={[
    { q: "How often must I update my document in [State]?", a: "Review annually or upon statutory updates." },
    { q: "Can an out-of-state LLC use this template?", a: "Yes, provided choice-of-law clauses conform with local commercial statutes." }
  ]}
/>

{/* 5. STICKY SIDEBAR / ANCHOR AD UNIT */}
<AdSenseUnit format="sticky-sidebar" slotId="pseo-sidebar-ad" />
`;

export const SEO_GEO_CHECKLIST = [
  {
    category: 'AEO (Answer Engine Optimization)',
    items: [
      { rule: '40-60 Word Direct Answer', desc: 'Each page begins with an authoritative, neutral direct answer right below H1.', status: 'PASSED' },
      { rule: 'Explicit Natural-Language H2s', desc: 'Headings match real voice and chat queries (e.g. "Do I need a privacy policy for Shopify?").', status: 'PASSED' },
      { rule: 'Definition Paragraphs', desc: 'Every legal clause and document includes a self-contained definition paragraph.', status: 'PASSED' },
    ],
  },
  {
    category: 'GEO (Generative Engine Optimization)',
    items: [
      { rule: '.gov Authority Citations', desc: 'Direct links to official state statutes, FTC.gov, IRS.gov, and SBA.gov.', status: 'PASSED' },
      { rule: 'Structured Comparison Tables', desc: 'Clear HTML comparison tables for statutory requirements across states.', status: 'PASSED' },
      { rule: 'Dated Freshness Markers', desc: 'Explicit "Last Verified: 2026" timestamps on all compliance guides.', status: 'PASSED' },
      { rule: 'Entity Disclosures', desc: 'Named editorial team with statutory research credentials on every guide.', status: 'PASSED' },
    ],
  },
  {
    category: 'Programmatic SEO (pSEO)',
    items: [
      { rule: 'Hub-and-Spoke Linking', desc: 'Central pillar hubs connect to 50 state spokes and relevant clause pages.', status: 'PASSED' },
      { rule: 'Unique Long-Tail Slugs', desc: 'Keyword-targeted paths: /[state]/[document], /clauses/[clause], /local/[city].', status: 'PASSED' },
      { rule: 'Dynamic OpenGraph Cards', desc: 'Programmatic social sharing preview cards generated per state & clause.', status: 'PASSED' },
    ],
  },
  {
    category: 'AdSense High-RPM Architecture',
    items: [
      { rule: 'Above-the-Fold Leaderboard', desc: 'High-visibility 728x90 (Desktop) / 320x50 (Mobile) slots.', status: 'PASSED' },
      { rule: 'In-Content Native Ads', desc: 'Contextually embedded ad blocks between article sections.', status: 'PASSED' },
      { rule: 'Vignette / Interstitial Step', desc: 'Full-screen processing ad modal between generator steps with timer & skip.', status: 'PASSED' },
      { rule: 'Sticky Desktop Sidebar & Mobile Anchor', desc: 'High-viewability sticky units maintaining dwell time RPM.', status: 'PASSED' },
      { rule: 'Zero Deceptive Placements', desc: 'All units clearly labeled "ADVERTISEMENT" adhering to Google Publisher Policies.', status: 'PASSED' },
    ],
  },
];
