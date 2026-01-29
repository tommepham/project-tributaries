# Experiment Tracking

This directory contains validation experiments for all 15 verticals.

## Philosophy

**Speed > Perfection**

Each vertical runs lightweight market tests before significant development investment. We validate:

1. **Problem existence**: Do customers actually have this pain?
2. **Willingness to pay**: Will they pay for a solution?
3. **Channel viability**: Can we reach them efficiently?

## Experiment Types

### 1. Landing Page Test
- Ship a landing page describing the solution
- Measure: visitors, signups, demo requests
- Target: 10% conversion to waitlist

### 2. Customer Discovery
- Conduct 20+ problem interviews
- Measure: pain score (1-10), budget confirmation
- Target: Average pain score > 7

### 3. Letter of Intent
- Present pricing to interested prospects
- Measure: LOIs signed, committed ARR
- Target: 5 LOIs totaling $50k+ ARR

### 4. Smoke Test
- Pre-sell before building
- Measure: credit card on file, deposits
- Target: 3+ paying design partners

## Directory Structure

```
experiments/
├── templates/           # Experiment templates
│   ├── landing-page.md
│   ├── customer-interview.md
│   └── loi-template.md
├── metrics/            # Tracking dashboards
│   └── weekly-report.md
└── [vertical]/         # Per-vertical experiment logs
    ├── hypothesis.md
    ├── interviews/
    └── results.md
```

## Weekly Review Process

Every Friday:

1. Update metrics for all active experiments
2. Compare against targets
3. Decide: double down, pivot, or pause
4. Reallocate resources to highest-signal verticals

## Metrics Dashboard

| Vertical | Waitlist | Demos | LOIs | Score | Status |
|----------|----------|-------|------|-------|--------|
| forge | 0 | 0 | 0 | 94 | planned |
| counsel | 0 | 0 | 0 | 91 | planned |
| ledger | 0 | 0 | 0 | 89 | planned |
| vitals | 0 | 0 | 0 | 87 | planned |
| harvest | 0 | 0 | 0 | 85 | planned |
| shield | 0 | 0 | 0 | 84 | planned |
| foundry | 0 | 0 | 0 | 83 | planned |
| dwelling | 0 | 0 | 0 | 82 | planned |
| freight | 0 | 0 | 0 | 81 | planned |
| scribe | 0 | 0 | 0 | 80 | planned |
| sentinel | 0 | 0 | 0 | 78 | planned |
| fleet | 0 | 0 | 0 | 77 | planned |
| grant | 0 | 0 | 0 | 76 | planned |
| sustain | 0 | 0 | 0 | 75 | planned |
| molar | 0 | 0 | 0 | 74 | planned |

## Resources

- [Opportunity Analysis](../docs/analysis/opportunity-analysis.md)
- [The Mom Test](https://www.momtestbook.com/) - Customer interview best practices
- [Running Lean](https://leanstack.com/running-lean-book) - Validation methodology
