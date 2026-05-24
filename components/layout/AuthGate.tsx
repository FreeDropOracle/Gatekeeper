'use client';

import { useEffect, type ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { onAuthChange, getUserProfile } from '@/lib/firebase/auth';
import { useAuthStore } from '@/store/authStore';
import { useWorkspaceStore } from '@/store/workspaceStore';
import { isFirebaseReady } from '@/lib/firebase/config';
import { DEMO_USER, DEMO_CATEGORIES, DEMO_LINKS, DEMO_PROGRESS, DEMO_ACHIEVEMENTS } from '@/lib/demo';

const PROTECTED_ROUTES = ['/dashboard', '/settings', '/achievements'];

export function AuthGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, loading, setUser, setProfile, clearAuth, setLoading } = useAuthStore();
  const { setCategories, setLinks, setProgress, setAchievements } = useWorkspaceStore();

  useEffect(() => {
    if (!isFirebaseReady) {
      setUser(DEMO_USER as any);
      setProfile(DEMO_USER);
      setCategories(DEMO_CATEGORIES);
      setLinks(DEMO_LINKS as any);
      setProgress(DEMO_PROGRESS);
      setAchievements(DEMO_ACHIEVEMENTS);
      setLoading(false);
      return;
    }

    const unsub = onAuthChange(async (firebaseUser) => {
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
    });
    return () => unsub();
  }, [setUser, setProfile, clearAuth, setLoading, setCategories, setLinks, setProgress, setAchievements]);

  useEffect(() => {
    if (loading) return;
    const isProtected = PROTECTED_ROUTES.some((r) => pathname.startsWith(r));
    if (isProtected && !isAuthenticated) {
      router.replace('/');
    }
  }, [pathname, isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a14]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-[#00f0ff] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-[#64748b]">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
