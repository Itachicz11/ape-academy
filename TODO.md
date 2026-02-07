# Ape Academy — Project Dashboard

> Options trading education PWA. React + Vite + Firebase.

| Metric | Value |
|--------|-------|
| Lessons | 20 (3 basics, 3 greeks, 6 strategies, 4 risk mgmt, 4 real-world) |
| Library cards | 5 greeks + 13 strategies + 22 glossary + 7 common mistakes |
| Payoff diagrams | 13 interactive strategies |
| Components | 9 (`App` + 8 in `components/`) |

---

## Recently Shipped

- [x] Restructure monolith into components (App was 633 lines)
- [x] Spaced repetition system (missed questions, review mode)
- [x] Interactive payoff diagrams (pure SVG, touch/mouse drag)
- [x] Library tab (Payoffs, Greeks, Strategies, Glossary sub-tabs)
- [x] Lesson replay (practice mode, 0 XP)
- [x] Debug panel (dev-only, seed state, quick nav)
- [x] `CLAUDE.md` project guide
- [x] Bug fixes: Math.max spread, review guards, diagram flicker, debug toast, unused svg
- [x] Risk Management lessons (4): position sizing, portfolio greeks, cut losses, margin
- [x] Real-World Scenarios lessons (4): earnings, meme stocks, dividends, rolling
- [x] 5 new payoff diagrams: strangle, bull put, bear call, butterfly, + credit spreads
- [x] Library expansion: Rho greek, 3 strategy cards, 11 glossary terms, 7 common mistakes
- [x] "Mistakes" sub-tab in Library

---

## Backlog

### Content

<details>
<summary><b>New lesson categories</b> — expand beyond basics/greeks/strategies</summary>

- [x] ~~**Risk Management** category (4 lessons)~~ — position sizing, portfolio greeks, cut losses, margin
- [x] ~~**Real-World Scenarios** category (4 lessons)~~ — earnings, meme stocks, dividends, rolling
- [ ] **Advanced Strategies** category (2-3 lessons)
  - Calendar spreads & diagonals
  - Ratio spreads
  - Jade lizard / broken-wing butterfly

</details>

<details>
<summary><b>More payoff diagrams</b> — cover missing strategies</summary>

- [x] ~~Long strangle~~
- [x] ~~Bull put spread (credit spread)~~
- [x] ~~Bear call spread (credit spread)~~
- [ ] Calendar spread (needs time-to-expiry dimension)
- [x] ~~Butterfly spread~~
- [ ] The Wheel (multi-phase — may need special treatment)

</details>

<details>
<summary><b>Library content expansion</b></summary>

- [x] ~~Add Rho to Greek cards (interest rate sensitivity)~~
- [x] ~~"Common mistakes" reference section~~ — 7 cards with mistake/description/fix
- [ ] Earnings calendar cheat sheet (what to watch, IV percentile)
- [x] ~~Order types glossary (limit, market, stop-loss, GTC)~~ — added 11 new glossary terms

</details>

---

### Features

<details>
<summary><b>P1 — High impact</b></summary>

- [ ] **Lesson progress persistence** — resume a lesson if you close mid-quiz
- [ ] **Streak tracking** — daily streak counter on home screen, motivates return visits
- [ ] **Achievements / badges** — milestones (first perfect score, all basics done, 7-day streak)
- [ ] **Animated transitions** — page transitions between tabs, card entry animations
- [ ] **Confetti on perfect score** — lightweight canvas confetti on quiz completion
- [ ] **Share results** — "I scored 3/3 on Ape Academy" shareable card

</details>

<details>
<summary><b>P2 — Nice to have</b></summary>

- [ ] **Haptic feedback** — vibrate on correct/wrong answer (Navigator.vibrate)
- [ ] **Sound effects** — subtle audio cues for correct/wrong/completion (respect mute)
- [ ] **Dark/light theme** — currently dark-only, add system preference detection
- [ ] **Lesson bookmarks** — save specific explanations for quick review
- [ ] **Payoff diagram comparison** — overlay two strategies on one chart
- [ ] **Custom payoff builder** — user adds legs to build their own strategy diagram

</details>

