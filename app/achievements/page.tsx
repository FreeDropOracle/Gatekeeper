'use client';

import { useEffect } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { GlassCard } from '@/components/ui/GlassCard';
import { useAuthStore } from '@/store/authStore';
import { useWorkspaceStore } from '@/store/workspaceStore';
import { useStreak } from '@/hooks/useStreak';
import { SYSTEM_BADGES } from '@/lib/constants';
import { fetchAchievements } from '@/lib/firebase/firestore';
import { isFirebaseReady } from '@/lib/firebase/config';
import { Trophy, Lock, Check, Flame, Target, Star, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';

const BadgeGallery = dynamic(() => import('@/components/achievements/BadgeGallery').then((m) => m.BadgeGallery), { ssr: false });
const StatsGrid = dynamic(() => import('@/components/achievements/StatsGrid').then((m) => m.StatsGrid), { ssr: false });

export default function AchievementsPage() {
  const { user } = useAuthStore();
  const { achievements, setAchievements } = useWorkspaceStore();
  const { streak } = useStreak();

  useEffect(() => {
    if (!user || !isFirebaseReady) return;
    fetchAchievements(user.uid).then(setAchievements).catch(console.error);
  }, [user, setAchievements]);

  const unlockedIds = new Set(achievements.map((a) => a.badgeId));
  const unlockedCount = achievements.length;
  const totalBadges = SYSTEM_BADGES.length;
  const pct = totalBadges > 0 ? Math.round((unlockedCount / totalBadges) * 100) : 0;

  return (
    <AppShell>
      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-[#e0fcff] mb-2 flex items-center gap-3">
            <Trophy className="w-6 h-6 text-[#f59e0b]" />
            قاعة الشرف
          </h1>
          <p className="text-sm text-[#94a3b8]">{unlockedCount} من {totalBadges} شارات مكتسبة</p>
        </header>

        {/* Fire streak + Progress */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <GlassCard className="text-center p-5">
            <Flame className="w-8 h-8 text-[#f59e0b] mx-auto mb-2" />
            <div className="text-2xl font-bold text-[#e0fcff]">{streak.count}</div>
            <div className="text-xs text-[#64748b] mt-1">أيام متتالية</div>
          </GlassCard>
          <GlassCard className="text-center p-5">
            <Trophy className="w-8 h-8 text-[#00f0ff] mx-auto mb-2" />
            <div className="text-2xl font-bold text-[#e0fcff]">{unlockedCount}</div>
            <div className="text-xs text-[#64748b] mt-1">شارات مكتسبة</div>
          </GlassCard>
          <GlassCard className="text-center p-5">
            <Target className="w-8 h-8 text-[#8b5cf6] mx-auto mb-2" />
            <div className="text-2xl font-bold text-[#e0fcff]">{totalBadges - unlockedCount}</div>
            <div className="text-xs text-[#64748b] mt-1">المتبقي</div>
          </GlassCard>
          <GlassCard className="text-center p-5">
            <Star className="w-8 h-8 text-[#10b981] mx-auto mb-2" />
            <div className="text-2xl font-bold text-[#e0fcff]">{pct}%</div>
            <div className="text-xs text-[#64748b] mt-1">نسبة الإنجاز</div>
          </GlassCard>
        </div>

        {/* Progress bar */}
        <GlassCard className="mb-8 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[#94a3b8]">تقدم الشارات</span>
            <span className="text-sm text-[#00f0ff]">{unlockedCount}/{totalBadges}</span>
          </div>
          <div className="h-3 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
            <div
              className={cn(
                'h-full rounded-full transition-all duration-700 ease-out',
                pct >= 80 ? 'bg-[#10b981]' : pct >= 40 ? 'bg-[#00f0ff]' : 'bg-[#f59e0b]'
              )}
              style={{ width: `${pct}%` }}
            />
          </div>
        </GlassCard>

        {/* Badges gallery */}
        <StatsGrid unlockedCount={unlockedCount} pct={pct} totalBadges={totalBadges} />
        <BadgeGallery badges={SYSTEM_BADGES} unlockedIds={unlockedIds} />

        {/* Share section */}
        <GlassCard className="mt-6 p-5 text-center">
          <h3 className="text-lg font-semibold text-[#e0fcff] mb-2">شارك إنجازاتك</h3>
          <p className="text-sm text-[#94a3b8] mb-4">أظهر تقدمك لأصدقائك</p>
          <button
            onClick={() => {
              const text = `🏆 GateKeeper - ${unlockedCount}/${totalBadges} شارات\n🔥 استمرارية: ${streak.count} أيام\n${pct}% إنجاز كامل`;
              navigator.clipboard?.writeText(text).then(() => alert('تم النسخ!'));
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[rgba(0,240,255,0.15)] text-[#00f0ff] rounded-xl hover:bg-[rgba(0,240,255,0.25)] transition-colors"
          >
            <Share2 className="w-4 h-4" />
            نسخ الإنجازات
          </button>
        </GlassCard>
      </div>
    </AppShell>
  );
}
