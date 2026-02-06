import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, signInWithGoogle, signOut, getUserProgress, saveUserProgress } from './firebase';

const HomeIcon = ({ active }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? "#22c55e" : "#6b7280"} strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

const BookIcon = ({ active }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? "#22c55e" : "#6b7280"} strokeWidth="2">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>
);

const UserIcon = ({ active }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? "#22c55e" : "#6b7280"} strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

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
      ], explanation: "The strike price is YOUR locked-in price. If you have a $50 call, you can buy shares at $50 even if the stock moons to $100. That's where the tendies come from. 🍗" },
    ]
  },
  {
    id: 2, title: "Calls: Going Long", subtitle: "Moon mission basics 🚀", xp: 50, category: "basics",
    questions: [
      { question: "What does buying a CALL give you?", options: [
        { text: "The right to SELL shares at the strike", correct: false },
        { text: "The right to BUY shares at the strike", correct: true },
        { text: "Ownership of 100 shares immediately", correct: false },
        { text: "A guaranteed profit", correct: false },
      ], explanation: "A CALL = right to BUY. You buy calls when you're BULLISH (think stock go up 📈). If stock moons past your strike, you can buy shares cheap and sell high." },
      { question: "Stock is at $50. You buy a $55 call for $2. Stock goes to $65. What's your profit per share?", options: [
        { text: "$8 ($10 gain - $2 premium)", correct: true },
        { text: "$10", correct: false },
        { text: "$15", correct: false },
        { text: "$2", correct: false },
      ], explanation: "Intrinsic value at expiry: $65 - $55 strike = $10. Minus the $2 you paid = $8 profit per share. That's $800 per contract. You turned $200 into $1000. This is the way. 🚀" },
      { question: "Your call expires worthless when:", options: [
        { text: "Stock price > strike price", correct: false },
        { text: "Stock price < strike price", correct: true },
        { text: "Stock price = strike price", correct: false },
        { text: "You forget about it", correct: false },
      ], explanation: "If stock is BELOW your strike at expiration, your call is worthless. Why exercise the right to buy at $55 when market price is $50? RIP your premium." },
    ]
  },
  {
    id: 3, title: "Puts: Betting Against", subtitle: "Become a 🌈🐻", xp: 75, category: "basics",
    questions: [
      { question: "What does buying a PUT give you the right to do?", options: [
        { text: "Buy shares at the strike price", correct: false },
        { text: "Sell shares at the strike price", correct: true },
        { text: "Hold shares forever", correct: false },
        { text: "Get free tendies", correct: false },
      ], explanation: "A PUT gives you the right to SELL 100 shares at the strike price. Bears buy puts when they think stonks go down. 🐻" },
      { question: "You buy a $50 PUT. Stock crashes to $30. What's your intrinsic value per share?", options: [
        { text: "$0 - worthless", correct: false },
        { text: "$20", correct: true },
        { text: "$50", correct: false },
        { text: "$30", correct: false },
      ], explanation: "Intrinsic value = Strike - Stock = $50 - $30 = $20. You can sell shares worth $30 for $50. That's $2,000 per contract profit. 🌈🐻💰" },
      { question: "When does a PUT become worthless?", options: [
        { text: "When stock price > strike price at expiration", correct: true },
        { text: "When stock price < strike price", correct: false },
        { text: "On Thursdays", correct: false },
        { text: "When your wife's boyfriend says so", correct: false },
      ], explanation: "If stock is ABOVE your strike at expiration, your put is worthless. Why sell at $50 when market is $60?" },
    ]
  },
  {
    id: 4, title: "Delta Δ", subtitle: "How much your option moves", xp: 75, category: "greeks",
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
      ], explanation: "Delta × Stock Move = Option Move. 0.70 × $2 = $1.40 per share, or $140 per contract." },
      { question: "What's the delta range for puts?", options: [
        { text: "0 to 1.0", correct: false },
        { text: "-1.0 to 0", correct: true },
        { text: "-0.5 to 0.5", correct: false },
        { text: "Puts don't have delta", correct: false },
      ], explanation: "Puts have NEGATIVE delta (-1.0 to 0) because they go UP when stocks go DOWN. A -0.50 delta put gains $0.50 when stock drops $1. 🐻" },
    ]
  },
  {
    id: 5, title: "Theta Θ", subtitle: "Time is money (literally)", xp: 75, category: "greeks",
    questions: [
      { question: "What does Theta measure?", options: [
        { text: "Price change per $1 stock move", correct: false },
        { text: "How much value your option loses per day", correct: true },
        { text: "Volatility sensitivity", correct: false },
        { text: "Your portfolio's diversity", correct: false },
      ], explanation: "Theta = time decay. It tells you how much value your option bleeds each day. Options are wasting assets — they literally rot." },
      { question: "Your option has theta of -0.05. After 5 days, you lose:", options: [
        { text: "$0.05", correct: false },
        { text: "$0.25 per share", correct: true },
        { text: "$5.00", correct: false },
        { text: "Nothing", correct: false },
      ], explanation: "Theta × Days = Decay. -0.05 × 5 = -$0.25 per share, or $25 per contract." },
      { question: "When does theta decay accelerate the most?", options: [
        { text: "60+ days to expiration", correct: false },
        { text: "30-45 days to expiration", correct: false },
        { text: "Final 2 weeks before expiration", correct: true },
        { text: "Theta is constant", correct: false },
      ], explanation: "Theta decay accelerates exponentially near expiration. The last 2 weeks are brutal for option buyers." },
    ]
  },
  {
    id: 6, title: "Gamma Γ & Vega V", subtitle: "The other Greeks", xp: 100, category: "greeks",
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
    id: 7, title: "Covered Calls", subtitle: "Boomer income strategy 👴", xp: 75, category: "strategies",
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
      ], explanation: "Vertical spread = Same expiry, different strikes. Caps both profit AND loss. Defined risk. 📊" },
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
    id: 10, title: "Iron Condor", subtitle: "Theta gang's favorite 🦅", xp: 125, category: "strategies",
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
    id: 12, title: "The Wheel Strategy", subtitle: "Infinite money glitch? 🎰", xp: 150, category: "strategies",
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
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [currentLesson, setCurrentLesson] = useState(null);
  const [userXp, setUserXp] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const data = await getUserProgress(firebaseUser.uid);
        if (data) {
          setUserXp(data.xp);
          setCompletedLessons(data.completedLessons);
        } else if (userXp > 0 || completedLessons.length > 0) {
          await saveUserProgress(firebaseUser.uid, userXp, completedLessons);
        }
      } else {
        setUserXp(0);
        setCompletedLessons([]);
      }
      setAuthLoading(false);
    });
  }, []);

  const getLessonStatus = (lesson, index) => {
    if (completedLessons.includes(lesson.id)) return 'completed';
    if (index === 0 || completedLessons.includes(allLessons[index - 1].id)) return 'current';
    return 'locked';
  };

  const handleStartLesson = (lesson, status) => {
    if (status === 'locked') return;
    setCurrentLesson(lesson);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setCorrectAnswers(0);
    setIsComplete(false);
  };

  const handleAnswer = (option, index) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    if (option.correct) setCorrectAnswers(prev => prev + 1);
  };

  const handleContinue = () => {
    if (currentQuestion < currentLesson.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setIsComplete(true);
    }
  };

  const handleCompleteLesson = () => {
    const earnedXp = Math.round((correctAnswers / currentLesson.questions.length) * currentLesson.xp);
    const newXp = userXp + earnedXp;
    const newCompleted = completedLessons.includes(currentLesson.id)
      ? completedLessons
      : [...completedLessons, currentLesson.id];
    setUserXp(newXp);
    setCompletedLessons(newCompleted);
    if (user) saveUserProgress(user.uid, newXp, newCompleted);
    setCurrentLesson(null);
  };

  const getLevel = () => {
    if (userXp < 100) return { name: "Smooth Brain", emoji: "🧠" };
    if (userXp < 250) return { name: "Wrinkle Forming", emoji: "🧠✨" };
    if (userXp < 500) return { name: "Paper Hands", emoji: "🧻🙌" };
    if (userXp < 750) return { name: "Diamond Hands", emoji: "💎🙌" };
    if (userXp < 1000) return { name: "Ape", emoji: "🦍" };
    return { name: "Degenerate", emoji: "👑🦍" };
  };

  const level = getLevel();

  if (authLoading) {
    return (
      <div style={{ background: '#111827', minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#9ca3af', fontSize: '16px' }}>Loading...</div>
      </div>
    );
  }

  // Lesson/Quiz Screen
  if (currentLesson) {
    if (isComplete) {
      const earnedXp = Math.round((correctAnswers / currentLesson.questions.length) * currentLesson.xp);
      const isPerfect = correctAnswers === currentLesson.questions.length;
      return (
        <div style={{ background: '#111827', minHeight: '100dvh', maxWidth: '430px', margin: '0 auto', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <div style={{ fontSize: '64px', marginBottom: '24px' }}>{isPerfect ? '🚀🚀🚀' : correctAnswers >= 2 ? '🎉' : '📚'}</div>
          <h1 style={{ color: '#fff', fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>
            {isPerfect ? "HOLY TENDIES!" : correctAnswers >= 2 ? "Not bad, retard!" : "Back to basics"}
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '16px', marginBottom: '32px' }}>
            {isPerfect ? "Your wife's boyfriend would be proud" : correctAnswers >= 2 ? "You might just make it" : "Even apes learn eventually"}
          </p>
          <div style={{ background: '#1f2937', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '300px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={{ color: '#9ca3af' }}>Correct</span>
              <span style={{ color: '#22c55e', fontWeight: '600' }}>{correctAnswers}/{currentLesson.questions.length}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#9ca3af' }}>Tendies earned</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '24px' }}>🍗</span>
                <span style={{ color: '#fbbf24', fontWeight: '600', fontSize: '20px' }}>+{earnedXp}</span>
              </div>
            </div>
          </div>
          <button onClick={handleCompleteLesson} style={{ background: '#22c55e', color: '#fff', border: 'none', borderRadius: '12px', padding: '16px 48px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}>
            💎 Continue 💎
          </button>
        </div>
      );
    }

    const question = currentLesson.questions[currentQuestion];
    const progress = ((currentQuestion + 1) / currentLesson.questions.length) * 100;

    return (
      <div style={{ background: '#111827', minHeight: '100dvh', maxWidth: '430px', margin: '0 auto', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={() => setCurrentLesson(null)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: '24px', cursor: 'pointer', padding: '4px' }}>✕</button>
          <div style={{ flex: 1, background: '#374151', borderRadius: '10px', height: '8px', overflow: 'hidden' }}>
            <div style={{ background: '#22c55e', height: '100%', width: `${progress}%`, borderRadius: '10px', transition: 'width 0.3s ease' }} />
          </div>
          <span style={{ color: '#9ca3af', fontSize: '14px' }}>{currentQuestion + 1}/{currentLesson.questions.length}</span>
        </div>

        <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '24px' }}>🧠</span>
            <span style={{ color: '#22c55e', fontSize: '14px', fontWeight: '600' }}>{currentLesson.title}</span>
          </div>
          <h2 style={{ color: '#fff', fontSize: '20px', fontWeight: '600', lineHeight: '1.4', marginBottom: '24px' }}>{question.question}</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              let bgColor = '#1f2937';
              let borderColor = '#374151';
              if (showExplanation) {
                if (option.correct) { bgColor = '#065f46'; borderColor = '#22c55e'; }
                else if (isSelected) { bgColor = '#7f1d1d'; borderColor = '#ef4444'; }
              } else if (isSelected) { borderColor = '#22c55e'; }

              return (
                <button key={index} onClick={() => handleAnswer(option, index)} disabled={showExplanation}
                  style={{ background: bgColor, border: `2px solid ${borderColor}`, borderRadius: '12px', padding: '16px', textAlign: 'left', cursor: showExplanation ? 'default' : 'pointer' }}>
                  <span style={{ color: '#fff', fontSize: '15px' }}>{option.text}</span>
                </button>
              );
            })}
          </div>

          {showExplanation && (
            <div style={{ marginTop: '24px', background: '#1e3a5f', borderRadius: '12px', padding: '16px', borderLeft: '4px solid #3b82f6' }}>
              <p style={{ color: '#93c5fd', fontSize: '14px', margin: 0, lineHeight: '1.6' }}>{question.explanation}</p>
            </div>
          )}
        </div>

        {showExplanation && (
          <div style={{ padding: '20px', paddingBottom: '36px' }}>
            <button onClick={handleContinue} style={{ width: '100%', background: '#22c55e', color: '#fff', border: 'none', borderRadius: '12px', padding: '16px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}>
              {currentQuestion < currentLesson.questions.length - 1 ? 'Continue' : 'Finish Lesson'}
            </button>
          </div>
        )}
      </div>
    );
  }

  // Home Screen
  const completedCount = completedLessons.length;
  const categories = [
    { id: 'basics', name: '📚 Basics', lessons: allLessons.filter(l => l.category === 'basics') },
    { id: 'greeks', name: '🔢 The Greeks', lessons: allLessons.filter(l => l.category === 'greeks') },
    { id: 'strategies', name: '🎯 Strategies', lessons: allLessons.filter(l => l.category === 'strategies') },
  ];

  return (
    <div style={{ background: '#111827', minHeight: '100dvh', maxWidth: '430px', margin: '0 auto', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {activeTab === 'home' && (
        <div style={{ padding: '20px', paddingBottom: '100px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: '700', margin: 0, color: '#fff' }}>Ape Academy</h1>
              <p style={{ fontSize: '14px', color: '#9ca3af', margin: '4px 0 0 0' }}>From smooth brain to wrinkled 🦍</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#1f2937', padding: '8px 12px', borderRadius: '20px' }}>
              <span style={{ fontSize: '24px' }}>🍗</span>
              <span style={{ color: '#fbbf24', fontWeight: '600' }}>{userXp}</span>
            </div>
          </div>

          <div style={{ background: 'linear-gradient(135deg, #065f46 0%, #047857 100%)', borderRadius: '16px', padding: '20px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ color: '#d1fae5', fontSize: '14px' }}>Degeneracy level</span>
              <span style={{ color: '#fff', fontWeight: '600' }}>Lvl {Math.floor(userXp / 100) + 1}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <span style={{ fontSize: '28px' }}>{level.emoji}</span>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, color: '#fff', fontWeight: '600', fontSize: '18px' }}>{level.name}</p>
                <p style={{ margin: '4px 0 0 0', color: '#a7f3d0', fontSize: '13px' }}>{completedCount}/{allLessons.length} lessons completed</p>
              </div>
            </div>
            <div style={{ background: '#064e3b', borderRadius: '10px', height: '8px', overflow: 'hidden' }}>
              <div style={{ background: '#34d399', height: '100%', width: `${(completedCount / allLessons.length) * 100}%`, borderRadius: '10px' }} />
            </div>
          </div>

          {categories.map(cat => (
            <div key={cat.id} style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#9ca3af', marginBottom: '12px' }}>{cat.name}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {cat.lessons.map((lesson) => {
                  const globalIndex = allLessons.findIndex(l => l.id === lesson.id);
                  const status = getLessonStatus(lesson, globalIndex);
                  return (
                    <div key={lesson.id} onClick={() => handleStartLesson(lesson, status)}
                      style={{ background: status === 'locked' ? '#111827' : '#1f2937', borderRadius: '12px', padding: '14px', display: 'flex', alignItems: 'center', gap: '14px', cursor: status === 'locked' ? 'not-allowed' : 'pointer', opacity: status === 'locked' ? 0.5 : 1, border: status === 'current' ? '2px solid #22c55e' : '2px solid transparent' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: status === 'completed' ? '#065f46' : status === 'current' ? '#1e3a5f' : '#374151', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {status === 'completed' ? <CheckIcon /> : status === 'locked' ? <LockIcon /> : <span style={{ color: '#fff', fontWeight: '600', fontSize: '14px' }}>{lesson.id}</span>}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ margin: 0, color: '#fff', fontSize: '15px', fontWeight: '600' }}>{lesson.title}</h3>
                        <p style={{ margin: '2px 0 0 0', color: '#6b7280', fontSize: '12px' }}>{lesson.subtitle}</p>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ fontSize: '14px' }}>🍗</span>
                        <span style={{ color: '#9ca3af', fontSize: '12px' }}>{lesson.xp}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'learn' && (
        <div style={{ padding: '20px', paddingBottom: '100px' }}>
          <h1 style={{ color: '#fff', fontSize: '24px', marginBottom: '16px' }}>Strategy Library</h1>
          <p style={{ color: '#9ca3af' }}>Quick reference coming soon... 🚀</p>
        </div>
      )}

      {activeTab === 'profile' && (
        <div style={{ padding: '20px', paddingBottom: '100px' }}>
          <h1 style={{ color: '#fff', fontSize: '24px', marginBottom: '16px' }}>Profile</h1>

          {user ? (
            <div style={{ background: '#1f2937', borderRadius: '12px', padding: '20px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <img src={user.photoURL} alt="" style={{ width: '48px', height: '48px', borderRadius: '50%' }} referrerPolicy="no-referrer" />
              <div style={{ flex: 1 }}>
                <p style={{ color: '#fff', fontWeight: '600', margin: 0 }}>{user.displayName}</p>
                <p style={{ color: '#6b7280', fontSize: '13px', margin: '2px 0 0 0' }}>{user.email}</p>
              </div>
            </div>
          ) : (
            <div style={{ background: '#1f2937', borderRadius: '12px', padding: '20px', marginBottom: '16px', textAlign: 'center' }}>
              <p style={{ color: '#9ca3af', margin: '0 0 12px 0' }}>Sign in to save your progress across devices</p>
              <button onClick={signInWithGoogle} style={{ background: '#fff', color: '#333', border: 'none', borderRadius: '8px', padding: '12px 24px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
                Sign in with Google
              </button>
            </div>
          )}

          <div style={{ background: '#1f2937', borderRadius: '12px', padding: '20px', marginBottom: '16px' }}>
            <p style={{ color: '#9ca3af', marginBottom: '8px' }}>Total Tendies</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '32px' }}>🍗</span>
              <span style={{ color: '#fbbf24', fontSize: '32px', fontWeight: '700' }}>{userXp}</span>
            </div>
          </div>
          <div style={{ background: '#1f2937', borderRadius: '12px', padding: '20px', marginBottom: '16px' }}>
            <p style={{ color: '#9ca3af', marginBottom: '8px' }}>Degeneracy Level</p>
            <p style={{ color: '#fff', fontSize: '24px', fontWeight: '600', margin: 0 }}>{level.emoji} {level.name}</p>
          </div>

          {user && (
            <button onClick={signOut} style={{ width: '100%', background: 'none', border: '1px solid #374151', borderRadius: '12px', padding: '14px', color: '#9ca3af', fontSize: '15px', cursor: 'pointer' }}>
              Sign out
            </button>
          )}
        </div>
      )}

      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '430px', background: '#1f2937', borderTop: '1px solid #374151', display: 'flex', justifyContent: 'space-around', padding: '12px 0', paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}>
        {[{ id: 'home', icon: HomeIcon, label: 'Home' }, { id: 'learn', icon: BookIcon, label: 'Library' }, { id: 'profile', icon: UserIcon, label: 'Profile' }].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', padding: '4px 16px' }}>
            <tab.icon active={activeTab === tab.id} />
            <span style={{ fontSize: '11px', color: activeTab === tab.id ? '#22c55e' : '#6b7280' }}>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}