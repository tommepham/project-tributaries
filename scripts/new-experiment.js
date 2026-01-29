#!/usr/bin/env node

/**
 * Create a new experiment for a vertical
 * Usage: node scripts/new-experiment.js <vertical> <experiment-type>
 */

const fs = require('fs');
const path = require('path');

const EXPERIMENT_TYPES = ['landing-page', 'customer-interview', 'loi', 'smoke-test'];

const VERTICALS = [
  'forge', 'counsel', 'ledger', 'vitals', 'harvest',
  'shield', 'foundry', 'dwelling', 'freight', 'scribe',
  'sentinel', 'fleet', 'grant', 'sustain', 'molar'
];

function main() {
  const [,, vertical, experimentType] = process.argv;

  if (!vertical || !experimentType) {
    console.log('Usage: node scripts/new-experiment.js <vertical> <experiment-type>');
    console.log(`\nVerticals: ${VERTICALS.join(', ')}`);
    console.log(`Experiment types: ${EXPERIMENT_TYPES.join(', ')}`);
    process.exit(1);
  }

  if (!VERTICALS.includes(vertical)) {
    console.error(`Unknown vertical: ${vertical}`);
    console.log(`Available: ${VERTICALS.join(', ')}`);
    process.exit(1);
  }

  if (!EXPERIMENT_TYPES.includes(experimentType)) {
    console.error(`Unknown experiment type: ${experimentType}`);
    console.log(`Available: ${EXPERIMENT_TYPES.join(', ')}`);
    process.exit(1);
  }

  const experimentDir = path.join(__dirname, '..', 'experiments', vertical);
  const experimentFile = path.join(experimentDir, `${experimentType}-${Date.now()}.md`);

  // Create vertical directory if needed
  if (!fs.existsSync(experimentDir)) {
    fs.mkdirSync(experimentDir, { recursive: true });
  }

  // Copy template
  const templatePath = path.join(__dirname, '..', 'experiments', 'templates', `${experimentType}.md`);

  if (fs.existsSync(templatePath)) {
    let content = fs.readFileSync(templatePath, 'utf-8');
    content = content.replace(/\[NAME\]/g, vertical);
    content = content.replace(/\[DATE\]/g, new Date().toISOString().split('T')[0]);
    fs.writeFileSync(experimentFile, content);
    console.log(`Created experiment: ${experimentFile}`);
  } else {
    // Create basic experiment file
    const content = `# ${experimentType} Experiment - ${vertical}

Created: ${new Date().toISOString()}

## Hypothesis


## Metrics

| Metric | Target | Actual |
|--------|--------|--------|
| | | |

## Results


## Decision

`;
    fs.writeFileSync(experimentFile, content);
    console.log(`Created experiment: ${experimentFile}`);
  }
}

main();
