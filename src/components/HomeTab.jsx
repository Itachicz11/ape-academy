import allLessons from '../data/lessons';
import { CheckIcon, LockIcon } from './icons';

const categories = [
  { id: 'basics', name: '\u{1F4DA} Basics', lessons: allLessons.filter(l => l.category === 'basics') },
  { id: 'greeks', name: '\u{1F522} The Greeks', lessons: allLessons.filter(l => l.category === 'greeks') },
  { id: 'strategies', name: '\u{1F3AF} Strategies', lessons: allLessons.filter(l => l.category === 'strategies') },
  { id: 'risk', name: '\u{1F6E1}\u{FE0F} Risk Management', lessons: allLessons.filter(l => l.category === 'risk') },
  { id: 'real-world', name: '\u{1F30D} Real World', lessons: allLessons.filter(l => l.category === 'real-world') },
];

export default function HomeTab({ userXp, completedLessons, missedQuestions, onStartLesson, onStartReview }) {
  const completedCount = completedLessons.length;
  const level = getLevel(userXp);

  const dueForReview = missedQuestions.filter(
    mq => !mq.reviewed && completedLessons.includes(mq.reviewAfterLesson)
  );

  const getLessonStatus = (lesson, index) => {
    if (completedLessons.includes(lesson.id)) return 'completed';
    if (index === 0 || completedLessons.includes(allLessons[index - 1].id)) return 'current';
    return 'locked';
  };

  return (
    <div style={{ padding: '20px', paddingBottom: '100px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', margin: 0, color: '#fff' }}>Ape Academy</h1>
          <p style={{ fontSize: '14px', color: '#9ca3af', margin: '4px 0 0 0' }}>From smooth brain to wrinkled {'\u{1F98D}'}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#1f2937', padding: '8px 12px', borderRadius: '20px' }}>
          <span style={{ fontSize: '24px' }}>{'\u{1F357}'}</span>
          <span style={{ color: '#fbbf24', fontWeight: '600' }}>{userXp}</span>
        </div>
      </div>

      {/* Progress banner */}
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

      {/* Review prompt card */}
      {dueForReview.length > 0 && (
        <div
          onClick={onStartReview}
          style={{
            background: 'linear-gradient(135deg, #92400e 0%, #b45309 100%)',
            borderRadius: '16px', padding: '16px 20px', marginBottom: '24px',
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '14px',
          }}
        >
          <span style={{ fontSize: '32px' }}>{'\u{1F504}'}</span>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, color: '#fff', fontWeight: '600', fontSize: '16px' }}>
              {dueForReview.length} question{dueForReview.length > 1 ? 's' : ''} to review
            </p>
            <p style={{ margin: '2px 0 0 0', color: '#fde68a', fontSize: '13px' }}>
              Tap to strengthen your weak spots
            </p>
          </div>
          <span style={{ color: '#fde68a', fontSize: '20px' }}>{'\u203A'}</span>
        </div>
      )}

      {/* Lesson categories */}
      {categories.map(cat => (
        <div key={cat.id} style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#9ca3af', marginBottom: '12px' }}>{cat.name}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {cat.lessons.map((lesson) => {
              const globalIndex = allLessons.findIndex(l => l.id === lesson.id);
              const status = getLessonStatus(lesson, globalIndex);
              return (
                <div key={lesson.id} onClick={() => onStartLesson(lesson, status)}
                  style={{ background: status === 'locked' ? '#111827' : '#1f2937', borderRadius: '12px', padding: '14px', display: 'flex', alignItems: 'center', gap: '14px', cursor: status === 'locked' ? 'not-allowed' : 'pointer', opacity: status === 'locked' ? 0.5 : 1, border: status === 'current' ? '2px solid #22c55e' : '2px solid transparent' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: status === 'completed' ? '#065f46' : status === 'current' ? '#1e3a5f' : '#374151', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {status === 'completed' ? <CheckIcon /> : status === 'locked' ? <LockIcon /> : <span style={{ color: '#fff', fontWeight: '600', fontSize: '14px' }}>{lesson.id}</span>}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: 0, color: '#fff', fontSize: '15px', fontWeight: '600' }}>{lesson.title}</h3>
                    <p style={{ margin: '2px 0 0 0', color: '#6b7280', fontSize: '12px' }}>{lesson.subtitle}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ fontSize: '14px' }}>{'\u{1F357}'}</span>
                    <span style={{ color: '#9ca3af', fontSize: '12px' }}>{lesson.xp}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function getLevel(xp) {
  if (xp < 100) return { name: "Smooth Brain", emoji: "\u{1F9E0}" };
  if (xp < 250) return { name: "Wrinkle Forming", emoji: "\u{1F9E0}\u2728" };
  if (xp < 500) return { name: "Paper Hands", emoji: "\u{1F9FB}\u{1F64C}" };
  if (xp < 750) return { name: "Diamond Hands", emoji: "\u{1F48E}\u{1F64C}" };
  if (xp < 1000) return { name: "Ape", emoji: "\u{1F98D}" };
  return { name: "Degenerate", emoji: "\u{1F451}\u{1F98D}" };
}
