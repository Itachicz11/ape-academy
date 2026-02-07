import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut as firebaseSignOut } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

const app = initializeApp({
  apiKey: import.meta.env.ACADEMY_FIREBASE_API,
  authDomain: import.meta.env.ACADEMY_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.ACADEMY_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.ACADEMY_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.ACADEMY_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.ACADEMY_FIREBASE_APP_ID,
});

export const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export function signInWithGoogle() {
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
  return isStandalone ? signInWithRedirect(auth, provider) : signInWithPopup(auth, provider);
}

export function signOut() {
  return firebaseSignOut(auth);
}

export async function getUserProgress(uid) {
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? snap.data() : null;
}

export async function saveUserProgress(uid, xp, completedLessons, missedQuestions = null) {
  const data = { xp, completedLessons, updatedAt: serverTimestamp() };
  if (missedQuestions !== null) data.missedQuestions = missedQuestions;
  return setDoc(doc(db, 'users', uid), data, { merge: true });
}
