import { useState } from 'react';
import allLessons from '../data/lessons';

const btnStyle = {
  width: '100%', background: '#374151', color: '#d1d5db', border: 'none',
  borderRadius: '6px', padding: '8px 10px', fontSize: '12px', cursor: 'pointer',
  textAlign: 'left',
};
const sectionLabel = { color: '#6b7280', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', margin: '8px 0 4px' };

export default function DebugPanel({
  completedLessons, missedQuestions, userXp,
  onSetCompletedLessons, onSetMissedQuestions, onSetUserXp,
  onStartLesson, onStartReview, onSetActiveTab,
}) {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  // Seed: mark first N lessons as completed
  const seedCompleted = (n) => {
    onSetCompletedLessons(allLessons.slice(0, n).map(l => l.id));
  };

  // Inject missed questions that are immediately due for review
  const seedMissedQuestions = () => {
    const maxCompleted = completedLessons.reduce((m, v) => Math.max(m, v), 0);
    const seeded = [
      { lessonId: 1, questionIndex: 0, missedAt: Date.now(), reviewAfterLesson: maxCompleted, reviewed: false },
      { lessonId: 1, questionIndex: 2, missedAt: Date.now(), reviewAfterLesson: maxCompleted, reviewed: false },
      { lessonId: 2, questionIndex: 1, missedAt: Date.now(), reviewAfterLesson: maxCompleted, reviewed: false },
    ];
    onSetMissedQuestions([...missedQuestions, ...seeded]);
  };

  // Open a specific lesson in replay mode directly
  const replayLesson = (id) => {
    const lesson = allLessons.find(l => l.id === id);
    if (lesson) onStartLesson(lesson, 'completed');
  };

  const resetAll = () => {
    onSetCompletedLessons([]);
    onSetMissedQuestions([]);
    onSetUserXp(0);
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        style={{
          position: 'fixed', bottom: '72px', left: '8px', zIndex: 9999,
          background: '#7c3aed', color: '#fff', border: 'none', borderRadius: '50%',
          width: '32px', height: '32px', fontSize: '14px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: 0.7,
        }}
        title="Debug Panel"
      >
        D
      </button>
    );
  }

  return (
    <div style={{
      position: 'fixed', bottom: '72px', left: '8px', zIndex: 9999,
      background: '#1f2937', border: '1px solid #7c3aed', borderRadius: '12px',
      padding: '12px', width: '220px', maxHeight: '70vh', overflowY: 'auto',
      boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
        <span style={{ color: '#a78bfa', fontSize: '12px', fontWeight: '700' }}>Debug Panel</span>
        <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer', fontSize: '16px' }}>{'\u2715'}</button>
      </div>

      {/* Toast */}
      {toast && (
        <div style={{ background: '#92400e', color: '#fde68a', fontSize: '11px', padding: '6px 8px', borderRadius: '6px', marginBottom: '6px' }}>
          {toast}
        </div>
      )}

      {/* Current state */}
      <div style={{ color: '#6b7280', fontSize: '10px', marginBottom: '8px', lineHeight: '1.5' }}>
        XP: {userXp} | Completed: [{completedLessons.join(',')}]<br />
        Missed: {missedQuestions.filter(m => !m.reviewed).length} pending
      </div>

      {/* Seed data */}
      <div style={sectionLabel}>Seed State</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <button style={btnStyle} onClick={() => seedCompleted(3)}>Complete first 3 lessons</button>
        <button style={btnStyle} onClick={() => seedCompleted(6)}>Complete first 6 lessons</button>
        <button style={btnStyle} onClick={() => seedCompleted(12)}>Complete all 12 lessons</button>
        <button style={btnStyle} onClick={() => onSetUserXp(userXp + 200)}>+200 XP</button>
        <button style={btnStyle} onClick={seedMissedQuestions}>Inject 3 due reviews</button>
      </div>

      {/* Quick nav */}
      <div style={sectionLabel}>Quick Nav</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <button style={btnStyle} onClick={() => {
          const due = missedQuestions.filter(mq => !mq.reviewed && completedLessons.includes(mq.reviewAfterLesson));
          if (due.length === 0) { showToast('No reviews due — inject some first'); return; }
          onStartReview();
        }}>Open Review Mode</button>
        <button style={btnStyle} onClick={() => replayLesson(1)}>Replay: Lesson 1</button>
        <button style={btnStyle} onClick={() => replayLesson(7)}>Replay: Lesson 7 (Covered Calls)</button>
        <button style={{ ...btnStyle, background: '#1e3a5f' }} onClick={() => onSetActiveTab('learn')}>Library: Payoffs</button>
        <button style={{ ...btnStyle, background: '#1e3a5f' }} onClick={() => onSetActiveTab('learn')}>Library Tab</button>
      </div>

      {/* Reset */}
      <div style={sectionLabel}>Danger Zone</div>
      <button
        style={{ ...btnStyle, background: '#7f1d1d', color: '#fca5a5' }}
        onClick={resetAll}
      >
        Reset all progress
      </button>
    </div>
  );
}
