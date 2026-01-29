# Project Tributaries

> Explore, validate, and develop 15 vertical SaaS opportunities simultaneously, each built on open-source infrastructure.

## Mission

Run 15 parallel experiments with shared resources. Let market signal determine which tributaries become rivers.

## Core Principles

1. **Shared Infrastructure**: Common auth, billing, deployment, monitoring
2. **Parallel Validation**: All 15 run lightweight market tests concurrently
3. **Resource Fluidity**: Effort flows toward signal, away from silence
4. **Compound Learning**: Insights from one vertical inform all others
5. **Speed Over Perfection**: Functional MVPs beat polished vaporware

## The Verticals

| Codename | Industry | Focus |
|----------|----------|-------|
| `forge` | Construction | Progress Billing Automation |
| `counsel` | Legal | Contract Intelligence |
| `ledger` | Accounting | Document Automation |
| `vitals` | Healthcare | Clinic Operations |
| `harvest` | Agriculture | Knowledge Assistant |
| `shield` | Insurance | Policy Administration |
| `foundry` | Manufacturing | Shop Analytics |
| `dwelling` | Property | Management Portal |
| `freight` | Logistics | Document Processing |
| `scribe` | Medical | Transcription |
| `sentinel` | Financial | Compliance Monitoring |
| `fleet` | Equipment | Maintenance Prediction |
| `grant` | Nonprofit | Grant Assistant |
| `sustain` | Industrial | ESG Reporting |
| `molar` | Dental | Practice Analytics |

## Repository Structure

```
project-tributaries/
├── apps/                    # 15 vertical applications
│   ├── forge/               # Construction Progress Billing
│   ├── counsel/             # Legal Contract Intelligence
│   └── ...                  # (13 more verticals)
├── packages/                # Shared infrastructure
│   ├── auth/                # Authentication (Clerk/Auth.js)
│   ├── billing/             # Stripe integration
│   ├── ui/                  # Shared components
│   ├── integrations/        # Third-party connectors
│   ├── ai/                  # LLM utilities
│   ├── ocr/                 # Document processing
│   ├── workflow/            # Automation engine
│   ├── database/            # DB utilities
│   ├── config/              # Shared configs
│   ├── types/               # TypeScript types
│   └── analytics/           # Experiment tracking
├── infrastructure/          # IaC & deployment
├── docs/                    # Documentation
├── experiments/             # Validation tracking
└── .github/                 # CI/CD
```

## Quick Start

```bash
# Install dependencies
pnpm install

# Start a specific vertical
pnpm --filter forge dev

# Run all tests
pnpm test

# Check vertical status
pnpm vertical:status
```

## Development Workflow

### Starting a New Vertical Sprint

1. Review current experiment metrics in `experiments/`
2. Pick vertical with strongest signal
3. Run `pnpm --filter <vertical> dev`
4. Ship daily, measure weekly

### Adding Shared Functionality

1. Identify pattern used in 2+ verticals
2. Extract to appropriate package in `packages/`
3. Update imports in consuming apps
4. Document in `docs/architecture/`

## Technology Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14, React, Tailwind CSS |
| Backend | Node.js, tRPC/Hono |
| Database | PostgreSQL + pgvector |
| Auth | Clerk or Auth.js |
| Payments | Stripe |
| AI/ML | OpenAI, LlamaIndex, LangChain |
| OCR | Tesseract, PaddleOCR |
| Workflow | n8n, Temporal |
| Observability | OpenTelemetry, Grafana |
| Infrastructure | Docker, Kubernetes, Terraform |

## Experiment Tracking

Each vertical tracks key metrics:

- **Waitlist signups**: Interest validation
- **Demo requests**: Purchase intent
- **LOIs signed**: Revenue commitment
- **Time to first value**: Product-market fit

See `experiments/README.md` for tracking methodology.

## Contributing

This is a private monorepo. All team members can contribute to any vertical or shared package. Follow the patterns established in existing code.

## License

Proprietary - All Rights Reserved
