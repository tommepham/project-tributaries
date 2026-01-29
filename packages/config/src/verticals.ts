/**
 * Vertical configuration and metadata
 */

export interface VerticalConfig {
  id: string;
  name: string;
  description: string;
  industry: string;
  targetCustomer: string;
  pricingTiers: {
    name: string;
    priceMonthly: number;
    features: string[];
  }[];
  techStack: string[];
  status: 'concept' | 'validating' | 'building' | 'beta' | 'live';
  score?: number;
}

export const VERTICALS: Record<string, VerticalConfig> = {
  forge: {
    id: 'forge',
    name: 'Forge',
    description: 'Construction Progress Billing Automation',
    industry: 'Construction',
    targetCustomer: 'General contractors, specialty contractors ($5M-$100M revenue)',
    pricingTiers: [
      { name: 'Starter', priceMonthly: 499, features: ['Up to 10 active projects', 'AIA billing', 'QuickBooks sync'] },
      { name: 'Growth', priceMonthly: 999, features: ['Up to 50 projects', 'Change order tracking', 'Subcontractor portal'] },
      { name: 'Enterprise', priceMonthly: 2500, features: ['Unlimited projects', 'API access', 'White-glove onboarding'] },
    ],
    techStack: ['n8n', 'OCR', 'QuickBooks API', 'Sage API'],
    status: 'concept',
    score: 94,
  },
  counsel: {
    id: 'counsel',
    name: 'Counsel',
    description: 'Legal Contract Intelligence',
    industry: 'Legal Services',
    targetCustomer: 'Small/mid law firms (5-50 attorneys)',
    pricingTiers: [
      { name: 'Solo', priceMonthly: 99, features: ['Up to 500 documents', 'Semantic search', 'Deadline tracking'] },
      { name: 'Firm', priceMonthly: 299, features: ['Unlimited docs', '5 users', 'Risk scoring'] },
      { name: 'Enterprise', priceMonthly: 99, features: ['Per user pricing (10+)', 'API access', 'Custom training'] },
    ],
    techStack: ['LlamaIndex', 'pgvector', 'OpenAI'],
    status: 'concept',
    score: 91,
  },
  ledger: {
    id: 'ledger',
    name: 'Ledger',
    description: 'Accounting Document Automation',
    industry: 'Accounting & Bookkeeping',
    targetCustomer: 'CPA firms, bookkeeping practices (5-50 staff)',
    pricingTiers: [
      { name: 'Starter', priceMonthly: 199, features: ['Up to 50 clients', 'OCR extraction', 'QBO sync'] },
      { name: 'Growth', priceMonthly: 499, features: ['Up to 200 clients', 'Workflow automation', 'Client portal'] },
      { name: 'Enterprise', priceMonthly: 0, features: ['Custom pricing', 'API access', 'White-label'] },
    ],
    techStack: ['Tesseract', 'n8n', 'QuickBooks API', 'Xero API'],
    status: 'concept',
    score: 89,
  },
  vitals: {
    id: 'vitals',
    name: 'Vitals',
    description: 'Healthcare Clinic Operations',
    industry: 'Healthcare',
    targetCustomer: 'Independent practices, specialty clinics',
    pricingTiers: [
      { name: 'Practice', priceMonthly: 299, features: ['Basic dashboards', 'Claim tracking', 'Alerts'] },
      { name: 'Clinic', priceMonthly: 599, features: ['Advanced analytics', 'EMR integrations', 'Staff metrics'] },
      { name: 'Network', priceMonthly: 0, features: ['Multi-location', 'Custom dashboards', 'HIPAA BAA'] },
    ],
    techStack: ['Grafana', 'OpenTelemetry', 'HL7 FHIR'],
    status: 'concept',
    score: 87,
  },
  harvest: {
    id: 'harvest',
    name: 'Harvest',
    description: 'Agriculture Knowledge Assistant',
    industry: 'Agriculture',
    targetCustomer: 'Mid-size farms ($1M-$20M revenue), ag cooperatives',
    pricingTiers: [
      { name: 'Farm', priceMonthly: 149, features: ['Crop advisor', 'Weather integration', 'Equipment manuals'] },
      { name: 'Ranch', priceMonthly: 299, features: ['Compliance docs', 'Market insights', 'Multi-farm'] },
      { name: 'Cooperative', priceMonthly: 0, features: ['Custom knowledge base', 'API access', 'Member portal'] },
    ],
    techStack: ['Qdrant', 'LlamaIndex', 'Weather APIs', 'USDA APIs'],
    status: 'concept',
    score: 85,
  },
  shield: {
    id: 'shield',
    name: 'Shield',
    description: 'Insurance Policy Administration',
    industry: 'Insurance',
    targetCustomer: 'Independent agencies, MGAs',
    pricingTiers: [
      { name: 'Agency', priceMonthly: 499, features: ['Policy lifecycle', 'Commission tracking', 'Basic workflows'] },
      { name: 'MGA', priceMonthly: 1499, features: ['Underwriting workflows', 'Carrier integrations', 'Compliance'] },
      { name: 'Enterprise', priceMonthly: 0, features: ['Custom workflows', 'API access', 'Audit trails'] },
    ],
    techStack: ['Temporal', 'n8n', 'PostgreSQL'],
    status: 'concept',
    score: 84,
  },
  foundry: {
    id: 'foundry',
    name: 'Foundry',
    description: 'Manufacturing Shop Analytics',
    industry: 'Manufacturing',
    targetCustomer: 'Job shops, CNC shops, metal fabricators',
    pricingTiers: [
      { name: 'Shop', priceMonthly: 299, features: ['Job profitability', 'Machine utilization', 'Basic dashboards'] },
      { name: 'Factory', priceMonthly: 799, features: ['IoT integration', 'Scrap tracking', 'Custom KPIs'] },
      { name: 'Enterprise', priceMonthly: 0, features: ['Multi-plant', 'ERP integration', 'Predictive analytics'] },
    ],
    techStack: ['Superset', 'TimescaleDB', 'IoT protocols'],
    status: 'concept',
    score: 83,
  },
  dwelling: {
    id: 'dwelling',
    name: 'Dwelling',
    description: 'Property Management Portal',
    industry: 'Real Estate',
    targetCustomer: 'Property managers (50-500 units)',
    pricingTiers: [
      { name: 'Starter', priceMonthly: 0, features: ['$2/unit', 'Tenant portal', 'Maintenance requests'] },
      { name: 'Pro', priceMonthly: 0, features: ['$3/unit', 'Payments', 'Document sharing', 'Analytics'] },
      { name: 'Enterprise', priceMonthly: 0, features: ['$5/unit', 'White-label', 'API access'] },
    ],
    techStack: ['Supabase', 'Next.js', 'Stripe'],
    status: 'concept',
    score: 82,
  },
  freight: {
    id: 'freight',
    name: 'Freight',
    description: 'Logistics Document Processing',
    industry: 'Logistics & Freight',
    targetCustomer: '3PLs, freight brokers, warehouse operators',
    pricingTiers: [
      { name: 'Broker', priceMonthly: 499, features: ['BOL processing', 'POD capture', 'Basic validation'] },
      { name: 'Carrier', priceMonthly: 999, features: ['Customs docs', 'Exception handling', 'TMS integration'] },
      { name: 'Enterprise', priceMonthly: 0, features: ['Custom workflows', 'API access', 'Volume pricing'] },
    ],
    techStack: ['n8n', 'Tesseract', 'AWS Textract'],
    status: 'concept',
    score: 81,
  },
  scribe: {
    id: 'scribe',
    name: 'Scribe',
    description: 'Medical Transcription',
    industry: 'Healthcare',
    targetCustomer: 'Physicians, specialty practices',
    pricingTiers: [
      { name: 'Solo', priceMonthly: 299, features: ['Per provider', 'Basic transcription', 'Note templates'] },
      { name: 'Practice', priceMonthly: 499, features: ['Per provider', 'EMR integration', 'Specialty templates'] },
      { name: 'Network', priceMonthly: 0, features: ['Custom pricing', 'Custom training', 'API access'] },
    ],
    techStack: ['Whisper', 'LangChain', 'HL7 FHIR'],
    status: 'concept',
    score: 80,
  },
  sentinel: {
    id: 'sentinel',
    name: 'Sentinel',
    description: 'Financial Compliance Monitoring',
    industry: 'Financial Services',
    targetCustomer: 'RIAs, broker-dealers, fintech startups',
    pricingTiers: [
      { name: 'Startup', priceMonthly: 299, features: ['Regulatory alerts', 'Basic monitoring', 'Audit trail'] },
      { name: 'Professional', priceMonthly: 799, features: ['Custom rules', 'Integrations', 'Reporting'] },
      { name: 'Enterprise', priceMonthly: 0, features: ['Custom dashboards', 'API access', 'Dedicated support'] },
    ],
    techStack: ['Grafana', 'Custom scrapers', 'PostgreSQL'],
    status: 'concept',
    score: 78,
  },
  fleet: {
    id: 'fleet',
    name: 'Fleet',
    description: 'Equipment Maintenance Prediction',
    industry: 'Fleet / Heavy Equipment',
    targetCustomer: 'Fleet operators, equipment rental, construction',
    pricingTiers: [
      { name: 'Fleet', priceMonthly: 0, features: ['$10/asset', 'Maintenance scheduling', 'Basic analytics'] },
      { name: 'Enterprise', priceMonthly: 0, features: ['$15/asset', 'Predictive maintenance', 'IoT integration'] },
      { name: 'Custom', priceMonthly: 0, features: ['Volume pricing', 'Custom ML models', 'API access'] },
    ],
    techStack: ['TimescaleDB', 'ML models', 'IoT protocols'],
    status: 'concept',
    score: 77,
  },
  grant: {
    id: 'grant',
    name: 'Grant',
    description: 'Nonprofit Grant Assistant',
    industry: 'Nonprofits / Education',
    targetCustomer: 'Nonprofits, universities, research institutions',
    pricingTiers: [
      { name: 'Starter', priceMonthly: 99, features: ['Grant search', 'Deadline tracking', 'Basic templates'] },
      { name: 'Organization', priceMonthly: 299, features: ['AI writing assist', 'Collaboration', 'Reporting'] },
      { name: 'Enterprise', priceMonthly: 0, features: ['Custom training', 'API access', 'Multi-org'] },
    ],
    techStack: ['LlamaIndex', 'RAG', 'PostgreSQL'],
    status: 'concept',
    score: 76,
  },
  sustain: {
    id: 'sustain',
    name: 'Sustain',
    description: 'ESG Reporting Automation',
    industry: 'Manufacturing / Industrial',
    targetCustomer: 'Manufacturers, energy companies, public companies',
    pricingTiers: [
      { name: 'Starter', priceMonthly: 499, features: ['Data collection', 'Basic frameworks', 'Templates'] },
      { name: 'Professional', priceMonthly: 999, features: ['Multiple frameworks', 'Automation', 'Analytics'] },
      { name: 'Enterprise', priceMonthly: 0, features: ['Custom frameworks', 'Audit support', 'API access'] },
    ],
    techStack: ['Superset', 'Data pipelines', 'PostgreSQL'],
    status: 'concept',
    score: 75,
  },
  molar: {
    id: 'molar',
    name: 'Molar',
    description: 'Dental Practice Analytics',
    industry: 'Dental',
    targetCustomer: 'Dental practices, DSOs',
    pricingTiers: [
      { name: 'Practice', priceMonthly: 199, features: ['Production metrics', 'Patient analytics', 'Basic dashboards'] },
      { name: 'Multi-Location', priceMonthly: 499, features: ['Benchmarking', 'Custom KPIs', 'Staff metrics'] },
      { name: 'DSO', priceMonthly: 0, features: ['Portfolio analytics', 'Custom integrations', 'API access'] },
    ],
    techStack: ['Superset', 'Dental software APIs', 'PostgreSQL'],
    status: 'concept',
    score: 74,
  },
};

export function getVertical(id: string): VerticalConfig | undefined {
  return VERTICALS[id];
}

export function getVerticalsByStatus(status: VerticalConfig['status']): VerticalConfig[] {
  return Object.values(VERTICALS).filter((v) => v.status === status);
}

export function getVerticalsByScore(minScore: number): VerticalConfig[] {
  return Object.values(VERTICALS)
    .filter((v) => (v.score ?? 0) >= minScore)
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
}
