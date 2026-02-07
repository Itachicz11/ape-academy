import { useState } from 'react';

export default function QuizScreen({ lesson, questions, isReview, isReplay, onClose, onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [missedIndices, setMissedIndices] = useState([]);
  const [isComplete, setIsComplete] = useState(false);

  const activeQuestions = questions || lesson.questions;
  const totalQuestions = activeQuestions.length;
  const question = activeQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleAnswer = (option, index) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    if (option.correct) {
      setCorrectAnswers(prev => prev + 1);
    } else {
      setMissedIndices(prev => [...prev, currentQuestion]);
    }
  };

  const handleContinue = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setIsComplete(true);
    }
  };

  const handleFinish = () => {
    const earnedXp = (isReview || isReplay)
      ? 0
      : Math.round((correctAnswers / totalQuestions) * lesson.xp);
    onComplete(earnedXp, missedIndices);
  };

  // Completion screen
  if (isComplete) {
    const earnedXp = (isReview || isReplay)
      ? 0
      : Math.round((correctAnswers / totalQuestions) * lesson.xp);
    const isPerfect = correctAnswers === totalQuestions;

    let title, subtitle;
    if (isReview) {
      title = isPerfect ? "Nailed the review!" : "Keep grinding!";
      subtitle = isPerfect ? "Those questions won't bother you again" : "Missed ones will come back for another round";
    } else if (isReplay) {
      title = isPerfect ? "Still got it!" : "Practice makes perfect!";
      subtitle = isPerfect ? "Smooth brain? Never heard of her" : "Repetition builds wrinkles";
    } else {
      title = isPerfect ? "HOLY TENDIES!" : correctAnswers >= Math.ceil(totalQuestions * 0.66) ? "Not bad, retard!" : "Back to basics";
      subtitle = isPerfect ? "Your wife's boyfriend would be proud" : correctAnswers >= Math.ceil(totalQuestions * 0.66) ? "You might just make it" : "Even apes learn eventually";
    }

    const emoji = isPerfect ? '\u{1F680}\u{1F680}\u{1F680}' : correctAnswers >= Math.ceil(totalQuestions * 0.66) ? '\u{1F389}' : '\u{1F4DA}';

    return (
      <div style={{ background: '#111827', minHeight: '100dvh', maxWidth: '430px', margin: '0 auto', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ fontSize: '64px', marginBottom: '24px' }}>{emoji}</div>
        <h1 style={{ color: '#fff', fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>{title}</h1>
        <p style={{ color: '#9ca3af', fontSize: '16px', marginBottom: '32px' }}>{subtitle}</p>
        <div style={{ background: '#1f2937', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '300px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ color: '#9ca3af' }}>Correct</span>
            <span style={{ color: '#22c55e', fontWeight: '600' }}>{correctAnswers}/{totalQuestions}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#9ca3af' }}>{isReview ? 'Mode' : isReplay ? 'Mode' : 'Tendies earned'}</span>
            {(isReview || isReplay) ? (
              <span style={{ color: '#9ca3af', fontSize: '14px', fontStyle: 'italic' }}>
                {isReview ? 'Review' : 'Practice'} — 0 XP
              </span>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '24px' }}>{'\u{1F357}'}</span>
                <span style={{ color: '#fbbf24', fontWeight: '600', fontSize: '20px' }}>+{earnedXp}</span>
              </div>
            )}
          </div>
        </div>
        {(isReview || isReplay) && (
          <div style={{
            background: '#1e3a5f', borderRadius: '12px', padding: '12px 16px',
            marginBottom: '16px', width: '100%', maxWidth: '300px',
          }}>
            <span style={{ color: '#93c5fd', fontSize: '13px' }}>
              {isReview ? '\u{1F504} Review mode' : '\u{1F3AE} Practice mode'} — no XP awarded
            </span>
          </div>
        )}
        <button onClick={handleFinish} style={{ background: '#22c55e', color: '#fff', border: 'none', borderRadius: '12px', padding: '16px 48px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}>
          {'\u{1F48E}'} Continue {'\u{1F48E}'}
        </button>
      </div>
    );
  }

  // Quiz screen
  return (
    <div style={{ background: '#111827', minHeight: '100dvh', maxWidth: '430px', margin: '0 auto', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: '24px', cursor: 'pointer', padding: '4px' }}>{'\u2715'}</button>
        <div style={{ flex: 1, background: '#374151', borderRadius: '10px', height: '8px', overflow: 'hidden' }}>
          <div style={{ background: isReview ? '#f59e0b' : isReplay ? '#8b5cf6' : '#22c55e', height: '100%', width: `${progress}%`, borderRadius: '10px', transition: 'width 0.3s ease' }} />
        </div>
        <span style={{ color: '#9ca3af', fontSize: '14px' }}>{currentQuestion + 1}/{totalQuestions}</span>
      </div>

      {/* Mode badge */}
      {(isReview || isReplay) && (
        <div style={{ padding: '0 20px 4px', display: 'flex' }}>
          <span style={{
            background: isReview ? 'linear-gradient(135deg, #92400e, #b45309)' : 'linear-gradient(135deg, #5b21b6, #7c3aed)',
            color: '#fff', fontSize: '11px', fontWeight: '600', padding: '4px 10px',
            borderRadius: '20px',
          }}>
            {isReview ? '\u{1F504} Review Mode' : '\u{1F3AE} Practice Mode'}
          </span>
        </div>
      )}

      <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '24px' }}>{'\u{1F9E0}'}</span>
          <span style={{ color: isReview ? '#f59e0b' : isReplay ? '#8b5cf6' : '#22c55e', fontSize: '14px', fontWeight: '600' }}>
            {isReview ? 'Review' : lesson.title}
          </span>
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
            {currentQuestion < totalQuestions - 1 ? 'Continue' : 'Finish'}
          </button>
        </div>
      )}
    </div>
  );
}