<details>
<summary><b>P3 — Future exploration</b></summary>

- [ ] **Multiplayer quiz** — real-time head-to-head via Firebase Realtime DB
- [ ] **AI tutor** — ask follow-up questions about explanations (Claude API)
- [ ] **Paper trading simulator** — virtual portfolio with fake money, real option mechanics
- [ ] **Community leaderboard** — global XP ranking (needs moderation thought)

</details>

---

### Technical

<details>
<summary><b>Testing</b></summary>

- [ ] Update Playwright visual regression baselines (home, library, profile)
- [ ] Add Playwright flow tests: complete lesson, trigger review, replay lesson
- [ ] Add Playwright tests for payoff diagram interaction
- [ ] Component unit tests (Vitest) for `calculatePnL`, XP calculation, spaced repetition logic

</details>

<details>
<summary><b>Performance & polish</b></summary>

- [ ] Code-split Library tab (lazy load `PayoffDiagram` + data)
- [ ] Reduce main bundle (currently 574KB, Vite warning at 500KB)
- [ ] Add skeleton loading states for tab switches
- [ ] Optimize payoff diagram re-renders (memoize point calculations)
- [ ] Preload next question's options for instant transition

</details>

<details>
<summary><b>Accessibility</b></summary>

- [ ] Keyboard navigation for quiz answers
- [ ] ARIA labels on tab bar buttons
- [ ] Screen reader announcements for correct/wrong feedback
- [ ] Focus management when opening/closing quiz screen
- [ ] Color contrast audit (red/green on dark background)

</details>

<details>
<summary><b>Infrastructure</b></summary>

- [ ] CI pipeline (GitHub Actions: lint + build + Playwright)
- [ ] Firebase security rules audit (Firestore read/write scoping)
- [ ] Analytics events (lesson started, completed, review triggered, library tab viewed)
- [ ] Error boundary component (catch React render errors gracefully)
- [ ] PWA install prompt (custom "Add to Home Screen" banner)

</details>

---

### Bugs & Debt

- [x] ~~`Math.max(...completedLessons, 0)` will throw on very large arrays~~ — replaced with `reduce`
- [x] ~~Review mode: if a missed question's lesson is deleted/renumbered, lookup fails silently~~ — added validation filter
- [x] ~~Payoff diagram hover readout flickers at SVG edges~~ — ignore pointer in padding zones
- [x] ~~`DebugPanel` "Open Review Mode" does nothing if no missed questions exist~~ — added toast feedback
- [x] ~~Remove `src/assets/react.svg`~~ — deleted file + empty `assets/` directory

---

## Architecture Reference

```
src/
  App.jsx                  ← auth, routing, quiz/review/replay state
  firebase.js              ← Firebase init, auth, Firestore CRUD
  main.jsx                 ← React root + PWA registration
  index.css                ← Reset + body background
  data/
    lessons.js             ← 20 lessons, 60 questions
    library.js             ← greeks, strategies, glossary, common mistakes
    payoffs.js             ← 13 payoff diagram configs
  components/
    icons.jsx              ← 5 SVG icon components
    HomeTab.jsx            ← home screen + review prompt (5 categories)
    LibraryTab.jsx         ← 5 sub-tabs (payoffs/greeks/strategies/mistakes/glossary)
    ProfileTab.jsx         ← auth + stats display
    QuizScreen.jsx         ← quiz/review/replay flow
    PayoffDiagram.jsx      ← interactive SVG chart
    DebugPanel.jsx         ← dev-only (import.meta.env.DEV)
```

| Key file | Lines | Role |
|----------|-------|------|
| `App.jsx` | ~150 | Thin shell: auth, state, routing |
| `QuizScreen.jsx` | ~160 | Handles lessons, reviews, replays via props |
| `HomeTab.jsx` | ~120 | Lesson list, progress, review prompt |
| `LibraryTab.jsx` | ~175 | Reference content with 5 sub-tabs |
| `PayoffDiagram.jsx` | ~140 | P&L math + SVG rendering |
| `lessons.js` | ~500 | All lesson/question content (20 lessons) |
| `library.js` | ~260 | Reference cards + common mistakes |
