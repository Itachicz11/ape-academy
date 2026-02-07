import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, getUserProgress, saveUserProgress } from './firebase';
import allLessons from './data/lessons';
import { HomeIcon, BookIcon, UserIcon } from './components/icons';
import HomeTab from './components/HomeTab';
import LibraryTab from './components/LibraryTab';
import ProfileTab from './components/ProfileTab';
import QuizScreen from './components/QuizScreen';
import FlashCardScreen from './components/FlashCardScreen';
import { buildDeck } from './data/flashcards';
import DebugPanel from './components/DebugPanel';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [userXp, setUserXp] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [missedQuestions, setMissedQuestions] = useState([]);

  // Quiz state
  const [currentLesson, setCurrentLesson] = useState(null);
  const [isReview, setIsReview] = useState(false);
  const [isReplay, setIsReplay] = useState(false);
  const [reviewQuestions, setReviewQuestions] = useState([]);

  // Flash card state
  const [flashCardDeck, setFlashCardDeck] = useState(null);

  useEffect(() => {
    return onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const data = await getUserProgress(firebaseUser.uid);
        if (data) {
          setUserXp(data.xp);
          setCompletedLessons(data.completedLessons || []);
          setMissedQuestions(data.missedQuestions || []);
        }
      } else {
        setUserXp(0);
        setCompletedLessons([]);
        setMissedQuestions([]);
      }
      setAuthLoading(false);
    });
  }, []);

  const handleStartLesson = (lesson, status) => {
    if (status === 'locked') return;
    setCurrentLesson(lesson);
    setIsReview(false);
    setIsReplay(status === 'completed');
    setReviewQuestions([]);
  };

  const handleStartFlashCards = (category) => {
    setFlashCardDeck(buildDeck(category));
  };

  const handleStartReview = () => {
    // Filter due items and validate they still reference valid lesson/question
    const due = missedQuestions.filter(mq => {
      if (mq.reviewed || !completedLessons.includes(mq.reviewAfterLesson)) return false;
      const lesson = allLessons.find(l => l.id === mq.lessonId);
      return lesson && mq.questionIndex < lesson.questions.length;
    });
    if (due.length === 0) return;

    const questions = due.map(mq => {
      const lesson = allLessons.find(l => l.id === mq.lessonId);
      return lesson.questions[mq.questionIndex];
    });

    setReviewQuestions(questions);
    setCurrentLesson({ id: 'review', title: 'Review', xp: 0, questions });
    setIsReview(true);
    setIsReplay(false);
  };

  const handleQuizComplete = (earnedXp, missedIndices) => {
    let newXp = userXp;
    let newCompleted = completedLessons;
    let newMissed = [...missedQuestions];

    if (isReview) {
      // Mark reviewed questions (same validated filter as handleStartReview)
      const due = newMissed.filter(mq => {
        if (mq.reviewed || !completedLessons.includes(mq.reviewAfterLesson)) return false;
        const lesson = allLessons.find(l => l.id === mq.lessonId);
        return lesson && mq.questionIndex < lesson.questions.length;
      });

      due.forEach((mq, i) => {
        const idx = newMissed.indexOf(mq);
        if (idx === -1) return;
        if (missedIndices.includes(i)) {
          // Still wrong — bump reviewAfterLesson by 1
          newMissed[idx] = { ...mq, reviewAfterLesson: mq.reviewAfterLesson + 1 };
        } else {
          // Got it right — mark reviewed
          newMissed[idx] = { ...mq, reviewed: true };
        }
      });
    } else if (isReplay) {
      // Replay: track missed for spaced repetition but no XP
      missedIndices.forEach(qi => {
        const existing = newMissed.find(
          mq => mq.lessonId === currentLesson.id && mq.questionIndex === qi && !mq.reviewed
        );
        if (existing) {
          // Bump review time
          const idx = newMissed.indexOf(existing);
          const maxCompleted = completedLessons.reduce((m, v) => Math.max(m, v), 0);
          newMissed[idx] = { ...existing, reviewAfterLesson: maxCompleted + 2 };
        } else {
          const maxCompleted = completedLessons.reduce((m, v) => Math.max(m, v), 0);
          newMissed.push({
            lessonId: currentLesson.id,
            questionIndex: qi,
            missedAt: Date.now(),
            reviewAfterLesson: maxCompleted + 2,
            reviewed: false,
          });
        }
      });
    } else {
      // Normal lesson completion
      newXp = userXp + earnedXp;
      newCompleted = completedLessons.includes(currentLesson.id)
        ? completedLessons
        : [...completedLessons, currentLesson.id];

      // Track missed questions for spaced repetition
      missedIndices.forEach(qi => {
        const existing = newMissed.find(
          mq => mq.lessonId === currentLesson.id && mq.questionIndex === qi && !mq.reviewed
        );
        if (existing) {
          const idx = newMissed.indexOf(existing);
          newMissed[idx] = { ...existing, reviewAfterLesson: currentLesson.id + 2 };
        } else {
          newMissed.push({
            lessonId: currentLesson.id,
            questionIndex: qi,
            missedAt: Date.now(),
            reviewAfterLesson: currentLesson.id + 2,
            reviewed: false,
          });
        }
      });
    }

    setUserXp(newXp);
    setCompletedLessons(newCompleted);
    setMissedQuestions(newMissed);
    if (user) saveUserProgress(user.uid, newXp, newCompleted, newMissed);
    setCurrentLesson(null);
    setIsReview(false);
    setIsReplay(false);
    setReviewQuestions([]);
  };

  if (authLoading) {
    return (
      <div style={{ background: '#111827', minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#9ca3af', fontSize: '16px' }}>Loading...</div>
      </div>
    );
  }

  // Flash card screen
  if (flashCardDeck) {
    return (
      <FlashCardScreen
        deck={flashCardDeck}
        onClose={() => setFlashCardDeck(null)}
      />
    );
  }

  // Quiz/Review/Replay screen
  if (currentLesson) {
    return (
      <QuizScreen
        lesson={currentLesson}
        questions={isReview ? reviewQuestions : undefined}
        isReview={isReview}
        isReplay={isReplay}
        onClose={() => {
          setCurrentLesson(null);
          setIsReview(false);
          setIsReplay(false);
          setReviewQuestions([]);
        }}
        onComplete={handleQuizComplete}
      />
    );
  }

  // Main app with tabs
  return (
    <div style={{ background: '#111827', minHeight: '100dvh', maxWidth: '430px', margin: '0 auto', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {activeTab === 'home' && (
        <HomeTab
          userXp={userXp}
          completedLessons={completedLessons}
          missedQuestions={missedQuestions}
          onStartLesson={handleStartLesson}
          onStartReview={handleStartReview}
        />
      )}

      {activeTab === 'learn' && <LibraryTab onStartFlashCards={handleStartFlashCards} />}

      {activeTab === 'profile' && (
        <ProfileTab user={user} userXp={userXp} />
      )}

      {import.meta.env.DEV && (
        <DebugPanel
          completedLessons={completedLessons}
          missedQuestions={missedQuestions}
          userXp={userXp}
          onSetCompletedLessons={setCompletedLessons}
          onSetMissedQuestions={setMissedQuestions}
          onSetUserXp={setUserXp}
          onStartLesson={handleStartLesson}
          onStartReview={handleStartReview}
          onSetActiveTab={setActiveTab}
        />
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
