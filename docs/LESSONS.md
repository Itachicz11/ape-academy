# Ape Academy — Lesson Content

Complete breakdown of all lessons and quiz questions.

---

## 📚 BASICS

### Lesson 1: WTF is an Option?
**XP:** 50 | **Questions:** 3

| Question | Correct Answer |
|----------|----------------|
| What is an options contract? | The right, but not obligation, to buy/sell at a set price |
| How many shares does ONE standard options contract control? | 100 shares |
| What is the 'strike price'? | The price at which you can buy/sell the stock |

**Key Concepts:**
- Options are derivatives (value derived from underlying stock)
- 1 contract = 100 shares
- Strike price = your locked-in buy/sell price
- Expiration = deadline to use the option

---

### Lesson 2: Calls: Going Long
**XP:** 50 | **Questions:** 3

| Question | Correct Answer |
|----------|----------------|
| What does buying a CALL give you? | The right to BUY shares at the strike |
| Stock at $50, buy $55 call for $2, stock goes to $65. Profit per share? | $8 ($10 gain - $2 premium) |
| Your call expires worthless when: | Stock price < strike price |

**Key Concepts:**
- CALL = right to BUY (bullish bet)
- Profit = (Stock Price - Strike) - Premium Paid
- Worthless if stock stays below strike at expiration

---

### Lesson 3: Puts: Betting Against
**XP:** 75 | **Questions:** 3

| Question | Correct Answer |
|----------|----------------|
| What does buying a PUT give you the right to do? | Sell shares at the strike price |
| Buy $50 PUT, stock crashes to $30. Intrinsic value per share? | $20 |
| When does a PUT become worthless? | When stock price > strike price at expiration |

**Key Concepts:**
- PUT = right to SELL (bearish bet)
- Intrinsic value = Strike - Stock Price
- Worthless if stock stays above strike at expiration

---

## 🔢 THE GREEKS

### Lesson 4: Delta Δ
**XP:** 75 | **Questions:** 3

| Question | Correct Answer |
|----------|----------------|
| What does Delta measure? | How much option price changes per $1 stock move |
| Call has delta 0.70, stock goes up $2. Option gain? | $1.40 per share |
| What's the delta range for puts? | -1.0 to 0 |

**Key Concepts:**
- Delta = sensitivity to stock price movement
- Calls: 0 to 1.0 delta
- Puts: -1.0 to 0 delta (inverse relationship)
- ATM options ≈ 0.50 delta
- Deep ITM ≈ 1.0 delta (moves like stock)

---

### Lesson 5: Theta Θ
**XP:** 75 | **Questions:** 3

| Question | Correct Answer |
|----------|----------------|
| What does Theta measure? | How much value your option loses per day |
| Option has theta -0.05. After 5 days, you lose: | $0.25 per share |
| When does theta decay accelerate the most? | Final 2 weeks before expiration |

**Key Concepts:**
- Theta = time decay (enemy of buyers, friend of sellers)
- Decay is exponential, not linear
- Last 2 weeks = brutal decay
- Theta gang = option sellers who profit from decay

---

### Lesson 6: Gamma Γ & Vega V
**XP:** 100 | **Questions:** 3

| Question | Correct Answer |
|----------|----------------|
| What does Gamma measure? | How much delta changes per $1 stock move |
| When is gamma highest? | ATM options near expiration |
| What does Vega measure? | Price change per 1% change in implied volatility |

**Key Concepts:**
- Gamma = acceleration of delta (delta of delta)
- High gamma = volatile position
- 0DTE options have extreme gamma
- Vega = sensitivity to IV changes
- IV crush after earnings destroys vega-heavy positions

---

## 🎯 STRATEGIES

### Lesson 7: Covered Calls
**XP:** 75 | **Questions:** 3

