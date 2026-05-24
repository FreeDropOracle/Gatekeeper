import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, isFirebaseReady } from './config';
import type { UserProfile } from '@/types';

const provider = isFirebaseReady ? new GoogleAuthProvider() : null;

export async function signInWithGoogle(): Promise<FirebaseUser> {
  if (!auth || !provider) throw new Error('Firebase not configured');

  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  const userRef = doc(db!, 'users', user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    const newUser: Omit<UserProfile, 'uid'> = {
      displayName: user.displayName || 'مستخدم جديد',
      email: user.email || '',
      photoURL: user.photoURL || '',
      preferences: {
        reducedMotion: false,
        defaultView: 'grid',
      },
      createdAt: serverTimestamp(),
    };
    await setDoc(userRef, newUser);
  }

  return user;
}

export async function logOut(): Promise<void> {
  if (!auth) throw new Error('Firebase not configured');
  await signOut(auth);
}

export function onAuthChange(callback: (user: FirebaseUser | null) => void) {
  if (!auth) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  if (!db) throw new Error('Firebase not configured');
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) return null;
  return { uid, ...userSnap.data() } as UserProfile;
}
