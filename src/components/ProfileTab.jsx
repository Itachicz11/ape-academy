import { signInWithGoogle, signOut } from '../firebase';

function getLevel(xp) {
  if (xp < 100) return { name: "Smooth Brain", emoji: "\u{1F9E0}" };
  if (xp < 250) return { name: "Wrinkle Forming", emoji: "\u{1F9E0}\u2728" };
  if (xp < 500) return { name: "Paper Hands", emoji: "\u{1F9FB}\u{1F64C}" };
  if (xp < 750) return { name: "Diamond Hands", emoji: "\u{1F48E}\u{1F64C}" };
  if (xp < 1000) return { name: "Ape", emoji: "\u{1F98D}" };
  return { name: "Degenerate", emoji: "\u{1F451}\u{1F98D}" };
}

export default function ProfileTab({ user, userXp }) {
  const level = getLevel(userXp);

  return (
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
          <span style={{ fontSize: '32px' }}>{'\u{1F357}'}</span>
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
  );
}
