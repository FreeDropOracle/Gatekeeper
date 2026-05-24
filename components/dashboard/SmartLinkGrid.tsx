'use client';

import { GlassCard } from '@/components/ui/GlassCard';
import { LinkCard } from './LinkCard';
import { SmartGridSkeleton } from './SmartGridSkeleton';
import { useUIStore } from '@/store/uiStore';
import type { LinkItem } from '@/types';

interface SmartLinkGridProps {
  links: LinkItem[];
  categories?: { id: string; name: string }[];
  loading?: boolean;
  emptyMessage?: string;
  onEditLink?: (link: LinkItem) => void;
  onDeleteLink?: (link: LinkItem) => void;
}

export function SmartLinkGrid({
  links,
  categories = [],
  loading = false,
  emptyMessage = 'لا توجد روابط بعد. ابدأ بإضافة رابطك الأول!',
  onEditLink,
  onDeleteLink,
}: SmartLinkGridProps) {
  const viewMode = useUIStore((s) => s.viewMode);
  const catMap = new Map(categories.map((c) => [c.id, c.name]));

  if (loading) return <SmartGridSkeleton />;

  if (links.length === 0) {
    return (
      <GlassCard className="text-center py-16">
        <div className="max-w-xs mx-auto">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[rgba(0,240,255,0.1)] flex items-center justify-center">
            <svg className="w-8 h-8 text-[#00f0ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
          <p className="text-lg font-medium text-[#94a3b8]">{emptyMessage}</p>
          <p className="text-sm text-[#64748b] mt-2">استخدم زر + بالأسفل لإضافة أول رابط</p>
        </div>
      </GlassCard>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="flex flex-col gap-3">
        {links.map((link) => (
          <LinkCard
            key={link.id}
            link={link}
            categoryName={catMap.get(link.categoryId)}
            onEdit={onEditLink}
            onDelete={onDeleteLink}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {links.map((link) => (
        <LinkCard
          key={link.id}
          link={link}
          categoryName={catMap.get(link.categoryId)}
          onEdit={onEditLink}
          onDelete={onDeleteLink}
        />
      ))}
    </div>
  );
}
