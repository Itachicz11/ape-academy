# Ape Academy — Project Guide

Options trading education app. React + Vite + Firebase. Mobile-first PWA (max 430px).

## Voice & Tone

The app speaks fluent WSB/Reddit finance culture. The goal is **genuinely educational content wrapped in meme-native language** — not "serious content with jokes bolted on."

### Core principles
- Explain first, joke second. The meme language IS the explanation, not decoration on top of it.
- Every explanation should leave the reader understanding the concept, not just laughing.
- Humor comes from shared experience ("RIP your premium") not from being random.
- Never condescending. The reader is an ape, but apes learn.

### Approved slang (use freely)
| Term | Meaning |
|------|---------|
| tendies | profits / XP / rewards |
| smooth brain | beginner / doesn't understand yet |
| wrinkled / wrinkle brain | learned / experienced |
| ape | the learner / community member |
| diamond hands | holding through adversity |
| paper hands | selling too early / giving up |
| wife's boyfriend | self-deprecating humor beat |
| moon / mooning | stock going up dramatically |
| to the moon | bullish excitement |
| stonks | stocks (ironic) |
| YOLO | all-in bet, concentrated position |
| FDs | far OTM short-dated options (risky bets) |
| theta gang | sellers who profit from time decay |
| 0DTE | zero days to expiration options |
| the way / this is the way | affirmation |
| GUH | expression of sudden loss |
| bags / holding bags | stuck in a losing position |
| degen / degenerate | experienced trader (term of endearment) |

### Slang to avoid
- Anything racist, sexist beyond the "wife's boyfriend" bit, or actually offensive
- Crypto-specific slang (HODL, WAGMI, rug pull) — this is options-focused
- Outdated memes that don't land anymore

### Tone calibration by context
| Context | Tone |
|---------|------|
| Question text | Clear, direct. Minimal slang. The question must be unambiguous. |
| Wrong answer options | 1-2 plausible distractors + 1 obviously wrong (humor OK here) |
| Explanations | Educational core with meme flavor. Front-load the concept, then the color. |
| Lesson titles | Punchy, memey. Hook the learner. |
| Lesson subtitles | One-liner with emoji. Sets expectation. |
| Library cards | Reference tone. Concise, factual. Light humor in mnemonics only. |
| Glossary | Textbook-clear definitions. No slang in the definition itself. |

---

## Content Schemas

### Lesson (`src/data/lessons.js`)
```js
{
  id: Number,           // sequential, starts at 1
  title: String,        // punchy, 3-6 words ("WTF is an Option?")
  subtitle: String,     // one-liner with optional emoji ("Baby's first derivative")
  xp: Number,           // see XP table below
  category: String,     // "basics" | "greeks" | "strategies"
  questions: [           // exactly 3 questions per lesson
    {
      question: String,  // clear, unambiguous question
      options: [         // exactly 4 options, exactly 1 correct
        { text: String, correct: Boolean }
      ],
      explanation: String // 2-4 sentences, educational + flavor
    }
  ]
}
```

### Greek Card (`src/data/library.js` — `greekCards`)
```js
{
  symbol: String,       // Greek letter character (Δ, Θ, Γ, V)
  name: String,         // full name
  definition: String,   // one sentence, plain English
  range: String,        // typical value ranges
  buyerEffect: String,  // what it means for option buyers
  sellerEffect: String, // what it means for option sellers
  mnemonic: String      // memory aid, light humor OK
}
```

### Strategy Card (`src/data/library.js` — `strategyCards`)
```js
{
  name: String,         // strategy name
  legs: String,         // human-readable leg description
  maxProfit: String,    // formula or "Unlimited"
  maxLoss: String,      // formula or description
  breakeven: String,    // breakeven formula
  bestWhen: String      // market condition, starts with sentiment
}
```

### Glossary Term (`src/data/library.js` — `glossaryTerms`)
```js
{
  term: String,         // term with abbreviation if applicable "ITM (In The Money)"
  definition: String    // clear, factual, no slang. 1-3 sentences.
}
```

### Payoff Strategy (`src/data/payoffs.js`)
```js
{
  id: String,           // kebab-case ("bull-call-spread")
  name: String,         // display name
  description: String,  // 1-2 sentences, what it does and when
  legs: [               // array of position legs
    {
      type: String,     // "call" | "put" | "stock"
      direction: String,// "buy" | "sell"
      strike: Number,   // strike price (use round numbers: 40, 45, 50, 55, 60)
      premium: Number   // premium per share
    }
  ],
  defaultRange: [Number, Number]  // [min, max] stock price range for chart
}
```

---

## Question Design

### The 3 questions per lesson
Each lesson has exactly 3 questions that follow this pattern:
1. **Conceptual** — "What is X?" / "What does X measure?" (tests understanding)
2. **Applied** — Math or scenario. "Stock is at $50, you buy..." (tests application)
3. **Contextual** — "When is X best?" / "When does X happen?" (tests judgment)

