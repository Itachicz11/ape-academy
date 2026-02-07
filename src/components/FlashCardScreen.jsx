import { useState } from 'react';

export default function FlashCardScreen({ deck, onClose }) {
  const [cards, setCards] = useState(deck);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [mastered, setMastered] = useState([]);
  const [reviewing, setReviewing] = useState([]);
  const [phase, setPhase] = useState('study'); // 'study' | 'summary'

  const total = deck.length;
  const card = cards[currentIndex];
  const seen = mastered.length + reviewing.length;

  const handleFlip = () => setIsFlipped(true);

  const handleGotIt = () => {
    setMastered(prev => [...prev, card.id]);
    setReviewing(prev => prev.filter(id => id !== card.id));
    advance();
  };

  const handleStillLearning = () => {
    setReviewing(prev => prev.includes(card.id) ? prev : [...prev, card.id]);
    setCards(prev => [...prev, card]);
    advance(true);
  };

  const advance = (addedBack = false) => {
    setIsFlipped(false);
    const next = currentIndex + 1;
    const effectiveLength = cards.length + (addedBack ? 1 : 0);
    if (next >= effectiveLength) {
      setPhase('summary');
    } else {
      setCurrentIndex(next);
    }
  };

  const handleRetryMissed = () => {
    const missedCards = cards.filter(c => reviewing.includes(c.id));
    if (missedCards.length === 0) return;
    setCards(missedCards);
    setCurrentIndex(0);
    setIsFlipped(false);
    setMastered([]);
    setReviewing([]);
    setPhase('study');
  };

  // Summary phase
  if (phase === 'summary') {
    return (
      <div style={{ background: '#111827', minHeight: '100dvh', maxWidth: '430px', margin: '0 auto', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🧠</div>
        <h2 style={{ color: '#fff', fontSize: '22px', fontWeight: '700', margin: '0 0 8px 0' }}>Session Complete</h2>
        <p style={{ color: '#9ca3af', fontSize: '14px', margin: '0 0 32px 0' }}>Nice work, ape. Here's how you did:</p>

        <div style={{ display: 'flex', gap: '24px', marginBottom: '40px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '36px', fontWeight: '700', color: '#22c55e' }}>{mastered.length}</div>
            <div style={{ color: '#9ca3af', fontSize: '13px' }}>Mastered</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '36px', fontWeight: '700', color: '#f59e0b' }}>{reviewing.length}</div>
            <div style={{ color: '#9ca3af', fontSize: '13px' }}>Reviewing</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '280px' }}>
          {reviewing.length > 0 && (
            <button onClick={handleRetryMissed} style={{ background: '#f59e0b', color: '#000', border: 'none', borderRadius: '12px', padding: '14px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' }}>
              Study Again ({reviewing.length} cards)
            </button>
          )}
          <button onClick={onClose} style={{ background: '#1f2937', color: '#fff', border: '1px solid #374151', borderRadius: '12px', padding: '14px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' }}>
            Done
          </button>
        </div>
      </div>
    );
  }

  // Study phase
  const remaining = cards.length - currentIndex;

  return (
    <div style={{ background: '#111827', minHeight: '100dvh', maxWidth: '430px', margin: '0 auto', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px' }}>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: '14px', cursor: 'pointer', padding: '4px' }}>
          Close
        </button>
        <span style={{ color: '#9ca3af', fontSize: '13px' }}>{remaining} remaining</span>
      </div>

      {/* Progress bar */}
      <div style={{ padding: '0 20px', marginBottom: '24px' }}>
        <div style={{ height: '4px', background: '#1f2937', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{ height: '100%', background: '#22c55e', borderRadius: '2px', width: `${(seen / total) * 100}%`, transition: 'width 0.3s' }} />
        </div>
        <div style={{ color: '#6b7280', fontSize: '12px', marginTop: '6px', textAlign: 'center' }}>
          {seen} / {total} reviewed
        </div>
      </div>

      {/* Card */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 20px', marginBottom: isFlipped ? '8px' : '80px' }}>
        <div
          onClick={!isFlipped ? handleFlip : undefined}
          style={{
            perspective: '1000px',
            cursor: !isFlipped ? 'pointer' : 'default',
          }}
        >
          <div style={{
            position: 'relative',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.4s',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}>
            {/* Front */}
            <div style={{
              background: '#1f2937',
              borderRadius: '16px',
              padding: '40px 24px',
              minHeight: '220px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backfaceVisibility: 'hidden',
            }}>
              {card.front.subtitle && (
                <div style={{ color: '#6b7280', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.5px' }}>
                  {card.front.subtitle}
                </div>
              )}
              <h2 style={{ color: '#fff', fontSize: '24px', fontWeight: '700', margin: 0, textAlign: 'center', lineHeight: '1.3' }}>
                {card.front.title}
              </h2>
              {!isFlipped && (
                <div style={{ color: '#6b7280', fontSize: '13px', marginTop: '24px' }}>Tap to flip</div>
              )}
            </div>

            {/* Back */}
            <div style={{
              background: '#1f2937',
              borderRadius: '16px',
              padding: '24px',
              minHeight: '220px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              overflowY: 'auto',
              maxHeight: '400px',
            }}>
              {card.back.lines.map((line, i) => (
                <p key={i} style={{ color: '#d1d5db', fontSize: '14px', lineHeight: '1.6', margin: i === 0 ? 0 : '10px 0 0 0' }}>
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons (only after flip) */}
      {isFlipped && (
        <div style={{ padding: '16px 20px', paddingBottom: 'max(20px, env(safe-area-inset-bottom))', display: 'flex', gap: '12px' }}>
          <button onClick={handleStillLearning} style={{ flex: 1, background: '#78350f', color: '#f59e0b', border: 'none', borderRadius: '12px', padding: '14px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' }}>
            Still learning
          </button>
          <button onClick={handleGotIt} style={{ flex: 1, background: '#065f46', color: '#22c55e', border: 'none', borderRadius: '12px', padding: '14px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' }}>
            Got it
          </button>
        </div>
      )}
    </div>
  );
}
