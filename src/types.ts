export type ViewType =
  | 'home'
  | 'generator'
  | 'clauses'
  | 'checklists'
  | 'translator'
  | 'local-hubs'
  | 'architecture'
  | 'clause-detail';

export interface LegalStateInfo {
  id: string;
  name: string;
  code: string;
  filingAgency: string;
  annualFee: string;
  privacyLaw: string;
  privacyStatus: 'Active' | 'Pending' | 'Enacted';
  corporateVeilStrictness: 'High' | 'Moderate' | 'Low';
  publicationRequirement: boolean;
  notableStatute: string;
  officialGovUrl: string;
}

export interface LegalClause {
  id: string;
  slug: string;
  title: string;
  category: 'Liability' | 'Intellectual Property' | 'Operations' | 'Restrictive Covenants' | 'Dispute Resolution';
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  shortAnswer: string; // 40-60 words GEO direct answer
  plainEnglishTranslation: string;
  sampleClauseText: string;
  commonGotchas: string[];
  negotiationTips: string;
  officialGovSource: {
    agency: string;
    url: string;
    statute: string;
  };
  faqs: {
    question: string;
    answer: string;
  }[];
}

export interface DocumentTemplate {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  estimatedMinutes: number;
  popularInStates: string[];
  fields: {
    id: string;
    label: string;
    type: 'text' | 'select' | 'textarea' | 'checkbox';
    placeholder?: string;
    options?: string[];
    defaultValue?: any;
    helpText?: string;
  }[];
  generateText: (formData: Record<string, any>) => string;
}

export interface LocalMetroHub {
  id: string;
  city: string;
  state: string;
  stateCode: string;
  metroArea: string;
  population: string;
  regulationsLevel: 'Very High' | 'High' | 'Moderate';
  localCityHall: {
    name: string;
    address: string;
    phone: string;
    department: string;
    lat: number;
    lng: number;
  };
  countyClerk: {
    name: string;
    address: string;
    phone: string;
    purpose: string;
  };
  sbdcOffice: {
    name: string;
    address: string;
    service: string;
  };
  requiredPermits: {
    name: string;
    issuingAgency: string;
    frequency: string;
    avgCost: string;
    description: string;
  }[];
  localTaxChecklist: string[];
  officialPortalUrl: string;
}

export interface ComplianceQuizQuestion {
  id: number;
  question: string;
  category: string;
  explanation: string;
  options: {
    text: string;
    points: number;
    risk: 'good' | 'warning' | 'danger';
    recommendation?: string;
  }[];
}

export interface TranslationResult {
  summary: string;
  whatItMeans: string;
  hiddenRisks: string[];
  recommendedAction: string;
  riskRating: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  fairnessScore: number;
}

export type AdFormat = 'leaderboard' | 'in-content' | 'sticky-sidebar' | 'vignette' | 'anchor';

export interface AdUnitProps {
  id?: string;
  format: AdFormat;
  slotId?: string;
  className?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface SomAuditResult {
  query: string;
  state: string;
  industry: string;
  shareOfModel: string;
  engines: {
    name: string;
    cited: boolean;
    score: number;
    snippet: string;
  }[];
  recommendations: string[];
}
