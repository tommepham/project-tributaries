# Forge

Construction Progress Billing Automation

## Overview

Forge automates the most painful parts of construction financial workflows:

- **AIA Billing**: Auto-generate G702/G703 forms from project data
- **Change Order Tracking**: Never miss billing for approved changes
- **Subcontractor Pay Apps**: Portal for subs to submit; AI extracts data
- **Accounting Sync**: Integrates with QuickBooks and Sage

## Target Customer

- General contractors ($10M-$100M revenue)
- Specialty contractors with complex billing
- CFOs/Controllers frustrated with month-end close

## Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS
- **Backend**: Next.js API routes, tRPC
- **Database**: PostgreSQL (shared infrastructure)
- **AI**: OCR for pay app extraction, LLM for data validation
- **Integrations**: Procore, Buildertrend, QuickBooks, Sage

## Getting Started

```bash
# From monorepo root
pnpm install

# Start development
pnpm --filter @tributaries/forge dev

# Run tests
pnpm --filter @tributaries/forge test

# Database migrations
pnpm --filter @tributaries/forge db:migrate
```

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

```
DATABASE_URL=postgresql://...
CLERK_SECRET_KEY=...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
```

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # Forge-specific components
├── hooks/              # Custom React hooks
├── lib/                # Utilities and schema
├── services/           # Business logic
└── types/              # TypeScript types
```

## Key Features

### 1. Project Setup
Import from Procore/Buildertrend or create manually with schedule of values.

### 2. Pay App Portal
Branded portal for subcontractors. Upload documents, AI extracts line items.

### 3. AIA Generation
One-click generation of compliant G702/G703 forms with all change orders.

### 4. Approval Workflow
Review, approve, and track payments through the full billing cycle.

## Experiment Status

| Metric | Target | Current |
|--------|--------|---------|
| Waitlist Signups | 100 | 0 |
| Demo Requests | 20 | 0 |
| LOIs Signed | 5 | 0 |
| Design Partners | 3 | 0 |

## Pricing (Proposed)

- **Starter**: $499/mo (up to 10 active projects)
- **Growth**: $999/mo (up to 50 projects)
- **Enterprise**: $2,500/mo (unlimited)

## Resources

- [Opportunity Analysis](../../docs/analysis/opportunity-analysis.md)
- [Technical Architecture](../../docs/architecture/)
- [CFMA Resources](https://www.cfma.org/)
