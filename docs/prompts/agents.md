# Project Tributaries - Agent Initialization

> **FOR NEXT SESSION**: Read this document first. Your job is to continue building Project Tributaries:

docs\prompts\Agent Initialization Prompt.md

---

## Mission

Explore, validate, and develop 15 vertical SaaS opportunities simultaneously, each built on open-source infrastructure. Run as parallel experiments with shared resources. Let market signal determine which tributaries become rivers.

## Core Principles

1. **Shared Infrastructure**: Common auth, billing, deployment, monitoring
2. **Parallel Validation**: All 15 run lightweight market tests concurrently
3. **Resource Fluidity**: Effort flows toward signal, away from silence
4. **Compound Learning**: Insights from one vertical inform all others
5. **Speed Over Perfection**: Functional MVPs beat polished vaporware

---

## Current State (as of initialization)

### Completed
- [x] Monorepo structure with pnpm workspaces + Turborepo
- [x] 11 shared packages: auth, billing, ui, ai, ocr, workflow, database, analytics, config, types, integrations
- [x] Forge (Construction) vertical fully templated as reference
- [x] CI/CD pipelines (GitHub Actions)
- [x] Docker Compose for local development
- [x] Terraform templates for AWS
- [x] Experiment tracking system
- [x] Repository pushed to GitHub: https://github.com/tommepham/project-tributaries

### The 15 Verticals

| Rank | Codename | Industry | Focus | Score |
|------|----------|----------|-------|-------|
| 1 | `forge` | Construction | Progress Billing Automation | 94 |
| 2 | `counsel` | Legal | Contract Intelligence | 91 |
| 3 | `ledger` | Accounting | Document Automation | 89 |
| 4 | `vitals` | Healthcare | Clinic Operations | 87 |
| 5 | `harvest` | Agriculture | Knowledge Assistant | 85 |
| 6 | `shield` | Insurance | Policy Administration | 84 |
| 7 | `foundry` | Manufacturing | Shop Analytics | 83 |
| 8 | `dwelling` | Property | Management Portal | 82 |
| 9 | `freight` | Logistics | Document Processing | 81 |
| 10 | `scribe` | Medical | Transcription | 80 |
| 11 | `sentinel` | Financial | Compliance Monitoring | 78 |
| 12 | `fleet` | Equipment | Maintenance Prediction | 77 |
| 13 | `grant` | Nonprofit | Grant Assistant | 76 |
| 14 | `sustain` | Industrial | ESG Reporting | 75 |
| 15 | `molar` | Dental | Practice Analytics | 74 |

---

## Your Directives

### Phase 1: Validation Sprint (Recommended Next Steps)

1. **Launch Landing Pages** for top 3 verticals (forge, counsel, ledger)
   - Use the Forge template in `apps/forge` as reference
   - Deploy to Vercel
   - Set up analytics tracking

2. **Customer Discovery**
   - Use interview templates in `experiments/templates/`
   - Target 20 interviews per vertical
   - Document in `experiments/{vertical}/`

3. **Collect LOIs**
   - Present pricing to interested prospects
   - Target 5 LOIs totaling $50k+ committed ARR per vertical

### Phase 2: MVP Development

Focus resources on vertical(s) with strongest signal:
- Implement core workflow for one use case
- Integrate with primary data source
- Ship to design partners

### Key Commands

```bash
# Start development
cd project-tributaries
pnpm install
pnpm --filter @tributaries/forge dev

# Check vertical status
node scripts/vertical-status.js

# Create new experiment
node scripts/new-experiment.js forge landing-page

# Deploy
pnpm --filter @tributaries/forge build
```

---

## Key Resources

- **Opportunity Analysis**: `docs/analysis/opportunity-analysis.md`
- **Vertical Configs**: `packages/config/src/verticals.ts`
- **Shared Components**: `packages/ui/`, `packages/ai/`, `packages/ocr/`
- **Experiment Tracking**: `experiments/README.md`

---

## Decision Framework

When deciding where to invest effort:

1. **Signal > Noise**: Follow customer interest, not assumptions
2. **Revenue > Vanity**: Paying customers > waitlist signups
3. **Speed > Perfection**: Ship weekly, learn daily
4. **Depth > Breadth**: Better to nail one vertical than dabble in all

---

## Remember

> "The riches are in the niches. The tools are free. The timing is now."

Your job is to turn these tributaries into rivers. Start with validation, follow the signal, and build what customers will pay for.


