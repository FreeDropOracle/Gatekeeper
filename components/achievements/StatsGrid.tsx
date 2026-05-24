'use client';

import { GlassCard } from '@/components/ui/GlassCard';
import { useWorkspaceStore } from '@/store/workspaceStore';
import { useStreak } from '@/hooks/useStreak';
import { Link2, TrendingUp, Trophy, Flame } from 'lucide-react';

interface StatsGridProps {
  unlockedCount: number;
  pct: number;
  totalBadges: number;
}

export function StatsGrid({ unlockedCount, pct, totalBadges }: StatsGridProps) {
  const { links, categories, progress } = useWorkspaceStore();
  const { streak } = useStreak();

  const totalClicks = links.reduce((s, l) => s + l.clickCount, 0);

  const stats = [
    { icon: Link2, label: 'الروابط', value: links.length.toString(), color: '#00f0ff' },
    { icon: TrendingUp, label: 'النقرات', value: totalClicks.toString(), color: '#10b981' },
    { icon: Flame, label: 'الاستمرارية', value: `${streak.count} يوم`, color: '#f59e0b' },
    { icon: Trophy, label: 'الشارات', value: `${unlockedCount}/${totalBadges}`, color: '#8b5cf6' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <GlassCard key={stat.label} className="flex items-center gap-4 p-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${stat.color}15` }}>
            <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
          </div>
          <div>
            <div className="text-lg font-bold text-[#e0fcff]">{stat.value}</div>
            <div className="text-xs text-[#64748b]">{stat.label}</div>
          </div>
        </GlassCard>
      ))}
    </div>
  );
}