### Wrong answer design
- **2 plausible distractors** — common misconceptions, adjacent concepts, or off-by-one errors
- **1 obviously wrong** — humor OK ("On Thursdays", "A type of cryptocurrency") but not every question needs a joke option
- Never make the correct answer the longest or most detailed option
- Randomize correct answer position across questions (don't always put it as option B)

### Explanation design
- First sentence: restate the correct concept clearly
- Second sentence: explain WHY / the mechanism
- Optional third sentence: meme-flavored real-world implication
- Include relevant numbers/math if the question was quantitative
- Emoji sparingly (1-2 max per explanation, at the end)

### Standalone requirement
Questions appear in review mode **without lesson context**. Every question must be fully understandable on its own — no "as we discussed above" or references to other questions in the same lesson.

---

## Difficulty & Progression

### Category prerequisites
```
basics (lessons 1-3)    → no prerequisites
greeks (lessons 4-6)    → assumes basics knowledge
strategies (lessons 7-12) → assumes basics + greeks knowledge
```

### XP values
| Category | XP per lesson | Rationale |
|----------|--------------|-----------|
| basics | 50-75 | Entry-level, reward early completion |
| greeks | 75-100 | Harder concepts, more reward |
| strategies | 75-150 | Scales with strategy complexity |

XP is awarded proportionally: `Math.round((correctAnswers / totalQuestions) * lesson.xp)`

### Lesson ID assignment
IDs are sequential integers starting at 1. New lessons get the next available ID. Lessons unlock linearly — lesson N requires lesson N-1 completed.

---

## Financial Accuracy Checklist

Run through this before finalizing any content:

- [ ] **Math checks out.** Every numerical example must be verifiable with basic arithmetic. If you say "profit = $8/share", show the math: ($65 - $55 - $2 = $8).
- [ ] **Directional correctness.** Calls profit when stock goes UP. Puts profit when stock goes DOWN. Sellers profit from time decay. Never get this backwards.
- [ ] **P&L includes premiums.** Profit/loss always accounts for premium paid/received. Intrinsic value alone is NOT profit.
- [ ] **Per-share vs per-contract.** Be explicit. "$8 profit per share" or "$800 per contract" — never ambiguous.
- [ ] **No trading advice.** Explain mechanics, never say "you should buy X". The app teaches concepts, not recommendations.
- [ ] **Simplifications are labeled.** If ignoring commissions, bid-ask spread, early assignment, or dividends, that's fine for education — but don't present simplified examples as complete pictures when the simplification would mislead.
- [ ] **Strategy risk profiles are accurate.** Max profit, max loss, and breakeven formulas in strategy cards must be correct. These are reference material people will rely on.
- [ ] **Payoff diagram legs produce correct curves.** Test mentally: at stock price = 0, at strike, and at 2x strike. Does the P&L make sense?

### Acceptable simplifications
- Ignoring commissions and fees
- Using round strike prices ($50, $55) for clean math
- American vs European style — don't distinguish unless relevant to the question
- Ignoring dividend risk on covered calls
- Treating expiration P&L only (no early exercise scenarios)

### Dangerous simplifications (avoid)
- Implying options can't lose more than premium when selling naked
- Ignoring assignment risk entirely
- Presenting max profit scenarios as typical outcomes
- Conflating intrinsic value with total P&L

---

## Architecture Notes

### File structure
```
src/
  App.jsx              — auth, tab routing, quiz/review/replay state
  firebase.js          — Firebase init, auth, Firestore read/write
  data/
    lessons.js         — allLessons array (default export)
    library.js         — greekCards, strategyCards, glossaryTerms (named exports)
    payoffs.js         — strategies array (default export)
  components/
    icons.jsx          — SVG icon components
    HomeTab.jsx        — home screen + review prompt card
    LibraryTab.jsx     — tabbed reference content (payoffs, greeks, strategies, glossary)
    ProfileTab.jsx     — profile / auth screen
    QuizScreen.jsx     — quiz flow for lessons, reviews, and replays
    PayoffDiagram.jsx  — interactive SVG payoff chart
    DebugPanel.jsx     — dev-only debug UI (import.meta.env.DEV gated)
```

### Spaced repetition model
When a user gets a question wrong, it's saved as:
```js
{ lessonId, questionIndex, missedAt, reviewAfterLesson, reviewed }
```
- `reviewAfterLesson = currentLessonId + 2` — review triggers after completing 2 more lessons
- If still wrong on review, `reviewAfterLesson` bumps by +1
- If correct on review, `reviewed: true` (done)
- Replays also track missed questions for spaced repetition (but award 0 XP)

### Key conventions
- All styling is inline (no CSS classes, no CSS modules)
- Color palette: bg `#111827`, card `#1f2937`, green `#22c55e`, red `#ef4444`, amber `#f59e0b`, purple `#8b5cf6`, gold `#fbbf24`, muted `#9ca3af`
- Font: system stack (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`)
- Max width: 430px centered
- Mobile-first, PWA (service worker via vite-plugin-pwa)
- Vite env prefix: `ACADEMY_` (not `VITE_`)
