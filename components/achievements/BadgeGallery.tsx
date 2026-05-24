'use client';

import { GlassCard } from '@/components/ui/GlassCard';
import type { Badge } from '@/types';
import { cn } from '@/lib/utils';

const iconMap: Record<string, string> = {
  Link: '🔗', Library: '📚', Database: '🗄️', Zap: '⚡',
  Flame: '🔥', FolderPlus: '📁', MousePointer: '🖱️',
};

interface BadgeGalleryProps {
  badges: Badge[];
  unlockedIds: Set<string>;
}

export function BadgeGallery({ badges, unlockedIds }: BadgeGalleryProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-[#e0fcff] mb-4">جميع الشارات</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {badges.map((badge) => {
          const unlocked = unlockedIds.has(badge.id);
          return (
            <GlassCard
              key={badge.id}
              className={cn(
                'text-center p-5 transition-all duration-300',
                unlocked ? 'opacity-100' : 'opacity-40'
              )}
            >
              <div
                className={cn(
                  'w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-3 text-2xl transition-all duration-300',
                  unlocked
                    ? 'bg-[rgba(0,240,255,0.15)] shadow-[0_0_20px_rgba(0,240,255,0.1)]'
                    : 'bg-[rgba(255,255,255,0.05)]'
                )}
              >
                {iconMap[badge.icon] || '🏅'}
              </div>
              <h3 className={cn('font-semibold text-sm mb-1', unlocked ? 'text-[#e0fcff]' : 'text-[#64748b]')}>
                {badge.title}
              </h3>
              <p className="text-xs text-[#64748b] line-clamp-2">{badge.description}</p>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
