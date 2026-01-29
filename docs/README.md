# Project Tributaries Documentation

## Overview

This documentation covers the architecture, implementation, and operational aspects of Project Tributaries—a portfolio of 15 vertical SaaS products built on shared open-source infrastructure.

## Documentation Structure

```
docs/
├── analysis/              # Market research and opportunity analysis
│   └── opportunity-analysis.md   # Original 15-vertical assessment
├── architecture/          # Technical architecture decisions
│   ├── shared-infrastructure.md  # Common components
│   ├── database-design.md        # Data modeling patterns
│   └── security.md               # Security architecture
├── verticals/            # Per-vertical documentation
│   ├── forge.md          # Construction Progress Billing
│   ├── counsel.md        # Legal Contract Intelligence
│   └── ...               # (13 more verticals)
├── playbooks/            # Operational guides
│   ├── deployment.md     # Deployment procedures
│   ├── monitoring.md     # Observability setup
│   └── incident-response.md
├── api/                  # API documentation
│   ├── shared-api.md     # Common API patterns
│   └── per-vertical/     # Vertical-specific APIs
└── guides/               # How-to guides
    ├── new-vertical.md   # Adding a new vertical
    ├── shared-package.md # Creating shared packages
    └── experiment.md     # Running validation experiments
```

## Quick Links

- [Opportunity Analysis](./analysis/opportunity-analysis.md) - Original market assessment
- [Architecture Overview](./architecture/README.md) - System design
- [Deployment Guide](./playbooks/deployment.md) - Getting to production

## Contributing to Docs

Documentation follows these principles:

1. **Living documents**: Update as code changes
2. **Code examples**: Include working snippets
3. **Cross-references**: Link related docs
4. **Searchable**: Use clear headings and keywords

Use markdown. Keep it concise. Update often.
