#!/usr/bin/env node

/**
 * Display status of all verticals
 * Usage: node scripts/vertical-status.js
 */

const VERTICALS = {
  forge: { name: 'Forge', industry: 'Construction', score: 94, status: 'concept' },
  counsel: { name: 'Counsel', industry: 'Legal', score: 91, status: 'concept' },
  ledger: { name: 'Ledger', industry: 'Accounting', score: 89, status: 'concept' },
  vitals: { name: 'Vitals', industry: 'Healthcare', score: 87, status: 'concept' },
  harvest: { name: 'Harvest', industry: 'Agriculture', score: 85, status: 'concept' },
  shield: { name: 'Shield', industry: 'Insurance', score: 84, status: 'concept' },
  foundry: { name: 'Foundry', industry: 'Manufacturing', score: 83, status: 'concept' },
  dwelling: { name: 'Dwelling', industry: 'Property', score: 82, status: 'concept' },
  freight: { name: 'Freight', industry: 'Logistics', score: 81, status: 'concept' },
  scribe: { name: 'Scribe', industry: 'Healthcare', score: 80, status: 'concept' },
  sentinel: { name: 'Sentinel', industry: 'Financial', score: 78, status: 'concept' },
  fleet: { name: 'Fleet', industry: 'Equipment', score: 77, status: 'concept' },
  grant: { name: 'Grant', industry: 'Nonprofit', score: 76, status: 'concept' },
  sustain: { name: 'Sustain', industry: 'Industrial', score: 75, status: 'concept' },
  molar: { name: 'Molar', industry: 'Dental', score: 74, status: 'concept' },
};

function getStatusEmoji(status) {
  switch (status) {
    case 'live': return '🟢';
    case 'beta': return '🟡';
    case 'building': return '🔨';
    case 'validating': return '🔬';
    case 'concept': return '💡';
    default: return '⚪';
  }
}

function main() {
  console.log('\n📊 Project Tributaries - Vertical Status\n');
  console.log('═'.repeat(70));
  console.log(
    'Rank'.padEnd(6) +
    'Status'.padEnd(8) +
    'Vertical'.padEnd(12) +
    'Industry'.padEnd(16) +
    'Score'.padEnd(8) +
    'Phase'
  );
  console.log('─'.repeat(70));

  const sorted = Object.entries(VERTICALS)
    .sort((a, b) => b[1].score - a[1].score);

  sorted.forEach(([id, v], index) => {
    console.log(
      `#${index + 1}`.padEnd(6) +
      getStatusEmoji(v.status).padEnd(8) +
      v.name.padEnd(12) +
      v.industry.padEnd(16) +
      v.score.toString().padEnd(8) +
      v.status
    );
  });

  console.log('═'.repeat(70));
  console.log('\nLegend: 🟢 Live | 🟡 Beta | 🔨 Building | 🔬 Validating | 💡 Concept\n');

  // Summary stats
  const stats = Object.values(VERTICALS).reduce((acc, v) => {
    acc[v.status] = (acc[v.status] || 0) + 1;
    return acc;
  }, {});

  console.log('Summary:');
  Object.entries(stats).forEach(([status, count]) => {
    console.log(`  ${getStatusEmoji(status)} ${status}: ${count}`);
  });
  console.log('');
}

main();
