'use client';

import { useState, useEffect } from 'react';

const STREAK_KEY = 'gatekeeper_streak';

interface StreakData {
  count: number;
  lastVisit: string; // ISO date string YYYY-MM-DD
}

function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

function getStoredStreak(): StreakData {
  if (typeof window === 'undefined') return { count: 0, lastVisit: '' };
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return { count: 0, lastVisit: '' };
}

function saveStreak(data: StreakData) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STREAK_KEY, JSON.stringify(data));
}

export function useStreak() {
  const [streak, setStreak] = useState<StreakData>({ count: 0, lastVisit: '' });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = getStoredStreak();
    const today = getToday();

    if (stored.lastVisit === today) {
      setStreak(stored);
      return;
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (stored.lastVisit === yesterdayStr) {
      const updated = { count: stored.count + 1, lastVisit: today };
      saveStreak(updated);
      setStreak(updated);
    } else {
      const updated = { count: 1, lastVisit: today };
      saveStreak(updated);
      setStreak(updated);
    }
  }, []);

  return { streak, mounted };
}
