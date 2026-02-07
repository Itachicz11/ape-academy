const allLessons = [
  {
    id: 1, title: "WTF is an Option?", subtitle: "Baby's first derivative", xp: 50, category: "basics",
    questions: [
      { question: "What is an options contract?", options: [
        { text: "A promise to buy stock no matter what", correct: false },
        { text: "The right, but not obligation, to buy/sell at a set price", correct: true },
        { text: "Free money from the stock market", correct: false },
        { text: "A type of cryptocurrency", correct: false },
      ], explanation: "An option gives you the RIGHT (but not the obligation) to buy or sell 100 shares at a specific price (strike) before a specific date (expiration). It's called a 'derivative' because its value derives from the underlying stock." },
      { question: "How many shares does ONE standard options contract control?", options: [
        { text: "1 share", correct: false },
        { text: "10 shares", correct: false },
        { text: "100 shares", correct: true },
        { text: "1000 shares", correct: false },
      ], explanation: "One contract = 100 shares. So if an option costs $2.00, you pay $200 total ($2 x 100). This is why options can give you leverage — you control 100 shares for a fraction of the cost." },
      { question: "What is the 'strike price'?", options: [
        { text: "The current stock price", correct: false },
        { text: "The price you paid for the option", correct: false },
        { text: "The price at which you can buy/sell the stock", correct: true },
        { text: "The highest price the stock has reached", correct: false },
      ], explanation: "The strike price is YOUR locked-in price. If you have a $50 call, you can buy shares at $50 even if the stock moons to $100. That's where the tendies come from. \u{1F357}" },
    ]
  },
  {
    id: 2, title: "Calls: Going Long", subtitle: "Moon mission basics \u{1F680}", xp: 50, category: "basics",
    questions: [
      { question: "What does buying a CALL give you?", options: [
        { text: "The right to SELL shares at the strike", correct: false },
        { text: "The right to BUY shares at the strike", correct: true },
        { text: "Ownership of 100 shares immediately", correct: false },
        { text: "A guaranteed profit", correct: false },
      ], explanation: "A CALL = right to BUY. You buy calls when you're BULLISH (think stock go up \u{1F4C8}). If stock moons past your strike, you can buy shares cheap and sell high." },
      { question: "Stock is at $50. You buy a $55 call for $2. Stock goes to $65. What's your profit per share?", options: [
        { text: "$8 ($10 gain - $2 premium)", correct: true },
        { text: "$10", correct: false },
        { text: "$15", correct: false },
        { text: "$2", correct: false },
      ], explanation: "Intrinsic value at expiry: $65 - $55 strike = $10. Minus the $2 you paid = $8 profit per share. That's $800 per contract. You turned $200 into $1000. This is the way. \u{1F680}" },
      { question: "Your call expires worthless when:", options: [
        { text: "Stock price > strike price", correct: false },
        { text: "Stock price < strike price", correct: true },
        { text: "Stock price = strike price", correct: false },
        { text: "You forget about it", correct: false },
      ], explanation: "If stock is BELOW your strike at expiration, your call is worthless. Why exercise the right to buy at $55 when market price is $50? RIP your premium." },
    ]
  },
  {
    id: 3, title: "Puts: Betting Against", subtitle: "Become a \u{1F308}\u{1F43B}", xp: 75, category: "basics",
    questions: [
      { question: "What does buying a PUT give you the right to do?", options: [
        { text: "Buy shares at the strike price", correct: false },
        { text: "Sell shares at the strike price", correct: true },
        { text: "Hold shares forever", correct: false },
        { text: "Get free tendies", correct: false },
      ], explanation: "A PUT gives you the right to SELL 100 shares at the strike price. Bears buy puts when they think stonks go down. \u{1F43B}" },
      { question: "You buy a $50 PUT. Stock crashes to $30. What's your intrinsic value per share?", options: [
        { text: "$0 - worthless", correct: false },
        { text: "$20", correct: true },
        { text: "$50", correct: false },
        { text: "$30", correct: false },
      ], explanation: "Intrinsic value = Strike - Stock = $50 - $30 = $20. You can sell shares worth $30 for $50. That's $2,000 per contract profit. \u{1F308}\u{1F43B}\u{1F4B0}" },
      { question: "When does a PUT become worthless?", options: [
        { text: "When stock price > strike price at expiration", correct: true },
        { text: "When stock price < strike price", correct: false },
        { text: "On Thursdays", correct: false },
        { text: "When your wife's boyfriend says so", correct: false },
      ], explanation: "If stock is ABOVE your strike at expiration, your put is worthless. Why sell at $50 when market is $60?" },
    ]
  },
  {
    id: 4, title: "Delta \u0394", subtitle: "How much your option moves", xp: 75, category: "greeks",
    questions: [
      { question: "What does Delta measure?", options: [
        { text: "Time decay per day", correct: false },
        { text: "How much option price changes per $1 stock move", correct: true },
        { text: "Volatility impact", correct: false },
        { text: "Your chance of getting margin called", correct: false },
      ], explanation: "Delta tells you how much your option moves for every $1 the stock moves. A delta of 0.50 means your option gains $0.50 when the stock goes up $1." },
      { question: "A call has delta of 0.70. Stock goes up $2. How much does your option gain?", options: [
        { text: "$0.70", correct: false },
        { text: "$1.40 per share", correct: true },
        { text: "$2.00", correct: false },
        { text: "$2.70", correct: false },
      ], explanation: "Delta \u00D7 Stock Move = Option Move. 0.70 \u00D7 $2 = $1.40 per share, or $140 per contract." },
      { question: "What's the delta range for puts?", options: [
        { text: "0 to 1.0", correct: false },
        { text: "-1.0 to 0", correct: true },
        { text: "-0.5 to 0.5", correct: false },
        { text: "Puts don't have delta", correct: false },
      ], explanation: "Puts have NEGATIVE delta (-1.0 to 0) because they go UP when stocks go DOWN. A -0.50 delta put gains $0.50 when stock drops $1. \u{1F43B}" },
    ]
  },
  {
    id: 5, title: "Theta \u0398", subtitle: "Time is money (literally)", xp: 75, category: "greeks",
    questions: [
      { question: "What does Theta measure?", options: [
        { text: "Price change per $1 stock move", correct: false },
        { text: "How much value your option loses per day", correct: true },
        { text: "Volatility sensitivity", correct: false },
        { text: "Your portfolio's diversity", correct: false },
      ], explanation: "Theta = time decay. It tells you how much value your option bleeds each day. Options are wasting assets \u2014 they literally rot." },
      { question: "Your option has theta of -0.05. After 5 days, you lose:", options: [
        { text: "$0.05", correct: false },
        { text: "$0.25 per share", correct: true },
        { text: "$5.00", correct: false },
        { text: "Nothing", correct: false },
      ], explanation: "Theta \u00D7 Days = Decay. -0.05 \u00D7 5 = -$0.25 per share, or $25 per contract." },
      { question: "When does theta decay accelerate the most?", options: [
        { text: "60+ days to expiration", correct: false },
        { text: "30-45 days to expiration", correct: false },
        { text: "Final 2 weeks before expiration", correct: true },
        { text: "Theta is constant", correct: false },
      ], explanation: "Theta decay accelerates exponentially near expiration. The last 2 weeks are brutal for option buyers." },
    ]
  },
  {
    id: 6, title: "Gamma \u0393 & Vega V", subtitle: "The other Greeks", xp: 100, category: "greeks",
    questions: [
      { question: "What does Gamma measure?", options: [
        { text: "How fast theta decays", correct: false },
        { text: "How much delta changes per $1 stock move", correct: true },
        { text: "Volatility impact on price", correct: false },
        { text: "Your risk tolerance", correct: false },
      ], explanation: "Gamma = rate of change of delta. High gamma means your delta swings wildly. Think delta = speed, gamma = acceleration." },
      { question: "When is gamma highest?", options: [
        { text: "Deep ITM options", correct: false },
        { text: "Deep OTM options", correct: false },
        { text: "ATM options near expiration", correct: true },
        { text: "LEAPS", correct: false },
      ], explanation: "Gamma is highest for ATM options close to expiration. This is why 0DTE options are so volatile." },
      { question: "What does Vega measure?", options: [
        { text: "Time decay", correct: false },
        { text: "Price change per 1% change in implied volatility", correct: true },
        { text: "Delta acceleration", correct: false },
        { text: "Interest rates", correct: false },
      ], explanation: "Vega = sensitivity to IV changes. High vega options are crushed when IV drops after earnings." },
    ]
  },
  {
    id: 7, title: "Covered Calls", subtitle: "Boomer income strategy \u{1F474}", xp: 75, category: "strategies",
    questions: [
      { question: "What is a covered call?", options: [
        { text: "Buying a call while owning shares", correct: false },
        { text: "Selling a call while owning 100 shares", correct: true },
        { text: "Buying shares after selling a call", correct: false },
        { text: "A call with insurance", correct: false },
      ], explanation: "Covered call = Own 100 shares + Sell 1 call. You collect premium but cap your upside." },
      { question: "You own shares at $50. Sell $55 call for $2. Stock goes to $60. What happens?", options: [
        { text: "Keep shares, keep premium", correct: false },
        { text: "Shares called away at $55, you made $7/share total", correct: true },
        { text: "You lose money", correct: false },
        { text: "Option expires worthless", correct: false },
      ], explanation: "Shares get called away at $55. You profit: ($55-$50) + $2 premium = $7/share. But you missed the move to $60." },
      { question: "Best market for covered calls?", options: [
        { text: "Strong bull market", correct: false },
        { text: "Sideways to slightly bullish", correct: true },
        { text: "Bear market crash", correct: false },
        { text: "High volatility", correct: false },
      ], explanation: "Covered calls shine in sideways/slightly up markets. You collect premium while stock churns." },
    ]
  },
  {
    id: 8, title: "Cash Secured Puts", subtitle: "Get paid to buy the dip", xp: 75, category: "strategies",
    questions: [
      { question: "What is a cash-secured put (CSP)?", options: [
        { text: "Buying a put with cash", correct: false },
        { text: "Selling a put while holding cash to buy shares if assigned", correct: true },
        { text: "A put protected by another put", correct: false },
        { text: "Buying shares with a hedge", correct: false },
      ], explanation: "CSP = Sell a put + Keep cash to buy 100 shares at strike if assigned. Getting paid to place a limit order." },
      { question: "Sell $45 put for $3. Stock drops to $40. Your cost basis?", options: [
        { text: "$45", correct: false },
        { text: "$42", correct: true },
        { text: "$40", correct: false },
        { text: "$47", correct: false },
      ], explanation: "Assigned at $45 strike minus $3 premium = $42 effective cost basis." },
      { question: "When are CSPs ideal?", options: [
        { text: "On stocks you want to own at a lower price", correct: true },
        { text: "On stocks you think will moon", correct: false },
        { text: "On stocks you're bearish on", correct: false },
        { text: "Only during earnings", correct: false },
      ], explanation: "CSPs work best on stocks you WANT to own. Worst case = you buy shares you wanted at a discount." },
    ]
  },
  {
    id: 9, title: "Vertical Spreads", subtitle: "Defined risk plays", xp: 100, category: "strategies",
    questions: [
      { question: "What is a vertical spread?", options: [
        { text: "Options at different expirations", correct: false },
        { text: "Buy and sell options at different strikes, same expiry", correct: true },
        { text: "Buying calls and puts together", correct: false },
        { text: "A diagonal line on a chart", correct: false },
      ], explanation: "Vertical spread = Same expiry, different strikes. Caps both profit AND loss. Defined risk. \u{1F4CA}" },
      { question: "Bull call spread: Buy $50 call, sell $55 call. Max profit is:", options: [
        { text: "Unlimited", correct: false },
        { text: "$5 minus net premium paid", correct: true },
        { text: "$5 plus premium", correct: false },
        { text: "Just the premium", correct: false },
      ], explanation: "Max profit = Strike width ($5) minus cost. The short call caps upside at $55." },
      { question: "Why use spreads vs naked options?", options: [
        { text: "More profit potential", correct: false },
        { text: "Lower cost, defined risk", correct: true },
        { text: "No theta decay", correct: false },
        { text: "Spreads always win", correct: false },
      ], explanation: "Spreads cost less and have defined risk. But profit is also capped. Controlled bets." },
    ]
  },
  {
    id: 10, title: "Iron Condor", subtitle: "Theta gang's favorite \u{1F985}", xp: 125, category: "strategies",
    questions: [
      { question: "What is an iron condor?", options: [
        { text: "Buy call spread + Buy put spread", correct: false },
        { text: "Sell OTM call spread + Sell OTM put spread", correct: true },
        { text: "Four calls at different strikes", correct: false },
        { text: "A type of bird", correct: false },
      ], explanation: "Iron condor = Sell OTM call spread + Sell OTM put spread. Betting stock stays in a range." },
      { question: "Iron condor profits most when:", options: [
        { text: "Stock makes a big move", correct: false },
        { text: "Stock stays flat, IV drops", correct: true },
        { text: "Stock slowly trends up", correct: false },
        { text: "Earnings cause a gap", correct: false },
      ], explanation: "Iron condors want NOTHING to happen. Flat + time + IV drop = profit. Theta gang loves boring." },
      { question: "Max loss on an iron condor is:", options: [
        { text: "Unlimited", correct: false },
        { text: "Width of one spread minus premium collected", correct: true },
        { text: "Premium collected", correct: false },
        { text: "Double the premium", correct: false },
      ], explanation: "Max loss = Spread width - Premium. Defined risk, no margin blowup." },
    ]
  },
  {
    id: 11, title: "Straddles & Strangles", subtitle: "Betting on big moves", xp: 125, category: "strategies",
    questions: [
      { question: "What is a long straddle?", options: [
        { text: "Buy ATM call + Buy ATM put, same strike", correct: true },
        { text: "Sell call + Sell put", correct: false },
        { text: "Buy call + Sell put", correct: false },
        { text: "Standing with legs apart", correct: false },
      ], explanation: "Straddle = Buy ATM call AND put at same strike. Profit on BIG move either direction." },
      { question: "Long straddles are best before:", options: [
        { text: "Dividends", correct: false },
        { text: "Events causing big moves (earnings, FDA)", correct: true },
        { text: "Weekends", correct: false },
        { text: "Stock splits", correct: false },
      ], explanation: "Straddles bet on volatility. Buy before binary events. But beware IV crush!" },
      { question: "How is a strangle different?", options: [
        { text: "Different expirations", correct: false },
        { text: "Uses OTM options at different strikes (cheaper)", correct: true },
        { text: "Only uses calls", correct: false },
        { text: "They're the same", correct: false },
      ], explanation: "Strangle = OTM call + OTM put. Cheaper but needs bigger move to profit." },
    ]
  },
  {
    id: 12, title: "The Wheel Strategy", subtitle: "Infinite money glitch? \u{1F3B0}", xp: 150, category: "strategies",
    questions: [
      { question: "What is the Wheel strategy?", options: [
        { text: "Spinning a wheel to pick stocks", correct: false },
        { text: "Cycling between selling CSPs and covered calls", correct: true },
        { text: "Day trading options", correct: false },
        { text: "Buying and holding forever", correct: false },
      ], explanation: "The Wheel: Sell CSPs until assigned, then sell covered calls until shares called away. Rinse and repeat. Premium printer." },
      { question: "Step 1 of the Wheel is:", options: [
        { text: "Buy shares", correct: false },
        { text: "Sell cash-secured puts on stock you want", correct: true },
        { text: "Sell covered calls", correct: false },
        { text: "Buy calls", correct: false },
      ], explanation: "Start by selling CSPs. Collect premium while waiting to buy shares at your target price." },
      { question: "The Wheel works best on:", options: [
        { text: "Meme stocks with crazy IV", correct: false },
        { text: "Stable stocks you'd hold anyway", correct: true },
        { text: "Penny stocks", correct: false },
        { text: "Stocks in downtrends", correct: false },
      ], explanation: "Wheel on quality stocks you want to own long-term. Not on garbage that might go to zero." },
    ]
  },
  {
    id: 13, title: "Position Sizing", subtitle: "Don't bet the farm \u{1F3B0}", xp: 75, category: "risk",
    questions: [
      { question: "The '1-2% rule' means you should risk no more than 1-2% of what?", options: [
        { text: "Your annual salary", correct: false },
        { text: "Your total portfolio on a single trade", correct: true },
        { text: "The stock's market cap", correct: false },
        { text: "Your daily profit target", correct: false },
      ], explanation: "The 1-2% rule means risking no more than 1-2% of your total account on any single trade. If you have $10,000, max risk per trade is $100-$200. This keeps you alive through losing streaks." },
      { question: "You have $20,000 and follow the 2% rule. An option costs $3.00/contract. Max contracts?", options: [
        { text: "1 contract ($300 risk)", correct: true },
        { text: "6 contracts ($1,800 risk)", correct: false },
        { text: "13 contracts ($3,900 risk)", correct: false },
        { text: "As many as you can afford", correct: false },
      ], explanation: "2% of $20,000 = $400 max risk. One contract costs $300 (= $3 \u00D7 100 shares). That's within the $400 limit. Two contracts = $600, which exceeds 2%. Discipline > degeneracy." },
      { question: "Why is position sizing more important than picking the right direction?", options: [
        { text: "It isn't \u2014 direction is everything", correct: false },
        { text: "Because even good traders are wrong 40-50% of the time", correct: true },
        { text: "Because brokers require it", correct: false },
        { text: "Position sizing only matters for large accounts", correct: false },
      ], explanation: "Even the best traders are wrong often. Position sizing ensures that being wrong doesn't blow up your account. You can survive 10 losses in a row at 2% risk. At 20% risk, you're done in 5." },
    ]
  },
  {
    id: 14, title: "Portfolio Greeks", subtitle: "The big picture view \u{1F4CA}", xp: 100, category: "risk",
    questions: [
      { question: "What are 'portfolio greeks'?", options: [
        { text: "The greeks of your single largest position", correct: false },
        { text: "The sum of all greeks across all your positions", correct: true },
        { text: "A special set of greeks for ETFs only", correct: false },
        { text: "Greeks calculated on a weekly basis", correct: false },
      ], explanation: "Portfolio greeks are the net sum of all individual position greeks. If you have +200 delta from calls and -150 delta from puts, your net portfolio delta is +50. This tells you your overall market exposure." },
      { question: "Your portfolio has net delta of +300. What does this mean?", options: [
        { text: "You lose $300 if the market drops $1", correct: true },
        { text: "You own 300 shares", correct: false },
        { text: "You have 300 open positions", correct: false },
        { text: "Your portfolio is perfectly hedged", correct: false },
      ], explanation: "Net delta of +300 means your portfolio behaves like owning 300 shares. A $1 drop in the market costs you ~$300. That's a lot of directional risk if you didn't mean to be that bullish." },
      { question: "How do you reduce portfolio delta toward zero?", options: [
        { text: "Buy more calls", correct: false },
        { text: "Add positions with negative delta (buy puts or sell calls)", correct: true },
        { text: "Close your brokerage account", correct: false },
        { text: "Wait for expiration", correct: false },
      ], explanation: "To neutralize delta, add opposing positions. Long puts add negative delta, short calls add negative delta. This is called 'delta hedging.' Theta gang stays delta-neutral to collect time decay without directional bets." },
    ]
  },
  {
    id: 15, title: "When to Cut Losses", subtitle: "Knowing when to fold 'em \u{1F0CF}", xp: 75, category: "risk",
    questions: [
      { question: "A common stop-loss rule for options is to exit when the position loses:", options: [
        { text: "Any amount \u2014 never lose money", correct: false },
        { text: "50% of premium paid", correct: true },
        { text: "90% of premium paid", correct: false },
        { text: "Options don't need stop losses", correct: false },
      ], explanation: "Many traders exit when an option loses 50% of its value. If you paid $4, sell at $2. You still have capital to try again. Holding to zero is pure copium. Cut losses, preserve capital." },
      { question: "What is the sunk cost fallacy in trading?", options: [
        { text: "Buying more of a winning position", correct: false },
        { text: "Refusing to sell a loser because you've already lost so much", correct: true },
        { text: "Paying too much in commissions", correct: false },
        { text: "Only trading stocks you've researched", correct: false },
      ], explanation: "\"I can't sell now, I'm already down 70%\" is the sunk cost fallacy. The money is gone. The only question is: would you open this position TODAY at the current price? If no, close it." },
      { question: "Your thesis was bullish earnings. Earnings were bad. Stock gaps down. You should:", options: [
        { text: "Double down \u2014 it'll bounce back", correct: false },
        { text: "Hold and hope", correct: false },
        { text: "Exit \u2014 the thesis is broken", correct: true },
        { text: "Buy more calls at a lower strike", correct: false },
      ], explanation: "When your thesis breaks, the trade is over. Doesn't matter what you paid. Bad earnings = your bull case is dead. Exit, reassess, and find the next play. Hoping is not a strategy." },
    ]
  },
  {
    id: 16, title: "Margin & Buying Power", subtitle: "Borrowed money go brrr \u{1F4B8}", xp: 100, category: "risk",
    questions: [
      { question: "What does 'buying power' represent in an options account?", options: [
        { text: "The total cash in your account", correct: false },
        { text: "The maximum dollar amount you can use for new positions", correct: true },
        { text: "The value of your current positions", correct: false },
        { text: "Your credit card limit", correct: false },
      ], explanation: "Buying power is how much capital you can deploy in new trades. It includes your cash plus any margin available. Selling options uses buying power as collateral \u2014 even though you receive premium, the broker holds buying power as a safety net." },
      { question: "You sell a put at the $50 strike. How much buying power does this typically require?", options: [
        { text: "$50 (the strike price)", correct: false },
        { text: "$5,000 (strike \u00D7 100 shares)", correct: true },
        { text: "Just the premium received", correct: false },
        { text: "$500", correct: false },
      ], explanation: "Selling a $50 put means you might have to buy 100 shares at $50 = $5,000. Your broker holds that buying power as collateral. This is why it's called 'cash-secured' \u2014 you need the cash to back it up." },
      { question: "What happens if your account falls below margin maintenance requirements?", options: [
        { text: "Nothing \u2014 margins are suggestions", correct: false },
        { text: "You get a margin call and must deposit funds or close positions", correct: true },
        { text: "Your broker automatically buys more stock", correct: false },
        { text: "Your account is permanently closed", correct: false },
      ], explanation: "A margin call means your account value dropped below the minimum required. You must deposit more cash or close positions. If you don't act fast, your broker will liquidate positions for you \u2014 usually at the worst possible time. GUH." },
    ]
  },
  {
    id: 17, title: "Trading Earnings", subtitle: "IV crush is real \u{1F4C9}", xp: 100, category: "real-world",
    questions: [
      { question: "Why does implied volatility (IV) spike before earnings?", options: [
        { text: "Market makers raise prices for fun", correct: false },
        { text: "Uncertainty about the earnings outcome increases option demand", correct: true },
        { text: "The SEC requires higher premiums during earnings", correct: false },
        { text: "IV only changes after earnings, not before", correct: false },
      ], explanation: "Before earnings, nobody knows if the stock will gap up or down. This uncertainty = high demand for options = inflated premiums = elevated IV. The market is pricing in a big move." },
      { question: "Stock has IV of 80% before earnings. Earnings are fine, stock barely moves. What happens to your long calls?", options: [
        { text: "They gain value because earnings were good", correct: false },
        { text: "They lose value from IV crush even though the stock didn't drop", correct: true },
        { text: "Nothing changes", correct: false },
        { text: "They expire worthless immediately", correct: false },
      ], explanation: "IV crush. After earnings, uncertainty is resolved and IV drops sharply (80% \u2192 40%). Your call's extrinsic value collapses. You picked the right direction but still lost because you overpaid for volatility. Classic earnings trap." },
      { question: "Who benefits from IV crush after earnings?", options: [
        { text: "Option buyers who held through earnings", correct: false },
        { text: "Option sellers who sold before earnings", correct: true },
        { text: "People who didn't trade at all", correct: false },
        { text: "Only market makers", correct: false },
      ], explanation: "Option sellers (theta gang) sell expensive options before earnings when IV is high, then buy them back cheap after IV crushes. They profit from the volatility premium deflating. Selling strangles or iron condors before earnings is a classic play." },
    ]
  },
  {
    id: 18, title: "Meme Stock Mechanics", subtitle: "Gamma squeezes & short squeezes \u{1F680}", xp: 125, category: "real-world",
    questions: [
      { question: "What is a 'short squeeze'?", options: [
        { text: "When a stock's price drops quickly", correct: false },
        { text: "When short sellers are forced to buy shares to cover, pushing price higher", correct: true },
        { text: "When options expire worthless", correct: false },
        { text: "When a company buys back its own stock", correct: false },
      ], explanation: "Short sellers borrow and sell shares, hoping to buy back cheaper. If the stock rises instead, they face unlimited losses. They're forced to buy shares to close their positions, which pushes the price even higher, creating a feedback loop. See: GME, Jan 2021." },
      { question: "What is a 'gamma squeeze'?", options: [
        { text: "When gamma drops to zero", correct: false },
        { text: "When market makers hedge call buying by purchasing shares, amplifying the rally", correct: true },
        { text: "When puts become more expensive than calls", correct: false },
        { text: "A type of options order", correct: false },
      ], explanation: "When retail buys tons of OTM calls, market makers who sold those calls must hedge by buying shares (delta hedging). As the stock rises, delta increases (gamma), forcing more share buying. This feedback loop rockets the stock higher. Apes together strong." },
      { question: "Why are meme stocks especially dangerous for option sellers?", options: [
        { text: "The premiums are too low", correct: false },
        { text: "Unlimited loss potential on naked calls + extreme, unpredictable moves", correct: true },
        { text: "Meme stocks can't be sold short", correct: false },
        { text: "They always go to zero", correct: false },
      ], explanation: "Meme stocks can move 50-100%+ in a day. If you sold naked calls on GME at $40 and it went to $400, your loss is $36,000 per contract. Defined risk strategies only. Don't sell naked on meme stocks unless you enjoy financial ruin." },
    ]
  },
  {
    id: 19, title: "Dividend Plays", subtitle: "Ex-div risk & opportunity \u{1F4B5}", xp: 100, category: "real-world",
    questions: [
      { question: "What happens to a stock price on the ex-dividend date?", options: [
        { text: "Nothing \u2014 dividends don't affect stock price", correct: false },
        { text: "Stock price typically drops by the dividend amount", correct: true },
        { text: "Stock price goes up by the dividend amount", correct: false },
        { text: "Trading is halted", correct: false },
      ], explanation: "On ex-div day, the stock opens lower by approximately the dividend amount. A $50 stock paying a $0.50 dividend opens around $49.50. This is because new buyers no longer receive the dividend. Your calls lose value; your puts gain value." },
      { question: "You sold a deep ITM call. The stock goes ex-dividend tomorrow. What risk do you face?", options: [
        { text: "No risk \u2014 dividends don't affect options", correct: false },
        { text: "Early assignment \u2014 the call buyer may exercise to capture the dividend", correct: true },
        { text: "Your call will expire worthless", correct: false },
        { text: "The dividend is deducted from your premium", correct: false },
      ], explanation: "Call holders can exercise early to capture the dividend. This is most likely when the remaining extrinsic value of the call is less than the dividend. If you're short a deep ITM call before ex-div, expect assignment. This is American-style options in action." },
      { question: "Why might buying puts before ex-div be a bad idea?", options: [
        { text: "Puts don't work on dividend stocks", correct: false },
        { text: "The expected price drop is already priced into the put premium", correct: true },
        { text: "Dividends make puts expire worthless", correct: false },
        { text: "You need to own shares to buy puts", correct: false },
      ], explanation: "The market isn't stupid. The expected ex-div price drop is already baked into put pricing. Buying puts thinking you'll profit from the dividend drop is like arriving at the party after everyone already ate the tendies." },
    ]
  },
  {
    id: 20, title: "Rolling Options", subtitle: "Extend, adjust, survive \u{1F504}", xp: 100, category: "real-world",
    questions: [
      { question: "What does 'rolling' an option mean?", options: [
        { text: "Letting it expire and buying a new one", correct: false },
        { text: "Closing the current position and opening a new one at a different strike or expiration", correct: true },
        { text: "Doubling your position size", correct: false },
        { text: "Converting a call to a put", correct: false },
      ], explanation: "Rolling = close your current option + open a new one, typically further out in time and/or at a different strike. It's one trade (two legs). You do this to give a trade more time to work or to adjust your strike when the stock has moved." },
      { question: "You sold a $50 put. Stock drops to $48. You roll to a $47 put next month for a net credit. What did you accomplish?", options: [
        { text: "Nothing \u2014 you still lose money", correct: false },
        { text: "Lowered your effective cost basis and gave the trade more time", correct: true },
        { text: "Locked in your loss permanently", correct: false },
        { text: "Doubled your risk", correct: false },
      ], explanation: "By rolling down ($50 \u2192 $47) and out (next month), you collected more premium and gave the stock more time to recover. Your break-even is now lower. Rolling for a credit means you're getting paid to give yourself a second chance." },
      { question: "When should you NOT roll a losing position?", options: [
        { text: "When the stock is going up", correct: false },
        { text: "When your original thesis is completely broken", correct: true },
        { text: "When you can roll for a credit", correct: false },
        { text: "On Fridays", correct: false },
      ], explanation: "Rolling is for when your thesis is intact but timing was off. If the fundamental reason for the trade is dead (bad earnings, broken support, sector collapse), rolling just delays the inevitable loss. Know when to roll and when to fold." },
    ]
  },
  {
    id: 21, title: "Calendar & Diagonal Spreads", subtitle: "Playing the time game \u{1F4C5}", xp: 125, category: "advanced",
    questions: [
      { question: "What is a calendar spread?", options: [
        { text: "Buy and sell options at different strikes, same expiry", correct: false },
        { text: "Buy a longer-dated option and sell a shorter-dated option at the same strike", correct: true },
        { text: "Buy calls and puts at the same strike", correct: false },
        { text: "A strategy that only works on Mondays", correct: false },
      ], explanation: "Calendar spread = same strike, different expirations. You sell the near-term option (faster decay) and buy the far-term option (slower decay). You profit from the difference in time decay rates. It's a theta play with a twist." },
      { question: "Why does a calendar spread profit from high IV?", options: [
        { text: "It doesn't \u2014 calendars want low IV", correct: false },
        { text: "The long-dated leg has more vega, so an IV increase benefits the spread", correct: true },
        { text: "High IV makes the short leg expire faster", correct: false },
        { text: "Calendar spreads are immune to IV changes", correct: false },
      ], explanation: "The long-dated option has higher vega than the short-dated one. When IV rises, the long leg gains more than the short leg loses, netting you a profit. Calendars are long vega \u2014 they want IV to rise after you enter." },
      { question: "How does a diagonal spread differ from a calendar?", options: [
        { text: "They're the same thing", correct: false },
        { text: "Diagonals use different expirations AND different strikes", correct: true },
        { text: "Diagonals only use puts", correct: false },
        { text: "Diagonals have unlimited risk", correct: false },
      ], explanation: "Diagonal = different strikes + different expirations. Think of it as a calendar spread tilted with a directional bias. A poor man's covered call (buy deep ITM LEAPS call, sell short-term OTM call) is a popular diagonal." },
    ]
  },
  {
    id: 22, title: "Ratio Spreads", subtitle: "Unbalanced on purpose \u{2696}\u{FE0F}", xp: 150, category: "advanced",
    questions: [
      { question: "What makes a ratio spread different from a regular vertical spread?", options: [
        { text: "It uses options at different expirations", correct: false },
        { text: "You buy and sell different quantities of options (e.g., buy 1, sell 2)", correct: true },
        { text: "It only uses put options", correct: false },
        { text: "There is no difference", correct: false },
      ], explanation: "Ratio spreads are unbalanced \u2014 you buy fewer options than you sell (or vice versa). A 1:2 call ratio spread: buy 1 ATM call, sell 2 OTM calls. The extra short leg can reduce cost to zero (or even a credit) but introduces risk beyond the short strikes." },
      { question: "You enter a 1:2 call ratio spread: buy 1 $50 call, sell 2 $55 calls. Where is the risk?", options: [
        { text: "Below $50 \u2014 you lose the debit paid", correct: false },
        { text: "Between $50-$55 \u2014 the spread can't profit there", correct: false },
        { text: "Above $60 \u2014 the extra naked short call creates unlimited upside risk", correct: true },
        { text: "There is no risk \u2014 the premium offsets everything", correct: false },
      ], explanation: "You're net short 1 call above $55. The bought $50 call covers one of the $55 calls, but the second $55 call is effectively naked. Above $60, losses accelerate with no cap. Max profit is at $55 at expiration. Know your risk zones." },
      { question: "When are ratio spreads most commonly used?", options: [
        { text: "When you expect a stock to stay flat forever", correct: false },
        { text: "When you expect a moderate move to a specific target price", correct: true },
        { text: "When you want maximum leverage", correct: false },
        { text: "Only during earnings week", correct: false },
      ], explanation: "Ratio spreads work best when you have a price target. The max profit zone is at the short strike at expiration. If you think a stock moves from $50 to $55 and stops, a 1:2 call ratio is perfect. The trade is: conviction in a specific price, not just direction." },
    ]
  },
  {
    id: 23, title: "Jade Lizard & Broken-Wing Butterfly", subtitle: "Exotic but practical \u{1F98E}", xp: 150, category: "advanced",
    questions: [
      { question: "What is a jade lizard?", options: [
        { text: "A straddle with an extra call", correct: false },
        { text: "A short put + short call spread, structured for no upside risk", correct: true },
        { text: "A butterfly with all puts", correct: false },
        { text: "A type of lizard-themed meme stock", correct: false },
      ], explanation: "Jade lizard = sell a put + sell a call spread (sell call + buy higher call). The key: total credit received > width of the call spread. This eliminates upside risk entirely. Downside risk exists if the stock drops below the short put minus credit." },
      { question: "What makes a broken-wing butterfly different from a regular butterfly?", options: [
        { text: "It uses 5 legs instead of 4", correct: false },
        { text: "The wing widths are unequal, creating a directional bias and/or a credit", correct: true },
        { text: "It can only be traded on indices", correct: false },
        { text: "The wings are at the same strike", correct: false },
      ], explanation: "Regular butterfly: equal wing widths ($45/$50/$55). Broken wing: unequal ($45/$50/$60). By widening one side, you can enter for a credit but accept risk on one side. It's a butterfly with a built-in directional lean. Popular with SPX traders." },
      { question: "Why are these exotic strategies useful for experienced traders?", options: [
        { text: "They always make money", correct: false },
        { text: "They allow precise risk shaping \u2014 eliminating risk on one side while accepting it on another", correct: true },
        { text: "They require less capital than basic strategies", correct: false },
        { text: "They're simpler than covered calls", correct: false },
      ], explanation: "Advanced strategies let you sculpt your risk profile. Jade lizard: no upside risk. Broken-wing butterfly: credit entry with targeted profit zone. The tradeoff is complexity and wider bid-ask spreads. Only use these once you're comfortable with basic spreads." },
    ]
  },
];

export default allLessons;
