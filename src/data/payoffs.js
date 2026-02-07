const strategies = [
  {
    id: 'long-call',
    name: 'Long Call',
    description: 'Buy a call option. Bullish bet with unlimited upside, limited downside (premium paid).',
    legs: [{ type: 'call', direction: 'buy', strike: 50, premium: 3 }],
    defaultRange: [35, 65],
  },
  {
    id: 'long-put',
    name: 'Long Put',
    description: 'Buy a put option. Bearish bet with large profit potential if stock drops, limited loss (premium paid).',
    legs: [{ type: 'put', direction: 'buy', strike: 50, premium: 3 }],
    defaultRange: [35, 65],
  },
  {
    id: 'covered-call',
    name: 'Covered Call',
    description: 'Own shares + sell a call. Collect premium but cap upside. Best in sideways markets.',
    legs: [
      { type: 'stock', direction: 'buy', strike: 50, premium: 0 },
      { type: 'call', direction: 'sell', strike: 55, premium: 2 },
    ],
    defaultRange: [35, 70],
  },
  {
    id: 'cash-secured-put',
    name: 'Cash-Secured Put',
    description: 'Sell a put with cash to cover assignment. Get paid to set a limit buy order.',
    legs: [{ type: 'put', direction: 'sell', strike: 50, premium: 3 }],
    defaultRange: [35, 65],
  },
  {
    id: 'bull-call-spread',
    name: 'Bull Call Spread',
    description: 'Buy lower-strike call, sell higher-strike call. Defined risk bullish play.',
    legs: [
      { type: 'call', direction: 'buy', strike: 50, premium: 4 },
      { type: 'call', direction: 'sell', strike: 55, premium: 2 },
    ],
    defaultRange: [40, 65],
  },
  {
    id: 'bear-put-spread',
    name: 'Bear Put Spread',
    description: 'Buy higher-strike put, sell lower-strike put. Defined risk bearish play.',
    legs: [
      { type: 'put', direction: 'buy', strike: 50, premium: 4 },
      { type: 'put', direction: 'sell', strike: 45, premium: 2 },
    ],
    defaultRange: [35, 60],
  },
  {
    id: 'iron-condor',
    name: 'Iron Condor',
    description: 'Sell OTM call spread + sell OTM put spread. Profit when stock stays in range. Theta gang favorite.',
    legs: [
      { type: 'put', direction: 'sell', strike: 45, premium: 1.5 },
      { type: 'put', direction: 'buy', strike: 40, premium: 0.5 },
      { type: 'call', direction: 'sell', strike: 55, premium: 1.5 },
      { type: 'call', direction: 'buy', strike: 60, premium: 0.5 },
    ],
    defaultRange: [30, 70],
  },
  {
    id: 'straddle',
    name: 'Long Straddle',
    description: 'Buy ATM call + ATM put at same strike. Bet on big move in either direction.',
    legs: [
      { type: 'call', direction: 'buy', strike: 50, premium: 3 },
      { type: 'put', direction: 'buy', strike: 50, premium: 3 },
    ],
    defaultRange: [35, 65],
  },
  {
    id: 'long-strangle',
    name: 'Long Strangle',
    description: 'Buy OTM call + OTM put at different strikes. Cheaper than straddle but needs a bigger move to profit.',
    legs: [
      { type: 'call', direction: 'buy', strike: 55, premium: 1.5 },
      { type: 'put', direction: 'buy', strike: 45, premium: 1.5 },
    ],
    defaultRange: [30, 70],
  },
  {
    id: 'bull-put-spread',
    name: 'Bull Put Spread',
    description: 'Sell higher-strike put + buy lower-strike put for a net credit. Bullish defined-risk play. Theta gang staple.',
    legs: [
      { type: 'put', direction: 'sell', strike: 50, premium: 4 },
      { type: 'put', direction: 'buy', strike: 45, premium: 2 },
    ],
    defaultRange: [35, 60],
  },
  {
    id: 'bear-call-spread',
    name: 'Bear Call Spread',
    description: 'Sell lower-strike call + buy higher-strike call for a net credit. Bearish defined-risk play.',
    legs: [
      { type: 'call', direction: 'sell', strike: 50, premium: 4 },
      { type: 'call', direction: 'buy', strike: 55, premium: 2 },
    ],
    defaultRange: [40, 65],
  },
  {
    id: 'butterfly',
    name: 'Long Call Butterfly',
    description: 'Buy 1 lower call + sell 2 middle calls + buy 1 higher call. Profits when stock pins near middle strike.',
    legs: [
      { type: 'call', direction: 'buy', strike: 45, premium: 7 },
      { type: 'call', direction: 'sell', strike: 50, premium: 4 },
      { type: 'call', direction: 'sell', strike: 50, premium: 4 },
      { type: 'call', direction: 'buy', strike: 55, premium: 2 },
    ],
    defaultRange: [35, 65],
  },
  {
    id: 'ratio-call-spread',
    name: '1:2 Call Ratio Spread',
    description: 'Buy 1 ATM call, sell 2 OTM calls. Cheap or free entry but naked upside risk beyond the short strikes.',
    legs: [
      { type: 'call', direction: 'buy', strike: 50, premium: 4 },
      { type: 'call', direction: 'sell', strike: 55, premium: 2 },
      { type: 'call', direction: 'sell', strike: 55, premium: 2 },
    ],
    defaultRange: [40, 70],
  },
  {
    id: 'jade-lizard',
    name: 'Jade Lizard',
    description: 'Short put + short call spread. Credit exceeds call spread width, eliminating upside risk. Downside risk below put strike minus credit.',
    legs: [
      { type: 'put', direction: 'sell', strike: 45, premium: 3 },
      { type: 'call', direction: 'sell', strike: 55, premium: 2.5 },
      { type: 'call', direction: 'buy', strike: 60, premium: 1 },
    ],
    defaultRange: [30, 70],
  },
  {
    id: 'broken-wing-butterfly',
    name: 'Broken-Wing Butterfly',
    description: 'Butterfly with unequal wings. Can enter for a credit but accepts risk on the wider side. Directional lean.',
    legs: [
      { type: 'put', direction: 'buy', strike: 40, premium: 1 },
      { type: 'put', direction: 'sell', strike: 50, premium: 4 },
      { type: 'put', direction: 'sell', strike: 50, premium: 4 },
      { type: 'put', direction: 'buy', strike: 55, premium: 6 },
    ],
    defaultRange: [30, 65],
  },
];

export default strategies;
