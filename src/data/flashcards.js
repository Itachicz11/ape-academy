import { greekCards, strategyCards, glossaryTerms, commonMistakes } from './library';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildGreekCards() {
  return greekCards.map((g, i) => ({
    id: `greek-${i}`,
    category: 'greeks',
    front: { title: `${g.symbol} ${g.name}` },
    back: {
      lines: [
        g.definition,
        `Range: ${g.range}`,
        `Buyers: ${g.buyerEffect}`,
        `Sellers: ${g.sellerEffect}`,
        g.mnemonic,
      ],
    },
  }));
}

function buildStrategyCards() {
  return strategyCards.map((s, i) => ({
    id: `strategy-${i}`,
    category: 'strategies',
    front: { title: s.name },
    back: {
      lines: [
        `Legs: ${s.legs}`,
        `Max Profit: ${s.maxProfit}`,
        `Max Loss: ${s.maxLoss}`,
        `Breakeven: ${s.breakeven}`,
        `Best When: ${s.bestWhen}`,
      ],
    },
  }));
}

function buildGlossaryCards() {
  return glossaryTerms.map((g, i) => ({
    id: `glossary-${i}`,
    category: 'glossary',
    front: { title: g.term },
    back: { lines: [g.definition] },
  }));
}

function buildMistakeCards() {
  return commonMistakes.map((m, i) => ({
    id: `mistake-${i}`,
    category: 'mistakes',
    front: { title: m.title, subtitle: '\u26A0 Common Mistake' },
    back: { lines: [m.description, `Fix: ${m.fix}`] },
  }));
}

const builders = {
  greeks: buildGreekCards,
  strategies: buildStrategyCards,
  glossary: buildGlossaryCards,
  mistakes: buildMistakeCards,
};

export function buildDeck(category) {
  if (category && category !== 'all') {
    return shuffle(builders[category]());
  }
  return shuffle([
    ...buildGreekCards(),
    ...buildStrategyCards(),
    ...buildGlossaryCards(),
    ...buildMistakeCards(),
  ]);
}

export const deckCounts = {
  greeks: greekCards.length,
  strategies: strategyCards.length,
  glossary: glossaryTerms.length,
  mistakes: commonMistakes.length,
  all: greekCards.length + strategyCards.length + glossaryTerms.length + commonMistakes.length,
};
