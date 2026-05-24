'use client';

import { useEffect } from 'react';
import { onAuthChange, getUserProfile } from '@/lib/firebase/auth';
import { useAuthStore } from '@/store/authStore';

export function useAuth() {
  const { setUser, setProfile, clearAuth, setLoading } = useAuthStore();

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthChange(async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        try {
          const profile = await getUserProfile(firebaseUser.uid);
          setProfile(profile);
        } catch {
          setProfile(null);
        }
      } else {
        clearAuth();
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setProfile, clearAuth, setLoading]);

  return useAuthStore();
}