| Question | Correct Answer |
|----------|----------------|
| What is a covered call? | Selling a call while owning 100 shares |
| Own shares at $50, sell $55 call for $2, stock goes to $60. What happens? | Shares called away at $55, you made $7/share total |
| Best market for covered calls? | Sideways to slightly bullish |

**Key Concepts:**
- Own 100 shares + Sell 1 call = Covered Call
- Collect premium, but cap upside
- Best in sideways/slightly bullish markets
- Risk: missing big upside moves

---

### Lesson 8: Cash Secured Puts
**XP:** 75 | **Questions:** 3

| Question | Correct Answer |
|----------|----------------|
| What is a cash-secured put (CSP)? | Selling a put while holding cash to buy shares if assigned |
| Sell $45 put for $3, stock drops to $40. Your cost basis? | $42 |
| When are CSPs ideal? | On stocks you want to own at a lower price |

**Key Concepts:**
- Sell put + Hold cash for assignment = CSP
- Get paid to place a limit order
- Cost basis = Strike - Premium received
- Best on stocks you want to own anyway

---

### Lesson 9: Vertical Spreads
**XP:** 100 | **Questions:** 3

| Question | Correct Answer |
|----------|----------------|
| What is a vertical spread? | Buy and sell options at different strikes, same expiry |
| Bull call spread: Buy $50 call, sell $55 call. Max profit is: | $5 minus net premium paid |
| Why use spreads vs naked options? | Lower cost, defined risk |

**Key Concepts:**
- Same expiry, different strikes
- Defined risk AND defined profit
- Bull call spread = bullish, debit spread
- Bear put spread = bearish, debit spread
- Lower cost entry than naked options

---

### Lesson 10: Iron Condor
**XP:** 125 | **Questions:** 3

| Question | Correct Answer |
|----------|----------------|
| What is an iron condor? | Sell OTM call spread + Sell OTM put spread |
| Iron condor profits most when: | Stock stays flat, IV drops |
| Max loss on an iron condor is: | Width of one spread minus premium collected |

**Key Concepts:**
- Sell OTM call spread + Sell OTM put spread
- Betting stock stays in a range
- Profit from time decay and IV drop
- Defined risk on both sides
- Theta gang favorite

---

### Lesson 11: Straddles & Strangles
**XP:** 125 | **Questions:** 3

| Question | Correct Answer |
|----------|----------------|
| What is a long straddle? | Buy ATM call + Buy ATM put, same strike |
| Long straddles are best before: | Events causing big moves (earnings, FDA) |
| How is a strangle different? | Uses OTM options at different strikes (cheaper) |

**Key Concepts:**
- Straddle = ATM call + ATM put (same strike)
- Strangle = OTM call + OTM put (different strikes)
- Betting on BIG move, direction doesn't matter
- Beware IV crush after events
- Strangle cheaper but needs bigger move

---

### Lesson 12: The Wheel Strategy
**XP:** 150 | **Questions:** 3

| Question | Correct Answer |
|----------|----------------|
| What is the Wheel strategy? | Cycling between selling CSPs and covered calls |
| Step 1 of the Wheel is: | Sell cash-secured puts on stock you want |
| The Wheel works best on: | Stable stocks you'd hold anyway |

**Key Concepts:**
- Step 1: Sell CSPs until assigned
- Step 2: Sell covered calls until shares called away
- Step 3: Repeat
- Continuous premium collection
- Best on quality stocks you'd hold long-term
- Not for meme stocks or penny stocks

---

## XP & Level System

| Total XP | Level | Title |
|----------|-------|-------|
| 0-99 | 1 | Smooth Brain 🧠 |
| 100-249 | 2 | Wrinkle Forming 🧠✨ |
| 250-499 | 3 | Paper Hands 🧻🙌 |
| 500-749 | 4 | Diamond Hands 💎🙌 |
| 750-999 | 5 | Ape 🦍 |
| 1000+ | 6 | Degenerate 👑🦍 |

**Max possible XP:** 1000 (if all questions answered correctly)